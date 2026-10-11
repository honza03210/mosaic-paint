/* Pixel algorithms for the raster app: flood fill, hard-edged lines and polygons, reducing an image to a
   palette and turning it into a tile mosaic. They work on ImageData-like objects, so Node can test them. */
import * as Colors from './colors.ts';
import type { RGB, Lab } from './colors.ts';

export interface Img { width: number; height: number; data: Uint8ClampedArray<ArrayBuffer> }
export type RGBA = [number, number, number, number];
export interface Box { x: number; y: number; w: number; h: number }

export const makeImg = (width: number, height: number): Img => ({ width, height, data: new Uint8ClampedArray(width * height * 4) });
/** '#rrggbb' quickly (palette colors always are), anything else through the browser. */
function rgbOf(c: string): RGB | null {
  const m = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(c);
  return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : Colors.toRgb(c);
}
/** '#rrggbb' → [r, g, b, 255]; null (no color) → fully transparent. */
export function rgba(c: string | null, alpha = 255): RGBA {
  const rgb = c ? rgbOf(c) : null;
  return rgb ? [rgb[0], rgb[1], rgb[2], alpha] : [0, 0, 0, 0];
}
const h2 = (v: number) => v.toString(16).padStart(2, '0');
export const hex = (r: number, g: number, b: number): string => '#' + h2(r) + h2(g) + h2(b);
/** Color at a pixel as '#rrggbb', or null where it is (nearly) transparent. */
export function colorAt(img: Img, x: number, y: number): string | null {
  if (x < 0 || y < 0 || x >= img.width || y >= img.height) return null;
  const i = (y * img.width + x) * 4, d = img.data;
  return d[i + 3] < 128 ? null : hex(d[i], d[i + 1], d[i + 2]);
}
function setPx(d: Uint8ClampedArray, i: number, c: RGBA): void { d[i] = c[0]; d[i + 1] = c[1]; d[i + 2] = c[2]; d[i + 3] = c[3]; }
function grow(b: { x0: number; y0: number; x1: number; y1: number }, x: number, y: number): void {
  if (x < b.x0) b.x0 = x; if (x > b.x1) b.x1 = x; if (y < b.y0) b.y0 = y; if (y > b.y1) b.y1 = y;
}
const toBox = (b: { x0: number; y0: number; x1: number; y1: number }): Box | null =>
  b.x1 < b.x0 ? null : { x: b.x0, y: b.y0, w: b.x1 - b.x0 + 1, h: b.y1 - b.y0 + 1 };

/**
 * Paint bucket: fills the pixels around (x, y) whose color is within `tolerance` (0–255 per channel) of the
 * color there. contiguous = false fills every such pixel in the image. Returns the changed area, or null.
 */
export function floodFill(img: Img, x: number, y: number, color: RGBA, tolerance = 0, contiguous = true): Box | null {
  const { width: W, height: H, data: d } = img;
  x = Math.floor(x); y = Math.floor(y);
  if (x < 0 || y < 0 || x >= W || y >= H) return null;
  const s = (y * W + x) * 4, seed = [d[s], d[s + 1], d[s + 2], d[s + 3]];
  const same = (i: number) => {
    // all fully transparent pixels are alike, whatever color they hide
    if (seed[3] === 0 && d[i + 3] === 0) return true;
    return Math.abs(d[i] - seed[0]) <= tolerance && Math.abs(d[i + 1] - seed[1]) <= tolerance
      && Math.abs(d[i + 2] - seed[2]) <= tolerance && Math.abs(d[i + 3] - seed[3]) <= tolerance;
  };
  if (seed[0] === color[0] && seed[1] === color[1] && seed[2] === color[2] && seed[3] === color[3] && tolerance === 0) return null;
  const b = { x0: W, y0: H, x1: -1, y1: -1 };
  if (!contiguous) {
    for (let p = 0, i = 0; p < W * H; p++, i += 4) if (same(i)) { setPx(d, i, color); grow(b, p % W, (p / W) | 0); }
    return toBox(b);
  }
  // scanline fill; `done` stops refilling pixels that still match after being painted
  const done = new Uint8Array(W * H), stack = [x, y];
  while (stack.length) {
    const sy = stack.pop(), sx = stack.pop();
    let l = sx;
    while (l > 0 && !done[sy * W + l - 1] && same((sy * W + l - 1) * 4)) l--;
    let r = sx;
    while (r < W - 1 && !done[sy * W + r + 1] && same((sy * W + r + 1) * 4)) r++;
    for (let px = l; px <= r; px++) {
      const p = sy * W + px;
      if (done[p]) continue;
      done[p] = 1;
      setPx(d, p * 4, color);
    }
    grow(b, l, sy); grow(b, r, sy);
    for (const ny of [sy - 1, sy + 1]) {
      if (ny < 0 || ny >= H) continue;
      let inRun = false;
      for (let px = l; px <= r; px++) {
        const p = ny * W + px, ok = !done[p] && same(p * 4);
        if (ok && !inRun) { stack.push(px, ny); inRun = true; } else if (!ok) inRun = false;
      }
    }
  }
  return toBox(b);
}

/** The pixels of a straight line (Bresenham), both ends included. */
export function linePixels(x0: number, y0: number, x1: number, y1: number, fn: (x: number, y: number) => void): void {
  x0 = Math.floor(x0); y0 = Math.floor(y0); x1 = Math.floor(x1); y1 = Math.floor(y1);
  const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
  let err = dx + dy;
  for (;;) {
    fn(x0, y0);
    if (x0 === x1 && y0 === y1) return;
    const e2 = 2 * err;
    if (e2 >= dy) { err += dy; x0 += sx; }
    if (e2 <= dx) { err += dx; y0 += sy; }
  }
}
/** A round, hard-edged brush tip of `size` pixels: mask[j * size + i] = 1 where it paints. */
export function discMask(size: number): Uint8Array {
  const n = Math.max(1, Math.round(size)), r = n / 2, m = new Uint8Array(n * n);
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
    const dx = i + 0.5 - r, dy = j + 0.5 - r;
    if (n <= 2 || dx * dx + dy * dy <= r * r + 0.25) m[j * n + i] = 1;
  }
  return m;
}
/** Fills a polygon without antialiasing: every pixel whose center is inside (even–odd rule). */
export function fillPolygon(img: Img, pts: { x: number; y: number }[], color: RGBA): Box | null {
  const { width: W, height: H, data: d } = img, n = pts.length;
  if (n < 3) return null;
  const b = { x0: W, y0: H, x1: -1, y1: -1 };
  const ys = pts.map(p => p.y), top = Math.max(0, Math.floor(Math.min(...ys))), bottom = Math.min(H - 1, Math.ceil(Math.max(...ys)));
  for (let y = top; y <= bottom; y++) {
    const cy = y + 0.5, xs: number[] = [];
    for (let i = 0; i < n; i++) {
      const a = pts[i], c = pts[(i + 1) % n];
      if ((a.y <= cy) !== (c.y <= cy)) xs.push(a.x + (cy - a.y) * (c.x - a.x) / (c.y - a.y));
    }
    xs.sort((p, q) => p - q);
    for (let k = 0; k + 1 < xs.length; k += 2) {
      const x0 = Math.max(0, Math.ceil(xs[k] - 0.5)), x1 = Math.min(W - 1, Math.floor(xs[k + 1] - 0.5));
      for (let x = x0; x <= x1; x++) setPx(d, (y * W + x) * 4, color);
      if (x0 <= x1) { grow(b, x0, y); grow(b, x1, y); }
    }
  }
  return toBox(b);
}

// ---- colors of an image ---------------------------------------------------------------------------
/** How many opaque pixels have each of the given colors. */
export function paletteCounts(img: Img, palette: string[]): Map<string, number> {
  const key = new Map<number, string>();
  for (const c of palette) { const [r, g, b] = rgba(c); key.set((r << 16) | (g << 8) | b, c); }
  const out = new Map<string, number>(), d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] < 128) continue;
    const c = key.get((d[i] << 16) | (d[i + 1] << 8) | d[i + 2]);
    if (c) out.set(c, (out.get(c) || 0) + 1);
  }
  return out;
}
/** The opaque colors of an image, most used first; null if there are more than `max` (a photo). */
export function uniqueColors(img: Img, max: number): string[] | null {
  const m = new Map<number, number>(), d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] < 128) continue;
    const k = (d[i] << 16) | (d[i + 1] << 8) | d[i + 2];
    m.set(k, (m.get(k) || 0) + 1);
    if (m.size > max) return null;
  }
  return [...m].sort((a, b) => b[1] - a[1]).map(([k]) => hex(k >> 16, (k >> 8) & 255, k & 255));
}
/** Up to ~n opaque pixels spread over the image (for suggesting a palette). */
export function samplePixels(img: Img, n: number): RGB[] {
  const out: RGB[] = [], d = img.data, total = img.width * img.height, step = Math.max(1, Math.floor(total / n));
  for (let p = 0; p < total; p += step) {
    const i = p * 4;
    if (d[i + 3] >= 128) out.push([d[i], d[i + 1], d[i + 2]]);
  }
  return out;
}
/** Every pixel of color `from` gets color `to`. Returns how many changed. */
export function replaceColor(img: Img, from: string, to: RGBA): number {
  const [r, g, b] = rgba(from), d = img.data;
  let n = 0;
  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] >= 128 && d[i] === r && d[i + 1] === g && d[i + 2] === b) { setPx(d, i, to); n++; }
  }
  return n;
}

/** Nearest palette color, cached per pixel color (photos repeat colors a lot). */
function nearestCache(palette: string[]): (r: number, g: number, b: number) => string {
  const labs: Lab[] = palette.map(c => Colors.toLab(rgbOf(c)));
  const cache = new Map<number, string>();
  return (r, g, b) => {
    const k = (r << 16) | (g << 8) | b;
    let c = cache.get(k);
    if (!c) { c = Colors.nearest([r, g, b], palette, labs); cache.set(k, c); }
    return c;
  };
}
/**
 * Gives every opaque pixel its nearest palette color (half-transparent pixels become fully transparent
 * or opaque). Works in place; returns pixels per color.
 */
export function quantize(img: Img, palette: string[]): Map<string, number> {
  const near = nearestCache(palette), rgbaOf = new Map(palette.map(c => [c, rgba(c)]));
  const counts = new Map<string, number>(), d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] < 128) { d[i + 3] = 0; continue; }
    const c = near(d[i], d[i + 1], d[i + 2]);
    setPx(d, i, rgbaOf.get(c));
    counts.set(c, (counts.get(c) || 0) + 1);
  }
  return counts;
}

export interface MosaicOptions {
  /** tile pitch in pixels, grout included */
  tile: number;
  /** grout width in pixels (part of each tile's pitch) */
  grout: number;
  /** grout color; null leaves the grout transparent */
  groutColor: string | null;
  /** tiles take the nearest of these colors; null keeps each tile's average color */
  palette: string[] | null;
  /** offset every other row by half a tile, like bricks */
  bricks?: boolean;
}
/**
 * Turns an image into square tiles with grout: every tile gets the average color of the pixels under it
 * (or the nearest palette color). Tiles that are mostly transparent stay empty. Returns a new image and the
 * number of tiles of each color.
 */
export function mosaic(src: Img, o: MosaicOptions): { img: Img; counts: Map<string, number>; tiles: number } {
  const { width: W, height: H } = src, s = src.data, out = makeImg(W, H), d = out.data;
  const T = Math.max(2, Math.round(o.tile)), G = Math.min(T - 1, Math.max(0, Math.round(o.grout)));
  const near = o.palette && o.palette.length ? nearestCache(o.palette) : null;
  const grout = rgba(o.groutColor);
  const counts = new Map<string, number>();
  let tiles = 0;
  for (let ty = 0, row = 0; ty < H; ty += T, row++) {
    const shift = o.bricks && row % 2 ? -Math.floor(T / 2) : 0;
    for (let tx = shift; tx < W; tx += T) {
      const x0 = Math.max(0, tx), x1 = Math.min(W, tx + T), y1 = Math.min(H, ty + T);
      // average over the tile without its grout
      let r = 0, g = 0, b = 0, n = 0, all = 0;
      for (let y = ty; y < y1 - (y1 === ty + T ? G : 0); y++) for (let x = x0; x < Math.min(x1, tx + T - G); x++) {
        const i = (y * W + x) * 4;
        all++;
        if (s[i + 3] < 128) continue;
        r += s[i]; g += s[i + 1]; b += s[i + 2]; n++;
      }
      const filled = n > 0 && n >= all / 2;
      let c: RGBA = [0, 0, 0, 0];
      if (filled) {
        r = Math.round(r / n); g = Math.round(g / n); b = Math.round(b / n);
        const name = near ? near(r, g, b) : hex(r, g, b);
        c = rgba(name);
        counts.set(name, (counts.get(name) || 0) + 1);
        tiles++;
      }
      for (let y = ty; y < y1; y++) for (let x = x0; x < x1; x++) {
        const inGrout = x >= tx + T - G || y >= ty + T - G;
        setPx(d, (y * W + x) * 4, inGrout ? (filled ? grout : [0, 0, 0, 0]) : c);
      }
    }
  }
  return { img: out, counts, tiles };
}

/**
 * Which of `colors` each pixel is (its nearest one), as indexes; -1 where (nearly) transparent.
 * Also counts the pixels of each color.
 */
export function classify(img: Img, colors: string[]): { grid: Int16Array; counts: number[] } {
  const near = nearestCache(colors), index = new Map(colors.map((c, i) => [c, i]));
  const n = img.width * img.height, grid = new Int16Array(n), counts = colors.map(() => 0), d = img.data;
  for (let p = 0, i = 0; p < n; p++, i += 4) {
    if (d[i + 3] < 128) { grid[p] = -1; continue; }
    const k = index.get(near(d[i], d[i + 1], d[i + 2]));
    grid[p] = k;
    counts[k]++;
  }
  return { grid, counts };
}

// ---- pieces: connected areas of one color (tiles) --------------------------------------------------------
export interface Pieces {
  /** piece number of every pixel, -1 where transparent */
  labels: Int32Array;
  /** color of each piece */
  colors: string[];
  /** pixels in each piece */
  sizes: number[];
}
/** Splits an image into pieces: areas of one color whose pixels touch side by side. */
export function pieces(img: Img): Pieces {
  const { width: W, height: H, data: d } = img, n = W * H;
  const labels = new Int32Array(n).fill(-1), colors: string[] = [], sizes: number[] = [];
  const key = (p: number) => (d[p * 4 + 3] < 128 ? -1 : (d[p * 4] << 16) | (d[p * 4 + 1] << 8) | d[p * 4 + 2]);
  const stack: number[] = [];
  for (let p = 0; p < n; p++) {
    if (labels[p] >= 0) continue;
    const k = key(p);
    if (k < 0) continue;
    const id = colors.length;
    let size = 0;
    labels[p] = id;
    stack.push(p);
    while (stack.length) {
      const q = stack.pop(), x = q % W;
      size++;
      for (const r of [x > 0 ? q - 1 : -1, x < W - 1 ? q + 1 : -1, q - W, q + W]) {
        if (r < 0 || r >= n || labels[r] >= 0 || key(r) !== k) continue;
        labels[r] = id;
        stack.push(r);
      }
    }
    colors.push(hex(k >> 16, (k >> 8) & 255, k & 255));
    sizes.push(size);
  }
  return { labels, colors, sizes };
}
/**
 * A spot well inside each piece, for its color number: the pixel farthest from the piece's edge
 * (chamfer distance, in pixels). Returns { x, y, r } per piece (pixel centre, distance to the edge).
 */
export function pieceCentres(p: Pieces, W: number, H: number): { x: number; y: number; r: number }[] {
  const L = p.labels, n = W * H, dist = new Float32Array(n);
  const edge = (i: number) => {
    const x = i % W, y = (i / W) | 0, l = L[i];
    return x === 0 || y === 0 || x === W - 1 || y === H - 1 || L[i - 1] !== l || L[i + 1] !== l || L[i - W] !== l || L[i + W] !== l;
  };
  for (let i = 0; i < n; i++) dist[i] = L[i] < 0 ? 0 : edge(i) ? 1 : 1e9;
  const D = Math.SQRT2;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x;
    if (dist[i] <= 1) continue;
    let v = dist[i];
    if (x > 0) v = Math.min(v, dist[i - 1] + 1);
    if (y > 0) v = Math.min(v, dist[i - W] + 1, x > 0 ? dist[i - W - 1] + D : 1e9, x < W - 1 ? dist[i - W + 1] + D : 1e9);
    dist[i] = v;
  }
  for (let y = H - 1; y >= 0; y--) for (let x = W - 1; x >= 0; x--) {
    const i = y * W + x;
    if (dist[i] <= 1) continue;
    let v = dist[i];
    if (x < W - 1) v = Math.min(v, dist[i + 1] + 1);
    if (y < H - 1) v = Math.min(v, dist[i + W] + 1, x < W - 1 ? dist[i + W + 1] + D : 1e9, x > 0 ? dist[i + W - 1] + D : 1e9);
    dist[i] = v;
  }
  const best = p.colors.map(() => ({ x: 0, y: 0, r: -1 }));
  for (let i = 0; i < n; i++) {
    const l = L[i];
    if (l >= 0 && dist[i] > best[l].r) best[l] = { x: (i % W) + 0.5, y: ((i / W) | 0) + 0.5, r: dist[i] };
  }
  return best;
}
/** The borders between pieces (and around them) as SVG path data, in pixel units, merged into long runs. */
export function pieceOutlines(p: Pieces, W: number, H: number): string {
  const L = p.labels, at = (x: number, y: number) => (x < 0 || y < 0 || x >= W || y >= H ? -1 : L[y * W + x]);
  const out: string[] = [];
  for (let y = 0; y <= H; y++) {
    for (let x = 0; x < W;) {
      const a = at(x, y - 1), b = at(x, y);
      if (a === b) { x++; continue; }
      const x0 = x;
      while (x < W && at(x, y - 1) !== at(x, y)) x++;
      out.push(`M${x0} ${y}H${x}`);
    }
  }
  for (let x = 0; x <= W; x++) {
    for (let y = 0; y < H;) {
      const a = at(x - 1, y), b = at(x, y);
      if (a === b) { y++; continue; }
      const y0 = y;
      while (y < H && at(x - 1, y) !== at(x, y)) y++;
      out.push(`M${x} ${y0}V${y}`);
    }
  }
  return out.join('');
}
