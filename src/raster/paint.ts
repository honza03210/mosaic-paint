/* The painting tools: brush, pencil, eraser, clone, line, regular polygon, ellipse, curve, paint bucket and color picker.
   Strokes are drawn on a separate layer and laid onto the image with the chosen opacity, so a stroke
   that crosses itself doesn't get darker. The color "none" (∅ swatch) paints transparent. With a pen
   (graphics tablet, stylus) the brush, pencil and eraser get thinner the lighter it presses. The brush and
   eraser have tips: round, soft (airbrush), spray, calligraphy (a flat nib at an angle) and chalk.
   Spray keeps spraying while the pointer stands still, like an airbrush. */
import * as Geo from '../lib/geometry.ts';
import type { Pt } from '../lib/geometry.ts';
import * as R from '../lib/raster.ts';
import * as Curves from '../lib/curves.ts';
import { heal } from '../lib/heal.ts';
import { removeTool } from './remove.ts';
import { toast } from '../shared/ui.ts';
import { state } from './state.ts';
import { doc, dctx, makeCanvas, getImage, requestRender, toDoc } from './canvas.ts';
import { commit } from './history.ts';
import { setFill } from './palette.ts';
import { t } from '../shared/i18n.ts';

export interface Tool {
  down(e: PointerEvent, p: Pt): void;
  move(e: PointerEvent, p: Pt): void;
  up(e: PointerEvent, p: Pt): void;
}

/** 15° steps from a to b (Shift). */
export function constrain(a: Pt, b: Pt): Pt {
  const ang = Math.atan2(b.y - a.y, b.x - a.x), step = Math.PI / 12, q = Math.round(ang / step) * step;
  const L = Math.hypot(b.x - a.x, b.y - a.y) * Math.cos(ang - q);
  return { x: a.x + L * Math.cos(q), y: a.y + L * Math.sin(q) };
}

// ---- drawing on a layer -------------------------------------------------------------------------------
/** Lays a layer onto the image: normally, or cutting it out (erasing) when erase is set. */
function applyLayer(layer: HTMLCanvasElement, erase: boolean, alpha: number): void {
  dctx.save();
  dctx.globalAlpha = alpha;
  dctx.globalCompositeOperation = erase ? 'destination-out' : 'source-over';
  dctx.drawImage(layer, 0, 0);
  dctx.restore();
}
/** A smooth (antialiased) line on a layer. */
function smoothLine(ctx: CanvasRenderingContext2D, a: Pt, b: Pt, width: number, color: string): void {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  if (a.x === b.x && a.y === b.y) {
    ctx.beginPath();
    ctx.arc(a.x, a.y, width / 2, 0, Math.PI * 2);
    ctx.fill();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
}
/** A hard-edged line of whole pixels: the round pencil tip stamped along it. */
const tips = new Map<string, HTMLCanvasElement>();
function tip(size: number, color: string): HTMLCanvasElement {
  const n = Math.max(1, Math.round(size)), key = n + color;
  let c = tips.get(key);
  if (!c) {
    if (tips.size > 40) tips.clear();
    c = makeCanvas(n, n);
    const x = c.getContext('2d'), im = x.createImageData(n, n), m = R.discMask(n), rgba = R.rgba(color);
    for (let i = 0; i < n * n; i++) if (m[i]) im.data.set(rgba, i * 4);
    x.putImageData(im, 0, 0);
    tips.set(key, c);
  }
  return c;
}
function hardLine(ctx: CanvasRenderingContext2D, a: Pt, b: Pt, size: number, color: string): void {
  const t = tip(size, color), o = Math.floor((t.width - 1) / 2);
  R.linePixels(a.x, a.y, b.x, b.y, (x, y) => ctx.drawImage(t, x - o, y - o));
}
const paintColor = (): string => state.fill || '#000000';

// ---- brush tips ---------------------------------------------------------------------------------------------
export const TIPS = ['round', 'soft', 'spray', 'calligraphy', 'chalk'];
/** The calligraphy nib swept from a to b: the convex hull of the nib at both ends. */
function nibLine(ctx: CanvasRenderingContext2D, a: Pt, b: Pt, sa: number, sb: number, color: string): void {
  const pts = [...R.nibCorners(a, sa, state.nibAngle), ...R.nibCorners(b, sb, state.nibAngle)].sort((p, q) => p.x - q.x || p.y - q.y);
  const cross = (o: Pt, p: Pt, q: Pt) => (p.x - o.x) * (q.y - o.y) - (p.y - o.y) * (q.x - o.x);
  const half = (list: Pt[]) => {
    const h: Pt[] = [];
    for (const p of list) { while (h.length >= 2 && cross(h[h.length - 2], h[h.length - 1], p) <= 0) h.pop(); h.push(p); }
    h.pop();
    return h;
  };
  ctx.fillStyle = color;
  tracePath(ctx, [...half(pts), ...half(pts.reverse())]);
  ctx.fill();
}
/** A fixed grain for chalk (0–1 per pixel), so going over a spot again doesn't fill its holes. */
function grain(x: number, y: number): number {
  let h = Math.imul(x, 374761393) + Math.imul(y, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
/** Soft, spray and chalk are stamped pixel by pixel into the stroke layer's alpha, keeping the highest value:
    the stroke builds up to its tip's shape and no further, wherever it overlaps itself. */
interface Stamps { im: ImageData; rgb: number[]; dirty: { x0: number; y0: number; x1: number; y1: number } | null; carry: number }
function newStamps(color: string): Stamps {
  return { im: new ImageData(doc.width, doc.height), rgb: [...R.rgba(color)].slice(0, 3), dirty: null, carry: 0 };
}
function stamp(st: Stamps, tip: string, c: Pt, size: number): void {
  const { width: W, height: H, data } = st.im, r = Math.max(0.5, size / 2);
  const x0 = Math.max(0, Math.floor(c.x - r)), x1 = Math.min(W - 1, Math.ceil(c.x + r));
  const y0 = Math.max(0, Math.floor(c.y - r)), y1 = Math.min(H - 1, Math.ceil(c.y + r));
  if (x0 > x1 || y0 > y1) return;
  const put = (x: number, y: number, a: number) => {
    const i = (y * W + x) * 4;
    if (a <= data[i + 3]) return;
    data[i] = st.rgb[0]; data[i + 1] = st.rgb[1]; data[i + 2] = st.rgb[2]; data[i + 3] = a;
  };
  if (tip === 'spray') {
    // dots scattered over the disc, more of them towards the middle; a big spray gets bigger dots
    const dot = Math.max(1, Math.round(size / 40)), n = Math.max(2, Math.round(size * size * 0.03 / (dot * dot)));
    for (let k = 0; k < n; k++) {
      const d = r * Math.random() ** 0.75, ang = Math.random() * Math.PI * 2;
      const px = Math.floor(c.x + d * Math.cos(ang)), py = Math.floor(c.y + d * Math.sin(ang));
      for (let j = 0; j < dot; j++) for (let i = 0; i < dot; i++) {
        const x = px + i, y = py + j;
        if (x >= 0 && y >= 0 && x < W && y < H) put(x, y, 255);
      }
    }
  } else {
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
      const d = Math.hypot(x + 0.5 - c.x, y + 0.5 - c.y) / r;
      if (d >= 1) continue;
      if (tip === 'soft') {
        const f = 1 - d;
        put(x, y, Math.round(255 * f * f * (3 - 2 * f)));
      } else if (grain(x, y) < 0.8 * (1 - d ** 6)) put(x, y, 255); // chalk: rough paper shows through
    }
  }
  const b = st.dirty;
  st.dirty = b ? { x0: Math.min(b.x0, x0), y0: Math.min(b.y0, y0), x1: Math.max(b.x1, x1), y1: Math.max(b.y1, y1) } : { x0, y0, x1, y1 };
}
/** Stamps from a to b, evenly spaced along the whole stroke. */
function stampLine(st: Stamps, tip: string, a: Pt, b: Pt, sa: number, sb: number): void {
  const len = Math.hypot(b.x - a.x, b.y - a.y), step = Math.max(1, Math.min(sa, sb) * (tip === 'spray' ? 0.25 : 0.1));
  if (len === 0) { stamp(st, tip, a, sa); return; }
  let d = st.carry;
  for (; d <= len; d += step) { const k = d / len; stamp(st, tip, { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k }, sa + (sb - sa) * k); }
  st.carry = d - len;
}
/** Copies the stamped part onto the stroke layer. */
function flushStamps(st: Stamps, ctx: CanvasRenderingContext2D): void {
  const b = st.dirty;
  if (b) ctx.putImageData(st.im, 0, 0, b.x0, b.y0, b.x1 - b.x0 + 1, b.y1 - b.y0 + 1);
  st.dirty = null;
}

// ---- brush, pencil, eraser: freehand strokes ----------------------------------------------------------------
const sizeAt = (e: PointerEvent) => R.pressureSize(state.size, e, state.pressure);

interface Stroke { kind: string; tip: string; offset?: Pt; copy?: HTMLCanvasElement; box?: { x0: number; y0: number; x1: number; y1: number }; base: HTMLCanvasElement; layer: HTMLCanvasElement; lctx: CanvasRenderingContext2D; stamps: Stamps | null; timer: number; shift: boolean; start: Pt; last: Pt; lastSize: number; erase: boolean; alpha: number }
function beginStroke(kind: string, p: Pt, size: number): Stroke {
  const base = makeCanvas(doc.width, doc.height);
  base.getContext('2d').drawImage(doc, 0, 0);
  const layer = makeCanvas(doc.width, doc.height);
  const copying = kind === 'clone' || kind === 'heal';
  const erase = kind === 'eraser' || (!copying && !state.fill);
  // the pencil paints exact colors: always fully opaque
  const alpha = kind === 'pencil' ? 1 : state.opacity;
  const tip = kind === 'pencil' ? 'pencil' : TIPS.includes(state.tip) ? state.tip : 'round';
  const stamps = ['soft', 'spray', 'chalk'].includes(tip) ? newStamps(erase ? '#000' : paintColor()) : null;
  // clone: copies from the source, as far from the brush as the source is from its anchor
  const c = state.clone, offset = copying && c.src && c.anchor ? { x: c.src.x - c.anchor.x, y: c.src.y - c.anchor.y } : undefined;
  return { kind, tip, offset, base, layer, lctx: layer.getContext('2d'), stamps, timer: 0, shift: false, start: p, last: p, lastSize: size, erase, alpha };
}
function strokeSegment(s: Stroke, a: Pt, b: Pt, size = state.size, sizeA = size): void {
  // where the stroke has been (for healing)
  const m = Math.max(size, sizeA) / 2 + 2, bx = s.box;
  s.box = { x0: Math.min(bx ? bx.x0 : Infinity, a.x - m, b.x - m), y0: Math.min(bx ? bx.y0 : Infinity, a.y - m, b.y - m), x1: Math.max(bx ? bx.x1 : -Infinity, a.x + m, b.x + m), y1: Math.max(bx ? bx.y1 : -Infinity, a.y + m, b.y + m) };
  const color = s.erase ? '#000' : paintColor();
  if (s.tip === 'pencil') hardLine(s.lctx, a, b, size, paintColor());
  else if (s.tip === 'calligraphy') nibLine(s.lctx, a, b, sizeA, size, color);
  else if (s.stamps) { stampLine(s.stamps, s.tip, a, b, sizeA, size); flushStamps(s.stamps, s.lctx); }
  else smoothLine(s.lctx, a, b, size, color);
}
/** The image = what it was before the stroke + the stroke layer. */
function compose(s: Stroke): void {
  dctx.save();
  dctx.globalCompositeOperation = 'copy';
  dctx.drawImage(s.base, 0, 0);
  dctx.restore();
  if ((s.kind === 'clone' || s.kind === 'heal') && s.offset) {
    // the stroke (its shape and softness) filled with the picture as it was, shifted by the offset
    const c = s.copy || (s.copy = makeCanvas(doc.width, doc.height)), x = c.getContext('2d');
    x.globalCompositeOperation = 'copy';
    x.drawImage(s.base, -s.offset.x, -s.offset.y);
    x.globalCompositeOperation = 'destination-in';
    x.drawImage(s.layer, 0, 0);
    applyLayer(c, false, s.alpha);
    state.clone.live = { x: s.last.x + s.offset.x, y: s.last.y + s.offset.y };
  } else applyLayer(s.layer, s.erase, s.alpha);
  requestRender();
}
/** Spray, like an airbrush, keeps adding dots where the pointer is while it is held down. */
const SPRAY_MS = 40;
function sprayInPlace(s: Stroke): void {
  const a = state.action;
  if (!a || a.s !== s) { clearInterval(s.timer); return; } // the stroke was finished or cancelled
  if (s.shift || !s.stamps) return;
  stamp(s.stamps, 'spray', s.last, s.lastSize);
  flushStamps(s.stamps, s.lctx);
  compose(s);
}
function freehand(kind: string): Tool {
  return {
    down(e, p) {
      const size = sizeAt(e), s = beginStroke(kind, p, size);
      state.action = { type: 'stroke', s };
      strokeSegment(s, p, p, size);
      compose(s);
      if (s.tip === 'spray') s.timer = window.setInterval(() => sprayInPlace(s), SPRAY_MS);
    },
    move(e, p) {
      const a = state.action;
      if (!a || a.type !== 'stroke') return;
      const s: Stroke = a.s;
      s.shift = e.shiftKey;
      if (e.shiftKey) {
        // Shift: a straight line from where the stroke started
        s.lctx.clearRect(0, 0, s.layer.width, s.layer.height);
        if (s.stamps) { s.stamps.im.data.fill(0); s.stamps.carry = 0; }
        strokeSegment(s, s.start, constrain(s.start, p));
      } else {
        // a pen sends more points than the screen shows: all of them, each with its pressure
        const events = e.getCoalescedEvents?.() || [];
        for (const ev of events.length ? events : [e]) {
          const q = events.length ? toDoc(ev.clientX, ev.clientY) : p, size = sizeAt(ev);
          // nibs and stamps follow the pressure along the segment; a round line takes the average
          if (s.tip === 'calligraphy' || s.stamps) strokeSegment(s, s.last, q, size, s.lastSize);
          else strokeSegment(s, s.last, q, (s.lastSize + size) / 2);
          s.last = q;
          s.lastSize = size;
        }
      }
      compose(s);
    },
    up() {
      const a = state.action;
      state.action = null;
      if (a && a.type === 'stroke') { clearInterval(a.s.timer); commit(); }
    },
  };
}

// ---- clone: paint with a copy of another part of the image -------------------------------------------------------
/** Sets where the next stroke copies from (a fresh start: the next stroke begins copying exactly there). */
let lastSource = { src: null as Pt | null, anchor: null as Pt | null, at: -1e9 };
export function setCloneSource(p: Pt): void {
  const c = state.clone;
  lastSource = { src: c.src, anchor: c.anchor, at: performance.now() };
  c.src = { x: Math.round(p.x), y: Math.round(p.y) };
  c.anchor = null;
  c.picking = false;
  updateCloneUI();
  requestRender();
}
/** Takes back a source set just now (by the first tap of a double-tap that opens the quick menu). */
export function undoFreshCloneSource(): void {
  if (performance.now() - lastSource.at > 600) return;
  Object.assign(state.clone, { src: lastSource.src, anchor: lastSource.anchor });
  lastSource.at = -1e9;
  updateCloneUI();
}
/** "Set source": the next tap or click sets it. */
export function pickCloneSource(on = !state.clone.picking): void {
  state.clone.picking = on;
  updateCloneUI();
  if (on) toast(t('Tap or click where to copy from.'));
}
export function updateCloneUI(): void {
  const c = state.clone, b = document.getElementById('btn-clone-source'), note = document.getElementById('clone-status');
  b?.classList.toggle('active', c.picking);
  b?.setAttribute('aria-pressed', String(c.picking));
  if (note) note.textContent = c.picking ? t('Tap the image where to copy from') : c.src ? t('Copying from {x}, {y}', c.src) : t('No source yet: the first tap sets it');
}
/** Near enough to grab the source disc (a finger's width on the screen, or the brush outline). */
const onSourceDisc = (p: Pt): boolean => !!state.clone.src && Math.hypot(p.x - state.clone.src.x, p.y - state.clone.src.y) < Math.max(26 / state.view.s, state.size / 2);
/** Healing, when the stroke ends: the copied texture takes the color and light around the painted spot. */
function healStroke(s: Stroke): void {
  if (!s.box || !s.offset) return;
  const r = Math.max(4, Math.round(s.lastSize * 0.75)), b = s.box;
  const x0 = Math.max(0, Math.floor(b.x0) - 2 * r), y0 = Math.max(0, Math.floor(b.y0) - 2 * r);
  const x1 = Math.min(doc.width, Math.ceil(b.x1) + 2 * r), y1 = Math.min(doc.height, Math.ceil(b.y1) + 2 * r), w = x1 - x0, h = y1 - y0;
  if (w <= 0 || h <= 0) return;
  const dst = s.base.getContext('2d').getImageData(x0, y0, w, h);
  // the patch: the picture shifted by the offset (whole, not cut to the stroke)
  const pc = makeCanvas(w, h), px = pc.getContext('2d');
  px.drawImage(s.base, -(x0 + s.offset.x), -(y0 + s.offset.y));
  const src = px.getImageData(0, 0, w, h), lay = s.lctx.getImageData(x0, y0, w, h), mask = new Uint8ClampedArray(w * h);
  for (let i = 0; i < mask.length; i++) mask[i] = lay.data[i * 4 + 3];
  const out = heal(dst.data, src.data, mask, w, h, r);
  // the opacity, as for the other brushes
  if (s.alpha < 1) for (let i = 0; i < out.length; i++) out[i] = dst.data[i] + (out[i] - dst.data[i]) * s.alpha;
  dctx.putImageData(new ImageData(out, w, h), x0, y0);
  requestRender();
}

/** Clone and Heal: set a source, paint a copy of it (Heal blends the copy in when the stroke ends). */
function copyTool(kind: 'clone' | 'heal'): Tool {
const cloneBrush = freehand(kind);
return {
  down(e, p) {
    const c = state.clone;
    // set the source: Alt+click, after "Set source", or the first tap of all (no keys needed on a phone)
    if (e.altKey || c.picking || !c.src) {
      const first = !c.src;
      setCloneSource(p);
      if (first || !e.altKey) toast(t('Source set – now paint where the copy goes.'));
      return;
    }
    // the source disc can be dragged to another place
    if (onSourceDisc(p)) { state.action = { type: 'clone-source', dx: c.src.x - p.x, dy: c.src.y - p.y }; return; }
    // aligned: the offset from the first stroke stays; otherwise every stroke starts copying from the source
    if (!state.cloneAligned || !c.anchor) c.anchor = { x: Math.round(p.x), y: Math.round(p.y) };
    cloneBrush.down(e, p);
  },
  move(e, p) {
    const a = state.action;
    if (a && a.type === 'clone-source') {
      state.clone.src = { x: Math.round(p.x + a.dx), y: Math.round(p.y + a.dy) };
      updateCloneUI();
      requestRender();
      return;
    }
    cloneBrush.move(e, p);
  },
  up(e, p) {
    const a = state.action, c = state.clone;
    if (a && a.type === 'clone-source') { state.action = null; return; }
    if (a && a.type === 'stroke' && state.cloneAligned && a.s.offset) {
      // the source travels with the brush: it waits where the stroke ended, at the same offset
      c.anchor = { x: Math.round(a.s.last.x), y: Math.round(a.s.last.y) };
      c.src = { x: c.anchor.x + a.s.offset.x, y: c.anchor.y + a.s.offset.y };
    }
    c.live = null;
    if (kind === 'heal' && a && a.type === 'stroke') healStroke(a.s);
    cloneBrush.up(e, p);
    updateCloneUI();
    requestRender();
  },
};
}

// ---- line ---------------------------------------------------------------------------------------------------
function drawShapeLine(ctx: CanvasRenderingContext2D, a: Pt, b: Pt, color: string): void {
  if (state.smooth) smoothLine(ctx, a, b, state.size, color); else hardLine(ctx, a, b, state.size, color);
}
const lineTool: Tool = {
  down(e, p) { state.action = { type: 'line', a: p, b: p }; },
  move(e, p) {
    const a = state.action;
    if (!a || a.type !== 'line') return;
    a.b = e.shiftKey ? constrain(a.a, p) : p;
    const color = state.fill || 'rgba(0,0,0,.4)';
    state.preview = (ctx) => { ctx.globalAlpha = state.fill ? state.opacity : 1; drawShapeLine(ctx, a.a, a.b, color); };
    requestRender();
  },
  up() {
    const a = state.action;
    state.action = null;
    state.preview = null;
    if (!a || a.type !== 'line' || Math.hypot(a.b.x - a.a.x, a.b.y - a.a.y) < 0.5) { requestRender(); return; }
    const layer = makeCanvas(doc.width, doc.height);
    drawShapeLine(layer.getContext('2d'), a.a, a.b, state.fill ? paintColor() : '#000');
    applyLayer(layer, !state.fill, state.opacity);
    commit();
  },
};

// ---- regular polygon ----------------------------------------------------------------------------------------
function ngonPoints(a: any): Pt[] {
  let rot = Math.atan2(a.b.y - a.a.y, a.b.x - a.a.x);
  if (a.shift) rot = Math.round(rot / (Math.PI / 12)) * (Math.PI / 12);
  return Geo.regularPolygon(state.sides, a.a.x, a.a.y, Math.hypot(a.b.x - a.a.x, a.b.y - a.a.y), rot);
}
function tracePath(ctx: CanvasRenderingContext2D, pts: Pt[]): void {
  ctx.beginPath();
  pts.forEach((q, i) => (i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y)));
  ctx.closePath();
}
/** Fill and / or outline of a polygon, each on its own layer (so either can be transparent). */
function drawPolygon(pts: Pt[]): void {
  if (state.ngonFill) {
    const layer = makeCanvas(doc.width, doc.height), ctx = layer.getContext('2d');
    const color = state.fill || '#000';
    if (state.smooth) { tracePath(ctx, pts); ctx.fillStyle = color; ctx.fill(); }
    else {
      const im = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
      if (R.fillPolygon(im, pts, R.rgba(color))) ctx.putImageData(im, 0, 0);
    }
    applyLayer(layer, !state.fill, state.opacity);
  }
  if (state.ngonOutline) {
    const layer = makeCanvas(doc.width, doc.height), ctx = layer.getContext('2d');
    const color = state.stroke || '#000';
    for (let i = 0; i < pts.length; i++) drawShapeLine(ctx, pts[i], pts[(i + 1) % pts.length], color);
    applyLayer(layer, !state.stroke, state.opacity);
  }
}
const ngonTool: Tool = {
  down(e, p) { state.action = { type: 'ngon', a: p, b: p }; },
  move(e, p) {
    const a = state.action;
    if (!a || a.type !== 'ngon') return;
    a.b = p;
    a.shift = e.shiftKey;
    const pts = ngonPoints(a);
    state.preview = (ctx, px) => {
      ctx.globalAlpha = state.opacity;
      if (state.ngonFill && state.fill) { tracePath(ctx, pts); ctx.fillStyle = state.fill; ctx.fill(); }
      if (state.ngonOutline && state.stroke) for (let i = 0; i < pts.length; i++) smoothLine(ctx, pts[i], pts[(i + 1) % pts.length], state.size, state.stroke);
      ctx.globalAlpha = 1;
      tracePath(ctx, pts);
      ctx.lineWidth = px;
      ctx.setLineDash([4 * px, 3 * px]);
      ctx.strokeStyle = '#2b8cff';
      ctx.stroke();
    };
    requestRender();
  },
  up() {
    const a = state.action;
    state.action = null;
    state.preview = null;
    requestRender();
    if (!a || a.type !== 'ngon' || Math.hypot(a.b.x - a.a.x, a.b.y - a.a.y) < 1) return;
    if (!state.ngonFill && !state.ngonOutline) { toast(t('Turn on “Fill” or “Outline” for polygons.')); return; }
    drawPolygon(ngonPoints(a));
    commit();
  },
};

// ---- ellipse and curve ----------------------------------------------------------------------------------------
/** How finely curves are turned into pixels: a third of a pixel. */
const CURVE_TOL = 1 / 3;
/** The preview of a shape: its fill and outline as they will look, and a thin dashed outline. */
function previewOutline(ctx: CanvasRenderingContext2D, px: number, pts: Pt[], closed: boolean, fill: boolean): void {
  const path = () => { ctx.beginPath(); pts.forEach((q, i) => (i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y))); if (closed) ctx.closePath(); };
  ctx.globalAlpha = state.opacity;
  if (fill && state.fill) { path(); ctx.fillStyle = state.fill; ctx.fill(); }
  const line = closed ? state.ngonOutline && state.stroke : state.fill;
  if (line) { path(); ctx.lineWidth = state.size; ctx.lineCap = ctx.lineJoin = 'round'; ctx.strokeStyle = line; ctx.stroke(); }
  ctx.globalAlpha = 1;
  path();
  ctx.lineWidth = px;
  ctx.setLineDash([4 * px, 3 * px]);
  ctx.strokeStyle = '#2b8cff';
  ctx.stroke();
  ctx.setLineDash([]);
}
function ellipsePts(a: any): Pt[] {
  const e = Curves.ellipseFromDrag(a.a, a.b, state.ellipseMode === 'center', a.shift);
  return e.rx < 0.5 || e.ry < 0.5 ? [] : Curves.ellipsePoints(e.cx, e.cy, e.rx, e.ry, 0, CURVE_TOL);
}
const ellipseTool: Tool = {
  down(e, p) { state.action = { type: 'ellipse', a: p, b: p, shift: e.shiftKey }; },
  move(e, p) {
    const a = state.action;
    if (!a || a.type !== 'ellipse') return;
    a.b = p;
    a.shift = e.shiftKey;
    const pts = ellipsePts(a);
    state.preview = pts.length ? (ctx, px) => previewOutline(ctx, px, pts, true, state.ngonFill) : null;
    requestRender();
  },
  up() {
    const a = state.action;
    state.action = null;
    state.preview = null;
    requestRender();
    if (!a || a.type !== 'ellipse') return;
    const pts = ellipsePts(a);
    if (!pts.length) return;
    if (!state.ngonFill && !state.ngonOutline) { toast(t('Turn on “Fill” or “Outline” for shapes.')); return; }
    drawPolygon(pts);
    commit();
  },
};

/** The curve's points so far: kept apart from state.action, so panning in between doesn't lose them. */
export const curve = { pts: null as Pt[] | null, hover: null as Pt | null };
const curvePoints = (pts: Pt[], closed: boolean): Pt[] => Curves.sampleCubics(Curves.toCubics(state.curveType, pts, closed), closed, CURVE_TOL);
function curvePreview(): void {
  const pts = curve.pts;
  if (!pts) { state.preview = null; requestRender(); return; }
  const all = curve.hover ? [...pts, curve.hover] : pts, line = curvePoints(all, false);
  state.preview = (ctx, px) => {
    if (line.length > 1) previewOutline(ctx, px, line, false, false);
    // the clicked points: square where the curve passes, round where they only pull it
    if (state.curveType !== 'catmull' && all.length > 1) {
      ctx.beginPath();
      all.forEach((q, i) => (i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y)));
      ctx.lineWidth = px;
      ctx.setLineDash([3 * px, 3 * px]);
      ctx.strokeStyle = 'rgba(43,140,255,.7)';
      ctx.stroke();
      ctx.setLineDash([]);
    }
    const r = 3.5 * px;
    all.forEach((q, i) => {
      ctx.beginPath();
      if (Curves.onCurve(state.curveType, all.length, false, i)) ctx.rect(q.x - r, q.y - r, 2 * r, 2 * r); else ctx.arc(q.x, q.y, r, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.lineWidth = 1.2 * px;
      ctx.strokeStyle = '#2b8cff';
      ctx.stroke();
    });
  };
  requestRender();
}
/** Ends the curve: open (a line in the paint color) or closed (filled and / or outlined, like a polygon). */
export function finishCurve(closed = false): void {
  const pts = curve.pts;
  curve.pts = null;
  curve.hover = null;
  curvePreview();
  if (!pts || pts.length < 2 || (closed && pts.length < 3)) return;
  const line = curvePoints(pts, closed);
  if (closed) {
    if (!state.ngonFill && !state.ngonOutline) { toast(t('Turn on “Fill” or “Outline” for shapes.')); return; }
    drawPolygon(line);
  } else {
    const layer = makeCanvas(doc.width, doc.height), ctx = layer.getContext('2d');
    if (state.smooth) {
      ctx.beginPath();
      line.forEach((q, i) => (i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y)));
      ctx.lineWidth = state.size;
      ctx.lineCap = ctx.lineJoin = 'round';
      ctx.strokeStyle = state.fill || '#000';
      ctx.stroke();
    } else for (let i = 1; i < line.length; i++) hardLine(ctx, line[i - 1], line[i], state.size, state.fill || '#000');
    applyLayer(layer, !state.fill, state.opacity);
  }
  commit();
}
export function curveBack(): void {
  if (!curve.pts) return;
  curve.pts.pop();
  if (!curve.pts.length) curve.pts = null;
  curvePreview();
}
export function cancelCurve(): void {
  curve.pts = null;
  curve.hover = null;
  curvePreview();
}
const curveTool: Tool = {
  down(e, p) {
    const pts = curve.pts || [], px = 1 / state.view.s;
    // clicking the first point again closes the curve; the second click of a double-click adds nothing
    if (pts.length >= 3 && Geo.dist(p, pts[0]) < 8 * px) { finishCurve(true); return; }
    if (pts.length && Geo.dist(p, pts[pts.length - 1]) < 2 * px) return;
    pts.push(p);
    curve.pts = pts;
    // a second finger (pinch) takes this point back
    state.action = { type: 'curve-press' };
    curvePreview();
  },
  move(e, p) {
    if (!curve.pts) return;
    curve.hover = p;
    curvePreview();
  },
  up() { if (state.action?.type === 'curve-press') state.action = null; },
};

// ---- paint bucket and color picker --------------------------------------------------------------------------
export function bucketAt(p: Pt): boolean {
  const x = Math.floor(p.x), y = Math.floor(p.y);
  if (x < 0 || y < 0 || x >= doc.width || y >= doc.height) return false;
  const im = getImage();
  const box = R.floodFill(im, x, y, R.rgba(state.fill), state.tolerance, state.contiguous);
  if (!box) return false;
  dctx.putImageData(im, 0, 0, box.x, box.y, box.w, box.h);
  commit();
  return true;
}
export function pickAt(p: Pt): void {
  const x = Math.floor(p.x), y = Math.floor(p.y);
  if (x < 0 || y < 0 || x >= doc.width || y >= doc.height) return;
  const c = R.colorAt(getImage(x, y, 1, 1), 0, 0);
  setFill(c, false);
  toast(!c ? t('Picked “transparent”.') : state.palette.includes(c) ? t('Picked {c}.', { c }) : t('Picked {c} (not in the palette – add it with “From image”).', { c }));
}
const bucketTool: Tool = {
  down(e, p) { if (e.altKey) pickAt(p); else bucketAt(p); },
  move() {},
  up() {},
};
const pickerTool: Tool = { down(e, p) { pickAt(p); }, move() {}, up() {} };

export const paintTools: Record<string, Tool> = {
  brush: freehand('brush'), pencil: freehand('pencil'), eraser: freehand('eraser'), clone: copyTool('clone'), heal: copyTool('heal'), remove: removeTool,
  line: lineTool, ngon: ngonTool, ellipse: ellipseTool, curve: curveTool, bucket: bucketTool, picker: pickerTool,
};
