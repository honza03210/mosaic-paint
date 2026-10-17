/* Selections – rectangles, freehand (lasso), along edges (magnetic lasso) and by color (magic wand), added
   or taken away – moving pixels (they float until placed), copy / cut / paste with the
   system clipboard (images from the vector app, screenshots, other programs), clearing and cropping. */
import type { Pt } from '../lib/geometry.ts';
import type { Box } from '../lib/raster.ts';
import { $, toast, loadImg } from '../shared/ui.ts';
import { canCopyImages, copyImage, canvasToPng, svgToCanvas, svgSize } from '../shared/clipboard.ts';
import { state, emit } from './state.ts';
import { doc, dctx, view, makeCanvas, toDoc, requestRender, fitView, flat, mapLayers, layers, pieceCorners, handlesShown, knobShown, knobAt, afterRender } from './canvas.ts';
import { commit, restoreCurrent, afterChange } from './history.ts';
import type { Tool } from './paint.ts';
import { t } from '../shared/i18n.ts';
import { askYes } from '../shared/dialogs.ts';
import * as S from '../lib/selection.ts';

const inside = (b: Box, p: Pt) => p.x >= b.x && p.y >= b.y && p.x < b.x + b.w && p.y < b.y + b.h;
/** Inside the selection's shape (not just its box). */
function inSelection(p: Pt): boolean {
  const b = state.sel;
  if (!b || !inside(b, p)) return false;
  return !b.mask || b.mask[Math.floor(p.y - b.y) * b.w + Math.floor(p.x - b.x)] >= 128;
}
const floatBox = (): Box | null => {
  const f = state.floating;
  return f ? { x: f.x, y: f.y, w: f.canvas.width, h: f.canvas.height } : null;
};
/** The selection clipped to the image, or null. */
function clip(b: Box): Box | null {
  const x0 = Math.max(0, b.x), y0 = Math.max(0, b.y), x1 = Math.min(doc.width, b.x + b.w), y1 = Math.min(doc.height, b.y + b.h);
  return x1 > x0 && y1 > y0 ? { x: x0, y: y0, w: x1 - x0, h: y1 - y0 } : null;
}
/** How much of each pixel of the selection's box is selected (null: all of it – a rectangle). */
export const selectionMask = (): Uint8Array | null => state.sel?.mask || null;
/** The selection as a whole-image mask (null: nothing selected). */
export function selectionFullMask(): Uint8Array | null {
  const b = state.sel;
  return b ? S.fullMask(b, b.mask || null, doc.width, doc.height) : null;
}
/** Makes a whole-image mask the selection – replacing, adding to or taking from the one there is. */
export function setSelectionMask(m: Uint8Array, op: S.SelMode = 'new'): void {
  if (state.floating) place();
  const full = S.combine(selectionFullMask(), m, op), box = S.maskBox(full, doc.width, doc.height);
  if (!box) { state.sel = null; selectionChanged(); return; }
  const mask = S.cropMask(full, doc.width, box);
  state.sel = S.isFull(mask) ? box : { ...box, mask, edges: S.outline(mask, box.w, box.h) };
  selectionChanged();
}
/** A canvas the size of the selection's box, white where it is selected (to cut pixels to its shape). */
function maskCanvas(b: Box, mask: Uint8Array): HTMLCanvasElement {
  const c = makeCanvas(b.w, b.h), x = c.getContext('2d'), im = x.createImageData(b.w, b.h);
  for (let i = 0; i < mask.length; i++) { im.data[i * 4] = im.data[i * 4 + 1] = im.data[i * 4 + 2] = 255; im.data[i * 4 + 3] = mask[i]; }
  x.putImageData(im, 0, 0);
  return c;
}
export function selectionChanged(): void {
  const b = floatBox() || state.sel;
  $('#sel-section').hidden = !b;
  if (b) $('#sel-info').textContent = state.floating ? t('({w} × {h} px, not placed yet)', { w: b.w, h: b.h }) : `(${b.w} × ${b.h} px)`;
  requestRender();
  emit('selection');
}

// ---- floating pixels ----------------------------------------------------------------------------------
/** Lifts the selected pixels (cut to the selection's shape) so they can be moved. copy: leave the original. */
function lift(copy: boolean): void {
  const b = state.sel;
  const c = makeCanvas(b.w, b.h), x = c.getContext('2d');
  x.drawImage(doc, b.x, b.y, b.w, b.h, 0, 0, b.w, b.h);
  if (b.mask) {
    const mc = maskCanvas(b, b.mask);
    x.globalCompositeOperation = 'destination-in';
    x.drawImage(mc, 0, 0);
    if (!copy) {
      dctx.save();
      dctx.globalCompositeOperation = 'destination-out';
      dctx.drawImage(mc, b.x, b.y);
      dctx.restore();
    }
  } else if (!copy) dctx.clearRect(b.x, b.y, b.w, b.h);
  state.floating = { canvas: c, x: b.x, y: b.y, mask: b.mask };
  state.sel = null;
}
/** Puts floating pixels down onto the image (one undo step). */
export function place(): boolean {
  const f = state.floating;
  if (!f) return false;
  dctx.drawImage(f.canvas, f.x, f.y);
  const box = clip({ x: f.x, y: f.y, w: f.canvas.width, h: f.canvas.height });
  // the shape stays selected where it is still whole on the image
  state.sel = box && f.mask && box.w === f.canvas.width && box.h === f.canvas.height ? { ...box, mask: f.mask, edges: S.outline(f.mask, box.w, box.h) } : box;
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
/** Everything that isn't selected becomes the selection (nothing selected: all of it). */
export function invertSelection(): void {
  if (state.floating) place();
  const m = selectionFullMask() || new Uint8Array(doc.width * doc.height);
  for (let i = 0; i < m.length; i++) m[i] = 255 - m[i];
  setSelectionMask(m, 'new');
  if (!state.sel) toast(t('Everything was selected – now nothing is.'));
}
export function selectAll(): void {
  if (state.floating) place();
  state.sel = { x: 0, y: 0, w: doc.width, h: doc.height };
  selectionChanged();
}

// ---- scaling and turning the floating pixels (two fingers) ----------------------------------------------------
/** The corner handle (0–3, clockwise from the top left) under p, or -1 – within a few screen px. */
function handleAt(p: Pt, touch = false): number {
  // the rotate knob: 4 (bigger for a finger)
  const k = knobShown() && knobAt();
  if (k && Math.hypot(k.x - p.x, k.y - p.y) <= (touch ? 20 : 9) / state.view.s) return 4;
  const cs = handlesShown() && pieceCorners(), r = 7 / state.view.s;
  return cs ? cs.findIndex(c => Math.abs(c.x - p.x) <= r && Math.abs(c.y - p.y) <= r) : -1;
}
/** The resize cursor for each corner (as the piece stands, roughly turned with it). */
function handleCursor(i: number): string {
  if (i === 4) return 'grab';
  const cs = pieceCorners(), c = cs[i], o = cs[(i + 2) % 4];
  const a = ((Math.atan2(c.y - o.y, c.x - o.x) * 180 / Math.PI) + 360) % 180;
  return a < 22.5 || a >= 157.5 ? 'ew-resize' : a < 67.5 ? 'nwse-resize' : a < 112.5 ? 'ns-resize' : 'nesw-resize';
}
/** Where the floating pixels stand: centre (image px), size and turn. */
export interface Placement { cx: number; cy: number; s: number; r: number }
/**
 * A two-finger gesture at these points (image px, pad: how near counts) takes hold of the selection or the
 * floating pixels – lifting the selection if it isn't yet – and gets where they stand; null: it isn't on them
 * (the gesture zooms the view).
 */
export function grabForTransform(pts: Pt[], pad: number): Placement | null {
  if (state.tool !== 'select' && state.tool !== 'text') return null;
  const b = floatBox() || state.sel;
  if (!b || !pts.some(p => inside({ x: b.x - pad, y: b.y - pad, w: b.w + 2 * pad, h: b.h + 2 * pad }, p))) return null;
  return holdPiece();
}
/** The selection lifted (if it isn't yet), ready to be transformed: where it stands; null: nothing selected. */
function holdPiece(): Placement | null {
  if (!state.floating && !state.sel) return null;
  if (!state.floating) { lift(false); selectionChanged(); }
  const f = state.floating;
  if (!f.xf) f.xf = { src: f.canvas, mask: f.mask, s: 1, r: 0, ox: f.canvas.width / 2, oy: f.canvas.height / 2 };
  return { cx: f.x + f.xf.ox, cy: f.y + f.xf.oy, s: f.xf.s, r: f.xf.r };
}
/** The biggest and smallest the floating pixels may get (a few px; no more than a big canvas). */
export function scaleLimits(): [number, number] {
  const s = state.floating?.xf?.src;
  if (!s) return [1, 1];
  return [Math.min(1, 4 / Math.min(s.width, s.height)), Math.max(1, Math.min(8192 / Math.hypot(s.width, s.height), Math.sqrt(24e6 / (s.width * s.height))))];
}
/** Shows the floating pixels at this size and turn while the fingers move (drawn, not yet made). */
export function transformLive(p: Placement): void {
  const f = state.floating;
  if (!f?.xf) return;
  f.live = p;
  requestRender();
}
/** The fingers are lifted: the floating pixels are made at the new size and turn (with their shape). */
export function transformDone(force = false): void {
  const f = state.floating, xf = f?.xf, p = f?.live;
  if (!p) return;
  f.live = undefined;
  if (!force && p.s === xf.s && p.r === xf.r && p.cx === f.x + xf.ox && p.cy === f.y + xf.oy) { requestRender(); return; }
  const sw = xf.src.width, sh = xf.src.height, cos = Math.abs(Math.cos(p.r)), sin = Math.abs(Math.sin(p.r));
  const bw = (sw * cos + sh * sin) * p.s, bh = (sw * sin + sh * cos) * p.s;
  const x0 = Math.floor(p.cx - bw / 2), y0 = Math.floor(p.cy - bh / 2);
  const w = Math.max(1, Math.ceil(p.cx + bw / 2) - x0), h = Math.max(1, Math.ceil(p.cy + bh / 2) - y0);
  const draw = (src: HTMLCanvasElement) => {
    const c = makeCanvas(w, h), x = c.getContext('2d');
    x.imageSmoothingQuality = 'high';
    x.translate(p.cx - x0, p.cy - y0);
    x.rotate(p.r);
    x.scale(p.s, p.s);
    x.drawImage(src, -sw / 2, -sh / 2);
    return c;
  };
  f.canvas = draw(xf.src);
  // the shape: turned by other than a right angle, even a rectangle has one
  const square = Math.abs(Math.sin(2 * p.r)) < 1e-9;
  if (xf.mask || !square) {
    const full = makeCanvas(sw, sh), fx = full.getContext('2d');
    fx.fillStyle = '#fff';
    fx.fillRect(0, 0, sw, sh);
    const d = draw(xf.mask ? maskCanvas({ x: 0, y: 0, w: sw, h: sh }, xf.mask) : full).getContext('2d').getImageData(0, 0, w, h).data;
    const m = new Uint8Array(w * h);
    for (let i = 0; i < m.length; i++) m[i] = d[i * 4 + 3];
    f.mask = m;
  } else f.mask = undefined;
  f.x = x0;
  f.y = y0;
  xf.s = p.s;
  xf.r = p.r;
  xf.ox = p.cx - x0;
  xf.oy = p.cy - y0;
  // scaled or turned text is pixels now (editing it would start again from the plain text)
  f.text = undefined;
  selectionChanged();
}

/** An angle in −π…π. */
const norm = (r: number) => Math.atan2(Math.sin(r), Math.cos(r));
/** Close to upright (a quarter turn, within 3°): upright. Shift: 15° steps. */
function snapAngle(r: number, steps: boolean): number {
  const st = steps ? Math.PI / 12 : Math.PI / 2, q = Math.round(r / st) * st;
  return steps || Math.abs(r - q) < 3 * Math.PI / 180 ? q : r;
}
/** Turns the selection by a (radians, clockwise on screen) about its centre. */
export function rotateSelection(a: number): void {
  const at = holdPiece();
  if (!at) return;
  state.floating.live = { ...at, r: snapAngle(norm(at.r + a), false) };
  transformDone(true);
}
/** Mirrors the selection left to right (h) or top to bottom (v), on screen – also when it is turned. */
export function flipSelection(axis: 'h' | 'v'): void {
  const at = holdPiece();
  if (!at) return;
  const xf = state.floating.xf, w = xf.src.width, h = xf.src.height;
  const c = makeCanvas(w, h), x = c.getContext('2d');
  x.setTransform(axis === 'h' ? -1 : 1, 0, 0, axis === 'v' ? -1 : 1, axis === 'h' ? w : 0, axis === 'v' ? h : 0);
  x.drawImage(xf.src, 0, 0);
  xf.src = c;
  if (xf.mask) {
    const m = new Uint8Array(xf.mask.length);
    for (let yy = 0; yy < h; yy++) for (let xx = 0; xx < w; xx++) m[yy * w + xx] = xf.mask[(axis === 'v' ? h - 1 - yy : yy) * w + (axis === 'h' ? w - 1 - xx : xx)];
    xf.mask = m;
  }
  // a mirror turns the other way round: mirrored and turned by r = turned by −r and mirrored
  state.floating.live = { ...at, r: norm(-at.r) };
  transformDone(true);
}
/** Leaves a copy where the selection is; the selection moves a little aside, to be dragged on. */
export function duplicateSelection(): void {
  if (!state.floating) { if (!state.sel) return; lift(true); }
  else dctx.drawImage(state.floating.canvas, state.floating.x, state.floating.y);
  const d = Math.max(1, Math.round(16 / state.view.s));
  state.floating.x += d;
  state.floating.y += d;
  selectionChanged();
}
/** The toolbar by the selection: below it (or above, by the knob, when there's no room); Place / Cancel only for floating pixels. */
function placeBar(): void {
  const bar = document.getElementById('stage-actions');
  if (!bar) return;
  const cs = state.tool === 'select' && !state.action && !state.floating?.live ? pieceCorners() : null;
  const floating = !!state.floating && (state.tool === 'select' || state.tool === 'text');
  // the text tool's floating text: only Place / Cancel (as before), at the bottom
  if (!cs) {
    bar.hidden = !floating;
    bar.classList.remove('follow');
    bar.style.left = bar.style.top = '';
    for (const b of bar.querySelectorAll<HTMLElement>('.sa-tf')) b.hidden = true;
    for (const id of ['#sa-finish', '#sa-cancel']) $(id).hidden = false;
    return;
  }
  bar.hidden = false;
  for (const b of bar.querySelectorAll<HTMLElement>('.sa-tf')) b.hidden = false;
  for (const id of ['#sa-finish', '#sa-cancel']) $(id).hidden = !state.floating;
  bar.classList.add('follow');
  const v = state.view, W = view.clientWidth, H = view.clientHeight, gap = 12;
  const xs = cs.map(p => (p.x - v.x) * v.s + view.offsetLeft), ys = cs.map(p => (p.y - v.y) * v.s + view.offsetTop);
  const bw = bar.offsetWidth, bh = bar.offsetHeight;
  const left = Math.max(8, Math.min(W - bw - 8, (Math.min(...xs) + Math.max(...xs)) / 2 - bw / 2));
  let top = Math.max(...ys) + gap;
  // no room below: above the knob; no room there either: at the bottom of the view
  if (top + bh > H - 8) top = Math.min(...ys) - 26 - 8 - gap - bh;
  if (top < 8) top = H - bh - 14;
  bar.style.left = Math.round(left) + 'px';
  bar.style.top = Math.round(top) + 'px';
}
afterRender.push(placeBar);

// ---- the Select tool: rectangle, lasso, magnetic lasso, magic wand ------------------------------------------------
/** What a new selection does: Shift adds, Alt takes away; otherwise the chosen New / Add / Subtract. */
const opFor = (e: PointerEvent): S.SelMode => (e.shiftKey ? 'add' : e.altKey ? 'subtract' : state.selOp);
/** A closed outline (image pixels) as a whole-image mask, with smooth edges. */
function polygonMask(pts: Pt[]): Uint8Array {
  const c = makeCanvas(doc.width, doc.height), x = c.getContext('2d');
  x.beginPath();
  pts.forEach((p, i) => (i ? x.lineTo(p.x, p.y) : x.moveTo(p.x, p.y)));
  x.closePath();
  x.fillStyle = '#fff';
  x.fill();
  const d = x.getImageData(0, 0, doc.width, doc.height).data, m = new Uint8Array(doc.width * doc.height);
  for (let i = 0; i < m.length; i++) m[i] = d[i * 4 + 3];
  return m;
}
/** The magnetic lasso's edge-cost map, worked out when it starts. */
let cost: Float32Array | null = null;
/** The outline being drawn (lasso, magnetic, a rectangle being added or taken away): a dashed line. */
function lassoPreview(pts: Pt[], live: Pt[] = []): void {
  state.preview = (ctx, px) => {
    const all = [...pts, ...live];
    if (all.length < 2) return;
    ctx.beginPath();
    all.forEach((q, i) => (i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y)));
    ctx.lineWidth = 2 * px;
    ctx.strokeStyle = 'rgba(0,0,0,.7)';
    ctx.stroke();
    ctx.setLineDash([4 * px, 4 * px]);
    ctx.lineWidth = px;
    ctx.strokeStyle = '#fff';
    ctx.stroke();
    ctx.setLineDash([]);
  };
  requestRender();
}
/** Selecting an object by tapping it (the AI add-on puts its own here). */
export const selectHooks: { object: ((p: Pt, op: S.SelMode) => void) | null } = { object: null };
/** Lifts the selection to move it with the pointer (copy: leave the original). */
function startMove(p: Pt, copy: boolean): void {
  lift(copy);
  state.action = { type: 'move', dx: p.x - state.floating.x, dy: p.y - state.floating.y };
  selectionChanged();
}
/** The wand or Object (AI) at p. */
function pickAt(p: Pt, op: S.SelMode): void {
  if (state.selShape === 'object') { selectHooks.object?.(p, op); return; }
  const x = Math.floor(p.x), y = Math.floor(p.y);
  if (x < 0 || y < 0 || x >= doc.width || y >= doc.height) return;
  setSelectionMask(S.wandMask(dctx.getImageData(0, 0, doc.width, doc.height), x, y, state.tolerance, state.contiguous), op);
}
const magnetMargin = () => Math.max(8, Math.round(24 / state.view.s));
export const selectTool: Tool = {
  down(e, p) {
    // a corner handle: scale it, the opposite corner staying put (the selection is lifted first)
    const h = handleAt(p, e.pointerType === 'touch');
    if (h === 4) {
      // the rotate knob: turn it about its centre
      const at = holdPiece();
      if (at) { state.action = { type: 'rotate', at, a0: Math.atan2(p.y - at.cy, p.x - at.cx) }; view.style.cursor = 'grabbing'; return; }
    }
    if (h >= 0 && h < 4) {
      const anchor = pieceCorners()[(h + 2) % 4], corner = pieceCorners()[h];
      const at = grabForTransform([corner], 1);
      if (at) { state.action = { type: 'scale', anchor, corner, at }; return; }
    }
    const fb = floatBox();
    if (fb && inside(fb, p)) {
      state.action = { type: 'move', dx: p.x - fb.x, dy: p.y - fb.y };
      return;
    }
    const op = opFor(e);
    // drag inside the selection: move it (Alt: a copy) – unless adding to it or taking from it. With the wand or
    // Object it is a drag only once it moves: a tap there selects anew (as a magic wand does)
    if (!fb && state.sel && inSelection(p) && !e.shiftKey && state.selOp === 'new') {
      if (state.selShape === 'wand' || state.selShape === 'object') {
        state.action = { type: 'press', p, sx: e.clientX, sy: e.clientY, alt: e.altKey, op };
        return;
      }
      startMove(p, e.altKey);
      return;
    }
    if (fb) place();
    const q = { x: Math.round(p.x), y: Math.round(p.y) };
    if (state.selShape === 'wand' || state.selShape === 'object') { pickAt(p, op); return; }
    if (state.selShape === 'lasso') { state.action = { type: 'lasso', op, pts: [p] }; return; }
    if (state.selShape === 'magnetic') {
      cost = S.edgeCost(dctx.getImageData(0, 0, doc.width, doc.height));
      state.action = { type: 'magnetic', op, anchors: [q], path: [q], live: [] as Pt[] };
      return;
    }
    state.action = { type: 'marquee', op, a: q, prev: state.sel };
    if (op === 'new') { state.sel = null; selectionChanged(); }
  },
  move(e, p) {
    let a = state.action;
    if (!a) {
      // hovering a corner handle: the resize cursor
      const h = e.pointerType === 'touch' ? -1 : handleAt(p);
      view.style.cursor = h >= 0 ? handleCursor(h) : '';
      return;
    }
    if (a.type === 'rotate') {
      const r = snapAngle(norm(a.at.r + Math.atan2(p.y - a.at.cy, p.x - a.at.cx) - a.a0), e.shiftKey);
      transformLive({ ...a.at, r });
      return;
    }
    if (a.type === 'scale') {
      // along the diagonal: how far the pointer is from the fixed corner, against how far the corner was
      const dx = a.corner.x - a.anchor.x, dy = a.corner.y - a.anchor.y, d2 = dx * dx + dy * dy || 1;
      const [lo, hi] = scaleLimits();
      let s = Math.min(hi, Math.max(lo, a.at.s * ((p.x - a.anchor.x) * dx + (p.y - a.anchor.y) * dy) / d2));
      // upright: whole pixels wide (no half-transparent edge)
      if (Math.abs(Math.sin(2 * a.at.r)) < 1e-9) { const src = state.floating.xf.src, m = Math.max(src.width, src.height); s = Math.max(1, Math.round(m * s)) / m; }
      const k = s / a.at.s;
      transformLive({ s, r: a.at.r, cx: a.anchor.x + (a.at.cx - a.anchor.x) * k, cy: a.anchor.y + (a.at.cy - a.anchor.y) * k });
      return;
    }
    // a press inside the selection (wand, Object) that moves: it is a drag
    if (a.type === 'press') {
      if (Math.hypot(e.clientX - a.sx, e.clientY - a.sy) < 8) return;
      startMove(a.p, a.alt);
      a = state.action;
    }
    if (a.type === 'move') {
      state.floating.x = Math.round(p.x - a.dx);
      state.floating.y = Math.round(p.y - a.dy);
      requestRender();
    } else if (a.type === 'marquee') {
      const b = { x: Math.round(p.x), y: Math.round(p.y) }, box = clip({ x: Math.min(a.a.x, b.x), y: Math.min(a.a.y, b.y), w: Math.abs(b.x - a.a.x), h: Math.abs(b.y - a.a.y) });
      if (a.op === 'new') { state.sel = box; selectionChanged(); } else {
        a.box = box;
        lassoPreview(box ? [{ x: box.x, y: box.y }, { x: box.x + box.w, y: box.y }, { x: box.x + box.w, y: box.y + box.h }, { x: box.x, y: box.y + box.h }, { x: box.x, y: box.y }] : []);
      }
    } else if (a.type === 'lasso') {
      const last = a.pts[a.pts.length - 1];
      if (Math.hypot(p.x - last.x, p.y - last.y) * state.view.s >= 2) a.pts.push(p);
      lassoPreview(a.pts);
    } else if (a.type === 'magnetic') {
      // the path from the last anchor hugs the edges; far enough along, most of it is fixed and a new anchor set
      const anchor = a.anchors[a.anchors.length - 1];
      a.live = S.cheapestPath(cost, doc.width, doc.height, anchor, p, magnetMargin());
      if (Math.hypot(p.x - anchor.x, p.y - anchor.y) * state.view.s > 40 && a.live.length > 4) {
        const keep = a.live.slice(0, Math.floor(a.live.length * 0.75));
        a.path.push(...keep);
        a.anchors.push(keep[keep.length - 1]);
        a.live = S.cheapestPath(cost, doc.width, doc.height, keep[keep.length - 1], p, magnetMargin());
      }
      lassoPreview(a.path, a.live);
    }
  },
  up() {
    const a = state.action;
    state.action = null;
    state.preview = null;
    if (a?.type === 'scale' || a?.type === 'rotate') { if (a.type === 'rotate') view.style.cursor = 'grab'; transformDone(); requestRender(); return; }
    // a press that didn't move: a tap – the wand or Object there
    if (a?.type === 'press') { pickAt(a.p, a.op); return; }
    if (a?.type === 'marquee' && a.op !== 'new') {
      if (a.box) setSelectionMask(S.fullMask(a.box, null, doc.width, doc.height), a.op);
    } else if (a?.type === 'lasso' && a.pts.length > 2) {
      setSelectionMask(polygonMask(a.pts), a.op);
    } else if (a?.type === 'magnetic') {
      // closed back to the start along the edges too
      const pts = [...a.path, ...a.live];
      if (pts.length > 2) setSelectionMask(polygonMask([...pts, ...S.cheapestPath(cost, doc.width, doc.height, pts[pts.length - 1], pts[0], magnetMargin())]), a.op);
      cost = null;
    }
    selectionChanged();
  },
};

// ---- selection commands -------------------------------------------------------------------------------
/** The pixels to copy: the floating ones, the selection (cut to its shape), or the whole image. */
function copySource(): HTMLCanvasElement {
  if (state.floating) return state.floating.canvas;
  if (!state.sel) return flat();
  const b = state.sel;
  const c = makeCanvas(b.w, b.h), x = c.getContext('2d');
  x.drawImage(doc, b.x, b.y, b.w, b.h, 0, 0, b.w, b.h);
  const mask = state.sel?.mask;
  if (mask) { x.globalCompositeOperation = 'destination-in'; x.drawImage(maskCanvas(b, mask), 0, 0); }
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
  if (b.mask) {
    dctx.save();
    dctx.globalCompositeOperation = 'destination-out';
    dctx.drawImage(maskCanvas(b, b.mask), b.x, b.y);
    dctx.restore();
  } else dctx.clearRect(b.x, b.y, b.w, b.h);
  commit();
}
export function crop(): void {
  if (state.floating) place();
  const b = state.sel;
  if (!b) { toast(t('Select the part to keep first.')); return; }
  // every layer, cut to the selection's box (and its shape)
  const mask = b.mask ? maskCanvas(b, b.mask) : null;
  mapLayers((old) => {
    const c = makeCanvas(b.w, b.h), x = c.getContext('2d');
    x.drawImage(old, b.x, b.y, b.w, b.h, 0, 0, b.w, b.h);
    if (mask) { x.globalCompositeOperation = 'destination-in'; x.drawImage(mask, 0, 0); }
    return c;
  });
  for (const L of layers) L.rev++;
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
    && await askYes(t('The pasted image ({w} × {h}) is bigger than this one ({W} × {H}). Enlarge the canvas to fit it?', { w: c.width, h: c.height, W: doc.width, H: doc.height }))) {
    const W = Math.max(doc.width, c.width), H = Math.max(doc.height, c.height);
    mapLayers((old) => { const n = makeCanvas(W, H); n.getContext('2d').drawImage(old, 0, 0); return n; });
    for (const L of layers) L.rev++;
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
