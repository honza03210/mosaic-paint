// On a phone: the selection's toolbar fits the screen and its buttons work by tap; the rotate knob turns with a finger.
const { test } = require('@playwright/test');
const { expect } = require('./helpers');

async function finger(page, pts) {
  await page.evaluate((pts) => {
    const v = document.querySelector('#view'), at = pts.map(([x, y]) => RZ.screen(x, y));
    const ev = (kind, p) => v.dispatchEvent(new PointerEvent(kind, { bubbles: true, pointerId: 9, pointerType: 'touch', isPrimary: true, clientX: p.x, clientY: p.y, button: kind === 'pointermove' ? -1 : 0, buttons: kind === 'pointerup' ? 0 : 1 }));
    ev('pointerdown', at[0]);
    for (const p of at.slice(1)) ev('pointermove', p);
    ev('pointerup', at[at.length - 1]);
  }, pts);
}

test('the toolbar fits the phone; Turn right by tap; the knob turns it back with a finger', async ({ page }) => {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.evaluate(() => {
    RZ.blank(200, 200);
    const x = RZ.doc.getContext('2d');
    x.fillStyle = '#ff0000'; x.fillRect(80, 90, 40, 20);
    RZ.commit();
    RZ.state.selShape = 'rect';
    RZ.setTool('select');
    RZ.state.sel = { x: 80, y: 90, w: 40, h: 20 };
    RZ.selectionChanged();
  });
  await page.click('#btn-fit');
  const bar = page.locator('#stage-actions');
  await expect(bar).toBeVisible();
  const b = await bar.boundingBox(), vw = page.viewportSize().width;
  expect(b.x).toBeGreaterThanOrEqual(0);
  expect(b.x + b.width).toBeLessThanOrEqual(vw);
  await page.tap('#sa-rotr');
  expect(await page.evaluate(() => { const f = RZ.state.floating; return [f.canvas.width, f.canvas.height]; })).toEqual([20, 40]);
  // the knob: to the right now (it follows the turn); a finger takes it back up
  const g = await page.evaluate(() => 26 / RZ.state.view.s);
  await page.waitForTimeout(400); // (not a double-tap: the quick menu)
  await finger(page, [[110 + g, 100], [110 + g, 80], [105, 60], [100, 100 - 10 - g - 20]]);
  expect(await page.evaluate(() => Math.abs(RZ.state.floating.xf.r))).toBeLessThan(1e-6);
  expect(await page.evaluate(() => { const f = RZ.state.floating; return [f.canvas.width, f.canvas.height]; })).toEqual([40, 20]);
});
