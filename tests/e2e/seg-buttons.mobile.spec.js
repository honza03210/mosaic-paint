// On a phone the panel is narrow: a row of choices (Select's Rectangle … Object (AI)) wraps instead of cutting
// off the last ones, so every choice can be tapped.
const { test } = require('@playwright/test');
const { expect } = require('./helpers');

test('raster: every Select shape fits in its group and Object (AI) can be tapped', async ({ page }) => {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.evaluate(() => RZ.setTool('select'));
  const out = await page.evaluate(() => [...document.querySelectorAll('.seg-btns')].filter(g => g.offsetParent).flatMap(g => {
    const r = g.getBoundingClientRect();
    return [...g.children].filter(b => b.offsetParent).map(b => b.getBoundingClientRect()).filter(q => q.right > r.right + 1 || q.bottom > r.bottom + 1).map(() => g.id || g.className);
  }));
  expect(out).toEqual([]);
  // the panel slides in on a phone
  if (await page.locator('#btn-panel').isVisible()) await page.click('#btn-panel');
  await page.locator('#sel-shape [data-shape="object"]').click();
  expect(await page.evaluate(() => RZ.state.selShape)).toBe('object');
});
