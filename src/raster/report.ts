/* The colors report: every color with its pieces (tiles), pixels and real area – a shopping list –
   recoloring a color everywhere, and a CSV download. Its color numbers are the ones on the print. */
import * as R from '../lib/raster.ts';
import { colorRows, type ColorRow } from '../lib/raster.ts';
import { $, toast, download } from '../shared/ui.ts';
import { state, rt, savePrefs } from './state.ts';
import { doc, dctx, getImage } from './canvas.ts';
import { commit } from './history.ts';
import { t, num } from '../shared/i18n.ts';

export { colorRows, type ColorRow };

/** Millimetres per pixel at the real width. */
export const mmPerPixel = (): number => state.realWidth / doc.width;
const fmtN = (v: number) => num(v);
const area = (px: number) => {
  const cm2 = px * mmPerPixel() ** 2 / 100;
  return cm2 >= 100 ? `${num(cm2 / 100, 2)} dm²` : `${num(cm2, 1)} cm²`;
};

let rows: ColorRow[] = [];
function render(): void {
  const p = R.pieces(getImage());
  rows = colorRows(p);
  const total = rows.reduce((s, r) => s + r.pixels, 0) || 1, pieces = rows.reduce((s, r) => s + r.pieces, 0);
  $('#rep-summary').textContent = rows.length
    ? t('{n} {n|piece|pieces} in {c} {c|color|colors} · {w} × {h} px', { n: pieces, c: rows.length, w: doc.width, h: doc.height })
    : t('Nothing is painted yet.');
  $('#rep-width').value = state.realWidth;
  $('#rep-size').textContent = t('{w} × {h} mm · {k} mm per pixel', { w: Math.round(state.realWidth), h: Math.round(state.realWidth * doc.height / doc.width), k: num(mmPerPixel(), 2) });
  const table = $('#rep-table');
  table.innerHTML = `<tr><th>#</th><th>${t('Color')}</th><th>${t('Pieces')}</th><th>${t('Pixels')}</th><th>${t('Share of area')}</th><th>${t('Area')}</th><th>${t('Replace with')}</th></tr>`;
  for (const r of rows) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${r.n}</td><td><span class="mini" style="background:${r.color}"></span> ${r.color}</td><td>${fmtN(r.pieces)}</td>`
      + `<td>${fmtN(r.pixels)}</td><td>${num(r.pixels / total * 100, 1)} %</td><td>${area(r.pixels)}</td><td></td>`;
    const sel = document.createElement('select');
    sel.innerHTML = '<option value="">–</option>' + state.palette.filter(c => c !== r.color).map(c => `<option value="${c}">${c}</option>`).join('')
      + `<option value="none">${t('transparent')}</option>`;
    sel.onchange = () => {
      if (!sel.value) return;
      const img = getImage(), n = R.replaceColor(img, r.color, R.rgba(sel.value === 'none' ? null : sel.value));
      dctx.putImageData(img, 0, 0);
      commit();
      toast(t('Recolored {n} {n|pixel|pixels}.', { n }));
      render();
    };
    tr.lastElementChild.append(sel);
    table.append(tr);
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
