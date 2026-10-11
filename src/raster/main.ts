/* Mosaic Paint Raster – entry point: paints mosaics pixel by pixel. Shares the look, the palettes,
   the palette panel, the color tools and the app shell with the vector app (src/shared, src/lib). */
import * as R from '../lib/raster.ts';
import { $$ } from '../shared/ui.ts';
import { initShell } from '../shared/shell.ts';
import { state, rt, loadPrefs } from './state.ts';
import { stage, doc, dctx, getImage, toDoc, fitView, requestRender } from './canvas.ts';
import { resetHistory, afterChange, updateTitle, startAutosave, loadAutosave, commit } from './history.ts';
import { renderPalette, renderPaletteSelect } from './palette.ts';
import { selectionChanged, pasteImage } from './select.ts';
import { setTool, setMode } from './tools.ts';
import { loadCanvas, fileToCanvas } from './files.ts';
import { bindPanel } from './panel.ts';
import { bindInput } from './input.ts';
import { bindExport3D } from './export3d.ts';
import { bindReport } from './report.ts';
import { bindPrint, printPage } from './print.ts';
import { bindShare, fromHash } from './share.ts';
import { bindVectorize, vectorSVG } from './vectorize.ts';
import { initHistoryUI } from '../shared/history-ui.ts';
import { listVersions, restoreVersion } from './files.ts';
import { saveVersion } from './history.ts';

loadPrefs();
bindPanel();
bindInput();
bindExport3D();
bindReport();
bindPrint();
bindShare();
bindVectorize();
initHistoryUI({
  noun: 'image',
  list: listVersions,
  thumbnail: (v) => new Blob([v.png], { type: 'image/png' }),
  detail: (v) => '',
  restore: restoreVersion,
  saveNow: () => saveVersion('Saved by hand'),
}, document.querySelector('#btn-history'));
initShell(stage);
renderPaletteSelect();
document.body.dataset.mode = state.mode;
for (const b of $$('#mode-switch button')) b.classList.toggle('active', b.dataset.mode === state.mode);
setTool(state.tool);
// a new image starts white
dctx.fillStyle = '#ffffff';
dctx.fillRect(0, 0, doc.width, doc.height);
resetHistory();
afterChange();
rt.dirty = false;
updateTitle();
renderPalette();
requestAnimationFrame(fitView);

/** For the end-to-end tests and for poking around in the browser console. */
const RZ = {
  state, rt, doc, ready: false,
  /** '#rrggbb' at an image pixel, or null where it is transparent */
  colorAt: (x: number, y: number): string | null => R.colorAt(getImage(Math.floor(x), Math.floor(y), 1, 1), 0, 0),
  alphaAt: (x: number, y: number): number => getImage(Math.floor(x), Math.floor(y), 1, 1).data[3],
  /** screen position (CSS pixels) of an image point */
  screen(x: number, y: number) {
    const r = (document.querySelector('#view') as HTMLElement).getBoundingClientRect(), v = state.view;
    return { x: (x - v.x) * v.s + r.left, y: (y - v.y) * v.s + r.top };
  },
  toDoc, setTool, setMode, commit, fitView, selectionChanged, pasteImage, printPage, vectorSVG,
  /** Replaces the image with a blank one of the given size and color (null = transparent). */
  blank(w: number, h: number, color: string | null = '#ffffff') {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    if (color) { const x = c.getContext('2d'); x.fillStyle = color; x.fillRect(0, 0, w, h); }
    loadCanvas(c, 'test.png');
  },
};
(window as any).RZ = RZ;

(async () => {
  const rec = await loadAutosave();
  if (rec && rec.png) {
    const c = await fileToCanvas(rec.png);
    if (c) {
      loadCanvas(c, rec.fileName || 'mosaic.png');
      rt.fileName = rec.fileName || 'mosaic.png';
      updateTitle();
    }
  }
  startAutosave();
  selectionChanged();
  RZ.ready = true;
  fromHash();
})();
