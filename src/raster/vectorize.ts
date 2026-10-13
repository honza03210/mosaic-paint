/* Raster tiles → vector tiles: every piece (connected area of one color) of the image becomes a polygon
   in the vector app, at the real size, so the vector app's print templates, laying plan and editing work
   on it. The grout color (if any) becomes the page background; tiles are the other pieces. */
import * as R from '../lib/raster.ts';
import { piecesSvg } from '../lib/vectorize.ts';
import { Store } from '../lib/store.ts';
import { $, toast, working } from '../shared/ui.ts';
import { run, isCancelled } from '../shared/work.ts';
import { state, rt, savePrefs } from './state.ts';
import { doc, flatImage as getImage } from './canvas.ts';
import { colorRows } from './report.ts';
import { t } from '../shared/i18n.ts';

const MAX_TILES = 20000;
const n = (v: number) => String(Math.round(v * 1000) / 1000);

/** The palette's name in the vector app: the file's. */
const paletteName = () => rt.fileName.replace(/\.[a-z0-9]+$/i, '');
/** The image as a Mosaic Paint SVG: one filled polygon (or path, with holes) per piece. */
export function vectorSVG(grout: string | null, widthMm: number): { svg: string; tiles: number } {
  return piecesSvg(getImage(), grout, widthMm, paletteName());
}

function fillDialog(): void {
  const rows = colorRows(R.pieces(getImage())), sel = $('#vz-grout');
  sel.innerHTML = `<option value="">${t('No grout – every piece is a tile')}</option>`
    + rows.map(r => `<option value="${r.color}">${r.color} – ${t('{n} {n|piece|pieces}', { n: r.pieces })}</option>`).join('');
  // a mosaic made here has grout in the mosaic's grout color
  sel.value = rows.some(r => r.color === state.mosaic.groutColor) ? state.mosaic.groutColor : '';
  $('#vz-width').value = state.realWidth;
  info();
}
function info(): void {
  const grout = $('#vz-grout').value || null, rows = colorRows(R.pieces(getImage()));
  const tiles = rows.filter(r => r.color !== grout).reduce((s, r) => s + r.pieces, 0);
  const size = { n: tiles, w: n(state.realWidth), h: n(state.realWidth * doc.height / doc.width) };
  $('#vz-info').textContent = tiles > MAX_TILES
    ? t('{n} {n|tile|tiles} at {w} × {h} mm – too many: make a mosaic or reduce the picture to the palette first.', size)
    : t('{n} {n|tile|tiles} at {w} × {h} mm.', size);
  $('#vz-go').disabled = tiles > MAX_TILES || !tiles;
}
export function bindVectorize(): void {
  $('#btn-vectorize').onclick = () => { fillDialog(); $('#dlg-vectorize').showModal(); };
  $('#vz-grout').onchange = info;
  $('#vz-width').onchange = () => {
    const v = +$('#vz-width').value;
    if (v > 0) { state.realWidth = v; savePrefs(); }
    $('#vz-width').value = state.realWidth;
    info();
  };
  $('#vz-go').onclick = async () => {
    $('#dlg-vectorize').close();
    const job = working(t('Tracing the tiles…'));
    let res: { svg: string; tiles: number };
    try {
      res = await run('vectorize', { img: getImage(), grout: $('#vz-grout').value || null, widthMm: state.realWidth, name: paletteName() }, { progress: job.set });
    } catch (e) {
      job.done();
      if (!isCancelled(e)) toast(t('Could not trace the tiles.'));
      return;
    }
    job.done();
    const { svg, tiles } = res;
    try {
      await Store.set('handoff', { svg, name: paletteName() + '.svg', time: Date.now(), tiles });
    } catch { toast(t('Could not hand the tiles over (browser storage unavailable).')); return; }
    location.href = 'index.html#from-raster';
  };
}
