// The Text tool (raster): tap, type, style; it floats until placed, can be dragged and edited; curved text.
const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;

const evFor = (page) => (kind, x, y) => page.evaluate(([kind, x, y]) => {
  const p = RZ.screen(x, y);
  document.querySelector('#view').dispatchEvent(new PointerEvent(kind, { bubbles: true, pointerId: 1, pointerType: 'mouse', clientX: p.x, clientY: p.y, button: 0, buttons: 1, isPrimary: true }));
}, [kind, x, y]);

test('tap, type, style, drag, edit and place text', async ({ page }) => {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.evaluate(() => { RZ.blank(300, 200); RZ.state.fill = '#ff0000'; RZ.state.stroke = '#000000'; });
  await page.click('#btn-fit');
  await h.key(page, 't');
  expect(await page.evaluate(() => RZ.state.tool)).toBe('text');
  const ev = evFor(page);
  await ev('pointerdown', 150, 100); await ev('pointerup', 150, 100);
  const d = page.locator('#dlg-text');
  await expect(d).toBeVisible();
  await d.locator('.tx-text').fill('Hi');
  await d.locator('.tx-size').fill('60');
  await d.locator('.tx-size').dispatchEvent('input');
  // it shows while typing: floating, centred on the tap
  const f = await page.evaluate(() => { const f = RZ.state.floating; return f && { x: f.x, y: f.y, w: f.canvas.width, h: f.canvas.height, text: f.text.text }; });
  expect(f.text).toBe('Hi');
  expect(Math.abs(f.x + f.w / 2 - 150)).toBeLessThan(2);
  expect(f.h).toBeGreaterThan(60);
  // an outline makes it bigger
  await d.locator('.tx-outline').check();
  const w2 = await page.evaluate(() => RZ.state.floating.canvas.width);
  expect(w2).toBeGreaterThan(f.w);
  await d.locator('.tx-done').click();
  await expect(d).toBeHidden();
  // drag it 50 px left
  await ev('pointerdown', 150, 100); await ev('pointermove', 120, 100); await ev('pointermove', 100, 100); await ev('pointerup', 100, 100);
  expect(Math.abs(await page.evaluate(() => RZ.state.floating.x + RZ.state.floating.canvas.width / 2) - 100)).toBeLessThanOrEqual(1);
  // tap it: edit it
  await ev('pointerdown', 100, 100); await ev('pointerup', 100, 100);
  await expect(d).toBeVisible();
  await expect(d.locator('.tx-text')).toHaveValue('Hi');
  await d.locator('.tx-text').fill('Hey');
  await d.locator('.tx-done').click();
  expect(await page.evaluate(() => RZ.state.floating.text.text)).toBe('Hey');
  // place it: red pixels on the image now, one undo step
  await page.keyboard.press('Enter');
  expect(await page.evaluate(() => RZ.state.floating)).toBe(null);
  const red = await page.evaluate(() => {
    const d = RZ.doc.getContext('2d').getImageData(0, 0, 300, 200).data;
    let n = 0, sx = 0;
    for (let i = 0; i < d.length; i += 4) if (d[i] > 200 && d[i + 1] < 60 && d[i + 2] < 60) { n++; sx += (i / 4) % 300; }
    return { n, cx: sx / n };
  });
  expect(red.n).toBeGreaterThan(300);
  expect(Math.abs(red.cx - 100)).toBeLessThan(20);
  await page.click('#btn-undo');
  expect(await page.evaluate(() => RZ.colorAt(100, 100))).toBe('#ffffff');
});

test('curved text bends; Cancel on a new text leaves nothing', async ({ page }) => {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.evaluate(() => { RZ.blank(400, 300); RZ.state.fill = '#0000ff'; });
  await page.click('#btn-fit');
  await h.key(page, 't');
  const ev = evFor(page);
  await ev('pointerdown', 200, 150); await ev('pointerup', 200, 150);
  const d = page.locator('#dlg-text');
  await d.locator('.tx-text').fill('CURVED TEXT');
  await d.locator('.tx-size').fill('40');
  await d.locator('.tx-size').dispatchEvent('input');
  const flat = await page.evaluate(() => ({ w: RZ.state.floating.canvas.width, h: RZ.state.floating.canvas.height }));
  await d.locator('.tx-curve').fill('80');
  const bent = await page.evaluate(() => ({ w: RZ.state.floating.canvas.width, h: RZ.state.floating.canvas.height }));
  // an arch: narrower and taller than the straight line
  expect(bent.w).toBeLessThan(flat.w);
  expect(bent.h).toBeGreaterThan(flat.h * 1.5);
  // and the other way: a smile, about as big
  await d.locator('.tx-curve').fill('-80');
  const smile = await page.evaluate(() => ({ w: RZ.state.floating.canvas.width, h: RZ.state.floating.canvas.height }));
  expect(Math.abs(smile.w - bent.w)).toBeLessThan(bent.w * 0.2);
  await d.locator('.tx-cancel').click();
  // (the dialog's close event comes a moment later)
  await expect.poll(() => page.evaluate(() => RZ.state.floating)).toBe(null);
  expect(await page.evaluate(() => RZ.colorAt(200, 150))).toBe('#ffffff');
});
