/* Example images (a pixel-art heart, a sunset made into a mosaic) and the newcomers' guide for the raster app. */
import * as R from '../lib/raster.ts';
import * as Ex from '../lib/examples.ts';
import { initExamples } from '../shared/examples-ui.ts';
import { initGuide } from '../shared/guide.ts';
import { t } from '../shared/i18n.ts';
import { confirmDiscard, openCanvas } from './files.ts';
import { addPalette } from './palette.ts';

function toCanvas(img: R.Img): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = img.width;
  c.height = img.height;
  c.getContext('2d').putImageData(new ImageData(img.data, img.width, img.height), 0, 0);
  return c;
}
const sunset = () => R.mosaic(Ex.sunsetImage(), { tile: 8, grout: 1, groutColor: '#e9e4dc', palette: Ex.SUNSET_COLORS, bricks: false }).img;

async function open(img: R.Img, name: string, palette: string, colors: string[]): Promise<void> {
  if (!await confirmDiscard()) return;
  await openCanvas(toCanvas(img), name);
  addPalette(palette, colors);
}

/** The "Examples" dialog and the guide of the raster app. */
export function bindExamples(): void {
  initExamples(document.querySelector('#btn-examples'), [
    {
      id: 'heart', title: t('Pixel heart'), text: t('16 × 16 pixel art – every pixel a tile. Try 3D… or Print.'),
      preview: () => toCanvas(Ex.heartImage()).toDataURL(),
      open: () => open(Ex.heartImage(), t('heart') + '.png', t('Heart'), Ex.HEART_PALETTE),
    },
    {
      id: 'sunset', title: t('Sunset mosaic'), text: t('A picture made into tiles with grout by “Make a mosaic…”. Try Open as vector tiles.'),
      preview: () => toCanvas(sunset()).toDataURL(),
      open: () => open(sunset(), t('sunset') + '.png', t('Sunset'), [...Ex.SUNSET_COLORS, '#e9e4dc']),
    },
  ]);
  initGuide(document.querySelector('#btn-guide'), [
    { title: t('Welcome to Mosaic Paint Raster'), text: t('Paint with pixels: pixel art, or a photo turned into a mosaic. Each pixel can become a tile.') },
    { title: t('Paint'), text: t('The tools are on the left: pencil, brush, bucket, lines, shapes and selection.'), target: '#tools' },
    { title: t('Colors'), text: t('Pick a color in the palette. Palettes are shared with the vector app.'), target: '#palette' },
    { title: t('Make a mosaic'), text: t('Open a photo, then “Make a mosaic…” turns it into tiles with grout in your palette’s colors.'), target: '#btn-mosaic' },
    { title: t('Start from an example'), text: t('Not sure where to begin? Open an example. The ? button shows this guide again.'), target: '#btn-examples' },
  ], 'mz-guide-raster',
  // the lessons (learn.html) – a page of their own; not inside Discord, which serves only the editor
  location.hostname.endsWith('discordsays.com') ? undefined : { text: t('Lessons: learn every tool step by step →'), href: 'learn.html' });
}
