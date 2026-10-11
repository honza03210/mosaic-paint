/* Reading a photo laid over the drawing: its colors at drawing points, how much detail an area has, palette
   suggestions, and a whole tile layout from it ("Mosaic from photo"). Pure: runs in a worker too. */
import * as Geo from './geometry.ts';
import * as Colors from './colors.ts';
import * as AutoMosaic from './automosaic.ts';

type Pt = { x: number; y: number };
export interface Box { x: number; y: number; w: number; h: number }
/** The photo's pixels (RGBA, W × H) and where it lies in the drawing. */
export interface PhotoPixels { data: Uint8ClampedArray; W: number; H: number; box: Box }
/** Color at a drawing point: [r, g, b], or null outside the photo or where it is transparent. */
export type Sampler = (p: Pt) => [number, number, number] | null;

export function sampler({ data, W, H, box }: PhotoPixels): Sampler {
  return (p) => {
    const u = Math.floor((p.x - box.x) / box.w * W), v = Math.floor((p.y - box.y) / box.h * H);
    if (u < 0 || v < 0 || u >= W || v >= H) return null;
    const i = (v * W + u) * 4;
    return data[i + 3] < 20 ? null : [data[i], data[i + 1], data[i + 2]];
  };
}

/** How much the photo's color varies inside a rectangle (average Lab distance from its mean). */
export function detailAt(at: Sampler, x: number, y: number, w: number, h: number): number {
  const labs: Colors.Lab[] = [];
  for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) {
    const c = at({ x: x + w * (i + 0.5) / 5, y: y + h * (j + 0.5) / 5 });
    if (c) labs.push(Colors.toLab(c));
  }
  if (labs.length < 2) return 0;
  const m = [0, 1, 2].map(k => labs.reduce((s, l) => s + l[k], 0) / labs.length);
  return labs.reduce((s, l) => s + Math.hypot(l[0] - m[0], l[1] - m[1], l[2] - m[2]), 0) / labs.length;
}

/** n colors that represent the photo inside box (k-means in Lab), most common first. */
export function suggestPalette(at: Sampler, box: Box, n: number): string[] {
  const labs: Colors.Lab[] = [];
  for (let i = 0; i < 70; i++) for (let j = 0; j < 70; j++) {
    const c = at({ x: box.x + box.w * (i + 0.5) / 70, y: box.y + box.h * (j + 0.5) / 70 });
    if (c) labs.push(Colors.toLab(c));
  }
  return [...new Set(AutoMosaic.kmeans(labs, n, 7).map(Colors.fromLab))];
}

export interface PhotoMosaicJob {
  photo: PhotoPixels;
  /** the page: tiles are laid over it */
  page: Box;
  style: string;
  size: number;
  /** 0…100: smaller tiles where the photo has detail */
  detail: number;
  seed: number;
  /** the drawing's tolerance (Geo.eps) */
  eps: number;
  /** tiles allowed at most (more: no lines are made) */
  maxTiles: number;
  /** colors to suggest for a new palette (0: none) */
  suggest: number;
}
/**
 * The lines of a tile layout over the page (smaller tiles where the photo is busy), and a suggested palette.
 * tiles: how many tiles the layout has (lines is empty when that is over maxTiles).
 */
export function photoMosaic(j: PhotoMosaicJob, progress?: (f: number) => void): { tiles: number; lines: { a: Pt; b: Pt }[]; palette: string[] } {
  Geo.setEps(j.eps);
  const at = sampler(j.photo), d = j.page;
  const page = [{ x: d.x, y: d.y }, { x: d.x + d.w, y: d.y }, { x: d.x + d.w, y: d.y + d.h }, { x: d.x, y: d.y + d.h }];
  // an area counts as detailed when its colors spread more than this (Lab units); more detail → lower bar
  const bar = 4 + (1 - j.detail / 100) * 26;
  const busy = (x: number, y: number, w: number, h: number) => detailAt(at, x, y, w, h) > bar;
  const cells = AutoMosaic.cells({ style: j.style, box: d, size: j.size, detail: j.detail / 100, busy, seed: j.seed });
  progress?.(0.5);
  if (cells.length > j.maxTiles) return { tiles: cells.length, lines: [], palette: [] };
  const lines = AutoMosaic.lines(cells, [page], (p) => Geo.pointInPolygon(p, page), j.eps);
  progress?.(0.85);
  return { tiles: cells.length, lines, palette: j.suggest ? suggestPalette(at, j.photo.box, j.suggest) : [] };
}
