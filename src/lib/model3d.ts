/* A mosaic as a 3D model for printing with filament changes: every color is raised to its own height,
   so when the printer swaps filament at the right layers, each tile's top shows its color.

   Color i (in print order) reaches (base + (i + 1) × layersPerColor) layers; unpainted areas stay at the
   base. The solid is a set of boxes (one per rectangle of equal color, found greedily) standing on a base
   plate – boxes that touch are merged by every slicer. */

export interface PrintSettings {
  /** layer height, mm */
  layerHeight: number;
  /** layers of each color band */
  layersPerColor: number;
  /** layers of the base plate under everything (0: unpainted areas are left open) */
  baseLayers: number;
}
export interface Rect { x: number; y: number; w: number; h: number; level: number }
/** level: the color band it belongs to (the base plate is band 0) */
export interface Box { x0: number; y0: number; z0: number; x1: number; y1: number; z1: number; level: number }
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

/**
 * The boxes of the model in mm: the base plate, then one box per rectangle up to its color's height.
 * cell: size of a grid cell in mm. The picture's y axis points down; the model's points up.
 */
export function modelBoxes(grid: Int16Array | number[], w: number, h: number, cell: number, s: PrintSettings): Box[] {
  const lh = s.layerHeight, base = s.baseLayers * lh, H = h * cell, out: Box[] = [];
  if (base > 0) out.push({ x0: 0, y0: 0, z0: 0, x1: w * cell, y1: H, z1: base, level: 0 });
  for (const r of greedyRects(grid, w, h)) {
    out.push({
      x0: r.x * cell, x1: (r.x + r.w) * cell,
      y0: H - (r.y + r.h) * cell, y1: H - r.y * cell,
      z0: base, z1: topLayer(r.level, s) * lh, level: r.level,
    });
  }
  return out;
}

/** The boxes as one mesh: 8 corners and 12 triangles each. */
export function boxMesh(boxes: Box[]): Mesh {
  const vertices: number[] = [], triangles: number[] = [], levels: number[] = [];
  // corner k: x from bit 0, y from bit 1, z from bit 2
  const FACES = [[0, 2, 3], [0, 3, 1], [4, 5, 7], [4, 7, 6], [0, 1, 5], [0, 5, 4], [2, 6, 7], [2, 7, 3], [0, 4, 6], [0, 6, 2], [1, 3, 7], [1, 7, 5]];
  for (const b of boxes) {
    const o = vertices.length / 3;
    for (let k = 0; k < 8; k++) vertices.push(k & 1 ? b.x1 : b.x0, k & 2 ? b.y1 : b.y0, k & 4 ? b.z1 : b.z0);
    for (const t of FACES) { triangles.push(o + t[0], o + t[1], o + t[2]); levels.push(b.level); }
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
