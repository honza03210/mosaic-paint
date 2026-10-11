/* The printable template: the image at its real size over several sheets (or fitted on one), in color,
   with color numbers on the pieces, or as outlines to paint by number – plus a color legend. */
import * as R from '../lib/raster.ts';
import * as Printing from '../lib/print.ts';
import { $, toast } from '../shared/ui.ts';
import { state, rt, savePrefs } from './state.ts';
import { doc, getImage } from './canvas.ts';
import { colorRows, mmPerPixel, type ColorRow } from './report.ts';

const MAX_PIECES = 20000;
const esc = (s: unknown) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const n = (v: number) => String(Math.round(v * 1000) / 1000);
const title = () => rt.fileName.replace(/\.[a-z0-9]+$/i, '');

/** The picture as SVG markup in pixel units, for the print page. style: 'colors' | 'both' | 'numbers'. */
function printArt(style: string): { art: string; rows: ColorRow[] } | null {
  const W = doc.width, H = doc.height, p = R.pieces(getImage()), rows = colorRows(p), k = mmPerPixel();
  if (style !== 'colors' && p.colors.length > MAX_PIECES) {
    toast(`This picture has ${p.colors.length.toLocaleString('en')} pieces – too many to number. Make a mosaic or reduce it to the palette first.`);
    return null;
  }
  const parts: string[] = [];
  if (style === 'numbers') parts.push(`<rect width="${W}" height="${H}" fill="#ffffff"/>`);
  else parts.push(`<image href="${doc.toDataURL('image/png')}" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="none" style="image-rendering:pixelated"/>`);
  if (style !== 'colors') {
    if (style === 'numbers') parts.push(`<path d="${R.pieceOutlines(p, W, H)}" fill="none" stroke="#444444" stroke-width="${n(0.25 / k)}"/>`);
    // numbers where they fit: at least ~2.6 mm of room on paper
    const num = new Map(rows.map(r => [r.color, r.n])), centres = R.pieceCentres(p, W, H), labels: string[] = [];
    centres.forEach((c, i) => {
      if (c.r * k < 1.3) return;
      const size = Math.min(c.r * 1.2, 4 / k);
      const halo = style === 'both' ? ` stroke="#ffffff" stroke-width="${n(size * 0.18)}" paint-order="stroke"` : '';
      labels.push(`<text x="${n(c.x)}" y="${n(c.y)}" font-size="${n(size)}"${halo}>${num.get(p.colors[i])}</text>`);
    });
    parts.push(`<g font-family="Arial" text-anchor="middle" dominant-baseline="central" fill="#111111">${labels.join('')}</g>`);
  }
  return { art: parts.join(''), rows };
}
function legendHTML(rows: ColorRow[]): string {
  const area = (px: number) => `${(px * mmPerPixel() ** 2 / 100).toFixed(1)} cm²`;
  return rows.length ? `<h2>${esc(title())} – colors</h2><table>`
    + rows.map(r => `<tr><td class="n">${r.n}</td><td><span style="background:${r.color}"></span></td><td>${r.color}</td><td>${r.pieces} piece${r.pieces === 1 ? '' : 's'}</td><td>${area(r.pixels)}</td></tr>`).join('')
    + '</table>' : '';
}
function openPrintPage(html: string): void {
  const url = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
  const w = window.open(url, '_blank');
  if (!w) { toast('The browser blocked the print window – allow pop-ups for this page.'); return; }
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}
const mode = () => (document.querySelector('input[name=print-size]:checked') as HTMLInputElement).value;
function updateInfo(): void {
  const L = Printing.layout(state.realWidth, state.realWidth * doc.height / doc.width, $('#print-paper').value, mode());
  $('#print-info').textContent = mode() === 'fit'
    ? `One ${L.paper.name} sheet (${L.orientation}), at ${Math.round(L.scale * 100)} % of the real size.`
    : `${L.sheets.length} ${L.paper.name} sheet${L.sheets.length > 1 ? 's' : ''} (${L.orientation}${L.sheets.length > 1 ? `, ${L.rows} × ${L.cols}, overlapping ${Printing.OVERLAP} mm` : ''}) at real size.`;
}
/** Builds the print page (also used by the tests). */
export function printPage(style: string): string | null {
  const a = printArt(style);
  if (!a) return null;
  return Printing.html({
    art: a.art, box: { x: 0, y: 0, w: doc.width, h: doc.height }, unit: 'px', mmPerUnit: mmPerPixel(),
    legend: $('#print-legend').checked ? legendHTML(a.rows) : '', title: title(), paper: $('#print-paper').value, mode: mode(),
  });
}

export function bindPrint(): void {
  $('#btn-print').onclick = () => { $('#print-width').value = state.realWidth; updateInfo(); $('#dlg-print').showModal(); };
  $('#print-width').onchange = () => {
    const v = +$('#print-width').value;
    if (v > 0) { state.realWidth = v; savePrefs(); }
    $('#print-width').value = state.realWidth;
    updateInfo();
  };
  for (const el of document.querySelectorAll<HTMLInputElement>('#print-paper, input[name=print-size]')) el.onchange = updateInfo;
  $('#print-go').onclick = () => {
    const html = printPage((document.querySelector('input[name=print-style]:checked') as HTMLInputElement).value);
    if (!html) return;
    $('#dlg-print').close();
    openPrintPage(html);
  };
}
