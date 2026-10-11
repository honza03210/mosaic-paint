/* Mosaic Paint for Discord – the Cloudflare Worker behind the Activity (its entry point is worker.ts).

   Right-click a message with an image › Apps › "Edit image": Discord sends the command here (/interactions);
   the Worker notes the image as the user's pending edit for that channel and answers "launch the Activity".
   The Activity (the raster editor, served by this Worker as static files) signs the user in (/api/token),
   loads the pending image (/api/pending) and, when the user is done, sends the PNG back (/api/post): the
   bot posts it in the channel, as a reply to the original message.

   Pending edits live in a Durable Object per user (consistent everywhere – the command arrives from
   Discord's servers, the Activity's requests from near the user). Only the image's address is kept; the
   image itself is fetched from Discord when the Activity asks for it. */

export interface Env {
  /** the app's public key (Developer Portal › General Information), to check that requests come from Discord */
  DISCORD_PUBLIC_KEY: string;
  DISCORD_CLIENT_ID: string;
  DISCORD_CLIENT_SECRET: string;
  DISCORD_BOT_TOKEN: string;
  PENDING: DurableObjectNamespaceLike;
  /** the editor's files (Workers static assets) */
  ASSETS?: { fetch(req: Request): Promise<Response> };
}
// the parts of the Workers types used here (so the Worker also runs in tests, without Cloudflare)
export interface DurableObjectNamespaceLike { idFromName(name: string): unknown; get(id: unknown): { fetch(req: Request | string, init?: RequestInit): Promise<Response> } }
export interface StorageLike { get<T>(key: string): Promise<T | undefined>; put(key: string, value: unknown): Promise<void>; delete(key: string): Promise<boolean> }

const API = 'https://discord.com/api/v10';
/** how long a picked image waits for the Activity to load it */
export const PENDING_MS = 15 * 60 * 1000;
/** the largest picture posted back (Discord takes 10 MB in servers without boosts) */
export const MAX_POST = 10 * 1024 * 1024;

/** A pending edit: which image, from which message, in which channel. */
export interface Pending { channelId: string; guildId: string | null; messageId: string; url: string; filename: string; contentType: string; time: number }

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

// ---- interactions (the "Edit image" command) -------------------------------------------------------------
const reply = (content: string) => json({ type: 4, data: { content, flags: 64 } }); // 64: only the user sees it

async function interaction(req: Request, env: Env): Promise<Response> {
  const body = await req.text();
  if (!await verifySignature(env.DISCORD_PUBLIC_KEY, req.headers.get('x-signature-ed25519'), req.headers.get('x-signature-timestamp'), body)) {
    return new Response('invalid request signature', { status: 401 });
  }
  const i = JSON.parse(body);
  if (i.type === 1) return json({ type: 1 }); // PING
  if (i.type !== 2 || i.data?.type !== 3) return reply('Unknown command.');
  // a message command: the clicked message comes with it
  const msg = i.data.resolved?.messages?.[i.data.target_id];
  const image = (msg?.attachments || []).find((a: { content_type?: string }) => /^image\//.test(a.content_type || ''))
    || (msg?.embeds || []).map((e: { image?: { url: string }; thumbnail?: { url: string } }) => e.image || e.thumbnail).find(Boolean);
  if (!image) return reply('That message has no image to edit.');
  const user = i.member?.user?.id || i.user?.id;
  const pending: Pending = {
    channelId: i.channel_id || i.channel?.id, guildId: i.guild_id || null, messageId: msg.id,
    url: image.url, filename: image.filename || 'image.png', contentType: image.content_type || 'image/png', time: Date.now(),
  };
  await store(env, user).fetch('https://pending/put', { method: 'PUT', body: JSON.stringify(pending) });
  return json({ type: 12 }); // LAUNCH_ACTIVITY
}

// ---- the Activity's API ------------------------------------------------------------------------------------
const store = (env: Env, user: string) => env.PENDING.get(env.PENDING.idFromName(user));

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
  if (!r.ok) return json({ error: 'could not sign in' }, 401);
  const { access_token } = await r.json() as { access_token: string };
  return json({ access_token });
}

/** The image the user picked in this channel (204: none). */
async function pending(req: Request, env: Env, url: URL): Promise<Response> {
  const user = await userOf(req);
  if (!user) return json({ error: 'not signed in' }, 401);
  const r = await store(env, user).fetch('https://pending/get');
  const p = r.status === 200 ? await r.json() as Pending : null;
  if (!p || p.channelId !== url.searchParams.get('channel') || Date.now() - p.time > PENDING_MS) return new Response(null, { status: 204 });
  const img = await fetch(p.url);
  if (!img.ok) return json({ error: 'the image is no longer available' }, 410);
  return new Response(img.body, {
    headers: { 'content-type': p.contentType, 'x-filename': encodeURIComponent(p.filename), 'x-message-id': p.messageId, 'cache-control': 'no-store' },
  });
}

/** Is the user in this Activity, and is it in this channel? (Discord knows; the Activity's word is not enough.) */
async function inActivity(env: Env, instance: string, user: string, channel: string): Promise<boolean> {
  const r = await fetch(`${API}/applications/${env.DISCORD_CLIENT_ID}/activity-instances/${encodeURIComponent(instance)}`, {
    headers: { authorization: `Bot ${env.DISCORD_BOT_TOKEN}` },
  });
  if (!r.ok) return false;
  const a = await r.json() as { users?: string[]; location?: { channel_id?: string } };
  return !!a.users?.includes(user) && a.location?.channel_id === channel;
}

/** Posts the edited picture in the channel, as a reply to the message it came from. */
async function post(req: Request, env: Env, url: URL): Promise<Response> {
  const user = await userOf(req);
  if (!user) return json({ error: 'not signed in' }, 401);
  const channel = url.searchParams.get('channel') || '', instance = url.searchParams.get('instance') || '';
  if (!channel || !await inActivity(env, instance, user, channel)) return json({ error: 'not in this channel' }, 403);
  const png = await req.arrayBuffer();
  if (!png.byteLength || png.byteLength > MAX_POST) return json({ error: 'too big' }, 413);
  // the reply goes to the picked message, if the image came from this channel
  const r = await store(env, user).fetch('https://pending/get');
  const p = r.status === 200 ? await r.json() as Pending : null;
  const replyTo = p && p.channelId === channel ? p.messageId : null;
  const form = new FormData();
  form.append('payload_json', JSON.stringify({
    content: `Edited by <@${user}>`,
    allowed_mentions: { parse: [] },
    ...(replyTo ? { message_reference: { message_id: replyTo, fail_if_not_exists: false } } : {}),
    attachments: [{ id: 0, filename: 'edited.png' }],
  }));
  form.append('files[0]', new Blob([png], { type: 'image/png' }), 'edited.png');
  const sent = await fetch(`${API}/channels/${channel}/messages`, { method: 'POST', headers: { authorization: `Bot ${env.DISCORD_BOT_TOKEN}` }, body: form });
  if (!sent.ok) return json({ error: 'Discord refused the message', status: sent.status }, 502);
  if (replyTo) await store(env, user).fetch('https://pending/delete', { method: 'DELETE' });
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
