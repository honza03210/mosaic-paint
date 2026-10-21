// Simple mode on a phone: the colors along the bottom (the side panel is tucked away); no × to remove a color.
const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;

test('the colors are along the bottom of the drawing; a tap picks one', async ({ page }) => {
  await h.open(page, { mode: 'simple' });
  const bar = page.locator('#kid-colors');
  await expect(bar).toBeVisible();
  const n = await page.evaluate(() => MZ.state.palette.length);
  await expect(bar.locator('.kc')).toHaveCount(n + 1); // and "no color"
  const want = await page.evaluate(() => MZ.state.palette[2]);
  await bar.locator('.kc').nth(3).tap();
  expect(await page.evaluate(() => MZ.state.fill)).toBe(want);
  await expect(bar.locator('.kc').nth(3)).toHaveClass(/active/);
  // the bar fits the screen (it scrolls inside itself)
  const b = await bar.boundingBox();
  expect(b.x + b.width).toBeLessThanOrEqual(page.viewportSize().width + 1);
  // Expert: no bar
  await page.evaluate(() => MZ.setMode('expert'));
  await expect(bar).toBeHidden();
});

test('in the side panel, the swatches have no × to remove a color in Simple mode', async ({ page }) => {
  await h.open(page, { mode: 'simple' });
  await page.click('#btn-panel');
  await expect(page.locator('#palette .swatch').nth(1)).toBeVisible();
  await expect(page.locator('#palette .swatch .del').first()).toBeHidden();
});
