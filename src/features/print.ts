/* Mosaic Paint – the printable template: the mosaic at real size over several sheets, with numbered colors. */
import { MZ } from '../core/api.ts';
import * as Geo from '../lib/geometry.ts';
import * as Colors from '../lib/colors.ts';
import * as Printing from '../lib/print.ts';
import { colorStats, colorNumbers } from './report.ts';

const $ = (s: string): any => document.querySelector<any>(s);
const { state } = MZ;
const esc = (s: unknown) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

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
/**
 * The drawing for printing, as inner SVG markup: style 'colors', 'both' (colors + numbers) or
 * 'numbers' (white tiles with color numbers). Also returns the color rows for legends.
 */
function printArt(style) {
  const stats = colorStats(), nums = colorNumbers(stats.keys());
  const doc = new DOMParser().parseFromString(MZ.buildSVGString({ photo: false, grout: state.grout.on, pageOnly: true }), 'image/svg+xml');
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
    for (const el of root.querySelectorAll<any>('[id="mosaic-fills"] *, [id="mosaic-shapes"] *')) {
      if (el.localName === 'g' || el.localName === 'line') continue;
      const isArea = (el.getAttribute('class') || '').includes('mz-fill');
      if (isArea || (el.getAttribute('fill') && el.getAttribute('fill') !== 'none')) el.setAttribute('fill', '#ffffff');
      if (isArea) el.setAttribute('stroke', '#ffffff');
      el.style.removeProperty('fill');
    }
    const bg = root.querySelector<any>('[id="mosaic-bg"]');
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
  // the drawing's content, without the outer <svg>, is placed on the sheets by Printing
  const art = [...root.childNodes].map(c => new XMLSerializer().serializeToString(c)).join('');
  const rows = [...stats.entries()].map(([c, e]) => ({ c, n: nums.get(c), ...e })).sort((a, b) => a.n - b.n);
  return { art, rows, nums };
}
function legendHTML(rows) {
  return rows.length ? `<h2>${esc(MZ.fileName)} – colors</h2><table>`
    + rows.map(r => `<tr><td class="n">${r.n}</td><td><span style="background:${r.c}"></span></td><td>${r.c}</td><td>${r.tiles} area${r.tiles === 1 ? '' : 's'}</td><td>${esc(MZ.fmtArea(r.area))}</td></tr>`).join('')
    + '</table>' : '';
}
function printTemplate() {
  const { art, rows } = printArt(document.querySelector<any>('input[name=print-style]:checked').value);
  const d = state.doc;
  openPrintPage(Printing.html({
    art, box: { x: d.x, y: d.y, w: d.w, h: d.h }, unit: MZ.unit(), legend: $('#print-legend').checked ? legendHTML(rows) : '',
    title: MZ.fileName.replace(/\.svg$/i, ''), paper: $('#print-paper').value, mode: document.querySelector<any>('input[name=print-size]:checked').value,
  }));
}
function openPrintPage(html) {
  const url = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
  const w = window.open(url, '_blank');
  if (!w) { MZ.toast('The browser blocked the print window – allow pop-ups for this page.'); return; }
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}
function updatePrintInfo() {
  const d = state.doc, k = Printing.MM[MZ.unit()] || Printing.MM.px;
  const mode = document.querySelector<any>('input[name=print-size]:checked').value;
  const L = Printing.layout(d.w * k, d.h * k, $('#print-paper').value, mode);
  $('#print-info').textContent = mode === 'fit'
    ? `One ${L.paper.name} sheet (${L.orientation}), at ${Math.round(L.scale * 100)} % of the real size.`
    : `${L.sheets.length} ${L.paper.name} sheet${L.sheets.length > 1 ? 's' : ''} (${L.orientation}${L.sheets.length > 1 ? `, ${L.rows} × ${L.cols}, overlapping ${Printing.OVERLAP} mm` : ''}) at real size.`;
}
$('#btn-print').onclick = () => { updatePrintInfo(); $('#dlg-print').showModal(); };
// shared with the laying plan (layplan.js)
export const PrintTools = { art: printArt, legend: legendHTML, open: openPrintPage, colorStats, colorNumbers };
for (const el of document.querySelectorAll<any>('#print-paper, input[name=print-size]')) el.onchange = updatePrintInfo;
$('#print-go').onclick = () => { $('#dlg-print').close(); printTemplate(); };
