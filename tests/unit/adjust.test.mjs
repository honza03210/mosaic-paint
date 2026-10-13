// Photo fixes and healing on plain pixel arrays.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { applyAdjust, autoLevels, toneLUT, NO_ADJUST, isNoAdjust, blurPlane } from '../../src/lib/adjust.ts';
import { heal } from '../../src/lib/heal.ts';

const img = (w, h, f) => {
  const d = new Uint8ClampedArray(w * h * 4);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) d.set([...f(x, y), 255], (y * w + x) * 4);
  return d;
};
const px = (d, w, x, y) => [...d.slice((y * w + x) * 4, (y * w + x) * 4 + 4)];

test('no adjustment changes nothing', () => {
  const d = img(8, 8, (x, y) => [x * 30, y * 30, 100]);
  assert.ok(isNoAdjust({ ...NO_ADJUST }));
  assert.deepEqual([...applyAdjust(d, 8, 8, NO_ADJUST)], [...d]);
});

test('levels stretch the range; brightness and contrast move values the expected way', () => {
  const lut = toneLUT({ ...NO_ADJUST, black: 50, white: 200 });
  assert.equal(lut[50], 0);
  assert.equal(lut[200], 255);
  assert.equal(lut[125], 128);
  assert.ok(toneLUT({ ...NO_ADJUST, brightness: 20 })[100] > 140);
  const c = toneLUT({ ...NO_ADJUST, contrast: 50 });
  assert.ok(c[200] > 200 && c[60] < 60 && Math.abs(c[128] - 128) <= 1);
  // midtones: gamma > 1 lightens the middle, keeps the ends
  const g = toneLUT({ ...NO_ADJUST, gamma: 2 });
  assert.ok(g[128] > 160 && g[0] === 0 && g[255] === 255);
});

test('auto levels find the picture’s real range', () => {
  const d = img(100, 10, (x) => [60 + x, 60 + x, 60 + x]); // 60…159
  const { black, white } = autoLevels(d);
  assert.ok(black >= 60 && black <= 62, `black ${black}`);
  assert.ok(white >= 157 && white <= 159, `white ${white}`);
});

test('saturation 100 % less makes gray; alpha is kept', () => {
  const d = img(2, 1, () => [200, 50, 50]);
  d[7] = 77;
  const o = applyAdjust(d, 2, 1, { ...NO_ADJUST, saturation: -100 });
  const p = px(o, 2, 0, 0);
  assert.ok(Math.abs(p[0] - p[1]) <= 1 && Math.abs(p[1] - p[2]) <= 1);
  assert.equal(o[7], 77);
});

test('denoise smooths noise but keeps a strong edge; sharpen raises edge contrast', () => {
  let seed = 1;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647 - 0.5) * 30;
  const d = img(40, 40, (x) => { const v = (x < 20 ? 60 : 200) + rnd(); return [v, v, v]; });
  const o = applyAdjust(d, 40, 40, { ...NO_ADJUST, denoise: 100 });
  const spread = (a) => { let lo = 255, hi = 0; for (let y = 5; y < 35; y++) for (let x = 3; x < 15; x++) { const v = a[(y * 40 + x) * 4]; lo = Math.min(lo, v); hi = Math.max(hi, v); } return hi - lo; };
  assert.ok(spread(o) < spread(d) * 0.7, `noise ${spread(d)} → ${spread(o)}`);
  // the edge stays sharp: well apart on both sides
  assert.ok(px(o, 40, 17, 20)[0] < 100 && px(o, 40, 22, 20)[0] > 160);
  const e = img(20, 4, (x) => { const v = x < 10 ? 80 : 180; return [v, v, v]; });
  const s = applyAdjust(e, 20, 4, { ...NO_ADJUST, sharpen: 100 });
  assert.ok(px(s, 20, 9, 2)[0] < 80 && px(s, 20, 10, 2)[0] > 180);
});

test('blur keeps a flat plane flat and its average', () => {
  const p = new Float32Array(30 * 20).fill(42);
  assert.ok(blurPlane(p, 30, 20, 3).every(v => Math.abs(v - 42) < 1e-3));
});

test('healing puts the patch’s texture in the colors around the healed spot', () => {
  const w = 60, h = 40;
  // the picture: light gray with a dark blemish in the middle; the patch: a darker, textured area
  const dst = img(w, h, (x, y) => (Math.hypot(x - 30, y - 20) < 5 ? [20, 20, 20] : [200, 200, 200]));
  const src = img(w, h, (x, y) => { const v = 100 + ((x + y) % 2 ? 10 : -10); return [v, v, v]; });
  const mask = new Uint8ClampedArray(w * h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) mask[y * w + x] = Math.hypot(x - 30, y - 20) < 8 ? 255 : 0;
  const out = heal(dst, src, mask, w, h, 6);
  // the blemish is gone: the healed middle is light like its surroundings, not dark like the patch or the blemish
  const mid = px(out, w, 30, 20)[0];
  assert.ok(mid > 170 && mid < 230, `middle ${mid}`);
  // the texture came along: neighbours still differ
  assert.ok(Math.abs(px(out, w, 30, 20)[0] - px(out, w, 31, 20)[0]) > 10);
  // outside the mask nothing changed
  assert.deepEqual(px(out, w, 2, 2), px(dst, w, 2, 2));
});
