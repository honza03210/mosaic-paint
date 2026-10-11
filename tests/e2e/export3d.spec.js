// 3D print export (both apps): an STL where each color stands at its own height, and the plan of
// filament changes. The downloaded STL is read back and measured.
const { test } = require('@playwright/test');
const fs = require('fs');
const zlib = require('zlib');
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
/** The files in a ZIP archive (from its central directory), as text. */
function unzip(file) {
  const b = fs.readFileSync(file), out = {};
  const end = b.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  let p = b.readUInt32LE(end + 16);
  for (let i = 0; i < b.readUInt16LE(end + 10); i++) {
    const method = b.readUInt16LE(p + 10), size = b.readUInt32LE(p + 20), nameLen = b.readUInt16LE(p + 28);
    const extra = b.readUInt16LE(p + 30), comment = b.readUInt16LE(p + 32), local = b.readUInt32LE(p + 42);
    const name = b.toString('utf8', p + 46, p + 46 + nameLen);
    const start = local + 30 + b.readUInt16LE(local + 26) + b.readUInt16LE(local + 28), data = b.subarray(start, start + size);
    out[name] = (method === 8 ? zlib.inflateRawSync(data) : data).toString('utf8');
    p += 46 + nameLen + extra + comment;
  }
  return out;
}
async function downloads(page) {
  const [m3] = await Promise.all([page.waitForEvent('download'), page.click('#m3-go')]);
  const [stl] = await Promise.all([page.waitForEvent('download'), page.click('#m3-stl')]);
  const [plan] = await Promise.all([page.waitForEvent('download'), page.click('#m3-plan')]);
  return {
    stl: readStl(await stl.path()), stlName: stl.suggestedFilename(), plan: fs.readFileSync(await plan.path(), 'utf8'),
    threeMf: unzip(await m3.path()), threeMfName: m3.suggestedFilename(),
  };
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
  await expect(page.locator('#m3-order .m3-row').first()).toContainText('#222222');
  await expect(page.locator('#m3-order .m3-row').first().locator('.tag')).toHaveClass(/on/);
  // the ↑ of the first tile color can't move it below the grout
  await expect(page.locator('#m3-order .m3-row').nth(1).locator('button', { hasText: '↑' })).toBeDisabled();
  await expect(page.locator('#m3-order .m3-row').nth(1)).toContainText('#f4a261');
  // sorting keeps the lines at the bottom
  await page.click('#m3-dark');
  await expect(page.locator('#m3-order .m3-row').first()).toContainText('#222222');
  await expect(page.locator('#m3-order .m3-row').nth(1)).toContainText('#264653');
  await page.click('#m3-light');
  const { stl, stlName, plan, threeMf, threeMfName } = await downloads(page);
  expect(stlName).toBe('mosaic.stl');
  expect(threeMfName).toBe('mosaic.3mf');
  expect(Object.keys(threeMf).sort()).toEqual(['3D/3dmodel.model', 'Metadata/Prusa_Slicer_custom_gcode_per_print_z.xml',
    '[Content_Types].xml', '_rels/.rels']);
  // the same triangles as the STL, colored by band; the filament changes at the plan's heights
  expect((threeMf['3D/3dmodel.model'].match(/<triangle /g) || []).length).toBe(stl.n);
  expect(threeMf['3D/3dmodel.model']).toContain('<base name="#264653" displaycolor="#264653FF"/>');
  const changes = [...threeMf['Metadata/Prusa_Slicer_custom_gcode_per_print_z.xml'].matchAll(/print_z="([\d.]+)"[^>]*color="(#\w+)"/g)].map(m => [+m[1], m[2]]);
  expect(changes).toEqual([[1.4, '#f4a261'], [2, '#264653']]);
  expect(stl.n).toBeLessThan(200); // equal heights are merged into a few faces
  expect(stl.lo).toEqual([0, 0, 0]);
  expect(stl.hi).toEqual([100, 100, 2.4]);
  expect(stl.tops).toEqual([1.2, 1.8, 2.4]); // everything is painted: no bare base shows
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

test('raster: the mosaic grout stays lowest, and specks that would print as thin towers are lowered', async ({ page }) => {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.evaluate(() => {
    // grout everywhere, two 20 px tiles, and single-pixel specks of a third color
    RZ.blank(50, 30, '#b8b2a7');
    const x = RZ.doc.getContext('2d');
    x.fillStyle = '#ffffff'; x.fillRect(4, 4, 20, 20);
    x.fillStyle = '#e76f51'; x.fillRect(27, 4, 20, 20);
    x.fillStyle = '#000000'; for (const [px, py] of [[10, 10], [35, 12], [2, 27]]) x.fillRect(px, py, 1, 1);
    RZ.commit();
    RZ.state.mosaic.groutColor = '#b8b2a7';
  });
  await page.click('#btn-3d');
  await page.fill('#m3-w', '50');
  await page.dispatchEvent('#m3-w', 'change');
  await page.fill('#m3-detail', '1');
  await page.dispatchEvent('#m3-detail', 'change');
  // the grout comes first although it is not the lightest color
  await expect(page.locator('#m3-order .m3-row').first()).toContainText('#b8b2a7');
  await expect(page.locator('#m3-order .m3-row').first().locator('.tag')).toHaveClass(/on/);
  // the 1 mm black specks are gone: black is no longer a color of the model
  await expect(page.locator('#m3-order .m3-row')).toHaveCount(3);
  await expect(page.locator('#m3-order')).not.toContainText('#000000');
  await expect(page.locator('#m3-summary')).toContainText('3 thin pieces lowered');
  // marking another color as grout moves it to the bottom too
  await page.locator('#m3-order .m3-row', { hasText: '#e76f51' }).locator('.tag').click();
  await expect(page.locator('#m3-order .m3-row').nth(1)).toContainText('#e76f51');
  const { stl } = await downloads(page);
  // the two grout colors, then the white tile: no black tops are left anywhere
  expect(stl.tops).toEqual([1.2, 1.8, 2.4]);
});

test('the 3D view shows the model and turns when dragged', async ({ page, browserName }) => {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.evaluate(() => {
    RZ.blank(40, 30, '#b8b2a7');
    const x = RZ.doc.getContext('2d'); x.fillStyle = '#e76f51'; x.fillRect(5, 5, 30, 20); RZ.commit();
  });
  await page.click('#btn-3d');
  await expect(page.locator('#m3-order .m3-row')).toHaveCount(2);
  const webgl = await page.evaluate(() => !!document.createElement('canvas').getContext('webgl'));
  test.skip(!webgl, `no WebGL in ${browserName} here`);
  await page.click('#m3-tab-3d');
  await expect(page.locator('#m3-3d')).toBeVisible();
  await expect(page.locator('#m3-preview')).toBeHidden();
  const image = () => page.evaluate(() => document.querySelector('#m3-3d').toDataURL());
  // something is drawn: the picture is not one flat color
  await expect.poll(() => page.evaluate(() => {
    const c = document.querySelector('#m3-3d'), x = document.createElement('canvas');
    x.width = 40; x.height = 40;
    const g = x.getContext('2d'); g.drawImage(c, 0, 0, 40, 40);
    const d = g.getImageData(0, 0, 40, 40).data, seen = new Set();
    for (let i = 0; i < d.length; i += 4) seen.add(d[i] >> 4 << 8 | d[i + 1] >> 4 << 4 | d[i + 2] >> 4);
    return seen.size;
  })).toBeGreaterThan(3);
  const before = await image();
  const box = await page.locator('#m3-3d').boundingBox();
  await page.mouse.move(box.x + 150, box.y + 150);
  await page.mouse.down();
  await page.mouse.move(box.x + 220, box.y + 170, { steps: 6 });
  await page.mouse.up();
  expect(await image()).not.toBe(before);
  await page.click('#m3-tab-top');
  await expect(page.locator('#m3-preview')).toBeVisible();
});
