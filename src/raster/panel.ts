/* Wires the toolbar and side panel of the raster app. */
import { $, $$, clamp, toast } from '../shared/ui.ts';
import { readClipboard } from '../shared/clipboard.ts';
import { state, savePrefs, on } from './state.ts';
import { doc, fitView, zoomCenter, actualSize, requestRender } from './canvas.ts';
import { undo, redo } from './history.ts';
import { place, cancelFloating, copy, clearSelection, crop, pasteImage, pasteInternal } from './select.ts';
import { bindPalette, pasteColors } from './palette.ts';
import { setTool, setMode } from './tools.ts';
import { newImage, openFile, openImageFile, save, exportAs, resizeImage, canvasSize, MAX_SIDE } from './files.ts';
import { bindMosaic } from './mosaic.ts';
import { t } from '../shared/i18n.ts';

export function setSides(n: number): void {
  state.sides = clamp(Math.round(n) || 6, 3, 64);
  $('#opt-sides').value = state.sides;
  for (const b of $$('#quick-sides button')) b.classList.toggle('active', +b.dataset.sides === state.sides);
  savePrefs();
}
export function setBrushSize(n: number): void {
  state.size = clamp(Math.round(n) || 1, 1, 500);
  $('#opt-size').value = state.size;
  $('#opt-size-range').value = Math.min(100, state.size);
  savePrefs();
  requestRender();
}
function bindCheck(id: string, key: string, after?: () => void): void {
  const i = $(id);
  i.checked = !!state[key];
  i.onchange = () => { state[key] = i.checked; savePrefs(); if (after) after(); };
}
function showImageSize(): void {
  $('#img-w').value = doc.width;
  $('#img-h').value = doc.height;
}
/** Paste button: touch screens have no Ctrl+V, so read the clipboard on request. */
async function pasteButton(): Promise<void> {
  const { image, text } = await readClipboard();
  if (image) { setTool('select'); await pasteImage(image); return; }
  if (text && /data-mosaic-snippet/.test(text)) { setTool('select'); await pasteImage(new Blob([text], { type: 'image/svg+xml' })); return; }
  if (text && pasteColors(text)) return;
  if (pasteInternal()) return;
  toast(t('Nothing to paste – or the browser didn’t allow reading the clipboard (try Ctrl+V).'));
}

export function bindPanel(): void {
  for (const b of $$('#tools button')) b.onclick = () => setTool(b.dataset.tool);
  for (const b of $$('#mode-switch button')) b.onclick = () => setMode(b.dataset.mode);
  $('#btn-new').onclick = newImage;
  $('#btn-open').onclick = openFile;
  // read the file before resetting the input (resetting first can make the file unreadable)
  $('#file-input').onchange = async (e: any) => { const f = e.target.files[0]; if (f) await openImageFile(f); e.target.value = ''; };
  $('#btn-save').onclick = save;
  $('#btn-export').onclick = () => $('#dlg-export').showModal();
  $('#ex-format').onchange = () => { $('#ex-quality-row').hidden = $('#ex-format').value === 'image/png'; };
  $('#ex-go').onclick = () => { $('#dlg-export').close(); exportAs($('#ex-format').value, clamp(+$('#ex-quality').value || 90, 10, 100) / 100); };
  $('#btn-copy').onclick = () => copy(false);
  $('#btn-paste').onclick = pasteButton;
  $('#btn-undo').onclick = undo;
  $('#btn-redo').onclick = redo;
  $('#btn-fit').onclick = fitView;
  $('#btn-actual').onclick = actualSize;
  $('#btn-zoomin').onclick = () => zoomCenter(1.25);
  $('#btn-zoomout').onclick = () => zoomCenter(0.8);
  $('#sa-finish').onclick = place;
  $('#sa-cancel').onclick = cancelFloating;

  // brush
  $('#opt-size').onchange = () => setBrushSize(+$('#opt-size').value);
  $('#opt-size-range').oninput = () => setBrushSize(+$('#opt-size-range').value);
  setBrushSize(state.size);
  const op = $('#opt-opacity');
  op.value = Math.round(state.opacity * 100);
  op.oninput = () => { state.opacity = clamp(+op.value, 5, 100) / 100; };
  op.onchange = savePrefs;
  on('mode', () => { op.value = Math.round(state.opacity * 100); });
  bindCheck('#opt-smooth', 'smooth');

  // polygon
  const sides = $('#opt-sides');
  sides.onchange = () => setSides(+sides.value);
  for (const b of $$('#quick-sides button')) b.onclick = () => setSides(+b.dataset.sides);
  setSides(state.sides);
  bindCheck('#opt-ngon-fill', 'ngonFill');
  bindCheck('#opt-ngon-outline', 'ngonOutline');

  // bucket
  const tol = $('#opt-tolerance'), tolLabel = () => { $('#tol-label').textContent = String(state.tolerance); };
  tol.value = state.tolerance;
  tol.oninput = () => { state.tolerance = +tol.value; tolLabel(); };
  tol.onchange = savePrefs;
  tolLabel();
  bindCheck('#opt-contiguous', 'contiguous');

  // selection
  $('#btn-sel-copy').onclick = () => copy(false);
  $('#btn-sel-cut').onclick = () => copy(true);
  $('#btn-sel-del').onclick = clearSelection;
  $('#btn-sel-crop').onclick = crop;

  // image
  showImageSize();
  on('size', showImageSize);
  const askedSize = () => {
    const w = Math.round(+$('#img-w').value), h = Math.round(+$('#img-h').value);
    if (!(w >= 1 && h >= 1 && w <= MAX_SIDE && h <= MAX_SIDE)) { toast(t('Enter a size from 1 to {max} px.', { max: MAX_SIDE })); showImageSize(); return null; }
    return { w, h };
  };
  $('#btn-resize').onclick = () => { const s = askedSize(); if (s) resizeImage(s.w, s.h); };
  $('#btn-canvas').onclick = () => { const s = askedSize(); if (s) canvasSize(s.w, s.h); };
  bindCheck('#opt-grid', 'grid', requestRender);

  bindMosaic();
  bindPalette();
}
