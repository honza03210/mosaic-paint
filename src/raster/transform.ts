/* Turning and trimming the whole image: rotate (by 90° or any angle – the canvas grows to hold it), flip,
   crop to the selection, and trim an empty or one-color border. Each is one undo step. */
import * as R from '../lib/raster.ts';
import { toast } from '../shared/ui.ts';
import { state } from './state.ts';
import { doc, makeCanvas, fitView, mapLayers, flatImage, layers } from './canvas.ts';
import { commit } from './history.ts';
import { place, selectionChanged, crop } from './select.ts';
import { MAX_SIDE } from './files.ts';
import { t } from '../shared/i18n.ts';

/** Turns every layer by fn (as one undo step; pasted or moved pixels are placed first). */
function transformAll(fn: (old: HTMLCanvasElement) => HTMLCanvasElement): void {
  if (state.floating) place();
  mapLayers(fn);
  for (const L of layers) L.rev++;
  state.sel = null;
  commit();
  selectionChanged();
  fitView();
}

/** Rotates the image clockwise by deg; by other than quarter turns the canvas grows and the corners stay transparent. */
export function rotate(deg: number): void {
  const a = ((deg % 360) + 360) % 360;
  if (!a) return;
  const w = doc.width, h = doc.height, rad = a * Math.PI / 180, quarter = a % 90 === 0;
  const cos = Math.abs(Math.cos(rad)), sin = Math.abs(Math.sin(rad));
  const W = quarter ? (a % 180 ? h : w) : Math.ceil(w * cos + h * sin - 1e-6);
  const H = quarter ? (a % 180 ? w : h) : Math.ceil(w * sin + h * cos - 1e-6);
  if (W > MAX_SIDE || H > MAX_SIDE) { toast(t('Enter a size from 1 to {max} px.', { max: MAX_SIDE })); return; }
  transformAll((old) => {
    const c = makeCanvas(W, H), x = c.getContext('2d');
    // quarter turns move whole pixels; other angles are drawn smoothly
    x.imageSmoothingEnabled = !quarter;
    x.imageSmoothingQuality = 'high';
    x.translate(W / 2, H / 2);
    x.rotate(rad);
    x.drawImage(old, -old.width / 2, -old.height / 2);
    return c;
  });
}
/** Mirrors the image: left ↔ right (horizontal) or upside down. */
export function flip(horizontal: boolean): void {
  transformAll((old) => {
    const c = makeCanvas(old.width, old.height), x = c.getContext('2d');
    x.translate(horizontal ? old.width : 0, horizontal ? 0 : old.height);
    x.scale(horizontal ? -1 : 1, horizontal ? 1 : -1);
    x.drawImage(old, 0, 0);
    return c;
  });
}
/** Keeps the selection only (or says how to select it). */
export function cropToSelection(): void {
  if (!state.sel && !state.floating) { toast(t('Select the part to keep with the Select tool (V), then crop.')); return; }
  crop();
}
/** Cuts off the border: the empty or one-color edge around the picture. */
export function trim(): void {
  if (state.floating) place();
  // the border of the picture as it looks (all the layers)
  const b = R.trimBox(flatImage());
  if (!b) { toast(t('The image is all one color – nothing to trim.')); return; }
  if (b.w === doc.width && b.h === doc.height) { toast(t('There is no border to trim.')); return; }
  transformAll((old) => {
    const c = makeCanvas(b.w, b.h);
    c.getContext('2d').drawImage(old, b.x, b.y, b.w, b.h, 0, 0, b.w, b.h);
    return c;
  });
  toast(t('Trimmed to {w} × {h} px.', { w: b.w, h: b.h }));
}
