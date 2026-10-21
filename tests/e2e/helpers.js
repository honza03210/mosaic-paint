// Shared helpers for the end-to-end tests. Points are in document coordinates; they are turned into
// screen positions and sent as real mouse / keyboard input.
const { expect } = require('@playwright/test');
const zlib = require('zlib');

const blank = (w = 1000, h = 1000, unit = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}${unit}" height="${h}${unit}"></svg>`;

/** Opens the app on a fresh page. Collects page errors so tests can assert there were none. */
async function open(page, { mode = 'expert', doc = blank() } = {}) {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto('/');
  await page.waitForFunction(() => window.MZ && window.MZ.ready);
  await page.evaluate(([d, m]) => {
    // (no rulers along the edges: the layout the tests were written for – Expert would show them)
    MZ.state.rulers = false;
    MZ.setMode(m);
    Object.assign(MZ.state, { newFill: false, snap: true, grid: false, chain: false });
    MZ.state.sym.type = 'none';
    if (d) MZ.loadSVGText(d, { restore: true });
  }, [doc, mode]);
  return { errors };
}

async function scr(page, p) {
  return page.evaluate(({ x, y }) => {
    const r = document.querySelector('#canvas').getBoundingClientRect(), v = MZ.state.view;
    return { x: (x - v.x) * v.s + r.left, y: (y - v.y) * v.s + r.top };
  }, p);
}
async function withKeys(page, keys, fn) {
  for (const k of keys) await page.keyboard.down(k);
  try { await fn(); } finally { for (const k of keys) await page.keyboard.up(k); }
}
async function drag(page, a, b, { keys = [], steps = 10 } = {}) {
  const A = await scr(page, a), B = await scr(page, b);
  await withKeys(page, keys, async () => {
    await page.mouse.move(A.x, A.y);
    await page.mouse.down();
    await page.mouse.move(B.x, B.y, { steps });
    await page.mouse.up();
  });
}
async function click(page, p, { keys = [] } = {}) {
  const A = await scr(page, p);
  await withKeys(page, keys, () => page.mouse.click(A.x, A.y));
}
async function key(page, k) {
  await page.keyboard.press(k);
}

/** Painted areas as sorted "color area" strings. */
const fills = (page) => page.evaluate(() =>
  [...document.querySelectorAll('.mz-fill')].map(p => `${p.getAttribute('fill')} ${Math.round(+p.dataset.area)}`).sort());
/**
 * Checks painted areas against [color, area] pairs, allowing 1% plus a perimeter-sized error: some browsers
 * (WebKit) round mouse positions to whole pixels, so drawn points can be off by a fraction of a unit.
 */
async function expectFills(page, expected) {
  const got = (await fills(page)).map(s => s.split(' ')).map(([c, a]) => [c, +a]);
  const sort = (l) => [...l].sort((a, b) => a[0].localeCompare(b[0]) || a[1] - b[1]);
  const g = sort(got), e = sort(expected);
  expect(g.map(x => x[0]), `colors of ${JSON.stringify(got)}`).toEqual(e.map(x => x[0]));
  g.forEach((x, i) => expect(Math.abs(x[1] - e[i][1]), `area ${x[1]} vs ${e[i][1]}`).toBeLessThanOrEqual(e[i][1] * 0.01 + 2 * Math.sqrt(e[i][1])));
}
const near = (a, b, tol = 1.5) => Math.abs(a - b) <= tol;
/** Color of the topmost painted area or filled shape at a point ('none' if unpainted). */
const colorAt = (page, p) => page.evaluate((q) => MZ.paintedColorAt(q) || 'none', p);
const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
const setState = (page, patch) => page.evaluate((p) => {
  for (const k in p) {
    if (p[k] && typeof p[k] === 'object' && !Array.isArray(p[k])) Object.assign(MZ.state[k], p[k]);
    else MZ.state[k] = p[k];
  }
}, patch);

/** A small PNG made from fn(x, y) → [r, g, b], for photo tests. */
function png(w, h, fn) {
  const raw = Buffer.alloc((w * 3 + 1) * h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) raw.set(fn(x, y), y * (w * 3 + 1) + 1 + x * 3);
  const crcT = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
  const crc = (b) => { let c = 0xffffffff; for (const v of b) c = crcT[(c ^ v) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
  const chunk = (type, data) => {
    const l = Buffer.alloc(4); l.writeUInt32BE(data.length);
    const td = Buffer.concat([Buffer.from(type), data]);
    const c = Buffer.alloc(4); c.writeUInt32BE(crc(td));
    return Buffer.concat([l, td, c]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 2;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
}

/**
 * Answers the app's question (its own dialog, in place of the browser's prompt / confirm): OK – typing value
 * first, if given – or Cancel. Returns the question.
 */
async function answer(page, value = null, { cancel = false } = {}) {
  const d = page.locator('#dlg-ask');
  await expect(d).toBeVisible();
  if (value != null) await d.locator('.ask-input').fill(value);
  const question = await d.locator('.ask-msg').textContent();
  await d.locator(cancel ? 'button[value=cancel]' : 'button[value=ok]').click();
  await expect(d).toBeHidden();
  // the dialog's close event comes a moment later, and the app acts on the answer then
  await page.evaluate(() => new Promise(r => setTimeout(() => requestAnimationFrame(() => setTimeout(r)), 0)));
  return question;
}

/** The vector app opens in Expert mode (Simple is for children: most of the app is hidden there) – as if chosen before. */
async function expert(page) {
  await page.addInitScript(() => {
    try { const p = JSON.parse(localStorage.getItem('mz-prefs') || '{}'); if (!p.mode) { p.mode = 'expert'; localStorage.setItem('mz-prefs', JSON.stringify(p)); } } catch { /* storage blocked */ }
  });
}

module.exports = { expect, blank, open, expert, scr, drag, click, key, fills, expectFills, near, colorAt, count, setState, png, answer };
