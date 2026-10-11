/* The painting tools: brush, pencil, eraser, line, regular polygon, paint bucket and color picker.
   Strokes are drawn on a separate layer and laid onto the image with the chosen opacity, so a stroke
   that crosses itself doesn't get darker. The color "none" (∅ swatch) paints transparent. */
import * as Geo from '../lib/geometry.ts';
import type { Pt } from '../lib/geometry.ts';
import * as R from '../lib/raster.ts';
import { toast } from '../shared/ui.ts';
import { state } from './state.ts';
import { doc, dctx, makeCanvas, getImage, requestRender } from './canvas.ts';
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

// ---- brush, pencil, eraser: freehand strokes ----------------------------------------------------------------
interface Stroke { kind: string; base: HTMLCanvasElement; layer: HTMLCanvasElement; lctx: CanvasRenderingContext2D; start: Pt; last: Pt; erase: boolean; alpha: number }
function beginStroke(kind: string, p: Pt): Stroke {
  const base = makeCanvas(doc.width, doc.height);
  base.getContext('2d').drawImage(doc, 0, 0);
  const layer = makeCanvas(doc.width, doc.height);
  const erase = kind === 'eraser' || !state.fill;
  // the pencil paints exact colors: always fully opaque
  const alpha = kind === 'pencil' ? 1 : state.opacity;
  return { kind, base, layer, lctx: layer.getContext('2d'), start: p, last: p, erase, alpha };
}
function strokeSegment(s: Stroke, a: Pt, b: Pt): void {
  if (s.kind === 'pencil') hardLine(s.lctx, a, b, state.size, paintColor());
  else smoothLine(s.lctx, a, b, state.size, s.erase ? '#000' : paintColor());
}
/** The image = what it was before the stroke + the stroke layer. */
function compose(s: Stroke): void {
  dctx.save();
  dctx.globalCompositeOperation = 'copy';
  dctx.drawImage(s.base, 0, 0);
  dctx.restore();
  applyLayer(s.layer, s.erase, s.alpha);
  requestRender();
}
function freehand(kind: string): Tool {
  return {
    down(e, p) {
      const s = beginStroke(kind, p);
      state.action = { type: 'stroke', s };
      strokeSegment(s, p, p);
      compose(s);
    },
    move(e, p) {
      const a = state.action;
      if (!a || a.type !== 'stroke') return;
      const s: Stroke = a.s;
      if (e.shiftKey) {
        // Shift: a straight line from where the stroke started
        s.lctx.clearRect(0, 0, s.layer.width, s.layer.height);
        strokeSegment(s, s.start, constrain(s.start, p));
      } else {
        strokeSegment(s, s.last, p);
        s.last = p;
      }
      compose(s);
    },
    up() {
      const a = state.action;
      state.action = null;
      if (a && a.type === 'stroke') commit();
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
  brush: freehand('brush'), pencil: freehand('pencil'), eraser: freehand('eraser'),
  line: lineTool, ngon: ngonTool, bucket: bucketTool, picker: pickerTool,
};
