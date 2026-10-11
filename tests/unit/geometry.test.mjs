import test from 'node:test';
import assert from 'node:assert/strict';

import * as Geo from '../../src/lib/geometry.ts';
const P = (x, y) => ({ x, y });
const seg = (ax, ay, bx, by) => ({ a: P(ax, ay), b: P(bx, by) });
const square = (x, y, s) => [seg(x, y, x + s, y), seg(x + s, y, x + s, y + s), seg(x + s, y + s, x, y + s), seg(x, y + s, x, y)];
const near = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol;

test('project clamps to the segment', () => {
  const p = Geo.project(P(5, 5), P(0, 0), P(10, 0));
  assert.deepEqual([p.x, p.y, p.t], [5, 0, 0.5]);
  assert.equal(Geo.project(P(-5, 3), P(0, 0), P(10, 0)).t, 0);
  assert.equal(Geo.project(P(15, 3), P(0, 0), P(10, 0)).t, 1);
});

test('segIntersect finds crossings and ignores misses / parallels', () => {
  const x = Geo.segIntersect(P(0, 0), P(10, 10), P(0, 10), P(10, 0));
  assert.ok(near(x.x, 5) && near(x.y, 5) && near(x.t, 0.5) && near(x.u, 0.5));
  assert.equal(Geo.segIntersect(P(0, 0), P(1, 1), P(5, 0), P(6, -1)), null);
  assert.equal(Geo.segIntersect(P(0, 0), P(10, 0), P(0, 1), P(10, 1)), null);
});

test('polygonArea and pointInPolygon', () => {
  const sq = [P(0, 0), P(10, 0), P(10, 10), P(0, 10)];
  assert.equal(Math.abs(Geo.polygonArea(sq)), 100);
  assert.ok(Geo.pointInPolygon(P(5, 5), sq));
  assert.ok(!Geo.pointInPolygon(P(15, 5), sq));
});

test('regularPolygon puts the first vertex at the rotation angle', () => {
  const pts = Geo.regularPolygon(6, 0, 0, 10, 0);
  assert.equal(pts.length, 6);
  assert.ok(near(pts[0].x, 10) && near(pts[0].y, 0));
  for (const p of pts) assert.ok(near(Math.hypot(p.x, p.y), 10));
});

test('a 3×3 grid of lines makes 9 bounded faces', () => {
  const segs = [];
  for (let i = 0; i <= 3; i++) { segs.push(seg(i * 10, 0, i * 10, 30)); segs.push(seg(0, i * 10, 30, i * 10)); }
  const inner = Geo.planarFaces(segs).filter(f => f.area > 0);
  assert.equal(inner.length, 9);
  for (const f of inner) assert.ok(near(f.area, 100));
});

test('findRegion uses T-junctions and ignores dangling lines', () => {
  // square split by a line that ends exactly on the opposite side (T-junction), plus a dangling line
  const segs = [...square(0, 0, 100), seg(50, 0, 50, 100), seg(20, 20, 30, 30)];
  const r = Geo.findRegion(segs, P(25, 50));
  assert.ok(near(r.area, 5000));
  assert.equal(r.holes.length, 0);
});

test('findRegion cuts out islands as holes', () => {
  const segs = [...square(0, 0, 100), ...square(40, 40, 20)];
  const r = Geo.findRegion(segs, P(10, 10));
  assert.ok(near(r.area, 10000 - 400));
  assert.equal(r.holes.length, 1);
  assert.ok(near(Geo.findRegion(segs, P(50, 50)).area, 400));
});

test('findRegion returns null outside any closed area', () => {
  assert.equal(Geo.findRegion(square(0, 0, 10), P(50, 50)), null);
  assert.equal(Geo.findRegion([seg(0, 0, 10, 10)], P(5, 1)), null);
});

test('collinear overlapping edges are merged', () => {
  // two squares sharing part of an edge, drawn separately
  const segs = [...square(0, 0, 10), seg(10, 2, 20, 2), seg(20, 2, 20, 8), seg(20, 8, 10, 8)];
  const r = Geo.findRegion(segs, P(15, 5));
  assert.ok(near(r.area, 60));
});

test('regionIndex.locate agrees with findRegion and lists faces', () => {
  const segs = [...square(0, 0, 100), seg(50, 0, 50, 100)];
  const ix = Geo.regionIndex(segs);
  assert.equal(ix.faces.length, 2);
  assert.ok(near(ix.region(ix.locate(P(75, 10))).area, 5000));
});

test('clipSegment keeps only the inside part', () => {
  const ring = [P(0, 0), P(10, 0), P(10, 10), P(0, 10)];
  const parts = Geo.clipSegment(P(-5, 5), P(15, 5), [ring], (p) => Geo.pointInPolygon(p, ring));
  assert.equal(parts.length, 1);
  assert.ok(near(parts[0].a.x, 0) && near(parts[0].b.x, 10));
});

test('chordThrough cuts from edge to edge through a point', () => {
  const ring = [P(0, 0), P(10, 0), P(10, 10), P(0, 10)];
  const c = Geo.chordThrough(P(3, 5), P(1, 0), [ring]);
  assert.ok(near(c.a.x, 0) && near(c.b.x, 10) && near(c.a.y, 5));
});

test('distToRings measures to the nearest edge', () => {
  const ring = [P(0, 0), P(10, 0), P(10, 10), P(0, 10)];
  assert.ok(near(Geo.distToRings(P(3, 5), [ring]), 3));
});
