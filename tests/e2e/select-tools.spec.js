// The selection's own toolbar (turn 90°, flip, duplicate, delete, cancel, place) and its rotate knob.
const { test } = require('@playwright/test');
const { expect } = require('./helpers');

const RED = '#ff0000', BLUE = '#0000ff', WHITE = '#ffffff';
async function setup(page) {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.evaluate(() => {
    RZ.blank(200, 200);
    const x = RZ.doc.getContext('2d');
    // a 40 × 20 bar at 80…120 × 90…110: red on the left, blue on the right
    x.fillStyle = '#ff0000'; x.fillRect(80, 90, 20, 20);
    x.fillStyle = '#0000ff'; x.fillRect(100, 90, 20, 20);
    RZ.commit();
    RZ.state.selShape = 'rect';
    RZ.setTool('select');
    RZ.state.sel = { x: 80, y: 90, w: 40, h: 20 };
    RZ.selectionChanged();
  });
  await page.click('#btn-fit');
}
const box = (page) => page.evaluate(() => { const f = RZ.state.floating; return [f.x, f.y, f.canvas.width, f.canvas.height]; });
const colors = (page, pts) => page.evaluate((pts) => pts.map(([x, y]) => RZ.colorAt(x, y)), pts);

test('the toolbar sits just below the selection; Place and Cancel only once it is lifted', async ({ page }) => {
  await setup(page);
  const bar = page.locator('#stage-actions');
  await expect(bar).toBeVisible();
  await expect(page.locator('#sa-fliph')).toBeVisible();
  await expect(page.locator('#sa-finish')).toBeHidden();
  const b = await bar.boundingBox(), bottom = await page.evaluate(() => RZ.screen(100, 110).y);
  expect(b.y).toBeGreaterThan(bottom);
  expect(b.y).toBeLessThan(bottom + 40);
  await page.click('#sa-rotr');
  await expect(page.locator('#sa-finish')).toBeVisible();
  await page.click('#sa-cancel');
  expect(await colors(page, [[85, 100], [115, 100]])).toEqual([RED, BLUE]);
  // another tool: no toolbar
  await page.evaluate(() => RZ.setTool('brush'));
  await expect(bar).toBeHidden();
});

test('turn right, then flip on screen: a turned piece still mirrors the way it looks', async ({ page }) => {
  await setup(page);
  await page.click('#sa-rotr');
  // a quarter turn clockwise: standing up, red at the top
  expect(await box(page)).toEqual([90, 80, 20, 40]);
  await page.click('#sa-fliph'); // left ↔ right: still red at the top
  await page.click('#sa-finish');
  expect(await colors(page, [[100, 85], [100, 115], [85, 100]])).toEqual([RED, BLUE, null]); // (where it was lifted from: transparent)
  // again, and flip top ↔ bottom: blue at the top
  await page.evaluate(() => { RZ.state.sel = { x: 90, y: 80, w: 20, h: 40 }; RZ.selectionChanged(); });
  await page.click('#sa-flipv');
  await page.click('#sa-finish');
  expect(await colors(page, [[100, 85], [100, 115]])).toEqual([BLUE, RED]);
});

test('four quarter turns (either way) come back pixel for pixel; one undo undoes them all', async ({ page }) => {
  await setup(page);
  for (const id of ['#sa-rotr', '#sa-rotr', '#sa-rotl', '#sa-rotr', '#sa-rotr', '#sa-rotr']) await page.click(id);
  expect(await box(page)).toEqual([80, 90, 40, 20]);
  await page.click('#sa-finish');
  expect(await colors(page, [[80, 90], [99, 109], [100, 90], [119, 109], [79, 100], [120, 100]])).toEqual([RED, RED, BLUE, BLUE, WHITE, WHITE]);
  await page.click('#btn-undo');
  expect(await page.evaluate(() => RZ.alphaAt(100, 100))).toBe(255);
});

test('flip horizontally swaps the ends; duplicate leaves a copy; delete clears', async ({ page }) => {
  await setup(page);
  await page.click('#sa-fliph');
  await page.click('#sa-finish');
  expect(await colors(page, [[85, 100], [115, 100]])).toEqual([BLUE, RED]);
  // duplicate: a copy stays, the selection moves on a little
  await page.evaluate(() => { RZ.state.sel = { x: 80, y: 90, w: 40, h: 20 }; RZ.selectionChanged(); });
  await page.click('#sa-dup');
  const [x, y] = await box(page);
  expect(x).toBeGreaterThan(80);
  expect(y).toBeGreaterThan(90);
  await page.click('#sa-finish');
  expect(await colors(page, [[81, 91], [x + 38, y + 18]])).toEqual([BLUE, RED]);
  await page.click('#sa-del');
  expect(await page.evaluate(([x, y]) => RZ.alphaAt(x + 38, y + 18), [x, y])).toBe(0);
});

test('the rotate knob: drag it round – it snaps upright; Shift turns in 15° steps', async ({ page, browserName }) => {
  test.skip(browserName === 'webkit', 'synthetic mouse with Shift: checked in Chromium and Firefox');
  await setup(page);
  // the knob is above the top edge's middle
  const knob = await page.evaluate(() => { const s = RZ.screen(100, 90); return { x: s.x, y: s.y - 26 }; });
  const c = await page.evaluate(() => RZ.screen(100, 100));
  await page.mouse.move(knob.x, knob.y);
  expect(await page.evaluate(() => document.querySelector('#view').style.cursor)).toBe('grab');
  await page.mouse.down();
  // round to the right of the centre, 2° short of a quarter turn
  const a = (88 * Math.PI) / 180, R = 60;
  await page.mouse.move(c.x + R * Math.sin(a), c.y - R * Math.cos(a), { steps: 6 });
  await page.mouse.up();
  expect(await page.evaluate(() => RZ.state.floating.xf.r)).toBeCloseTo(Math.PI / 2, 6);
  expect(await box(page)).toEqual([90, 80, 20, 40]);
  // Shift: 15° steps (40° → 45°)
  // turned: the knob is to the right – half the height, then the gap
  const k2 = await page.evaluate(() => { const s = RZ.screen(100, 100); return { x: s.x + 10 * RZ.state.view.s + 26, y: s.y }; });
  await page.mouse.move(k2.x, k2.y);
  await page.keyboard.down('Shift');
  await page.mouse.down();
  const b = (90 + 40) * Math.PI / 180;
  await page.mouse.move(c.x + R * Math.sin(b), c.y - R * Math.cos(b), { steps: 6 });
  await page.mouse.up();
  await page.keyboard.up('Shift');
  expect(await page.evaluate(() => RZ.state.floating.xf.r * 180 / Math.PI)).toBeCloseTo(135, 4);
});
