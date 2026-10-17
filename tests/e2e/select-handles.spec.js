// Corner handles (mouse, pen): drag one to scale the selection – the opposite corner stays put, proportions kept.
const { test } = require('@playwright/test');
const { expect } = require('./helpers');

async function setup(page) {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.evaluate(() => {
    RZ.blank(200, 200);
    const x = RZ.doc.getContext('2d');
    x.fillStyle = '#ff0000'; x.fillRect(80, 90, 40, 20);
    RZ.commit();
    RZ.state.selShape = 'rect';
    RZ.setTool('select');
    RZ.state.sel = { x: 80, y: 90, w: 40, h: 20 };
  });
  await page.click('#btn-fit');
}
/** The mouse, in image px. */
async function drag(page, pts) {
  const at = await page.evaluate((pts) => pts.map(([x, y]) => RZ.screen(x, y)), pts);
  await page.mouse.move(at[0].x, at[0].y);
  await page.mouse.down();
  for (const p of at.slice(1)) await page.mouse.move(p.x, p.y, { steps: 3 });
  await page.mouse.up();
}

test('dragging the bottom-right handle doubles the selection; the top-left corner stays', async ({ page }) => {
  await setup(page);
  // hovering the handle: a resize cursor
  const h = await page.evaluate(() => RZ.screen(120, 110));
  await page.mouse.move(h.x, h.y);
  expect(await page.evaluate(() => document.querySelector('#view').style.cursor)).toBe('nwse-resize');
  await drag(page, [[120, 110], [140, 120], [160, 130]]);
  const f = await page.evaluate(() => { const f = RZ.state.floating; return [f.x, f.y, f.canvas.width, f.canvas.height]; });
  expect(f).toEqual([80, 90, 80, 40]);
  await page.keyboard.press('Enter');
  expect(await page.evaluate(() => [RZ.colorAt(82, 92), RZ.colorAt(158, 128), RZ.colorAt(165, 135)])).toEqual(['#ff0000', '#ff0000', '#ffffff']);
  // one undo: as it was
  await page.click('#btn-undo');
  expect(await page.evaluate(() => [RZ.colorAt(118, 108), RZ.colorAt(130, 115)])).toEqual(['#ff0000', '#ffffff']);
});

test('the top-left handle makes it smaller towards the bottom-right corner; dragging inside still moves it', async ({ page }) => {
  await setup(page);
  await drag(page, [[80, 90], [90, 95], [100, 100]]);
  expect(await page.evaluate(() => { const f = RZ.state.floating; return [f.x, f.y, f.canvas.width, f.canvas.height]; })).toEqual([100, 100, 20, 10]);
  // inside: a move, not a scale
  await drag(page, [[110, 105], [120, 105], [130, 105]]);
  expect(await page.evaluate(() => { const f = RZ.state.floating; return [f.x, f.y, f.canvas.width]; })).toEqual([120, 100, 20]);
});
