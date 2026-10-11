/* Tiling patterns clipped to an area. Pure geometry. */
import * as Geo from './geometry.ts';
import type { Pt, Seg, Bounds } from './geometry.ts';

export const TYPES: [string, string][] = [
  ['square', 'Squares'], ['brick', 'Bricks'], ['herringbone', 'Herringbone'],
  ['hex', 'Hexagons'], ['triangle', 'Triangles'], ['rings', 'Rings (around the click)'],
  ['rows', 'Rows following the outline'],
];
const rect = (x: number, y: number, w: number, h: number): Pt[] => [{ x, y }, { x: x + w, y }, { x: x + w, y: y + h }, { x, y: y + h }];
const odd = (j: number) => ((j % 2) + 2) % 2 === 1;
const range = (a0: number, a1: number, step: number) => [Math.floor(a0 / step) - 1, Math.ceil(a1 / step) + 1];

/** Tile polygons covering bounds b, in the pattern's own frame. s = short side / edge length. */
export function cells(type: string, s: number, b: Bounds): Pt[][] {
  const out: Pt[][] = [];
  if (type === 'square') {
    const [i0, i1] = range(b.x0, b.x1, s), [j0, j1] = range(b.y0, b.y1, s);
    for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) out.push(rect(i * s, j * s, s, s));
  } else if (type === 'brick') {
    const L = 2 * s, [j0, j1] = range(b.y0, b.y1, s);
    for (let j = j0; j <= j1; j++) {
      const off = odd(j) ? s : 0, [i0, i1] = range(b.x0 - off, b.x1 - off, L);
      for (let i = i0; i <= i1; i++) out.push(rect(off + i * L, j * s, L, s));
    }
  } else if (type === 'hex') {
    const w = Math.sqrt(3) * s, rh = 1.5 * s, [j0, j1] = range(b.y0, b.y1, rh);
    for (let j = j0; j <= j1; j++) {
      const off = odd(j) ? w / 2 : 0, [i0, i1] = range(b.x0 - off, b.x1 - off, w);
      for (let i = i0; i <= i1; i++) out.push(Geo.regularPolygon(6, off + i * w, j * rh, s, -Math.PI / 2));
    }
  } else if (type === 'triangle') {
    const h = s * Math.sqrt(3) / 2, [j0, j1] = range(b.y0, b.y1, h);
    for (let j = j0; j <= j1; j++) {
      const y = j * h, off = odd(j) ? s / 2 : 0, [i0, i1] = range(b.x0 - off, b.x1 - off, s);
      for (let i = i0; i <= i1; i++) {
        const x = off + i * s;
        out.push([{ x, y: y + h }, { x: x + s / 2, y }, { x: x + s, y: y + h }]);
        out.push([{ x: x + s / 2, y }, { x: x + 1.5 * s, y }, { x: x + s, y: y + h }]);
      }
    }
  } else if (type === 'herringbone') {
    // staircases of one vertical + one horizontal 1×2 brick, repeated along (1,-1)
    const cs = [[b.x0, b.y0], [b.x1, b.y0], [b.x0, b.y1], [b.x1, b.y1]].map(([x, y]) => [x / s, y / s]);
    const ks = cs.map(([u, v]) => (u + v) / 4), ms = cs.map(([u, v]) => (u - v) / 2);
    const k0 = Math.floor(Math.min(...ks)) - 2, k1 = Math.ceil(Math.max(...ks)) + 2;
    const m0 = Math.floor(Math.min(...ms)) - 2, m1 = Math.ceil(Math.max(...ms)) + 2;
    for (let k = k0; k <= k1; k++) for (let m = m0; m <= m1; m++) {
      out.push(rect((2 * k + m) * s, (2 * k - m) * s, s, 2 * s));
      out.push(rect((2 * k + 1 + m) * s, (2 * k + 1 - m) * s, 2 * s, s));
    }
  }
  return out;
}

/** Concentric rings of roughly square tiles around the frame origin. */
function ringEdges(s: number, b: Bounds): [Pt, Pt][] {
  const R = Math.max(...[[b.x0, b.y0], [b.x1, b.y0], [b.x0, b.y1], [b.x1, b.y1]].map(([x, y]) => Math.hypot(x, y)));
  const K = Math.ceil(R / s) + 1, angs: number[][] = [[]];
  for (let k = 1; k <= K; k++) {
    const m = Math.max(6, Math.round(2 * Math.PI * (k + 0.5)));
    angs.push(Array.from({ length: m }, (_, j) => j * 2 * Math.PI / m));
  }
  const at = (r: number, a: number): Pt => ({ x: r * Math.cos(a), y: r * Math.sin(a) });
  const edges: [Pt, Pt][] = [];
  for (let k = 1; k <= K; k++) {
    // the circle gets a corner wherever a tile edge of the ring inside or outside meets it
    const all = [...angs[k - 1], ...angs[k]].sort((x, y) => x - y);
    const u = all.filter((a, i) => i === 0 || a - all[i - 1] > 1e-9);
    for (let i = 0; i < u.length; i++) edges.push([at(k * s, u[i]), at(k * s, u[(i + 1) % u.length])]);
    if (k < K) for (const a of angs[k]) edges.push([at(k * s, a), at((k + 1) * s, a)]);
  }
  return edges;
}

/** Joins collinear pieces that touch or overlap, so a grid becomes a few long lines. */
export function mergeCollinear(segs: Seg[], tol: number): Seg[] {
  const groups = new Map<string, { dx: number; dy: number; off: number; list: [number, number][] }>();
  for (const s of segs) {
    let dx = s.b.x - s.a.x, dy = s.b.y - s.a.y;
    const L = Math.hypot(dx, dy);
    if (L < tol) continue;
    dx /= L; dy /= L;
    if (dx < -1e-9 || (Math.abs(dx) <= 1e-9 && dy < 0)) { dx = -dx; dy = -dy; }
    const off = -dy * s.a.x + dx * s.a.y;
    const key = Math.round(Math.atan2(dy, dx) * 1e6) + '|' + Math.round(off / (tol * 10));
    const t0 = dx * s.a.x + dy * s.a.y, t1 = dx * s.b.x + dy * s.b.y;
    (groups.get(key) || groups.set(key, { dx, dy, off, list: [] }).get(key)!).list.push([Math.min(t0, t1), Math.max(t0, t1)]);
  }
  const out: Seg[] = [];
  for (const g of groups.values()) {
    g.list.sort((a, b) => a[0] - b[0]);
    const pt = (t: number): Pt => ({ x: g.dx * t - g.dy * g.off, y: g.dy * t + g.dx * g.off });
    let [c0, c1] = g.list[0];
    for (let i = 1; i <= g.list.length; i++) {
      const iv = g.list[i];
      if (iv && iv[0] <= c1 + tol) { c1 = Math.max(c1, iv[1]); continue; }
      out.push({ a: pt(c0), b: pt(c1) });
      if (iv) [c0, c1] = iv;
    }
  }
  return out;
}

export interface BuildOptions {
  type: string; size: number; angle: number; origin: Pt;
  rings: Pt[][]; inside: (p: Pt) => boolean; eps: number;
}

/**
 * Line segments of a pattern inside an area.
 * rings: [outer, ...holes]; inside(p): is p in the area; origin/angle place the pattern.
 */
export function build({ type, size, angle, origin, rings, inside, eps }: BuildOptions): { segments?: Seg[]; error?: string; estimate?: number } {
  const s = size, a = (angle || 0) * Math.PI / 180, co = Math.cos(a), si = Math.sin(a);
  const toDoc = (p: Pt): Pt => ({ x: origin.x + p.x * co - p.y * si, y: origin.y + p.x * si + p.y * co });
  const toFrame = (p: Pt): Pt => { const dx = p.x - origin.x, dy = p.y - origin.y; return { x: dx * co + dy * si, y: -dx * si + dy * co }; };
  const rb = Geo.bounds(rings[0]);
  const fb = Geo.bounds([[rb.x0, rb.y0], [rb.x1, rb.y0], [rb.x0, rb.y1], [rb.x1, rb.y1]].map(([x, y]) => toFrame({ x, y })));
  const est = (fb.x1 - fb.x0) * (fb.y1 - fb.y0) / (s * s);
  if (!(s > 0) || est > 40000) return { error: 'tooMany', estimate: Math.round(est) };
  let edges: [Pt, Pt][] = [];
  if (type === 'rings') edges = ringEdges(s, fb);
  else for (const poly of cells(type, s, fb)) for (let i = 0; i < poly.length; i++) edges.push([poly[i], poly[(i + 1) % poly.length]]);
  // neighbouring tiles share edges: keep each once
  const q = s * 1e-6, key = (p: Pt) => Math.round(p.x / q) + ',' + Math.round(p.y / q), seen = new Set<string>();
  const pieces: Seg[] = [], tol = Math.max(eps, s * 1e-6);
  const keep = (p: Pt) => inside(p) && Geo.distToRings(p, rings) > eps * 20;
  for (const [p, r] of edges) {
    const k1 = key(p), k2 = key(r), k = k1 < k2 ? k1 + '|' + k2 : k2 + '|' + k1;
    if (k1 === k2 || seen.has(k)) continue;
    seen.add(k);
    const A = toDoc(p), B = toDoc(r);
    if (Math.max(A.x, B.x) < rb.x0 || Math.min(A.x, B.x) > rb.x1 || Math.max(A.y, B.y) < rb.y0 || Math.min(A.y, B.y) > rb.y1) continue;
    pieces.push(...Geo.clipSegment(A, B, rings, keep));
  }
  return { segments: mergeCollinear(pieces, tol) };
}
