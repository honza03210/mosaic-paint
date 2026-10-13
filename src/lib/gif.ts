/* Animated GIFs, frame by frame (to choose one to edit): the file is read here, without the browser's help,
   so every frame comes out the same in every browser (also those without ImageDecoder). Handles global and
   local color tables, transparency, interlacing and the ways a frame is cleared before the next (disposal). */

export interface GifFrame { /** the whole picture as it shows at this frame (RGBA) */ rgba: Uint8ClampedArray<ArrayBuffer>; /** ms */ delay: number }
export interface Gif { width: number; height: number; frames: GifFrame[] }

/** LZW-decompresses one frame's image data into color indices. */
function lzw(minCode: number, data: Uint8Array, count: number): Uint8Array {
  const out = new Uint8Array(count), clear = 1 << minCode, eoi = clear + 1;
  const prefix = new Int16Array(4096), suffix = new Uint8Array(4096), stack = new Uint8Array(4097);
  let size = minCode + 1, mask = (1 << size) - 1, next = eoi + 1, old = -1, first = 0;
  let bits = 0, acc = 0, o = 0, p = 0;
  for (let i = 0; i < clear; i++) { prefix[i] = -1; suffix[i] = i; }
  while (o < count) {
    while (bits < size) {
      if (p >= data.length) return out; // the data ended early: the rest stays 0
      acc |= data[p++] << bits;
      bits += 8;
    }
    const code = acc & mask;
    acc >>>= size;
    bits -= size;
    if (code === clear) { size = minCode + 1; mask = (1 << size) - 1; next = eoi + 1; old = -1; continue; }
    if (code === eoi) break;
    let c = code, sp = 0;
    if (old === -1) {
      out[o++] = suffix[code];
      old = code;
      first = code;
      continue;
    }
    if (code >= next) { stack[sp++] = first; c = old; }
    while (c >= clear) { stack[sp++] = suffix[c]; c = prefix[c]; }
    first = suffix[c];
    stack[sp++] = first;
    while (sp && o < count) out[o++] = stack[--sp];
    if (next < 4096) {
      prefix[next] = old;
      suffix[next] = first;
      next++;
      if ((next & mask) === 0 && next < 4096) { size++; mask = (1 << size) - 1; }
    }
    old = code;
  }
  return out;
}

/**
 * Reads a GIF. Throws when it isn't one. each: called for every frame (the picture as it shows then – reused,
 * copy what you keep) instead of keeping them all: a long GIF takes width × height × 4 bytes per frame;
 * returning true stops early.
 */
export function decodeGif(buf: Uint8Array, each?: (rgba: Uint8ClampedArray<ArrayBuffer>, delay: number, index: number) => boolean | void): Gif {
  if (buf.length < 13 || String.fromCharCode(buf[0], buf[1], buf[2]) !== 'GIF') throw new Error('not a GIF');
  const width = buf[6] | (buf[7] << 8), height = buf[8] | (buf[9] << 8), flags = buf[10];
  let p = 13, global: Uint8Array | null = null;
  if (flags & 0x80) { const n = 3 * (1 << ((flags & 7) + 1)); global = buf.subarray(p, p + n); p += n; }
  const canvas = new Uint8ClampedArray(width * height * 4), frames: GifFrame[] = [];
  let delay = 100, transparent = -1, disposal = 0;
  const subBlocks = (): Uint8Array => {
    const parts: Uint8Array[] = [];
    let len = 0;
    while (p < buf.length && buf[p]) { const n = buf[p]; parts.push(buf.subarray(p + 1, p + 1 + n)); len += n; p += n + 1; }
    p++; // the block terminator
    const out = new Uint8Array(len);
    let o = 0;
    for (const s of parts) { out.set(s, o); o += s.length; }
    return out;
  };
  while (p < buf.length) {
    const b = buf[p++];
    if (b === 0x3b) break; // trailer
    if (b === 0x21) {
      const label = buf[p++];
      if (label === 0xf9 && buf[p] >= 4) {
        // graphic control: disposal, delay, transparent color
        const f = buf[p + 1];
        disposal = (f >> 2) & 7;
        delay = (buf[p + 2] | (buf[p + 3] << 8)) * 10 || 100;
        transparent = f & 1 ? buf[p + 4] : -1;
      }
      subBlocks();
      continue;
    }
    if (b !== 0x2c) break; // something unknown: stop with what there is
    const x0 = buf[p] | (buf[p + 1] << 8), y0 = buf[p + 2] | (buf[p + 3] << 8), w = buf[p + 4] | (buf[p + 5] << 8), h = buf[p + 6] | (buf[p + 7] << 8), f = buf[p + 8];
    p += 9;
    let table = global;
    if (f & 0x80) { const n = 3 * (1 << ((f & 7) + 1)); table = buf.subarray(p, p + n); p += n; }
    const interlaced = !!(f & 0x40), minCode = buf[p++], idx = lzw(minCode, subBlocks(), w * h);
    // disposal 3 (back to before this frame): keep a copy to go back to
    const before = disposal === 3 ? canvas.slice() : null;
    // interlaced rows come in four passes
    const rows: number[] = [];
    if (interlaced) for (const [start, step] of [[0, 8], [4, 8], [2, 4], [1, 2]]) for (let y = start; y < h; y += step) rows.push(y);
    for (let r = 0; r < h; r++) {
      const y = interlaced ? rows[r] : r, Y = y0 + y;
      if (Y >= height) continue;
      for (let x = 0; x < w; x++) {
        const X = x0 + x, ci = idx[r * w + x];
        if (X >= width || ci === transparent || !table || ci * 3 + 2 >= table.length) continue;
        const o = (Y * width + X) * 4;
        canvas[o] = table[ci * 3]; canvas[o + 1] = table[ci * 3 + 1]; canvas[o + 2] = table[ci * 3 + 2]; canvas[o + 3] = 255;
      }
    }
    if (each) {
      if (each(canvas, delay, frames.length)) return { width, height, frames };
      frames.push({ rgba: new Uint8ClampedArray(0), delay });
    } else frames.push({ rgba: canvas.slice(), delay });
    // how this frame is cleared before the next: 2 – its area to transparent, 3 – back to how it was
    if (disposal === 2) {
      for (let y = y0; y < Math.min(height, y0 + h); y++) canvas.fill(0, (y * width + x0) * 4, (y * width + Math.min(width, x0 + w)) * 4);
    } else if (disposal === 3 && before) canvas.set(before);
    delay = 100; transparent = -1; disposal = 0;
  }
  if (!frames.length) throw new Error('no frames');
  return { width, height, frames };
}
