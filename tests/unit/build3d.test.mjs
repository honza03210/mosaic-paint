// The 3D model as the dialog builds it (lib/build3d.ts): towers, finishing, files – what the worker runs.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as B from '../../src/lib/build3d.ts';
import { buffersIn } from '../../src/worker/jobs.ts';

const o = {
  mode: 'height', layerHeight: 0.2, layersPerColor: 3, baseLayers: 3, tileLayers: 5, groutRecess: 2, minWidth: 1.2, maxRatio: 2,
  frame: 0, frameRaise: 2, corner: 0, hole: 0, magnet: 0, magnetDepth: 2,
};
// 20 × 10 cells of 1 mm: grout (color 0) everywhere, a tile of color 1, and one speck of color 2
const W = 20, H = 10, grid = new Int16Array(W * H);
for (let y = 2; y < 8; y++) for (let x = 2; x < 18; x++) grid[y * W + x] = 1;
grid[5 * W + 10] = 2;
const counts = [0, 0, 0];
for (const v of grid) counts[v]++;

test('towers: the speck is lowered and its color drops out', () => {
  const m = B.towers(grid, W, H, 1, [0, 1, 2], counts, [true, false, false], o);
  assert.deepEqual(m.list, [0, 1]);
  assert.equal(m.lowered, 1);
  assert.equal(m.grid[5 * W + 10], 1);
});

test('files: the flat model with a frame – one STL per part, the frame named as such', async () => {
  const flat = { ...o, mode: 'flat', frame: 2 };
  const m = B.towers(grid, W, H, 1, [0, 1, 2], counts, [true, false, false], flat);
  const shape = { grid: m.grid, w: W, h: H, cell: 1, grout: [true, false] };
  const r = await B.exportModel({ kind: 'stl', shape, o: flat, colors: ['#b8b2a7', '#e76f51'], name: 'coaster', slicer: 'prusa', labels: { base: 'Base', frame: 'Frame' } });
  assert.equal(r.fileName, 'coaster-stl.zip');
  assert.equal(r.parts, 4);
  const names = [...new TextDecoder('latin1').decode(r.data).matchAll(/coaster-[\w-]+\.stl/g)].map(x => x[0]);
  assert.deepEqual([...new Set(names)], ['coaster-base.stl', 'coaster-frame.stl', 'coaster-1-b8b2a7.stl', 'coaster-2-e76f51.stl']);
  const one = await B.exportModel({ kind: '3mf', shape, o, colors: ['#b8b2a7', '#e76f51'], name: 'coaster', slicer: 'prusa', labels: { base: 'Base', frame: 'Frame' } });
  assert.equal(one.fileName, 'coaster.3mf');
  assert.equal(one.parts, 1);
});

test('the view mesh thins out big grids', () => {
  const big = new Int16Array(1000 * 800);
  const d = B.downsample(big, 1000, 800, 0.4, 160000);
  assert.ok(d.w * d.h <= 160000);
  assert.ok(Math.abs(d.cell - 0.4 * 3) < 1e-9); // every 3rd cell: √(800 000 / 160 000) rounded up
  assert.ok(B.viewMesh({ ...d, grout: [true] }, o).triangles.length > 0);
});

test('results hand their buffers over to the page', () => {
  const a = new Int16Array(4), b = new Uint8Array(2);
  assert.deepEqual(buffersIn({ grid: a, nested: { data: b }, list: [1, 2] }), [a.buffer, b.buffer]);
});
