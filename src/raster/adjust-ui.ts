/* Photo fixes: a sheet along the bottom (the picture stays visible above it, also on phones) with
   brightness, contrast, saturation, levels, sharpening and noise smoothing. The picture shows the result
   while the sliders move (worked out in the worker); Apply keeps it as one undo step, Cancel goes back.
   Works on the selection, or on the whole image. */
import { t } from '../shared/i18n.ts';
import { toast } from '../shared/ui.ts';
import { run, isCancelled } from '../shared/work.ts';
import { NO_ADJUST, autoLevels, isNoAdjust, type Adjust } from '../lib/adjust.ts';
import type { Box } from '../lib/raster.ts';
import { state } from './state.ts';
import { doc, dctx, requestRender } from './canvas.ts';
import { commit, restoreCurrent } from './history.ts';
import { place, selectionMask } from './select.ts';

/** slider: key, label, min, max; the midtones slider is −100…100 and stands for gamma 2^(v/50) */
const SLIDERS: [keyof Adjust, string, number, number][] = [
  ['brightness', 'Brightness', -100, 100],
  ['contrast', 'Contrast', -100, 100],
  ['saturation', 'Saturation', -100, 100],
  ['black', 'Shadows', 0, 254],
  ['gamma', 'Midtones', -100, 100],
  ['white', 'Highlights', 1, 255],
  ['sharpen', 'Sharpen', 0, 100],
  ['denoise', 'Smooth noise', 0, 100],
];
const toSlider = (k: keyof Adjust, v: number) => (k === 'gamma' ? Math.round(Math.log2(v) * 50) : v);
const fromSlider = (k: keyof Adjust, v: number) => (k === 'gamma' ? Math.pow(2, v / 50) : v);

let dlg: HTMLDialogElement | null = null;
let box: Box, original: ImageData, mask: Uint8Array | null = null, cur: Adjust = { ...NO_ADJUST }, busy: Promise<void> = Promise.resolve(), timer = 0;
/** "Before" is held: the original shows, and results that arrive meanwhile wait */
let comparing = false;

function build(): HTMLDialogElement {
  const d = document.createElement('dialog');
  d.id = 'dlg-adjust';
  d.className = 'sheet';
  d.innerHTML = `<div class="dlg-head"><h2>${t('Adjust colors')}</h2><span class="adj-busy note"></span></div>
<div class="adj-grid">${SLIDERS.map(([k, label, min, max]) => `<label class="adj-row"><span>${t(label)}</span><input type="range" data-k="${k}" min="${min}" max="${max}" step="1"><output></output></label>`).join('')}</div>
<div class="row dlg-foot">
  <button class="adj-auto" title="${t('Stretch the picture’s tones to the full range')}">${t('Auto')}</button>
  <button class="adj-reset">${t('Reset')}</button>
  <button class="adj-compare" title="${t('Hold to see the picture as it was')}">${t('Before')}</button>
  <span class="grow"></span>
  <button class="adj-cancel">${t('Cancel')}</button>
  <button class="adj-apply primary">${t('Apply')}</button>
</div>`;
  document.body.append(d);
  for (const inp of d.querySelectorAll<HTMLInputElement>('input[type=range]')) {
    inp.addEventListener('input', () => {
      const k = inp.dataset.k as keyof Adjust;
      cur[k] = fromSlider(k, +inp.value);
      if (k === 'black' && cur.black >= cur.white) cur.white = Math.min(255, cur.black + 1);
      if (k === 'white' && cur.white <= cur.black) cur.black = Math.max(0, cur.white - 1);
      show();
      schedule();
    });
  }
  d.querySelector<HTMLElement>('.adj-auto').onclick = () => { Object.assign(cur, autoLevels(original.data)); show(); schedule(); };
  d.querySelector<HTMLElement>('.adj-reset').onclick = () => { cur = { ...NO_ADJUST }; show(); schedule(); };
  // hold "Before" to compare (mouse, touch and keyboard)
  const cmp = d.querySelector<HTMLElement>('.adj-compare');
  const before = (on: boolean) => {
    comparing = on;
    if (on) { clearTimeout(timer); putRegion(original.data); } else schedule(0);
  };
  cmp.onpointerdown = (e) => { cmp.setPointerCapture(e.pointerId); before(true); };
  cmp.onpointerup = cmp.onpointercancel = () => before(false);
  cmp.onkeydown = (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (!e.repeat) before(true); } };
  cmp.onkeyup = (e) => { if (e.key === ' ' || e.key === 'Enter') before(false); };
  d.querySelector<HTMLElement>('.adj-cancel').onclick = () => { finish(false); d.close('cancel'); };
  d.querySelector<HTMLElement>('.adj-apply').onclick = async () => {
    // a preview still waiting to start would cancel this last, full update
    clearTimeout(timer);
    await busy.catch(() => {});
    await update();
    finish(true);
    d.close('apply');
  };
  // closed some other way (Esc): as Cancel
  d.addEventListener('close', () => finish(false));
  return d;
}
function show(): void {
  for (const inp of dlg.querySelectorAll<HTMLInputElement>('input[type=range]')) {
    const k = inp.dataset.k as keyof Adjust;
    inp.value = String(toSlider(k, cur[k]));
    (inp.nextElementSibling as HTMLOutputElement).textContent = k === 'gamma' ? cur.gamma.toFixed(2) : String(Math.round(cur[k]));
  }
}
/** Puts pixels for the region back onto the image (inside a shaped selection only). */
function putRegion(data: Uint8ClampedArray): void {
  const im = new ImageData(new Uint8ClampedArray(data), box.w, box.h);
  if (mask) {
    const o = original.data, d = im.data;
    for (let i = 0; i < mask.length; i++) {
      const m = mask[i] / 255;
      if (m >= 1) continue;
      for (let c = 0; c < 4; c++) d[i * 4 + c] = o[i * 4 + c] + (d[i * 4 + c] - o[i * 4 + c]) * m;
    }
  }
  dctx.putImageData(im, box.x, box.y);
  requestRender();
}
function schedule(ms = 60): void {
  clearTimeout(timer);
  timer = window.setTimeout(() => { busy = update(); }, ms);
}
async function update(): Promise<void> {
  const label = dlg.querySelector('.adj-busy');
  if (isNoAdjust(cur)) { if (!comparing) putRegion(original.data); label.textContent = ''; return; }
  label.textContent = t('Working…');
  try {
    const img = { width: box.w, height: box.h, data: new Uint8ClampedArray(original.data) };
    const out = await run('adjust', { img, adjust: { ...cur } }, { lane: 'adjust' });
    if (dlg.open && !comparing) putRegion(out.data);
    label.textContent = '';
  } catch (e) {
    if (!isCancelled(e)) { label.textContent = ''; throw e; }
  }
}

/** Keeps the result (one undo step) or goes back to the picture as it was – once, right away (before the
    dialog's close event, which comes a moment later). */
let finished = true;
function finish(apply: boolean): void {
  if (finished) return;
  finished = true;
  clearTimeout(timer);
  if (apply && !isNoAdjust(cur)) { commit(); toast(t('Colors adjusted.')); } else restoreCurrent();
}

/** Opens the photo fixes for the selection (or the whole image). */
export function openAdjust(): void {
  if (state.floating) place();
  dlg = dlg || build();
  const s = state.sel;
  box = s ? { x: s.x, y: s.y, w: s.w, h: s.h } : { x: 0, y: 0, w: doc.width, h: doc.height };
  mask = s ? selectionMask() : null;
  original = dctx.getImageData(box.x, box.y, box.w, box.h);
  cur = { ...NO_ADJUST };
  comparing = false;
  finished = false;
  show();
  dlg.querySelector('.adj-busy').textContent = '';
  dlg.returnValue = '';
  dlg.showModal();
}
