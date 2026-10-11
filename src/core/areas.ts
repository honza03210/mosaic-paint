/* Closed areas: what bounds them (lines, shapes, the page edge, small gaps bridged), the cached map
   of areas, the paint bucket, and keeping painted areas in step when lines change. */
import * as Geo from '../lib/geometry.ts';
import type { Pt, Seg, Bounds, Region, RegionIndex, Face } from '../lib/geometry.ts';
import { state, svg, docG, fillsG, shapesG, flashG, isFill, mk, fmt, px, applyM, toast } from './env.ts';
import {
  allShapes, geomOf, pageGeom, shapesAt, insideEl, hasFill, fillOf, paintFill, elMatrix, touch, invalidate,
  paintedColorAt, type Geom,
} from './doc.ts';
import { commit } from './history.ts';
import { setFill } from './palette.ts';

export const gapTol = (): number => Math.max(state.doc.w, state.doc.h) * (state.mode === 'expert' ? state.gapPct : 0.4) / 100;
let lastOpenEnds: Pt[] = [];

/**
 * Every straight piece that bounds areas: lines, shape outlines, the page edge, plus short
 * bridges that close small gaps where a line end almost touches something.
 */
export function boundarySegments(): Seg[] {
  const segs: Seg[] = [], ends: { p: Pt; seg: number }[] = [];
  const add = (g: Geom) => {
    for (const pl of g.polys) {
      const p = pl.pts, n = p.length, m = pl.closed ? n : n - 1, base = segs.length;
      for (let i = 0; i < m; i++) segs.push({ a: p[i], b: p[(i + 1) % n] });
      if (!pl.closed && m > 0) { ends.push({ p: p[0], seg: base }); ends.push({ p: p[n - 1], seg: base + m - 1 }); }
    }
  };
  if (state.border) add(pageGeom());
  for (const el of allShapes()) if (!isFill(el)) add(geomOf(el));
  const bridges = bridgeGaps(segs, ends, gapTol());
  return segs.concat(bridges).filter(s => Geo.dist(s.a, s.b) > Geo.eps);
}
function bridgeGaps(segs: Seg[], ends: { p: Pt; seg: number }[], tol: number): Seg[] {
  lastOpenEnds = [];
  if (!ends.length) return [];
  const cell = Math.max(tol, Geo.eps * 10), grid = new Map<string, number[]>(), big: number[] = [];
  const key = (i: number, j: number) => i + ',' + j;
  segs.forEach((s, idx) => {
    const i0 = Math.floor(Math.min(s.a.x, s.b.x) / cell), i1 = Math.floor(Math.max(s.a.x, s.b.x) / cell);
    const j0 = Math.floor(Math.min(s.a.y, s.b.y) / cell), j1 = Math.floor(Math.max(s.a.y, s.b.y) / cell);
    if ((i1 - i0 + 1) * (j1 - j0 + 1) > 400) { big.push(idx); return; }
    for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) (grid.get(key(i, j)) || grid.set(key(i, j), []).get(key(i, j))).push(idx);
  });
  const out: Seg[] = [];
  for (const e of ends) {
    const ci = Math.floor(e.p.x / cell), cj = Math.floor(e.p.y / cell), cand = new Set(big);
    for (let i = ci - 1; i <= ci + 1; i++) for (let j = cj - 1; j <= cj + 1; j++) for (const idx of grid.get(key(i, j)) || []) cand.add(idx);
    let touching = false, best: Pt | null = null, bd = tol;
    for (const idx of cand) {
      if (idx === e.seg) continue;
      const s = segs[idx], pr = Geo.project(e.p, s.a, s.b), d = Geo.dist(e.p, pr);
      if (d < Geo.eps) { touching = true; break; }
      if (d < bd) { bd = d; best = pr; }
    }
    if (touching) continue;
    if (best) out.push({ a: e.p, b: { x: best.x, y: best.y } });
    else lastOpenEnds.push(e.p);
  }
  return out;
}
/** Briefly circles line ends that touch nothing, to show why an area isn't closed. */
export function showGaps(): number {
  flashG.innerHTML = '';
  const v = state.view, r = svg.getBoundingClientRect();
  const vis = lastOpenEnds.filter(p => p.x >= v.x && p.y >= v.y && p.x <= v.x + r.width / v.s && p.y <= v.y + r.height / v.s);
  for (const p of vis.slice(0, 300)) mk('circle', { cx: p.x, cy: p.y, r: px(9), class: 'gap-mark' }, flashG);
  setTimeout(() => { flashG.innerHTML = ''; }, 3500);
  return vis.length;
}

// The closed areas only change when lines / shapes or page settings change: cache them until then.
let areaIndex: RegionIndex | null = null, areaKey = '';
const lineObserver = new MutationObserver(() => { areaIndex = null; });
lineObserver.observe(shapesG, { childList: true, subtree: true, attributes: true });
/** Geo.regionIndex of the current drawing (cached). */
export function regionIndex(): RegionIndex {
  const d = state.doc, key = [state.border, gapTol(), d.x, d.y, d.w, d.h].join();
  if (lineObserver.takeRecords().length || key !== areaKey) areaIndex = null;
  if (!areaIndex) { areaIndex = Geo.regionIndex(boundarySegments()); areaKey = key; }
  return areaIndex;
}

// ---- painted areas -----------------------------------------------------------------------------
export function ringsToD(rings: Pt[][]): string {
  return rings.map(r => 'M' + r.map(p => fmt(p.x) + ' ' + fmt(p.y)).join('L') + 'Z').join('');
}
const nearArea = (a: number, b: number) => Math.abs(a - b) <= Math.max(Math.abs(a), Math.abs(b)) * 0.003 + Geo.eps;
function createFill(region: Region, color: string, cover: Element | undefined): Element {
  const d = state.doc;
  const path = mk('path', {
    class: 'mz-fill', d: ringsToD([region.outer, ...region.holes]), 'fill-rule': 'evenodd',
    'stroke-width': fmt(Math.max(d.w, d.h) * 0.0005), 'stroke-linejoin': 'round', 'data-area': fmt(region.area),
  });
  if (cover) {
    // the area lies inside a shape that has its own fill → it must sit above that shape
    cover.after(path);
    const m = elMatrix(cover.parentNode);
    if (!m.isIdentity) path.setAttribute('transform', m.inverse().toString());
  } else {
    // bigger areas go below smaller ones, so areas inside areas stay visible (kept sorted: binary search)
    const kids = fillsG.children as HTMLCollectionOf<SVGElement>;
    let lo = 0, hi = kids.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (+kids[mid].dataset.area >= region.area) lo = mid + 1; else hi = mid;
    }
    fillsG.insertBefore(path, kids[lo] || null);
  }
  paintFill(path, color);
  return path;
}
export interface PaintCtx { ix: RegionIndex; done?: Set<Face>; found?: boolean; changed?: boolean }
export const paintCtx = (): PaintCtx => ({ ix: regionIndex() });
/**
 * Paints the closed area around p. ctx.ix is a Geo.regionIndex of the current lines (reused while
 * dragging). Does not commit. Returns { found, changed }.
 */
export function bucketAt(p: Pt, color: string | null, ctx: PaintCtx, face?: Face | null): { found: boolean; changed: boolean } {
  const f = face || ctx.ix.locate(p), region = f ? ctx.ix.region(f) : null;
  const near = shapesAt(p), shapesTop = near.filter(e => !isFill(e));
  const fillsAt = near.filter(e => isFill(e) && insideEl(e, p)) as SVGElement[];
  const paint = (el: Element) => {
    if (!color && isFill(el)) { el.remove(); return true; }
    if (fillOf(el) === color) return false;
    paintFill(el, color);
    return true;
  };
  if (region) {
    const same = fillsAt.find(fl => nearArea(+fl.dataset.area, region.area));
    if (same) return { found: true, changed: paint(same) };
    // the area is exactly one closed shape → color the shape itself
    const shape = shapesTop.find(e => geomOf(e).polys.some(pl => pl.closed && Geo.pointInPolygon(p, pl.pts) && nearArea(Math.abs(Geo.polygonArea(pl.pts)), region.area)));
    if (shape) return { found: true, changed: paint(shape) };
    // fills left from an earlier, finer layout of lines would hide the new one
    const stale = fillsAt.filter(fl => +fl.dataset.area < region.area);
    stale.forEach(fl => fl.remove());
    if (!color) return { found: true, changed: stale.length > 0 };
    createFill(region, color, shapesTop.find(e => hasFill(e) && insideEl(e, p)));
    return { found: true, changed: true };
  }
  const shape = shapesTop.find(e => insideEl(e, p));
  if (shape) return { found: true, changed: paint(shape) };
  if (fillsAt[0]) return { found: true, changed: paint(fillsAt[0]) };
  return { found: false, changed: false };
}

/** Up to ~max points spread over a bbox that pass `inside`. */
export function gridSample(bb: Bounds, inside: (p: Pt) => boolean, max: number): Pt[] {
  for (const n of [8, 20, 48]) {
    const pts: Pt[] = [];
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const p = { x: bb.x0 + (bb.x1 - bb.x0) * (i + 0.5) / n, y: bb.y0 + (bb.y1 - bb.y0) * (j + 0.5) / n };
      if (inside(p)) pts.push(p);
    }
    if (pts.length >= 6 || n === 48) {
      const step = Math.max(1, Math.floor(pts.length / max));
      return pts.filter((_, k) => k % step === 0);
    }
  }
  return [];
}
export const insideRegion = (r: Region, p: Pt): boolean => Geo.pointInPolygon(p, r.outer) && !r.holes.some(h => Geo.pointInPolygon(p, h));
function setFillRegion(el: Element, region: Region): void {
  const m = elMatrix(el);
  const map = m.isIdentity ? (r: Pt[]) => r : ((inv: DOMMatrix) => (r: Pt[]) => r.map(p => applyM(inv, p)))(m.inverse());
  el.setAttribute('d', ringsToD([region.outer, ...region.holes].map(map)));
  el.setAttribute('data-area', fmt(region.area));
  invalidate(el);
}
/**
 * After lines change, every painted area re-finds its region: points sampled inside its old
 * shape vote for the area they now fall in. Split areas keep the color in every piece, merged
 * areas keep the color of the bigger one, and areas that no longer close are removed.
 */
function reflowFills(): void {
  const fills = [...docG.querySelectorAll('path.mz-fill')] as SVGElement[];
  if (!fills.length) return;
  touch();
  const ix = regionIndex(), tol = Geo.eps * 10;
  type Item = { el: SVGElement; inside: (p: Pt) => boolean; votes: Map<Face, number>; area: number; bbox: Bounds; n: number };
  const owner = new Map<Face, Item | null>(), placed = new Set<Item>(), items: Item[] = [];
  const sameBox = (a: Bounds, b: Bounds) => Math.abs(a.x0 - b.x0) < tol && Math.abs(a.y0 - b.y0) < tol && Math.abs(a.x1 - b.x1) < tol && Math.abs(a.y1 - b.y1) < tol;
  for (const el of fills) {
    const g = geomOf(el), rings = g.polys.filter(p => p.closed).map(p => p.pts);
    const inside = (p: Pt) => rings.reduce((n, r) => n + (Geo.pointInPolygon(p, r) ? 1 : 0), 0) % 2 === 1;
    const area = Math.abs(+el.dataset.area) || rings.reduce((s, r) => s + Math.abs(Geo.polygonArea(r)), 0);
    // most areas are untouched by an edit: they still match a region exactly and are left alone
    const probe = gridSample(g.bbox, inside, 1)[0], pf = probe && ix.locate(probe);
    if (pf && !owner.has(pf) && nearArea(ix.region(pf).area, area) && sameBox(pf.bb, g.bbox)) {
      owner.set(pf, null);
      continue;
    }
    const samples = gridSample(g.bbox, inside, 64), votes = new Map<Face, number>();
    for (const p of samples) {
      const f = ix.locate(p);
      if (f) votes.set(f, (votes.get(f) || 0) + 1);
    }
    items.push({ el, inside, votes, area, bbox: g.bbox, n: samples.length || 1 });
  }
  if (!items.length) return;
  // match changed areas to regions by best overlap (intersection over union), greedily,
  // so an area that loses its first choice falls back to the next best region
  const pairs: { it: Item; f: Face; score: number }[] = [];
  for (const it of items) for (const [f, v] of it.votes) {
    const ov = it.area * v / it.n, fa = ix.region(f).area;
    pairs.push({ it, f, score: ov / (it.area + fa - ov) });
  }
  pairs.sort((a, b) => b.score - a.score || b.it.area - a.it.area);
  for (const { it, f } of pairs) {
    if (placed.has(it) || owner.has(f)) continue;
    owner.set(f, it);
    placed.add(it);
    setFillRegion(it.el, ix.region(f));
  }
  for (const it of items) if (!placed.has(it)) it.el.remove();
  // a line drawn through a painted area: pieces lying within the old area keep its color
  for (const it of items) {
    if (!it.el.isConnected) continue;
    // every region within the old area's bounds is a candidate (samples may miss small pieces)
    for (const f of ix.within(it.bbox)) {
      if (owner.has(f)) continue;
      const reg = ix.region(f);
      const pts = gridSample(reg.bb, (p) => insideRegion(reg, p), 40);
      if (!pts.length || pts.filter(it.inside).length < pts.length * 0.85) continue;
      owner.set(f, it);
      const c = it.el.cloneNode(false) as Element;
      it.el.after(c);
      setFillRegion(c, reg);
    }
  }
  ([...fillsG.children] as SVGElement[]).sort((a, b) => (+b.dataset.area || 0) - (+a.dataset.area || 0)).forEach(c => fillsG.appendChild(c));
}
/** Commit for edits that change lines: painted areas are updated in the same undo step. */
export function commitGeometry(): void {
  reflowFills();
  commit();
}
/** Edits that touched only painted areas leave the others alone. */
export function commitFor(els: Iterable<Element>): void {
  if ([...els].every(isFill)) commit(); else commitGeometry();
}

/** Picks the color under p as the fill color. */
export function eyedrop(p: Pt): void {
  for (const t of shapesAt(p)) {
    if (!insideEl(t, p)) continue;
    const c = fillOf(t);
    if (c) {
      setFill(c, false);
      toast(`Picked ${c}${state.palette.includes(c) ? '' : ' (not in the palette – add it with “From drawing”)'}`);
      return;
    }
  }
  toast('No painted area under the cursor.');
}
/** Colors of the painted areas touching a region (looked up just outside each of its edges). */
export function neighbourColors(reg: Region): Set<string> {
  const out = new Set<string>(), d = Geo.eps * 50;
  for (const r of [reg.outer, ...reg.holes]) for (let i = 0, n = r.length; i < n; i++) {
    const a = r[i], b = r[(i + 1) % n], len = Geo.dist(a, b);
    if (len < d * 4) continue;
    const m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, nx = -(b.y - a.y) / len, ny = (b.x - a.x) / len;
    for (const s of [1, -1]) {
      const p = { x: m.x + nx * d * s, y: m.y + ny * d * s };
      if (insideRegion(reg, p)) continue;
      const c = paintedColorAt(p);
      if (c) out.add(c);
    }
  }
  return out;
}
