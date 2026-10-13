// The AI add-ons for real: downloads the engine and the models (about 90 MB) and runs them in the browser.
// Skipped unless REAL_AI=1 (not in CI): REAL_AI=1 npx playwright test tests/e2e/ai-real.spec.js --project=desktop
const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;

test.skip(!process.env.REAL_AI, 'downloads the real models – run with REAL_AI=1');
test.setTimeout(600000);

const ball = () => {
  RZ.blank(320, 240);
  const x = RZ.doc.getContext('2d');
  for (let y = 0; y < 240; y++) for (let i = 0; i < 320; i++) { const n = (Math.sin(i * 1.7) * Math.cos(y * 2.3) + 1) * 15; x.fillStyle = `rgb(${90 + n},${120 + n},${90 + n})`; x.fillRect(i, y, 1, 1); }
  const g = x.createRadialGradient(140, 100, 5, 160, 120, 60);
  g.addColorStop(0, '#ff6050'); g.addColorStop(1, '#801010');
  x.fillStyle = g; x.beginPath(); x.arc(160, 120, 60, 0, 7); x.fill();
  RZ.commit();
};
const tap = (page, x, y) => page.evaluate(([x, y]) => {
  const p = RZ.screen(x, y), v = document.querySelector('#view');
  for (const k of ['pointerdown', 'pointerup']) v.dispatchEvent(new PointerEvent(k, { bubbles: true, pointerId: 1, pointerType: 'mouse', clientX: p.x, clientY: p.y, button: 0, buttons: k === 'pointerdown' ? 1 : 0, isPrimary: true }));
}, [x, y]);
async function agree(page) {
  const d = page.locator('#dlg-addon');
  await expect(d).toBeVisible({ timeout: 20000 });
  await expect(d).toContainText('MB');
  await d.locator('button[value=ok]').click();
}

for (const engine of ['webgpu', 'cpu']) test(`the add-ons, downloaded and run for real (${engine})`, async ({ page }) => {
  if (engine === 'cpu') await page.addInitScript(() => { window.__noWebGPU = true; });
  page.on('console', m => console.log('console:', m.type(), m.text()));
  page.on('pageerror', e => console.log('pageerror:', e.message));
  page.on('requestfailed', r => console.log('failed:', r.url().slice(0, 120), r.failure()?.errorText));
  // every status message, as it comes
  await page.addInitScript(() => addEventListener('DOMContentLoaded', () => new MutationObserver(() => console.log('status:', document.querySelector('#st-msg')?.textContent)).observe(document.querySelector('#st-msg'), { childList: true, characterData: true, subtree: true })));
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.evaluate(ball);
  await page.click('#btn-fit');

  // Select object: tap the ball
  await h.key(page, 'v');
  await page.locator('#sel-shape button[data-shape=object]').click();
  await tap(page, 160, 120);
  await agree(page);
  await expect.poll(() => page.evaluate(() => !!RZ.state.sel), { timeout: 300000 }).toBe(true);
  const sel = await page.evaluate(() => ({ x: RZ.state.sel.x, y: RZ.state.sel.y, w: RZ.state.sel.w, h: RZ.state.sel.h }));
  console.log('object box', sel);
  expect(Math.abs(sel.x - 100)).toBeLessThan(8);
  expect(Math.abs(sel.w - 120)).toBeLessThan(14);

  // AI removal of the selected ball
  await page.evaluate(() => { RZ.state.removeMethod = 'ai'; });
  await page.click('#btn-sel-fill');
  await agree(page);
  await expect(page.locator('#st-msg')).toContainText('Removed', { timeout: 300000 });
  const mid = await page.evaluate(() => RZ.colorAt(160, 120));
  console.log('after AI removal', mid);
  expect(parseInt(mid.slice(3, 5), 16)).toBeGreaterThan(parseInt(mid.slice(1, 3), 16)); // greener than red

  // background removal: any subject – the ball stays, the corner goes
  await page.evaluate(ball);
  await page.click('#btn-bg');
  await page.locator('#dlg-bg input[value=u2netp]').check();
  await page.locator('#dlg-bg button[value=remove]').click();
  await agree(page);
  await expect(page.locator('#st-msg')).toContainText('Background removed', { timeout: 300000 });
  expect(await page.evaluate(() => [RZ.colorAt(160, 120) !== null, RZ.colorAt(3, 3)])).toEqual([true, null]);

  // read text
  await page.evaluate(() => { RZ.blank(600, 160); const x = RZ.doc.getContext('2d'); x.fillStyle = '#000'; x.font = 'bold 72px sans-serif'; x.fillText('HELLO 2026', 40, 110); RZ.commit(); });
  await page.click('#btn-ocr');
  await agree(page);
  await expect(page.locator('#dlg-ocr')).toBeVisible({ timeout: 300000 });
  const text = await page.locator('#dlg-ocr .ocr-text').inputValue();
  console.log('read:', JSON.stringify(text));
  expect(text).toContain('HELLO');
  await page.keyboard.press('Escape');

  // depth relief
  await page.evaluate(ball);
  await page.click('#btn-relief');
  await page.locator('#dlg-relief input[value=depth]').check();
  await agree(page);
  await expect.poll(() => page.evaluate(() => document.querySelector('#dlg-relief .rl-preview').width), { timeout: 300000 }).toBeGreaterThan(50);
  const [download] = await Promise.all([page.waitForEvent('download'), page.locator('#dlg-relief .rl-go').click()]);
  expect(download.suggestedFilename()).toBe('relief.stl');

  // the Add-ons list shows them installed; one can be removed again
  await page.keyboard.press('Escape');
  await page.locator('summary', { hasText: 'Add-ons' }).click();
  await expect(page.locator('#addons .addon-remove').first()).toBeVisible();
  console.log('engine', engine);
});
