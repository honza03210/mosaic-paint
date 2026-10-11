import test from 'node:test';
import assert from 'node:assert/strict';

import * as Geo from '../../src/lib/geometry.ts';
import * as Contour from '../../src/lib/contour.ts';
const P = (x, y) => ({ x, y });
const near = (a, b, tol) => Math.abs(a - b) <= tol;

test('the distance field measures cells to the nearest outside cell', () => {
  const nx = 7, ny = 5, mask = new Uint8Array(nx * ny);
  for (let y = 1; y < 4; y++) for (let x = 1; x < 6; x++) mask[y * nx + x] = 1;
  const d = Contour.distanceField(mask, nx, ny);
  assert.equal(d[2 * nx + 3], 2); // middle cell: two cells from the outside
  assert.equal(d[1 * nx + 1], 1);
  assert.equal(d[0], 0);
});

test('rows inside a rectangle are smaller rectangles, one row width apart', () => {
  const rect = [P(0, 0), P(100, 0), P(100, 60), P(0, 60)];
  const { loops } = Contour.build({ rings: [rect], width: 10 });
  assert.equal(loops.length, 2); // at 10 and 20 from the edge; at 30 nothing is left
  const boxes = loops.map(l => Geo.bounds(l)).sort((a, b) => a.x0 - b.x0);
  for (const [b, d] of [[boxes[0], 10], [boxes[1], 20]]) {
    assert.ok(near(b.x0, d, 1.2) && near(b.y0, d, 1.2) && near(b.x1, 100 - d, 1.2) && near(b.y1, 60 - d, 1.2), JSON.stringify(b));
  }
  // straight edges simplify to few points
  for (const l of loops) assert.ok(l.length < 30, `${l.length} points`);
});

test('rows go around holes too (a halo around a motif)', () => {
  const outer = [P(0, 0), P(200, 0), P(200, 200), P(0, 200)];
  const hole = [P(80, 80), P(120, 80), P(120, 120), P(80, 120)];
  const { loops } = Contour.build({ rings: [outer, hole], width: 10, rows: 1 });
  // one row along the outer border and one around the hole
  assert.equal(loops.length, 2);
  const small = loops.map(l => Geo.bounds(l)).find(b => b.x1 - b.x0 < 100);
  assert.ok(near(small.x0, 70, 1.5) && near(small.x1, 130, 1.5), JSON.stringify(small));
});

test('cuts split each row into tiles about one length long, between its two lines', () => {
  const rect = [P(0, 0), P(100, 0), P(100, 60), P(0, 60)];
  const { loops, cuts } = Contour.build({ rings: [rect], width: 10, length: 10 });
  const rows = [[rect], [loops.find(l => Geo.bounds(l).x0 < 15)]];
  // the first row: outline perimeter 320 → about 32 tiles
  const first = cuts.filter(c => near(Geo.distToRings(c.a, [rect]), 0, 1e-6));
  assert.ok(first.length >= 28 && first.length <= 34, `${first.length} cuts`);
  for (const c of first) {
    assert.ok(Geo.distToRings(c.b, rows[1]) < 1e-6, 'cut ends on the next row line');
    assert.ok(near(Geo.dist(c.a, c.b), 10, 4.5), `cut length ${Geo.dist(c.a, c.b)}`);
  }
});

test('rows can be limited', () => {
  const rect = [P(0, 0), P(100, 0), P(100, 100), P(0, 100)];
  assert.equal(Contour.build({ rings: [rect], width: 10, rows: 2 }).loops.length, 2);
});
