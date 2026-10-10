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
  await expect(page.locator('#tools button')).toHaveCount(8);
  await context.setOffline(false);
});
