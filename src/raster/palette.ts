/* The shared palette panel, wired to the pixels: how many pixels use each color, recoloring them,
   and taking the colors from the image. */
import * as Colors from '../lib/colors.ts';
import * as R from '../lib/raster.ts';
import { kmeans } from '../lib/automosaic.ts';
import { createPaletteUI } from '../shared/palette-ui.ts';
import { state, savePrefs, on } from './state.ts';
import { getImage, dctx } from './canvas.ts';
import { commit } from './history.ts';
import { t } from '../shared/i18n.ts';

// counting means reading every pixel: only redo it when the image or the palette changed
let counts: Map<string, number> | null = null, countsKey = '';
on('change', () => { counts = null; });
function colorCounts(): Map<string, number> {
  const key = state.palette.join();
  if (!counts || key !== countsKey) { counts = R.paletteCounts(getImage(), state.palette); countsKey = key; }
  return counts;
}
/** n colors that represent the image (k-means in Lab), for photos with too many colors to list. */
export function suggestColors(img: ImageData, n: number): string[] {
  const labs = R.samplePixels(img, 5000).map(Colors.toLab);
  return labs.length ? [...new Set(kmeans(labs, n, 7).map(Colors.fromLab))] : [];
}

const ui = createPaletteUI({
  state,
  save: savePrefs,
  counts: colorCounts,
  usage: (n) => t('{n} {n|pixel|pixels}', { n }),
  names: { fill: t('paint color'), stroke: t('outline color'), none: t('Transparent – paints and fills transparent pixels') },
  docColors() {
    const img = getImage();
    // a drawing has few colors: take them all; a photo has thousands: suggest 16
    return R.uniqueColors(img, 64) || suggestColors(img, 16);
  },
  recolor(old, c) {
    const img = getImage(), n = R.replaceColor(img, old, R.rgba(c));
    if (!n) return null;
    dctx.putImageData(img, 0, 0);
    commit();
    return t('Recolored {n} {n|pixel|pixels}.', { n });
  },
});
export const {
  addPalette, addColors, setFill, setStroke, pasteColors, render: renderPalette, renderSelect: renderPaletteSelect, bind: bindPalette,
} = ui;
on('change', () => renderPalette());
