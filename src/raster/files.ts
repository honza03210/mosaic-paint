/* Files: new image, open (PNG, JPEG, WebP, GIF, SVG…), save as PNG, export JPEG / WebP, resizing. */
import * as R from '../lib/raster.ts';
import { $, toast, download, loadImg } from '../shared/ui.ts';
import { canvasToPng, svgToCanvas, svgSize } from '../shared/clipboard.ts';
import { state, rt } from './state.ts';
import { doc, dctx, makeCanvas, fitView, flat, mapLayers, makeLayer, setLayers, layers } from './canvas.ts';
import { Store, type Version } from '../lib/store.ts';
import { commit, resetHistory, afterChange, updateTitle, saveVersion, scheduleAutosave } from './history.ts';
import { selectionChanged, pasteImage } from './select.ts';
import { t, lang } from '../shared/i18n.ts';
import { ask, askYes } from '../shared/dialogs.ts';
import { exportOra, openOra } from './layers.ts';
import { isMotion, chooseFrame } from '../shared/frames.ts';

export const MAX_SIDE = 8000;
const IMAGE_TYPES = [{ description: t('Images'), accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.bmp', '.svg'] } }];
const PNG_TYPES = [{ description: t('PNG image'), accept: { 'image/png': ['.png'] } }];
const baseName = (n: string) => n.replace(/\.[a-z0-9]+$/i, '');

export async function confirmDiscard(): Promise<boolean> {
  return !rt.dirty || askYes(t('Discard unsaved changes to the current image?\n(Save it first if you want to keep it.)'));
}
/** Replaces the image with a canvas (opened file, new image) and starts a fresh undo history. */
export function loadCanvas(c: HTMLCanvasElement, name: string): void {
  // one layer with the picture
  setLayers([makeLayer(c.width, c.height, t('Layer {n}', { n: 1 }))], 0);
  dctx.drawImage(c, 0, 0);
  state.sel = null;
  state.floating = null;
  rt.fileName = baseName(name) + '.png';
  rt.fileHandle = null;
  resetHistory();
  rt.dirty = false;
  afterChange();
  selectionChanged();
  fitView();
}
/** Any image file → canvas (SVG is rendered at its own size, at least 512 px). */
export async function fileToCanvas(f: Blob): Promise<HTMLCanvasElement | null> {
  try {
    if (/svg/.test(f.type)) {
      const text = await f.text(), { w, h } = svgSize(text);
      return await svgToCanvas(text, Math.min(MAX_SIDE, Math.max(512, Math.round(Math.max(w, h)))));
    }
    const url = URL.createObjectURL(f);
    try {
      const img = await loadImg(url);
      const k = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
      const c = makeCanvas(Math.round(img.naturalWidth * k), Math.round(img.naturalHeight * k));
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      return c;
    } finally { URL.revokeObjectURL(url); }
  } catch { return null; }
}
/** Images bigger than this (px a side) are slow to paint on: opening one offers to scale it to FIT. */
export const BIG = 2000, FIT = 1600;
/** A picture with more colors than this is a photo: opening one suggests reducing it. */
const MANY_COLORS = 256;
/** The picture scaled by k (smoothly). */
function scaled(c: HTMLCanvasElement, k: number): HTMLCanvasElement {
  const out = makeCanvas(Math.max(1, Math.round(c.width * k)), Math.max(1, Math.round(c.height * k))), x = out.getContext('2d');
  x.imageSmoothingQuality = 'high';
  x.drawImage(c, 0, 0, out.width, out.height);
  return out;
}
/** Opens a picture file; a GIF or a video opens as the frame the user chooses (src: where a video can also be
    loaded from, when the page may not play it from memory – inside Discord). */
export async function openImageFile(f: File, o: { src?: string } = {}): Promise<boolean> {
  // an OpenRaster file: its layers
  if (/\.ora$/i.test(f.name) || f.type === 'image/openraster') return openOra(f, f.name);
  let c = isMotion(f, f.name) ? await chooseFrame(f, f.name, o) : await fileToCanvas(f);
  if (!c && isMotion(f, f.name)) return false;
  if (!c) { toast(t('Could not read {name} as an image.', { name: f.name })); return false; }
  const side = Math.max(c.width, c.height);
  if (side > BIG) {
    const k = FIT / side, v = { name: f.name, w: c.width, h: c.height, W: Math.round(c.width * k), H: Math.round(c.height * k) };
    if (await askYes(t('{name} is {w} × {h} px – painting on it and making mosaics will be slow. Scale it down to {W} × {H} px?', v))) c = scaled(c, k);
  }
  const img = c.getContext('2d').getImageData(0, 0, c.width, c.height);
  const many = R.countColors(img, MANY_COLORS + 1) > MANY_COLORS;
  await openCanvas(c, f.name, many ? t('It has many colors: “Reduce to palette” or “Make a mosaic…” turn them into a few you can buy tiles in.') : '');
  return true;
}
/** Opens a picture as the image (the current one is kept in History). */
export async function openCanvas(c: HTMLCanvasElement, name: string, note = ''): Promise<void> {
  // the current image is copied right away (toBlob takes it as it is now); storing it can finish later
  saveVersion(t('Before opening {name}', { name }));
  loadCanvas(c, name);
  scheduleAutosave();
  toast(t('Opened {name} ({w} × {h} px).', { name, w: c.width, h: c.height }) + (note ? ' ' + note : ''));
}
/**
 * Import: a picture from a file goes into the image (not instead of it) – floating, to be dragged into place, on
 * the active layer; bigger than the image, it is scaled down to fit (floating pixels can't be resized). A GIF or
 * a video: the chosen frame.
 */
export async function importImageFile(f: File): Promise<boolean> {
  const c = isMotion(f, f.name) ? await chooseFrame(f, f.name) : await fileToCanvas(f);
  if (!c) { if (!isMotion(f, f.name)) toast(t('Could not read {name} as an image.', { name: f.name })); return false; }
  const k = Math.min(1, doc.width / c.width, doc.height / c.height);
  await pasteImage(k < 1 ? scaled(c, k) : c);
  return true;
}
export async function openFile(): Promise<void> {
  if (!await confirmDiscard()) return;
  const w = window as any;
  if (w.showOpenFilePicker) {
    try {
      const [h] = await w.showOpenFilePicker({ types: IMAGE_TYPES });
      const f = await h.getFile();
      if (await openImageFile(f) && /\.png$/i.test(f.name)) { rt.fileHandle = h; updateTitle(); }
      return;
    } catch (err) {
      if (err.name === 'AbortError') return;
    }
  }
  $('#file-input').click();
}
/** Parses "800 x 600", "800×600", "800, 600". */
export function parseSize(s: string): { w: number; h: number } | null {
  const m = /^\s*(\d+)\s*[x×*, ]\s*(\d+)\s*$/i.exec(s || '');
  if (!m) return null;
  const w = +m[1], h = +m[2];
  return w >= 1 && h >= 1 && w <= MAX_SIDE && h <= MAX_SIDE ? { w, h } : null;
}
export async function newImage(): Promise<void> {
  if (!await confirmDiscard()) return;
  const ans = await ask(t('Size of the new image in pixels (width × height):'), `${doc.width} × ${doc.height}`);
  if (ans == null) return;
  const s = parseSize(ans);
  if (!s) { toast(t('Enter a size like 800 × 600 (at most {max} px a side).', { max: MAX_SIDE })); return; }
  const c = makeCanvas(s.w, s.h), x = c.getContext('2d');
  x.fillStyle = '#ffffff';
  x.fillRect(0, 0, s.w, s.h);
  saveVersion(t('Before starting a new image')).then(() => { loadCanvas(c, 'mosaic.png'); scheduleAutosave(); });
}
/** The versions of the raster app, newest first. */
export const listVersions = () => Store.listVersions('raster');
export async function restoreVersion(v: Version): Promise<void> {
  const c = v.png && await fileToCanvas(new Blob([v.png], { type: 'image/png' }));
  if (!c) { toast(t('That version could not be read.')); return; }
  await saveVersion(t('Before restoring an older version'));
  loadCanvas(c, v.name || 'mosaic.png');
  rt.dirty = true;
  updateTitle();
  scheduleAutosave();
  toast(t('Restored the version from {time}', { time: new Date(v.time).toLocaleString(lang) }));
}
export async function save(): Promise<void> {
  // a PNG is the picture as it looks; the layers are kept in an .ora file (Export…)
  if (layers.length > 1) toast(t('Saved as one picture – Save layers (.ora) in the Layers section keeps the layers.'));
  const png = await canvasToPng(flat()), w = window as any;
  if (w.showSaveFilePicker) {
    try {
      if (!rt.fileHandle) rt.fileHandle = await w.showSaveFilePicker({ suggestedName: rt.fileName, types: PNG_TYPES });
      const wr = await rt.fileHandle.createWritable();
      await wr.write(png);
      await wr.close();
      rt.fileName = rt.fileHandle.name;
      rt.dirty = false;
      updateTitle();
      toast(t('Saved {name}', { name: rt.fileName }));
      return;
    } catch (err) {
      if (err.name === 'AbortError') return;
      rt.fileHandle = null; // fall back to a normal download
    }
  }
  download(png, rt.fileName);
  rt.dirty = false;
  updateTitle();
}
/** JPEG / WebP / PNG download. JPEG has no transparency, so it gets a white background. */
export function exportAs(type: string, quality: number): void {
  if (type === 'ora') { exportOra(); return; }
  let c = flat();
  if (type === 'image/jpeg') {
    const f = c;
    c = makeCanvas(doc.width, doc.height);
    const x = c.getContext('2d');
    x.fillStyle = '#ffffff';
    x.fillRect(0, 0, c.width, c.height);
    x.drawImage(f, 0, 0);
  }
  const ext = { 'image/jpeg': '.jpg', 'image/webp': '.webp', 'image/png': '.png' }[type] || '.png';
  c.toBlob(b => (b ? download(b, baseName(rt.fileName) + ext) : toast(t('Export failed.'))), type, quality);
}

/** Scales the picture to w × h (smooth when shrinking, sharp pixels when enlarging). */
export function resizeImage(w: number, h: number): void {
  if (w === doc.width && h === doc.height) return;
  const shrink = w < doc.width || h < doc.height;
  mapLayers((old) => {
    const c = makeCanvas(w, h), x = c.getContext('2d');
    x.imageSmoothingEnabled = shrink;
    x.imageSmoothingQuality = 'high';
    x.drawImage(old, 0, 0, w, h);
    return c;
  });
  state.sel = null;
  commit();
  selectionChanged();
  fitView();
}
/** Changes the canvas to w × h, keeping the picture centered (new space is transparent). */
export function canvasSize(w: number, h: number): void {
  if (w === doc.width && h === doc.height) return;
  mapLayers((old) => {
    const c = makeCanvas(w, h);
    c.getContext('2d').drawImage(old, Math.round((w - old.width) / 2), Math.round((h - old.height) / 2));
    return c;
  });
  state.sel = null;
  commit();
  selectionChanged();
  fitView();
}
