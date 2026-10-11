// Heavy work runs in a worker (started from a blob, so it also works from a file), and on the page when
// there are no workers. The mosaic effect stands in for all jobs.
const { test } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');
const h = require('./helpers');
const { expect } = h;

/** Counts the workers started and the messages they send back. */
const countWorkers = () => {
  const W = window.Worker;
  window.__workers = 0;
  window.__messages = 0;
  window.Worker = class extends W {
    constructor(...a) { super(...a); window.__workers++; }
    set onmessage(f) { super.onmessage = (e) => { window.__messages++; f(e); }; }
  };
};

async function mosaic(page, url) {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(url);
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.evaluate(() => {
    RZ.blank(100, 60);
    const x = RZ.doc.getContext('2d'), g = x.createLinearGradient(0, 0, 100, 0);
    g.addColorStop(0, '#d04020'); g.addColorStop(1, '#2050c0');
    x.fillStyle = g; x.fillRect(0, 0, 100, 60); RZ.commit();
    RZ.state.palettes['Test'] = ['#e76f51', '#457b9d', '#1d3557', '#f1faee']; RZ.state.paletteName = 'Test';
  });
  await page.click('#btn-mosaic');
  await page.fill('#mo-tile', '10');
  await page.dispatchEvent('#mo-tile', 'change');
  await page.check('input[name=mo-colors][value=palette]');
  await page.click('#mo-go');
  await expect(page.locator('#st-msg')).toContainText('Made 60 tiles');
  return errors;
}

test('the mosaic is made in a worker', async ({ page }) => {
  await page.addInitScript(countWorkers);
  const errors = await mosaic(page, 'raster.html');
  expect(await page.evaluate(() => window.__workers)).toBe(1);
  expect(await page.evaluate(() => window.__messages)).toBeGreaterThan(0);
  expect(errors).toEqual([]);
});

test('without workers the work is done on the page', async ({ page }) => {
  await page.addInitScript(() => { window.Worker = undefined; });
  expect(await mosaic(page, 'raster.html')).toEqual([]);
});

test('from a file, the worker starts from a blob', async ({ page, browserName }) => {
  test.skip(browserName === 'webkit', 'WebKit runs pages from files with other limits');
  await page.addInitScript(countWorkers);
  await mosaic(page, pathToFileURL(path.join(__dirname, '../../raster.html')).href);
  expect(await page.evaluate(() => window.__messages)).toBeGreaterThan(0);
});
