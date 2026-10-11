// Reading sliced G-code back (lib/gcode.ts) and checking it against the plan.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as G from '../../src/lib/gcode.ts';

/** G-code printing a square on each layer; extra: lines put before a given layer. */
function gcode(layers, { relative = false, extra = {}, tower = false, tool = () => null } = {}) {
  const out = [relative ? 'M83' : 'M82', 'T0', 'G92 E0'];
  let e = 0;
  const ext = (d) => (relative ? d : (e += d)).toFixed(3);
  layers.forEach((z, k) => {
    for (const l of extra[k] || []) out.push(l);
    const t = tool(k);
    if (t != null) out.push(`T${t}`);
    out.push(`G1 Z${z} F600`, ';TYPE:External perimeter', `G1 X10 Y10 E${ext(0.5)}`, `G1 X20 Y10 E${ext(0.5)} ; a comment`);
    if (tower) out.push('; FEATURE: Prime tower', `G1 X50 Y50 E${ext(0.3)}`, ';TYPE:Perimeter');
    out.push('G1 Z' + (z + 0.4) + ' ; hop', 'G1 X0 Y0');
  });
  if (tower) out.push('; FEATURE: Prime tower', `G1 Z${layers[layers.length - 1] + 0.2}`, `G1 X50 Y50 E${ext(0.3)}`);
  return out.join('\n');
}
const Z = [0.2, 0.4, 0.6, 0.8, 1.0, 1.2];

test('filament changes are found at the height where printing goes on', () => {
  for (const relative of [false, true]) {
    const g = G.readGcode(gcode(Z, { relative, extra: { 3: ['M600'] } }));
    assert.equal(g.layers, 6);
    assert.equal(g.top, 1.2);
    assert.deepEqual(g.changes, [{ kind: 'M600', z: 0.8 }]);
  }
});

test('tool changes, and the heights each tool prints – wipe towers left out', () => {
  const g = G.readGcode(gcode(Z, { tower: true, tool: k => (k === 2 ? 1 : k === 4 ? 0 : null) }));
  assert.deepEqual(g.tools, [{ tool: 0, from: 0.2, to: 1.2 }, { tool: 1, from: 0.6, to: 0.8 }]);
  assert.deepEqual(g.changes.map(c => [c.tool, c.z]), [[1, 0.6], [0, 1.0]]);
  assert.equal(g.top, 1.2); // the tower's last layer above the model does not count
});

test('checking one nozzle: missing, extra and top', () => {
  const plan = [{ color: '#111111', z: null }, { color: '#222222', z: 0.8 }, { color: '#333333', z: 1.2 }];
  const good = G.readGcode(gcode(Z, { extra: { 3: ['M600'], 5: ['M600'] } }));
  assert.ok(G.checkHeights(good, plan, 1.2, 0.2).every(f => f.ok));
  const bad = G.readGcode(gcode(Z, { extra: { 2: ['M600'] } }));
  const f = G.checkHeights(bad, plan, 1.4, 0.2);
  assert.deepEqual(f.map(x => [x.kind, x.ok]), [['change', false], ['change', false], ['extra', false], ['top', false]]);
});

test('checking several filaments', () => {
  const g = G.readGcode(gcode(Z, { tool: k => (k === 2 ? 1 : null) }));
  const f = G.checkFilaments(g, [{ color: '#111111', top: 0.4 }, { color: '#222222', top: 1.2 }, { color: '#333333', top: 1.2 }], 0.2);
  assert.deepEqual(f.map(x => [x.ok, x.found]), [[true, 0.4], [true, 1.2], [false, null]]);
});
