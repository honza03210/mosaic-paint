/* Turning a picture into a mosaic: tiles (squares, offset squares, bricks, hexagons or irregular, smaller
   where the picture has detail) with grout, colored from the palette (or a palette suggested from the
   picture), and reducing a picture to the palette's colors. The tile layouts are the vector app's. */
import * as R from '../lib/raster.ts';
import { $, toast, working } from '../shared/ui.ts';
import { run, isCancelled } from '../shared/work.ts';
import { state, savePrefs } from './state.ts';
import { doc, dctx } from './canvas.ts';
import { commit } from './history.ts';
import { place } from './select.ts';
import { addPalette, suggestColors } from './palette.ts';
import { t } from '../shared/i18n.ts';

/** The area to work on: the selection, or the whole image. */
function region(): R.Box {
  if (state.floating) place();
  return state.sel || { x: 0, y: 0, w: doc.width, h: doc.height };
}
const total = (counts: Map<string, number>) => [...counts.values()].reduce((s, n) => s + n, 0);

/** Makes the mosaic in a worker (the result replaces the area when it is done). */
export async function makeMosaic(): Promise<void> {
  const m = state.mosaic, b = region();
  const img = dctx.getImageData(b.x, b.y, b.w, b.h);
  let palette: string[] | null = null;
  if (m.colors === 'palette') {
    palette = state.palette;
    if (!palette.length) { toast(t('The palette is empty – add colors, or let the mosaic suggest some.')); return; }
  } else if (m.colors === 'suggest') {
    palette = suggestColors(img, m.count);
    if (!palette.length) { toast(t('There is nothing to make a mosaic from (the area is transparent).')); return; }
    addPalette(t('From picture'), palette);
  }
  const job = working(t('Making the mosaic…'));
  const buttons = [$('#btn-mosaic'), $('#btn-reduce')];
  buttons.forEach(el => { el.disabled = true; });
  try {
    const res = await run('mosaic', {
      img: { width: img.width, height: img.height, data: img.data }, palette,
      shape: m.shape, tile: m.tile, grout: m.grout, groutColor: m.groutColor, detail: m.detail,
    }, { progress: job.set });
    dctx.putImageData(new ImageData(res.img.data, b.w, b.h), b.x, b.y);
    commit();
    job.done();
    toast(t('Made {n} {n|tile|tiles} in {c} {c|color|colors}.', { n: total(res.counts), c: res.counts.size }));
  } catch (e) {
    job.done();
    if (!isCancelled(e)) toast(t('Could not make the mosaic.'));
  } finally {
    buttons.forEach(el => { el.disabled = false; });
  }
}
export function reduceToPalette(): void {
  if (!state.palette.length) { toast(t('The palette is empty.')); return; }
  const b = region(), img = dctx.getImageData(b.x, b.y, b.w, b.h);
  const counts = R.quantize(img, state.palette);
  dctx.putImageData(img, b.x, b.y);
  commit();
  toast(t('Every pixel now has a palette color: {n} {n|pixel|pixels} in {c} {c|color|colors}.', { n: total(counts), c: counts.size }));
}

// ---- dialog ------------------------------------------------------------------------------------------
function estimate(): void {
  const m = state.mosaic, b = state.sel || { w: doc.width, h: doc.height }, ts = Math.max(2, m.tile);
  // area of one tile in ts² (a hexagon ts wide covers ts² × √3/2; a brick ts wide is half as high)
  const per = { hex: Math.sqrt(3) / 2, brick: 0.5 }[m.shape] || 1;
  const base = (b.w * b.h) / (ts * ts * per);
  // with detail, calm parts get bigger tiles: the size is the smallest tile
  const adaptive = m.detail > 0 && ['square', 'brick', 'irregular'].includes(m.shape);
  $('#mo-estimate').textContent = adaptive
    ? (state.sel ? t('At most about {n} tiles in the selection – bigger ones where the picture is calm.', { n: Math.round(base) }) : t('At most about {n} tiles – bigger ones where the picture is calm.', { n: Math.round(base) }))
    : (state.sel ? t('About {n} tiles in the selection.', { n: Math.round(base) }) : t('About {n} tiles.', { n: Math.round(base) }));
  $('#mo-detail-row').hidden = m.shape === 'hex' || m.shape === 'offset';
}
export function bindMosaic(): void {
  const m = state.mosaic;
  const num = (id: string, key: string, min: number) => {
    const i = $(id);
    i.value = m[key];
    i.onchange = () => { const v = Math.round(+i.value); if (v >= min) { m[key] = v; savePrefs(); } i.value = m[key]; estimate(); };
  };
  num('#mo-tile', 'tile', 2);
  num('#mo-grout', 'grout', 0);
  num('#mo-count', 'count', 2);
  $('#mo-grout-color').value = m.groutColor;
  $('#mo-grout-color').onchange = (e: any) => { m.groutColor = e.target.value; savePrefs(); };
  $('#mo-shape').value = m.shape;
  $('#mo-shape').onchange = (e: any) => { m.shape = e.target.value; savePrefs(); estimate(); };
  $('#mo-detail').value = m.detail;
  $('#mo-detail').onchange = (e: any) => { m.detail = +e.target.value; savePrefs(); estimate(); };
  for (const r of document.querySelectorAll<HTMLInputElement>('input[name=mo-colors]')) {
    r.checked = r.value === m.colors;
    r.onchange = () => { if (r.checked) { m.colors = r.value; savePrefs(); } };
  }
  $('#btn-mosaic').onclick = () => { estimate(); $('#dlg-mosaic').showModal(); };
  $('#mo-go').onclick = () => { $('#dlg-mosaic').close(); makeMosaic(); };
  $('#btn-reduce').onclick = reduceToPalette;
}
