// Layers (raster): painting goes on the active layer; the picture is the visible layers on top of each other;
// layer commands are undo steps; rotating turns every layer; .ora keeps them; so does autosave.
const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;

async function open(page) {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  // the bottom layer: blue
  await page.evaluate(() => { RZ.blank(40, 20, '#0000ff'); });
  await page.click('#btn-fit');
}
/** a pixel of the picture as it looks (all the layers) */
const seen = (page, x, y) => page.evaluate(([x, y]) => {
  const v = document.querySelector('#view'), p = RZ.screen(x + 0.5, y + 0.5), r = v.getBoundingClientRect(), dpr = devicePixelRatio;
  const d = v.getContext('2d').getImageData(Math.round((p.x - r.left) * dpr), Math.round((p.y - r.top) * dpr), 1, 1).data;
  return [d[0], d[1], d[2]];
}, [x, y]);

test('a new layer is painted on; hiding it, its opacity, moving, merging, undo', async ({ page }) => {
  await open(page);
  await expect(page.locator('#layer-list li')).toHaveCount(1);
  await page.click('#btn-layer-add');
  await expect(page.locator('#layer-list .layer-name')).toHaveText(['Layer 2', 'Layer 1']);
  // red on the new layer's left half
  await page.evaluate(() => { const x = RZ.doc.getContext('2d'); x.fillStyle = '#ff0000'; x.fillRect(0, 0, 20, 20); RZ.commit(); });
  await expect.poll(() => seen(page, 5, 5)).toEqual([255, 0, 0]);
  expect(await seen(page, 30, 5)).toEqual([0, 0, 255]); // the layer below shows through
  // hidden: blue again; the eye brings it back
  await page.locator('#layer-list li').first().locator('.layer-eye').click();
  await expect.poll(() => seen(page, 5, 5)).toEqual([0, 0, 255]);
  await page.locator('#layer-list li').first().locator('.layer-eye').click();
  // half opacity: purple
  await page.locator('#layer-opacity').fill('50');
  await expect.poll(async () => { const [r, , b] = await seen(page, 5, 5); return r > 100 && r < 160 && b > 100 && b < 160; }).toBe(true);
  // down: the blue layer covers it
  await page.click('#btn-layer-down');
  await expect(page.locator('#layer-list .layer-name')).toHaveText(['Layer 1', 'Layer 2']);
  await expect.poll(() => seen(page, 5, 5)).toEqual([0, 0, 255]);
  // undo: back on top; undo again: full opacity
  await page.click('#btn-undo');
  await expect(page.locator('#layer-list .layer-name')).toHaveText(['Layer 2', 'Layer 1']);
  await page.click('#btn-undo');
  await expect.poll(() => seen(page, 5, 5)).toEqual([255, 0, 0]);
  // merge down: one layer, red and blue on it
  await page.click('#btn-layer-merge');
  await expect(page.locator('#layer-list .layer-name')).toHaveText(['Layer 1']);
  expect(await page.evaluate(() => [RZ.colorAt(5, 5), RZ.colorAt(30, 5)])).toEqual(['#ff0000', '#0000ff']);
  // undo brings both layers back, with their own pixels
  await page.click('#btn-undo');
  await expect(page.locator('#layer-list .layer-name')).toHaveText(['Layer 2', 'Layer 1']);
  expect(await page.evaluate(() => [RZ.colorAt(5, 5), RZ.colorAt(30, 5)])).toEqual(['#ff0000', null]);
});

test('rotating turns every layer; saving gives the picture as it looks', async ({ page }) => {
  await open(page);
  await page.click('#btn-layer-add');
  await page.evaluate(() => { const x = RZ.doc.getContext('2d'); x.fillStyle = '#ff0000'; x.fillRect(0, 0, 5, 5); RZ.commit(); });
  await page.locator('#btn-rot-right').scrollIntoViewIfNeeded();
  await page.click('#btn-rot-right');
  expect(await page.evaluate(() => [RZ.doc.width, RZ.doc.height])).toEqual([20, 40]);
  // the red corner went to the top right, on its layer; the blue layer turned too
  expect(await page.evaluate(() => [RZ.colorAt(17, 2), RZ.colorAt(2, 2)])).toEqual(['#ff0000', null]);
  await expect.poll(() => seen(page, 2, 30)).toEqual([0, 0, 255]);
  // the PNG the app gives (posting to Discord, saving): both layers
  const png = await page.evaluate(async () => { const b = await RZ.png(); const bm = await createImageBitmap(b); const c = document.createElement('canvas'); c.width = bm.width; c.height = bm.height; const x = c.getContext('2d'); x.drawImage(bm, 0, 0); return [[...x.getImageData(17, 2, 1, 1).data].slice(0, 3), [...x.getImageData(2, 30, 1, 1).data].slice(0, 3)]; });
  expect(png).toEqual([[255, 0, 0], [0, 0, 255]]);
});

test('.ora keeps the layers; so does autosave', async ({ page }) => {
  await open(page);
  await page.click('#btn-layer-add');
  await page.evaluate(() => { const x = RZ.doc.getContext('2d'); x.fillStyle = '#ff0000'; x.fillRect(0, 0, 10, 10); RZ.commit(); });
  await page.locator('#layer-opacity').fill('40');
  await page.locator('#layer-list li').last().locator('.layer-eye').click(); // the bottom layer hidden
  // export as .ora
  const [download] = await Promise.all([page.waitForEvent('download'), page.click('#btn-layer-ora')]);
  expect(download.suggestedFilename()).toMatch(/\.ora$/);
  const file = require('fs').readFileSync(await download.path());
  expect(file.subarray(30, 38).toString()).toBe('mimetype'); // the first entry, as the format wants
  // a new image, then the .ora opened again
  await page.evaluate(() => RZ.blank(10, 10));
  await expect(page.locator('#layer-list li')).toHaveCount(1);
  await page.setInputFiles('#file-input', { name: 'two.ora', mimeType: 'image/openraster', buffer: file });
  await expect(page.locator('#layer-list li')).toHaveCount(2);
  const ls = await page.evaluate(() => RZ.layers.map(L => [L.name, L.visible, Math.round(L.opacity * 100), L.canvas.width]));
  expect(ls).toEqual([['Layer 1', false, 100, 40], ['Layer 2', true, 40, 40]]);
  // autosave: after a reload the layers are there
  await page.waitForTimeout(1200);
  await page.reload();
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await expect(page.locator('#layer-list li')).toHaveCount(2);
  expect(await page.evaluate(() => RZ.layers.map(L => [L.name, L.visible, Math.round(L.opacity * 100)]))).toEqual([['Layer 1', false, 100], ['Layer 2', true, 40]]);
});
