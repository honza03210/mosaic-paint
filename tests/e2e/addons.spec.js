// Add-ons (raster): nothing is downloaded before the user agrees to a dialog that says how much; downloads are
// kept and can be removed; the features use them. The downloads are stand-ins here (no real models) and the
// AI is a stand-in too (window.__aiStub) – tests/e2e/ai-real.spec.js runs the real ones.
const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;

async function setup(page) {
  const fetched = [];
  // every add-on file: a few bytes instead of megabytes
  await page.route(/huggingface\.co|cdn\.jsdelivr\.net/, (r) => { fetched.push(r.request().url()); return r.fulfill({ body: Buffer.alloc(64, 7), contentType: 'application/octet-stream' }); });
  await page.addInitScript(() => {
    // the AI: a disc for "the object", green for a fill, the disc as the subject, depth from left to right
    window.__aiCalls = [];
    window.__aiStub = (op, a) => {
      window.__aiCalls.push(op);
      if (op === 'msamMask') { const { w, h } = window.__samSize; const m = new Uint8Array(w * h); for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) m[y * w + x] = Math.hypot(x - w / 2, y - h / 2) < w / 4 ? 255 : 0; return m; }
      if (op === 'msamEncode') { window.__samSize = { w: a.img.width, h: a.img.height }; return true; }
      if (op === 'inpaint') { const d = new Uint8ClampedArray(a.img.data.length); for (let i = 0; i < d.length; i += 4) d.set([0, 200, 0, 255], i); return d; }
      if (op === 'matte') { const { width: w, height: h } = a.img, m = new Uint8Array(w * h); for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) m[y * w + x] = Math.hypot(x - w / 2, y - h / 2) < w / 4 ? 255 : 0; return m; }
      if (op === 'depth') { const { width: w, height: h } = a.img, d = new Float32Array(w * h); for (let i = 0; i < d.length; i++) d[i] = (i % w) / w; return d; }
      return op === 'has' ? false : true;
    };
    window.__ocrStub = { recognize: async () => 'HELLO from the stand-in' };
  });
  page.on('console', m => { if (/addon-dialog|error/i.test(m.text())) console.log('page:', m.text()); });
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  // (for a stuck test: every add-on question, as it comes)
  await page.evaluate(() => new MutationObserver(() => { const d = document.querySelector('#dlg-addon'); if (d?.open) console.log('addon-dialog: ' + d.textContent.slice(0, 60)); }).observe(document.body, { subtree: true, attributes: true, attributeFilter: ['open'] }));
  await page.evaluate(() => { RZ.blank(200, 100, '#808080'); });
  await page.click('#btn-fit');
  return fetched;
}
const tap = (page, x, y) => page.evaluate(([x, y]) => {
  const p = RZ.screen(x, y), v = document.querySelector('#view');
  for (const k of ['pointerdown', 'pointerup']) v.dispatchEvent(new PointerEvent(k, { bubbles: true, pointerId: 1, pointerType: 'mouse', clientX: p.x, clientY: p.y, button: 0, buttons: k === 'pointerdown' ? 1 : 0, isPrimary: true }));
}, [x, y]);

test('Select object: asks first (with the size), downloads only after OK, then selects; Add-ons lists and removes it', async ({ page }) => {
  const fetched = await setup(page);
  await h.key(page, 'v');
  await page.locator('#sel-shape button[data-shape=object]').click();
  await tap(page, 100, 50);
  const d = page.locator('#dlg-addon');
  await expect(d).toBeVisible();
  await expect(d).toContainText('MB');
  await expect(d).toContainText('AI engine');
  // Cancel: nothing downloaded, nothing selected
  await d.locator('button[value=cancel]').click();
  await expect(d).toBeHidden();
  expect(fetched.length).toBe(0);
  expect(await page.evaluate(() => RZ.state.sel)).toBe(null);
  // OK: downloaded, then the object is selected
  await tap(page, 100, 50);
  await d.locator('button[value=ok]').click();
  await expect.poll(() => page.evaluate(() => !!RZ.state.sel)).toBe(true);
  expect(fetched.length).toBe(3); // the engine and the two parts of the model
  expect(await page.evaluate(() => window.__aiCalls)).toEqual(expect.arrayContaining(['init', 'load', 'msamEncode', 'msamMask']));
  // a second tap needs no download and no new encoding of the same picture
  await tap(page, 100, 50);
  expect(fetched.length).toBe(3);
  expect(await page.evaluate(() => window.__aiCalls.filter(c => c === 'msamEncode').length)).toBe(1);
  // the list in the side panel
  await page.locator('summary', { hasText: 'Add-ons' }).click();
  const row = page.locator('#addons .addon-row[data-id=select]');
  await expect(row).toContainText('installed');
  await row.locator('.addon-remove').click();
  await expect(row.locator('.addon-get')).toBeVisible();
  expect(await page.evaluate(async () => { try { return (await (await caches.open('mosaic-paint-addons-1')).keys()).length; } catch { return 0; } })).toBe(0);
});

test('background removal, AI fill for Remove, Read text and the 3D relief', async ({ page }) => {
  await setup(page);
  // background removal: the stand-in's disc stays, the rest goes transparent
  await page.click('#btn-bg');
  await page.locator('#dlg-bg button[value=remove]').click();
  await page.locator('#dlg-addon button[value=ok]').click();
  await expect(page.locator('#st-msg')).toContainText('Background removed');
  expect(await page.evaluate(() => [RZ.colorAt(100, 50), RZ.colorAt(2, 2)])).toEqual(['#808080', null]);
  // Remove with the AI: choosing it asks for its download (cancelled: back to the built-in fill)
  await h.key(page, 'r');
  await page.locator('#opt-remove-method').selectOption('ai');
  await page.locator('#dlg-addon button[value=cancel]').click();
  await expect.poll(() => page.locator('#opt-remove-method').inputValue()).toBe('builtin');
  await page.locator('#opt-remove-method').selectOption('ai');
  await page.locator('#dlg-addon button[value=ok]').click();
  await expect.poll(() => page.evaluate(() => RZ.state.removeMethod)).toBe('ai');
  await page.evaluate(() => { RZ.state.size = 10; });
  await tap(page, 100, 50);
  await expect(page.locator('#st-msg')).toContainText('Removed');
  expect(await page.evaluate(() => RZ.colorAt(100, 50))).toBe('#00c800');
  // Read text
  await page.click('#btn-ocr');
  await page.locator('#dlg-addon button[value=ok]').click();
  await expect(page.locator('#dlg-ocr')).toBeVisible();
  await expect(page.locator('#dlg-ocr .ocr-text')).toHaveValue('HELLO from the stand-in');
  await page.keyboard.press('Escape');
  // 3D relief from brightness: no download; from depth: asks
  await page.click('#btn-relief');
  const rd = page.locator('#dlg-relief');
  await expect(rd).toBeVisible();
  await expect.poll(() => page.evaluate(() => document.querySelector('#dlg-relief .rl-preview').width)).toBeGreaterThan(50);
  await expect(rd.locator('.rl-info')).toContainText('100 × 50 mm');
  const [download] = await Promise.all([page.waitForEvent('download'), rd.locator('.rl-go').click()]);
  expect(download.suggestedFilename()).toBe('relief.stl');
  const stl = require('fs').readFileSync(await download.path());
  // binary STL: 80-byte header, the triangle count, 50 bytes per triangle
  expect(stl.length).toBe(84 + 50 * stl.readUInt32LE(80));
  await rd.locator('input[value=depth]').check();
  await page.locator('#dlg-addon button[value=ok]').click();
  await expect.poll(() => page.evaluate(() => window.__aiCalls.includes('depth'))).toBe(true);
});
