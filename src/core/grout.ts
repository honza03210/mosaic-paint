/* Grout preview: draws every line in one grout color and width, without changing the drawing. */
import { $, state, shapesG, isFill, toast } from './env.ts';
import { allShapes, setPaint } from './doc.ts';
import { savePrefs } from './palette.ts';
import { commit } from './history.ts';

export function applyGrout(): void {
  const g = state.grout;
  shapesG.classList.toggle('grout', g.on);
  shapesG.style.setProperty('--grout-color', g.color);
  shapesG.style.setProperty('--grout-width', g.width + 'px');
}
/** The grout preview as CSS for an exported file. */
export const groutCSS = (): string =>
  `#mosaic-shapes :not(.mz-fill):not(g){stroke:${state.grout.color}!important;stroke-width:${state.grout.width}px!important;stroke-linecap:round}`;
/** Makes the preview real: every line gets the grout color and width. */
export function bakeGrout(): void {
  let n = 0;
  for (const el of allShapes()) {
    if (isFill(el)) continue;
    setPaint(el, 'stroke', state.grout.color);
    el.setAttribute('stroke-width', String(state.grout.width));
    (el as SVGElement).style.removeProperty('stroke-width');
    n++;
  }
  state.grout.on = false;
  $('#grout-on').checked = false;
  applyGrout();
  savePrefs();
  commit(true);
  toast(`Applied the grout color and width to ${n} lines.`);
}
