/* Healing: the texture of a copied patch, in the colors and light of the place it is put. The patch's
   own low frequencies (its overall color and shading) are swapped for those around the healed spot –
   taken only from outside the painted mask, so the blemish being covered doesn't tint the result – and the
   patch's own are taken only from inside it (the part actually copied), so what lies beside it doesn't
   count as its texture. */
import { blurPlane } from './adjust.ts';

/**
 * dst: the picture (RGBA, w × h); src: the copied patch, aligned with dst (RGBA, w × h); mask: how much
 * of each pixel is painted (0…255). r: the size of the "light and color" blur. Returns the healed RGBA:
 * dst outside the mask, the healed patch inside (blended by the mask).
 */
export function heal(dst: Uint8ClampedArray, src: Uint8ClampedArray, mask: Uint8ClampedArray | Uint8Array, w: number, h: number, r: number): Uint8ClampedArray<ArrayBuffer> {
  const n = w * h, out = new Uint8ClampedArray(dst);
  const keep = new Float32Array(n), use = new Float32Array(n);
  for (let i = 0; i < n; i++) { use[i] = mask[i] / 255; keep[i] = 1 - use[i]; }
  // the surroundings' color from outside the mask, the patch's from inside it (normalized blurs)
  const wsum = blurPlane(keep, w, h, r), usum = blurPlane(use, w, h, r);
  for (let c = 0; c < 3; c++) {
    const d = new Float32Array(n), s = new Float32Array(n);
    for (let i = 0; i < n; i++) { d[i] = dst[i * 4 + c] * keep[i]; s[i] = src[i * 4 + c] * use[i]; }
    const bd = blurPlane(d, w, h, r), bs = blurPlane(s, w, h, r);
    for (let i = 0; i < n; i++) {
      const m = mask[i] / 255;
      if (!m) continue;
      const own = bs[i] / Math.max(usum[i], 1e-3), around = wsum[i] > 1e-3 ? bd[i] / wsum[i] : own;
      const v = src[i * 4 + c] + (around - own);
      out[i * 4 + c] = dst[i * 4 + c] + (v - dst[i * 4 + c]) * m;
    }
  }
  return out;
}
