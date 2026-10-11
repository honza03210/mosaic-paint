/* Settings that are remembered, named palettes, the swatches, and the fill / stroke colors. */
import * as Colors from '../lib/colors.ts';
import { $, state, isFill, emit, toast, lsGet, lsSet } from './env.ts';
import { allShapes, fillOf, paintFill, setPaint } from './doc.ts';
import { commit } from './history.ts';

// ---- remembered settings ------------------------------------------------------------------------
const PREF_KEYS = ['mode', 'fill', 'stroke', 'strokeWidth', 'palettes', 'paletteName', 'snap', 'link', 'grid', 'gridSize', 'border', 'gapPct',
  'chain', 'sides', 'ngonMode', 'newFill', 'lastRadius', 'lastRot', 'pattern', 'sym', 'layers', 'refOpacity', 'savePhoto', 'onlyUnpainted', 'grout', 'rulers'];
export function savePrefs(): void {
  const o: Record<string, unknown> = {};
  for (const k of PREF_KEYS) o[k] = state[k];
  lsSet('mz-prefs', JSON.stringify(o));
}
export function loadPrefs(): void {
  let o: any;
  try { o = JSON.parse(lsGet('mz-prefs') || '{}'); } catch { return; }
  // settings from the first versions
  if (Array.isArray(o.palette) && !o.palettes) o.palettes = { 'My palette': o.palette };
  if ('ngonFill' in o && !('newFill' in o)) o.newFill = o.ngonFill;
  for (const k of PREF_KEYS) {
    if (!(k in o)) continue;
    if (k === 'layers') for (const n in state.layers) Object.assign(state.layers[n], o.layers[n] || {});
    else if (['pattern', 'sym', 'grout'].includes(k)) Object.assign(state[k], o[k]);
    else state[k] = o[k];
  }
  if (!state.palettes[state.paletteName]) state.paletteName = Object.keys(state.palettes)[0] || 'My palette';
}

// ---- palettes ----------------------------------------------------------------------------------
export function uniqueName(base: string): string {
  let n = base, i = 2;
  while (state.palettes[n]) n = `${base} ${i++}`;
  return n;
}
export function renderPaletteSelect(): void {
  const sel = $('#pal-select');
  sel.innerHTML = '';
  for (const name of Object.keys(state.palettes)) {
    const o = document.createElement('option');
    o.value = o.textContent = name;
    sel.append(o);
  }
  sel.value = state.paletteName;
}
export function switchPalette(name: string): void {
  if (!state.palettes[name]) return;
  state.paletteName = name;
  savePrefs();
  renderPaletteSelect();
  renderPalette();
}
/** Adds a palette under a free name and switches to it. Returns the name used. */
export function addPalette(name: string, colors: string[]): string {
  const n = uniqueName(name);
  state.palettes[n] = colors;
  switchPalette(n);
  return n;
}
export function addColors(list: (string | null)[]): number {
  let added = 0;
  for (const c of list) if (c && !state.palette.includes(c)) { state.palette.push(c); added++; }
  savePrefs();
  renderPalette();
  return added;
}
function colorCounts(): Map<string, number> {
  const m = new Map<string, number>();
  for (const el of allShapes()) {
    const c = fillOf(el);
    if (c) m.set(c, (m.get(c) || 0) + 1);
  }
  return m;
}

// ---- the swatches --------------------------------------------------------------------------------
let paletteKey = '';
export function renderPalette(): void {
  const box = $('#palette');
  const counts = colorCounts(), key = state.palette.join();
  // same colors as before: update the swatches in place (rebuilding them would swallow a double-click)
  if (key === paletteKey && box.children.length === state.palette.length + 1) {
    [null, ...state.palette].forEach((c, i) => updateSwatch(box.children[i], c, counts));
  } else {
    paletteKey = key;
    box.innerHTML = '';
    for (const c of [null, ...state.palette]) box.append(makeSwatch(c, counts));
  }
  const fb = $('#ac-fill'), sb = $('#ac-stroke');
  fb.className = 'acbox' + (state.fill ? '' : ' none');
  fb.style.background = state.fill || '';
  sb.className = 'acbox' + (state.stroke ? '' : ' none');
  sb.style.background = state.stroke || '';
  emit('palette');
}
function updateSwatch(d: HTMLElement, c: string | null, counts: Map<string, number>): void {
  d.classList.toggle('is-fill', c === state.fill);
  d.classList.toggle('is-stroke', c === state.stroke);
  const n = c ? counts.get(c) || 0 : 0;
  const num = c ? state.palette.indexOf(c) + 1 : 0;
  d.title = c ? `#${num}  ${c}${n ? ` – used by ${n} area${n > 1 ? 's' : ''}` : ''}\nClick: fill · Right-click: stroke · Double-click: edit` : 'No color – the bucket erases with it';
  let b = d.querySelector('.count');
  if (n && !b) { b = document.createElement('span'); b.className = 'count'; d.prepend(b); }
  if (b) { if (n) b.textContent = String(n); else b.remove(); }
}
function makeSwatch(c: string | null, counts: Map<string, number>): HTMLElement {
  const d = document.createElement('div');
  d.className = 'swatch' + (c ? '' : ' none');
  if (c) d.style.background = c;
  updateSwatch(d, c, counts);
  if (c) {
    const x = document.createElement('button');
    x.className = 'del';
    x.textContent = '×';
    x.title = 'Remove from palette';
    x.onclick = (e) => { e.stopPropagation(); removeColor(c); };
    d.append(x);
    d.ondblclick = () => editColor(c);
  }
  // Shift+click is left to add-on modules (the color mix)
  d.onclick = (e) => { if (e.shiftKey) emit('swatch-shift', c, e); else setFill(c, true); };
  d.oncontextmenu = (e) => { e.preventDefault(); setStroke(c, true); };
  return d;
}

// ---- fill & stroke colors ------------------------------------------------------------------------
const applyToSelection = () => state.tool === 'select' && state.selection.size > 0;
export function setFill(c: string | null, apply: boolean): void {
  state.fill = c;
  savePrefs();
  if (apply && applyToSelection()) {
    for (const el of state.selection) {
      if (isFill(el) && !c) { el.remove(); continue; }
      if (el.tagName !== 'line') paintFill(el, c);
    }
    commit(true);
  } else renderPalette();
}
export function setStroke(c: string | null, apply: boolean): void {
  state.stroke = c;
  savePrefs();
  if (apply && applyToSelection()) {
    for (const el of state.selection) if (!isFill(el)) setPaint(el, 'stroke', c);
    commit(true);
  } else renderPalette();
}
function removeColor(c: string): void {
  state.palette = state.palette.filter(x => x !== c);
  savePrefs();
  renderPalette();
}
/** Recolors every area painted with `from`; to = null erases them. Returns the number changed. */
export function replaceColor(from: string, to: string | null): number {
  let n = 0;
  for (const el of allShapes()) {
    if (fillOf(el) !== from) continue;
    if (!to && isFill(el)) el.remove(); else paintFill(el, to);
    n++;
  }
  return n;
}
function editColor(old: string): void {
  const v = prompt('Edit color (hex or any CSS color).\nAreas painted with it are recolored too.', old);
  if (v == null) return;
  const c = Colors.norm(v);
  if (!c) { toast('Not a valid color: ' + v); return; }
  if (c === old) return;
  const i = state.palette.indexOf(old);
  if (state.palette.includes(c)) state.palette.splice(i, 1); else state.palette[i] = c;
  let n = replaceColor(old, c);
  for (const el of allShapes()) {
    if (!isFill(el) && Colors.norm(getComputedStyle(el).stroke) === old) { setPaint(el, 'stroke', c); n++; }
  }
  if (state.fill === old) state.fill = c;
  if (state.stroke === old) state.stroke = c;
  savePrefs();
  if (n) { commit(true); toast(`Recolored ${n} element${n > 1 ? 's' : ''}.`); } else renderPalette();
}
export function addFromInput(): void {
  const inp = $('#color-input');
  const text = inp.value.trim();
  if (!text) { inp.focus(); toast('Paste a color code (or several) into the box, then press Enter.'); return; }
  const cols = Colors.parse(text);
  if (!cols.length) { toast('No color found in: ' + text); return; }
  const n = addColors(cols);
  if (cols.length === 1) setFill(cols[0], false);
  inp.value = '';
  updateColorPreview();
  toast(n ? `Added ${n} color${n > 1 ? 's' : ''}.` : 'Already in the palette.');
}
export function updateColorPreview(): void {
  const c = Colors.parse($('#color-input').value)[0];
  const p = $('#color-preview');
  p.style.background = c || 'transparent';
  p.title = c || '';
}
