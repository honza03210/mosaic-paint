/* The palette panel shared by both apps: named palettes, swatches, adding pasted color codes,
   import / export, and the two active colors. What the colors do in the drawing is up to the app (the host).
   The palettes themselves are shared between the apps through the stored settings. */
import * as Colors from '../lib/colors.ts';
import { $, toast, download, lsGet, lsSet } from './ui.ts';
import { t } from './i18n.ts';

export interface PaletteState {
  fill: string | null;
  stroke: string | null;
  palettes: Record<string, string[]>;
  paletteName: string;
  palette: string[];
}
export interface PaletteHost {
  state: PaletteState;
  /** Remember the settings. */
  save(): void;
  /** How much each color is used in the drawing, and how to say it ("3 areas"). */
  counts(): Map<string, number>;
  usage(n: number): string;
  /** Names of the two active colors, for the swatch tooltips. */
  names: { fill: string; stroke: string; none: string };
  /** Every color in the drawing ("From drawing"). */
  docColors(): (string | null)[];
  /** A swatch was clicked: return true if the app used the color right away (e.g. on a selection). */
  applyFill?(c: string | null): boolean;
  applyStroke?(c: string | null): boolean;
  /** A palette color was edited: recolor the drawing; returns a message when something changed. */
  recolor?(from: string, to: string): string | null;
  /** Shift+click on a swatch. */
  shiftClick?(c: string | null, e: MouseEvent): void;
  /** After the swatches were drawn. */
  rendered?(): void;
}

/** The palette a first visit starts with. */
export const DEFAULT_PALETTE = ['#264653', '#2a9d8f', '#8ab17d', '#e9c46a', '#f4a261', '#e76f51', '#f1faee', '#a8dadc', '#457b9d', '#1d3557'];

// ---- palettes shared between the apps (stored with the vector app's settings) --------------------------
const SHARED_KEY = 'mz-prefs';
function readShared(): any { try { return JSON.parse(lsGet(SHARED_KEY) || '{}'); } catch { return {}; } }
export function loadSharedPalettes(st: PaletteState): void {
  const o = readShared();
  if (o.palettes && typeof o.palettes === 'object' && Object.keys(o.palettes).length) st.palettes = o.palettes;
  if (o.paletteName && st.palettes[o.paletteName]) st.paletteName = o.paletteName;
}
export function saveSharedPalettes(st: PaletteState): void {
  const o = readShared();
  o.palettes = st.palettes;
  o.paletteName = st.paletteName;
  lsSet(SHARED_KEY, JSON.stringify(o));
}

export function createPaletteUI(host: PaletteHost) {
  const st = host.state;

  function uniqueName(base: string): string {
    let n = base, i = 2;
    while (st.palettes[n]) n = `${base} ${i++}`;
    return n;
  }
  function renderSelect(): void {
    const sel = $('#pal-select');
    sel.innerHTML = '';
    for (const name of Object.keys(st.palettes)) {
      const o = document.createElement('option');
      o.value = o.textContent = name;
      sel.append(o);
    }
    sel.value = st.paletteName;
  }
  function switchPalette(name: string): void {
    if (!st.palettes[name]) return;
    st.paletteName = name;
    host.save();
    renderSelect();
    render();
  }
  /** Adds a palette under a free name and switches to it. Returns the name used. */
  function addPalette(name: string, colors: string[]): string {
    const n = uniqueName(name);
    st.palettes[n] = colors;
    switchPalette(n);
    return n;
  }
  function addColors(list: (string | null)[]): number {
    let added = 0;
    for (const c of list) if (c && !st.palette.includes(c)) { st.palette.push(c); added++; }
    host.save();
    render();
    return added;
  }

  // ---- the swatches ------------------------------------------------------------------------------
  let paletteKey = '';
  function render(): void {
    const box = $('#palette');
    const counts = host.counts(), key = st.palette.join();
    // same colors as before: update the swatches in place (rebuilding them would swallow a double-click)
    if (key === paletteKey && box.children.length === st.palette.length + 1) {
      [null, ...st.palette].forEach((c, i) => updateSwatch(box.children[i], c, counts));
    } else {
      paletteKey = key;
      box.innerHTML = '';
      for (const c of [null, ...st.palette]) box.append(makeSwatch(c, counts));
    }
    const fb = $('#ac-fill'), sb = $('#ac-stroke');
    fb.className = 'acbox' + (st.fill ? '' : ' none');
    fb.style.background = st.fill || '';
    if (sb) {
      sb.className = 'acbox' + (st.stroke ? '' : ' none');
      sb.style.background = st.stroke || '';
    }
    if (host.rendered) host.rendered();
  }
  function updateSwatch(d: HTMLElement, c: string | null, counts: Map<string, number>): void {
    d.classList.toggle('is-fill', c === st.fill);
    d.classList.toggle('is-stroke', c === st.stroke);
    const n = c ? counts.get(c) || 0 : 0;
    const num = c ? st.palette.indexOf(c) + 1 : 0;
    const N = host.names;
    d.title = c ? `#${num}  ${c}${n ? ' – ' + t('used by {what}', { what: host.usage(n) }) : ''}\n` + t('Click: {fill} · Right-click: {stroke} · Double-click: edit', { fill: N.fill, stroke: N.stroke }) : N.none;
    // for keyboards and screen readers: the color, and whether it is the active one
    d.setAttribute('aria-label', c ? `#${num} ${c}${n ? ' – ' + t('used by {what}', { what: host.usage(n) }) : ''}` : N.none);
    d.setAttribute('aria-pressed', String(c === st.fill));
    let b = d.querySelector('.count');
    if (n && !b) { b = document.createElement('span'); b.className = 'count'; d.prepend(b); }
    if (b) { if (n) b.textContent = n > 9999 ? Math.round(n / 1000) + 'k' : String(n); else b.remove(); }
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
      x.title = t('Remove from palette');
      x.onclick = (e) => { e.stopPropagation(); removeColor(c); };
      // the swatch itself takes Delete from the keyboard: this small button is for the mouse
      x.tabIndex = -1;
      x.setAttribute('aria-hidden', 'true');
      d.append(x);
      d.ondblclick = () => editColor(c);
    }
    d.onclick = (e) => { if (e.shiftKey && host.shiftClick) host.shiftClick(c, e); else setFill(c, true); };
    d.oncontextmenu = (e) => { e.preventDefault(); setStroke(c, true); };
    // keyboard: Enter / Space = fill (Shift: stroke), Delete removes the color
    d.setAttribute('role', 'button');
    d.tabIndex = 0;
    d.onkeydown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (e.shiftKey) setStroke(c, true); else setFill(c, true); }
      else if ((e.key === 'Delete' || e.key === 'Backspace') && c) { e.preventDefault(); e.stopPropagation(); removeColor(c); }
    };
    return d;
  }

  // ---- the active colors ---------------------------------------------------------------------------
  function setFill(c: string | null, apply: boolean): void {
    st.fill = c;
    host.save();
    if (!(apply && host.applyFill && host.applyFill(c))) render();
  }
  function setStroke(c: string | null, apply: boolean): void {
    st.stroke = c;
    host.save();
    if (!(apply && host.applyStroke && host.applyStroke(c))) render();
  }
  function removeColor(c: string): void {
    st.palette = st.palette.filter(x => x !== c);
    host.save();
    render();
  }
  function editColor(old: string): void {
    const v = prompt(t('Edit color (hex or any CSS color).\nThe drawing is recolored too.'), old);
    if (v == null) return;
    const c = Colors.norm(v);
    if (!c) { toast(t('Not a valid color: {v}', { v })); return; }
    if (c === old) return;
    const i = st.palette.indexOf(old);
    if (st.palette.includes(c)) st.palette.splice(i, 1); else st.palette[i] = c;
    if (st.fill === old) st.fill = c;
    if (st.stroke === old) st.stroke = c;
    host.save();
    const msg = host.recolor ? host.recolor(old, c) : null;
    if (msg) toast(msg);
    render();
  }
  function addFromInput(): void {
    const inp = $('#color-input');
    const text = inp.value.trim();
    if (!text) { inp.focus(); toast(t('Paste a color code (or several) into the box, then press Enter.')); return; }
    const cols = Colors.parse(text);
    if (!cols.length) { toast(t('No color found in: {text}', { text })); return; }
    const n = addColors(cols);
    if (cols.length === 1) setFill(cols[0], false);
    inp.value = '';
    updatePreview();
    toast(n ? t('Added {n} {n|color|colors}.', { n }) : t('Already in the palette.'));
  }
  function updatePreview(): void {
    const c = Colors.parse($('#color-input').value)[0];
    const p = $('#color-preview');
    p.style.background = c || 'transparent';
    p.title = c || '';
  }
  /** Color codes pasted outside a text field go into the palette. Returns false if the text has none. */
  function pasteColors(text: string): boolean {
    const cols = Colors.parse(text);
    if (!cols.length) return false;
    const n = addColors(cols);
    if (cols.length === 1) setFill(cols[0], false);
    toast(n ? t('Added {n} {n|color|colors} from the clipboard.', { n }) : t('Those colors are already in the palette.'));
    return true;
  }

  /** Wires the palette controls of the side panel. */
  function bind(): void {
    const inp = $('#color-input');
    $('#btn-add-color').onclick = addFromInput;
    inp.addEventListener('keydown', (e: KeyboardEvent) => { if (e.key === 'Enter') addFromInput(); });
    inp.addEventListener('input', updatePreview);
    inp.addEventListener('paste', () => setTimeout(() => { if (Colors.parse(inp.value).length) addFromInput(); }, 0));
    $('#btn-swap').onclick = () => { const f = st.fill; st.fill = st.stroke; st.stroke = f; host.save(); render(); };
    $('#pal-select').onchange = (e: any) => switchPalette(e.target.value);
    $('#btn-pal-new').onclick = () => {
      const n = prompt(t('Name of the new palette:'), uniqueName(t('Palette')));
      if (!n || !n.trim()) return;
      const name = uniqueName(n.trim());
      st.palettes[name] = [];
      switchPalette(name);
      toast(t('Created “{name}”. Paste colors to fill it.', { name }));
    };
    $('#btn-pal-rename').onclick = () => {
      const old = st.paletteName, n = prompt(t('Rename palette:'), old);
      if (!n || !n.trim() || n.trim() === old) return;
      const name = uniqueName(n.trim()), next: Record<string, string[]> = {};
      for (const k of Object.keys(st.palettes)) next[k === old ? name : k] = st.palettes[k];
      st.palettes = next;
      switchPalette(name);
    };
    $('#btn-pal-delete').onclick = () => {
      if (!confirm(t('Delete the palette “{name}”? (The drawing is not changed.)', { name: st.paletteName }))) return;
      delete st.palettes[st.paletteName];
      if (!Object.keys(st.palettes).length) st.palettes[t('My palette')] = [];
      switchPalette(Object.keys(st.palettes)[0]);
    };
    $('#btn-pal-doc').onclick = () => {
      const n = addColors(host.docColors());
      toast(n ? t('Added {n} {n|color|colors} from the drawing.', { n }) : t('No new colors in the drawing.'));
    };
    $('#btn-pal-export').onclick = () => download(new Blob([st.palette.join('\n') + '\n'], { type: 'text/plain' }), st.paletteName + '.txt');
    $('#btn-pal-clear').onclick = () => { if (confirm(t('Remove all colors from this palette? (The drawing is not changed.)'))) { st.palette = []; host.save(); render(); } };
    $('#btn-pal-import').onclick = () => $('#pal-file').click();
    $('#pal-file').onchange = async (e: any) => {
      const f = e.target.files[0];
      if (!f) return;
      const text = await f.text();
      e.target.value = '';
      const n = addColors(Colors.parse(text));
      toast(n ? t('Imported {n} {n|color|colors}.', { n }) : t('No new colors found in {name}', { name: f.name }));
    };
    // palettes changed in the other app (another tab) show up here too
    window.addEventListener('storage', (e) => {
      if (e.key !== SHARED_KEY) return;
      loadSharedPalettes(st);
      renderSelect();
      render();
    });
  }

  return { uniqueName, renderSelect, switchPalette, addPalette, addColors, render, setFill, setStroke, addFromInput, updatePreview, pasteColors, bind };
}
