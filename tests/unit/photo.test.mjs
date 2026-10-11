// Reading a photo laid over the drawing (lib/photo.ts) – what "Mosaic from photo" runs in the worker.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as Photo from '../../src/lib/photo.ts';

// 40 × 20 px: orange on the left, blue on the right, over a 200 × 100 mm page
const W = 40, H = 20, data = new Uint8ClampedArray(W * H * 4);
for (let i = 0; i < W * H; i++) data.set((i % W) < 20 ? [232, 116, 63, 255] : [74, 122, 160, 255], i * 4);
const photo = { data, W, H, box: { x: 0, y: 0, w: 200, h: 100 } };

test('the photo is read at drawing points', () => {
  const at = Photo.sampler(photo);
  assert.deepEqual(at({ x: 10, y: 10 }), [232, 116, 63]);
  assert.deepEqual(at({ x: 190, y: 90 }), [74, 122, 160]);
  assert.equal(at({ x: 250, y: 10 }), null);
  assert.ok(Photo.detailAt(at, 0, 0, 50, 50) < 1e-9); // one color: no detail
  assert.ok(Photo.detailAt(at, 50, 0, 100, 50) > 10); // across the edge
});

test('a tile layout and a palette from the photo', () => {
  const r = Photo.photoMosaic({ photo, page: photo.box, style: 'square', size: 20, detail: 0, seed: 1, eps: 0.01, maxTiles: 1000, suggest: 2 });
  assert.equal(r.tiles, 50);
  assert.ok(r.lines.length > 0);
  assert.equal(r.palette.length, 2);
  // too many tiles: no lines
  const big = Photo.photoMosaic({ photo, page: photo.box, style: 'square', size: 2, detail: 0, seed: 1, eps: 0.01, maxTiles: 1000, suggest: 0 });
  assert.equal(big.lines.length, 0);
  assert.ok(big.tiles > 1000);
});
