/* Mosaic Paint – reading the tracing photo: average colors, how much detail an area has,
   palette suggestions, and coloring tiles from it. Uses the editor core (window.MZ). */
import { MZ } from '../core/api.ts';
import * as Colors from '../lib/colors.ts';
import * as Photo from '../lib/photo.ts';
import { t } from '../shared/i18n.ts';

export const PhotoTools = (() => {
  /** The photo's pixels (at most 1200 px a side) and where it lies in the drawing. */
  async function photoPixels(): Promise<Photo.PhotoPixels | null> {
    const im = MZ.refImage();
    if (!im) return null;
    let img;
    try { img = await MZ.loadImg(im.getAttribute('href')); } catch { return null; }
    const k = Math.min(1, 1200 / Math.max(img.naturalWidth, img.naturalHeight));
    const W = Math.max(1, Math.round(img.naturalWidth * k)), H = Math.max(1, Math.round(img.naturalHeight * k));
    const cv = document.createElement('canvas');
    cv.width = W;
    cv.height = H;
    const cx = cv.getContext('2d', { willReadFrequently: true });
    cx.drawImage(img, 0, 0, W, H);
    const data = cx.getImageData(0, 0, W, H).data;
    const box = { x: +im.getAttribute('x'), y: +im.getAttribute('y'), w: +im.getAttribute('width'), h: +im.getAttribute('height') };
    return { data, W, H, box };
  }
  /** The photo's pixels in drawing coordinates: at(p) → [r, g, b] or null outside the photo. */
  async function pixels() {
    const p = await photoPixels();
    return p && { at: Photo.sampler(p), box: p.box };
  }

  function average(px, pts) {
    let r = 0, g = 0, b = 0, n = 0;
    for (const p of pts) {
      const c = px.at(p);
      if (!c) continue;
      r += c[0]; g += c[1]; b += c[2]; n++;
    }
    return n ? [r / n, g / n, b / n] : null;
  }

  /** How much the photo's color varies inside a rectangle (average Lab distance from its mean). */
  const detailAt = (px, x, y, w, h) => Photo.detailAt(px.at, x, y, w, h);
  /** n colors that represent the photo inside box (k-means in Lab), most common first. */
  const suggestPalette = (px, box, n) => Photo.suggestPalette(px.at, box, n);

  /**
   * Gives every closed area the palette color closest to the photo underneath it.
   * Returns { painted, skipped, outside }. commit: false leaves committing to the caller.
   */
  async function colorTiles({ onlyUnpainted = true, commit = true, quiet = false } = {}) {
    const px = await pixels();
    if (!px) { MZ.toast(t('Load a photo first (Photo section).')); return null; }
    const pal = MZ.state.palette;
    if (!pal.length) { MZ.toast(t('The palette is empty – add colors first.')); return null; }
    const labs = pal.map(c => Colors.toLab(Colors.toRgb(c)));
    const ctx = { ix: MZ.regionIndex() };
    let painted = 0, skipped = 0, outside = 0;
    for (const f of ctx.ix.faces) {
      const reg = ctx.ix.region(f);
      const pts = MZ.gridSample(reg.bb, p => MZ.insideRegion(reg, p), 40);
      if (!pts.length) continue;
      if (onlyUnpainted && MZ.isPaintedAt(pts[0])) { skipped++; continue; }
      const rgb = average(px, pts);
      if (!rgb) { outside++; continue; }
      if (MZ.bucketAt(pts[0], Colors.nearest(rgb as Colors.RGB, pal, labs), ctx, f).changed) painted++;
    }
    if (commit && painted) MZ.commit(true);
    if (!quiet) {
      MZ.toast(t('Colored {n} {n|area|areas} with the closest palette colors', { n: painted })
        + (skipped ? ' · ' + t('{n} already painted (left as they were)', { n: skipped }) : '')
        + (outside ? ' · ' + t('{n} outside the photo', { n: outside }) : '') + '.');
    }
    return { painted, skipped, outside };
  }

  return { photoPixels, pixels, average, detailAt, suggestPalette, colorTiles };
})();
