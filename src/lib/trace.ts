/* Outlines of pixel areas as polygons: every piece of an image (see raster.ts `pieces`) becomes rings of
   corner points – its outer edge and any holes – with corners only where the outline turns. */

export type Ring = { x: number; y: number }[];

/**
 * The outline rings of every label in a label grid (labels[y * W + x], -1 = nothing), in pixel
 * coordinates (y down). Result: rings[label] = list of rings; the outer ring runs one way, holes the other
 * (see ringArea). Pixels that only touch at a corner belong to separate rings. progress: 0…1, now and then.
 */
export function traceAll(labels: Int32Array, W: number, H: number, count: number, progress?: (f: number) => void): Ring[][] {
  const at = (x: number, y: number) => (x < 0 || y < 0 || x >= W || y >= H ? -1 : labels[y * W + x]);
  // directed boundary edges of each label, interior on the left (seen on screen, y down): a pixel's
  // outline runs left along its top, down its left side, right along its bottom and up its right side
  const V = W + 1, key = (x: number, y: number) => y * V + x;
  const out: Map<number, number[]>[] = Array.from({ length: count }, () => new Map());
  const add = (l: number, x0: number, y0: number, x1: number, y1: number) => {
    const m = out[l], k = key(x0, y0);
    const list = m.get(k);
    if (list) list.push(key(x1, y1)); else m.set(k, [key(x1, y1)]);
  };
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (progress && x === 0 && y % 64 === 0) progress(0.5 * y / H);
    const l = labels[y * W + x];
    if (l < 0) continue;
    if (at(x, y - 1) !== l) add(l, x + 1, y, x, y);
    if (at(x - 1, y) !== l) add(l, x, y, x, y + 1);
    if (at(x, y + 1) !== l) add(l, x, y + 1, x + 1, y + 1);
    if (at(x + 1, y) !== l) add(l, x + 1, y + 1, x + 1, y);
  }
  const rings: Ring[][] = [];
  for (let l = 0; l < count; l++) {
    if (progress && l % 256 === 0) progress(0.5 + 0.5 * l / count);
    const m = out[l], list: Ring[] = [];
    for (const [start] of m) {
      while (m.get(start) && m.get(start).length) {
        // follow the edges until back at the start; where two leave one corner, turn left (keeps
        // pixels that only touch diagonally apart)
        const ring: number[] = [start];
        let prev = start, cur = take(m, start, -1, V);
        while (cur !== start) {
          ring.push(cur);
          const next = take(m, cur, prev, V);
          prev = cur;
          cur = next;
        }
        list.push(simplify(ring, V));
      }
    }
    rings.push(list);
  }
  return rings;
}
/** Removes and returns the edge leaving `from` (the left-most turn when there are two). */
function take(m: Map<number, number[]>, from: number, prev: number, V: number): number {
  const list = m.get(from);
  let i = 0;
  if (list.length > 1 && prev >= 0) {
    const dx = from % V - prev % V, dy = Math.floor(from / V) - Math.floor(prev / V);
    // on screen (y down) the left of direction (dx, dy) is (dy, -dx)
    const score = (to: number) => {
      const ex = to % V - from % V, ey = Math.floor(to / V) - Math.floor(from / V);
      return ex === dy && ey === -dx ? 0 : ex === dx && ey === dy ? 1 : 2;
    };
    for (let k = 1; k < list.length; k++) if (score(list[k]) < score(list[i])) i = k;
  }
  const to = list[i];
  list.splice(i, 1);
  if (!list.length) m.delete(from);
  return to;
}
/** Corner points only: drops points in the middle of straight runs. */
function simplify(ring: number[], V: number): Ring {
  const pts = ring.map(k => ({ x: k % V, y: Math.floor(k / V) })), n = pts.length, out: Ring = [];
  for (let i = 0; i < n; i++) {
    const a = pts[(i + n - 1) % n], b = pts[i], c = pts[(i + 1) % n];
    if ((b.x - a.x) * (c.y - b.y) - (b.y - a.y) * (c.x - b.x) !== 0) out.push(b);
  }
  return out;
}
/** Signed area of a ring (shoelace): outer rings and holes have opposite signs. */
export function ringArea(r: Ring): number {
  let s = 0;
  for (let i = 0, n = r.length; i < n; i++) { const a = r[i], b = r[(i + 1) % n]; s += a.x * b.y - b.x * a.y; }
  return s / 2;
}
