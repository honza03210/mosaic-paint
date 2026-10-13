// The clone tool (raster): set where to copy from, paint the copy elsewhere; aligned or not; the source disc
// can be dragged; it copies the picture as it was when the stroke began.
const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;

async function setup(page) {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  // white, with a red block on the left (x 10–30, y 10–50)
  await page.evaluate(() => {
    RZ.blank(120, 60);
    const x = RZ.doc.getContext('2d');
    x.fillStyle = '#ff0000';
    x.fillRect(10, 10, 20, 40);
    RZ.commit();
    Object.assign(RZ.state, { size: 6, opacity: 1, tip: 'round' });
  });
  await page.click('#btn-fit');
  await h.key(page, 's');
  expect(await page.evaluate(() => RZ.state.tool)).toBe('clone');
}
const evFor = (page) => (kind, x, y, opts = {}) => page.evaluate(([kind, x, y, opts]) => {
  const p = RZ.screen(x, y);
  document.querySelector('#view').dispatchEvent(new PointerEvent(kind, { bubbles: true, pointerId: 1, pointerType: 'mouse', clientX: p.x, clientY: p.y, button: 0, buttons: 1, isPrimary: true, ...opts }));
}, [kind, x, y, opts]);
const at = (page, x, y) => page.evaluate(([x, y]) => RZ.colorAt(x, y), [x, y]);

test('the first click sets the source; painting copies from it, aligned from stroke to stroke', async ({ page }) => {
  await setup(page);
  const ev = evFor(page);
  const stroke = async (pts, opts) => { await ev('pointerdown', ...pts[0], opts); for (const p of pts.slice(1)) await ev('pointermove', ...p, opts); await ev('pointerup', ...pts[pts.length - 1], opts); };
  // no source yet: the first click sets it (and paints nothing)
  const image = () => page.evaluate(() => RZ.doc.getContext('2d').getImageData(0, 0, 120, 60).data.join());
  const before = await image();
  await stroke([[20, 20]]);
  expect(await image()).toBe(before);
  expect(await page.evaluate(() => RZ.state.clone.src)).toEqual({ x: 20, y: 20 });
  await expect(page.locator('#st-msg')).toContainText('Source set');
  await expect(page.locator('#clone-status')).toContainText('20, 20');
  // a stroke at x 70 copies the red block from x 20
  await stroke([[70, 20], [70, 30]]);
  expect(await at(page, 70, 25)).toBe('#ff0000');
  expect(await at(page, 100, 25)).toBe('#ffffff');
  // aligned: the next stroke keeps the offset (−50, 0) – at x 75, y 45 it copies x 25, y 45 (still red)
  expect(await page.evaluate(() => RZ.state.clone.src)).toEqual({ x: 20, y: 30 });
  await stroke([[75, 45]]);
  expect(await at(page, 75, 45)).toBe('#ff0000');
  // and outside the block's copy it stays white: x 90 copies x 40 (white)
  await stroke([[90, 45]]);
  expect(await at(page, 90, 45)).toBe('#ffffff');
});

test('not aligned: every stroke starts from the source; Alt+click and “Set source” set a new one; the disc can be dragged', async ({ page }) => {
  await setup(page);
  const ev = evFor(page);
  await page.locator('#opt-clone-aligned').uncheck();
  // Alt+click sets the source
  await ev('pointerdown', 15, 15, { altKey: true });
  await ev('pointerup', 15, 15, { altKey: true });
  expect(await page.evaluate(() => RZ.state.clone.src)).toEqual({ x: 15, y: 15 });
  for (const [x, y] of [[60, 50], [100, 10]]) {
    await ev('pointerdown', x, y);
    await ev('pointerup', x, y);
    expect(await at(page, x, y)).toBe('#ff0000');
  }
  // the source stays where it was
  expect(await page.evaluate(() => RZ.state.clone.src)).toEqual({ x: 15, y: 15 });
  // dragging the disc moves the source and paints nothing
  const steps = await page.evaluate(() => RZ.doc.getContext('2d').getImageData(0, 0, 120, 60).data.join());
  await ev('pointerdown', 15, 15);
  await ev('pointermove', 30, 40);
  await ev('pointermove', 55, 15);
  await ev('pointerup', 55, 15);
  expect(await page.evaluate(() => RZ.state.clone.src)).toEqual({ x: 55, y: 15 });
  expect(await page.evaluate(() => RZ.doc.getContext('2d').getImageData(0, 0, 120, 60).data.join())).toBe(steps);
  // "Set source": the next click sets it, without painting
  await page.click('#btn-clone-source');
  await expect(page.locator('#btn-clone-source')).toHaveClass(/active/);
  await ev('pointerdown', 25, 45);
  await ev('pointerup', 25, 45);
  expect(await page.evaluate(() => RZ.state.clone.src)).toEqual({ x: 25, y: 45 });
  await expect(page.locator('#btn-clone-source')).not.toHaveClass(/active/);
  await ev('pointerdown', 110, 50);
  await ev('pointerup', 110, 50);
  expect(await at(page, 110, 50)).toBe('#ff0000');
});

test('a stroke copies the picture as it was when it began (it never copies its own paint)', async ({ page }) => {
  await setup(page);
  const ev = evFor(page);
  // the source on the block's right edge (x 29), painting rightwards from x 34: 5 px apart, so the brush
  // soon reaches pixels it has just painted red – but it copies the old, white ones
  await ev('pointerdown', 29, 30);
  await ev('pointerup', 29, 30);
  await ev('pointerdown', 34, 30);
  for (let x = 35; x <= 60; x++) await ev('pointermove', x, 30);
  await ev('pointerup', 60, 30);
  expect(await at(page, 34, 30)).toBe('#ff0000');
  // copying freshly painted pixels would carry the red on and on; from the old picture it ends at once
  expect(await at(page, 50, 30)).toBe('#ffffff');
});
