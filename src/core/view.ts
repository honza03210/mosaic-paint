/* What you see: zoom & pan, the page, layers (show / lock) and symmetry guides. */
import * as Geo from '../lib/geometry.ts';
import * as Colors from '../lib/colors.ts';
import type { Pt } from '../lib/geometry.ts';
import {
  $, $$, state, svg, overlaySvg, refG, fillsG, shapesG, guidesG, pageRect, gridRect, gridPattern, gridPath,
  clamp, px, fmt, mk, unit, emit, toast, isFill, type Layer,
} from './env.ts';
import { renderSelection, renderProps } from './selection.ts';
import { gapTol } from './areas.ts';
import { t } from '../shared/i18n.ts';

// ---- zoom & pan -----------------------------------------------------------------------------
export function toDoc(cx: number, cy: number): Pt {
  const r = svg.getBoundingClientRect(), v = state.view;
  return { x: v.x + (cx - r.left) / v.s, y: v.y + (cy - r.top) / v.s };
}
export function updateView(): void {
  const r = svg.getBoundingClientRect();
  if (!r.width || !r.height) return;
  const v = state.view;
  const vb = `${v.x} ${v.y} ${r.width / v.s} ${r.height / v.s}`;
  svg.setAttribute('viewBox', vb);
  overlaySvg.setAttribute('viewBox', vb);
  $('#zoom-label').textContent = Math.round(v.s * 100) + '%';
  gridPath.setAttribute('stroke-width', px(1));
  $('#mz-checker').setAttribute('patternTransform', `scale(${1 / v.s})`);
  renderSelection();
  drawGuides();
  emit('view');
}
export function fitView(): void {
  const r = svg.getBoundingClientRect(), d = state.doc;
  if (!r.width || !r.height) return;
  const s = Math.min(r.width / d.w, r.height / d.h) * 0.9;
  state.view = { s, x: d.x + d.w / 2 - r.width / s / 2, y: d.y + d.h / 2 - r.height / s / 2 };
  updateView();
}
export function zoomAt(cx: number, cy: number, factor: number): void {
  const p = toDoc(cx, cy), r = svg.getBoundingClientRect(), v = state.view;
  v.s = clamp(v.s * factor, 0.005, 2000);
  v.x = p.x - (cx - r.left) / v.s;
  v.y = p.y - (cy - r.top) / v.s;
  updateView();
}
export function zoomCenter(f: number): void {
  const r = svg.getBoundingClientRect();
  zoomAt(r.left + r.width / 2, r.top + r.height / 2, f);
}

// ---- the page ----------------------------------------------------------------------------------
export function applyDoc(): void {
  const d = state.doc;
  Geo.setEps(Math.max(d.w, d.h) * 1e-5);
  for (const r of [pageRect, gridRect]) {
    r.setAttribute('x', d.x); r.setAttribute('y', d.y);
    r.setAttribute('width', d.w); r.setAttribute('height', d.h);
  }
  pageRect.setAttribute('fill', d.bg || 'url(#mz-checker)');
  const g = state.gridSize;
  gridPattern.setAttribute('x', d.x); gridPattern.setAttribute('y', d.y);
  gridPattern.setAttribute('width', g); gridPattern.setAttribute('height', g);
  gridPath.setAttribute('d', `M ${g} 0 L 0 0 0 ${g}`);
  gridRect.style.display = state.grid ? '' : 'none';
  $('#doc-w').value = fmt(d.w);
  $('#doc-h').value = fmt(d.h);
  $('#doc-unit').value = unit();
  for (const el of $$('.unit-label')) el.textContent = unit();
  const bg = Colors.norm(d.bg);
  $('#doc-bg').value = bg && bg.startsWith('#') ? bg : '#ffffff';
  $('#doc-bg-none').checked = !d.bg;
  $('#opt-gap').value = fmt(gapTol());
  drawGuides();
  emit('view');
}

// ---- layers --------------------------------------------------------------------------------------
/** Simple mode always shows painted areas and lines; only the photo keeps its own settings. */
export function layer(name: string): Layer {
  if (state.mode === 'simple' && name !== 'ref') return { visible: true, locked: false };
  return state.layers[name];
}
const layerOf = (el: Element) => isFill(el) ? 'fills' : 'shapes';
export const editable = (name: string): boolean => layer(name).visible && !layer(name).locked;
export const selectable = (el: Element): boolean => editable(layerOf(el));
export function applyLayers(): void {
  refG.style.visibility = layer('ref').visible ? '' : 'hidden';
  fillsG.style.visibility = layer('fills').visible ? '' : 'hidden';
  shapesG.style.visibility = layer('shapes').visible ? '' : 'hidden';
  for (const b of $$('[data-layer]')) {
    const L = state.layers[b.dataset.layer], k = b.dataset.prop;
    b.classList.toggle('off', k === 'visible' ? !L.visible : !L.locked);
    b.textContent = k === 'visible' ? (L.visible ? '👁' : '–') : (L.locked ? '🔒' : '🔓');
    b.title = k === 'visible' ? (L.visible ? 'Visible – click to hide' : 'Hidden – click to show') : (L.locked ? 'Locked – click to unlock' : 'Unlocked – click to lock');
  }
  $('#ref-show').checked = state.layers.ref.visible;
  $('#ref-lock').checked = state.layers.ref.locked;
  for (const el of [...state.selection]) if (!selectable(el)) state.selection.delete(el);
  renderSelection();
  renderProps();
}
export function canDraw(): boolean {
  if (editable('shapes')) return true;
  toast(t('The lines layer is locked or hidden (see Layers).'));
  return false;
}

// ---- symmetry ------------------------------------------------------------------------------------
export const symOn = (): boolean => state.mode === 'expert' && state.sym.type !== 'none';
export function symCenter(): Pt {
  const s = state.sym, d = state.doc;
  return { x: s.cx ?? d.x + d.w / 2, y: s.cy ?? d.y + d.h / 2 };
}
type Transform = (p: Pt) => Pt;
/** Point transforms for the active symmetry; the first one is always the identity. */
export function symTransforms(): Transform[] {
  const id: Transform = (p) => p;
  if (!symOn()) return [id];
  const s = state.sym, c = symCenter();
  const rot = (a: number): Transform => (p) => {
    const dx = p.x - c.x, dy = p.y - c.y, co = Math.cos(a), si = Math.sin(a);
    return { x: c.x + dx * co - dy * si, y: c.y + dx * si + dy * co };
  };
  const mx: Transform = (p) => ({ x: 2 * c.x - p.x, y: p.y }), my: Transform = (p) => ({ x: p.x, y: 2 * c.y - p.y });
  if (s.type === 'mirror-v') return [id, mx];
  if (s.type === 'mirror-h') return [id, my];
  if (s.type === 'mirror-hv') return [id, mx, my, (p) => mx(my(p))];
  const n = clamp(Math.round(s.n) || 2, 2, 64), out: Transform[] = [];
  for (let k = 0; k < n; k++) out.push(rot(k * 2 * Math.PI / n));
  if (s.mirror) for (let k = 0; k < n; k++) { const r = rot(k * 2 * Math.PI / n); out.push((p) => r(mx(p))); }
  return out;
}
export const ptKey = (p: Pt): string => Math.round(p.x / (Geo.eps * 10)) + ',' + Math.round(p.y / (Geo.eps * 10));
/** Symmetric copies of a point list (the original first), without duplicates. */
export function symCopies(pts: Pt[]): Pt[][] {
  const seen = new Set<string>(), out: Pt[][] = [];
  for (const t of symTransforms()) {
    const q = pts.map(t), key = q.map(ptKey).sort().join(' ');
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(q);
  }
  return out;
}
export function drawGuides(): void {
  guidesG.innerHTML = '';
  if (!symOn()) return;
  const s = state.sym, c = symCenter(), d = state.doc, R = Math.hypot(d.w, d.h);
  const ray = (a: number) => mk('line', { x1: c.x, y1: c.y, x2: c.x + R * Math.cos(a), y2: c.y + R * Math.sin(a), class: 'sym-guide' }, guidesG);
  if (s.type === 'mirror-v' || s.type === 'mirror-hv') { ray(-Math.PI / 2); ray(Math.PI / 2); }
  if (s.type === 'mirror-h' || s.type === 'mirror-hv') { ray(0); ray(Math.PI); }
  if (s.type === 'radial') {
    const n = clamp(Math.round(s.n) || 2, 2, 64);
    for (let k = 0; k < n; k++) ray(-Math.PI / 2 + k * 2 * Math.PI / n);
  }
  mk('circle', { cx: c.x, cy: c.y, r: px(5), class: 'sym-center' }, guidesG);
}
