/* The colors report: every color with its pieces (tiles), pixels and real area – a shopping list –
   recoloring a color everywhere, and a CSV download. Its color numbers are the ones on the print. */
import * as R from '../lib/raster.ts';
import { $, toast, download } from '../shared/ui.ts';
import { state, rt, savePrefs } from './state.ts';
import { doc, dctx, getImage } from './canvas.ts';
import { commit } from './history.ts';

export interface ColorRow { n: number; color: string; pieces: number; pixels: number }
/** The colors of the image with their pieces and pixels, most used first, numbered 1… */
export function colorRows(p: R.Pieces): ColorRow[] {
  const m = new Map<string, ColorRow>();
  p.colors.forEach((c, i) => {
    const r = m.get(c) || { n: 0, color: c, pieces: 0, pixels: 0 };
    r.pieces++;
    r.pixels += p.sizes[i];
    m.set(c, r);
  });
  return [...m.values()].sort((a, b) => b.pixels - a.pixels).map((r, i) => ({ ...r, n: i + 1 }));
}
/** Millimetres per pixel at the real width. */
export const mmPerPixel = (): number => state.realWidth / doc.width;
const fmtN = (v: number) => v.toLocaleString('en');
const area = (px: number) => {
  const cm2 = px * mmPerPixel() ** 2 / 100;
  return cm2 >= 100 ? `${(cm2 / 100).toFixed(2)} dm²` : `${cm2.toFixed(1)} cm²`;
};

let rows: ColorRow[] = [];
function render(): void {
  const p = R.pieces(getImage());
  rows = colorRows(p);
  const total = rows.reduce((s, r) => s + r.pixels, 0) || 1, pieces = rows.reduce((s, r) => s + r.pieces, 0);
  $('#rep-summary').textContent = rows.length
    ? `${fmtN(pieces)} piece${pieces === 1 ? '' : 's'} in ${rows.length} color${rows.length === 1 ? '' : 's'} · ${doc.width} × ${doc.height} px`
    : 'Nothing is painted yet.';
  $('#rep-width').value = state.realWidth;
  $('#rep-size').textContent = `${Math.round(state.realWidth)} × ${Math.round(state.realWidth * doc.height / doc.width)} mm · ${mmPerPixel().toFixed(2)} mm per pixel`;
  const t = $('#rep-table');
  t.innerHTML = '<tr><th>#</th><th>Color</th><th>Pieces</th><th>Pixels</th><th>Share</th><th>Area</th><th>Replace with</th></tr>';
  for (const r of rows) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${r.n}</td><td><span class="mini" style="background:${r.color}"></span> ${r.color}</td><td>${fmtN(r.pieces)}</td>`
      + `<td>${fmtN(r.pixels)}</td><td>${(r.pixels / total * 100).toFixed(1)} %</td><td>${area(r.pixels)}</td><td></td>`;
    const sel = document.createElement('select');
    sel.innerHTML = '<option value="">–</option>' + state.palette.filter(c => c !== r.color).map(c => `<option value="${c}">${c}</option>`).join('')
      + '<option value="none">transparent</option>';
    sel.onchange = () => {
      if (!sel.value) return;
      const img = getImage(), n = R.replaceColor(img, r.color, R.rgba(sel.value === 'none' ? null : sel.value));
      dctx.putImageData(img, 0, 0);
      commit();
      toast(`Recolored ${fmtN(n)} pixel${n === 1 ? '' : 's'}.`);
      render();
    };
    tr.lastElementChild.append(sel);
    t.append(tr);
  }
}
function csv(): string {
  const lines = ['number,color,pieces,pixels,area_cm2'];
  for (const r of rows) lines.push([r.n, r.color, r.pieces, r.pixels, (r.pixels * mmPerPixel() ** 2 / 100).toFixed(2)].join(','));
  return lines.join('\n') + '\n';
}

export function bindReport(): void {
  $('#btn-report').onclick = () => { render(); $('#dlg-report').showModal(); };
  $('#rep-width').onchange = () => {
    const v = +$('#rep-width').value;
    if (v > 0) { state.realWidth = v; savePrefs(); }
    render();
  };
  $('#rep-csv').onclick = () => download(new Blob([csv()], { type: 'text/csv' }), rt.fileName.replace(/\.[a-z0-9]+$/i, '') + '-colors.csv');
}
