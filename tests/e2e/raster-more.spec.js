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
  await page.locator('#hist-list .hist-row').first().locator('button', { hasText: 'Restore' }).click();
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

test('raster tiles open as vector tiles at real size; the grout becomes the page background', async ({ page }) => {
  await open(page); // two red tiles and a blue one on white
  await page.evaluate(() => { RZ.state.mosaic.groutColor = '#ffffff'; });
  await page.click('#btn-vectorize');
  await expect(page.locator('#vz-grout')).toHaveValue('#ffffff');
  await expect(page.locator('#vz-info')).toContainText('3 tiles at 300 × 200 mm');
  await page.click('#vz-go');
  await page.waitForURL(/index\.html/);
  await page.waitForFunction(() => window.MZ && window.MZ.ready);
  await expect(page.locator('#st-msg')).toContainText('Opened 3 tiles from the raster app');
  const doc = await page.evaluate(() => ({ ...MZ.state.doc }));
  expect([doc.w, doc.h, doc.unit, doc.bg]).toEqual([300, 200, 'mm', '#ffffff']);
  const shapes = await page.evaluate(() => [...document.querySelectorAll('#mz-shapes polygon')].map(p => [p.getAttribute('fill'), p.getAttribute('points')]));
  expect(shapes.length).toBe(3);
  expect(shapes.map(s => s[0]).sort()).toEqual(['#264653', '#e76f51', '#e76f51']);
  // the blue tile: pixels 42–57 × 2–37 at 5 mm per pixel
  const blue = shapes.find(s => s[0] === '#264653')[1].split(' ').map(p => p.split(',').map(Number));
  expect(Math.min(...blue.map(p => p[0]))).toBe(210);
  expect(Math.max(...blue.map(p => p[0]))).toBe(290);
  expect(Math.max(...blue.map(p => p[1]))).toBe(190);
  // the report sees painted tiles
  expect(await page.evaluate(() => MZ.state.palette)).toEqual(expect.arrayContaining(['#e76f51', '#264653']));
  expect(page.url()).not.toContain('#from-raster');
});

test('mosaic tile shapes: hexagons and irregular tiles in palette colors with grout', async ({ page }) => {
  await open(page);
  await page.evaluate(() => {
    const x = RZ.doc.getContext('2d'), g = x.createLinearGradient(0, 0, 60, 0);
    g.addColorStop(0, '#e9c46a'); g.addColorStop(1, '#264653');
    x.fillStyle = g; x.fillRect(0, 0, 60, 40); RZ.commit();
  });
  const allowed = await page.evaluate(() => [...RZ.state.palette, '#b8b2a7']);
  for (const shape of ['hex', 'irregular', 'brick']) {
    await page.click('#btn-mosaic');
    await page.selectOption('#mo-shape', shape);
    await page.fill('#mo-tile', '10');
    await page.dispatchEvent('#mo-tile', 'change');
    await page.fill('#mo-grout', '1');
    await page.dispatchEvent('#mo-grout', 'change');
    await page.evaluate(() => { RZ.state.mosaic.groutColor = '#b8b2a7'; });
    await page.check('input[name=mo-colors][value=palette]');
    await expect(page.locator('#mo-detail-row')).toBeVisible({ visible: shape !== 'hex' });
    await page.click('#mo-go');
    await expect(page.locator('#st-msg')).toContainText(/Made \d+ tiles/);
    const colors = await page.evaluate(() => {
      const d = RZ.doc.getContext('2d').getImageData(0, 0, RZ.doc.width, RZ.doc.height).data, s = new Set();
      for (let i = 0; i < d.length; i += 4) if (d[i + 3]) s.add('#' + [d[i], d[i + 1], d[i + 2]].map(v => v.toString(16).padStart(2, '0')).join(''));
      return [...s];
    });
    expect(colors.every(c => allowed.includes(c)), `${shape}: ${colors}`).toBe(true);
    expect(colors).toContain('#b8b2a7');
    await page.keyboard.press('Control+z');
  }
});

test('opening a very big image offers to scale it down; a photo-like one gets a hint to reduce its colors', async ({ page }) => {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  const big = h.png(2400, 600, (x) => (x < 1200 ? [200, 30, 30] : [30, 30, 200]));
  // declined: kept as it is
  await page.setInputFiles('#file-input', { name: 'big.png', mimeType: 'image/png', buffer: big });
  await h.answer(page, null, { cancel: true });
  await expect.poll(() => page.evaluate(() => RZ.doc.width)).toBe(2400);
  await expect(page.locator('#st-msg')).not.toContainText('many colors');
  // accepted: scaled to 1600 px on the long side
  await page.setInputFiles('#file-input', { name: 'big2.png', mimeType: 'image/png', buffer: big });
  const asked = await h.answer(page);
  await expect.poll(() => page.evaluate(() => [RZ.doc.width, RZ.doc.height])).toEqual([1600, 400]);
  expect(asked).toContain('2,400 × 600 px');
  // a smooth gradient: hundreds of colors
  await page.setInputFiles('#file-input', { name: 'photo.png', mimeType: 'image/png', buffer: h.png(300, 20, (x, y) => [x % 256, (x * 3 + y) % 256, 100]) });
  await expect(page.locator('#st-msg')).toContainText('It has many colors');
});

test('image editing: rotate, flip, rotate by an angle, trim, crop and keep proportions', async ({ page }) => {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.evaluate(() => {
    RZ.blank(40, 20);
    const x = RZ.doc.getContext('2d'); x.fillStyle = '#ff0000'; x.fillRect(0, 0, 5, 5); RZ.commit();
  });
  const size = () => page.evaluate(() => [RZ.doc.width, RZ.doc.height]);
  const at = (x, y) => page.evaluate(([x, y]) => RZ.colorAt(x, y), [x, y]);
  await page.click('#btn-rot-right');
  expect(await size()).toEqual([20, 40]);
  expect(await at(17, 2)).toBe('#ff0000'); // the top-left corner went to the top right
  await page.click('#btn-flip-h');
  expect(await at(2, 2)).toBe('#ff0000');
  await page.click('#btn-flip-v');
  expect(await at(2, 37)).toBe('#ff0000');
  await page.click('#btn-rot-left');
  expect(await size()).toEqual([40, 20]);
  // any angle: the canvas grows to hold the picture
  await page.fill('#img-angle', '45');
  await page.click('#btn-rotate');
  const [w, h] = await size();
  expect(w).toBeGreaterThan(40);
  expect(h).toBeGreaterThan(40);
  expect(await at(0, 0)).toBe(null); // transparent corners
  await page.keyboard.press('Control+z');
  expect(await size()).toEqual([40, 20]);
  // trim: down to the picture inside a one-color border
  await page.evaluate(() => {
    RZ.blank(50, 30);
    const x = RZ.doc.getContext('2d'); x.fillStyle = '#000000'; x.fillRect(10, 5, 10, 10); RZ.commit();
  });
  await page.click('#btn-trim');
  expect(await size()).toEqual([10, 10]);
  await expect(page.locator('#st-msg')).toContainText('Trimmed to 10 × 10 px');
  // crop without a selection says how
  await page.click('#btn-img-crop');
  await expect(page.locator('#st-msg')).toContainText('Select the part to keep');
  // keep proportions: one side follows the other
  await page.evaluate(() => RZ.blank(200, 100));
  await page.fill('#img-w', '80');
  await page.dispatchEvent('#img-w', 'input');
  await expect(page.locator('#img-h')).toHaveValue('40');
  await page.click('#btn-resize');
  expect(await size()).toEqual([80, 40]);
});

test('pen pressure: a light pen paints thinner, a firm one at full size', async ({ page }) => {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.evaluate(() => { RZ.blank(100, 60); RZ.setTool('brush'); Object.assign(RZ.state, { size: 20, opacity: 1, fill: '#000000', pressure: true }); });
  /** A pen stroke across the image at y 30 (as a tablet sends it), and how thick it came out at x 50. */
  const stroke = (pressure, pointerType = 'pen') => page.evaluate(([pr, type]) => {
    RZ.blank(100, 60);
    const v = document.querySelector('#view'), a = RZ.screen(10, 30), b = RZ.screen(90, 30);
    const ev = (kind, p) => v.dispatchEvent(new PointerEvent(kind, { bubbles: true, pointerId: 7, pointerType: type, pressure: pr, clientX: p.x, clientY: p.y, button: 0, buttons: 1, isPrimary: true }));
    ev('pointerdown', a);
    for (let i = 1; i <= 10; i++) ev('pointermove', { x: a.x + (b.x - a.x) * i / 10, y: a.y });
    ev('pointerup', b);
    let n = 0;
    for (let y = 0; y < 60; y++) if (RZ.alphaAt(50, y) > 0 && RZ.colorAt(50, y) !== '#ffffff') n++;
    return n;
  }, [pressure, pointerType]);
  const light = await stroke(0.1), firm = await stroke(1), mouse = await stroke(0.1, 'mouse');
  expect(light).toBeLessThan(8);
  expect(firm).toBeGreaterThan(17);
  expect(mouse).toBeGreaterThan(17); // only a pen's pressure counts
  // turned off: full size with the pen too
  await page.evaluate(() => { RZ.state.pressure = false; });
  expect(await stroke(0.1)).toBeGreaterThan(17);
});

test('brush tips: soft edges, spray dots, calligraphy thick and thin, chalk grain', async ({ page }) => {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await expect(page.locator('#opt-tip')).toBeVisible();
  /** A black stroke from a to b with a tip; returns, across the stroke's middle, how many pixels are
      fully black, partly painted (gray) and left white, and how many color runs the cross-section has. */
  const stroke = (tip, a, b, across) => page.evaluate(([tip, a, b, across]) => {
    RZ.blank(120, 120);
    RZ.setTool('brush');
    Object.assign(RZ.state, { size: 30, opacity: 1, fill: '#000000', pressure: false, tip });
    const v = document.querySelector('#view'), sa = RZ.screen(a[0], a[1]), sb = RZ.screen(b[0], b[1]);
    const ev = (kind, p) => v.dispatchEvent(new PointerEvent(kind, { bubbles: true, pointerId: 1, pointerType: 'mouse', clientX: p.x, clientY: p.y, button: 0, buttons: 1, isPrimary: true }));
    ev('pointerdown', sa);
    for (let i = 1; i <= 20; i++) ev('pointermove', { x: sa.x + (sb.x - sa.x) * i / 20, y: sa.y + (sb.y - sa.y) * i / 20 });
    ev('pointerup', sb);
    let black = 0, gray = 0, white = 0;
    for (const [x, y] of across) {
      const c = RZ.colorAt(x, y);
      if (c === '#000000') black++; else if (c === '#ffffff') white++; else gray++;
    }
    return { black, gray, white };
  }, [tip, a, b, across]);
  // a vertical cut through a horizontal stroke at y 60
  const cut = Array.from({ length: 40 }, (_, i) => [60, 40 + i]);
  const round = await stroke('round', [10, 60], [110, 60], cut);
  expect(round.black).toBeGreaterThan(26);
  const soft = await stroke('soft', [10, 60], [110, 60], cut);
  expect(soft.gray).toBeGreaterThan(10); // fades out towards the edges
  expect(soft.black).toBeLessThan(round.black);
  const spray = await stroke('spray', [10, 60], [110, 60], cut);
  expect(spray.black).toBeGreaterThan(0);
  expect(spray.white).toBeGreaterThan(15); // dots, with paper between them
  const chalk = await stroke('chalk', [10, 60], [110, 60], cut);
  expect(chalk.black).toBeGreaterThan(10);
  expect(chalk.white).toBeGreaterThan(round.white + 2); // grain shows through
  // calligraphy: the nib is held at 45° up and to the right – thin along it, thick across it
  const diag = (sx, sy) => Array.from({ length: 60 }, (_, i) => [60 + (i - 30) * sx / Math.SQRT2, 60 + (i - 30) * sy / Math.SQRT2]);
  const along = await stroke('calligraphy', [20, 100], [100, 20], diag(1, 1));
  const across = await stroke('calligraphy', [20, 20], [100, 100], diag(1, -1));
  expect(across.black).toBeGreaterThan(along.black * 3);
  // the eraser takes the tip too, and the choice is remembered
  await page.selectOption('#opt-tip', 'soft');
  await page.evaluate(() => RZ.setTool('eraser'));
  await expect(page.locator('#opt-tip')).toBeVisible();
  await page.evaluate(() => RZ.setTool('pencil'));
  await expect(page.locator('#opt-tip')).toBeHidden();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('mz-raster-prefs')).tip)).toBe('soft');
});

test('brush tips: the spray builds up while held still; the nib angle; Shift+B switches tips', async ({ page }) => {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  const ev = (kind, x, y) => page.evaluate(([kind, x, y]) => {
    const p = RZ.screen(x, y);
    document.querySelector('#view').dispatchEvent(new PointerEvent(kind, { bubbles: true, pointerId: 1, pointerType: 'mouse', clientX: p.x, clientY: p.y, button: 0, buttons: 1, isPrimary: true }));
  }, [kind, x, y]);
  const painted = () => page.evaluate(() => {
    let n = 0;
    for (let y = 30; y < 70; y++) for (let x = 30; x < 70; x++) if (RZ.colorAt(x, y) !== '#ffffff') n++;
    return n;
  });
  // spray: pressing and holding still keeps adding dots until the pointer is lifted; one undo step
  await page.evaluate(() => { RZ.blank(100, 100); RZ.setTool('brush'); Object.assign(RZ.state, { size: 30, opacity: 1, fill: '#000000', pressure: false }); });
  await page.selectOption('#opt-tip', 'spray');
  await ev('pointerdown', 50, 50);
  const first = await painted();
  await page.waitForTimeout(400);
  const held = await painted();
  expect(held).toBeGreaterThan(first * 2);
  await ev('pointerup', 50, 50);
  const lifted = await painted();
  await page.waitForTimeout(200);
  expect(await painted()).toBe(lifted);
  await page.keyboard.press('Control+z');
  expect(await painted()).toBe(0);

  // the nib angle: at 135° a stroke up and to the right is thick instead of thin
  await page.selectOption('#opt-tip', 'calligraphy');
  await expect(page.locator('#opt-nib-angle')).toBeVisible();
  const diagonal = () => page.evaluate(async () => {
    RZ.blank(100, 100);
    const view = document.querySelector('#view'), a = RZ.screen(20, 80), b = RZ.screen(80, 20);
    const e = (kind, p) => view.dispatchEvent(new PointerEvent(kind, { bubbles: true, pointerId: 1, pointerType: 'mouse', clientX: p.x, clientY: p.y, button: 0, buttons: 1, isPrimary: true }));
    e('pointerdown', a);
    for (let i = 1; i <= 10; i++) e('pointermove', { x: a.x + (b.x - a.x) * i / 10, y: a.y + (b.y - a.y) * i / 10 });
    e('pointerup', b);
    let n = 0;
    for (let i = -30; i <= 30; i++) if (RZ.colorAt(50 + i / Math.SQRT2, 50 + i / Math.SQRT2) === '#000000') n++;
    return n;
  });
  const at45 = await diagonal();
  await page.fill('#opt-nib-angle', '135');
  await page.dispatchEvent('#opt-nib-angle', 'change');
  expect(await diagonal()).toBeGreaterThan(at45 * 3);
  await page.fill('#opt-nib-angle', '200');
  await page.dispatchEvent('#opt-nib-angle', 'change');
  await expect(page.locator('#opt-nib-angle')).toHaveValue('20');

  // Shift+B: the next tip (from another tool it picks the brush); the angle shows only for calligraphy
  await page.locator('#opt-nib-angle').blur();
  await page.evaluate(() => RZ.setTool('bucket'));
  await page.keyboard.press('Shift+B');
  expect(await page.evaluate(() => [RZ.state.tool, RZ.state.tip])).toEqual(['brush', 'chalk']);
  await expect(page.locator('#opt-nib-angle')).toBeHidden();
  await page.keyboard.press('Shift+B');
  expect(await page.evaluate(() => RZ.state.tip)).toBe('round');
  await page.keyboard.press('b');
  expect(await page.evaluate(() => RZ.state.tip)).toBe('round');
});

test('ellipse and curve tools paint pixels: filled and outlined shapes, open curves as lines', async ({ page }) => {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.evaluate(() => { RZ.blank(200, 200); Object.assign(RZ.state, { fill: '#000000', stroke: '#ff0000', opacity: 1, size: 4, ngonFill: true, ngonOutline: false, smooth: true }); });
  const ev = (kind, x, y, opts = {}) => page.evaluate(([kind, x, y, opts]) => {
    const p = RZ.screen(x, y);
    document.querySelector('#view').dispatchEvent(new PointerEvent(kind, { bubbles: true, pointerId: 1, pointerType: 'mouse', clientX: p.x, clientY: p.y, button: 0, buttons: 1, isPrimary: true, ...opts }));
  }, [kind, x, y, opts]);
  const drag = async (a, b, opts) => { await ev('pointerdown', ...a, opts); for (let i = 1; i <= 5; i++) await ev('pointermove', a[0] + (b[0] - a[0]) * i / 5, a[1] + (b[1] - a[1]) * i / 5, opts); await ev('pointerup', ...b, opts); };
  const click = async (x, y) => { await ev('pointerdown', x, y); await ev('pointerup', x, y); };
  const at = (x, y) => page.evaluate(([x, y]) => RZ.colorAt(x, y), [x, y]);

  // an ellipse from corner to corner: inside painted, the box's corners not
  await page.keyboard.press('o');
  await expect(page.locator('input[name=elmode][value=corner]')).toBeChecked();
  await drag([20, 40], [180, 160]);
  expect(await at(100, 100)).toBe('#000000');
  expect(await at(25, 100)).toBe('#000000');
  expect(await at(30, 50)).toBe('#ffffff');
  // Shift: a circle, outlined only
  await page.evaluate(() => { RZ.blank(200, 200); Object.assign(RZ.state, { ngonFill: false, ngonOutline: true }); });
  await drag([50, 50], [150, 120], { shiftKey: true });
  expect(await at(100, 100)).toBe('#ffffff');
  expect(await at(100, 51)).toBe('#ff0000'); // top of the 100 × 100 circle
  expect(await at(100, 149)).toBe('#ff0000');

  // a closed curve through four points, filled
  await page.evaluate(() => { RZ.blank(200, 200); Object.assign(RZ.state, { ngonFill: true, ngonOutline: false }); });
  await page.keyboard.press('c');
  await page.selectOption('#opt-curve-type', 'catmull');
  for (const [x, y] of [[50, 50], [150, 50], [150, 150], [50, 150]]) await click(x, y);
  expect(await at(100, 100)).toBe('#ffffff'); // nothing painted until it is finished
  await click(50, 50);
  expect(await at(100, 100)).toBe('#000000');
  expect(await at(100, 45)).toBe('#000000'); // bulges out past its points
  expect(await at(10, 10)).toBe('#ffffff');
  await page.keyboard.press('Control+z');
  expect(await at(100, 100)).toBe('#ffffff');

  // an open B-spline ended with Enter: a line in the paint color, touching its end points only
  await page.selectOption('#opt-curve-type', 'bspline');
  for (const [x, y] of [[20, 100], [100, 20], [180, 100], [180, 190]]) await click(x, y);
  await page.keyboard.press('Backspace'); // takes back the last point
  await page.keyboard.press('Enter');
  expect(await at(20, 100)).toBe('#000000');
  expect(await at(180, 100)).toBe('#000000');
  expect(await at(100, 20)).toBe('#ffffff');
  expect(await at(180, 185)).toBe('#ffffff');
  // Esc drops an unfinished curve
  for (const [x, y] of [[10, 190], [190, 190]]) await click(x, y);
  await page.keyboard.press('Escape');
  await page.keyboard.press('Enter');
  expect(await at(100, 190)).toBe('#ffffff');
  expect(errors).toEqual([]);
});
