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
