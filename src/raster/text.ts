/* The Text tool: tap the picture and type. The text floats above the picture (like pasted pixels) until it
   is placed, so it can be dragged into place; tapping it again with the Text tool edits it. A sheet along
   the bottom has the text, font (common ones, and every installed font where the browser can list them),
   size, bold / italic, alignment, an outline in the outline color, a shadow and a curve (the text bent
   along an arc). The text is in the paint color. */
import type { Pt } from '../lib/geometry.ts';
import { toast } from '../shared/ui.ts';
import { t } from '../shared/i18n.ts';
import { state } from './state.ts';
import { makeCanvas, requestRender } from './canvas.ts';
import { place, selectionChanged } from './select.ts';
import type { Tool } from './paint.ts';

export interface TextSpec {
  text: string;
  font: string;
  size: number;
  bold: boolean;
  italic: boolean;
  align: 'left' | 'center' | 'right';
  color: string | null;
  outline: boolean;
  outlineColor: string | null;
  outlineWidth: number;
  shadow: boolean;
  /** −100…100: how far the text is bent (up: an arch, down: a smile) */
  curve: number;
}
const FONTS = ['system-ui', 'sans-serif', 'serif', 'monospace', 'Arial', 'Helvetica', 'Verdana', 'Trebuchet MS', 'Georgia', 'Times New Roman', 'Courier New', 'Impact', 'Comic Sans MS', 'cursive', 'fantasy'];
let last: Omit<TextSpec, 'text' | 'color' | 'outlineColor'> = { font: 'system-ui', size: 48, bold: true, italic: false, align: 'center', outline: false, outlineWidth: 4, shadow: false, curve: 0 };

const fontCss = (s: TextSpec) => `${s.italic ? 'italic ' : ''}${s.bold ? 'bold ' : ''}${s.size}px ${/^[\w-]+$/.test(s.font) && !/\s/.test(s.font) ? s.font : JSON.stringify(s.font)}`;

/** The text drawn on a canvas just big enough for it (with room for the outline and the shadow). */
export function renderText(s: TextSpec): HTMLCanvasElement {
  const probe = makeCanvas(1, 1).getContext('2d');
  probe.font = fontCss(s);
  const lines = s.text.split('\n'), lh = Math.round(s.size * 1.2), widths = lines.map(l => probe.measureText(l).width);
  const pad = Math.ceil((s.outline ? s.outlineWidth : 0) + (s.shadow ? s.size * 0.15 + 6 : 0) + 2);
  const textW = Math.max(1, ...widths), textH = lh * lines.length;
  const bend = (s.curve / 100) * Math.PI * 1.4; // total angle of the arc at the widest line
  const draw = (x: CanvasRenderingContext2D, fn: (x: CanvasRenderingContext2D) => void) => {
    x.save();
    if (s.shadow) { x.shadowColor = 'rgba(0,0,0,.55)'; x.shadowBlur = s.size * 0.12; x.shadowOffsetX = x.shadowOffsetY = Math.max(1, s.size * 0.06); }
    x.font = fontCss(s);
    x.textBaseline = 'middle';
    x.lineJoin = 'round';
    fn(x);
    x.restore();
  };
  const paint = (x: CanvasRenderingContext2D, str: string, px: number, py: number) => {
    if (s.outline && s.outlineColor && s.outlineWidth > 0) { x.lineWidth = s.outlineWidth * 2; x.strokeStyle = s.outlineColor; x.strokeText(str, px, py); }
    // the outline's own shadow is enough; the fill on top has none
    if (s.outline) x.shadowColor = 'transparent';
    x.fillStyle = s.color || '#000';
    x.fillText(str, px, py);
  };
  if (Math.abs(bend) < 0.01) {
    const w = Math.ceil(textW) + 2 * pad, h = textH + 2 * pad;
    const c = makeCanvas(w, h);
    draw(c.getContext('2d'), (x) => {
      x.textAlign = s.align;
      const ax = s.align === 'left' ? pad : s.align === 'right' ? w - pad : w / 2;
      lines.forEach((l, i) => paint(x, l, ax, pad + lh * i + lh / 2));
    });
    return c;
  }
  // bent: each line on an arc around one centre, letter by letter (upwards bend: the centre is below)
  const R = textW / Math.abs(bend), up = bend > 0;
  const radii = lines.map((_, i) => (up ? R + (lines.length - 1 - i) * lh : R + i * lh));
  // drawn round the middle of a canvas that holds the whole circle, then cut down to the letters
  const outer = Math.max(...radii) + lh / 2, S = Math.ceil(2 * outer) + 2 * pad;
  const big = makeCanvas(S, S), cx = S / 2, cy = S / 2;
  draw(big.getContext('2d'), (x) => {
    x.textAlign = 'center';
    lines.forEach((l, i) => {
      const r = radii[i], lw = widths[i];
      // where the line starts on its arc (the alignment shifts it along the arc)
      const span = lw / r, room = textW / R;
      let a = s.align === 'left' ? -room / 2 : s.align === 'right' ? room / 2 - span : -span / 2;
      for (const ch of l) {
        const cw = x.measureText(ch).width, mid = a + cw / 2 / r;
        x.save();
        // an arch: over the top of the circle; a smile: along its bottom, both read left to right
        if (up) { x.translate(cx + r * Math.sin(mid), cy - r * Math.cos(mid)); x.rotate(mid); } else { x.translate(cx + r * Math.sin(mid), cy + r * Math.cos(mid)); x.rotate(-mid); }
        paint(x, ch, 0, 0);
        x.restore();
        a += cw / r;
      }
    });
  });
  const d = big.getContext('2d').getImageData(0, 0, S, S).data;
  let x0 = S, y0 = S, x1 = -1, y1 = -1;
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    if (!d[(y * S + x) * 4 + 3]) continue;
    if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
  }
  if (x1 < 0) return makeCanvas(1, 1);
  const c = makeCanvas(x1 - x0 + 1 + 2, y1 - y0 + 1 + 2);
  c.getContext('2d').drawImage(big, -x0 + 1, -y0 + 1);
  return c;
}

// ---- the sheet ------------------------------------------------------------------------------------------------
let dlg: HTMLDialogElement | null = null, spec: TextSpec, at: Pt, editing = false;
/** the sheet is for a new text (Cancel drops it) rather than one being edited (Cancel restores it) */
let isNew = false;

function build(): HTMLDialogElement {
  const d = document.createElement('dialog');
  d.id = 'dlg-text';
  d.className = 'sheet';
  d.innerHTML = `<div class="dlg-head"><h2>${t('Text')}</h2></div>
<textarea class="tx-text" rows="2" placeholder="${t('Type here')}" aria-label="${t('Text')}"></textarea>
<div class="row wrap">
  <label>${t('Font')} <select class="tx-font"></select></label>
  <button class="tx-more" hidden title="${t('List the fonts installed on this computer (the browser asks first)')}">${t('More fonts…')}</button>
  <label>${t('Size')} <input class="tx-size" type="number" min="4" max="1000" step="1"> px</label>
</div>
<div class="row wrap">
  <div class="seg-btns" role="group" aria-label="${t('Style')}"><button class="tx-bold" aria-pressed="false" title="${t('Bold')}"><b>B</b></button><button class="tx-italic" aria-pressed="false" title="${t('Italic')}"><i>I</i></button></div>
  <div class="seg-btns tx-align" role="radiogroup" aria-label="${t('Alignment')}"><button data-a="left" title="${t('Left')}">⇤</button><button data-a="center" title="${t('Center')}">↔</button><button data-a="right" title="${t('Right')}">⇥</button></div>
  <label class="chk"><input type="checkbox" class="tx-outline"> ${t('Outline')}</label>
  <label class="tx-ow-row">${t('Width')} <input class="tx-ow" type="number" min="1" max="100" step="1"></label>
  <label class="chk"><input type="checkbox" class="tx-shadow"> ${t('Shadow')}</label>
</div>
<label class="adj-row"><span>${t('Curve')}</span><input type="range" class="tx-curve" min="-100" max="100" step="1"><output></output></label>
<p class="note">${t('The text is in the paint color, its outline in the outline color. Drag it into place, then press Enter or tap outside it.')}</p>
<div class="row dlg-foot"><button class="tx-cancel">${t('Cancel')}</button><span class="grow"></span><button class="tx-done primary">${t('Done')}</button></div>`;
  document.body.append(d);
  const q = <T extends HTMLElement>(s: string) => d.querySelector<T>(s);
  const fontSel = q<HTMLSelectElement>('.tx-font');
  for (const f of FONTS) fontSel.add(new Option(f, f));
  // every installed font, where the browser can list them (it asks the user first)
  const qlf = (window as any).queryLocalFonts as undefined | (() => Promise<{ family: string }[]>);
  if (qlf) {
    q('.tx-more').hidden = false;
    q('.tx-more').onclick = async () => {
      try {
        const fams = [...new Set((await qlf()).map(f => f.family))].sort((a, b) => a.localeCompare(b));
        const have = new Set([...fontSel.options].map(o => o.value));
        for (const f of fams) if (!have.has(f)) fontSel.add(new Option(f, f));
        q('.tx-more').hidden = true;
        toast(t('{n} fonts listed.', { n: fams.length }));
      } catch { toast(t('The browser did not list the fonts.')); }
    };
  }
  const changed = () => { read(); preview(); };
  for (const el of d.querySelectorAll('input, select, textarea')) el.addEventListener('input', changed);
  for (const b of ['.tx-bold', '.tx-italic']) q(b).onclick = () => { const on = q(b).getAttribute('aria-pressed') !== 'true'; q(b).setAttribute('aria-pressed', String(on)); q(b).classList.toggle('active', on); changed(); };
  for (const b of d.querySelectorAll<HTMLElement>('.tx-align button')) b.onclick = () => { spec.align = b.dataset.a as TextSpec['align']; show(); preview(); };
  q('.tx-cancel').onclick = () => d.close('cancel');
  q('.tx-done').onclick = () => d.close('done');
  d.addEventListener('close', () => {
    if (d.returnValue !== 'done' || !spec.text.trim()) {
      // cancelled (or empty): a new text goes away; an edited one goes back to how it was
      if (isNew || !spec.text.trim()) state.floating = null; else state.floating = before;
      selectionChanged();
      requestRender();
      return;
    }
    const { text: _t, color: _c, outlineColor: _o, ...keep } = spec; // eslint-disable-line @typescript-eslint/no-unused-vars
    last = keep;
    toast(t('Drag the text into place, then press Enter or tap outside it.'));
  });
  return d;
}
function show(): void {
  const q = <T extends HTMLElement>(s: string) => dlg.querySelector<T>(s);
  q<HTMLTextAreaElement>('.tx-text').value = spec.text;
  const fontSel = q<HTMLSelectElement>('.tx-font');
  if (![...fontSel.options].some(o => o.value === spec.font)) fontSel.add(new Option(spec.font, spec.font));
  fontSel.value = spec.font;
  q<HTMLInputElement>('.tx-size').value = String(spec.size);
  for (const [b, on] of [['.tx-bold', spec.bold], ['.tx-italic', spec.italic]] as const) { q(b).setAttribute('aria-pressed', String(on)); q(b).classList.toggle('active', on); }
  for (const b of dlg.querySelectorAll<HTMLElement>('.tx-align button')) { const on = b.dataset.a === spec.align; b.classList.toggle('active', on); b.setAttribute('aria-checked', String(on)); b.setAttribute('role', 'radio'); }
  q<HTMLInputElement>('.tx-outline').checked = spec.outline;
  q<HTMLInputElement>('.tx-ow').value = String(spec.outlineWidth);
  q('.tx-ow-row').hidden = !spec.outline;
  q<HTMLInputElement>('.tx-shadow').checked = spec.shadow;
  q<HTMLInputElement>('.tx-curve').value = String(spec.curve);
  q('.tx-curve').nextElementSibling.textContent = String(spec.curve);
}
function read(): void {
  const q = <T extends HTMLElement>(s: string) => dlg.querySelector<T>(s);
  spec.text = q<HTMLTextAreaElement>('.tx-text').value;
  spec.font = q<HTMLSelectElement>('.tx-font').value;
  spec.size = Math.max(4, Math.min(1000, +q<HTMLInputElement>('.tx-size').value || 48));
  spec.bold = q('.tx-bold').getAttribute('aria-pressed') === 'true';
  spec.italic = q('.tx-italic').getAttribute('aria-pressed') === 'true';
  spec.outline = q<HTMLInputElement>('.tx-outline').checked;
  spec.outlineWidth = Math.max(1, Math.min(100, +q<HTMLInputElement>('.tx-ow').value || 4));
  spec.shadow = q<HTMLInputElement>('.tx-shadow').checked;
  spec.curve = +q<HTMLInputElement>('.tx-curve').value;
  q('.tx-ow-row').hidden = !spec.outline;
  q('.tx-curve').nextElementSibling.textContent = String(spec.curve);
}
/** The text as floating pixels, centred where it was tapped (it keeps its centre while it changes). */
function preview(): void {
  const c = renderText(spec), f = state.floating;
  const centre = f && editing ? { x: f.x + f.canvas.width / 2, y: f.y + f.canvas.height / 2 } : at;
  state.floating = { canvas: c, x: Math.round(centre.x - c.width / 2), y: Math.round(centre.y - c.height / 2), text: { ...spec } };
  if (!editing) { editing = true; at = centre; }
  selectionChanged();
  requestRender();
}
let before: typeof state.floating = null;
/** Opens the sheet: for a new text at p, or for the floating text. */
function openText(p: Pt | null): void {
  dlg = dlg || build();
  const f = state.floating;
  before = f;
  isNew = !!p;
  if (p) {
    editing = false;
    at = p;
    spec = { text: '', ...last, color: state.fill, outlineColor: state.stroke };
  } else {
    editing = true;
    spec = { ...(f.text as TextSpec), color: state.fill, outlineColor: state.stroke };
  }
  show();
  dlg.returnValue = '';
  dlg.showModal();
  const ta = dlg.querySelector<HTMLTextAreaElement>('.tx-text');
  ta.focus();
  ta.select();
  if (!p) preview();
}

const inFloating = (p: Pt) => { const f = state.floating; return !!f && p.x >= f.x && p.y >= f.y && p.x < f.x + f.canvas.width && p.y < f.y + f.canvas.height; };
export const textTool: Tool = {
  down(e, p) {
    // the floating text: drag it, or tap it to edit it
    if (inFloating(p)) { state.action = { type: 'text-move', dx: p.x - state.floating.x, dy: p.y - state.floating.y, sx: e.clientX, sy: e.clientY, moved: false }; return; }
    if (state.floating) place();
    openText(p);
  },
  move(e, p) {
    const a = state.action;
    if (a?.type !== 'text-move' || !state.floating) return;
    if (Math.hypot(e.clientX - a.sx, e.clientY - a.sy) > 4) a.moved = true;
    state.floating.x = Math.round(p.x - a.dx);
    state.floating.y = Math.round(p.y - a.dy);
    requestRender();
  },
  up() {
    const a = state.action;
    state.action = null;
    if (a?.type === 'text-move' && !a.moved && state.floating?.text) openText(null);
  },
};
