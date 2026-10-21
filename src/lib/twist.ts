/* Twist (twirl): the pixels around a centre turned about it – by the full angle at the centre, less and less
   further out, not at all at the edge of the circle – so the picture swirls. Pure functions on RGBA arrays. */

export interface Box { x: number; y: number; w: number; h: number }

/** How much of the angle a point at distance d gets (r: the circle's radius): smooth, 1 at the centre, 0 at the edge. */
export const falloff = (d: number, r: number): number => { const t = Math.max(0, 1 - d / r); return t * t; };

/**
 * The twisted pixels around (cx, cy) within radius r, angle in radians (clockwise on screen at the centre),
 * read from src (W × H, RGBA) – smoothly in between pixels, transparency included. mask (W × H, 0–255): only
 * as much as it says. Returns the changed box (inside the image) and its pixels; null when nothing is inside.
 */
export function twist(src: Uint8ClampedArray, W: number, H: number, cx: number, cy: number, r: number, angle: number, mask: Uint8Array | null = null): { box: Box; data: Uint8ClampedArray } | null {
  const x0 = Math.max(0, Math.floor(cx - r)), y0 = Math.max(0, Math.floor(cy - r));
  const x1 = Math.min(W, Math.ceil(cx + r)), y1 = Math.min(H, Math.ceil(cy + r));
  if (x1 <= x0 || y1 <= y0 || r <= 0) return null;
  const w = x1 - x0, h = y1 - y0, out = new Uint8ClampedArray(w * h * 4);
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const o = ((y - y0) * w + (x - x0)) * 4, i = (y * W + x) * 4;
      const px = x + 0.5 - cx, py = y + 0.5 - cy, d = Math.hypot(px, py);
      const m = mask ? mask[y * W + x] / 255 : 1;
      if (d >= r || !m) { out[o] = src[i]; out[o + 1] = src[i + 1]; out[o + 2] = src[i + 2]; out[o + 3] = src[i + 3]; continue; }
      // where this pixel's colour comes from: turned back by its share of the angle
      const a = -angle * falloff(d, r), c = Math.cos(a), s = Math.sin(a);
      const sx = cx + px * c - py * s - 0.5, sy = cy + px * s + py * c - 0.5;
      // between the four nearest pixels, weighted by their opacity (no dark fringes)
      const fx = Math.floor(sx), fy = Math.floor(sy), tx = sx - fx, ty = sy - fy;
      let R = 0, G = 0, B = 0, A = 0;
      for (let k = 0; k < 4; k++) {
        const qx = Math.min(W - 1, Math.max(0, fx + (k & 1))), qy = Math.min(H - 1, Math.max(0, fy + (k >> 1)));
        const wgt = ((k & 1) ? tx : 1 - tx) * ((k >> 1) ? ty : 1 - ty), j = (qy * W + qx) * 4, al = src[j + 3] * wgt;
        R += src[j] * al; G += src[j + 1] * al; B += src[j + 2] * al; A += al;
      }
      const tr = A ? R / A : 0, tg = A ? G / A : 0, tb = A ? B / A : 0;
      out[o] = src[i] + (tr - src[i]) * m;
      out[o + 1] = src[i + 1] + (tg - src[i + 1]) * m;
      out[o + 2] = src[i + 2] + (tb - src[i + 2]) * m;
      out[o + 3] = src[i + 3] + (A - src[i + 3]) * m;
    }
  }
  return { box: { x: x0, y: y0, w, h }, data: out };
}
