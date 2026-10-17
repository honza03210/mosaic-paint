// Blur and Noise brushes: paint to soften or to add grain – only where the brush goes, one undo step each.
const { test } = require('@playwright/test');
const { expect } = require('./helpers');

async function setup(page, paint) {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.evaluate(paint);
  await page.click('#btn-fit');
}
async function drag(page, pts) {
  const at = await page.evaluate((pts) => pts.map(([x, y]) => RZ.screen(x, y)), pts);
  await page.mouse.move(at[0].x, at[0].y);
  await page.mouse.down();
  for (const p of at.slice(1)) await page.mouse.move(p.x, p.y, { steps: 4 });
  await page.mouse.up();
}
const grey = (c) => parseInt(c.slice(1, 3), 16);

test('Blur (U): painting along a black / white edge softens it there – and only there', async ({ page }) => {
  await setup(page, () => {
    RZ.blank(120, 80, '#ffffff');
    const x = RZ.doc.getContext('2d');
    x.fillStyle = '#000000'; x.fillRect(0, 0, 60, 80);
    RZ.commit();
  });
  await page.keyboard.press('u');
  expect(await page.evaluate(() => RZ.state.tool)).toBe('blur');
  await expect(page.locator('#opt-blur')).toBeVisible();
  await page.evaluate(() => { RZ.state.size = 20; RZ.state.blurRadius = 4; RZ.state.tip = 'round'; });
  await drag(page, [[60, 10], [60, 40]]);
  // on the edge, inside the stroke: in between
  const v = grey(await page.evaluate(() => RZ.colorAt(59, 25)));
  expect(v).toBeGreaterThan(30);
  expect(v).toBeLessThan(225);
  // the same edge lower down, where the brush didn't go: still hard
  expect(await page.evaluate(() => [RZ.colorAt(59, 70), RZ.colorAt(60, 70)])).toEqual(['#000000', '#ffffff']);
  await page.click('#btn-undo');
  expect(await page.evaluate(() => RZ.colorAt(59, 25))).toBe('#000000');
});

test('Noise (N): grain where the brush goes; the rest stays smooth', async ({ page }) => {
  await setup(page, () => { RZ.blank(100, 60, '#808080'); });
  await page.keyboard.press('n');
  expect(await page.evaluate(() => RZ.state.tool)).toBe('noise');
  await page.evaluate(() => { RZ.state.size = 16; RZ.state.noiseAmount = 40; RZ.state.tip = 'round'; });
  await drag(page, [[20, 20], [80, 20]]);
  const inStroke = await page.evaluate(() => Array.from({ length: 30 }, (_, i) => RZ.colorAt(25 + i * 2, 20)));
  expect(new Set(inStroke).size).toBeGreaterThan(10);
  // film grain: grey stays grey
  for (const c of inStroke) expect(c.slice(1, 3) === c.slice(3, 5) && c.slice(3, 5) === c.slice(5, 7)).toBe(true);
  expect(await page.evaluate(() => [RZ.colorAt(50, 50), RZ.colorAt(10, 55)])).toEqual(['#808080', '#808080']);
});

test('Blur on a pasted-in cut-out: its hard edge fades out (transparent), not into black', async ({ page }) => {
  await setup(page, () => {
    RZ.blank(80, 40);
    const x = RZ.doc.getContext('2d');
    x.clearRect(0, 0, 80, 40);
    x.fillStyle = '#ff0000'; x.fillRect(0, 0, 40, 40);
    RZ.commit();
  });
  await page.evaluate(() => { RZ.setTool('blur'); RZ.state.size = 16; RZ.state.blurRadius = 4; RZ.state.tip = 'round'; });
  await drag(page, [[40, 5], [40, 35]]);
  const a = await page.evaluate(() => { const d = RZ.doc.getContext('2d').getImageData(39, 20, 2, 1).data; return [...d]; });
  // both sides of the edge: half see-through, still red
  expect(a[3]).toBeLessThan(250);
  expect(a[7]).toBeGreaterThan(5);
  expect(a[0]).toBeGreaterThan(240);
  expect(a[4]).toBeGreaterThan(240);
});
