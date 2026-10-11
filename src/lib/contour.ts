/* Rows of tiles that follow an outline ("opus vermiculatum"). Pure geometry.
   1. a distance field: how far each point inside the area is from its outline,
   2. the row lines: curves at 1, 2, 3… row widths from the outline (marching squares),
   3. cuts across each row, one tile length apart, from one row line to the next. */
import * as Geo from './geometry.ts';
import type { Pt, Seg } from './geometry.ts';

const INF = 1e20;

/** 1 for grid cells (centers) inside the rings (even-odd), by scanlines. */
export function insideMask(rings: Pt[][], x0: number, y0: number, h: number, nx: number, ny: number): Uint8Array {
  const m = new Uint8Array(nx * ny);
  for (let j = 0; j < ny; j++) {
    const y = y0 + (j + 0.5) * h, xs: number[] = [];
    for (const r of rings) for (let i = 0, n = r.length; i < n; i++) {
      const a = r[i], b = r[(i + 1) % n];
      if ((a.y > y) !== (b.y > y)) xs.push(a.x + (y - a.y) * (b.x - a.x) / (b.y - a.y));
    }
    xs.sort((p, q) => p - q);
    for (let k = 0; k + 1 < xs.length; k += 2) {
      const i0 = Math.max(0, Math.ceil((xs[k] - x0) / h - 0.5)), i1 = Math.min(nx - 1, Math.floor((xs[k + 1] - x0) / h - 0.5));
      for (let i = i0; i <= i1; i++) m[j * nx + i] = 1;
    }
  }
  return m;
}

/** Exact squared distance transform along one line (Felzenszwalb & Huttenlocher). */
function edt1d(f: Float64Array, n: number, d: Float64Array, v: Int32Array, z: Float64Array): void {
  let k = 0;
  v[0] = 0; z[0] = -INF; z[1] = INF;
  for (let q = 1; q < n; q++) {
    let s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
    while (s <= z[k]) { k--; s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]); }
    k++; v[k] = q; z[k] = s; z[k + 1] = INF;
  }
  k = 0;
  for (let q = 0; q < n; q++) {
    while (z[k + 1] < q) k++;
    d[q] = (q - v[k]) * (q - v[k]) + f[v[k]];
  }
}

/** Distance (in cells) from every inside cell to the nearest outside cell. */
export function distanceField(mask: Uint8Array, nx: number, ny: number): Float64Array {
  const g = new Float64Array(nx * ny), n = Math.max(nx, ny);
  const f = new Float64Array(n), d = new Float64Array(n), v = new Int32Array(n), z = new Float64Array(n + 1);
  for (let i = 0; i < nx * ny; i++) g[i] = mask[i] ? INF : 0;
  for (let x = 0; x < nx; x++) {
    for (let y = 0; y < ny; y++) f[y] = g[y * nx + x];
    edt1d(f, ny, d, v, z);
    for (let y = 0; y < ny; y++) g[y * nx + x] = d[y];
  }
  for (let y = 0; y < ny; y++) {
    for (let x = 0; x < nx; x++) f[x] = g[y * nx + x];
    edt1d(f, nx, d, v, z);
    for (let x = 0; x < nx; x++) g[y * nx + x] = Math.sqrt(d[x]);
  }
  return g;
}

// marching squares: corners tl=8 tr=4 br=2 bl=1; edges top=0 right=1 bottom=2 left=3
const CASES: Record<number, [number, number][]> = {
  1: [[3, 2]], 2: [[2, 1]], 3: [[3, 1]], 4: [[0, 1]], 6: [[0, 2]], 7: [[3, 0]], 8: [[3, 0]],
  9: [[0, 2]], 11: [[0, 1]], 12: [[3, 1]], 13: [[2, 1]], 14: [[3, 2]],
};

/** Closed curves where the field equals level, as point lists (grid cell units). */
export function isolines(val: ArrayLike<number>, nx: number, ny: number, level: number): Pt[][] {
  const pt = new Map<string, Pt>(), link = new Map<string, string[]>();
  const at = (i: number, j: number) => val[j * nx + i];
  const edgeKey = (i: number, j: number, e: number) => (e === 0 ? `h${i},${j}` : e === 2 ? `h${i},${j + 1}` : e === 3 ? `v${i},${j}` : `v${i + 1},${j}`);
  const edgePoint = (i: number, j: number, e: number): Pt => {
    const [ax, ay, bx, by] = e === 0 ? [i, j, i + 1, j] : e === 1 ? [i + 1, j, i + 1, j + 1] : e === 2 ? [i, j + 1, i + 1, j + 1] : [i, j, i, j + 1];
    const va = at(ax, ay), vb = at(bx, by), t = (level - va) / (vb - va);
    return { x: ax + (bx - ax) * t, y: ay + (by - ay) * t };
  };
  const add = (k1: string, k2: string) => {
    (link.get(k1) || link.set(k1, []).get(k1)!).push(k2);
    (link.get(k2) || link.set(k2, []).get(k2)!).push(k1);
  };
  for (let j = 0; j < ny - 1; j++) for (let i = 0; i < nx - 1; i++) {
    const a = at(i, j), b = at(i + 1, j), c = at(i + 1, j + 1), d = at(i, j + 1);
    const idx = (a >= level ? 8 : 0) | (b >= level ? 4 : 0) | (c >= level ? 2 : 0) | (d >= level ? 1 : 0);
    if (idx === 0 || idx === 15) continue;
    let segs = CASES[idx];
    if (idx === 5 || idx === 10) {
      const high = (a + b + c + d) / 4 >= level;
      segs = idx === 5 ? (high ? [[3, 0], [2, 1]] : [[3, 2], [0, 1]]) : (high ? [[0, 1], [3, 2]] : [[3, 0], [2, 1]]);
    }
    for (const [e1, e2] of segs) {
      const k1 = edgeKey(i, j, e1), k2 = edgeKey(i, j, e2);
      if (!pt.has(k1)) pt.set(k1, edgePoint(i, j, e1));
      if (!pt.has(k2)) pt.set(k2, edgePoint(i, j, e2));
      add(k1, k2);
    }
  }
  const used = new Set<string>(), loops: Pt[][] = [];
  for (const start of link.keys()) {
    if (used.has(start)) continue;
    const loop: Pt[] = [];
    let prev: string | null = null, cur: string | undefined = start;
    while (cur && !used.has(cur)) {
      used.add(cur);
      loop.push(pt.get(cur)!);
      const next = (link.get(cur) || []).find(k => k !== prev && !used.has(k));
      prev = cur;
      cur = next;
    }
    if (loop.length >= 3) loops.push(loop);
  }
  return loops;
}

/** Douglas–Peucker simplification of a closed loop. */
export function simplify(loop: Pt[], tol: number): Pt[] {
  if (loop.length < 8) return loop;
  const rdp = (pts: Pt[]): Pt[] => {
    if (pts.length < 3) return pts;
    const a = pts[0], b = pts[pts.length - 1];
    let best = -1, bd = tol;
    for (let i = 1; i < pts.length - 1; i++) {
      const d = Geo.dist(pts[i], Geo.project(pts[i], a, b));
      if (d > bd) { bd = d; best = i; }
    }
    if (best < 0) return [a, b];
    return [...rdp(pts.slice(0, best + 1)).slice(0, -1), ...rdp(pts.slice(best))];
  };
  // split at the point farthest from the first one, simplify both halves
  let far = 0;
  loop.forEach((p, i) => { if (Geo.dist(p, loop[0]) > Geo.dist(loop[far], loop[0])) far = i; });
  const one = rdp(loop.slice(0, far + 1)), two = rdp([...loop.slice(far), loop[0]]);
  return [...one.slice(0, -1), ...two.slice(0, -1)];
}

const perimeter = (loop: Pt[]) => loop.reduce((s, p, i) => s + Geo.dist(p, loop[(i + 1) % loop.length]), 0);

/** Points along a closed loop, evenly spaced about `len` apart (so the loop splits into whole tiles). */
function along(loop: Pt[], len: number): Pt[] {
  const total = perimeter(loop), n = Math.max(3, Math.round(total / len)), step = total / n, out: Pt[] = [];
  let i = 0, acc = 0, target = step / 2;
  while (out.length < n && i < loop.length) {
    const a = loop[i], b = loop[(i + 1) % loop.length], s = Geo.dist(a, b);
    if (acc + s >= target) {
      const t = (target - acc) / s;
      out.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
      target += step;
    } else { acc += s; i++; }
  }
  return out;
}

/**
 * Rows following the outline of an area.
 * rings: [outer, ...holes]; width: row width; length: tile length; rows: max number of rows (0 = as many as fit).
 * Returns the row lines and the cuts between tiles.
 */
export function build({ rings, width, length = width, rows = 0 }: { rings: Pt[][]; width: number; length?: number; rows?: number }): { loops: Pt[][]; cuts: Seg[] } {
  const bb = Geo.bounds(rings[0]);
  const span = Math.max(bb.x1 - bb.x0, bb.y1 - bb.y0);
  const h = Math.max(width / 6, span / 700);              // grid resolution
  const pad = 2, x0 = bb.x0 - pad * h, y0 = bb.y0 - pad * h;
  const nx = Math.ceil((bb.x1 - bb.x0) / h) + 2 * pad, ny = Math.ceil((bb.y1 - bb.y0) / h) + 2 * pad;
  const mask = insideMask(rings, x0, y0, h, nx, ny);
  const field = distanceField(mask, nx, ny);
  // cell centers are half a cell inside the outline at their nearest outside neighbour
  for (let i = 0; i < field.length; i++) if (mask[i]) field[i] = (field[i] - 0.5) * h;
  let max = 0;
  for (const v of field) if (v > max) max = v;
  let levels = Math.floor(max / width - 0.25);
  if (rows > 0) levels = Math.min(levels, rows);
  const toDoc = (p: Pt): Pt => ({ x: x0 + (p.x + 0.5) * h, y: y0 + (p.y + 0.5) * h });

  const levelLoops: Pt[][][] = [rings];
  for (let k = 1; k <= levels; k++) {
    const loops = isolines(field, nx, ny, k * width)
      .map(l => simplify(l.map(toDoc), h * 0.35))
      .filter(l => l.length >= 3 && perimeter(l) > width * 1.5);
    if (!loops.length) break;
    levelLoops.push(loops);
  }

  // cut each row: from points along its outer line to the nearest point of its inner line
  const cuts: Seg[] = [];
  for (let k = 1; k < levelLoops.length; k++) {
    const inner = levelLoops[k], segs: [Pt, Pt][] = [];
    for (const l of inner) for (let i = 0; i < l.length; i++) segs.push([l[i], l[(i + 1) % l.length]]);
    const grid = new Geo.SpatialGrid<[Pt, Pt]>(width);
    for (const s of segs) grid.insert(s, Geo.bounds(s));
    for (const outer of levelLoops[k - 1]) {
      for (const p of along(outer, length)) {
        let best: Pt | null = null, bd = width * 1.6;
        for (const [a, b] of grid.query(p.x - bd, p.y - bd, p.x + bd, p.y + bd)) {
          const q = Geo.project(p, a, b), d = Geo.dist(p, q);
          if (d < bd) { bd = d; best = { x: q.x, y: q.y }; }
        }
        if (best && bd > width * 0.3) cuts.push({ a: p, b: best });
      }
    }
  }
  return { loops: levelLoops.slice(1).flat(), cuts };
}
