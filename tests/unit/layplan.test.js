const test = require('node:test');
const assert = require('node:assert/strict');
const { load } = require('../load');

const { LayPlan } = load(['js/layplan.js'], ['LayPlan']);
const box = { x: 0, y: 0, w: 1000, h: 700 };

test('panels cover the mosaic row by row; the last ones are cut to size', () => {
  const P = LayPlan.panels(box, 300, 300);
  assert.equal(P.cols, 4);
  assert.equal(P.rows, 3);
  assert.equal(P.panels.length, 12);
  assert.equal(P.panels.map(q => q.index).join(), '1,2,3,4,5,6,7,8,9,10,11,12');
  const last = P.panels[11];
  assert.equal(last.w, 100);
  assert.equal(last.h, 100);
  const area = P.panels.reduce((s, q) => s + q.w * q.h, 0);
  assert.equal(area, 1000 * 700);
});

test('a panel size that divides the mosaic exactly gives no slivers', () => {
  const P = LayPlan.panels({ x: 0, y: 0, w: 600, h: 600 }, 300, 300);
  assert.equal(P.panels.length, 4);
  for (const q of P.panels) assert.equal(q.w * q.h, 90000);
});

test('tiles are counted in the panel where their middle is', () => {
  const P = LayPlan.panels(box, 500, 700);
  const counts = LayPlan.countByPanel(P, [
    { p: { x: 10, y: 10 }, color: 'red' }, { p: { x: 490, y: 600 }, color: 'red' },
    { p: { x: 510, y: 10 }, color: 'blue' }, { p: { x: 999, y: 699 }, color: 'red' },
  ]);
  assert.equal(counts.get(1).get('red'), 2);
  assert.equal(counts.get(2).get('blue'), 1);
  assert.equal(counts.get(2).get('red'), 1);
});
