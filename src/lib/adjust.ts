/* Photo fixes on RGBA pixels: noise removal, levels (black point, white point, midtones), brightness,
   contrast, saturation and sharpening. Pure functions on plain arrays, so they run in the worker and in
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
}
export const NO_ADJUST: Adjust = { brightness: 0, contrast: 0, saturation: 0, black: 0, white: 255, gamma: 1, sharpen: 0, denoise: 0 };
export const isNoAdjust = (a: Adjust): boolean => (Object.keys(NO_ADJUST) as (keyof Adjust)[]).every(k => a[k] === NO_ADJUST[k]);

/** The tone curve for one channel value: levels, then brightness and contrast. */
export function toneLUT(a: Adjust): Uint8ClampedArray {
  const lut = new Uint8ClampedArray(256), lo = Math.min(a.black, a.white - 1), hi = Math.max(a.white, lo + 1);
  const c = a.contrast / 100, k = c >= 0 ? 1 / Math.max(0.01, 1 - c) : 1 + c, b = a.brightness / 100 * 255;
  for (let v = 0; v < 256; v++) {
    let x = Math.min(1, Math.max(0, (v - lo) / (hi - lo)));
    x = Math.pow(x, 1 / a.gamma) * 255;
    x = (x - 128) * k + 128 + b;
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
  const lut = toneLUT(a), s = 1 + a.saturation / 100;
  for (let i = 0; i < out.length; i += 4) {
    let r = lut[out[i]], g = lut[out[i + 1]], b = lut[out[i + 2]];
    if (s !== 1) {
      const l = 0.299 * r + 0.587 * g + 0.114 * b;
      r = l + (r - l) * s; g = l + (g - l) * s; b = l + (b - l) * s;
    }
    out[i] = r; out[i + 1] = g; out[i + 2] = b;
  }
  if (a.sharpen > 0) sharpen(out, w, h, a.sharpen);
  return out;
}
