/* Mosaic Paint for Discord – the Cloudflare Worker behind the Activity (its entry point is worker.ts).

   Right-click a message with an image › Apps › "Edit image" (or the app's launch button): Discord sends the
   command here (/interactions). The Worker keeps it as the user's pending edit – the image, if any, and the
   command's token – and answers "launch the Activity". The Activity (the raster editor, served by this
   Worker as static files) signs the user in (/api/token), loads the image (/api/pending) and, when the user
   is done, sends the PNG back (/api/post).

   The picture is posted the way Wordle posts its results: as a follow-up to the user's command, with the
   command's token. So the app needs no bot in the server, and it works in DMs and group DMs too. Discord
   keeps such a token for 15 minutes: later the editor says so (Copy and paste works instead).

   Pending edits live in a Durable Object per user (consistent everywhere – the command arrives from
   Discord's servers, the Activity's requests from near the user). Only the image's address is kept; the
   image itself is fetched from Discord when the Activity asks for it. */

export interface Env {
  /** the app's public key (Developer Portal › General Information), to check that requests come from Discord */
  DISCORD_PUBLIC_KEY: string;
  DISCORD_CLIENT_ID: string;
  DISCORD_CLIENT_SECRET: string;
  PENDING: DurableObjectNamespaceLike;
  /** the editor's files (Workers static assets) */
  ASSETS?: { fetch(req: Request): Promise<Response> };
}
// the parts of the Workers types used here (so the Worker also runs in tests, without Cloudflare)
export interface DurableObjectNamespaceLike { idFromName(name: string): unknown; get(id: unknown): { fetch(req: Request | string, init?: RequestInit): Promise<Response> } }
export interface StorageLike { get<T>(key: string): Promise<T | undefined>; put(key: string, value: unknown): Promise<void>; delete(key: string): Promise<boolean> }

import { FILES } from '../../src/shared/addon-files.ts';

const API = 'https://discord.com/api/v10';
/** The add-ons' files, which the Activity may only load through here (Discord allows nothing else). */
const ADDON_FILES = new Set<string>(Object.values(FILES).map(f => f.url));

/** An add-on file, fetched for the Activity (only the listed ones) and kept in Cloudflare's cache. */
async function addonFile(url: URL): Promise<Response> {
  const src = url.searchParams.get('u') || '';
  if (!ADDON_FILES.has(src)) return new Response('not an add-on file', { status: 403 });
  const r = await fetch(src, { cf: { cacheEverything: true, cacheTtl: 30 * 86400 } } as RequestInit);
  if (!r.ok) return new Response('could not fetch it', { status: 502 });
  return new Response(r.body, { headers: { 'content-type': 'application/octet-stream', 'cache-control': 'public, max-age=2592000, immutable' } });
}
/** how long Discord lets an app answer a command – and so how long an edit can be posted */
export const PENDING_MS = 15 * 60 * 1000;
/** the largest picture posted back (Discord takes 10 MB without boosts) */
export const MAX_POST = 10 * 1024 * 1024;

/** A pending edit: where the command was used, the picked image (if any), and the command's token. */
export interface Pending {
  channelId: string; guildId: string | null; time: number;
  appId: string; token: string;
  messageId: string | null; url: string | null; filename: string; contentType: string;
  /** another address of the same file (Discord's media proxy), tried when the first doesn't work */
  alt?: string | null;
}

// never stored: a 410 may be cached on the way (it's allowed to be), and then answers every later request
const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
const hex = (s: string) => new Uint8Array((s.match(/../g) || []).map(b => parseInt(b, 16)));

/** Discord signs every interaction; anything else is refused. */
export async function verifySignature(publicKey: string, signature: string | null, timestamp: string | null, body: string): Promise<boolean> {
  if (!signature || !timestamp) return false;
  const data = new TextEncoder().encode(timestamp + body);
  // 'Ed25519' is the standard name; older Workers runtimes only know 'NODE-ED25519'
  for (const algorithm of [{ name: 'Ed25519' }, { name: 'NODE-ED25519', namedCurve: 'NODE-ED25519' }]) {
    try {
      const key = await crypto.subtle.importKey('raw', hex(publicKey), algorithm, false, ['verify']);
      return await crypto.subtle.verify(algorithm, key, hex(signature), data);
    } catch { /* try the next name */ }
  }
  return false;
}

// ---- interactions (the commands) -----------------------------------------------------------------------
const reply = (content: string) => json({ type: 4, data: { content, flags: 64 } }); // 64: only the user sees it
/** command types: 3 a message command ("Edit image"), 4 the Activity's own launch command */
const MESSAGE = 3, ENTRY_POINT = 4;

async function interaction(req: Request, env: Env): Promise<Response> {
  const body = await req.text();
  if (!await verifySignature(env.DISCORD_PUBLIC_KEY, req.headers.get('x-signature-ed25519'), req.headers.get('x-signature-timestamp'), body)) {
    return new Response('invalid request signature', { status: 401 });
  }
  const i = JSON.parse(body);
  if (i.type === 1) return json({ type: 1 }); // PING
  if (i.type !== 2 || ![MESSAGE, ENTRY_POINT].includes(i.data?.type)) return reply('Unknown command.');
  const pending: Pending = {
    channelId: i.channel_id || i.channel?.id, guildId: i.guild_id || null, time: Date.now(),
    appId: i.application_id, token: i.token,
    messageId: null, url: null, filename: 'image.png', contentType: 'image/png',
  };
  if (i.data.type === MESSAGE) {
    // the clicked message comes with the command
    const msg = i.data.resolved?.messages?.[i.data.target_id];
    const image = pickMedia(msg);
    if (!image) return reply('That message has no image, GIF or video to edit.');
    Object.assign(pending, { messageId: msg.id, ...image });
  }
  const user = i.member?.user?.id || i.user?.id;
  await store(env, user).fetch('https://pending/put', { method: 'PUT', body: JSON.stringify(pending) });
  return json({ type: 12 }); // LAUNCH_ACTIVITY
}

/** The type of a file by its name (embeds don't say). */
const typeOf = (url: string): string => {
  const ext = /\.([a-z0-9]+)(?:[?#]|$)/i.exec(url)?.[1]?.toLowerCase() || '';
  return { gif: 'image/gif', mp4: 'video/mp4', webm: 'video/webm', mov: 'video/quicktime', m4v: 'video/mp4', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp' }[ext] || 'image/png';
};
const nameOf = (url: string, fallback: string): string => decodeURIComponent(/\/([^/?#]+)(?:[?#]|$)/.exec(url)?.[1] || fallback);
interface Media { url: string; filename: string; contentType: string; alt?: string | null }
/**
 * What to edit from a message: the first image, GIF or video attached; else an embed's – a Tenor / Giphy "GIF"
 * (a video), a picture, or a video link's still (a YouTube video itself can't be fetched).
 */
/** The longest side a photo is fetched at for editing (pixels). */
export const EDIT_MAX = 2000;
export function pickMedia(msg: any): Media | null {
  const a = (msg?.attachments || []).find((x: { content_type?: string }) => /^(image|video)\//.test(x.content_type || ''));
  if (a) {
    // a big photo comes scaled down by Discord's media proxy (a fraction of the bytes; the editor would offer
    // to scale it to this anyway); the original stays the second try
    const k = Math.min(1, EDIT_MAX / Math.max(a.width || 0, a.height || 0, 1));
    if (k < 1 && a.proxy_url && /^image\/(jpeg|png|webp)$/.test(a.content_type)) {
      const sized = `${a.proxy_url}${a.proxy_url.includes('?') ? '&' : '?'}width=${Math.round(a.width * k)}&height=${Math.round(a.height * k)}`;
      return { url: sized, filename: a.filename || 'image.png', contentType: a.content_type, alt: a.url };
    }
    return { url: a.url, filename: a.filename || 'image.png', contentType: a.content_type, alt: a.proxy_url || null };
  }
  for (const e of msg?.embeds || []) {
    const v = e.type === 'gifv' ? e.video : null, still = e.image || e.thumbnail, url = v ? (v.proxy_url || v.url) : still ? (still.proxy_url || still.url) : null;
    const other = v ? (v.proxy_url ? v.url : null) : still && still.proxy_url ? still.url : null;
    if (url) return { url, filename: nameOf(url, v ? 'animation.mp4' : 'image.png'), contentType: v ? 'video/mp4' : typeOf(url), alt: other };
  }
  return null;
}

/** A file from Discord's CDN (it wants to know who asks). */
const getFile = (url: string, init: RequestInit = {}) => fetch(url, { ...init, headers: { 'user-agent': 'MosaicPaintActivity (https://github.com/honza03210/mosaic-paint, 2)', ...(init.headers as Record<string, string> || {}) } });

// ---- videos for the Activity's player ------------------------------------------------------------------------
/** A <video> can't send the sign-in header: it gets an address signed by the Worker instead, valid for a while. */
const MEDIA_MS = 30 * 60 * 1000;
const MEDIA_HOSTS = /^(cdn\.discordapp\.com|media\.discordapp\.net|images-ext-\d+\.discordapp\.net)$/;
async function hmac(secret: string, text: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(text)));
  return [...sig].map(b => b.toString(16).padStart(2, '0')).join('');
}
export async function mediaAddress(env: Env, url: string, now = Date.now()): Promise<string> {
  const exp = String(now + MEDIA_MS);
  return `/api/media?u=${encodeURIComponent(url)}&exp=${exp}&sig=${await hmac(env.DISCORD_CLIENT_SECRET, url + '|' + exp)}`;
}
/** The video for the player (byte ranges, so it can seek); only with a valid signature, only from Discord's media. */
async function media(req: Request, env: Env, url: URL): Promise<Response> {
  const u = url.searchParams.get('u') || '', exp = url.searchParams.get('exp') || '', sig = url.searchParams.get('sig') || '';
  let host = '';
  try { host = new URL(u).hostname; } catch { /* not a URL */ }
  if (!MEDIA_HOSTS.test(host) || !(+exp > Date.now()) || sig !== await hmac(env.DISCORD_CLIENT_SECRET, u + '|' + exp)) return new Response('not allowed', { status: 403 });
  const range = req.headers.get('range');
  const r = await getFile(u, { headers: range ? { range } : {} });
  const h = new Headers({ 'content-type': r.headers.get('content-type') || 'video/mp4', 'accept-ranges': 'bytes', 'cache-control': 'private, max-age=600' });
  for (const k of ['content-length', 'content-range']) { const v = r.headers.get(k); if (v) h.set(k, v); }
  return new Response(r.body, { status: r.status, headers: h });
}

// ---- the Activity's API ------------------------------------------------------------------------------------
const store = (env: Env, user: string) => env.PENDING.get(env.PENDING.idFromName(user));
async function pendingOf(env: Env, user: string): Promise<Pending | null> {
  const r = await store(env, user).fetch('https://pending/get');
  return r.status === 200 ? await r.json() as Pending : null;
}

/** Users by access token, looked up when signing in (the picture is asked for right after: no second trip to
    Discord when the same Worker instance answers, which it usually does). */
const users = new Map<string, { id: Promise<string | null>; until: number }>();
function lookUp(auth: string): Promise<string | null> {
  const hit = users.get(auth);
  if (hit && hit.until > Date.now()) return hit.id;
  const id = fetch(`${API}/users/@me`, { headers: { authorization: auth } }).then(async r => (r.ok ? (await r.json() as { id: string }).id : null)).catch(() => null);
  if (users.size > 500) users.clear();
  users.set(auth, { id, until: Date.now() + 10 * 60 * 1000 });
  id.then(v => { if (!v) users.delete(auth); });
  return id;
}
/** The user an Activity's access token belongs to. */
async function userOf(req: Request): Promise<string | null> {
  const auth = req.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) return null;
  return lookUp(auth);
}

/** Signing in: the Activity's one-time code for an access token. */
async function token(req: Request, env: Env): Promise<Response> {
  const { code } = await req.json() as { code?: string };
  if (!code) return json({ error: 'no code' }, 400);
  const r = await fetch(`${API}/oauth2/token`, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: env.DISCORD_CLIENT_ID, client_secret: env.DISCORD_CLIENT_SECRET, grant_type: 'authorization_code', code }),
  });
  if (!r.ok) {
    // Discord's reason (e.g. invalid_client: a wrong or reset client secret) – in the logs (npx wrangler tail) and for the editor
    const detail = await r.text();
    console.error('sign-in failed', r.status, detail);
    let reason = `HTTP ${r.status}`;
    try { reason = (JSON.parse(detail) as { error?: string }).error || reason; } catch { /* not JSON */ }
    return json({ error: 'could not sign in', reason }, 401);
  }
  const { access_token } = await r.json() as { access_token: string };
  // who it is, already now (the picture is asked for next)
  lookUp(`Bearer ${access_token}`);
  return json({ access_token });
}

/** The image the user picked in this channel (204: none). */
async function pending(req: Request, env: Env, url: URL): Promise<Response> {
  const user = await userOf(req);
  if (!user) return json({ error: 'not signed in' }, 401);
  const p = await pendingOf(env, user);
  if (!p?.url || p.channelId !== url.searchParams.get('channel') || Date.now() - p.time > PENDING_MS) return new Response(null, { status: 204 });
  // Discord's file; its media proxy when that doesn't answer (what went wrong goes to the log: npx wrangler tail)
  let img = await getFile(p.url);
  if (!img.ok && p.alt) { console.error('file fetch failed', img.status, p.url.slice(0, 80), '– trying the media proxy'); img = await getFile(p.alt); }
  if (!img.ok) {
    console.error('file fetch failed', img.status, (await img.text().catch(() => '')).slice(0, 200));
    return json({ error: 'the image is no longer available', status: img.status }, 410);
  }
  // the type the file really has (an embed's is only guessed from its name)
  const type = /^(image|video)\//.test(img.headers.get('content-type') || '') ? img.headers.get('content-type') : p.contentType;
  const headers: Record<string, string> = { 'content-type': type, 'x-filename': encodeURIComponent(p.filename), 'cache-control': 'no-store' };
  // a video: also where the player can load it from (the page may not be allowed to play it from memory)
  if (/^video\//.test(type)) headers['x-media'] = await mediaAddress(env, p.url);
  return new Response(img.body, { headers });
}

/**
 * Posts the edited picture as a follow-up to the user's command in this channel. 403: no command of the
 * user's here; 409: too late (Discord's 15 minutes are over).
 */
async function post(req: Request, env: Env, url: URL): Promise<Response> {
  const user = await userOf(req);
  if (!user) return json({ error: 'not signed in' }, 401);
  const p = await pendingOf(env, user), channel = url.searchParams.get('channel');
  if (!p || p.channelId !== channel) return json({ error: 'no command of yours in this channel' }, 403);
  if (Date.now() - p.time > PENDING_MS) return json({ error: 'too late' }, 409);
  const png = await req.arrayBuffer();
  if (!png.byteLength || png.byteLength > MAX_POST) return json({ error: 'too big' }, 413);
  // a link back to the picked message
  const original = p.messageId ? ` · [original](https://discord.com/channels/${p.guildId || '@me'}/${p.channelId}/${p.messageId})` : '';
  const form = new FormData();
  form.append('payload_json', JSON.stringify({
    content: `Edited by <@${user}>${original}`,
    allowed_mentions: { parse: [] },
    attachments: [{ id: 0, filename: 'edited.png' }],
  }));
  form.append('files[0]', new Blob([png], { type: 'image/png' }), 'edited.png');
  const sent = await fetch(`${API}/webhooks/${p.appId}/${p.token}`, { method: 'POST', body: form });
  if (!sent.ok) return json({ error: 'Discord refused the message', status: sent.status }, sent.status === 401 || sent.status === 404 ? 409 : 502);
  const m = await sent.json() as { id: string };
  return json({ ok: true, messageId: m.id });
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    try {
      if (url.pathname === '/interactions' && req.method === 'POST') return await interaction(req, env);
      if (url.pathname === '/api/config') return json({ clientId: env.DISCORD_CLIENT_ID });
      if (url.pathname === '/api/token' && req.method === 'POST') return await token(req, env);
      if (url.pathname === '/api/pending' && req.method === 'GET') return await pending(req, env, url);
      if (url.pathname === '/api/post' && req.method === 'POST') return await post(req, env, url);
      if (url.pathname === '/api/fetch' && req.method === 'GET') return await addonFile(url);
      if (url.pathname === '/api/media' && req.method === 'GET') return await media(req, env, url);
    } catch (e) {
      return json({ error: String((e as Error)?.message || e) }, 500);
    }
    return env.ASSETS ? env.ASSETS.fetch(req) : new Response('not found', { status: 404 });
  },
};

/** One user's pending edit (a Durable Object per user). */
export class PendingEdits {
  state: { storage: StorageLike };
  constructor(state: { storage: StorageLike }) { this.state = state; }
  async fetch(req: Request): Promise<Response> {
    const what = new URL(req.url).pathname;
    if (what === '/put') { await this.state.storage.put('edit', await req.json()); return new Response(null, { status: 204 }); }
    if (what === '/delete') { await this.state.storage.delete('edit'); return new Response(null, { status: 204 }); }
    const p = await this.state.storage.get<Pending>('edit');
    return p ? json(p) : new Response(null, { status: 204 });
  }
}
