/* Rectangle selection: selecting, moving pixels (they float until placed), copy / cut / paste with the
   system clipboard (images from the vector app, screenshots, other programs), clearing and cropping. */
import type { Pt } from '../lib/geometry.ts';
import type { Box } from '../lib/raster.ts';
import { $, toast, loadImg } from '../shared/ui.ts';
import { canCopyImages, copyImage, canvasToPng, svgToCanvas, svgSize } from '../shared/clipboard.ts';
import { state, emit } from './state.ts';
import { doc, dctx, view, makeCanvas, setSize, toDoc, requestRender, fitView } from './canvas.ts';
import { commit, restoreCurrent, afterChange } from './history.ts';
import type { Tool } from './paint.ts';
import { t } from '../shared/i18n.ts';

const inside = (b: Box, p: Pt) => p.x >= b.x && p.y >= b.y && p.x < b.x + b.w && p.y < b.y + b.h;
const floatBox = (): Box | null => {
  const f = state.floating;
  return f ? { x: f.x, y: f.y, w: f.canvas.width, h: f.canvas.height } : null;
};
/** The selection clipped to the image, or null. */
function clip(b: Box): Box | null {
  const x0 = Math.max(0, b.x), y0 = Math.max(0, b.y), x1 = Math.min(doc.width, b.x + b.w), y1 = Math.min(doc.height, b.y + b.h);
  return x1 > x0 && y1 > y0 ? { x: x0, y: y0, w: x1 - x0, h: y1 - y0 } : null;
}
export function selectionChanged(): void {
  const b = floatBox() || state.sel;
  $('#sel-section').hidden = !b;
  if (b) $('#sel-info').textContent = state.floating ? t('({w} × {h} px, not placed yet)', { w: b.w, h: b.h }) : `(${b.w} × ${b.h} px)`;
  $('#stage-actions').hidden = !state.floating;
  requestRender();
  emit('selection');
}

// ---- floating pixels ----------------------------------------------------------------------------------
/** Lifts the selected pixels so they can be moved. copy: leave the original in place. */
function lift(copy: boolean): void {
  const b = state.sel;
  const c = makeCanvas(b.w, b.h);
  c.getContext('2d').drawImage(doc, b.x, b.y, b.w, b.h, 0, 0, b.w, b.h);
  if (!copy) dctx.clearRect(b.x, b.y, b.w, b.h);
  state.floating = { canvas: c, x: b.x, y: b.y };
  state.sel = null;
}
/** Puts floating pixels down onto the image (one undo step). */
export function place(): boolean {
  const f = state.floating;
  if (!f) return false;
  dctx.drawImage(f.canvas, f.x, f.y);
  state.sel = clip({ x: f.x, y: f.y, w: f.canvas.width, h: f.canvas.height });
  state.floating = null;
  commit();
  selectionChanged();
  return true;
}
/** Drops floating pixels: a moved selection goes back, a paste disappears. */
export function cancelFloating(): void {
  if (!state.floating) return;
  restoreCurrent();
  selectionChanged();
}
export function deselect(): void {
  if (state.floating) place();
  state.sel = null;
  selectionChanged();
}
export function selectAll(): void {
  if (state.floating) place();
  state.sel = { x: 0, y: 0, w: doc.width, h: doc.height };
  selectionChanged();
}

export const selectTool: Tool = {
  down(e, p) {
    const fb = floatBox();
    if (fb && inside(fb, p)) {
      state.action = { type: 'move', dx: p.x - fb.x, dy: p.y - fb.y };
      return;
    }
    if (!fb && state.sel && inside(state.sel, p)) {
      lift(e.altKey);
      state.action = { type: 'move', dx: p.x - state.floating.x, dy: p.y - state.floating.y };
      selectionChanged();
      return;
    }
    if (fb) place();
    state.action = { type: 'marquee', a: { x: Math.round(p.x), y: Math.round(p.y) } };
    state.sel = null;
    selectionChanged();
  },
  move(e, p) {
    const a = state.action;
    if (!a) return;
    if (a.type === 'move') {
      state.floating.x = Math.round(p.x - a.dx);
      state.floating.y = Math.round(p.y - a.dy);
      requestRender();
    } else if (a.type === 'marquee') {
      const b = { x: Math.round(p.x), y: Math.round(p.y) };
      state.sel = clip({ x: Math.min(a.a.x, b.x), y: Math.min(a.a.y, b.y), w: Math.abs(b.x - a.a.x), h: Math.abs(b.y - a.a.y) });
      selectionChanged();
    }
  },
  up() {
    state.action = null;
    selectionChanged();
  },
};

// ---- selection commands -------------------------------------------------------------------------------
/** The pixels to copy: the floating ones, the selection, or the whole image. */
function copySource(): HTMLCanvasElement {
  if (state.floating) return state.floating.canvas;
  const b = state.sel || { x: 0, y: 0, w: doc.width, h: doc.height };
  const c = makeCanvas(b.w, b.h);
  c.getContext('2d').drawImage(doc, b.x, b.y, b.w, b.h, 0, 0, b.w, b.h);
  return c;
}
/** Kept for pasting here when the browser can't put images on the system clipboard. */
let internalClip: HTMLCanvasElement | null = null;
export async function copy(cut: boolean): Promise<void> {
  const c = copySource(), part = !!(state.floating || state.sel);
  internalClip = c;
  // ask for the clipboard right away (the PNG is made in the meantime): Safari only allows it during the click
  const ok = canCopyImages() ? await copyImage(canvasToPng(c)) : false;
  if (cut) clearSelection();
  const msg = ok
    ? (cut ? (part ? t('Cut the selection – paste it here, into the vector app or any other program.') : t('Cut the image – paste it here, into the vector app or any other program.'))
      : (part ? t('Copied the selection – paste it here, into the vector app or any other program.') : t('Copied the image – paste it here, into the vector app or any other program.')))
    : (cut ? (part ? t('Cut the selection (this browser keeps it for pasting here only).') : t('Cut the image (this browser keeps it for pasting here only).'))
      : (part ? t('Copied the selection (this browser keeps it for pasting here only).') : t('Copied the image (this browser keeps it for pasting here only).')));
  toast(msg);
}
/** Clears the selected pixels to transparent (or drops floating pixels). */
export function clearSelection(): void {
  if (state.floating) { state.floating = null; commit(); selectionChanged(); return; }
  const b = state.sel;
  if (!b) return;
  dctx.clearRect(b.x, b.y, b.w, b.h);
  commit();
}
export function crop(): void {
  if (state.floating) place();
  const b = state.sel;
  if (!b) { toast(t('Select the part to keep first.')); return; }
  const c = copySource();
  setSize(b.w, b.h);
  dctx.drawImage(c, 0, 0);
  state.sel = null;
  commit();
  selectionChanged();
  fitView();
}

// ---- paste ------------------------------------------------------------------------------------------------
let lastPointer: Pt | null = null;
view.addEventListener('pointermove', (e) => { lastPointer = toDoc(e.clientX, e.clientY); });
view.addEventListener('pointerleave', () => { lastPointer = null; });
/** Turns a pasted file / blob into a canvas (SVG from the vector app or elsewhere is rendered at its size). */
async function toCanvas(blob: Blob): Promise<HTMLCanvasElement | null> {
  try {
    if (/svg/.test(blob.type)) {
      const text = await blob.text(), { w, h } = svgSize(text);
      return await svgToCanvas(text, Math.max(16, Math.round(Math.max(w, h))));
    }
    const url = URL.createObjectURL(blob);
    try {
      const img = await loadImg(url);
      const c = makeCanvas(img.naturalWidth, img.naturalHeight);
      c.getContext('2d').drawImage(img, 0, 0);
      return c;
    } finally { URL.revokeObjectURL(url); }
  } catch { return null; }
}
/** Pastes an image as floating pixels: under the mouse if it's over the image, else in the middle of the view. */
export async function pasteImage(src: Blob | HTMLCanvasElement): Promise<void> {
  const c = src instanceof HTMLCanvasElement ? src : await toCanvas(src);
  if (!c) { toast(t('Could not read the pasted image.')); return; }
  if (state.floating) place();
  if ((c.width > doc.width || c.height > doc.height)
    && confirm(t('The pasted image ({w} × {h}) is bigger than this one ({W} × {H}). Enlarge the canvas to fit it?', { w: c.width, h: c.height, W: doc.width, H: doc.height }))) {
    const keep = makeCanvas(doc.width, doc.height);
    keep.getContext('2d').drawImage(doc, 0, 0);
    setSize(Math.max(doc.width, c.width), Math.max(doc.height, c.height));
    dctx.drawImage(keep, 0, 0);
    commit();
    fitView();
  }
  let at = lastPointer;
  if (!at) {
    const r = view.getBoundingClientRect();
    at = toDoc(r.left + r.width / 2, r.top + r.height / 2);
  }
  // centered on the pixel under the mouse, kept on the image where possible
  const x = Math.min(Math.max(Math.floor(at.x) - Math.floor(c.width / 2), 0), Math.max(0, doc.width - c.width));
  const y = Math.min(Math.max(Math.floor(at.y) - Math.floor(c.height / 2), 0), Math.max(0, doc.height - c.height));
  emit('paste-start');
  state.floating = { canvas: c, x, y };
  state.sel = null;
  afterChange();
  selectionChanged();
  toast(t('Pasted {w} × {h} px – drag it into place, then press Enter (or click outside it).', { w: c.width, h: c.height }));
}
/** Ctrl+V with nothing on the system clipboard the browser lets us read: what was copied here. */
export function pasteInternal(): boolean {
  if (!internalClip) return false;
  const c = makeCanvas(internalClip.width, internalClip.height);
  c.getContext('2d').drawImage(internalClip, 0, 0);
  pasteImage(c);
  return true;
}
