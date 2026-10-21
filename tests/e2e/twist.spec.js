// The Twist tool: press at the centre, drag out for the size, go round to swirl – one undo step; a selection limits it.
const { test } = require('@playwright/test');
const { expect } = require('./helpers');

const RED = '#ff0000', BLUE = '#0000ff';
async function setup(page) {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.evaluate(() => {
    RZ.blank(200, 200);
    const x = RZ.doc.getContext('2d');
    // left half red, right half blue
    x.fillStyle = '#ff0000'; x.fillRect(0, 0, 100, 200);
    x.fillStyle = '#0000ff'; x.fillRect(100, 0, 100, 200);
    RZ.commit();
  });
  await page.click('#btn-fit');
  await page.keyboard.press('w');
}
/** Press at the centre, out to radius r, then round by `turn` radians (image px; the pointer as a mouse or finger). */
async function gesture(page, c, r, turn, type = 'mouse') {
  await page.evaluate(({ c, r, turn, type }) => {
    const v = document.querySelector('#view');
    const ev = (kind, [x, y]) => { const p = RZ.screen(x, y); v.dispatchEvent(new PointerEvent(kind, { bubbles: true, pointerId: 3, pointerType: type, isPrimary: true, clientX: p.x, clientY: p.y, button: kind === 'pointermove' ? -1 : 0, buttons: kind === 'pointerup' ? 0 : 1 })); };
    ev('pointerdown', [c[0], c[1]]);
    for (let k = 1; k <= 4; k++) ev('pointermove', [c[0], c[1] - r * k / 4]);
    const n = 24;
    let at = [c[0], c[1] - r];
    for (let k = 1; k <= n; k++) { const a = -Math.PI / 2 + turn * k / n; at = [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]; ev('pointermove', at); }
    ev('pointerup', at);
  }, { c, r, turn, type });
}
const colors = (page, pts) => page.evaluate((pts) => pts.map(([x, y]) => RZ.colorAt(x, y)), pts);

test('half a turn round the centre swaps the sides near it; outside the circle nothing moves; one undo', async ({ page }) => {
  await setup(page);
  expect(await page.evaluate(() => RZ.state.tool)).toBe('twist');
  await expect(page.locator('section.tool-opts[data-for="twist"]')).toBeVisible();
  await gesture(page, [100, 100], 60, Math.PI);
  expect(await colors(page, [[103, 100], [96, 100]])).toEqual([RED, BLUE]);
  // outside the circle
  expect(await colors(page, [[20, 100], [180, 100], [90, 20]])).toEqual([RED, BLUE, RED]);
  // inside the circle the straight line between red and blue is a swirl now: blue reaches into the left half
  const left = await colors(page, Array.from({ length: 81 }, (_, i) => [60 + (i % 9) * 4, 60 + Math.floor(i / 9) * 10]));
  expect(left.filter(c => c === BLUE).length).toBeGreaterThan(8);
  await page.click('#btn-undo');
  expect(await colors(page, [[103, 100], [96, 100]])).toEqual([BLUE, RED]);
});

test('going round and back again leaves it as it was (nothing to undo); a press alone does nothing', async ({ page }) => {
  await setup(page);
  await gesture(page, [100, 100], 50, 0);
  expect(await colors(page, [[103, 100], [96, 100]])).toEqual([BLUE, RED]);
  // no step was added: one undo takes away the painted halves themselves (back to the blank white)
  await page.click('#btn-undo');
  expect(await colors(page, [[103, 100]])).toEqual(['#ffffff']);
});

test('with a selection only the selected pixels twist', async ({ page }) => {
  await setup(page);
  // the top half selected
  await page.evaluate(() => { RZ.state.sel = { x: 0, y: 0, w: 200, h: 100 }; RZ.selectionChanged(); });
  await gesture(page, [100, 100], 60, Math.PI);
  expect(await colors(page, [[103, 96], [96, 96]])).toEqual([RED, BLUE]);
  // below the selection: unchanged
  expect(await colors(page, [[103, 104], [96, 104]])).toEqual([BLUE, RED]);
});

test('with a finger too', async ({ page }) => {
  await setup(page);
  await gesture(page, [100, 100], 60, -Math.PI, 'touch');
  expect(await colors(page, [[103, 100], [96, 100]])).toEqual([RED, BLUE]);
});
