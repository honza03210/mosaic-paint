/* Simple mode (for children) on a phone or tablet: the side panel with the colors is tucked away there, so the
   palette's colors are also a row of big swatches along the bottom of the drawing – always in reach. Tap one
   to paint with it. (Shown by style.css only in the vector app's Simple mode, on narrow screens.) */
import { state, on, stage } from '../core/env.ts';
import { setFill } from '../core/palette.ts';
import { t } from '../shared/i18n.ts';

const bar = document.createElement('div');
bar.id = 'kid-colors';
bar.setAttribute('role', 'toolbar');
bar.setAttribute('aria-label', t('Colors'));
stage.append(bar);

function render(): void {
  const colors = [null, ...state.palette];
  if (bar.childElementCount !== colors.length || colors.some((c, i) => (bar.children[i] as HTMLElement).dataset.color !== String(c))) {
    bar.innerHTML = '';
    for (const c of colors) {
      const b = document.createElement('button');
      b.className = 'kc' + (c ? '' : ' none');
      b.dataset.color = String(c);
      if (c) b.style.background = c;
      b.setAttribute('aria-label', c || t('No color – the bucket erases with it'));
      b.onclick = () => setFill(c, true);
      bar.append(b);
    }
  }
  for (const b of bar.children as HTMLCollectionOf<HTMLElement>) {
    const on = b.dataset.color === String(state.fill);
    b.classList.toggle('active', on);
    b.setAttribute('aria-pressed', String(on));
  }
}
// the palette is drawn again whenever its colors or the paint color change
on('palette', render);
render();
