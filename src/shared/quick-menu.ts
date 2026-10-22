/* The quick menu for touch screens: double-tap the drawing with a finger and a small menu grows out of the
   finger – undo / redo, fit, the main tools, the paint and outline colors with the palette, and the size.
   The first tap of the double-tap is taken back (a dot, a fill, a started line), so it leaves no trace.
   While a shape is being drawn (polygon, curve, line), a double-tap keeps its own job (it finishes it).
   Shared by both apps; each gives what it has through QuickHost. */
import { $, lsGet, lsSet, toast } from './ui.ts';
import { LESSON } from './lesson-mode.ts';
import { t } from './i18n.ts';
import { ICONS } from './icons.ts';

export interface QuickHost {
  /** the drawing surface (taps on it are watched) */
  surface: Element;
  /** the tools offered, in order (the ones hidden in the current mode are left out) */
  tools: string[];
  /** the colors: palette, paint / fill color, outline / stroke color, and what they are called here */
  state: { palette: string[]; fill: string | null; stroke: string | null };
  names: { fill: string; stroke: string };
  setFill(c: string | null, apply: boolean): void;
  setStroke(c: string | null, apply: boolean): void;
  /** the size field (brush size / line width): its input, the slider's range and what it is called */
  size: { input: string; min: number; max: number; label: string; unit: () => string };
  /** more buttons for the top row: an icon, a name and what they do */
  extra?: { icon: string; label: string; run: () => void }[];
  /** a shape is being drawn: a double-tap belongs to it */
  busy(): boolean;
  /** a count of undo steps made so far; undoes the last one without keeping it for redo */
  steps(): number;
  dropLastStep(): void;
  /** drops what a tap began without finishing (a line's start, a polygon's first corner) */
  cancelPending(): void;
}

const TAP_MS = 300, GAP_MS = 350, TAP_PX = 12, PAIR_PX = 32;

let host: QuickHost, box: HTMLElement | null = null, target: 'fill' | 'stroke' = 'fill', hideTimer = 0;

/** The size slider is logarithmic: small sizes get most of its length. */
const toSlider = (v: number) => {
  const { min, max } = host.size;
  return Math.round(1000 * Math.log(Math.min(max, Math.max(min, v)) / min) / Math.log(max / min));
};
const fromSlider = (k: number) => {
  const { min, max } = host.size, v = min * Math.pow(max / min, k / 1000);
  return v >= 10 ? Math.round(v) : v >= 1 ? Math.round(v * 2) / 2 : Math.round(v * 10) / 10;
};

function build(): HTMLElement {
  const el = document.createElement('div');
  el.id = 'quick-menu';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-label', t('Quick menu'));
  el.hidden = true;
  el.innerHTML = `<div class="qm-card">
<div class="qm-row qm-head">
  <button class="qm-icon" data-act="undo" title="${t('Undo')}" aria-label="${t('Undo')}">${ICONS.undo}</button>
  <button class="qm-icon" data-act="redo" title="${t('Redo')}" aria-label="${t('Redo')}">${ICONS.redo}</button>
  <button class="qm-icon" data-act="fit" title="${t('Fit to the screen')}" aria-label="${t('Fit to the screen')}"><svg viewBox="0 0 20 20"><path d="M3 7V3h4M13 3h4v4M17 13v4h-4M7 17H3v-4" class="st"/></svg></button>
  <span class="qm-extra"></span>
  <span class="qm-grow"></span>
  <button class="qm-icon" data-act="close" title="${t('Close')}" aria-label="${t('Close')}">✕</button>
</div>
<div class="qm-tools"></div>
<div class="qm-row qm-targets" role="radiogroup" aria-label="${t('Which color')}">
  <button class="qm-target" data-target="fill" role="radio"><span class="qm-chip"></span><span class="qm-tname"></span></button>
  <button class="qm-target" data-target="stroke" role="radio"><span class="qm-chip"></span><span class="qm-tname"></span></button>
  <button class="qm-icon qm-more" data-act="choose" title="${t('Choose any color')}" aria-label="${t('Choose any color')}"><svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="7.5" class="st"/><path d="M10 6v8M6 10h8" class="st"/></svg></button>
</div>
<div class="qm-swatches"></div>
<label class="qm-row qm-size"><span class="qm-slabel"></span><input type="range" min="0" max="1000" step="1"><output></output></label>
</div>`;
  document.body.append(el);
  el.querySelector<HTMLElement>('.qm-slabel').textContent = host.size.label;
  const extra = el.querySelector('.qm-extra');
  for (const x of host.extra || []) {
    const b = document.createElement('button');
    b.className = 'qm-icon';
    b.title = x.label;
    b.setAttribute('aria-label', x.label);
    b.innerHTML = x.icon;
    b.onclick = () => { close(); x.run(); };
    extra.append(b);
  }
  // a tap outside closes it (and does nothing else)
  el.addEventListener('pointerdown', (e) => { if (e.target === el) { e.preventDefault(); close(); } });
  el.addEventListener('keydown', (e) => { if (e.key === 'Escape') { e.stopPropagation(); close(); } });
  el.addEventListener('click', (e) => {
    const b = (e.target as Element).closest<HTMLElement>('button');
    if (!b) return;
    if (b.dataset.tool) {
      $(`#tools button[data-tool="${b.dataset.tool}"]`).click();
      close();
    } else if (b.dataset.target) {
      target = b.dataset.target as 'fill' | 'stroke';
      renderColors();
    } else if (b.dataset.color != null) {
      const c = b.dataset.color || null;
      if (target === 'fill') host.setFill(c, true); else host.setStroke(c, true);
      renderColors();
      close();
    } else if (b.dataset.act === 'undo' || b.dataset.act === 'redo') {
      $(`#btn-${b.dataset.act}`).click();
      renderHead();
    } else if (b.dataset.act === 'fit') {
      $('#btn-fit').click();
    } else if (b.dataset.act === 'choose') {
      close();
      $(target === 'fill' ? '#ac-fill' : '#ac-stroke').click();
    } else if (b.dataset.act === 'close') close();
  });
  const range = el.querySelector<HTMLInputElement>('.qm-size input');
  range.addEventListener('input', () => {
    const inp = $(host.size.input) as HTMLInputElement;
    inp.value = String(fromSlider(+range.value));
    inp.dispatchEvent(new Event('change'));
    renderSize();
  });
  return el;
}

function renderHead(): void {
  for (const k of ['undo', 'redo']) box.querySelector<HTMLButtonElement>(`[data-act="${k}"]`).disabled = ($(`#btn-${k}`) as HTMLButtonElement).disabled;
}
function renderTools(): void {
  const wrap = box.querySelector('.qm-tools');
  wrap.innerHTML = '';
  for (const id of host.tools) {
    const src = document.querySelector<HTMLElement>(`#tools button[data-tool="${id}"]`);
    if (!src || getComputedStyle(src).display === 'none') continue;
    const b = document.createElement('button');
    b.className = 'qm-tool' + (src.classList.contains('active') ? ' active' : '');
    b.dataset.tool = id;
    b.title = src.title;
    b.setAttribute('aria-label', src.title);
    b.setAttribute('aria-pressed', String(src.classList.contains('active')));
    b.innerHTML = src.querySelector('svg')?.outerHTML || '';
    wrap.append(b);
  }
}
function renderColors(): void {
  const st = host.state;
  for (const b of box.querySelectorAll<HTMLElement>('.qm-target')) {
    const which = b.dataset.target as 'fill' | 'stroke', c = st[which];
    b.classList.toggle('active', which === target);
    b.setAttribute('aria-checked', String(which === target));
    b.querySelector<HTMLElement>('.qm-chip').style.background = c || '';
    b.querySelector('.qm-chip').classList.toggle('none', !c);
    b.querySelector('.qm-tname').textContent = host.names[which];
  }
  const wrap = box.querySelector<HTMLElement>('.qm-swatches'), now = st[target];
  wrap.innerHTML = '';
  // spread evenly over one or two rows; a big palette takes two rows and scrolls sideways
  const n = st.palette.length, rows = n > 7 ? 2 : 1;
  wrap.classList.toggle('scroll', n > 14);
  wrap.style.setProperty('--qm-rows', String(rows));
  wrap.style.setProperty('--qm-cols', String(Math.max(1, Math.ceil(n / rows))));
  for (const c of st.palette) {
    const s = document.createElement('button');
    s.className = 'qm-swatch' + (c === now ? ' active' : '');
    s.dataset.color = c;
    s.style.background = c;
    s.title = c;
    s.setAttribute('aria-label', c);
    wrap.append(s);
  }
  if (!st.palette.length) wrap.innerHTML = `<span class="qm-empty">${t('The palette is empty – use + to choose a color.')}</span>`;
}
function renderSize(): void {
  const v = parseFloat(($(host.size.input) as HTMLInputElement).value) || host.size.min;
  box.querySelector<HTMLInputElement>('.qm-size input').value = String(toSlider(v));
  box.querySelector('.qm-size output').textContent = `${v} ${host.size.unit()}`;
}

/** Opens the menu growing out of the point (x, y) on the screen. */
export function openQuickMenu(x: number, y: number): void {
  box = box || build();
  renderHead();
  renderTools();
  renderColors();
  renderSize();
  clearTimeout(hideTimer);
  box.classList.remove('closing');
  box.hidden = false;
  const card = box.querySelector<HTMLElement>('.qm-card');
  card.classList.remove('in');
  // above the finger if it fits (so the finger doesn't cover it), otherwise below; inside the safe area
  const pad = getComputedStyle(document.body), m = 10;
  const top0 = parseFloat(pad.paddingTop) + m, left0 = parseFloat(pad.paddingLeft) + m;
  const right = innerWidth - parseFloat(pad.paddingRight) - m, bottom = innerHeight - parseFloat(pad.paddingBottom) - m;
  const w = card.offsetWidth, h = card.offsetHeight, gap = 28;
  let top = y - gap - h;
  if (top < top0) top = Math.min(y + gap, bottom - h);
  top = Math.max(top0, top);
  const left = Math.max(left0, Math.min(right - w, x - w / 2));
  card.style.left = `${left}px`;
  card.style.top = `${top}px`;
  card.style.transformOrigin = `${x - left}px ${y - top}px`;
  box.style.setProperty('--qx', `${x}px`);
  box.style.setProperty('--qy', `${y}px`);
  void card.offsetWidth; // start the animation from the finger
  card.classList.add('in');
  box.classList.remove('ripple');
  void box.offsetWidth;
  box.classList.add('ripple');
}
export function closeQuickMenu(): void { close(); }
export const quickMenuOpen = (): boolean => !!box && !box.hidden && !box.classList.contains('closing');
/** Shrinks back and hides; taps go through to the drawing at once. */
function close(): void {
  if (!quickMenuOpen()) return;
  box.querySelector('.qm-card').classList.remove('in');
  box.classList.add('closing');
  hideTimer = window.setTimeout(() => { box.hidden = true; box.classList.remove('closing'); }, 160);
}

/** Watches the surface for a double-tap with a finger. */
export function initQuickMenu(h: QuickHost): void {
  host = h;
  let cur: { id: number; x: number; y: number; t: number; steps: number; busy: boolean; moved: boolean } | null = null;
  let last: { x: number; y: number; t: number; steps: number } | null = null;
  let swallow: { id: number; x: number; y: number; moved: boolean } | null = null;
  const stop = (e: Event) => { e.stopImmediatePropagation(); e.preventDefault(); };
  const s = h.surface;
  // capturing listeners on the surface itself run before the app's own, so the second tap can be kept from it
  s.addEventListener('pointerdown', (ev) => {
    const e = ev as PointerEvent;
    if (e.pointerType !== 'touch' || !e.isPrimary) { cur = last = null; return; }
    hintOnce();
    if (last && e.timeStamp - last.t < GAP_MS && Math.hypot(e.clientX - last.x, e.clientY - last.y) < PAIR_PX) {
      // the second tap: take the first one back and keep this one from the app
      if (h.steps() === last.steps + 1) h.dropLastStep();
      h.cancelPending();
      last = null;
      swallow = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: false };
      stop(e);
      return;
    }
    last = null;
    cur = { id: e.pointerId, x: e.clientX, y: e.clientY, t: e.timeStamp, steps: h.steps(), busy: h.busy(), moved: false };
  }, true);
  s.addEventListener('pointermove', (ev) => {
    const e = ev as PointerEvent;
    if (swallow && e.pointerId === swallow.id) {
      if (Math.hypot(e.clientX - swallow.x, e.clientY - swallow.y) > PAIR_PX) swallow.moved = true;
      stop(e);
      return;
    }
    if (cur && e.pointerId === cur.id && Math.hypot(e.clientX - cur.x, e.clientY - cur.y) > TAP_PX) cur.moved = true;
  }, true);
  s.addEventListener('pointerup', (ev) => {
    const e = ev as PointerEvent;
    if (swallow && e.pointerId === swallow.id) {
      const open = !swallow.moved;
      swallow = null;
      stop(e);
      if (open) openQuickMenu(e.clientX, e.clientY);
      return;
    }
    // a quick tap that didn't move, made while nothing was being drawn, may be the first of a pair
    if (cur && e.pointerId === cur.id && !cur.moved && !cur.busy && e.timeStamp - cur.t < TAP_MS) {
      last = { x: e.clientX, y: e.clientY, t: e.timeStamp, steps: cur.steps };
    }
    cur = null;
  }, true);
  s.addEventListener('pointercancel', (ev) => {
    const e = ev as PointerEvent;
    if (swallow && e.pointerId === swallow.id) { swallow = null; stop(e); }
    cur = last = null;
  }, true);
  // the browser's own double-click after a double-tap belongs to the menu then
  s.addEventListener('dblclick', (e) => { if (quickMenuOpen()) stop(e); }, true);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && quickMenuOpen()) { e.stopImmediatePropagation(); close(); } }, true);
}

/** The first time a finger draws, a hint says the menu is there. */
function hintOnce(): void {
  if (navigator.webdriver || LESSON || lsGet('mz-quick-hint')) return;
  lsSet('mz-quick-hint', '1');
  toast(t('Tip: double-tap the drawing for a quick menu – tools, colors and size.'));
}
