// The Czech version: texts, messages with Czech word forms, and switching the language.
const { test } = require('@playwright/test');
const { expect } = require('./helpers');

test('both apps speak Czech when chosen, and switch back to English', async ({ page }) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.addInitScript(() => { if (!sessionStorage.getItem('lang-set')) { localStorage.setItem('mz-lang', 'cs'); sessionStorage.setItem('lang-set', '1'); } });
  await page.goto('/');
  await page.waitForFunction(() => window.MZ && window.MZ.ready);
  await expect(page.locator('html')).toHaveAttribute('lang', 'cs');
  await expect(page.locator('#btn-new')).toHaveText('Nový');
  await expect(page.locator('#btn-undo')).toHaveAttribute('title', 'Zpět (Ctrl+Z)');
  await expect(page.locator('#lang-select')).toHaveValue('cs');
  await expect(page.locator('#st-hint')).toContainText('Kliknutím vyberete');
  await page.keyboard.press('s');
  await expect(page.locator('#st-msg')).toHaveText('Přichytávání vypnuto');

  // the raster app, with a message using Czech word forms
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await expect(page.locator('#btn-mosaic')).toHaveText('Vytvořit mozaiku…');
  await page.evaluate(() => {
    RZ.blank(40, 20);
    const x = RZ.doc.getContext('2d'); x.fillStyle = '#e76f51'; x.fillRect(0, 0, 20, 20); RZ.commit();
    Object.assign(RZ.state.mosaic, { tile: 10, grout: 0, colors: 'keep', shape: 'square', detail: 0 });
  });
  await page.click('#btn-mosaic');
  await expect(page.locator('#mo-estimate')).toHaveText('Asi 8 dlaždic.');
  await page.click('#mo-go');
  await expect(page.locator('#st-msg')).toHaveText('Vytvořeno 8 dlaždic ve 2 barvách.');

  // back to English
  await page.selectOption('#lang-select', 'en');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await expect(page.locator('#btn-mosaic')).toHaveText('Make a mosaic…');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  expect(errors).toEqual([]);
});
