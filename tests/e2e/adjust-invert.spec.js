// The toolbar's Adjust button and the new photo sliders (warmth, vignette); inverting the selection in both apps.
const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;

test('Adjust from the toolbar: warmth and vignette', async ({ page }) => {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.evaluate(() => RZ.blank(60, 40, '#808080'));
  await page.click('#btn-adjust-top');
  const d = page.locator('#dlg-adjust');
  await expect(d).toBeVisible();
  await expect(d.locator('.adj-group')).toHaveText(['Light', 'Color', 'Detail and effects', 'Levels']);
  await d.locator('input[data-k=warmth]').fill('100');
  await d.locator('input[data-k=vignette]').fill('100');
  await d.locator('.adj-apply').click();
  await expect(d).toBeHidden();
  const [mid, corner] = await page.evaluate(() => [RZ.colorAt(30, 20), RZ.colorAt(0, 0)]);
  const rgb = (c) => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
  expect(rgb(mid)[0]).toBeGreaterThan(rgb(mid)[2] + 30); // warmer: red over blue
  expect(rgb(corner)[1]).toBeLessThan(rgb(mid)[1] - 30); // darker corner
});

test('raster: Ctrl+I inverts the selection – a shape too', async ({ page }) => {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.evaluate(() => { RZ.blank(60, 40); const x = RZ.doc.getContext('2d'); x.fillStyle = '#ff0000'; x.beginPath(); x.arc(30, 20, 10, 0, 7); x.fill(); RZ.commit(); });
  await page.click('#btn-fit');
  const sel = (x, y) => page.evaluate(([x, y]) => { const s = RZ.state.sel; if (!s || x < s.x || y < s.y || x >= s.x + s.w || y >= s.y + s.h) return false; return !s.mask || s.mask[(y - s.y) * s.w + (x - s.x)] >= 128; }, [x, y]);
  // nothing selected: inverting selects everything
  await page.keyboard.press('Control+i');
  expect(await page.evaluate(() => RZ.state.tool)).toBe('select');
  expect(await sel(0, 0)).toBe(true);
  // the disc by color, inverted: everything but the disc – clearing it leaves only the disc
  await page.locator('#sel-shape button[data-shape=wand]').click();
  const p = await page.evaluate(() => RZ.screen(30, 20));
  await page.mouse.click(p.x, p.y);
  expect(await sel(30, 20)).toBe(true);
  await page.click('#btn-sel-invert');
  expect([await sel(30, 20), await sel(2, 2)]).toEqual([false, true]);
  await page.click('#btn-sel-del');
  expect(await page.evaluate(() => [RZ.colorAt(30, 20), RZ.colorAt(2, 2)])).toEqual(['#ff0000', null]);
});

test('vector: Ctrl+I selects the other shapes', async ({ page }) => {
  await h.open(page);
  await h.key(page, 'l');
  await h.drag(page, { x: 100, y: 100 }, { x: 900, y: 100 });
  await h.drag(page, { x: 100, y: 300 }, { x: 900, y: 300 });
  await h.drag(page, { x: 100, y: 500 }, { x: 900, y: 500 });
  await h.key(page, 'v');
  await h.click(page, { x: 500, y: 100 });
  expect(await page.evaluate(() => MZ.state.selection.size)).toBe(1);
  await page.keyboard.press('Control+i');
  expect(await page.evaluate(() => MZ.state.selection.size)).toBe(2);
  await page.click('#btn-sel-invert');
  expect(await page.evaluate(() => MZ.state.selection.size)).toBe(1);
});
