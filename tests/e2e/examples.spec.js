// Example projects and the newcomers' guide, in both apps.
const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;

test('vector: the examples open as drawings with their palettes', async ({ page }) => {
  const { errors } = await h.open(page);
  await page.click('#btn-examples');
  await expect(page.locator('#dlg-examples .ex-card')).toHaveCount(2);
  await expect(page.locator('[data-example=coaster] img')).toHaveAttribute('src', /^data:image\/svg\+xml/);
  await page.click('[data-example=coaster]');
  await expect(page.locator('#dlg-examples')).toBeHidden();
  await expect.poll(() => page.evaluate(() => MZ.allShapes().length)).toBe(100);
  await expect(page.locator('#pal-select')).toHaveValue('Coaster');
  await page.click('#btn-examples');
  await page.click('[data-example=sign]');
  await expect.poll(() => page.evaluate(() => MZ.allShapes().length)).toBe(27 * 11);
  expect(errors).toEqual([]);
});

test('raster: the pixel heart and the sunset mosaic', async ({ page }) => {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.click('#btn-examples');
  await page.click('[data-example=heart]');
  await expect.poll(() => page.evaluate(() => [RZ.doc.width, RZ.doc.height])).toEqual([16, 16]);
  expect(await page.evaluate(() => [RZ.colorAt(0, 0), RZ.colorAt(7, 7), RZ.colorAt(3, 4)])).toEqual([null, '#e63946', '#ffd6dc']);
  await page.click('#btn-examples');
  await page.click('[data-example=sunset]');
  await expect.poll(() => page.evaluate(() => RZ.doc.width)).toBe(240);
  // tiles with grout between them, in the sunset's colors
  expect(await page.evaluate(() => [RZ.colorAt(7, 3), RZ.colorAt(0, 0)])).toEqual(['#e9e4dc', '#2b2d5c']);
  await expect(page.locator('#pal-select')).toHaveValue('Sunset');
});

test('the guide opens the first time, points at the parts it explains, and the ? button shows it again', async ({ page }) => {
  // as for a person, not a test robot
  await page.addInitScript(() => Object.defineProperty(Navigator.prototype, 'webdriver', { get: () => false }));
  await page.goto('index.html');
  await page.waitForFunction(() => window.MZ && MZ.ready);
  await expect(page.locator('#guide')).toBeVisible();
  await expect(page.locator('#guide h2')).toHaveText('Welcome to Mosaic Paint');
  await page.click('#guide .guide-next');
  await expect(page.locator('#guide .guide-count')).toHaveText('2 of 5');
  await expect(page.locator('#tools')).toHaveClass(/guide-target/);
  for (let k = 0; k < 4; k++) await page.click('#guide .guide-next');
  await expect(page.locator('#guide')).toBeHidden();
  await expect(page.locator('.guide-target')).toHaveCount(0);
  // seen: not again on the next visit, but on request
  await page.reload();
  await page.waitForFunction(() => window.MZ && MZ.ready);
  await page.waitForTimeout(800);
  await expect(page.locator('#guide')).toBeHidden();
  await page.click('#btn-guide');
  await expect(page.locator('#guide .guide-count')).toHaveText('1 of 5');
  await page.click('#guide .guide-close');
  await expect(page.locator('#guide')).toBeHidden();
  // the raster app has its own
  await page.goto('raster.html');
  await expect(page.locator('#guide h2')).toHaveText('Welcome to Mosaic Paint Raster');
});
