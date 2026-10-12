/* The drawing's elements: their colors, their geometry in document coordinates, a cached list
   with a spatial index for quick lookups, vertices of editable shapes and regular-polygon data. */
import * as Geo from '../lib/geometry.ts';
import * as Colors from '../lib/colors.ts';
import * as Curves from '../lib/curves.ts';
import type { Pt, Bounds } from '../lib/geometry.ts';
import {
  state, docG, defsG, fillsG, shapesG, SHAPE_SEL, EDITABLE, isFill, applyM, clamp, fmt, ptsStr, parsePoints,
} from './env.ts';
import { selectable } from './view.ts';

export interface Poly { pts: Pt[]; closed: boolean }
export interface Geom { polys: Poly[]; bbox: Bounds }
export interface Ngon { n: number; cx: number; cy: number; r: number; rot: number }

// ---- colors of elements ----------------------------------------------------------------------
export function setPaint(el: any, prop: string, color: string | null): void {
  const v = color || 'none';
  el.setAttribute(prop, v);
  if (el.hasAttribute('style')) el.style.removeProperty(prop);
  // only an imported <style> sheet can override the attribute; reading computed styles is slow
  if (!defsG.getElementsByTagName('style').length) return;
  const cs = getComputedStyle(el)[prop];
  const ok = v === 'none' ? cs === 'none' : Colors.norm(cs) === Colors.norm(v);
  if (!ok) el.style.setProperty(prop, v); // a CSS rule in an imported file overrides attributes
}
export function paintFill(el: Element, c: string | null): void {
  setPaint(el, 'fill', c);
  if (isFill(el)) setPaint(el, 'stroke', c); // the thin same-color stroke hides seams between areas
}
/** The fill attribute can be trusted (no inline style, no class-based CSS from an imported file). */
function plainFill(el: Element): string | null {
  if (el.hasAttribute('style') || !el.hasAttribute('fill') || defsG.getElementsByTagName('style').length) return null;
  const cls = el.getAttribute('class');
  return cls === null || cls === 'mz-fill' ? el.getAttribute('fill') : null;
}
export function hasFill(el: Element): boolean {
  if (el.tagName === 'line') return false;
  const f = plainFill(el);
  return (f !== null ? f : getComputedStyle(el).fill) !== 'none';
}
export function fillOf(el: Element): string | null {
  if (el.tagName === 'line') return null;
  const f = plainFill(el);
  return Colors.norm(f !== null ? f : getComputedStyle(el).fill);
}

// ---- the list of shapes and the spatial index -------------------------------------------------
// The list and the index are cached; adding / removing elements updates them, geometry edits reset
// them through touch(). Changes arrive either through the observer callback (between events) or
// through takeRecords() (synchronously, right after a change) – both go through applyDocChanges.
const docObserver = new MutationObserver((recs) => applyDocChanges(recs));
docObserver.observe(docG, { childList: true, subtree: true });
let shapeList: Element[] | null = null, shapeSet = new WeakSet<Element>(), shapeGrid: Geo.SpatialGrid<Element> | null = null;
const isShape = (el: Element) => el.matches(SHAPE_SEL) && !el.closest('defs,clipPath,mask,pattern,symbol,marker');
const checkDocChanges = () => applyDocChanges(docObserver.takeRecords());
function applyDocChanges(recs: MutationRecord[]): void {
  if (!recs.length || !shapeList) return;
  // additions (painting, drawing) are applied in place; removals rebuild everything
  for (const r of recs) {
    for (const n of r.removedNodes) if (n.nodeType === 1) { shapeList = null; shapeGrid = null; return; }
  }
  for (const r of recs) for (const n of r.addedNodes) {
    if (n.nodeType !== 1 || !n.isConnected) continue;
    for (const el of [n as Element, ...(n as Element).querySelectorAll(SHAPE_SEL)]) {
      if (!isShape(el) || shapeSet.has(el)) continue;
      shapeSet.add(el);
      shapeList.push(el);
      if (shapeGrid) shapeGrid.insert(el, geomOf(el).bbox);
    }
  }
}
/** Every drawable element. Do not modify the returned array. */
export function allShapes(): Element[] {
  checkDocChanges();
  if (!shapeList) {
    shapeList = [...docG.querySelectorAll(SHAPE_SEL)].filter(isShape);
    shapeSet = new WeakSet(shapeList);
  }
  return shapeList;
}
/** Elements whose bounding box touches the box, topmost first. */
export function shapesNear(x0: number, y0: number, x1: number, y1: number): Element[] {
  const list = allShapes();
  if (!shapeGrid) {
    const d = state.doc;
    shapeGrid = new Geo.SpatialGrid(Math.max(d.w, d.h) / 100);
    for (const el of list) shapeGrid.insert(el, geomOf(el).bbox);
  }
  const out: Element[] = [];
  for (const el of shapeGrid.query(x0, y0, x1, y1)) {
    if (!el.isConnected) continue;
    const b = geomOf(el).bbox;
    if (b.x1 >= x0 && b.x0 <= x1 && b.y1 >= y0 && b.y0 <= y1) out.push(el);
  }
  // topmost (later in the document) first
  return out.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : -1));
}
export const shapesAt = (p: Pt, r = 0): Element[] => shapesNear(p.x - r, p.y - r, p.x + r, p.y + r);

// ---- geometry ---------------------------------------------------------------------------------
const IDENT = new DOMMatrix();
/** Matrix from an element's own coordinates to document coordinates. */
export function elMatrix(node: any): DOMMatrix {
  if (node === docG || node === shapesG || node === fillsG) return IDENT;
  if (!node.hasAttribute('transform') && (node.parentNode === shapesG || node.parentNode === fillsG)) return IDENT;
  const a = docG.getCTM(), b = node.getCTM && node.getCTM();
  if (!a || !b) return IDENT;
  return DOMMatrix.fromMatrix(a).inverse().multiply(DOMMatrix.fromMatrix(b));
}
let geomCache = new WeakMap<Element, Geom>();
/** Forget all cached geometry (after edits). */
export const touch = (): void => { geomCache = new WeakMap(); shapeGrid = null; };
/** Forget one element's cached geometry (while dragging it). */
export const invalidate = (el: Element): void => { geomCache.delete(el); };

/** { polys: [{pts, closed}], bbox } in document coordinates. */
export function geomOf(el: Element): Geom {
  let g = geomCache.get(el);
  if (!g) { g = computeGeom(el); geomCache.set(el, g); }
  return g;
}
function computeGeom(el: any): Geom {
  const tag = el.tagName;
  const num = (n: string) => parseFloat(el.getAttribute(n)) || 0;
  let polys: Poly[] = [];
  if (tag === 'line') polys = [{ pts: [{ x: num('x1'), y: num('y1') }, { x: num('x2'), y: num('y2') }], closed: false }];
  else if (tag === 'polyline' || tag === 'polygon') polys = [{ pts: parsePoints(el.getAttribute('points')), closed: tag === 'polygon' }];
  else if (tag === 'rect') {
    const x = num('x'), y = num('y'), w = num('width'), h = num('height');
    if (w > 0 && h > 0) polys = [{ pts: [{ x, y }, { x: x + w, y }, { x: x + w, y: y + h }, { x, y: y + h }], closed: true }];
  } else if (tag === 'path') polys = linearPath(el.getAttribute('d') || '') || samplePath(el, false);
  else polys = samplePath(el, true);
  const m = elMatrix(el);
  if (!m.isIdentity) for (const p of polys) p.pts = p.pts.map(q => applyM(m, q));
  polys = polys.filter(p => p.pts.length > 1);
  return { polys, bbox: Geo.bounds(polys.flatMap(p => p.pts)) };
}
/** Exact vertices for paths made only of straight segments (M L H V Z); null if it has curves. */
export function linearPath(d: string): Poly[] | null {
  const toks = d.match(/[a-z]|[-+]?(?:\d*\.\d+|\d+\.?)(?:e[-+]?\d+)?/gi);
  if (!toks) return [];
  const polys: Poly[] = [];
  let i = 0, cmd: string | null = null, x = 0, y = 0, sx = 0, sy = 0, cur: Poly | null = null;
  const isCmd = (t: string) => /^[a-z]$/i.test(t);
  const num = () => { const v = parseFloat(toks[i++]); if (!Number.isFinite(v)) throw 0; return v; };
  const push = () => {
    if (!cur) { cur = { pts: [{ x: sx, y: sy }], closed: false }; polys.push(cur); }
    cur.pts.push({ x, y });
  };
  try {
    while (i < toks.length) {
      if (isCmd(toks[i])) cmd = toks[i++];
      else if (!cmd) return null;
      const rel = cmd === cmd.toLowerCase(), C = cmd.toUpperCase();
      if (C === 'Z') {
        if (cur) cur.closed = true;
        x = sx; y = sy; cur = null;
        continue;
      }
      if (i >= toks.length || isCmd(toks[i])) return null;
      if (C === 'M') {
        let nx = num(), ny = num();
        if (rel) { nx += x; ny += y; }
        x = sx = nx; y = sy = ny;
        cur = { pts: [{ x, y }], closed: false };
        polys.push(cur);
        cmd = rel ? 'l' : 'L';
      } else if (C === 'L') {
        let nx = num(), ny = num();
        if (rel) { nx += x; ny += y; }
        x = nx; y = ny; push();
      } else if (C === 'H') { const v = num(); x = rel ? x + v : v; push(); }
      else if (C === 'V') { const v = num(); y = rel ? y + v : v; push(); }
      else return null;
    }
  } catch { return null; }
  for (const p of polys) {
    const a = p.pts[0], b = p.pts[p.pts.length - 1];
    if (p.pts.length > 2 && Math.hypot(a.x - b.x, a.y - b.y) < 1e-9) { p.pts.pop(); p.closed = true; }
  }
  return polys;
}
/** Curves are approximated by sampling. */
function samplePath(el: any, forceClosed: boolean): Poly[] {
  let len: number;
  try { len = el.getTotalLength(); } catch { return []; }
  if (!(len > 0)) return [];
  const N = clamp(Math.ceil(len / (Math.max(state.doc.w, state.doc.h) / 300)), 16, 360), step = len / N;
  const polys: Pt[][] = [];
  let cur: Pt[] = [];
  for (let i = 0; i <= N; i++) {
    const q = el.getPointAtLength(i * step), p = { x: q.x, y: q.y };
    if (cur.length && Geo.dist(cur[cur.length - 1], p) > step * 1.5 + 1e-6) { polys.push(cur); cur = []; }
    cur.push(p);
  }
  polys.push(cur);
  return polys.filter(p => p.length > 1).map(pts => {
    const gap = Geo.dist(pts[0], pts[pts.length - 1]);
    const closed = forceClosed || gap < step * 1.5;
    if (closed && gap < 1e-3) pts.pop();
    return { pts, closed };
  });
}
export function pagePts(): Pt[] {
  const d = state.doc;
  return [{ x: d.x, y: d.y }, { x: d.x + d.w, y: d.y }, { x: d.x + d.w, y: d.y + d.h }, { x: d.x, y: d.y + d.h }];
}
export function pageGeom(): Geom {
  const d = state.doc;
  return { polys: [{ pts: pagePts(), closed: true }], bbox: { x0: d.x, y0: d.y, x1: d.x + d.w, y1: d.y + d.h } };
}
export function insideEl(el: Element, p: Pt): boolean {
  const g = geomOf(el), b = g.bbox;
  if (p.x < b.x0 || p.x > b.x1 || p.y < b.y0 || p.y > b.y1) return false;
  let n = 0;
  for (const pl of g.polys) if (pl.closed && Geo.pointInPolygon(p, pl.pts)) n++;
  return n % 2 === 1;
}
export function strokeW(el: Element): number { return parseFloat(getComputedStyle(el).strokeWidth) || 0; }
/** Is p covered by a painted area or a filled shape? */
export function isPaintedAt(p: Pt): boolean {
  return shapesAt(p).some(el => (isFill(el) || hasFill(el)) && insideEl(el, p));
}
/** Color of the topmost painted area or filled shape at p (null if none). */
export function paintedColorAt(p: Pt): string | null {
  for (const el of shapesAt(p)) if ((isFill(el) || hasFill(el)) && insideEl(el, p)) return fillOf(el);
  return null;
}

// ---- vertices of editable shapes: lines, polylines, polygons, ellipses (the ends of their axes) and
// curves (their clicked points) -------------------------------------------------------------------------
export function hasVerts(el: Element): boolean {
  return EDITABLE.has(el.tagName) || el.tagName === 'ellipse' || !!splineData(el);
}
export function localVerts(el: Element): Pt[] {
  const n = (k: string) => parseFloat(el.getAttribute(k)) || 0;
  if (el.tagName === 'line') return [{ x: n('x1'), y: n('y1') }, { x: n('x2'), y: n('y2') }];
  if (el.tagName === 'ellipse') {
    const cx = n('cx'), cy = n('cy'), rx = n('rx'), ry = n('ry');
    return [{ x: cx + rx, y: cy }, { x: cx, y: cy + ry }, { x: cx - rx, y: cy }, { x: cx, y: cy - ry }];
  }
  if (el.tagName === 'path') return splineData(el)?.pts || [];
  return parsePoints(el.getAttribute('points'));
}
export function docVerts(el: Element): Pt[] {
  const m = elMatrix(el);
  return localVerts(el).map(p => applyM(m, p));
}
export function setVertex(el: Element, idx: number, q: Pt): void {
  const sp = splineData(el);
  if (sp) {
    sp.pts[idx] = q;
    setSpline(el, sp);
    return;
  }
  if (el.tagName === 'ellipse') {
    // an axis end sets that radius
    const c = parseFloat(el.getAttribute(idx % 2 ? 'cy' : 'cx')) || 0;
    el.setAttribute(idx % 2 ? 'ry' : 'rx', fmt(Math.max(Math.abs((idx % 2 ? q.y : q.x) - c), 1e-3)));
  } else if (el.tagName === 'line') {
    el.setAttribute(idx ? 'x2' : 'x1', fmt(q.x));
    el.setAttribute(idx ? 'y2' : 'y1', fmt(q.y));
  } else {
    const pts = localVerts(el);
    pts[idx] = q;
    el.setAttribute('points', ptsStr(pts));
  }
  invalidate(el);
}
export function verticesAt(p: Pt): { el: Element; idx: number; inv?: DOMMatrix }[] {
  const out: { el: Element; idx: number }[] = [], tol = Geo.eps * 5;
  for (const el of shapesAt(p, tol)) {
    if (!hasVerts(el) || isFill(el) || !selectable(el)) continue;
    const b = geomOf(el).bbox;
    if (p.x < b.x0 - tol || p.x > b.x1 + tol || p.y < b.y0 - tol || p.y > b.y1 + tol) continue;
    docVerts(el).forEach((q, i) => { if (Geo.dist(q, p) < tol) out.push({ el, idx: i }); });
  }
  return out;
}

// ---- regular polygons keep their parameters in data-ngon="n cx cy r rotationDeg" ---------------
export function ngonData(el: any): Ngon | null {
  const s = el && el.getAttribute && el.getAttribute('data-ngon');
  if (!s || el.tagName !== 'polygon') return null;
  const [n, cx, cy, r, rot] = s.split(/[\s,]+/).map(Number);
  if (!(n >= 3) || ![cx, cy, r, rot].every(Number.isFinite)) return null;
  return { n, cx, cy, r, rot };
}
export function setNgonData(el: Element, g: Ngon): void {
  el.setAttribute('data-ngon', [g.n, fmt(g.cx), fmt(g.cy), fmt(g.r), fmt(g.rot)].join(' '));
}
export function setNgon(el: Element, g: Ngon, exact?: Pt | null, idx?: number): void {
  const pts = Geo.regularPolygon(g.n, g.cx, g.cy, g.r, g.rot * Math.PI / 180);
  if (exact) pts[idx] = exact;
  el.setAttribute('points', ptsStr(pts));
  setNgonData(el, g);
  invalidate(el);
}

// ---- curves keep their clicked points in data-spline="type open|closed x,y x,y …" -----------------
export interface Spline { type: Curves.SplineType; closed: boolean; pts: Pt[] }
export function splineData(el: any): Spline | null {
  const s = el && el.tagName === 'path' && el.getAttribute('data-spline');
  if (!s) return null;
  const [type, shut, ...rest] = s.trim().split(/\s+/);
  if (!Curves.SPLINE_TYPES.includes(type as Curves.SplineType)) return null;
  const pts = parsePoints(rest.join(' '));
  return pts.length >= 2 ? { type: type as Curves.SplineType, closed: shut === 'closed', pts } : null;
}
/** Sets a curve's points and redraws it. */
export function setSpline(el: Element, sp: Spline): void {
  el.setAttribute('data-spline', `${sp.type} ${sp.closed ? 'closed' : 'open'} ${ptsStr(sp.pts)}`);
  el.setAttribute('d', Curves.cubicsToD(Curves.toCubics(sp.type, sp.pts, sp.closed), sp.closed, fmt));
  invalidate(el);
}
