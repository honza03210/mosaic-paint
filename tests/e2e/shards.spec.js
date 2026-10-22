// Simple mode: a picture to draw over; and Shards – hand-laid lines, tapered pieces between the crossings.
const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;

test('Simple mode: choose a picture to draw over – it can fade or go; the rest of the photo tools stay in Expert', async ({ page }) => {
  await h.open(page, { mode: 'simple' });
  await expect(page.locator('#btn-ref-load')).toHaveText('Choose a picture…');
  expect(await page.locator('#btn-ref-load').locator('xpath=ancestor::section').locator('h3').innerText()).toMatch(/picture to draw over/i);
  await page.setInputFiles('#ref-file', { name: 'sun.png', mimeType: 'image/png', buffer: h.png(80, 60, (x) => (x < 40 ? [250, 200, 60] : [120, 190, 240])) });
  await expect(page.locator('#st-msg')).toContainText('Picture loaded – draw over it.');
  await expect.poll(() => page.evaluate(() => !!document.querySelector('#mz-ref image'))).toBe(true);
  await expect(page.locator('#btn-ref-load')).toHaveText('Choose another picture…');
  await expect(page.locator('#ref-opacity')).toBeVisible();
  await expect(page.locator('#btn-ref-remove')).toBeVisible();
  for (const id of ['#ref-show', '#ref-lock', '#ref-size', '#btn-ref-fit', '#btn-automosaic', '#btn-autocolor']) await expect(page.locator(id)).toBeHidden();
  // it is locked: drawing over it doesn't move it
  expect(await page.evaluate(() => MZ.state.layers.ref.locked)).toBe(true);
  await page.click('#btn-ref-remove');
  expect(await h.answer(page)).toBe('Remove the picture?');
  await expect.poll(() => page.evaluate(() => !!document.querySelector('#mz-ref image'))).toBe(false);
  // Expert: the photo's words and everything else
  await page.click('#mode-switch [data-mode=expert]');
  await expect(page.locator('#btn-ref-load')).toHaveText('Load photo…');
});

/** Two lines crossing in a plus, and a third one alongside: 6 pieces between crossings, and 1. */
async function lines(page) {
  await page.evaluate(() => MZ.loadSVGText(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><g id="mosaic-shapes">
    <line x1="100" y1="500" x2="900" y2="500" stroke="#222222" stroke-width="10"/>
    <line x1="500" y1="100" x2="500" y2="900" stroke="#222222" stroke-width="10"/>
    <line x1="100" y1="200" x2="300" y2="200" stroke="#ff0000" stroke-width="10"/>
  </g></svg>`, { restore: true }));
}
const pieces = (page) => page.evaluate(() => [...document.querySelectorAll('#mz-hand path')].map(p => ({ fill: p.getAttribute('fill'), n: (p.getAttribute('d').match(/Z/g) || []).length, d: p.getAttribute('d') })));

test('Shards: every piece between crossings tapered, in the line’s color; the lines stay to edit; one undo step', async ({ page }) => {
  await h.open(page, { mode: 'simple' });
  await lines(page);
  await expect(page.locator('#btn-hand')).toBeVisible();
  await expect(page.locator('#btn-hand .tl')).toHaveText('Shards');
  await page.click('#btn-hand');
  await expect(page.locator('#btn-hand')).toHaveAttribute('aria-pressed', 'true');
  await expect.poll(async () => (await pieces(page)).map(p => [p.fill, p.n])).toEqual([['rgb(34, 34, 34)', 2], ['rgb(34, 34, 34)', 2], ['rgb(255, 0, 0)', 1]]);
  // the even lines are still there (hidden under the pieces), and still the tiles' edges
  expect(await page.evaluate(() => [document.querySelectorAll('#mz-shapes line').length, getComputedStyle(document.querySelector('#mz-shapes line')).strokeOpacity])).toEqual([3, '0']);
  // a piece is a wedge: wider at one end than the other
  const radii = (await pieces(page))[2].d.match(/A([\d.]+) /g).map(s => parseFloat(s.slice(1)));
  expect(radii.length).toBe(2);
  expect(Math.abs(radii[0] - radii[1])).toBeGreaterThan(0.5);
  // shuffle: other widths
  const before = (await pieces(page))[2].d;
  await page.click('#hand-shuffle');
  await expect.poll(async () => (await pieces(page))[2].d).not.toBe(before);
  // moving a line: its pieces follow
  const atFirst = (await pieces(page))[2].d;
  await page.evaluate(() => { const l = document.querySelectorAll('#mz-shapes line')[2]; l.setAttribute('y1', '250'); l.setAttribute('y2', '250'); MZ.invalidate(l); }); // (as the Select tool does when it moves a line)
  await expect.poll(async () => (await pieces(page))[2].d).not.toBe(atFirst);
  // (all its points now around y = 250)
  const ys = (await pieces(page))[2].d.replace(/A[^A-Z]*?0 [01] 0 /g, ' ').match(/-?[\d.]+/g).map(Number).filter((_, i) => i % 2);
  expect(ys.every(y => y > 240 && y < 260)).toBe(true);
  // undo goes back to even lines step by step; the first step was switching it on
  await page.click('#btn-undo');
  await page.click('#btn-undo');
  await expect(page.locator('#btn-hand')).toHaveAttribute('aria-pressed', 'false');
  await expect.poll(async () => (await pieces(page)).length).toBe(0);
  expect(await page.evaluate(() => getComputedStyle(document.querySelector('#mz-shapes line')).strokeOpacity)).toBe('1');
});

test('Shards in a saved file: the pieces as their own group over hidden lines; opened again, the same look – no extra shapes', async ({ page }) => {
  await h.open(page);
  await lines(page);
  await page.click('#btn-hand');
  await expect.poll(async () => (await pieces(page)).length).toBe(3);
  const first = await pieces(page);
  const svg = await page.evaluate(() => MZ.buildSVGString());
  expect(svg).toContain('id="mosaic-hand"');
  expect(svg).toContain('stroke-opacity:0');
  expect(svg).toMatch(/"hand":\{"seed":\d+,"amount":0\.7\}/);
  // a new drawing, then the file again
  await page.evaluate(() => MZ.loadSVGText('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"/>', { restore: true }));
  await expect.poll(async () => (await pieces(page)).length).toBe(0);
  await page.evaluate((s) => MZ.loadSVGText(s, { restore: true }), svg);
  await expect.poll(async () => (await pieces(page)).map(p => p.d)).toEqual(first.map(p => p.d));
  expect(await page.evaluate(() => document.querySelectorAll('#mz-shapes > *').length)).toBe(3);
  await expect(page.locator('#hand-on')).toBeChecked();
});
