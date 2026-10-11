/* Mosaic Paint – "Mosaic from photo" dialog: lays out tiles over the page and colors them from the photo
   in one step. Geometry in automosaic.js, photo reading in photo.js. */
import { MZ } from '../core/api.ts';
import * as Geo from '../lib/geometry.ts';
import * as AutoMosaic from '../lib/automosaic.ts';
import { run, isCancelled } from '../shared/work.ts';
import { PhotoTools } from './photo-tools.ts';
import { t } from '../shared/i18n.ts';
import { $, loadSettings, saveSettings } from '../shared/ui.ts';

const { state } = MZ;
const MAX_TILES = 8000;

const opts = { style: 'square', size: 10, detail: 50, colors: 'palette', count: 12, replace: true };
loadSettings('mz-automosaic', opts);
const save = () => saveSettings('mz-automosaic', opts);

/** Rough number of tiles the settings will give (adaptive styles vary with the photo). */
function estimate() {
  const d = state.doc, per = { square: 1, brick: 2, hex: Math.sqrt(3) / 2, irregular: 1 }[opts.style] || 1;
  const base = (d.w * d.h) / (opts.size * opts.size * per);
  return Math.round(opts.detail > 0 && opts.style !== 'hex' ? base * (0.5 + opts.detail / 100) : base);
}
function renderUI() {
  $('#am-style').value = opts.style;
  $('#am-size').value = opts.size;
  $('#am-detail').value = opts.detail;
  $('#am-detail-row').hidden = opts.style === 'hex';
  $('#am-count').value = opts.count;
  for (const r of document.querySelectorAll<any>('input[name=am-colors]')) r.checked = r.value === opts.colors;
  $('#am-replace').checked = opts.replace;
  $('#am-photo-missing').hidden = !!MZ.refImage();
  const n = estimate();
  $('#am-estimate').textContent = n > MAX_TILES ? t('About {n} tiles – too many, use a bigger tile size.', { n }) : t('About {n} tiles.', { n });
  $('#am-go').disabled = !MZ.refImage() || n > MAX_TILES;
}

/** Lays out the tiles in a worker (the photo decides where they get smaller), then colors them here. */
async function generate(progress: (f: number) => void) {
  const photo = await PhotoTools.photoPixels();
  if (!photo) { MZ.toast(t('Load a photo first.')); return; }
  const d = state.doc;
  const res = await run('photoMosaic', {
    photo, page: { x: d.x, y: d.y, w: d.w, h: d.h }, style: opts.style, size: opts.size, detail: opts.detail,
    seed: (Date.now() & 0xffff) + 1, eps: Geo.eps, maxTiles: MAX_TILES * 1.5, suggest: opts.colors === 'suggest' ? Math.max(2, Math.min(64, opts.count)) : 0,
  }, { progress: f => progress(f * 0.7) });
  if (!res.lines.length) { MZ.toast(t('That gives {n} tiles – use a bigger tile size.', { n: res.tiles })); return; }
  const segs = res.lines;

  if (opts.replace) {
    if (MZ.hasContent()) await MZ.saveVersion(t('Before making a mosaic from the photo'));
    MZ.clearDrawing();
  }
  if (opts.colors === 'suggest') {
    const cols = res.palette;
    const name = MZ.addPalette(t('From photo'), cols);
    MZ.toast(t('New palette “{name}” with {n} {n|color|colors}.', { name, n: cols.length }));
  }
  MZ.addLineSegments(segs);
  const r = await PhotoTools.colorTiles({ onlyUnpainted: false, commit: false, quiet: true });
  MZ.commit(); // one undo step for the whole mosaic
  MZ.toast(t('Made a mosaic of {n} tiles from the photo.', { n: r ? r.painted : 0 }));
}

$('#btn-automosaic').onclick = () => { renderUI(); $('#dlg-automosaic').showModal(); };
const sel = $('#am-style');
for (const [v, label] of AutoMosaic.STYLES) { const o = document.createElement('option'); o.value = v; o.textContent = t(label); sel.append(o); }
sel.onchange = () => { opts.style = sel.value; save(); renderUI(); };
$('#am-size').onchange = (e) => { const v = parseFloat(e.target.value); if (v > 0) opts.size = v; save(); renderUI(); };
$('#am-detail').oninput = (e) => { opts.detail = +e.target.value; save(); renderUI(); };
$('#am-count').onchange = (e) => { const v = Math.round(+e.target.value); if (v >= 2 && v <= 64) opts.count = v; save(); renderUI(); };
for (const r of document.querySelectorAll<any>('input[name=am-colors]')) r.onchange = () => { if (r.checked) { opts.colors = r.value; save(); } };
$('#am-replace').onchange = (e) => { opts.replace = e.target.checked; save(); };
$('#am-load').onclick = () => $('#ref-file').click();
$('#ref-file').addEventListener('change', () => setTimeout(renderUI, 600));
$('#am-go').onclick = async () => {
  // the dialog stays open, its button showing how far the work is, until the mosaic is there
  const go = $('#am-go');
  go.disabled = true;
  go.textContent = t('Working…');
  try {
    await generate(f => { go.textContent = t('Working… {p} %', { p: Math.round(f * 100) }); });
  } catch (e) {
    if (!isCancelled(e)) MZ.toast(t('Could not make the mosaic.'));
  } finally {
    go.textContent = t('Make mosaic');
    go.disabled = false;
    $('#dlg-automosaic').close();
  }
};
