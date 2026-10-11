/* A mosaic as a 3D model for printing with filament changes: every color is raised to its own height,
   so when the printer swaps filament at the right layers, each tile's top shows its color.

   Color i (in print order) reaches (base + (i + 1) × layersPerColor) layers; unpainted areas stay at the
   base. The model is one closed surface built from rectangles of equal height (found greedily). */

export interface PrintSettings {
  /** layer height, mm */
  layerHeight: number;
  /** layers of each color band */
  layersPerColor: number;
  /** layers of the base plate under everything (0: unpainted areas are left open) */
  baseLayers: number;
}
export interface Rect { x: number; y: number; w: number; h: number; level: number }
/** Triangles (indexes into vertices, counter-clockwise from outside) with the color band of each. */
export interface Mesh { vertices: number[]; triangles: number[]; levels: number[] }

/** Top of color level i (0 = printed first), in layers. */
export const topLayer = (i: number, s: PrintSettings): number => s.baseLayers + (i + 1) * s.layersPerColor;

/**
 * Covers the cells of each level with as few rectangles as possible (greedy: grow right, then down).
 * grid[y * w + x] = level, or -1 for no color.
 */
export function greedyRects(grid: Int16Array | number[], w: number, h: number): Rect[] {
  const done = new Uint8Array(w * h), out: Rect[] = [];
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x, lv = grid[i];
    if (lv < 0 || done[i]) continue;
    let rw = 1;
    while (x + rw < w && grid[i + rw] === lv && !done[i + rw]) rw++;
    let rh = 1;
    grow: while (y + rh < h) {
      const row = (y + rh) * w + x;
      for (let k = 0; k < rw; k++) if (grid[row + k] !== lv || done[row + k]) break grow;
      rh++;
    }
    for (let yy = y; yy < y + rh; yy++) done.fill(1, yy * w + x, yy * w + x + rw);
    out.push({ x, y, w: rw, h: rh, level: lv });
  }
  return out;
}

/** Height of every cell in layers: its color's band top, the base for unpainted cells (0 = empty). */
export function cellHeights(grid: Int16Array | number[], s: PrintSettings): Int16Array {
  const out = new Int16Array(grid.length);
  for (let i = 0; i < grid.length; i++) out[i] = grid[i] < 0 ? s.baseLayers : topLayer(grid[i], s);
  return out;
}

/**
 * The model as one closed surface (each edge shared by exactly two triangles): top faces (one per
 * rectangle of equal height), the bottom, and walls only where neighbouring heights differ. Where a corner
 * of one face lies on the edge of another, that edge gets the corner as an extra vertex (no T-junctions);
 * such faces are split into a fan around their middle.
 * grid: color level per cell (-1 unpainted), cell: cell size in mm. The picture's y axis points down; the
 * model's points up.
 */
export function closedMesh(grid: Int16Array | number[], w: number, h: number, cell: number, s: PrintSettings): Mesh {
  const Hc = cellHeights(grid, s);
  // all coordinates are whole cells (x, y) and layers (z) until the end, so they compare exactly
  const height = (x: number, y: number) => (x < 0 || y < 0 || x >= w || y >= h ? 0 : Hc[y * w + x]);
  const level = (x: number, y: number) => (x < 0 || y < 0 || x >= w || y >= h ? 0 : Math.max(0, grid[y * w + x]));
  // a face: corner o and two edge vectors u, v (u × v points outwards), the band it is colored with
  interface Face { o: number[]; u: number[]; v: number[]; level: number }
  const faces: Face[] = [];
  const Y = (y: number) => h - y; // picture row → model y

  // top faces: rectangles of equal height
  const tops = new Int16Array(w * h);
  for (let i = 0; i < w * h; i++) tops[i] = Hc[i] > 0 ? Hc[i] : -1;
  for (const r of greedyRects(tops, w, h)) {
    const lv = level(r.x, r.y);
    faces.push({ o: [r.x, Y(r.y + r.h), r.level], u: [r.w, 0, 0], v: [0, r.h, 0], level: lv });
  }
  // the bottom: wherever there is material
  const solid = new Int16Array(w * h);
  for (let i = 0; i < w * h; i++) solid[i] = Hc[i] > 0 ? 0 : -1;
  for (const r of greedyRects(solid, w, h)) faces.push({ o: [r.x, Y(r.y + r.h), 0], u: [0, r.h, 0], v: [r.w, 0, 0], level: 0 });

  // walls along the picture's rows: between row y-1 (north) and row y (south), at model y = h - y
  for (let y = 0; y <= h; y++) {
    for (let x = 0; x < w;) {
      const n = height(x, y - 1), so = height(x, y);
      if (n === so) { x++; continue; }
      let x1 = x + 1;
      while (x1 < w && height(x1, y - 1) === n && height(x1, y) === so) x1++;
      const lo = Math.min(n, so), dz = Math.abs(n - so), Y0 = Y(y);
      // the higher side's material faces the lower side
      if (n > so) faces.push({ o: [x, Y0, lo], u: [x1 - x, 0, 0], v: [0, 0, dz], level: level(x, y - 1) }); // faces -y
      else faces.push({ o: [x, Y0, lo], u: [0, 0, dz], v: [x1 - x, 0, 0], level: level(x, y) }); // faces +y
      x = x1;
    }
  }
  // walls along the columns: between column x-1 (west) and column x (east)
  for (let x = 0; x <= w; x++) {
    for (let y = h - 1; y >= 0;) {
      const we = height(x - 1, y), ea = height(x, y);
      if (we === ea) { y--; continue; }
      let y1 = y - 1;
      while (y1 >= 0 && height(x - 1, y1) === we && height(x, y1) === ea) y1--;
      // rows y1+1 … y, i.e. model y from Y(y + 1) to Y(y1 + 1)
      const lo = Math.min(we, ea), dz = Math.abs(we - ea), Y0 = Y(y + 1), dy = y - y1;
      if (ea > we) faces.push({ o: [x, Y0, lo], u: [0, 0, dz], v: [0, dy, 0], level: level(x, y) }); // faces -x
      else faces.push({ o: [x, Y0, lo], u: [0, dy, 0], v: [0, 0, dz], level: level(x - 1, y) }); // faces +x
      y = y1;
    }
  }

  // every corner, indexed by the two coordinates it shares with edges along each axis
  // (numeric keys: coordinates are whole numbers well below 1e5, and halves only for the fan centres)
  const along: Map<number, number[]>[] = [new Map(), new Map(), new Map()];
  const corner = (f: Face, a: number, b: number) => f.o.map((c, k) => c + a * f.u[k] + b * f.v[k]);
  const lineKey = (p: number[], axis: number) => (axis === 0 ? p[1] * 1e5 + p[2] : axis === 1 ? p[0] * 1e5 + p[2] : p[0] * 1e5 + p[1]);
  for (const f of faces) for (const [a, b] of [[0, 0], [1, 0], [1, 1], [0, 1]]) {
    const p = corner(f, a, b);
    for (let axis = 0; axis < 3; axis++) {
      const key = lineKey(p, axis);
      let list = along[axis].get(key);
      if (!list) along[axis].set(key, list = []);
      list.push(p[axis]);
    }
  }
  for (const m of along) for (const [k, list] of m) m.set(k, [...new Set(list)].sort((a, b) => a - b));

  const vertices: number[] = [], triangles: number[] = [], levels: number[] = [], index = new Map<number, number>();
  const vertex = (p: number[]) => {
    const key = (p[0] * 2e5 + p[1] * 2) * 2e5 + p[2] * 2;
    let i = index.get(key);
    if (i == null) {
      i = vertices.length / 3;
      index.set(key, i);
      vertices.push(p[0] * cell, p[1] * cell, p[2] * s.layerHeight);
    }
    return i;
  };
  for (const f of faces) {
    const c = [corner(f, 0, 0), corner(f, 1, 0), corner(f, 1, 1), corner(f, 0, 1)];
    // the outline, with every corner of another face that lies on one of its edges
    const ring: number[][] = [];
    for (let e = 0; e < 4; e++) {
      const a = c[e], b = c[(e + 1) % 4], axis = a.findIndex((v, k) => v !== b[k]);
      ring.push(a);
      const lo = Math.min(a[axis], b[axis]), hi = Math.max(a[axis], b[axis]);
      const mid = (along[axis].get(lineKey(a, axis)) || []).filter(v => v > lo && v < hi);
      if (a[axis] > b[axis]) mid.reverse();
      for (const v of mid) { const p = [...a]; p[axis] = v; ring.push(p); }
    }
    const ids = ring.map(vertex);
    if (ids.length === 4) {
      triangles.push(ids[0], ids[1], ids[2], ids[0], ids[2], ids[3]);
      levels.push(f.level, f.level);
    } else {
      const m = vertex(corner(f, 0.5, 0.5));
      for (let i = 0; i < ids.length; i++) { triangles.push(m, ids[i], ids[(i + 1) % ids.length]); levels.push(f.level); }
    }
  }
  return { vertices, triangles, levels };
}
/** Binary STL of a mesh (units: mm). */
export function stl(mesh: Mesh, name = 'Mosaic Paint'): ArrayBuffer {
  const V = mesh.vertices, T = mesh.triangles, n = T.length / 3, buf = new ArrayBuffer(84 + n * 50), dv = new DataView(buf);
  const header = `${name} – multi-color by layer`.slice(0, 80);
  for (let i = 0; i < header.length; i++) dv.setUint8(i, header.charCodeAt(i) & 0x7f);
  dv.setUint32(80, n, true);
  let o = 84;
  for (let t = 0; t < n; t++) {
    const p = [0, 1, 2].map(k => T[t * 3 + k] * 3);
    const ux = V[p[1]] - V[p[0]], uy = V[p[1] + 1] - V[p[0] + 1], uz = V[p[1] + 2] - V[p[0] + 2];
    const vx = V[p[2]] - V[p[0]], vy = V[p[2] + 1] - V[p[0] + 1], vz = V[p[2] + 2] - V[p[0] + 2];
    let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    const L = Math.hypot(nx, ny, nz) || 1;
    nx /= L; ny /= L; nz /= L;
    for (const v of [nx, ny, nz]) { dv.setFloat32(o, v, true); o += 4; }
    for (const q of p) for (let k = 0; k < 3; k++) { dv.setFloat32(o, V[q + k], true); o += 4; }
    dv.setUint16(o, 0, true);
    o += 2;
  }
  return buf;
}

export interface PlanStep { color: string; fromLayer: number; toLayer: number; changeAtLayer: number | null; z: number | null }
/** When to load which filament: color 0 prints the base and its band; each next color starts a band. */
export function colorPlan(colors: string[], s: PrintSettings): PlanStep[] {
  return colors.map((color, i) => {
    const from = i === 0 ? 1 : topLayer(i - 1, s) + 1, to = topLayer(i, s);
    return { color, fromLayer: from, toLayer: to, changeAtLayer: i === 0 ? null : from, z: i === 0 ? null : +(from * s.layerHeight).toFixed(3) };
  });
}
/** Total height of the model in mm. */
export const modelHeight = (nColors: number, s: PrintSettings): number => +(topLayer(nColors - 1, s) * s.layerHeight).toFixed(3);

// ---- 3MF: the model plus the filament changes, read by the slicer ----------------------------------------
const xmlAttr = (v: string) => v.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const num = (v: number) => String(+v.toFixed(4));
/** The 3MF model file: the mesh, colored by band (for viewers; slicers use the color changes). */
export function modelXml(mesh: Mesh, colors: string[], name: string): string {
  const V = mesh.vertices, T = mesh.triangles, out: string[] = [];
  out.push('<?xml version="1.0" encoding="UTF-8"?>',
    '<model unit="millimeter" xml:lang="en-US" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">',
    `<metadata name="Title">${xmlAttr(name)}</metadata>`, '<metadata name="Application">Mosaic Paint</metadata>',
    '<resources>', '<basematerials id="1">');
  for (const c of colors) out.push(`<base name="${xmlAttr(c)}" displaycolor="${c.toUpperCase()}FF"/>`);
  out.push('</basematerials>', `<object id="2" type="model" pid="1" pindex="0" name="${xmlAttr(name)}">`, '<mesh>', '<vertices>');
  for (let i = 0; i < V.length; i += 3) out.push(`<vertex x="${num(V[i])}" y="${num(V[i + 1])}" z="${num(V[i + 2])}"/>`);
  out.push('</vertices>', '<triangles>');
  for (let t = 0; t < T.length; t += 3) out.push(`<triangle v1="${T[t]}" v2="${T[t + 1]}" v3="${T[t + 2]}" pid="1" p1="${Math.max(0, mesh.levels[t / 3])}"/>`);
  out.push('</triangles>', '</mesh>', '</object>', '</resources>', '<build>', '<item objectid="2"/>', '</build>', '</model>');
  return out.join('\n');
}
/**
 * The color changes as PrusaSlicer keeps them in its 3MF projects: it inserts M600 at the start of the
 * layer at each print_z. (Bambu Studio and OrcaSlicer only read theirs from projects they wrote themselves.)
 */
export function colorChangeXml(plan: PlanStep[]): string {
  return ['<?xml version="1.0" encoding="utf-8"?>', '<custom_gcodes_per_print_z>',
    ...plan.filter(p => p.z != null).map(p => `<code print_z="${p.z}" type="0" extruder="1" color="${p.color}" extra="" gcode="M600"/>`),
    '<mode value="SingleExtruder"/>', '</custom_gcodes_per_print_z>'].join('\n');
}
/** All files of the 3MF archive (zip them with lib/zip.ts). */
export function threeMfFiles(mesh: Mesh, plan: PlanStep[], name: string): { name: string; data: string }[] {
  return [
    { name: '[Content_Types].xml', data: '<?xml version="1.0" encoding="UTF-8"?>\n<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
      + '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
      + '<Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/>'
      + '<Default Extension="xml" ContentType="application/xml"/></Types>' },
    { name: '_rels/.rels', data: '<?xml version="1.0" encoding="UTF-8"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
      + '<Relationship Target="/3D/3dmodel.model" Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/></Relationships>' },
    { name: '3D/3dmodel.model', data: modelXml(mesh, plan.map(p => p.color), name) },
    { name: 'Metadata/Prusa_Slicer_custom_gcode_per_print_z.xml', data: colorChangeXml(plan) },
  ];
}
