// 3D print export (both apps): an STL where each color stands at its own height, and the plan of
// filament changes. The downloaded STL is read back and measured.
const { test } = require('@playwright/test');
const fs = require('fs');
const h = require('./helpers');
const { expect } = h;

test.skip(({ browserName }) => browserName === 'webkit' && process.platform === 'win32', 'downloads are cancelled by WebKit on Windows');

/** Bounding box and triangle count of a binary STL file. */
function readStl(file) {
  const b = fs.readFileSync(file), n = b.readUInt32LE(80);
  expect(b.length).toBe(84 + n * 50);
  const lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity], tops = new Set();
  for (let t = 0; t < n; t++) {
    const o = 84 + t * 50;
    for (let v = 0; v < 3; v++) for (let k = 0; k < 3; k++) {
      const x = b.readFloatLE(o + 12 + v * 12 + k * 4);
      lo[k] = Math.min(lo[k], x);
      hi[k] = Math.max(hi[k], x);
    }
    if (b.readFloatLE(o + 8) === 1) tops.add(+b.readFloatLE(o + 12 + 8).toFixed(3)); // heights of upward faces
  }
  return { n, lo: lo.map(v => +v.toFixed(3)), hi: hi.map(v => +v.toFixed(3)), tops: [...tops].sort((a, c) => a - c) };
}
async function downloads(page) {
  const [stl] = await Promise.all([page.waitForEvent('download'), page.click('#m3-go')]);
  const [plan] = await Promise.all([page.waitForEvent('download'), page.click('#m3-plan')]);
  return { stl: readStl(await stl.path()), stlName: stl.suggestedFilename(), plan: fs.readFileSync(await plan.path(), 'utf8') };
}

test('vector: the page at real size, one height per color, grout lines lowest', async ({ page }) => {
  const doc = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100mm" height="100mm"><g id="mosaic-shapes">'
    + '<rect x="0" y="0" width="50" height="100" fill="#f4a261" stroke="none"/><rect x="50" y="0" width="50" height="100" fill="#264653" stroke="none"/>'
    + '<line x1="50" y1="0" x2="50" y2="100" stroke="#222222" stroke-width="4"/></g></svg>';
  const { errors } = await h.open(page, { doc });
  await page.click('#btn-3d');
  await expect(page.locator('#m3-order .m3-row')).toHaveCount(3);
  expect(await page.inputValue('#m3-w')).toBe('100');
  await expect(page.locator('#m3-summary')).toContainText('height 2.4 mm (12 layers) · 2 filament changes');
  // the grout line first (lowest), then the lighter tile color
  await expect(page.locator('#m3-order .m3-row').first()).toContainText('#222222lines');
  await expect(page.locator('#m3-order .m3-row').nth(1)).toContainText('#f4a261');
  // sorting keeps the lines at the bottom
  await page.click('#m3-dark');
  await expect(page.locator('#m3-order .m3-row').first()).toContainText('#222222');
  await expect(page.locator('#m3-order .m3-row').nth(1)).toContainText('#264653');
  await page.click('#m3-light');
  const { stl, stlName, plan } = await downloads(page);
  expect(stlName).toBe('mosaic.stl');
  expect(stl.n).toBeLessThan(20 * 12); // equal colors are merged into a few boxes
  expect(stl.lo).toEqual([0, 0, 0]);
  expect(stl.hi).toEqual([100, 100, 2.4]);
  expect(stl.tops).toEqual([0.6, 1.2, 1.8, 2.4]);
  expect(plan).toContain('Start with #222222 – layers 1–6 (base plate included)');
  expect(plan).toContain('Layer 7 (Z 1.40 mm): change to #f4a261 – layers 7–9');
  expect(plan).toContain('Layer 10 (Z 2.00 mm): change to #264653 – layers 10–12');
  expect(errors).toEqual([]);
});

test('raster: transparent pixels stay at the base; the print order can be changed', async ({ page }) => {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.evaluate(() => {
    RZ.blank(100, 50, null);
    const x = RZ.doc.getContext('2d');
    x.fillStyle = '#ff0000'; x.fillRect(0, 0, 50, 50);
    x.fillStyle = '#0000ff'; x.fillRect(60, 10, 20, 20);
    RZ.commit();
  });
  await page.click('#btn-3d');
  await expect(page.locator('#m3-order .m3-row')).toHaveCount(2);
  await page.fill('#m3-w', '50');
  await page.dispatchEvent('#m3-w', 'change');
  await page.fill('#m3-detail', '0.5');
  await page.dispatchEvent('#m3-detail', 'change');
  await page.fill('#m3-lpc', '2');
  await page.dispatchEvent('#m3-lpc', 'change');
  await expect(page.locator('#m3-h')).toHaveValue('25');
  await expect(page.locator('#m3-summary')).toContainText('unpainted parts stay at the base (0.6 mm)');
  // blue first, red on top
  await page.locator('#m3-order .m3-row').first().locator('button', { hasText: '↓' }).click();
  await expect(page.locator('#m3-order .m3-row').first()).toContainText('#0000ff');
  const { stl, plan } = await downloads(page);
  expect(stl.lo).toEqual([0, 0, 0]);
  expect(stl.hi).toEqual([50, 25, 1.4]);
  expect(stl.tops).toEqual([0.6, 1, 1.4]);
  expect(plan).toContain('Start with #0000ff – layers 1–5');
  expect(plan).toContain('Layer 6 (Z 1.20 mm): change to #ff0000 – layers 6–7');
});
