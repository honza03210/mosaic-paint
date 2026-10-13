/* Getting pictures in and out of the AI models: resizing, the number layout each model expects (planes of
   normalized floats), and turning their outputs back into masks and depth at the picture's size. Pure
   functions on arrays, so the same code runs in the AI worker and in tests (with the real models). */

export interface Rgba { width: number; height: number; data: Uint8ClampedArray | Uint8Array }

/** Resized RGBA: averaging when it gets smaller (no shimmering), bilinear when it gets bigger. */
export function resize(img: Rgba, W: number, H: number): Uint8ClampedArray {
  const { width: w, height: h, data } = img, out = new Uint8ClampedArray(W * H * 4);
  const sx = w / W, sy = h / H;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const o = (y * W + x) * 4;
      if (sx > 1 || sy > 1) {
        // the source pixels this one covers
        const x0 = Math.floor(x * sx), x1 = Math.max(x0 + 1, Math.min(w, Math.floor((x + 1) * sx)));
        const y0 = Math.floor(y * sy), y1 = Math.max(y0 + 1, Math.min(h, Math.floor((y + 1) * sy)));
        const acc = [0, 0, 0, 0];
        for (let yy = y0; yy < y1; yy++) for (let xx = x0; xx < x1; xx++) { const i = (yy * w + xx) * 4; acc[0] += data[i]; acc[1] += data[i + 1]; acc[2] += data[i + 2]; acc[3] += data[i + 3]; }
        const n = (x1 - x0) * (y1 - y0);
        for (let c = 0; c < 4; c++) out[o + c] = acc[c] / n;
      } else {
        const fx = Math.max(0, (x + 0.5) * sx - 0.5), fy = Math.max(0, (y + 0.5) * sy - 0.5);
        const xa = Math.min(w - 1, Math.floor(fx)), ya = Math.min(h - 1, Math.floor(fy)), xb = Math.min(w - 1, xa + 1), yb = Math.min(h - 1, ya + 1);
        const tx = fx - xa, ty = fy - ya;
        for (let c = 0; c < 4; c++) {
          const a = data[(ya * w + xa) * 4 + c] * (1 - tx) + data[(ya * w + xb) * 4 + c] * tx;
          const b = data[(yb * w + xa) * 4 + c] * (1 - tx) + data[(yb * w + xb) * 4 + c] * tx;
          out[o + c] = a * (1 - ty) + b * ty;
        }
      }
    }
  }
  return out;
}

/** RGB planes (channel, row, column) of floats: (value / 255 − mean) / std; transparent pixels count as white. */
export function toPlanes(rgba: Uint8ClampedArray | Uint8Array, w: number, h: number, mean: number[], std: number[], padW = w, padH = h): Float32Array {
  const out = new Float32Array(3 * padW * padH);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 4, a = rgba[i + 3] / 255, o = y * padW + x;
    for (let c = 0; c < 3; c++) out[c * padW * padH + o] = ((rgba[i + c] * a + 255 * (1 - a)) / 255 - mean[c]) / std[c];
  }
  return out;
}

/** Samples a float plane (W × H) bilinearly at (u, v) in its pixel units. */
function sample(p: Float32Array | Float64Array | number[], W: number, H: number, u: number, v: number): number {
  const fx = Math.min(W - 1, Math.max(0, u - 0.5)), fy = Math.min(H - 1, Math.max(0, v - 0.5));
  const x0 = Math.floor(fx), y0 = Math.floor(fy), x1 = Math.min(W - 1, x0 + 1), y1 = Math.min(H - 1, y0 + 1), tx = fx - x0, ty = fy - y0;
  return (p[y0 * W + x0] * (1 - tx) + p[y0 * W + x1] * tx) * (1 - ty) + (p[y1 * W + x0] * (1 - tx) + p[y1 * W + x1] * tx) * ty;
}

export const IMAGENET = { mean: [0.485, 0.456, 0.406], std: [0.229, 0.224, 0.225] };

// ---- background removal --------------------------------------------------------------------------------------
/** MODNet's input: shortest side 512, both sides multiples of 32, values −1…1. */
export function modnetInput(img: Rgba): { pixels: Float32Array; w: number; h: number } {
  const s = 512 / Math.min(img.width, img.height);
  const w = Math.max(32, Math.round(img.width * s / 32) * 32), h = Math.max(32, Math.round(img.height * s / 32) * 32);
  return { pixels: toPlanes(resize(img, w, h), w, h, [0.5, 0.5, 0.5], [0.5, 0.5, 0.5]), w, h };
}
/** U²-Netp's input: 320 × 320 (squeezed, as it was trained), ImageNet-normalized. */
export function u2netInput(img: Rgba): Float32Array {
  return toPlanes(resize(img, 320, 320), 320, 320, IMAGENET.mean, IMAGENET.std);
}
/** A model's matte (W × H) at the picture's size, 0…255; stretch: its own range becomes 0…1 first. */
export function matteToAlpha(m: Float32Array | number[], W: number, H: number, w: number, h: number, stretch = false): Uint8Array {
  let lo = 0, k = 1;
  if (stretch) {
    let hi = -Infinity;
    lo = Infinity;
    for (const v of m) { if (v < lo) lo = v; if (v > hi) hi = v; }
    k = hi > lo ? 1 / (hi - lo) : 1;
  }
  const out = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const v = (sample(m, W, H, (x + 0.5) * W / w, (y + 0.5) * H / h) - lo) * k;
    out[y * w + x] = Math.round(Math.min(1, Math.max(0, v)) * 255);
  }
  return out;
}

// ---- depth ------------------------------------------------------------------------------------------------------
/** Depth Anything's input: about 518 on each side, keeping the proportions, multiples of 14. */
export function depthInput(img: Rgba): { pixels: Float32Array; w: number; h: number } {
  // the scale nearest 1 of the two (the DPT rule), then rounded to multiples of 14
  let sw = 518 / img.width, sh = 518 / img.height;
  if (Math.abs(1 - sw) < Math.abs(1 - sh)) sh = sw; else sw = sh;
  const w = Math.max(14, Math.round(img.width * sw / 14) * 14), h = Math.max(14, Math.round(img.height * sh / 14) * 14);
  return { pixels: toPlanes(resize(img, w, h), w, h, IMAGENET.mean, IMAGENET.std), w, h };
}
/** The predicted (relative, near = big) depth at the picture's size, stretched to 0 (far) … 1 (near). */
export function depthOut(d: Float32Array, W: number, H: number, w: number, h: number): Float32Array {
  let lo = Infinity, hi = -Infinity;
  for (const v of d) { if (v < lo) lo = v; if (v > hi) hi = v; }
  const out = new Float32Array(w * h), k = hi > lo ? 1 / (hi - lo) : 0;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) out[y * w + x] = (sample(d, W, H, (x + 0.5) * W / w, (y + 0.5) * H / h) - lo) * k;
  return out;
}

// ---- object removal (MI-GAN) ---------------------------------------------------------------------------------------
/** MI-GAN's inputs: the picture as bytes in planes, and its mask: 255 keep, 0 fill. */
export function miganInput(img: Rgba, hole: Uint8Array): { image: Uint8Array; mask: Uint8Array } {
  const n = img.width * img.height, image = new Uint8Array(3 * n), mask = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    for (let c = 0; c < 3; c++) image[c * n + i] = img.data[i * 4 + c];
    mask[i] = hole[i] > 127 ? 0 : 255;
  }
  return { image, mask };
}
/** MI-GAN's result (planes) back as RGBA, opaque. */
export function miganOut(res: Uint8Array, w: number, h: number): Uint8ClampedArray<ArrayBuffer> {
  const n = w * h, out = new Uint8ClampedArray(n * 4);
  for (let i = 0; i < n; i++) { out[i * 4] = res[i]; out[i * 4 + 1] = res[n + i]; out[i * 4 + 2] = res[2 * n + i]; out[i * 4 + 3] = 255; }
  return out;
}

// ---- MobileSAM (the phone-friendly Segment Anything) ----------------------------------------------------------
/** MobileSAM's encoder takes the picture itself: longest side 1024, RGB 0…255, rows × columns × 3 (it
    normalizes and pads inside). scale: picture → model pixels. */
export function mobileSamInput(img: Rgba): { pixels: Float32Array; w: number; h: number; scale: number } {
  const scale = 1024 / Math.max(img.width, img.height), w = Math.max(1, Math.round(img.width * scale)), h = Math.max(1, Math.round(img.height * scale));
  const small = resize(img, w, h), pixels = new Float32Array(w * h * 3);
  for (let i = 0; i < w * h; i++) {
    const a = small[i * 4 + 3] / 255;
    for (let c = 0; c < 3; c++) pixels[i * 3 + c] = small[i * 4 + c] * a + 255 * (1 - a);
  }
  return { pixels, w, h, scale };
}
/** The decoder's points: in model pixels, with SAM's padding point (label −1) when there is no box. */
export function mobileSamPoints(points: { x: number; y: number; label: number }[], scale: number): { coords: Float32Array; labels: Float32Array } {
  const n = points.length + 1, coords = new Float32Array(n * 2), labels = new Float32Array(n);
  points.forEach((p, i) => { coords[i * 2] = p.x * scale; coords[i * 2 + 1] = p.y * scale; labels[i] = p.label; });
  labels[n - 1] = -1;
  return { coords, labels };
}
/** The best of the decoder's masks (they come at the picture's size, as logits): 0 or 255 per pixel. */
export function mobileSamMask(masks: Float32Array, scores: Float32Array, w: number, h: number): Uint8Array {
  let best = 0;
  for (let k = 1; k < scores.length; k++) if (scores[k] > scores[best]) best = k;
  const plane = masks.subarray(best * w * h, (best + 1) * w * h), out = new Uint8Array(w * h);
  for (let i = 0; i < out.length; i++) out[i] = plane[i] > 0 ? 255 : 0;
  return out;
}
