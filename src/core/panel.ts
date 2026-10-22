/* Wires the side panel and toolbar controls to the editor. */
import * as Patterns from '../lib/patterns.ts';
import * as Curves from '../lib/curves.ts';
import { curveNote } from '../shared/curve-notes.ts';
import { $, $$, state, isFill, fmt, clamp, emit, toast, unit } from './env.ts';
import { ngonData, setNgon } from './doc.ts';
import { applyDoc, applyLayers, fitView, zoomCenter, drawGuides } from './view.ts';
import { deleteSel, duplicate, toFront, toBack, invertSelection } from './selection.ts';
import { gapTol, commitGeometry } from './areas.ts';
import { commit, undo, redo, docChanged } from './history.ts';
import { savePrefs, bindPalette } from './palette.ts';
import { applyGrout, bakeGrout } from './grout.ts';
import { refImage, loadPhoto, setPhoto, fitPhoto, setPhotoSize } from './photo.ts';
import { newDoc, openFile, loadFile, save, exportPNG, setMode } from './files.ts';
import { setTool, cancelPending, finishFree, freeBack, applyPattern } from './tools.ts';
import { setHand, newSeed, renderHand, HAND_AMOUNT } from './handlaid.ts';
import { t } from '../shared/i18n.ts';
import { askYes } from '../shared/dialogs.ts';

export function setSides(n: number): void {
  state.sides = clamp(Math.round(n) || 6, 3, 64);
  $('#opt-sides').value = state.sides;
  for (const b of $$('#quick-sides button')) b.classList.toggle('active', +b.dataset.sides === state.sides);
  savePrefs();
}
function bindCheck(id: string, key: string, after?: () => void): void {
  const i = $(id);
  i.checked = !!state[key];
  i.onchange = () => { state[key] = i.checked; savePrefs(); if (after) after(); };
}
function bindNumber(id: string, get: () => number, set: (v: number) => boolean | void): void {
  const i = $(id);
  i.value = get();
  i.onchange = () => { const v = parseFloat(i.value); if (Number.isFinite(v) && set(v) !== false) savePrefs(); i.value = get(); };
}

export function bindPanel(): void {
  for (const b of $$('#tools button[data-tool]')) b.onclick = () => setTool(b.dataset.tool);
  // hand-laid lines: the Shards button, and its panel section (each change an undo step)
  const handToggle = () => { setHand(state.doc.hand ? null : { seed: newSeed(), amount: state.doc.hand?.amount ?? HAND_AMOUNT }); commit(); };
  $('#btn-hand').onclick = handToggle;
  $('#hand-on').onchange = handToggle;
  $('#hand-shuffle').onclick = () => { if (state.doc.hand) { setHand({ ...state.doc.hand, seed: newSeed() }); commit(); } };
  $('#hand-amount').onchange = () => { if (state.doc.hand) { setHand({ ...state.doc.hand, amount: +$('#hand-amount').value / 100 }); commit(); } };
  renderHand();
  for (const b of $$('#mode-switch button')) b.onclick = () => setMode(b.dataset.mode);
  $('#btn-new').onclick = newDoc;
  $('#btn-open').onclick = openFile;
  // read the file before resetting the input (resetting first can make the file unreadable)
  $('#file-input').onchange = async (e: any) => { await loadFile(e.target.files[0]); e.target.value = ''; };
  $('#btn-save').onclick = () => save(false);
  $('#btn-saveas').onclick = () => save(true);
  $('#btn-png').onclick = exportPNG;
  $('#btn-undo').onclick = undo;
  $('#btn-redo').onclick = redo;
  $('#btn-fit').onclick = fitView;
  $('#btn-zoomin').onclick = () => zoomCenter(1.25);
  $('#btn-zoomout').onclick = () => zoomCenter(0.8);
  $('#sa-finish').onclick = () => { if (state.freePts) finishFree(); else cancelPending(); };
  $('#sa-back').onclick = freeBack;
  $('#sa-cancel').onclick = cancelPending;

  // colors & palettes (the shared palette panel)
  bindPalette();
  bindNumber('#stroke-width', () => state.strokeWidth, (v) => { if (v < 0) return false; state.strokeWidth = v; });

  // tool options
  bindCheck('#opt-chain', 'chain', () => { if (!state.chain) cancelPending(); });
  const sides = $('#opt-sides');
  sides.onchange = () => setSides(+sides.value);
  for (const b of $$('#quick-sides button')) b.onclick = () => setSides(+b.dataset.sides);
  setSides(state.sides);
  for (const r of $$('input[name=ngmode]')) {
    r.checked = r.value === state.ngonMode;
    r.onchange = () => { if (r.checked) { state.ngonMode = r.value; savePrefs(); } };
  }
  // "Fill new shapes" is in each shape tool's options: one setting
  const newFills = $$('.opt-newfill');
  for (const c of newFills) {
    c.checked = state.newFill;
    c.onchange = () => { state.newFill = c.checked; for (const o of newFills) o.checked = c.checked; savePrefs(); };
  }
  for (const r of $$('input[name=elmode]')) {
    r.checked = r.value === state.ellipseMode;
    r.onchange = () => { if (r.checked) { state.ellipseMode = r.value; savePrefs(); } };
  }
  const ct = $('#opt-curve-type');
  if (!Curves.SPLINE_TYPES.includes(state.curveType)) state.curveType = 'catmull';
  ct.value = state.curveType;
  const showCurveNote = () => { $('#curve-note').textContent = curveNote(state.curveType); };
  ct.onchange = () => { state.curveType = ct.value; savePrefs(); showCurveNote(); if (state.freePts) cancelPending(); };
  showCurveNote();
  const pt = $('#pat-type');
  for (const [v, label] of Patterns.TYPES) { const o = document.createElement('option'); o.value = v; o.textContent = t(label); pt.append(o); }
  pt.value = state.pattern.type;
  const patUI = () => { $('#pat-rows-row').hidden = state.pattern.type !== 'rows'; $('#pat-angle-row').hidden = state.pattern.type === 'rows'; };
  pt.onchange = () => { state.pattern.type = pt.value; savePrefs(); patUI(); };
  patUI();
  bindNumber('#pat-rows', () => state.pattern.rows || 0, (v) => { state.pattern.rows = Math.max(0, Math.round(v)); });
  bindNumber('#pat-size', () => state.pattern.size, (v) => { if (!(v > 0)) return false; state.pattern.size = v; });
  bindNumber('#pat-angle', () => state.pattern.angle, (v) => { state.pattern.angle = v; });
  $('#btn-pat-page').onclick = () => applyPattern(null);
  // Simple mode: the tile size as small / medium / big – so many tiles across the page's shorter side
  const sizes = () => {
    for (const b of $$('#pat-sizes button')) b.classList.toggle('active', Math.abs(state.pattern.size - tileSize(+b.dataset.tiles)) < 1e-6);
  };
  const tileSize = (n: number) => +(Math.min(state.doc.w, state.doc.h) / n).toPrecision(3);
  for (const b of $$('#pat-sizes button')) b.onclick = () => { state.pattern.size = tileSize(+b.dataset.tiles); $('#pat-size').value = state.pattern.size; savePrefs(); sizes(); };
  sizes();

  // snapping & gaps
  bindCheck('#opt-snap', 'snap');
  bindCheck('#opt-link', 'link');
  bindCheck('#opt-border', 'border');
  bindCheck('#opt-grid', 'grid', applyDoc);
  bindNumber('#opt-gridsize', () => state.gridSize, (v) => { if (!(v > 0)) return false; state.gridSize = v; applyDoc(); });
  $('#opt-gap').onchange = () => {
    const v = parseFloat($('#opt-gap').value);
    if (v >= 0) { state.gapPct = v / Math.max(state.doc.w, state.doc.h) * 100; savePrefs(); }
    $('#opt-gap').value = fmt(gapTol());
  };

  // symmetry
  const st = $('#sym-type');
  st.value = state.sym.type;
  const symUI = () => { $('#sym-radial').hidden = state.sym.type !== 'radial'; drawGuides(); savePrefs(); };
  st.onchange = () => { state.sym.type = st.value; symUI(); };
  bindNumber('#sym-n', () => state.sym.n, (v) => { state.sym.n = clamp(Math.round(v), 2, 64); drawGuides(); });
  $('#sym-mirror').checked = state.sym.mirror;
  $('#sym-mirror').onchange = () => { state.sym.mirror = $('#sym-mirror').checked; symUI(); };
  $('#btn-sym-center').onclick = () => {
    state.pickCenter = !state.pickCenter;
    $('#btn-sym-center').classList.toggle('active', state.pickCenter);
    if (state.pickCenter) toast(t('Click on the canvas to place the symmetry center.'));
  };
  $('#btn-sym-reset').onclick = () => { state.sym.cx = state.sym.cy = null; savePrefs(); drawGuides(); };
  symUI();

  // layers
  for (const b of $$('[data-layer]')) b.onclick = () => {
    const L = state.layers[b.dataset.layer], k = b.dataset.prop;
    L[k] = !L[k];
    savePrefs();
    applyLayers();
  };

  // reference photo
  $('#btn-ref-load').onclick = () => $('#ref-file').click();
  $('#ref-file').onchange = async (e: any) => { const f = e.target.files[0]; if (f) await loadPhoto(f); e.target.value = ''; };
  $('#ref-opacity').oninput = (e: any) => {
    state.refOpacity = +e.target.value / 100;
    const im = refImage();
    if (im) im.style.opacity = String(state.refOpacity);
  };
  $('#ref-opacity').onchange = () => { savePrefs(); docChanged(); };
  $('#ref-show').onchange = (e: any) => { state.layers.ref.visible = e.target.checked; savePrefs(); applyLayers(); };
  $('#ref-lock').onchange = (e: any) => {
    state.layers.ref.locked = e.target.checked;
    savePrefs();
    applyLayers();
    if (!e.target.checked) toast(t('Photo unlocked: drag it with the Select tool (where there are no shapes).'));
  };
  $('#ref-size').onchange = (e: any) => setPhotoSize(clamp(+e.target.value || 100, 5, 1000));
  $('#btn-ref-fit').onclick = () => { fitPhoto(); docChanged(); };
  $('#btn-ref-remove').onclick = async () => { if (await askYes(state.mode === 'simple' ? t('Remove the picture?') : t('Remove the tracing photo?'))) { setPhoto(null); docChanged(); } };
  bindCheck('#ref-save', 'savePhoto', docChanged);
  bindCheck('#opt-unpainted', 'onlyUnpainted');

  // grout
  const g = state.grout;
  $('#grout-on').checked = g.on;
  $('#grout-on').onchange = (e: any) => { g.on = e.target.checked; applyGrout(); savePrefs(); };
  $('#grout-color').value = g.color;
  $('#grout-color').oninput = (e: any) => { g.color = e.target.value; applyGrout(); };
  $('#grout-color').onchange = savePrefs;
  bindNumber('#grout-width', () => g.width, (v) => { if (v < 0) return false; g.width = v; applyGrout(); });
  $('#btn-grout-bake').onclick = bakeGrout;

  // selection
  const ngonInput = () => {
    const el = [...state.selection][0], gd = ngonData(el);
    if (!gd) return;
    const n = clamp(Math.round(+$('#sel-sides').value) || gd.n, 3, 64);
    const r = +$('#sel-radius').value > 0 ? +$('#sel-radius').value : gd.r;
    const rot = Number.isFinite(+$('#sel-rot').value) ? +$('#sel-rot').value : gd.rot;
    setNgon(el, { ...gd, n, r, rot });
    commitGeometry();
  };
  for (const id of ['#sel-sides', '#sel-radius', '#sel-rot']) $(id).onchange = ngonInput;
  $('#sel-sw').onchange = () => {
    const v = parseFloat($('#sel-sw').value);
    if (!(v >= 0)) return;
    for (const el of state.selection) {
      if (isFill(el)) continue;
      el.setAttribute('stroke-width', String(v));
      (el as SVGElement).style.removeProperty('stroke-width');
    }
    commit();
  };
  $('#btn-del').onclick = deleteSel;
  $('#btn-dup').onclick = duplicate;
  $('#btn-front').onclick = toFront;
  $('#btn-sel-invert').onclick = invertSelection;
  $('#btn-back').onclick = toBack;

  // page
  $('#btn-doc-size').onclick = () => {
    const w = parseFloat($('#doc-w').value), h = parseFloat($('#doc-h').value);
    if (!(w > 0 && h > 0)) { toast(t('Invalid page size.')); return; }
    state.doc.w = w;
    state.doc.h = h;
    applyDoc();
    commitGeometry();
    fitView();
  };
  $('#doc-unit').onchange = (e: any) => {
    state.doc.unit = e.target.value;
    applyDoc();
    commit();
    toast(t('1 drawing unit = 1 {unit}. Set the page size to the real size of your mosaic.', { unit: unit() }));
  };
  $('#doc-bg').onchange = () => { state.doc.bg = $('#doc-bg').value; applyDoc(); commit(); };
  $('#doc-bg-none').onchange = () => { state.doc.bg = $('#doc-bg-none').checked ? null : $('#doc-bg').value; applyDoc(); commit(); };
  bindCheck('#opt-rulers', 'rulers', () => emit('view'));
}
