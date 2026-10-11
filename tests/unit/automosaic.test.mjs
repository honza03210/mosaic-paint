import test from 'node:test';
import assert from 'node:assert/strict';

import * as Geo from '../../src/lib/geometry.ts';
import * as AutoMosaic from '../../src/lib/automosaic.ts';
import * as Colors from '../../src/lib/colors.ts';
const box = { x: 10, y: 20, w: 200, h: 120 };
// "detail" in the top-left quarter only
const busy = (x, y) => x < 110 && y < 80;

function* points(n, seed = 7) {
  const rnd = AutoMosaic.rng(seed);
  for (let i = 0; i < n; i++) yield { x: box.x + 1 + rnd() * (box.w - 2), y: box.y + 1 + rnd() * (box.h - 2) };
}

for (const style of ['square', 'brick', 'hex', 'irregular']) {
  for (const detail of [0, 0.6]) {
    test(`${style} tiles (detail ${detail}) cover the area exactly once`, () => {
      const cells = AutoMosaic.cells({ style, box, size: 12, detail, busy, seed: 3 });
      assert.ok(cells.length > 20);
      for (const p of points(250)) {
        const k = cells.filter(c => Geo.pointInPolygon(p, c)).length;
        assert.equal(k, 1, `${style}: point ${p.x.toFixed(1)},${p.y.toFixed(1)} covered ${k} times`);
      }
    });
  }
}

test('with detail, busy areas get smaller tiles than flat ones', () => {
  const cells = AutoMosaic.cells({ style: 'square', box, size: 12, detail: 0.6, busy });
  const area = (c) => Math.abs(Geo.polygonArea(c));
  const center = (c) => ({ x: c.reduce((s, p) => s + p.x, 0) / c.length, y: c.reduce((s, p) => s + p.y, 0) / c.length });
  // compare tiles well inside each part (tiles along the border between them may be either size)
  const inBusy = cells.filter(c => { const m = center(c); return m.x < 90 && m.y < 60; }).map(area);
  const flat = cells.filter(c => { const m = center(c); return m.x > 140 || m.y > 110; }).map(area);
  assert.ok(Math.max(...inBusy) < Math.min(...flat));
});

test('tile lines stay inside the area and skip its border', () => {
  const ring = [{ x: 10, y: 20 }, { x: 210, y: 20 }, { x: 210, y: 140 }, { x: 10, y: 140 }];
  const cells = AutoMosaic.cells({ style: 'square', box, size: 20 });
  const segs = AutoMosaic.lines(cells, [ring], (p) => Geo.pointInPolygon(p, ring), 1e-3);
  assert.equal(segs.length, 9 + 5); // inner vertical + inner horizontal grid lines, merged
});

test('k-means finds the main colors', () => {
  const labs = [];
  for (let i = 0; i < 300; i++) labs.push(Colors.toLab([230 + (i % 5), 110, 60]));
  for (let i = 0; i < 100; i++) labs.push(Colors.toLab([60, 120, 160 + (i % 5)]));
  const centers = AutoMosaic.kmeans(labs, 2, 1).map(Colors.fromLab);
  assert.equal(centers.length, 2);
  const [r1, g1, b1] = [1, 3, 5].map(i => parseInt(centers[0].slice(i, i + 2), 16));
  assert.ok(r1 > 200 && b1 < 100, `most common color is the orange one, got ${centers[0]}`);
});

test('Lab conversion round-trips', () => {
  for (const hex of ['#264653', '#e9c46a', '#ffffff', '#000000', '#ff0000']) {
    const rgb = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
    assert.equal(Colors.fromLab(Colors.toLab(rgb)), hex);
  }
});
