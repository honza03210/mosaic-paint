/* Mosaic Paint – 3D print export for the vector app: the page at its real size, painted areas and
   lines (in their colors, or the grout preview's) as color bands; the page background stays the base.
   Lines are printed first, so the grout is the lowest band and the tiles stand out of it. */
import { MZ } from '../core/api.ts';
import * as Colors from '../lib/colors.ts';
import * as Printing from '../lib/print.ts';
import { svgToCanvas } from '../shared/clipboard.ts';
import { initExport3D } from '../shared/export3d.ts';

const { state } = MZ;

initExport3D({
  aspect: () => state.doc.w / state.doc.h,
  realSize() {
    const k = Printing.MM[MZ.unit()] || Printing.MM.px;
    return { w: state.doc.w * k, h: state.doc.h * k };
  },
  async render(w, h) {
    // without the page background: unpainted parts are left to the base plate
    const svg = MZ.buildSVGString({ photo: false, grout: state.grout.on, pageOnly: true }).replace(/<rect id="mosaic-bg"[^>]*\/>/, '');
    const pic = await svgToCanvas(svg, Math.max(w, h));
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    c.getContext('2d').drawImage(pic, 0, 0, w, h);
    return c;
  },
  colors() {
    const fills = new Set<string>(), strokes = new Set<string>();
    for (const el of MZ.allShapes()) {
      const f = MZ.fillOf(el);
      if (f) fills.add(f);
      if (!MZ.isFill(el)) {
        const cs = getComputedStyle(el), s = Colors.norm(cs.stroke);
        if (s && parseFloat(cs.strokeWidth) > 0) strokes.add(s);
      }
    }
    // a line color that is also a tile color counts as a tile color
    const lines = [...strokes].filter(c => !fills.has(c));
    return { colors: [...fills, ...lines], lines };
  },
  fileName: () => MZ.fileName,
}, document.querySelector('#btn-3d'));
