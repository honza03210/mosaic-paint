const { test } = require('@playwright/test');
const { expect } = require('./helpers');

test.use({ serviceWorkers: 'allow' });

test('after the first visit the app also starts offline', async ({ page, context }) => {
  await page.goto('/');
  await page.waitForFunction(() => window.MZ && window.MZ.ready);
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload(); // now controlled by the service worker
  await page.waitForFunction(() => !!navigator.serviceWorker.controller);
  await context.setOffline(true);
  await page.reload();
  await page.waitForFunction(() => window.MZ && window.MZ.ready);
  await expect(page.locator('#tools button[data-tool]')).toHaveCount(10);
  await context.setOffline(false);
});

test('Chrome considers the app installable', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'installability is reported by Chrome only');
  await page.goto('/');
  await page.waitForFunction(() => window.MZ && window.MZ.ready);
  await page.evaluate(() => navigator.serviceWorker.ready);
  const cdp = await page.context().newCDPSession(page);
  const { installabilityErrors } = await cdp.send('Page.getInstallabilityErrors');
  // test browsers are private windows, where installing is never offered; anything else is a real problem
  expect(installabilityErrors.filter(e => e.errorId !== 'in-incognito')).toEqual([]);
  const { errors } = await cdp.send('Page.getAppManifest');
  expect(errors).toEqual([]);
});
