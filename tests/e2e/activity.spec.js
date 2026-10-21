// The raster editor as a Discord Activity, with a stand-in for the Discord SDK and the Worker's API:
// it signs in, opens the image picked in the chat, and posts the edited picture to the channel.
const fs = require('fs');
const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;

/** A stand-in for the Discord SDK (the real one talks to the Discord client around the iframe). */
const fakeSdk = () => {
  window.__closed = null;
  window.__discordSdk = {
    channelId: 'chan1',
    ready: async () => {},
    commands: {
      authorize: async (a) => { window.__authorized = a; return { code: 'good-code' }; },
      authenticate: async ({ access_token }) => ({ access_token, user: { id: 'ann' } }),
    },
    close: (code, why) => { window.__closed = [code, why]; },
  };
};

async function api(page, { pending = true, postStatus = 200 } = {}) {
  const posted = [];
  await page.route('**/api/config**', r => r.fulfill({ json: { clientId: 'app1' } }));
  await page.route('**/api/token**', r => r.fulfill({ json: { access_token: 'tok-ann' } }));
  await page.route('**/api/pending**', r => {
    expect(r.request().headers().authorization).toBe('Bearer tok-ann');
    expect(new URL(r.request().url()).searchParams.get('channel')).toBe('chan1');
    if (!pending) return r.fulfill({ status: 204 });
    return r.fulfill({ body: h.png(40, 30, (x) => (x < 20 ? [200, 30, 30] : [30, 30, 200])), headers: { 'content-type': 'image/png', 'x-filename': encodeURIComponent('cat photo.png') } });
  });
  await page.route('**/api/post**', r => { posted.push({ url: r.request().url(), body: r.request().postDataBuffer(), auth: r.request().headers().authorization, type: r.request().headers()['content-type'] }); return r.fulfill(postStatus === 200 ? { json: { ok: true, messageId: 'posted1' } } : { status: postStatus, json: { error: 'x' } }); });
  return posted;
}

test('opens the image picked in the chat and posts the edited picture back', async ({ page }) => {
  await page.addInitScript(fakeSdk);
  const posted = await api(page);
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && RZ.ready);
  // signed in with the identify scope, the picked image opened
  await expect(page.locator('#btn-post-discord')).toBeVisible();
  await expect.poll(() => page.evaluate(() => [RZ.doc.width, RZ.doc.height])).toEqual([40, 30]);
  expect(await page.evaluate(() => window.__authorized.scope)).toEqual(['identify']);
  await expect(page.locator('body')).toHaveClass(/in-discord/);
  await expect(page.locator('.app-switch')).toBeVisible(); // to the vector app, inside Discord too
  await expect(page.locator('#btn-share')).toBeHidden();
  // draw on it, then post
  await page.evaluate(() => { const x = RZ.doc.getContext('2d'); x.fillStyle = '#00ff00'; x.fillRect(0, 0, 5, 5); RZ.commit(); });
  await page.click('#btn-post-discord');
  await expect(page.locator('#st-msg')).toContainText('Posted to the channel.');
  expect(posted.length).toBe(1);
  const u = new URL(posted[0].url);
  expect(u.searchParams.get('channel')).toBe('chan1');
  expect(posted[0].auth).toBe('Bearer tok-ann');
  expect(posted[0].type).toBe('image/png');
  // (WebKit does not show tests the bytes of a Blob it sends)
  if (posted[0].body) expect(posted[0].body.subarray(1, 4).toString('latin1')).toBe('PNG');
  // the Activity closes itself
  await expect.poll(() => page.evaluate(() => window.__closed)).toEqual([1000, 'posted']);
});

test('without a picked image it says how to pick one, and the editor works as usual', async ({ page }) => {
  await page.addInitScript(fakeSdk);
  await api(page, { pending: false });
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && RZ.ready);
  await expect(page.locator('#st-msg')).toContainText('Apps › Edit image');
  await expect(page.locator('#btn-post-discord')).toBeVisible();
});

test('after Discord’s 15 minutes it says to copy and paste instead', async ({ page }) => {
  await page.addInitScript(fakeSdk);
  await api(page, { postStatus: 409 });
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && RZ.ready);
  await expect.poll(() => page.evaluate(() => RZ.doc.width)).toBe(40);
  await page.click('#btn-post-discord');
  await expect(page.locator('#st-msg')).toContainText('More than 15 minutes have passed');
  await expect(page.locator('#btn-post-discord')).toBeEnabled();
  expect(await page.evaluate(() => window.__closed)).toBe(null);
});

test('outside Discord nothing changes', async ({ page }) => {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && RZ.ready);
  await page.waitForTimeout(300);
  await expect(page.locator('#btn-post-discord')).toHaveCount(0);
  expect(await page.evaluate(() => [...document.scripts].some(s => /activity\.js/.test(s.src)))).toBe(false);
});

test('vector mode inside Discord: the picture opens as the photo to draw on; the app switch keeps the connection', async ({ page }) => {
  await page.addInitScript(fakeSdk);
  const posted = await api(page);
  await page.goto('index.html?frame_id=f1&instance_id=i1');
  await page.waitForFunction(() => window.MZ && MZ.ready);
  await expect(page.locator('#btn-post-discord')).toBeVisible();
  // a drawing the size of the picture, the picture as the fully visible photo
  await expect.poll(() => page.evaluate(() => !!MZ.refImage())).toBe(true);
  expect(await page.evaluate(() => [MZ.state.doc.w, MZ.state.doc.h, MZ.state.refOpacity])).toEqual([40, 30, 1]);
  // the app switch leads to the other app with Discord's details
  await expect(page.locator('.app-switch a', { hasText: 'Raster' })).toHaveAttribute('href', /index\.html\?frame_id=f1&instance_id=i1$/);
  await expect(page.locator('.app-switch a', { hasText: 'Vector' })).toHaveAttribute('href', /vector\.html\?frame_id=f1&instance_id=i1$/);
  await page.click('#btn-post-discord');
  await expect(page.locator('#st-msg')).toContainText('Posted to the channel.');
  expect(posted[0].type).toBe('image/png');
  // the posted picture is the photo with the drawing: red on the left, as the photo is
  if (posted[0].body) {
    const png = posted[0].body;
    expect(png.subarray(1, 4).toString('latin1')).toBe('PNG');
    expect(png.readUInt32BE(16)).toBe(40); // width
  }
});

test('switching apps – even before signing in has finished – keeps the connection and the post button', async ({ page }) => {
  await h.expert(page);
  await page.addInitScript(fakeSdk);
  await api(page);
  // sign-in takes a while, so the app switch is clicked before it is done
  await page.unroute('**/api/config**');
  await page.route('**/api/config**', async r => { await new Promise(res => setTimeout(res, 1500)); await r.fulfill({ json: { clientId: 'app1' } }); });
  // the pages as the Worker serves them (discord/prepare.mjs): the raster app as index.html, the vector app as vector.html
  const served = (file) => fs.readFileSync(file, 'utf8')
    .replace('href="index.html" data-app="vector"', 'href="vector.html" data-app="vector"')
    .replace('href="raster.html" data-app="raster"', 'href="index.html" data-app="raster"');
  await page.route(/\/vector\.html/, r => r.fulfill({ body: served('index.html'), contentType: 'text/html' }));
  await page.route(/\/index\.html/, r => r.fulfill({ body: served('raster.html'), contentType: 'text/html' }));
  const where = () => page.evaluate(() => [location.pathname.split('/').pop(), new URLSearchParams(location.search).get('frame_id')]);
  await page.goto('index.html?frame_id=f1&instance_id=i1');
  await page.waitForFunction(() => window.RZ && RZ.ready);
  await page.click('.app-switch a:has-text("Vector")');
  await page.waitForFunction(() => window.MZ && MZ.ready);
  expect(await where()).toEqual(['vector.html', 'f1']);
  await page.click('.app-switch a:has-text("Raster")');
  await page.waitForFunction(() => window.RZ && RZ.ready);
  expect(await where()).toEqual(['index.html', 'f1']);
  await expect(page.locator('#btn-post-discord')).toBeVisible({ timeout: 10000 });
  // a page opened without Discord's details (a reload by hand) gets them back from this tab
  await page.goto('index.html');
  await page.waitForFunction(() => window.RZ && RZ.ready);
  await expect(page.locator('#btn-post-discord')).toBeVisible({ timeout: 10000 });
  expect(await where()).toEqual(['index.html', 'f1']);
});
