/* Selections that aren't rectangles: masks (one byte per pixel, 0…255 = how much is selected) for the
   magic wand, adding and subtracting, the outline drawn around them, and the magnetic lasso's path –
   the cheapest way along the picture's edges between two points (Dijkstra over an edge-cost map). */
import type { Img, Box } from './raster.ts';

export type SelMode = 'new' | 'add' | 'subtract';

/** The magic wand: pixels whose color is within the tolerance of the clicked one (touching it, or anywhere). */
export function wandMask(img: Img, x: number, y: number, tolerance: number, contiguous: boolean): Uint8Array {
  const { width: W, height: H, data } = img, out = new Uint8Array(W * H);
  if (x < 0 || y < 0 || x >= W || y >= H) return out;
  const i0 = (y * W + x) * 4, r = data[i0], g = data[i0 + 1], b = data[i0 + 2], a = data[i0 + 3];
  const t = tolerance * tolerance * 4;
  const near = (i: number) => {
    const j = i * 4, dr = data[j] - r, dg = data[j + 1] - g, db = data[j + 2] - b, da = data[j + 3] - a;
    return dr * dr + dg * dg + db * db + da * da <= t;
  };
  if (!contiguous) {
    for (let i = 0; i < W * H; i++) if (near(i)) out[i] = 255;
    return out;
  }
  const stack = [y * W + x];
  out[y * W + x] = 255;
  while (stack.length) {
    const i = stack.pop(), px = i % W, py = (i - px) / W;
    const visit = (j: number) => { if (!out[j] && near(j)) { out[j] = 255; stack.push(j); } };
    if (px > 0) visit(i - 1);
    if (px < W - 1) visit(i + 1);
    if (py > 0) visit(i - W);
    if (py < H - 1) visit(i + W);
  }
  return out;
}

/** The mask grown by r pixels (a square neighbourhood, done across then down): every pixel becomes the
    largest value near it. For removing things: the rim right around an object goes too. */
export function dilate(mask: Uint8Array, w: number, h: number, r: number): Uint8Array {
  if (r < 1) return mask;
  const a = new Uint8Array(mask.length), out = new Uint8Array(mask.length);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    let m = 0;
    for (let k = Math.max(0, x - r); k <= Math.min(w - 1, x + r); k++) if (mask[y * w + k] > m) m = mask[y * w + k];
    a[y * w + x] = m;
  }
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    let m = 0;
    for (let k = Math.max(0, y - r); k <= Math.min(h - 1, y + r); k++) if (a[k * w + x] > m) m = a[k * w + x];
    out[y * w + x] = m;
  }
  return out;
}

/** A new selection (whole-image mask) combined with the old one. */
export function combine(old: Uint8Array | null, add: Uint8Array, mode: SelMode): Uint8Array {
  if (mode === 'new' || !old) return mode === 'subtract' ? new Uint8Array(add.length) : add;
  const out = new Uint8Array(add.length);
  for (let i = 0; i < add.length; i++) out[i] = mode === 'add' ? Math.max(old[i], add[i]) : Math.max(0, old[i] - add[i]);
  return out;
}

/** The box around the selected part of a whole-image mask (null: nothing selected). */
export function maskBox(mask: Uint8Array, W: number, H: number): Box | null {
  let x0 = W, y0 = H, x1 = -1, y1 = -1;
  for (let y = 0; y < H; y++) {
    const row = y * W;
    for (let x = 0; x < W; x++) {
      if (mask[row + x] < 128) continue;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      y1 = y;
    }
  }
  return x1 < 0 ? null : { x: x0, y: y0, w: x1 - x0 + 1, h: y1 - y0 + 1 };
}
/** The part of a whole-image mask inside the box. */
export function cropMask(mask: Uint8Array, W: number, b: Box): Uint8Array {
  const out = new Uint8Array(b.w * b.h);
  for (let y = 0; y < b.h; y++) out.set(mask.subarray((b.y + y) * W + b.x, (b.y + y) * W + b.x + b.w), y * b.w);
  return out;
}
/** A selection (box, and its mask or none for a rectangle) as a whole-image mask. */
export function fullMask(b: Box, mask: Uint8Array | null, W: number, H: number): Uint8Array {
  const out = new Uint8Array(W * H);
  for (let y = 0; y < b.h; y++) {
    const Y = b.y + y;
    if (Y < 0 || Y >= H) continue;
    for (let x = 0; x < b.w; x++) {
      const X = b.x + x;
      if (X >= 0 && X < W) out[Y * W + X] = mask ? mask[y * b.w + x] : 255;
    }
  }
  return out;
}
/** True when every pixel of the box is selected (the mask is just a rectangle). */
export const isFull = (mask: Uint8Array): boolean => mask.every(v => v >= 255);

/**
 * The outline of a mask (w × h, selected ≥ 128) as line segments between pixel corners, in mask
 * coordinates: [x0, y0, x1, y1, …]. Runs along a row or column are merged into one segment.
 */
export function outline(mask: Uint8Array, w: number, h: number): number[] {
  const on = (x: number, y: number) => x >= 0 && y >= 0 && x < w && y < h && mask[y * w + x] >= 128;
  const out: number[] = [];
  // horizontal edges: between row y-1 and row y
  for (let y = 0; y <= h; y++) {
    let start = -1;
    for (let x = 0; x <= w; x++) {
      const edge = x < w && on(x, y - 1) !== on(x, y);
      if (edge && start < 0) start = x;
      else if (!edge && start >= 0) { out.push(start, y, x, y); start = -1; }
    }
  }
  // vertical edges: between column x-1 and column x
  for (let x = 0; x <= w; x++) {
    let start = -1;
    for (let y = 0; y <= h; y++) {
      const edge = y < h && on(x - 1, y) !== on(x, y);
      if (edge && start < 0) start = y;
      else if (!edge && start >= 0) { out.push(x, start, x, y); start = -1; }
    }
  }
  return out;
}

// ---- the magnetic lasso -------------------------------------------------------------------------------------
/** How costly it is to walk along each pixel: cheap on strong edges, dear on flat areas (0…1). */
export function edgeCost(img: Img): Float32Array {
  const { width: W, height: H, data } = img, n = W * H, lum = new Float32Array(n), cost = new Float32Array(n);
  for (let i = 0; i < n; i++) lum[i] = 0.299 * data[i * 4] + 0.587 * data[i * 4 + 1] + 0.114 * data[i * 4 + 2];
  let max = 1;
  const g = new Float32Array(n);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const L = (dx: number, dy: number) => lum[Math.min(H - 1, Math.max(0, y + dy)) * W + Math.min(W - 1, Math.max(0, x + dx))];
    // Sobel
    const gx = L(1, -1) + 2 * L(1, 0) + L(1, 1) - L(-1, -1) - 2 * L(-1, 0) - L(-1, 1);
    const gy = L(-1, 1) + 2 * L(0, 1) + L(1, 1) - L(-1, -1) - 2 * L(0, -1) - L(1, -1);
    const v = Math.hypot(gx, gy);
    g[y * W + x] = v;
    if (v > max) max = v;
  }
  for (let i = 0; i < n; i++) cost[i] = 1 - g[i] / max;
  return cost;
}

/** The cheapest path (pixel centres) from a to b over the cost map, searched within margin of their box. */
export function cheapestPath(cost: Float32Array, W: number, H: number, a: { x: number; y: number }, b: { x: number; y: number }, margin = 24): { x: number; y: number }[] {
  const ax = Math.round(a.x), ay = Math.round(a.y), bx = Math.round(b.x), by = Math.round(b.y);
  const x0 = Math.max(0, Math.min(ax, bx) - margin), y0 = Math.max(0, Math.min(ay, by) - margin);
  const x1 = Math.min(W - 1, Math.max(ax, bx) + margin), y1 = Math.min(H - 1, Math.max(ay, by) + margin);
  const w = x1 - x0 + 1, h = y1 - y0 + 1, n = w * h;
  const inBox = (x: number, y: number) => x >= x0 && y >= y0 && x <= x1 && y <= y1;
  if (!inBox(ax, ay) || !inBox(bx, by)) return [a, b];
  const dist = new Float32Array(n).fill(Infinity), prev = new Int32Array(n).fill(-1), done = new Uint8Array(n);
  const start = (ay - y0) * w + (ax - x0), goal = (by - y0) * w + (bx - x0);
  // a binary heap of [distance, index]
  const hd: number[] = [], hi: number[] = [];
  const push = (d: number, i: number) => {
    let k = hd.length;
    hd.push(d); hi.push(i);
    while (k > 0) {
      const p = (k - 1) >> 1;
      if (hd[p] <= hd[k]) break;
      [hd[p], hd[k]] = [hd[k], hd[p]]; [hi[p], hi[k]] = [hi[k], hi[p]];
      k = p;
    }
  };
  const pop = (): number => {
    const top = hi[0], ld = hd.pop(), li = hi.pop();
    if (hd.length) {
      hd[0] = ld; hi[0] = li;
      let k = 0;
      for (;;) {
        const l = 2 * k + 1, r = l + 1;
        let m = k;
        if (l < hd.length && hd[l] < hd[m]) m = l;
        if (r < hd.length && hd[r] < hd[m]) m = r;
        if (m === k) break;
        [hd[m], hd[k]] = [hd[k], hd[m]]; [hi[m], hi[k]] = [hi[k], hi[m]];
        k = m;
      }
    }
    return top;
  };
  dist[start] = 0;
  push(0, start);
  while (hd.length) {
    const i = pop();
    if (done[i]) continue;
    done[i] = 1;
    if (i === goal) break;
    const x = i % w, y = (i - x) / w;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dy) continue;
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
      const j = ny * w + nx;
      if (done[j]) continue;
      // a step costs its length, mostly where there is no edge
      const d = dist[i] + (dx && dy ? 1.414 : 1) * (0.05 + cost[(y0 + ny) * W + x0 + nx]);
      if (d < dist[j]) { dist[j] = d; prev[j] = i; push(d, j); }
    }
  }
  if (prev[goal] < 0 && goal !== start) return [a, b];
  const path: { x: number; y: number }[] = [];
  for (let i = goal; i >= 0; i = prev[i]) {
    const x = i % w;
    path.push({ x: x0 + x + 0.5, y: y0 + (i - x) / w + 0.5 });
    if (i === start) break;
  }
  return path.reverse();
}
