// Twist: pixels turned about a centre, the most at the centre, not at all at the circle's edge.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { twist, falloff } from '../../src/lib/twist.ts';

const img = (w, h, f) => {
  const d = new Uint8ClampedArray(w * h * 4);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) d.set(f(x, y), (y * w + x) * 4);
  return d;
};
const px = (r, x, y) => { const { box, data } = r, o = ((y - box.y) * box.w + (x - box.x)) * 4; return [...data.slice(o, o + 4)]; };
// left half red, right half blue
const W = 60, H = 60, halves = img(W, H, (x) => (x < 30 ? [255, 0, 0, 255] : [0, 0, 255, 255]));

test('no angle: nothing changes; the box is the circle, inside the image', () => {
  const r = twist(halves, W, H, 30, 30, 20, 0);
  assert.deepEqual(r.box, { x: 10, y: 10, w: 40, h: 40 });
  for (const [x, y] of [[12, 30], [48, 30], [30, 12]]) assert.deepEqual(px(r, x, y), [...halves.slice((y * W + x) * 4, (y * W + x) * 4 + 4)]);
  assert.deepEqual(twist(halves, W, H, 55, 30, 20, 1).box, { x: 35, y: 10, w: 25, h: 40 });
  assert.equal(twist(halves, W, H, -50, 30, 20, 1), null);
});

test('half a turn at the centre: near it the sides swap; at the edge and outside nothing moves', () => {
  const r = twist(halves, W, H, 30, 30, 24, Math.PI);
  // two pixels right of the centre: turned almost half round – it shows the left side's red
  assert.deepEqual(px(r, 32, 30).slice(0, 3), [255, 0, 0]);
  assert.deepEqual(px(r, 27, 30).slice(0, 3), [0, 0, 255]);
  // the corner of the box is outside the circle: unchanged
  assert.deepEqual(px(r, 7, 7), [255, 0, 0, 255]);
  assert.equal(falloff(24, 24), 0);
  assert.equal(falloff(0, 24), 1);
});

test('the colours stay pure, also next to transparent pixels; the mask limits it', () => {
  const holed = img(W, H, (x) => (x < 30 ? [255, 0, 0, 255] : [0, 0, 0, 0]));
  const r = twist(holed, W, H, 30, 30, 20, 1.2);
  for (let y = 12; y < 48; y++) for (let x = 12; x < 48; x++) { const p = px(r, x, y); if (p[3] > 8) assert.deepEqual(p.slice(0, 3), [255, 0, 0], `${x},${y}`); }
  // a mask with nothing in it: no change at all
  const none = twist(halves, W, H, 30, 30, 24, Math.PI, new Uint8Array(W * H));
  assert.deepEqual(px(none, 32, 30), [0, 0, 255, 255]);
});
