// The Blur and Noise brushes' pictures.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { blurRGBA, noiseRGBA } from '../../src/lib/blend.ts';

const img = (w, h, f) => {
  const d = new Uint8ClampedArray(w * h * 4);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) d.set(f(x, y), (y * w + x) * 4);
  return d;
};
const px = (d, w, x, y) => [...d.slice((y * w + x) * 4, (y * w + x) * 4 + 4)];

test('blur: a hard black / white edge becomes a soft ramp; far from it nothing changes', () => {
  const w = 40, h = 4, d = img(w, h, (x) => (x < 20 ? [0, 0, 0, 255] : [255, 255, 255, 255]));
  const b = blurRGBA(d, w, h, 3);
  assert.deepEqual(px(b, w, 2, 1), [0, 0, 0, 255]);
  assert.deepEqual(px(b, w, 37, 1), [255, 255, 255, 255]);
  const mid = [17, 18, 19, 20, 21, 22].map(x => px(b, w, x, 1)[0]);
  for (let i = 1; i < mid.length; i++) assert.ok(mid[i] > mid[i - 1], 'rises across the edge: ' + mid);
  assert.ok(mid[0] > 0 && mid[5] < 255);
});

test('blur: red next to transparent stays red (no dark fringe) – the edge fades out instead', () => {
  const w = 30, h = 3, d = img(w, h, (x) => (x < 15 ? [255, 0, 0, 255] : [0, 0, 0, 0]));
  const b = blurRGBA(d, w, h, 3);
  const e = px(b, w, 15, 1);
  assert.ok(e[3] > 40 && e[3] < 215, 'half transparent at the edge: ' + e);
  assert.ok(e[0] >= 254 && e[1] <= 1 && e[2] <= 1, 'still pure red: ' + e);
});

test('noise: grain around the color (mean about the same, spread about amount × 0.6), alpha kept', () => {
  const w = 100, h = 100, d = img(w, h, () => [128, 128, 128, 200]);
  const n = noiseRGBA(d, w, h, 20, false, 7);
  let sum = 0, sq = 0;
  for (let i = 0; i < w * h; i++) {
    const v = n[i * 4] - 128;
    sum += v; sq += v * v;
    assert.equal(n[i * 4 + 3], 200);
    assert.equal(n[i * 4], n[i * 4 + 1]); // the same in red, green, blue
  }
  const mean = sum / (w * h), sd = Math.sqrt(sq / (w * h) - mean * mean);
  assert.ok(Math.abs(mean) < 1, 'mean ' + mean);
  assert.ok(Math.abs(sd - 12) < 1.5, 'sd ' + sd);
});

test('noise: colored grain differs per channel; transparent pixels are left alone; same seed, same grain', () => {
  const w = 20, h = 20, d = img(w, h, (x) => (x < 10 ? [100, 100, 100, 255] : [0, 0, 0, 0]));
  const n = noiseRGBA(d, w, h, 30, true, 3);
  let differ = 0;
  for (let y = 0; y < h; y++) for (let x = 0; x < 10; x++) { const p = px(n, w, x, y); if (p[0] !== p[1] || p[1] !== p[2]) differ++; }
  assert.ok(differ > 150);
  assert.deepEqual(px(n, w, 15, 5), [0, 0, 0, 0]);
  assert.deepEqual(noiseRGBA(d, w, h, 30, true, 3), n);
});
