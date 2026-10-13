/* Content-aware fill: the hole is filled with patches of the picture around it (PatchMatch: for every patch
   in the hole, the most similar patch outside it is found by random search and passing good matches on to
   neighbours; then every hole pixel becomes the average of what the patches covering it say). Worked from
   a small copy up to full size, so large holes get their overall structure first. Pure, for the worker. */
import type { Img } from './raster.ts';

const P = 3; // patch radius: 7 × 7 patches

interface Level { w: number; h: number; px: Float32Array; hole: Uint8Array }

function downscale(l: Level): Level {
  const w = Math.max(1, Math.floor(l.w / 2)), h = Math.max(1, Math.floor(l.h / 2));
  const px = new Float32Array(w * h * 3), hole = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    let n = 0, s0 = 0, s1 = 0, s2 = 0, holes = 0;
    for (let dy = 0; dy < 2; dy++) for (let dx = 0; dx < 2; dx++) {
      const sx = Math.min(l.w - 1, 2 * x + dx), sy = Math.min(l.h - 1, 2 * y + dy), i = sy * l.w + sx;
      if (l.hole[i]) { holes++; continue; }
      s0 += l.px[i * 3]; s1 += l.px[i * 3 + 1]; s2 += l.px[i * 3 + 2]; n++;
    }
    const j = y * w + x;
    // a pixel is a hole as soon as any of its four is (the hole never shrinks away when scaling down)
    if (holes) hole[j] = 1;
    if (n) { px[j * 3] = s0 / n; px[j * 3 + 1] = s1 / n; px[j * 3 + 2] = s2 / n; }
  }
  return { w, h, px, hole };
}

/** Rough first fill: the hole grows inwards from its edge, each pixel the average of its known neighbours. */
function onionFill(l: Level): void {
  const { w, h, px } = l, known = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) known[i] = l.hole[i] ? 0 : 1;
  let left = w * h - known.reduce((a, b) => a + b, 0);
  while (left > 0) {
    const next: number[] = [];
    for (let i = 0; i < w * h; i++) {
      if (known[i]) continue;
      const x = i % w, y = (i - x) / w;
      let n = 0, s0 = 0, s1 = 0, s2 = 0;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        const j = ny * w + nx;
        if (!known[j]) continue;
        s0 += px[j * 3]; s1 += px[j * 3 + 1]; s2 += px[j * 3 + 2]; n++;
      }
      if (n) { px[i * 3] = s0 / n; px[i * 3 + 1] = s1 / n; px[i * 3 + 2] = s2 / n; next.push(i); }
    }
    if (!next.length) break; // a picture that is all hole
    for (const i of next) known[i] = 1;
    left -= next.length;
  }
}

/** Seeded random numbers, so a fill comes out the same every time. */
function rng(seed: number): () => number {
  let s = seed >>> 0 || 1;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

/** Fills the hole of one level, starting from nnf (the matches carried up from the level below, or none). */
function solve(l: Level, nnf: Int32Array | null, iterations: number, rand: () => number): Int32Array {
  const { w, h, px, hole } = l;
  // where a patch may be taken from: fully inside the picture and with no hole in it
  const valid: number[] = [], isValid = new Uint8Array(w * h);
  // the hole's pixels near each pixel, to rule out patches touching it (a summed-area table)
  const sat = new Int32Array((w + 1) * (h + 1));
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) sat[(y + 1) * (w + 1) + x + 1] = hole[y * w + x] + sat[y * (w + 1) + x + 1] + sat[(y + 1) * (w + 1) + x] - sat[y * (w + 1) + x];
  const holesIn = (x0: number, y0: number, x1: number, y1: number) => sat[(y1 + 1) * (w + 1) + x1 + 1] - sat[y0 * (w + 1) + x1 + 1] - sat[(y1 + 1) * (w + 1) + x0] + sat[y0 * (w + 1) + x0];
  for (let y = P; y < h - P; y++) for (let x = P; x < w - P; x++) {
    if (!holesIn(x - P, y - P, x + P, y + P)) { isValid[y * w + x] = 1; valid.push(y * w + x); }
  }
  // targets: every pixel whose patch overlaps the hole
  const targets: number[] = [];
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if (holesIn(Math.max(0, x - P), Math.max(0, y - P), Math.min(w - 1, x + P), Math.min(h - 1, y + P))) targets.push(y * w + x);
  }
  const map = nnf || new Int32Array(w * h).fill(-1);
  if (!valid.length) return map;
  const dist = new Float32Array(w * h).fill(Infinity);
  /** patch distance (sum of squared differences over the overlap), giving up beyond best */
  const D = (t: number, s: number, best: number): number => {
    const tx = t % w, ty = (t - tx) / w, sx = s % w, sy = (s - sx) / w;
    let d = 0, n = 0;
    for (let dy = -P; dy <= P; dy++) {
      const y = ty + dy;
      if (y < 0 || y >= h) continue;
      for (let dx = -P; dx <= P; dx++) {
        const x = tx + dx;
        if (x < 0 || x >= w) continue;
        const a = (y * w + x) * 3, b = ((sy + dy) * w + sx + dx) * 3;
        const e0 = px[a] - px[b], e1 = px[a + 1] - px[b + 1], e2 = px[a + 2] - px[b + 2];
        d += e0 * e0 + e1 * e1 + e2 * e2;
        n++;
      }
      if (d > best * n) return Infinity;
    }
    return n ? d / n : Infinity;
  };
  const tryMatch = (t: number, s: number) => {
    if (s < 0 || !isValid[s]) return;
    const d = D(t, s, dist[t]);
    if (d < dist[t]) { dist[t] = d; map[t] = s; }
  };
  for (const t of targets) {
    if (map[t] < 0 || !isValid[map[t]]) map[t] = valid[Math.floor(rand() * valid.length)];
    dist[t] = D(t, map[t], Infinity);
  }
  for (let it = 0; it < iterations; it++) {
    // PatchMatch: pass good matches on to the neighbours (forwards, then backwards), then search randomly
    const order = it % 2 ? -1 : 1;
    for (let k = 0; k < targets.length; k++) {
      const t = targets[order > 0 ? k : targets.length - 1 - k], x = t % w;
      const s = order;
      if (x - s >= 0 && x - s < w) { const m = map[t - s]; if (m >= 0) tryMatch(t, m + s); }
      if (t - s * w >= 0 && t - s * w < w * h) { const m = map[t - s * w]; if (m >= 0) tryMatch(t, m + s * w); }
      let rad = Math.max(w, h);
      const cx = map[t] % w, cy = (map[t] - cx) / w;
      while (rad >= 1) {
        const rx = Math.round(cx + (rand() * 2 - 1) * rad), ry = Math.round(cy + (rand() * 2 - 1) * rad);
        if (rx >= 0 && ry >= 0 && rx < w && ry < h) tryMatch(t, ry * w + rx);
        rad /= 2;
      }
    }
    // vote: every hole pixel becomes the weighted average of what the patches covering it say
    const acc = new Float32Array(w * h * 4);
    for (const t of targets) {
      const s = map[t];
      if (s < 0) continue;
      const tx = t % w, ty = (t - tx) / w, sx = s % w, sy = (s - sx) / w, wt = Math.exp(-dist[t] / 2000);
      for (let dy = -P; dy <= P; dy++) for (let dx = -P; dx <= P; dx++) {
        const x = tx + dx, y = ty + dy;
        if (x < 0 || y < 0 || x >= w || y >= h || !hole[y * w + x]) continue;
        const a = (y * w + x) * 4, b = ((sy + dy) * w + sx + dx) * 3;
        acc[a] += px[b] * wt; acc[a + 1] += px[b + 1] * wt; acc[a + 2] += px[b + 2] * wt; acc[a + 3] += wt;
      }
    }
    for (let i = 0; i < w * h; i++) {
      if (!hole[i] || !acc[i * 4 + 3]) continue;
      px[i * 3] = acc[i * 4] / acc[i * 4 + 3]; px[i * 3 + 1] = acc[i * 4 + 1] / acc[i * 4 + 3]; px[i * 3 + 2] = acc[i * 4 + 2] / acc[i * 4 + 3];
    }
    // the picture changed: the stored distances are out of date
    for (const t of targets) dist[t] = D(t, map[t], Infinity);
  }
  return map;
}

/**
 * Fills the hole (mask > 127) of the image with the surrounding picture. Returns new RGBA (the hole
 * filled and fully opaque where the picture around it was; elsewhere the input unchanged).
 */
export function inpaint(img: Img, mask: Uint8Array, progress: (f: number) => void = () => {}): Uint8ClampedArray<ArrayBuffer> {
  const { width: w, height: h, data } = img, px = new Float32Array(w * h * 3), hole = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) {
    hole[i] = mask[i] > 127 ? 1 : 0;
    px[i * 3] = data[i * 4]; px[i * 3 + 1] = data[i * 4 + 1]; px[i * 3 + 2] = data[i * 4 + 2];
  }
  // the pyramid: down until the picture is small
  const levels: Level[] = [{ w, h, px, hole }];
  while (levels[levels.length - 1].w > 48 && levels[levels.length - 1].h > 48) levels.push(downscale(levels[levels.length - 1]));
  const rand = rng(12345);
  let nnf: Int32Array | null = null;
  for (let k = levels.length - 1; k >= 0; k--) {
    const l = levels[k];
    if (k === levels.length - 1) onionFill(l);
    else {
      // start from the level below: its picture scaled up into the hole, its matches doubled
      const lo = levels[k + 1], up = new Int32Array(l.w * l.h).fill(-1);
      for (let y = 0; y < l.h; y++) for (let x = 0; x < l.w; x++) {
        const i = y * l.w + x, lx = Math.min(lo.w - 1, x >> 1), ly = Math.min(lo.h - 1, y >> 1), j = ly * lo.w + lx;
        if (l.hole[i]) { l.px[i * 3] = lo.px[j * 3]; l.px[i * 3 + 1] = lo.px[j * 3 + 1]; l.px[i * 3 + 2] = lo.px[j * 3 + 2]; }
        const m = nnf ? nnf[j] : -1;
        if (m >= 0) {
          const mx = m % lo.w, my = (m - mx) / lo.w;
          up[i] = Math.min(l.h - 1, 2 * my + (y & 1)) * l.w + Math.min(l.w - 1, 2 * mx + (x & 1));
        }
      }
      nnf = up;
    }
    // fewer rounds on the big levels (they start close already)
    const its = k === 0 ? 3 : k === 1 ? 4 : 6;
    nnf = solve(l, nnf, its, rand);
    progress(1 - k / levels.length);
  }
  const out = new Uint8ClampedArray(data);
  for (let i = 0; i < w * h; i++) {
    if (!hole[i]) continue;
    out[i * 4] = px[i * 3]; out[i * 4 + 1] = px[i * 3 + 1]; out[i * 4 + 2] = px[i * 3 + 2]; out[i * 4 + 3] = 255;
  }
  return out;
}
