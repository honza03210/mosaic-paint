/* The image (an offscreen canvas) and the view: zoom / pan, and drawing it all on screen –
   checkerboard under transparent pixels, the pixel grid, the selection and the tool previews. */
import type { Pt } from '../lib/geometry.ts';
import * as R from '../lib/raster.ts';
import { $, clamp } from '../shared/ui.ts';
import { state, emit } from './state.ts';

export const stage = $('#stage') as HTMLElement;
export const view = $('#view') as HTMLCanvasElement;
const vctx = view.getContext('2d');

/** One layer of the image: its pixels, name, whether it shows, how opaque it is. rev changes with its pixels
    (undo keeps a layer's pixels once for as long as they don't change). */
export interface Layer { id: number; canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D; name: string; visible: boolean; opacity: number; rev: number }
let nextId = 1;
export function makeLayer(w: number, h: number, name: string, id = nextId): Layer {
  const canvas = makeCanvas(w, h);
  nextId = Math.max(nextId, id + 1);
  return { id, canvas, ctx: canvas.getContext('2d', { willReadFrequently: true }), name, visible: true, opacity: 1, rev: 0 };
}
/** The layers, bottom first. Painting, filling, selecting work on the active one (doc / dctx). */
export const layers: Layer[] = [];
export let active = 0;
/** The image being edited: the active layer. */
export let doc: HTMLCanvasElement;
export let dctx: CanvasRenderingContext2D;
/** Makes layer i the one being edited. */
export function useLayer(i: number): void {
  active = Math.max(0, Math.min(layers.length - 1, i));
  doc = layers[active].canvas;
  dctx = layers[active].ctx;
}
layers.push(makeLayer(800, 600, 'Layer 1'));
useLayer(0);
/** Replaces all the layers (a new or opened image, undo). */
export function setLayers(list: Layer[], activeIndex: number): void {
  layers.splice(0, layers.length, ...list);
  useLayer(activeIndex);
  emit('layers');
}

export const W = (): number => doc.width;
export const H = (): number => doc.height;
/** Makes a new empty canvas of the given size. */
export function makeCanvas(w: number, h: number): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = Math.max(1, w);
  c.height = Math.max(1, h);
  return c;
}
/** Changes the image size: every layer, cleared (the caller redraws the active one – for the whole picture
    changing size or orientation use mapLayers). */
export function setSize(w: number, h: number): void {
  for (const L of layers) {
    if (L.canvas.width !== w) L.canvas.width = w;
    if (L.canvas.height !== h) L.canvas.height = h;
    L.rev++;
  }
  emit('size');
}
/** Every layer turned into what fn makes of it (rotating, flipping, cropping, resizing the whole picture). */
export function mapLayers(fn: (c: HTMLCanvasElement) => HTMLCanvasElement): void {
  for (const L of layers) {
    const c = fn(L.canvas);
    L.canvas.width = c.width;
    L.canvas.height = c.height;
    L.ctx.drawImage(c, 0, 0);
    L.rev++;
  }
  emit('size');
}
/** The picture as it looks: the visible layers on top of each other (the active canvas itself when it is the only one). */
export function flat(): HTMLCanvasElement {
  if (layers.length === 1 && layers[0].visible && layers[0].opacity === 1) return doc;
  const c = makeCanvas(doc.width, doc.height), x = c.getContext('2d');
  for (const L of layers) {
    if (!L.visible) continue;
    x.globalAlpha = L.opacity;
    x.drawImage(L.canvas, 0, 0);
  }
  return c;
}
export const flatImage = (): ImageData => { const c = flat(); return c.getContext('2d').getImageData(0, 0, c.width, c.height); };
export const getImage = (x = 0, y = 0, w = doc.width, h = doc.height): ImageData => dctx.getImageData(x, y, w, h);

// ---- view ---------------------------------------------------------------------------------------
export function toDoc(cx: number, cy: number): Pt {
  const r = view.getBoundingClientRect(), v = state.view;
  return { x: v.x + (cx - r.left) / v.s, y: v.y + (cy - r.top) / v.s };
}
export function updateView(): void {
  $('#zoom-label').textContent = Math.round(state.view.s * 100) + '%';
  requestRender();
  emit('view');
}
let fitted = false;
export function fitView(): void {
  const r = view.getBoundingClientRect(), pad = 24;
  if (!r.width || !r.height) return;
  fitted = true;
  const s = Math.min((r.width - 2 * pad) / doc.width, (r.height - 2 * pad) / doc.height);
  // whole-number zoom when enlarging keeps pixels square and sharp
  const sc = s >= 1 ? Math.max(1, Math.floor(s)) : s;
  state.view = { s: sc, x: doc.width / 2 - r.width / 2 / sc, y: doc.height / 2 - r.height / 2 / sc };
  updateView();
}
export function zoomAt(cx: number, cy: number, factor: number): void {
  const before = toDoc(cx, cy), v = state.view;
  v.s = clamp(v.s * factor, 0.02, 64);
  const r = view.getBoundingClientRect();
  v.x = before.x - (cx - r.left) / v.s;
  v.y = before.y - (cy - r.top) / v.s;
  updateView();
}
export function zoomCenter(f: number): void {
  const r = view.getBoundingClientRect();
  zoomAt(r.left + r.width / 2, r.top + r.height / 2, f);
}
/** One image pixel = one screen pixel. */
export function actualSize(): void {
  const r = view.getBoundingClientRect();
  zoomAt(r.left + r.width / 2, r.top + r.height / 2, 1 / (state.view.s * (window.devicePixelRatio || 1)));
}

// ---- drawing on screen ------------------------------------------------------------------------------
let checker: CanvasPattern | null = null;
function checkerPattern(): CanvasPattern {
  if (!checker) {
    const c = makeCanvas(16, 16), x = c.getContext('2d');
    x.fillStyle = '#ffffff'; x.fillRect(0, 0, 16, 16);
    x.fillStyle = '#d9d9d9'; x.fillRect(0, 0, 8, 8); x.fillRect(8, 8, 8, 8);
    checker = vctx.createPattern(c, 'repeat');
  }
  return checker;
}
let queued = false;
export function requestRender(): void {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => { queued = false; render(); });
}
function dashedRect(x: number, y: number, w: number, h: number): void {
  vctx.lineWidth = 1;
  vctx.setLineDash([]);
  vctx.strokeStyle = '#000';
  vctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
  vctx.setLineDash([4, 4]);
  vctx.strokeStyle = '#fff';
  vctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
  vctx.setLineDash([]);
}
export function render(): void {
  const dpr = window.devicePixelRatio || 1, v = state.view, s = v.s;
  const cw = Math.round(view.clientWidth * dpr), ch = Math.round(view.clientHeight * dpr);
  if (view.width !== cw || view.height !== ch) { view.width = cw; view.height = ch; }
  vctx.setTransform(1, 0, 0, 1, 0, 0);
  vctx.clearRect(0, 0, cw, ch);
  // screen position of the image, in device pixels
  const k = s * dpr, ox = -v.x * k, oy = -v.y * k, pw = doc.width * k, ph = doc.height * k;
  vctx.save();
  vctx.shadowColor = 'rgba(0,0,0,.45)';
  vctx.shadowBlur = 10 * dpr;
  vctx.shadowOffsetY = 2 * dpr;
  vctx.fillStyle = checkerPattern();
  vctx.translate(ox, oy);
  vctx.fillRect(0, 0, pw, ph);
  vctx.restore();
  // zoomed in: sharp square pixels; zoomed out: smooth
  vctx.imageSmoothingEnabled = k < 1;
  vctx.setTransform(k, 0, 0, k, ox, oy);
  // the layers, bottom first; moved or pasted pixels float just above the active one
  const f = state.floating;
  layers.forEach((L, i) => {
    if (L.visible) {
      vctx.globalAlpha = L.opacity;
      vctx.drawImage(L.canvas, 0, 0);
    }
    if (i === active && f) { vctx.globalAlpha = L.visible ? L.opacity : 1; vctx.drawImage(f.canvas, f.x, f.y); }
    vctx.globalAlpha = 1;
  });
  if (state.preview) {
    vctx.save();
    state.preview(vctx, 1 / k);
    vctx.restore();
  }
  // the brush outline under the pointer
  const c = state.cursor;
  // clone: the source disc – the brush's outline with a grip to drag it by (where it copies from while painting)
  const cs = state.clone, at = cs.live || cs.src;
  if ((state.tool === 'clone' || state.tool === 'heal') && at) {
    const r = Math.max(state.size / 2, 3 / k), g = 14 / k;
    vctx.beginPath();
    vctx.arc(at.x, at.y, r, 0, Math.PI * 2);
    vctx.lineWidth = 1 / k;
    vctx.strokeStyle = 'rgba(0,0,0,.7)';
    vctx.stroke();
    vctx.setLineDash([3 / k, 3 / k]);
    vctx.strokeStyle = 'rgba(255,255,255,.9)';
    vctx.stroke();
    vctx.setLineDash([]);
    vctx.beginPath();
    vctx.arc(at.x, at.y, g, 0, Math.PI * 2);
    vctx.fillStyle = cs.live ? 'rgba(43,140,255,.12)' : 'rgba(43,140,255,.28)';
    vctx.fill();
    vctx.moveTo(at.x - g * 0.55, at.y);
    vctx.lineTo(at.x + g * 0.55, at.y);
    vctx.moveTo(at.x, at.y - g * 0.55);
    vctx.lineTo(at.x, at.y + g * 0.55);
    vctx.lineWidth = 2 / k;
    vctx.strokeStyle = '#2b8cff';
    vctx.stroke();
  }
  if (c && ['brush', 'pencil', 'eraser', 'clone', 'heal'].includes(state.tool) && !state.space) {
    const r = state.size / 2;
    vctx.beginPath();
    if (state.tool === 'pencil') {
      const n = Math.max(1, Math.round(state.size)), x0 = Math.floor(c.x) - Math.floor((n - 1) / 2), y0 = Math.floor(c.y) - Math.floor((n - 1) / 2);
      vctx.rect(x0, y0, n, n);
    } else if (state.tip === 'calligraphy') {
      R.nibCorners(c, state.size, state.nibAngle).forEach((q, i) => (i ? vctx.lineTo(q.x, q.y) : vctx.moveTo(q.x, q.y)));
      vctx.closePath();
    } else vctx.arc(c.x, c.y, Math.max(r, 0.5), 0, Math.PI * 2);
    vctx.lineWidth = 1 / k;
    vctx.strokeStyle = 'rgba(0,0,0,.7)';
    vctx.stroke();
    vctx.lineWidth = 1 / k;
    vctx.setLineDash([3 / k, 3 / k]);
    vctx.strokeStyle = 'rgba(255,255,255,.9)';
    vctx.stroke();
    vctx.setLineDash([]);
  }
  vctx.setTransform(1, 0, 0, 1, 0, 0);
  // pixel grid when zoomed far in
  if (state.grid && k >= 8) {
    const x0 = Math.max(0, Math.floor(v.x)), x1 = Math.min(doc.width, Math.ceil(v.x + cw / k));
    const y0 = Math.max(0, Math.floor(v.y)), y1 = Math.min(doc.height, Math.ceil(v.y + ch / k));
    vctx.beginPath();
    for (let x = x0; x <= x1; x++) { const sx = Math.round(ox + x * k) + 0.5; vctx.moveTo(sx, oy + y0 * k); vctx.lineTo(sx, oy + y1 * k); }
    for (let y = y0; y <= y1; y++) { const sy = Math.round(oy + y * k) + 0.5; vctx.moveTo(ox + x0 * k, sy); vctx.lineTo(ox + x1 * k, sy); }
    vctx.lineWidth = 1;
    vctx.strokeStyle = 'rgba(128,128,128,.35)';
    vctx.stroke();
  }
  const sel = state.sel, box = f ? { x: f.x, y: f.y, w: f.canvas.width, h: f.canvas.height } : sel;
  if (!f && sel?.edges) {
    // a shaped selection: its outline, black under white dashes
    vctx.beginPath();
    const e = sel.edges;
    for (let i = 0; i < e.length; i += 4) {
      vctx.moveTo(Math.round(ox + (sel.x + e[i]) * k) + 0.5, Math.round(oy + (sel.y + e[i + 1]) * k) + 0.5);
      vctx.lineTo(Math.round(ox + (sel.x + e[i + 2]) * k) + 0.5, Math.round(oy + (sel.y + e[i + 3]) * k) + 0.5);
    }
    vctx.lineWidth = 1;
    vctx.setLineDash([]);
    vctx.strokeStyle = '#000';
    vctx.stroke();
    vctx.setLineDash([4, 4]);
    vctx.strokeStyle = '#fff';
    vctx.stroke();
    vctx.setLineDash([]);
  } else if (box) dashedRect(Math.round(ox + box.x * k), Math.round(oy + box.y * k), Math.round(box.w * k), Math.round(box.h * k));
}
// the first fit waits until the page is laid out (a hidden tab has no size yet)
new ResizeObserver(() => { if (!fitted) fitView(); requestRender(); }).observe(stage);
