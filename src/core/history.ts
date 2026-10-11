/* Undo / redo, the "unsaved changes" state, autosave and the version history. */
import { Store } from '../lib/store.ts';
import { $, state, rt, defsG, fillsG, shapesG, emit, toast, lsSet, VERSION_EVERY_MS, MAX_VERSIONS, type Doc } from './env.ts';
import { touch } from './doc.ts';
import { applyDoc } from './view.ts';
import { renderSelection, renderProps } from './selection.ts';
import { renderPalette } from './palette.ts';
import { applyGrout } from './grout.ts';
import { buildSVGString, loadSVGText } from './files.ts';
import { cancelPending } from './tools.ts';
import { t, lang } from '../shared/i18n.ts';

interface Snapshot { defs: string; fills: string; shapes: string; doc: Doc }
let history: Snapshot[] = [], hIndex = -1;
const snapshot = (): Snapshot => ({ defs: defsG.innerHTML, fills: fillsG.innerHTML, shapes: shapesG.innerHTML, doc: { ...state.doc } });
export function resetHistory(): void { history = [snapshot()]; hIndex = 0; updateUndoUI(); }
export const getHistory = () => ({ history, hIndex });
export function setHistory(h: { history: Snapshot[]; hIndex: number }): void { history = h.history; hIndex = h.hIndex; updateUndoUI(); }

/** Records the current drawing as an undo step. paintOnly: only colors changed – cached geometry stays valid. */
export function commit(paintOnly?: boolean): void {
  if (!paintOnly) touch();
  history.splice(hIndex + 1);
  history.push(snapshot());
  // up to 200 steps, but at most ~60 MB of snapshots (big mosaics get fewer undo steps)
  const size = (s: Snapshot) => s.fills.length + s.shapes.length + s.defs.length;
  let total = history.reduce((t, s) => t + size(s), 0) * 2;
  while (history.length > 2 && (history.length > 200 || total > 60e6)) total -= size(history.shift()) * 2;
  hIndex = history.length - 1;
  rt.dirty = true;
  afterChange();
}
export function restore(s: Snapshot): void {
  defsG.innerHTML = s.defs;
  fillsG.innerHTML = s.fills;
  shapesG.innerHTML = s.shapes;
  state.doc = { ...s.doc };
  state.selection.clear();
  touch();
  applyDoc();
  applyGrout();
  rt.dirty = true;
  afterChange();
}
/** Back to the last recorded step (drops changes made since, e.g. by a cancelled gesture). */
export const restoreCurrent = (): void => restore(history[hIndex]);
export function undo(): void { if (hIndex > 0) { cancelPending(); restore(history[--hIndex]); } }
export function redo(): void { if (hIndex < history.length - 1) { cancelPending(); restore(history[++hIndex]); } }
function updateUndoUI(): void {
  $('#btn-undo').disabled = hIndex <= 0;
  $('#btn-redo').disabled = hIndex >= history.length - 1;
}
export function afterChange(): void {
  renderSelection();
  renderProps();
  renderPalette();
  updateUndoUI();
  updateTitle();
  scheduleAutosave();
  emit('change');
}
/** For changes outside the undo history (photo, palette…) that should still be autosaved. */
export function docChanged(): void {
  rt.dirty = true;
  updateTitle();
  scheduleAutosave();
}
export function updateTitle(): void { document.title = `${rt.dirty ? '• ' : ''}${rt.fileName} – Mosaic Paint`; }
export const hasContent = (): boolean => fillsG.children.length > 0 || shapesG.children.length > 0;

// ---- autosave -------------------------------------------------------------------------------
let autosaveTimer: any, lastVersionAt = Date.now(), restored = false, autosavePaused = false;
/** Autosave starts once the saved drawing has been loaded (so it is never overwritten by an empty page). */
export function startAutosave(): void { restored = true; }
/** While viewing a shared mosaic nothing is autosaved. */
export function pauseAutosave(on: boolean): void { autosavePaused = on; if (on) clearTimeout(autosaveTimer); }
export function scheduleAutosave(): void {
  if (!restored || autosavePaused) return;
  clearTimeout(autosaveTimer);
  autosaveTimer = setTimeout(autosaveNow, 700);
}
async function autosaveNow(): Promise<void> {
  const svgText = buildSVGString();
  try {
    await Store.set('current', { svg: svgText, fileName: rt.fileName, time: Date.now() });
  } catch {
    if (!lsSet('mz-autosave', svgText)) toast(t('Autosave failed – remember to save your file.'));
  }
  if (hasContent() && Date.now() - lastVersionAt > VERSION_EVERY_MS) saveVersion(t('Autosave'));
}

// ---- versions --------------------------------------------------------------------------------
export async function saveVersion(note: string): Promise<boolean> {
  lastVersionAt = Date.now();
  try {
    await Store.addVersion({ time: Date.now(), name: rt.fileName, note, svg: buildSVGString(), tiles: fillsG.children.length });
    await Store.trimVersions(MAX_VERSIONS);
    return true;
  } catch { return false; }
}
export async function restoreVersion(rec: { svg: string; name?: string; time: number }): Promise<void> {
  if (hasContent()) await saveVersion(t('Before restoring an older version'));
  if (loadSVGText(rec.svg, { restore: true })) {
    rt.fileName = rec.name || 'mosaic.svg';
    rt.fileHandle = null;
    rt.dirty = true;
    updateTitle();
    scheduleAutosave();
    toast(t('Restored the version from {time}', { time: new Date(rec.time).toLocaleString(lang) }));
  }
}
