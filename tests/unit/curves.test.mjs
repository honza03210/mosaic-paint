import test from 'node:test';
import assert from 'node:assert/strict';
import * as C from '../../src/lib/curves.ts';

const near = (p, q, tol = 1e-9) => Math.hypot(p.x - q.x, p.y - q.y) <= tol;
const pts = [{ x: 0, y: 0 }, { x: 10, y: 20 }, { x: 30, y: 5 }, { x: 45, y: 25 }, { x: 60, y: 0 }];
/** The curve's segments join up: each starts where the one before ends (and a closed one comes back). */
function continuous(segs, closed) {
  for (let i = 1; i < segs.length; i++) assert.ok(near(segs[i].a, segs[i - 1].d), `segment ${i} starts where ${i - 1} ends`);
  if (closed) assert.ok(near(segs[0].a, segs[segs.length - 1].d), 'closed curve comes back to its start');
}
/** The tangent is continuous where segments meet (smooth splines only). */
function smooth(segs, closed) {
  const n = segs.length;
  for (let i = closed ? 0 : 1; i < n; i++) {
    const s = segs[i], r = segs[(i - 1 + n) % n];
    const t1 = { x: s.b.x - s.a.x, y: s.b.y - s.a.y }, t0 = { x: r.d.x - r.c.x, y: r.d.y - r.c.y };
    assert.ok(Math.abs(t1.x * t0.y - t1.y * t0.x) < 1e-6 && t1.x * t0.x + t1.y * t0.y >= 0, `smooth at joint ${i}`);
  }
}

test('Catmull–Rom passes through every point, smoothly', () => {
  for (const closed of [false, true]) {
    const segs = C.toCubics('catmull', pts, closed);
    assert.equal(segs.length, closed ? 5 : 4);
    continuous(segs, closed);
    smooth(segs, closed);
    segs.forEach((s, i) => { assert.ok(near(s.a, pts[i])); assert.ok(near(s.d, pts[(i + 1) % pts.length])); });
  }
});

test('B-spline: open ones start and end on the end points; it stays inside the points\' hull', () => {
  const open = C.toCubics('bspline', pts, false);
  continuous(open, false);
  smooth(open, false);
  assert.ok(near(open[0].a, pts[0]) && near(open[open.length - 1].d, pts[4]));
  // the middle points are not on the curve, only pulled towards
  const samples = C.sampleCubics(open, false, 0.5);
  assert.ok(!samples.some(p => near(p, pts[1], 0.5)));
  for (const p of samples) assert.ok(p.x >= -1e-9 && p.x <= 60 + 1e-9 && p.y >= -1e-9 && p.y <= 25 + 1e-9);
  const closed = C.toCubics('bspline', pts, true);
  assert.equal(closed.length, 5);
  continuous(closed, true);
  smooth(closed, true);
});

test('Bézier: the clicked points are anchors and control points in turn', () => {
  const four = pts.slice(0, 4);
  assert.deepEqual(C.toCubics('bezier3', four, false), [{ a: four[0], b: four[1], c: four[2], d: four[3] }]);
  // seven points: two cubic segments sharing an anchor
  const seven = [...pts, { x: 70, y: 10 }, { x: 80, y: 0 }], two = C.toCubics('bezier3', seven, false);
  assert.equal(two.length, 2);
  continuous(two, false);
  assert.ok(near(two[1].a, seven[3]) && near(two[1].d, seven[6]));
  // five points: a cubic, then a straight end (one leftover point); closing adds the way back
  const five = C.toCubics('bezier3', pts, false);
  assert.equal(five.length, 2);
  assert.ok(near(five[1].d, pts[4]));
  const back = C.toCubics('bezier3', pts, true);
  continuous(back, true);
  assert.ok(near(back[back.length - 1].d, pts[0]));
  // quadratic: point, control, point – the same curve as the quadratic formula
  const q = C.toCubics('bezier2', pts.slice(0, 3), false);
  assert.equal(q.length, 1);
  const mid = C.cubicAt(q[0], 0.5), expect = { x: 0.25 * 0 + 0.5 * 10 + 0.25 * 30, y: 0.25 * 0 + 0.5 * 20 + 0.25 * 5 };
  assert.ok(near(mid, expect, 1e-9));
  assert.equal(C.toCubics('bezier2', pts, false).length, 2);
  // which points the curve goes through
  assert.deepEqual(pts.map((_, i) => C.onCurve('bezier3', 5, false, i)), [true, false, false, true, true]);
  assert.deepEqual(pts.map((_, i) => C.onCurve('bezier2', 5, false, i)), [true, false, true, false, true]);
  assert.deepEqual(pts.map((_, i) => C.onCurve('bspline', 5, false, i)), [true, false, false, false, true]);
});

test('curves follow their points when they are moved, turned or mirrored', () => {
  const m = p => ({ x: -0.6 * p.x + 0.8 * p.y + 7, y: 0.8 * p.x + 0.6 * p.y - 3 }); // a turn plus a mirror plus a shift
  for (const type of C.SPLINE_TYPES) for (const closed of [false, true]) {
    const a = C.toCubics(type, pts, closed).map(s => C.cubicAt(s, 0.37)), b = C.toCubics(type, pts.map(m), closed).map(s => C.cubicAt(s, 0.37));
    a.forEach((p, i) => assert.ok(near(m(p), b[i], 1e-9), `${type} ${closed}`));
  }
});

test('two points make a straight line; fewer make nothing', () => {
  for (const type of C.SPLINE_TYPES) {
    assert.deepEqual(C.toCubics(type, pts.slice(0, 1), false), []);
    const [s] = C.toCubics(type, pts.slice(0, 2), false);
    assert.ok(near(C.cubicAt(s, 0.5), { x: 5, y: 10 }));
  }
});

test('path data and sampling', () => {
  const segs = C.toCubics('bezier3', pts.slice(0, 4), false);
  assert.equal(C.cubicsToD(segs, false), 'M0 0 C10 20 30 5 45 25');
  assert.equal(C.cubicsToD(segs, true, v => v.toFixed(1)), 'M0.0 0.0 C10.0 20.0 30.0 5.0 45.0 25.0 Z');
  const s = C.sampleCubics(segs, false, 1);
  assert.ok(near(s[0], pts[0]) && near(s[s.length - 1], pts[3]));
  for (let i = 1; i < s.length; i++) assert.ok(Math.hypot(s[i].x - s[i - 1].x, s[i].y - s[i - 1].y) <= 1 + 1e-9);
  // a closed curve doesn't repeat its first point
  const c = C.sampleCubics(C.toCubics('catmull', pts, true), true, 2);
  assert.ok(!near(c[0], c[c.length - 1]));
});

test('ellipses: points on the ellipse; dragging from a corner or the center', () => {
  const e = C.ellipsePoints(10, 20, 8, 4, Math.PI / 2, 0.5);
  assert.ok(e.length >= 12);
  // turned a quarter: the long axis is vertical
  for (const p of e) {
    const x = p.x - 10, y = p.y - 20;
    assert.ok(Math.abs((y / 8) ** 2 + (x / 4) ** 2 - 1) < 1e-9);
  }
  assert.deepEqual(C.ellipseFromDrag({ x: 0, y: 0 }, { x: 20, y: 10 }, false, false), { cx: 10, cy: 5, rx: 10, ry: 5 });
  assert.deepEqual(C.ellipseFromDrag({ x: 20, y: 10 }, { x: 0, y: 0 }, false, false), { cx: 10, cy: 5, rx: 10, ry: 5 });
  assert.deepEqual(C.ellipseFromDrag({ x: 0, y: 0 }, { x: 20, y: -10 }, false, true), { cx: 10, cy: -10, rx: 10, ry: 10 });
  assert.deepEqual(C.ellipseFromDrag({ x: 5, y: 5 }, { x: 8, y: 1 }, true, false), { cx: 5, cy: 5, rx: 3, ry: 4 });
});
