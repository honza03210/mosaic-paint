// The Discord Worker with GIFs and videos: what "Edit image" takes from a message (attachments, Tenor / Giphy
// embeds, pictures, video links' stills), and the signed, short-lived address a video's player loads from.
import { test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import worker, { pickMedia, mediaAddress } from '../../discord/src/app.ts';

test('the first image, GIF or video attachment', () => {
  assert.deepEqual(pickMedia({ attachments: [{ url: 'https://cdn.discordapp.com/a/doc.pdf', content_type: 'application/pdf' }, { url: 'https://cdn.discordapp.com/a/clip.mp4', filename: 'clip.mp4', content_type: 'video/mp4' }] }),
    { url: 'https://cdn.discordapp.com/a/clip.mp4', filename: 'clip.mp4', contentType: 'video/mp4', alt: null });
  assert.equal(pickMedia({ attachments: [{ url: 'https://cdn.discordapp.com/a/x.png', proxy_url: 'https://media.discordapp.net/a/x.png', content_type: 'image/png' }] }).alt, 'https://media.discordapp.net/a/x.png');
  assert.equal(pickMedia({ attachments: [{ url: 'https://cdn.discordapp.com/a/x.gif', filename: 'x.gif', content_type: 'image/gif' }] }).contentType, 'image/gif');
});

test('a big photo is fetched scaled to 2000 px by the media proxy (the original as the second try); small ones and GIFs as they are', () => {
  const big = pickMedia({ attachments: [{ url: 'https://cdn.discordapp.com/a/p.jpg?ex=1&hm=2', proxy_url: 'https://media.discordapp.net/a/p.jpg?ex=1&hm=2', content_type: 'image/jpeg', width: 4032, height: 3024, filename: 'p.jpg' }] });
  assert.equal(big.url, 'https://media.discordapp.net/a/p.jpg?ex=1&hm=2&width=2000&height=1500');
  assert.equal(big.alt, 'https://cdn.discordapp.com/a/p.jpg?ex=1&hm=2');
  assert.equal(pickMedia({ attachments: [{ url: 'https://cdn.discordapp.com/a/s.png', proxy_url: 'https://media.discordapp.net/a/s.png', content_type: 'image/png', width: 800, height: 600 }] }).url, 'https://cdn.discordapp.com/a/s.png');
  assert.equal(pickMedia({ attachments: [{ url: 'https://cdn.discordapp.com/a/g.gif', proxy_url: 'https://media.discordapp.net/a/g.gif', content_type: 'image/gif', width: 4000, height: 3000 }] }).url, 'https://cdn.discordapp.com/a/g.gif');
});

test('embeds: a Tenor "GIF" is its video; a picture; a video link gives its still; nothing else', () => {
  const tenor = pickMedia({ attachments: [], embeds: [{ type: 'gifv', url: 'https://tenor.com/view/x', thumbnail: { url: 'https://media.tenor.com/a.png' }, video: { url: 'https://media.tenor.com/a.mp4', proxy_url: 'https://images-ext-1.discordapp.net/external/abc/https/media.tenor.com/a.mp4' } }] });
  assert.equal(tenor.url, 'https://images-ext-1.discordapp.net/external/abc/https/media.tenor.com/a.mp4');
  assert.equal(tenor.contentType, 'video/mp4');
  assert.equal(pickMedia({ embeds: [{ type: 'image', image: { url: 'https://x/p.jpg?w=1' } }] }).contentType, 'image/jpeg');
  assert.equal(pickMedia({ embeds: [{ type: 'video', url: 'https://youtube.com/watch?v=1', thumbnail: { url: 'https://i.ytimg.com/vi/1/hq.jpg' }, video: { url: 'https://youtube.com/embed/1' } }] }).url, 'https://i.ytimg.com/vi/1/hq.jpg');
  assert.equal(pickMedia({ attachments: [], embeds: [{ type: 'rich' }] }), null);
});

let realFetch, fetched;
const env = { DISCORD_CLIENT_SECRET: 'secret', DISCORD_CLIENT_ID: 'app1', DISCORD_PUBLIC_KEY: '00', PENDING: null };
beforeEach(() => {
  realFetch = globalThis.fetch;
  fetched = [];
  // Discord's CDN, with byte ranges
  globalThis.fetch = async (url, init = {}) => {
    const range = new Headers(init.headers).get('range');
    fetched.push({ url: String(url), range });
    if (range) return new Response(new Uint8Array(10), { status: 206, headers: { 'content-type': 'video/mp4', 'content-range': 'bytes 0-9/1000', 'content-length': '10' } });
    return new Response(new Uint8Array(1000), { headers: { 'content-type': 'video/mp4', 'content-length': '1000' } });
  };
});
afterEach(() => { globalThis.fetch = realFetch; });
const get = (path, headers = {}) => worker.fetch(new Request('https://w' + path, { headers }), env);

test('a signed video address plays (with byte ranges); a forged, expired or other address does not', async () => {
  const u = 'https://cdn.discordapp.com/attachments/1/2/clip.mp4', addr = await mediaAddress(env, u);
  const r = await get(addr, { range: 'bytes=0-9' });
  assert.equal(r.status, 206);
  assert.equal(r.headers.get('content-range'), 'bytes 0-9/1000');
  assert.equal(r.headers.get('accept-ranges'), 'bytes');
  assert.deepEqual(fetched, [{ url: u, range: 'bytes=0-9' }]);
  // changed address, old signature
  assert.equal((await get(addr.replace('clip.mp4', 'other.mp4'))).status, 403);
  // expired
  assert.equal((await get(await mediaAddress(env, u, Date.now() - 31 * 60 * 1000))).status, 403);
  // not Discord's media, even when signed
  assert.equal((await get(await mediaAddress(env, 'https://example.com/x.mp4'))).status, 403);
  assert.equal(fetched.length, 1);
});
