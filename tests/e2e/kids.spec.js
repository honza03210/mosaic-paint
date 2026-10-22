// The vector app's Simple mode, for children: only the basic tools and the colors.
const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;

test('Simple shows only the basic tools (with words), the colors and the essentials; Expert brings everything back', async ({ page }) => {
  const { errors } = await h.open(page, { mode: 'simple' });
  const visibleTools = () => page.evaluate(() => [...document.querySelectorAll('#tools button[data-tool]')].filter(b => b.offsetParent).map(b => b.dataset.tool));
  expect(await visibleTools()).toEqual(['select', 'line', 'ngon', 'ellipse', 'pattern', 'bucket']);
  await expect(page.locator('[data-tool=line] .tl')).toHaveText('Line');
  // the top bar: the essentials only
  for (const id of ['#btn-new', '#btn-save', '#btn-png', '#btn-undo', '#btn-redo', '#btn-fit', '#mode-switch']) await expect(page.locator(id)).toBeVisible();
  for (const id of ['#btn-open', '#btn-examples', '#btn-3d', '#btn-report', '#btn-share', '#btn-history', '#btn-copy-img', '#view-filter', '.app-switch']) await expect(page.locator(id)).toBeHidden();
  // the panel: the colors; no palette management, no outline color, no other sections
  await expect(page.locator('#palette')).toBeVisible();
  await expect(page.locator('#ac-fill')).toBeVisible();
  for (const id of ['#pal-select', '#ac-stroke', '#stroke-width', '#color-input', '#btn-pal-import', '#grout-on', '#motif-list', '#opt-snap', '#doc-w', '#page-add']) await expect(page.locator(id)).toBeHidden();
  // a key for a hidden tool does nothing
  await h.key(page, 'p');
  expect(await page.evaluate(() => MZ.state.tool)).not.toBe('free');
  // Expert: all of it again
  await page.click('#mode-switch [data-mode=expert]');
  expect((await visibleTools()).length).toBeGreaterThan(8);
  await expect(page.locator('#btn-report')).toBeVisible();
  await expect(page.locator('#pal-select')).toBeVisible();
  await expect(page.locator('[data-tool=line] .tl')).toBeHidden();
  expect(errors).toEqual([]);
});

test('the tools keep only their simplest choices: corners for Shapes, kind and size for Tiles', async ({ page }) => {
  await h.open(page, { mode: 'simple' });
  await page.click('[data-tool=ngon]');
  await expect(page.locator('#quick-sides')).toBeVisible();
  await expect(page.locator('#opt-sides')).toBeHidden();
  expect((await page.locator('section.tool-opts[data-for=ngon] h3').innerText()).toLowerCase()).toBe('shapes'); // (the Expert title is hidden)
  await expect(page.locator('#st-hint')).toContainText('Drag from the middle');
  await page.click('[data-tool=pattern]');
  await expect(page.locator('#pat-type')).toBeVisible();
  await expect(page.locator('#pat-size')).toBeHidden();
  // Big tiles: 6 across the page's shorter side
  await page.click('#pat-sizes [data-tiles="6"]');
  const { size, side } = await page.evaluate(() => ({ size: MZ.state.pattern.size, side: Math.min(MZ.state.doc.w, MZ.state.doc.h) }));
  expect(Math.abs(size - side / 6)).toBeLessThan(side / 600); // (rounded to 3 figures)
  await expect(page.locator('#pat-sizes [data-tiles="6"]')).toHaveClass(/active/);
  // the line and the bucket have nothing to set
  await page.click('[data-tool=bucket]');
  await expect(page.locator('section.tool-opts[data-for=bucket]')).toBeHidden();
});

test('a whole mosaic the simple way: big tiles over the page, then paint one', async ({ page }) => {
  await h.open(page, { mode: 'simple' });
  await page.click('[data-tool=pattern]');
  await page.click('#pat-sizes [data-tiles="6"]');
  await page.click('#btn-pat-page');
  expect(await h.count(page, '#mz-shapes line, #mz-shapes polyline, #mz-shapes path')).toBeGreaterThan(5);
  await page.click('[data-tool=bucket]');
  // a color, then a tile
  await page.locator('#palette .swatch').nth(3).click();
  const s = await h.scr(page, { x: 500, y: 500 });
  await page.mouse.click(s.x, s.y);
  expect(await h.count(page, '.mz-fill')).toBe(1);
});

test('the guide in Simple mode talks only about what children see', async ({ page }) => {
  await h.open(page, { mode: 'simple' });
  await page.click('#btn-guide');
  const card = page.locator('#guide');
  await expect(card.locator('.guide-count')).toHaveText('1 of 3');
  await card.locator('.guide-next').click();
  await expect(card.locator('.guide-text')).toContainText('Tiles fills an area');
  await card.locator('.guide-next').click();
  await card.locator('.guide-next').click();
  await expect(card).toBeHidden();
  // Expert: the full guide
  await page.click('#mode-switch [data-mode=expert]');
  await page.click('#btn-guide');
  await expect(card.locator('.guide-count')).toHaveText('1 of 5');
});
