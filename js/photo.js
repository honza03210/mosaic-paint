/* Mosaic Paint – reading the tracing photo: average colors, how much detail an area has,
   palette suggestions, and coloring tiles from it. Uses the editor core (window.MZ). */
'use strict';

const PhotoTools = (() => {
  /** The photo's pixels in drawing coordinates: at(p) → [r, g, b] or null outside the photo. */
  async function pixels() {
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
    const at = (p) => {
      const u = Math.floor((p.x - box.x) / box.w * W), v = Math.floor((p.y - box.y) / box.h * H);
      if (u < 0 || v < 0 || u >= W || v >= H) return null;
      const i = (v * W + u) * 4;
      return data[i + 3] < 20 ? null : [data[i], data[i + 1], data[i + 2]];
    };
    return { at, box };
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
  function detailAt(px, x, y, w, h) {
    const labs = [];
    for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) {
      const c = px.at({ x: x + w * (i + 0.5) / 5, y: y + h * (j + 0.5) / 5 });
      if (c) labs.push(Colors.toLab(c));
    }
    if (labs.length < 2) return 0;
    const m = [0, 1, 2].map(k => labs.reduce((s, l) => s + l[k], 0) / labs.length);
    return labs.reduce((s, l) => s + Math.hypot(l[0] - m[0], l[1] - m[1], l[2] - m[2]), 0) / labs.length;
  }

  /** n colors that represent the photo inside box (k-means in Lab), most common first. */
  function suggestPalette(px, box, n) {
    const labs = [];
    for (let i = 0; i < 70; i++) for (let j = 0; j < 70; j++) {
      const c = px.at({ x: box.x + box.w * (i + 0.5) / 70, y: box.y + box.h * (j + 0.5) / 70 });
      if (c) labs.push(Colors.toLab(c));
    }
    return [...new Set(AutoMosaic.kmeans(labs, n, 7).map(Colors.fromLab))];
  }

  /**
   * Gives every closed area the palette color closest to the photo underneath it.
   * Returns { painted, skipped, outside }. commit: false leaves committing to the caller.
   */
  async function colorTiles({ onlyUnpainted = true, commit = true, quiet = false } = {}) {
    const px = await pixels();
    if (!px) { MZ.toast('Load a photo first (Photo section).'); return null; }
    const pal = MZ.state.palette;
    if (!pal.length) { MZ.toast('The palette is empty – add colors first.'); return null; }
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
      if (MZ.bucketAt(pts[0], Colors.nearest(rgb, pal, labs), ctx, f).changed) painted++;
    }
    if (commit && painted) MZ.commit(true);
    if (!quiet) {
      MZ.toast(`Colored ${painted} area${painted === 1 ? '' : 's'} with the closest palette colors`
        + (skipped ? ` · ${skipped} already painted (left as they were)` : '')
        + (outside ? ` · ${outside} outside the photo` : '') + '.');
    }
    return { painted, skipped, outside };
  }

  return { pixels, average, detailAt, suggestPalette, colorTiles };
})();
