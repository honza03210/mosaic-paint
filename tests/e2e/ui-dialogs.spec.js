// The app's own questions (in place of the browser's prompt / confirm, which Discord's Activity frame
// blocks), the color chooser, and room for Discord's controls on phones.
const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;

test('New asks in the page – for the raster image size, and before discarding a drawing', async ({ page }) => {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.click('#btn-new');
  expect(await h.answer(page, '120 × 80')).toContain('Size of the new image');
  await expect.poll(() => page.evaluate(() => [RZ.doc.width, RZ.doc.height])).toEqual([120, 80]);
  // cancelled: nothing changes
  await page.click('#btn-new');
  await h.answer(page, null, { cancel: true });
  expect(await page.evaluate(() => [RZ.doc.width, RZ.doc.height])).toEqual([120, 80]);

  // the vector app: unsaved changes are confirmed first
  await h.open(page);
  await h.key(page, 'l');
  await h.drag(page, { x: 100, y: 100 }, { x: 900, y: 100 });
  await page.click('#btn-new');
  expect(await h.answer(page, null, { cancel: true })).toContain('Discard unsaved changes');
  expect(await h.count(page, '#mz-shapes line')).toBe(1);
  await page.click('#btn-new');
  await h.answer(page);
  await expect.poll(() => h.count(page, '#mz-shapes line')).toBe(0);
});

test('the color chooser: an area, a hue slider and a code; it can add the color to the palette', async ({ page }) => {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  const before = await page.evaluate(() => RZ.state.palette.length);
  await page.click('#btn-choose-color');
  const d = page.locator('#dlg-color');
  await expect(d).toBeVisible();
  await d.locator('.cp-hex').fill('#123456');
  await d.locator('button[value=ok]').click();
  // (the dialog closes, then the color is used)
  await expect.poll(() => page.evaluate(() => RZ.state.fill)).toBe('#123456');
  expect(await page.evaluate(() => RZ.state.palette.includes('#123456'))).toBe(true);
  expect(await page.evaluate(() => RZ.state.palette.length)).toBe(before + 1);
  // the outline box opens it for the outline color; dragging in the area picks a color; not added this time
  await page.click('#ac-stroke');
  await expect(d).toBeVisible();
  await d.locator('.cp-hue').fill('120');
  const box = await d.locator('.cp-sv').boundingBox();
  await page.mouse.move(box.x + box.width - 2, box.y + 2);
  await page.mouse.down();
  await page.mouse.up();
  await expect(d.locator('.cp-hex')).toHaveValue(/^#0[0-9a-f]f[0-9a-f]0[0-9a-f]$/); // a bright, saturated green
  await d.locator('.cp-add').uncheck();
  await d.locator('button[value=ok]').click();
  await expect.poll(() => page.evaluate(() => RZ.state.stroke)).toMatch(/^#0[0-9a-f]f[0-9a-f]0[0-9a-f]$/);
  const stroke = await page.evaluate(() => RZ.state.stroke);
  expect(stroke).toMatch(/^#0[0-9a-f]f[0-9a-f]0[0-9a-f]$/);
  expect(await page.evaluate((c) => RZ.state.palette.includes(c), stroke)).toBe(false);
  // cancelled: the color stays
  await page.click('#btn-choose-color');
  await d.locator('.cp-hex').fill('#ff00ff');
  await d.locator('button[value=cancel]').click();
  await expect(d).toBeHidden();
  expect(await page.evaluate(() => RZ.state.fill)).toBe('#123456');
});

test('inside Discord on a phone the top bar stays below Discord’s own controls', async ({ page }) => {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  const top = () => page.evaluate(() => document.querySelector('#topbar').getBoundingClientRect().top);
  expect(await top()).toBe(0);
  // Discord gives the covered edges as CSS variables
  await page.addStyleTag({ content: ':root { --discord-safe-area-inset-top: 56px; --discord-safe-area-inset-bottom: 20px; }' });
  expect(await top()).toBeCloseTo(56, 1);
  expect(await page.evaluate(() => innerHeight - document.querySelector('#status').getBoundingClientRect().bottom)).toBeCloseTo(20, 1);
});
