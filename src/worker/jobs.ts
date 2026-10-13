/* The heavy work both apps hand to a worker (see shared/work.ts): plain data in, plain data out, no page.
   The same functions run on the page when there is no worker. */
import * as R from '../lib/raster.ts';
import * as AutoMosaic from '../lib/automosaic.ts';
import * as B from '../lib/build3d.ts';
import { piecesSvg } from '../lib/vectorize.ts';
import { photoMosaic, type PhotoMosaicJob } from '../lib/photo.ts';
import { readGcode } from '../lib/gcode.ts';
import { applyAdjust, type Adjust } from '../lib/adjust.ts';
import { inpaint } from '../lib/inpaint.ts';

export type Progress = (f: number) => void;

export interface MosaicJob {
  img: R.Img;
  /** colors to use (null: keep the picture's) */
  palette: string[] | null;
  shape: string;
  /** tile size and grout width in pixels; detail 0…100 (smaller tiles where the picture is busy) */
  tile: number;
  grout: number;
  groutColor: string | null;
  detail: number;
}

/** The mosaic of an image: the exact square grid when it can be, else the tile layout's polygons. */
function mosaic(m: MosaicJob, progress: Progress) {
  const img = m.img, adaptive = m.detail > 0 && ['square', 'brick', 'irregular'].includes(m.shape);
  if (m.shape === 'offset' || (m.shape === 'square' && !adaptive)) {
    return R.mosaic(img, { tile: m.tile, grout: m.grout, groutColor: m.groutColor, palette: m.palette, bricks: m.shape === 'offset' });
  }
  // an area counts as detailed when its colors spread more than this (Lab units); more detail → lower bar
  const bar = 4 + (1 - m.detail / 100) * 26;
  const busy = (x: number, y: number, w: number, h: number) => R.detailAt(img, x, y, w, h) > bar;
  // bricks are two squares wide: their size is the row height
  const size = m.shape === 'brick' ? m.tile / 2 : m.tile;
  const cells = AutoMosaic.cells({ style: m.shape, box: { x: 0, y: 0, w: img.width, h: img.height }, size, detail: m.detail / 100, busy, seed: 7 });
  progress(0.5);
  return R.mosaicCells(img, cells, { grout: m.grout, groutColor: m.groutColor, palette: m.palette });
}

export interface TowersJob {
  colorGrid: Int16Array; w: number; h: number; cell: number;
  order: number[]; counts: number[]; isLine: boolean[]; o: B.Build3DOptions;
}

export const jobs = {
  mosaic: (a: MosaicJob, p: Progress) => mosaic(a, p),
  vectorize: (a: { img: R.Img; grout: string | null; widthMm: number; name: string }, p: Progress) => piecesSvg(a.img, a.grout, a.widthMm, a.name, p),
  towers: (a: TowersJob, p: Progress) => B.towers(a.colorGrid, a.w, a.h, a.cell, a.order, a.counts, a.isLine, a.o, p),
  photoMosaic: (a: PhotoMosaicJob, p: Progress) => photoMosaic(a, p),
  gcode: (a: { text: string }, p: Progress) => readGcode(a.text, p),
  view3d: (a: { shape: B.Shape; o: B.Build3DOptions }) => B.viewMesh(a.shape, a.o),
  export3d: (a: B.ExportRequest, p: Progress) => B.exportModel(a, p),
  inpaint: (a: { img: R.Img; mask: Uint8Array }, p: Progress) => ({ width: a.img.width, height: a.img.height, data: inpaint(a.img, a.mask, p) }) as R.Img,
  adjust: (a: { img: R.Img; adjust: Adjust }) => ({ width: a.img.width, height: a.img.height, data: applyAdjust(a.img.data, a.img.width, a.img.height, a.adjust) }) as R.Img,
};
export type Jobs = typeof jobs;
export type JobName = keyof Jobs;
export type JobArgs<N extends JobName> = Parameters<Jobs[N]>[0];
export type JobResult<N extends JobName> = Awaited<ReturnType<Jobs[N]>>;

/** The buffers in a result, to hand them over instead of copying (typed arrays at the top or one level down). */
export function buffersIn(v: unknown, depth = 0, out = new Set<ArrayBuffer>()): ArrayBuffer[] {
  if (ArrayBuffer.isView(v)) { if (v.buffer instanceof ArrayBuffer) out.add(v.buffer); }
  else if (v && typeof v === 'object' && depth < 2) for (const x of Object.values(v)) buffersIn(x, depth + 1, out);
  return [...out];
}
