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

const API = 'https://discord.com/api/v10';
/** how long Discord lets an app answer a command – and so how long an edit can be posted */
export const PENDING_MS = 15 * 60 * 1000;
/** the largest picture posted back (Discord takes 10 MB without boosts) */
export const MAX_POST = 10 * 1024 * 1024;

/** A pending edit: where the command was used, the picked image (if any), and the command's token. */
export interface Pending {
  channelId: string; guildId: string | null; time: number;
  appId: string; token: string;
  messageId: string | null; url: string | null; filename: string; contentType: string;
}

const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } });
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
    const image = (msg?.attachments || []).find((a: { content_type?: string }) => /^image\//.test(a.content_type || ''))
      || (msg?.embeds || []).map((e: { image?: { url: string }; thumbnail?: { url: string } }) => e.image || e.thumbnail).find(Boolean);
    if (!image) return reply('That message has no image to edit.');
    Object.assign(pending, { messageId: msg.id, url: image.url, filename: image.filename || 'image.png', contentType: image.content_type || 'image/png' });
  }
  const user = i.member?.user?.id || i.user?.id;
  await store(env, user).fetch('https://pending/put', { method: 'PUT', body: JSON.stringify(pending) });
  return json({ type: 12 }); // LAUNCH_ACTIVITY
}

// ---- the Activity's API ------------------------------------------------------------------------------------
const store = (env: Env, user: string) => env.PENDING.get(env.PENDING.idFromName(user));
async function pendingOf(env: Env, user: string): Promise<Pending | null> {
  const r = await store(env, user).fetch('https://pending/get');
  return r.status === 200 ? await r.json() as Pending : null;
}

/** The user an Activity's access token belongs to. */
async function userOf(req: Request): Promise<string | null> {
  const auth = req.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) return null;
  const r = await fetch(`${API}/users/@me`, { headers: { authorization: auth } });
  return r.ok ? (await r.json() as { id: string }).id : null;
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
  return json({ access_token });
}

/** The image the user picked in this channel (204: none). */
async function pending(req: Request, env: Env, url: URL): Promise<Response> {
  const user = await userOf(req);
  if (!user) return json({ error: 'not signed in' }, 401);
  const p = await pendingOf(env, user);
  if (!p?.url || p.channelId !== url.searchParams.get('channel') || Date.now() - p.time > PENDING_MS) return new Response(null, { status: 204 });
  const img = await fetch(p.url);
  if (!img.ok) return json({ error: 'the image is no longer available' }, 410);
  return new Response(img.body, {
    headers: { 'content-type': p.contentType, 'x-filename': encodeURIComponent(p.filename), 'cache-control': 'no-store' },
  });
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
