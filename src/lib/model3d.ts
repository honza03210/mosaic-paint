/* A mosaic as a 3D model for printing with filament changes: every color is raised to its own height,
   so when the printer swaps filament at the right layers, each tile's top shows its color.

   Color i (in print order) reaches (base + (i + 1) × layersPerColor) layers; unpainted areas stay at the
   base. The model is one closed surface built from rectangles of equal height (found greedily). */

export interface PrintSettings {
  /** layer height, mm */
  layerHeight: number;
  /** layers of each color band */
  layersPerColor: number;
  /** layers of the base plate under everything (0: unpainted areas are left open) */
  baseLayers: number;
}
export interface Rect { x: number; y: number; w: number; h: number; level: number }
/** Triangles (indexes into vertices, counter-clockwise from outside) with the color band of each. */
export interface Mesh { vertices: number[]; triangles: number[]; levels: number[] }

/** Top of color level i (0 = printed first), in layers. */
export const topLayer = (i: number, s: PrintSettings): number => s.baseLayers + (i + 1) * s.layersPerColor;

/**
 * Covers the cells of each level with as few rectangles as possible (greedy: grow right, then down).
 * grid[y * w + x] = level, or -1 for no color.
 */
export function greedyRects(grid: Int16Array | number[], w: number, h: number): Rect[] {
  const done = new Uint8Array(w * h), out: Rect[] = [];
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x, lv = grid[i];
    if (lv < 0 || done[i]) continue;
    let rw = 1;
    while (x + rw < w && grid[i + rw] === lv && !done[i + rw]) rw++;
    let rh = 1;
    grow: while (y + rh < h) {
      const row = (y + rh) * w + x;
      for (let k = 0; k < rw; k++) if (grid[row + k] !== lv || done[row + k]) break grow;
      rh++;
    }
    for (let yy = y; yy < y + rh; yy++) done.fill(1, yy * w + x, yy * w + x + rw);
    out.push({ x, y, w: rw, h: rh, level: lv });
  }
  return out;
}

/** Height of every cell in layers: its color's band top, the base for unpainted cells (-1), 0 for nothing (-2). */
export function cellHeights(grid: Int16Array | number[], s: PrintSettings): Int16Array {
  const out = new Int16Array(grid.length);
  for (let i = 0; i < grid.length; i++) out[i] = grid[i] === -2 ? 0 : grid[i] < 0 ? s.baseLayers : topLayer(grid[i], s);
  return out;
}

/**
 * A solid made of grid columns: cell i holds material from layer bottom[i] up to layer top[i] (none where
 * top ≤ bottom), colored with band level[i]. This lets parts stand on others, pockets go into the bottom and
 * holes go through.
 */
export interface Solid { bottom: Int16Array; top: Int16Array; level: Int16Array }

/** The single-nozzle model as a solid: every cell from the floor up to its band (grid -2 = nothing there). */
export function heightSolid(grid: Int16Array | number[], s: PrintSettings): Solid {
  const n = grid.length, top = cellHeights(grid, s), level = new Int16Array(n);
  for (let i = 0; i < n; i++) level[i] = Math.max(0, grid[i]);
  return { bottom: new Int16Array(n), top, level };
}

/**
 * A solid as one closed surface (each edge shared by exactly two triangles): top faces (one per rectangle
 * of equal height), bottom faces, and walls only where neighbouring columns differ. Where a corner of one
 * face lies on the edge of another, that edge gets the corner as an extra vertex (no T-junctions); such
 * faces are split into a fan around their middle. cell: cell size in mm. The picture's y axis points down;
 * the model's points up.
 */
export function solidMesh(sol: Solid, w: number, h: number, cell: number, layerHeight: number): Mesh {
  // all coordinates are whole cells (x, y) and layers (z) until the end, so they compare exactly
  const inside = (x: number, y: number) => x >= 0 && y >= 0 && x < w && y < h;
  const bot = (x: number, y: number) => (inside(x, y) ? sol.bottom[y * w + x] : 0);
  const topOf = (x: number, y: number) => {
    if (!inside(x, y)) return 0;
    const i = y * w + x;
    return sol.top[i] > sol.bottom[i] ? sol.top[i] : sol.bottom[i];
  };
  const filled = (x: number, y: number) => topOf(x, y) > bot(x, y);
  const level = (x: number, y: number) => (inside(x, y) ? sol.level[y * w + x] : 0);
  // a face: corner o and two edge vectors u, v (u × v points outwards), the band it is colored with
  interface Face { o: number[]; u: number[]; v: number[]; level: number }
  const faces: Face[] = [];
  const Y = (y: number) => h - y; // picture row → model y

  // top and bottom faces: rectangles of equal height (and color) among the cells with material
  // each distinct (height, color) gets a small id for greedyRects
  const lv = new Int16Array(w * h);
  const rects = (heightAt: (x: number, y: number) => number) => {
    const ids = new Map<number, number>(), vals: number[] = [];
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const i = y * w + x;
      if (!filled(x, y)) { lv[i] = -1; continue; }
      const k = heightAt(x, y) * 4096 + level(x, y);
      let id = ids.get(k);
      if (id == null) { id = vals.length; ids.set(k, id); vals.push(k); }
      lv[i] = id;
    }
    return { rs: greedyRects(lv, w, h), vals };
  };
  {
    const { rs, vals } = rects(topOf);
    for (const r of rs) { const k = vals[r.level]; faces.push({ o: [r.x, Y(r.y + r.h), Math.floor(k / 4096)], u: [r.w, 0, 0], v: [0, r.h, 0], level: k % 4096 }); }
  }
  {
    const { rs, vals } = rects(bot);
    for (const r of rs) { const k = vals[r.level]; faces.push({ o: [r.x, Y(r.y + r.h), Math.floor(k / 4096)], u: [0, r.h, 0], v: [r.w, 0, 0], level: k % 4096 }); }
  }

  /** Where column A has material and column B does not: up to two z ranges. */
  const diff = (a0: number, a1: number, b0: number, b1: number): number[][] => {
    if (a1 <= a0) return [];
    if (b1 <= b0 || b1 <= a0 || b0 >= a1) return [[a0, a1]];
    const out: number[][] = [];
    if (b0 > a0) out.push([a0, b0]);
    if (b1 < a1) out.push([b1, a1]);
    return out;
  };
  const col = (x: number, y: number) => (filled(x, y) ? [bot(x, y), topOf(x, y)] : [0, 0]);
  // walls along the picture's rows: between row y-1 (north) and row y (south), at model y = h - y
  for (let y = 0; y <= h; y++) {
    for (let x = 0; x < w;) {
      const [n0, n1] = col(x, y - 1), [s0, s1] = col(x, y);
      if (n0 === s0 && n1 === s1) { x++; continue; }
      let x1 = x + 1;
      for (; x1 < w; x1++) {
        const [a0, a1] = col(x1, y - 1), [b0, b1] = col(x1, y);
        if (a0 !== n0 || a1 !== n1 || b0 !== s0 || b1 !== s1) break;
      }
      const Y0 = Y(y);
      // material on the north side faces south (-y), on the south side faces north (+y)
      for (const [z0, z1] of diff(n0, n1, s0, s1)) faces.push({ o: [x, Y0, z0], u: [x1 - x, 0, 0], v: [0, 0, z1 - z0], level: level(x, y - 1) });
      for (const [z0, z1] of diff(s0, s1, n0, n1)) faces.push({ o: [x, Y0, z0], u: [0, 0, z1 - z0], v: [x1 - x, 0, 0], level: level(x, y) });
      x = x1;
    }
  }
  // walls along the columns: between column x-1 (west) and column x (east)
  for (let x = 0; x <= w; x++) {
    for (let y = h - 1; y >= 0;) {
      const [w0, w1] = col(x - 1, y), [e0, e1] = col(x, y);
      if (w0 === e0 && w1 === e1) { y--; continue; }
      let y1 = y - 1;
      for (; y1 >= 0; y1--) {
        const [a0, a1] = col(x - 1, y1), [b0, b1] = col(x, y1);
        if (a0 !== w0 || a1 !== w1 || b0 !== e0 || b1 !== e1) break;
      }
      // rows y1+1 … y, i.e. model y from Y(y + 1) to Y(y1 + 1)
      const Y0 = Y(y + 1), dy = y - y1;
      for (const [z0, z1] of diff(e0, e1, w0, w1)) faces.push({ o: [x, Y0, z0], u: [0, 0, z1 - z0], v: [0, dy, 0], level: level(x, y) }); // faces -x
      for (const [z0, z1] of diff(w0, w1, e0, e1)) faces.push({ o: [x, Y0, z0], u: [0, dy, 0], v: [0, 0, z1 - z0], level: level(x - 1, y) }); // faces +x
      y = y1;
    }
  }

  // every corner, indexed by the two coordinates it shares with edges along each axis
  // (numeric keys: coordinates are whole numbers well below 1e5, and halves only for the fan centres)
  const along: Map<number, number[]>[] = [new Map(), new Map(), new Map()];
  const corner = (f: Face, a: number, b: number) => f.o.map((c, k) => c + a * f.u[k] + b * f.v[k]);
  const lineKey = (p: number[], axis: number) => (axis === 0 ? p[1] * 1e5 + p[2] : axis === 1 ? p[0] * 1e5 + p[2] : p[0] * 1e5 + p[1]);
  for (const f of faces) for (const [a, b] of [[0, 0], [1, 0], [1, 1], [0, 1]]) {
    const p = corner(f, a, b);
    for (let axis = 0; axis < 3; axis++) {
      const k = lineKey(p, axis);
      let list = along[axis].get(k);
      if (!list) along[axis].set(k, list = []);
      list.push(p[axis]);
    }
  }
  for (const m of along) for (const [k, list] of m) m.set(k, [...new Set(list)].sort((a, b) => a - b));

  const vertices: number[] = [], triangles: number[] = [], levels: number[] = [], index = new Map<number, number>();
  const vertex = (p: number[]) => {
    const k = (p[0] * 2e5 + p[1] * 2) * 2e5 + p[2] * 2;
    let i = index.get(k);
    if (i == null) {
      i = vertices.length / 3;
      index.set(k, i);
      vertices.push(p[0] * cell, p[1] * cell, p[2] * layerHeight);
    }
    return i;
  };
  for (const f of faces) {
    const c = [corner(f, 0, 0), corner(f, 1, 0), corner(f, 1, 1), corner(f, 0, 1)];
    // the outline, with every corner of another face that lies on one of its edges
    const ring: number[][] = [];
    for (let e = 0; e < 4; e++) {
      const a = c[e], b = c[(e + 1) % 4], axis = a.findIndex((v, k) => v !== b[k]);
      ring.push(a);
      const lo = Math.min(a[axis], b[axis]), hi = Math.max(a[axis], b[axis]);
      const mid = (along[axis].get(lineKey(a, axis)) || []).filter(v => v > lo && v < hi);
      if (a[axis] > b[axis]) mid.reverse();
      for (const v of mid) { const p = [...a]; p[axis] = v; ring.push(p); }
    }
    const ids = ring.map(vertex);
    if (ids.length === 4) {
      triangles.push(ids[0], ids[1], ids[2], ids[0], ids[2], ids[3]);
      levels.push(f.level, f.level);
    } else {
      const m = vertex(corner(f, 0.5, 0.5));
      for (let i = 0; i < ids.length; i++) { triangles.push(m, ids[i], ids[(i + 1) % ids.length]); levels.push(f.level); }
    }
  }
  return { vertices, triangles, levels };
}

/** The single-nozzle model (grid: band per cell, -1 unpainted, -2 nothing) as one closed surface. */
export function closedMesh(grid: Int16Array | number[], w: number, h: number, cell: number, s: PrintSettings): Mesh {
  return solidMesh(heightSolid(grid, s), w, h, cell, s.layerHeight);
}
// ---- no thin towers ---------------------------------------------------------------------------------------
export interface TowerOptions {
  /** narrowest part that may stand above its surroundings, mm */
  minWidth: number;
  /** a raised part may be at most this many times as tall (above its lowest neighbour) as it is wide */
  maxRatio: number;
  /** height (mm) of each level; by default the color bands of the single-nozzle model */
  heightOf?: (level: number) => number;
}
/**
 * Removes pieces that would print as thin towers. A piece (cells of one level touching side by side) that
 * stands above a neighbour and is narrower than minWidth, or taller than maxRatio × its width, takes the
 * level of its lower neighbour it shares the longest border with – so specks, slivers and tiny tiles in high
 * colors sink, while grooves (grout lines, lower than what is around them) are never touched. Repeats until
 * nothing changes. Width = the widest spot of the piece (twice the distance from its middle to its edge).
 * Returns a new grid and how many pieces were lowered.
 */
export function removeTowers(input: Int16Array | number[], w: number, h: number, cell: number, s: PrintSettings, o: TowerOptions): { grid: Int16Array; lowered: number } {
  const grid = Int16Array.from(input), n = w * h, label = new Int32Array(n), dist = new Float32Array(n);
  const heightOf = o.heightOf || ((lv: number) => (lv === -2 ? 0 : (lv < 0 ? s.baseLayers : topLayer(lv, s)) * s.layerHeight));
  let lowered = 0;
  for (let round = 0; round < 12; round++) {
    // pieces
    label.fill(-1);
    const levels: number[] = [], stack: number[] = [];
    for (let p = 0; p < n; p++) {
      if (label[p] >= 0) continue;
      const id = levels.length, lv = grid[p];
      levels.push(lv);
      label[p] = id;
      stack.push(p);
      while (stack.length) {
        const q = stack.pop(), x = q % w;
        for (const r of [x > 0 ? q - 1 : -1, x < w - 1 ? q + 1 : -1, q - w, q + w]) {
          if (r < 0 || r >= n || label[r] >= 0 || grid[r] !== lv) continue;
          label[r] = id;
          stack.push(r);
        }
      }
    }
    // how wide each piece is: distance from each cell to the piece's edge (chamfer), its largest value
    const D = Math.SQRT2;
    for (let p = 0; p < n; p++) {
      const x = p % w, y = (p / w) | 0, l = label[p];
      const edge = x === 0 || y === 0 || x === w - 1 || y === h - 1 || label[p - 1] !== l || label[p + 1] !== l || label[p - w] !== l || label[p + w] !== l;
      dist[p] = edge ? 1 : 1e9;
    }
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const p = y * w + x;
      if (dist[p] <= 1) continue;
      dist[p] = Math.min(dist[p], dist[p - 1] + 1, dist[p - w] + 1, dist[p - w - 1] + D, dist[p - w + 1] + D);
    }
    for (let y = h - 1; y >= 0; y--) for (let x = w - 1; x >= 0; x--) {
      const p = y * w + x;
      if (dist[p] <= 1) continue;
      dist[p] = Math.min(dist[p], dist[p + 1] + 1, dist[p + w] + 1, dist[p + w + 1] + D, dist[p + w - 1] + D);
    }
    const widest = new Float32Array(levels.length);
    for (let p = 0; p < n; p++) if (dist[p] > widest[label[p]]) widest[label[p]] = dist[p];
    // neighbours: border length with each lower level
    const borders: Map<number, number>[] = levels.map(() => new Map());
    const lowest = new Float64Array(levels.length).fill(Infinity);
    const meet = (a: number, b: number) => {
      const la = label[a], lb = label[b];
      if (la === lb) return;
      const ga = grid[a], gb = grid[b];
      lowest[la] = Math.min(lowest[la], heightOf(gb));
      lowest[lb] = Math.min(lowest[lb], heightOf(ga));
      if (gb < ga) borders[la].set(gb, (borders[la].get(gb) || 0) + 1);
      if (ga < gb) borders[lb].set(ga, (borders[lb].get(ga) || 0) + 1);
    };
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const p = y * w + x;
      if (x < w - 1) meet(p, p + 1);
      if (y < h - 1) meet(p, p + w);
    }
    // the towers sink to their main lower neighbour
    const target = new Int16Array(levels.length).fill(-32768);
    let changed = 0;
    levels.forEach((lv, id) => {
      const relief = heightOf(lv) - lowest[id];
      if (!(relief > 1e-9) || !borders[id].size) return;
      const width = Math.max(1, 2 * widest[id] - 1) * cell;
      if (width >= o.minWidth && relief <= o.maxRatio * width) return;
      let best = -2, bestN = -1;
      for (const [nl, cnt] of borders[id]) if (cnt > bestN || (cnt === bestN && nl > best)) { best = nl; bestN = cnt; }
      target[id] = best;
      changed++;
    });
    if (!changed) break;
    for (let p = 0; p < n; p++) { const tl = target[label[p]]; if (tl !== -32768) grid[p] = tl; }
    lowered += changed;
  }
  return { grid, lowered };
}

/** Binary STL of a mesh (units: mm). */
export function stl(mesh: Mesh, name = 'Mosaic Paint'): ArrayBuffer {
  const V = mesh.vertices, T = mesh.triangles, n = T.length / 3, buf = new ArrayBuffer(84 + n * 50), dv = new DataView(buf);
  const header = `${name} – multi-color by layer`.slice(0, 80);
  for (let i = 0; i < header.length; i++) dv.setUint8(i, header.charCodeAt(i) & 0x7f);
  dv.setUint32(80, n, true);
  let o = 84;
  for (let t = 0; t < n; t++) {
    const p = [0, 1, 2].map(k => T[t * 3 + k] * 3);
    const ux = V[p[1]] - V[p[0]], uy = V[p[1] + 1] - V[p[0] + 1], uz = V[p[1] + 2] - V[p[0] + 2];
    const vx = V[p[2]] - V[p[0]], vy = V[p[2] + 1] - V[p[0] + 1], vz = V[p[2] + 2] - V[p[0] + 2];
    let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    const L = Math.hypot(nx, ny, nz) || 1;
    nx /= L; ny /= L; nz /= L;
    for (const v of [nx, ny, nz]) { dv.setFloat32(o, v, true); o += 4; }
    for (const q of p) for (let k = 0; k < 3; k++) { dv.setFloat32(o, V[q + k], true); o += 4; }
    dv.setUint16(o, 0, true);
    o += 2;
  }
  return buf;
}

export interface PlanStep { color: string; fromLayer: number; toLayer: number; changeAtLayer: number | null; z: number | null }
/** When to load which filament: color 0 prints the base and its band; each next color starts a band. */
export function colorPlan(colors: string[], s: PrintSettings): PlanStep[] {
  return colors.map((color, i) => {
    const from = i === 0 ? 1 : topLayer(i - 1, s) + 1, to = topLayer(i, s);
    return { color, fromLayer: from, toLayer: to, changeAtLayer: i === 0 ? null : from, z: i === 0 ? null : +(from * s.layerHeight).toFixed(3) };
  });
}
/** Total height of the model in mm. */
export const modelHeight = (nColors: number, s: PrintSettings): number => +(topLayer(nColors - 1, s) * s.layerHeight).toFixed(3);

// ---- finishing: frame, rounded corners, hanging hole, magnet pockets -------------------------------------
/** grid value of the frame's cells (-1 unpainted, -2 nothing) */
export const FRAME = -3;
/** All sizes in cells. */
export interface FinishShape {
  /** frame width around the picture (0: none) */
  frame: number;
  /** corner radius of the whole outline (0: square) */
  corner: number;
  /** diameter of the hanging hole, at the top in the middle (0: none) */
  hole: number;
}
/** Distance of the hanging hole's centre from the top edge (cells): clear of the edge, in the frame if it fits. */
export const holeCentre = (o: FinishShape, margin: number): number => Math.max(o.hole / 2 + margin, o.frame / 2);

/**
 * The picture inside its frame (cells FRAME), with the outline's corners rounded and the hanging hole cut
 * out (both -2). margin: material kept between the hole and the edge, in cells.
 */
export function finishGrid(grid: Int16Array | number[], w: number, h: number, o: FinishShape, margin: number): { grid: Int16Array; w: number; h: number } {
  const b = Math.max(0, Math.round(o.frame)), W = w + 2 * b, H = h + 2 * b, out = new Int16Array(W * H).fill(FRAME);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) out[(y + b) * W + x + b] = grid[y * w + x];
  const r = Math.min(o.corner, W / 2, H / 2), hr = o.hole / 2, hy = holeCentre(o, margin);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const cx = x + 0.5, cy = y + 0.5;
    // nearest corner centre: outside the rounded corner's circle is cut off
    if (r > 0) {
      const ox = cx < r ? r : cx > W - r ? W - r : cx, oy = cy < r ? r : cy > H - r ? H - r : cy;
      if ((cx - ox) ** 2 + (cy - oy) ** 2 > r * r) { out[y * W + x] = -2; continue; }
    }
    if (hr > 0 && (cx - W / 2) ** 2 + (cy - hy) ** 2 <= hr * hr) out[y * W + x] = -2;
  }
  return { grid: out, w: W, h: H };
}

/** Cells of `count` round magnet pockets (diameter d cells), one near each corner, centres `inset` cells in. */
export function pocketMask(w: number, h: number, d: number, inset: number): Uint8Array {
  const mask = new Uint8Array(w * h), r = d / 2;
  if (r <= 0) return mask;
  const xs = [inset, w - inset], ys = [inset, h - inset];
  for (const px of xs) for (const py of ys) {
    for (let y = Math.max(0, Math.floor(py - r)); y < Math.min(h, Math.ceil(py + r)); y++) {
      for (let x = Math.max(0, Math.floor(px - r)); x < Math.min(w, Math.ceil(px + r)); x++) {
        if ((x + 0.5 - px) ** 2 + (y + 0.5 - py) ** 2 <= r * r) mask[y * w + x] = 1;
      }
    }
  }
  return mask;
}

/**
 * Pockets in the bottom (for magnets): in the masked cells the material starts `depth` layers up, in every
 * solid of the model. At least `keep` layers stay above a pocket, so it gets shallower where the model is
 * thin. Returns the depth used (layers; 0: no pockets).
 */
export function cutPockets(solids: Solid[], mask: Uint8Array, depth: number, keep = 2): number {
  let used = depth;
  for (let i = 0; i < mask.length; i++) {
    if (!mask[i]) continue;
    let top = 0;
    for (const s of solids) if (s.top[i] > s.bottom[i]) top = Math.max(top, s.top[i]);
    if (top > 0) used = Math.min(used, top - keep);
  }
  used = Math.max(0, used);
  if (!used) return 0;
  for (let i = 0; i < mask.length; i++) {
    if (!mask[i]) continue;
    for (const s of solids) if (s.top[i] > s.bottom[i] && s.bottom[i] < used) {
      s.bottom[i] = used;
      if (s.top[i] < used) s.top[i] = used; // nothing left of this solid here
    }
  }
  return used;
}

/** The frame's cells as a solid of their own (from layer `bottom` to `top`, colored `level`). */
export function frameSolid(grid: Int16Array | number[], bottom: number, top: number, level: number): Solid {
  const n = grid.length, s: Solid = { bottom: new Int16Array(n).fill(bottom), top: new Int16Array(n), level: new Int16Array(n).fill(level) };
  for (let i = 0; i < n; i++) if (grid[i] === FRAME) s.top[i] = top;
  return s;
}

// ---- 3MF: the model plus the filament changes, read by the slicer ----------------------------------------
const xmlAttr = (v: string) => v.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const num = (v: number) => String(+v.toFixed(4));
const CONTENT_TYPES = '<?xml version="1.0" encoding="UTF-8"?>\n<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
  + '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
  + '<Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/>'
  + '<Default Extension="xml" ContentType="application/xml"/></Types>';
const RELS = '<?xml version="1.0" encoding="UTF-8"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
  + '<Relationship Target="/3D/3dmodel.model" Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/></Relationships>';

/** The 3MF model file: the mesh, colored by band (for viewers; slicers use the color changes). */
export function modelXml(mesh: Mesh, colors: string[], name: string): string {
  const V = mesh.vertices, T = mesh.triangles, out: string[] = [];
  out.push('<?xml version="1.0" encoding="UTF-8"?>',
    '<model unit="millimeter" xml:lang="en-US" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">',
    `<metadata name="Title">${xmlAttr(name)}</metadata>`, '<metadata name="Application">Mosaic Paint</metadata>',
    '<resources>', '<basematerials id="1">');
  for (const c of colors) out.push(`<base name="${xmlAttr(c)}" displaycolor="${c.toUpperCase()}FF"/>`);
  out.push('</basematerials>', `<object id="2" type="model" pid="1" pindex="0" name="${xmlAttr(name)}">`, '<mesh>', '<vertices>');
  for (let i = 0; i < V.length; i += 3) out.push(`<vertex x="${num(V[i])}" y="${num(V[i + 1])}" z="${num(V[i + 2])}"/>`);
  out.push('</vertices>', '<triangles>');
  for (let t = 0; t < T.length; t += 3) out.push(`<triangle v1="${T[t]}" v2="${T[t + 1]}" v3="${T[t + 2]}" pid="1" p1="${Math.max(0, mesh.levels[t / 3])}"/>`);
  out.push('</triangles>', '</mesh>', '</object>', '</resources>', '<build>', '<item objectid="2"/>', '</build>', '</model>');
  return out.join('\n');
}
/**
 * The color changes as PrusaSlicer keeps them in its 3MF projects: it inserts M600 at the start of the
 * layer at each print_z. (Bambu Studio and OrcaSlicer only read theirs from projects they wrote themselves.)
 */
export function colorChangeXml(plan: PlanStep[]): string {
  return ['<?xml version="1.0" encoding="utf-8"?>', '<custom_gcodes_per_print_z>',
    ...plan.filter(p => p.z != null).map(p => `<code print_z="${p.z}" type="0" extruder="1" color="${p.color}" extra="" gcode="M600"/>`),
    '<mode value="SingleExtruder"/>', '</custom_gcodes_per_print_z>'].join('\n');
}
/** All files of the 3MF archive (zip them with lib/zip.ts). */
export function threeMfFiles(mesh: Mesh, plan: PlanStep[], name: string): { name: string; data: string }[] {
  return [
    { name: '[Content_Types].xml', data: CONTENT_TYPES },
    { name: '_rels/.rels', data: RELS },
    { name: '3D/3dmodel.model', data: modelXml(mesh, plan.map(p => p.color), name) },
    { name: 'Metadata/Prusa_Slicer_custom_gcode_per_print_z.xml', data: colorChangeXml(plan) },
  ];
}

// ---- several filaments (AMS, MMU…): a flat model, one part per color ---------------------------------------
export interface FlatSettings {
  layerHeight: number;
  /** layers of the base plate (a part of its own, in the first color; 0: none) */
  baseLayers: number;
  /** layers of the tiles above the base */
  tileLayers: number;
  /** grout parts stay this many layers lower than the tiles */
  groutRecess: number;
}
/** Heights (mm) of the flat model, for removeTowers: grout lower, tiles level, base, nothing. */
export function flatHeights(grout: boolean[], f: FlatSettings): (level: number) => number {
  const tile = (f.baseLayers + f.tileLayers) * f.layerHeight, low = (f.baseLayers + Math.max(1, f.tileLayers - f.groutRecess)) * f.layerHeight;
  return (lv) => (lv === -2 ? 0 : lv < 0 ? f.baseLayers * f.layerHeight : grout[lv] ? low : tile);
}
/**
 * The parts of a flat multi-filament model: part -1 is the base plate (where there is any material), part
 * k the cells of level k standing on it – grout parts lower. grid: level per cell (-1 unpainted, -2 nothing).
 */
export function flatParts(grid: Int16Array | number[], w: number, h: number, nLevels: number, grout: boolean[], f: FlatSettings): { part: number; solid: Solid }[] {
  const n = w * h, out: { part: number; solid: Solid }[] = [];
  if (f.baseLayers > 0) {
    const top = new Int16Array(n);
    for (let i = 0; i < n; i++) if (grid[i] !== -2) top[i] = f.baseLayers;
    out.push({ part: -1, solid: { bottom: new Int16Array(n), top, level: new Int16Array(n) } });
  }
  for (let k = 0; k < nLevels; k++) {
    const bottom = new Int16Array(n).fill(f.baseLayers), top = new Int16Array(n), level = new Int16Array(n).fill(k);
    const up = f.baseLayers + (grout[k] ? Math.max(1, f.tileLayers - f.groutRecess) : f.tileLayers);
    let any = false;
    for (let i = 0; i < n; i++) if (grid[i] === k) { top[i] = up; any = true; }
    if (any) out.push({ part: k, solid: { bottom, top, level } });
  }
  return out;
}

export type PartsSlicer = 'prusa' | 'bambu';
/** filament: 1, 2, … (by default the part's place in the list) */
export interface ModelPart { name: string; color: string; mesh: Mesh; filament?: number }

/**
 * A 3MF holding one object made of parts, for multi-filament printers.
 * PrusaSlicer and Bambu Studio (and OrcaSlicer) each read only their own way of describing parts.
 */
export function threeMfPartsFiles(parts: ModelPart[], name: string, slicer: PartsSlicer = 'prusa'): { name: string; data: string }[] {
  return slicer === 'bambu' ? bambuPartsFiles(parts, name) : prusaPartsFiles(parts, name);
}

/**
 * Bambu Studio's layout: the meshes in a second model file, an object made of them as components, and the
 * parts' filaments in its model settings.
 */
function bambuPartsFiles(parts: ModelPart[], name: string): { name: string; data: string }[] {
  const NS = 'xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02" xmlns:BambuStudio="http://schemas.bambulab.com/package/2021"'
    + ' xmlns:p="http://schemas.microsoft.com/3dmanufacturing/production/2015/06" requiredextensions="p"';
  const uuid = (kind: number, k: number) => `${kind.toString(16).padStart(8, '0')}-0000-4000-8000-${k.toString(16).padStart(12, '0')}`;
  const sub = ['<?xml version="1.0" encoding="UTF-8"?>', `<model unit="millimeter" xml:lang="en-US" ${NS}>`,
    '<metadata name="BambuStudio:3mfVersion">1</metadata>', '<resources>'];
  parts.forEach((p, k) => {
    const V = p.mesh.vertices, T = p.mesh.triangles;
    sub.push(`<object id="${k + 1}" p:UUID="${uuid(1, k)}" type="model">`, '<mesh>', '<vertices>');
    for (let i = 0; i < V.length; i += 3) sub.push(`<vertex x="${num(V[i])}" y="${num(V[i + 1])}" z="${num(V[i + 2])}"/>`);
    sub.push('</vertices>', '<triangles>');
    for (let t = 0; t < T.length; t += 3) sub.push(`<triangle v1="${T[t]}" v2="${T[t + 1]}" v3="${T[t + 2]}"/>`);
    sub.push('</triangles>', '</mesh>', '</object>');
  });
  sub.push('</resources>', '<build/>', '</model>');
  const whole = parts.length + 1, path = '/3D/Objects/object_1.model';
  const main = ['<?xml version="1.0" encoding="UTF-8"?>', `<model unit="millimeter" xml:lang="en-US" ${NS}>`,
    '<metadata name="Application">Mosaic Paint</metadata>', '<metadata name="BambuStudio:3mfVersion">1</metadata>',
    `<metadata name="Title">${xmlAttr(name)}</metadata>`, '<resources>',
    `<object id="${whole}" p:UUID="${uuid(2, 0)}" type="model">`, '<components>'];
  parts.forEach((_, k) => main.push(`<component p:path="${path}" objectid="${k + 1}" p:UUID="${uuid(3, k)}" transform="1 0 0 0 1 0 0 0 1 0 0 0"/>`));
  main.push('</components>', '</object>', '</resources>', `<build p:UUID="${uuid(4, 0)}">`,
    `<item objectid="${whole}" p:UUID="${uuid(5, 0)}" printable="1"/>`, '</build>', '</model>');
  const config = ['<?xml version="1.0" encoding="UTF-8"?>', '<config>', `<object id="${whole}">`,
    `<metadata key="name" value="${xmlAttr(name)}"/>`, '<metadata key="extruder" value="1"/>'];
  parts.forEach((p, k) => config.push(`<part id="${k + 1}" subtype="normal_part">`, `<metadata key="name" value="${xmlAttr(p.name)}"/>`,
    `<metadata key="extruder" value="${p.filament || k + 1}"/>`, '</part>'));
  config.push('</object>', '</config>');
  return [
    { name: '[Content_Types].xml', data: CONTENT_TYPES },
    { name: '_rels/.rels', data: RELS },
    { name: '3D/3dmodel.model', data: main.join('\n') },
    { name: '3D/_rels/3dmodel.model.rels', data: RELS.replace('/3D/3dmodel.model', path) },
    { name: '3D/Objects/object_1.model', data: sub.join('\n') },
    { name: 'Metadata/model_settings.config', data: config.join('\n') },
  ];
}

/**
 * PrusaSlicer's layout: one mesh whose parts are ranges of triangles, each with its filament in the model
 * config; every triangle also carries its part's color for other programs.
 */
function prusaPartsFiles(parts: ModelPart[], name: string): { name: string; data: string }[] {
  const out: string[] = [], config: string[] = [];
  out.push('<?xml version="1.0" encoding="UTF-8"?>',
    '<model unit="millimeter" xml:lang="en-US" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">',
    `<metadata name="Title">${xmlAttr(name)}</metadata>`, '<metadata name="Application">Mosaic Paint</metadata>',
    '<resources>', '<basematerials id="2">');
  for (const p of parts) out.push(`<base name="${xmlAttr(p.name)}" displaycolor="${p.color.toUpperCase()}FF"/>`);
  out.push('</basematerials>', `<object id="1" type="model" pid="2" pindex="0" name="${xmlAttr(name)}">`, '<mesh>', '<vertices>');
  for (const p of parts) {
    const V = p.mesh.vertices;
    for (let i = 0; i < V.length; i += 3) out.push(`<vertex x="${num(V[i])}" y="${num(V[i + 1])}" z="${num(V[i + 2])}"/>`);
  }
  out.push('</vertices>', '<triangles>');
  config.push('<?xml version="1.0" encoding="UTF-8"?>', '<config>', '<object id="1" instances_count="1">', `<metadata type="object" key="name" value="${xmlAttr(name)}"/>`);
  let vOffset = 0, tOffset = 0;
  parts.forEach((p, k) => {
    const T = p.mesh.triangles, n = T.length / 3;
    for (let t = 0; t < T.length; t += 3) out.push(`<triangle v1="${T[t] + vOffset}" v2="${T[t + 1] + vOffset}" v3="${T[t + 2] + vOffset}" pid="2" p1="${k}"/>`);
    config.push(`<volume firstid="${tOffset}" lastid="${tOffset + n - 1}">`,
      `<metadata type="volume" key="name" value="${xmlAttr(p.name)}"/>`,
      '<metadata type="volume" key="volume_type" value="ModelPart"/>',
      `<metadata type="volume" key="extruder" value="${p.filament || k + 1}"/>`, '</volume>');
    vOffset += p.mesh.vertices.length / 3;
    tOffset += n;
  });
  out.push('</triangles>', '</mesh>', '</object>', '</resources>', '<build>', '<item objectid="1"/>', '</build>', '</model>');
  config.push('</object>', '</config>');
  return [
    { name: '[Content_Types].xml', data: CONTENT_TYPES },
    { name: '_rels/.rels', data: RELS },
    { name: '3D/3dmodel.model', data: out.join('\n') },
    { name: 'Metadata/Slic3r_PE_model.config', data: config.join('\n') },
  ];
}

/** Several meshes as one (for viewing: they may overlap or touch). */
export function mergeMeshes(meshes: Mesh[]): Mesh {
  const out: Mesh = { vertices: [], triangles: [], levels: [] };
  for (const m of meshes) {
    const o = out.vertices.length / 3;
    for (const v of m.vertices) out.vertices.push(v);
    for (const i of m.triangles) out.triangles.push(i + o);
    for (const l of m.levels) out.levels.push(l);
  }
  return out;
}
