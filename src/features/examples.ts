/* Mosaic Paint – example drawings (a coaster, a sign) and the newcomers' guide for the vector app. */
import { MZ } from '../core/api.ts';
import * as Ex from '../lib/examples.ts';
import { initExamples } from '../shared/examples-ui.ts';
import { initGuide } from '../shared/guide.ts';
import { t } from '../shared/i18n.ts';

const svgUrl = (svg: string) => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
async function open(svg: string, name: string): Promise<void> {
  if (!MZ.confirmDiscard()) return;
  await MZ.openText(svg, name);
}
const coaster = () => Ex.coasterSvg(t('Coaster'));
// the sign says "HOME" in the page's language (in letters the sign font has)
const sign = () => Ex.signSvg(t('HOME'), t('Sign'));

initExamples(document.querySelector('#btn-examples'), [
  {
    id: 'coaster', title: t('Coaster'), text: t('100 × 100 mm, square tiles in rings of color – try 3D… with rounded corners.'),
    preview: () => svgUrl(coaster()), open: () => open(coaster(), t('coaster') + '.svg'),
  },
  {
    id: 'sign', title: t('Sign'), text: t('A word in tiles with a border – try Report for a shopping list.'),
    preview: () => svgUrl(sign()), open: () => open(sign(), t('sign') + '.svg'),
  },
]);

initGuide(document.querySelector('#btn-guide'), [
  { title: t('Welcome to Mosaic Paint'), text: t('Design a mosaic: draw lines or lay a tile pattern, then paint the tiles. Everything is measured in real millimetres.') },
  { title: t('Draw'), text: t('The tools are on the left: lines and shapes, the tile pattern, and the paint bucket that fills a tile with one click.'), target: '#tools' },
  { title: t('Colors'), text: t('Pick a color in the palette, then click tiles with the bucket. Palettes are shared with the raster app.'), target: '#palette' },
  { title: t('When it is done'), text: t('Report gives a shopping list, 3D… a model to print, Share a link. Expert mode adds printing at real size and laying plans.'), target: '#btn-report' },
  { title: t('Start from an example'), text: t('Not sure where to begin? Open an example. The ? button shows this guide again.'), target: '#btn-examples' },
], 'mz-guide-vector');
