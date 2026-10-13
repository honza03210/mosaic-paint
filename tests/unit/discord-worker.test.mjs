// The Discord Activity's Worker (discord/src/app.ts), against a pretend Discord: signed interactions, the
// "Edit image" and launch commands, signing in, loading the picked image and posting the edited one as an
// answer to the command (no bot needed).
import { test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import worker, { PendingEdits, verifySignature, PENDING_MS } from '../../discord/src/app.ts';

const toHex = (buf) => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
const keys = await crypto.subtle.generateKey({ name: 'Ed25519' }, true, ['sign', 'verify']);
const publicKey = toHex(await crypto.subtle.exportKey('raw', keys.publicKey));

/** A request signed the way Discord signs interactions. */
async function signed(body, { tamper = false } = {}) {
  const timestamp = String(Math.floor(Date.now() / 1000)), text = JSON.stringify(body);
  const sig = toHex(await crypto.subtle.sign({ name: 'Ed25519' }, keys.privateKey, new TextEncoder().encode(timestamp + text)));
  return new Request('https://w/interactions', {
    method: 'POST', body: tamper ? text.replace('}', ',"x":1}') : text,
    headers: { 'x-signature-ed25519': sig, 'x-signature-timestamp': timestamp },
  });
}

/** Durable Objects in memory: one PendingEdits per name. */
function namespace() {
  const objects = new Map();
  return {
    objects,
    idFromName: (name) => name,
    get(id) {
      if (!objects.has(id)) { const data = new Map(); objects.set(id, { data, obj: new PendingEdits({ storage: { get: async k => data.get(k), put: async (k, v) => { data.set(k, v); }, delete: async k => data.delete(k) } }) }); }
      const { obj } = objects.get(id);
      return { fetch: (req, init) => obj.fetch(typeof req === 'string' ? new Request(req, init) : req) };
    },
  };
}

// pretend Discord: users by token, the image on its CDN, follow-up messages to commands
let env, calls, realFetch;
const PNG = new Uint8Array([137, 80, 78, 71, 1, 2, 3]);
beforeEach(() => {
  env = { DISCORD_PUBLIC_KEY: publicKey, DISCORD_CLIENT_ID: 'app1', DISCORD_CLIENT_SECRET: 'secret', PENDING: namespace() };
  calls = [];
  realFetch = globalThis.fetch;
  globalThis.fetch = async (url, init = {}) => {
    const u = String(url), auth = new Headers(init.headers).get('authorization');
    calls.push({ url: u, init });
    if (u.endsWith('/oauth2/token')) return init.body.get('code') === 'good-code' ? Response.json({ access_token: 'tok-ann' }) : new Response('', { status: 400 });
    if (u.endsWith('/users/@me')) return auth === 'Bearer tok-ann' ? Response.json({ id: 'ann' }) : new Response('', { status: 401 });
    if (u === 'https://cdn.example/cat.png') return new Response(PNG, { headers: { 'content-type': 'image/png' } });
    if (u.endsWith('/webhooks/app1/cmd-token')) return Response.json({ id: 'posted1' });
    if (u.includes('/webhooks/')) return new Response('', { status: 404 });
    return new Response('unexpected ' + u, { status: 500 });
  };
});
afterEach(() => { globalThis.fetch = realFetch; });

const editImage = (attachments, { dm = false } = {}) => ({
  type: 2, application_id: 'app1', token: 'cmd-token', channel_id: 'chan1',
  ...(dm ? { user: { id: 'ann' } } : { guild_id: 'g1', member: { user: { id: 'ann' } } }),
  data: { type: 3, name: 'Edit image', target_id: 'm1', resolved: { messages: { m1: { id: 'm1', attachments, embeds: [] } } } },
});
const cat = [{ url: 'https://cdn.example/cat.png', filename: 'cat 1.png', content_type: 'image/png' }];
const call = (path, init) => worker.fetch(new Request('https://w' + path, init), env);
const auth = { authorization: 'Bearer tok-ann' };
const edit = () => env.PENDING.objects.get('ann').data.get('edit');

test('only requests signed by Discord are answered', async () => {
  assert.equal((await worker.fetch(await signed({ type: 1 }, { tamper: true }), env)).status, 401);
  assert.equal((await worker.fetch(new Request('https://w/interactions', { method: 'POST', body: '{}' }), env)).status, 401);
  assert.deepEqual(await (await worker.fetch(await signed({ type: 1 }), env)).json(), { type: 1 });
  assert.equal(await verifySignature(publicKey, 'zz', '1', 'x'), false);
});

test('"Edit image" keeps the image and the command’s token, and opens the Activity', async () => {
  const r = await worker.fetch(await signed(editImage(cat)), env);
  assert.deepEqual(await r.json(), { type: 12 });
  assert.deepEqual([edit().channelId, edit().messageId, edit().url, edit().appId, edit().token], ['chan1', 'm1', 'https://cdn.example/cat.png', 'app1', 'cmd-token']);
  // a message without an image: a note only the user sees
  const none = await (await worker.fetch(await signed(editImage([{ url: 'x', filename: 'a.txt', content_type: 'text/plain' }])), env)).json();
  assert.equal(none.type, 4);
  assert.equal(none.data.flags, 64);
  // the launch button (from the App Launcher): no image, but a token to post with
  await worker.fetch(await signed({ type: 2, application_id: 'app1', token: 'cmd-token', channel_id: 'chan2', user: { id: 'ann' }, data: { type: 4, name: 'launch' } }), env);
  assert.deepEqual([edit().channelId, edit().url, edit().token], ['chan2', null, 'cmd-token']);
});

test('signing in, then loading the picked image in the same channel only', async () => {
  await worker.fetch(await signed(editImage(cat)), env);
  assert.equal((await call('/api/token', { method: 'POST', body: JSON.stringify({ code: 'bad' }) })).status, 401);
  const { access_token } = await (await call('/api/token', { method: 'POST', body: JSON.stringify({ code: 'good-code' }) })).json();
  assert.equal(access_token, 'tok-ann');
  assert.equal(calls.find(c => c.url.endsWith('/oauth2/token')).init.body.get('client_secret'), 'secret');
  assert.equal((await call('/api/pending?channel=chan1')).status, 401);
  assert.equal((await call('/api/pending?channel=other', { headers: auth })).status, 204);
  const img = await call('/api/pending?channel=chan1', { headers: auth });
  assert.equal(img.status, 200);
  assert.deepEqual(new Uint8Array(await img.arrayBuffer()), PNG);
  assert.equal(decodeURIComponent(img.headers.get('x-filename')), 'cat 1.png');
  edit().time -= PENDING_MS + 1;
  assert.equal((await call('/api/pending?channel=chan1', { headers: auth })).status, 204);
});

test('posting: an answer to the user’s command in that channel, with no bot', async () => {
  await worker.fetch(await signed(editImage(cat)), env);
  assert.equal((await call('/api/post?channel=chan1', { method: 'POST', body: PNG })).status, 401);
  assert.equal((await call('/api/post?channel=elsewhere', { method: 'POST', headers: auth, body: PNG })).status, 403);
  const r = await call('/api/post?channel=chan1', { method: 'POST', headers: auth, body: PNG });
  assert.deepEqual(await r.json(), { ok: true, messageId: 'posted1' });
  const sent = calls.find(c => c.url.includes('/webhooks/'));
  assert.equal(sent.url, 'https://discord.com/api/v10/webhooks/app1/cmd-token');
  assert.equal(new Headers(sent.init.headers).get('authorization'), null); // the command's token is the permission
  const payload = JSON.parse(sent.init.body.get('payload_json'));
  assert.equal(payload.content, 'Edited by <@ann> · [original](https://discord.com/channels/g1/chan1/m1)');
  assert.deepEqual(payload.allowed_mentions, { parse: [] });
  assert.deepEqual(new Uint8Array(await sent.init.body.get('files[0]').arrayBuffer()), PNG);
});

test('in a DM the link points there; after 15 minutes Discord no longer takes it', async () => {
  await worker.fetch(await signed(editImage(cat, { dm: true })), env);
  await call('/api/post?channel=chan1', { method: 'POST', headers: auth, body: PNG });
  const payload = JSON.parse(calls.find(c => c.url.includes('/webhooks/')).init.body.get('payload_json'));
  assert.match(payload.content, /channels\/@me\/chan1\/m1/);
  edit().time -= PENDING_MS + 1;
  assert.equal((await call('/api/post?channel=chan1', { method: 'POST', headers: auth, body: PNG })).status, 409);
  // and if Discord says the token is gone, the same answer
  edit().time = Date.now();
  edit().token = 'expired';
  assert.equal((await call('/api/post?channel=chan1', { method: 'POST', headers: auth, body: PNG })).status, 409);
});

test('the file is fetched with a User-Agent; when the CDN refuses it, the media proxy is tried', async () => {
  const real = globalThis.fetch, seen = [];
  globalThis.fetch = async (url, init = {}) => {
    const u = String(url);
    if (u.startsWith('https://cdn.discordapp.com/')) { seen.push(['cdn', new Headers(init.headers).get('user-agent')]); return new Response('no', { status: 403 }); }
    if (u.startsWith('https://media.discordapp.net/')) { seen.push(['proxy']); return new Response(PNG, { headers: { 'content-type': 'image/png' } }); }
    return real(url, init);
  };
  await worker.fetch(await signed(editImage([{ url: 'https://cdn.discordapp.com/a/cat.png', proxy_url: 'https://media.discordapp.net/a/cat.png', filename: 'cat.png', content_type: 'image/png' }])), env);
  const r = await worker.fetch(new Request('https://w/api/pending?channel=chan1', { headers: { authorization: 'Bearer tok-ann' } }), env);
  assert.equal(r.status, 200);
  assert.deepEqual(new Uint8Array(await r.arrayBuffer()), PNG);
  assert.equal(seen[0][0], 'cdn');
  assert.match(seen[0][1], /MosaicPaint/);
  assert.equal(seen[1][0], 'proxy');
});

test('when no address works, Discord’s answer comes back with the 410', async () => {
  const real = globalThis.fetch;
  globalThis.fetch = async (url, init = {}) => (String(url).includes('discordapp') ? new Response('gone', { status: 404 }) : real(url, init));
  await worker.fetch(await signed(editImage([{ url: 'https://cdn.discordapp.com/a/cat.png', filename: 'cat.png', content_type: 'image/png' }])), env);
  const r = await worker.fetch(new Request('https://w/api/pending?channel=chan1', { headers: { authorization: 'Bearer tok-ann' } }), env);
  assert.equal(r.status, 410);
  assert.equal((await r.json()).status, 404);
});
