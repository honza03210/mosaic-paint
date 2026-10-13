// The clone tool with a finger: a tap sets the source, a drag paints the copy, the source disc is dragged
// with a finger; the quick menu offers the tool, and its double-tap doesn't leave a source behind.
const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;

async function setup(page) {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.evaluate(() => {
    RZ.blank(120, 60);
    const x = RZ.doc.getContext('2d');
    x.fillStyle = '#ff0000';
    x.fillRect(10, 10, 20, 40);
    RZ.commit();
    Object.assign(RZ.state, { size: 6, opacity: 1, tip: 'round' });
  });
  await page.click('#btn-fit');
}
const scr = (page, x, y) => page.evaluate(([x, y]) => RZ.screen(x, y), [x, y]);
/** A finger dragged through the points (image pixels). */
async function fingerDrag(page, pts) {
  await page.evaluate((pts) => {
    const v = document.querySelector('#view'), ev = (kind, [x, y]) => {
      const p = RZ.screen(x, y);
      v.dispatchEvent(new PointerEvent(kind, { bubbles: true, pointerId: 7, pointerType: 'touch', isPrimary: true, clientX: p.x, clientY: p.y, button: kind === 'pointermove' ? -1 : 0, buttons: kind === 'pointerup' ? 0 : 1 }));
    };
    ev('pointerdown', pts[0]);
    for (const p of pts.slice(1)) ev('pointermove', p);
    ev('pointerup', pts[pts.length - 1]);
  }, pts);
}

test('with a finger: tap for the source, drag to paint the copy, drag the disc to move the source', async ({ page }) => {
  await setup(page);
  await page.locator('#tools button[data-tool=clone]').tap();
  const s = await scr(page, 20, 20);
  await page.touchscreen.tap(s.x, s.y);
  expect(await page.evaluate(() => RZ.state.clone.src)).toEqual({ x: 20, y: 20 });
  await fingerDrag(page, [[70, 20], [70, 25], [70, 30]]);
  expect(await page.evaluate(() => RZ.colorAt(70, 25))).toBe('#ff0000');
  // the disc (now at the stroke's end + the offset: 20, 30) moves with the finger
  expect(await page.evaluate(() => RZ.state.clone.src)).toEqual({ x: 20, y: 30 });
  await fingerDrag(page, [[20, 30], [40, 30], [60, 40]]);
  expect(await page.evaluate(() => RZ.state.clone.src)).toEqual({ x: 60, y: 40 });
  expect(await page.evaluate(() => RZ.colorAt(40, 30))).toBe('#ffffff');
});

test('the quick menu offers the clone tool, and its double-tap sets no source', async ({ page }) => {
  await setup(page);
  const p = await scr(page, 90, 30);
  await page.touchscreen.tap(p.x, p.y);
  await page.touchscreen.tap(p.x + 2, p.y + 1);
  await expect(page.locator('#quick-menu')).toBeVisible();
  await page.locator('#quick-menu .qm-tool[data-tool=clone]').tap();
  expect(await page.evaluate(() => RZ.state.tool)).toBe('clone');
  // with the clone tool and no source yet, a double-tap opens the menu and leaves no source
  await page.waitForTimeout(400);
  await page.touchscreen.tap(p.x, p.y);
  await page.touchscreen.tap(p.x + 2, p.y + 1);
  await expect(page.locator('#quick-menu')).toBeVisible();
  expect(await page.evaluate(() => RZ.state.clone.src)).toBe(null);
});
