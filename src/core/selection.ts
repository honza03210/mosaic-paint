/* Selecting and moving: hit testing, the selection outline and handles, the properties panel,
   moving shapes by a delta, and the selection commands (delete, duplicate, order, select all). */
import * as Geo from '../lib/geometry.ts';
import * as Curves from '../lib/curves.ts';
import type { Pt } from '../lib/geometry.ts';
import { $, state, rt, selG, isFill, px, mk, fmt, ptsStr, parsePoints, linM } from './env.ts';
import {
  shapesAt, geomOf, hasFill, insideEl, strokeW, docVerts, hasVerts, splineData, ngonData, setNgonData, elMatrix, linearPath, invalidate, allShapes,
  type Ngon, type Poly,
} from './doc.ts';
import { selectable } from './view.ts';
import { ringsToD, commitFor } from './areas.ts';
import { commit } from './history.ts';
import { t } from '../shared/i18n.ts';
import { setTool } from './tools.ts';

export function hitTest(p: Pt): Element | null {
  const tol = px(rt.hitPx), list = shapesAt(p, tol + Math.max(state.doc.w, state.doc.h) / 100).filter(selectable);
  // first: lines / outlines near the pointer (they are thin, so they win)
  for (const el of list) {
    if (isFill(el)) continue;
    const g = geomOf(el), b = g.bbox, t = Math.max(tol, strokeW(el) / 2);
    if (p.x < b.x0 - t || p.x > b.x1 + t || p.y < b.y0 - t || p.y > b.y1 + t) continue;
    for (const pl of g.polys) {
      const n = pl.pts.length, m = pl.closed ? n : n - 1;
      for (let i = 0; i < m; i++) if (Geo.dist(p, Geo.project(p, pl.pts[i], pl.pts[(i + 1) % n])) <= t) return el;
    }
  }
  // then: painted areas under the pointer
  for (const el of list) if ((isFill(el) || hasFill(el)) && insideEl(el, p)) return el;
  return null;
}
export function renderSelection(): void {
  selG.innerHTML = '';
  state.handles = [];
  const many = state.selection.size > 300;
  for (const el of [...state.selection]) {
    if (!el.isConnected) { state.selection.delete(el); continue; }
    for (const pl of geomOf(el).polys) mk(pl.closed ? 'polygon' : 'polyline', { points: ptsStr(pl.pts), class: 'sel-outline' }, selG);
    if (many || !hasVerts(el) || isFill(el)) continue;
    const vs = docVerts(el), sp = splineData(el);
    // a curve's points that it doesn't pass through: joined by a dashed line, with round handles
    if (sp && sp.type !== 'catmull') mk(sp.closed ? 'polygon' : 'polyline', { points: ptsStr(vs), class: 'sel-ctrl' }, selG);
    vs.forEach((q, i) => state.handles.push({ el, idx: i, x: q.x, y: q.y, ctrl: !!sp && !Curves.onCurve(sp.type, vs.length, sp.closed, i) }));
  }
  const s = px(rt.handlePx - 2);
  for (const h of state.handles) {
    if (h.ctrl) mk('circle', { cx: h.x, cy: h.y, r: s / 2, class: 'handle' }, selG);
    else mk('rect', { x: h.x - s / 2, y: h.y - s / 2, width: s, height: s, class: ngonData(h.el) ? 'handle ngon' : 'handle' }, selG);
  }
}
const CURVE_NAMES: Record<Curves.SplineType, () => string> = {
  catmull: () => t('curve through points'), bspline: () => t('B-spline'), bezier3: () => t('cubic Bézier'), bezier2: () => t('quadratic Bézier'),
};
function describe(el: Element): string {
  if (isFill(el)) return 'painted area';
  const ng = ngonData(el);
  if (ng) return `${ng.n}-gon`;
  const sp = splineData(el);
  if (sp) return CURVE_NAMES[sp.type]();
  return el.tagName === 'ellipse' ? t('ellipse') : el.tagName;
}
export function renderProps(): void {
  const sel = [...state.selection].filter(e => e.isConnected);
  $('#sel-section').hidden = !sel.length;
  if (!sel.length) return;
  $('#sel-info').textContent = sel.length === 1 ? `(${describe(sel[0])})` : `(${sel.length} items)`;
  const ng = sel.length === 1 ? ngonData(sel[0]) : null;
  $('#ngon-props').hidden = !ng;
  if (ng) {
    $('#sel-sides').value = ng.n;
    $('#sel-radius').value = fmt(ng.r);
    $('#sel-rot').value = fmt(ng.rot);
  }
  const sw = strokeW(sel[0]);
  $('#sel-sw').value = Number.isFinite(sw) ? fmt(sw) : '';
}
export function selectionChanged(): void { renderSelection(); renderProps(); }

// ---- moving: capture an element's geometry once, then apply a delta from the original ----------
interface Captured {
  el: Element; inv: DOMMatrix; ngon: Ngon | null;
  line?: number[]; pts?: Pt[]; rings?: Poly[]; transform?: string; pinv?: DOMMatrix;
}
export function capture(el: Element): Captured {
  const c: Captured = { el, inv: elMatrix(el).inverse(), ngon: ngonData(el) };
  const tag = el.tagName;
  if (tag === 'line') c.line = ['x1', 'y1', 'x2', 'y2'].map(k => parseFloat(el.getAttribute(k)) || 0);
  else if (tag === 'polyline' || tag === 'polygon') c.pts = parsePoints(el.getAttribute('points'));
  else if (isFill(el) && !el.hasAttribute('transform') && linearPath(el.getAttribute('d') || '')) c.rings = linearPath(el.getAttribute('d'));
  else {
    c.transform = el.getAttribute('transform') || '';
    c.pinv = elMatrix(el.parentNode).inverse();
  }
  return c;
}
export function applyMove(c: Captured, d: Pt): void {
  const el = c.el;
  if (c.line) {
    const l = linM(c.inv, d);
    el.setAttribute('x1', fmt(c.line[0] + l.x)); el.setAttribute('y1', fmt(c.line[1] + l.y));
    el.setAttribute('x2', fmt(c.line[2] + l.x)); el.setAttribute('y2', fmt(c.line[3] + l.y));
  } else if (c.pts) {
    const l = linM(c.inv, d);
    el.setAttribute('points', ptsStr(c.pts.map(p => ({ x: p.x + l.x, y: p.y + l.y }))));
    if (c.ngon) setNgonData(el, { ...c.ngon, cx: c.ngon.cx + l.x, cy: c.ngon.cy + l.y });
  } else if (c.rings) {
    el.setAttribute('d', ringsToD(c.rings.map(r => r.pts.map(p => ({ x: p.x + d.x, y: p.y + d.y })))));
  } else {
    const l = linM(c.pinv, d);
    let rest = c.transform, tx = l.x, ty = l.y;
    const m = rest.match(/^\s*translate\(\s*([-+\d.e]+)(?:[\s,]+([-+\d.e]+))?\s*\)\s*/i);
    if (m) { tx += +m[1]; ty += +(m[2] || 0); rest = rest.slice(m[0].length); }
    el.setAttribute('transform', `translate(${fmt(tx)} ${fmt(ty)}) ${rest}`.trim());
  }
  invalidate(el);
}
export function moveElements(els: Element[], d: Pt): void {
  for (const c of els.map(capture)) applyMove(c, d);
}

// ---- selection commands --------------------------------------------------------------------------
export function deleteSel(): void {
  if (!state.selection.size) return;
  const els = [...state.selection];
  for (const el of els) el.remove();
  state.selection.clear();
  commitFor(els);
}
export function duplicate(): void {
  if (!state.selection.size) return;
  const clones = [...state.selection].map(el => { const c = el.cloneNode(true) as Element; el.parentNode.appendChild(c); return c; });
  const off = state.grid ? state.gridSize : Math.max(state.doc.w, state.doc.h) / 100;
  moveElements(clones, { x: off, y: off });
  state.selection = new Set(clones);
  commitFor(clones);
}
export function toFront(): void {
  for (const el of state.selection) el.parentNode.appendChild(el);
  if (state.selection.size) commit();
}
export function toBack(): void {
  for (const el of [...state.selection].reverse()) el.parentNode.insertBefore(el, el.parentNode.firstChild);
  if (state.selection.size) commit();
}
export function selectAll(): void {
  if (state.tool !== 'select') setTool('select');
  state.selection = new Set(allShapes().filter(selectable));
  selectionChanged();
}
