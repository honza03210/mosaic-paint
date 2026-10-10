/* Mosaic Paint – laying out tiles for a mosaic made from a photo (pure geometry, uses Geo and Patterns).
   The caller supplies busy(x, y, w, h): "does the photo have detail here?" for adaptive tile sizes. */
'use strict';

const AutoMosaic = (() => {
  const STYLES = [
    ['square', 'Squares'], ['brick', 'Bricks'], ['hex', 'Hexagons'], ['irregular', 'Irregular (crazy paving)'],
  ];

  /** Small seeded random generator, so the same settings give the same mosaic. */
  function rng(seed) {
    let a = (seed >>> 0) || 1;
    return () => {
      a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const rect = (x, y, w, h) => [{ x, y }, { x: x + w, y }, { x: x + w, y: y + h }, { x, y: y + h }];

  /**
   * Squares of a quadtree over the box: with detail, they start at twice the tile size in flat
   * areas and go down to half of it where busy() says the photo is detailed.
   */
  function quadLeaves(box, size, adaptive, busy) {
    const top = adaptive ? size * 2 : size, min = adaptive ? size / 2 : size, out = [];
    const visit = (x, y, s) => {
      if (x >= box.x + box.w - 1e-9 || y >= box.y + box.h - 1e-9) return;
      if (s > min * 1.0001 && busy(x, y, s, s)) {
        const h = s / 2;
        visit(x, y, h); visit(x + h, y, h); visit(x, y + h, h); visit(x + h, y + h, h);
      } else out.push({ x, y, s });
    };
    for (let j = 0; j * top < box.h; j++) for (let i = 0; i * top < box.w; i++) visit(box.x + i * top, box.y + j * top, top);
    return out;
  }

  /** Keeps the part of a convex polygon where f(p) ≤ 0. */
  function clipHalf(poly, f) {
    const out = [];
    for (let i = 0, n = poly.length; i < n; i++) {
      const a = poly[i], b = poly[(i + 1) % n], fa = f(a), fb = f(b);
      if (fa <= 0) out.push(a);
      if ((fa < 0 && fb > 0) || (fa > 0 && fb < 0)) {
        const t = fa / (fa - fb);
        out.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
      }
    }
    return out;
  }

  /**
   * Voronoi cells of the seeds inside the box. Each cell is clipped by its neighbours ring by ring,
   * nearest first, until no remaining seed is closer than twice the cell's radius – beyond that a
   * seed's bisector can't touch the cell, so the result is exact.
   */
  function voronoi(seeds, box) {
    const cell = Math.sqrt((box.w * box.h) / Math.max(1, seeds.length)) || 1, grid = new Map();
    const key = (i, j) => i + ',' + j;
    seeds.forEach((s, idx) => {
      const k = key(Math.floor(s.x / cell), Math.floor(s.y / cell));
      (grid.get(k) || grid.set(k, []).get(k)).push(idx);
    });
    const maxRing = Math.ceil(Math.max(box.w, box.h) / cell) + 1;
    return seeds.map((s, idx) => {
      const ci = Math.floor(s.x / cell), cj = Math.floor(s.y / cell);
      let poly = rect(box.x, box.y, box.w, box.h);
      const radius = () => Math.max(...poly.map(p => Geo.dist(p, s)));
      for (let r = 0; r <= maxRing && poly.length >= 3; r++) {
        // every seed in ring r is at least (r - 1) cells away
        if ((r - 1) * cell > 2 * radius()) break;
        const ring = [];
        for (let i = ci - r; i <= ci + r; i++) for (let j = cj - r; j <= cj + r; j++) {
          if (Math.max(Math.abs(i - ci), Math.abs(j - cj)) !== r) continue;
          for (const o of grid.get(key(i, j)) || []) if (o !== idx) ring.push(o);
        }
        ring.sort((a, b) => Geo.dist(seeds[a], s) - Geo.dist(seeds[b], s));
        for (const o of ring) {
          const n = seeds[o], nx = n.x - s.x, ny = n.y - s.y, mx = (s.x + n.x) / 2, my = (s.y + n.y) / 2;
          poly = clipHalf(poly, (p) => (p.x - mx) * nx + (p.y - my) * ny);
          if (poly.length < 3) break;
        }
      }
      return poly;
    }).filter(p => p.length >= 3);
  }

  /**
   * Tile polygons covering box = {x, y, w, h}.
   * style: 'square' | 'brick' | 'hex' | 'irregular'; size: typical tile width; detail 0…1;
   * busy(x, y, w, h) → boolean; seed: for the irregular style.
   */
  function cells({ style, box, size, detail = 0, busy = () => false, seed = 1 }) {
    const adaptive = detail > 0;
    if (style === 'hex') {
      // hexagons with the given width across the flats (edge = width / √3)
      const s = size / Math.sqrt(3);
      return Patterns.cells('hex', s, { x0: -s, y0: -s, x1: box.w + s, y1: box.h + s })
        .map(poly => poly.map(p => ({ x: p.x + box.x, y: p.y + box.y })));
    }
    if (style === 'brick') {
      const out = [];
      for (let j = 0; j * size < box.h; j++) {
        const off = j % 2 ? -size : 0;
        for (let x = box.x + off; x < box.x + box.w; x += 2 * size) {
          const y = box.y + j * size;
          // a brick over busy parts of the photo becomes two squares
          if (adaptive && busy(x, y, 2 * size, size)) out.push(rect(x, y, size, size), rect(x + size, y, size, size));
          else out.push(rect(x, y, 2 * size, size));
        }
      }
      return out;
    }
    const leaves = quadLeaves(box, size, adaptive, busy);
    if (style === 'irregular') {
      const rnd = rng(seed);
      const seeds = leaves.map(l => ({ x: l.x + l.s * (0.5 + (rnd() - 0.5) * 0.7), y: l.y + l.s * (0.5 + (rnd() - 0.5) * 0.7) }))
        .filter(p => p.x >= box.x && p.y >= box.y && p.x <= box.x + box.w && p.y <= box.y + box.h);
      return voronoi(seeds, box);
    }
    return leaves.map(l => rect(l.x, l.y, l.s, l.s));
  }

  /** The lines between tiles, clipped to an area (rings = [outer, ...holes]); edges on its border are left out. */
  function lines(polys, rings, inside, eps) {
    const q = eps * 10, key = (p) => Math.round(p.x / q) + ',' + Math.round(p.y / q), seen = new Set(), pieces = [];
    const keep = (p) => inside(p) && Geo.distToRings(p, rings) > eps * 20;
    for (const poly of polys) for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length], k1 = key(a), k2 = key(b);
      const k = k1 < k2 ? k1 + '|' + k2 : k2 + '|' + k1;
      if (k1 === k2 || seen.has(k)) continue;
      seen.add(k);
      pieces.push(...Geo.clipSegment(a, b, rings, keep));
    }
    return Patterns.mergeCollinear(pieces, eps);
  }

  /** k-means over Lab colors; returns the cluster centers, most common first. */
  function kmeans(points, k, seed = 1, iterations = 16) {
    if (!points.length) return [];
    k = Math.min(k, points.length);
    const rnd = rng(seed), d2 = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;
    const centers = [points[Math.floor(rnd() * points.length)]];
    while (centers.length < k) {
      // k-means++: new centers far from the existing ones
      const w = points.map(p => Math.min(...centers.map(c => d2(p, c))));
      let r = rnd() * w.reduce((s, v) => s + v, 0), i = 0;
      while (i < points.length - 1 && (r -= w[i]) > 0) i++;
      centers.push(points[i]);
    }
    let counts = [];
    for (let it = 0; it < iterations; it++) {
      const sums = centers.map(() => [0, 0, 0]);
      counts = centers.map(() => 0);
      for (const p of points) {
        let best = 0, bd = Infinity;
        centers.forEach((c, ci) => { const d = d2(p, c); if (d < bd) { bd = d; best = ci; } });
        sums[best][0] += p[0]; sums[best][1] += p[1]; sums[best][2] += p[2];
        counts[best]++;
      }
      centers.forEach((c, ci) => { if (counts[ci]) centers[ci] = sums[ci].map(v => v / counts[ci]); });
    }
    return centers.map((c, i) => ({ c, n: counts[i] })).sort((a, b) => b.n - a.n).map(x => x.c);
  }

  return { STYLES, cells, lines, kmeans, rng };
})();
