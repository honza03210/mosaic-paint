/* Mosaic Paint – the colors used in the drawing and the tile report (how many tiles of each color to buy). */
import { MZ } from '../core/api.ts';
import * as Geo from '../lib/geometry.ts';
import { Vision } from './vision.ts';

const $ = (s: string): any => document.querySelector<any>(s);
const { state } = MZ;
const esc = (s: unknown) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// ---- colors used in the drawing -----------------------------------------------------
/** color → { tiles, area } for every painted area / filled shape. */
export function colorStats() {
  const map = new Map();
  for (const el of MZ.allShapes()) {
    const c = MZ.fillOf(el);
    if (!c) continue;
    let a = MZ.isFill(el) ? Math.abs(+(el as SVGElement).dataset.area) : 0;
    if (!a) a = MZ.geomOf(el).polys.filter(p => p.closed).reduce((s, p) => s + Math.abs(Geo.polygonArea(p.pts)), 0);
    const e = map.get(c) || { tiles: 0, area: 0 };
    e.tiles++;
    e.area += a;
    map.set(c, e);
  }
  return map;
}
/** Number of each used color: its position in the palette, then the rest after it. */
export function colorNumbers(colors) {
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
  for (const s of document.querySelectorAll<any>('#rep-table select')) {
    s.onchange = () => {
      if (!s.value) return;
      const to = s.value === 'none' ? null : s.value;
      const n = MZ.replaceColor(s.dataset.from, to);
      MZ.commit(true);
      MZ.toast(`${to ? 'Recolored' : 'Erased'} ${n} area${n === 1 ? '' : 's'}.`);
      renderReport();
    };
  }
  for (const el of document.querySelectorAll<any>('.unit-label')) el.textContent = u;
  // colors that are hard to tell apart (vision.js)
  const alike = Vision.similarPairs(rows.map(r => r.c));
  $('#rep-alike').innerHTML = alike.length ? '<h3>Colors that may look alike</h3><ul>'
    + alike.map(p => `<li><span class="mini" style="background:${p.a}"></span> <span class="mini" style="background:${p.b}"></span> ${p.a} and ${p.b} ${esc(Vision.describe(p.views))}</li>`).join('') + '</ul>' : '';
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
