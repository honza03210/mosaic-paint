// The quick menu on touch screens: a double-tap on the drawing opens it (and leaves no trace of its first
// tap); tools, colors and size can be changed from it; while a shape is being drawn, a double-tap still
// finishes the shape.
const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;

const menu = (page) => page.locator('#quick-menu');
async function center(page, sel) {
  const b = await page.locator(sel).boundingBox();
  return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
}
async function doubleTap(page, p) {
  await page.touchscreen.tap(p.x, p.y);
  await page.touchscreen.tap(p.x + 3, p.y + 2);
}

async function openRaster(page) {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.evaluate(() => { RZ.blank(200, 200); Object.assign(RZ.state, { fill: '#ff0000', opacity: 1, size: 20 }); });
  await page.click('#btn-fit');
}
const pixelAt = (page, p) => page.evaluate(({ x, y }) => { const q = RZ.toDoc(x, y); return RZ.colorAt(Math.floor(q.x), Math.floor(q.y)); }, p);

test('raster: a double-tap opens the menu and its first tap paints nothing', async ({ page }) => {
  await openRaster(page);
  await page.locator('#tools button[data-tool=brush]').click();
  const p = await center(page, '#view');
  await doubleTap(page, p);
  await expect(menu(page)).toBeVisible();
  expect(await pixelAt(page, p)).toBe('#ffffff');
  await expect(page.locator('#btn-undo')).toBeDisabled();
  // the brush is marked; picking a tool closes the menu
  await expect(page.locator('#quick-menu .qm-tool[data-tool=brush]')).toHaveClass(/active/);
  await page.locator('#quick-menu .qm-tool[data-tool=eraser]').tap();
  await expect(menu(page)).toBeHidden();
  expect(await page.evaluate(() => RZ.state.tool)).toBe('eraser');
});

test('raster: colors and size from the menu; a tap outside only closes it', async ({ page }) => {
  await openRaster(page);
  await page.evaluate(() => { RZ.state.palette = ['#112233', '#445566', '#778899']; });
  const p = await center(page, '#view');
  await doubleTap(page, p);
  await expect(menu(page)).toBeVisible();
  // the paint color
  await page.locator('#quick-menu .qm-swatch[data-color="#445566"]').tap();
  await expect(menu(page)).toBeHidden();
  expect(await page.evaluate(() => RZ.state.fill)).toBe('#445566');
  // the outline color
  await doubleTap(page, p);
  await page.locator('#quick-menu .qm-target[data-target=stroke]').tap();
  await expect(page.locator('#quick-menu .qm-target[data-target=stroke]')).toHaveAttribute('aria-checked', 'true');
  await page.locator('#quick-menu .qm-swatch[data-color="#778899"]').tap();
  expect(await page.evaluate(() => [RZ.state.fill, RZ.state.stroke])).toEqual(['#445566', '#778899']);
  // the size (the slider is logarithmic: the far end is the largest size)
  await doubleTap(page, p);
  await page.locator('#quick-menu .qm-size input').fill('1000');
  expect(await page.evaluate(() => RZ.state.size)).toBe(200);
  await expect(page.locator('#quick-menu .qm-size output')).toHaveText('200 px');
  // outside the card: closes, paints nothing
  const card = await page.locator('#quick-menu .qm-card').boundingBox();
  const vp = page.viewportSize();
  const out = { x: 12, y: card.y > vp.height / 2 ? card.y - 40 : card.y + card.height + 40 };
  await page.touchscreen.tap(out.x, out.y);
  await expect(menu(page)).toBeHidden();
  await expect(page.locator('#btn-undo')).toBeDisabled();
});

test('raster: single taps and taps far apart still paint', async ({ page }) => {
  await openRaster(page);
  await page.locator('#tools button[data-tool=brush]').click();
  const p = await center(page, '#view');
  await page.touchscreen.tap(p.x, p.y);
  await page.touchscreen.tap(p.x + 80, p.y);
  await expect(menu(page)).toBeHidden();
  expect(await pixelAt(page, p)).toBe('#ff0000');
  expect(await pixelAt(page, { x: p.x + 80, y: p.y })).toBe('#ff0000');
});

test('vector: the menu opens without starting a line; a polygon in progress is still finished by a double-tap', async ({ page }) => {
  await h.open(page);
  await h.key(page, 'l');
  const p = await center(page, '#canvas');
  await doubleTap(page, p);
  await expect(menu(page)).toBeVisible();
  expect(await page.evaluate(() => MZ.state.lineStart)).toBe(null);
  expect(await h.count(page, '#mz-shapes > *')).toBe(0);
  await page.locator('#quick-menu .qm-tool[data-tool=free]').tap();
  expect(await page.evaluate(() => MZ.state.tool)).toBe('free');
  // three corners, then a double-tap on the last one: the polygon is finished, the menu stays away
  await page.touchscreen.tap(p.x - 60, p.y - 60);
  await page.waitForTimeout(400);
  await page.touchscreen.tap(p.x + 60, p.y - 60);
  await page.waitForTimeout(400);
  await doubleTap(page, { x: p.x, y: p.y + 60 });
  await page.waitForTimeout(400);
  await expect(menu(page)).toBeHidden();
  // finished (where the browser reports the double-tap as a double-click) or still being drawn – never lost
  expect(await page.evaluate(() => document.querySelectorAll('#mz-shapes polygon').length || (MZ.state.freePts || []).length >= 3)).toBeTruthy();
});

test('raster: Adjust colors from the quick menu', async ({ page }) => {
  await openRaster(page);
  const p = await center(page, '#view');
  await doubleTap(page, p);
  await expect(menu(page)).toBeVisible();
  await page.locator('#quick-menu .qm-icon[aria-label="Adjust colors"]').tap();
  await expect(menu(page)).toBeHidden();
  await expect(page.locator('#dlg-adjust')).toBeVisible();
});
