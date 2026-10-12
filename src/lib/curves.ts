/* Curves for the Curve and Ellipse tools of both apps. A curve is a list of clicked points and a spline
   type; every type is turned into cubic Bézier segments, which SVG draws exactly (the vector app's
   <path d>) and which are sampled into points for pixels (the raster app) and previews.
     catmull  – smooth, through every point (Catmull–Rom)
     bspline  – smooth, pulled towards the points but only through the ends (uniform cubic B-spline)
     bezier3  – cubic Bézier: point, two control points, point, two control points, point …
     bezier2  – quadratic Bézier: point, control point, point, control point, point …
   All of them are affine-invariant: moving, turning or mirroring the points does the same to the curve. */
import type { Pt } from './geometry.ts';

export type SplineType = 'catmull' | 'bspline' | 'bezier3' | 'bezier2';
export const SPLINE_TYPES: SplineType[] = ['catmull', 'bspline', 'bezier3', 'bezier2'];
/** One cubic Bézier segment: from a, pulled towards b and c, to d. */
export interface Cubic { a: Pt; b: Pt; c: Pt; d: Pt }

const lerp = (p: Pt, q: Pt, t: number): Pt => ({ x: p.x + (q.x - p.x) * t, y: p.y + (q.y - p.y) * t });
/** a straight segment as a cubic */
const straight = (p: Pt, q: Pt): Cubic => ({ a: p, b: lerp(p, q, 1 / 3), c: lerp(p, q, 2 / 3), d: q });
/** a quadratic segment (p, control k, q) as the same curve in cubic form */
const quad = (p: Pt, k: Pt, q: Pt): Cubic => ({ a: p, b: lerp(p, k, 2 / 3), c: lerp(q, k, 2 / 3), d: q });

/** The curve through / along the points as cubic segments. Fewer than two distinct points: none. */
export function toCubics(type: SplineType, pts: Pt[], closed: boolean): Cubic[] {
  const n = pts.length;
  if (n < 2) return [];
  if (n === 2) return [straight(pts[0], pts[1])];
  if (type === 'catmull') {
    // each segment's handles point along the line between its neighbours (open ends: the end point itself)
    const at = (i: number) => (closed ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
    const out: Cubic[] = [];
    for (let i = 0; i < (closed ? n : n - 1); i++) {
      const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
      out.push({
        a: p1, d: p2,
        b: { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 },
        c: { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 },
      });
    }
    return out;
  }
  if (type === 'bspline') {
    // open: the end points are repeated three times so the curve starts and ends on them
    const P = closed ? pts : [pts[0], pts[0], ...pts, pts[n - 1], pts[n - 1]];
    const m = P.length, at = (i: number) => P[(i + m) % m];
    const out: Cubic[] = [];
    for (let i = 0; i < (closed ? m : m - 3); i++) {
      const p0 = at(i), p1 = at(i + 1), p2 = at(i + 2), p3 = at(i + 3);
      out.push({
        a: { x: (p0.x + 4 * p1.x + p2.x) / 6, y: (p0.y + 4 * p1.y + p2.y) / 6 },
        b: { x: (2 * p1.x + p2.x) / 3, y: (2 * p1.y + p2.y) / 3 },
        c: { x: (p1.x + 2 * p2.x) / 3, y: (p1.y + 2 * p2.y) / 3 },
        d: { x: (p1.x + 4 * p2.x + p3.x) / 6, y: (p1.y + 4 * p2.y + p3.y) / 6 },
      });
    }
    return out;
  }
  // Bézier: on-curve points every 3rd (cubic) or 2nd (quadratic) click; a closed curve goes back to the
  // first point. Control points left over at the end make a lower-degree last segment (2 → quadratic, 1 → … ).
  const step = type === 'bezier3' ? 3 : 2, P = closed ? [...pts, pts[0]] : pts, out: Cubic[] = [];
  let i = 0;
  while (i < P.length - 1) {
    const k = Math.min(step, P.length - 1 - i), p = P[i], q = P[i + k];
    out.push(k === 3 ? { a: p, b: P[i + 1], c: P[i + 2], d: q } : k === 2 ? quad(p, P[i + 1], q) : straight(p, q));
    i += k;
  }
  return out;
}

/** Which clicked points the curve passes through (the others are control points, shown differently). */
export function onCurve(type: SplineType, n: number, closed: boolean, i: number): boolean {
  if (type === 'catmull') return true;
  if (type === 'bspline') return !closed && (i === 0 || i === n - 1);
  const step = type === 'bezier3' ? 3 : 2;
  return i % step === 0 || (!closed && i === n - 1);
}

/** SVG path data for the segments (fmt formats a number). */
export function cubicsToD(segs: Cubic[], closed: boolean, fmt: (v: number) => string = String): string {
  if (!segs.length) return '';
  const p = (q: Pt) => `${fmt(q.x)} ${fmt(q.y)}`;
  return `M${p(segs[0].a)}` + segs.map(s => ` C${p(s.b)} ${p(s.c)} ${p(s.d)}`).join('') + (closed ? ' Z' : '');
}

export function cubicAt(s: Cubic, t: number): Pt {
  const u = 1 - t, a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, d = t * t * t;
  return { x: a * s.a.x + b * s.b.x + c * s.c.x + d * s.d.x, y: a * s.a.y + b * s.b.y + c * s.c.y + d * s.d.y };
}
/** Points along the segments, about tol apart at most (a closed curve doesn't repeat its first point). */
export function sampleCubics(segs: Cubic[], closed: boolean, tol: number): Pt[] {
  if (!segs.length) return [];
  const out: Pt[] = [segs[0].a];
  for (const s of segs) {
    // the curve never moves faster than 3 × its longest control leg per unit of t
    const leg = Math.max(Math.hypot(s.b.x - s.a.x, s.b.y - s.a.y), Math.hypot(s.c.x - s.b.x, s.c.y - s.b.y), Math.hypot(s.d.x - s.c.x, s.d.y - s.c.y));
    const k = Math.max(1, Math.min(512, Math.ceil(3 * leg / Math.max(tol, 1e-9))));
    for (let i = 1; i <= k; i++) out.push(cubicAt(s, i / k));
  }
  if (closed && out.length > 1) {
    const f = out[0], l = out[out.length - 1];
    if (Math.hypot(f.x - l.x, f.y - l.y) < 1e-9) out.pop();
  }
  return out;
}

/** Points around an ellipse (center, radii, rotation in radians), about tol apart at most. */
export function ellipsePoints(cx: number, cy: number, rx: number, ry: number, rot: number, tol: number): Pt[] {
  const r = Math.max(Math.abs(rx), Math.abs(ry)), n = Math.max(12, Math.min(720, Math.ceil(2 * Math.PI * r / Math.max(tol, 1e-9))));
  const cos = Math.cos(rot), sin = Math.sin(rot), out: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const a = i / n * 2 * Math.PI, x = rx * Math.cos(a), y = ry * Math.sin(a);
    out.push({ x: cx + x * cos - y * sin, y: cy + x * sin + y * cos });
  }
  return out;
}

/** The ellipse dragged from a to b: a and b are opposite corners of its box, or (fromCenter) a is the
    center and b a corner. circle: equal radii, the larger of the two. */
export function ellipseFromDrag(a: Pt, b: Pt, fromCenter: boolean, circle: boolean): { cx: number; cy: number; rx: number; ry: number } {
  let rx = Math.abs(b.x - a.x), ry = Math.abs(b.y - a.y);
  if (!fromCenter) { rx /= 2; ry /= 2; }
  if (circle) rx = ry = Math.max(rx, ry);
  if (fromCenter) return { cx: a.x, cy: a.y, rx, ry };
  // from a corner, the box grows towards the pointer
  return { cx: a.x + Math.sign(b.x - a.x || 1) * rx, cy: a.y + Math.sign(b.y - a.y || 1) * ry, rx, ry };
}
