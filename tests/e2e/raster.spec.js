// The raster app (raster.html): painting tools, selection, paste, the mosaic tools, files, and
// images on the clipboard between the two apps. Points are image pixels, sent as real mouse input.
const { test } = require('@playwright/test');
const h = require('./helpers');
const { expect } = h;

/** Opens the raster app with a blank white 200 × 150 image, zoomed so that 1 pixel = several screen pixels. */
async function open(page, { w = 200, h: hh = 150, mode = 'simple' } = {}) {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.evaluate(([w, hh, m]) => {
    RZ.setMode(m);
    Object.assign(RZ.state, { size: 1, opacity: 1, smooth: false, tolerance: 0, contiguous: true, ngonFill: true, ngonOutline: false });
    RZ.blank(w, hh);
  }, [w, hh, mode]);
  return { errors };
}
/** Screen position of the middle of image pixel p. */
const scr = (page, p) => page.evaluate(({ x, y }) => RZ.screen(x + 0.5, y + 0.5), p);
async function drag(page, a, b, { steps = 12 } = {}) {
  const A = await scr(page, a), B = await scr(page, b);
  await page.mouse.move(A.x, A.y);
  await page.mouse.down();
  await page.mouse.move(B.x, B.y, { steps });
  await page.mouse.up();
}
async function click(page, p, opts = {}) {
  const A = await scr(page, p);
  await page.mouse.click(A.x, A.y, opts);
}
const color = (page, x, y) => page.evaluate(([x, y]) => RZ.colorAt(x, y), [x, y]);
const alpha = (page, x, y) => page.evaluate(([x, y]) => RZ.alphaAt(x, y), [x, y]);
const set = (page, patch) => page.evaluate((p) => Object.assign(RZ.state, p), patch);
/** Draws on the image directly (setup), as one undo step. */
const paint = (page, fn, arg) => page.evaluate(([src, a]) => {
  const ctx = RZ.doc.getContext('2d');
  new Function('ctx', 'a', src)(ctx, a);
  RZ.commit();
}, [fn, arg]);
const size = (page) => page.evaluate(() => [RZ.doc.width, RZ.doc.height]);
/** Time of the last autosave (IndexedDB), 0 if none. */
const autosavedAt = (page) => page.evaluate(async () => {
  const db = await new Promise((res, rej) => { const q = indexedDB.open('mosaic-paint', 1); q.onsuccess = () => res(q.result); q.onerror = rej; });
  if (!db.objectStoreNames.contains('kv')) return 0;
  const rec = await new Promise((res) => { const t = db.transaction('kv').objectStore('kv').get('raster'); t.onsuccess = () => res(t.result); t.onerror = () => res(null); });
  db.close();
  return rec ? rec.time : 0;
});

test('pencil, brush and eraser; undo and redo', async ({ page }) => {
  const { errors } = await open(page);
  await page.keyboard.press('p');
  await set(page, { fill: '#264653', size: 3 });
  await drag(page, { x: 20, y: 20 }, { x: 60, y: 20 });
  expect(await color(page, 40, 20)).toBe('#264653');
  expect(await color(page, 40, 21)).toBe('#264653');
  expect(await color(page, 40, 23)).toBe('#ffffff'); // hard edge: 3 pixels wide, nothing blended

  await page.keyboard.press('b');
  await set(page, { fill: '#e76f51', size: 10 });
  await drag(page, { x: 20, y: 60 }, { x: 100, y: 60 });
  expect(await color(page, 60, 60)).toBe('#e76f51');

  await page.keyboard.press('e');
  await drag(page, { x: 20, y: 100 }, { x: 100, y: 100 });
  expect(await alpha(page, 60, 100)).toBe(0);
  await page.keyboard.press('Control+z');
  expect(await alpha(page, 60, 100)).toBe(255);
  await page.keyboard.press('Control+y');
  expect(await alpha(page, 60, 100)).toBe(0);
  await page.keyboard.press('Control+z');
  await page.keyboard.press('Control+z');
  expect(await color(page, 60, 60)).toBe('#ffffff');
  expect(errors).toEqual([]);
});

test('the bucket fills inside an outline only; Alt+click picks a color', async ({ page }) => {
  await open(page);
  await paint(page, `ctx.fillStyle = '#000000'; ctx.fillRect(40, 40, 60, 2); ctx.fillRect(40, 98, 60, 2); ctx.fillRect(40, 40, 2, 60); ctx.fillRect(98, 40, 2, 60);`);
  await page.keyboard.press('f');
  await set(page, { fill: '#2a9d8f' });
  await click(page, { x: 70, y: 70 });
  expect(await color(page, 70, 70)).toBe('#2a9d8f');
  expect(await color(page, 43, 43)).toBe('#2a9d8f');
  expect(await color(page, 41, 70)).toBe('#000000');
  expect(await color(page, 20, 20)).toBe('#ffffff');
  await set(page, { fill: '#e9c46a' });
  const A = await scr(page, { x: 41, y: 70 });
  await page.keyboard.down('Alt');
  await page.mouse.click(A.x, A.y);
  await page.keyboard.up('Alt');
  expect(await page.evaluate(() => RZ.state.fill)).toBe('#000000');
});

test('lines and regular polygons, with hard edges', async ({ page }) => {
  await open(page);
  await page.keyboard.press('l');
  await set(page, { fill: '#1d3557', size: 1 });
  await drag(page, { x: 10, y: 140 }, { x: 190, y: 140 });
  expect(await color(page, 100, 140)).toBe('#1d3557');
  expect(await color(page, 100, 141)).toBe('#ffffff');
  await page.keyboard.press('6');
  expect(await page.evaluate(() => [RZ.state.tool, RZ.state.sides])).toEqual(['ngon', 6]);
  await set(page, { fill: '#f4a261' });
  await drag(page, { x: 100, y: 70 }, { x: 130, y: 70 });
  expect(await color(page, 100, 70)).toBe('#f4a261');
  expect(await color(page, 126, 70)).toBe('#f4a261');
  expect(await color(page, 100, 20)).toBe('#ffffff');
});

test('select, move, place, clear and crop', async ({ page }) => {
  await open(page);
  await paint(page, `ctx.fillStyle = '#ff0000'; ctx.fillRect(10, 10, 20, 20);`);
  await page.keyboard.press('v');
  await drag(page, { x: 5, y: 5 }, { x: 40, y: 40 });
  await expect(page.locator('#sel-section')).toBeVisible();
  await drag(page, { x: 20, y: 20 }, { x: 120, y: 20 });
  expect(await page.evaluate(() => !!RZ.state.floating)).toBe(true);
  await expect(page.locator('#stage-actions')).toBeVisible();
  await page.keyboard.press('Enter');
  expect(await color(page, 120, 20)).toBe('#ff0000');
  expect(await alpha(page, 20, 20)).toBe(0); // moved away: the old place is transparent
  await page.keyboard.press('Delete');
  expect(await alpha(page, 120, 20)).toBe(0);
  await page.keyboard.press('Control+z');
  expect(await color(page, 120, 20)).toBe('#ff0000');

  // Alt+drag moves a copy; Esc puts it back
  await drag(page, { x: 102, y: 2 }, { x: 140, y: 40 });
  await page.keyboard.down('Alt');
  await drag(page, { x: 120, y: 20 }, { x: 160, y: 20 });
  await page.keyboard.up('Alt');
  await page.keyboard.press('Escape');
  expect(await color(page, 120, 20)).toBe('#ff0000');
  expect(await page.evaluate(() => RZ.state.floating)).toBe(null);

  await drag(page, { x: 100, y: 0 }, { x: 150, y: 50 });
  await page.click('#btn-sel-crop');
  expect(await size(page)).toEqual([50, 50]);
  expect(await color(page, 20, 20)).toBe('#ff0000');
});

/** Sends a real paste event carrying an image (as when pasting from another program). */
async function pasteImageEvent(page, w, hh, fill) {
  return page.evaluate(async ([w, hh, fill]) => {
    const c = document.createElement('canvas');
    c.width = w; c.height = hh;
    const x = c.getContext('2d'); x.fillStyle = fill; x.fillRect(0, 0, w, hh);
    const blob = await new Promise(r => c.toBlob(r, 'image/png'));
    let dt;
    try { dt = new DataTransfer(); dt.items.add(new File([blob], 'pasted.png', { type: 'image/png' })); } catch { return false; }
    const e = new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true });
    if (!e.clipboardData) return false; // this browser can't make a paste event with data
    document.dispatchEvent(e);
    return true;
  }, [w, hh, fill]);
}

test('a pasted image floats under the mouse until placed; a bigger one can enlarge the canvas', async ({ page }) => {
  await open(page);
  const A = await scr(page, { x: 100, y: 75 });
  await page.mouse.move(A.x, A.y);
  test.skip(!(await pasteImageEvent(page, 20, 10, '#0000ff')), 'no synthetic paste events with data in this browser');
  await expect.poll(() => page.evaluate(() => RZ.state.floating && [RZ.state.floating.x, RZ.state.floating.y])).toEqual([90, 70]); // centered on the pixel under the mouse
  expect(await page.evaluate(() => RZ.state.tool)).toBe('select');
  await page.click('#sa-finish');
  expect(await color(page, 100, 75)).toBe('#0000ff');

  page.once('dialog', d => d.accept());
  await pasteImageEvent(page, 300, 200, '#00ff00');
  await expect.poll(() => size(page)).toEqual([300, 200]);
  await page.keyboard.press('Enter');
  expect(await color(page, 250, 180)).toBe('#00ff00');
});

test('the mosaic effect makes palette-colored tiles with grout; "Reduce to palette" leaves only palette colors', async ({ page }) => {
  await open(page, { w: 100, h: 60 });
  // a smooth gradient: thousands of colors
  await paint(page, `const g = ctx.createLinearGradient(0, 0, 100, 0); g.addColorStop(0, '#d04020'); g.addColorStop(1, '#2050c0'); ctx.fillStyle = g; ctx.fillRect(0, 0, 100, 60);`);
  const palette = ['#e76f51', '#457b9d', '#1d3557', '#f1faee'];
  await page.evaluate((p) => { RZ.state.palettes['Test'] = p; RZ.state.paletteName = 'Test'; }, palette);
  await page.click('#btn-reduce');
  await expect(page.locator('#st-msg')).toContainText('palette color');
  const colors = await page.evaluate(() => {
    const d = RZ.doc.getContext('2d').getImageData(0, 0, RZ.doc.width, RZ.doc.height).data, s = new Set();
    for (let i = 0; i < d.length; i += 4) s.add('#' + [d[i], d[i + 1], d[i + 2]].map(v => v.toString(16).padStart(2, '0')).join(''));
    return [...s];
  });
  expect(colors.every(c => palette.includes(c)), colors.join()).toBe(true);

  await page.keyboard.press('Control+z');
  await page.click('#btn-mosaic');
  await page.fill('#mo-tile', '10');
  await page.dispatchEvent('#mo-tile', 'change');
  await page.fill('#mo-grout', '2');
  await page.dispatchEvent('#mo-grout', 'change');
  await page.check('input[name=mo-colors][value=palette]');
  await expect(page.locator('#mo-estimate')).toContainText('60 tiles');
  await page.click('#mo-go');
  await expect(page.locator('#st-msg')).toContainText('Made 60 tiles');
  expect(await color(page, 9, 4)).toBe('#b8b2a7'); // grout
  const tile = await Promise.all([[0, 0], [7, 7], [3, 5]].map(([x, y]) => color(page, x, y)));
  expect(new Set(tile).size).toBe(1);
  expect(palette).toContain(tile[0]);
});

test('palettes are shared with the vector app', async ({ page }) => {
  await open(page);
  await page.fill('#color-input', '#123456');
  await page.click('#btn-add-color');
  await expect(page.locator('#st-msg')).toContainText('Added 1 color');
  expect(await page.evaluate(() => RZ.state.fill)).toBe('#123456');
  await page.goto('/');
  await page.waitForFunction(() => window.MZ && window.MZ.ready);
  expect(await page.evaluate(() => MZ.state.palette)).toContain('#123456');
});

test('open an image, resize it, and get it back after a reload', async ({ page, browserName }) => {
  await open(page, { mode: 'expert' });
  await page.setInputFiles('#file-input', { name: 'tiles.png', mimeType: 'image/png', buffer: h.png(30, 20, (x) => (x < 15 ? [200, 30, 30] : [30, 30, 200])) });
  await expect.poll(() => size(page)).toEqual([30, 20]);
  expect(await color(page, 5, 5)).toBe('#c81e1e');
  expect(await page.evaluate(() => RZ.rt.fileName)).toBe('tiles.png');
  await page.fill('#img-w', '60');
  await page.fill('#img-h', '40');
  await page.click('#btn-resize');
  expect(await size(page)).toEqual([60, 40]);
  expect(await color(page, 50, 30)).toBe('#1e1ec8'); // enlarged with sharp pixels
  await page.fill('#img-w', '80');
  await page.click('#btn-canvas');
  expect(await size(page)).toEqual([80, 40]);
  expect(await alpha(page, 2, 2)).toBe(0); // new space at the sides is transparent

  const t0 = await page.evaluate(() => Date.now());
  await expect.poll(() => autosavedAt(page), { timeout: 10000 }).toBeGreaterThan(t0);
  await page.reload();
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  expect(await size(page)).toEqual([80, 40]);
  expect(await color(page, 15, 5)).toBe('#c81e1e');

  test.skip(browserName === 'webkit' && process.platform === 'win32', 'downloads are cancelled by WebKit on Windows');
  await page.evaluate(() => { window.showSaveFilePicker = undefined; });
  const [dl] = await Promise.all([page.waitForEvent('download'), page.click('#btn-save')]);
  expect(dl.suggestedFilename()).toBe('tiles.png');
});

// ---- the system clipboard (Chromium lets the tests read and write it) --------------------------------------
test.describe('clipboard', () => {
  test.beforeEach(async ({ context, browserName }) => {
    test.skip(browserName !== 'chromium', 'only Chromium lets tests use the system clipboard');
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  });
  const clipTypes = (page) => page.evaluate(async () => (await navigator.clipboard.read()).flatMap(i => i.types));

  test('copy a selection as a PNG and paste it back', async ({ page }) => {
    await open(page);
    await paint(page, `ctx.fillStyle = '#e76f51'; ctx.fillRect(10, 10, 30, 20);`);
    await page.keyboard.press('v');
    await drag(page, { x: 10, y: 10 }, { x: 40, y: 30 });
    await page.keyboard.press('Control+c');
    await expect(page.locator('#st-msg')).toContainText('Copied the selection');
    expect(await clipTypes(page)).toContain('image/png');
    const A = await scr(page, { x: 150, y: 100 });
    await page.mouse.move(A.x, A.y);
    await page.keyboard.press('Control+v');
    await expect.poll(() => page.evaluate(() => RZ.state.floating && [RZ.state.floating.canvas.width, RZ.state.floating.canvas.height])).toEqual([30, 20]);
    await page.keyboard.press('Enter');
    expect(await color(page, 150, 100)).toBe('#e76f51');
  });

  test('images go both ways between the vector and the raster app', async ({ page }) => {
    // vector → raster: Ctrl+C with nothing selected copies the drawing as a picture
    const red = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><g id="mosaic-shapes"><rect x="0" y="0" width="100" height="100" fill="#e63946"/></g></svg>';
    await h.open(page, { doc: red });
    await page.keyboard.press('Control+c');
    await expect(page.locator('#st-msg')).toContainText('Copied the drawing');
    expect(await clipTypes(page)).toContain('image/png');
    await open(page);
    await page.keyboard.press('Control+v');
    await expect.poll(() => page.evaluate(() => !!RZ.state.floating)).toBe(true);
    await page.keyboard.press('Enter');
    const f = await page.evaluate(() => RZ.state.sel);
    expect(await color(page, f.x + f.w / 2, f.y + f.h / 2)).toBe('#e63946');

    // raster → vector: the pasted picture becomes the photo to trace
    await page.keyboard.press('Control+a');
    await page.keyboard.press('Control+c');
    await expect(page.locator('#st-msg')).toContainText('Copied the selection');
    await h.open(page);
    await page.keyboard.press('Control+v');
    await expect.poll(() => page.evaluate(() => !!MZ.refImage())).toBe(true);
    await expect(page.locator('#st-msg')).toContainText('photo to trace');
  });

  test('copied shapes carry a picture too, but still paste as shapes in the vector app', async ({ page }) => {
    await h.open(page);
    await h.key(page, 'g');
    await h.drag(page, { x: 300, y: 300 }, { x: 300, y: 200 });
    await page.keyboard.press('Control+a');
    await page.keyboard.press('Control+c');
    await expect.poll(() => clipTypes(page)).toEqual(expect.arrayContaining(['text/plain', 'image/png']));
    const n = await h.count(page, '#mz-shapes polygon');
    await page.keyboard.press('Control+v');
    await expect.poll(() => h.count(page, '#mz-shapes polygon')).toBe(n + 1);
    expect(await page.evaluate(() => !!MZ.refImage())).toBe(false);
  });
});
