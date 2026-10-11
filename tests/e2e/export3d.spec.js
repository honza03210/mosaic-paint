// 3D print export (both apps): an STL where each color stands at its own height, and the plan of
// filament changes. The downloaded STL is read back and measured.
const { test } = require('@playwright/test');
const fs = require('fs');
const zlib = require('zlib');
const h = require('./helpers');
const { expect } = h;

test.skip(({ browserName }) => browserName === 'webkit' && process.platform === 'win32', 'downloads are cancelled by WebKit on Windows');

/** Bounding box and triangle count of a binary STL file (a path or its bytes). */
function readStl(file) {
  const b = Buffer.isBuffer(file) ? file : fs.readFileSync(file), n = b.readUInt32LE(80);
  expect(b.length).toBe(84 + n * 50);
  const lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity], tops = new Set(), bottoms = new Set();
  for (let t = 0; t < n; t++) {
    const o = 84 + t * 50;
    for (let v = 0; v < 3; v++) for (let k = 0; k < 3; k++) {
      const x = b.readFloatLE(o + 12 + v * 12 + k * 4);
      lo[k] = Math.min(lo[k], x);
      hi[k] = Math.max(hi[k], x);
    }
    if (b.readFloatLE(o + 8) === 1) tops.add(+b.readFloatLE(o + 12 + 8).toFixed(3)); // heights of upward faces
    if (b.readFloatLE(o + 8) === -1) bottoms.add(+b.readFloatLE(o + 12 + 8).toFixed(3)); // … and downward ones
  }
  return { n, lo: lo.map(v => +v.toFixed(3)), hi: hi.map(v => +v.toFixed(3)), tops: [...tops].sort((a, c) => a - c), bottoms: [...bottoms].sort((a, c) => a - c) };
}
/** The files in a ZIP archive (from its central directory), as text (or bytes: raw). */
function unzip(file, raw = false) {
  const b = fs.readFileSync(file), out = {};
  const end = b.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  let p = b.readUInt32LE(end + 16);
  for (let i = 0; i < b.readUInt16LE(end + 10); i++) {
    const method = b.readUInt16LE(p + 10), size = b.readUInt32LE(p + 20), nameLen = b.readUInt16LE(p + 28);
    const extra = b.readUInt16LE(p + 30), comment = b.readUInt16LE(p + 32), local = b.readUInt32LE(p + 42);
    const name = b.toString('utf8', p + 46, p + 46 + nameLen);
    const start = local + 30 + b.readUInt16LE(local + 26) + b.readUInt16LE(local + 28), data = b.subarray(start, start + size);
    const bytes = method === 8 ? zlib.inflateRawSync(data) : data;
    out[name] = raw ? bytes : bytes.toString('utf8');
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

test('several filaments: a flat model, one part per color with its filament, for PrusaSlicer or Bambu Studio', async ({ page }) => {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.evaluate(() => {
    RZ.blank(40, 30, '#b8b2a7');
    const x = RZ.doc.getContext('2d'); x.fillStyle = '#e76f51'; x.fillRect(5, 5, 30, 20); RZ.commit();
    RZ.state.mosaic.groutColor = '#b8b2a7';
  });
  await page.click('#btn-3d');
  await page.fill('#m3-w', '40');
  await page.dispatchEvent('#m3-w', 'change');
  await page.click('#m3-mode-flat');
  await expect(page.locator('#m3-lpc')).toBeHidden();
  await expect(page.locator('#m3-tile')).toBeVisible();
  await expect(page.locator('#m3-summary')).toContainText('2 colors = 2 filaments · flat, 1.6 mm high (8 layers)');
  await expect(page.locator('#m3-order .m3-row').first()).toContainText('filament 1');
  await expect(page.locator('#m3-order .m3-row').first()).toContainText('#b8b2a7');

  // PrusaSlicer: one mesh, its parts are ranges of triangles with their filament
  const [m3] = await Promise.all([page.waitForEvent('download'), page.click('#m3-go')]);
  const prusa = unzip(await m3.path()), config = prusa['Metadata/Slic3r_PE_model.config'];
  expect((prusa['3D/3dmodel.model'].match(/<object /g) || []).length).toBe(1);
  expect([...config.matchAll(/key="extruder" value="(\d+)"/g)].map(m => +m[1])).toEqual([1, 1, 2]);
  expect(config).toContain('value="2 #e76f51"');
  // the STL files: base, grout (two layers lower), tiles
  const [zipped] = await Promise.all([page.waitForEvent('download'), page.click('#m3-stl')]);
  expect(zipped.suggestedFilename()).toMatch(/-stl\.zip$/);
  const stls = unzip(await zipped.path(), true), names = Object.keys(stls);
  expect(names.map(n => n.replace(/^.*?-(base|\d-\w+)\.stl$/, '$1'))).toEqual(['base', '1-b8b2a7', '2-e76f51']);
  expect(names.map(n => readStl(stls[n]).hi[2])).toEqual([0.6, 1.2, 1.6]);
  const [plan] = await Promise.all([page.waitForEvent('download'), page.click('#m3-plan')]);
  const text = fs.readFileSync(await plan.path(), 'utf8');
  expect(text).toContain('Filament 1: #b8b2a7 (also the base plate)');
  expect(text).toContain('Filament 2: #e76f51');

  // Bambu Studio: the parts as components, their filaments in its model settings
  await page.selectOption('#m3-slicer', 'bambu');
  const [bambu] = await Promise.all([page.waitForEvent('download'), page.click('#m3-go')]);
  const b = unzip(await bambu.path());
  expect((b['3D/Objects/object_1.model'].match(/<object /g) || []).length).toBe(3);
  expect([...b['Metadata/model_settings.config'].matchAll(/<part id="\d" subtype="normal_part">\n<metadata key="name" value="[^"]*"\/>\n<metadata key="extruder" value="(\d)"/g)].map(m => +m[1])).toEqual([1, 1, 2]);
});

test('finishing: a raised frame, rounded corners, a hanging hole and magnet pockets', async ({ page }) => {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.evaluate(() => {
    RZ.blank(40, 30, '#b8b2a7');
    const x = RZ.doc.getContext('2d'); x.fillStyle = '#e76f51'; x.fillRect(5, 5, 30, 20); RZ.commit();
    RZ.state.mosaic.groutColor = '#b8b2a7';
  });
  await page.click('#btn-3d');
  await page.fill('#m3-w', '40');
  await page.dispatchEvent('#m3-w', 'change');
  await expect(page.locator('#m3-order .m3-row')).toHaveCount(2);
  await page.fill('#m3-detail', '0.5'); // the frame is whole cells: 3 mm
  await page.dispatchEvent('#m3-detail', 'change');
  await page.click('#m3-finish summary');
  for (const [id, v] of [['#m3-frame', '3'], ['#m3-corner', '4'], ['#m3-hole', '4'], ['#m3-magnet', '6'], ['#m3-mdepth', '1']]) {
    await page.fill(id, v);
    await page.dispatchEvent(id, 'change');
  }
  // two colors: grout up to 1.2 mm, tiles 1.8 mm; the frame 2 layers higher
  await expect(page.locator('#m3-summary')).toContainText('with the frame 46 × 36 mm, 2.2 mm high');
  // the magnets sit under the grout (1.2 mm): two layers stay above them
  await expect(page.locator('#m3-note')).toContainText('The magnet pockets are only 0.8 mm deep');
  const { stl, plan } = await downloads(page);
  expect(stl.lo).toEqual([0, 0, 0]);
  expect(stl.hi).toEqual([46, 36, 2.2]);
  expect(stl.tops).toEqual([1.2, 1.8, 2.2]);
  expect(stl.bottoms).toEqual([0, 0.8]); // the floor, and the pockets' ceilings
  expect(plan).toContain('Frame 3 mm wide: it goes on in #e76f51 up to layer 11 (Z 2.20 mm).');
  expect(plan).toContain('Magnet pockets in the bottom: 4 × 6 mm, 0.80 mm deep');
  // several filaments: the frame is a part of its own, in filament 1
  await page.click('#m3-mode-flat');
  const [m3] = await Promise.all([page.waitForEvent('download'), page.click('#m3-go')]);
  const config = unzip(await m3.path())['Metadata/Slic3r_PE_model.config'];
  expect([...config.matchAll(/key="name" value="([^"]+)"/g)].map(m => m[1]).slice(1)).toEqual(['Base', 'Frame', '1 #b8b2a7', '2 #e76f51']);
  expect([...config.matchAll(/key="extruder" value="(\d+)"/g)].map(m => +m[1])).toEqual([1, 1, 1, 2]);
});

test('Check G-code: the sliced file is compared with the plan', async ({ page }) => {
  const doc = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100mm" height="100mm"><g id="mosaic-shapes">'
    + '<rect x="0" y="0" width="50" height="100" fill="#f4a261" stroke="none"/><rect x="50" y="0" width="50" height="100" fill="#264653" stroke="none"/>'
    + '<line x1="50" y1="0" x2="50" y2="100" stroke="#222222" stroke-width="4"/></g></svg>';
  await h.open(page, { doc });
  await page.click('#btn-3d');
  await expect(page.locator('#m3-summary')).toContainText('2 filament changes');
  // layers of 0.2 mm up to 2.4; filament changes before the given heights
  const gcode = (changes) => {
    const out = ['M83', 'T0'];
    for (let k = 1; k <= 12; k++) {
      const z = +(k * 0.2).toFixed(1);
      if (changes.includes(z)) out.push('M600');
      out.push(`G1 Z${z}`, `G1 X10 Y10 E0.5`, `G1 X20 Y20 E0.5`);
    }
    return Buffer.from(out.join('\n'));
  };
  await page.setInputFiles('#m3-gcode', { name: 'good.gcode', mimeType: 'text/plain', buffer: gcode([1.4, 2]) });
  await expect(page.locator('#m3-check')).toContainText('good.gcode: everything matches the plan');
  await expect(page.locator('#m3-check li.ok')).toHaveCount(3);
  await page.setInputFiles('#m3-gcode', { name: 'bad.gcode', mimeType: 'text/plain', buffer: gcode([1.6, 2]) });
  await expect(page.locator('#m3-check')).toContainText('bad.gcode: 2 things to look at');
  await expect(page.locator('#m3-check li.bad').first()).toContainText('No filament change to #f4a261 at Z 1.4 mm');
  await expect(page.locator('#m3-check li.bad').nth(1)).toContainText('A filament change the plan does not have, at Z 1.6 mm');
});
