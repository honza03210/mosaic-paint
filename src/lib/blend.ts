/* The Blur and Noise brushes' pictures: the whole image blurred, or with grain added – the brush then shows
   them where it paints. Pure functions on RGBA arrays (tests run them in Node). */
import { blurPlane } from './adjust.ts';

/**
 * A soft blur (close to a Gaussian, about r px wide). Done on premultiplied colors: transparent pixels don't
 * darken the edges, and the edge of a cut-out gets soft too.
 */
export function blurRGBA(d: Uint8ClampedArray, w: number, h: number, r: number): Uint8ClampedArray {
  const n = w * h, planes = [0, 1, 2, 3].map(() => new Float32Array(n));
  for (let i = 0; i < n; i++) {
    const a = d[i * 4 + 3] / 255;
    planes[0][i] = d[i * 4] * a;
    planes[1][i] = d[i * 4 + 1] * a;
    planes[2][i] = d[i * 4 + 2] * a;
    planes[3][i] = d[i * 4 + 3];
  }
  const [R, G, B, A] = planes.map(p => blurPlane(p, w, h, r));
  const out = new Uint8ClampedArray(d.length);
  for (let i = 0; i < n; i++) {
    const a = A[i] / 255;
    out[i * 4 + 3] = A[i];
    if (a > 1e-4) {
      out[i * 4] = R[i] / a;
      out[i * 4 + 1] = G[i] / a;
      out[i * 4 + 2] = B[i] / a;
    }
  }
  return out;
}

/** Repeatable random numbers (mulberry32). */
function random(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Grain, like a photo's: amount 0–100 (about ±amount·0.6 levels, bell-shaped), the same for red, green and blue
 * (like film grain) or each its own (colored). Transparent pixels stay as they are.
 */
export function noiseRGBA(d: Uint8ClampedArray, w: number, h: number, amount: number, colored: boolean, seed = 1): Uint8ClampedArray {
  const out = new Uint8ClampedArray(d), rnd = random(seed), k = amount * 0.6 * 2;
  // three uniform numbers added up: close to a bell curve, with a standard deviation of about amount·0.6
  const g = () => (rnd() + rnd() + rnd() - 1.5) * k;
  for (let i = 0; i < w * h; i++) {
    if (!d[i * 4 + 3]) continue;
    if (colored) {
      out[i * 4] = d[i * 4] + g();
      out[i * 4 + 1] = d[i * 4 + 1] + g();
      out[i * 4 + 2] = d[i * 4 + 2] + g();
    } else {
      const v = g();
      out[i * 4] = d[i * 4] + v;
      out[i * 4 + 1] = d[i * 4 + 1] + v;
      out[i * 4 + 2] = d[i * 4 + 2] + v;
    }
  }
  return out;
}
