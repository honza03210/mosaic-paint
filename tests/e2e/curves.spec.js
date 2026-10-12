// Ellipses and curves in the vector app: drawing, painting inside, editing their points, symmetry, saving.
const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;
/** The numbers in a path's d (Firefox puts clicks a fraction of a unit off, so compare with near). */
const nums = (d) => d.match(/[-\d.]+/g).map(Number);
const attrs = (page, sel, names) => page.evaluate(([s, n]) => n.map(k => +document.querySelector(s).getAttribute(k)), [sel, names]);

test('ellipses: from a corner, from the center, Shift for a circle; painted inside; resized by an axis handle', async ({ page }) => {
  const { errors } = await h.open(page);
  await h.key(page, 'o');
  await page.evaluate(() => { MZ.state.ellipseMode = 'corner'; });
  await h.drag(page, { x: 100, y: 100 }, { x: 500, y: 300 }, { keys: ['Alt'] });
  const [cx, cy, rx, ry] = await attrs(page, '#mz-shapes ellipse', ['cx', 'cy', 'rx', 'ry']);
  expect([cx, cy, rx, ry].every((v, i) => h.near(v, [300, 200, 200, 100][i]))).toBe(true);
  // the bucket colors the ellipse itself (it is the whole area), so the color follows the exact curve
  await h.key(page, 'b');
  await h.setState(page, { fill: '#e76f51' });
  await h.click(page, { x: 300, y: 200 });
  expect(await page.getAttribute('#mz-shapes ellipse', 'fill')).toBe('#e76f51');
  expect(await h.colorAt(page, { x: 110, y: 200 })).toBe('#e76f51');
  expect(await h.colorAt(page, { x: 110, y: 110 })).toBe('none'); // the box's corner is outside
  // a circle from its center
  await h.key(page, 'o');
  await page.evaluate(() => { MZ.state.ellipseMode = 'center'; });
  await h.drag(page, { x: 700, y: 700 }, { x: 800, y: 760 }, { keys: ['Shift', 'Alt'] });
  const [ccx, ccy, crx, cry] = await attrs(page, '#mz-shapes ellipse:last-of-type', ['cx', 'cy', 'rx', 'ry']);
  expect([ccx, ccy, crx, cry].every((v, i) => h.near(v, [700, 700, 100, 100][i]))).toBe(true);
  // select the first ellipse and drag its right axis end out: it gets wider, still painted
  await h.key(page, 'v');
  await h.click(page, { x: 300, y: 100 });
  expect(await page.evaluate(() => MZ.state.handles.length)).toBe(4);
  await h.drag(page, { x: 500, y: 200 }, { x: 600, y: 200 }, { keys: ['Alt'] });
  expect(h.near((await attrs(page, '#mz-shapes ellipse', ['rx']))[0], 300)).toBe(true);
  expect(await h.colorAt(page, { x: 580, y: 200 })).toBe('#e76f51');
  // painting an area that the ellipse only partly bounds makes a painted area that follows the curve
  await h.key(page, 'l');
  await h.drag(page, { x: 300, y: 0 }, { x: 300, y: 1000 });
  await h.key(page, 'b');
  await h.setState(page, { fill: '#2a9d8f' });
  await h.click(page, { x: 450, y: 200 });
  const area = await page.evaluate(() => +document.querySelector('.mz-fill').dataset.area);
  expect(Math.abs(area - Math.PI * 300 * 100 / 2) / (Math.PI * 300 * 100 / 2)).toBeLessThan(0.01);
  expect(errors).toEqual([]);
});

test('curves of every type: open with Enter, closed by clicking the first point, edited by their points', async ({ page }) => {
  const { errors } = await h.open(page);
  await h.key(page, 'c');
  await expect(page.locator('#opt-curve-type')).toBeVisible();
  const P = [{ x: 100, y: 500 }, { x: 300, y: 200 }, { x: 500, y: 500 }, { x: 700, y: 200 }];
  for (const type of ['catmull', 'bspline', 'bezier3', 'bezier2']) {
    await page.selectOption('#opt-curve-type', type);
    await expect(page.locator('#curve-note')).not.toBeEmpty();
    for (const p of P) await h.click(page, p, { keys: ['Alt'] });
    await h.key(page, 'Enter');
  }
  const curves = await page.evaluate(() => [...document.querySelectorAll('#mz-shapes path')].map(p => [p.dataset.spline.split(' ').slice(0, 2).join(' '), /C/.test(p.getAttribute('d')), /Z/.test(p.getAttribute('d')), p.getAttribute('fill')]));
  expect(curves).toEqual([
    ['catmull open', true, false, 'none'], ['bspline open', true, false, 'none'],
    ['bezier3 open', true, false, 'none'], ['bezier2 open', true, false, 'none'],
  ]);
  // the first clicked point stays exactly where it was clicked (all types start on it)
  for (const d of await page.evaluate(() => [...document.querySelectorAll('#mz-shapes path')].map(p => p.getAttribute('d')))) {
    const [x, y] = nums(d);
    expect(h.near(x, 100) && h.near(y, 500)).toBe(true);
  }

  // a closed curve through four points makes an area to paint
  await page.evaluate(() => { document.querySelectorAll('#mz-shapes path').forEach(p => p.remove()); MZ.commit(); });
  await page.selectOption('#opt-curve-type', 'catmull');
  const Q = [{ x: 300, y: 300 }, { x: 700, y: 300 }, { x: 700, y: 700 }, { x: 300, y: 700 }];
  for (const p of Q) await h.click(page, p, { keys: ['Alt'] });
  await h.click(page, Q[0]);
  expect(await page.evaluate(() => document.querySelector('#mz-shapes path').dataset.spline.startsWith('catmull closed'))).toBe(true);
  await h.key(page, 'b');
  await h.setState(page, { fill: '#e76f51' });
  await h.click(page, { x: 500, y: 500 });
  expect(await page.getAttribute('#mz-shapes path', 'fill')).toBe('#e76f51');
  // a rounded square: it bulges out past its points
  expect(await h.colorAt(page, { x: 500, y: 290 })).toBe('#e76f51');
  expect(await h.colorAt(page, { x: 780, y: 780 })).toBe('none');
  // drag a point: the curve and its paint follow; one undo puts it back
  await h.key(page, 'v');
  await h.click(page, { x: 500, y: 300 });
  expect(await page.evaluate(() => MZ.state.handles.length)).toBe(4);
  await h.drag(page, { x: 700, y: 700 }, { x: 850, y: 850 }, { keys: ['Alt'] });
  expect(nums(await page.evaluate(() => document.querySelector('#mz-shapes path').dataset.spline.split(' ').slice(2).join(' '))).slice(4, 6).every(v => h.near(v, 850))).toBe(true);
  expect(await h.colorAt(page, { x: 780, y: 780 })).toBe('#e76f51');
  await page.keyboard.press('Control+z');
  expect(nums(await page.evaluate(() => document.querySelector('#mz-shapes path').dataset.spline.split(' ').slice(2).join(' '))).slice(4, 6).every(v => h.near(v, 700))).toBe(true);
  expect(errors).toEqual([]);
});

test('Bézier control points are round handles; Backspace takes back a point; symmetry copies curves and ellipses', async ({ page }) => {
  const { errors } = await h.open(page, { mode: 'expert' });
  await h.key(page, 'c');
  await page.selectOption('#opt-curve-type', 'bezier3');
  for (const p of [{ x: 100, y: 100 }, { x: 200, y: 50 }, { x: 300, y: 150 }, { x: 400, y: 100 }, { x: 450, y: 300 }]) await h.click(page, p, { keys: ['Alt'] });
  await h.key(page, 'Backspace');
  await h.key(page, 'Enter');
  const d = await page.evaluate(() => document.querySelector('#mz-shapes path').getAttribute('d'));
  expect(d.replace(/[-\d.]+/g, '#')).toBe('M# # C# # # # # #'); // one cubic segment: the fifth point was taken back
  expect(nums(d).every((v, i) => h.near(v, [100, 100, 200, 50, 300, 150, 400, 100][i]))).toBe(true);
  await h.key(page, 'v');
  await h.click(page, { x: 250, y: 100 });
  // the two control points are round, the ends square, joined by a dashed line
  expect(await h.count(page, '#mz-sel circle.handle')).toBe(2);
  expect(await h.count(page, '#mz-sel rect.handle')).toBe(2);
  expect(await h.count(page, '#mz-sel .sel-ctrl')).toBe(1);
  await expect(page.locator('#sel-info')).toHaveText('(cubic Bézier)');

  // mirrored left–right around the middle: a copy of each
  await page.evaluate(() => { document.querySelectorAll('#mz-shapes > *').forEach(p => p.remove()); Object.assign(MZ.state.sym, { type: 'mirror-v', cx: 500, cy: 500 }); MZ.commit(); });
  await h.key(page, 'c');
  for (const p of [{ x: 100, y: 100 }, { x: 200, y: 300 }, { x: 300, y: 100 }]) await h.click(page, p, { keys: ['Alt'] });
  await h.key(page, 'Enter');
  const spl = await page.evaluate(() => [...document.querySelectorAll('#mz-shapes path')].map(p => p.dataset.spline.split(' ').slice(2).join(' ')));
  expect(spl.length).toBe(2);
  expect(spl.map(nums).every((q, k) => q.every((v, i) => h.near(v, [[100, 100, 200, 300, 300, 100], [900, 100, 800, 300, 700, 100]][k][i])))).toBe(true);
  // a turned ellipse: 4-fold rotation gives the ellipse lying, standing, lying, standing
  await page.evaluate(() => Object.assign(MZ.state.sym, { type: 'rotate', n: 4, mirror: false }));
  await h.key(page, 'o');
  await page.evaluate(() => { MZ.state.ellipseMode = 'center'; });
  await h.drag(page, { x: 500, y: 200 }, { x: 600, y: 250 }, { keys: ['Alt'] });
  const turns = await page.evaluate(() => [...document.querySelectorAll('#mz-shapes ellipse')].map(e => e.getAttribute('transform') || ''));
  expect(turns.map(s => s && nums(s))).toEqual(['', expect.any(Array), '', expect.any(Array)]);
  expect([turns[1], turns[3]].map(nums).every((q, k) => q.every((v, i) => h.near(v, [[90, 800, 500], [90, 200, 500]][k][i])))).toBe(true);
  expect(errors).toEqual([]);
});

test('curves and ellipses survive saving and opening', async ({ page }) => {
  await h.open(page);
  await h.key(page, 'c');
  await page.selectOption('#opt-curve-type', 'bspline');
  for (const p of [{ x: 100, y: 100 }, { x: 400, y: 600 }, { x: 800, y: 100 }]) await h.click(page, p, { keys: ['Alt'] });
  await h.key(page, 'Enter');
  await h.key(page, 'o');
  await h.drag(page, { x: 200, y: 700 }, { x: 400, y: 900 }, { keys: ['Alt'] });
  const before = await page.evaluate(() => [...document.querySelectorAll('#mz-shapes > *')].map(e => e.outerHTML));
  await page.evaluate(() => MZ.loadSVGText(MZ.buildSVGString(), { restore: true }));
  const after = await page.evaluate(() => [...document.querySelectorAll('#mz-shapes > *')].map(e => e.outerHTML));
  expect(after).toEqual(before);
  // still editable after opening
  await h.key(page, 'v');
  await h.click(page, { x: 300, y: 700 });
  expect(await page.evaluate(() => MZ.state.handles.length)).toBe(4);
});
