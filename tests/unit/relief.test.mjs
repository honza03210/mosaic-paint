// 3D reliefs: a height map becomes a closed solid of the right size, with outward-facing triangles.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { reliefMesh, shrink, brightness } from '../../src/lib/relief.ts';

test('a relief is closed (every edge shared by exactly two triangles, in opposite directions)', () => {
  const w = 6, h = 4, hm = new Float32Array(w * h).map((_, i) => (i % 5) / 4);
  const m = reliefMesh(hm, w, h, { sizeMm: 50, baseMm: 2, heightMm: 3 });
  const edges = new Map();
  for (let t = 0; t < m.triangles.length; t += 3) {
    for (let k = 0; k < 3; k++) {
      const a = m.triangles[t + k], b = m.triangles[t + (k + 1) % 3], key = `${a}>${b}`;
      edges.set(key, (edges.get(key) || 0) + 1);
    }
  }
  for (const [key, n] of edges) {
    const [a, b] = key.split('>');
    assert.equal(n, 1, `edge ${key} used ${n}×`);
    assert.equal(edges.get(`${b}>${a}`), 1, `edge ${key} has no partner`);
  }
  // signed volume > 0: the triangles face outwards
  let vol = 0;
  const V = (i) => m.vertices.slice(i * 3, i * 3 + 3);
  for (let t = 0; t < m.triangles.length; t += 3) {
    const [a, b, c] = [V(m.triangles[t]), V(m.triangles[t + 1]), V(m.triangles[t + 2])];
    vol += (a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0]) + a[2] * (b[0] * c[1] - b[1] * c[0])) / 6;
  }
  assert.ok(vol > 0, `volume ${vol}`);
});

test('size, base and height in mm', () => {
  const m = reliefMesh(new Float32Array([0, 1, 0.5, 0]), 2, 2, { sizeMm: 80, baseMm: 1.5, heightMm: 4 });
  const xs = [], zs = [];
  for (let i = 0; i < m.vertices.length; i += 3) { xs.push(m.vertices[i]); zs.push(m.vertices[i + 2]); }
  assert.equal(Math.max(...xs), 80);
  assert.equal(Math.min(...zs), 0);
  assert.equal(Math.max(...zs), 5.5);
});

test('shrinking averages; brightness treats transparent as white', () => {
  const s = shrink(new Float32Array([0, 1, 0, 1, 0, 1, 0, 1]), 4, 2, 2);
  assert.equal(s.w, 2);
  assert.ok(s.h.every(v => Math.abs(v - 0.5) < 1e-6));
  const b = brightness(new Uint8ClampedArray([0, 0, 0, 255, 0, 0, 0, 0]), 2);
  assert.deepEqual([...b], [0, 1]);
});
