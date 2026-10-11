/* Starts the editor and gathers what the feature modules (and the tests, as window.MZ) use. */
import { Store } from '../lib/store.ts';
import { $$, state, rt, svg, stage, on, emit, toast, download, fmt, fmtLen, fmtArea, unit, mk, isFill, typingIn, lsGet } from './env.ts';
import {
  allShapes, geomOf, hasFill, fillOf, insideEl, isPaintedAt, paintedColorAt, paintFill, elMatrix, invalidate,
} from './doc.ts';
import { toDoc, updateView, fitView, applyDoc, applyLayers } from './view.ts';
import { snapPoint } from './snap.ts';
import { selectionChanged } from './selection.ts';
import { boundarySegments, regionIndex, bucketAt, gridSample, insideRegion, commitGeometry, neighbourColors } from './areas.ts';
import {
  commit, resetHistory, getHistory, setHistory, afterChange, updateTitle, docChanged, startAutosave, pauseAutosave,
  saveVersion, restoreVersion, hasContent,
} from './history.ts';
import { loadPrefs, renderPaletteSelect, addPalette, replaceColor } from './palette.ts';
import { applyGrout } from './grout.ts';
import { refImage, loadImg, renderPhotoUI } from './photo.ts';
import { buildSVGString, loadSVGText, openText, confirmDiscard, clearDrawing, setMode } from './files.ts';
import { setTool, registerTool, setFillChooser, addLineSegments } from './tools.ts';
import { bindPanel } from './panel.ts';
import { bindInput } from './input.ts';

export const MZ = {
  addLineSegments, clearDrawing, addPalette, paintedColorAt, neighbourColors, setFillChooser,
  elMatrix, snapPoint, toDoc, typingIn, invalidate,
  setSelection: (els: Iterable<Element>) => { state.selection = new Set(els); selectionChanged(); },
  registerTool, getHistory, setHistory,
  docChanged, updateView, fitView, pauseAutosave,
  state, svg, stage, on, emit, toast, download, fmt, fmtLen, fmtArea, unit, mk,
  allShapes, geomOf, isFill, hasFill, fillOf, insideEl, isPaintedAt, paintFill, replaceColor,
  boundarySegments, regionIndex, bucketAt, gridSample, insideRegion, commit, commitGeometry, refImage, loadImg,
  buildSVGString, loadSVGText, openText, saveVersion, restoreVersion, confirmDiscard, hasContent, setMode, setTool,
  get fileName() { return rt.fileName; },
  /** true once the autosaved drawing has been restored */
  ready: false,
};
export type MZApi = typeof MZ;

// ---- start ---------------------------------------------------------------------------------------
// Runs when this module is evaluated, before the feature modules (they are imported after it).
loadPrefs();
bindPanel();
bindInput();
renderPaletteSelect();
document.body.dataset.mode = state.mode;
for (const b of $$('#mode-switch button')) b.classList.toggle('active', b.dataset.mode === state.mode);
applyDoc();
applyGrout();
applyLayers();
renderPhotoUI();
setTool('select');
resetHistory();
afterChange();
rt.dirty = false;
updateTitle();
requestAnimationFrame(fitView);

(async () => {
  let rec: any = null;
  try { rec = await Store.get('current'); } catch { /* IndexedDB unavailable */ }
  const text = (rec && rec.svg) || lsGet('mz-autosave');
  if (text && loadSVGText(text, { quiet: true, restore: true })) {
    if (rec && rec.fileName) rt.fileName = rec.fileName;
    rt.dirty = false;
    updateTitle();
  }
  startAutosave();
  MZ.ready = true;
  emit('ready');
})();
