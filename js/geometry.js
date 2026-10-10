/* Mosaic Paint – geometry helpers (pure math, no DOM). */
'use strict';

const Geo = (() => {
  let eps = 0.01; // two points closer than this are treated as the same point

  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const cross = (ax, ay, bx, by) => ax * by - ay * bx;

  /** Closest point to p on segment a-b (t = 0..1 along the segment). */
  function project(p, a, b) {
    const dx = b.x - a.x, dy = b.y - a.y;
    const len2 = dx * dx + dy * dy;
    let t = len2 ? ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2 : 0;
    t = Math.max(0, Math.min(1, t));
    return { x: a.x + dx * t, y: a.y + dy * t, t };
  }

  /** Intersection of segments a-b and c-d, or null. t/u are the positions along each. */
  function segIntersect(a, b, c, d) {
    const rx = b.x - a.x, ry = b.y - a.y, sx = d.x - c.x, sy = d.y - c.y;
    const den = cross(rx, ry, sx, sy);
    if (Math.abs(den) < 1e-12) return null;
    const qx = c.x - a.x, qy = c.y - a.y;
    const t = cross(qx, qy, sx, sy) / den;
    const u = cross(qx, qy, rx, ry) / den;
    if (t < 0 || t > 1 || u < 0 || u > 1) return null;
    return { x: a.x + rx * t, y: a.y + ry * t, t, u };
  }

  function polygonArea(pts) {
    let s = 0;
    for (let i = 0, n = pts.length; i < n; i++) {
      const p = pts[i], q = pts[(i + 1) % n];
      s += p.x * q.y - q.x * p.y;
    }
    return s / 2;
  }

  function pointInPolygon(p, pts) {
    let inside = false;
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      const a = pts[i], b = pts[j];
      if ((a.y > p.y) !== (b.y > p.y) && p.x < (b.x - a.x) * (p.y - a.y) / (b.y - a.y) + a.x) inside = !inside;
    }
    return inside;
  }

  /** Vertices of a regular n-gon; rot (radians) is the angle of the first vertex. */
  function regularPolygon(n, cx, cy, r, rot) {
    const out = [];
    for (let i = 0; i < n; i++) {
      const a = rot + i * 2 * Math.PI / n;
      out.push({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) });
    }
    return out;
  }

  /**
   * Turns a soup of segments into the faces of the planar arrangement they form.
   * Segments are split at every crossing / T-junction, dangling ends are dropped, and every
   * directed edge is walked once. Bounded faces come out with positive area; the outer
   * boundary of each connected component comes out negative.
   */
  function planarFaces(segs) {
    const n = segs.length;
    const splits = segs.map(s => [{ t: 0, p: s.a }, { t: 1, p: s.b }]);
    const bb = segs.map(s => ({
      x0: Math.min(s.a.x, s.b.x) - eps, x1: Math.max(s.a.x, s.b.x) + eps,
      y0: Math.min(s.a.y, s.b.y) - eps, y1: Math.max(s.a.y, s.b.y) + eps,
    }));
    const order = segs.map((_, i) => i).sort((i, j) => bb[i].x0 - bb[j].x0);
    const touch = (A, B, list) => {
      for (const q of [B.a, B.b]) {
        const pr = project(q, A.a, A.b);
        if (pr.t > 0 && pr.t < 1 && dist(pr, q) < eps) list.push({ t: pr.t, p: q });
      }
    };
    for (let oi = 0; oi < n; oi++) {
      const i = order[oi], bi = bb[i], A = segs[i];
      for (let oj = oi + 1; oj < n; oj++) {
        const j = order[oj], bj = bb[j];
        if (bj.x0 > bi.x1) break;
        if (bj.y0 > bi.y1 || bj.y1 < bi.y0) continue;
        const B = segs[j];
        touch(A, B, splits[i]);
        touch(B, A, splits[j]);
        const x = segIntersect(A.a, A.b, B.a, B.b);
        if (x) {
          const p = { x: x.x, y: x.y };
          if (x.t > 0 && x.t < 1) splits[i].push({ t: x.t, p });
          if (x.u > 0 && x.u < 1) splits[j].push({ t: x.u, p });
        }
      }
    }

    // merge nearby points into shared vertices
    const verts = [], grid = new Map();
    const vid = (p) => {
      const gx = Math.floor(p.x / eps), gy = Math.floor(p.y / eps);
      for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
        const cell = grid.get((gx + dx) + ',' + (gy + dy));
        if (cell) for (const id of cell) if (dist(verts[id], p) < eps) return id;
      }
      const id = verts.length;
      verts.push({ x: p.x, y: p.y });
      const k = gx + ',' + gy;
      (grid.get(k) || grid.set(k, []).get(k)).push(id);
      return id;
    };
    const adj = new Map();
    const link = (u, v) => {
      if (u === v) return;
      (adj.get(u) || adj.set(u, new Set()).get(u)).add(v);
      (adj.get(v) || adj.set(v, new Set()).get(v)).add(u);
    };
    for (const list of splits) {
      list.sort((a, b) => a.t - b.t);
      let prev = -1;
      for (const s of list) {
        const id = vid(s.p);
        if (prev >= 0) link(prev, id);
        prev = id;
      }
    }

    // dangling edges can't bound an area
    const stack = [...adj.keys()].filter(k => adj.get(k).size < 2);
    while (stack.length) {
      const k = stack.pop(), s = adj.get(k);
      if (!s || s.size >= 2) continue;
      for (const m of s) {
        const ms = adj.get(m);
        ms.delete(k);
        if (ms.size < 2) stack.push(m);
      }
      adj.delete(k);
    }

    // connected components (union-find)
    const parent = new Map();
    const find = (x) => {
      while (parent.get(x) !== x) { parent.set(x, parent.get(parent.get(x))); x = parent.get(x); }
      return x;
    };
    for (const k of adj.keys()) parent.set(k, k);
    for (const [u, s] of adj) for (const v of s) {
      const a = find(u), b = find(v);
      if (a !== b) parent.set(a, b);
    }

    const nbr = new Map();
    for (const [k, s] of adj) {
      const o = verts[k];
      const ang = (id) => Math.atan2(verts[id].y - o.y, verts[id].x - o.x);
      nbr.set(k, [...s].sort((a, b) => ang(a) - ang(b)));
    }

    // walk each directed edge once, always taking the sharpest turn: one walk = one face
    const seen = new Set(), faces = [];
    for (const [u, list] of nbr) for (const v of list) {
      if (seen.has(u + '>' + v)) continue;
      const pts = [];
      let a = u, b = v, guard = 0;
      do {
        seen.add(a + '>' + b);
        pts.push(verts[a]);
        const l = nbr.get(b);
        const c = l[(l.indexOf(a) - 1 + l.length) % l.length];
        a = b; b = c;
      } while ((a !== u || b !== v) && ++guard < 1e6);
      faces.push({ pts, area: polygonArea(pts), comp: find(u) });
    }
    return faces;
  }

  /**
   * The smallest closed area around p bounded by the segments, with islands
   * (separate groups of lines fully inside it) cut out as holes.
   */
  function findRegion(segs, p) {
    const faces = planarFaces(segs);
    let best = null;
    for (const f of faces) {
      if (f.area > 0 && (!best || f.area < best.area) && pointInPolygon(p, f.pts)) best = f;
    }
    if (!best) return null;
    const cands = faces.filter(f => f.area < 0 && f.comp !== best.comp && pointInPolygon(f.pts[0], best.pts));
    const holes = cands.filter(h => !cands.some(o => o !== h && pointInPolygon(h.pts[0], o.pts)));
    const area = best.area + holes.reduce((s, h) => s + h.area, 0);
    return { outer: best.pts, holes: holes.map(h => h.pts), area };
  }

  return {
    get eps() { return eps; },
    setEps(v) { eps = v; },
    dist, project, segIntersect, polygonArea, pointInPolygon, regularPolygon, planarFaces, findRegion,
  };
})();
