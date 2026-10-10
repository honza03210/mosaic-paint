const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;

// orange left half, blue right half, yellow band at the bottom
const photo = h.png(120, 120, (x, y) => (y >= 96 ? [240, 192, 96] : x < 60 ? [232, 116, 63] : [74, 122, 160]));

async function photoGrid(page) {
  await h.open(page, { doc: h.blank(300, 300, 'mm') });
  await page.evaluate(() => { MZ.state.palette = ['#e76f51', '#457b9d', '#e9c46a', '#264653']; MZ.state.onlyUnpainted = true; });
  await page.setInputFiles('#ref-file', { name: 'photo.png', mimeType: 'image/png', buffer: photo });
  await expect(page.locator('#mz-ref image')).toHaveCount(1);
  await h.setState(page, { pattern: { type: 'square', size: 30, angle: 0 } });
  await h.key(page, 't');
  await page.click('#btn-pat-page');
}

test('tiles are colored from the photo with the closest palette colors', async ({ page }) => {
  await photoGrid(page);
  await page.click('#btn-autocolor');
  await expect(page.locator('#st-msg')).toContainText('Colored 100 areas');
  expect(await h.colorAt(page, { x: 15, y: 15 })).toBe('#e76f51');
  expect(await h.colorAt(page, { x: 285, y: 15 })).toBe('#457b9d');
  expect(await h.colorAt(page, { x: 150, y: 285 })).toBe('#e9c46a');
});

test('report lists colors and replaces one everywhere', async ({ page }) => {
  await photoGrid(page);
  await page.click('#btn-autocolor');
  await page.click('#btn-report');
  await expect(page.locator('#rep-table tbody tr')).toHaveCount(3);
  await expect(page.locator('#rep-summary')).toContainText('100 painted areas in 3 colors');
  await page.selectOption('#rep-table select[data-from="#457b9d"]', '#264653');
  await expect(page.locator('#rep-table tbody tr')).toHaveCount(3);
  expect(await h.colorAt(page, { x: 285, y: 15 })).toBe('#264653');
});

test('the photo is kept in the saved file and restored with it', async ({ page }) => {
  await photoGrid(page);
  const svg = await page.evaluate(() => MZ.buildSVGString());
  expect(svg).toContain('id="mosaic-reference"');
  await page.evaluate((s) => MZ.loadSVGText(s), svg);
  await expect(page.locator('#mz-ref image')).toHaveCount(1);
  expect(await page.inputValue('#ref-size')).toBe('100');
});

test('mosaic from photo: square tiles with a palette suggested from the photo', async ({ page }) => {
  await h.open(page, { doc: h.blank(300, 300, 'mm') });
  await page.setInputFiles('#ref-file', { name: 'photo.png', mimeType: 'image/png', buffer: photo });
  await expect(page.locator('#mz-ref image')).toHaveCount(1);
  await page.click('#btn-automosaic');
  await page.selectOption('#am-style', 'square');
  await page.fill('#am-size', '30');
  await page.locator('#am-size').dispatchEvent('change');
  await page.locator('#am-detail').fill('0');
  await page.check('input[name=am-colors][value=suggest]');
  await page.fill('#am-count', '3');
  await page.locator('#am-count').dispatchEvent('change');
  await expect(page.locator('#am-estimate')).toContainText('About 100 tiles');
  await page.click('#am-go');
  await expect(page.locator('#dlg-automosaic')).toBeHidden();
  expect(await h.count(page, '.mz-fill')).toBe(100);
  const pal = await page.evaluate(() => ({ name: MZ.state.paletteName, colors: MZ.state.palette }));
  expect(pal.name).toBe('From photo');
  expect(pal.colors.length).toBe(3);
  // each part of the photo got a suggested color close to the photo's own
  const rgb = (hex) => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
  const close = (hex, want) => rgb(hex).every((v, i) => Math.abs(v - want[i]) < 25);
  expect(close(await h.colorAt(page, { x: 15, y: 15 }), [232, 116, 63])).toBe(true);
  expect(close(await h.colorAt(page, { x: 285, y: 15 }), [74, 122, 160])).toBe(true);
  expect(close(await h.colorAt(page, { x: 150, y: 285 }), [240, 192, 96])).toBe(true);
  // one undo removes the whole mosaic
  await page.keyboard.press('Control+z');
  expect(await h.count(page, '.mz-fill')).toBe(0);
  expect(await h.count(page, '#mz-shapes line')).toBe(0);
});

test('mosaic from photo: irregular tiles, smaller where the photo has detail', async ({ page }) => {
  await h.open(page, { doc: h.blank(300, 300, 'mm') });
  await page.evaluate(() => { MZ.state.palette = ['#e76f51', '#457b9d', '#e9c46a']; });
  await page.setInputFiles('#ref-file', { name: 'photo.png', mimeType: 'image/png', buffer: photo });
  await page.click('#btn-automosaic');
  await page.selectOption('#am-style', 'irregular');
  await page.fill('#am-size', '20');
  await page.locator('#am-size').dispatchEvent('change');
  await page.locator('#am-detail').fill('80');
  await page.check('input[name=am-colors][value=palette]');
  await page.click('#am-go');
  await expect(page.locator('#dlg-automosaic')).toBeHidden();
  const r = await page.evaluate(() => {
    const ix = MZ.regionIndex();
    return { faces: ix.faces.length, fills: document.querySelectorAll('.mz-fill').length };
  });
  expect(r.faces).toBeGreaterThan(100);
  expect(r.fills).toBe(r.faces); // every tile painted
});
