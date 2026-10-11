/* Files: new image, open (PNG, JPEG, WebP, GIF, SVG…), save as PNG, export JPEG / WebP, resizing. */
import { $, toast, download, loadImg } from '../shared/ui.ts';
import { canvasToPng, svgToCanvas, svgSize } from '../shared/clipboard.ts';
import { state, rt } from './state.ts';
import { doc, dctx, makeCanvas, setSize, fitView } from './canvas.ts';
import { commit, resetHistory, afterChange, updateTitle } from './history.ts';
import { selectionChanged } from './select.ts';

export const MAX_SIDE = 8000;
const IMAGE_TYPES = [{ description: 'Images', accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.bmp', '.svg'] } }];
const PNG_TYPES = [{ description: 'PNG image', accept: { 'image/png': ['.png'] } }];
const baseName = (n: string) => n.replace(/\.[a-z0-9]+$/i, '');

export function confirmDiscard(): boolean {
  return !rt.dirty || confirm('Discard unsaved changes to the current image?\n(Save it first if you want to keep it.)');
}
/** Replaces the image with a canvas (opened file, new image) and starts a fresh undo history. */
export function loadCanvas(c: HTMLCanvasElement, name: string): void {
  setSize(c.width, c.height);
  dctx.clearRect(0, 0, c.width, c.height);
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
export async function openImageFile(f: File): Promise<boolean> {
  const c = await fileToCanvas(f);
  if (!c) { toast('Could not read ' + f.name + ' as an image.'); return false; }
  loadCanvas(c, f.name);
  toast(`Opened ${f.name} (${c.width} × ${c.height} px).`);
  return true;
}
export async function openFile(): Promise<void> {
  if (!confirmDiscard()) return;
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
export function newImage(): void {
  if (!confirmDiscard()) return;
  const ans = prompt('Size of the new image in pixels (width × height):', `${doc.width} × ${doc.height}`);
  if (ans == null) return;
  const s = parseSize(ans);
  if (!s) { toast(`Enter a size like 800 × 600 (at most ${MAX_SIDE} px a side).`); return; }
  const c = makeCanvas(s.w, s.h), x = c.getContext('2d');
  x.fillStyle = '#ffffff';
  x.fillRect(0, 0, s.w, s.h);
  loadCanvas(c, 'mosaic.png');
}
export async function save(): Promise<void> {
  const png = await canvasToPng(doc), w = window as any;
  if (w.showSaveFilePicker) {
    try {
      if (!rt.fileHandle) rt.fileHandle = await w.showSaveFilePicker({ suggestedName: rt.fileName, types: PNG_TYPES });
      const wr = await rt.fileHandle.createWritable();
      await wr.write(png);
      await wr.close();
      rt.fileName = rt.fileHandle.name;
      rt.dirty = false;
      updateTitle();
      toast('Saved ' + rt.fileName);
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
  let c = doc;
  if (type === 'image/jpeg') {
    c = makeCanvas(doc.width, doc.height);
    const x = c.getContext('2d');
    x.fillStyle = '#ffffff';
    x.fillRect(0, 0, c.width, c.height);
    x.drawImage(doc, 0, 0);
  }
  const ext = { 'image/jpeg': '.jpg', 'image/webp': '.webp', 'image/png': '.png' }[type] || '.png';
  c.toBlob(b => (b ? download(b, baseName(rt.fileName) + ext) : toast('Export failed.')), type, quality);
}

/** Scales the picture to w × h (smooth when shrinking, sharp pixels when enlarging). */
export function resizeImage(w: number, h: number): void {
  if (w === doc.width && h === doc.height) return;
  const old = makeCanvas(doc.width, doc.height);
  old.getContext('2d').drawImage(doc, 0, 0);
  const shrink = w < old.width || h < old.height;
  setSize(w, h);
  dctx.save();
  dctx.imageSmoothingEnabled = shrink;
  dctx.imageSmoothingQuality = 'high';
  dctx.drawImage(old, 0, 0, w, h);
  dctx.restore();
  state.sel = null;
  commit();
  selectionChanged();
  fitView();
}
/** Changes the canvas to w × h, keeping the picture centered (new space is transparent). */
export function canvasSize(w: number, h: number): void {
  if (w === doc.width && h === doc.height) return;
  const old = makeCanvas(doc.width, doc.height);
  old.getContext('2d').drawImage(doc, 0, 0);
  setSize(w, h);
  dctx.clearRect(0, 0, w, h);
  dctx.drawImage(old, Math.round((w - old.width) / 2), Math.round((h - old.height) / 2));
  state.sel = null;
  commit();
  selectionChanged();
  fitView();
}
