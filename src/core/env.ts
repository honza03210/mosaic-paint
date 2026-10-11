/* The editor's foundation: page elements, constants, shared state, events and small helpers.
   Imports nothing from the rest of the editor, so every other module can use it. */
import type { Pt } from '../lib/geometry.ts';

export const SVGNS = 'http://www.w3.org/2000/svg';
// DOM lookups are typed loosely: the page's markup is the contract
export const $ = (s: string): any => document.querySelector(s);
export const $$ = (s: string): any[] => [...document.querySelectorAll(s)];

// ---- page elements ------------------------------------------------------------------------
export const svg = $('#canvas') as SVGSVGElement, overlaySvg = $('#overlay') as SVGSVGElement, stage = $('#stage') as HTMLElement;
export const docG = $('#mz-doc') as SVGGElement, defsG = $('#mz-docdefs') as SVGDefsElement;
export const fillsG = $('#mz-fills') as SVGGElement, shapesG = $('#mz-shapes') as SVGGElement, refG = $('#mz-ref') as SVGGElement;
export const selG = $('#mz-sel') as SVGGElement, previewG = $('#mz-preview') as SVGGElement, snapG = $('#mz-snapmark') as SVGGElement;
export const guidesG = $('#mz-guides') as SVGGElement, flashG = $('#mz-flash') as SVGGElement;
export const pageRect = $('#mz-page'), gridRect = $('#mz-gridrect'), gridPattern = $('#mz-grid'), gridPath = $('#mz-gridpath');

// ---- constants ----------------------------------------------------------------------------
export const EDITABLE = new Set(['line', 'polyline', 'polygon']);
export const SHAPE_SEL = 'line,polyline,polygon,rect,circle,ellipse,path';
export const DEFAULT_PALETTE = ['#264653', '#2a9d8f', '#8ab17d', '#e9c46a', '#f4a261', '#e76f51', '#f1faee', '#a8dadc', '#457b9d', '#1d3557'];
export const EXPERT_TOOLS = new Set(['knife']);
export const VERSION_EVERY_MS = 3 * 60 * 1000, MAX_VERSIONS = 40;

// ---- state --------------------------------------------------------------------------------
export interface Layer { visible: boolean; locked: boolean }
export interface Doc { x: number; y: number; w: number; h: number; bg: string | null; unit: string }
export interface Handle { el: Element; idx: number; x: number; y: number }

/** Settings and the document; the PREF_KEYS part is remembered between visits. */
export const state = {
  mode: 'simple',
  tool: 'select',
  fill: '#e9c46a' as string | null, stroke: '#222222' as string | null, strokeWidth: 2,
  palettes: { 'My palette': [...DEFAULT_PALETTE] } as Record<string, string[]>, paletteName: 'My palette',
  snap: true, link: true, grid: false, gridSize: 10, border: true, gapPct: 0.4,
  chain: false, sides: 6, ngonMode: 'center', newFill: false,
  lastRadius: 20, lastRot: -90,
  pattern: { type: 'square', size: 10, angle: 0, rows: 0 },
  sym: { type: 'none', n: 8, mirror: false, cx: null as number | null, cy: null as number | null },
  layers: { ref: { visible: true, locked: true }, fills: { visible: true, locked: false }, shapes: { visible: true, locked: false } } as Record<string, Layer>,
  refOpacity: 0.5, savePhoto: true, onlyUnpainted: true,
  grout: { on: false, color: '#b8b2a7', width: 2 },
  rulers: true,
  doc: { x: 0, y: 0, w: 300, h: 300, bg: '#ffffff', unit: 'mm' } as Doc,
  view: { x: 0, y: 0, s: 1 },
  selection: new Set<Element>(),
  handles: [] as Handle[],
  lineStart: null as Pt | null,
  freePts: null as Pt[] | null,
  action: null as any,
  space: false,
  pickCenter: false,
  /** The colors of the current palette. */
  get palette(): string[] { return this.palettes[this.paletteName] || (this.palettes[this.paletteName] = []); },
  set palette(v: string[]) { this.palettes[this.paletteName] = v; },
};
export type State = typeof state;

/** Things the editor keeps track of while running (not saved as settings). */
export const rt = {
  dirty: false,
  fileName: 'mosaic.svg',
  fileHandle: null as any,
  /** Pointer tolerances in screen pixels; bigger on touch screens. */
  snapPx: 10, handlePx: 9, hitPx: 6,
};

// ---- events between modules -----------------------------------------------------------------
const hooks: Record<string, ((...a: any[]) => any)[]> = {};
export const on = (name: string, fn: (...a: any[]) => any): void => { (hooks[name] || (hooks[name] = [])).push(fn); };
export const emit = (name: string, ...args: any[]): void => (hooks[name] || []).forEach(fn => { try { fn(...args); } catch (e) { console.error(e); } });
/** Handlers of a hook (for hooks that pass a value along or can claim an event). */
export const handlers = (name: string) => hooks[name] || [];

// ---- small utilities ----------------------------------------------------------------------
export const fmt = (n: number): string => String(Math.round(n * 1000) / 1000);
export const clamp = (v: number, a: number, b: number): number => Math.max(a, Math.min(b, v));
/** Screen pixels → document units. */
export const px = (n: number): number => n / state.view.s;
export const applyM = (m: DOMMatrixReadOnly, p: Pt): Pt => ({ x: m.a * p.x + m.c * p.y + m.e, y: m.b * p.x + m.d * p.y + m.f });
export const linM = (m: DOMMatrixReadOnly, d: Pt): Pt => ({ x: m.a * d.x + m.c * d.y, y: m.b * d.x + m.d * d.y });
export const ptsStr = (pts: Pt[]): string => pts.map(p => fmt(p.x) + ',' + fmt(p.y)).join(' ');
export const isFill = (el: Element): boolean => el.classList.contains('mz-fill');
const NUM_RE = /[-+]?(?:\d*\.\d+|\d+\.?)(?:e[-+]?\d+)?/gi;

export function mk(tag: string, attrs: Record<string, any> = {}, parent?: Element): any {
  const e = document.createElementNS(SVGNS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
}
export function parsePoints(s: string | null): Pt[] {
  const n = (s || '').match(NUM_RE) || [];
  const out: Pt[] = [];
  for (let i = 0; i + 1 < n.length; i += 2) out.push({ x: +n[i], y: +n[i + 1] });
  return out;
}
let toastTimer: any;
export function toast(msg: string): void {
  const t = $('#st-msg');
  t.textContent = msg;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.textContent = ''; }, 5000);
}
export function lsGet(k: string): string | null { try { return localStorage.getItem(k); } catch { return null; } }
export function lsSet(k: string, v: string): boolean { try { localStorage.setItem(k, v); return true; } catch { return false; } }
export function download(blob: Blob, name: string): void {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  // Safari needs the link (and its URL) for a while after the click
  setTimeout(() => { a.remove(); URL.revokeObjectURL(a.href); }, 30000);
}
/** Is the user typing in a field? (Checkboxes, sliders and buttons don't take keys, so shortcuts still work there.) */
export function typingIn(t: any): boolean {
  if (!t) return false;
  if (t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable) return true;
  return t.tagName === 'INPUT' && !['checkbox', 'radio', 'range', 'color', 'button', 'file'].includes(t.type);
}

// ---- units ----------------------------------------------------------------------------------
export const unit = (): string => state.doc.unit || 'px';
export function fmtLen(v: number): string {
  const u = unit();
  return `${(+v).toFixed(u === 'cm' || u === 'in' ? 2 : 1)} ${u}`;
}
export function fmtArea(a: number): string {
  const u = unit();
  if (u === 'mm') return a >= 100 ? `${(a / 100).toFixed(1)} cm²` : `${a.toFixed(0)} mm²`;
  if (u === 'cm') return `${a.toFixed(1)} cm²`;
  if (u === 'in') return `${a.toFixed(2)} in²`;
  return `${Math.round(a)} px²`;
}
