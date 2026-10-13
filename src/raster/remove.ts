/* Removing things: the Remove brush (paint over what should go; when the stroke ends it is filled from the
   picture around it) and "Fill from surroundings" for a selection. The fill is content-aware (PatchMatch,
   in the worker); with the AI object removal add-on it can use a trained model instead (ai-features.ts). */
import type { Pt } from '../lib/geometry.ts';
import * as S from '../lib/selection.ts';
import { toast } from '../shared/ui.ts';
import { t } from '../shared/i18n.ts';
import { run } from '../shared/work.ts';
import { state } from './state.ts';
import { doc, dctx, makeCanvas, requestRender } from './canvas.ts';
import { commit } from './history.ts';
import { selectionFullMask, place, selectionChanged } from './select.ts';
import type { Tool } from './paint.ts';

/** Another way to fill a hole (the AI add-on puts its own here); null: the built-in fill. */
export const fillers: { ai: ((img: ImageData, mask: Uint8Array) => Promise<Uint8ClampedArray>) | null } = { ai: null };

let working = false;
/** Fills the masked part of the picture (a whole-image mask) from what is around it. One undo step. */
export async function fillHole(mask: Uint8Array): Promise<boolean> {
  if (working) return false;
  const box = S.maskBox(mask, doc.width, doc.height);
  if (!box) return false;
  // the picture around the hole, as far again as the hole is big (at least a little, at most a lot)
  const m = Math.min(240, Math.max(32, Math.round(Math.max(box.w, box.h))));
  const x0 = Math.max(0, box.x - m), y0 = Math.max(0, box.y - m), x1 = Math.min(doc.width, box.x + box.w + m), y1 = Math.min(doc.height, box.y + box.h + m);
  const w = x1 - x0, h = y1 - y0, region = { x: x0, y: y0, w, h };
  const img = dctx.getImageData(x0, y0, w, h), hole = S.cropMask(mask, doc.width, region);
  working = true;
  toast(t('Filling from the surroundings…'));
  try {
    const out = state.removeMethod === 'ai' && fillers.ai
      ? await fillers.ai(img, hole)
      : (await run('inpaint', { img: { width: w, height: h, data: img.data }, mask: hole }, { lane: 'inpaint' })).data;
    // soft edges: blend by the mask, so a painted stroke's smooth edge stays smooth
    const d = img.data;
    for (let i = 0; i < hole.length; i++) {
      const k = hole[i] / 255;
      if (!k) continue;
      for (let c = 0; c < 4; c++) d[i * 4 + c] = d[i * 4 + c] + (out[i * 4 + c] - d[i * 4 + c]) * k;
    }
    dctx.putImageData(img, x0, y0);
    commit();
    toast(t('Removed.'));
    return true;
  } catch (e) {
    toast(t('Could not fill it: {why}', { why: String((e as Error)?.message || e) }));
    return false;
  } finally {
    working = false;
    requestRender();
  }
}

/** Fill from surroundings: the selection is filled from what is around it. */
export async function fillSelection(): Promise<void> {
  if (state.floating) place();
  const m = selectionFullMask();
  if (!m) { toast(t('Select what to remove first.')); return; }
  if (await fillHole(m)) { state.sel = null; selectionChanged(); }
}

// ---- the Remove brush ---------------------------------------------------------------------------------------
let marks: HTMLCanvasElement | null = null, last: Pt | null = null;
function mark(a: Pt, b: Pt): void {
  const x = marks.getContext('2d');
  x.strokeStyle = x.fillStyle = '#ff3b30';
  x.lineWidth = state.size;
  x.lineCap = x.lineJoin = 'round';
  x.beginPath();
  x.moveTo(a.x, a.y);
  x.lineTo(b.x + 0.01, b.y);
  x.stroke();
  requestRender();
}
export const removeTool: Tool = {
  down(e, p) {
    if (working) return;
    marks = makeCanvas(doc.width, doc.height);
    last = p;
    state.action = { type: 'remove' };
    // what will be removed shows in red over the picture
    state.preview = (ctx) => { if (marks) { ctx.globalAlpha = 0.5; ctx.drawImage(marks, 0, 0); ctx.globalAlpha = 1; } };
    mark(p, p);
  },
  move(e, p) {
    if (state.action?.type !== 'remove' || !marks) return;
    mark(last, p);
    last = p;
  },
  async up() {
    if (state.action?.type !== 'remove' || !marks) return;
    state.action = null;
    const d = marks.getContext('2d').getImageData(0, 0, doc.width, doc.height).data, m = new Uint8Array(doc.width * doc.height);
    for (let i = 0; i < m.length; i++) m[i] = d[i * 4 + 3];
    await fillHole(m);
    marks = null;
    state.preview = null;
    requestRender();
  },
};
