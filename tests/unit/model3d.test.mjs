import test from 'node:test';
import assert from 'node:assert/strict';
import * as M from '../../src/lib/model3d.ts';

const S = { layerHeight: 0.2, layersPerColor: 3, baseLayers: 2 };

test('equal colors are covered by few rectangles', () => {
  const grid = [
    0, 0, 1, 1,
    0, 0, 1, 1,
    -1, -1, 1, 1,
  ];
  const r = M.greedyRects(grid, 4, 3);
  assert.deepEqual(r, [
    { x: 0, y: 0, w: 2, h: 2, level: 0 },
    { x: 2, y: 0, w: 2, h: 3, level: 1 },
  ]);
  // every colored cell is covered exactly once
  const n = r.reduce((s, q) => s + q.w * q.h, 0);
  assert.equal(n, grid.filter(v => v >= 0).length);
});

test('each color stands at its own height on the base plate', () => {
  const boxes = M.modelBoxes([0, 1, -1, 1], 2, 2, 0.5, S);
  assert.equal(boxes.length, 3); // base + one rectangle per color (the two 1-cells are one column)
  const close = (a, b) => Math.abs(a - b) < 1e-9;
  assert.ok(close(boxes[0].z1, 0.4) && boxes[0].x1 === 1 && boxes[0].y1 === 1);
  const top = (lv) => boxes.slice(1).filter(b => close(b.z1, M.topLayer(lv, S) * 0.2));
  assert.equal(top(0).length, 1);
  assert.equal(top(1).length, 1);
  assert.deepEqual([top(1)[0].y0, top(1)[0].y1], [0, 1]);
  assert.ok(close(M.topLayer(0, S) * 0.2, 1.0) && close(M.topLayer(1, S) * 0.2, 1.6));
  // y is flipped: the top-left cell of the picture is at the top (high y) of the model
  assert.deepEqual([top(0)[0].x0, top(0)[0].y0, top(0)[0].y1], [0, 0.5, 1]);
  assert.equal(M.modelHeight(2, S), 1.6);
});

test('the STL is closed and faces outwards: its volume is the sum of the boxes', () => {
  const boxes = M.modelBoxes([0, 0, 1, -1], 2, 2, 1, S);
  const buf = M.stl(boxes), dv = new DataView(buf);
  const n = dv.getUint32(80, true);
  assert.equal(n, boxes.length * 12);
  assert.equal(buf.byteLength, 84 + n * 50);
  let vol = 0;
  for (let t = 0; t < n; t++) {
    const o = 84 + t * 50 + 12, p = [0, 1, 2].map(k => [0, 1, 2].map(j => dv.getFloat32(o + (k * 3 + j) * 4, true)));
    const [a, b, c] = p;
    vol += (a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0]) + a[2] * (b[0] * c[1] - b[1] * c[0])) / 6;
  }
  const expected = boxes.reduce((s, b) => s + (b.x1 - b.x0) * (b.y1 - b.y0) * (b.z1 - b.z0), 0);
  assert.ok(Math.abs(vol - expected) < 1e-4, `${vol} vs ${expected}`);
});

test('the plan says at which layer to change to which color', () => {
  const plan = M.colorPlan(['#ffffff', '#e76f51', '#264653'], S);
  assert.deepEqual(plan, [
    { color: '#ffffff', fromLayer: 1, toLayer: 5, changeAtLayer: null, z: null },
    { color: '#e76f51', fromLayer: 6, toLayer: 8, changeAtLayer: 6, z: 1.2 },
    { color: '#264653', fromLayer: 9, toLayer: 11, changeAtLayer: 9, z: 1.8 },
  ]);
});
