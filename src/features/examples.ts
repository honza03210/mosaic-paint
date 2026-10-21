/* Mosaic Paint – example drawings (a coaster, a sign) and the newcomers' guide for the vector app. */
import { MZ } from '../core/api.ts';
import * as Ex from '../lib/examples.ts';
import { initExamples } from '../shared/examples-ui.ts';
import { initGuide } from '../shared/guide.ts';
import { t } from '../shared/i18n.ts';

const svgUrl = (svg: string) => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
async function open(svg: string, name: string): Promise<void> {
  if (!await MZ.confirmDiscard()) return;
  await MZ.openText(svg, name);
}
/** Load a photo (the tracing photo), then the "Mosaic from photo" dialog. */
function fromPhoto(): void {
  const input = document.querySelector<HTMLInputElement>('#ref-file'), before = MZ.refImage();
  input.addEventListener('change', () => {
    // the photo is read in the background: open the dialog once it is there
    const started = Date.now(), wait = () => {
      if (MZ.refImage() && MZ.refImage() !== before) document.querySelector<HTMLElement>('#btn-automosaic').click();
      else if (Date.now() - started < 5000) setTimeout(wait, 100);
    };
    wait();
  }, { once: true });
  input.click();
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
  {
    id: 'photo', title: t('Your photo'), text: t('Load a photo and turn it into tiles – smaller where it has detail.'),
    preview: () => svgUrl(Ex.photoTilesSvg('')), open: fromPhoto,
  },
]);

initGuide(document.querySelector('#btn-guide'), () => MZ.state.mode === 'simple' ? [
  // Simple mode (children): only what they see
  { title: t('Welcome to Mosaic Paint'), text: t('Make a mosaic: draw the lines between the tiles, or fill an area with tiles, then paint each tile.') },
  { title: t('Draw'), text: t('Pick a tool on the left: Line, Shapes and Circles draw, Tiles fills an area with tiles, Paint colors a tile when you click it.'), target: '#tools' },
  { title: t('Colors'), text: t('Click a color, then click the tiles with Paint. Made a mistake? The arrow at the top takes it back.'), target: '#palette' },
] : [
  { title: t('Welcome to Mosaic Paint'), text: t('Design a mosaic: draw lines or lay a tile pattern, then paint the tiles. Everything is measured in real millimetres.') },
  { title: t('Draw'), text: t('The tools are on the left: lines and shapes, the tile pattern, and the paint bucket that fills a tile with one click.'), target: '#tools' },
  { title: t('Colors'), text: t('Pick a color in the palette, then click tiles with the bucket. Palettes are shared with the raster app.'), target: '#palette' },
  { title: t('When it is done'), text: t('Report gives a shopping list, 3D… a model to print, Share a link. Expert mode adds printing at real size and laying plans.'), target: '#btn-report' },
  { title: t('Start from an example'), text: t('Not sure where to begin? Open an example. The ? button shows this guide again.'), target: '#btn-examples' },
], 'mz-guide-vector');
