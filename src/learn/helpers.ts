/* What the tasks share: starting pictures drawn in code (exact, so the checks can trust them), reading the
   picture back, and forgiving comparisons ("most of the star is yellow" is done). */
import type { Box, Ctx } from './types.ts';

export type RGB = [number, number, number];
export const rgb = (hex: string): RGB => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16)) as RGB;
/** How far apart two colors are (0 = the same, ~442 = black and white). */
export const dist = (a: RGB, b: RGB): number => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

/** The color at an image pixel ([r, g, b] and alpha 0…255) – of the image as it is now. */
export function px(c: Ctx, x: number, y: number): { c: RGB; a: number } {
  const hex = c.RZ.colorAt(x, y);
  return { c: hex ? rgb(hex) : [0, 0, 0], a: c.RZ.alphaAt(x, y) };
}
/** The pixel is (about) this color and not see-through. */
export const isColor = (c: Ctx, x: number, y: number, hex: string, tol = 40): boolean => { const p = px(c, x, y); return p.a > 200 && dist(p.c, rgb(hex)) <= tol; };
/** The share (0…1) of points for which test is true. */
export const share = (pts: [number, number][], test: (x: number, y: number) => boolean): number => pts.filter(([x, y]) => test(x, y)).length / Math.max(1, pts.length);
/** Points on a ring (n of them) and in a grid over a box – to sample a shape. */
export const ring = (cx: number, cy: number, r: number, n = 8): [number, number][] => Array.from({ length: n }, (_, i) => [cx + r * Math.cos(i * 2 * Math.PI / n), cy + r * Math.sin(i * 2 * Math.PI / n)] as [number, number]);
export function grid(b: Box, n = 6, inside: (x: number, y: number) => boolean = () => true): [number, number][] {
  const out: [number, number][] = [];
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const x = b.x + (i + 0.5) * b.w / n, y = b.y + (j + 0.5) * b.h / n;
    if (inside(x, y)) out.push([x, y]);
  }
  return out;
}
/** The box around some points, grown by pad. */
export const around = (pts: [number, number][], pad: number): Box => {
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  return { x: Math.min(...xs) - pad, y: Math.min(...ys) - pad, w: Math.max(...xs) - Math.min(...xs) + 2 * pad, h: Math.max(...ys) - Math.min(...ys) + 2 * pad };
};

/** A starting picture: drawn into a canvas of the editor's page, opened as the image (a fresh history). */
export function picture(c: Ctx, w: number, h: number, draw: (x: CanvasRenderingContext2D) => void): void {
  const cv = c.d.createElement('canvas');
  cv.width = w;
  cv.height = h;
  const x = cv.getContext('2d');
  draw(x);
  c.RZ.loadPicture(cv);
  c.RZ.setMode('simple');
}
/** A dashed circle – "paint here" – in white over a dark line, so it shows on any color. */
export function dashedCircle(x: CanvasRenderingContext2D, cx: number, cy: number, r: number): void {
  x.save();
  x.lineWidth = 2;
  x.setLineDash([6, 5]);
  x.strokeStyle = 'rgba(255,255,255,.9)';
  x.beginPath();
  x.arc(cx, cy, r, 0, Math.PI * 2);
  x.stroke();
  x.restore();
}
export function dashedPath(x: CanvasRenderingContext2D, pts: [number, number][], closed = true, color = 'rgba(40,40,40,.85)'): void {
  x.save();
  x.lineWidth = 2;
  x.setLineDash([6, 5]);
  x.strokeStyle = color;
  x.beginPath();
  pts.forEach(([a, b], i) => (i ? x.lineTo(a, b) : x.moveTo(a, b)));
  if (closed) x.closePath();
  x.stroke();
  x.restore();
}
/** A dot to aim at: white with a dark ring. */
export function dot(x: CanvasRenderingContext2D, cx: number, cy: number, r = 6): void {
  x.fillStyle = '#ffffff';
  x.strokeStyle = '#1d1d24';
  x.lineWidth = 2;
  x.beginPath();
  x.arc(cx, cy, r, 0, Math.PI * 2);
  x.fill();
  x.stroke();
}
/** A palette swatch by its color (the swatch's label starts "#n #rrggbb"). */
export const swatch = (hex: string) => (c: Ctx): Element | null =>
  [...c.d.querySelectorAll('#palette .swatch')].find(s => (s.getAttribute('aria-label') || '').includes(hex)) || null;
/** Counts clicks on a button (some steps are done by pressing it). */
export function clicks(c: Ctx, sel: string, key: string): void {
  c.mem[key] = 0;
  c.d.addEventListener('click', (e) => { if ((e.target as Element)?.closest?.(sel)) c.mem[key]++; }, true);
}
/** Random numbers that are the same every time (the pictures don't change between tries). */
export function seeded(seed: number): () => number {
  let s = seed >>> 0;
  return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
