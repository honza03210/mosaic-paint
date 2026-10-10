const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;

async function hexAndLines(page) {
  await h.key(page, 'g');
  await page.evaluate(() => { MZ.state.sides = 6; MZ.state.ngonMode = 'center'; });
  await h.drag(page, { x: 500, y: 500 }, { x: 500, y: 250 });
  await h.key(page, 'l');
  await h.drag(page, { x: 300, y: 2 }, { x: 700, y: 998 });
  await h.drag(page, { x: 2, y: 600 }, { x: 998, y: 380 });
}

test('bucket paints closed areas, recolors, erases and leaves islands as holes', async ({ page }) => {
  await h.open(page);
  await hexAndLines(page);
  await h.key(page, 'b');
  await h.setState(page, { fill: '#e76f51' });
  await h.click(page, { x: 650, y: 560 });
  await h.setState(page, { fill: '#2a9d8f' });
  await h.click(page, { x: 900, y: 900 });
  await h.expectFills(page, [['#2a9d8f', 194739], ['#e76f51', 37780]]);
  await h.setState(page, { fill: '#1d3557' });
  await h.click(page, { x: 650, y: 560 });
  expect(await h.colorAt(page, { x: 650, y: 560 })).toBe('#1d3557');
  await h.setState(page, { fill: null });
  await h.click(page, { x: 650, y: 560 });
  expect(await h.colorAt(page, { x: 650, y: 560 })).toBe('none');
  // a small square drawn inside the teal area: the area gets a hole, and the square keeps the teal color
  // (drawing lines never changes how the mosaic looks)
  await h.key(page, 'g');
  await page.evaluate(() => { MZ.state.sides = 4; });
  await h.drag(page, { x: 850, y: 850 }, { x: 850, y: 800 });
  // the square's exact size depends on pixel rounding (WebKit), so measure it
  const square = await page.evaluate(() => Math.abs(Geo.polygonArea(MZ.geomOf(document.querySelectorAll('#mz-shapes polygon')[1]).polys[0].pts)));
  await h.expectFills(page, [['#2a9d8f', square], ['#2a9d8f', 194739 - square]]);
});

test('dragging the bucket paints every tile it crosses, as one undo step', async ({ page }) => {
  await h.open(page);
  await h.setState(page, { pattern: { type: 'square', size: 100, angle: 0 } });
  await h.key(page, 't');
  await h.click(page, { x: 500, y: 500 });
  await h.key(page, 'b');
  await h.setState(page, { fill: '#e76f51' });
  await h.drag(page, { x: 50, y: 450 }, { x: 950, y: 450 }, { steps: 30 });
  expect(await h.count(page, '.mz-fill')).toBe(10);
  await page.keyboard.press('Control+z');
  expect(await h.count(page, '.mz-fill')).toBe(0);
  await page.keyboard.press('Control+y');
  expect(await h.count(page, '.mz-fill')).toBe(10);
});

test('small gaps are closed; open line ends are shown when nothing is closed', async ({ page }) => {
  await h.open(page);
  await h.key(page, 'l');
  // a vertical line, and a horizontal one stopping 2 units short of it (gap tolerance is 4)
  await h.drag(page, { x: 500, y: 0 }, { x: 500, y: 1000 });
  await h.drag(page, { x: 502, y: 300 }, { x: 1000, y: 300 }, { keys: ['Alt'] });
  await h.key(page, 'b');
  await h.setState(page, { fill: '#e9c46a' });
  await h.click(page, { x: 750, y: 150 });
  await h.expectFills(page, [['#e9c46a', 150000]]);

  // without the page edge nothing is closed: the dangling ends are circled
  await h.setState(page, { border: false });
  await h.click(page, { x: 200, y: 600 });
  expect(await h.count(page, '#mz-flash .gap-mark')).toBeGreaterThan(0);
  await expect(page.locator('#st-msg')).toContainText('No closed area');
});

test('painted areas follow edited lines: move, split, merge', async ({ page }) => {
  await h.open(page);
  await h.key(page, 'l');
  await h.drag(page, { x: 500, y: 0 }, { x: 500, y: 1000 });
  await h.drag(page, { x: 0, y: 500 }, { x: 1000, y: 500 });
  await h.key(page, 'b');
  await h.setState(page, { fill: '#ff0000' });
  await h.click(page, { x: 250, y: 250 });
  await h.setState(page, { fill: '#0000ff' });
  await h.click(page, { x: 750, y: 750 });

  await h.key(page, 'v');
  await h.click(page, { x: 500, y: 300 });
  await h.drag(page, { x: 500, y: 0 }, { x: 600, y: 0 });
  await h.expectFills(page, [['#0000ff', 237500], ['#ff0000', 287500]]);

  await h.key(page, 'l');
  await h.drag(page, { x: 0, y: 250 }, { x: 570, y: 250 });
  await h.expectFills(page, [['#0000ff', 237500], ['#ff0000', 140483], ['#ff0000', 147017]]);

  await h.key(page, 'v');
  await h.click(page, { x: 300, y: 500 });
  await h.drag(page, { x: 300, y: 500 }, { x: 300, y: 560 });
  await h.expectFills(page, [['#0000ff', 210320], ['#ff0000', 147017], ['#ff0000', 173303]]);
  expect(await h.colorAt(page, { x: 800, y: 200 })).toBe('none');

  await h.click(page, { x: 200, y: 560 });
  await page.keyboard.press('Delete');
  await h.expectFills(page, [['#0000ff', 450000], ['#ff0000', 147017], ['#ff0000', 402983]]);
  await page.keyboard.press('Control+z');
  await h.expectFills(page, [['#0000ff', 210320], ['#ff0000', 147017], ['#ff0000', 173303]]);
});

test('locked lines cannot be selected or drawn on, but can be painted (Expert)', async ({ page }) => {
  await h.open(page, { mode: 'expert' });
  await h.key(page, 'l');
  await h.drag(page, { x: 500, y: 0 }, { x: 500, y: 1000 });
  await page.click('[data-layer=shapes][data-prop=locked]');
  await h.key(page, 'v');
  await h.click(page, { x: 500, y: 300 });
  expect(await page.evaluate(() => MZ.state.selection.size)).toBe(0);
  await h.key(page, 'l');
  await h.drag(page, { x: 100, y: 100 }, { x: 200, y: 200 });
  expect(await h.count(page, '#mz-shapes line')).toBe(1);
  await h.key(page, 'b');
  await h.click(page, { x: 250, y: 250 });
  expect(await h.count(page, '.mz-fill')).toBe(1);
});

test('Alt+click with the bucket picks up a painted color', async ({ page }) => {
  await h.open(page);
  await h.key(page, 'b');
  await h.setState(page, { fill: '#e76f51' });
  await h.click(page, { x: 500, y: 500 });
  await h.setState(page, { fill: '#000000' });
  await h.click(page, { x: 500, y: 500 }, { keys: ['Alt'] });
  expect(await page.evaluate(() => MZ.state.fill)).toBe('#e76f51');
  expect(await h.colorAt(page, { x: 500, y: 500 })).toBe('#e76f51');
});

test('color mix: Shift+click swatches, then painting picks among them without equal neighbours', async ({ page }) => {
  await h.open(page);
  await page.evaluate(() => {
    MZ.state.palette = ['#e76f51', '#2a9d8f', '#264653'];
    document.querySelector('#pal-select').dispatchEvent(new Event('change')); // redraw the swatches
  });
  await page.locator('#palette .swatch').nth(1).click({ modifiers: ['Shift'] });
  await page.locator('#palette .swatch').nth(2).click({ modifiers: ['Shift'] });
  await expect(page.locator('#mix-colors .mix-chip')).toHaveCount(2);
  await expect(page.locator('#palette .swatch.in-mix')).toHaveCount(2);
  await h.setState(page, { pattern: { type: 'square', size: 100, angle: 0 } });
  await h.key(page, 't');
  await h.click(page, { x: 500, y: 500 });
  await h.key(page, 'b');
  await page.click('#tools [data-tool=bucket]'); // show the bucket options
  await expect(page.locator('#mix-on')).toBeChecked();
  await h.drag(page, { x: 50, y: 450 }, { x: 950, y: 450 }, { steps: 40 });
  const row = [];
  for (let i = 0; i < 10; i++) row.push(await h.colorAt(page, { x: 50 + i * 100, y: 450 }));
  expect(new Set(row)).toEqual(new Set(['#e76f51', '#2a9d8f']));
  for (let i = 1; i < 10; i++) expect(row[i]).not.toBe(row[i - 1]); // two colors, no equal neighbours → alternating

  // re-mix a selection
  await page.uncheck('#mix-avoid');
  await h.key(page, 'v');
  await page.keyboard.press('Control+a');
  await page.click('#btn-mix-sel');
  await expect(page.locator('#st-msg')).toContainText('Mixed the colors of 10 areas');
});
