/* Mosaic Paint – editor core: document, tools, selection, palette, history, files. Plain browser JS. */
(() => {
'use strict';

const SVGNS = 'http://www.w3.org/2000/svg';
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

// ---- DOM ------------------------------------------------------------------
const svg = $('#canvas'), stage = $('#stage');
const docG = $('#mz-doc'), defsG = $('#mz-docdefs'), fillsG = $('#mz-fills'), shapesG = $('#mz-shapes'), refG = $('#mz-ref');
const selG = $('#mz-sel'), previewG = $('#mz-preview'), snapG = $('#mz-snapmark'), guidesG = $('#mz-guides'), flashG = $('#mz-flash');
const pageRect = $('#mz-page'), gridRect = $('#mz-gridrect'), gridPattern = $('#mz-grid'), gridPath = $('#mz-gridpath');

let SNAP_PX = 10, HANDLE_PX = 9, HIT_PX = 6; // bigger on touch screens
const EDITABLE = new Set(['line', 'polyline', 'polygon']);
const SHAPE_SEL = 'line,polyline,polygon,rect,circle,ellipse,path';
const DEFAULT_PALETTE = ['#264653', '#2a9d8f', '#8ab17d', '#e9c46a', '#f4a261', '#e76f51', '#f1faee', '#a8dadc', '#457b9d', '#1d3557'];
const EXPERT_TOOLS = new Set(['knife']);
const VERSION_EVERY_MS = 3 * 60 * 1000, MAX_VERSIONS = 40;

const state = {
  mode: 'simple',
  tool: 'select',
  fill: '#e9c46a', stroke: '#222222', strokeWidth: 2,
  palettes: { 'My palette': [...DEFAULT_PALETTE] }, paletteName: 'My palette',
  snap: true, link: true, grid: false, gridSize: 10, border: true, gapPct: 0.4,
  chain: false, sides: 6, ngonMode: 'center', newFill: false,
  lastRadius: 20, lastRot: -90,
  pattern: { type: 'square', size: 10, angle: 0 },
  sym: { type: 'none', n: 8, mirror: false, cx: null, cy: null },
  layers: { ref: { visible: true, locked: true }, fills: { visible: true, locked: false }, shapes: { visible: true, locked: false } },
  refOpacity: 0.5, savePhoto: true, onlyUnpainted: true,
  grout: { on: false, color: '#b8b2a7', width: 2 },
  rulers: true,
  doc: { x: 0, y: 0, w: 300, h: 300, bg: '#ffffff', unit: 'mm' },
  view: { x: 0, y: 0, s: 1 },
  selection: new Set(),
  handles: [],
  lineStart: null,
  freePts: null,
  action: null,
  space: false,
  pickCenter: false,
};
Object.defineProperty(state, 'palette', {
  get() { return state.palettes[state.paletteName] || (state.palettes[state.paletteName] = []); },
  set(v) { state.palettes[state.paletteName] = v; },
});

// ---- small utilities ------------------------------------------------------
const fmt = (n) => String(Math.round(n * 1000) / 1000);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const px = (n) => n / state.view.s; // screen pixels → document units
const applyM = (m, p) => ({ x: m.a * p.x + m.c * p.y + m.e, y: m.b * p.x + m.d * p.y + m.f });
const linM = (m, d) => ({ x: m.a * d.x + m.c * d.y, y: m.b * d.x + m.d * d.y });
const ptsStr = (pts) => pts.map(p => fmt(p.x) + ',' + fmt(p.y)).join(' ');
const isFill = (el) => el.classList.contains('mz-fill');
const normColor = Colors.norm;
const NUM_RE = /[-+]?(?:\d*\.\d+|\d+\.?)(?:e[-+]?\d+)?/gi;
const hooks = {};
const on = (name, fn) => (hooks[name] || (hooks[name] = [])).push(fn);
const emit = (name, ...args) => (hooks[name] || []).forEach(fn => { try { fn(...args); } catch (e) { console.error(e); } });

function mk(tag, attrs = {}, parent) {
  const e = document.createElementNS(SVGNS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
}
function parsePoints(s) {
  const n = (s || '').match(NUM_RE) || [];
  const out = [];
  for (let i = 0; i + 1 < n.length; i += 2) out.push({ x: +n[i], y: +n[i + 1] });
  return out;
}
let toastTimer;
function toast(msg) {
  const t = $('#st-msg');
  t.textContent = msg;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.textContent = ''; }, 5000);
}
function lsGet(k) { try { return localStorage.getItem(k); } catch { return null; } }
function lsSet(k, v) { try { localStorage.setItem(k, v); return true; } catch { return false; } }
function download(blob, name) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

// ---- units ------------------------------------------------------------------
const unit = () => state.doc.unit || 'px';
function fmtLen(v) {
  const u = unit();
  return `${(+v).toFixed(u === 'cm' || u === 'in' ? 2 : 1)} ${u}`;
}
function fmtArea(a) {
  const u = unit();
  if (u === 'mm') return a >= 100 ? `${(a / 100).toFixed(1)} cm²` : `${a.toFixed(0)} mm²`;
  if (u === 'cm') return `${a.toFixed(1)} cm²`;
  if (u === 'in') return `${a.toFixed(2)} in²`;
  return `${Math.round(a)} px²`;
}

// ---- paint ----------------------------------------------------------------
function setPaint(el, prop, color) {
  const v = color || 'none';
  el.setAttribute(prop, v);
  el.style.removeProperty(prop);
  const cs = getComputedStyle(el)[prop];
  const ok = v === 'none' ? cs === 'none' : normColor(cs) === normColor(v);
  if (!ok) el.style.setProperty(prop, v); // a CSS rule in an imported file overrides attributes
}
function paintFill(el, c) {
  setPaint(el, 'fill', c);
  if (isFill(el)) setPaint(el, 'stroke', c); // the thin same-color stroke hides seams between areas
}
function hasFill(el) { return el.tagName !== 'line' && getComputedStyle(el).fill !== 'none'; }
const fillOf = (el) => el.tagName === 'line' ? null : normColor(getComputedStyle(el).fill);

// ---- document elements & their geometry ------------------------------------
function allShapes() {
  const out = [];
  for (const el of docG.querySelectorAll(SHAPE_SEL)) {
    if (el.closest('defs,clipPath,mask,pattern,symbol,marker')) continue;
    out.push(el);
  }
  return out;
}
const IDENT = new DOMMatrix();
/** Matrix from an element's own coordinates to document coordinates. */
function elMatrix(node) {
  if (node === docG || node === shapesG || node === fillsG) return IDENT;
  if (!node.hasAttribute('transform') && (node.parentNode === shapesG || node.parentNode === fillsG)) return IDENT;
  const a = docG.getCTM(), b = node.getCTM && node.getCTM();
  if (!a || !b) return IDENT;
  return DOMMatrix.fromMatrix(a).inverse().multiply(DOMMatrix.fromMatrix(b));
}
let geomCache = new WeakMap();
const touch = () => { geomCache = new WeakMap(); };
const invalidate = (el) => geomCache.delete(el);

/** { polys: [{pts, closed}], bbox } in document coordinates. */
function geomOf(el) {
  let g = geomCache.get(el);
  if (!g) { g = computeGeom(el); geomCache.set(el, g); }
  return g;
}
function computeGeom(el) {
  const tag = el.tagName;
  const num = (n) => parseFloat(el.getAttribute(n)) || 0;
  let polys = [];
  if (tag === 'line') polys = [{ pts: [{ x: num('x1'), y: num('y1') }, { x: num('x2'), y: num('y2') }], closed: false }];
  else if (tag === 'polyline' || tag === 'polygon') polys = [{ pts: parsePoints(el.getAttribute('points')), closed: tag === 'polygon' }];
  else if (tag === 'rect') {
    const x = num('x'), y = num('y'), w = num('width'), h = num('height');
    if (w > 0 && h > 0) polys = [{ pts: [{ x, y }, { x: x + w, y }, { x: x + w, y: y + h }, { x, y: y + h }], closed: true }];
  } else if (tag === 'path') polys = linearPath(el.getAttribute('d') || '') || samplePath(el, false);
  else polys = samplePath(el, true);
  const m = elMatrix(el);
  if (!m.isIdentity) for (const p of polys) p.pts = p.pts.map(q => applyM(m, q));
  polys = polys.filter(p => p.pts.length > 1);
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const p of polys) for (const q of p.pts) {
    if (q.x < x0) x0 = q.x; if (q.x > x1) x1 = q.x;
    if (q.y < y0) y0 = q.y; if (q.y > y1) y1 = q.y;
  }
  return { polys, bbox: { x0, y0, x1, y1 } };
}
/** Exact vertices for paths made only of straight segments (M L H V Z); null if it has curves. */
function linearPath(d) {
  const toks = d.match(/[a-z]|[-+]?(?:\d*\.\d+|\d+\.?)(?:e[-+]?\d+)?/gi);
  if (!toks) return [];
  const polys = [];
  let i = 0, cmd = null, x = 0, y = 0, sx = 0, sy = 0, cur = null;
  const isCmd = (t) => /^[a-z]$/i.test(t);
  const num = () => { const v = parseFloat(toks[i++]); if (!Number.isFinite(v)) throw 0; return v; };
  const push = () => {
    if (!cur) { cur = { pts: [{ x: sx, y: sy }], closed: false }; polys.push(cur); }
    cur.pts.push({ x, y });
  };
  try {
    while (i < toks.length) {
      if (isCmd(toks[i])) cmd = toks[i++];
      else if (!cmd) return null;
      const rel = cmd === cmd.toLowerCase(), C = cmd.toUpperCase();
      if (C === 'Z') {
        if (cur) cur.closed = true;
        x = sx; y = sy; cur = null;
        continue;
      }
      if (i >= toks.length || isCmd(toks[i])) return null;
      if (C === 'M') {
        let nx = num(), ny = num();
        if (rel) { nx += x; ny += y; }
        x = sx = nx; y = sy = ny;
        cur = { pts: [{ x, y }], closed: false };
        polys.push(cur);
        cmd = rel ? 'l' : 'L';
      } else if (C === 'L') {
        let nx = num(), ny = num();
        if (rel) { nx += x; ny += y; }
        x = nx; y = ny; push();
      } else if (C === 'H') { const v = num(); x = rel ? x + v : v; push(); }
      else if (C === 'V') { const v = num(); y = rel ? y + v : v; push(); }
      else return null;
    }
  } catch { return null; }
  for (const p of polys) {
    const a = p.pts[0], b = p.pts[p.pts.length - 1];
    if (p.pts.length > 2 && Math.hypot(a.x - b.x, a.y - b.y) < 1e-9) { p.pts.pop(); p.closed = true; }
  }
  return polys;
}
/** Curves are approximated by sampling. */
function samplePath(el, forceClosed) {
  let len;
  try { len = el.getTotalLength(); } catch { return []; }
  if (!(len > 0)) return [];
  const N = clamp(Math.ceil(len / (Math.max(state.doc.w, state.doc.h) / 300)), 16, 360), step = len / N;
  const polys = [];
  let cur = [];
  for (let i = 0; i <= N; i++) {
    const q = el.getPointAtLength(i * step), p = { x: q.x, y: q.y };
    if (cur.length && Geo.dist(cur[cur.length - 1], p) > step * 1.5 + 1e-6) { polys.push(cur); cur = []; }
    cur.push(p);
  }
  polys.push(cur);
  return polys.filter(p => p.length > 1).map(pts => {
    const gap = Geo.dist(pts[0], pts[pts.length - 1]);
    const closed = forceClosed || gap < step * 1.5;
    if (closed && gap < 1e-3) pts.pop();
    return { pts, closed };
  });
}
function pagePts() {
  const d = state.doc;
  return [{ x: d.x, y: d.y }, { x: d.x + d.w, y: d.y }, { x: d.x + d.w, y: d.y + d.h }, { x: d.x, y: d.y + d.h }];
}
function pageGeom() {
  const d = state.doc;
  return { polys: [{ pts: pagePts(), closed: true }], bbox: { x0: d.x, y0: d.y, x1: d.x + d.w, y1: d.y + d.h } };
}
function insideEl(el, p) {
  const g = geomOf(el), b = g.bbox;
  if (p.x < b.x0 || p.x > b.x1 || p.y < b.y0 || p.y > b.y1) return false;
  let n = 0;
  for (const pl of g.polys) if (pl.closed && Geo.pointInPolygon(p, pl.pts)) n++;
  return n % 2 === 1;
}
function strokeW(el) { return parseFloat(getComputedStyle(el).strokeWidth) || 0; }
/** Is p covered by a painted area or a filled shape? */
function isPaintedAt(p) {
  return allShapes().some(el => (isFill(el) || hasFill(el)) && insideEl(el, p));
}

// vertices of editable shapes (line / polyline / polygon)
function localVerts(el) {
  if (el.tagName === 'line') {
    const n = (k) => parseFloat(el.getAttribute(k)) || 0;
    return [{ x: n('x1'), y: n('y1') }, { x: n('x2'), y: n('y2') }];
  }
  return parsePoints(el.getAttribute('points'));
}
function docVerts(el) {
  const m = elMatrix(el);
  return localVerts(el).map(p => applyM(m, p));
}
function setVertex(el, idx, q) {
  if (el.tagName === 'line') {
    el.setAttribute(idx ? 'x2' : 'x1', fmt(q.x));
    el.setAttribute(idx ? 'y2' : 'y1', fmt(q.y));
  } else {
    const pts = localVerts(el);
    pts[idx] = q;
    el.setAttribute('points', ptsStr(pts));
  }
  invalidate(el);
}
function verticesAt(p) {
  const out = [], tol = Geo.eps * 5;
  for (const el of allShapes()) {
    if (!EDITABLE.has(el.tagName) || isFill(el) || !selectable(el)) continue;
    const b = geomOf(el).bbox;
    if (p.x < b.x0 - tol || p.x > b.x1 + tol || p.y < b.y0 - tol || p.y > b.y1 + tol) continue;
    docVerts(el).forEach((q, i) => { if (Geo.dist(q, p) < tol) out.push({ el, idx: i }); });
  }
  return out;
}

// regular polygons keep their parameters in data-ngon="n cx cy r rotationDeg"
function ngonData(el) {
  const s = el && el.getAttribute && el.getAttribute('data-ngon');
  if (!s || el.tagName !== 'polygon') return null;
  const [n, cx, cy, r, rot] = s.split(/[\s,]+/).map(Number);
  if (!(n >= 3) || ![cx, cy, r, rot].every(Number.isFinite)) return null;
  return { n, cx, cy, r, rot };
}
function setNgonData(el, g) {
  el.setAttribute('data-ngon', [g.n, fmt(g.cx), fmt(g.cy), fmt(g.r), fmt(g.rot)].join(' '));
}
function setNgon(el, g, exact, idx) {
  const pts = Geo.regularPolygon(g.n, g.cx, g.cy, g.r, g.rot * Math.PI / 180);
  if (exact) pts[idx] = exact;
  el.setAttribute('points', ptsStr(pts));
  setNgonData(el, g);
  invalidate(el);
}

// ---- view (pan / zoom) ----------------------------------------------------
function toDoc(cx, cy) {
  const r = svg.getBoundingClientRect(), v = state.view;
  return { x: v.x + (cx - r.left) / v.s, y: v.y + (cy - r.top) / v.s };
}
function updateView() {
  const r = svg.getBoundingClientRect();
  if (!r.width || !r.height) return;
  const v = state.view;
  svg.setAttribute('viewBox', `${v.x} ${v.y} ${r.width / v.s} ${r.height / v.s}`);
  $('#zoom-label').textContent = Math.round(v.s * 100) + '%';
  gridPath.setAttribute('stroke-width', px(1));
  $('#mz-checker').setAttribute('patternTransform', `scale(${1 / v.s})`);
  renderSelection();
  drawGuides();
  emit('view');
}
function fitView() {
  const r = svg.getBoundingClientRect(), d = state.doc;
  if (!r.width || !r.height) return;
  const s = Math.min(r.width / d.w, r.height / d.h) * 0.9;
  state.view = { s, x: d.x + d.w / 2 - r.width / s / 2, y: d.y + d.h / 2 - r.height / s / 2 };
  updateView();
}
function zoomAt(cx, cy, factor) {
  const p = toDoc(cx, cy), r = svg.getBoundingClientRect(), v = state.view;
  v.s = clamp(v.s * factor, 0.005, 2000);
  v.x = p.x - (cx - r.left) / v.s;
  v.y = p.y - (cy - r.top) / v.s;
  updateView();
}
function zoomCenter(f) {
  const r = svg.getBoundingClientRect();
  zoomAt(r.left + r.width / 2, r.top + r.height / 2, f);
}

// ---- page -----------------------------------------------------------------
function applyDoc() {
  const d = state.doc;
  Geo.setEps(Math.max(d.w, d.h) * 1e-5);
  for (const r of [pageRect, gridRect]) {
    r.setAttribute('x', d.x); r.setAttribute('y', d.y);
    r.setAttribute('width', d.w); r.setAttribute('height', d.h);
  }
  pageRect.setAttribute('fill', d.bg || 'url(#mz-checker)');
  const g = state.gridSize;
  gridPattern.setAttribute('x', d.x); gridPattern.setAttribute('y', d.y);
  gridPattern.setAttribute('width', g); gridPattern.setAttribute('height', g);
  gridPath.setAttribute('d', `M ${g} 0 L 0 0 0 ${g}`);
  gridRect.style.display = state.grid ? '' : 'none';
  $('#doc-w').value = fmt(d.w);
  $('#doc-h').value = fmt(d.h);
  $('#doc-unit').value = unit();
  for (const el of $$('.unit-label')) el.textContent = unit();
  const bg = normColor(d.bg);
  $('#doc-bg').value = bg && bg.startsWith('#') ? bg : '#ffffff';
  $('#doc-bg-none').checked = !d.bg;
  $('#opt-gap').value = fmt(gapTol());
  drawGuides();
  emit('view');
}

// ---- layers -----------------------------------------------------------------
/** Simple mode always shows painted areas and lines; only the photo keeps its own settings. */
function layer(name) {
  if (state.mode === 'simple' && name !== 'ref') return { visible: true, locked: false };
  return state.layers[name];
}
const layerOf = (el) => isFill(el) ? 'fills' : 'shapes';
const editable = (name) => layer(name).visible && !layer(name).locked;
const selectable = (el) => editable(layerOf(el));
function applyLayers() {
  refG.style.visibility = layer('ref').visible ? '' : 'hidden';
  fillsG.style.visibility = layer('fills').visible ? '' : 'hidden';
  shapesG.style.visibility = layer('shapes').visible ? '' : 'hidden';
  for (const b of $$('[data-layer]')) {
    const L = state.layers[b.dataset.layer], k = b.dataset.prop;
    b.classList.toggle('off', k === 'visible' ? !L.visible : !L.locked);
    b.textContent = k === 'visible' ? (L.visible ? '👁' : '–') : (L.locked ? '🔒' : '🔓');
    b.title = k === 'visible' ? (L.visible ? 'Visible – click to hide' : 'Hidden – click to show') : (L.locked ? 'Locked – click to unlock' : 'Unlocked – click to lock');
  }
  $('#ref-show').checked = state.layers.ref.visible;
  $('#ref-lock').checked = state.layers.ref.locked;
  for (const el of [...state.selection]) if (!selectable(el)) state.selection.delete(el);
  renderSelection();
  renderProps();
}
function canDraw() {
  if (editable('shapes')) return true;
  toast('The lines layer is locked or hidden (see Layers).');
  return false;
}

// ---- symmetry ---------------------------------------------------------------
const symOn = () => state.mode === 'expert' && state.sym.type !== 'none';
function symCenter() {
  const s = state.sym, d = state.doc;
  return { x: s.cx ?? d.x + d.w / 2, y: s.cy ?? d.y + d.h / 2 };
}
/** Point transforms for the active symmetry; the first one is always the identity. */
function symTransforms() {
  const id = (p) => p;
  if (!symOn()) return [id];
  const s = state.sym, c = symCenter();
  const rot = (a) => (p) => {
    const dx = p.x - c.x, dy = p.y - c.y, co = Math.cos(a), si = Math.sin(a);
    return { x: c.x + dx * co - dy * si, y: c.y + dx * si + dy * co };
  };
  const mx = (p) => ({ x: 2 * c.x - p.x, y: p.y }), my = (p) => ({ x: p.x, y: 2 * c.y - p.y });
  if (s.type === 'mirror-v') return [id, mx];
  if (s.type === 'mirror-h') return [id, my];
  if (s.type === 'mirror-hv') return [id, mx, my, (p) => mx(my(p))];
  const n = clamp(Math.round(s.n) || 2, 2, 64), out = [];
  for (let k = 0; k < n; k++) out.push(rot(k * 2 * Math.PI / n));
  if (s.mirror) for (let k = 0; k < n; k++) { const r = rot(k * 2 * Math.PI / n); out.push((p) => r(mx(p))); }
  return out;
}
const ptKey = (p) => Math.round(p.x / (Geo.eps * 10)) + ',' + Math.round(p.y / (Geo.eps * 10));
/** Symmetric copies of a point list (the original first), without duplicates. */
function symCopies(pts) {
  const seen = new Set(), out = [];
  for (const t of symTransforms()) {
    const q = pts.map(t), key = q.map(ptKey).sort().join(' ');
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(q);
  }
  return out;
}
function drawGuides() {
  guidesG.innerHTML = '';
  if (!symOn()) return;
  const s = state.sym, c = symCenter(), d = state.doc, R = Math.hypot(d.w, d.h);
  const ray = (a) => mk('line', { x1: c.x, y1: c.y, x2: c.x + R * Math.cos(a), y2: c.y + R * Math.sin(a), class: 'sym-guide' }, guidesG);
  if (s.type === 'mirror-v' || s.type === 'mirror-hv') { ray(-Math.PI / 2); ray(Math.PI / 2); }
  if (s.type === 'mirror-h' || s.type === 'mirror-hv') { ray(0); ray(Math.PI); }
  if (s.type === 'radial') {
    const n = clamp(Math.round(s.n) || 2, 2, 64);
    for (let k = 0; k < n; k++) ray(-Math.PI / 2 + k * 2 * Math.PI / n);
  }
  const r = px(5);
  mk('circle', { cx: c.x, cy: c.y, r, class: 'sym-center' }, guidesG);
}

// ---- snapping ---------------------------------------------------------------
function gridSnap(p) {
  if (!state.grid) return { x: p.x, y: p.y, kind: null };
  const g = state.gridSize, d = state.doc;
  return { x: d.x + Math.round((p.x - d.x) / g) * g, y: d.y + Math.round((p.y - d.y) / g) * g, kind: 'grid' };
}
function snapPoint(p, opt = {}) {
  if (opt.noSnap) return { x: p.x, y: p.y, kind: null };
  if (!state.snap) return gridSnap(p);
  const r = px(SNAP_PX), ex = opt.exclude;
  let best = null, bd = r;
  const near = [];
  const consider = (q, kind) => {
    const d = Geo.dist(p, q);
    if (d < bd) { bd = d; best = { x: q.x, y: q.y, kind }; }
  };
  const scan = (g) => {
    const b = g.bbox;
    if (p.x < b.x0 - r || p.x > b.x1 + r || p.y < b.y0 - r || p.y > b.y1 + r) return;
    for (const pl of g.polys) {
      const pts = pl.pts, n = pts.length, m = pl.closed ? n : n - 1;
      for (const q of pts) consider(q, 'vertex');
      for (let i = 0; i < m; i++) {
        const a = pts[i], c = pts[(i + 1) % n], pr = Geo.project(p, a, c), d = Geo.dist(p, pr);
        if (d < r) near.push({ a, b: c, pr, d });
      }
    }
  };
  if (state.border) scan(pageGeom());
  for (const el of allShapes()) {
    if (isFill(el) || (ex && ex.has(el))) continue;
    scan(geomOf(el));
    const ng = ngonData(el);
    if (ng) consider(applyM(elMatrix(el), { x: ng.cx, y: ng.cy }), 'center');
  }
  if (opt.extra) for (const q of opt.extra) consider(q, 'vertex');
  if (symOn()) consider(symCenter(), 'center');
  if (best) return best;
  let bi = null, bid = r;
  const lim = Math.min(near.length, 80);
  for (let i = 0; i < lim; i++) for (let j = i + 1; j < lim; j++) {
    const x = Geo.segIntersect(near[i].a, near[i].b, near[j].a, near[j].b);
    if (x) { const d = Geo.dist(p, x); if (d < bid) { bid = d; bi = x; } }
  }
  if (bi) return { x: bi.x, y: bi.y, kind: 'intersection' };
  let bm = null, bmd = r * 0.7;
  for (const s of near) {
    const m = { x: (s.a.x + s.b.x) / 2, y: (s.a.y + s.b.y) / 2 }, d = Geo.dist(p, m);
    if (d < bmd) { bmd = d; bm = m; }
  }
  if (bm) return { x: bm.x, y: bm.y, kind: 'midpoint' };
  if (near.length) {
    near.sort((a, b) => a.d - b.d);
    return { x: near[0].pr.x, y: near[0].pr.y, kind: 'edge' };
  }
  return gridSnap(p);
}
function constrainAngle(a, b) {
  const ang = Math.atan2(b.y - a.y, b.x - a.x), step = Math.PI / 12;
  const q = Math.round(ang / step) * step;
  const L = Math.hypot(b.x - a.x, b.y - a.y) * Math.cos(ang - q);
  return { x: a.x + L * Math.cos(q), y: a.y + L * Math.sin(q), kind: null };
}
/** Pointer position after snapping / constraints, with the snap marker drawn. */
function resolvePoint(e, raw, opt = {}) {
  const r = (opt.origin && e.shiftKey) ? constrainAngle(opt.origin, raw) : snapPoint(raw, { exclude: opt.exclude, extra: opt.extra, noSnap: e.altKey });
  drawSnapMarker(r);
  return r;
}
const SNAP_LABEL = { vertex: 'point', center: 'center', intersection: 'crossing', midpoint: 'midpoint', edge: 'on line', grid: 'grid' };
function drawSnapMarker(r) {
  snapG.innerHTML = '';
  if (!r || !r.kind) return;
  const s = px(6), x = r.x, y = r.y;
  let d;
  switch (r.kind) {
    case 'vertex': d = `M${x - s} ${y - s}h${2 * s}v${2 * s}h${-2 * s}z`; break;
    case 'center': d = `M${x - s} ${y}a${s} ${s} 0 1 0 ${2 * s} 0a${s} ${s} 0 1 0 ${-2 * s} 0`; break;
    case 'intersection': d = `M${x - s} ${y - s}L${x + s} ${y + s}M${x + s} ${y - s}L${x - s} ${y + s}`; break;
    case 'midpoint': d = `M${x} ${y - s}L${x + s} ${y + s * 0.8}L${x - s} ${y + s * 0.8}z`; break;
    case 'edge': d = `M${x - s} ${y}L${x} ${y - s}L${x + s} ${y}L${x} ${y + s}z`; break;
    default: d = `M${x - s} ${y}H${x + s}M${x} ${y - s}V${y + s}`;
  }
  mk('path', { d, class: 'snap-mark' }, snapG);
  const t = mk('text', { x: x + s * 1.6, y: y - s * 1.2, class: 'snap-label', 'font-size': px(11) }, snapG);
  t.textContent = SNAP_LABEL[r.kind];
}
/** A small length / size label next to the pointer while drawing. */
function drawMeasure(p, text) {
  const t = mk('text', { x: p.x + px(14), y: p.y + px(22), class: 'measure', 'font-size': px(11.5) }, previewG);
  t.textContent = text;
}

// ---- hit testing & selection ------------------------------------------------
function hitTest(p) {
  const list = allShapes().filter(selectable).reverse(), tol = px(HIT_PX);
  // first: lines / outlines near the pointer (they are thin, so they win)
  for (const el of list) {
    if (isFill(el)) continue;
    const g = geomOf(el), b = g.bbox, t = Math.max(tol, strokeW(el) / 2);
    if (p.x < b.x0 - t || p.x > b.x1 + t || p.y < b.y0 - t || p.y > b.y1 + t) continue;
    for (const pl of g.polys) {
      const n = pl.pts.length, m = pl.closed ? n : n - 1;
      for (let i = 0; i < m; i++) if (Geo.dist(p, Geo.project(p, pl.pts[i], pl.pts[(i + 1) % n])) <= t) return el;
    }
  }
  // then: painted areas under the pointer
  for (const el of list) if ((isFill(el) || hasFill(el)) && insideEl(el, p)) return el;
  return null;
}
function renderSelection() {
  selG.innerHTML = '';
  state.handles = [];
  const many = state.selection.size > 300;
  for (const el of [...state.selection]) {
    if (!el.isConnected) { state.selection.delete(el); continue; }
    for (const pl of geomOf(el).polys) mk(pl.closed ? 'polygon' : 'polyline', { points: ptsStr(pl.pts), class: 'sel-outline' }, selG);
    if (!many && EDITABLE.has(el.tagName) && !isFill(el)) docVerts(el).forEach((q, i) => state.handles.push({ el, idx: i, x: q.x, y: q.y }));
  }
  const s = px(HANDLE_PX - 2);
  for (const h of state.handles) {
    mk('rect', { x: h.x - s / 2, y: h.y - s / 2, width: s, height: s, class: ngonData(h.el) ? 'handle ngon' : 'handle' }, selG);
  }
}
function describe(el) {
  if (isFill(el)) return 'painted area';
  const ng = ngonData(el);
  if (ng) return `${ng.n}-gon`;
  return el.tagName;
}
function renderProps() {
  const sel = [...state.selection].filter(e => e.isConnected);
  $('#sel-section').hidden = !sel.length;
  if (!sel.length) return;
  $('#sel-info').textContent = sel.length === 1 ? `(${describe(sel[0])})` : `(${sel.length} items)`;
  const ng = sel.length === 1 ? ngonData(sel[0]) : null;
  $('#ngon-props').hidden = !ng;
  if (ng) {
    $('#sel-sides').value = ng.n;
    $('#sel-radius').value = fmt(ng.r);
    $('#sel-rot').value = fmt(ng.rot);
  }
  const sw = strokeW(sel[0]);
  $('#sel-sw').value = Number.isFinite(sw) ? fmt(sw) : '';
}
function selectionChanged() { renderSelection(); renderProps(); }

// moving elements: capture their geometry once, then apply delta from the original
function capture(el) {
  const c = { el, inv: elMatrix(el).inverse(), ngon: ngonData(el) };
  const tag = el.tagName;
  if (tag === 'line') c.line = ['x1', 'y1', 'x2', 'y2'].map(k => parseFloat(el.getAttribute(k)) || 0);
  else if (tag === 'polyline' || tag === 'polygon') c.pts = parsePoints(el.getAttribute('points'));
  else if (isFill(el) && !el.hasAttribute('transform') && linearPath(el.getAttribute('d') || '')) c.rings = linearPath(el.getAttribute('d'));
  else {
    c.transform = el.getAttribute('transform') || '';
    c.pinv = elMatrix(el.parentNode).inverse();
  }
  return c;
}
function applyMove(c, d) {
  const el = c.el;
  if (c.line) {
    const l = linM(c.inv, d);
    el.setAttribute('x1', fmt(c.line[0] + l.x)); el.setAttribute('y1', fmt(c.line[1] + l.y));
    el.setAttribute('x2', fmt(c.line[2] + l.x)); el.setAttribute('y2', fmt(c.line[3] + l.y));
  } else if (c.pts) {
    const l = linM(c.inv, d);
    el.setAttribute('points', ptsStr(c.pts.map(p => ({ x: p.x + l.x, y: p.y + l.y }))));
    if (c.ngon) setNgonData(el, { ...c.ngon, cx: c.ngon.cx + l.x, cy: c.ngon.cy + l.y });
  } else if (c.rings) {
    el.setAttribute('d', ringsToD(c.rings.map(r => r.pts.map(p => ({ x: p.x + d.x, y: p.y + d.y })))));
  } else {
    const l = linM(c.pinv, d);
    let rest = c.transform, tx = l.x, ty = l.y;
    const m = rest.match(/^\s*translate\(\s*([-+\d.e]+)(?:[\s,]+([-+\d.e]+))?\s*\)\s*/i);
    if (m) { tx += +m[1]; ty += +(m[2] || 0); rest = rest.slice(m[0].length); }
    el.setAttribute('transform', `translate(${fmt(tx)} ${fmt(ty)}) ${rest}`.trim());
  }
  invalidate(el);
}
function moveElements(els, d) {
  for (const c of els.map(capture)) applyMove(c, d);
}

// ---- history, autosave & versions ---------------------------------------------
let history = [], hIndex = -1, dirty = false, fileName = 'mosaic.svg', fileHandle = null;
const snapshot = () => ({ defs: defsG.innerHTML, fills: fillsG.innerHTML, shapes: shapesG.innerHTML, doc: { ...state.doc } });
function resetHistory() { history = [snapshot()]; hIndex = 0; updateUndoUI(); }
function commit() {
  touch();
  history.splice(hIndex + 1);
  history.push(snapshot());
  if (history.length > 200) history.shift();
  hIndex = history.length - 1;
  dirty = true;
  afterChange();
}
function restore(s) {
  defsG.innerHTML = s.defs;
  fillsG.innerHTML = s.fills;
  shapesG.innerHTML = s.shapes;
  state.doc = { ...s.doc };
  state.selection.clear();
  touch();
  applyDoc();
  applyGrout();
  dirty = true;
  afterChange();
}
function undo() { if (hIndex > 0) { cancelPending(); restore(history[--hIndex]); } }
function redo() { if (hIndex < history.length - 1) { cancelPending(); restore(history[++hIndex]); } }
function updateUndoUI() {
  $('#btn-undo').disabled = hIndex <= 0;
  $('#btn-redo').disabled = hIndex >= history.length - 1;
}
function afterChange() {
  renderSelection();
  renderProps();
  renderPalette();
  updateUndoUI();
  updateTitle();
  scheduleAutosave();
  emit('change');
}
/** For changes outside the undo history (photo, palette…) that should still be autosaved. */
function docChanged() {
  dirty = true;
  updateTitle();
  scheduleAutosave();
}
function updateTitle() { document.title = `${dirty ? '• ' : ''}${fileName} – Mosaic Paint`; }
const hasContent = () => fillsG.children.length > 0 || shapesG.children.length > 0;
let autosaveTimer, lastVersionAt = Date.now(), restored = false;
function scheduleAutosave() {
  if (!restored) return; // never overwrite the saved drawing before it has been loaded
  clearTimeout(autosaveTimer);
  autosaveTimer = setTimeout(autosaveNow, 700);
}
async function autosaveNow() {
  const svgText = buildSVGString();
  try {
    await Store.set('current', { svg: svgText, fileName, time: Date.now() });
  } catch {
    if (!lsSet('mz-autosave', svgText)) toast('Autosave failed – remember to save your file.');
  }
  if (hasContent() && Date.now() - lastVersionAt > VERSION_EVERY_MS) saveVersion('Autosave');
}
async function saveVersion(note) {
  lastVersionAt = Date.now();
  try {
    await Store.addVersion({ time: Date.now(), name: fileName, note, svg: buildSVGString(), tiles: fillsG.children.length });
    await Store.trimVersions(MAX_VERSIONS);
    return true;
  } catch { return false; }
}
async function restoreVersion(rec) {
  if (hasContent()) await saveVersion('Before restoring an older version');
  if (loadSVGText(rec.svg, { restore: true })) {
    fileName = rec.name || 'mosaic.svg';
    fileHandle = null;
    dirty = true;
    updateTitle();
    scheduleAutosave();
    toast('Restored the version from ' + new Date(rec.time).toLocaleString());
  }
}

// ---- palettes -----------------------------------------------------------------
const PREF_KEYS = ['mode', 'fill', 'stroke', 'strokeWidth', 'palettes', 'paletteName', 'snap', 'link', 'grid', 'gridSize', 'border', 'gapPct',
  'chain', 'sides', 'ngonMode', 'newFill', 'lastRadius', 'lastRot', 'pattern', 'sym', 'layers', 'refOpacity', 'savePhoto', 'onlyUnpainted', 'grout', 'rulers'];
function savePrefs() {
  const o = {};
  for (const k of PREF_KEYS) o[k] = state[k];
  lsSet('mz-prefs', JSON.stringify(o));
}
function loadPrefs() {
  let o;
  try { o = JSON.parse(lsGet('mz-prefs') || '{}'); } catch { return; }
  if (Array.isArray(o.palette) && !o.palettes) o.palettes = { 'My palette': o.palette };
  if ('ngonFill' in o && !('newFill' in o)) o.newFill = o.ngonFill;
  for (const k of PREF_KEYS) {
    if (!(k in o)) continue;
    if (k === 'layers') for (const n in state.layers) Object.assign(state.layers[n], o.layers[n] || {});
    else if (['pattern', 'sym', 'grout'].includes(k)) Object.assign(state[k], o[k]);
    else state[k] = o[k];
  }
  if (!state.palettes[state.paletteName]) state.paletteName = Object.keys(state.palettes)[0] || 'My palette';
}
function uniqueName(base) {
  let n = base, i = 2;
  while (state.palettes[n]) n = `${base} ${i++}`;
  return n;
}
function renderPaletteSelect() {
  const sel = $('#pal-select');
  sel.innerHTML = '';
  for (const name of Object.keys(state.palettes)) {
    const o = document.createElement('option');
    o.value = o.textContent = name;
    sel.append(o);
  }
  sel.value = state.paletteName;
}
function switchPalette(name) {
  if (!state.palettes[name]) return;
  state.paletteName = name;
  savePrefs();
  renderPaletteSelect();
  renderPalette();
}
function addColors(list) {
  let added = 0;
  for (const c of list) if (c && !state.palette.includes(c)) { state.palette.push(c); added++; }
  savePrefs();
  renderPalette();
  return added;
}
function colorCounts() {
  const m = new Map();
  for (const el of allShapes()) {
    const c = fillOf(el);
    if (c) m.set(c, (m.get(c) || 0) + 1);
  }
  return m;
}
function renderPalette() {
  const box = $('#palette');
  box.innerHTML = '';
  const counts = colorCounts();
  for (const c of [null, ...state.palette]) {
    const d = document.createElement('div');
    d.className = 'swatch' + (c ? '' : ' none');
    if (c) d.style.background = c;
    if (c === state.fill) d.classList.add('is-fill');
    if (c === state.stroke) d.classList.add('is-stroke');
    const n = c ? counts.get(c) || 0 : 0;
    const num = c ? state.palette.indexOf(c) + 1 : 0;
    d.title = c ? `#${num}  ${c}${n ? ` – used by ${n} area${n > 1 ? 's' : ''}` : ''}\nClick: fill · Right-click: stroke · Double-click: edit` : 'No color – the bucket erases with it';
    if (n) {
      const b = document.createElement('span');
      b.className = 'count';
      b.textContent = n;
      d.append(b);
    }
    if (c) {
      const x = document.createElement('button');
      x.className = 'del';
      x.textContent = '×';
      x.title = 'Remove from palette';
      x.onclick = (e) => { e.stopPropagation(); removeColor(c); };
      d.append(x);
      d.ondblclick = () => editColor(c);
    }
    d.onclick = () => setFill(c, true);
    d.oncontextmenu = (e) => { e.preventDefault(); setStroke(c, true); };
    box.append(d);
  }
  const fb = $('#ac-fill'), sb = $('#ac-stroke');
  fb.className = 'acbox' + (state.fill ? '' : ' none');
  fb.style.background = state.fill || '';
  sb.className = 'acbox' + (state.stroke ? '' : ' none');
  sb.style.background = state.stroke || '';
}
function applyToSelection() { return state.tool === 'select' && state.selection.size > 0; }
function setFill(c, apply) {
  state.fill = c;
  savePrefs();
  if (apply && applyToSelection()) {
    for (const el of state.selection) {
      if (isFill(el) && !c) { el.remove(); continue; }
      if (el.tagName !== 'line') paintFill(el, c);
    }
    commit();
  } else renderPalette();
}
function setStroke(c, apply) {
  state.stroke = c;
  savePrefs();
  if (apply && applyToSelection()) {
    for (const el of state.selection) if (!isFill(el)) setPaint(el, 'stroke', c);
    commit();
  } else renderPalette();
}
function removeColor(c) {
  state.palette = state.palette.filter(x => x !== c);
  savePrefs();
  renderPalette();
}
/** Recolors every area painted with `from`; to = null erases them. Returns the number changed. */
function replaceColor(from, to) {
  let n = 0;
  for (const el of allShapes()) {
    if (fillOf(el) !== from) continue;
    if (!to && isFill(el)) el.remove(); else paintFill(el, to);
    n++;
  }
  return n;
}
function editColor(old) {
  const v = prompt('Edit color (hex or any CSS color).\nAreas painted with it are recolored too.', old);
  if (v == null) return;
  const c = normColor(v);
  if (!c) { toast('Not a valid color: ' + v); return; }
  if (c === old) return;
  const i = state.palette.indexOf(old);
  if (state.palette.includes(c)) state.palette.splice(i, 1); else state.palette[i] = c;
  let n = replaceColor(old, c);
  for (const el of allShapes()) {
    if (!isFill(el) && normColor(getComputedStyle(el).stroke) === old) { setPaint(el, 'stroke', c); n++; }
  }
  if (state.fill === old) state.fill = c;
  if (state.stroke === old) state.stroke = c;
  savePrefs();
  if (n) { commit(); toast(`Recolored ${n} element${n > 1 ? 's' : ''}.`); } else renderPalette();
}
function addFromInput() {
  const inp = $('#color-input');
  const text = inp.value.trim();
  if (!text) { inp.focus(); toast('Paste a color code (or several) into the box, then press Enter.'); return; }
  const cols = Colors.parse(text);
  if (!cols.length) { toast('No color found in: ' + text); return; }
  const n = addColors(cols);
  if (cols.length === 1) setFill(cols[0], false);
  inp.value = '';
  updateColorPreview();
  toast(n ? `Added ${n} color${n > 1 ? 's' : ''}.` : 'Already in the palette.');
}
function updateColorPreview() {
  const c = Colors.parse($('#color-input').value)[0];
  const p = $('#color-preview');
  p.style.background = c || 'transparent';
  p.title = c || '';
}

// ---- closed areas: boundaries, gaps, bucket, reflow -----------------------------------
const gapTol = () => Math.max(state.doc.w, state.doc.h) * (state.mode === 'expert' ? state.gapPct : 0.4) / 100;
let lastOpenEnds = [];
/**
 * Every straight piece that bounds areas: lines, shape outlines, the page edge, plus short
 * bridges that close small gaps where a line end almost touches something.
 */
function boundarySegments() {
  const segs = [], ends = [];
  const add = (g) => {
    for (const pl of g.polys) {
      const p = pl.pts, n = p.length, m = pl.closed ? n : n - 1, base = segs.length;
      for (let i = 0; i < m; i++) segs.push({ a: p[i], b: p[(i + 1) % n] });
      if (!pl.closed && m > 0) { ends.push({ p: p[0], seg: base }); ends.push({ p: p[n - 1], seg: base + m - 1 }); }
    }
  };
  if (state.border) add(pageGeom());
  for (const el of allShapes()) if (!isFill(el)) add(geomOf(el));
  const bridges = bridgeGaps(segs, ends, gapTol());
  return segs.concat(bridges).filter(s => Geo.dist(s.a, s.b) > Geo.eps);
}
function bridgeGaps(segs, ends, tol) {
  lastOpenEnds = [];
  if (!ends.length) return [];
  const cell = Math.max(tol, Geo.eps * 10), grid = new Map(), big = [];
  const key = (i, j) => i + ',' + j;
  segs.forEach((s, idx) => {
    const i0 = Math.floor(Math.min(s.a.x, s.b.x) / cell), i1 = Math.floor(Math.max(s.a.x, s.b.x) / cell);
    const j0 = Math.floor(Math.min(s.a.y, s.b.y) / cell), j1 = Math.floor(Math.max(s.a.y, s.b.y) / cell);
    if ((i1 - i0 + 1) * (j1 - j0 + 1) > 400) { big.push(idx); return; }
    for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) (grid.get(key(i, j)) || grid.set(key(i, j), []).get(key(i, j))).push(idx);
  });
  const out = [];
  for (const e of ends) {
    const ci = Math.floor(e.p.x / cell), cj = Math.floor(e.p.y / cell), cand = new Set(big);
    for (let i = ci - 1; i <= ci + 1; i++) for (let j = cj - 1; j <= cj + 1; j++) for (const idx of grid.get(key(i, j)) || []) cand.add(idx);
    let touching = false, best = null, bd = tol;
    for (const idx of cand) {
      if (idx === e.seg) continue;
      const s = segs[idx], pr = Geo.project(e.p, s.a, s.b), d = Geo.dist(e.p, pr);
      if (d < Geo.eps) { touching = true; break; }
      if (d < bd) { bd = d; best = pr; }
    }
    if (touching) continue;
    if (best) out.push({ a: e.p, b: { x: best.x, y: best.y } });
    else lastOpenEnds.push(e.p);
  }
  return out;
}
/** Briefly circles line ends that touch nothing, to show why an area isn't closed. */
function showGaps() {
  flashG.innerHTML = '';
  const v = state.view, r = svg.getBoundingClientRect();
  const vis = lastOpenEnds.filter(p => p.x >= v.x && p.y >= v.y && p.x <= v.x + r.width / v.s && p.y <= v.y + r.height / v.s);
  for (const p of vis.slice(0, 300)) mk('circle', { cx: p.x, cy: p.y, r: px(9), class: 'gap-mark' }, flashG);
  setTimeout(() => { flashG.innerHTML = ''; }, 3500);
  return vis.length;
}
function ringsToD(rings) {
  return rings.map(r => 'M' + r.map(p => fmt(p.x) + ' ' + fmt(p.y)).join('L') + 'Z').join('');
}
const nearArea = (a, b) => Math.abs(a - b) <= Math.max(Math.abs(a), Math.abs(b)) * 0.003 + Geo.eps;
function createFill(region, color, cover) {
  const d = state.doc;
  const path = mk('path', {
    class: 'mz-fill', d: ringsToD([region.outer, ...region.holes]), 'fill-rule': 'evenodd',
    'stroke-width': fmt(Math.max(d.w, d.h) * 0.0005), 'stroke-linejoin': 'round', 'data-area': fmt(region.area),
  });
  if (cover) {
    // the area lies inside a shape that has its own fill → it must sit above that shape
    cover.after(path);
    const m = elMatrix(cover.parentNode);
    if (!m.isIdentity) path.setAttribute('transform', m.inverse().toString());
  } else {
    // bigger areas go below smaller ones, so areas inside areas stay visible
    let ref = null;
    for (const c of fillsG.children) if (!(+c.dataset.area >= region.area)) { ref = c; break; }
    fillsG.insertBefore(path, ref);
  }
  paintFill(path, color);
  return path;
}
const paintCtx = () => ({ ix: Geo.regionIndex(boundarySegments()) });
/**
 * Paints the closed area around p. ctx.ix is a Geo.regionIndex of the current lines (reused while
 * dragging). Does not commit. Returns { found, changed }.
 */
function bucketAt(p, color, ctx, face) {
  const f = face || ctx.ix.locate(p), region = f ? ctx.ix.region(f) : null;
  const shapesTop = allShapes().filter(e => !isFill(e)).reverse();
  const fillsAt = allShapes().filter(e => isFill(e) && insideEl(e, p)).reverse();
  const paint = (el) => {
    if (!color && isFill(el)) { el.remove(); return true; }
    if (fillOf(el) === color) return false;
    paintFill(el, color);
    return true;
  };
  if (region) {
    const same = fillsAt.find(fl => nearArea(+fl.dataset.area, region.area));
    if (same) return { found: true, changed: paint(same) };
    // the area is exactly one closed shape → color the shape itself
    const shape = shapesTop.find(e => geomOf(e).polys.some(pl => pl.closed && Geo.pointInPolygon(p, pl.pts) && nearArea(Math.abs(Geo.polygonArea(pl.pts)), region.area)));
    if (shape) return { found: true, changed: paint(shape) };
    // fills left from an earlier, finer layout of lines would hide the new one
    const stale = fillsAt.filter(fl => +fl.dataset.area < region.area);
    stale.forEach(fl => fl.remove());
    if (!color) return { found: true, changed: stale.length > 0 };
    createFill(region, color, shapesTop.find(e => hasFill(e) && insideEl(e, p)));
    return { found: true, changed: true };
  }
  const shape = shapesTop.find(e => insideEl(e, p));
  if (shape) return { found: true, changed: paint(shape) };
  if (fillsAt[0]) return { found: true, changed: paint(fillsAt[0]) };
  return { found: false, changed: false };
}

/** Up to ~max points spread over a bbox that pass `inside`. */
function gridSample(bb, inside, max) {
  for (const n of [8, 20, 48]) {
    const pts = [];
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const p = { x: bb.x0 + (bb.x1 - bb.x0) * (i + 0.5) / n, y: bb.y0 + (bb.y1 - bb.y0) * (j + 0.5) / n };
      if (inside(p)) pts.push(p);
    }
    if (pts.length >= 6 || n === 48) {
      const step = Math.max(1, Math.floor(pts.length / max));
      return pts.filter((_, k) => k % step === 0);
    }
  }
  return [];
}
const insideRegion = (r, p) => Geo.pointInPolygon(p, r.outer) && !r.holes.some(h => Geo.pointInPolygon(p, h));
function setFillRegion(el, region) {
  const m = elMatrix(el);
  const map = m.isIdentity ? (r) => r : ((inv) => (r) => r.map(p => applyM(inv, p)))(m.inverse());
  el.setAttribute('d', ringsToD([region.outer, ...region.holes].map(map)));
  el.setAttribute('data-area', fmt(region.area));
  invalidate(el);
}
/**
 * After lines change, every painted area re-finds its region: points sampled inside its old
 * shape vote for the area they now fall in. Split areas keep the color in every piece, merged
 * areas keep the color of the bigger one, and areas that no longer close are removed.
 */
function reflowFills() {
  const fills = [...docG.querySelectorAll('path.mz-fill')];
  if (!fills.length) return;
  touch();
  const ix = Geo.regionIndex(boundarySegments());
  const items = fills.map(el => {
    const g = geomOf(el), rings = g.polys.filter(p => p.closed).map(p => p.pts);
    const inside = (p) => rings.reduce((n, r) => n + (Geo.pointInPolygon(p, r) ? 1 : 0), 0) % 2 === 1;
    const samples = gridSample(g.bbox, inside, 64), votes = new Map();
    for (const p of samples) {
      const f = ix.locate(p);
      if (f) votes.set(f, (votes.get(f) || 0) + 1);
    }
    const area = Math.abs(+el.dataset.area) || rings.reduce((s, r) => s + Math.abs(Geo.polygonArea(r)), 0);
    return { el, inside, votes, area, n: samples.length || 1 };
  });
  // match painted areas to regions by best overlap (intersection over union), greedily,
  // so an area that loses its first choice falls back to the next best region
  const pairs = [];
  for (const it of items) for (const [f, v] of it.votes) {
    const ov = it.area * v / it.n, fa = ix.region(f).area;
    pairs.push({ it, f, score: ov / (it.area + fa - ov) });
  }
  pairs.sort((a, b) => b.score - a.score || b.it.area - a.it.area);
  const owner = new Map(), placed = new Set();
  for (const { it, f } of pairs) {
    if (placed.has(it) || owner.has(f)) continue;
    owner.set(f, it);
    placed.add(it);
    setFillRegion(it.el, ix.region(f));
  }
  for (const it of items) if (!placed.has(it)) it.el.remove();
  // a line drawn through a painted area: pieces lying within the old area keep its color
  for (const it of items) {
    if (!it.el.isConnected) continue;
    for (const f of it.votes.keys()) {
      if (owner.has(f)) continue;
      const reg = ix.region(f);
      const pts = gridSample(reg.bb, (p) => insideRegion(reg, p), 40);
      if (!pts.length || pts.filter(it.inside).length < pts.length * 0.85) continue;
      owner.set(f, it);
      const c = it.el.cloneNode(false);
      it.el.after(c);
      setFillRegion(c, reg);
    }
  }
  [...fillsG.children].sort((a, b) => (+b.dataset.area || 0) - (+a.dataset.area || 0)).forEach(c => fillsG.appendChild(c));
}
/** Commit for edits that change lines: painted areas are updated in the same undo step. */
function commitGeometry() {
  reflowFills();
  commit();
}
/** Edits that touched only painted areas leave the others alone. */
function commitFor(els) {
  if ([...els].every(isFill)) commit(); else commitGeometry();
}
function eyedrop(e) {
  for (const t of document.elementsFromPoint(e.clientX, e.clientY)) {
    if (!docG.contains(t) || !t.matches(SHAPE_SEL) || t.tagName === 'line') continue;
    const c = normColor(getComputedStyle(t).fill);
    if (c) {
      setFill(c, false);
      toast(`Picked ${c}${state.palette.includes(c) ? '' : ' (not in the palette – add it with “From drawing”)'}`);
      return;
    }
  }
  toast('No painted area under the cursor.');
}

// ---- creating shapes (with symmetric copies) -----------------------------------------
function shapeStyle() {
  return { stroke: state.stroke || 'none', 'stroke-width': state.strokeWidth, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
}
function addLines(a, b) {
  for (const [p, q] of symCopies([a, b])) {
    mk('line', { x1: fmt(p.x), y1: fmt(p.y), x2: fmt(q.x), y2: fmt(q.y), ...shapeStyle() }, shapesG);
  }
}
function addPolygons(pts) {
  for (const q of symCopies(pts)) {
    mk('polygon', { points: ptsStr(q), fill: state.newFill && state.fill ? state.fill : 'none', ...shapeStyle() }, shapesG);
  }
}
function addNgons(s) {
  const seen = new Set();
  symTransforms().forEach((t, k) => {
    const c = t({ x: s.cx, y: s.cy }), v0 = t(s.pts[0]);
    const key = ptKey(c) + '|' + s.pts.map(t).map(ptKey).sort().join(' ');
    if (seen.has(key)) return;
    seen.add(key);
    const rot = Math.atan2(v0.y - c.y, v0.x - c.x) * 180 / Math.PI;
    // the original keeps its exact (snapped) corners; copies are regenerated in standard order
    const pts = k === 0 ? s.pts : Geo.regularPolygon(s.n, c.x, c.y, s.r, rot * Math.PI / 180);
    const el = mk('polygon', { points: ptsStr(pts), fill: state.newFill && state.fill ? state.fill : 'none', ...shapeStyle() }, shapesG);
    setNgonData(el, { n: s.n, cx: c.x, cy: c.y, r: s.r, rot });
  });
}

// ---- drawing tools ----------------------------------------------------------
function previewStyle() {
  return state.stroke
    ? { stroke: state.stroke, 'stroke-width': state.strokeWidth, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', fill: 'none', class: 'preview' }
    : { class: 'preview-ghost' };
}
/** Draws the shape plus its symmetric copies as a preview. */
function previewShape(tag, pts) {
  const copies = symCopies(pts);
  copies.forEach((q, i) => {
    const attrs = tag === 'line' ? { x1: q[0].x, y1: q[0].y, x2: q[1].x, y2: q[1].y } : { points: ptsStr(q) };
    mk(tag, { ...attrs, ...(i ? { class: 'preview-ghost' } : previewStyle()) }, previewG);
  });
}
function cancelPending() {
  state.lineStart = null;
  state.freePts = null;
  state.action = null;
  previewG.innerHTML = '';
  snapG.innerHTML = '';
  updateStageActions();
}
function updateStageActions() {
  const box = $('#stage-actions');
  box.hidden = !(state.lineStart || state.freePts);
  $('#sa-back').hidden = !state.freePts;
  $('#sa-finish').textContent = state.freePts ? 'Close shape' : 'Done';
}

// line
function finishLine(a, b) {
  if (Geo.dist(a, b) > px(1)) {
    addLines(a, b);
    commitGeometry();
    state.lineStart = state.chain ? { x: b.x, y: b.y } : null;
  } else state.lineStart = null; // clicking twice on the same spot ends a chain
  previewG.innerHTML = '';
  updateStageActions();
}
function drawLinePreview(a, b) {
  previewG.innerHTML = '';
  previewShape('line', [a, b]);
  drawMeasure(b, fmtLen(Geo.dist(a, b)));
}
const lineTool = {
  down(e, raw) {
    if (!canDraw()) return;
    if (state.lineStart) { finishLine(state.lineStart, resolvePoint(e, raw, { origin: state.lineStart })); return; }
    const p = resolvePoint(e, raw);
    state.lineStart = { x: p.x, y: p.y };
    state.action = { type: 'line-press', sx: e.clientX, sy: e.clientY, moved: false };
    updateStageActions();
  },
  move(e, raw) {
    const a = state.action;
    if (a && a.type === 'line-press' && Math.hypot(e.clientX - a.sx, e.clientY - a.sy) > 4) a.moved = true;
    if (state.lineStart) drawLinePreview(state.lineStart, resolvePoint(e, raw, { origin: state.lineStart }));
    else resolvePoint(e, raw);
  },
  up(e, raw) {
    const a = state.action;
    state.action = null;
    if (a && a.moved && state.lineStart) finishLine(state.lineStart, resolvePoint(e, raw, { origin: state.lineStart }));
  },
};

// free polygon: click corner by corner
function finishFree() {
  const pts = state.freePts;
  state.freePts = null;
  previewG.innerHTML = '';
  snapG.innerHTML = '';
  if (pts && pts.length >= 3) { addPolygons(pts); commitGeometry(); }
  else if (pts && pts.length === 2) { addLines(pts[0], pts[1]); commitGeometry(); }
  updateStageActions();
}
function drawFreePreview(p) {
  previewG.innerHTML = '';
  const pts = state.freePts;
  if (!pts || !pts.length) return;
  previewShape('polyline', [...pts, p]);
  if (pts.length >= 2) mk('line', { x1: p.x, y1: p.y, x2: pts[0].x, y2: pts[0].y, class: 'preview-ghost' }, previewG);
  drawMeasure(p, fmtLen(Geo.dist(pts[pts.length - 1], p)));
}
const freeTool = {
  down(e, raw) {
    if (!canDraw()) return;
    const pts = state.freePts || [];
    const last = pts[pts.length - 1];
    const p = resolvePoint(e, raw, { origin: last, extra: pts });
    if (pts.length >= 3 && Geo.dist(p, pts[0]) < px(SNAP_PX)) { finishFree(); return; }
    if (last && Geo.dist(last, p) < px(2)) return; // second press of a double-click
    pts.push({ x: p.x, y: p.y });
    state.freePts = pts;
    state.action = { type: 'free-press' }; // a second finger (pinch) takes this corner back
    drawFreePreview(p);
    updateStageActions();
  },
  move(e, raw) {
    const pts = state.freePts;
    const p = resolvePoint(e, raw, { origin: pts && pts[pts.length - 1], extra: pts || [] });
    if (pts) drawFreePreview(p);
  },
  up() { state.action = null; },
};

// regular polygon
function specFromCenter(c, r, rotDeg) {
  const n = state.sides;
  return { n, cx: c.x, cy: c.y, r, rot: rotDeg, pts: Geo.regularPolygon(n, c.x, c.y, r, rotDeg * Math.PI / 180) };
}
function ngonSpec(a) {
  const n = state.sides;
  if (state.ngonMode === 'center') {
    let rot = Math.atan2(a.b.y - a.a.y, a.b.x - a.a.x) * 180 / Math.PI;
    if (a.shift) rot = Math.round(rot / 15) * 15;
    const s = specFromCenter(a.a, Geo.dist(a.a, a.b), rot);
    if (!a.shift) s.pts[0] = { x: a.b.x, y: a.b.y };
    return s;
  }
  // from edge: a-b is one side; the polygon grows away from existing shapes (Ctrl flips)
  const L = Geo.dist(a.a, a.b);
  if (L < 1e-9) return null;
  const R = L / (2 * Math.sin(Math.PI / n)), ap = L / (2 * Math.tan(Math.PI / n));
  const ux = (a.b.x - a.a.x) / L, uy = (a.b.y - a.a.y) / L;
  const centerOn = (side) => ({ x: (a.a.x + a.b.x) / 2 - uy * ap * side, y: (a.a.y + a.b.y) / 2 + ux * ap * side });
  const occupied = (p) => allShapes().some(e => !isFill(e) && insideEl(e, p));
  let side = -1;
  if (occupied(centerOn(side)) && !occupied(centerOn(-side))) side = -side;
  if (a.flip) side = -side;
  const c = centerOn(side);
  const s = specFromCenter(c, R, Math.atan2(a.a.y - c.y, a.a.x - c.x) * 180 / Math.PI);
  s.pts[0] = { x: a.a.x, y: a.a.y };
  const i = Geo.dist(s.pts[1], a.b) < Geo.dist(s.pts[n - 1], a.b) ? 1 : n - 1;
  s.pts[i] = { x: a.b.x, y: a.b.y }; // keep the shared edge exact
  return s;
}
const ngonTool = {
  down(e, raw) {
    if (!canDraw()) return;
    const p = resolvePoint(e, raw);
    state.action = { type: 'ngon', a: { x: p.x, y: p.y }, b: { x: p.x, y: p.y }, sx: e.clientX, sy: e.clientY, moved: false };
  },
  move(e, raw) {
    const a = state.action;
    if (!a) { resolvePoint(e, raw); return; }
    if (Math.hypot(e.clientX - a.sx, e.clientY - a.sy) > 3) a.moved = true;
    a.b = resolvePoint(e, raw, { origin: state.ngonMode === 'edge' ? a.a : null });
    a.flip = e.ctrlKey || e.metaKey;
    a.shift = e.shiftKey;
    previewG.innerHTML = '';
    const s = a.moved && ngonSpec(a);
    if (s) {
      previewShape('polygon', s.pts);
      drawMeasure(a.b, `side ${fmtLen(2 * s.r * Math.sin(Math.PI / s.n))} · Ø ${fmtLen(2 * s.r)}`);
    }
  },
  up() {
    const a = state.action;
    state.action = null;
    previewG.innerHTML = '';
    if (!a) return;
    const s = a.moved ? ngonSpec(a) : (state.ngonMode === 'center' ? specFromCenter(a.a, state.lastRadius, state.lastRot) : null);
    if (!s || s.r < px(1)) return;
    state.lastRadius = s.r;
    state.lastRot = s.rot;
    savePrefs();
    addNgons(s);
    commitGeometry();
  },
};

// knife: cut a tile straight across, from edge to edge
function knifeCuts(a) {
  const out = [], seen = new Set();
  for (const t of symTransforms()) {
    const A = t(a.a), B = t(a.b), dir = { x: B.x - A.x, y: B.y - A.y };
    if (Math.hypot(dir.x, dir.y) < 1e-9) continue;
    const f = a.ix.locate(A);
    if (!f) continue;
    const r = a.ix.region(f), c = Geo.chordThrough(A, dir, [r.outer, ...r.holes]);
    if (!c) continue;
    const key = [ptKey(c.a), ptKey(c.b)].sort().join(' ');
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(c);
  }
  return out;
}
const knifeTool = {
  down(e, raw) {
    if (!canDraw()) return;
    state.action = { type: 'knife', a: raw, b: raw, ix: Geo.regionIndex(boundarySegments()), sx: e.clientX, sy: e.clientY, moved: false, cuts: [] };
    if (!state.action.ix.locate(raw)) { state.action = null; toast('Start the cut inside a closed area.'); showGaps(); }
  },
  move(e, raw) {
    const a = state.action;
    if (!a) return;
    if (Math.hypot(e.clientX - a.sx, e.clientY - a.sy) > 4) a.moved = true;
    a.b = e.shiftKey ? constrainAngle(a.a, raw) : raw;
    a.cuts = a.moved ? knifeCuts(a) : [];
    previewG.innerHTML = '';
    a.cuts.forEach((c, i) => mk('line', { x1: c.a.x, y1: c.a.y, x2: c.b.x, y2: c.b.y, ...(i ? { class: 'preview-ghost' } : previewStyle()) }, previewG));
    if (a.cuts[0]) drawMeasure(raw, fmtLen(Geo.dist(a.cuts[0].a, a.cuts[0].b)));
  },
  up() {
    const a = state.action;
    state.action = null;
    previewG.innerHTML = '';
    if (!a || !a.moved || !a.cuts.length) return;
    for (const c of a.cuts) mk('line', { x1: fmt(c.a.x), y1: fmt(c.a.y), x2: fmt(c.b.x), y2: fmt(c.b.y), ...shapeStyle() }, shapesG);
    commitGeometry();
  },
};

// pattern: fill a closed area (or the whole page) with tiles
function applyPattern(p) {
  if (!canDraw()) return;
  let region;
  if (p) {
    const ix = Geo.regionIndex(boundarySegments()), f = ix.locate(p);
    if (!f) { toast('Click inside a closed area (or use “Fill whole page”).'); showGaps(); return; }
    region = ix.region(f);
  } else {
    const pts = pagePts();
    region = { outer: pts, holes: [], area: state.doc.w * state.doc.h, bb: Geo.bounds(pts) };
  }
  const P = state.pattern;
  const origin = P.type === 'rings'
    ? (p || { x: state.doc.x + state.doc.w / 2, y: state.doc.y + state.doc.h / 2 })
    : { x: region.bb.x0, y: region.bb.y0 };
  const res = Patterns.build({
    type: P.type, size: P.size, angle: P.angle, origin, rings: [region.outer, ...region.holes],
    inside: (q) => insideRegion(region, q), eps: Geo.eps,
  });
  if (res.error) { toast(`That would be about ${res.estimate} tiles – make the tile size bigger.`); return; }
  const segs = res.segments;
  if (!segs.length) { toast('The tiles are bigger than this area.'); return; }
  if (segs.length > 3000 && !confirm(`This adds ${segs.length} lines, which may make editing slow. Continue?`)) return;
  for (const s of segs) mk('line', { x1: fmt(s.a.x), y1: fmt(s.a.y), x2: fmt(s.b.x), y2: fmt(s.b.y), ...shapeStyle() }, shapesG);
  commitGeometry();
  toast(`Added a ${Patterns.TYPES.find(t => t[0] === P.type)[1].toLowerCase()} pattern (${segs.length} lines).`);
}
const patternTool = {
  // applied on release, so a pinch / drag that starts here doesn't add a pattern
  down(e, raw) { state.action = { type: 'pattern', p: raw, sx: e.clientX, sy: e.clientY }; },
  move() {},
  up(e) {
    const a = state.action;
    state.action = null;
    if (a && a.type === 'pattern' && Math.hypot(e.clientX - a.sx, e.clientY - a.sy) < 8) applyPattern(a.p);
  },
};

// paint bucket – click, or drag across tiles
function paintPoints(p, ctx) {
  for (const t of symTransforms()) {
    const q = t(p), f = ctx.ix.locate(q);
    if (f && ctx.done.has(f)) continue;
    if (f) ctx.done.add(f);
    const r = bucketAt(q, state.fill, ctx, f);
    if (r.found) ctx.found = true;
    if (r.changed) ctx.changed = true;
  }
}
const bucketTool = {
  down(e, raw) {
    if (e.altKey) { eyedrop(e); return; }
    if (!editable('fills')) { toast('Painted areas are locked or hidden (see Layers).'); return; }
    const ctx = paintCtx();
    ctx.done = new Set();
    paintPoints(raw, ctx);
    state.action = { type: 'paint', ctx };
    if (!ctx.found) {
      const n = showGaps();
      toast(n ? 'No closed area here. The red circles show line ends that don’t touch anything.' : 'No closed area here – make sure the lines meet.');
    }
  },
  move(e, raw) {
    const a = state.action;
    if (a && a.type === 'paint') paintPoints(raw, a.ctx);
  },
  up() {
    const a = state.action;
    state.action = null;
    if (a && a.ctx.changed) commit();
  },
};

// select / edit
function refImage() { return refG.querySelector('image'); }
function inRef(p) {
  const im = refImage();
  if (!im) return false;
  const x = +im.getAttribute('x'), y = +im.getAttribute('y'), w = +im.getAttribute('width'), h = +im.getAttribute('height');
  return p.x >= x && p.x <= x + w && p.y >= y && p.y <= y + h;
}
const selectTool = {
  down(e, raw) {
    let h = null, hd = px(HANDLE_PX);
    for (const c of state.handles) {
      const d = Geo.dist(c, raw);
      if (d < hd) { hd = d; h = c; }
    }
    const base = { sx: e.clientX, sy: e.clientY, moved: false };
    if (h) {
      const ng = ngonData(h.el);
      if (ng && !(e.ctrlKey || e.metaKey)) {
        state.action = { ...base, type: 'ngon-resize', el: h.el, idx: h.idx, ng, inv: elMatrix(h.el).inverse(), exclude: new Set([h.el]) };
        return;
      }
      const targets = (state.link && !e.altKey) ? verticesAt(h) : [{ el: h.el, idx: h.idx }];
      if (!targets.length) targets.push({ el: h.el, idx: h.idx });
      for (const t of targets) t.inv = elMatrix(t.el).inverse();
      state.action = { ...base, type: 'vertex', targets, exclude: new Set(targets.map(t => t.el)) };
      return;
    }
    const hit = hitTest(raw);
    if (hit) {
      if (e.shiftKey) {
        if (state.selection.has(hit)) state.selection.delete(hit); else state.selection.add(hit);
        selectionChanged();
        return;
      }
      if (!state.selection.has(hit)) { state.selection.clear(); state.selection.add(hit); selectionChanged(); }
      const els = [...state.selection];
      // the vertex nearest to the grab point is what snaps while moving
      let anchor = raw, best = px(14);
      for (const el of els) for (const pl of geomOf(el).polys) for (const q of pl.pts) {
        const d = Geo.dist(q, raw);
        if (d < best) { best = d; anchor = q; }
      }
      state.action = { ...base, type: 'move', caps: els.map(capture), anchor: { x: anchor.x, y: anchor.y }, start: raw, exclude: new Set(els) };
      return;
    }
    if (!e.shiftKey && state.selection.size) { state.selection.clear(); selectionChanged(); }
    if (editable('ref') && inRef(raw)) {
      const im = refImage();
      state.action = { ...base, type: 'ref-move', start: raw, x0: +im.getAttribute('x'), y0: +im.getAttribute('y') };
      return;
    }
    state.action = { ...base, type: 'marquee', start: raw };
  },
  move(e, raw) {
    const a = state.action;
    if (!a) return;
    if (!a.moved && Math.hypot(e.clientX - a.sx, e.clientY - a.sy) < 3) return;
    a.moved = true;
    if (a.type === 'vertex') {
      const p = resolvePoint(e, raw, { exclude: a.exclude });
      for (const t of a.targets) setVertex(t.el, t.idx, applyM(t.inv, p));
      renderSelection();
    } else if (a.type === 'ngon-resize') {
      const p = resolvePoint(e, raw, { exclude: a.exclude });
      const q = applyM(a.inv, p), g = a.ng;
      const r = Math.hypot(q.x - g.cx, q.y - g.cy);
      if (r < 1e-6) return;
      let rot = Math.atan2(q.y - g.cy, q.x - g.cx) * 180 / Math.PI - a.idx * 360 / g.n;
      if (e.shiftKey) rot = Math.round(rot / 15) * 15;
      setNgon(a.el, { ...g, r, rot }, e.shiftKey ? null : q, a.idx);
      renderSelection();
      renderProps();
    } else if (a.type === 'move') {
      const target = { x: a.anchor.x + raw.x - a.start.x, y: a.anchor.y + raw.y - a.start.y };
      const p = resolvePoint(e, target, { exclude: a.exclude });
      const d = { x: p.x - a.anchor.x, y: p.y - a.anchor.y };
      for (const c of a.caps) applyMove(c, d);
      renderSelection();
    } else if (a.type === 'ref-move') {
      const im = refImage();
      im.setAttribute('x', fmt(a.x0 + raw.x - a.start.x));
      im.setAttribute('y', fmt(a.y0 + raw.y - a.start.y));
    } else if (a.type === 'marquee') {
      a.cur = raw;
      previewG.innerHTML = '';
      mk('rect', {
        x: Math.min(a.start.x, raw.x), y: Math.min(a.start.y, raw.y),
        width: Math.abs(raw.x - a.start.x), height: Math.abs(raw.y - a.start.y), class: 'marquee',
      }, previewG);
    }
  },
  up() {
    const a = state.action;
    state.action = null;
    previewG.innerHTML = '';
    snapG.innerHTML = '';
    if (!a || !a.moved) return;
    if (a.type === 'vertex') {
      for (const t of a.targets) t.el.removeAttribute('data-ngon');
      commitGeometry();
    } else if (a.type === 'ngon-resize') commitGeometry();
    else if (a.type === 'move') commitFor(a.caps.map(c => c.el));
    else if (a.type === 'ref-move') docChanged();
    else if (a.type === 'marquee' && a.cur) {
      const x0 = Math.min(a.start.x, a.cur.x), x1 = Math.max(a.start.x, a.cur.x);
      const y0 = Math.min(a.start.y, a.cur.y), y1 = Math.max(a.start.y, a.cur.y);
      for (const el of allShapes()) {
        if (!selectable(el)) continue;
        const b = geomOf(el).bbox;
        if (b.x0 >= x0 && b.x1 <= x1 && b.y0 >= y0 && b.y1 <= y1) state.selection.add(el);
      }
      selectionChanged();
    }
  },
};

const tools = {
  select: selectTool, line: lineTool, free: freeTool, ngon: ngonTool, knife: knifeTool,
  pattern: patternTool, bucket: bucketTool, pan: { down() {}, move() {}, up() {} },
};
const HINTS = {
  select: 'Click to select (Shift adds) · drag to move – the nearest corner snaps · drag handles to edit; shared corners move together (Alt detaches) · yellow handles resize a polygon',
  line: 'Click–click or drag · ends snap to points and onto other lines · Shift: 15° steps · Alt: no snap · Esc: stop',
  free: 'Click corner by corner · click the first corner, double-click or press Enter to close · Backspace removes the last corner · Esc cancels',
  ngon: 'Drag from the center (or along an edge in “From edge” mode) · click = last size · Shift: 15° rotation · Ctrl: flip side · keys 3–9: sides',
  knife: 'Drag across a tile to cut it straight through, edge to edge · Shift: 15° steps',
  pattern: 'Click inside a closed area to fill it with the chosen pattern',
  bucket: 'Click or drag across tiles to paint them · click again to recolor · ∅ swatch erases · Alt+click: pick a color',
  pan: 'Drag to pan · mouse wheel zooms',
};
function setTool(t) {
  if (EXPERT_TOOLS.has(t) && state.mode !== 'expert') t = 'select';
  cancelPending();
  state.tool = t;
  stage.dataset.tool = t;
  for (const b of $$('#tools button')) b.classList.toggle('active', b.dataset.tool === t);
  for (const s of $$('.tool-opts')) s.hidden = s.dataset.for !== t;
  $('#st-hint').textContent = HINTS[t];
}

// ---- reference photo -------------------------------------------------------------
function readAsDataURL(file) {
  return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(file); });
}
function loadImg(src) {
  return new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
}
async function loadPhoto(file) {
  let img;
  try { img = await loadImg(await readAsDataURL(file)); } catch { toast('Could not read that image.'); return; }
  // keep the saved file reasonably small
  const k = Math.min(1, 2400 / Math.max(img.naturalWidth, img.naturalHeight));
  const c = document.createElement('canvas');
  c.width = Math.round(img.naturalWidth * k);
  c.height = Math.round(img.naturalHeight * k);
  c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
  setPhoto(c.toDataURL('image/jpeg', 0.88), c.width, c.height);
  fitPhoto();
  state.layers.ref.visible = true;
  state.layers.ref.locked = true;
  applyLayers();
  savePrefs();
  docChanged();
  toast('Photo loaded and locked. Unlock it to move it with the Select tool.');
}
function setPhoto(href, nw, nh) {
  refG.innerHTML = '';
  if (!href) { renderPhotoUI(); return; }
  const im = mk('image', { href, preserveAspectRatio: 'none', 'data-nw': nw, 'data-nh': nh, x: 0, y: 0, width: nw, height: nh }, refG);
  im.style.opacity = state.refOpacity;
  renderPhotoUI();
}
function fitScale() {
  const im = refImage(), d = state.doc;
  return Math.min(d.w / +im.dataset.nw, d.h / +im.dataset.nh);
}
function fitPhoto() {
  const im = refImage();
  if (!im) return;
  const d = state.doc, s = fitScale(), w = +im.dataset.nw * s, h = +im.dataset.nh * s;
  im.setAttribute('x', fmt(d.x + (d.w - w) / 2)); im.setAttribute('y', fmt(d.y + (d.h - h) / 2));
  im.setAttribute('width', fmt(w)); im.setAttribute('height', fmt(h));
  renderPhotoUI();
}
function setPhotoSize(pct) {
  const im = refImage();
  if (!im) return;
  const x = +im.getAttribute('x'), y = +im.getAttribute('y'), w0 = +im.getAttribute('width'), h0 = +im.getAttribute('height');
  const s = fitScale() * pct / 100, w = +im.dataset.nw * s, h = +im.dataset.nh * s;
  im.setAttribute('x', fmt(x + (w0 - w) / 2)); im.setAttribute('y', fmt(y + (h0 - h) / 2));
  im.setAttribute('width', fmt(w)); im.setAttribute('height', fmt(h));
  docChanged();
}
function renderPhotoUI() {
  const im = refImage();
  $('#ref-controls').hidden = !im;
  $('#btn-ref-load').textContent = im ? 'Replace photo…' : 'Load photo…';
  if (im) $('#ref-size').value = Math.round(+im.getAttribute('width') / (+im.dataset.nw * fitScale()) * 100);
  $('#ref-opacity').value = Math.round(state.refOpacity * 100);
}

// ---- grout preview -----------------------------------------------------------------
function applyGrout() {
  const g = state.grout;
  shapesG.classList.toggle('grout', g.on);
  shapesG.style.setProperty('--grout-color', g.color);
  shapesG.style.setProperty('--grout-width', g.width + 'px');
}
const groutCSS = () => `#mosaic-shapes :not(.mz-fill):not(g){stroke:${state.grout.color}!important;stroke-width:${state.grout.width}px!important;stroke-linecap:round}`;
function bakeGrout() {
  let n = 0;
  for (const el of allShapes()) {
    if (isFill(el)) continue;
    setPaint(el, 'stroke', state.grout.color);
    el.setAttribute('stroke-width', state.grout.width);
    el.style.removeProperty('stroke-width');
    n++;
  }
  state.grout.on = false;
  $('#grout-on').checked = false;
  applyGrout();
  savePrefs();
  commit();
  toast(`Applied the grout color and width to ${n} lines.`);
}

// ---- selection commands -------------------------------------------------------
function deleteSel() {
  if (!state.selection.size) return;
  const els = [...state.selection];
  for (const el of els) el.remove();
  state.selection.clear();
  commitFor(els);
}
function duplicate() {
  if (!state.selection.size) return;
  const clones = [...state.selection].map(el => { const c = el.cloneNode(true); el.parentNode.appendChild(c); return c; });
  const off = state.grid ? state.gridSize : Math.max(state.doc.w, state.doc.h) / 100;
  moveElements(clones, { x: off, y: off });
  state.selection = new Set(clones);
  commitFor(clones);
}
function toFront() {
  for (const el of state.selection) el.parentNode.appendChild(el);
  if (state.selection.size) commit();
}
function toBack() {
  for (const el of [...state.selection].reverse()) el.parentNode.insertBefore(el, el.parentNode.firstChild);
  if (state.selection.size) commit();
}
function selectAll() {
  if (state.tool !== 'select') setTool('select');
  state.selection = new Set(allShapes().filter(selectable));
  selectionChanged();
}

// ---- files --------------------------------------------------------------------
/** opts.photo: include the reference photo (default: the user's setting). opts.grout: bake in the grout preview. */
function buildSVGString(opts = {}) {
  const d = state.doc, u = unit();
  const root = document.createElementNS(SVGNS, 'svg');
  root.setAttribute('viewBox', `${fmt(d.x)} ${fmt(d.y)} ${fmt(d.w)} ${fmt(d.h)}`);
  root.setAttribute('width', fmt(d.w) + (u === 'px' ? '' : u));
  root.setAttribute('height', fmt(d.h) + (u === 'px' ? '' : u));
  mk('metadata', { id: 'mosaic-palette' }, root).textContent = JSON.stringify({ palette: state.palette, paletteName: state.paletteName, unit: u });
  for (const c of defsG.childNodes) root.appendChild(c.cloneNode(true));
  if (opts.grout) mk('style', {}, root).textContent = groutCSS();
  if (d.bg) mk('rect', { id: 'mosaic-bg', x: d.x, y: d.y, width: d.w, height: d.h, fill: d.bg }, root);
  const im = refImage();
  if (im && (opts.photo ?? state.savePhoto)) {
    // hidden in other programs; Mosaic Paint shows it again as the tracing photo
    const g = mk('g', { id: 'mosaic-reference', visibility: 'hidden' }, root);
    const c = im.cloneNode(true);
    c.removeAttribute('style');
    c.setAttribute('data-opacity', state.refOpacity);
    g.appendChild(c);
  }
  const f = mk('g', { id: 'mosaic-fills' }, root);
  for (const c of fillsG.childNodes) f.appendChild(c.cloneNode(true));
  const s = mk('g', { id: 'mosaic-shapes' }, root);
  for (const c of shapesG.childNodes) s.appendChild(c.cloneNode(true));
  return '<?xml version="1.0" encoding="UTF-8"?>\n' + new XMLSerializer().serializeToString(root).replace(/></g, '>\n<');
}
function sanitize(root) {
  root.querySelectorAll('script,foreignObject').forEach(n => n.remove());
  for (const n of [root, ...root.querySelectorAll('*')]) {
    for (const a of [...n.attributes]) {
      if (/^on/i.test(a.name) || (/href$/i.test(a.name) && /^\s*javascript:/i.test(a.value))) n.removeAttribute(a.name);
    }
  }
}
/** Straight-line single-part paths become polygons / polylines so their corners can be edited. */
function convertLinearPaths() {
  for (const p of [...shapesG.querySelectorAll('path')]) {
    if (p.closest('defs,clipPath,mask,pattern,symbol,marker') || isFill(p)) continue;
    const polys = linearPath(p.getAttribute('d') || '');
    if (!polys || polys.length !== 1 || polys[0].pts.length < 2) continue;
    const n = document.createElementNS(SVGNS, polys[0].closed ? 'polygon' : 'polyline');
    for (const a of p.attributes) if (a.name !== 'd') n.setAttributeNS(a.namespaceURI, a.name, a.value);
    n.setAttribute('points', ptsStr(polys[0].pts));
    p.replaceWith(n);
  }
}
/** opts.restore: autosave / version (don't import its palette). opts.name: file name for a new palette. */
function loadSVGText(text, opts = {}) {
  const xml = new DOMParser().parseFromString(text, 'image/svg+xml');
  const root = xml.documentElement;
  if (!root || root.localName !== 'svg' || xml.getElementsByTagName('parsererror').length) {
    if (!opts.quiet) toast('Could not read this file as SVG.');
    return false;
  }
  sanitize(root);
  const vb = (root.getAttribute('viewBox') || '').trim().split(/[\s,]+/).map(Number);
  const hasVB = vb.length === 4 && vb.every(Number.isFinite) && vb[2] > 0 && vb[3] > 0;
  const box = hasVB ? { x: vb[0], y: vb[1], w: vb[2], h: vb[3] }
    : { x: 0, y: 0, w: parseFloat(root.getAttribute('width')) || 1000, h: parseFloat(root.getAttribute('height')) || 1000 };
  const ours = !!root.querySelector('[id="mosaic-shapes"]');
  // 1 unit = 1 mm / cm / in when the size is given in that unit and matches the viewBox
  const wm = /^\s*([\d.]+)\s*(mm|cm|in)\s*$/.exec(root.getAttribute('width') || '');
  let docUnit = wm && hasVB && Math.abs(+wm[1] - box.w) <= box.w * 1e-6 + 1e-9 ? wm[2] : 'px';
  cancelPending();
  defsG.innerHTML = '';
  fillsG.innerHTML = '';
  shapesG.innerHTML = '';
  let wrap = shapesG, bg = null, photo = null, meta = null;
  if (!ours) {
    // keep styling set on the root <svg> (fill, stroke, style…) by moving it to a group
    const keep = [...root.attributes].filter(a => !a.name.includes(':') && !/^(xmlns|viewBox|width|height|version|x|y|id|preserveAspectRatio|baseProfile|enable-background)$/i.test(a.name));
    if (keep.length) {
      wrap = mk('g', {}, shapesG);
      for (const a of keep) wrap.setAttribute(a.name, a.value);
    }
  }
  for (const child of [...root.children]) {
    const id = child.getAttribute('id'), tag = child.localName;
    if (id === 'mosaic-palette') {
      try { meta = JSON.parse(child.textContent); } catch { /* ignore */ }
      continue;
    }
    if (id === 'mosaic-bg') { bg = child.getAttribute('fill'); continue; }
    if (id === 'mosaic-reference') { photo = child.querySelector('image'); continue; }
    if (['metadata', 'title', 'desc', 'namedview'].includes(tag)) continue;
    if (tag === 'defs' || tag === 'style') { defsG.appendChild(document.importNode(child, true)); continue; }
    if (id === 'mosaic-fills' || id === 'mosaic-shapes') {
      const dest = id === 'mosaic-fills' ? fillsG : shapesG;
      for (const c of [...child.childNodes]) dest.appendChild(document.importNode(c, true));
      continue;
    }
    wrap.appendChild(document.importNode(child, true));
  }
  convertLinearPaths();
  if (Array.isArray(meta)) meta = { palette: meta };
  if (meta && meta.unit) docUnit = meta.unit;
  if (meta && Array.isArray(meta.palette) && !opts.restore) importPalette(meta.palette.map(normColor).filter(Boolean), meta.paletteName || opts.name);
  state.doc = { ...box, bg: ours ? bg : null, unit: docUnit };
  if (photo) {
    const href = photo.getAttribute('href') || photo.getAttributeNS('http://www.w3.org/1999/xlink', 'href');
    setPhoto(href, +photo.getAttribute('data-nw') || 1, +photo.getAttribute('data-nh') || 1);
    const im = refImage();
    for (const k of ['x', 'y', 'width', 'height']) im.setAttribute(k, photo.getAttribute(k));
    const op = parseFloat(photo.getAttribute('data-opacity'));
    if (op >= 0) { state.refOpacity = op; im.style.opacity = op; }
    renderPhotoUI();
  } else setPhoto(null);
  state.selection.clear();
  touch();
  applyDoc();
  applyGrout();
  applyLayers();
  resetHistory();
  dirty = false;
  fitView();
  afterChange();
  return true;
}
/** A palette stored in an opened file becomes its own named palette, unless it already exists. */
function importPalette(colors, name) {
  if (!colors.length) return;
  const same = (a) => a.length === colors.length && colors.every(c => a.includes(c));
  const existing = Object.keys(state.palettes).find(k => same(state.palettes[k]));
  if (existing) { switchPalette(existing); return; }
  const n = uniqueName((name || 'From file').replace(/\.svg$/i, ''));
  state.palettes[n] = colors;
  switchPalette(n);
  toast(`The file’s colors were added as the palette “${n}”.`);
}
function confirmDiscard() {
  return !dirty || confirm('Discard unsaved changes to the current drawing?\n(A copy is kept in History.)');
}
async function openFile() {
  if (!confirmDiscard()) return;
  if (window.showOpenFilePicker) {
    try {
      const [h] = await window.showOpenFilePicker({ types: [{ description: 'SVG image', accept: { 'image/svg+xml': ['.svg'] } }] });
      const f = await h.getFile();
      if (await openText(await f.text(), f.name)) fileHandle = h;
      return;
    } catch (err) {
      if (err.name === 'AbortError') return;
    }
  }
  $('#file-input').click();
}
async function openText(text, name) {
  if (hasContent()) await saveVersion('Before opening ' + name);
  if (!loadSVGText(text, { name })) return false;
  fileHandle = null;
  fileName = name;
  updateTitle();
  scheduleAutosave();
  toast('Opened ' + name);
  return true;
}
async function loadFile(f) {
  if (f) await openText(await f.text(), f.name);
}
async function save(as) {
  const text = buildSVGString();
  if (window.showSaveFilePicker) {
    try {
      if (!fileHandle || as) {
        fileHandle = await window.showSaveFilePicker({ suggestedName: fileName, types: [{ description: 'SVG image', accept: { 'image/svg+xml': ['.svg'] } }] });
      }
      const w = await fileHandle.createWritable();
      await w.write(text);
      await w.close();
      fileName = fileHandle.name;
      dirty = false;
      updateTitle();
      scheduleAutosave();
      toast('Saved ' + fileName);
      return;
    } catch (err) {
      if (err.name === 'AbortError') return;
      fileHandle = null; // fall back to a normal download
    }
  }
  if (as) {
    const n = prompt('File name:', fileName);
    if (!n) return;
    fileName = /\.svg$/i.test(n) ? n : n + '.svg';
  }
  download(new Blob([text], { type: 'image/svg+xml' }), fileName);
  dirty = false;
  updateTitle();
}
function exportPNG() {
  const d = state.doc;
  const def = unit() === 'px' ? Math.max(d.w, 2000) : 3000;
  const ans = prompt('PNG width in pixels:', String(Math.round(def)));
  if (!ans) return;
  const W = Math.round(+ans);
  if (!(W > 0 && W <= 16000)) { toast('Invalid width.'); return; }
  const H = Math.max(1, Math.round(W * d.h / d.w));
  const url = URL.createObjectURL(new Blob([buildSVGString({ photo: false, grout: state.grout.on })], { type: 'image/svg+xml' }));
  const img = new Image();
  img.onload = () => {
    const c = document.createElement('canvas');
    c.width = W;
    c.height = H;
    c.getContext('2d').drawImage(img, 0, 0, W, H);
    URL.revokeObjectURL(url);
    c.toBlob(b => b ? download(b, fileName.replace(/\.svg$/i, '') + '.png') : toast('PNG export failed.'), 'image/png');
  };
  img.onerror = () => { URL.revokeObjectURL(url); toast('PNG export failed.'); };
  img.src = url;
}
function resetDoc(keepSize) {
  cancelPending();
  defsG.innerHTML = '';
  fillsG.innerHTML = '';
  shapesG.innerHTML = '';
  setPhoto(null);
  const d = state.doc;
  state.doc = keepSize ? { x: 0, y: 0, w: d.w, h: d.h, bg: '#ffffff', unit: unit() } : { x: 0, y: 0, w: 300, h: 300, bg: '#ffffff', unit: 'mm' };
  state.selection.clear();
  fileHandle = null;
  fileName = 'mosaic.svg';
  touch();
  applyDoc();
  applyGrout();
  resetHistory();
  dirty = false;
  fitView();
  afterChange();
}
async function newDoc() {
  if (!confirmDiscard()) return;
  if (hasContent()) await saveVersion('Before starting a new drawing');
  resetDoc(true);
}

// ---- mode -------------------------------------------------------------------
function setMode(m) {
  state.mode = m === 'expert' ? 'expert' : 'simple';
  document.body.dataset.mode = state.mode;
  for (const b of $$('#mode-switch button')) b.classList.toggle('active', b.dataset.mode === state.mode);
  if (EXPERT_TOOLS.has(state.tool) && state.mode !== 'expert') setTool('select');
  savePrefs();
  applyLayers();
  applyDoc();
  updateView();
  emit('mode');
}

// ---- events -----------------------------------------------------------------
function setTouch(on) {
  SNAP_PX = on ? 18 : 10;
  HANDLE_PX = on ? 18 : 9;
  HIT_PX = on ? 12 : 6;
}
const pointers = new Map();
let pinch = null, pinchDone = false;
function startPinch() {
  // a second finger turns the gesture into pan / zoom; drop whatever the first finger began
  const a = state.action;
  if (a && ((a.moved && ['move', 'vertex', 'ngon-resize'].includes(a.type)) || (a.type === 'paint' && a.ctx.changed))) restore(history[hIndex]);
  if (a && a.type === 'free-press' && state.freePts) {
    state.freePts.pop();
    if (!state.freePts.length) state.freePts = null;
  }
  if (state.tool !== 'free' && !(state.tool === 'line' && state.chain)) state.lineStart = null;
  state.action = null;
  previewG.innerHTML = '';
  snapG.innerHTML = '';
  const [p1, p2] = [...pointers.values()];
  pinch = { d0: Math.hypot(p1.x - p2.x, p1.y - p2.y) || 1, m0: { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 }, view: { ...state.view } };
  pinchDone = true;
}
function movePinch() {
  const [p1, p2] = [...pointers.values()];
  const d = Math.hypot(p1.x - p2.x, p1.y - p2.y) || 1, m = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
  const r = svg.getBoundingClientRect(), v0 = pinch.view;
  const s = clamp(v0.s * d / pinch.d0, 0.005, 2000);
  const docPt = { x: v0.x + (pinch.m0.x - r.left) / v0.s, y: v0.y + (pinch.m0.y - r.top) / v0.s };
  state.view = { s, x: docPt.x - (m.x - r.left) / s, y: docPt.y - (m.y - r.top) / s };
  updateView();
}
function capturePointer(e) { try { svg.setPointerCapture(e.pointerId); } catch { /* pointer already gone */ } }
svg.addEventListener('pointerdown', (e) => {
  setTouch(e.pointerType === 'touch' || e.pointerType === 'pen');
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (pointers.size === 2) { startPinch(); return; }
  if (pointers.size > 2 || pinch) return;
  pinchDone = false;
  if (e.button === 2) {
    if (state.lineStart || state.action || state.freePts) cancelPending();
    return;
  }
  const raw = toDoc(e.clientX, e.clientY);
  if (state.pickCenter && e.button === 0) {
    const p = snapPoint(raw);
    state.sym.cx = p.x;
    state.sym.cy = p.y;
    state.pickCenter = false;
    $('#btn-sym-center').classList.remove('active');
    savePrefs();
    drawGuides();
    toast('Symmetry center set.');
    return;
  }
  if (e.button === 1 || state.space || state.tool === 'pan') {
    e.preventDefault();
    state.action = { type: 'pan', cx: e.clientX, cy: e.clientY, vx: state.view.x, vy: state.view.y };
    capturePointer(e);
    stage.classList.add('panning');
    return;
  }
  if (e.button !== 0) return;
  capturePointer(e);
  tools[state.tool].down(e, raw);
  updateStageActions();
});
svg.addEventListener('pointermove', (e) => {
  if (pointers.has(e.pointerId)) pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (pinch) { if (pointers.size >= 2) movePinch(); return; }
  if (pinchDone) return;
  const raw = toDoc(e.clientX, e.clientY);
  $('#st-pos').textContent = `x ${raw.x.toFixed(1)}  y ${raw.y.toFixed(1)} ${unit()}`;
  const a = state.action;
  if (a && a.type === 'pan') {
    state.view.x = a.vx - (e.clientX - a.cx) / state.view.s;
    state.view.y = a.vy - (e.clientY - a.cy) / state.view.s;
    updateView();
    return;
  }
  if (state.space) return;
  if (e.pointerType === 'touch' && !pointers.has(e.pointerId)) return;
  tools[state.tool].move(e, raw);
});
function pointerEnd(e) {
  pointers.delete(e.pointerId);
  if (pinch || pinchDone) {
    if (pointers.size < 2) pinch = null;
    if (!pointers.size) pinchDone = false;
    return true;
  }
  return false;
}
svg.addEventListener('pointerup', (e) => {
  if (pointerEnd(e)) return;
  const a = state.action;
  if (a && a.type === 'pan') { state.action = null; stage.classList.remove('panning'); return; }
  if (e.button !== 0) return;
  tools[state.tool].up(e, toDoc(e.clientX, e.clientY));
  updateStageActions();
});
svg.addEventListener('pointercancel', (e) => {
  pointerEnd(e);
  if (state.action && state.action.type === 'paint' && state.action.ctx.changed) commit();
  state.action = null;
  previewG.innerHTML = '';
  stage.classList.remove('panning');
});
svg.addEventListener('pointerleave', () => { if (!state.action) snapG.innerHTML = ''; });
svg.addEventListener('dblclick', () => { if (state.tool === 'free' && state.freePts) finishFree(); });
svg.addEventListener('contextmenu', (e) => e.preventDefault());
svg.addEventListener('wheel', (e) => {
  e.preventDefault();
  const dy = e.deltaMode === 1 ? e.deltaY * 30 : e.deltaY;
  zoomAt(e.clientX, e.clientY, Math.exp(-dy * 0.0015));
}, { passive: false });
new ResizeObserver(() => updateView()).observe(stage);

window.addEventListener('keydown', (e) => {
  const tag = e.target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
    if (e.key === 'Escape') e.target.blur();
    return;
  }
  if (document.querySelector('dialog[open]')) return;
  const ctrl = e.ctrlKey || e.metaKey, k = e.key.toLowerCase();
  if (ctrl) {
    if (k === 'z' && !e.shiftKey) undo();
    else if (k === 'y' || (k === 'z' && e.shiftKey)) redo();
    else if (k === 's') save(e.shiftKey);
    else if (k === 'o') openFile();
    else if (k === 'd') duplicate();
    else if (k === 'a') selectAll();
    else return;
    e.preventDefault();
    return;
  }
  if (e.key === ' ') {
    if (!state.space) { state.space = true; stage.classList.add('space'); }
    e.preventDefault();
    return;
  }
  const nudge = (dx, dy) => {
    if (!state.selection.size) return;
    const s = state.grid ? state.gridSize : (e.shiftKey ? 10 : 1);
    moveElements([...state.selection], { x: dx * s, y: dy * s });
    commitFor(state.selection);
  };
  switch (k) {
    case 'v': setTool('select'); break;
    case 'l': setTool('line'); break;
    case 'p': setTool('free'); break;
    case 'g': case 'n': setTool('ngon'); break;
    case 'k': setTool('knife'); break;
    case 't': setTool('pattern'); break;
    case 'b': case 'f': setTool('bucket'); break;
    case 'h': setTool('pan'); break;
    case 's': state.snap = !state.snap; $('#opt-snap').checked = state.snap; savePrefs(); toast('Snapping ' + (state.snap ? 'on' : 'off')); break;
    case 'enter': if (state.freePts) finishFree(); else if (state.lineStart) cancelPending(); break;
    case 'delete': case 'backspace':
      if (state.freePts) {
        state.freePts.pop();
        if (!state.freePts.length) state.freePts = null;
        drawFreePreview(state.freePts ? state.freePts[state.freePts.length - 1] : { x: 0, y: 0 });
        updateStageActions();
      } else deleteSel();
      break;
    case 'escape':
      cancelPending();
      if (state.pickCenter) { state.pickCenter = false; $('#btn-sym-center').classList.remove('active'); }
      if (state.selection.size) { state.selection.clear(); selectionChanged(); }
      break;
    case '0': fitView(); break;
    case '+': case '=': zoomCenter(1.25); break;
    case '-': case '_': zoomCenter(0.8); break;
    case 'arrowleft': nudge(-1, 0); break;
    case 'arrowright': nudge(1, 0); break;
    case 'arrowup': nudge(0, -1); break;
    case 'arrowdown': nudge(0, 1); break;
    default:
      if (/^[3-9]$/.test(k)) { setSides(+k); if (state.tool !== 'ngon') setTool('ngon'); } else return;
  }
  e.preventDefault();
});
window.addEventListener('keyup', (e) => {
  if (e.key === ' ') { state.space = false; stage.classList.remove('space'); }
});
window.addEventListener('blur', () => { state.space = false; stage.classList.remove('space'); });

// paste colors anywhere outside a text field
document.addEventListener('paste', (e) => {
  const tag = e.target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA') return;
  const text = e.clipboardData && e.clipboardData.getData('text');
  if (!text) return;
  const cols = Colors.parse(text);
  if (!cols.length) { toast('The clipboard has no color codes.'); return; }
  const n = addColors(cols);
  if (cols.length === 1) setFill(cols[0], false);
  toast(n ? `Added ${n} color${n > 1 ? 's' : ''} from the clipboard.` : 'Those colors are already in the palette.');
});

// drag & drop an SVG (opens it) or a photo (becomes the tracing photo)
stage.addEventListener('dragover', (e) => { e.preventDefault(); stage.classList.add('drop'); });
stage.addEventListener('dragleave', () => stage.classList.remove('drop'));
stage.addEventListener('drop', (e) => {
  e.preventDefault();
  stage.classList.remove('drop');
  const f = e.dataTransfer.files[0];
  if (!f) return;
  if (/^image\//.test(f.type) && !/svg/.test(f.type)) loadPhoto(f);
  else if (confirmDiscard()) loadFile(f);
});

// ---- panel bindings ------------------------------------------------------------
function setSides(n) {
  state.sides = clamp(Math.round(n) || 6, 3, 64);
  $('#opt-sides').value = state.sides;
  for (const b of $$('#quick-sides button')) b.classList.toggle('active', +b.dataset.sides === state.sides);
  savePrefs();
}
function bindCheck(id, key, after) {
  const i = $(id);
  i.checked = !!state[key];
  i.onchange = () => { state[key] = i.checked; savePrefs(); if (after) after(); };
}
function bindNumber(id, get, set) {
  const i = $(id);
  i.value = get();
  i.onchange = () => { const v = parseFloat(i.value); if (Number.isFinite(v) && set(v) !== false) savePrefs(); i.value = get(); };
}
function bindPanel() {
  for (const b of $$('#tools button')) b.onclick = () => setTool(b.dataset.tool);
  for (const b of $$('#mode-switch button')) b.onclick = () => setMode(b.dataset.mode);
  $('#btn-new').onclick = newDoc;
  $('#btn-open').onclick = openFile;
  $('#file-input').onchange = (e) => { loadFile(e.target.files[0]); e.target.value = ''; };
  $('#btn-save').onclick = () => save(false);
  $('#btn-saveas').onclick = () => save(true);
  $('#btn-png').onclick = exportPNG;
  $('#btn-undo').onclick = undo;
  $('#btn-redo').onclick = redo;
  $('#btn-fit').onclick = fitView;
  $('#btn-zoomin').onclick = () => zoomCenter(1.25);
  $('#btn-zoomout').onclick = () => zoomCenter(0.8);
  $('#sa-finish').onclick = () => { if (state.freePts) finishFree(); else cancelPending(); };
  $('#sa-back').onclick = () => {
    if (!state.freePts) return;
    state.freePts.pop();
    if (!state.freePts.length) state.freePts = null;
    previewG.innerHTML = '';
    updateStageActions();
  };
  $('#sa-cancel').onclick = cancelPending;

  // colors & palettes
  const inp = $('#color-input');
  $('#btn-add-color').onclick = addFromInput;
  inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') addFromInput(); });
  inp.addEventListener('input', updateColorPreview);
  inp.addEventListener('paste', () => setTimeout(() => { if (Colors.parse(inp.value).length) addFromInput(); }, 0));
  $('#btn-swap').onclick = () => { const f = state.fill; state.fill = state.stroke; state.stroke = f; savePrefs(); renderPalette(); };
  bindNumber('#stroke-width', () => state.strokeWidth, (v) => { if (v < 0) return false; state.strokeWidth = v; });
  $('#pal-select').onchange = (e) => switchPalette(e.target.value);
  $('#btn-pal-new').onclick = () => {
    const n = prompt('Name of the new palette:', uniqueName('Palette'));
    if (!n || !n.trim()) return;
    const name = uniqueName(n.trim());
    state.palettes[name] = [];
    switchPalette(name);
    toast(`Created “${name}”. Paste colors to fill it.`);
  };
  $('#btn-pal-rename').onclick = () => {
    const old = state.paletteName, n = prompt('Rename palette:', old);
    if (!n || !n.trim() || n.trim() === old) return;
    const name = uniqueName(n.trim()), next = {};
    for (const k of Object.keys(state.palettes)) next[k === old ? name : k] = state.palettes[k];
    state.palettes = next;
    switchPalette(name);
  };
  $('#btn-pal-delete').onclick = () => {
    if (!confirm(`Delete the palette “${state.paletteName}”? (The drawing is not changed.)`)) return;
    delete state.palettes[state.paletteName];
    if (!Object.keys(state.palettes).length) state.palettes['My palette'] = [];
    switchPalette(Object.keys(state.palettes)[0]);
  };
  $('#btn-pal-doc').onclick = () => {
    const cols = [];
    for (const el of allShapes()) {
      cols.push(fillOf(el));
      if (!isFill(el)) cols.push(normColor(getComputedStyle(el).stroke));
    }
    const n = addColors(cols);
    toast(n ? `Added ${n} color${n > 1 ? 's' : ''} from the drawing.` : 'No new colors in the drawing.');
  };
  $('#btn-pal-export').onclick = () => download(new Blob([state.palette.join('\n') + '\n'], { type: 'text/plain' }), state.paletteName + '.txt');
  $('#btn-pal-clear').onclick = () => { if (confirm('Remove all colors from this palette? (The drawing is not changed.)')) { state.palette = []; savePrefs(); renderPalette(); } };
  $('#btn-pal-import').onclick = () => $('#pal-file').click();
  $('#pal-file').onchange = async (e) => {
    const f = e.target.files[0];
    e.target.value = '';
    if (!f) return;
    const n = addColors(Colors.parse(await f.text()));
    toast(n ? `Imported ${n} color${n > 1 ? 's' : ''}.` : 'No new colors found in ' + f.name);
  };

  // tool options
  bindCheck('#opt-chain', 'chain', () => { if (!state.chain) cancelPending(); });
  const sides = $('#opt-sides');
  sides.onchange = () => setSides(+sides.value);
  for (const b of $$('#quick-sides button')) b.onclick = () => setSides(+b.dataset.sides);
  setSides(state.sides);
  for (const r of $$('input[name=ngmode]')) {
    r.checked = r.value === state.ngonMode;
    r.onchange = () => { if (r.checked) { state.ngonMode = r.value; savePrefs(); } };
  }
  bindCheck('#opt-newfill', 'newFill');
  bindCheck('#opt-newfill2', 'newFill', () => { $('#opt-newfill').checked = state.newFill; });
  $('#opt-newfill').addEventListener('change', () => { $('#opt-newfill2').checked = state.newFill; });
  const pt = $('#pat-type');
  for (const [v, label] of Patterns.TYPES) { const o = document.createElement('option'); o.value = v; o.textContent = label; pt.append(o); }
  pt.value = state.pattern.type;
  pt.onchange = () => { state.pattern.type = pt.value; savePrefs(); };
  bindNumber('#pat-size', () => state.pattern.size, (v) => { if (!(v > 0)) return false; state.pattern.size = v; });
  bindNumber('#pat-angle', () => state.pattern.angle, (v) => { state.pattern.angle = v; });
  $('#btn-pat-page').onclick = () => applyPattern(null);

  // snapping & gaps
  bindCheck('#opt-snap', 'snap');
  bindCheck('#opt-link', 'link');
  bindCheck('#opt-border', 'border');
  bindCheck('#opt-grid', 'grid', applyDoc);
  bindNumber('#opt-gridsize', () => state.gridSize, (v) => { if (!(v > 0)) return false; state.gridSize = v; applyDoc(); });
  $('#opt-gap').onchange = () => {
    const v = parseFloat($('#opt-gap').value);
    if (v >= 0) { state.gapPct = v / Math.max(state.doc.w, state.doc.h) * 100; savePrefs(); }
    $('#opt-gap').value = fmt(gapTol());
  };

  // symmetry
  const st = $('#sym-type');
  st.value = state.sym.type;
  const symUI = () => { $('#sym-radial').hidden = state.sym.type !== 'radial'; drawGuides(); savePrefs(); };
  st.onchange = () => { state.sym.type = st.value; symUI(); };
  bindNumber('#sym-n', () => state.sym.n, (v) => { state.sym.n = clamp(Math.round(v), 2, 64); drawGuides(); });
  $('#sym-mirror').checked = state.sym.mirror;
  $('#sym-mirror').onchange = () => { state.sym.mirror = $('#sym-mirror').checked; symUI(); };
  $('#btn-sym-center').onclick = () => {
    state.pickCenter = !state.pickCenter;
    $('#btn-sym-center').classList.toggle('active', state.pickCenter);
    if (state.pickCenter) toast('Click on the canvas to place the symmetry center.');
  };
  $('#btn-sym-reset').onclick = () => { state.sym.cx = state.sym.cy = null; savePrefs(); drawGuides(); };
  symUI();

  // layers
  for (const b of $$('[data-layer]')) b.onclick = () => {
    const L = state.layers[b.dataset.layer], k = b.dataset.prop;
    L[k] = !L[k];
    savePrefs();
    applyLayers();
  };

  // reference photo
  $('#btn-ref-load').onclick = () => $('#ref-file').click();
  $('#ref-file').onchange = (e) => { const f = e.target.files[0]; e.target.value = ''; if (f) loadPhoto(f); };
  $('#ref-opacity').oninput = (e) => {
    state.refOpacity = +e.target.value / 100;
    const im = refImage();
    if (im) im.style.opacity = state.refOpacity;
  };
  $('#ref-opacity').onchange = () => { savePrefs(); docChanged(); };
  $('#ref-show').onchange = (e) => { state.layers.ref.visible = e.target.checked; savePrefs(); applyLayers(); };
  $('#ref-lock').onchange = (e) => {
    state.layers.ref.locked = e.target.checked;
    savePrefs();
    applyLayers();
    if (!e.target.checked) toast('Photo unlocked: drag it with the Select tool (where there are no shapes).');
  };
  $('#ref-size').onchange = (e) => setPhotoSize(clamp(+e.target.value || 100, 5, 1000));
  $('#btn-ref-fit').onclick = () => { fitPhoto(); docChanged(); };
  $('#btn-ref-remove').onclick = () => { if (confirm('Remove the tracing photo?')) { setPhoto(null); docChanged(); } };
  bindCheck('#ref-save', 'savePhoto', docChanged);
  bindCheck('#opt-unpainted', 'onlyUnpainted');

  // grout
  const g = state.grout;
  $('#grout-on').checked = g.on;
  $('#grout-on').onchange = (e) => { g.on = e.target.checked; applyGrout(); savePrefs(); };
  $('#grout-color').value = g.color;
  $('#grout-color').oninput = (e) => { g.color = e.target.value; applyGrout(); };
  $('#grout-color').onchange = savePrefs;
  bindNumber('#grout-width', () => g.width, (v) => { if (v < 0) return false; g.width = v; applyGrout(); });
  $('#btn-grout-bake').onclick = bakeGrout;

  // selection
  const ngonInput = () => {
    const el = [...state.selection][0], gd = ngonData(el);
    if (!gd) return;
    const n = clamp(Math.round(+$('#sel-sides').value) || gd.n, 3, 64);
    const r = +$('#sel-radius').value > 0 ? +$('#sel-radius').value : gd.r;
    const rot = Number.isFinite(+$('#sel-rot').value) ? +$('#sel-rot').value : gd.rot;
    setNgon(el, { ...gd, n, r, rot });
    commitGeometry();
  };
  for (const id of ['#sel-sides', '#sel-radius', '#sel-rot']) $(id).onchange = ngonInput;
  $('#sel-sw').onchange = () => {
    const v = parseFloat($('#sel-sw').value);
    if (!(v >= 0)) return;
    for (const el of state.selection) {
      if (isFill(el)) continue;
      el.setAttribute('stroke-width', v);
      el.style.removeProperty('stroke-width');
    }
    commit();
  };
  $('#btn-del').onclick = deleteSel;
  $('#btn-dup').onclick = duplicate;
  $('#btn-front').onclick = toFront;
  $('#btn-back').onclick = toBack;

  // page
  $('#btn-doc-size').onclick = () => {
    const w = parseFloat($('#doc-w').value), h = parseFloat($('#doc-h').value);
    if (!(w > 0 && h > 0)) { toast('Invalid page size.'); return; }
    state.doc.w = w;
    state.doc.h = h;
    applyDoc();
    commitGeometry();
    fitView();
  };
  $('#doc-unit').onchange = (e) => {
    state.doc.unit = e.target.value;
    applyDoc();
    commit();
    toast(`1 drawing unit = 1 ${unit()}. Set the page size to the real size of your mosaic.`);
  };
  $('#doc-bg').onchange = () => { state.doc.bg = $('#doc-bg').value; applyDoc(); commit(); };
  $('#doc-bg-none').onchange = () => { state.doc.bg = $('#doc-bg-none').checked ? null : $('#doc-bg').value; applyDoc(); commit(); };
  bindCheck('#opt-rulers', 'rulers', () => emit('view'));
}

// ---- start ----------------------------------------------------------------------
loadPrefs();
bindPanel();
renderPaletteSelect();
document.body.dataset.mode = state.mode;
for (const b of $$('#mode-switch button')) b.classList.toggle('active', b.dataset.mode === state.mode);
applyDoc();
applyGrout();
applyLayers();
renderPhotoUI();
setTool('select');
resetHistory();
afterChange();
dirty = false;
updateTitle();
requestAnimationFrame(fitView);

(async () => {
  let rec = null;
  try { rec = await Store.get('current'); } catch { /* IndexedDB unavailable */ }
  const text = (rec && rec.svg) || lsGet('mz-autosave');
  if (text && loadSVGText(text, { quiet: true, restore: true })) {
    if (rec && rec.fileName) fileName = rec.fileName;
    dirty = false;
    updateTitle();
  }
  restored = true;
  window.MZ.ready = true;
  emit('ready');
})();

// ---- API for the add-on features (features.js) and for debugging ---------------------
window.MZ = {
  state, svg, stage, on, emit, toast, download, fmt, fmtLen, fmtArea, unit, mk,
  allShapes, geomOf, isFill, hasFill, fillOf, insideEl, isPaintedAt, paintFill, replaceColor,
  boundarySegments, bucketAt, gridSample, insideRegion, commit, commitGeometry, refImage, loadImg,
  buildSVGString, loadSVGText, saveVersion, restoreVersion, confirmDiscard, hasContent, setMode, setTool,
  get fileName() { return fileName; },
};
})();
