/* Undo / redo (snapshots of the layers – a layer's pixels are kept once while they don't change), the unsaved-changes mark, autosave in the browser and versions. */
import { Store } from '../lib/store.ts';
import * as R from '../lib/raster.ts';
import { $, toast } from '../shared/ui.ts';
import { canvasToPng } from '../shared/clipboard.ts';
import { state, rt, emit } from './state.ts';
import { doc, requestRender, layers, active, makeLayer, setLayers, flat, type Layer } from './canvas.ts';
import { t } from '../shared/i18n.ts';

interface LayerSnap { id: number; name: string; visible: boolean; opacity: number; rev: number; data: ImageData }
interface Snap { w: number; h: number; active: number; layers: LayerSnap[] }
let history: Snap[] = [], index = -1, made = 0, changes = 0;
/** Changes with every new step, undo and redo (to know when the picture is not the same any more). */
export const imageVersion = (): number => changes;
/** Snapshots take width × height × 4 bytes: big images get fewer undo steps. */
const MAX_BYTES = 400e6, MAX_STEPS = 100;
/** The layers now; pixels of a layer that hasn't changed since the step before are shared with it. */
function snapshot(prev?: Snap): Snap {
  return {
    w: doc.width, h: doc.height, active,
    layers: layers.map((L) => {
      const same = prev?.layers.find(p => p.id === L.id && p.rev === L.rev && prev.w === doc.width && prev.h === doc.height);
      return { id: L.id, name: L.name, visible: L.visible, opacity: L.opacity, rev: L.rev, data: same ? same.data : L.ctx.getImageData(0, 0, doc.width, doc.height) };
    }),
  };
}
/** The bytes all the steps keep (shared pixels counted once). */
function bytes(): number {
  const seen = new Set<ImageData>();
  for (const s of history) for (const l of s.layers) seen.add(l.data);
  let n = 0;
  for (const d of seen) n += d.data.length;
  return n;
}

export function resetHistory(): void { history = [snapshot()]; index = 0; updateUndoUI(); }
/** Records the current image as an undo step. */
export function commit(): void {
  made++;
  changes++;
  // a step changes the active layer (layer commands mark the others they change themselves)
  layers[active].rev++;
  history.splice(index + 1);
  history.push(snapshot(history[history.length - 1]));
  while (history.length > 2 && (history.length > MAX_STEPS || bytes() > MAX_BYTES)) history.shift();
  index = history.length - 1;
  rt.dirty = true;
  afterChange();
}
function restore(s: Snap): void {
  changes++;
  const now = layers[active], byId = new Map(layers.map(L => [L.id, L] as const));
  const list: Layer[] = s.layers.map((ls) => {
    const L = byId.get(ls.id) || makeLayer(s.w, s.h, ls.name, ls.id);
    const resized = L.canvas.width !== s.w || L.canvas.height !== s.h;
    if (resized) { L.canvas.width = s.w; L.canvas.height = s.h; }
    // the active layer always (a stroke or a lift may have changed it since the step), others when they differ
    if (resized || L === now || L.rev !== ls.rev) L.ctx.putImageData(ls.data, 0, 0);
    Object.assign(L, { name: ls.name, visible: ls.visible, opacity: ls.opacity, rev: ls.rev });
    return L;
  });
  setLayers(list, s.active);
  state.floating = null;
  if (state.sel && (state.sel.x + state.sel.w > s.w || state.sel.y + state.sel.h > s.h)) state.sel = null;
  rt.dirty = true;
  afterChange();
}
/** Back to the last recorded step (drops changes since, e.g. a cancelled gesture or a lifted selection). */
export const restoreCurrent = (): void => restore(history[index]);
/** How many undo steps have been made (the quick menu checks whether a tap made one). */
export const steps = (): number => made;
/** Takes back the last step without keeping it for redo (a tap that turned out to be half of a double-tap). */
export function dropLastStep(): void {
  if (index <= 0 || index !== history.length - 1) return;
  history.pop();
  index--;
  restore(history[index]);
}
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
    const png = await (await canvasToPng(flat())).arrayBuffer();
    const more = layers.length > 1 ? await Promise.all(layers.map(async L => ({ name: L.name, visible: L.visible, opacity: L.opacity, png: await (await canvasToPng(L.canvas)).arrayBuffer() }))) : undefined;
    await Store.set('raster', { png, layers: more, active, fileName: rt.fileName, time: Date.now() });
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
    const f = flat(), colors = R.countColors(f.getContext('2d').getImageData(0, 0, f.width, f.height), 100000);
    const png = await (await canvasToPng(f)).arrayBuffer();
    await Store.addVersion({ app: 'raster', time: Date.now(), name: rt.fileName, note, png, tiles: doc.width * doc.height, size: { w: doc.width, h: doc.height, unit: 'px' }, colors });
    await Store.trimVersions(MAX_VERSIONS, 'raster');
    return true;
  } catch { return false; }
}
/** The autosaved image, if any. */
export interface SavedLayer { name: string; visible: boolean; opacity: number; png: Blob }
export async function loadAutosave(): Promise<{ png: Blob; fileName: string; layers?: SavedLayer[]; active?: number } | null> {
  try {
    const rec = await Store.get('raster');
    if (!rec || !rec.png) return null;
    const blob = (b: Blob | ArrayBuffer) => (b instanceof Blob ? b : new Blob([b], { type: 'image/png' }));
    return { png: blob(rec.png), fileName: rec.fileName, layers: rec.layers?.map((l: any) => ({ ...l, png: blob(l.png) })), active: rec.active };
  } catch { return null; }
}
