// The Discord Activity's Worker (discord/src/app.ts), against a pretend Discord: signed interactions,
// the "Edit image" command, signing in, loading the picked image and posting the edited one.
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

// pretend Discord: users by token, an Activity instance, the image on its CDN, posted messages
let env, calls, realFetch;
const PNG = new Uint8Array([137, 80, 78, 71, 1, 2, 3]);
beforeEach(() => {
  env = { DISCORD_PUBLIC_KEY: publicKey, DISCORD_CLIENT_ID: 'app1', DISCORD_CLIENT_SECRET: 'secret', DISCORD_BOT_TOKEN: 'bot', PENDING: namespace() };
  calls = [];
  realFetch = globalThis.fetch;
  globalThis.fetch = async (url, init = {}) => {
    const u = String(url), auth = new Headers(init.headers).get('authorization');
    calls.push({ url: u, init });
    if (u.endsWith('/oauth2/token')) return init.body.get('code') === 'good-code' ? Response.json({ access_token: 'tok-ann' }) : new Response('', { status: 400 });
    if (u.endsWith('/users/@me')) return auth === 'Bearer tok-ann' ? Response.json({ id: 'ann' }) : new Response('', { status: 401 });
    if (u.includes('/activity-instances/inst1')) return auth === 'Bot bot' ? Response.json({ users: ['ann'], location: { channel_id: 'chan1' } }) : new Response('', { status: 401 });
    if (u.includes('/activity-instances/')) return new Response('', { status: 404 });
    if (u === 'https://cdn.example/cat.png') return new Response(PNG, { headers: { 'content-type': 'image/png' } });
    if (u.endsWith('/channels/chan1/messages')) return Response.json({ id: 'posted1' });
    return new Response('unexpected ' + u, { status: 500 });
  };
});
afterEach(() => { globalThis.fetch = realFetch; });

const editImage = (attachments) => ({
  type: 2, channel_id: 'chan1', guild_id: 'g1', member: { user: { id: 'ann' } },
  data: { type: 3, name: 'Edit image', target_id: 'm1', resolved: { messages: { m1: { id: 'm1', attachments, embeds: [] } } } },
});
const call = (path, init) => worker.fetch(new Request('https://w' + path, init), env);

test('only requests signed by Discord are answered', async () => {
  assert.equal((await worker.fetch(await signed({ type: 1 }, { tamper: true }), env)).status, 401);
  assert.equal((await worker.fetch(new Request('https://w/interactions', { method: 'POST', body: '{}' }), env)).status, 401);
  assert.deepEqual(await (await worker.fetch(await signed({ type: 1 }), env)).json(), { type: 1 });
  assert.equal(await verifySignature(publicKey, 'zz', '1', 'x'), false);
});

test('"Edit image" notes the image as the user’s pending edit and opens the Activity', async () => {
  const r = await worker.fetch(await signed(editImage([{ url: 'https://cdn.example/cat.png', filename: 'cat.png', content_type: 'image/png' }])), env);
  assert.deepEqual(await r.json(), { type: 12 });
  const p = env.PENDING.objects.get('ann').data.get('edit');
  assert.equal(p.channelId, 'chan1');
  assert.equal(p.messageId, 'm1');
  assert.equal(p.url, 'https://cdn.example/cat.png');
  // a message without an image: a note only the user sees
  const none = await (await worker.fetch(await signed(editImage([{ url: 'x', filename: 'a.txt', content_type: 'text/plain' }])), env)).json();
  assert.equal(none.type, 4);
  assert.equal(none.data.flags, 64);
});

test('signing in, then loading the picked image in the same channel only', async () => {
  await worker.fetch(await signed(editImage([{ url: 'https://cdn.example/cat.png', filename: 'cat 1.png', content_type: 'image/png' }])), env);
  assert.equal((await call('/api/token', { method: 'POST', body: JSON.stringify({ code: 'bad' }) })).status, 401);
  const { access_token } = await (await call('/api/token', { method: 'POST', body: JSON.stringify({ code: 'good-code' }) })).json();
  assert.equal(access_token, 'tok-ann');
  const tokenCall = calls.find(c => c.url.endsWith('/oauth2/token'));
  assert.equal(tokenCall.init.body.get('client_secret'), 'secret');
  const auth = { authorization: 'Bearer tok-ann' };
  assert.equal((await call('/api/pending?channel=chan1')).status, 401);
  assert.equal((await call('/api/pending?channel=other', { headers: auth })).status, 204);
  const img = await call('/api/pending?channel=chan1', { headers: auth });
  assert.equal(img.status, 200);
  assert.deepEqual(new Uint8Array(await img.arrayBuffer()), PNG);
  assert.equal(decodeURIComponent(img.headers.get('x-filename')), 'cat 1.png');
  // too old: gone
  env.PENDING.objects.get('ann').data.get('edit').time -= PENDING_MS + 1;
  assert.equal((await call('/api/pending?channel=chan1', { headers: auth })).status, 204);
});

test('posting: only from inside the channel’s Activity; a reply to the picked message', async () => {
  await worker.fetch(await signed(editImage([{ url: 'https://cdn.example/cat.png', filename: 'cat.png', content_type: 'image/png' }])), env);
  const auth = { authorization: 'Bearer tok-ann' };
  assert.equal((await call('/api/post?channel=chan1&instance=nope', { method: 'POST', headers: auth, body: PNG })).status, 403);
  assert.equal((await call('/api/post?channel=chan2&instance=inst1', { method: 'POST', headers: auth, body: PNG })).status, 403);
  const r = await call('/api/post?channel=chan1&instance=inst1', { method: 'POST', headers: auth, body: PNG });
  assert.deepEqual(await r.json(), { ok: true, messageId: 'posted1' });
  const sent = calls.find(c => c.url.endsWith('/channels/chan1/messages'));
  assert.equal(new Headers(sent.init.headers).get('authorization'), 'Bot bot');
  const payload = JSON.parse(sent.init.body.get('payload_json'));
  assert.equal(payload.content, 'Edited by <@ann>');
  assert.deepEqual(payload.allowed_mentions, { parse: [] });
  assert.equal(payload.message_reference.message_id, 'm1');
  assert.deepEqual(new Uint8Array(await sent.init.body.get('files[0]').arrayBuffer()), PNG);
  // the pending edit is done
  assert.equal(env.PENDING.objects.get('ann').data.has('edit'), false);
});
