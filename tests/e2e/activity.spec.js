// The raster editor as a Discord Activity, with a stand-in for the Discord SDK and the Worker's API:
// it signs in, opens the image picked in the chat, and posts the edited picture to the channel.
const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;

/** A stand-in for the Discord SDK (the real one talks to the Discord client around the iframe). */
const fakeSdk = () => {
  window.__closed = null;
  window.__discordSdk = {
    channelId: 'chan1', instanceId: 'inst1',
    ready: async () => {},
    commands: {
      authorize: async (a) => { window.__authorized = a; return { code: 'good-code' }; },
      authenticate: async ({ access_token }) => ({ access_token, user: { id: 'ann' } }),
    },
    close: (code, why) => { window.__closed = [code, why]; },
  };
};

async function api(page, { pending = true } = {}) {
  const posted = [];
  await page.route('**/api/config', r => r.fulfill({ json: { clientId: 'app1' } }));
  await page.route('**/api/token', r => r.fulfill({ json: { access_token: 'tok-ann' } }));
  await page.route('**/api/pending**', r => {
    expect(r.request().headers().authorization).toBe('Bearer tok-ann');
    expect(new URL(r.request().url()).searchParams.get('channel')).toBe('chan1');
    if (!pending) return r.fulfill({ status: 204 });
    return r.fulfill({ body: h.png(40, 30, (x) => (x < 20 ? [200, 30, 30] : [30, 30, 200])), headers: { 'content-type': 'image/png', 'x-filename': encodeURIComponent('cat photo.png') } });
  });
  await page.route('**/api/post**', r => { posted.push({ url: r.request().url(), body: r.request().postDataBuffer(), auth: r.request().headers().authorization, type: r.request().headers()['content-type'] }); return r.fulfill({ json: { ok: true, messageId: 'posted1' } }); });
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
  await expect(page.locator('.app-switch')).toBeHidden();
  await expect(page.locator('#btn-share')).toBeHidden();
  // draw on it, then post
  await page.evaluate(() => { const x = RZ.doc.getContext('2d'); x.fillStyle = '#00ff00'; x.fillRect(0, 0, 5, 5); RZ.commit(); });
  await page.click('#btn-post-discord');
  await expect(page.locator('#st-msg')).toContainText('Posted to the channel.');
  expect(posted.length).toBe(1);
  const u = new URL(posted[0].url);
  expect([u.searchParams.get('channel'), u.searchParams.get('instance')]).toEqual(['chan1', 'inst1']);
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

test('outside Discord nothing changes', async ({ page }) => {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && RZ.ready);
  await page.waitForTimeout(300);
  await expect(page.locator('#btn-post-discord')).toHaveCount(0);
  expect(await page.evaluate(() => [...document.scripts].some(s => /activity\.js/.test(s.src)))).toBe(false);
});
