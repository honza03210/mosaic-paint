/* Hand-laid lines: grout that looks as if glass shards were set by hand – every piece of a line between two
   crossings gets its own width, wider at one end and narrower at the other, like the wedge-shaped gaps
   between real shards. Pure functions (tests run them in Node); the widths come from a seed and the piece's
   position, so the same drawing always looks the same. */
import { segIntersect, dist, type Pt, type Seg } from './geometry.ts';

/** Repeatable random numbers 0…1 from a few numbers (a hash, then mulberry32). */
export function rand(...k: number[]): () => number {
  let h = 2166136261 >>> 0;
  for (const v of k) { h ^= Math.round(v * 64) | 0; h = Math.imul(h, 16777619) >>> 0; }
  let s = h;
  return () => {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * The pieces of `own` between the places where any of `all` crosses or touches it (`own` itself may be
 * among them – a segment doesn't cut itself). Pieces shorter than `min` are kept whole with their neighbour.
 */
export function splitAtCrossings(own: Seg[], all: Seg[], min = 1e-6): Seg[] {
  const out: Seg[] = [];
  for (const s of own) {
    const ts = [0, 1];
    const x0 = Math.min(s.a.x, s.b.x), x1 = Math.max(s.a.x, s.b.x), y0 = Math.min(s.a.y, s.b.y), y1 = Math.max(s.a.y, s.b.y);
    for (const o of all) {
      if (o === s || Math.max(o.a.x, o.b.x) < x0 || Math.min(o.a.x, o.b.x) > x1 || Math.max(o.a.y, o.b.y) < y0 || Math.min(o.a.y, o.b.y) > y1) continue;
      const hit = segIntersect(s.a, s.b, o.a, o.b);
      if (hit && hit.t > 0 && hit.t < 1) ts.push(hit.t);
    }
    ts.sort((a, b) => a - b);
    const len = dist(s.a, s.b), at = (t: number): Pt => ({ x: s.a.x + (s.b.x - s.a.x) * t, y: s.a.y + (s.b.y - s.a.y) * t });
    let from = 0;
    for (let i = 1; i < ts.length; i++) {
      if ((ts[i] - from) * len < min && i < ts.length - 1) continue;
      if (ts[i] > from) out.push({ a: at(from), b: at(ts[i]) });
      from = ts[i];
    }
  }
  return out;
}

/**
 * How wide the piece a–b is at its two ends, as factors of the line width: one end wider, the other
 * narrower (which one, and how much, is random). amount 0…1: 0 = even, 1 = from a sliver to nearly double.
 */
export function taper(seed: number, a: Pt, b: Pt, amount: number): [number, number] {
  // the same piece gets the same widths whichever way round it is drawn
  const [p, q] = a.x < b.x || (a.x === b.x && a.y <= b.y) ? [a, b] : [b, a];
  const r = rand(seed, p.x, p.y, q.x, q.y);
  const big = 1 + amount * (0.15 + 0.75 * r()), small = Math.max(0.12, 1 - amount * (0.35 + 0.55 * r()));
  const w = r() < 0.5 ? [big, small] : [small, big];
  return (p === a ? w : [w[1], w[0]]) as [number, number];
}

const f = (n: number) => +n.toFixed(3);
/**
 * The outline of a tapered piece from a (radius r0) to b (radius r1) with round ends: the two circles and
 * the straight sides touching both – an SVG path.
 */
export function wedgePath(a: Pt, b: Pt, r0: number, r1: number): string {
  const d = dist(a, b);
  const circle = (c: Pt, r: number) => `M${f(c.x - r)} ${f(c.y)}a${f(r)} ${f(r)} 0 1 0 ${f(2 * r)} 0a${f(r)} ${f(r)} 0 1 0 ${f(-2 * r)} 0Z`;
  // one circle holds the other: just the bigger one
  if (d <= Math.abs(r0 - r1) + 1e-9) return r0 >= r1 ? circle(a, r0) : circle(b, r1);
  const al = Math.atan2(b.y - a.y, b.x - a.x), be = Math.acos((r0 - r1) / d);
  const pt = (c: Pt, r: number, ang: number) => `${f(c.x + r * Math.cos(ang))} ${f(c.y + r * Math.sin(ang))}`;
  // round the far end of b (through al), along one side, round the far end of a (through al + π), back
  return `M${pt(a, r0, al + be)}L${pt(b, r1, al + be)}A${f(r1)} ${f(r1)} 0 ${be > Math.PI / 2 ? 1 : 0} 0 ${pt(b, r1, al - be)}`
    + `L${pt(a, r0, al - be)}A${f(r0)} ${f(r0)} 0 ${be < Math.PI / 2 ? 1 : 0} 0 ${pt(a, r0, al + be)}Z`;
}
