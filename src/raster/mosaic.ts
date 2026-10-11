/* Turning a picture into a mosaic: square tiles with grout, colored from the palette (or a palette
   suggested from the picture), and reducing a picture to the palette's colors. */
import * as R from '../lib/raster.ts';
import { $, toast } from '../shared/ui.ts';
import { state, savePrefs } from './state.ts';
import { doc, dctx } from './canvas.ts';
import { commit } from './history.ts';
import { place } from './select.ts';
import { addPalette, suggestColors } from './palette.ts';

/** The area to work on: the selection, or the whole image. */
function region(): R.Box {
  if (state.floating) place();
  return state.sel || { x: 0, y: 0, w: doc.width, h: doc.height };
}
const fmtN = (n: number) => n.toLocaleString('en');
function summary(counts: Map<string, number>, unit: string): string {
  const total = [...counts.values()].reduce((s, n) => s + n, 0);
  return `${fmtN(total)} ${unit}${total === 1 ? '' : 's'} in ${counts.size} color${counts.size === 1 ? '' : 's'}`;
}

export function makeMosaic(): void {
  const m = state.mosaic, b = region();
  const img = dctx.getImageData(b.x, b.y, b.w, b.h);
  let palette: string[] | null = null;
  if (m.colors === 'palette') {
    palette = state.palette;
    if (!palette.length) { toast('The palette is empty – add colors, or let the mosaic suggest some.'); return; }
  } else if (m.colors === 'suggest') {
    palette = suggestColors(img, m.count);
    if (!palette.length) { toast('There is nothing to make a mosaic from (the area is transparent).'); return; }
    addPalette('From picture', palette);
  }
  const res = R.mosaic(img, { tile: m.tile, grout: m.grout, groutColor: m.groutColor, palette, bricks: m.bricks });
  dctx.putImageData(new ImageData(res.img.data, b.w, b.h), b.x, b.y);
  commit();
  toast(`Made ${summary(res.counts, 'tile')}.`);
}
export function reduceToPalette(): void {
  if (!state.palette.length) { toast('The palette is empty.'); return; }
  const b = region(), img = dctx.getImageData(b.x, b.y, b.w, b.h);
  const counts = R.quantize(img, state.palette);
  dctx.putImageData(img, b.x, b.y);
  commit();
  toast(`Every pixel now has a palette color: ${summary(counts, 'pixel')}.`);
}

// ---- dialog ------------------------------------------------------------------------------------------
function estimate(): void {
  const m = state.mosaic, b = state.sel || { w: doc.width, h: doc.height };
  const n = Math.ceil(b.w / Math.max(2, m.tile)) * Math.ceil(b.h / Math.max(2, m.tile));
  $('#mo-estimate').textContent = `About ${fmtN(n)} tiles${state.sel ? ' in the selection' : ''}.`;
}
export function bindMosaic(): void {
  const m = state.mosaic;
  const num = (id: string, key: string, min: number) => {
    const i = $(id);
    i.value = m[key];
    i.onchange = () => { const v = Math.round(+i.value); if (v >= min) { m[key] = v; savePrefs(); } i.value = m[key]; estimate(); };
  };
  num('#mo-tile', 'tile', 2);
  num('#mo-grout', 'grout', 0);
  num('#mo-count', 'count', 2);
  $('#mo-grout-color').value = m.groutColor;
  $('#mo-grout-color').onchange = (e: any) => { m.groutColor = e.target.value; savePrefs(); };
  $('#mo-bricks').checked = m.bricks;
  $('#mo-bricks').onchange = (e: any) => { m.bricks = e.target.checked; savePrefs(); };
  for (const r of document.querySelectorAll<HTMLInputElement>('input[name=mo-colors]')) {
    r.checked = r.value === m.colors;
    r.onchange = () => { if (r.checked) { m.colors = r.value; savePrefs(); } };
  }
  $('#btn-mosaic').onclick = () => { estimate(); $('#dlg-mosaic').showModal(); };
  $('#mo-go').onclick = () => { $('#dlg-mosaic').close(); makeMosaic(); };
  $('#btn-reduce').onclick = reduceToPalette;
}
