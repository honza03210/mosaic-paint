// Compressing a video in the Discord Activity: made on the device (WebCodecs, dist/compress.js), shown, and
// posted to the channel – a video from the chat (read in pieces through the Worker) or from the device.
const fs = require('fs');
const path = require('path');
const { test } = require('@playwright/test');
const { expect } = require('./helpers');

// a 1.2 s 64 × 48 video, VP8 in WebM (red, then blue)
const CLIP = fs.readFileSync(path.join(__dirname, '..', 'fixtures', 'video', 'red-then-blue.webm'));
const MB = 1024 * 1024;

test.beforeEach(({ browserName }) => {
  test.skip(browserName !== 'chromium', 'the test video is WebM (VP8); WebCodecs encoding is tested in Chromium');
});

const fakeSdk = () => {
  window.__closed = null;
  window.__discordSdk = {
    channelId: 'chan1', ready: async () => {},
    commands: { authorize: async () => ({ code: 'c' }), authenticate: async () => ({}) },
    close: (code, why) => { window.__closed = [code, why]; },
  };
};
/** The Worker, pretended: the pending command (compress), the video in byte ranges, posting. */
async function api(page, pending) {
  const posted = [], ranges = [];
  await page.route('**/api/config**', r => r.fulfill({ json: { clientId: 'app1' } }));
  await page.route('**/api/token**', r => r.fulfill({ json: { access_token: 'tok' } }));
  await page.route('**/api/pending**', r => r.fulfill({ json: pending }));
  await page.route('**/api/media**', r => {
    const m = /bytes=(\d+)-(\d*)/.exec(r.request().headers().range || '');
    ranges.push(r.request().headers().range || 'all');
    if (!m) return r.fulfill({ body: CLIP, headers: { 'content-type': 'video/webm', 'accept-ranges': 'bytes', 'content-length': String(CLIP.length) } });
    const a = +m[1], b = Math.min(CLIP.length - 1, m[2] ? +m[2] : CLIP.length - 1);
    return r.fulfill({ status: 206, body: CLIP.subarray(a, b + 1), headers: { 'content-type': 'video/webm', 'accept-ranges': 'bytes', 'content-range': `bytes ${a}-${b}/${CLIP.length}`, 'content-length': String(b - a + 1) } });
  });
  await page.route('**/api/post**', r => { posted.push({ type: r.request().headers()['content-type'], body: r.request().postDataBuffer() }); return r.fulfill({ json: { ok: true, messageId: 'p1' } }); });
  return { posted, ranges };
}

test('the compressor: reads the video, makes it again to fit, and the result is a video of the same length', async ({ page }) => {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && RZ.ready);
  await page.addScriptTag({ path: path.join(__dirname, '..', '..', 'dist', 'compress.js') });
  const r = await page.evaluate(async (bytes) => {
    const job = await window.MosaicCompress.openVideo(new Blob([new Uint8Array(bytes)], { type: 'video/webm' }));
    const info = job.info, steps = [];
    const out = await job.run(20 * 1024 * 1024, (p) => steps.push(p));
    // read the result back
    const back = await window.MosaicCompress.openVideo(out.blob);
    return { info, size: out.blob.size, type: out.type, w: back.info.width, h: back.info.height, d: back.info.duration, last: steps[steps.length - 1], rising: steps.every((p, i) => !i || p >= steps[i - 1]) };
  }, [...CLIP]);
  expect([r.info.width, r.info.height, r.info.hasAudio]).toEqual([64, 48, false]);
  expect(r.info.duration).toBeGreaterThan(1);
  expect(['video/mp4', 'video/webm']).toContain(r.type);
  expect([r.w, r.h]).toEqual([64, 48]);
  expect(Math.abs(r.d - r.info.duration)).toBeLessThan(0.2);
  expect(r.size).toBeGreaterThan(500);
  expect([r.last, r.rising]).toEqual([1, true]);
});

test('"Compress video" on a chat video: read in pieces, compressed, posted – then the Activity closes', async ({ page }) => {
  await page.addInitScript(fakeSdk);
  // (it says it is 30 MB, so it gets compressed, not posted as it is)
  const { posted, ranges } = await api(page, { mode: 'compress', filename: 'clip.webm', size: 30 * MB, media: '/api/media?u=x&exp=1&sig=s' });
  await page.goto('raster.html');
  const d = page.locator('#dlg-compress');
  await expect(d).toBeVisible();
  await expect(d.locator('.cz-src')).toContainText('clip.webm · 30 MB · 0:01 · 64 × 48', { timeout: 15000 });
  await expect(d.locator('.cz-plan')).toContainText('64 × 48');
  // the target: 20 MB, or 10
  expect(await d.locator('.cz-target option').allTextContents()).toEqual(['10 MB', '20 MB']);
  await expect(d.locator('.cz-target')).toHaveValue('20');
  // read with byte ranges, not as one download
  expect(ranges.some(r => r.startsWith('bytes='))).toBe(true);
  await d.locator('.cz-go').click();
  await expect(d.locator('.cz-post')).toBeVisible({ timeout: 30000 });
  await expect(d.locator('.cz-out')).toContainText('(was 30 MB)');
  await expect(d.locator('.cz-result')).toBeVisible();
  await d.locator('.cz-post').click();
  await expect.poll(() => posted.length).toBe(1);
  expect(['video/mp4', 'video/webm']).toContain(posted[0].type);
  await expect.poll(() => page.evaluate(() => window.__closed)).toEqual([1000, 'posted']);
});

test('a video from the device that is small enough already goes as it is; the button opens the dialog any time', async ({ page }) => {
  await page.addInitScript(fakeSdk);
  const { posted } = await api(page, { mode: 'compress', filename: 'video.mp4', size: null, media: null });
  await page.goto('raster.html');
  const d = page.locator('#dlg-compress');
  await expect(d).toBeVisible();
  await expect(d.locator('.cz-src')).toContainText('Choose a video from your device.');
  await expect(d.locator('.cz-go')).toBeDisabled();
  await d.locator('.cz-close').click();
  await expect(d).toBeHidden();
  // the top-bar button opens it again
  await page.click('#btn-compress-discord');
  await expect(d).toBeVisible();
  await d.locator('.cz-file').setInputFiles({ name: 'mine.webm', mimeType: 'video/webm', buffer: CLIP });
  await expect(d.locator('.cz-plan')).toContainText('Small enough already');
  await d.locator('.cz-go').click();
  await d.locator('.cz-post').click();
  await expect.poll(() => posted.length).toBe(1);
  expect(posted[0].type).toBe('video/webm');
  // the very same bytes
  if (posted[0].body) expect(Buffer.compare(posted[0].body, CLIP)).toBe(0);
});
