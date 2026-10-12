/* Pointer, touch (pinch to zoom), keyboard, paste and drag & drop for the raster app. */
import type { Pt } from '../lib/geometry.ts';
import { $, clamp, toast, typingIn, modalOpen } from '../shared/ui.ts';
import { imageFromPaste } from '../shared/clipboard.ts';
import { state, on, savePrefs } from './state.ts';
import { stage, view, toDoc, updateView, fitView, zoomAt, zoomCenter, actualSize, requestRender } from './canvas.ts';
import { undo, redo, restoreCurrent, commit } from './history.ts';
import { pickAt } from './paint.ts';
import { place, cancelFloating, deselect, selectAll, copy, clearSelection, pasteImage, pasteInternal } from './select.ts';
import { pasteColors, renderPalette } from './palette.ts';
import { tools, setTool } from './tools.ts';
import { save, openFile, openImageFile, confirmDiscard } from './files.ts';
import { setSides, setBrushSize, nextTip } from './panel.ts';
import { t } from '../shared/i18n.ts';

// ---- pointer & pinch ------------------------------------------------------------------------------------
const pointers = new Map<number, Pt>();
let pinch: { d0: number; m0: Pt; view: { s: number; x: number; y: number } } | null = null, pinchDone = false;
function startPinch(): void {
  // a second finger turns the gesture into pan / zoom: undo what the first finger began
  const a = state.action;
  if (a && (a.type === 'stroke')) restoreCurrent();
  state.action = null;
  state.preview = null;
  const [p1, p2] = [...pointers.values()];
  pinch = { d0: Math.hypot(p1.x - p2.x, p1.y - p2.y) || 1, m0: { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 }, view: { ...state.view } };
  pinchDone = true;
}
function movePinch(): void {
  const [p1, p2] = [...pointers.values()];
  const d = Math.hypot(p1.x - p2.x, p1.y - p2.y) || 1, m = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
  const r = view.getBoundingClientRect(), v0 = pinch.view;
  const s = clamp(v0.s * d / pinch.d0, 0.02, 64);
  const docPt = { x: v0.x + (pinch.m0.x - r.left) / v0.s, y: v0.y + (pinch.m0.y - r.top) / v0.s };
  state.view = { s, x: docPt.x - (m.x - r.left) / s, y: docPt.y - (m.y - r.top) / s };
  updateView();
}
function capturePointer(e: PointerEvent): void { try { view.setPointerCapture(e.pointerId); } catch { /* pointer already gone */ } }
function pointerEnd(e: PointerEvent): boolean {
  pointers.delete(e.pointerId);
  if (pinch || pinchDone) {
    if (pointers.size < 2) pinch = null;
    if (!pointers.size) pinchDone = false;
    return true;
  }
  return false;
}
const PAINT = new Set(['brush', 'pencil', 'eraser', 'line', 'ngon', 'bucket']);
function bindPointer(): void {
  view.addEventListener('pointerdown', (e) => {
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2) { startPinch(); return; }
    if (pointers.size > 2 || pinch) return;
    pinchDone = false;
    const p = toDoc(e.clientX, e.clientY);
    if (e.button === 1 || state.space || state.tool === 'pan') {
      e.preventDefault();
      state.action = { type: 'pan', cx: e.clientX, cy: e.clientY, vx: state.view.x, vy: state.view.y };
      capturePointer(e);
      stage.classList.add('panning');
      return;
    }
    if (e.button === 2) { if (state.action) { state.action = null; state.preview = null; restoreCurrent(); } return; }
    if (e.button !== 0) return;
    if (e.altKey && PAINT.has(state.tool)) { pickAt(p); return; }
    // painting places pasted / moved pixels first
    if (state.tool !== 'select' && state.floating) place();
    capturePointer(e);
    tools[state.tool].down(e, p);
  });
  view.addEventListener('pointermove', (e) => {
    if (pointers.has(e.pointerId)) pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pinch) { if (pointers.size >= 2) movePinch(); return; }
    if (pinchDone) return;
    const p = toDoc(e.clientX, e.clientY);
    $('#st-pos').textContent = `x ${Math.floor(p.x)}  y ${Math.floor(p.y)} px`;
    state.cursor = e.pointerType === 'touch' ? null : p;
    const a = state.action;
    if (a && a.type === 'pan') {
      state.view.x = a.vx - (e.clientX - a.cx) / state.view.s;
      state.view.y = a.vy - (e.clientY - a.cy) / state.view.s;
      updateView();
      return;
    }
    if (!state.space && !(e.pointerType === 'touch' && !pointers.has(e.pointerId))) tools[state.tool].move(e, p);
    requestRender();
  });
  view.addEventListener('pointerup', (e) => {
    if (pointerEnd(e)) return;
    const a = state.action;
    if (a && a.type === 'pan') { state.action = null; stage.classList.remove('panning'); return; }
    if (e.button !== 0) return;
    tools[state.tool].up(e, toDoc(e.clientX, e.clientY));
  });
  view.addEventListener('pointercancel', (e) => {
    pointerEnd(e);
    if (state.action && state.action.type === 'stroke') commit();
    state.action = null;
    state.preview = null;
    stage.classList.remove('panning');
    requestRender();
  });
  view.addEventListener('pointerleave', () => { state.cursor = null; requestRender(); });
  view.addEventListener('contextmenu', (e) => e.preventDefault());
  view.addEventListener('wheel', (e) => {
    e.preventDefault();
    const dy = e.deltaMode === 1 ? e.deltaY * 30 : e.deltaY;
    zoomAt(e.clientX, e.clientY, Math.exp(-dy * 0.0015));
  }, { passive: false });
}

// ---- keyboard ------------------------------------------------------------------------------------------
function onKey(e: KeyboardEvent): void {
  const target = e.target as HTMLElement;
  if (typingIn(target)) {
    if (e.key === 'Escape') target.blur();
    return;
  }
  if (target.tagName === 'INPUT' && e.key === ' ') return; // space toggles a focused checkbox
  if (modalOpen()) return;
  const ctrl = e.ctrlKey || e.metaKey, k = e.key.toLowerCase();
  if (ctrl) {
    if (k === 'z' && !e.shiftKey) undo();
    else if (k === 'y' || (k === 'z' && e.shiftKey)) redo();
    else if (k === 's') save();
    else if (k === 'o') openFile();
    else if (k === 'a') { setTool('select'); selectAll(); }
    else if (k === 'c' || k === 'x') {
      if (window.getSelection && String(window.getSelection())) return; // copying text from the page
      copy(k === 'x');
    } else if (k === 'd') deselect();
    else return; // Ctrl+V: the paste event below
    e.preventDefault();
    return;
  }
  if (e.key === ' ') {
    if (!state.space) { state.space = true; stage.classList.add('space'); }
    e.preventDefault();
    return;
  }
  switch (k) {
    case 'v': setTool('select'); break;
    case 'b': if (e.shiftKey) nextTip(); else setTool('brush'); break;
    case 'p': setTool('pencil'); break;
    case 'e': setTool('eraser'); break;
    case 'l': setTool('line'); break;
    case 'g': setTool('ngon'); break;
    case 'f': setTool('bucket'); break;
    case 'i': setTool('picker'); break;
    case 'h': setTool('pan'); break;
    case 'x': { const f = state.fill; state.fill = state.stroke; state.stroke = f; savePrefs(); renderPalette(); break; }
    case '[': setBrushSize(state.size > 10 ? state.size - 5 : state.size - 1); break;
    case ']': setBrushSize(state.size >= 10 ? state.size + 5 : state.size + 1); break;
    case 'enter': if (!place()) return; break;
    case 'escape':
      if (state.floating) cancelFloating();
      else if (state.action) { state.action = null; state.preview = null; restoreCurrent(); }
      else deselect();
      break;
    case 'delete': case 'backspace': clearSelection(); break;
    case '0': fitView(); break;
    case '1': actualSize(); break;
    case '+': case '=': zoomCenter(1.25); break;
    case '-': case '_': zoomCenter(0.8); break;
    default:
      if (/^[3-9]$/.test(k)) { setSides(+k); if (state.tool !== 'ngon') setTool('ngon'); } else return;
  }
  e.preventDefault();
}

export function bindInput(): void {
  bindPointer();
  window.addEventListener('keydown', onKey);
  window.addEventListener('keyup', (e) => { if (e.key === ' ') { state.space = false; stage.classList.remove('space'); } });
  window.addEventListener('blur', () => { state.space = false; stage.classList.remove('space'); });

  // pasting: an image (from the vector app, a screenshot, a web page…) or color codes
  document.addEventListener('paste', (e) => {
    if (typingIn(e.target) || modalOpen()) return;
    const img = imageFromPaste(e);
    const text = (e.clipboardData && e.clipboardData.getData('text')) || '';
    if (img) { e.preventDefault(); setTool('select'); pasteImage(img); return; }
    // shapes copied in the vector app without a picture (older browsers): render them
    if (/data-mosaic-snippet/.test(text)) { e.preventDefault(); setTool('select'); pasteImage(new Blob([text], { type: 'image/svg+xml' })); return; }
    if (text && pasteColors(text)) { e.preventDefault(); return; }
    if (pasteInternal()) { e.preventDefault(); setTool('select'); return; }
    toast(t('The clipboard has no image or color codes.'));
  });
  on('paste-start', () => { if (state.tool !== 'select') setTool('select'); });

  // drag & drop an image to open it
  stage.addEventListener('dragover', (e) => { e.preventDefault(); stage.classList.add('drop'); });
  stage.addEventListener('dragleave', () => stage.classList.remove('drop'));
  stage.addEventListener('drop', (e) => {
    e.preventDefault();
    stage.classList.remove('drop');
    const f = e.dataTransfer.files[0];
    if (f) confirmDiscard().then((ok) => { if (ok) openImageFile(f); });
  });
}
