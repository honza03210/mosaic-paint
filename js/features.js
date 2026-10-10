/* Mosaic Paint – features built on the editor core (window.MZ): tile report, printable template,
   version history, auto-coloring from the photo, rulers, install / offline and the phone layout. */
(() => {
'use strict';

const $ = (s) => document.querySelector(s);
const { state } = MZ;
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// ---- colors used in the drawing -----------------------------------------------------
/** color → { tiles, area } for every painted area / filled shape. */
function colorStats() {
  const map = new Map();
  for (const el of MZ.allShapes()) {
    const c = MZ.fillOf(el);
    if (!c) continue;
    let a = MZ.isFill(el) ? Math.abs(+el.dataset.area) : 0;
    if (!a) a = MZ.geomOf(el).polys.filter(p => p.closed).reduce((s, p) => s + Math.abs(Geo.polygonArea(p.pts)), 0);
    const e = map.get(c) || { tiles: 0, area: 0 };
    e.tiles++;
    e.area += a;
    map.set(c, e);
  }
  return map;
}
/** Number of each used color: its position in the palette, then the rest after it. */
function colorNumbers(colors) {
  const pal = state.palette, out = new Map();
  let next = pal.length + 1;
  for (const c of [...colors].sort((a, b) => ((pal.indexOf(a) + 1) || 1e9) - ((pal.indexOf(b) + 1) || 1e9))) {
    out.set(c, pal.includes(c) ? pal.indexOf(c) + 1 : next++);
  }
  return out;
}
function unpaintedCount() {
  const ix = MZ.regionIndex();
  let n = 0;
  for (const f of ix.faces) {
    const r = ix.region(f), p = MZ.gridSample(r.bb, q => MZ.insideRegion(r, q), 1)[0];
    if (p && !MZ.isPaintedAt(p)) n++;
  }
  return n;
}

// ---- tile report ---------------------------------------------------------------------
const report = { tileW: 10, tileH: 10, waste: 10 };
try { Object.assign(report, JSON.parse(localStorage.getItem('mz-report') || '{}')); } catch { /* ignore */ }
function reportRows() {
  const stats = colorStats(), nums = colorNumbers(stats.keys());
  const total = [...stats.values()].reduce((s, e) => s + e.area, 0) || 1;
  const piece = report.tileW * report.tileH;
  return [...stats.entries()].map(([c, e]) => ({
    c, n: nums.get(c), tiles: e.tiles, area: e.area, share: e.area / total * 100,
    pieces: piece > 0 ? Math.ceil(e.area / piece * (1 + report.waste / 100)) : 0,
  })).sort((a, b) => a.n - b.n);
}
function renderReport() {
  const rows = reportRows(), d = state.doc, u = MZ.unit();
  const expert = state.mode === 'expert';
  const tiles = rows.reduce((s, r) => s + r.tiles, 0);
  const free = unpaintedCount();
  $('#rep-summary').innerHTML = `<b>${tiles}</b> painted area${tiles === 1 ? '' : 's'} in <b>${rows.length}</b> color${rows.length === 1 ? '' : 's'}`
    + (free ? ` · <b>${free}</b> not painted yet` : ' · everything is painted')
    + ` · page ${MZ.fmt(d.w)} × ${MZ.fmt(d.h)} ${u}`;
  const palOpts = state.palette.map((c, i) => `<option value="${c}" style="background:${c}">#${i + 1} ${c}</option>`).join('');
  $('#rep-table').innerHTML = `<thead><tr><th>#</th><th></th><th>Color</th><th>Areas</th><th>Total area</th><th>Share</th>`
    + (expert ? `<th title="Pieces of the size set above, plus waste">Pieces to buy</th>` : '')
    + `<th>Replace with</th></tr></thead><tbody>`
    + rows.map(r => `<tr><td>${r.n}</td><td><span class="mini" style="background:${r.c}"></span></td><td>${r.c}</td>`
      + `<td>${r.tiles}</td><td>${MZ.fmtArea(r.area)}</td><td>${r.share.toFixed(1)} %</td>`
      + (expert ? `<td>${r.pieces || '–'}</td>` : '')
      + `<td><select data-from="${r.c}"><option value="">—</option>${palOpts}<option value="none">Erase</option></select></td></tr>`).join('')
    + `</tbody>`;
  if (!rows.length) $('#rep-table').innerHTML = '<tbody><tr><td>Nothing is painted yet. Use the paint bucket, or “Color tiles from photo”.</td></tr></tbody>';
  for (const s of document.querySelectorAll('#rep-table select')) {
    s.onchange = () => {
      if (!s.value) return;
      const to = s.value === 'none' ? null : s.value;
      const n = MZ.replaceColor(s.dataset.from, to);
      MZ.commit(true);
      MZ.toast(`${to ? 'Recolored' : 'Erased'} ${n} area${n === 1 ? '' : 's'}.`);
      renderReport();
    };
  }
  for (const el of document.querySelectorAll('.unit-label')) el.textContent = u;
}
function reportCSV() {
  const rows = reportRows(), u = MZ.unit();
  const lines = [['number', 'color', 'areas', `area_${u}2`, 'share_percent', 'pieces'].join(',')];
  for (const r of rows) lines.push([r.n, r.c, r.tiles, r.area.toFixed(2), r.share.toFixed(2), r.pieces].join(','));
  MZ.download(new Blob([lines.join('\n') + '\n'], { type: 'text/csv' }), MZ.fileName.replace(/\.svg$/i, '') + '-colors.csv');
}
$('#btn-report').onclick = () => {
  $('#rep-tw').value = report.tileW;
  $('#rep-th').value = report.tileH;
  $('#rep-waste').value = report.waste;
  renderReport();
  $('#dlg-report').showModal();
};
for (const id of ['#rep-tw', '#rep-th', '#rep-waste']) {
  $(id).onchange = () => {
    report.tileW = +$('#rep-tw').value || 0;
    report.tileH = +$('#rep-th').value || 0;
    report.waste = +$('#rep-waste').value || 0;
    try { localStorage.setItem('mz-report', JSON.stringify(report)); } catch { /* ignore */ }
    renderReport();
  };
}
$('#rep-csv').onclick = reportCSV;

// ---- printable template ------------------------------------------------------------------
/** A point well inside an element (roughly the center of its largest inscribed circle), and that circle's radius. */
function labelSpot(el) {
  const g = MZ.geomOf(el), polys = g.polys.filter(p => p.closed);
  const pts = MZ.gridSample(g.bbox, p => MZ.insideEl(el, p), 80);
  let best = null, bd = 0;
  for (const p of pts) {
    let d = Infinity;
    for (const pl of polys) for (let i = 0, n = pl.pts.length; i < n; i++) d = Math.min(d, Geo.dist(p, Geo.project(p, pl.pts[i], pl.pts[(i + 1) % n])));
    if (d > bd) { bd = d; best = p; }
  }
  return best && { p: best, r: bd };
}
function printTemplate() {
  const style = document.querySelector('input[name=print-style]:checked').value;
  const legend = $('#print-legend').checked;
  const stats = colorStats(), nums = colorNumbers(stats.keys());
  const doc = new DOMParser().parseFromString(MZ.buildSVGString({ photo: false, grout: state.grout.on }), 'image/svg+xml');
  const root = doc.documentElement, NS = 'http://www.w3.org/2000/svg';
  const labels = [];
  if (style !== 'colors') {
    const big = Math.max(state.doc.w, state.doc.h);
    for (const el of MZ.allShapes()) {
      const c = MZ.fillOf(el);
      if (!c) continue;
      const s = labelSpot(el);
      if (!s) continue;
      const size = Math.min(Math.max(s.r * 1.1, big * 0.004), big * 0.04);
      labels.push({ x: s.p.x, y: s.p.y, size, n: nums.get(c), c });
    }
  }
  if (style === 'numbers') {
    // paint-by-number sheet: white tiles with the color number inside
    for (const el of root.querySelectorAll('[id="mosaic-fills"] *, [id="mosaic-shapes"] *')) {
      if (el.localName === 'g' || el.localName === 'line') continue;
      const isArea = (el.getAttribute('class') || '').includes('mz-fill');
      if (isArea || (el.getAttribute('fill') && el.getAttribute('fill') !== 'none')) el.setAttribute('fill', '#ffffff');
      if (isArea) el.setAttribute('stroke', '#ffffff');
      el.style.removeProperty('fill');
    }
    const bg = root.querySelector('[id="mosaic-bg"]');
    if (bg) bg.setAttribute('fill', '#ffffff');
  }
  if (labels.length) {
    const g = doc.createElementNS(NS, 'g');
    g.setAttribute('font-family', 'Arial, sans-serif');
    g.setAttribute('text-anchor', 'middle');
    for (const l of labels) {
      const t = doc.createElementNS(NS, 'text');
      t.setAttribute('x', MZ.fmt(l.x));
      t.setAttribute('y', MZ.fmt(l.y + l.size * 0.36));
      t.setAttribute('font-size', MZ.fmt(l.size));
      t.setAttribute('fill', style === 'numbers' || Colors.luminance(l.c) > 140 ? '#000' : '#fff');
      t.textContent = l.n;
      g.appendChild(t);
    }
    root.appendChild(g);
  }
  const svgText = new XMLSerializer().serializeToString(root);
  const d = state.doc, u = MZ.unit();
  const size = u === 'px' ? `${d.w}px` : `${d.w}${u}`, sizeH = u === 'px' ? `${d.h}px` : `${d.h}${u}`;
  const rows = [...stats.entries()].map(([c, e]) => ({ c, n: nums.get(c), ...e })).sort((a, b) => a.n - b.n);
  const legendHTML = legend && rows.length ? `<section class="legend"><h2>${esc(MZ.fileName)} – colors</h2><table>`
    + rows.map(r => `<tr><td class="n">${r.n}</td><td><span style="background:${r.c}"></span></td><td>${r.c}</td><td>${r.tiles} area${r.tiles === 1 ? '' : 's'}</td><td>${esc(MZ.fmtArea(r.area))}</td></tr>`).join('')
    + `</table></section>` : '';
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(MZ.fileName)} – template</title><style>
    @page { margin: 10mm; }
    body { margin: 0; font-family: Arial, sans-serif; }
    .sheet svg { display: block; width: ${size}; height: ${sizeH}; }
    .hint { font-size: 12px; color: #555; margin: 0 0 6px; }
    .legend { page-break-before: always; }
    .legend table { border-collapse: collapse; }
    .legend td { padding: 4px 10px; border-bottom: 1px solid #ddd; }
    .legend td.n { font-weight: bold; }
    .legend span { display: inline-block; width: 28px; height: 18px; border: 1px solid #999; vertical-align: middle;
      -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    @media print { .hint { display: none; } }
  </style></head><body>
  <p class="hint">Printed at real size (${MZ.fmt(d.w)} × ${MZ.fmt(d.h)} ${u}). If it is bigger than the paper, choose “Fit to page” or print in parts.</p>
  <div class="sheet">${svgText}</div>${legendHTML}
  <script>window.onload = () => setTimeout(() => window.print(), 300);<\/script></body></html>`;
  const url = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
  const w = window.open(url, '_blank');
  if (!w) { MZ.toast('The browser blocked the print window – allow pop-ups for this page.'); return; }
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}
$('#btn-print').onclick = () => $('#dlg-print').showModal();
$('#print-go').onclick = () => { $('#dlg-print').close(); printTemplate(); };

// ---- version history -------------------------------------------------------------------
let thumbs = [];
async function renderHistory() {
  const list = $('#hist-list');
  thumbs.forEach(u => URL.revokeObjectURL(u));
  thumbs = [];
  let versions = [];
  try { versions = await Store.listVersions(); } catch { list.innerHTML = '<p class="note">Version history needs browser storage (IndexedDB), which is not available here.</p>'; return; }
  if (!versions.length) { list.innerHTML = '<p class="note">No versions yet. A version is kept every few minutes while you work, and before you open or start another drawing.</p>'; return; }
  list.innerHTML = '';
  for (const v of versions) {
    const row = document.createElement('div');
    row.className = 'hist-row';
    const url = URL.createObjectURL(new Blob([v.svg], { type: 'image/svg+xml' }));
    thumbs.push(url);
    row.innerHTML = `<img src="${url}" alt=""><div class="hist-info"><b>${new Date(v.time).toLocaleString()}</b><span>${esc(v.name || '')} · ${esc(v.note || '')}${v.tiles ? ` · ${v.tiles} painted areas` : ''}</span></div>`;
    const b = document.createElement('button');
    b.textContent = 'Restore';
    b.onclick = async () => { $('#dlg-history').close(); await MZ.restoreVersion(v); };
    row.append(b);
    list.append(row);
  }
}
$('#btn-history').onclick = () => { renderHistory(); $('#dlg-history').showModal(); };
$('#hist-save').onclick = async () => {
  MZ.toast(await MZ.saveVersion('Saved by hand') ? 'Version saved.' : 'Could not save a version (browser storage unavailable).');
  renderHistory();
};

// ---- color the tiles from the photo ------------------------------------------------------
async function autoColor() {
  const im = MZ.refImage();
  if (!im) { MZ.toast('Load a photo first (Photo section).'); return; }
  const pal = state.palette;
  if (!pal.length) { MZ.toast('The palette is empty – add colors first.'); return; }
  let img;
  try { img = await MZ.loadImg(im.getAttribute('href')); } catch { MZ.toast('Could not read the photo.'); return; }
  const k = Math.min(1, 1200 / Math.max(img.naturalWidth, img.naturalHeight));
  const W = Math.max(1, Math.round(img.naturalWidth * k)), H = Math.max(1, Math.round(img.naturalHeight * k));
  const cv = document.createElement('canvas');
  cv.width = W;
  cv.height = H;
  const cx = cv.getContext('2d', { willReadFrequently: true });
  cx.drawImage(img, 0, 0, W, H);
  const data = cx.getImageData(0, 0, W, H).data;
  const ix0 = +im.getAttribute('x'), iy0 = +im.getAttribute('y'), iw = +im.getAttribute('width'), ih = +im.getAttribute('height');
  const labs = pal.map(c => Colors.toLab(Colors.toRgb(c)));
  const ctx = { ix: MZ.regionIndex() };
  let painted = 0, skipped = 0, outside = 0;
  for (const f of ctx.ix.faces) {
    const reg = ctx.ix.region(f);
    const pts = MZ.gridSample(reg.bb, p => MZ.insideRegion(reg, p), 40);
    if (!pts.length) continue;
    if (state.onlyUnpainted && MZ.isPaintedAt(pts[0])) { skipped++; continue; }
    let r = 0, g = 0, b = 0, n = 0;
    for (const p of pts) {
      const u = Math.floor((p.x - ix0) / iw * W), v = Math.floor((p.y - iy0) / ih * H);
      if (u < 0 || v < 0 || u >= W || v >= H) continue;
      const i = (v * W + u) * 4;
      if (data[i + 3] < 20) continue;
      r += data[i]; g += data[i + 1]; b += data[i + 2]; n++;
    }
    if (!n) { outside++; continue; }
    const c = Colors.nearest([r / n, g / n, b / n], pal, labs);
    if (MZ.bucketAt(pts[0], c, ctx, f).changed) painted++;
  }
  if (painted) MZ.commit(true);
  MZ.toast(`Colored ${painted} area${painted === 1 ? '' : 's'} with the closest palette colors`
    + (skipped ? ` · ${skipped} already painted (left as they were)` : '')
    + (outside ? ` · ${outside} outside the photo` : '') + '.');
}
$('#btn-autocolor').onclick = autoColor;

// ---- rulers ------------------------------------------------------------------------------
const rx = $('#ruler-x'), ry = $('#ruler-y'), corner = $('#ruler-corner');
function niceStep(raw) {
  const p = Math.pow(10, Math.floor(Math.log10(raw)));
  for (const m of [1, 2, 5, 10]) if (m * p >= raw) return { step: m * p, minor: m === 2 ? 4 : 5 };
  return { step: 10 * p, minor: 5 };
}
function drawRuler(cv, horizontal) {
  const dpr = window.devicePixelRatio || 1, w = cv.clientWidth, h = cv.clientHeight;
  if (!w || !h) return;
  cv.width = Math.round(w * dpr);
  cv.height = Math.round(h * dpr);
  const c = cv.getContext('2d');
  c.setTransform(dpr, 0, 0, dpr, 0, 0);
  c.fillStyle = '#27282c';
  c.fillRect(0, 0, w, h);
  c.strokeStyle = '#7d8088';
  c.fillStyle = '#b5b7bd';
  c.font = '10px system-ui, sans-serif';
  const v = state.view, d = state.doc, len = horizontal ? w : h;
  const origin = horizontal ? d.x : d.y, start = horizontal ? v.x : v.y;
  // the ruler sits over the canvas edge, so position 0 of the ruler is the canvas edge
  const { step, minor } = niceStep(60 / v.s);
  const first = Math.floor((start - origin) / step) * step;
  c.beginPath();
  for (let t = first; ; t += step / minor) {
    const s = (origin + t - start) * v.s;
    if (s > len) break;
    if (s < 0) continue;
    const major = Math.abs(t / step - Math.round(t / step)) < 1e-6;
    const tick = major ? h * 0.6 : h * 0.25;
    if (horizontal) { c.moveTo(s + 0.5, h); c.lineTo(s + 0.5, h - tick); }
    else { c.moveTo(w, s + 0.5); c.lineTo(w - tick, s + 0.5); }
    if (major) {
      const label = String(+t.toFixed(6));
      if (horizontal) c.fillText(label, s + 3, 10);
      else { c.save(); c.translate(10, s + 3); c.rotate(-Math.PI / 2); c.textAlign = 'right'; c.fillText(label, 0, 0); c.restore(); }
    }
  }
  c.stroke();
}
function drawRulers() {
  const show = state.mode === 'expert' && state.rulers;
  MZ.stage.classList.toggle('with-rulers', show);
  rx.hidden = ry.hidden = corner.hidden = !show;
  if (!show) return;
  corner.textContent = MZ.unit();
  drawRuler(rx, true);
  drawRuler(ry, false);
}
MZ.on('view', drawRulers);
MZ.on('mode', drawRulers);

// ---- phone / tablet layout ------------------------------------------------------------
$('#btn-panel').onclick = () => document.body.classList.toggle('panel-open');
// the slide-in panel starts below the top bar, so ☰ stays reachable to close it
new ResizeObserver(([e]) => document.documentElement.style.setProperty('--topbar-h', e.target.offsetHeight + 'px')).observe($('#topbar'));
MZ.stage.addEventListener('pointerdown', () => document.body.classList.remove('panel-open'));
for (const d of document.querySelectorAll('dialog')) {
  d.addEventListener('click', (e) => { if (e.target === d) d.close(); }); // click on the backdrop closes
}

// ---- install & offline ---------------------------------------------------------------------
let installEvent = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  installEvent = e;
  $('#btn-install').hidden = false;
});
$('#btn-install').onclick = async () => {
  if (!installEvent) return;
  installEvent.prompt();
  await installEvent.userChoice;
  installEvent = null;
  $('#btn-install').hidden = true;
};
window.addEventListener('appinstalled', () => { $('#btn-install').hidden = true; MZ.toast('Installed – Mosaic Paint now works offline too.'); });
if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
  navigator.serviceWorker.register('sw.js').catch(() => { /* offline support is optional */ });
}
})();
