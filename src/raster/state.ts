/* The raster app's settings, state and events. The palettes are shared with the vector app. */
import type { Pt } from '../lib/geometry.ts';
import type { Box } from '../lib/raster.ts';
import { lsGet, lsSet } from '../shared/ui.ts';
import { DEFAULT_PALETTE, loadSharedPalettes, saveSharedPalettes } from '../shared/palette-ui.ts';
import { t } from '../shared/i18n.ts';

/** Pixels lifted off the image (moved selection) or pasted, not yet placed. */
export interface Floating { canvas: HTMLCanvasElement; x: number; y: number }

export const state = {
  mode: 'simple',
  tool: 'brush',
  fill: '#e76f51' as string | null, stroke: '#222222' as string | null,
  palettes: { [t('My palette')]: [...DEFAULT_PALETTE] } as Record<string, string[]>, paletteName: t('My palette'),
  size: 8, opacity: 1, smooth: true,
  /** a pen paints thinner the lighter it presses */
  pressure: true,
  sides: 6, ngonFill: true, ngonOutline: false,
  tolerance: 24, contiguous: true,
  grid: true,
  /** the real width of the finished mosaic, mm (report, print, 3D) */
  realWidth: 300,
  mosaic: { tile: 16, grout: 2, groutColor: '#b8b2a7', colors: 'palette', count: 12, shape: 'square', detail: 0 },
  view: { x: 0, y: 0, s: 1 },
  /** the rectangle selection (whole pixels), or null */
  sel: null as Box | null,
  floating: null as Floating | null,
  /** the gesture in progress */
  action: null as any,
  /** draws a tool's preview over the image, in image coordinates (px = one screen pixel) */
  preview: null as ((ctx: CanvasRenderingContext2D, px: number) => void) | null,
  /** pointer position over the image, for the brush outline */
  cursor: null as Pt | null,
  space: false,
  get palette(): string[] { return this.palettes[this.paletteName] || (this.palettes[this.paletteName] = []); },
  set palette(v: string[]) { this.palettes[this.paletteName] = v; },
};

/** Things tracked while running (not saved as settings). */
export const rt = {
  dirty: false,
  fileName: 'mosaic.png',
  fileHandle: null as any,
};

// ---- remembered settings ---------------------------------------------------------------------------
const KEY = 'mz-raster-prefs';
const PREF_KEYS = ['mode', 'tool', 'fill', 'stroke', 'size', 'opacity', 'smooth', 'pressure', 'sides', 'ngonFill', 'ngonOutline', 'tolerance', 'contiguous', 'grid', 'mosaic', 'realWidth'];
export function savePrefs(): void {
  const o: Record<string, unknown> = {};
  for (const k of PREF_KEYS) o[k] = state[k];
  lsSet(KEY, JSON.stringify(o));
  saveSharedPalettes(state);
}
export function loadPrefs(): void {
  let o: any = {};
  try { o = JSON.parse(lsGet(KEY) || '{}'); } catch { /* ignore */ }
  for (const k of PREF_KEYS) {
    if (!(k in o)) continue;
    if (k === 'mosaic') {
      // settings from before tile shapes: "offset rows" was a checkbox
      if (o.mosaic.bricks && !o.mosaic.shape) o.mosaic.shape = 'offset';
      delete o.mosaic.bricks;
      Object.assign(state.mosaic, o.mosaic);
    } else state[k] = o[k];
  }
  loadSharedPalettes(state);
  if (!state.palettes[state.paletteName]) state.paletteName = Object.keys(state.palettes)[0] || t('My palette');
}

// ---- events between modules -------------------------------------------------------------------------
const hooks: Record<string, ((...a: any[]) => void)[]> = {};
export const on = (name: string, fn: (...a: any[]) => void): void => { (hooks[name] || (hooks[name] = [])).push(fn); };
export const emit = (name: string, ...args: any[]): void => (hooks[name] || []).forEach(fn => { try { fn(...args); } catch (e) { console.error(e); } });
