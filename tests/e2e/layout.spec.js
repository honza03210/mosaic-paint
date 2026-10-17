// A narrower window (or wider fonts): the top bar scrolls on its own – the page never scrolls sideways, so the
// canvas stays where it is.
const { test } = require('@playwright/test');
const { expect } = require('./helpers');

for (const app of ['raster.html', 'index.html']) {
  test(`${app}: at 1000 px the page doesn't scroll sideways, even after clicking the last top-bar button`, async ({ page }) => {
    await page.setViewportSize({ width: 1000, height: 700 });
    await page.goto(app);
    await page.waitForFunction(() => (window.RZ && RZ.ready) || (window.MZ && MZ.ready));
    // (wider text than here – as on Linux – is what made it overflow)
    await page.addStyleTag({ content: '#topbar button { letter-spacing: .12em; }' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
    await page.locator('#topbar > button:visible').last().scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => [scrollX, document.querySelector('#stage').getBoundingClientRect().left >= 0])).toEqual([0, true]);
  });
}
