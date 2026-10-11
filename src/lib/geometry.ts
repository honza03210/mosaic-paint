/* Geometry: points, segments, polygons and the closed areas that lines form. Pure math, no DOM. */

export interface Pt { x: number; y: number }
export interface Seg { a: Pt; b: Pt }
export interface Bounds { x0: number; y0: number; x1: number; y1: number }
export interface Face { pts: Pt[]; area: number; comp: number; bb?: Bounds }
/** A closed area: its outline, the islands cut out of it, and its net area. */
export interface Region { outer: Pt[]; holes: Pt[][]; area: number; bb: Bounds }
export interface RegionIndex {
  locate(p: Pt): Face | null;
  region(f: Face): Region;
  faces: Face[];
  within(b: Bounds): Face[];
}

/** Two points closer than this are treated as the same point (set from the page size). */
export let eps = 0.01;
export function setEps(v: number): void { eps = v; }

export const dist = (a: Pt, b: Pt): number => Math.hypot(a.x - b.x, a.y - b.y);
const cross = (ax: number, ay: number, bx: number, by: number): number => ax * by - ay * bx;

/** Closest point to p on segment a-b (t = 0…1 along the segment). */
export function project(p: Pt, a: Pt, b: Pt): Pt & { t: number } {
  const dx = b.x - a.x, dy = b.y - a.y;
  const len2 = dx * dx + dy * dy;
  let t = len2 ? ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2 : 0;
  t = Math.max(0, Math.min(1, t));
  return { x: a.x + dx * t, y: a.y + dy * t, t };
}

/** Intersection of segments a-b and c-d, or null. t/u are the positions along each. */
export function segIntersect(a: Pt, b: Pt, c: Pt, d: Pt): (Pt & { t: number; u: number }) | null {
  const rx = b.x - a.x, ry = b.y - a.y, sx = d.x - c.x, sy = d.y - c.y;
  const den = cross(rx, ry, sx, sy);
  if (Math.abs(den) < 1e-12) return null;
  const qx = c.x - a.x, qy = c.y - a.y;
  const t = cross(qx, qy, sx, sy) / den;
  const u = cross(qx, qy, rx, ry) / den;
  if (t < 0 || t > 1 || u < 0 || u > 1) return null;
  return { x: a.x + rx * t, y: a.y + ry * t, t, u };
}

export function polygonArea(pts: Pt[]): number {
  let s = 0;
  for (let i = 0, n = pts.length; i < n; i++) {
    const p = pts[i], q = pts[(i + 1) % n];
    s += p.x * q.y - q.x * p.y;
  }
  return s / 2;
}

export function pointInPolygon(p: Pt, pts: Pt[]): boolean {
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const a = pts[i], b = pts[j];
    if ((a.y > p.y) !== (b.y > p.y) && p.x < (b.x - a.x) * (p.y - a.y) / (b.y - a.y) + a.x) inside = !inside;
  }
  return inside;
}

/** Vertices of a regular n-gon; rot (radians) is the angle of the first vertex. */
export function regularPolygon(n: number, cx: number, cy: number, r: number, rot: number): Pt[] {
  const out: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const a = rot + i * 2 * Math.PI / n;
    out.push({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) });
  }
  return out;
}

export function bounds(pts: Pt[]): Bounds {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const q of pts) {
    if (q.x < x0) x0 = q.x; if (q.x > x1) x1 = q.x;
    if (q.y < y0) y0 = q.y; if (q.y > y1) y1 = q.y;
  }
  return { x0, y0, x1, y1 };
}

/** Buckets items by their bounding boxes so lookups only look at what's nearby. */
export class SpatialGrid<T> {
  cell: number;
  map = new Map<string, T[]>();
  big: T[] = [];
  constructor(cell: number) { this.cell = cell > 0 ? cell : 1; }
  insert(item: T, b: Bounds): void {
    const c = this.cell, i0 = Math.floor(b.x0 / c), i1 = Math.floor(b.x1 / c), j0 = Math.floor(b.y0 / c), j1 = Math.floor(b.y1 / c);
    if (!Number.isFinite(i0 + i1 + j0 + j1) || (i1 - i0 + 1) * (j1 - j0 + 1) > 4096) { this.big.push(item); return; }
    for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) {
      const k = i + ',' + j, list = this.map.get(k);
      if (list) list.push(item); else this.map.set(k, [item]);
    }
  }
  /** Items whose cells touch the box (a superset: callers still check exact bounds). */
  query(x0: number, y0: number, x1: number, y1: number): Set<T> {
    const c = this.cell, out = new Set<T>(this.big);
    const i0 = Math.floor(x0 / c), i1 = Math.floor(x1 / c), j0 = Math.floor(y0 / c), j1 = Math.floor(y1 / c);
    if ((i1 - i0 + 1) * (j1 - j0 + 1) > 1e5) { for (const list of this.map.values()) for (const it of list) out.add(it); return out; }
    for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) {
      const list = this.map.get(i + ',' + j);
      if (list) for (const it of list) out.add(it);
    }
    return out;
  }
}

/**
 * Turns a soup of segments into the faces of the planar arrangement they form.
 * Segments are split at every crossing / T-junction, dangling ends are dropped, and every
 * directed edge is walked once. Bounded faces come out with positive area; the outer
 * boundary of each connected component comes out negative.
 */
export function planarFaces(segs: Seg[]): Face[] {
  const n = segs.length;
  const splits = segs.map(s => [{ t: 0, p: s.a }, { t: 1, p: s.b }]);
  const bb = segs.map(s => ({
    x0: Math.min(s.a.x, s.b.x) - eps, x1: Math.max(s.a.x, s.b.x) + eps,
    y0: Math.min(s.a.y, s.b.y) - eps, y1: Math.max(s.a.y, s.b.y) + eps,
  }));
  const order = segs.map((_, i) => i).sort((i, j) => bb[i].x0 - bb[j].x0);
  const touch = (A: Seg, B: Seg, list: { t: number; p: Pt }[]) => {
    for (const q of [B.a, B.b]) {
      const pr = project(q, A.a, A.b);
      if (pr.t > 0 && pr.t < 1 && dist(pr, q) < eps) list.push({ t: pr.t, p: q });
    }
  };
  for (let oi = 0; oi < n; oi++) {
    const i = order[oi], bi = bb[i], A = segs[i];
    for (let oj = oi + 1; oj < n; oj++) {
      const j = order[oj], bj = bb[j];
      if (bj.x0 > bi.x1) break;
      if (bj.y0 > bi.y1 || bj.y1 < bi.y0) continue;
      const B = segs[j];
      touch(A, B, splits[i]);
      touch(B, A, splits[j]);
      const x = segIntersect(A.a, A.b, B.a, B.b);
      if (x) {
        const p = { x: x.x, y: x.y };
        if (x.t > 0 && x.t < 1) splits[i].push({ t: x.t, p });
        if (x.u > 0 && x.u < 1) splits[j].push({ t: x.u, p });
      }
    }
  }

  // merge nearby points into shared vertices
  const verts: Pt[] = [], grid = new Map<string, number[]>();
  const vid = (p: Pt): number => {
    const gx = Math.floor(p.x / eps), gy = Math.floor(p.y / eps);
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
      const cell = grid.get((gx + dx) + ',' + (gy + dy));
      if (cell) for (const id of cell) if (dist(verts[id], p) < eps) return id;
    }
    const id = verts.length;
    verts.push({ x: p.x, y: p.y });
    const k = gx + ',' + gy;
    (grid.get(k) || grid.set(k, []).get(k)!).push(id);
    return id;
  };
  const adj = new Map<number, Set<number>>();
  const link = (u: number, v: number) => {
    if (u === v) return;
    (adj.get(u) || adj.set(u, new Set()).get(u)!).add(v);
    (adj.get(v) || adj.set(v, new Set()).get(v)!).add(u);
  };
  for (const list of splits) {
    list.sort((a, b) => a.t - b.t);
    let prev = -1;
    for (const s of list) {
      const id = vid(s.p);
      if (prev >= 0) link(prev, id);
      prev = id;
    }
  }

  // dangling edges can't bound an area
  const stack = [...adj.keys()].filter(k => adj.get(k)!.size < 2);
  while (stack.length) {
    const k = stack.pop()!, s = adj.get(k);
    if (!s || s.size >= 2) continue;
    for (const m of s) {
      const ms = adj.get(m)!;
      ms.delete(k);
      if (ms.size < 2) stack.push(m);
    }
    adj.delete(k);
  }

  // connected components (union-find)
  const parent = new Map<number, number>();
  const find = (x: number): number => {
    while (parent.get(x) !== x) { parent.set(x, parent.get(parent.get(x)!)!); x = parent.get(x)!; }
    return x;
  };
  for (const k of adj.keys()) parent.set(k, k);
  for (const [u, s] of adj) for (const v of s) {
    const a = find(u), b = find(v);
    if (a !== b) parent.set(a, b);
  }

  const nbr = new Map<number, number[]>();
  for (const [k, s] of adj) {
    const o = verts[k];
    const ang = (id: number) => Math.atan2(verts[id].y - o.y, verts[id].x - o.x);
    nbr.set(k, [...s].sort((a, b) => ang(a) - ang(b)));
  }

  // walk each directed edge once, always taking the sharpest turn: one walk = one face
  const seen = new Set<string>(), faces: Face[] = [];
  for (const [u, list] of nbr) for (const v of list) {
    if (seen.has(u + '>' + v)) continue;
    const pts: Pt[] = [];
    let a = u, b = v, guard = 0;
    do {
      seen.add(a + '>' + b);
      pts.push(verts[a]);
      const l = nbr.get(b)!;
      const c = l[(l.indexOf(a) - 1 + l.length) % l.length];
      a = b; b = c;
    } while ((a !== u || b !== v) && ++guard < 1e6);
    faces.push({ pts, area: polygonArea(pts), comp: find(u) });
  }
  return faces;
}

/** Computes the faces once, then answers many "which area is this point in?" queries. */
export function regionIndex(segs: Seg[]): RegionIndex {
  const faces = planarFaces(segs);
  for (const f of faces) f.bb = bounds(f.pts);
  const inner = faces.filter(f => f.area > 0), outer = faces.filter(f => f.area < 0);
  const all = bounds(inner.flatMap(f => [{ x: f.bb!.x0, y: f.bb!.y0 }, { x: f.bb!.x1, y: f.bb!.y1 }]));
  const grid = new SpatialGrid<Face>(Math.max(all.x1 - all.x0, all.y1 - all.y0) / Math.max(8, Math.sqrt(inner.length)));
  for (const f of inner) grid.insert(f, f.bb!);
  const regions = new Map<Face, Region>();
  const locate = (p: Pt): Face | null => {
    let best: Face | null = null;
    for (const f of grid.query(p.x, p.y, p.x, p.y)) {
      const b = f.bb!;
      if (p.x < b.x0 || p.x > b.x1 || p.y < b.y0 || p.y > b.y1) continue;
      if ((!best || f.area < best.area) && pointInPolygon(p, f.pts)) best = f;
    }
    return best;
  };
  const region = (f: Face): Region => {
    const known = regions.get(f);
    if (known) return known;
    const cands = outer.filter(h => h.comp !== f.comp && pointInPolygon(h.pts[0], f.pts));
    const holes = cands.filter(h => !cands.some(o => o !== h && pointInPolygon(h.pts[0], o.pts)));
    const r = { outer: f.pts, holes: holes.map(h => h.pts), area: f.area + holes.reduce((s, h) => s + h.area, 0), bb: f.bb! };
    regions.set(f, r);
    return r;
  };
  /** Bounded faces whose bounding box overlaps b. */
  const within = (b: Bounds) => [...grid.query(b.x0, b.y0, b.x1, b.y1)].filter(f => f.bb!.x1 >= b.x0 && f.bb!.x0 <= b.x1 && f.bb!.y1 >= b.y0 && f.bb!.y0 <= b.y1);
  return { locate, region, faces: inner, within };
}

/**
 * The smallest closed area around p bounded by the segments, with islands
 * (separate groups of lines fully inside it) cut out as holes.
 */
export function findRegion(segs: Seg[], p: Pt): Region | null {
  const ix = regionIndex(segs), f = ix.locate(p);
  return f ? ix.region(f) : null;
}

/** Parts of segment a-b for which keep(midpoint) holds, split where it crosses the rings. */
export function clipSegment(a: Pt, b: Pt, rings: Pt[][], keep: (p: Pt) => boolean): Seg[] {
  const ts = [0, 1];
  for (const r of rings) for (let i = 0, n = r.length; i < n; i++) {
    const x = segIntersect(a, b, r[i], r[(i + 1) % n]);
    if (x) ts.push(x.t);
  }
  ts.sort((p, q) => p - q);
  const at = (t: number): Pt => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
  const out: Seg[] = [];
  let start: number | null = null, end = 0;
  for (let i = 0; i + 1 < ts.length; i++) {
    const t0 = ts[i], t1 = ts[i + 1];
    if (t1 - t0 < 1e-9) continue;
    if (keep(at((t0 + t1) / 2))) { if (start === null) start = t0; end = t1; }
    else if (start !== null) { out.push({ a: at(start), b: at(end) }); start = null; }
  }
  if (start !== null) out.push({ a: at(start), b: at(end) });
  return out;
}

export function distToRings(p: Pt, rings: Pt[][]): number {
  let d = Infinity;
  for (const r of rings) for (let i = 0, n = r.length; i < n; i++) d = Math.min(d, dist(p, project(p, r[i], r[(i + 1) % n])));
  return d;
}

/** The piece of the infinite line through p (direction dir) that stays inside the rings around p. */
export function chordThrough(p: Pt, dir: Pt, rings: Pt[][]): Seg | null {
  let tmin = -Infinity, tmax = Infinity;
  for (const r of rings) for (let i = 0, n = r.length; i < n; i++) {
    const a = r[i], b = r[(i + 1) % n], ex = b.x - a.x, ey = b.y - a.y;
    const den = cross(dir.x, dir.y, ex, ey);
    if (Math.abs(den) < 1e-12) continue;
    const qx = a.x - p.x, qy = a.y - p.y;
    const t = cross(qx, qy, ex, ey) / den, u = cross(qx, qy, dir.x, dir.y) / den;
    if (u < -1e-9 || u > 1 + 1e-9) continue;
    if (t > 1e-9 && t < tmax) tmax = t;
    if (t < -1e-9 && t > tmin) tmin = t;
  }
  if (!Number.isFinite(tmin) || !Number.isFinite(tmax)) return null;
  return { a: { x: p.x + dir.x * tmin, y: p.y + dir.y * tmin }, b: { x: p.x + dir.x * tmax, y: p.y + dir.y * tmax } };
}
