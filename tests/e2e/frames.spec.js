// GIFs and videos open as a chosen frame: the raster app (Open… with a GIF, a video), and inside Discord an
// animated GIF picked in the chat, in both apps.
const { test } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const h = require('./helpers');
const { expect } = h;

const gif = (name) => fs.readFileSync(path.join(__dirname, '..', 'fixtures', 'gif', name));

test('a GIF: choose its third frame (the red square has moved)', async ({ page }) => {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.setInputFiles('#file-input', { name: 'moving.gif', mimeType: 'image/gif', buffer: gif('moving.gif') });
  const d = page.locator('#dlg-frame');
  await expect(d).toBeVisible();
  await expect(d.locator('.fr-label')).toContainText('1');
  await expect(d.locator('.fr-slider')).toHaveAttribute('max', '3');
  // step forward twice: frame 3
  await d.locator('.fr-next').click();
  await d.locator('.fr-next').click();
  await expect(d.locator('.fr-label')).toContainText('3');
  await d.locator('.fr-ok').click();
  await expect.poll(() => page.evaluate(() => [RZ.doc.width, RZ.doc.height])).toEqual([40, 30]);
  // frame 3 has the square at x 19…28 (frame 1 had it at 5…14)
  expect(await page.evaluate(() => [RZ.colorAt(22, 12), RZ.colorAt(8, 12)])).toEqual(['#c81e1e', '#f0f0c8']);
});

test('a GIF with one frame opens at once; Cancel opens nothing', async ({ page }) => {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.setInputFiles('#file-input', { name: 'interlaced.gif', mimeType: 'image/gif', buffer: gif('interlaced.gif') });
  await page.locator('#dlg-frame .fr-cancel').click();
  await expect(page.locator('#dlg-frame')).toBeHidden();
  expect(await page.evaluate(() => RZ.doc.width)).not.toBe(33);
});

test('a video: the slider picks the time; the frame there opens', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'the test video is recorded with MediaRecorder (WebM)');
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  // a 1.2 s video: red, then blue from 0.6 s
  const bytes = await page.evaluate(async () => {
    const c = document.createElement('canvas'); c.width = 64; c.height = 48;
    const x = c.getContext('2d'), rec = new MediaRecorder(c.captureStream(30), { mimeType: 'video/webm' }), parts = [];
    rec.ondataavailable = (e) => parts.push(e.data);
    const t0 = performance.now();
    rec.start();
    await new Promise((resolve) => { const draw = () => { const t = performance.now() - t0; x.fillStyle = t < 600 ? '#ff0000' : '#0000ff'; x.fillRect(0, 0, 64, 48); if (t < 1200) requestAnimationFrame(draw); else resolve(); }; draw(); });
    await new Promise((resolve) => { rec.onstop = resolve; rec.stop(); });
    return [...new Uint8Array(await new Blob(parts).arrayBuffer())];
  });
  await page.setInputFiles('#file-input', { name: 'clip.webm', mimeType: 'video/webm', buffer: Buffer.from(bytes) });
  const d = page.locator('#dlg-frame');
  await expect(d).toBeVisible();
  await expect(d.locator('.fr-video')).toBeVisible();
  await expect(d.locator('.fr-label')).toContainText(' s');
  // near the end: blue
  const max = +(await d.locator('.fr-slider').getAttribute('max'));
  expect(max).toBeGreaterThan(20);
  await d.locator('.fr-slider').fill(String(max - 3));
  await d.locator('.fr-ok').click();
  await expect.poll(() => page.evaluate(() => RZ.doc.width)).toBe(64);
  const c = await page.evaluate(() => RZ.colorAt(32, 24));
  expect(parseInt(c.slice(5, 7), 16)).toBeGreaterThan(150); // blue
});

/** The Discord SDK and the Worker, pretended (as in activity.spec.js) – the chat's file is a GIF. */
async function discord(page) {
  await page.addInitScript(() => {
    window.__discordSdk = { channelId: 'chan1', ready: async () => {}, commands: { authorize: async () => ({ code: 'c' }), authenticate: async () => ({}) }, close: () => {} };
  });
  await page.route('**/api/config', r => r.fulfill({ json: { clientId: 'app1' } }));
  await page.route('**/api/token', r => r.fulfill({ json: { access_token: 'tok' } }));
  await page.route('**/api/pending**', r => r.fulfill({ body: gif('moving.gif'), headers: { 'content-type': 'image/gif', 'x-filename': 'dance.gif' } }));
}

test('Discord: a GIF from the chat – choose a frame, it opens to edit', async ({ page }) => {
  await discord(page);
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && RZ.ready);
  const d = page.locator('#dlg-frame');
  await expect(d).toBeVisible();
  await d.locator('.fr-slider').fill('3');
  await d.locator('.fr-ok').click();
  await expect.poll(() => page.evaluate(() => RZ.doc.width)).toBe(40);
  expect(await page.evaluate(() => RZ.colorAt(30, 12))).toBe('#c81e1e'); // frame 4: the square at 26…35
});

test('Discord, vector app: the chosen frame becomes the photo to draw on', async ({ page }) => {
  await discord(page);
  await page.goto('index.html?frame_id=f1');
  await page.waitForFunction(() => window.MZ && MZ.ready);
  const d = page.locator('#dlg-frame');
  await expect(d).toBeVisible();
  await d.locator('.fr-ok').click();
  await expect.poll(() => page.evaluate(() => !!MZ.refImage())).toBe(true);
  expect(await page.evaluate(() => [MZ.state.doc.w, MZ.state.doc.h])).toEqual([40, 30]);
});
