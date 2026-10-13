/* 3D print export for the raster app: the image's colors become color bands; transparent pixels
   stay the base. Pictures with many colors (photos) are snapped to the palette. */
import * as R from '../lib/raster.ts';
import { $ } from '../shared/ui.ts';
import { initExport3D } from '../shared/export3d.ts';
import { state, rt } from './state.ts';
import { doc, flatImage as getImage, flat, makeCanvas } from './canvas.ts';
import { suggestColors } from './palette.ts';
import { t } from '../shared/i18n.ts';

const MAX_COLORS = 24;

export function bindExport3D(): void {
  initExport3D({
    aspect: () => doc.width / doc.height,
    realSize: () => ({ w: state.realWidth, h: state.realWidth * doc.height / doc.width }),
    async render(w, h) {
      const c = makeCanvas(w, h), x = c.getContext('2d');
      // enlarging keeps pixels sharp (pixel mosaics); shrinking averages
      x.imageSmoothingEnabled = w < doc.width;
      x.drawImage(flat(), 0, 0, w, h);
      return c;
    },
    colors() {
      const img = getImage(), own = R.uniqueColors(img, MAX_COLORS);
      // the grout of a mosaic made here stays the lowest part
      const grout = (list: string[]) => (list.includes(state.mosaic.groutColor) ? [state.mosaic.groutColor] : []);
      if (own) return { colors: own, lines: grout(own) };
      if (state.palette.length) return { colors: [...state.palette], lines: grout(state.palette), note: t('The picture has many colors: it is snapped to the current palette (use “Reduce to palette” to see the result first).') };
      return { colors: suggestColors(img, 8), note: t('The picture has many colors: it is snapped to 8 colors suggested from it.') };
    },
    fileName: () => rt.fileName,
  }, $('#btn-3d'));
}
