// The version in the status bar and "What's new": quiet on a first visit, pointed out after an update.
const { test } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { expect } = require('./helpers');

const { version } = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf8'));

test('the version is shown; after an update it points at what is new until looked at', async ({ page }) => {
  await page.goto('index.html');
  await page.waitForFunction(() => window.MZ && MZ.ready);
  const button = page.locator('#st-version');
  await expect(button).toHaveText('v' + version);
  await expect(button).not.toHaveClass(/new/);
  expect(await page.evaluate(() => localStorage.getItem('mz-version'))).toBe(version);
  // an older version was seen before
  await page.evaluate(() => localStorage.setItem('mz-version', '0.9.0'));
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && RZ.ready);
  await expect(button).toHaveClass(/new/);
  await expect(page.locator('#st-msg')).toContainText(`Updated to version ${version}`);
  await button.click();
  await expect(page.locator('#dlg-whats-new')).toBeVisible();
  await expect(page.locator('#dlg-whats-new h3').first()).toContainText(version);
  await expect(page.locator('#dlg-whats-new li').first()).toContainText('The raster app');
  await page.keyboard.press('Escape');
  await page.reload();
  await page.waitForFunction(() => window.RZ && RZ.ready);
  await expect(button).not.toHaveClass(/new/);
});
