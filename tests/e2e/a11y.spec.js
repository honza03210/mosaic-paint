// Accessibility: no WCAG 2.1 A / AA problems axe can find in both apps and their main dialogs (in English
// and Czech), symbol-only buttons have names, and the palette works from the keyboard.
const { test } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const h = require('./helpers');
const { expect } = h;

const ready = (page) => page.waitForFunction(() => (window.MZ && MZ.ready) || (window.RZ && RZ.ready));
const problems = async (page) => (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze())
  .violations.map(v => `${v.id}: ${v.nodes.slice(0, 3).map(n => n.target.join(' ')).join(', ')}`);

for (const [name, url, open] of [
  ['vector', 'index.html', null], ['raster', 'raster.html', null],
  ['3D print dialog', 'index.html', '#btn-3d'], ['examples', 'index.html', '#btn-examples'], ['history', 'index.html', '#btn-history'],
  ['report', 'index.html', '#btn-report'], ['share', 'index.html', '#btn-share'], ['guide', 'index.html', '#btn-guide'],
  ['raster mosaic', 'raster.html', '#btn-mosaic'], ['raster vector tiles', 'raster.html', '#btn-vectorize'],
]) {
  test(`no accessibility problems: ${name}`, async ({ page }) => {
  await h.expert(page);
    await page.goto(url);
    await ready(page);
    if (open) { await page.click(open); await page.waitForTimeout(600); }
    expect(await problems(page)).toEqual([]);
  });
}

test('no accessibility problems in Czech', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('mz-lang', 'cs'));
  await page.goto('index.html');
  await ready(page);
  expect(await problems(page)).toEqual([]);
});

test('buttons that show only a symbol are named by their tooltip', async ({ page }) => {
  await h.expert(page);
  await page.goto('index.html');
  await ready(page);
  await expect(page.locator('#btn-undo')).toHaveAttribute('aria-label', 'Undo (Ctrl+Z)');
  await page.click('#btn-3d');
  await expect(page.locator('#m3-order .m3-row')).toHaveCount(0); // a blank drawing: nothing to order
  await expect(page.locator('#dlg-3d .dlg-head button')).toHaveAttribute('aria-label', 'Close');
});

test('the palette works from the keyboard', async ({ page }) => {
  await page.goto('raster.html');
  await ready(page);
  const swatch = page.locator('#palette .swatch').nth(2);
  const color = await swatch.evaluate(el => el.getAttribute('aria-label').split(' ')[1]);
  await swatch.focus();
  await page.keyboard.press('Enter');
  expect(await page.evaluate(() => RZ.state.fill)).toBe(color);
  await expect(page.locator('#palette .swatch').nth(2)).toHaveAttribute('aria-pressed', 'true');
  const before = await page.locator('#palette .swatch').count();
  await page.locator('#palette .swatch').nth(2).focus();
  await page.keyboard.press('Delete');
  await expect(page.locator('#palette .swatch')).toHaveCount(before - 1);
});
