/* The 3D print model as the "3D print" dialog builds it, from the picture's grid of colors to the files:
   thin towers lowered, the finishing (frame, rounded corners, hanging hole, magnet pockets), the solids of
   either kind of model, and the 3MF / STL files. Pure: runs in a worker too. */
import * as M from './model3d.ts';
import { zip } from './zip.ts';

export interface Build3DOptions {
  /** 'height': one nozzle, colors by height; 'flat': several filaments, one part per color */
  mode: 'height' | 'flat';
  layerHeight: number;
  layersPerColor: number;
  baseLayers: number;
  tileLayers: number;
  groutRecess: number;
  /** thin towers: narrowest raised part (mm), and how many times taller than wide it may be */
  minWidth: number;
  maxRatio: number;
  /** finishing, mm (0: none); the frame stands frameRaise layers above the tiles */
  frame: number;
  frameRaise: number;
  corner: number;
  hole: number;
  magnet: number;
  magnetDepth: number;
}
/** The model: colors in print order (indexes into the picture's colors), the grid of levels, cells per level. */
export interface Model3D { list: number[]; grid: Int16Array; counts: number[]; lowered: number }
/** The picture with its finishing: grid of levels (-1 unpainted, -2 nothing, FRAME), and where the magnets go. */
export interface Layout { grid: Int16Array; w: number; h: number; mask: Uint8Array | null }

/** Material kept around the hanging hole and the magnets, mm. */
export const MARGIN = 2;
/** The magnet pockets leave at least this many layers above them. */
const KEEP = 2;

export const printSettings = (o: Build3DOptions): M.PrintSettings => ({ layerHeight: o.layerHeight, layersPerColor: o.layersPerColor, baseLayers: o.baseLayers });
export const flatSettings = (o: Build3DOptions): M.FlatSettings => ({ layerHeight: o.layerHeight, baseLayers: o.baseLayers, tileLayers: o.tileLayers, groutRecess: Math.min(o.groutRecess, o.tileLayers - 1) });
export const layersOf = (mm: number, o: Build3DOptions): number => Math.max(1, Math.round(mm / o.layerHeight));

/**
 * The model as it will be printed: colors in print order (those that still have pieces), and the grid of
 * levels after thin towers were lowered. Lowering can empty a color, which moves the ones above it down:
 * so this repeats until it settles. colorGrid: color index per cell (-1 unpainted); order: color indexes,
 * bottom first; counts: cells per color; isLine: grout flag per color index.
 */
export function towers(colorGrid: Int16Array, w: number, h: number, cell: number, order: number[], counts: number[], isLine: boolean[], o: Build3DOptions, progress?: (f: number) => void): Model3D {
  let list = order.filter(i => counts[i] > 0), out: Model3D = { list, grid: new Int16Array(0), counts: [], lowered: 0 };
  // the picture as color indexes, with each round's lowering kept for the next
  const g = Int16Array.from(colorGrid);
  let lowered = 0;
  for (let round = 0; round < 4; round++) {
    progress?.(round / 4);
    const rank = new Int16Array(isLine.length).fill(-1);
    list.forEach((ci, k) => { rank[ci] = k; });
    const levels = g.map(v => (v < 0 ? -1 : rank[v]));
    const heightOf = o.mode === 'flat' ? M.flatHeights(list.map(ci => isLine[ci]), flatSettings(o)) : undefined;
    const res = M.removeTowers(levels, w, h, cell, printSettings(o), { minWidth: o.minWidth, maxRatio: o.maxRatio, heightOf });
    lowered += res.lowered;
    const c = list.map(() => 0);
    for (let p = 0; p < res.grid.length; p++) {
      const lv = res.grid[p];
      if (lv >= 0) c[lv]++;
      g[p] = lv < 0 ? -1 : list[lv];
    }
    out = { list, grid: res.grid, counts: c, lowered };
    if (c.every(n => n > 0)) break;
    list = list.filter((_, k) => c[k] > 0);
  }
  return out;
}

/** Top of the frame, in layers: above the tiles by "raised by". n: number of levels. */
export const frameTop = (n: number, o: Build3DOptions): number =>
  (o.mode === 'flat' ? o.baseLayers + o.tileLayers : M.topLayer(Math.max(0, n - 1), printSettings(o))) + o.frameRaise;

/** The picture (grid of levels, cell mm) with its frame, rounded corners and hanging hole, and the magnets' cells. */
export function layout(g: Int16Array, w: number, h: number, cell: number, o: Build3DOptions): Layout {
  const f = M.finishGrid(g, w, h, { frame: o.frame / cell, corner: o.corner / cell, hole: o.hole / cell }, MARGIN / cell);
  const inset = (o.magnet / 2 + MARGIN + o.corner * 0.3) / cell;
  return { ...f, mask: o.magnet > 0 ? M.pocketMask(f.w, f.h, o.magnet / cell, inset) : null };
}

/** Height of a cell's column (layers), as the solids will have it. grout: flag per level. */
export function columnTop(lv: number, grout: boolean[], o: Build3DOptions): number {
  if (lv === -2) return 0;
  if (lv === M.FRAME) return frameTop(grout.length, o);
  if (o.mode === 'flat') return Math.round(M.flatHeights(grout, flatSettings(o))(lv) / o.layerHeight);
  return lv < 0 ? o.baseLayers : M.topLayer(lv, printSettings(o));
}
/** How deep the magnet pockets can be (layers; 0: none): at least two layers stay above them. */
export function pocketDepth(lay: Layout, grout: boolean[], o: Build3DOptions): number {
  if (!lay.mask) return 0;
  let d = layersOf(o.magnetDepth, o);
  for (let i = 0; i < lay.mask.length; i++) if (lay.mask[i]) { const top = columnTop(lay.grid[i], grout, o); if (top > 0) d = Math.min(d, top - KEEP); }
  return Math.max(0, d);
}

/**
 * The model's solids: one for a single nozzle (the frame in the top color), or the parts of the flat model
 * (base plate -1, frame FRAME, one per level) – with the magnet pockets cut into the bottom.
 */
export function solids(lay: Layout, grout: boolean[], o: Build3DOptions): { part: number; solid: M.Solid }[] {
  const n = grout.length;
  let out: { part: number; solid: M.Solid }[];
  if (o.mode === 'flat') {
    out = M.flatParts(lay.grid, lay.w, lay.h, n, grout, flatSettings(o));
    if (o.frame > 0) out.splice(o.baseLayers ? 1 : 0, 0, { part: M.FRAME, solid: M.frameSolid(lay.grid, o.baseLayers, frameTop(n, o), 0) });
  } else {
    const sol = M.heightSolid(lay.grid, printSettings(o)), top = frameTop(n, o);
    for (let i = 0; i < lay.grid.length; i++) if (lay.grid[i] === M.FRAME) { sol.top[i] = top; sol.level[i] = n - 1; }
    out = [{ part: 0, solid: sol }];
  }
  if (lay.mask) M.cutPockets(out.map(p => p.solid), lay.mask, layersOf(o.magnetDepth, o), KEEP);
  return out;
}

/** A grid thinned out to about `maxCells` cells (every f-th cell), with the cell size grown to match. */
export function downsample(g: Int16Array, w: number, h: number, cell: number, maxCells: number): { grid: Int16Array; w: number; h: number; cell: number } {
  const f = Math.max(1, Math.ceil(Math.sqrt(w * h / maxCells)));
  if (f === 1) return { grid: g, w, h, cell };
  const W = Math.ceil(w / f), H = Math.ceil(h / f), out = new Int16Array(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) out[y * W + x] = g[Math.min(h - 1, y * f) * w + Math.min(w - 1, x * f)];
  return { grid: out, w: W, h: H, cell: cell * f };
}

/** What a model is built from: the grid of levels after the towers, its cell size, and grout per level. */
export interface Shape { grid: Int16Array; w: number; h: number; cell: number; grout: boolean[] }

/** The whole model as one mesh (the parts of a flat one merged), for looking at. */
export function viewMesh(s: Shape, o: Build3DOptions): M.Mesh {
  const lay = layout(s.grid, s.w, s.h, s.cell, o);
  return M.mergeMeshes(solids(lay, s.grout, o).map(p => M.solidMesh(p.solid, lay.w, lay.h, s.cell, o.layerHeight)));
}

export interface ExportRequest {
  kind: '3mf' | 'stl';
  shape: Shape;
  o: Build3DOptions;
  /** color of each level */
  colors: string[];
  /** file name without extension */
  name: string;
  slicer: M.PartsSlicer;
  /** names of the flat model's base plate and frame, in the page's language */
  labels: { base: string; frame: string };
}
export interface ExportResult { fileName: string; type: string; data: Uint8Array; triangles: number; parts: number }

/** The model as a file: 3MF or STL; the flat model as a parts 3MF or a ZIP with one STL per part. */
export async function exportModel(r: ExportRequest, progress?: (f: number) => void): Promise<ExportResult> {
  const { shape: s, o } = r, lay = layout(s.grid, s.w, s.h, s.cell, o);
  progress?.(0.05);
  const sol = solids(lay, s.grout, o);
  progress?.(0.15);
  const meshes = sol.map((p, k) => {
    const m = M.solidMesh(p.solid, lay.w, lay.h, s.cell, o.layerHeight);
    progress?.(0.15 + 0.7 * (k + 1) / sol.length);
    return m;
  });
  const triangles = meshes.reduce((t, m) => t + m.triangles.length / 3, 0);
  const done = (fileName: string, type: string, data: Uint8Array): ExportResult => ({ fileName, type, data, triangles, parts: meshes.length });
  if (o.mode === 'flat') {
    const parts: M.ModelPart[] = sol.map((p, k) => {
      const lv = Math.max(0, p.part), color = r.colors[lv];
      const name = p.part === M.FRAME ? r.labels.frame : p.part < 0 ? r.labels.base : `${p.part + 1} ${color}`;
      return { name, color, mesh: meshes[k], filament: lv + 1 };
    });
    if (r.kind === '3mf') return done(r.name + '.3mf', 'model/3mf', await zip(M.threeMfPartsFiles(parts, r.name, r.slicer)));
    // one STL per part: the base plate, the frame, then filament 1, 2, …
    const files = sol.map((p, k) => ({
      name: `${r.name}-${p.part === M.FRAME ? 'frame' : p.part < 0 ? 'base' : `${p.part + 1}-${r.colors[p.part].slice(1)}`}.stl`,
      data: new Uint8Array(M.stl(parts[k].mesh, parts[k].name)),
    }));
    return done(r.name + '-stl.zip', 'application/zip', await zip(files));
  }
  if (r.kind === '3mf') return done(r.name + '.3mf', 'model/3mf', await zip(M.threeMfFiles(meshes[0], M.colorPlan(r.colors, printSettings(o)), r.name)));
  return done(r.name + '.stl', 'model/stl', new Uint8Array(M.stl(meshes[0], r.name)));
}
