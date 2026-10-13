/* Layers (raster): the panel – each layer with its eye, a thumbnail and its name; the active one has its
   opacity – and the commands: new, duplicate, delete, up / down, merge down, flatten, rename. Painting and
   the other tools work on the active layer; saving, sharing and printing use the picture as it looks.
   Layers are kept by autosave and in OpenRaster files (.ora – GIMP, Krita and others open them). */
import { zip, unzip } from '../lib/zip.ts';
import { $, toast } from '../shared/ui.ts';
import { t } from '../shared/i18n.ts';
import { ask } from '../shared/dialogs.ts';
import { canvasToPng } from '../shared/clipboard.ts';
import { esc } from '../lib/html.ts';
import { state, on, rt } from './state.ts';
import { layers, active, makeLayer, setLayers, useLayer, doc, flat, makeCanvas, requestRender, fitView, type Layer } from './canvas.ts';
import { commit, resetHistory, afterChange } from './history.ts';
import { place, selectionChanged } from './select.ts';

const nextName = () => t('Layer {n}', { n: layers.length + 1 });
/** A layer command: pasted or moved pixels placed first, then the change, as one undo step. */
function step(fn: () => void): void {
  if (state.floating) place();
  fn();
  commit();
  renderLayers();
}
export function addLayer(): void {
  step(() => {
    const L = makeLayer(doc.width, doc.height, nextName());
    layers.splice(active + 1, 0, L);
    useLayer(active + 1);
  });
}
export function duplicateLayer(): void {
  step(() => {
    const src = layers[active], L = makeLayer(doc.width, doc.height, t('{name} copy', { name: src.name }));
    L.ctx.drawImage(src.canvas, 0, 0);
    Object.assign(L, { visible: src.visible, opacity: src.opacity });
    layers.splice(active + 1, 0, L);
    useLayer(active + 1);
  });
}
export function deleteLayer(): void {
  if (layers.length < 2) { toast(t('The last layer can’t be deleted.')); return; }
  step(() => {
    layers.splice(active, 1);
    useLayer(Math.max(0, active - 1));
  });
}
export function moveLayer(up: boolean): void {
  const to = active + (up ? 1 : -1);
  if (to < 0 || to >= layers.length) return;
  step(() => {
    [layers[active], layers[to]] = [layers[to], layers[active]];
    useLayer(to);
  });
}
/** The active layer onto the one under it (as it looks: its opacity, nothing when hidden). */
export function mergeDown(): void {
  if (active < 1) { toast(t('There is no layer under this one.')); return; }
  step(() => {
    const top = layers[active], below = layers[active - 1];
    if (top.visible) { below.ctx.globalAlpha = top.opacity; below.ctx.drawImage(top.canvas, 0, 0); below.ctx.globalAlpha = 1; }
    below.rev++;
    layers.splice(active, 1);
    useLayer(active - 1);
  });
}
/** All the layers as one (the picture as it looks). */
export function flattenAll(): void {
  if (layers.length < 2) return;
  step(() => {
    const f = flat(), L = makeLayer(doc.width, doc.height, t('Layer {n}', { n: 1 }));
    L.ctx.drawImage(f, 0, 0);
    setLayers([L], 0);
  });
}
function setVisible(i: number, v: boolean): void {
  step(() => { layers[i].visible = v; });
}
function selectLayer(i: number): void {
  if (i === active) return;
  if (state.floating) place();
  useLayer(i);
  renderLayers();
  selectionChanged();
  requestRender();
}
async function rename(i: number): Promise<void> {
  const name = await ask(t('Name of the layer:'), layers[i].name);
  if (name == null || !name.trim()) return;
  step(() => { layers[i].name = name.trim().slice(0, 60); });
}

// ---- the panel -----------------------------------------------------------------------------------------------
let pending = 0;
/** the active layer's opacity as last shown (a change to the same value is no undo step) */
let shownOpacity = 1;
/** Redraws the layer list (soon: thumbnails are redrawn after changes, not during strokes). */
export function renderLayers(): void {
  cancelAnimationFrame(pending);
  pending = requestAnimationFrame(draw);
}
function draw(): void {
  const list = $('#layer-list');
  if (!list) return;
  // top layer first, as they lie
  list.innerHTML = layers.map((L, i) => `<li class="layer${i === active ? ' active' : ''}" data-i="${i}" aria-current="${i === active}">
<button class="layer-eye" aria-pressed="${L.visible}" title="${esc(L.visible ? t('Hide this layer') : t('Show this layer'))}" aria-label="${esc(t('Show {name}', { name: L.name }))}">${L.visible ? '◉' : '○'}</button>
<canvas class="layer-thumb" width="48" height="36"></canvas>
<span class="layer-name" title="${esc(t('Double-click to rename'))}">${esc(L.name)}</span>
</li>`).reverse().join('');
  for (const li of (list as HTMLElement).querySelectorAll('li')) {
    const i = +li.dataset.i, L = layers[i], c = li.querySelector('canvas') as HTMLCanvasElement, x = c.getContext('2d');
    const k = Math.min(c.width / L.canvas.width, c.height / L.canvas.height), w = L.canvas.width * k, h = L.canvas.height * k;
    x.drawImage(L.canvas, (c.width - w) / 2, (c.height - h) / 2, w, h);
    li.onclick = (e) => { if (!(e.target as Element).closest('.layer-eye')) selectLayer(i); };
    li.ondblclick = () => rename(i);
    (li.querySelector('.layer-eye') as HTMLElement).onclick = () => setVisible(i, !L.visible);
  }
  const op = $('#layer-opacity') as HTMLInputElement;
  shownOpacity = layers[active].opacity;
  op.value = String(Math.round(shownOpacity * 100));
  $('#layer-opacity-label').textContent = `${op.value} %`;
  ($('#btn-layer-del') as HTMLButtonElement).disabled = layers.length < 2;
  ($('#btn-layer-merge') as HTMLButtonElement).disabled = active < 1;
  ($('#btn-layer-flatten') as HTMLButtonElement).disabled = layers.length < 2;
  ($('#btn-layer-up') as HTMLButtonElement).disabled = active >= layers.length - 1;
  ($('#btn-layer-down') as HTMLButtonElement).disabled = active < 1;
}

// ---- OpenRaster (.ora) -----------------------------------------------------------------------------------------
const pngBytes = async (c: HTMLCanvasElement) => new Uint8Array(await (await canvasToPng(c)).arrayBuffer());
/** Saves the layers as an OpenRaster file. */
export async function exportOra(): Promise<void> {
  if (state.floating) place();
  const files = [{ name: 'mimetype', data: 'image/openraster' }];
  const stack: string[] = [];
  for (let i = layers.length - 1; i >= 0; i--) {
    const L = layers[i], src = `data/layer${i}.png`;
    files.push({ name: src, data: await pngBytes(L.canvas) } as any);
    stack.push(`  <layer name="${esc(L.name)}" src="${src}" x="0" y="0" opacity="${L.opacity.toFixed(3)}" visibility="${L.visible ? 'visible' : 'hidden'}"/>`);
  }
  const f = flat(), k = Math.min(1, 256 / Math.max(f.width, f.height)), th = makeCanvas(Math.round(f.width * k), Math.round(f.height * k));
  th.getContext('2d').drawImage(f, 0, 0, th.width, th.height);
  files.push({ name: 'stack.xml', data: `<?xml version="1.0" encoding="UTF-8"?>\n<image version="0.0.5" w="${doc.width}" h="${doc.height}">\n<stack>\n${stack.join('\n')}\n</stack>\n</image>\n` });
  files.push({ name: 'mergedimage.png', data: await pngBytes(f) } as any, { name: 'Thumbnails/thumbnail.png', data: await pngBytes(th) } as any);
  // the mimetype first and stored: that's how programs recognize the file
  const data = await zip(files as any, { compress: false });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([data.slice()], { type: 'image/openraster' }));
  a.download = rt.fileName.replace(/\.[a-z0-9]+$/i, '') + '.ora';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  toast(t('Saved {name} with {n} {n|layer|layers}.', { name: a.download, n: layers.length }));
}
const imageOf = (bytes: Uint8Array): Promise<HTMLCanvasElement> => createImageBitmap(new Blob([bytes.slice()], { type: 'image/png' })).then((b) => {
  const c = makeCanvas(b.width, b.height);
  c.getContext('2d').drawImage(b, 0, 0);
  return c;
});
/** Opens an OpenRaster file: its layers (bottom first), names, opacity and visibility. */
export async function openOra(file: Blob, name: string): Promise<boolean> {
  try {
    const files = await unzip(new Uint8Array(await file.arrayBuffer()));
    const xml = new DOMParser().parseFromString(new TextDecoder().decode(files.get('stack.xml')), 'application/xml');
    const img = xml.querySelector('image'), W = +img.getAttribute('w'), H = +img.getAttribute('h');
    const list: Layer[] = [];
    // the stack lists the top layer first
    for (const el of [...xml.querySelectorAll('layer')].reverse()) {
      const data = files.get(el.getAttribute('src') || '');
      if (!data) continue;
      const c = await imageOf(data), L = makeLayer(W, H, el.getAttribute('name') || t('Layer {n}', { n: list.length + 1 }));
      L.ctx.drawImage(c, +el.getAttribute('x') || 0, +el.getAttribute('y') || 0);
      L.opacity = Math.max(0, Math.min(1, el.hasAttribute('opacity') ? +el.getAttribute('opacity') : 1));
      L.visible = el.getAttribute('visibility') !== 'hidden';
      list.push(L);
    }
    if (!list.length || !(W > 0 && H > 0)) throw new Error('no layers');
    setLayers(list, list.length - 1);
    state.sel = null;
    state.floating = null;
    rt.fileName = name.replace(/\.[a-z0-9]+$/i, '') + '.png';
    rt.fileHandle = null;
    resetHistory();
    rt.dirty = false;
    afterChange();
    selectionChanged();
    fitView();
    renderLayers();
    toast(t('Opened {name} ({n} {n|layer|layers}).', { name, n: list.length }));
    return true;
  } catch {
    toast(t('Could not read this OpenRaster file.'));
    return false;
  }
}
/** Restores layers kept by autosave. */
export async function restoreLayers(saved: { name: string; visible: boolean; opacity: number; png: Blob }[], activeIndex: number): Promise<void> {
  const list: Layer[] = [];
  for (const s of saved) {
    const c = await imageOf(new Uint8Array(await s.png.arrayBuffer())), L = makeLayer(c.width, c.height, s.name);
    L.ctx.drawImage(c, 0, 0);
    Object.assign(L, { visible: s.visible, opacity: s.opacity });
    list.push(L);
  }
  setLayers(list, Math.min(activeIndex ?? list.length - 1, list.length - 1));
  resetHistory();
  renderLayers();
}

export function bindLayers(): void {
  $('#btn-layer-add').onclick = addLayer;
  $('#btn-layer-dup').onclick = duplicateLayer;
  $('#btn-layer-del').onclick = deleteLayer;
  $('#btn-layer-up').onclick = () => moveLayer(true);
  $('#btn-layer-down').onclick = () => moveLayer(false);
  $('#btn-layer-merge').onclick = mergeDown;
  $('#btn-layer-flatten').onclick = flattenAll;
  $('#btn-layer-ora').onclick = () => exportOra();
  const op = $('#layer-opacity') as HTMLInputElement;
  // the opacity shows while it moves; one undo step when it is let go
  op.oninput = () => { layers[active].opacity = +op.value / 100; $('#layer-opacity-label').textContent = `${op.value} %`; requestRender(); };
  op.onchange = () => { const v = +op.value / 100; if (v !== shownOpacity) step(() => { layers[active].opacity = v; }); };
  for (const ev of ['change', 'layers', 'size']) on(ev, renderLayers);
  renderLayers();
}
