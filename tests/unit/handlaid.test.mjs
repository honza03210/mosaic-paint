// Hand-laid lines: pieces between crossings, each tapered, the same every time.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { splitAtCrossings, taper, wedgePath, rand } from '../../src/lib/handlaid.ts';

const S = (ax, ay, bx, by) => ({ a: { x: ax, y: ay }, b: { x: bx, y: by } });

test('a line is cut where other lines cross it (a tile edge each), not where they only come near', () => {
  const across = S(0, 50, 100, 50), all = [across, S(25, 0, 25, 100), S(60, 0, 60, 100), S(80, 0, 80, 40)];
  const pieces = splitAtCrossings([across], all);
  assert.deepEqual(pieces.map(p => [p.a.x, p.b.x]), [[0, 25], [25, 60], [60, 100]]);
  // touching at its end (a T): cut there too
  assert.equal(splitAtCrossings([across], [across, S(40, 50, 40, 90)]).length, 2);
});

test('each piece: one end wider, the other narrower; the same whichever way round; amount 0 = even', () => {
  const a = { x: 3, y: 4 }, b = { x: 40, y: 9 };
  const [w0, w1] = taper(7, a, b, 0.8);
  assert.ok((w0 > 1 && w1 < 1) || (w0 < 1 && w1 > 1), `${w0} ${w1}`);
  assert.deepEqual(taper(7, b, a, 0.8), [w1, w0]);
  assert.deepEqual(taper(7, a, b, 0.8), [w0, w1]); // repeatable
  assert.notDeepEqual(taper(8, a, b, 0.8), [w0, w1]); // another seed, other widths
  assert.deepEqual(taper(7, a, b, 0), [1, 1]);
  // over many pieces: both wide and slender ends, never vanishing
  const all = Array.from({ length: 300 }, (_, i) => taper(3, { x: i, y: 0 }, { x: i + 10, y: 5 }, 1)).flat();
  assert.ok(Math.min(...all) >= 0.12 && Math.max(...all) > 1.6 && Math.min(...all) < 0.4);
  assert.ok(rand(1, 2)() !== rand(1, 3)());
});

test('the wedge outline: a closed path through both ends; one circle inside the other gives just the bigger', () => {
  const d = wedgePath({ x: 0, y: 0 }, { x: 10, y: 0 }, 2, 0.5);
  assert.match(d, /^M[-\d.]+ [-\d.]+L[-\d.]+ [-\d.]+A0\.5 0\.5 0 [01] 0 [-\d.]+ [-\d.]+L[-\d.]+ [-\d.]+A2 2 0 [01] 0 [-\d.]+ [-\d.]+Z$/);
  // it reaches out to x = −2 behind a and x = 10.5 past b (the arcs' far points), and ±2 wide at a
  const nums = d.match(/-?\d+(\.\d+)?/g).map(Number);
  assert.ok(nums.some(n => Math.abs(n - 2) < 0.2));
  assert.match(wedgePath({ x: 0, y: 0 }, { x: 1, y: 0 }, 3, 1), /^M-3 0a3 3 /);
});
