// Import…: a picture from a file goes into the current image – floating, scaled to fit, placed with Enter.
const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;

test('Import: a bigger picture comes in scaled to fit, floating; Enter places it; the rest of the image stays', async ({ page }) => {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.evaluate(() => { RZ.blank(120, 80, '#0000ff'); RZ.setTool('brush'); });
  // a 300 × 200 picture: red
  await page.setInputFiles('#import-input', { name: 'red.png', mimeType: 'image/png', buffer: h.png(300, 200, () => [255, 0, 0]) });
  await expect.poll(() => page.evaluate(() => !!RZ.state.floating)).toBe(true);
  const f = await page.evaluate(() => ({ w: RZ.state.floating.canvas.width, h: RZ.state.floating.canvas.height }));
  expect(f).toEqual({ w: 120, h: 80 }); // 300 × 200 → 120 × 80: fits, same proportions
  expect(await page.evaluate(() => [RZ.state.tool, RZ.doc.width, RZ.doc.height])).toEqual(['select', 120, 80]);
  // not placed yet: the image underneath is unchanged
  expect(await page.evaluate(() => RZ.colorAt(60, 40))).toBe('#0000ff');
  await page.keyboard.press('Enter');
  expect(await page.evaluate(() => RZ.colorAt(60, 40))).toBe('#ff0000');
  // one undo step back to blue
  await page.click('#btn-undo');
  expect(await page.evaluate(() => RZ.colorAt(60, 40))).toBe('#0000ff');
});

test('Import: a smaller picture keeps its size', async ({ page }) => {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.evaluate(() => RZ.blank(200, 100));
  await page.setInputFiles('#import-input', { name: 'g.png', mimeType: 'image/png', buffer: h.png(40, 30, () => [0, 200, 0]) });
  await expect.poll(() => page.evaluate(() => RZ.state.floating && [RZ.state.floating.canvas.width, RZ.state.floating.canvas.height])).toEqual([40, 30]);
});
