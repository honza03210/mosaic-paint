/* Mosaic Paint Raster – entry point: paints mosaics pixel by pixel. Shares the look, the palettes,
   the palette panel, the color tools and the app shell with the vector app (src/shared, src/lib). */
import '../shared/i18n-start.ts';
import '../shared/a11y.ts';
import * as R from '../lib/raster.ts';
import { $$, toast } from '../shared/ui.ts';
import { canvasToPng } from '../shared/clipboard.ts';
import { initShell } from '../shared/shell.ts';
import { state, rt, loadPrefs } from './state.ts';
import { stage, doc, dctx, getImage, toDoc, fitView, flat, layers, knobAt, pieceCorners } from './canvas.ts';
import { resetHistory, afterChange, updateTitle, startAutosave, loadAutosave, commit } from './history.ts';
import { renderPalette, renderPaletteSelect } from './palette.ts';
import { selectionChanged, pasteImage } from './select.ts';
import { setTool, setMode } from './tools.ts';
import { loadCanvas, fileToCanvas, openImageFile } from './files.ts';
import { bindPanel } from './panel.ts';
import { bindAiFeatures } from './ai-features.ts';
import { bindLayers, restoreLayers } from './layers.ts';
import { bindInput } from './input.ts';
import { bindExport3D } from './export3d.ts';
import { bindReport } from './report.ts';
import { bindPrint, printPage } from './print.ts';
import { bindShare, fromHash } from './share.ts';
import { bindVectorize, vectorSVG } from './vectorize.ts';
import { bindExamples } from './examples.ts';
import { initWhatsNew } from '../shared/whats-new.ts';
import { initHistoryUI } from '../shared/history-ui.ts';
import { listVersions, restoreVersion } from './files.ts';
import { saveVersion } from './history.ts';
import { t } from '../shared/i18n.ts';

loadPrefs();
bindPanel();
bindInput();
bindAiFeatures();
bindLayers();
bindExport3D();
bindReport();
bindPrint();
bindShare();
bindVectorize();
bindExamples();
initWhatsNew();
initHistoryUI({
  texts: {
    intro: t('Versions are kept in this browser: every few minutes while you work, and before you open, start or restore another image. Restoring keeps your current image as a version too.'),
    empty: t('No versions yet. A version is kept every few minutes while you work, and before you open or start another image.'),
  },
  list: listVersions,
  thumbnail: (v) => new Blob([v.png], { type: 'image/png' }),
  detail: () => '',
  restore: restoreVersion,
  saveNow: () => saveVersion(t('Saved by hand')),
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
  state, rt, ready: false,
  /** the active layer's canvas (tests draw on it) */
  get doc() { return doc; },
  layers,
  /** '#rrggbb' at an image pixel, or null where it is transparent */
  colorAt: (x: number, y: number): string | null => R.colorAt(getImage(Math.floor(x), Math.floor(y), 1, 1), 0, 0),
  alphaAt: (x: number, y: number): number => getImage(Math.floor(x), Math.floor(y), 1, 1).data[3],
  /** screen position (CSS pixels) of an image point */
  screen(x: number, y: number) {
    const r = (document.querySelector('#view') as HTMLElement).getBoundingClientRect(), v = state.view;
    return { x: (x - v.x) * v.s + r.left, y: (y - v.y) * v.s + r.top };
  },
  toDoc, setTool, setMode, commit, fitView, selectionChanged, pasteImage, printPage, vectorSVG,
  /** for the lessons (learn.html): a starting picture (a fresh history), the rotate knob and the selection's corners */
  loadPicture: (c: HTMLCanvasElement, name = 'lesson.png') => loadCanvas(c, name), knobAt, pieceCorners,
  /** Replaces the image with a blank one of the given size and color (null = transparent). */
  blank(w: number, h: number, color: string | null = '#ffffff') {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    if (color) { const x = c.getContext('2d'); x.fillStyle = color; x.fillRect(0, 0, w, h); }
    loadCanvas(c, 'test.png');
  },
};
Object.assign(RZ, {
  // for the Discord Activity (src/discord/activity.ts): open a picture, get the image as PNG, messages and texts
  openImage: async (blob: Blob, name: string, o: { src?: string } = {}) => { await openImageFile(new File([blob], name, { type: blob.type }), o); },
  png: () => canvasToPng(flat()),
  toast,
  t,
});
(window as any).RZ = RZ;

(async () => {
  const rec = await loadAutosave();
  if (rec && rec.png) {
    const c = await fileToCanvas(rec.png);
    if (c) {
      loadCanvas(c, rec.fileName || 'mosaic.png');
      // the layers, when there were several
      if (rec.layers?.length > 1) await restoreLayers(rec.layers, rec.active);
      rt.fileName = rec.fileName || 'mosaic.png';
      updateTitle();
    }
  }
  startAutosave();
  selectionChanged();
  RZ.ready = true;
  fromHash();
})();
// inside Discord (an Activity): the part that talks to Discord, loaded only there (it waits for RZ.ready)
if ((location.hostname.endsWith('discordsays.com') || (window as any).__discordSdk) && !document.querySelector('script[src="dist/activity.js"]')) {
  const s = document.createElement('script');
  s.src = 'dist/activity.js';
  document.head.append(s);
}
