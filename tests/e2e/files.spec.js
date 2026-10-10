const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;

test('save and reopen keeps lines, painted areas, palette, unit and background', async ({ page }) => {
  await h.open(page, { doc: h.blank(300, 300, 'mm') });
  await h.key(page, 'l');
  await h.drag(page, { x: 150, y: 0 }, { x: 150, y: 300 });
  await h.key(page, 'b');
  await h.setState(page, { fill: '#e76f51' });
  await h.click(page, { x: 75, y: 75 });
  const svg = await page.evaluate(() => MZ.buildSVGString());
  expect(svg).toContain('width="300mm"');
  await page.evaluate((s) => MZ.loadSVGText(s), svg);
  await h.expectFills(page, [['#e76f51', 45000]]);
  expect(await page.evaluate(() => MZ.state.doc.unit)).toBe('mm');
});

test('foreign SVG: scripts are removed, straight paths become editable polygons, CSS fills are overridden', async ({ page }) => {
  await h.open(page);
  const ext = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300" fill="none" stroke="#000">
    <style>.t{fill:#ff0000}</style>
    <g transform="translate(50 20)"><path class="t" d="M0 0 H100 V100 H0 Z"/></g>
    <circle cx="300" cy="150" r="60" fill="#00ff00"/><script>window.hacked = 1</script></svg>`;
  await page.evaluate((s) => MZ.loadSVGText(s), ext);
  expect(await h.count(page, '#mz-doc script')).toBe(0);
  expect(await h.count(page, '#mz-shapes polygon')).toBe(1);
  await h.key(page, 'b');
  await h.setState(page, { fill: '#457b9d' });
  await h.click(page, { x: 100, y: 70 });
  expect(await page.evaluate(() => getComputedStyle(document.querySelector('#mz-shapes polygon')).fill)).toBe('rgb(69, 123, 157)');
  expect(await page.evaluate(() => window.hacked)).toBeUndefined();
});

test('the drawing survives a reload (autosave)', async ({ page }) => {
  await h.open(page);
  await h.key(page, 'l');
  await h.drag(page, { x: 500, y: 0 }, { x: 500, y: 1000 });
  await page.waitForTimeout(1200); // autosave runs shortly after a change
  await page.reload();
  await page.waitForFunction(() => window.MZ && window.MZ.ready);
  expect(await h.count(page, '#mz-shapes line')).toBe(1);
});

test('an autosave and settings from the first version are migrated', async ({ page }) => {
  await page.addInitScript(() => {
    if (sessionStorage.getItem('seeded')) return;
    sessionStorage.setItem('seeded', '1');
    localStorage.setItem('mz-autosave', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000"><metadata id="mosaic-palette">["#264653","#ff0000"]</metadata><g id="mosaic-fills"><path class="mz-fill" d="M0 0L500 0L500 1000L0 1000Z" data-area="500000" fill="#ff0000"/></g><g id="mosaic-shapes"><line x1="500" y1="0" x2="500" y2="1000" stroke="#222"/></g></svg>');
    localStorage.setItem('mz-prefs', JSON.stringify({ palette: ['#264653', '#ff0000'], ngonFill: true, sides: 5 }));
  });
  await page.goto('/');
  await page.waitForFunction(() => window.MZ && window.MZ.ready);
  const s = await page.evaluate(() => ({ palettes: MZ.state.palettes, newFill: MZ.state.newFill, sides: MZ.state.sides, unit: MZ.state.doc.unit }));
  expect(s).toEqual({ palettes: { 'My palette': ['#264653', '#ff0000'] }, newFill: true, sides: 5, unit: 'px' });
  expect(await h.fills(page)).toEqual(['#ff0000 500000']);
});

test('history keeps versions that can be restored', async ({ page }) => {
  await h.open(page);
  await h.key(page, 'l');
  await h.drag(page, { x: 500, y: 0 }, { x: 500, y: 1000 });
  await page.click('#btn-history');
  await page.click('#hist-save');
  await expect(page.locator('#hist-list .hist-row')).toHaveCount(1);
  await page.keyboard.press('Escape');
  await page.evaluate(() => MZ.loadSVGText('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"></svg>', { restore: true }));
  expect(await h.count(page, '#mz-shapes line')).toBe(0);
  await page.click('#btn-history');
  await page.locator('#hist-list .hist-row button').first().click();
  await expect.poll(() => h.count(page, '#mz-shapes line')).toBe(1);
});

test('print template: real size split over overlapping A4 sheets, with numbers and a legend (Expert)', async ({ page, context, browserName }) => {
  await h.open(page, { mode: 'expert', doc: h.blank(300, 300, 'mm') });
  await h.key(page, 'l');
  await h.drag(page, { x: 150, y: 0 }, { x: 150, y: 300 });
  await h.key(page, 'b');
  await h.setState(page, { fill: '#e76f51' });
  await h.click(page, { x: 75, y: 75 });
  await page.click('#btn-print');
  await page.selectOption('#print-paper', 'a4');
  await page.check('input[name=print-style][value=both]');
  await page.check('input[name=print-size][value=real]');
  await expect(page.locator('#print-info')).toContainText('4 A4 sheets');
  const [popup] = await Promise.all([context.waitForEvent('page'), page.click('#print-go')]);
  await popup.waitForLoadState();
  const info = await popup.evaluate(() => ({
    sheets: document.querySelectorAll('section.sheet').length,
    labels: document.querySelectorAll('#art text').length,
    legend: document.querySelectorAll('.legend tr').length,
    firstSheetWidth: getComputedStyle(document.querySelectorAll('section.sheet svg')[1]).width,
  }));
  expect(info).toMatchObject({ sheets: 6, labels: 1, legend: 1 }); // overview + 4 sheets + legend
  expect(parseFloat(info.firstSheetWidth)).toBeCloseTo(190 / 25.4 * 96, 0); // a full A4 width (190 mm printable)
  if (browserName === 'chromium') {
    // the real thing: render to PDF and check the paper size and page count
    const pdf = (await popup.pdf({ preferCSSPageSize: true })).toString('latin1');
    expect((pdf.match(/\/Type\s*\/Page\b(?!s)/g) || []).length).toBe(6);
    const [w, hgt] = /\/MediaBox\s*\[\s*0 0 ([\d.]+) ([\d.]+)/.exec(pdf).slice(1).map(Number);
    expect(Math.round(Math.min(w, hgt) / 72 * 25.4)).toBe(210);
    expect(Math.round(Math.max(w, hgt) / 72 * 25.4)).toBe(297);
  }
});

test('fit-to-sheet printing makes a single page', async ({ page, context }) => {
  await h.open(page, { mode: 'expert', doc: h.blank(1000, 600, 'mm') });
  await page.click('#btn-print');
  await page.check('input[name=print-size][value=fit]');
  await page.uncheck('#print-legend');
  await expect(page.locator('#print-info')).toContainText('One A4 sheet (landscape)');
  const [popup] = await Promise.all([context.waitForEvent('page'), page.click('#print-go')]);
  await popup.waitForLoadState();
  expect(await popup.evaluate(() => document.querySelectorAll('section.sheet').length)).toBe(1);
});
