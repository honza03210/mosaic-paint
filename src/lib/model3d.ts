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
export interface Box { x0: number; y0: number; z0: number; x1: number; y1: number; z1: number }

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
  if (base > 0) out.push({ x0: 0, y0: 0, z0: 0, x1: w * cell, y1: H, z1: base });
  for (const r of greedyRects(grid, w, h)) {
    out.push({
      x0: r.x * cell, x1: (r.x + r.w) * cell,
      y0: H - (r.y + r.h) * cell, y1: H - r.y * cell,
      z0: base, z1: topLayer(r.level, s) * lh,
    });
  }
  return out;
}

/** The 12 triangles of a box, wound counter-clockwise seen from outside: [normal, a, b, c]. */
function boxTriangles(b: Box): number[][] {
  const { x0, y0, z0, x1, y1, z1 } = b;
  return [
    [0, 0, -1, x0, y0, z0, x0, y1, z0, x1, y1, z0], [0, 0, -1, x0, y0, z0, x1, y1, z0, x1, y0, z0],
    [0, 0, 1, x0, y0, z1, x1, y0, z1, x1, y1, z1], [0, 0, 1, x0, y0, z1, x1, y1, z1, x0, y1, z1],
    [0, -1, 0, x0, y0, z0, x1, y0, z0, x1, y0, z1], [0, -1, 0, x0, y0, z0, x1, y0, z1, x0, y0, z1],
    [0, 1, 0, x0, y1, z0, x0, y1, z1, x1, y1, z1], [0, 1, 0, x0, y1, z0, x1, y1, z1, x1, y1, z0],
    [-1, 0, 0, x0, y0, z0, x0, y0, z1, x0, y1, z1], [-1, 0, 0, x0, y0, z0, x0, y1, z1, x0, y1, z0],
    [1, 0, 0, x1, y0, z0, x1, y1, z0, x1, y1, z1], [1, 0, 0, x1, y0, z0, x1, y1, z1, x1, y0, z1],
  ];
}
/** Binary STL of the boxes (units: mm). */
export function stl(boxes: Box[], name = 'Mosaic Paint'): ArrayBuffer {
  const n = boxes.length * 12, buf = new ArrayBuffer(84 + n * 50), dv = new DataView(buf);
  const header = `${name} – multi-color by layer`.slice(0, 80);
  for (let i = 0; i < header.length; i++) dv.setUint8(i, header.charCodeAt(i) & 0x7f);
  dv.setUint32(80, n, true);
  let o = 84;
  for (const b of boxes) for (const t of boxTriangles(b)) {
    for (let k = 0; k < 12; k++) { dv.setFloat32(o, t[k], true); o += 4; }
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
