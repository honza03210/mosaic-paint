// Setting up the palette from colors copied on another website; and the app in Czech, with nothing left in English.
const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;

const COOLORS = 'https://coolors.co/palette/264653-2a9d8f-e9c46a-f4a261-e76f51';

test('Paste colors…: everything found shows; one left out; added to the palette – or instead of it', async ({ page }) => {
  await h.open(page, { mode: 'simple' });
  await page.click('#palette ~ .row [data-pal-setup]');
  const d = page.locator('#dlg-palsetup');
  await expect(d).toBeVisible();
  await expect(d.locator('.ps-ok')).toBeDisabled();
  // a palette site's link, a CSS line and an rgb() – as copied from a page
  await d.locator('.ps-text').fill(`${COOLORS}\n--accent: #ff006e; color: rgb(131, 56, 236);`);
  await expect(d.locator('.ps-swatch')).toHaveCount(7);
  await expect(d.locator('.ps-count')).toHaveText('7 colors found.');
  // leave the pink one out
  await d.locator('.ps-swatch[aria-label="#ff006e"]').click();
  await expect(d.locator('.ps-count')).toHaveText('6 colors found.');
  // replace the palette with them
  await d.locator('input[value=replace]').check();
  await d.locator('.ps-ok').click();
  await expect(d).toBeHidden();
  await expect.poll(() => page.evaluate(() => MZ.state.palette)).toEqual(['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51', '#8338ec']);
  await expect(page.locator('#st-msg')).toContainText('The palette now has 6 colors.');
  // add: only what isn't there yet
  await page.click('#palette ~ .row [data-pal-setup]');
  await d.locator('.ps-text').fill('#264653 #ffbe0b');
  await d.locator('.ps-ok').click();
  // (it opens on Add again – replacing is chosen each time)
  await expect.poll(() => page.evaluate(() => MZ.state.palette.slice(-1))).toEqual(['#ffbe0b']);
  await expect(page.locator('#st-msg')).toContainText('Added 1 color to the palette.');
  // nothing usable: says so
  await page.click('#palette ~ .row [data-pal-setup]');
  await d.locator('.ps-text').fill('a nice photo of the sea');
  await expect(d.locator('.ps-count')).toContainText('No colors found');
  await expect(d.locator('.ps-ok')).toBeDisabled();
});

test('the raster app has it too (the palettes are shared)', async ({ page }) => {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && RZ.ready);
  await page.click('[data-pal-setup]');
  await page.locator('#dlg-palsetup .ps-text').fill('#010203, #a0b0c0');
  await page.locator('#dlg-palsetup .ps-ok').click();
  await expect.poll(() => page.evaluate(() => RZ.state.palette.slice(-2))).toEqual(['#010203', '#a0b0c0']);
});

/** Every bit of text a person can see – in the page, tooltips and labels. */
const visibleTexts = (page) => page.evaluate(() => {
  const out = new Set();
  const seen = (el) => !!(el.offsetParent || el.getClientRects().length) && getComputedStyle(el).visibility !== 'hidden';
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = walk.nextNode(); n; n = walk.nextNode()) {
    const s = n.textContent.trim();
    if (s && n.parentElement && !n.parentElement.closest('script,style,svg,#lang-select,select') && seen(n.parentElement)) out.add(s);
  }
  for (const el of document.querySelectorAll('[title],[aria-label],[placeholder]')) {
    if (!seen(el) || el.closest('#lang-select')) continue;
    for (const a of ['title', 'aria-label', 'placeholder']) { const v = el.getAttribute(a); if (v) out.add(v.trim()); }
  }
  return [...out];
});
// the same in every language: names, codes, numbers, symbols
const SAME = /^(PNG|SVG|JPEG|WebP|CSV|ORA|3D…|Mosaic Paint|Mosaic Paint Raster|Expert|OK|Raster|mm|cm|in|px|%|[\d\s.,:%°×#+\-–…()/]*|v[\d.]+|[A-Z]|.{0,2}|Ctrl\+.*|#[0-9a-f]{6}.*|#\d+ #[0-9a-f]{6}.*|https?:.*|.*#[0-9a-f]{6}, .*|[\d.]+ MB|[A-Z]( [A-Z])+|Alt|Del|Shift(\+[A-Z])?|Enter \/ Esc|\[ \]|[⟲⟳] 90°)$/i;

for (const [app, url, ready] of [['vector', 'index.html', 'MZ'], ['raster', 'raster.html', 'RZ']]) {
  for (const mode of ['simple', 'expert']) {
    test(`${app} app, ${mode} mode: everything you see is in Czech`, async ({ page }) => {
      await page.setViewportSize({ width: 1400, height: 900 });
      const texts = {};
      for (const lang of ['en', 'cs']) {
        await page.addInitScript((l) => localStorage.setItem('mz-lang', l), lang);
        await page.goto(url);
        await page.waitForFunction((r) => window[r] && window[r].ready, ready);
        await page.evaluate(([r, m]) => { window[r].setMode(m); document.querySelector('#guide')?.close?.(); }, [ready, mode]);
        await page.waitForTimeout(200);
        texts[lang] = await visibleTexts(page);
      }
      expect(await page.evaluate(() => document.documentElement.lang)).toBe('cs');
      const left = texts.cs.filter(s => texts.en.includes(s) && !SAME.test(s));
      expect(left).toEqual([]);
    });
  }
}
