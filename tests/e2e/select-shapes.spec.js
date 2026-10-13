// Shaped selections (lasso, magnetic lasso, magic wand; add / subtract) and removing things: Fill from
// surroundings for a selection, and the Remove brush.
const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;

async function open(page, draw) {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.evaluate(draw);
  await page.click('#btn-fit');
}
const evFor = (page) => (kind, x, y, opts = {}) => page.evaluate(([kind, x, y, opts]) => {
  const p = RZ.screen(x, y);
  document.querySelector('#view').dispatchEvent(new PointerEvent(kind, { bubbles: true, pointerId: 1, pointerType: 'mouse', clientX: p.x, clientY: p.y, button: 0, buttons: 1, isPrimary: true, ...opts }));
}, [kind, x, y, opts]);
const at = (page, x, y) => page.evaluate(([x, y]) => RZ.colorAt(x, y), [x, y]);
const selected = (page, x, y) => page.evaluate(([x, y]) => {
  const s = RZ.state.sel;
  if (!s || x < s.x || y < s.y || x >= s.x + s.w || y >= s.y + s.h) return false;
  return !s.mask || s.mask[(y - s.y) * s.w + (x - s.x)] >= 128;
}, [x, y]);

// white, with a red disc (radius 20 at 40, 40) and a blue square (90–110, 30–50)
const scene = () => {
  RZ.blank(140, 80);
  const x = RZ.doc.getContext('2d');
  x.fillStyle = '#ff0000'; x.beginPath(); x.arc(40, 40, 20, 0, 7); x.fill();
  x.fillStyle = '#0000ff'; x.fillRect(90, 30, 20, 20);
  RZ.commit();
};

test('the magic wand selects the disc; Shift adds the square; clearing follows the shape', async ({ page }) => {
  await open(page, scene);
  await h.key(page, 'v');
  await page.locator('#sel-shape button[data-shape=wand]').click();
  await expect(page.locator('#sel-wand-row')).toBeVisible();
  const ev = evFor(page);
  await ev('pointerdown', 40, 40); await ev('pointerup', 40, 40);
  expect(await selected(page, 40, 40)).toBe(true);
  expect(await selected(page, 22, 22)).toBe(false); // in the disc's box, outside the disc
  expect(await page.evaluate(() => !!RZ.state.sel.mask)).toBe(true);
  await ev('pointerdown', 100, 40, { shiftKey: true }); await ev('pointerup', 100, 40, { shiftKey: true });
  expect(await selected(page, 100, 40)).toBe(true);
  expect(await selected(page, 40, 40)).toBe(true);
  // clear: both shapes go, the white corner between them stays
  await page.click('#btn-sel-del');
  expect(await at(page, 40, 40)).toBe(null);
  expect(await at(page, 100, 40)).toBe(null);
  expect(await at(page, 22, 22)).toBe('#ffffff');
});

test('lasso and Subtract; moving a shaped selection carries only its shape', async ({ page }) => {
  await open(page, scene);
  await h.key(page, 'v');
  await page.locator('#sel-shape button[data-shape=lasso]').click();
  const ev = evFor(page);
  // a diamond round the disc
  const ring = [[40, 12], [68, 40], [40, 68], [12, 40], [40, 12]];
  await ev('pointerdown', ...ring[0]);
  for (const p of ring.slice(1)) await ev('pointermove', ...p);
  await ev('pointerup', ...ring[ring.length - 1]);
  expect(await selected(page, 40, 40)).toBe(true);
  expect(await selected(page, 15, 15)).toBe(false);
  // take the right half away
  await page.locator('#sel-op button[data-op=subtract]').click();
  await page.locator('#sel-shape button[data-shape=rect]').click();
  await ev('pointerdown', 40, 0); await ev('pointermove', 80, 80); await ev('pointerup', 80, 80);
  expect(await selected(page, 30, 40)).toBe(true);
  expect(await selected(page, 50, 40)).toBe(false);
  // move what is left 60 px down… within the image: 40 px right
  await page.locator('#sel-op button[data-op=new]').click();
  await ev('pointerdown', 30, 40); await ev('pointermove', 50, 40); await ev('pointermove', 70, 40); await ev('pointerup', 70, 40);
  await page.keyboard.press('Enter');
  // the left half of the disc moved right by 40; where it was is clear; its right half stayed
  expect(await at(page, 70, 40)).toBe('#ff0000');
  expect(await at(page, 30, 40)).toBe(null);
  expect(await at(page, 50, 40)).toBe('#ff0000');
});

test('the magnetic lasso snaps to the disc’s edge', async ({ page }) => {
  await open(page, scene);
  await h.key(page, 'v');
  await page.locator('#sel-shape button[data-shape=magnetic]').click();
  const ev = evFor(page);
  // a rough circle a few pixels off the edge
  const pts = [];
  for (let k = 0; k <= 24; k++) { const a = k / 24 * Math.PI * 2, r = 20 + (k % 2 ? 4 : -3); pts.push([40 + r * Math.cos(a), 40 + r * Math.sin(a)]); }
  await ev('pointerdown', ...pts[0]);
  for (const p of pts.slice(1)) await ev('pointermove', ...p);
  await ev('pointerup', ...pts[pts.length - 1]);
  const s = await page.evaluate(() => { const s = RZ.state.sel; return s && { x: s.x, y: s.y, w: s.w, h: s.h }; });
  // the box hugs the disc (20…60), not the rough drawing (16…64)
  expect(Math.abs(s.x - 20)).toBeLessThan(3);
  expect(Math.abs(s.x + s.w - 60)).toBeLessThan(3);
  expect(await selected(page, 40, 40)).toBe(true);
});

test('Fill from surroundings removes the selected square; the Remove brush removes what is painted over', async ({ page }) => {
  await open(page, () => {
    // a gray-green texture with a red dot and a blue square on it
    RZ.blank(140, 80);
    const x = RZ.doc.getContext('2d');
    for (let y = 0; y < 80; y++) for (let i = 0; i < 140; i++) { x.fillStyle = (i + y) % 3 ? '#5a7a5a' : '#6a8a6a'; x.fillRect(i, y, 1, 1); }
    x.fillStyle = '#0000ff'; x.fillRect(90, 30, 16, 16);
    x.fillStyle = '#ff0000'; x.beginPath(); x.arc(40, 40, 5, 0, 7); x.fill();
    RZ.commit();
  });
  const ev = evFor(page);
  await h.key(page, 'v');
  await page.locator('#sel-shape button[data-shape=rect]').click();
  await ev('pointerdown', 88, 28); await ev('pointermove', 108, 48); await ev('pointerup', 108, 48);
  await page.click('#btn-sel-fill');
  await expect(page.locator('#st-msg')).toContainText('Removed', { timeout: 15000 });
  const g = (c) => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
  const [r, gg, b] = g(await at(page, 98, 38));
  expect(b).toBeLessThan(140);
  expect(gg).toBeGreaterThan(r);
  // the Remove brush over the red dot
  await h.key(page, 'r');
  expect(await page.evaluate(() => RZ.state.tool)).toBe('remove');
  await page.evaluate(() => { RZ.state.size = 16; });
  await ev('pointerdown', 37, 40); await ev('pointermove', 43, 40); await ev('pointerup', 43, 40);
  await expect.poll(async () => g(await at(page, 40, 40))[0], { timeout: 15000 }).toBeLessThan(150);
  // two undo steps: the dot is back
  await page.click('#btn-undo');
  expect(await at(page, 40, 40)).toBe('#ff0000');
});
