// Shaped selections (magic wand, combining, outlines, the magnetic lasso's path) and content-aware fill.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { wandMask, combine, maskBox, cropMask, fullMask, outline, edgeCost, cheapestPath, isFull } from '../../src/lib/selection.ts';
import { inpaint } from '../../src/lib/inpaint.ts';

const img = (w, h, f) => {
  const d = new Uint8ClampedArray(w * h * 4);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) d.set([...f(x, y), 255], (y * w + x) * 4);
  return { width: w, height: h, data: d };
};

test('the magic wand takes the touching area of similar color, or all of it', () => {
  // two red squares apart on white
  const im = img(20, 10, (x) => ((x >= 2 && x < 6) || (x >= 12 && x < 16) ? [250, 0, 0] : [255, 255, 255]));
  const m = wandMask(im, 3, 5, 20, true);
  assert.equal(m[5 * 20 + 3], 255);
  assert.equal(m[5 * 20 + 13], 0);
  assert.deepEqual(maskBox(m, 20, 10), { x: 2, y: 0, w: 4, h: 10 });
  const all = wandMask(im, 3, 5, 20, false);
  assert.equal(all[5 * 20 + 13], 255);
  assert.equal(all[5 * 20 + 8], 0);
});

test('adding, subtracting, cropping and back', () => {
  const a = new Uint8Array(16), b = new Uint8Array(16);
  a.set([255, 255], 0); b.set([255, 255], 1);
  assert.deepEqual([...combine(a, b, 'add').slice(0, 4)], [255, 255, 255, 0]);
  assert.deepEqual([...combine(a, b, 'subtract').slice(0, 4)], [255, 0, 0, 0]);
  assert.deepEqual([...combine(a, b, 'new').slice(0, 4)], [0, 255, 255, 0]);
  const full = fullMask({ x: 1, y: 1, w: 2, h: 2 }, null, 4, 4);
  const box = maskBox(full, 4, 4);
  assert.deepEqual(box, { x: 1, y: 1, w: 2, h: 2 });
  assert.ok(isFull(cropMask(full, 4, box)));
});

test('the outline goes round the selected pixels', () => {
  // a 2 × 2 square: 4 sides, one segment each
  const m = new Uint8Array([255, 255, 255, 255]);
  const segs = outline(m, 2, 2);
  assert.equal(segs.length, 4 * 4);
  const len = segs.reduce((s, v, i) => (i % 4 === 0 ? s + Math.hypot(segs[i + 2] - v, segs[i + 3] - segs[i + 1]) : s), 0);
  assert.equal(len, 8);
});

test('the magnetic lasso’s path follows an edge instead of cutting across', () => {
  // a dark disc on light: from its top to its right, the path should hug the circle (radius 20), not the chord
  const im = img(80, 80, (x, y) => (Math.hypot(x - 40, y - 40) < 20 ? [30, 30, 30] : [220, 220, 220]));
  const cost = edgeCost(im);
  const path = cheapestPath(cost, 80, 80, { x: 40, y: 20 }, { x: 60, y: 40 }, 20);
  assert.ok(path.length > 10);
  const mid = path[Math.floor(path.length / 2)];
  // on the chord the middle would be ~14 from the centre; on the circle ~20
  assert.ok(Math.abs(Math.hypot(mid.x - 40, mid.y - 40) - 20) < 3, `middle at ${Math.hypot(mid.x - 40, mid.y - 40).toFixed(1)}`);
});

test('content-aware fill continues the stripes around a hole', () => {
  // vertical stripes, 4 px red / 4 px blue; a 12 × 12 hole in the middle
  const W = 64, H = 64, stripe = (x) => (Math.floor(x / 4) % 2 ? [40, 60, 200] : [200, 40, 40]);
  const im = img(W, H, (x) => stripe(x));
  const mask = new Uint8Array(W * H);
  for (let y = 26; y < 38; y++) for (let x = 26; x < 38; x++) { mask[y * W + x] = 255; im.data.set([0, 255, 0, 255], (y * W + x) * 4); }
  const t0 = Date.now();
  const out = inpaint(im, mask);
  const ms = Date.now() - t0;
  // no green left, and most filled pixels have their column's stripe color
  let right = 0, n = 0;
  for (let y = 27; y < 37; y++) for (let x = 27; x < 37; x++) {
    const i = (y * W + x) * 4, want = stripe(x);
    assert.ok(out[i + 1] < 120, 'green left at ' + x + ',' + y);
    if (Math.abs(out[i] - want[0]) < 60 && Math.abs(out[i + 2] - want[2]) < 60) right++;
    n++;
  }
  assert.ok(right / n > 0.75, `${right} of ${n} in the right stripe`);
  assert.ok(ms < 5000, `${ms} ms`);
  // outside the hole nothing changed
  assert.deepEqual([...out.slice(0, 8)], [...im.data.slice(0, 8)]);
});
