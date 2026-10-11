/* Turning and trimming the whole image: rotate (by 90° or any angle – the canvas grows to hold it), flip,
   crop to the selection, and trim an empty or one-color border. Each is one undo step. */
import * as R from '../lib/raster.ts';
import { toast } from '../shared/ui.ts';
import { state } from './state.ts';
import { doc, makeCanvas, setSize, dctx, getImage, fitView } from './canvas.ts';
import { commit } from './history.ts';
import { place, selectionChanged, crop } from './select.ts';
import { MAX_SIDE } from './files.ts';
import { t } from '../shared/i18n.ts';

/** Replaces the image with a canvas (as one undo step). */
function replaceWith(c: HTMLCanvasElement): void {
  setSize(c.width, c.height);
  dctx.clearRect(0, 0, c.width, c.height);
  dctx.drawImage(c, 0, 0);
  state.sel = null;
  commit();
  selectionChanged();
  fitView();
}
/** The image as it is now (pasted or moved pixels placed first). */
function current(): HTMLCanvasElement {
  if (state.floating) place();
  const c = makeCanvas(doc.width, doc.height);
  c.getContext('2d').drawImage(doc, 0, 0);
  return c;
}

/** Rotates the image clockwise by deg; by other than quarter turns the canvas grows and the corners stay transparent. */
export function rotate(deg: number): void {
  const a = ((deg % 360) + 360) % 360;
  if (!a) return;
  const old = current(), rad = a * Math.PI / 180, quarter = a % 90 === 0;
  const cos = Math.abs(Math.cos(rad)), sin = Math.abs(Math.sin(rad));
  const W = quarter ? (a % 180 ? old.height : old.width) : Math.ceil(old.width * cos + old.height * sin - 1e-6);
  const H = quarter ? (a % 180 ? old.width : old.height) : Math.ceil(old.width * sin + old.height * cos - 1e-6);
  if (W > MAX_SIDE || H > MAX_SIDE) { toast(t('Enter a size from 1 to {max} px.', { max: MAX_SIDE })); return; }
  const c = makeCanvas(W, H), x = c.getContext('2d');
  // quarter turns move whole pixels; other angles are drawn smoothly
  x.imageSmoothingEnabled = !quarter;
  x.imageSmoothingQuality = 'high';
  x.translate(W / 2, H / 2);
  x.rotate(rad);
  x.drawImage(old, -old.width / 2, -old.height / 2);
  replaceWith(c);
}
/** Mirrors the image: left ↔ right (horizontal) or upside down. */
export function flip(horizontal: boolean): void {
  const old = current(), c = makeCanvas(old.width, old.height), x = c.getContext('2d');
  x.translate(horizontal ? old.width : 0, horizontal ? 0 : old.height);
  x.scale(horizontal ? -1 : 1, horizontal ? 1 : -1);
  x.drawImage(old, 0, 0);
  replaceWith(c);
}
/** Keeps the selection only (or says how to select it). */
export function cropToSelection(): void {
  if (!state.sel && !state.floating) { toast(t('Select the part to keep with the Select tool (V), then crop.')); return; }
  crop();
}
/** Cuts off the border: the empty or one-color edge around the picture. */
export function trim(): void {
  if (state.floating) place();
  const b = R.trimBox(getImage());
  if (!b) { toast(t('The image is all one color – nothing to trim.')); return; }
  if (b.w === doc.width && b.h === doc.height) { toast(t('There is no border to trim.')); return; }
  const c = makeCanvas(b.w, b.h);
  c.getContext('2d').drawImage(doc, b.x, b.y, b.w, b.h, 0, 0, b.w, b.h);
  replaceWith(c);
  toast(t('Trimmed to {w} × {h} px.', { w: b.w, h: b.h }));
}
