import test from 'node:test';
import assert from 'node:assert/strict';
import { traceAll, ringArea } from '../../src/lib/trace.ts';

/** A label grid from rows of characters ('.' = nothing, digits = labels). */
function grid(rows) {
  const H = rows.length, W = rows[0].length, labels = new Int32Array(W * H);
  let count = 0;
  rows.forEach((r, y) => [...r].forEach((ch, x) => {
    labels[y * W + x] = ch === '.' ? -1 : +ch;
    if (ch !== '.') count = Math.max(count, +ch + 1);
  }));
  return { labels, W, H, count };
}
const trace = (rows) => { const g = grid(rows); return traceAll(g.labels, g.W, g.H, g.count); };
const area = (rings) => rings.reduce((s, r) => s + ringArea(r), 0);

test('a rectangle becomes 4 corners', () => {
  const [rings] = trace(['00.', '00.']);
  assert.equal(rings.length, 1);
  assert.equal(rings[0].length, 4);
  assert.deepEqual([...rings[0]].sort((a, b) => a.x - b.x || a.y - b.y), [{ x: 0, y: 0 }, { x: 0, y: 2 }, { x: 2, y: 0 }, { x: 2, y: 2 }]);
  assert.equal(Math.abs(area(rings)), 4);
});

test('an L shape has 6 corners; neighbours share their edge', () => {
  const r = trace([
    '011',
    '001',
  ]);
  assert.equal(r[0][0].length, 6);
  assert.equal(r[1][0].length, 6);
  assert.equal(Math.abs(area(r[0])), 3);
  // both pieces have the corner points of their shared border
  const has = (rings, p) => rings[0].some(q => q.x === p.x && q.y === p.y);
  for (const p of [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }]) assert.ok(has(r[0], p) && has(r[1], p), JSON.stringify(p));
});

test('a hole is a second ring running the other way; diagonal pixels are separate rings', () => {
  const [ring] = trace([
    '000',
    '0.0',
    '000',
  ]);
  assert.equal(ring.length, 2);
  const [a, b] = ring.map(ringArea);
  assert.ok(Math.sign(a) !== Math.sign(b));
  assert.equal(Math.abs(a + b), 8); // 9 − 1
  const [diag] = trace(['0.', '.0']);
  assert.equal(diag.length, 2);
  assert.ok(diag.every(r => r.length === 4));
});
