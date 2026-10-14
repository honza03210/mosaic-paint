// Two fingers on a selection scale, turn and move it (spread / pinch, twist); elsewhere they zoom the view.
const { test } = require('@playwright/test');
const { expect } = require('./helpers');

/** Two fingers (image px): from a1, b1 to a2, b2 in a few steps. */
async function twoFingers(page, [a1, b1], [a2, b2]) {
  await page.evaluate(([a1, b1, a2, b2]) => {
    // (screen points worked out first: a zooming view would move them)
    const v = document.querySelector('#view'), at = ([x, y]) => RZ.screen(x, y), ev = (kind, id, p) => {
      v.dispatchEvent(new PointerEvent(kind, { bubbles: true, pointerId: id, pointerType: 'touch', isPrimary: id === 1, clientX: p.x, clientY: p.y, button: kind === 'pointermove' ? -1 : 0, buttons: kind === 'pointerup' ? 0 : 1 }));
    };
    const lerp = (p, q, t) => ({ x: p.x + (q.x - p.x) * t, y: p.y + (q.y - p.y) * t });
    [a1, b1, a2, b2] = [a1, b1, a2, b2].map(at);
    ev('pointerdown', 1, a1);
    ev('pointerdown', 2, b1);
    for (const t of [0.25, 0.5, 0.75, 1]) { ev('pointermove', 1, lerp(a1, a2, t)); ev('pointermove', 2, lerp(b1, b2, t)); }
    ev('pointerup', 1, a2);
    ev('pointerup', 2, b2);
  }, [a1, b1, a2, b2]);
}

async function setup(page) {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.evaluate(() => {
    RZ.blank(200, 200);
    const x = RZ.doc.getContext('2d');
    x.fillStyle = '#ff0000'; x.fillRect(80, 90, 40, 20); // a red bar, 40 × 20, centre 100, 100
    RZ.commit();
    RZ.state.selShape = 'rect';
    RZ.setTool('select');
    RZ.state.sel = { x: 80, y: 90, w: 40, h: 20 };
  });
  await page.click('#btn-fit');
}

test('spreading two fingers on the selection makes it twice as big', async ({ page }) => {
  await setup(page);
  const s0 = await page.evaluate(() => RZ.state.view.s);
  await twoFingers(page, [[90, 100], [110, 100]], [[80, 100], [120, 100]]);
  expect(await page.evaluate(() => RZ.state.view.s)).toBe(s0); // the view didn't zoom
  const f = await page.evaluate(() => { const f = RZ.state.floating; return [f.x, f.y, f.canvas.width, f.canvas.height]; });
  expect(f).toEqual([60, 80, 80, 40]);
  await page.keyboard.press('Enter');
  expect(await page.evaluate(() => [RZ.colorAt(65, 85), RZ.colorAt(135, 115), RZ.colorAt(100, 75)])).toEqual(['#ff0000', '#ff0000', '#ffffff']);
});

test('turning two fingers a quarter turn stands the bar up; a second gesture starts from the original pixels', async ({ page }) => {
  await setup(page);
  // a quarter turn (fingers 1° short of it: it snaps upright)
  const r = 20, a = (Math.PI / 2) - Math.PI / 180;
  await twoFingers(page, [[100 - r, 100], [100 + r, 100]], [[100 - r * Math.cos(a), 100 - r * Math.sin(a)], [100 + r * Math.cos(a), 100 + r * Math.sin(a)]]);
  const f = await page.evaluate(() => { const f = RZ.state.floating; return [f.x, f.y, f.canvas.width, f.canvas.height, f.xf.r]; });
  expect(f.slice(0, 4)).toEqual([90, 80, 20, 40]);
  expect(f[4]).toBeCloseTo(Math.PI / 2, 6);
  // half the size, then double again: no blur – sharp edges stay sharp (made from the original each time)
  await twoFingers(page, [[100, 80], [100, 120]], [[100, 90], [100, 110]]);
  await twoFingers(page, [[100, 90], [100, 110]], [[100, 80], [100, 120]]);
  const g = await page.evaluate(() => { const f = RZ.state.floating; return [f.x, f.y, f.canvas.width, f.canvas.height]; });
  expect(g).toEqual([90, 80, 20, 40]);
  await page.keyboard.press('Enter');
  expect(await page.evaluate(() => [RZ.colorAt(91, 81), RZ.colorAt(108, 118), RZ.colorAt(85, 100), RZ.colorAt(115, 100)])).toEqual(['#ff0000', '#ff0000', null, null]);
});

test('turned by an odd angle, it keeps its turned shape: placing leaves the corners around it', async ({ page }) => {
  await setup(page);
  const r = 20, a = Math.PI / 4;
  await twoFingers(page, [[100 - r, 100], [100 + r, 100]], [[100 - r * Math.cos(a), 100 - r * Math.sin(a)], [100 + r * Math.cos(a), 100 + r * Math.sin(a)]]);
  const f = await page.evaluate(() => { const f = RZ.state.floating; return { w: f.canvas.width, mask: !!f.mask }; });
  expect(f.mask).toBe(true);
  expect(f.w).toBeGreaterThan(40);
  await page.keyboard.press('Enter');
  expect(await page.evaluate(() => [RZ.colorAt(100, 100), !!RZ.state.sel.mask])).toEqual(['#ff0000', true]);
  // one undo: all back as it was
  await page.click('#btn-undo');
  expect(await page.evaluate(() => [RZ.colorAt(85, 95), RZ.colorAt(100, 85)])).toEqual(['#ff0000', '#ffffff']);
});

test('two fingers away from the selection still zoom the view', async ({ page }) => {
  await setup(page);
  const s0 = await page.evaluate(() => RZ.state.view.s);
  await twoFingers(page, [[20, 170], [40, 170]], [[10, 170], [50, 170]]);
  expect(await page.evaluate(() => RZ.state.view.s)).toBeCloseTo(s0 * 2, 3);
  expect(await page.evaluate(() => [!!RZ.state.floating, RZ.state.sel && RZ.state.sel.w])).toEqual([false, 40]);
});
