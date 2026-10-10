const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;

async function paintedHexagon(page) {
  await h.key(page, 'g');
  await page.evaluate(() => { MZ.state.sides = 6; MZ.state.ngonMode = 'center'; });
  await h.drag(page, { x: 150, y: 150 }, { x: 150, y: 50 });
  await h.key(page, 'b');
  await h.setState(page, { fill: '#e76f51' });
  await h.click(page, { x: 150, y: 150 });
  await h.key(page, 'v');
  await page.keyboard.press('Control+a');
}
const hexCenter = (page) => page.evaluate(() => {
  const p = [...document.querySelectorAll('#mz-shapes polygon')].pop();
  return p.getAttribute('data-ngon').split(' ').slice(1, 4).map(Number);
});

test.beforeEach(async ({ context, browserName }) => {
  if (browserName === 'chromium') await context.grantPermissions(['clipboard-read', 'clipboard-write']);
});

test('copy on one page, paste on another, under the mouse', async ({ page }) => {
  await h.open(page);
  await paintedHexagon(page);
  await page.keyboard.press('Control+c');
  await expect(page.locator('#st-msg')).toContainText('Copied 1 shape');
  await page.click('#page-add');
  const s = await h.scr(page, { x: 600, y: 600 });
  await page.mouse.move(s.x, s.y);
  await page.keyboard.press('Control+v');
  await expect(page.locator('#st-msg')).toContainText('Pasted 1 shape');
  const [cx, cy, r] = await hexCenter(page);
  expect(h.near(cx, 600, 2) && h.near(cy, 600, 2) && h.near(r, 100, 1)).toBe(true);
  expect(await h.colorAt(page, { x: 600, y: 600 })).toBe('#e76f51');
  expect(await page.evaluate(() => MZ.state.selection.size)).toBe(1); // the pasted shape is selected (the bucket colored the hexagon itself)
});

test('pasting into a drawing in other units keeps the real size', async ({ page }) => {
  await h.open(page, { doc: h.blank(300, 300, 'mm') });
  await paintedHexagon(page);
  await page.keyboard.press('Control+c');
  await page.click('#page-add');
  await page.evaluate(() => { document.querySelector('#doc-unit').value = 'cm'; document.querySelector('#doc-unit').dispatchEvent(new Event('change')); });
  await page.mouse.move(1, 1); // off the drawing: paste where it was copied from (scaled)
  await page.keyboard.press('Control+v');
  const [, , r] = await hexCenter(page);
  expect(h.near(r, 10, 0.2)).toBe(true); // 100 mm = 10 cm
});

test('motifs: save, place twice, turn, and keep after a reload', async ({ page }) => {
  await h.open(page);
  await paintedHexagon(page);
  page.once('dialog', d => d.accept('Flower'));
  await page.click('#btn-motif-save');
  await expect(page.locator('#motif-list .motif')).toHaveCount(1);
  await expect(page.locator('#motif-list .motif span')).toHaveText('Flower');
  await page.click('#motif-list .motif');
  expect(await page.evaluate(() => MZ.state.tool)).toBe('place-motif');
  await h.click(page, { x: 500, y: 700 });
  await page.keyboard.press('Shift+R'); // a quarter turn
  await h.click(page, { x: 800, y: 700 });
  await page.keyboard.press('Escape');
  expect(await page.evaluate(() => MZ.state.tool)).toBe('select');
  const placed = await page.evaluate(() => [...document.querySelectorAll('#mz-shapes polygon')].map(p => p.getAttribute('data-ngon').split(' ').map(Number)));
  expect(placed.length).toBe(3);
  expect(h.near(placed[1][1], 500, 2) && h.near(placed[1][2], 700, 2)).toBe(true);
  expect(h.near(placed[2][4] - placed[1][4], 90, 0.01)).toBe(true);
  expect(await h.colorAt(page, { x: 800, y: 700 })).toBe('#e76f51');

  await page.reload();
  await page.waitForFunction(() => window.MZ && window.MZ.ready);
  await expect(page.locator('#motif-list .motif')).toHaveCount(1);
});

test('the motif library can be exported and imported', async ({ page, browserName }) => {
  test.skip(browserName === 'webkit' && process.platform === 'win32', 'Playwright WebKit on Windows cancels downloads (CI runs it on Linux)');
  await h.open(page);
  await paintedHexagon(page);
  page.once('dialog', d => d.accept('Star'));
  await page.click('#btn-motif-save');
  const [download] = await Promise.all([page.waitForEvent('download'), page.click('#btn-motif-export')]);
  const text = require('fs').readFileSync(await download.path(), 'utf8');
  page.once('dialog', d => d.accept());
  await page.locator('#motif-list .motif .del').dispatchEvent('click'); // the button shows on hover
  await expect(page.locator('#motif-list .motif')).toHaveCount(0);
  await page.setInputFiles('#motif-file', { name: 'motifs.json', mimeType: 'application/json', buffer: Buffer.from(text) });
  await expect(page.locator('#motif-list .motif span')).toHaveText('Star');
});
