// Photo fixes (raster): the Adjust colors sheet with a live preview, and the Heal brush.
const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;

async function open(page, w = 120, hgt = 80, color = '#646464') {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.evaluate(([w, h, c]) => RZ.blank(w, h, c), [w, hgt, color]);
  await page.click('#btn-fit');
}
const at = (page, x, y) => page.evaluate(([x, y]) => RZ.colorAt(x, y), [x, y]);
const gray = (c) => parseInt(c.slice(1, 3), 16);

test('Adjust colors: the picture changes while the sliders move; Before shows the original; Apply keeps it, Cancel does not', async ({ page }) => {
  await open(page);
  await page.locator('#btn-adjust').scrollIntoViewIfNeeded();
  await page.click('#btn-adjust');
  const d = page.locator('#dlg-adjust');
  await expect(d).toBeVisible();
  await d.locator('input[data-k=brightness]').fill('40');
  await expect.poll(async () => gray(await at(page, 10, 10))).toBeGreaterThan(160);
  // hold "Before": the original
  const b = await d.locator('.adj-compare').boundingBox();
  await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
  await page.mouse.down();
  await expect.poll(() => at(page, 10, 10)).toBe('#646464');
  await page.mouse.up();
  await expect.poll(async () => gray(await at(page, 10, 10))).toBeGreaterThan(160);
  // Cancel: back to the original
  await d.locator('.adj-cancel').click();
  await expect(d).toBeHidden();
  expect(await at(page, 10, 10)).toBe('#646464');
  // Apply: kept, one undo step
  await page.click('#btn-adjust');
  await d.locator('input[data-k=contrast]').fill('60');
  await d.locator('input[data-k=brightness]').fill('-30');
  await d.locator('.adj-apply').click();
  await expect(d).toBeHidden();
  const after = gray(await at(page, 10, 10));
  expect(after).toBeLessThan(80);
  await page.click('#btn-undo');
  expect(await at(page, 10, 10)).toBe('#646464');
});

test('Adjust colors works on the selection only; Auto stretches the tones', async ({ page }) => {
  await open(page);
  await page.evaluate(() => {
    // a dull gradient: 100…140
    const x = RZ.doc.getContext('2d'), g = x.createLinearGradient(0, 0, 120, 0);
    g.addColorStop(0, '#646464'); g.addColorStop(1, '#8c8c8c');
    x.fillStyle = g; x.fillRect(0, 0, 120, 80); RZ.commit();
    RZ.state.sel = { x: 0, y: 0, w: 60, h: 80 }; RZ.selectionChanged();
  });
  const outside = await at(page, 100, 40);
  await page.click('#btn-adjust');
  const d = page.locator('#dlg-adjust');
  await d.locator('.adj-auto').click();
  await expect(d.locator('input[data-k=black]')).not.toHaveValue('0');
  await d.locator('.adj-apply').click();
  await expect(d).toBeHidden();
  // inside the selection the range was stretched: its left end got much darker
  expect(gray(await at(page, 1, 40))).toBeLessThan(40);
  expect(await at(page, 100, 40)).toBe(outside);
});

test('Heal: painting over a dark spot with a clean patch leaves the surroundings’ light, not the spot', async ({ page }) => {
  await open(page, 160, 100, '#c8c8c8');
  await page.evaluate(() => {
    const x = RZ.doc.getContext('2d');
    // a dark spot to heal, and a textured but darker patch to take the texture from
    x.fillStyle = '#202020'; x.beginPath(); x.arc(110, 50, 6, 0, 7); x.fill();
    for (let y = 0; y < 30; y++) for (let i = 0; i < 30; i++) { x.fillStyle = (i + y) % 2 ? '#7a7a7a' : '#6a6a6a'; x.fillRect(20 + i, 35 + y, 1, 1); }
    RZ.commit();
    Object.assign(RZ.state, { size: 20, opacity: 1, tip: 'round' });
  });
  await h.key(page, 'j');
  expect(await page.evaluate(() => RZ.state.tool)).toBe('heal');
  const ev = (kind, x, y) => page.evaluate(([kind, x, y]) => {
    const p = RZ.screen(x, y);
    document.querySelector('#view').dispatchEvent(new PointerEvent(kind, { bubbles: true, pointerId: 1, pointerType: 'mouse', clientX: p.x, clientY: p.y, button: 0, buttons: 1, isPrimary: true }));
  }, [kind, x, y]);
  // the source in the textured patch, then paint over the spot
  await ev('pointerdown', 35, 50); await ev('pointerup', 35, 50);
  await ev('pointerdown', 106, 50);
  for (let x = 107; x <= 114; x++) await ev('pointermove', x, 50);
  await ev('pointerup', 114, 50);
  const mid = gray(await at(page, 110, 50));
  // healed: as light as around (≈ 200), not the spot (32) and not the darker patch (≈ 115)
  expect(mid).toBeGreaterThan(165);
  expect(mid).toBeLessThan(235);
  // one undo step brings the spot back
  await page.click('#btn-undo');
  expect(await at(page, 110, 50)).toBe('#202020');
});
