/* The tracing photo shown under the drawing. */
import type { Pt } from '../lib/geometry.ts';
import { $, state, refG, mk, fmt, toast } from './env.ts';
import { readAsDataURL, loadImg } from '../shared/ui.ts';
export { readAsDataURL, loadImg };
import { applyLayers } from './view.ts';
import { savePrefs } from './palette.ts';
import { docChanged } from './history.ts';
import { t } from '../shared/i18n.ts';
import { askYes } from '../shared/dialogs.ts';

export const refImage = (): SVGImageElement | null => refG.querySelector('image');
export function inRef(p: Pt): boolean {
  const im = refImage();
  if (!im) return false;
  const x = +im.getAttribute('x'), y = +im.getAttribute('y'), w = +im.getAttribute('width'), h = +im.getAttribute('height');
  return p.x >= x && p.x <= x + w && p.y >= y && p.y <= y + h;
}
export async function loadPhoto(file: Blob): Promise<void> {
  let img: HTMLImageElement;
  try { img = await loadImg(await readAsDataURL(file)); } catch { toast(t('Could not read that image.')); return; }
  // keep the saved file reasonably small
  const k = Math.min(1, 2400 / Math.max(img.naturalWidth, img.naturalHeight));
  const c = document.createElement('canvas');
  c.width = Math.round(img.naturalWidth * k);
  c.height = Math.round(img.naturalHeight * k);
  c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
  setPhoto(c.toDataURL('image/jpeg', 0.88), c.width, c.height);
  fitPhoto();
  state.layers.ref.visible = true;
  state.layers.ref.locked = true;
  applyLayers();
  savePrefs();
  docChanged();
  toast(t('Photo loaded and locked. Unlock it to move it with the Select tool.'));
}
/** A pasted image becomes the photo to trace (after asking, if there already is one). */
export async function pastePhoto(file: Blob): Promise<void> {
  if (refImage() && !await askYes(t('Replace the photo to trace with the pasted image?'))) return;
  await loadPhoto(file);
  if (refImage()) toast(t('The pasted image is now the photo to trace – “Make a mosaic from the photo” turns it into tiles.'));
}
export function setPhoto(href: string | null, nw?: number, nh?: number): void {
  refG.innerHTML = '';
  if (!href) { renderPhotoUI(); return; }
  const im = mk('image', { href, preserveAspectRatio: 'none', 'data-nw': nw, 'data-nh': nh, x: 0, y: 0, width: nw, height: nh }, refG);
  im.style.opacity = state.refOpacity;
  renderPhotoUI();
}
function fitScale(): number {
  const im = refImage(), d = state.doc;
  return Math.min(d.w / +im.dataset.nw, d.h / +im.dataset.nh);
}
export function fitPhoto(): void {
  const im = refImage();
  if (!im) return;
  const d = state.doc, s = fitScale(), w = +im.dataset.nw * s, h = +im.dataset.nh * s;
  im.setAttribute('x', fmt(d.x + (d.w - w) / 2)); im.setAttribute('y', fmt(d.y + (d.h - h) / 2));
  im.setAttribute('width', fmt(w)); im.setAttribute('height', fmt(h));
  renderPhotoUI();
}
export function setPhotoSize(pct: number): void {
  const im = refImage();
  if (!im) return;
  const x = +im.getAttribute('x'), y = +im.getAttribute('y'), w0 = +im.getAttribute('width'), h0 = +im.getAttribute('height');
  const s = fitScale() * pct / 100, w = +im.dataset.nw * s, h = +im.dataset.nh * s;
  im.setAttribute('x', fmt(x + (w0 - w) / 2)); im.setAttribute('y', fmt(y + (h0 - h) / 2));
  im.setAttribute('width', fmt(w)); im.setAttribute('height', fmt(h));
  docChanged();
}
export function renderPhotoUI(): void {
  const im = refImage();
  $('#ref-controls').hidden = !im;
  $('#btn-ref-load').textContent = im ? t('Replace photo…') : t('Load photo…');
  if (im) $('#ref-size').value = Math.round(+im.getAttribute('width') / (+im.dataset.nw * fitScale()) * 100);
  $('#ref-opacity').value = Math.round(state.refOpacity * 100);
}
