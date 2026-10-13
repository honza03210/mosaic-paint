/* Photo fixes on RGBA pixels: noise removal, levels (black point, white point, midtones), brightness,
   contrast, shadows, highlights, fade, warmth, tint, saturation, vibrance, vignette and sharpening. Pure functions on plain arrays, so they run in the worker and in
   tests. Transparent pixels keep their alpha. */

export interface Adjust {
  /** -100…100 */
  brightness: number;
  contrast: number;
  saturation: number;
  /** levels: input black and white points (0…255) and the midtones (gamma, 0.1…10; 1 = unchanged) */
  black: number;
  white: number;
  gamma: number;
  /** 0…100: how much the unsharp mask adds */
  sharpen: number;
  /** 0…100: how strongly noise is smoothed (edges are kept) */
  denoise: number;
  /** −100…100: the dark tones lighter (or darker), the light tones darker (or lighter) */
  shadows: number;
  highlights: number;
  /** 0…100: a matte look – black lifted, contrast softened */
  fade: number;
  /** −100…100: cooler (blue) … warmer (yellow); green … magenta */
  warmth: number;
  tint: number;
  /** −100…100: saturation that boosts the dull colors more than the vivid ones (skin stays natural) */
  vibrance: number;
  /** −100…100: the corners darker (or lighter) */
  vignette: number;
}
export const NO_ADJUST: Adjust = {
  brightness: 0, contrast: 0, saturation: 0, black: 0, white: 255, gamma: 1, sharpen: 0, denoise: 0,
  shadows: 0, highlights: 0, fade: 0, warmth: 0, tint: 0, vibrance: 0, vignette: 0,
};
export const isNoAdjust = (a: Adjust): boolean => (Object.keys(NO_ADJUST) as (keyof Adjust)[]).every(k => a[k] === NO_ADJUST[k]);

/** The tone curve for one channel value: levels, brightness and contrast, shadows and highlights, fade. */
export function toneLUT(a: Adjust): Uint8ClampedArray {
  const lut = new Uint8ClampedArray(256), lo = Math.min(a.black, a.white - 1), hi = Math.max(a.white, lo + 1);
  const c = a.contrast / 100, k = c >= 0 ? 1 / Math.max(0.01, 1 - c) : 1 + c, b = a.brightness / 100 * 255;
  for (let v = 0; v < 256; v++) {
    let x = Math.min(1, Math.max(0, (v - lo) / (hi - lo)));
    x = Math.pow(x, 1 / a.gamma) * 255;
    x = (x - 128) * k + 128 + b;
    // shadows and highlights: bumps that are strongest a third and two thirds of the way up (ends stay put)
    const y = Math.min(1, Math.max(0, x / 255)), bump = 27 / 4;
    x += 255 * 0.25 * bump * ((a.shadows / 100) * y * (1 - y) * (1 - y) + (a.highlights / 100) * y * y * (1 - y));
    // fade: black lifted, the range squeezed a little
    const f = a.fade / 100;
    if (f) x = 255 * f * 0.14 + x * (1 - f * 0.22);
    lut[v] = Math.round(x);
  }
  return lut;
}

/** Black and white points that stretch the picture to the full range (ignoring the darkest and lightest 0.5 %). */
export function autoLevels(data: Uint8ClampedArray | Uint8Array): { black: number; white: number } {
  const hist = new Uint32Array(256);
  let n = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 128) continue;
    hist[Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2])]++;
    n++;
  }
  if (!n) return { black: 0, white: 255 };
  const cut = n * 0.005;
  let black = 0, white = 255, s = 0;
  for (; black < 255; black++) { s += hist[black]; if (s > cut) break; }
  s = 0;
  for (; white > 0; white--) { s += hist[white]; if (s > cut) break; }
  return white - black < 8 ? { black: 0, white: 255 } : { black, white };
}

/** Box blur of one channel plane (w × h), radius r, done three times (close to a Gaussian). */
export function blurPlane(src: Float32Array, w: number, h: number, r: number): Float32Array {
  const a = Float32Array.from(src), b = new Float32Array(a.length);
  r = Math.max(1, Math.round(r));
  for (let pass = 0; pass < 3; pass++) {
    for (let y = 0; y < h; y++) {
      // across: a running sum, the edges repeated
      const row = y * w;
      let sum = 0;
      for (let i = -r; i <= r; i++) sum += a[row + Math.min(w - 1, Math.max(0, i))];
      for (let x = 0; x < w; x++) {
        b[row + x] = sum / (2 * r + 1);
        sum += a[row + Math.min(w - 1, x + r + 1)] - a[row + Math.max(0, x - r)];
      }
    }
    for (let x = 0; x < w; x++) {
      let sum = 0;
      for (let i = -r; i <= r; i++) sum += b[Math.min(h - 1, Math.max(0, i)) * w + x];
      for (let y = 0; y < h; y++) {
        a[y * w + x] = sum / (2 * r + 1);
        sum += b[Math.min(h - 1, y + r + 1) * w + x] - b[Math.max(0, y - r) * w + x];
      }
    }
  }
  return a;
}

function planes(data: Uint8ClampedArray | Uint8Array, n: number): Float32Array[] {
  const p = [new Float32Array(n), new Float32Array(n), new Float32Array(n)];
  for (let i = 0; i < n; i++) { p[0][i] = data[i * 4]; p[1][i] = data[i * 4 + 1]; p[2][i] = data[i * 4 + 2]; }
  return p;
}

/** Edge-keeping smoothing: each pixel moves towards its blurred neighbourhood only where that is close to it. */
function denoise(out: Uint8ClampedArray, w: number, h: number, strength: number): void {
  const n = w * h, p = planes(out, n), r = 1 + Math.round(strength / 40), sigma = 6 + strength * 0.4;
  const blur = p.map(c => blurPlane(c, w, h, r));
  for (let i = 0; i < n; i++) {
    const d = Math.hypot(p[0][i] - blur[0][i], p[1][i] - blur[1][i], p[2][i] - blur[2][i]);
    // close to the neighbourhood: noise, smoothed; far: an edge or detail, kept
    const k = (strength / 100) * Math.exp(-(d * d) / (2 * sigma * sigma));
    for (let c = 0; c < 3; c++) out[i * 4 + c] = p[c][i] + (blur[c][i] - p[c][i]) * k;
  }
}

/** Unsharp mask: the difference from a slightly blurred copy, added back. */
function sharpen(out: Uint8ClampedArray, w: number, h: number, amount: number): void {
  const n = w * h, p = planes(out, n), k = amount / 100 * 1.5;
  const blur = p.map(c => blurPlane(c, w, h, 1));
  for (let i = 0; i < n; i++) for (let c = 0; c < 3; c++) out[i * 4 + c] = p[c][i] + (p[c][i] - blur[c][i]) * k;
}

/** The adjusted pixels (a new array; alpha unchanged). */
export function applyAdjust(data: Uint8ClampedArray | Uint8Array, w: number, h: number, a: Adjust): Uint8ClampedArray<ArrayBuffer> {
  const out = new Uint8ClampedArray(data);
  if (a.denoise > 0) denoise(out, w, h, a.denoise);
  const lut = toneLUT(a), s = 1 + a.saturation / 100, vib = a.vibrance / 100, warm = a.warmth / 100 * 28, tint = a.tint / 100 * 22;
  const vg = a.vignette / 100, cx = w / 2, cy = h / 2, rmax = Math.hypot(cx, cy) || 1;
  for (let i = 0, p = 0; i < out.length; i += 4, p++) {
    let r = lut[out[i]], g = lut[out[i + 1]], b = lut[out[i + 2]];
    // warmth: red up and blue down (or back); tint: magenta (green down) or green
    if (warm) { r += warm; b -= warm; }
    if (tint) { g -= tint; r += tint / 2; b += tint / 2; }
    if (s !== 1) {
      const l = 0.299 * r + 0.587 * g + 0.114 * b;
      r = l + (r - l) * s; g = l + (g - l) * s; b = l + (b - l) * s;
    }
    if (vib) {
      // more for the dull colors: how saturated it is already holds it back
      const mx = Math.max(r, g, b), mn = Math.min(r, g, b), sat = mx > 0 ? (mx - mn) / mx : 0, k = 1 + vib * (1 - sat);
      const l = 0.299 * r + 0.587 * g + 0.114 * b;
      r = l + (r - l) * k; g = l + (g - l) * k; b = l + (b - l) * k;
    }
    if (vg) {
      // from the middle out: nothing in the inner part, most in the corners
      const x = p % w, y = (p - x) / w, d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy) / rmax, e = Math.max(0, (d - 0.35) / 0.65), m = e * e * (3 - 2 * e);
      const f = vg > 0 ? 1 - 0.65 * vg * m : 1, add = vg < 0 ? -vg * m * 0.65 : 0;
      r = r * f + (255 - r) * add; g = g * f + (255 - g) * add; b = b * f + (255 - b) * add;
    }
    out[i] = r; out[i + 1] = g; out[i + 2] = b;
  }
  if (a.sharpen > 0) sharpen(out, w, h, a.sharpen);
  return out;
}
