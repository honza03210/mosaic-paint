/* Hand-laid lines (the "Shards" button): every line is drawn as tapered pieces between its crossings – one end
   wider, the other narrower, at random – as if glass shards had been set by hand. The lines themselves stay
   as they are (they still make the tiles, and can be edited); they are only hidden under the pieces. The
   setting belongs to the drawing (state.doc.hand: undo, files and pages keep it); the pieces are drawn again
   whenever the lines change, and go into saved files and pictures as their own group. */
import type { Seg } from '../lib/geometry.ts';
import { splitAtCrossings, taper, wedgePath } from '../lib/handlaid.ts';
import { $, state, docG, shapesG, isFill, mk } from './env.ts';
import { allShapes, geomOf } from './doc.ts';

export interface Hand { seed: number; amount: number }
/** how uneven (0…1) when switched on */
export const HAND_AMOUNT = 0.7;

const handG = mk('g', { id: 'mz-hand', 'pointer-events': 'none' }, docG);
shapesG.after(handG);

/** The pieces as SVG paths (one per line, in its color), for the screen and for files. */
export function handPaths(): { d: string; color: string }[] {
  const h = state.doc.hand;
  if (!h) return [];
  const g = state.grout.on ? state.grout : null;
  const lines: { segs: Seg[]; color: string; w: number }[] = [], all: Seg[] = [];
  for (const el of allShapes()) {
    if (isFill(el)) continue;
    const cs = getComputedStyle(el), color = g ? g.color : cs.stroke, w = g ? g.width : parseFloat(cs.strokeWidth);
    if (!color || color === 'none' || !(w > 0)) continue;
    const segs: Seg[] = [];
    for (const pl of geomOf(el).polys) {
      const p = pl.pts, n = p.length, m = pl.closed ? n : n - 1;
      for (let i = 0; i < m; i++) segs.push({ a: p[i], b: p[(i + 1) % n] });
    }
    lines.push({ segs, color, w });
    all.push(...segs);
  }
  // a piece shorter than a line is wide stays with its neighbour (no blobs where lines meet at a slant)
  return lines.map(({ segs, color, w }) => ({
    color,
    d: splitAtCrossings(segs, all, w).map(s => { const [a, b] = taper(h.seed, s.a, s.b, h.amount); return wedgePath(s.a, s.b, w * a / 2, w * b / 2); }).join(''),
  })).filter(p => p.d);
}

let frame = 0;
/** Draws the pieces again (once per frame, however many changes come). */
export function renderHand(): void {
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = 0;
    const on = !!state.doc.hand;
    if (shapesG.classList.contains('hand') !== on) shapesG.classList.toggle('hand', on);
    handG.textContent = '';
    for (const p of handPaths()) mk('path', { d: p.d, fill: p.color }, handG);
    const b = document.getElementById('btn-hand');
    if (b) { b.classList.toggle('active', on); b.setAttribute('aria-pressed', String(on)); }
    const c = document.getElementById('hand-on') as HTMLInputElement | null;
    if (c) c.checked = on;
    const r = document.getElementById('hand-amount') as HTMLInputElement | null;
    if (r && state.doc.hand) r.value = String(Math.round(state.doc.hand.amount * 100));
    for (const id of ['#hand-shuffle', '#hand-amount']) ($(id) as HTMLInputElement).disabled = !on;
  });
}
// the lines changed (drawn, moved, undone, another page or file, the grout preview): the pieces too
new MutationObserver(renderHand).observe(shapesG, { childList: true, subtree: true, attributes: true, characterData: true });

/** On / off (a new arrangement each time it is switched on); shuffle: other widths, the same unevenness. */
export function setHand(h: Hand | null): void {
  // (a new object: undo keeps copies of state.doc)
  state.doc = { ...state.doc, hand: h ? { ...h } : undefined };
  if (!h) delete state.doc.hand;
  renderHand();
}
export const newSeed = (): number => Math.floor(Math.random() * 1e9);

/** For a saved file: the pieces, and a rule that hides the even lines under them (another program shows it as on screen). */
export function handGroupSVG(root: Element): void {
  const paths = handPaths();
  if (!paths.length) return;
  const g = mk('g', { id: 'mosaic-hand' }, root);
  mk('style', {}, g).textContent = '#mosaic-shapes :not(.mz-fill):not(g){stroke-opacity:0}';
  for (const p of paths) mk('path', { d: p.d, fill: p.color }, g);
}
