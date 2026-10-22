// The lessons page (learn.html): every task can be played to the end – as a child would, following the
// spotlight – and the spotlight lets through only what it points at.
const { test } = require('@playwright/test');
const { expect } = require('./helpers');

test.describe.configure({ timeout: 60000 });

/** The editor's frame. */
const frame = (page) => page.frames().find(f => f.url().includes('raster.html'));
const ed = (page) => page.frameLocator('#editor');
/** Waits until step i (0-based) is the one shown. */
const at = async (page, i) => {
  try { await expect(page.locator(`#dots .dot:nth-child(${i + 1})`)).toHaveClass(/now/, { timeout: 15000 }); } catch (e) {
    if (process.env.LEARN_LOG) console.log('DOTS', await page.locator('#dots').innerHTML(), await page.evaluate(() => [document.body.className, document.querySelector('#editor').src, document.querySelector('#lesson-title').textContent]));
    throw e;
  }
};
/** A stroke through image points (a mouse, or a finger). */
async function stroke(page, pts, type = 'mouse') {
  await frame(page).evaluate(({ pts, type }) => {
    const v = document.querySelector('#view'), at = pts.map(([x, y]) => RZ.screen(x, y));
    const ev = (k, p) => v.dispatchEvent(new PointerEvent(k, { bubbles: true, pointerId: 5, pointerType: type, isPrimary: true, clientX: p.x, clientY: p.y, button: k === 'pointermove' ? -1 : 0, buttons: k === 'pointerup' ? 0 : 1 }));
    ev('pointerdown', at[0]);
    for (const p of at.slice(1)) ev('pointermove', p);
    ev('pointerup', at[at.length - 1]);
  }, { pts, type });
}
const tap = (page, x, y) => stroke(page, [[x, y]]);
const line = (a, b, n = 12) => Array.from({ length: n + 1 }, (_, i) => [a[0] + (b[0] - a[0]) * i / n, a[1] + (b[1] - a[1]) * i / n]);
const circle = (cx, cy, r, turns = 1, n = 40) => Array.from({ length: n + 1 }, (_, i) => [cx + r * Math.cos(-Math.PI / 2 + turns * 2 * Math.PI * i / n), cy + r * Math.sin(-Math.PI / 2 + turns * 2 * Math.PI * i / n)]);
const zigzag = (x0, y0, x1, y1, rows = 6) => Array.from({ length: rows + 1 }, (_, i) => [[x0, y0 + (y1 - y0) * i / rows], [x1, y0 + (y1 - y0) * (i + 0.5) / rows]]).flat();
const sw = (page, hex) => ed(page).locator(`#palette .swatch[aria-label*="${hex}"]`).click();
const toolBtn = (page, id) => ed(page).locator(`#tools [data-tool="${id}"]`).click();
const setRange = (page, sel, v) => ed(page).locator(sel).fill(String(v));

/** How each task is done. */
const PLAY = {
  async look(page) {
    await ed(page).locator('#btn-zoomin').click();
    await ed(page).locator('#btn-zoomin').click();
    await toolBtn(page, 'pan');
    await at(page, 2);
    // drag the ladybird towards the middle (screen points fixed before the view moves)
    await frame(page).evaluate(() => {
      const v = document.querySelector('#view'), r = v.getBoundingClientRect(), a = RZ.screen(545, 58), b = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      const ev = (k, p) => v.dispatchEvent(new PointerEvent(k, { bubbles: true, pointerId: 5, pointerType: 'mouse', isPrimary: true, clientX: p.x, clientY: p.y, button: k === 'pointermove' ? -1 : 0, buttons: k === 'pointerup' ? 0 : 1 }));
      ev('pointerdown', a);
      for (let i = 1; i <= 8; i++) ev('pointermove', { x: a.x + (b.x - a.x) * i / 8, y: a.y + (b.y - a.y) * i / 8 });
      ev('pointerup', b);
    });
    await ed(page).locator('#btn-fit').click();
  },
  async stars(page) {
    await toolBtn(page, 'brush');
    await sw(page, '#e9c46a');
    await ed(page).locator('#opt-tip').selectOption('soft');
    await setRange(page, '#opt-size-range', 40);
    await at(page, 4);
    for (const [x, y] of [[110, 90], [260, 170], [400, 80]]) await stroke(page, circle(x, y, 6, 2));
  },
  async heart(page) {
    await toolBtn(page, 'pencil');
    await sw(page, '#e76f51');
    await setRange(page, '#opt-size-range', 1);
    await at(page, 3);
    const rows = ['...........', '..oo...oo..', '.o##o.o##o.', 'o####o####o', 'o#########o', 'o#########o', '.o#######o.', '..o#####o..', '...o###o...', '....o#o....', '.....o.....'];
    for (let y = 0; y < rows.length; y++) for (let x = 0; x < rows[y].length; x++) if (rows[y][x] === '#') await tap(page, x + 1.5, y + 1.5);
  },
  async window(page) {
    await toolBtn(page, 'eraser');
    await setRange(page, '#opt-size-range', 40);
    await at(page, 2);
    for (const [x, y] of [[175, 125], [320, 115], [205, 215], [330, 210]]) await stroke(page, circle(x, y, 10, 2));
  },
  async feather(page) {
    await toolBtn(page, 'picker');
    await at(page, 1);
    await tap(page, 170, 160);
    await toolBtn(page, 'brush');
    await setRange(page, '#opt-size-range', 24);
    await at(page, 4);
    await stroke(page, zigzag(312, 100, 348, 220, 14));
  },
  async comic(page) {
    await toolBtn(page, 'bucket');
    await sw(page, '#f4a261');
    await at(page, 2);
    for (const [x, y] of [[100, 115], [245, 117], [400, 140]]) await tap(page, x, y);
    await setRange(page, '#opt-tolerance', 70);
    await at(page, 4);
    await tap(page, 250, 265);
  },
  async fence(page) {
    await toolBtn(page, 'line');
    await sw(page, '#264653');
    await setRange(page, '#opt-size-range', 10);
    await at(page, 3);
    for (const p of [130, 250, 370]) await stroke(page, line([p, 250], [p, 120], 6));
  },
  async hive(page) {
    await toolBtn(page, 'ngon');
    await ed(page).locator('#quick-sides [data-sides="6"]').click();
    await ed(page).locator('#opt-ngon-fill').check();
    await sw(page, '#e9c46a');
    await at(page, 4);
    for (const [x, y] of [[120, 150], [250, 150], [380, 150]]) await stroke(page, line([x, y], [x + 55, y], 5));
  },
  async bubbles(page) {
    await toolBtn(page, 'ellipse');
    await ed(page).locator('input[name=elmode][value=center]').check();
    await ed(page).locator('#opt-ngon-fill').uncheck();
    await ed(page).locator('#opt-ngon-outline').check();
    await at(page, 4);
    for (const [x, y] of [[120, 150], [250, 150], [380, 150]]) await stroke(page, line([x, y], [x + 32, y + 32], 5));
  },
  async snake(page) {
    await toolBtn(page, 'curve');
    await sw(page, '#2a9d8f');
    await setRange(page, '#opt-size-range', 12);
    await at(page, 3);
    const dots = [[70, 200], [150, 120], [250, 190], [350, 110], [430, 170]];
    for (const [x, y] of dots) await tap(page, x, y);
    await frame(page).evaluate(() => { const p = RZ.screen(430, 170); document.querySelector('#view').dispatchEvent(new MouseEvent('dblclick', { bubbles: true, clientX: p.x, clientY: p.y })); });
  },
  async cat(page) {
    await toolBtn(page, 'select');
    await at(page, 1);
    await stroke(page, line([45, 68], [175, 212], 6));
    await at(page, 2);
    await stroke(page, line([110, 150], [380, 185], 8));
    await ed(page).locator('#sa-finish').click();
  },
  async fish(page) {
    await toolBtn(page, 'select');
    await at(page, 1);
    await stroke(page, line([100, 95], [300, 205], 6));
    await ed(page).locator('#sa-fliph').click();
    await at(page, 3);
    const k = await frame(page).evaluate(() => RZ.knobAt());
    await stroke(page, line([k.x, k.y], [k.x + 45, k.y + 6], 8));
    await ed(page).locator('#sa-finish').click();
  },
  async balloon(page) {
    await toolBtn(page, 'select');
    await ed(page).locator('#sel-shape [data-shape="lasso"]').click();
    await at(page, 2);
    await stroke(page, Array.from({ length: 41 }, (_, i) => [140 + 70 * Math.cos(i * Math.PI / 20), 125 + 82 * Math.sin(i * Math.PI / 20)]));
    await ed(page).locator('#sa-dup').click();
    await at(page, 4);
    const m = await frame(page).evaluate(() => { const f = RZ.state.floating; return [f.x + f.canvas.width / 2, f.y + f.canvas.height / 2]; });
    await stroke(page, line(m, [380, 130], 8));
    await ed(page).locator('#sa-finish').click();
  },
  async sunset(page) {
    await toolBtn(page, 'select');
    await ed(page).locator('#sel-shape [data-shape="wand"]').click();
    await at(page, 2);
    await tap(page, 30, 30);
    await ed(page).locator('#btn-sel-del').click();
    await toolBtn(page, 'bucket');
    await sw(page, '#f4a261');
    await at(page, 6);
    await tap(page, 30, 30);
  },
  async poster(page) {
    await toolBtn(page, 'text');
    await at(page, 1);
    await tap(page, 250, 85);
    const d = ed(page).locator('#dlg-text');
    await d.locator('.tx-text').fill('Ana');
    await d.locator('.tx-size').fill('60');
    await d.locator('.tx-outline').check();
    await d.locator('.tx-done').click();
    await at(page, 7);
    await ed(page).locator('#sa-finish').click();
  },
  async flowers(page) {
    await toolBtn(page, 'clone');
    await setRange(page, '#opt-size-range', 36);
    await at(page, 2);
    await tap(page, 140, 140);
    await at(page, 3);
    // from the middle of the circle, round and round outwards
    await stroke(page, [[360, 140], ...circle(360, 140, 12, 1, 16), ...circle(360, 140, 26, 1, 24), ...circle(360, 140, 40, 1, 32)]);
  },
  async apple(page) {
    await toolBtn(page, 'heal');
    await setRange(page, '#opt-size-range', 24);
    await at(page, 2);
    await tap(page, 300, 110);
    await at(page, 3);
    for (const [a, b, e, f] of [[200, 120, 240, 150], [270, 200, 300, 175], [215, 215, 245, 230]]) await stroke(page, line([a, b], [e, f], 8));
  },
  async beach(page) {
    await toolBtn(page, 'remove');
    await setRange(page, '#opt-size-range', 40);
    await at(page, 2);
    await stroke(page, zigzag(215, 160, 285, 260, 8));
  },
  async sticker(page) {
    await toolBtn(page, 'blur');
    await setRange(page, '#opt-blur', 8);
    await setRange(page, '#opt-size-range', 24);
    await at(page, 3);
    const star = Array.from({ length: 11 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 5, k = i % 2 ? 34 : 80; return [250 + k * Math.cos(a), 160 + k * Math.sin(a)]; });
    const path = star.slice(0, 10).flatMap((p, i) => line(p, star[i + 1], 6));
    await stroke(page, path);
    await toolBtn(page, 'noise');
    await setRange(page, '#opt-noise', 40);
    await at(page, 6);
    await stroke(page, zigzag(200, 110, 300, 210, 10));
  },
  async whirl(page) {
    await toolBtn(page, 'twist');
    await at(page, 1);
    await stroke(page, [[250, 160], ...line([250, 160], [250, 75], 6), ...circle(250, 160, 85, 1.5, 36)]);
  },
};

test('the course lists every task by unit; each task can be played to the end and earns its star', async ({ page }) => {
  test.setTimeout(400000);
  if (process.env.LEARN_LOG) { page.on('pageerror', e => console.log('PERR', e.message)); page.on('console', m => { if (m.type() === 'error') console.log('CERR', m.text()); }); }
  await page.goto('learn.html');
  await expect(page.locator('.unit')).toHaveCount(5);
  const ids = await page.evaluate(() => window.LEARN.TASKS.map(k => k.id));
  expect(ids.length).toBe(20);
  expect(Object.keys(PLAY).sort()).toEqual([...ids].sort());
  // (LEARN_TASKS=snake,cat … plays only those – while working on them)
  const only = process.env.LEARN_TASKS ? process.env.LEARN_TASKS.split(',') : null;
  for (const id of ids) {
    if (only && !only.includes(id)) continue;
    test.info().annotations.push({ type: 'task', description: id });
    if (process.env.LEARN_LOG) console.log('TASK', id);
    await page.evaluate((id) => { window.LEARN.start(window.LEARN.TASKS.find(k => k.id === id)); }, id);
    await at(page, 0);
    await PLAY[id](page);
    await expect(page.locator('#finish'), `task ${id}`).toBeVisible({ timeout: 15000 });
    await page.click('#btn-done-back');
  }
  if (only) return;
  // all stars
  await expect(page.locator('.card.done')).toHaveCount(20);
  await expect(page.locator('#progress')).toHaveText('20 of 20 tasks done');
});

test('the spotlight: only what it points at can be used; a tap elsewhere wiggles the instruction', async ({ page }) => {
  await page.goto('learn.html');
  await page.locator('.card').nth(1).click(); // Night sky: first "Tap the Brush"
  await at(page, 0);
  await expect(ed(page).locator('#lsn-layer .lsn-bubble')).toHaveText('Tap the Brush.');
  // the eraser is under the shade: a click there doesn't reach it
  const eraser = await ed(page).locator('#tools [data-tool="eraser"]').boundingBox();
  const fr = await page.locator('#editor').boundingBox();
  await page.mouse.click(fr.x + eraser.x + eraser.width / 2, fr.y + eraser.y + eraser.height / 2);
  expect(await frame(page).evaluate(() => RZ.state.tool)).not.toBe('eraser');
  await expect(ed(page).locator('#lsn-layer .lsn-bubble')).toHaveClass(/wiggle/);
  // the brush is in the light
  await toolBtn(page, 'brush');
  await at(page, 1);
  await expect(ed(page).locator('#lsn-layer .lsn-bubble')).toHaveText('Tap the yellow color.');
  // start again: from the first step
  await page.click('#btn-again');
  await at(page, 0);
  await expect(ed(page).locator('#lsn-layer .lsn-bubble')).toHaveText('Tap the Brush.');
});

test('a lesson leaves the child’s own picture and settings alone', async ({ page }) => {
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && RZ.ready);
  await page.evaluate(() => { RZ.state.size = 77; RZ.setTool('eraser'); });
  await page.evaluate(() => { const s = JSON.parse(localStorage.getItem('rz-prefs') || '{}'); return s; });
  const before = await page.evaluate(() => JSON.stringify(Object.fromEntries(Object.entries(localStorage))));
  await page.goto('learn.html');
  await page.locator('.card').nth(1).click();
  await at(page, 0);
  await toolBtn(page, 'brush');
  await setRange(page, '#opt-size-range', 40);
  // the lesson's editor starts from the defaults, not from the child's settings
  expect(await frame(page).evaluate(() => RZ.state.size)).toBe(40);
  await page.click('#btn-back');
  const after = await page.evaluate(() => JSON.stringify(Object.fromEntries(Object.entries(localStorage).filter(([k]) => k !== 'mz-learn'))));
  expect(after).toBe(before);
});
