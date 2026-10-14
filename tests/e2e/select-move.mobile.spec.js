// Moving a selection with a finger: with the wand (and Object), a drag that starts inside the selection moves
// it; a tap inside selects anew.
const { test } = require('@playwright/test');
const { expect } = require('./helpers');

async function finger(page, pts) {
  await page.evaluate((pts) => {
    const v = document.querySelector('#view'), ev = (kind, [x, y]) => {
      const p = RZ.screen(x, y);
      v.dispatchEvent(new PointerEvent(kind, { bubbles: true, pointerId: 9, pointerType: 'touch', isPrimary: true, clientX: p.x, clientY: p.y, button: kind === 'pointermove' ? -1 : 0, buttons: kind === 'pointerup' ? 0 : 1 }));
    };
    ev('pointerdown', pts[0]);
    for (const p of pts.slice(1)) ev('pointermove', p);
    ev('pointerup', pts[pts.length - 1]);
  }, pts);
}

test('wand: a finger drag inside the selection moves it; a tap selects anew', async ({ page }) => {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.evaluate(() => {
    RZ.blank(120, 60);
    const x = RZ.doc.getContext('2d');
    x.fillStyle = '#ff0000'; x.beginPath(); x.arc(30, 30, 12, 0, 7); x.fill();
    x.fillStyle = '#0000ff'; x.fillRect(80, 20, 20, 20);
    RZ.commit();
    RZ.state.selShape = 'wand';
    RZ.setTool('select');
  });
  await page.click('#btn-fit');
  // tap the disc: selected
  await finger(page, [[30, 30]]);
  expect(await page.evaluate(() => RZ.state.sel && [RZ.state.sel.x, RZ.state.sel.w])).toEqual([18, 24]);
  // (a moment later – a second touch right after a tap would be a double-tap: the quick menu)
  await page.waitForTimeout(500);
  // drag it 40 px to the right with a finger: it moves
  await finger(page, [[30, 30], [35, 30], [50, 30], [70, 30]]);
  expect(await page.evaluate(() => !!RZ.state.floating)).toBe(true);
  await page.keyboard.press('Enter');
  expect(await page.evaluate(() => [RZ.colorAt(70, 30), RZ.colorAt(30, 30)])).toEqual(['#ff0000', null]);
  await page.waitForTimeout(500);
  // a tap inside the selection (the moved disc) selects anew – and doesn't pick it up
  await finger(page, [[70, 30]]);
  expect(await page.evaluate(() => RZ.state.sel && [RZ.state.sel.x, RZ.state.sel.w])).toEqual([58, 24]);
  expect(await page.evaluate(() => !!RZ.state.floating)).toBe(false);
});
