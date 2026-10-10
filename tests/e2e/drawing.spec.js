const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;

test('loads cleanly in Simple mode; Expert reveals the extra tools', async ({ page }) => {
  const { errors } = await h.open(page);
  await expect(page.locator('[data-tool=knife]')).toBeHidden();
  await expect(page.locator('#btn-print')).toBeHidden();
  await page.click('#mode-switch [data-mode=expert]');
  await expect(page.locator('[data-tool=knife]')).toBeVisible();
  await expect(page.locator('#btn-print')).toBeVisible();
  await page.click('#mode-switch [data-mode=simple]');
  await expect(page.locator('[data-tool=knife]')).toBeHidden();
  expect(errors).toEqual([]);
});

test('line ends snap to the page edge and onto the middle of other lines', async ({ page }) => {
  await h.open(page);
  await h.key(page, 'l');
  await h.drag(page, { x: 300, y: 3 }, { x: 700, y: 996 });
  const first = await page.evaluate(() => [...document.querySelectorAll('#mz-shapes line')].map(l => [+l.getAttribute('y1'), +l.getAttribute('y2')]));
  expect(first).toEqual([[0, 1000]]);
  // start a new line 6 units beside the middle of the first one → it starts exactly on it
  await h.drag(page, { x: 506, y: 500 }, { x: 900, y: 400 });
  const d = await page.evaluate(() => {
    const l = document.querySelectorAll('#mz-shapes line')[1], p = { x: +l.getAttribute('x1'), y: +l.getAttribute('y1') };
    return Geo.dist(p, Geo.project(p, { x: 300, y: 0 }, { x: 700, y: 1000 }));
  });
  expect(d).toBeLessThan(0.01);
});

test('regular polygons: from the center, resized by a handle, and grown from an edge', async ({ page }) => {
  await h.open(page);
  await h.key(page, 'g');
  await page.evaluate(() => { MZ.state.sides = 6; MZ.state.ngonMode = 'center'; });
  await h.drag(page, { x: 500, y: 500 }, { x: 500, y: 250 });
  expect(await page.getAttribute('#mz-shapes polygon', 'data-ngon')).toBe('6 500 500 250 -90');
  await h.key(page, 'v');
  await h.click(page, { x: 716.5, y: 500 });
  await h.drag(page, { x: 500, y: 250 }, { x: 500, y: 200 });
  expect(await page.getAttribute('#mz-shapes polygon', 'data-ngon')).toBe('6 500 500 300 -90');

  // edge mode: a new hexagon on an outer edge grows outward, not on top of the first one
  await h.key(page, 'g');
  await page.evaluate(() => { MZ.state.ngonMode = 'edge'; });
  const [a, b] = await page.evaluate(() => {
    const p = document.querySelector('#mz-shapes polygon').getAttribute('points').split(' ').map(s => s.split(',').map(Number));
    return [{ x: p[0][0], y: p[0][1] }, { x: p[1][0], y: p[1][1] }];
  });
  await h.drag(page, a, b);
  const centers = await page.evaluate(() => [...document.querySelectorAll('#mz-shapes polygon')].map(e => e.getAttribute('data-ngon').split(' ').slice(1, 3).map(Number)));
  expect(centers.length).toBe(2);
  expect(Math.hypot(centers[1][0] - 500, centers[1][1] - 500)).toBeGreaterThan(400);
});

test('free polygon closes by clicking its first corner', async ({ page }) => {
  await h.open(page);
  await h.key(page, 'p');
  for (const p of [{ x: 100, y: 100 }, { x: 400, y: 80 }, { x: 420, y: 400 }, { x: 90, y: 380 }, { x: 103, y: 102 }]) await h.click(page, p);
  expect(await page.getAttribute('#mz-shapes polygon', 'points')).toBe('100,100 400,80 420,400 90,380');
});

test('pattern tool fills an area with merged lines', async ({ page }) => {
  await h.open(page);
  await h.setState(page, { pattern: { type: 'square', size: 100, angle: 0 } });
  await h.key(page, 't');
  await h.click(page, { x: 500, y: 500 });
  expect(await h.count(page, '#mz-shapes line')).toBe(18);
});

test('knife cuts a tile from edge to edge (Expert)', async ({ page }) => {
  await h.open(page, { mode: 'expert' });
  await h.key(page, 'k');
  await h.drag(page, { x: 250, y: 400 }, { x: 250, y: 600 });
  const c = await page.evaluate(() => { const l = document.querySelector('#mz-shapes line'); return ['x1', 'y1', 'x2', 'y2'].map(k => +l.getAttribute(k)); });
  expect(c).toEqual([250, 0, 250, 1000]);
});

test('radial symmetry repeats a line around the center (Expert)', async ({ page }) => {
  await h.open(page, { mode: 'expert' });
  await page.evaluate(() => Object.assign(MZ.state.sym, { type: 'radial', n: 4, mirror: false, cx: null, cy: null }));
  await h.key(page, 'l');
  await h.drag(page, { x: 500, y: 420 }, { x: 500, y: 60 }, { keys: ['Alt'] });
  expect(await h.count(page, '#mz-shapes line')).toBe(4);
});
