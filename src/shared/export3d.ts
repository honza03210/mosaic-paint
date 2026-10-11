/* "3D print" dialog shared by both apps: the mosaic as an STL model where every color stands at its own
   height, plus the plan of filament changes – print it on any single-nozzle printer by swapping the
   filament at the listed layers. The app (host) renders its picture and says which colors it uses. */
import * as Colors from '../lib/colors.ts';
import * as R from '../lib/raster.ts';
import * as M from '../lib/model3d.ts';
import { $, clamp, toast, download, lsGet, lsSet } from './ui.ts';

export interface Export3DHost {
  /** width / height of the picture */
  aspect(): number;
  /** its real size in mm, if the app knows it (the vector app's page) */
  realSize(): { w: number; h: number } | null;
  /** the picture at exactly w × h pixels; transparent where nothing is painted */
  render(w: number, h: number): Promise<HTMLCanvasElement>;
  /**
   * The colors the picture is made of (every pixel is snapped to one of them). `lines`: colors of lines /
   * grout, printed first so the grout sits lowest and the tiles stand out of it.
   */
  colors(): { colors: string[]; lines?: string[]; note?: string };
  fileName(): string;
}

const MAX_CELLS = 4e6, MANY_COLORS = 16;
const opts = { width: 150, detail: 0.4, layerHeight: 0.2, layersPerColor: 3, baseLayers: 3 };
try { Object.assign(opts, JSON.parse(lsGet('mz-3d') || '{}')); } catch { /* ignore */ }
const saveOpts = () => lsSet('mz-3d', JSON.stringify(opts));
const f2 = (v: number) => String(+v.toFixed(2));

const DIALOG = `
<form method="dialog" class="dlg-head"><h2>3D print</h2><button title="Close">✕</button></form>
<p class="note">A model where every color stands at its own height. Print it with one nozzle and change the filament at the layers listed below – each tile’s top then shows its color.</p>
<div class="row">
  <label>Size <input id="m3-w" type="number" min="5" max="2000" step="1"> × <input id="m3-h" type="number" min="5" max="2000" step="1"> mm</label>
  <label title="Size of the model's smallest step – about your nozzle width">Detail <input id="m3-detail" type="number" min="0.1" max="5" step="0.05"> mm</label>
</div>
<div class="row">
  <label>Layer height <input id="m3-lh" type="number" min="0.04" max="1" step="0.04"> mm</label>
  <label title="How many layers each color gets – more layers cover the color below better">Layers per color <input id="m3-lpc" type="number" min="1" max="50" step="1"></label>
  <label title="A plate under everything, printed in the first color. 0: unpainted parts are left open">Base layers <input id="m3-base" type="number" min="0" max="50" step="1"></label>
</div>
<p class="note warn" id="m3-note" hidden></p>
<div class="m3-body">
  <canvas id="m3-preview" title="Top view of the model"></canvas>
  <div class="m3-side">
    <div class="row small"><span class="note">Print order (bottom first):</span>
      <button id="m3-light" title="Lighter colors lower: a darker layer covers a lighter one well. Lines (grout) stay at the bottom">Light → dark</button>
      <button id="m3-dark">Dark → light</button>
    </div>
    <div id="m3-order"></div>
  </div>
</div>
<p class="note" id="m3-summary"></p>
<div class="row dlg-foot">
  <button id="m3-plan">Download plan</button>
  <button id="m3-go" class="primary">Download STL</button>
</div>`;

export function initExport3D(host: Export3DHost, button: HTMLElement): void {
  const dlg = document.createElement('dialog');
  dlg.id = 'dlg-3d';
  dlg.innerHTML = DIALOG;
  document.body.append(dlg);
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });

  // the analysed picture: a grid of color indexes, and the print order (indexes into `colors`)
  let colors: string[] = [], counts: number[] = [], grid: Int16Array | null = null, gw = 0, gh = 0, cell = opts.detail;
  let order: number[] = [], note = '', lines = new Set<string>();
  const settings = (): M.PrintSettings => ({ layerHeight: opts.layerHeight, layersPerColor: opts.layersPerColor, baseLayers: opts.baseLayers });
  const used = () => order.filter(i => counts[i] > 0);
  const size = () => {
    const a = host.aspect();
    return { w: opts.width, h: opts.width / a };
  };

  /** Lines first, then the others by brightness. */
  const byBrightness = (lightFirst: boolean) => (a: number, b: number) =>
    (+lines.has(colors[b]) - +lines.has(colors[a])) || (Colors.luminance(colors[b]) - Colors.luminance(colors[a])) * (lightFirst ? 1 : -1);
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
    ({ grid, counts } = R.classify(img, colors));
    // keep the order the user chose for colors that are still there; new ones go by brightness
    const known = prev.filter(c => colors.includes(c)).map(c => colors.indexOf(c));
    const fresh = colors.map((_, i) => i).filter(i => !known.includes(i)).sort(byBrightness(true));
    order = [...known, ...fresh];
    render();
  }
  const rows = new Map<string, HTMLElement>();
  /** Moves a color one step earlier (-1) or later (+1) in the print order. */
  function move(c: string, d: number): void {
    const list = used(), k = list.findIndex(ci => colors[ci] === c), other = list[k + d];
    if (k < 0 || other == null) return;
    const a = order.indexOf(list[k]), b = order.indexOf(other);
    [order[a], order[b]] = [order[b], order[a]];
    render();
  }
  function render(): void {
    const s = settings(), list = used(), { w, h } = size();
    $('#m3-w').value = f2(w);
    $('#m3-h').value = f2(h);
    const warn = [note, list.length > MANY_COLORS ? `${list.length} colors make a tall print with many filament changes – reduce the colors first (Raster: “Reduce to palette”).` : '',
      cell > opts.detail + 1e-9 ? `Detail lowered to ${f2(cell)} mm for this size.` : ''].filter(Boolean).join(' ');
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
        row.innerHTML = `<span class="mini" style="background:${c}"></span><code>${c}</code>${lines.has(c) ? '<span class="tag">lines</span>' : ''}<span class="note"></span>`
          + '<button title="Print earlier (lower)">↑</button><button title="Print later (higher)">↓</button>';
        const [up, down] = row.querySelectorAll('button');
        up.onclick = () => move(c, -1);
        down.onclick = () => move(c, 1);
        rows.set(c, row);
      }
      row.querySelector('.note').textContent = `${Math.max(0.1, +(counts[ci] / total * 100).toFixed(1))} % · layers ${p.fromLayer}–${p.toLayer}${p.z == null ? '' : ` · change at Z ${p.z.toFixed(2)}`}`;
      const [up, down] = row.querySelectorAll('button');
      up.disabled = k === 0;
      down.disabled = k === list.length - 1;
      if (box.children[k] !== row) box.insertBefore(row, box.children[k] || null);
    });
    const unpainted = grid ? grid.filter(v => v < 0).length : 0;
    $('#m3-summary').textContent = list.length
      ? `${list.length} color${list.length === 1 ? '' : 's'} · height ${M.modelHeight(list.length, s)} mm (${M.topLayer(list.length - 1, s)} layers)`
        + ` · ${list.length - 1} filament change${list.length === 2 ? '' : 's'}`
        + (unpainted ? ` · unpainted parts ${opts.baseLayers ? `stay at the base (${f2(opts.baseLayers * opts.layerHeight)} mm)` : 'are left open'}` : '')
      : 'Nothing is painted yet.';
    $('#m3-go').disabled = $('#m3-plan').disabled = !list.length;
    drawPreview();
  }
  function drawPreview(): void {
    const cv = $('#m3-preview') as HTMLCanvasElement;
    if (!grid) return;
    const k = Math.min(1, 300 / Math.max(gw, gh));
    cv.width = Math.max(1, Math.round(gw * k));
    cv.height = Math.max(1, Math.round(gh * k));
    const small = document.createElement('canvas');
    small.width = gw;
    small.height = gh;
    const sx = small.getContext('2d'), im = sx.createImageData(gw, gh), rgb = colors.map(c => R.rgba(c));
    for (let p = 0; p < grid.length; p++) if (grid[p] >= 0) im.data.set(rgb[grid[p]], p * 4);
    sx.putImageData(im, 0, 0);
    const x = cv.getContext('2d');
    x.imageSmoothingEnabled = k < 1;
    x.drawImage(small, 0, 0, cv.width, cv.height);
  }
  /** Grid of print levels (position in the print order), -1 for unpainted. */
  function levels(): Int16Array {
    const rank = new Int16Array(colors.length).fill(-1);
    used().forEach((ci, k) => { rank[ci] = k; });
    return grid.map(v => (v < 0 ? -1 : rank[v]));
  }
  const base = () => host.fileName().replace(/\.[a-z0-9]+$/i, '');
  function planText(): string {
    const s = settings(), list = used(), plan = M.colorPlan(list.map(i => colors[i]), s), { w, h } = size();
    const lines = [
      `Mosaic Paint – 3D print plan for ${base()}.stl`,
      `Size ${f2(w)} × ${f2(h)} mm · layer height ${s.layerHeight} mm · ${s.layersPerColor} layers per color · base ${s.baseLayers} layers`,
      `Total height ${M.modelHeight(list.length, s)} mm (${M.topLayer(list.length - 1, s)} layers). Set the slicer's first layer height to ${s.layerHeight} mm too.`,
      '',
      `Start with ${plan[0].color} – layers ${plan[0].fromLayer}–${plan[0].toLayer}${s.baseLayers ? ' (base plate included)' : ''}`,
      ...plan.slice(1).map(p => `Layer ${p.changeAtLayer} (Z ${p.z.toFixed(2)} mm): change to ${p.color} – layers ${p.fromLayer}–${p.toLayer}`),
      '',
      'How to add the changes:',
      '- PrusaSlicer, Bambu Studio, OrcaSlicer: in the preview, move the layer slider to each Z above and click "+" (Add color change, M600).',
      '- Cura: Extensions › Post Processing › Modify G-Code › "Filament Change" at each layer number above.',
      '- Multi-material printers (AMS, MMU): the same changes work; or assign the filaments to the color changes in the slicer.',
    ];
    return lines.join('\n') + '\n';
  }

  // ---- controls --------------------------------------------------------------------------------------
  let busy: any;
  const reanalyse = () => { clearTimeout(busy); busy = setTimeout(() => analyse().catch(() => toast('Could not read the picture.')), 50); };
  const bindNum = (id: string, key: string, min: number, max: number, whole: boolean, again: boolean) => {
    const i = $(id);
    i.value = opts[key];
    i.onchange = () => {
      let v = +i.value;
      if (Number.isFinite(v) && v > 0 || (key === 'baseLayers' && v === 0)) {
        v = clamp(whole ? Math.round(v) : v, min, max);
        opts[key] = v;
        saveOpts();
      }
      i.value = opts[key];
      if (again) reanalyse(); else render();
    };
  };
  bindNum('#m3-detail', 'detail', 0.1, 5, false, true);
  bindNum('#m3-lh', 'layerHeight', 0.04, 1, false, false);
  bindNum('#m3-lpc', 'layersPerColor', 1, 50, true, false);
  bindNum('#m3-base', 'baseLayers', 0, 50, true, false);
  $('#m3-w').onchange = () => { const v = +$('#m3-w').value; if (v >= 5 && v <= 2000) { opts.width = v; saveOpts(); } reanalyse(); };
  $('#m3-h').onchange = () => { const v = +$('#m3-h').value; if (v >= 5 && v <= 2000) { opts.width = v * host.aspect(); saveOpts(); } reanalyse(); };
  $('#m3-light').onclick = () => sortBy(true);
  $('#m3-dark').onclick = () => sortBy(false);
  $('#m3-go').onclick = () => {
    const boxes = M.modelBoxes(levels(), gw, gh, cell, settings());
    download(new Blob([M.stl(boxes, base())], { type: 'model/stl' }), base() + '.stl');
    toast(`Saved ${base()}.stl (${(boxes.length * 12).toLocaleString('en')} triangles). Add the filament changes from the plan in your slicer.`);
  };
  $('#m3-plan').onclick = () => download(new Blob([planText()], { type: 'text/plain' }), base() + '-3d-plan.txt');

  button.onclick = async () => {
    const real = host.realSize();
    if (real) opts.width = +real.w.toFixed(2);
    $('#m3-summary').textContent = 'Reading the picture…';
    dlg.showModal();
    await analyse().catch(() => toast('Could not read the picture.'));
  };
}
