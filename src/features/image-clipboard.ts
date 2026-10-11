/* Mosaic Paint – images on the clipboard: the drawing (or the selected shapes) is copied as a PNG, so it
   can be pasted into the raster app or any other program. Pasting an image makes it the photo to trace
   (in core/input.ts); copied shapes keep pasting as shapes (features/motifs.ts). */
import { MZ } from '../core/api.ts';
import { canCopyImages, copyImage, svgToPng } from '../shared/clipboard.ts';
import { $, clamp } from '../shared/ui.ts';
import { copySelection } from './motifs.ts';
import { t } from '../shared/i18n.ts';

const { state } = MZ;

/** Pixel size for a copied image: about as sharp as on screen, at least 1024 and at most 4096 px. */
export function imageSize(w: number, h: number): number {
  return Math.round(clamp(Math.max(w, h) * state.view.s * (window.devicePixelRatio || 1), 1024, 4096));
}
/** The whole page as a PNG on the clipboard (with the grout preview, without the tracing photo). */
export async function copyDrawing(): Promise<void> {
  if (!canCopyImages()) { MZ.toast(t('This browser can’t copy images – use PNG to save one instead.')); return; }
  const svg = MZ.buildSVGString({ photo: false, grout: state.grout.on, pageOnly: true });
  const ok = await copyImage(svgToPng(svg, imageSize(state.doc.w, state.doc.h)));
  MZ.toast(ok ? t('Copied the drawing as an image – paste it into the raster app or any other program.') : t('Could not copy the image (the browser refused).'));
}

$('#btn-copy-img').onclick = () => { if (state.selection.size) copySelection(false, false); else copyDrawing(); };
// Ctrl+C with nothing selected copies the whole drawing (with a selection, motifs.ts copies the shapes)
document.addEventListener('keydown', (e) => {
  if (!(e.ctrlKey || e.metaKey) || e.shiftKey || e.altKey || e.key.toLowerCase() !== 'c') return;
  if (MZ.typingIn(e.target) || state.selection.size || document.querySelector('dialog[open]')) return;
  if (window.getSelection && String(window.getSelection())) return; // the user is copying text from the page
  e.preventDefault();
  copyDrawing();
});
