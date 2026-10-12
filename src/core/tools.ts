/* The drawing tools: line, free polygon, regular polygon, ellipse, curve, knife, pattern, paint bucket, select,
   plus creating shapes (with their symmetric copies) and the tool switcher. */
import * as Geo from '../lib/geometry.ts';
import type { Pt, Region, Face } from '../lib/geometry.ts';
import * as Patterns from '../lib/patterns.ts';
import * as Curves from '../lib/curves.ts';
import * as Contour from '../lib/contour.ts';
import { $, $$, state, rt, stage, shapesG, previewG, snapG, EXPERT_TOOLS, isFill, mk, fmt, px, ptsStr, applyM, toast, fmtLen } from './env.ts';
import {
  shapesAt, insideEl, geomOf, allShapes, pagePts, elMatrix, ngonData, setNgonData, setNgon, setVertex, verticesAt, setSpline,
} from './doc.ts';
import { canDraw, editable, selectable, symCopies, symTransforms, ptKey } from './view.ts';
import { resolvePoint, constrainAngle, drawMeasure } from './snap.ts';
import { hitTest, renderSelection, renderProps, selectionChanged, capture, applyMove } from './selection.ts';
import { regionIndex, showGaps, insideRegion, bucketAt, paintCtx, commitGeometry, commitFor, eyedrop, type PaintCtx } from './areas.ts';
import { commit, docChanged } from './history.ts';
import { savePrefs } from './palette.ts';
import { refImage, inRef } from './photo.ts';
import { t } from '../shared/i18n.ts';
import { askYes } from '../shared/dialogs.ts';

export interface Tool {
  down(e: PointerEvent, raw: Pt): void;
  move(e: PointerEvent, raw: Pt): void;
  up(e: PointerEvent, raw: Pt): void;
}

// ---- creating shapes (with symmetric copies) ------------------------------------------------------
export function shapeStyle(): Record<string, any> {
  return { stroke: state.stroke || 'none', 'stroke-width': state.strokeWidth, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
}
const newFill = () => (state.newFill && state.fill ? state.fill : 'none');
export function addLines(a: Pt, b: Pt): void {
  for (const [p, q] of symCopies([a, b])) {
    mk('line', { x1: fmt(p.x), y1: fmt(p.y), x2: fmt(q.x), y2: fmt(q.y), ...shapeStyle() }, shapesG);
  }
}
/** Adds plain lines ({a, b} segments) in the current line style. Does not commit. */
export function addLineSegments(segs: { a: Pt; b: Pt }[]): void {
  for (const s of segs) mk('line', { x1: fmt(s.a.x), y1: fmt(s.a.y), x2: fmt(s.b.x), y2: fmt(s.b.y), ...shapeStyle() }, shapesG);
}
function addPolygons(pts: Pt[]): void {
  for (const q of symCopies(pts)) mk('polygon', { points: ptsStr(q), fill: newFill(), ...shapeStyle() }, shapesG);
}
interface NgonSpec { n: number; cx: number; cy: number; r: number; rot: number; pts: Pt[] }
function addNgons(s: NgonSpec): void {
  const seen = new Set<string>();
  symTransforms().forEach((t, k) => {
    const c = t({ x: s.cx, y: s.cy }), v0 = t(s.pts[0]);
    const key = ptKey(c) + '|' + s.pts.map(t).map(ptKey).sort().join(' ');
    if (seen.has(key)) return;
    seen.add(key);
    const rot = Math.atan2(v0.y - c.y, v0.x - c.x) * 180 / Math.PI;
    // the original keeps its exact (snapped) corners; copies are regenerated in standard order
    const pts = k === 0 ? s.pts : Geo.regularPolygon(s.n, c.x, c.y, s.r, rot * Math.PI / 180);
    const el = mk('polygon', { points: ptsStr(pts), fill: newFill(), ...shapeStyle() }, shapesG);
    setNgonData(el, { n: s.n, cx: c.x, cy: c.y, r: s.r, rot });
  });
}

// ---- previews --------------------------------------------------------------------------------------
function previewStyle(): Record<string, any> {
  return state.stroke
    ? { stroke: state.stroke, 'stroke-width': state.strokeWidth, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', fill: 'none', class: 'preview' }
    : { class: 'preview-ghost' };
}
/** Draws the shape plus its symmetric copies as a preview. */
function previewShape(tag: string, pts: Pt[]): void {
  symCopies(pts).forEach((q, i) => {
    const attrs = tag === 'line' ? { x1: q[0].x, y1: q[0].y, x2: q[1].x, y2: q[1].y } : { points: ptsStr(q) };
    mk(tag, { ...attrs, ...(i ? { class: 'preview-ghost' } : previewStyle()) }, previewG);
  });
}
export function cancelPending(): void {
  state.lineStart = null;
  state.freePts = null;
  state.action = null;
  previewG.innerHTML = '';
  snapG.innerHTML = '';
  updateStageActions();
}
export function updateStageActions(): void {
  $('#stage-actions').hidden = !(state.lineStart || state.freePts);
  $('#sa-back').hidden = !state.freePts;
  $('#sa-finish').textContent = state.freePts && state.tool !== 'curve' ? t('Close shape') : t('Done');
}

// ---- line ------------------------------------------------------------------------------------------
function finishLine(a: Pt, b: Pt): void {
  if (Geo.dist(a, b) > px(1)) {
    addLines(a, b);
    commitGeometry();
    state.lineStart = state.chain ? { x: b.x, y: b.y } : null;
  } else state.lineStart = null; // clicking twice on the same spot ends a chain
  previewG.innerHTML = '';
  updateStageActions();
}
function drawLinePreview(a: Pt, b: Pt): void {
  previewG.innerHTML = '';
  previewShape('line', [a, b]);
  drawMeasure(b, fmtLen(Geo.dist(a, b)));
}
const lineTool: Tool = {
  down(e, raw) {
    if (!canDraw()) return;
    if (state.lineStart) { finishLine(state.lineStart, resolvePoint(e, raw, { origin: state.lineStart })); return; }
    const p = resolvePoint(e, raw);
    state.lineStart = { x: p.x, y: p.y };
    state.action = { type: 'line-press', sx: e.clientX, sy: e.clientY, moved: false };
    updateStageActions();
  },
  move(e, raw) {
    const a = state.action;
    if (a && a.type === 'line-press' && Math.hypot(e.clientX - a.sx, e.clientY - a.sy) > 4) a.moved = true;
    if (state.lineStart) drawLinePreview(state.lineStart, resolvePoint(e, raw, { origin: state.lineStart }));
    else resolvePoint(e, raw);
  },
  up(e, raw) {
    const a = state.action;
    state.action = null;
    if (a && a.moved && state.lineStart) finishLine(state.lineStart, resolvePoint(e, raw, { origin: state.lineStart }));
  },
};

// ---- free polygon: click corner by corner -------------------------------------------------------------
export function finishFree(close = false): void {
  const pts: Pt[] | null = state.freePts;
  state.freePts = null;
  previewG.innerHTML = '';
  snapG.innerHTML = '';
  if (state.tool === 'curve') { finishCurve(pts, close); updateStageActions(); return; }
  if (pts && pts.length >= 3) { addPolygons(pts); commitGeometry(); }
  else if (pts && pts.length === 2) { addLines(pts[0], pts[1]); commitGeometry(); }
  updateStageActions();
}
/** Takes back the last corner of the free polygon being drawn. */
export function freeBack(): void {
  if (!state.freePts) return;
  state.freePts.pop();
  if (!state.freePts.length) state.freePts = null;
  drawFreePreview(state.freePts ? state.freePts[state.freePts.length - 1] : { x: 0, y: 0 });
  updateStageActions();
}
function drawFreePreview(p: Pt): void {
  if (state.tool === 'curve') { drawCurvePreview(p); return; }
  previewG.innerHTML = '';
  const pts: Pt[] | null = state.freePts;
  if (!pts || !pts.length) return;
  previewShape('polyline', [...pts, p]);
  if (pts.length >= 2) mk('line', { x1: p.x, y1: p.y, x2: pts[0].x, y2: pts[0].y, class: 'preview-ghost' }, previewG);
  drawMeasure(p, fmtLen(Geo.dist(pts[pts.length - 1], p)));
}
const freeTool: Tool = {
  down(e, raw) {
    if (!canDraw()) return;
    const pts: Pt[] = state.freePts || [];
    const last = pts[pts.length - 1];
    const p = resolvePoint(e, raw, { origin: last, extra: pts });
    if (pts.length >= 3 && Geo.dist(p, pts[0]) < px(rt.snapPx)) { finishFree(true); return; }
    if (last && Geo.dist(last, p) < px(2)) return; // second press of a double-click
    pts.push({ x: p.x, y: p.y });
    state.freePts = pts;
    state.action = { type: 'free-press' }; // a second finger (pinch) takes this corner back
    drawFreePreview(p);
    updateStageActions();
  },
  move(e, raw) {
    const pts: Pt[] | null = state.freePts;
    const p = resolvePoint(e, raw, { origin: pts && pts[pts.length - 1], extra: pts || [] });
    if (pts) drawFreePreview(p);
  },
  up() { state.action = null; },
};

// ---- regular polygon ----------------------------------------------------------------------------------
function specFromCenter(c: Pt, r: number, rotDeg: number): NgonSpec {
  const n = state.sides;
  return { n, cx: c.x, cy: c.y, r, rot: rotDeg, pts: Geo.regularPolygon(n, c.x, c.y, r, rotDeg * Math.PI / 180) };
}
function ngonSpec(a: any): NgonSpec | null {
  const n = state.sides;
  if (state.ngonMode === 'center') {
    let rot = Math.atan2(a.b.y - a.a.y, a.b.x - a.a.x) * 180 / Math.PI;
    if (a.shift) rot = Math.round(rot / 15) * 15;
    const s = specFromCenter(a.a, Geo.dist(a.a, a.b), rot);
    if (!a.shift) s.pts[0] = { x: a.b.x, y: a.b.y };
    return s;
  }
  // from edge: a-b is one side; the polygon grows away from existing shapes (Ctrl flips)
  const L = Geo.dist(a.a, a.b);
  if (L < 1e-9) return null;
  const R = L / (2 * Math.sin(Math.PI / n)), ap = L / (2 * Math.tan(Math.PI / n));
  const ux = (a.b.x - a.a.x) / L, uy = (a.b.y - a.a.y) / L;
  const centerOn = (side: number) => ({ x: (a.a.x + a.b.x) / 2 - uy * ap * side, y: (a.a.y + a.b.y) / 2 + ux * ap * side });
  const occupied = (p: Pt) => shapesAt(p).some(e => !isFill(e) && insideEl(e, p));
  let side = -1;
  if (occupied(centerOn(side)) && !occupied(centerOn(-side))) side = -side;
  if (a.flip) side = -side;
  const c = centerOn(side);
  const s = specFromCenter(c, R, Math.atan2(a.a.y - c.y, a.a.x - c.x) * 180 / Math.PI);
  s.pts[0] = { x: a.a.x, y: a.a.y };
  const i = Geo.dist(s.pts[1], a.b) < Geo.dist(s.pts[n - 1], a.b) ? 1 : n - 1;
  s.pts[i] = { x: a.b.x, y: a.b.y }; // keep the shared edge exact
  return s;
}
const ngonTool: Tool = {
  down(e, raw) {
    if (!canDraw()) return;
    const p = resolvePoint(e, raw);
    state.action = { type: 'ngon', a: { x: p.x, y: p.y }, b: { x: p.x, y: p.y }, sx: e.clientX, sy: e.clientY, moved: false };
  },
  move(e, raw) {
    const a = state.action;
    if (!a) { resolvePoint(e, raw); return; }
    if (Math.hypot(e.clientX - a.sx, e.clientY - a.sy) > 3) a.moved = true;
    a.b = resolvePoint(e, raw, { origin: state.ngonMode === 'edge' ? a.a : null });
    a.flip = e.ctrlKey || e.metaKey;
    a.shift = e.shiftKey;
    previewG.innerHTML = '';
    const s = a.moved && ngonSpec(a);
    if (s) {
      previewShape('polygon', s.pts);
      drawMeasure(a.b, `side ${fmtLen(2 * s.r * Math.sin(Math.PI / s.n))} · Ø ${fmtLen(2 * s.r)}`);
    }
  },
  up() {
    const a = state.action;
    state.action = null;
    previewG.innerHTML = '';
    if (!a) return;
    const s = a.moved ? ngonSpec(a) : (state.ngonMode === 'center' ? specFromCenter(a.a, state.lastRadius, state.lastRot) : null);
    if (!s || s.r < px(1)) return;
    state.lastRadius = s.r;
    state.lastRot = s.rot;
    savePrefs();
    addNgons(s);
    commitGeometry();
  },
};

// ---- ellipse: drag its box (or from its center); Shift: a circle -------------------------------------------
interface EllipseSpec { cx: number; cy: number; rx: number; ry: number }
function ellipseSpec(a: any): EllipseSpec {
  return Curves.ellipseFromDrag(a.a, a.b, state.ellipseMode === 'center', a.shift);
}
/** The ellipse and its symmetric copies: each copy is the ellipse through the copied center and axis ends. */
function ellipseCopies(s: EllipseSpec): { cx: number; cy: number; rx: number; ry: number; rot: number }[] {
  return symCopies([{ x: s.cx, y: s.cy }, { x: s.cx + s.rx, y: s.cy }, { x: s.cx, y: s.cy + s.ry }]).map(([c, v]) => {
    let rot = Math.atan2(v.y - c.y, v.x - c.x) * 180 / Math.PI;
    rot = ((rot % 180) + 180) % 180; // an ellipse turned by 180° is the same ellipse
    if (Math.abs(rot) < 1e-6 || Math.abs(rot - 180) < 1e-6) rot = 0;
    return { cx: c.x, cy: c.y, rx: s.rx, ry: s.ry, rot };
  });
}
function ellipseAttrs(e: { cx: number; cy: number; rx: number; ry: number; rot: number }): Record<string, any> {
  const at: Record<string, any> = { cx: fmt(e.cx), cy: fmt(e.cy), rx: fmt(e.rx), ry: fmt(e.ry) };
  if (e.rot) at.transform = `rotate(${fmt(e.rot)} ${fmt(e.cx)} ${fmt(e.cy)})`;
  return at;
}
const ellipseTool: Tool = {
  down(e, raw) {
    if (!canDraw()) return;
    const p = resolvePoint(e, raw);
    state.action = { type: 'ellipse', a: { x: p.x, y: p.y }, b: { x: p.x, y: p.y }, sx: e.clientX, sy: e.clientY, moved: false, shift: false };
  },
  move(e, raw) {
    const a = state.action;
    if (!a) { resolvePoint(e, raw); return; }
    if (Math.hypot(e.clientX - a.sx, e.clientY - a.sy) > 3) a.moved = true;
    // Shift makes a circle here, so the point itself isn't held to 15° steps
    a.b = resolvePoint({ shiftKey: false, altKey: e.altKey }, raw);
    a.shift = e.shiftKey;
    previewG.innerHTML = '';
    if (!a.moved) return;
    const s = ellipseSpec(a);
    ellipseCopies(s).forEach((c, i) => mk('ellipse', { ...ellipseAttrs(c), ...(i ? { class: 'preview-ghost' } : previewStyle()) }, previewG));
    drawMeasure(a.b, s.rx === s.ry ? `Ø ${fmtLen(2 * s.rx)}` : `${fmtLen(2 * s.rx)} × ${fmtLen(2 * s.ry)}`);
  },
  up() {
    const a = state.action;
    state.action = null;
    previewG.innerHTML = '';
    if (!a || !a.moved) return;
    const s = ellipseSpec(a);
    if (s.rx < px(1) || s.ry < px(1)) return;
    for (const c of ellipseCopies(s)) mk('ellipse', { ...ellipseAttrs(c), fill: newFill(), ...shapeStyle() }, shapesG);
    commitGeometry();
  },
};

// ---- curve: click its points; click the first point to close it, double-click or Enter to end it open -----------
const curveD = (pts: Pt[], closed: boolean): string => Curves.cubicsToD(Curves.toCubics(state.curveType, pts, closed), closed, fmt);
function finishCurve(pts: Pt[] | null, closed: boolean): void {
  if (!pts || pts.length < 2 || (closed && pts.length < 3)) return;
  for (const q of symCopies(pts)) {
    const el = mk('path', { fill: closed ? newFill() : 'none', ...shapeStyle() }, shapesG);
    setSpline(el, { type: state.curveType, closed, pts: q });
  }
  commitGeometry();
}
function drawCurvePreview(p: Pt): void {
  previewG.innerHTML = '';
  const pts: Pt[] | null = state.freePts;
  if (!pts || !pts.length) return;
  const all = [...pts, p];
  symCopies(all).forEach((q, i) => mk('path', { d: curveD(q, false), ...(i ? { class: 'preview-ghost' } : previewStyle()) }, previewG));
  // the clicked points, joined by a dashed line when the curve doesn't pass through them all
  if (state.curveType !== 'catmull') mk('polyline', { points: ptsStr(all), class: 'preview-ghost' }, previewG);
  const r = px(3);
  all.forEach((q, i) => {
    if (Curves.onCurve(state.curveType, all.length, false, i)) mk('rect', { x: q.x - r, y: q.y - r, width: 2 * r, height: 2 * r, class: 'handle' }, previewG);
    else mk('circle', { cx: q.x, cy: q.y, r, class: 'handle' }, previewG);
  });
}
const curveTool: Tool = { ...freeTool };

// ---- knife: cut a tile straight across, from edge to edge -----------------------------------------------
function knifeCuts(a: any): { a: Pt; b: Pt }[] {
  const out: { a: Pt; b: Pt }[] = [], seen = new Set<string>();
  for (const t of symTransforms()) {
    const A = t(a.a), B = t(a.b), dir = { x: B.x - A.x, y: B.y - A.y };
    if (Math.hypot(dir.x, dir.y) < 1e-9) continue;
    const f = a.ix.locate(A);
    if (!f) continue;
    const r = a.ix.region(f), c = Geo.chordThrough(A, dir, [r.outer, ...r.holes]);
    if (!c) continue;
    const key = [ptKey(c.a), ptKey(c.b)].sort().join(' ');
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(c);
  }
  return out;
}
const knifeTool: Tool = {
  down(e, raw) {
    if (!canDraw()) return;
    state.action = { type: 'knife', a: raw, b: raw, ix: regionIndex(), sx: e.clientX, sy: e.clientY, moved: false, cuts: [] };
    if (!state.action.ix.locate(raw)) { state.action = null; toast(t('Start the cut inside a closed area.')); showGaps(); }
  },
  move(e, raw) {
    const a = state.action;
    if (!a) return;
    if (Math.hypot(e.clientX - a.sx, e.clientY - a.sy) > 4) a.moved = true;
    a.b = e.shiftKey ? constrainAngle(a.a, raw) : raw;
    a.cuts = a.moved ? knifeCuts(a) : [];
    previewG.innerHTML = '';
    a.cuts.forEach((c: { a: Pt; b: Pt }, i: number) => mk('line', { x1: c.a.x, y1: c.a.y, x2: c.b.x, y2: c.b.y, ...(i ? { class: 'preview-ghost' } : previewStyle()) }, previewG));
    if (a.cuts[0]) drawMeasure(raw, fmtLen(Geo.dist(a.cuts[0].a, a.cuts[0].b)));
  },
  up() {
    const a = state.action;
    state.action = null;
    previewG.innerHTML = '';
    if (!a || !a.moved || !a.cuts.length) return;
    addLineSegments(a.cuts);
    commitGeometry();
  },
};

// ---- pattern: fill a closed area (or the whole page) with tiles ---------------------------------------------
export function applyPattern(p: Pt | null): void {
  if (!canDraw()) return;
  let region: Region;
  if (p) {
    const ix = regionIndex(), f = ix.locate(p);
    if (!f) { toast(t('Click inside a closed area (or use “Fill whole page”).')); showGaps(); return; }
    region = ix.region(f);
  } else {
    const pts = pagePts();
    region = { outer: pts, holes: [], area: state.doc.w * state.doc.h, bb: Geo.bounds(pts) };
  }
  const P = state.pattern;
  if (P.type === 'rows') { applyRows(region, P); return; }
  const origin = P.type === 'rings'
    ? (p || { x: state.doc.x + state.doc.w / 2, y: state.doc.y + state.doc.h / 2 })
    : { x: region.bb.x0, y: region.bb.y0 };
  const res = Patterns.build({
    type: P.type, size: P.size, angle: P.angle, origin, rings: [region.outer, ...region.holes],
    inside: (q: Pt) => insideRegion(region, q), eps: Geo.eps,
  });
  if (res.error) { toast(t('That would be about {n} tiles – make the tile size bigger.', { n: res.estimate })); return; }
  const segs = res.segments;
  if (!segs.length) { toast(t('The tiles are bigger than this area.')); return; }
  const add = () => {
    addLineSegments(segs);
    commitGeometry();
    toast(t('Added the pattern “{type}” ({n} {n|line|lines}).', { type: t(Patterns.TYPES.find(p => p[0] === P.type)[1]), n: segs.length }));
  };
  // very many lines: only after asking (the usual case stays immediate; test robots and benchmarks aren't asked)
  if (segs.length > 3000 && !navigator.webdriver) askYes(t('This adds {n} lines, which may make editing slow. Continue?', { n: segs.length })).then((ok) => { if (ok) add(); });
  else add();
}
/** Rows of tiles following the area's outline (and around any shapes inside it). */
function applyRows(region: Region, P: any): void {
  const span = Math.max(region.bb.x1 - region.bb.x0, region.bb.y1 - region.bb.y0);
  if (P.size * 2 > span) { toast(t('The rows are wider than this area – use a smaller size.')); return; }
  const { loops, cuts } = Contour.build({ rings: [region.outer, ...region.holes], width: P.size, length: P.size, rows: P.rows || 0 });
  if (!loops.length) { toast(t('This area is too narrow for a row of that width.')); return; }
  for (const l of loops) mk('polygon', { points: ptsStr(l), fill: 'none', ...shapeStyle() }, shapesG);
  addLineSegments(cuts);
  commitGeometry();
  toast(t('Added {rows} {rows|row line|row lines} and {cuts} {cuts|cut|cuts} following the outline.', { rows: loops.length, cuts: cuts.length }));
}
const patternTool: Tool = {
  // applied on release, so a pinch / drag that starts here doesn't add a pattern
  down(e, raw) { state.action = { type: 'pattern', p: raw, sx: e.clientX, sy: e.clientY }; },
  move() {},
  up(e) {
    const a = state.action;
    state.action = null;
    if (a && a.type === 'pattern' && Math.hypot(e.clientX - a.sx, e.clientY - a.sy) < 8) applyPattern(a.p);
  },
};

// ---- paint bucket – click, or drag across tiles --------------------------------------------------------------
type FillChooser = (p: Pt, f: Face | null, ctx: PaintCtx) => string | null;
/** Optional (point, face, ctx) → color for each painted tile, e.g. a random color mix. */
let fillChooser: FillChooser | null = null;
export function setFillChooser(fn: FillChooser | null): void { fillChooser = fn; }
function paintPoints(p: Pt, ctx: PaintCtx): void {
  for (const t of symTransforms()) {
    const q = t(p), f = ctx.ix.locate(q);
    if (f && ctx.done.has(f)) continue;
    if (f) ctx.done.add(f);
    const r = bucketAt(q, fillChooser ? fillChooser(q, f, ctx) : state.fill, ctx, f);
    if (r.found) ctx.found = true;
    if (r.changed) ctx.changed = true;
  }
}
const bucketTool: Tool = {
  down(e, raw) {
    if (e.altKey) { eyedrop(raw); return; }
    if (!editable('fills')) { toast(t('Painted areas are locked or hidden (see Layers).')); return; }
    const ctx = paintCtx();
    ctx.done = new Set();
    paintPoints(raw, ctx);
    state.action = { type: 'paint', ctx };
    if (!ctx.found) {
      const n = showGaps();
      toast(n ? t('No closed area here. The red circles show line ends that don’t touch anything.') : t('No closed area here – make sure the lines meet.'));
    }
  },
  move(e, raw) {
    const a = state.action;
    if (a && a.type === 'paint') paintPoints(raw, a.ctx);
  },
  up() {
    const a = state.action;
    state.action = null;
    if (a && a.ctx.changed) commit(true);
  },
};

// ---- select / edit -------------------------------------------------------------------------------------------
const selectTool: Tool = {
  down(e, raw) {
    let h = null, hd = px(rt.handlePx);
    for (const c of state.handles) {
      const d = Geo.dist(c, raw);
      if (d < hd) { hd = d; h = c; }
    }
    const base = { sx: e.clientX, sy: e.clientY, moved: false };
    if (h) {
      const ng = ngonData(h.el);
      if (ng && !(e.ctrlKey || e.metaKey)) {
        state.action = { ...base, type: 'ngon-resize', el: h.el, idx: h.idx, ng, inv: elMatrix(h.el).inverse(), exclude: new Set([h.el]) };
        return;
      }
      const targets: { el: Element; idx: number; inv?: DOMMatrix }[] = (state.link && !e.altKey) ? verticesAt(h) : [{ el: h.el, idx: h.idx }];
      if (!targets.length) targets.push({ el: h.el, idx: h.idx });
      for (const t of targets) t.inv = elMatrix(t.el).inverse();
      state.action = { ...base, type: 'vertex', targets, exclude: new Set(targets.map(t => t.el)) };
      return;
    }
    const hit = hitTest(raw);
    if (hit) {
      if (e.shiftKey) {
        if (state.selection.has(hit)) state.selection.delete(hit); else state.selection.add(hit);
        selectionChanged();
        return;
      }
      if (!state.selection.has(hit)) { state.selection.clear(); state.selection.add(hit); selectionChanged(); }
      const els = [...state.selection];
      // the vertex nearest to the grab point is what snaps while moving
      let anchor = raw, best = px(14);
      for (const el of els) for (const pl of geomOf(el).polys) for (const q of pl.pts) {
        const d = Geo.dist(q, raw);
        if (d < best) { best = d; anchor = q; }
      }
      state.action = { ...base, type: 'move', caps: els.map(capture), anchor: { x: anchor.x, y: anchor.y }, start: raw, exclude: new Set(els) };
      return;
    }
    if (!e.shiftKey && state.selection.size) { state.selection.clear(); selectionChanged(); }
    if (editable('ref') && inRef(raw)) {
      const im = refImage();
      state.action = { ...base, type: 'ref-move', start: raw, x0: +im.getAttribute('x'), y0: +im.getAttribute('y') };
      return;
    }
    state.action = { ...base, type: 'marquee', start: raw };
  },
  move(e, raw) {
    const a = state.action;
    if (!a) return;
    if (!a.moved && Math.hypot(e.clientX - a.sx, e.clientY - a.sy) < 3) return;
    a.moved = true;
    if (a.type === 'vertex') {
      const p = resolvePoint(e, raw, { exclude: a.exclude });
      for (const t of a.targets) setVertex(t.el, t.idx, applyM(t.inv, p));
      renderSelection();
    } else if (a.type === 'ngon-resize') {
      const p = resolvePoint(e, raw, { exclude: a.exclude });
      const q = applyM(a.inv, p), g = a.ng;
      const r = Math.hypot(q.x - g.cx, q.y - g.cy);
      if (r < 1e-6) return;
      let rot = Math.atan2(q.y - g.cy, q.x - g.cx) * 180 / Math.PI - a.idx * 360 / g.n;
      if (e.shiftKey) rot = Math.round(rot / 15) * 15;
      setNgon(a.el, { ...g, r, rot }, e.shiftKey ? null : q, a.idx);
      renderSelection();
      renderProps();
    } else if (a.type === 'move') {
      const target = { x: a.anchor.x + raw.x - a.start.x, y: a.anchor.y + raw.y - a.start.y };
      const p = resolvePoint(e, target, { exclude: a.exclude });
      const d = { x: p.x - a.anchor.x, y: p.y - a.anchor.y };
      for (const c of a.caps) applyMove(c, d);
      renderSelection();
    } else if (a.type === 'ref-move') {
      const im = refImage();
      im.setAttribute('x', fmt(a.x0 + raw.x - a.start.x));
      im.setAttribute('y', fmt(a.y0 + raw.y - a.start.y));
    } else if (a.type === 'marquee') {
      a.cur = raw;
      previewG.innerHTML = '';
      mk('rect', {
        x: Math.min(a.start.x, raw.x), y: Math.min(a.start.y, raw.y),
        width: Math.abs(raw.x - a.start.x), height: Math.abs(raw.y - a.start.y), class: 'marquee',
      }, previewG);
    }
  },
  up() {
    const a = state.action;
    state.action = null;
    previewG.innerHTML = '';
    snapG.innerHTML = '';
    if (!a || !a.moved) return;
    if (a.type === 'vertex') {
      for (const t of a.targets) t.el.removeAttribute('data-ngon');
      commitGeometry();
    } else if (a.type === 'ngon-resize') commitGeometry();
    else if (a.type === 'move') commitFor(a.caps.map((c: { el: Element }) => c.el));
    else if (a.type === 'ref-move') docChanged();
    else if (a.type === 'marquee' && a.cur) {
      const x0 = Math.min(a.start.x, a.cur.x), x1 = Math.max(a.start.x, a.cur.x);
      const y0 = Math.min(a.start.y, a.cur.y), y1 = Math.max(a.start.y, a.cur.y);
      for (const el of allShapes()) {
        if (!selectable(el)) continue;
        const b = geomOf(el).bbox;
        if (b.x0 >= x0 && b.x1 <= x1 && b.y0 >= y0 && b.y1 <= y1) state.selection.add(el);
      }
      selectionChanged();
    }
  },
};

// ---- the tool switcher ------------------------------------------------------------------------------------------
export const tools: Record<string, Tool> = {
  select: selectTool, line: lineTool, free: freeTool, ngon: ngonTool, ellipse: ellipseTool, curve: curveTool, knife: knifeTool,
  pattern: patternTool, bucket: bucketTool, pan: { down() {}, move() {}, up() {} },
};
const HINTS: Record<string, string> = {
  select: t('Click to select (Shift adds) · drag to move – the nearest corner snaps · drag handles to edit; shared corners move together (Alt detaches) · yellow handles resize a polygon'),
  line: t('Click–click or drag · ends snap to points and onto other lines · Shift: 15° steps · Alt: no snap · Esc: stop'),
  free: t('Click corner by corner · click the first corner, double-click or press Enter to close · Backspace removes the last corner · Esc cancels'),
  ngon: t('Drag from the center (or along an edge in “From edge” mode) · click = last size · Shift: 15° rotation · Ctrl: flip side · keys 3–9: sides'),
  ellipse: t('Drag from corner to corner (or from the center) · Shift: a circle · Alt: no snap'),
  curve: t('Click the curve’s points · click the first point to close it · double-click or Enter ends it open · Backspace removes the last point · Esc cancels'),
  knife: t('Drag across a tile to cut it straight through, edge to edge · Shift: 15° steps'),
  pattern: t('Click inside a closed area to fill it with the chosen pattern'),
  bucket: t('Click or drag across tiles to paint them · click again to recolor · ∅ swatch erases · Alt+click: pick a color'),
  pan: t('Drag to pan · mouse wheel zooms'),
};
/** Adds a tool that has no button (e.g. placing a motif). */
export function registerTool(name: string, handlers: Tool, hint: string): void { tools[name] = handlers; HINTS[name] = hint; }
export function setTool(tool: string): void {
  if (EXPERT_TOOLS.has(tool) && state.mode !== 'expert') tool = 'select';
  cancelPending();
  state.tool = tool;
  stage.dataset.tool = tool;
  for (const b of $$('#tools button')) b.classList.toggle('active', b.dataset.tool === tool);
  for (const s of $$('.tool-opts')) s.hidden = s.dataset.for !== tool;
  $('#st-hint').textContent = HINTS[tool];
}
