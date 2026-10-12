/* Settings that are remembered, and the palette panel (shared with the raster app) wired to the drawing. */
import * as Colors from '../lib/colors.ts';
import { state, isFill, emit, lsGet, lsSet } from './env.ts';
import { allShapes, fillOf, paintFill, setPaint } from './doc.ts';
import { commit } from './history.ts';
import { createPaletteUI } from '../shared/palette-ui.ts';
import { t } from '../shared/i18n.ts';

// ---- remembered settings ------------------------------------------------------------------------
const PREF_KEYS = ['mode', 'fill', 'stroke', 'strokeWidth', 'palettes', 'paletteName', 'snap', 'link', 'grid', 'gridSize', 'border', 'gapPct',
  'chain', 'sides', 'ngonMode', 'ellipseMode', 'curveType', 'newFill', 'lastRadius', 'lastRot', 'pattern', 'sym', 'layers', 'refOpacity', 'savePhoto', 'onlyUnpainted', 'grout', 'rulers'];
export function savePrefs(): void {
  const o: Record<string, unknown> = {};
  for (const k of PREF_KEYS) o[k] = state[k];
  lsSet('mz-prefs', JSON.stringify(o));
}
export function loadPrefs(): void {
  let o: any;
  try { o = JSON.parse(lsGet('mz-prefs') || '{}'); } catch { return; }
  // settings from the first versions
  if (Array.isArray(o.palette) && !o.palettes) o.palettes = { [t('My palette')]: o.palette };
  if ('ngonFill' in o && !('newFill' in o)) o.newFill = o.ngonFill;
  for (const k of PREF_KEYS) {
    if (!(k in o)) continue;
    if (k === 'layers') for (const n in state.layers) Object.assign(state.layers[n], o.layers[n] || {});
    else if (['pattern', 'sym', 'grout'].includes(k)) Object.assign(state[k], o[k]);
    else state[k] = o[k];
  }
  if (!state.palettes[state.paletteName]) state.paletteName = Object.keys(state.palettes)[0] || t('My palette');
}

// ---- the palette panel ------------------------------------------------------------------------------
function colorCounts(): Map<string, number> {
  const m = new Map<string, number>();
  for (const el of allShapes()) {
    const c = fillOf(el);
    if (c) m.set(c, (m.get(c) || 0) + 1);
  }
  return m;
}
/** Recolors every area painted with `from`; to = null erases them. Returns the number changed. */
export function replaceColor(from: string, to: string | null): number {
  let n = 0;
  for (const el of allShapes()) {
    if (fillOf(el) !== from) continue;
    if (!to && isFill(el)) el.remove(); else paintFill(el, to);
    n++;
  }
  return n;
}
const applyToSelection = () => state.tool === 'select' && state.selection.size > 0;

const ui = createPaletteUI({
  state,
  save: savePrefs,
  counts: colorCounts,
  usage: (n) => t('{n} {n|area|areas}', { n }),
  names: { fill: t('fill'), stroke: t('stroke'), none: t('No color – the bucket erases with it') },
  docColors() {
    const cols: (string | null)[] = [];
    for (const el of allShapes()) {
      cols.push(fillOf(el));
      if (!isFill(el)) cols.push(Colors.norm(getComputedStyle(el).stroke));
    }
    return cols;
  },
  applyFill(c) {
    if (!applyToSelection()) return false;
    for (const el of state.selection) {
      if (isFill(el) && !c) { el.remove(); continue; }
      if (el.tagName !== 'line') paintFill(el, c);
    }
    commit(true);
    return true;
  },
  applyStroke(c) {
    if (!applyToSelection()) return false;
    for (const el of state.selection) if (!isFill(el)) setPaint(el, 'stroke', c);
    commit(true);
    return true;
  },
  recolor(old, c) {
    let n = replaceColor(old, c);
    for (const el of allShapes()) {
      if (!isFill(el) && Colors.norm(getComputedStyle(el).stroke) === old) { setPaint(el, 'stroke', c); n++; }
    }
    if (!n) return null;
    commit(true);
    return t('Recolored {n} {n|element|elements}.', { n });
  },
  // Shift+click is left to add-on modules (the color mix)
  shiftClick: (c, e) => emit('swatch-shift', c, e),
  rendered: () => emit('palette'),
});
export const {
  uniqueName, switchPalette, addPalette, addColors, setFill, setStroke, addFromInput, pasteColors,
  render: renderPalette, renderSelect: renderPaletteSelect, updatePreview: updateColorPreview, bind: bindPalette,
} = ui;
