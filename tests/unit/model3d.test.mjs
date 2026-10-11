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

/** Checks a mesh is one closed surface: every edge is used exactly twice, once in each direction. */
function assertClosed(mesh) {
  const T = mesh.triangles, use = new Map();
  for (let t = 0; t < T.length; t += 3) for (let k = 0; k < 3; k++) {
    const a = T[t + k], b = T[t + (k + 1) % 3];
    use.set(a + '>' + b, (use.get(a + '>' + b) || 0) + 1);
  }
  for (const [e, n] of use) {
    const [a, b] = e.split('>');
    assert.equal(n, 1, `edge ${e} used ${n} times in the same direction`);
    assert.equal(use.get(b + '>' + a), 1, `edge ${e} has no opposite`);
  }
}
/** Volume enclosed by a mesh (positive when the triangles face outwards). */
function volume(mesh) {
  const V = mesh.vertices, T = mesh.triangles;
  let vol = 0;
  for (let t = 0; t < T.length; t += 3) {
    const [a, b, c] = [0, 1, 2].map(k => [V[T[t + k] * 3], V[T[t + k] * 3 + 1], V[T[t + k] * 3 + 2]]);
    vol += (a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0]) + a[2] * (b[0] * c[1] - b[1] * c[0])) / 6;
  }
  return vol;
}
const close = (a, b) => Math.abs(a - b) < 1e-6;

test('each color stands at its own height on the base plate', () => {
  const grid = [0, 1, -1, 1];
  const mesh = M.closedMesh(grid, 2, 2, 0.5, S);
  const V = mesh.vertices, T = mesh.triangles, flat = new Set(), xs = new Set(), ys = new Set();
  for (let i = 0; i < V.length; i += 3) { xs.add(V[i]); ys.add(V[i + 1]); }
  // heights of the horizontal faces: floor, base, band 0, band 1
  for (let t = 0; t < T.length; t += 3) {
    const z = [0, 1, 2].map(k => +V[T[t + k] * 3 + 2].toFixed(6));
    if (z[0] === z[1] && z[1] === z[2]) flat.add(z[0]);
  }
  assert.deepEqual([...flat].sort((a, b) => a - b), [0, 0.4, 1, 1.6]);
  assert.deepEqual([Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)], [0, 1, 0, 1]);
  assert.deepEqual([...M.cellHeights(grid, S)], [5, 8, 2, 8]);
  assert.equal(M.modelHeight(2, S), 1.6);
  // the band-0 cell is the top-left of the picture: at the top (high y) of the model
  const top0 = [];
  for (let t = 0; t < mesh.triangles.length; t += 3) {
    const pts = [0, 1, 2].map(k => mesh.triangles[t + k] * 3);
    if (pts.every(p => close(V[p + 2], 1))) top0.push(...pts.map(p => [V[p], V[p + 1]]));
  }
  assert.ok(top0.length && top0.every(([x, y]) => x <= 0.5 + 1e-9 && y >= 0.5 - 1e-9));
});

test('the model is one closed surface facing outwards, with the volume of its cells', () => {
  const S0 = { ...S, baseLayers: 0 };
  // T-junctions everywhere: tiles of different sizes and heights, a hole, and open (unpainted) cells
  const grid = [
    0, 0, 1, 1, 1,
    0, 2, 2, 1, -1,
    0, 2, 2, 0, -1,
    -1, 1, 0, 0, 0,
  ];
  for (const s of [S, S0]) {
    const mesh = M.closedMesh(grid, 5, 4, 0.5, s);
    assertClosed(mesh);
    const H = M.cellHeights(grid, s);
    const expected = [...H].reduce((sum, hc) => sum + hc * s.layerHeight * 0.25, 0);
    assert.ok(close(volume(mesh), expected), `${volume(mesh)} vs ${expected}`);
  }
  // equal heights are merged: a uniform 20 × 20 plate is a box of 12 triangles
  const flat = M.closedMesh(new Array(400).fill(0), 20, 20, 1, S);
  assert.equal(flat.triangles.length / 3, 12);
  // the STL has the same triangles
  const buf = M.stl(flat);
  assert.equal(new DataView(buf).getUint32(80, true), 12);
  assert.equal(buf.byteLength, 84 + 12 * 50);
});

test('the plan says at which layer to change to which color', () => {
  const plan = M.colorPlan(['#ffffff', '#e76f51', '#264653'], S);
  assert.deepEqual(plan, [
    { color: '#ffffff', fromLayer: 1, toLayer: 5, changeAtLayer: null, z: null },
    { color: '#e76f51', fromLayer: 6, toLayer: 8, changeAtLayer: 6, z: 1.2 },
    { color: '#264653', fromLayer: 9, toLayer: 11, changeAtLayer: 9, z: 1.8 },
  ]);
});

test('the 3MF carries the model, its colors and the filament changes', async () => {
  const { zip, crc32 } = await import('../../src/lib/zip.ts');
  const mesh = M.closedMesh([0, 1], 2, 1, 1, S);
  const plan = M.colorPlan(['#ffffff', '#e76f51'], S);
  const files = M.threeMfFiles(mesh, plan, 'Test');
  assert.deepEqual(files.map(f => f.name), ['[Content_Types].xml', '_rels/.rels', '3D/3dmodel.model',
    'Metadata/Prusa_Slicer_custom_gcode_per_print_z.xml']);
  const model = files[2].data;
  assert.equal((model.match(/<vertex /g) || []).length, mesh.vertices.length / 3);
  assert.equal((model.match(/<triangle /g) || []).length, mesh.triangles.length / 3);
  assert.match(model, /<base name="#e76f51" displaycolor="#E76F51FF"\/>/);
  assert.match(files[3].data, /<code print_z="1.2" type="0" extruder="1" color="#e76f51" extra="" gcode="M600"\/>/);

  // the archive: local headers, a central directory listing all files, and correct checksums
  const z = await zip(files), dv = new DataView(z.buffer);
  assert.equal(dv.getUint32(0, true), 0x04034b50);
  const end = z.length - 22;
  assert.equal(dv.getUint32(end, true), 0x06054b50);
  assert.equal(dv.getUint16(end + 10, true), 4);
  assert.equal(crc32(new TextEncoder().encode('123456789')), 0xcbf43926);
  // a stored entry can be read straight back
  const plain = await zip([{ name: 'a.txt', data: 'hello' }], { compress: false });
  assert.equal(new TextDecoder().decode(plain.slice(35, 40)), 'hello');
});

test('thin towers sink into what is around them; grout grooves and wide tiles stay', () => {
  // grout (0) all around, a wide tile of level 2, a single speck of level 3 inside it, a 1-cell sliver of level 3
  const rows = [
    '00000000000',
    '02222200300',
    '02232200300',
    '02222200300',
    '02222200000',
    '00000000000',
  ];
  const grid = rows.join('').split('').map(Number), w = 11, h = 6;
  const o = { minWidth: 1.2, maxRatio: 2 };
  // cells of 1 mm: the 5 × 4 tile is wide enough; the speck and the 1 mm sliver are not
  const { grid: out, lowered } = M.removeTowers(grid, w, h, 1, S, o);
  const at = (x, y) => out[y * w + x];
  assert.equal(at(3, 2), 2); // the speck took the tile's level
  assert.equal(at(8, 2), 0); // the sliver sank to the grout
  assert.equal(at(2, 2), 2); // the tile stays
  assert.equal(at(0, 0), 0); // grout stays
  assert.equal(lowered, 2);

  // a narrow groove (lower than its surroundings) is never filled in
  // (tiles 3 × 3 cells = 1.5 mm either side of a 0.5 mm groove)
  const g = [2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2];
  const groove = M.removeTowers(g, 7, 3, 0.5, S, o);
  assert.deepEqual([...groove.grid], g);
  assert.equal(groove.lowered, 0);

  // tall for its width: with 7 layers per color a level-2 tile stands 2.8 mm above level-0 grout –
  // too much for a 1.3 mm tile (over 2 × its width), fine for a 1.5 mm one
  const tall = { ...S, layersPerColor: 7 };
  const t = M.removeTowers([0, 0, 0, 0, 2, 0, 0, 0, 0], 3, 3, 1.3, tall, o);
  assert.equal(t.grid[4], 0);
  const ok = M.removeTowers([0, 0, 0, 0, 2, 0, 0, 0, 0], 3, 3, 1.5, tall, o);
  assert.equal(ok.grid[4], 2);
});
