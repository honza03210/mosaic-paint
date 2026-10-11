/* Turning a picture into a mosaic: tiles (squares, offset squares, bricks, hexagons or irregular, smaller
   where the picture has detail) with grout, colored from the palette (or a palette suggested from the
   picture), and reducing a picture to the palette's colors. The tile layouts are the vector app's. */
import * as R from '../lib/raster.ts';
import * as AutoMosaic from '../lib/automosaic.ts';
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
  const res = tiles(img, palette);
  dctx.putImageData(new ImageData(res.img.data, b.w, b.h), b.x, b.y);
  commit();
  toast(`Made ${summary(res.counts, 'tile')}.`);
}
/** The mosaic of an image: the exact square grid when it can be, else the tile layout's polygons. */
function tiles(img: ImageData, palette: string[] | null) {
  const m = state.mosaic, adaptive = m.detail > 0 && ['square', 'brick', 'irregular'].includes(m.shape);
  if (m.shape === 'offset' || (m.shape === 'square' && !adaptive)) {
    return R.mosaic(img, { tile: m.tile, grout: m.grout, groutColor: m.groutColor, palette, bricks: m.shape === 'offset' });
  }
  // an area counts as detailed when its colors spread more than this (Lab units); more detail → lower bar
  const bar = 4 + (1 - m.detail / 100) * 26;
  const busy = (x: number, y: number, w: number, h: number) => R.detailAt(img, x, y, w, h) > bar;
  // bricks are two squares wide: their size is the row height
  const size = m.shape === 'brick' ? m.tile / 2 : m.tile;
  const cells = AutoMosaic.cells({ style: m.shape, box: { x: 0, y: 0, w: img.width, h: img.height }, size, detail: m.detail / 100, busy, seed: 7 });
  return R.mosaicCells(img, cells, { grout: m.grout, groutColor: m.groutColor, palette });
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
  const m = state.mosaic, b = state.sel || { w: doc.width, h: doc.height }, t = Math.max(2, m.tile);
  // area of one tile in t² (a hexagon t wide covers t² × √3/2; a brick t wide is half as high)
  const per = { hex: Math.sqrt(3) / 2, brick: 0.5 }[m.shape] || 1;
  const base = (b.w * b.h) / (t * t * per);
  // with detail, calm parts get bigger tiles: the size is the smallest tile
  const adaptive = m.detail > 0 && ['square', 'brick', 'irregular'].includes(m.shape);
  $('#mo-estimate').textContent = adaptive
    ? `At most about ${fmtN(Math.round(base))} tiles${state.sel ? ' in the selection' : ''} – bigger ones where the picture is calm.`
    : `About ${fmtN(Math.round(base))} tiles${state.sel ? ' in the selection' : ''}.`;
  $('#mo-detail-row').hidden = m.shape === 'hex' || m.shape === 'offset';
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
  $('#mo-shape').value = m.shape;
  $('#mo-shape').onchange = (e: any) => { m.shape = e.target.value; savePrefs(); estimate(); };
  $('#mo-detail').value = m.detail;
  $('#mo-detail').onchange = (e: any) => { m.detail = +e.target.value; savePrefs(); estimate(); };
  for (const r of document.querySelectorAll<HTMLInputElement>('input[name=mo-colors]')) {
    r.checked = r.value === m.colors;
    r.onchange = () => { if (r.checked) { m.colors = r.value; savePrefs(); } };
  }
  $('#btn-mosaic').onclick = () => { estimate(); $('#dlg-mosaic').showModal(); };
  $('#mo-go').onclick = () => { $('#dlg-mosaic').close(); makeMosaic(); };
  $('#btn-reduce').onclick = reduceToPalette;
}
