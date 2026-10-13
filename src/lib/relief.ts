/* 3D reliefs from a picture: a height map (0…1 per cell – from brightness, or from AI depth) becomes a
   closed, printable solid: the surface on top, four walls and a flat base. Also lithophanes (thin where
   light, thick where dark – they show the picture when held against light). Pure, for the worker and tests. */
import type { Mesh } from './model3d.ts';

export interface ReliefOptions {
  /** the size of the longer side, mm */
  sizeMm: number;
  /** the flat part under the relief, mm */
  baseMm: number;
  /** how far the relief rises above the base, mm */
  heightMm: number;
}

/** Brightness (0…1) of an RGBA picture, transparent counting as white. */
export function brightness(rgba: Uint8ClampedArray | Uint8Array, n: number): Float32Array {
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const a = rgba[i * 4 + 3] / 255;
    out[i] = ((0.299 * rgba[i * 4] + 0.587 * rgba[i * 4 + 1] + 0.114 * rgba[i * 4 + 2]) * a + 255 * (1 - a)) / 255;
  }
  return out;
}

/** A height map at most max cells on its longer side (averaging), optionally smoothed. */
export function shrink(h: Float32Array, w: number, ht: number, max: number, smooth = 0): { h: Float32Array; w: number; ht: number } {
  const k = Math.max(1, Math.max(w, ht) / max), W = Math.max(2, Math.round(w / k)), H = Math.max(2, Math.round(ht / k));
  let out = new Float32Array(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const x0 = Math.floor(x * w / W), x1 = Math.max(x0 + 1, Math.floor((x + 1) * w / W)), y0 = Math.floor(y * ht / H), y1 = Math.max(y0 + 1, Math.floor((y + 1) * ht / H));
    let s = 0;
    for (let yy = y0; yy < y1; yy++) for (let xx = x0; xx < x1; xx++) s += h[yy * w + xx];
    out[y * W + x] = s / ((x1 - x0) * (y1 - y0));
  }
  for (let p = 0; p < smooth; p++) {
    const next = new Float32Array(W * H);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      let s = 0, n = 0;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const X = x + dx, Y = y + dy;
        if (X >= 0 && Y >= 0 && X < W && Y < H) { s += out[Y * W + X]; n++; }
      }
      next[y * W + x] = s / n;
    }
    out = next;
  }
  return { h: out, w: W, ht: H };
}

/**
 * The solid for a height map (w × ht values 0…1, row 0 at the back): one vertex per value on top, the
 * same grid at z = 0 underneath, joined by walls. Units mm; x to the right, y away from the viewer, z up.
 */
export function reliefMesh(h: Float32Array, w: number, ht: number, o: ReliefOptions): Mesh {
  const cell = o.sizeMm / (Math.max(w, ht) - 1), vertices: number[] = [], triangles: number[] = [];
  // top grid, then bottom grid (y flipped so the picture is not mirrored when seen from above)
  for (let pass = 0; pass < 2; pass++) {
    for (let y = 0; y < ht; y++) for (let x = 0; x < w; x++) {
      vertices.push(x * cell, (ht - 1 - y) * cell, pass ? 0 : o.baseMm + h[y * w + x] * o.heightMm);
    }
  }
  const top = (x: number, y: number) => y * w + x, bot = (x: number, y: number) => w * ht + y * w + x;
  for (let y = 0; y < ht - 1; y++) for (let x = 0; x < w - 1; x++) {
    // top faces up (counter-clockwise seen from above), bottom faces down
    triangles.push(top(x, y), top(x, y + 1), top(x + 1, y), top(x + 1, y), top(x, y + 1), top(x + 1, y + 1));
    triangles.push(bot(x, y), bot(x + 1, y), bot(x, y + 1), bot(x + 1, y), bot(x + 1, y + 1), bot(x, y + 1));
  }
  // the walls, each facing outwards
  for (let x = 0; x < w - 1; x++) {
    triangles.push(top(x, 0), top(x + 1, 0), bot(x, 0), top(x + 1, 0), bot(x + 1, 0), bot(x, 0));
    const y = ht - 1;
    triangles.push(top(x, y), bot(x, y), top(x + 1, y), top(x + 1, y), bot(x, y), bot(x + 1, y));
  }
  for (let y = 0; y < ht - 1; y++) {
    triangles.push(top(0, y), bot(0, y), top(0, y + 1), top(0, y + 1), bot(0, y), bot(0, y + 1));
    const x = w - 1;
    triangles.push(top(x, y), top(x, y + 1), bot(x, y), top(x, y + 1), bot(x, y + 1), bot(x, y));
  }
  return { vertices, triangles, levels: new Array(triangles.length / 3).fill(0) };
}
