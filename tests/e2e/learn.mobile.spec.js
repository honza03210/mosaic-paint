// Lessons on a phone: the settings are in the slide-in panel – the spotlight opens it for them and
// closes it for painting; with no zoom buttons, zooming is "spread two fingers".
const { test } = require('@playwright/test');
const { expect } = require('./helpers');

const frame = (page) => page.frames().find(f => f.url().includes('raster.html'));
const ed = (page) => page.frameLocator('#editor');
const at = (page, i) => expect(page.locator(`#dots .dot:nth-child(${i + 1})`)).toHaveClass(/now/, { timeout: 15000 });
const bubble = (page) => ed(page).locator('#lsn-layer .lsn-bubble');

test('Night sky with fingers: the panel opens for the color and size, and closes to paint', async ({ page }) => {
  await page.goto('learn.html');
  await page.locator('.card').nth(1).tap();
  await at(page, 0);
  await ed(page).locator('#tools [data-tool="brush"]').tap();
  await at(page, 1);
  // the color is in the side panel: it slid in by itself
  await expect.poll(() => frame(page).evaluate(() => document.body.classList.contains('panel-open'))).toBe(true);
  await ed(page).locator('#palette .swatch[aria-label*="#e9c46a"]').tap();
  await at(page, 2);
  await ed(page).locator('#opt-tip').selectOption('soft');
  await at(page, 3);
  await ed(page).locator('#opt-size-range').fill('40');
  await at(page, 4);
  // painting: the panel is out of the way
  await expect.poll(() => frame(page).evaluate(() => document.body.classList.contains('panel-open'))).toBe(false);
  await frame(page).evaluate(() => {
    const v = document.querySelector('#view');
    for (const [x, y] of [[110, 90], [260, 170], [400, 80]]) {
      const pts = Array.from({ length: 17 }, (_, i) => RZ.screen(x + 6 * Math.cos(i * Math.PI / 4), y + 6 * Math.sin(i * Math.PI / 4)));
      const ev = (k, p) => v.dispatchEvent(new PointerEvent(k, { bubbles: true, pointerId: 7, pointerType: 'touch', isPrimary: true, clientX: p.x, clientY: p.y, button: k === 'pointermove' ? -1 : 0, buttons: k === 'pointerup' ? 0 : 1 }));
      ev('pointerdown', pts[0]); for (const p of pts.slice(1)) ev('pointermove', p); ev('pointerup', pts[pts.length - 1]);
    }
  });
  await expect(page.locator('#finish')).toBeVisible({ timeout: 15000 });
  await expect(page.locator('#btn-next')).toContainText('Pixel heart');
});

test('Look around on a phone: "spread two fingers" instead of the zoom button', async ({ page }) => {
  await page.goto('learn.html');
  await page.locator('.card').first().tap();
  await at(page, 0);
  await expect(bubble(page)).toHaveText('Spread two fingers on the picture to zoom in.');
});
