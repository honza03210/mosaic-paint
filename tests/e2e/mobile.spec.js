// Runs in the "mobile" project (a phone with a touch screen).
const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;

async function touch(page, type, id, p) {
  const s = await h.scr(page, p);
  await page.evaluate(([t, i, x, y]) => document.querySelector('#canvas').dispatchEvent(new PointerEvent(t, {
    bubbles: true, pointerId: i, pointerType: 'touch', isPrimary: i === 1, button: 0, clientX: x, clientY: y,
  })), [type, id, s.x, s.y]);
}

test('phone layout: the side panel opens from the ☰ button', async ({ page }) => {
  const { errors } = await h.open(page);
  const panel = page.locator('#panel');
  const offscreen = async () => (await panel.boundingBox()).x >= page.viewportSize().width - 1;
  expect(await offscreen()).toBe(true);
  await page.click('#btn-panel');
  await expect.poll(offscreen).toBe(false);
  expect(errors).toEqual([]);
});

test('a tap paints; a two-finger pinch zooms without painting', async ({ page }) => {
  await h.open(page);
  await h.setState(page, { pattern: { type: 'square', size: 100, angle: 0 } });
  await page.evaluate(() => MZ.setTool('pattern'));
  await page.click('#btn-panel');
  await page.click('#btn-pat-page');
  await page.click('#btn-panel');
  await expect.poll(async () => (await page.locator('#panel').boundingBox()).x).toBeGreaterThanOrEqual(page.viewportSize().width - 1);
  await page.evaluate(() => { MZ.setTool('bucket'); MZ.state.fill = '#e76f51'; });
  const s = await h.scr(page, { x: 450, y: 450 });
  await page.touchscreen.tap(s.x, s.y);
  expect(await h.colorAt(page, { x: 450, y: 450 })).toBe('#e76f51');

  await page.evaluate(() => { MZ.state.fill = '#264653'; });
  const s0 = await page.evaluate(() => MZ.state.view.s);
  await touch(page, 'pointerdown', 1, { x: 250, y: 650 });
  await touch(page, 'pointerdown', 2, { x: 350, y: 650 });
  for (let i = 1; i <= 5; i++) {
    await touch(page, 'pointermove', 1, { x: 250 - i * 20, y: 650 });
    await touch(page, 'pointermove', 2, { x: 350 + i * 20, y: 650 });
  }
  await touch(page, 'pointerup', 1, { x: 150, y: 650 });
  await touch(page, 'pointerup', 2, { x: 450, y: 650 });
  expect(await page.evaluate(() => MZ.state.view.s)).toBeGreaterThan(s0 * 1.5);
  expect(await h.count(page, '.mz-fill')).toBe(1);
});

test('the Done bar closes a free polygon without a keyboard', async ({ page }) => {
  await h.open(page);
  await page.evaluate(() => MZ.setTool('free'));
  for (const p of [{ x: 200, y: 200 }, { x: 700, y: 220 }, { x: 600, y: 700 }]) {
    const s = await h.scr(page, p);
    await page.touchscreen.tap(s.x, s.y);
  }
  await expect(page.locator('#stage-actions')).toBeVisible();
  await page.click('#sa-finish');
  expect(await h.count(page, '#mz-shapes polygon')).toBe(1);
  await expect(page.locator('#stage-actions')).toBeHidden();
});
