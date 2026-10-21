// The other languages: Czech texts, messages with Czech word forms, switching the language; German, Slovak
// and Polish texts and word forms.
const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;

test('both apps speak Czech when chosen, and switch back to English', async ({ page }) => {
  await h.expert(page);
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

test('German, Slovak and Polish: the menu, texts and word forms', async ({ page }) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const cases = [
    ['de', 'Neu', 'Teilen', 'Etwa 8 Fliesen.', '8 Fliesen in 2 Farben erstellt.'],
    ['sk', 'Nový', 'Zdieľať', 'Asi 8 dlaždíc.', 'Vytvorené 8 dlaždíc v 2 farbách.'],
    ['pl', 'Nowy', 'Udostępnij', 'Około 8 płytek.', 'Utworzono 8 płytek w 2 kolorach.'],
  ];
  for (const [code, newLabel, shareLabel, estimate, made] of cases) {
    await page.goto('raster.html');
    await page.evaluate((c) => localStorage.setItem('mz-lang', c), code);
    await page.reload();
    await page.waitForFunction(() => window.RZ && window.RZ.ready);
    await expect(page.locator('html')).toHaveAttribute('lang', code);
    await expect(page.locator('#lang-select')).toHaveValue(code);
    await expect(page.locator('#btn-new')).toHaveText(newLabel);
    await expect(page.locator('#btn-share')).toHaveText(shareLabel);
    await page.evaluate(() => {
      RZ.blank(40, 20);
      const x = RZ.doc.getContext('2d'); x.fillStyle = '#e76f51'; x.fillRect(0, 0, 20, 20); RZ.commit();
      Object.assign(RZ.state.mosaic, { tile: 10, grout: 0, colors: 'keep', shape: 'square', detail: 0 });
    });
    await page.click('#btn-mosaic');
    await expect(page.locator('#mo-estimate')).toHaveText(estimate);
    await page.click('#mo-go');
    await expect(page.locator('#st-msg')).toHaveText(made);
  }
  // the language menu lists them all
  expect(await page.locator('#lang-select option').allTextContents()).toEqual(['English', 'Čeština', 'Deutsch', 'Slovenčina', 'Polski']);
  expect(errors).toEqual([]);
});
