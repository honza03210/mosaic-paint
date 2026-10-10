// Guards against big slowdowns on large mosaics. Limits are ~10× what a laptop needs, so CI stays stable.
const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;

test('a 2,500-tile mosaic stays responsive', async ({ page }) => {
  await h.open(page);
  await h.setState(page, { pattern: { type: 'square', size: 20, angle: 0 } });
  await h.key(page, 't');
  await page.click('#btn-pat-page');

  const paintMs = await page.evaluate(() => {
    const s = performance.now(), ctx = { ix: MZ.regionIndex() };
    ctx.ix.faces.forEach((f, i) => {
      const reg = ctx.ix.region(f), p = MZ.gridSample(reg.bb, q => MZ.insideRegion(reg, q), 1)[0];
      if (p) MZ.bucketAt(p, ['#264653', '#2a9d8f', '#e9c46a'][i % 3], ctx, f);
    });
    MZ.commit(true);
    return performance.now() - s;
  });
  expect(await h.count(page, '.mz-fill')).toBe(2500);
  expect(paintMs).toBeLessThan(5000);

  // moving the mouse with snapping, clicking with the bucket, dragging a line end (repaints areas)
  await h.key(page, 'l');
  let t = Date.now();
  for (let i = 0; i < 40; i++) await page.mouse.move(300 + i * 10, 400 + (i % 5));
  expect(Date.now() - t).toBeLessThan(4000);
  await page.keyboard.press('Escape');

  await h.key(page, 'b');
  await h.setState(page, { fill: '#000000' });
  t = Date.now();
  await h.click(page, { x: 510, y: 510 });
  expect(Date.now() - t).toBeLessThan(2000);
  expect(await h.colorAt(page, { x: 510, y: 510 })).toBe('#000000');

  await h.key(page, 'v');
  await h.click(page, { x: 500, y: 333 });
  t = Date.now();
  await h.drag(page, { x: 500, y: 0 }, { x: 530, y: 0 });
  expect(Date.now() - t).toBeLessThan(5000);
  // the moved line merges some tile pairs and splits others; tiny slivers may stay unpainted
  expect(await h.count(page, '.mz-fill')).toBeGreaterThan(2490);
});
