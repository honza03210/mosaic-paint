/* Wires the toolbar and side panel of the raster app. */
import { $, $$, clamp, toast } from '../shared/ui.ts';
import { readClipboard } from '../shared/clipboard.ts';
import { state, savePrefs, on } from './state.ts';
import { doc, fitView, zoomCenter, actualSize, requestRender } from './canvas.ts';
import { undo, redo } from './history.ts';
import { place, cancelFloating, copy, clearSelection, crop, pasteImage, pasteInternal } from './select.ts';
import { bindPalette, pasteColors } from './palette.ts';
import { setTool, setMode } from './tools.ts';
import { newImage, openFile, importImageFile, openImageFile, save, exportAs, resizeImage, canvasSize, MAX_SIDE } from './files.ts';
import { rotate, flip, cropToSelection, trim } from './transform.ts';
import { bindMosaic } from './mosaic.ts';
import { TIPS, cancelCurve, pickCloneSource, updateCloneUI } from './paint.ts';
import { openAdjust } from './adjust-ui.ts';
import { fillSelection } from './remove.ts';
import { invertSelection } from './select.ts';
import * as Curves from '../lib/curves.ts';
import { curveNote } from '../shared/curve-notes.ts';
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
export function setTip(tip: string): void {
  state.tip = TIPS.includes(tip) ? tip : 'round';
  $('#opt-tip').value = state.tip;
  $('#nib-angle-row').hidden = state.tip !== 'calligraphy';
  savePrefs();
  requestRender();
}
/** Shift+B: the next tip, on the brush (or the eraser, when erasing). */
export function nextTip(): void {
  if (state.tool !== 'brush' && state.tool !== 'eraser') setTool('brush');
  setTip(TIPS[(TIPS.indexOf(state.tip) + 1) % TIPS.length]);
  toast(t('Brush tip: {tip}', { tip: $(`#opt-tip option[value="${state.tip}"]`).textContent }));
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
  $('#btn-import').onclick = () => $('#import-input').click();
  $('#import-input').onchange = async (e: any) => { const f = e.target.files[0]; e.target.value = ''; if (f) { if (state.tool !== 'select' && state.tool !== 'text') setTool('select'); await importImageFile(f); } };
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
  $('#opt-tip').onchange = () => setTip($('#opt-tip').value);
  setTip(state.tip);
  const angle = $('#opt-nib-angle');
  angle.value = state.nibAngle;
  angle.onchange = () => {
    const a = Math.round(+angle.value);
    state.nibAngle = Number.isFinite(a) ? ((a % 180) + 180) % 180 : 45;
    angle.value = state.nibAngle;
    savePrefs();
  };
  const op = $('#opt-opacity');
  op.value = Math.round(state.opacity * 100);
  op.oninput = () => { state.opacity = clamp(+op.value, 5, 100) / 100; };
  op.onchange = savePrefs;
  on('mode', () => { op.value = Math.round(state.opacity * 100); });
  bindCheck('#opt-smooth', 'smooth');
  bindCheck('#opt-pressure', 'pressure');
  bindCheck('#opt-clone-aligned', 'cloneAligned');
  bindCheck('#opt-noise-color', 'noiseColor');
  for (const [id, key] of [['#opt-blur', 'blurRadius'], ['#opt-noise', 'noiseAmount']] as const) {
    const r = $(id), label = $(id + '-val');
    const show = () => { label.textContent = String(state[key]); };
    r.value = state[key];
    show();
    r.oninput = () => { state[key] = +r.value; show(); };
    r.onchange = savePrefs;
  }
  $('#btn-clone-source').onclick = () => pickCloneSource();
  $('#btn-adjust').onclick = () => openAdjust();
  $('#btn-adjust-top').onclick = () => openAdjust();
  $('#btn-sel-fill').onclick = () => fillSelection();
  $('#btn-sel-invert').onclick = () => invertSelection();
  $('#btn-sel-invert-tool').onclick = () => invertSelection();
  // the Select tool: its shape and what a new selection does
  const segs = (id: string, attr: string, key: 'selShape' | 'selOp', after = () => {}) => {
    const show = () => { for (const b of $$(`${id} button`)) { const on = b.dataset[attr] === state[key]; b.classList.toggle('active', on); b.setAttribute('aria-checked', String(on)); b.setAttribute('role', 'radio'); } after(); };
    for (const b of $$(`${id} button`)) b.onclick = () => { (state as any)[key] = b.dataset[attr]; if (key === 'selShape') savePrefs(); show(); };
    show();
  };
  segs('#sel-shape', 'shape', 'selShape', () => { $('#sel-wand-row').hidden = state.selShape !== 'wand'; });
  segs('#sel-op', 'op', 'selOp');
  const selTol = $('#opt-sel-tolerance');
  selTol.value = state.tolerance;
  selTol.oninput = () => { state.tolerance = +selTol.value; $('#opt-tolerance').value = selTol.value; $('#opt-tolerance').oninput?.(new Event('input')); savePrefs(); };
  const rm = $('#opt-remove-method');
  rm.value = state.removeMethod;
  rm.onchange = () => { state.removeMethod = rm.value; savePrefs(); };
  updateCloneUI();

  // polygon
  const sides = $('#opt-sides');
  sides.onchange = () => setSides(+sides.value);
  for (const b of $$('#quick-sides button')) b.onclick = () => setSides(+b.dataset.sides);
  setSides(state.sides);
  bindCheck('#opt-ngon-fill', 'ngonFill');
  bindCheck('#opt-ngon-outline', 'ngonOutline');

  // ellipse and curve
  for (const r of $$('input[name=elmode]')) {
    r.checked = r.value === state.ellipseMode;
    r.onchange = () => { if (r.checked) { state.ellipseMode = r.value; savePrefs(); } };
  }
  const ct = $('#opt-curve-type');
  if (!Curves.SPLINE_TYPES.includes(state.curveType)) state.curveType = 'catmull';
  ct.value = state.curveType;
  const showCurveNote = () => { $('#curve-note').textContent = curveNote(state.curveType); };
  ct.onchange = () => { state.curveType = ct.value; savePrefs(); showCurveNote(); cancelCurve(); };
  showCurveNote();

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
  // keep proportions: changing one side changes the other
  $('#img-w').oninput = () => { if ($('#img-keep').checked && +$('#img-w').value > 0) $('#img-h').value = Math.max(1, Math.round(+$('#img-w').value * doc.height / doc.width)); };
  $('#img-h').oninput = () => { if ($('#img-keep').checked && +$('#img-h').value > 0) $('#img-w').value = Math.max(1, Math.round(+$('#img-h').value * doc.width / doc.height)); };
  $('#btn-resize').onclick = () => { const s = askedSize(); if (s) resizeImage(s.w, s.h); };
  $('#btn-canvas').onclick = () => { const s = askedSize(); if (s) canvasSize(s.w, s.h); };
  bindCheck('#opt-grid', 'grid', requestRender);
  $('#btn-rot-left').onclick = () => rotate(-90);
  $('#btn-rot-right').onclick = () => rotate(90);
  $('#btn-flip-h').onclick = () => flip(true);
  $('#btn-flip-v').onclick = () => flip(false);
  $('#btn-rotate').onclick = () => { const a = Math.round(+$('#img-angle').value); if (Number.isFinite(a) && a) rotate(a); };
  $('#btn-img-crop').onclick = cropToSelection;
  $('#btn-trim').onclick = trim;

  bindMosaic();
  bindPalette();
}
