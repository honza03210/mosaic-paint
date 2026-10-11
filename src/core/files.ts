/* Files: building / reading the SVG, open, save, PNG export, new drawing, and the Simple / Expert mode. */
import * as Colors from '../lib/colors.ts';
import { $, $$, SVGNS, EXPERT_TOOLS, state, rt, defsG, fillsG, shapesG, isFill, mk, fmt, ptsStr, emit, handlers, toast, download, unit } from './env.ts';
import { touch, linearPath } from './doc.ts';
import { applyDoc, applyLayers, fitView, updateView } from './view.ts';
import { resetHistory, afterChange, updateTitle, scheduleAutosave, saveVersion, hasContent } from './history.ts';
import { savePrefs, switchPalette, uniqueName } from './palette.ts';
import { applyGrout, groutCSS } from './grout.ts';
import { refImage, setPhoto, renderPhotoUI } from './photo.ts';
import { cancelPending, setTool } from './tools.ts';
import { t } from '../shared/i18n.ts';

export interface BuildOptions { photo?: boolean; grout?: boolean; pageOnly?: boolean }
/** opts.photo: include the reference photo (default: the user's setting). opts.grout: bake in the grout preview. */
export function buildSVGString(opts: BuildOptions = {}): string {
  const d = state.doc, u = unit();
  const root = document.createElementNS(SVGNS, 'svg');
  root.setAttribute('viewBox', `${fmt(d.x)} ${fmt(d.y)} ${fmt(d.w)} ${fmt(d.h)}`);
  root.setAttribute('width', fmt(d.w) + (u === 'px' ? '' : u));
  root.setAttribute('height', fmt(d.h) + (u === 'px' ? '' : u));
  mk('metadata', { id: 'mosaic-palette' }, root).textContent = JSON.stringify({ palette: state.palette, paletteName: state.paletteName, unit: u });
  for (const c of defsG.childNodes) root.appendChild(c.cloneNode(true));
  if (opts.grout) mk('style', {}, root).textContent = groutCSS();
  if (d.bg) mk('rect', { id: 'mosaic-bg', x: d.x, y: d.y, width: d.w, height: d.h, fill: d.bg }, root);
  const im = refImage();
  if (im && (opts.photo ?? state.savePhoto)) {
    // hidden in other programs; Mosaic Paint shows it again as the tracing photo
    const g = mk('g', { id: 'mosaic-reference', visibility: 'hidden' }, root);
    const c = im.cloneNode(true) as Element;
    c.removeAttribute('style');
    c.setAttribute('data-opacity', String(state.refOpacity));
    g.appendChild(c);
  }
  const f = mk('g', { id: 'mosaic-fills' }, root);
  for (const c of fillsG.childNodes) f.appendChild(c.cloneNode(true));
  const s = mk('g', { id: 'mosaic-shapes' }, root);
  for (const c of shapesG.childNodes) s.appendChild(c.cloneNode(true));
  let out = '<?xml version="1.0" encoding="UTF-8"?>\n' + new XMLSerializer().serializeToString(root).replace(/></g, '>\n<');
  // modules may add to the file (pages adds the other pages); opts.pageOnly: just this page
  for (const fn of handlers('serialize')) out = fn(out, opts) || out;
  return out;
}
function sanitize(root: Element): void {
  root.querySelectorAll('script,foreignObject').forEach(n => n.remove());
  for (const n of [root, ...root.querySelectorAll('*')]) {
    for (const a of [...n.attributes]) {
      if (/^on/i.test(a.name) || (/href$/i.test(a.name) && /^\s*javascript:/i.test(a.value))) n.removeAttribute(a.name);
    }
  }
}
/** Straight-line single-part paths become polygons / polylines so their corners can be edited. */
function convertLinearPaths(): void {
  for (const p of [...shapesG.querySelectorAll('path')]) {
    if (p.closest('defs,clipPath,mask,pattern,symbol,marker') || isFill(p)) continue;
    const polys = linearPath(p.getAttribute('d') || '');
    if (!polys || polys.length !== 1 || polys[0].pts.length < 2) continue;
    const n = document.createElementNS(SVGNS, polys[0].closed ? 'polygon' : 'polyline');
    for (const a of p.attributes) if (a.name !== 'd') n.setAttributeNS(a.namespaceURI, a.name, a.value);
    n.setAttribute('points', ptsStr(polys[0].pts));
    p.replaceWith(n);
  }
}
export interface LoadOptions { restore?: boolean; quiet?: boolean; name?: string }
/** opts.restore: autosave / version (don't import its palette). opts.name: file name for a new palette. */
export function loadSVGText(text: string, opts: LoadOptions = {}): boolean {
  const xml = new DOMParser().parseFromString(text, 'image/svg+xml');
  const root = xml.documentElement;
  if (!root || root.localName !== 'svg' || xml.getElementsByTagName('parsererror').length) {
    if (!opts.quiet) toast(t('Could not read this file as SVG.'));
    return false;
  }
  sanitize(root);
  emit('deserialize', root, opts); // pages reads the other pages here
  const vb = (root.getAttribute('viewBox') || '').trim().split(/[\s,]+/).map(Number);
  const hasVB = vb.length === 4 && vb.every(Number.isFinite) && vb[2] > 0 && vb[3] > 0;
  const box = hasVB ? { x: vb[0], y: vb[1], w: vb[2], h: vb[3] }
    : { x: 0, y: 0, w: parseFloat(root.getAttribute('width')) || 1000, h: parseFloat(root.getAttribute('height')) || 1000 };
  const ours = !!root.querySelector('[id="mosaic-shapes"]');
  // 1 unit = 1 mm / cm / in when the size is given in that unit and matches the viewBox
  const wm = /^\s*([\d.]+)\s*(mm|cm|in)\s*$/.exec(root.getAttribute('width') || '');
  let docUnit = wm && hasVB && Math.abs(+wm[1] - box.w) <= box.w * 1e-6 + 1e-9 ? wm[2] : 'px';
  cancelPending();
  defsG.innerHTML = '';
  fillsG.innerHTML = '';
  shapesG.innerHTML = '';
  let wrap: Element = shapesG, bg: string | null = null, photo: Element | null = null, meta: any = null;
  if (!ours) {
    // keep styling set on the root <svg> (fill, stroke, style…) by moving it to a group
    const keep = [...root.attributes].filter(a => !a.name.includes(':') && !/^(xmlns|viewBox|width|height|version|x|y|id|preserveAspectRatio|baseProfile|enable-background)$/i.test(a.name));
    if (keep.length) {
      wrap = mk('g', {}, shapesG);
      for (const a of keep) wrap.setAttribute(a.name, a.value);
    }
  }
  for (const child of [...root.children]) {
    const id = child.getAttribute('id'), tag = child.localName;
    if (id === 'mosaic-palette') {
      try { meta = JSON.parse(child.textContent); } catch { /* ignore */ }
      continue;
    }
    if (id === 'mosaic-bg') { bg = child.getAttribute('fill'); continue; }
    if (id === 'mosaic-reference') { photo = child.querySelector('image'); continue; }
    if (id === 'mosaic-pages') continue;
    if (['metadata', 'title', 'desc', 'namedview'].includes(tag)) continue;
    if (tag === 'defs' || tag === 'style') { defsG.appendChild(document.importNode(child, true)); continue; }
    if (id === 'mosaic-fills' || id === 'mosaic-shapes') {
      const dest = id === 'mosaic-fills' ? fillsG : shapesG;
      for (const c of [...child.childNodes]) dest.appendChild(document.importNode(c, true));
      continue;
    }
    wrap.appendChild(document.importNode(child, true));
  }
  convertLinearPaths();
  if (Array.isArray(meta)) meta = { palette: meta };
  if (meta && meta.unit) docUnit = meta.unit;
  if (meta && Array.isArray(meta.palette) && !opts.restore) importPalette(meta.palette.map(Colors.norm).filter(Boolean), meta.paletteName || opts.name);
  state.doc = { ...box, bg: ours ? bg : null, unit: docUnit };
  if (photo) {
    const href = photo.getAttribute('href') || photo.getAttributeNS('http://www.w3.org/1999/xlink', 'href');
    setPhoto(href, +photo.getAttribute('data-nw') || 1, +photo.getAttribute('data-nh') || 1);
    const im = refImage();
    for (const k of ['x', 'y', 'width', 'height']) im.setAttribute(k, photo.getAttribute(k));
    const op = parseFloat(photo.getAttribute('data-opacity'));
    if (op >= 0) { state.refOpacity = op; im.style.opacity = String(op); }
    renderPhotoUI();
  } else setPhoto(null);
  state.selection.clear();
  touch();
  applyDoc();
  applyGrout();
  applyLayers();
  resetHistory();
  rt.dirty = false;
  fitView();
  afterChange();
  return true;
}
/** A palette stored in an opened file becomes its own named palette, unless it already exists. */
function importPalette(colors: string[], name?: string): void {
  if (!colors.length) return;
  const same = (a: string[]) => a.length === colors.length && colors.every(c => a.includes(c));
  const existing = Object.keys(state.palettes).find(k => same(state.palettes[k]));
  if (existing) { switchPalette(existing); return; }
  const n = uniqueName((name || t('From file')).replace(/\.svg$/i, ''));
  state.palettes[n] = colors;
  switchPalette(n);
  toast(t('The file’s colors were added as the palette “{name}”.', { name: n }));
}
export function confirmDiscard(): boolean {
  return !rt.dirty || confirm(t('Discard unsaved changes to the current drawing?\n(A copy is kept in History.)'));
}
const SVG_TYPES = [{ description: 'SVG image', accept: { 'image/svg+xml': ['.svg'] } }];
export async function openFile(): Promise<void> {
  if (!confirmDiscard()) return;
  const w = window as any;
  if (w.showOpenFilePicker) {
    try {
      const [h] = await w.showOpenFilePicker({ types: SVG_TYPES });
      const f = await h.getFile();
      if (await openText(await f.text(), f.name)) rt.fileHandle = h;
      return;
    } catch (err) {
      if (err.name === 'AbortError') return;
    }
  }
  $('#file-input').click();
}
/** Opens SVG text as the drawing (the current one is kept in History). */
export async function openText(text: string, name: string): Promise<boolean> {
  if (hasContent()) await saveVersion(t('Before opening {name}', { name }));
  if (!loadSVGText(text, { name })) return false;
  rt.fileHandle = null;
  rt.fileName = name;
  updateTitle();
  scheduleAutosave();
  toast(t('Opened {name}', { name }));
  return true;
}
export async function loadFile(f: File | undefined): Promise<void> {
  if (f) await openText(await f.text(), f.name);
}
export async function save(as: boolean): Promise<void> {
  const text = buildSVGString(), w = window as any;
  if (w.showSaveFilePicker) {
    try {
      if (!rt.fileHandle || as) rt.fileHandle = await w.showSaveFilePicker({ suggestedName: rt.fileName, types: SVG_TYPES });
      const wr = await rt.fileHandle.createWritable();
      await wr.write(text);
      await wr.close();
      rt.fileName = rt.fileHandle.name;
      rt.dirty = false;
      updateTitle();
      scheduleAutosave();
      toast(t('Saved {name}', { name: rt.fileName }));
      return;
    } catch (err) {
      if (err.name === 'AbortError') return;
      rt.fileHandle = null; // fall back to a normal download
    }
  }
  if (as) {
    const n = prompt(t('File name:'), rt.fileName);
    if (!n) return;
    rt.fileName = /\.svg$/i.test(n) ? n : n + '.svg';
  }
  download(new Blob([text], { type: 'image/svg+xml' }), rt.fileName);
  rt.dirty = false;
  updateTitle();
}
export function exportPNG(): void {
  const d = state.doc;
  const def = unit() === 'px' ? Math.max(d.w, 2000) : 3000;
  const ans = prompt(t('PNG width in pixels:'), String(Math.round(def)));
  if (!ans) return;
  const W = Math.round(+ans);
  if (!(W > 0 && W <= 16000)) { toast(t('Invalid width.')); return; }
  const H = Math.max(1, Math.round(W * d.h / d.w));
  const url = URL.createObjectURL(new Blob([buildSVGString({ photo: false, grout: state.grout.on, pageOnly: true })], { type: 'image/svg+xml' }));
  const img = new Image();
  img.onload = () => {
    const c = document.createElement('canvas');
    c.width = W;
    c.height = H;
    c.getContext('2d').drawImage(img, 0, 0, W, H);
    URL.revokeObjectURL(url);
    c.toBlob(b => b ? download(b, rt.fileName.replace(/\.svg$/i, '') + '.png') : toast(t('PNG export failed.')), 'image/png');
  };
  img.onerror = () => { URL.revokeObjectURL(url); toast(t('PNG export failed.')); };
  img.src = url;
}
function resetDoc(keepSize: boolean): void {
  cancelPending();
  defsG.innerHTML = '';
  fillsG.innerHTML = '';
  shapesG.innerHTML = '';
  setPhoto(null);
  const d = state.doc;
  state.doc = keepSize ? { x: 0, y: 0, w: d.w, h: d.h, bg: '#ffffff', unit: unit() } : { x: 0, y: 0, w: 300, h: 300, bg: '#ffffff', unit: 'mm' };
  state.selection.clear();
  rt.fileHandle = null;
  rt.fileName = 'mosaic.svg';
  touch();
  applyDoc();
  applyGrout();
  resetHistory();
  rt.dirty = false;
  emit('reset'); // e.g. back to a single page
  fitView();
  afterChange();
}
export async function newDoc(): Promise<void> {
  if (!confirmDiscard()) return;
  if (hasContent()) await saveVersion(t('Before starting a new drawing'));
  resetDoc(true);
}
/** Removes all lines, shapes and painted areas (the page and photo stay). Does not commit. */
export function clearDrawing(): void {
  cancelPending();
  fillsG.innerHTML = '';
  shapesG.innerHTML = '';
  state.selection.clear();
  touch();
}

export function setMode(m: string): void {
  state.mode = m === 'expert' ? 'expert' : 'simple';
  document.body.dataset.mode = state.mode;
  for (const b of $$('#mode-switch button')) b.classList.toggle('active', b.dataset.mode === state.mode);
  if (EXPERT_TOOLS.has(state.tool) && state.mode !== 'expert') setTool('select');
  savePrefs();
  applyLayers();
  applyDoc();
  updateView();
  emit('mode');
}
