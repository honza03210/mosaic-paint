/* Undo / redo (snapshots of the pixels), the unsaved-changes mark, autosave in the browser and versions. */
import { Store } from '../lib/store.ts';
import * as R from '../lib/raster.ts';
import { $, toast } from '../shared/ui.ts';
import { canvasToPng } from '../shared/clipboard.ts';
import { state, rt, emit } from './state.ts';
import { doc, dctx, setSize, requestRender } from './canvas.ts';
import { t } from '../shared/i18n.ts';

let history: ImageData[] = [], index = -1;
/** Snapshots take width × height × 4 bytes: big images get fewer undo steps. */
const MAX_BYTES = 400e6, MAX_STEPS = 100;
const snapshot = (): ImageData => dctx.getImageData(0, 0, doc.width, doc.height);

export function resetHistory(): void { history = [snapshot()]; index = 0; updateUndoUI(); }
/** Records the current image as an undo step. */
export function commit(): void {
  history.splice(index + 1);
  history.push(snapshot());
  let bytes = history.reduce((t, s) => t + s.data.length, 0);
  while (history.length > 2 && (history.length > MAX_STEPS || bytes > MAX_BYTES)) bytes -= history.shift().data.length;
  index = history.length - 1;
  rt.dirty = true;
  afterChange();
}
function restore(s: ImageData): void {
  if (s.width !== doc.width || s.height !== doc.height) setSize(s.width, s.height);
  dctx.putImageData(s, 0, 0);
  state.floating = null;
  if (state.sel && (state.sel.x + state.sel.w > s.width || state.sel.y + state.sel.h > s.height)) state.sel = null;
  rt.dirty = true;
  afterChange();
}
/** Back to the last recorded step (drops changes since, e.g. a cancelled gesture or a lifted selection). */
export const restoreCurrent = (): void => restore(history[index]);
export function undo(): void {
  // a pasted or moved selection that is not placed yet is simply dropped
  if (state.floating || state.action) { state.action = null; state.preview = null; restoreCurrent(); return; }
  if (index > 0) restore(history[--index]);
}
export function redo(): void {
  if (state.floating) restoreCurrent();
  if (index < history.length - 1) restore(history[++index]);
}
function updateUndoUI(): void {
  $('#btn-undo').disabled = index <= 0 && !state.floating;
  $('#btn-redo').disabled = index >= history.length - 1;
}
export function afterChange(): void {
  updateUndoUI();
  updateTitle();
  scheduleAutosave();
  requestRender();
  emit('change');
}
export function updateTitle(): void { document.title = `${rt.dirty ? '• ' : ''}${rt.fileName} – Mosaic Paint Raster`; }

// ---- autosave ----------------------------------------------------------------------------------------
let timer: any, started = false, paused = false;
/** Autosave starts once the saved image has been loaded (so it is never overwritten by an empty one). */
export function startAutosave(): void { started = true; }
/** While viewing a shared image nothing is autosaved. */
export function pauseAutosave(on: boolean): void { paused = on; if (on) clearTimeout(timer); }
export function scheduleAutosave(): void {
  if (!started || paused) return;
  clearTimeout(timer);
  timer = setTimeout(autosaveNow, 800);
}
async function autosaveNow(): Promise<void> {
  try {
    // stored as bytes: Safari can't keep Blobs in IndexedDB in private windows
    const png = await (await canvasToPng(doc)).arrayBuffer();
    await Store.set('raster', { png, fileName: rt.fileName, time: Date.now() });
  } catch {
    toast(t('Autosave failed – remember to save your image.'));
  }
  if (Date.now() - lastVersionAt > VERSION_EVERY_MS) saveVersion(t('Autosave'));
}

// ---- versions (History) -------------------------------------------------------------------------------
const VERSION_EVERY_MS = 3 * 60 * 1000, MAX_VERSIONS = 40;
let lastVersionAt = Date.now();
/** Keeps the current image as a version (also before it is replaced). */
export async function saveVersion(note: string): Promise<boolean> {
  lastVersionAt = Date.now();
  try {
    // counted before the picture is taken (that waits): both as the image is now
    const colors = R.countColors(dctx.getImageData(0, 0, doc.width, doc.height), 100000);
    const png = await (await canvasToPng(doc)).arrayBuffer();
    await Store.addVersion({ app: 'raster', time: Date.now(), name: rt.fileName, note, png, tiles: doc.width * doc.height, size: { w: doc.width, h: doc.height, unit: 'px' }, colors });
    await Store.trimVersions(MAX_VERSIONS, 'raster');
    return true;
  } catch { return false; }
}
/** The autosaved image, if any. */
export async function loadAutosave(): Promise<{ png: Blob; fileName: string } | null> {
  try {
    const rec = await Store.get('raster');
    if (!rec || !rec.png) return null;
    return { png: rec.png instanceof Blob ? rec.png : new Blob([rec.png], { type: 'image/png' }), fileName: rec.fileName };
  } catch { return null; }
}
