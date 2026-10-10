const test = require('node:test');
const assert = require('node:assert/strict');
const { load } = require('../load');

const { Geo, Patterns } = load(['js/geometry.js', 'js/patterns.js'], ['Geo', 'Patterns']);
const P = (x, y) => ({ x, y });

// deterministic pseudo-random points
function* points(n, seed = 1) {
  let s = seed;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < n; i++) yield P(-30 + rnd() * 60, -30 + rnd() * 60);
}

for (const type of ['square', 'brick', 'herringbone', 'hex', 'triangle']) {
  test(`${type} tiles cover the plane exactly once`, () => {
    const cells = Patterns.cells(type, 10, { x0: -50, y0: -50, x1: 50, y1: 50 });
    for (const p of points(300)) {
      const k = cells.filter(c => Geo.pointInPolygon(p, c)).length;
      assert.equal(k, 1, `point ${p.x.toFixed(2)},${p.y.toFixed(2)} is covered ${k} times`);
    }
  });
}

const page = [P(0, 0), P(100, 0), P(100, 100), P(0, 100)];
const inPage = (p) => Geo.pointInPolygon(p, page);
const build = (type, size, extra = {}) => Patterns.build({ type, size, angle: 0, origin: P(0, 0), rings: [page], inside: inPage, eps: 1e-3, ...extra });

test('a square pattern becomes a few long merged lines, all inside the area', () => {
  const { segments } = build('square', 10);
  assert.equal(segments.length, 18); // 9 inner vertical + 9 inner horizontal lines; the border is skipped
  for (const s of segments) {
    assert.ok(Math.hypot(s.b.x - s.a.x, s.b.y - s.a.y) > 99.9);
    for (const p of [s.a, s.b]) assert.ok(p.x >= -1e-9 && p.x <= 100 + 1e-9 && p.y >= -1e-9 && p.y <= 100 + 1e-9);
  }
});

test('pattern lines turn the area into the expected number of tiles', () => {
  const border = [[P(0, 0), P(100, 0)], [P(100, 0), P(100, 100)], [P(100, 100), P(0, 100)], [P(0, 100), P(0, 0)]].map(([a, b]) => ({ a, b }));
  for (const [type, size, tiles] of [['square', 10, 100], ['square', 25, 16], ['brick', 10, 55]]) {
    const { segments } = build(type, size);
    const faces = Geo.planarFaces([...border, ...segments]).filter(f => f.area > 1e-6);
    assert.equal(faces.length, tiles, `${type} ${size}`);
  }
});

test('rotated and ring patterns stay inside the area', () => {
  for (const opts of [{ type: 'hex', angle: 30 }, { type: 'triangle', angle: 15 }, { type: 'rings', origin: P(50, 50) }]) {
    const { segments } = build(opts.type, 12, opts);
    assert.ok(segments.length > 10);
    for (const s of segments) assert.ok(inPage({ x: (s.a.x + s.b.x) / 2, y: (s.a.y + s.b.y) / 2 }));
  }
});

test('too many tiles is refused with an estimate', () => {
  const r = build('square', 0.1);
  assert.equal(r.error, 'tooMany');
  assert.ok(r.estimate > 40000);
});
