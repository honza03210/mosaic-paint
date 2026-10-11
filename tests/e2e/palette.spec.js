const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;

const palette = (page) => page.evaluate(() => MZ.state.palette.slice());

test('pasting colors: hex, rgb(), names and a coolors link', async ({ page }) => {
  await h.open(page);
  await page.evaluate(() => { MZ.state.palette = []; });
  await page.fill('#color-input', 'https://coolors.co/ff595e-ffca3a-8ac926 rgb(10, 20, 30) tomato #abc');
  await page.click('#btn-add-color');
  expect(await palette(page)).toEqual(['#ff595e', '#ffca3a', '#8ac926', '#0a141e', '#ff6347', '#aabbcc']);
  await expect(page.locator('#palette .swatch')).toHaveCount(7); // + the "no color" swatch
});

test('named palettes can be created and switched', async ({ page }) => {
  await h.open(page);
  await page.click('#btn-pal-new');
  await h.answer(page, 'Glass tiles');
  expect(await page.evaluate(() => MZ.state.paletteName)).toBe('Glass tiles');
  expect(await palette(page)).toEqual([]);
  await page.fill('#color-input', '#112233');
  await page.press('#color-input', 'Enter');
  await page.selectOption('#pal-select', 'My palette');
  expect((await palette(page)).length).toBeGreaterThan(1);
  await page.selectOption('#pal-select', 'Glass tiles');
  expect(await palette(page)).toEqual(['#112233']);
});

test('editing a swatch recolors the areas painted with it', async ({ page }) => {
  await h.open(page);
  await page.evaluate(() => { MZ.state.palette = ['#ff0000']; MZ.state.fill = '#ff0000'; });
  await h.key(page, 'b');
  await h.click(page, { x: 500, y: 500 });
  expect(await h.colorAt(page, { x: 500, y: 500 })).toBe('#ff0000');
  await page.evaluate(() => MZ.setTool('bucket')); // re-render after the palette change
  await page.locator('#palette .swatch').nth(1).dblclick();
  await h.answer(page, '#00ff00');
  expect(await h.colorAt(page, { x: 500, y: 500 })).toBe('#00ff00');
  expect(await palette(page)).toEqual(['#00ff00']);
});
