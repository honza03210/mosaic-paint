/* Pointer, touch (pinch to zoom), keyboard, paste and drag & drop. */
import type { Pt } from '../lib/geometry.ts';
import { $, state, rt, svg, stage, previewG, snapG, clamp, handlers, toast, unit, typingIn } from './env.ts';
import { toDoc, updateView, fitView, zoomAt, zoomCenter, drawGuides } from './view.ts';
import { snapPoint } from './snap.ts';
import { selectionChanged, moveElements, deleteSel, duplicate, selectAll } from './selection.ts';
import { commitFor } from './areas.ts';
import { commit, restoreCurrent, undo, redo } from './history.ts';
import { savePrefs, pasteColors } from './palette.ts';
import { loadPhoto, pastePhoto } from './photo.ts';
import { imageFromPaste } from '../shared/clipboard.ts';
import { save, openFile, loadFile, confirmDiscard } from './files.ts';
import { tools, setTool, cancelPending, updateStageActions, finishFree, freeBack } from './tools.ts';
import { setSides } from './panel.ts';
import { t } from '../shared/i18n.ts';
import { modalOpen } from '../shared/ui.ts';

function setTouch(on: boolean): void {
  rt.snapPx = on ? 18 : 10;
  rt.handlePx = on ? 18 : 9;
  rt.hitPx = on ? 12 : 6;
}

// ---- pointer & pinch ------------------------------------------------------------------------------
const pointers = new Map<number, Pt>();
let pinch: { d0: number; m0: Pt; view: { s: number; x: number; y: number } } | null = null, pinchDone = false;
function startPinch(): void {
  // a second finger turns the gesture into pan / zoom; drop whatever the first finger began
  const a = state.action;
  if (a && ((a.moved && ['move', 'vertex', 'ngon-resize'].includes(a.type)) || (a.type === 'paint' && a.ctx.changed))) restoreCurrent();
  if (a && a.type === 'free-press' && state.freePts) {
    state.freePts.pop();
    if (!state.freePts.length) state.freePts = null;
  }
  if (state.tool !== 'free' && !(state.tool === 'line' && state.chain)) state.lineStart = null;
  state.action = null;
  previewG.innerHTML = '';
  snapG.innerHTML = '';
  const [p1, p2] = [...pointers.values()];
  pinch = { d0: Math.hypot(p1.x - p2.x, p1.y - p2.y) || 1, m0: { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 }, view: { ...state.view } };
  pinchDone = true;
}
function movePinch(): void {
  const [p1, p2] = [...pointers.values()];
  const d = Math.hypot(p1.x - p2.x, p1.y - p2.y) || 1, m = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
  const r = svg.getBoundingClientRect(), v0 = pinch.view;
  const s = clamp(v0.s * d / pinch.d0, 0.005, 2000);
  const docPt = { x: v0.x + (pinch.m0.x - r.left) / v0.s, y: v0.y + (pinch.m0.y - r.top) / v0.s };
  state.view = { s, x: docPt.x - (m.x - r.left) / s, y: docPt.y - (m.y - r.top) / s };
  updateView();
}
function capturePointer(e: PointerEvent): void { try { svg.setPointerCapture(e.pointerId); } catch { /* pointer already gone */ } }
function pointerEnd(e: PointerEvent): boolean {
  pointers.delete(e.pointerId);
  if (pinch || pinchDone) {
    if (pointers.size < 2) pinch = null;
    if (!pointers.size) pinchDone = false;
    return true;
  }
  return false;
}
function bindPointer(): void {
  svg.addEventListener('pointerdown', (e) => {
    setTouch(e.pointerType === 'touch' || e.pointerType === 'pen');
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2) { startPinch(); return; }
    if (pointers.size > 2 || pinch) return;
    pinchDone = false;
    if (e.button === 2) {
      if (state.lineStart || state.action || state.freePts) cancelPending();
      return;
    }
    const raw = toDoc(e.clientX, e.clientY);
    if (state.pickCenter && e.button === 0) {
      const p = snapPoint(raw);
      state.sym.cx = p.x;
      state.sym.cy = p.y;
      state.pickCenter = false;
      $('#btn-sym-center').classList.remove('active');
      savePrefs();
      drawGuides();
      toast(t('Symmetry center set.'));
      return;
    }
    if (e.button === 1 || state.space || state.tool === 'pan') {
      e.preventDefault();
      state.action = { type: 'pan', cx: e.clientX, cy: e.clientY, vx: state.view.x, vy: state.view.y };
      capturePointer(e);
      stage.classList.add('panning');
      return;
    }
    if (e.button !== 0) return;
    capturePointer(e);
    tools[state.tool].down(e, raw);
    updateStageActions();
  });
  svg.addEventListener('pointermove', (e) => {
    if (pointers.has(e.pointerId)) pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pinch) { if (pointers.size >= 2) movePinch(); return; }
    if (pinchDone) return;
    const raw = toDoc(e.clientX, e.clientY);
    $('#st-pos').textContent = `x ${raw.x.toFixed(1)}  y ${raw.y.toFixed(1)} ${unit()}`;
    const a = state.action;
    if (a && a.type === 'pan') {
      state.view.x = a.vx - (e.clientX - a.cx) / state.view.s;
      state.view.y = a.vy - (e.clientY - a.cy) / state.view.s;
      updateView();
      return;
    }
    if (state.space) return;
    if (e.pointerType === 'touch' && !pointers.has(e.pointerId)) return;
    tools[state.tool].move(e, raw);
  });
  svg.addEventListener('pointerup', (e) => {
    if (pointerEnd(e)) return;
    const a = state.action;
    if (a && a.type === 'pan') { state.action = null; stage.classList.remove('panning'); return; }
    if (e.button !== 0) return;
    tools[state.tool].up(e, toDoc(e.clientX, e.clientY));
    updateStageActions();
  });
  svg.addEventListener('pointercancel', (e) => {
    pointerEnd(e);
    if (state.action && state.action.type === 'paint' && state.action.ctx.changed) commit(true);
    state.action = null;
    previewG.innerHTML = '';
    stage.classList.remove('panning');
  });
  svg.addEventListener('pointerleave', () => { if (!state.action) snapG.innerHTML = ''; });
  svg.addEventListener('dblclick', () => { if (state.tool === 'free' && state.freePts) finishFree(); });
  svg.addEventListener('contextmenu', (e) => e.preventDefault());
  svg.addEventListener('wheel', (e) => {
    e.preventDefault();
    const dy = e.deltaMode === 1 ? e.deltaY * 30 : e.deltaY;
    zoomAt(e.clientX, e.clientY, Math.exp(-dy * 0.0015));
  }, { passive: false });
  new ResizeObserver(() => updateView()).observe(stage);
}

// ---- keyboard ------------------------------------------------------------------------------------------
function onKey(e: KeyboardEvent): void {
  const target = e.target as HTMLElement;
  if (typingIn(target)) {
    if (e.key !== 'Escape') return;
    target.blur();
    // Esc also stops a line or shape being drawn (its first point is already placed)
    if (!state.lineStart && !state.freePts) return;
  }
  if (target.tagName === 'INPUT' && e.key === ' ') return; // space toggles a focused checkbox
  if (modalOpen()) return;
  const ctrl = e.ctrlKey || e.metaKey, k = e.key.toLowerCase();
  if (ctrl) {
    if (k === 'z' && !e.shiftKey) undo();
    else if (k === 'y' || (k === 'z' && e.shiftKey)) redo();
    else if (k === 's') save(e.shiftKey);
    else if (k === 'o') openFile();
    else if (k === 'd') duplicate();
    else if (k === 'a') selectAll();
    else return;
    e.preventDefault();
    return;
  }
  if (e.key === ' ') {
    if (!state.space) { state.space = true; stage.classList.add('space'); }
    e.preventDefault();
    return;
  }
  const nudge = (dx: number, dy: number) => {
    if (!state.selection.size) return;
    const s = state.grid ? state.gridSize : (e.shiftKey ? 10 : 1);
    moveElements([...state.selection], { x: dx * s, y: dy * s });
    commitFor(state.selection);
  };
  switch (k) {
    case 'v': setTool('select'); break;
    case 'l': setTool('line'); break;
    case 'p': setTool('free'); break;
    case 'g': case 'n': setTool('ngon'); break;
    case 'k': setTool('knife'); break;
    case 't': setTool('pattern'); break;
    case 'b': case 'f': setTool('bucket'); break;
    case 'h': setTool('pan'); break;
    case 's': state.snap = !state.snap; $('#opt-snap').checked = state.snap; savePrefs(); toast(state.snap ? t('Snapping on') : t('Snapping off')); break;
    case 'enter': if (state.freePts) finishFree(); else if (state.lineStart) cancelPending(); break;
    case 'delete': case 'backspace':
      if (state.freePts) freeBack(); else deleteSel();
      break;
    case 'escape':
      cancelPending();
      if (state.pickCenter) { state.pickCenter = false; $('#btn-sym-center').classList.remove('active'); }
      if (state.selection.size) { state.selection.clear(); selectionChanged(); }
      break;
    case '0': fitView(); break;
    case '+': case '=': zoomCenter(1.25); break;
    case '-': case '_': zoomCenter(0.8); break;
    case 'arrowleft': nudge(-1, 0); break;
    case 'arrowright': nudge(1, 0); break;
    case 'arrowup': nudge(0, -1); break;
    case 'arrowdown': nudge(0, 1); break;
    default:
      if (/^[3-9]$/.test(k)) { setSides(+k); if (state.tool !== 'ngon') setTool('ngon'); } else return;
  }
  e.preventDefault();
}

export function bindInput(): void {
  bindPointer();
  window.addEventListener('keydown', onKey);
  window.addEventListener('keyup', (e) => {
    if (e.key === ' ') { state.space = false; stage.classList.remove('space'); }
  });
  window.addEventListener('blur', () => { state.space = false; stage.classList.remove('space'); });

  // paste colors anywhere outside a text field
  document.addEventListener('paste', (e) => {
    if (typingIn(e.target)) return;
    const text = (e.clipboardData && e.clipboardData.getData('text')) || '';
    // an image (from the raster app, a screenshot, a web page…) becomes the photo to trace;
    // shapes copied here carry a picture too, but paste as shapes
    const img = imageFromPaste(e);
    if (img && !/data-mosaic-snippet/.test(text)) { e.preventDefault(); pastePhoto(img); return; }
    // modules get the first look (motifs pastes copied shapes), even with an empty clipboard
    for (const fn of handlers('pasteText')) if (fn(text)) { e.preventDefault(); return; }
    if (!text) return;
    if (!pasteColors(text)) toast(t('The clipboard has no color codes.'));
  });

  // drag & drop an SVG (opens it) or a photo (becomes the tracing photo)
  stage.addEventListener('dragover', (e) => { e.preventDefault(); stage.classList.add('drop'); });
  stage.addEventListener('dragleave', () => stage.classList.remove('drop'));
  stage.addEventListener('drop', (e) => {
    e.preventDefault();
    stage.classList.remove('drop');
    const f = e.dataTransfer.files[0];
    if (!f) return;
    if (/^image\//.test(f.type) && !/svg/.test(f.type)) loadPhoto(f);
    else if (confirmDiscard()) loadFile(f);
  });
}
