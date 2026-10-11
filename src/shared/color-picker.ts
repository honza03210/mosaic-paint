/* Choosing any color: a saturation / brightness area, a hue slider and a hex field, with the old and the new
   color side by side. Works with mouse, touch, pen and keyboard (arrows move in the area). Shared by both
   apps (opened from the palette panel). */
import * as Colors from '../lib/colors.ts';
import { t } from './i18n.ts';

let dlg: HTMLDialogElement | null = null;
function box(): HTMLDialogElement {
  if (dlg) return dlg;
  dlg = document.createElement('dialog');
  dlg.id = 'dlg-color';
  dlg.innerHTML = `<form method="dialog">
<div class="dlg-head"><h2>${t('Choose a color')}</h2></div>
<div class="cp-sv" tabindex="0" role="slider" aria-label="${t('Saturation and brightness')}"><div class="cp-knob"></div></div>
<input class="cp-hue" type="range" min="0" max="359" step="1" aria-label="${t('Hue')}">
<div class="row cp-row"><span class="cp-old" title="${t('Before')}"></span><span class="cp-new" title="${t('New')}"></span>
<input class="cp-hex" type="text" spellcheck="false" autocomplete="off" aria-label="${t('Color code')}"></div>
<label class="chk"><input type="checkbox" class="cp-add" checked> ${t('Also add it to the palette')}</label>
<div class="row dlg-foot"><button value="cancel" formnovalidate>${t('Cancel')}</button><button value="ok" class="primary">${t('Use this color')}</button></div>
</form>`;
  document.body.append(dlg);
  return dlg;
}

/** Lets the user choose a color, starting from `initial`; null when cancelled. */
export function chooseColor(initial: string | null): Promise<{ color: string; addToPalette: boolean } | null> {
  const d = box(), q = <T extends Element>(s: string) => d.querySelector<T>(s) as T;
  const sv = q<HTMLElement>('.cp-sv'), knob = q<HTMLElement>('.cp-knob'), hue = q<HTMLInputElement>('.cp-hue');
  const hex = q<HTMLInputElement>('.cp-hex'), now = q<HTMLElement>('.cp-new');
  let [h, s, v] = Colors.toHsv(initial || '#808080') || [0, 0, 0.5];
  const color = () => Colors.fromHsv(h, s, v);
  const draw = (fromField = false) => {
    sv.style.backgroundColor = `hsl(${h}, 100%, 50%)`;
    knob.style.left = `${s * 100}%`;
    knob.style.top = `${(1 - v) * 100}%`;
    hue.value = String(Math.round(h));
    now.style.background = color();
    if (!fromField) hex.value = color();
    sv.setAttribute('aria-valuetext', color());
  };
  q<HTMLElement>('.cp-old').style.background = initial || 'transparent';

  // the area: drag (or tap) to pick saturation (across) and brightness (up)
  const pick = (e: PointerEvent) => {
    const r = sv.getBoundingClientRect();
    s = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    v = 1 - Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    draw();
  };
  sv.onpointerdown = (e) => { sv.setPointerCapture(e.pointerId); pick(e); };
  sv.onpointermove = (e) => { if (sv.hasPointerCapture(e.pointerId)) pick(e); };
  sv.onkeydown = (e) => {
    const step = e.shiftKey ? 0.1 : 0.02, moves: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, step], ArrowDown: [0, -step] };
    const m = moves[e.key];
    if (!m) return;
    e.preventDefault();
    s = Math.min(1, Math.max(0, s + m[0]));
    v = Math.min(1, Math.max(0, v + m[1]));
    draw();
  };
  hue.oninput = () => { h = +hue.value; draw(); };
  // a typed or pasted color (any CSS color)
  hex.oninput = () => {
    const c = Colors.norm(hex.value), hsv = c && Colors.toHsv(c);
    if (hsv) { [h, s, v] = hsv; draw(true); }
  };
  draw();
  d.returnValue = 'cancel';
  return new Promise((resolve) => {
    d.addEventListener('close', () => {
      resolve(d.returnValue === 'ok' ? { color: color(), addToPalette: q<HTMLInputElement>('.cp-add').checked } : null);
    }, { once: true });
    d.showModal();
    sv.focus();
  });
}
