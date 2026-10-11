// The raster app's history, colors report, printable template and share links.
const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;

/** The raster app with a 60 × 40 image: two red tiles, one blue tile, white grout around them. */
async function open(page) {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.evaluate(() => {
    RZ.blank(60, 40);
    const x = RZ.doc.getContext('2d');
    x.fillStyle = '#e76f51'; x.fillRect(2, 2, 16, 36); x.fillRect(22, 2, 16, 36);
    x.fillStyle = '#264653'; x.fillRect(42, 2, 16, 36);
    RZ.commit();
    RZ.state.realWidth = 300;
  });
  return { errors };
}
const color = (page, x, y) => page.evaluate(([x, y]) => RZ.colorAt(x, y), [x, y]);

test('history: versions of the image can be restored, and stay apart from the vector app’s', async ({ page }) => {
  const { errors } = await open(page);
  await page.click('#btn-history');
  await page.click('#hist-save');
  await expect(page.locator('#st-msg')).toContainText('Version saved');
  await expect(page.locator('#hist-list .hist-row')).toHaveCount(1);
  await page.keyboard.press('Escape');
  await page.evaluate(() => { const x = RZ.doc.getContext('2d'); x.fillStyle = '#000000'; x.fillRect(0, 0, 60, 40); RZ.commit(); });
  expect(await color(page, 10, 10)).toBe('#000000');
  await page.click('#btn-history');
  await page.locator('#hist-list .hist-row').first().locator('button').click();
  await expect.poll(() => color(page, 10, 10)).toBe('#e76f51');
  await expect(page.locator('#st-msg')).toContainText('Restored the version');
  // the vector app lists only its own versions
  await page.goto('/');
  await page.waitForFunction(() => window.MZ && window.MZ.ready);
  await page.click('#btn-history');
  await expect(page.locator('#hist-list')).toContainText('No versions yet');
  expect(errors).toEqual([]);
});

test('report: colors with their pieces, pixels and real area; replacing a color', async ({ page, browserName }) => {
  await open(page);
  await page.click('#btn-report');
  await expect(page.locator('#rep-summary')).toContainText('4 pieces in 3 colors · 60 × 40 px');
  await expect(page.locator('#rep-size')).toContainText('300 × 200 mm · 5.00 mm per pixel');
  const rows = page.locator('#rep-table tr');
  await expect(rows).toHaveCount(4);
  // most pixels first: red (2 pieces, 1,152 px × 25 mm² each), then the white grout, then blue
  await expect(rows.nth(1).locator('td')).toHaveText(['1', ' #e76f51', '2', '1,152', '48.0 %', '2.88 dm²', /transparent/]);
  await expect(rows.nth(2)).toContainText('#ffffff');
  await expect(rows.nth(3)).toContainText('#264653');
  await rows.nth(1).locator('select').selectOption('#2a9d8f');
  await expect(page.locator('#st-msg')).toContainText('Recolored 1,152 pixels');
  expect(await color(page, 10, 10)).toBe('#2a9d8f');
  test.skip(browserName === 'webkit' && process.platform === 'win32', 'downloads are cancelled by WebKit on Windows');
  const [dl] = await Promise.all([page.waitForEvent('download'), page.click('#rep-csv')]);
  expect(dl.suggestedFilename()).toBe('test-colors.csv');
});

test('print: real size on sheets, color numbers on the pieces, outlines to paint by number', async ({ page }) => {
  await open(page);
  await page.evaluate(() => RZ.setMode('expert'));
  await page.click('#btn-print');
  await expect(page.locator('#print-info')).toContainText('sheets');
  const both = await page.evaluate(() => RZ.printPage('both'));
  expect(both).toContain('<image href="data:image/png');
  const art = both.slice(both.indexOf('<g id="art">'), both.indexOf('</defs>'));
  expect((art.match(/<text /g) || []).length).toBe(4); // one number per piece
  expect(both).toContain('Sheet A1');
  expect(both).toContain('#e76f51</td><td>2 pieces');
  const numbers = await page.evaluate(() => RZ.printPage('numbers'));
  expect(numbers).not.toContain('<image');
  expect(numbers).toMatch(/<path d="M[^"]+" fill="none" stroke="#444444"/);
  const [popup] = await Promise.all([page.waitForEvent('popup'), page.click('#print-go')]);
  expect(popup).toBeTruthy();
});

test('share: the image travels in the link; it opens read-only and can become your own copy', async ({ page }) => {
  await open(page);
  await page.click('#btn-share');
  await expect(page.locator('#share-size')).toContainText('KB');
  const link = await page.inputValue('#share-link');
  expect(link).toMatch(/raster\.html#view=p[A-Za-z0-9_-]+$/);
  await page.keyboard.press('Escape');
  // the visitor has a different image of their own
  await page.evaluate(() => { RZ.blank(10, 10, '#000000'); });
  await page.waitForTimeout(1200);
  await page.goto(link);
  await page.reload(); // a fresh start with the link (as when it is opened from a message)
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await expect(page.locator('body')).toHaveClass(/viewer/);
  await expect.poll(() => page.evaluate(() => [RZ.doc.width, RZ.doc.height])).toEqual([60, 40]);
  expect(await color(page, 50, 20)).toBe('#264653');
  await expect(page.locator('#tools')).toBeHidden();
  await page.click('#viewer-copy');
  await expect(page.locator('body')).not.toHaveClass(/viewer/);
  await expect(page.locator('#tools')).toBeVisible();
  expect(page.url()).not.toContain('#view=');
});
