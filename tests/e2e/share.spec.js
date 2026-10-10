const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;

test.beforeEach(async ({ context, browserName }) => {
  if (browserName === 'chromium') await context.grantPermissions(['clipboard-read', 'clipboard-write']);
});

async function shareLink(page) {
  await page.click('#btn-share');
  await expect(page.locator('#share-link')).toHaveValue(/#view=z/);
  const link = await page.inputValue('#share-link');
  await page.keyboard.press('Escape');
  return link;
}

test('a share link opens read-only and leaves the visitor\'s own drawing alone', async ({ page, context }) => {
  // the "sender": one painted line drawing
  await h.open(page);
  await h.key(page, 'l');
  await h.drag(page, { x: 500, y: 0 }, { x: 500, y: 1000 });
  await h.key(page, 'b');
  await h.setState(page, { fill: '#e76f51' });
  await h.click(page, { x: 250, y: 500 });
  const link = await shareLink(page);
  // now their own drawing changes (two lines), and is autosaved
  await h.key(page, 'l');
  await h.drag(page, { x: 0, y: 500 }, { x: 1000, y: 500 });
  await page.waitForTimeout(1200);

  // the link opened in another tab of the same browser
  const viewer = await context.newPage();
  await viewer.goto(link);
  await expect(viewer.locator('#viewer-bar')).toBeVisible();
  await expect(viewer.locator('#tools')).toBeHidden();
  await expect.poll(() => h.count(viewer, '#mz-shapes line')).toBe(1);
  expect(await h.colorAt(viewer, { x: 250, y: 500 })).toBe('#e76f51');
  await viewer.keyboard.press('l'); // editing keys do nothing
  expect(await viewer.evaluate(() => MZ.state.tool)).toBe('pan');

  // back to my drawing: the two-line drawing is still there
  await viewer.click('#viewer-close');
  await viewer.waitForFunction(() => window.MZ && window.MZ.ready);
  expect(await h.count(viewer, '#mz-shapes line')).toBe(2);
  await expect(viewer.locator('#viewer-bar')).toBeHidden();
});

test('"Make my own copy" turns a shared mosaic into an editable drawing', async ({ page, context }) => {
  await h.open(page);
  await h.key(page, 'l');
  await h.drag(page, { x: 500, y: 0 }, { x: 500, y: 1000 });
  const link = await shareLink(page);
  const viewer = await context.newPage();
  await viewer.goto(link);
  await expect(viewer.locator('#viewer-bar')).toBeVisible();
  await viewer.click('#viewer-copy');
  await expect(viewer.locator('#viewer-bar')).toBeHidden();
  await expect(viewer.locator('#tools')).toBeVisible();
  expect(viewer.url()).not.toContain('#view=');
  await viewer.keyboard.press('l');
  expect(await viewer.evaluate(() => MZ.state.tool)).toBe('line');
  // and it is saved like any drawing
  await viewer.waitForTimeout(1200);
  await viewer.reload();
  await viewer.waitForFunction(() => window.MZ && window.MZ.ready);
  expect(await h.count(viewer, '#mz-shapes line')).toBe(1);
});
