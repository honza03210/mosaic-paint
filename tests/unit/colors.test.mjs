import test from 'node:test';
import assert from 'node:assert/strict';

import * as Colors from '../../src/lib/colors.ts';
const RED = [220, 40, 40], GREEN = [60, 160, 60], BLUE = [40, 60, 220];

test('black & white keeps brightness and removes color', () => {
  const [r, g, b] = Colors.simulate(RED, 'gray');
  assert.ok(r === g && g === b, `${r},${g},${b}`);
  const white = Colors.simulate([255, 255, 255], 'gray');
  assert.equal(white.join(), '255,255,255');
});

test('normal view leaves colors alone', () => {
  assert.equal(Colors.simulate(RED, 'none').join(), RED.join());
});

test('red and green are much harder to tell apart for red- or green-blind viewers', () => {
  const normal = Colors.deltaE(RED, GREEN);
  for (const t of ['protan', 'deutan']) {
    const seen = Colors.deltaE(Colors.simulate(RED, t), Colors.simulate(GREEN, t));
    assert.ok(seen < normal * 0.6, `${t}: ${seen.toFixed(1)} vs ${normal.toFixed(1)}`);
  }
  // blue stays clearly different from red
  const rb = Colors.deltaE(Colors.simulate(RED, 'deutan'), Colors.simulate(BLUE, 'deutan'));
  assert.ok(rb > 30);
});

test('deltaE is zero for equal colors and grows with difference', () => {
  assert.equal(Colors.deltaE(RED, RED), 0);
  assert.ok(Colors.deltaE(RED, [222, 42, 40]) < 3);
  assert.ok(Colors.deltaE(RED, BLUE) > 50);
});

test('HSV (for the color chooser) and back', () => {
  assert.equal(Colors.fromHsv(0, 1, 1), '#ff0000');
  assert.equal(Colors.fromHsv(120, 1, 1), '#00ff00');
  assert.equal(Colors.fromHsv(240, 1, 0.5), '#000080');
  assert.equal(Colors.fromHsv(0, 0, 1), '#ffffff');
  for (const c of ['#e76f51', '#264653', '#2a9d8f', '#808080', '#000000']) {
    const [h, s, v] = Colors.toHsv(c);
    assert.equal(Colors.fromHsv(h, s, v), c);
  }
});
