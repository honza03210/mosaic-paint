/* Snapping the pointer to points, crossings, midpoints, lines and the grid; 15° angle steps;
   the snap marker and the size labels shown while drawing. */
import * as Geo from '../lib/geometry.ts';
import type { Pt } from '../lib/geometry.ts';
import { state, rt, snapG, previewG, isFill, applyM, mk, px } from './env.ts';
import { shapesNear, geomOf, pageGeom, ngonData, elMatrix, type Geom } from './doc.ts';
import { symOn, symCenter } from './view.ts';

export interface Snapped extends Pt { kind: string | null }
export interface SnapOptions { exclude?: Set<Element>; extra?: Pt[]; noSnap?: boolean }

function gridSnap(p: Pt): Snapped {
  if (!state.grid) return { x: p.x, y: p.y, kind: null };
  const g = state.gridSize, d = state.doc;
  return { x: d.x + Math.round((p.x - d.x) / g) * g, y: d.y + Math.round((p.y - d.y) / g) * g, kind: 'grid' };
}
export function snapPoint(p: Pt, opt: SnapOptions = {}): Snapped {
  if (opt.noSnap) return { x: p.x, y: p.y, kind: null };
  if (!state.snap) return gridSnap(p);
  const r = px(rt.snapPx), ex = opt.exclude;
  let best: Snapped | null = null, bd = r;
  const near: { a: Pt; b: Pt; pr: Pt; d: number }[] = [];
  const consider = (q: Pt, kind: string) => {
    const d = Geo.dist(p, q);
    if (d < bd) { bd = d; best = { x: q.x, y: q.y, kind }; }
  };
  const scan = (g: Geom) => {
    const b = g.bbox;
    if (p.x < b.x0 - r || p.x > b.x1 + r || p.y < b.y0 - r || p.y > b.y1 + r) return;
    for (const pl of g.polys) {
      const pts = pl.pts, n = pts.length, m = pl.closed ? n : n - 1;
      for (const q of pts) consider(q, 'vertex');
      for (let i = 0; i < m; i++) {
        const a = pts[i], c = pts[(i + 1) % n], pr = Geo.project(p, a, c), d = Geo.dist(p, pr);
        if (d < r) near.push({ a, b: c, pr, d });
      }
    }
  };
  if (state.border) scan(pageGeom());
  for (const el of shapesNear(p.x - r, p.y - r, p.x + r, p.y + r)) {
    if (isFill(el) || (ex && ex.has(el))) continue;
    scan(geomOf(el));
    const ng = ngonData(el);
    if (ng) consider(applyM(elMatrix(el), { x: ng.cx, y: ng.cy }), 'center');
  }
  if (opt.extra) for (const q of opt.extra) consider(q, 'vertex');
  if (symOn()) consider(symCenter(), 'center');
  if (best) return best;
  let bi: Pt | null = null, bid = r;
  const lim = Math.min(near.length, 80);
  for (let i = 0; i < lim; i++) for (let j = i + 1; j < lim; j++) {
    const x = Geo.segIntersect(near[i].a, near[i].b, near[j].a, near[j].b);
    if (x) { const d = Geo.dist(p, x); if (d < bid) { bid = d; bi = x; } }
  }
  if (bi) return { x: bi.x, y: bi.y, kind: 'intersection' };
  let bm: Pt | null = null, bmd = r * 0.7;
  for (const s of near) {
    const m = { x: (s.a.x + s.b.x) / 2, y: (s.a.y + s.b.y) / 2 }, d = Geo.dist(p, m);
    if (d < bmd) { bmd = d; bm = m; }
  }
  if (bm) return { x: bm.x, y: bm.y, kind: 'midpoint' };
  if (near.length) {
    near.sort((a, b) => a.d - b.d);
    return { x: near[0].pr.x, y: near[0].pr.y, kind: 'edge' };
  }
  return gridSnap(p);
}
export function constrainAngle(a: Pt, b: Pt): Snapped {
  const ang = Math.atan2(b.y - a.y, b.x - a.x), step = Math.PI / 12;
  const q = Math.round(ang / step) * step;
  const L = Math.hypot(b.x - a.x, b.y - a.y) * Math.cos(ang - q);
  return { x: a.x + L * Math.cos(q), y: a.y + L * Math.sin(q), kind: null };
}
/** Pointer position after snapping / constraints, with the snap marker drawn. */
export function resolvePoint(e: { shiftKey: boolean; altKey: boolean }, raw: Pt, opt: SnapOptions & { origin?: Pt | null } = {}): Snapped {
  const r = (opt.origin && e.shiftKey) ? constrainAngle(opt.origin, raw) : snapPoint(raw, { exclude: opt.exclude, extra: opt.extra, noSnap: e.altKey });
  drawSnapMarker(r);
  return r;
}
const SNAP_LABEL: Record<string, string> = { vertex: 'point', center: 'center', intersection: 'crossing', midpoint: 'midpoint', edge: 'on line', grid: 'grid' };
export function drawSnapMarker(r: Snapped | null): void {
  snapG.innerHTML = '';
  if (!r || !r.kind) return;
  const s = px(6), x = r.x, y = r.y;
  let d: string;
  switch (r.kind) {
    case 'vertex': d = `M${x - s} ${y - s}h${2 * s}v${2 * s}h${-2 * s}z`; break;
    case 'center': d = `M${x - s} ${y}a${s} ${s} 0 1 0 ${2 * s} 0a${s} ${s} 0 1 0 ${-2 * s} 0`; break;
    case 'intersection': d = `M${x - s} ${y - s}L${x + s} ${y + s}M${x + s} ${y - s}L${x - s} ${y + s}`; break;
    case 'midpoint': d = `M${x} ${y - s}L${x + s} ${y + s * 0.8}L${x - s} ${y + s * 0.8}z`; break;
    case 'edge': d = `M${x - s} ${y}L${x} ${y - s}L${x + s} ${y}L${x} ${y + s}z`; break;
    default: d = `M${x - s} ${y}H${x + s}M${x} ${y - s}V${y + s}`;
  }
  mk('path', { d, class: 'snap-mark' }, snapG);
  const t = mk('text', { x: x + s * 1.6, y: y - s * 1.2, class: 'snap-label', 'font-size': px(11) }, snapG);
  t.textContent = SNAP_LABEL[r.kind];
}
/** A small length / size label next to the pointer while drawing. */
export function drawMeasure(p: Pt, text: string): void {
  const t = mk('text', { x: p.x + px(14), y: p.y + px(22), class: 'measure', 'font-size': px(11.5) }, previewG);
  t.textContent = text;
}
