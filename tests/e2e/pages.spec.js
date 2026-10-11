const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;

const lines = (page) => h.count(page, '#mz-shapes line');
const tabs = (page) => page.locator('#page-tabs .page-tab button:not(.page-more)').allTextContents();

test('pages keep their own drawing and undo steps', async ({ page }) => {
  await h.open(page);
  await h.key(page, 'l');
  await h.drag(page, { x: 500, y: 0 }, { x: 500, y: 1000 });
  await page.click('#page-add');
  expect(await tabs(page)).toEqual(['Page 1', 'Page 2']);
  expect(await lines(page)).toBe(0);
  await h.key(page, 'l');
  await h.drag(page, { x: 0, y: 300 }, { x: 1000, y: 300 });
  await h.drag(page, { x: 0, y: 700 }, { x: 1000, y: 700 });
  expect(await lines(page)).toBe(2);
  await page.click('#page-tabs >> text=Page 1');
  expect(await lines(page)).toBe(1);
  await page.click('#page-tabs >> text=Page 2');
  expect(await lines(page)).toBe(2);
  await page.keyboard.press('Control+z'); // page 2's own history
  expect(await lines(page)).toBe(1);
});

test('all pages are saved in one file and come back when it is opened', async ({ page }) => {
  await h.open(page);
  await h.key(page, 'l');
  await h.drag(page, { x: 500, y: 0 }, { x: 500, y: 1000 });
  await page.click('#page-add');
  await h.drag(page, { x: 0, y: 500 }, { x: 1000, y: 500 });
  await h.drag(page, { x: 0, y: 200 }, { x: 1000, y: 200 });
  await page.dblclick('#page-tabs >> text=Page 2');
  await h.answer(page, 'Back');
  // (the new name is applied once the question has closed)
  await expect.poll(() => page.evaluate(() => MZ.buildSVGString())).toContain('data-page-name="Back"');
  const svg = await page.evaluate(() => MZ.buildSVGString());
  expect(svg).toContain('id="mosaic-pages"');

  // other programs only see the current page; Mosaic Paint reads them all
  await page.evaluate(() => MZ.loadSVGText('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"></svg>', { restore: true }));
  expect(await tabs(page)).toEqual(['Page 1']);
  await page.evaluate((s) => MZ.loadSVGText(s), svg);
  expect(await tabs(page)).toEqual(['Page 1', 'Back']);
  expect(await lines(page)).toBe(2); // "Back" was the current page
  await page.click('#page-tabs >> text=Page 1');
  expect(await lines(page)).toBe(1);
});

test('pages survive a reload and can be duplicated, moved and deleted', async ({ page }) => {
  await h.open(page);
  await h.key(page, 'l');
  await h.drag(page, { x: 500, y: 0 }, { x: 500, y: 1000 });
  await page.click('#page-tabs .page-more');
  await page.click('#page-menu >> text=Duplicate');
  expect(await tabs(page)).toEqual(['Page 1', 'Page 1 copy']);
  expect(await lines(page)).toBe(1);
  await page.click('#page-tabs .page-more');
  await page.click('#page-menu >> text=Move left');
  expect(await tabs(page)).toEqual(['Page 1 copy', 'Page 1']);

  await page.waitForTimeout(1200); // autosave
  await page.reload();
  await page.waitForFunction(() => window.MZ && window.MZ.ready);
  expect(await tabs(page)).toEqual(['Page 1 copy', 'Page 1']);

  await page.click('#page-tabs .page-more');
  await page.click('#page-menu >> text=Delete…');
  await h.answer(page);
  expect(await tabs(page)).toEqual(['Page 1']);
  expect(await lines(page)).toBe(1);
});

test('New starts over with a single page', async ({ page }) => {
  await h.open(page);
  await page.click('#page-add');
  await page.click('#page-add');
  expect((await tabs(page)).length).toBe(3);
  await page.click('#btn-new');
  await h.answer(page);
  expect(await tabs(page)).toEqual(['Page 1']);
});
