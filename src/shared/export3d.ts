/* "3D print" dialog shared by both apps: the mosaic as a 3D model where every color stands at its own
   height, so any single-nozzle printer prints it in color by swapping filament at a few layers. The 3MF
   file carries those filament changes for PrusaSlicer; for other slicers the plan lists them to enter by hand.
   Grout colors are always printed first (lowest), and pieces that would print as thin towers are lowered.
   The app (host) renders its picture and says which colors it uses. */
import * as Colors from '../lib/colors.ts';
import * as R from '../lib/raster.ts';
import * as M from '../lib/model3d.ts';
import { zip } from '../lib/zip.ts';
import { $, clamp, toast, download, lsGet, lsSet } from './ui.ts';
import { t, num } from './i18n.ts';
import { createView3D, type View3D } from './view3d.ts';

export interface Export3DHost {
  /** width / height of the picture */
  aspect(): number;
  /** its real size in mm, if the app knows it (the vector app's page) */
  realSize(): { w: number; h: number } | null;
  /** the picture at exactly w × h pixels; transparent where nothing is painted */
  render(w: number, h: number): Promise<HTMLCanvasElement>;
  /**
   * The colors the picture is made of (every pixel is snapped to one of them). `lines`: colors of lines /
   * grout, always printed first so the grout sits lowest and the tiles stand out of it.
   */
  colors(): { colors: string[]; lines?: string[]; note?: string };
  fileName(): string;
}

const MAX_CELLS = 4e6, MANY_COLORS = 16;
/** a raised part may be at most this many times as tall (above what is around it) as it is wide */
const MAX_RATIO = 2;
const opts = { width: 150, detail: 0.4, layerHeight: 0.2, layersPerColor: 3, baseLayers: 3, minWidth: 1.2 };
try { Object.assign(opts, JSON.parse(lsGet('mz-3d') || '{}')); } catch { /* ignore */ }
const saveOpts = () => lsSet('mz-3d', JSON.stringify(opts));
const f2 = (v: number) => String(+v.toFixed(2));

const DIALOG = `
<form method="dialog" class="dlg-head"><h2>${t('3D print')}</h2><button title="${t('Close')}">✕</button></form>
<p class="note">${t('A model where every color stands at its own height. Print it with one nozzle and change the filament at the layers listed below – each tile’s top then shows its color. The 3MF file already contains the filament changes for PrusaSlicer; for other slicers, the plan lists them.')}</p>
<div class="row">
  <label>${t('Size')} <input id="m3-w" type="number" min="5" max="2000" step="1"> × <input id="m3-h" type="number" min="5" max="2000" step="1"> mm</label>
  <label title="${t('Size of the model’s smallest step – about your nozzle width')}">${t('Detail')} <input id="m3-detail" type="number" min="0.1" max="5" step="0.05"> mm</label>
  <label title="${t('Raised parts narrower than this – or more than twice as tall as they are wide – are lowered to what is around them, so nothing prints as a thin tower')}">${t('Thinnest part')} <input id="m3-min" type="number" min="0" max="20" step="0.1"> mm</label>
</div>
<div class="row">
  <label>${t('Layer height')} <input id="m3-lh" type="number" min="0.04" max="1" step="0.04"> mm</label>
  <label title="${t('How many layers each color gets – more layers cover the color below better')}">${t('Layers per color')} <input id="m3-lpc" type="number" min="1" max="50" step="1"></label>
  <label title="${t('A plate under everything, printed in the first color. 0: unpainted parts are left open')}">${t('Base layers')} <input id="m3-base" type="number" min="0" max="50" step="1"></label>
</div>
<p class="note warn" id="m3-note" hidden></p>
<div class="m3-body">
  <div class="m3-view">
    <div class="seg-btns m3-tabs"><button id="m3-tab-top" class="active">${t('Top view')}</button><button id="m3-tab-3d">3D</button></div>
    <canvas id="m3-preview" title="${t('Top view of the model')}"></canvas>
    <canvas id="m3-3d" title="${t('Drag to turn · wheel or two fingers to zoom · double-click to reset')}" hidden></canvas>
    <label class="grow" id="m3-zrow" hidden title="${t('Shows the heights taller than they are, to see the color bands')}">${t('Heights ×')} <input id="m3-z" type="range" min="1" max="10" value="3"></label>
  </div>
  <div class="m3-side">
    <div class="row small"><span class="note">${t('Print order (bottom first):')}</span>
      <button id="m3-light" title="${t('Lighter colors lower: a darker layer covers a lighter one well. Lines (grout) stay at the bottom')}">${t('Light → dark')}</button>
      <button id="m3-dark">${t('Dark → light')}</button>
    </div>
    <div id="m3-order"></div>
    <p class="note">${t('Grout colors are always printed first, so the lines between the tiles stay low.')}</p>
  </div>
</div>
<p class="note" id="m3-summary"></p>
<div class="row dlg-foot">
  <button id="m3-plan" title="${t('Which filament to load at which layer, as a text file')}">${t('Plan')}</button>
  <button id="m3-stl" title="${t('Just the shape – add the filament changes from the plan in your slicer')}">STL</button>
  <button id="m3-go" class="primary" title="${t('The model, with the filament changes for PrusaSlicer')}">${t('Download 3MF')}</button>
</div>`;

interface Model { list: number[]; grid: Int16Array; counts: number[]; lowered: number }

export function initExport3D(host: Export3DHost, button: HTMLElement): void {
  const dlg = document.createElement('dialog');
  dlg.id = 'dlg-3d';
  dlg.innerHTML = DIALOG;
  document.body.append(dlg);
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });

  // the analysed picture: a grid of color indexes, and the print order (indexes into `colors`)
  let colors: string[] = [], counts: number[] = [], grid: Int16Array | null = null, gw = 0, gh = 0, cell = opts.detail;
  let order: number[] = [], note = '', lines = new Set<string>(), version = 0;
  /** grout choices made in the dialog win over what the app suggests */
  const groutChoice = new Map<string, boolean>();
  const isLine = (ci: number) => lines.has(colors[ci]);
  const settings = (): M.PrintSettings => ({ layerHeight: opts.layerHeight, layersPerColor: opts.layersPerColor, baseLayers: opts.baseLayers });
  const size = () => {
    const a = host.aspect();
    return { w: opts.width, h: opts.width / a };
  };
  /** Grout first, always: the lines between the tiles stay the lowest part. */
  const normalize = () => { order = [...order.filter(isLine), ...order.filter(ci => !isLine(ci))]; };

  /**
   * The model as it will be printed: colors in print order (those that still have pieces), and the grid of
   * levels after thin towers were lowered. Lowering can empty a color, which moves the ones above it down:
   * so this repeats until it settles.
   */
  let cached: Model | null = null, cachedKey = '';
  function model(): Model {
    const key = [version, order.join(), opts.layerHeight, opts.layersPerColor, opts.baseLayers, opts.minWidth, cell].join('|');
    if (cached && key === cachedKey) return cached;
    let list = order.filter(i => counts[i] > 0), out: Model = { list, grid: new Int16Array(0), counts: [], lowered: 0 };
    // the picture as color indexes, with each round's lowering kept for the next
    const colorGrid = Int16Array.from(grid);
    let lowered = 0;
    for (let round = 0; round < 4; round++) {
      const rank = new Int16Array(colors.length).fill(-1);
      list.forEach((ci, k) => { rank[ci] = k; });
      const levels = colorGrid.map(v => (v < 0 ? -1 : rank[v]));
      const res = M.removeTowers(levels, gw, gh, cell, settings(), { minWidth: opts.minWidth, maxRatio: MAX_RATIO });
      lowered += res.lowered;
      const c = list.map(() => 0);
      for (let p = 0; p < res.grid.length; p++) {
        const lv = res.grid[p];
        if (lv >= 0) c[lv]++;
        colorGrid[p] = lv < 0 ? -1 : list[lv];
      }
      out = { list, grid: res.grid, counts: c, lowered };
      if (c.every(n => n > 0)) break;
      list = list.filter((_, k) => c[k] > 0);
    }
    cached = out;
    cachedKey = key;
    return out;
  }

  /** Grout first, then the others by brightness. */
  const byBrightness = (lightFirst: boolean) => (a: number, b: number) =>
    (+isLine(b) - +isLine(a)) || (Colors.luminance(colors[b]) - Colors.luminance(colors[a])) * (lightFirst ? 1 : -1);
  function sortBy(lightFirst: boolean): void {
    order.sort(byBrightness(lightFirst));
    render();
  }
  async function analyse(): Promise<void> {
    const { w, h } = size();
    cell = opts.detail;
    // keep the grid to a size the browser handles quickly
    if ((w / cell) * (h / cell) > MAX_CELLS) cell = Math.sqrt((w * h) / MAX_CELLS);
    gw = Math.max(1, Math.round(w / cell));
    gh = Math.max(1, Math.round(h / cell));
    const c = await host.render(gw, gh);
    const img = c.getContext('2d').getImageData(0, 0, gw, gh);
    const cs = host.colors();
    const prev = order.map(i => colors[i]);
    colors = cs.colors;
    note = cs.note || '';
    lines = new Set(cs.lines || []);
    for (const [col, on] of groutChoice) { if (on) lines.add(col); else lines.delete(col); }
    ({ grid, counts } = R.classify(img, colors));
    version++;
    // keep the order the user chose for colors that are still there; new ones go by brightness
    const known = prev.filter(c => colors.includes(c)).map(c => colors.indexOf(c));
    const fresh = colors.map((_, i) => i).filter(i => !known.includes(i)).sort(byBrightness(true));
    order = [...known, ...fresh];
    normalize();
    render();
  }
  const rows = new Map<string, HTMLElement>();
  /** Moves a color one step earlier (-1) or later (+1) in the print order – grout stays below the tiles. */
  function move(c: string, d: number): void {
    const list = model().list, k = list.findIndex(ci => colors[ci] === c), other = list[k + d];
    if (k < 0 || other == null || isLine(other) !== isLine(list[k])) return;
    const a = order.indexOf(list[k]), b = order.indexOf(other);
    [order[a], order[b]] = [order[b], order[a]];
    render();
  }
  function toggleGrout(c: string): void {
    const on = !lines.has(c);
    groutChoice.set(c, on);
    if (on) lines.add(c); else lines.delete(c);
    normalize();
    render();
  }
  function render(): void {
    const s = settings(), m = model(), list = m.list, { w, h } = size();
    $('#m3-w').value = f2(w);
    $('#m3-h').value = f2(h);
    const warn = [note, list.length > MANY_COLORS ? t('{n} colors make a tall print with many filament changes – reduce the colors first (Raster: “Reduce to palette”).', { n: list.length }) : '',
      cell > opts.detail + 1e-9 ? t('Detail lowered to {d} mm for this size.', { d: num(+f2(cell)) }) : ''].filter(Boolean).join(' ');
    $('#m3-note').hidden = !warn;
    $('#m3-note').textContent = warn;
    // the print order, with the layers of each color
    const plan = M.colorPlan(list.map(i => colors[i]), s), total = gw * gh || 1, box = $('#m3-order') as HTMLElement;
    // rows are kept and updated in place: a click on ↑ / ↓ survives a redraw caused by leaving a number field
    const keep = new Set(list.map(ci => colors[ci]));
    for (const [c, el] of rows) if (!keep.has(c)) { el.remove(); rows.delete(c); }
    list.forEach((ci, k) => {
      const c = colors[ci], p = plan[k];
      let row = rows.get(c);
      if (!row) {
        row = document.createElement('div');
        row.className = 'm3-row';
        row.innerHTML = `<span class="mini" style="background:${c}"></span><code>${c}</code>`
          + `<button class="tag" title="${t('Grout / lines: always printed first, so they stay low')}">${t('grout')}</button><span class="note"></span>`
          + `<button title="${t('Print earlier (lower)')}">↑</button><button title="${t('Print later (higher)')}">↓</button>`;
        const [tag, up, down] = row.querySelectorAll('button');
        tag.onclick = () => toggleGrout(c);
        up.onclick = () => move(c, -1);
        down.onclick = () => move(c, 1);
        rows.set(c, row);
      }
      const share = num(Math.max(0.1, +(m.counts[k] / total * 100).toFixed(1)));
      row.querySelector('.note').textContent = p.z == null
        ? t('{share} % · layers {from}–{to}', { share, from: p.fromLayer, to: p.toLayer })
        : t('{share} % · layers {from}–{to} · change at Z {z}', { share, from: p.fromLayer, to: p.toLayer, z: num(p.z, 2) });
      const [tag, up, down] = row.querySelectorAll('button');
      tag.classList.toggle('on', isLine(ci));
      up.disabled = k === 0 || isLine(list[k - 1]) !== isLine(ci);
      down.disabled = k === list.length - 1 || isLine(list[k + 1]) !== isLine(ci);
      if (box.children[k] !== row) box.insertBefore(row, box.children[k] || null);
    });
    const unpainted = grid ? grid.filter(v => v < 0).length : 0;
    $('#m3-summary').textContent = list.length
      ? t('{n} {n|color|colors} · height {h} mm ({layers} {layers|layer|layers}) · {c} filament {c|change|changes}', { n: list.length, h: num(M.modelHeight(list.length, s)), layers: M.topLayer(list.length - 1, s), c: list.length - 1 })
        + (unpainted ? ' · ' + (opts.baseLayers ? t('unpainted parts stay at the base ({h} mm)', { h: num(+f2(opts.baseLayers * opts.layerHeight)) }) : t('unpainted parts are left open')) : '')
        + (m.lowered ? ' · ' + t('{n} thin {n|piece|pieces} lowered so nothing prints as a thin tower', { n: m.lowered }) : '')
      : t('Nothing is painted yet.');
    $('#m3-go').disabled = $('#m3-stl').disabled = $('#m3-plan').disabled = !list.length;
    drawPreview(m);
    if (view) schedule3d();
  }

  // ---- the 3D view ----------------------------------------------------------------------------
  let view: View3D | null = null, timer3d: any;
  const schedule3d = () => { clearTimeout(timer3d); timer3d = setTimeout(update3d, 120); };
  /** The model in the 3D view (very big ones thinned out, for the view only). */
  function update3d(): void {
    if (!view || $('#m3-3d').hidden || !grid) return;
    const m = model(), f = Math.max(1, Math.ceil(Math.sqrt(gw * gh / 160000)));
    let g = m.grid, w = gw, h = gh;
    if (f > 1) {
      w = Math.ceil(gw / f); h = Math.ceil(gh / f);
      g = new Int16Array(w * h);
      for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) g[y * w + x] = m.grid[Math.min(gh - 1, y * f) * gw + Math.min(gw - 1, x * f)];
    }
    const rgb = m.list.map(ci => R.rgba(colors[ci]).slice(0, 3) as [number, number, number]);
    view.show(M.closedMesh(g, w, h, cell * f, settings()), (lv) => rgb[Math.max(0, lv)] || [200, 200, 200]);
  }
  function showTab(three: boolean): void {
    if (three && !view) {
      view = createView3D($('#m3-3d'));
      if (!view) { toast(t('This browser can’t show 3D (WebGL is off).')); return; }
      view.setExaggeration(+$('#m3-z').value);
    }
    $('#m3-3d').hidden = !three;
    $('#m3-zrow').hidden = !three;
    $('#m3-preview').hidden = three;
    $('#m3-tab-3d').classList.toggle('active', three);
    $('#m3-tab-top').classList.toggle('active', !three);
    if (three) update3d();
  }
  /** The top view of the model as it will print (after thin towers were lowered). */
  function drawPreview(m: Model): void {
    const cv = $('#m3-preview') as HTMLCanvasElement;
    if (!grid) return;
    const k = Math.min(1, 300 / Math.max(gw, gh));
    cv.width = Math.max(1, Math.round(gw * k));
    cv.height = Math.max(1, Math.round(gh * k));
    const small = document.createElement('canvas');
    small.width = gw;
    small.height = gh;
    const sx = small.getContext('2d'), im = sx.createImageData(gw, gh), rgb = m.list.map(ci => R.rgba(colors[ci]));
    for (let p = 0; p < m.grid.length; p++) if (m.grid[p] >= 0) im.data.set(rgb[m.grid[p]], p * 4);
    sx.putImageData(im, 0, 0);
    const x = cv.getContext('2d');
    x.imageSmoothingEnabled = k < 1;
    x.drawImage(small, 0, 0, cv.width, cv.height);
  }
  const base = () => host.fileName().replace(/\.[a-z0-9]+$/i, '');
  const plan = () => M.colorPlan(model().list.map(i => colors[i]), settings());
  const mesh = () => M.closedMesh(model().grid, gw, gh, cell, settings());
  function planText(): string {
    const s = settings(), list = model().list, plan = M.colorPlan(list.map(i => colors[i]), s), { w, h } = size();
    const v = { name: base(), w: f2(w), h: f2(h), lh: s.layerHeight, lpc: s.layersPerColor, base: s.baseLayers, total: M.modelHeight(list.length, s), layers: M.topLayer(list.length - 1, s) };
    // the plan is a file: plain numbers (2.40), whatever the language
    const first = plan[0];
    const lines = [
      t('Mosaic Paint – 3D print plan for {name}.3mf / {name}.stl', v),
      t('Size {w} × {h} mm · layer height {lh} mm · {lpc} layers per color · base {base} layers', v),
      t('Total height {total} mm ({layers} layers). Set the slicer’s first layer height to {lh} mm too.', v),
      '',
      (s.baseLayers ? t('Start with {color} – layers {from}–{to} (base plate included)', { color: first.color, from: first.fromLayer, to: first.toLayer })
        : t('Start with {color} – layers {from}–{to}', { color: first.color, from: first.fromLayer, to: first.toLayer })),
      ...plan.slice(1).map(p => t('Layer {layer} (Z {z} mm): change to {color} – layers {from}–{to}', { layer: p.changeAtLayer, z: p.z.toFixed(2), color: p.color, from: p.fromLayer, to: p.toLayer })),
      '',
      t('PrusaSlicer: the 3MF file already contains these changes – open it and check the layer slider.'),
      t('Other slicers (they read only the shape from the 3MF or STL) – add the changes by hand:'),
      t('- PrusaSlicer, Bambu Studio, OrcaSlicer: in the preview, move the layer slider to each Z above and click “+” (Add color change, M600).'),
      t('- Cura: Extensions › Post Processing › Modify G-Code › “Filament Change” at each layer number above.'),
      t('- Multi-material printers (AMS, MMU): the same changes work; or assign the filaments to the color changes in the slicer.'),
    ];
    return lines.join('\n') + '\n';
  }

  // ---- controls --------------------------------------------------------------------------------------
  let busy: any;
  const reanalyse = () => { clearTimeout(busy); busy = setTimeout(() => analyse().catch(() => toast(t('Could not read the picture.'))), 50); };
  const bindNum = (id: string, key: string, min: number, max: number, whole: boolean, again: boolean) => {
    const i = $(id);
    i.value = opts[key];
    i.onchange = () => {
      let v = +i.value;
      if (Number.isFinite(v) && v > 0 || ((key === 'baseLayers' || key === 'minWidth') && v === 0)) {
        v = clamp(whole ? Math.round(v) : v, min, max);
        opts[key] = v;
        saveOpts();
      }
      i.value = opts[key];
      if (again) reanalyse(); else render();
    };
  };
  bindNum('#m3-detail', 'detail', 0.1, 5, false, true);
  bindNum('#m3-min', 'minWidth', 0, 20, false, false);
  bindNum('#m3-lh', 'layerHeight', 0.04, 1, false, false);
  bindNum('#m3-lpc', 'layersPerColor', 1, 50, true, false);
  bindNum('#m3-base', 'baseLayers', 0, 50, true, false);
  $('#m3-w').onchange = () => { const v = +$('#m3-w').value; if (v >= 5 && v <= 2000) { opts.width = v; saveOpts(); } reanalyse(); };
  $('#m3-h').onchange = () => { const v = +$('#m3-h').value; if (v >= 5 && v <= 2000) { opts.width = v * host.aspect(); saveOpts(); } reanalyse(); };
  $('#m3-tab-top').onclick = () => showTab(false);
  $('#m3-tab-3d').onclick = () => showTab(true);
  $('#m3-z').oninput = () => { if (view) view.setExaggeration(+$('#m3-z').value); };
  $('#m3-light').onclick = () => sortBy(true);
  $('#m3-dark').onclick = () => sortBy(false);
  const triangles = (m: M.Mesh) => m.triangles.length / 3;
  $('#m3-go').onclick = async () => {
    const m = mesh(), p = plan();
    $('#m3-go').disabled = true;
    try {
      const data = await zip(M.threeMfFiles(m, p, base()));
      download(new Blob([data as BlobPart], { type: 'model/3mf' }), base() + '.3mf');
      toast(t('Saved {name}.3mf ({n} triangles; PrusaSlicer reads its {c} filament {c|change|changes}, other slicers need the plan).', { name: base(), n: triangles(m), c: p.length - 1 }));
    } finally { $('#m3-go').disabled = false; }
  };
  $('#m3-stl').onclick = () => {
    const m = mesh();
    download(new Blob([M.stl(m, base())], { type: 'model/stl' }), base() + '.stl');
    toast(t('Saved {name}.stl ({n} triangles). Add the filament changes from the plan in your slicer.', { name: base(), n: triangles(m) }));
  };
  $('#m3-plan').onclick = () => download(new Blob([planText()], { type: 'text/plain' }), base() + '-3d-plan.txt');

  button.onclick = async () => {
    const real = host.realSize();
    if (real) opts.width = +real.w.toFixed(2);
    $('#m3-summary').textContent = t('Reading the picture…');
    dlg.showModal();
    await analyse().catch(() => toast(t('Could not read the picture.')));
  };
}
