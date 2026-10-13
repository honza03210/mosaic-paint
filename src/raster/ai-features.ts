/* The add-on features of the raster app: Select object (tap it), AI object removal (for Remove), background
   removal, Read text and the 3D relief (from brightness – built in – or from AI depth). Each asks for its
   download first (src/shared/addons.ts); the models run in the AI worker (src/ai/worker.ts). */
import type { Pt } from '../lib/geometry.ts';
import type { SelMode } from '../lib/selection.ts';
import * as Relief from '../lib/relief.ts';
import { stl } from '../lib/model3d.ts';
import { $, toast } from '../shared/ui.ts';
import { t } from '../shared/i18n.ts';
import { ensureAddon, getFile, engineFile, ocrLangs, FILES, mb, bindAddons, type FileId } from '../shared/addons.ts';
import { state, savePrefs } from './state.ts';
import { doc, dctx, makeCanvas, requestRender } from './canvas.ts';
import { commit, imageVersion } from './history.ts';
import { selectHooks, setSelectionMask, place, selectionChanged } from './select.ts';
import { fillers } from './remove.ts';

// ---- the AI worker ----------------------------------------------------------------------------------------------
let worker: Worker | null = null, seq = 0;
const waiting = new Map<number, { resolve: (v: any) => void; reject: (e: Error) => void }>();
/** Runs an operation in the AI worker (tests put a stand-in at window.__aiStub). */
function call<T>(op: string, args: unknown, transfer: Transferable[] = []): Promise<T> {
  const stub = (window as any).__aiStub;
  if (stub) return Promise.resolve(stub(op, args));
  if (!worker) {
    worker = new Worker('dist/ai-worker.js', { type: 'module' });
    worker.onmessage = (e: MessageEvent<{ id: number; result?: unknown; error?: string }>) => {
      const w = waiting.get(e.data.id);
      if (!w) return;
      waiting.delete(e.data.id);
      if (e.data.error != null) w.reject(new Error(e.data.error)); else w.resolve(e.data.result);
    };
    worker.onerror = (e) => {
      e.preventDefault();
      for (const w of waiting.values()) w.reject(new Error(t('The AI could not start in this browser.')));
      waiting.clear();
      worker = null;
    };
  }
  const id = ++seq;
  return new Promise((resolve, reject) => {
    waiting.set(id, { resolve, reject });
    worker.postMessage({ id, op, args }, transfer);
  });
}
/** Makes sure the add-on is downloaded (asking first) and its models are loaded in the worker. */
async function prepare(addonId: string, models: FileId[]): Promise<boolean> {
  if (!(await ensureAddon(addonId))) return false;
  const engine = engineFile();
  await call('init', { gpu: engine === 'ortGpu', wasm: await getFile(engine) });
  for (const m of models) {
    if (await call<boolean>('has', { name: m })) continue;
    toast(t('Starting the AI…'));
    const bytes = await getFile(m);
    await call('load', { name: m, model: bytes }, [bytes]);
  }
  return true;
}

// ---- pictures to and from the models ---------------------------------------------------------------------------
/** The picture (or a part), at most max pixels on its longer side. */
function picture(max: number, box = { x: 0, y: 0, w: doc.width, h: doc.height }): ImageData {
  const k = Math.min(1, max / Math.max(box.w, box.h)), w = Math.max(1, Math.round(box.w * k)), h = Math.max(1, Math.round(box.h * k));
  const c = makeCanvas(w, h), x = c.getContext('2d');
  x.imageSmoothingQuality = 'high';
  x.drawImage(doc, box.x, box.y, box.w, box.h, 0, 0, w, h);
  return x.getImageData(0, 0, w, h);
}
/** A mask (w × h, 0…255) scaled up smoothly to the whole picture. */
function fullSize(mask: Uint8Array, w: number, h: number): Uint8Array {
  const small = makeCanvas(w, h), sx = small.getContext('2d'), im = sx.createImageData(w, h);
  for (let i = 0; i < mask.length; i++) { im.data[i * 4 + 3] = mask[i]; }
  sx.putImageData(im, 0, 0);
  const big = makeCanvas(doc.width, doc.height), bx = big.getContext('2d');
  bx.imageSmoothingQuality = 'high';
  bx.drawImage(small, 0, 0, doc.width, doc.height);
  const d = bx.getImageData(0, 0, doc.width, doc.height).data, out = new Uint8Array(doc.width * doc.height);
  for (let i = 0; i < out.length; i++) out[i] = d[i * 4 + 3];
  return out;
}
const busy = (msg: string) => toast(msg);
const failed = (e: unknown) => toast(t('The AI could not do it: {why}', { why: String((e as Error)?.message || e) }));

// ---- Select object --------------------------------------------------------------------------------------------
const SAM = 1024;
let samKey = '', samSize = { w: 0, h: 0 };
async function selectObjectAt(p: Pt, op: SelMode): Promise<void> {
  try {
    if (!(await prepare('select', ['samEncoder', 'samDecoder']))) return;
    const key = `${imageVersion()}:${doc.width}x${doc.height}`;
    if (key !== samKey) {
      busy(t('Looking at the picture…'));
      const img = picture(SAM);
      await call('samEncode', { key, img: { width: img.width, height: img.height, data: img.data } });
      samKey = key;
      samSize = { w: img.width, h: img.height };
    }
    const k = samSize.w / doc.width;
    const m = await call<Uint8Array>('samMask', { points: [{ x: p.x * k, y: p.y * k, label: 1 }] });
    setSelectionMask(fullSize(m, samSize.w, samSize.h), op);
    if (!state.sel) toast(t('Nothing found there – tap the middle of the object.'));
  } catch (e) { failed(e); }
}

// ---- AI object removal (for Remove and Fill from surroundings) ------------------------------------------------------
async function aiFill(img: ImageData, hole: Uint8Array): Promise<Uint8ClampedArray> {
  if (!(await prepare('inpaint', ['migan']))) throw new Error(t('the AI add-on is not downloaded'));
  return call<Uint8ClampedArray>('inpaint', { img: { width: img.width, height: img.height, data: img.data }, mask: hole });
}

// ---- background removal ----------------------------------------------------------------------------------------
let bgDlg: HTMLDialogElement | null = null;
function bgDialog(): HTMLDialogElement {
  if (bgDlg) return bgDlg;
  const d = document.createElement('dialog');
  d.id = 'dlg-bg';
  d.innerHTML = `<form method="dialog">
<div class="dlg-head"><h2>${t('Remove background')}</h2><button value="cancel" title="${t('Close')}">✕</button></div>
<p>${t('What is in the picture?')}</p>
<div class="row wrap">
  <label class="chk"><input type="radio" name="bg-model" value="modnet" checked> ${t('People (portraits)')} <span class="note">${mb(FILES.modnet.bytes)}</span></label>
  <label class="chk"><input type="radio" name="bg-model" value="u2netp"> ${t('Any subject (objects, animals, products)')} <span class="note">${mb(FILES.u2netp.bytes)}</span></label>
</div>
<p class="note">${t('Each needs a one-time download – the size is shown before anything is downloaded. Everything runs on this device.')}</p>
<div class="row dlg-foot"><button value="select">${t('Select the subject')}</button><button value="remove" class="primary">${t('Remove background')}</button></div>
</form>`;
  document.body.append(d);
  bgDlg = d;
  return d;
}
async function removeBackground(): Promise<void> {
  if (state.floating) place();
  const d = bgDialog();
  d.returnValue = '';
  const how = await new Promise<string>((resolve) => { d.addEventListener('close', () => resolve(d.returnValue), { once: true }); d.showModal(); });
  if (how !== 'select' && how !== 'remove') return;
  const model = d.querySelector<HTMLInputElement>('input[name=bg-model]:checked').value as 'modnet' | 'u2netp';
  try {
    if (!(await prepare(model === 'modnet' ? 'bg-people' : 'bg-any', [model]))) return;
    busy(t('Finding the subject…'));
    const img = picture(1024);
    const m = fullSize(await call<Uint8Array>('matte', { model, img: { width: img.width, height: img.height, data: img.data } }), img.width, img.height);
    if (how === 'select') { setSelectionMask(m, 'new'); state.selShape = 'rect'; toast(t('The subject is selected.')); return; }
    // the background becomes transparent: every pixel keeps as much as it belongs to the subject
    const im = dctx.getImageData(0, 0, doc.width, doc.height), px = im.data;
    for (let i = 0; i < m.length; i++) px[i * 4 + 3] = px[i * 4 + 3] * m[i] / 255;
    dctx.putImageData(im, 0, 0);
    state.sel = null;
    selectionChanged();
    commit();
    toast(t('Background removed.'));
  } catch (e) { failed(e); }
}

// ---- Read text ---------------------------------------------------------------------------------------------------
function loadOcr(): Promise<void> {
  if ((window as any).MZOCR) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'dist/ocr.js';
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(t('Could not load the text recognition.')));
    document.head.append(s);
  });
}
async function readText(): Promise<void> {
  if (state.floating) place();
  try {
    if (!(await ensureAddon('ocr'))) return;
    busy(t('Reading the text…'));
    // (tests put a stand-in at window.__ocrStub)
    const ocr = (window as any).__ocrStub || (await loadOcr(), (window as any).MZOCR);
    const b = state.sel || { x: 0, y: 0, w: doc.width, h: doc.height };
    // small text reads better a little bigger
    const k = Math.max(1, Math.min(3, 1200 / Math.max(b.w, b.h))), c = makeCanvas(Math.round(b.w * k), Math.round(b.h * k)), x = c.getContext('2d');
    x.fillStyle = '#fff';
    x.fillRect(0, 0, c.width, c.height);
    x.imageSmoothingQuality = 'high';
    x.drawImage(doc, b.x, b.y, b.w, b.h, 0, 0, c.width, c.height);
    const langs = await Promise.all(ocrLangs().map(async l => ({ code: l.code, data: await getFile(l.file) })));
    const text = await ocr.recognize(c, { worker: await getFile('tessWorker'), core: await getFile('tessCore'), langs });
    showText(text);
  } catch (e) { failed(e); }
}
function showText(text: string): void {
  let d = $('#dlg-ocr') as HTMLDialogElement;
  if (!d) {
    d = document.createElement('dialog');
    d.id = 'dlg-ocr';
    d.innerHTML = `<div class="dlg-head"><h2>${t('Text in the picture')}</h2><form method="dialog"><button title="${t('Close')}">✕</button></form></div>
<textarea class="ocr-text" rows="8" aria-label="${t('Text in the picture')}"></textarea>
<div class="row dlg-foot"><span class="note grow">${t('You can correct it here before copying.')}</span><button class="ocr-copy primary">${t('Copy')}</button></div>`;
    document.body.append(d);
    d.querySelector<HTMLElement>('.ocr-copy').onclick = async () => {
      const v = d.querySelector<HTMLTextAreaElement>('.ocr-text').value;
      try { await navigator.clipboard.writeText(v); toast(t('Copied.')); } catch { d.querySelector<HTMLTextAreaElement>('.ocr-text').select(); toast(t('Select the text and copy it (Ctrl+C).')); }
    };
  }
  d.querySelector<HTMLTextAreaElement>('.ocr-text').value = text || '';
  d.showModal();
  if (!text) toast(t('No text found.'));
}

// ---- 3D relief -----------------------------------------------------------------------------------------------------
let reliefDlg: HTMLDialogElement | null = null;
let depthFor: { key: string; d: Float32Array; w: number; h: number } | null = null;
/** the depth being worked out (asked for twice while it runs, it is still worked out once) */
let depthRun: { key: string; p: Promise<boolean> } | null = null;
function reliefDialog(): HTMLDialogElement {
  if (reliefDlg) return reliefDlg;
  const d = document.createElement('dialog');
  d.id = 'dlg-relief';
  d.innerHTML = `<div class="dlg-head"><h2>${t('3D relief')}</h2><form method="dialog"><button title="${t('Close')}">✕</button></form></div>
<p class="note">${t('A 3D-printable relief of the picture (STL): from its brightness, or from the depth an AI sees in a photo.')}</p>
<div class="row wrap">
  <label class="chk"><input type="radio" name="rl-src" value="light" checked> ${t('Brightness – light is high')}</label>
  <label class="chk"><input type="radio" name="rl-src" value="dark"> ${t('Brightness – dark is high (a lithophane: hold it against light)')}</label>
  <label class="chk"><input type="radio" name="rl-src" value="depth"> ${t('Depth (AI add-on) – near is high')}</label>
</div>
<div class="row wrap">
  <label>${t('Size')} <input class="rl-size" type="number" min="10" max="500" step="5" value="100"> mm</label>
  <label>${t('Base')} <input class="rl-base" type="number" min="0" max="20" step="0.2" value="0.8"> mm</label>
  <label>${t('Relief')} <input class="rl-height" type="number" min="0.2" max="50" step="0.2" value="3"> mm</label>
  <label>${t('Detail')} <select class="rl-detail"><option value="120">${t('Low')}</option><option value="240" selected>${t('Medium')}</option><option value="400">${t('High')}</option></select></label>
  <label>${t('Smoothing')} <input class="rl-smooth" type="number" min="0" max="10" step="1" value="1"></label>
</div>
<canvas class="rl-preview" width="1" height="1" aria-label="${t('Height map: white is high')}"></canvas>
<div class="row dlg-foot"><span class="note grow rl-info"></span><button class="rl-go primary">${t('Save STL')}</button></div>`;
  document.body.append(d);
  const update = () => showRelief().catch(failed);
  for (const el of d.querySelectorAll('input, select')) el.addEventListener('change', update);
  d.querySelector<HTMLElement>('.rl-go').onclick = () => saveRelief().catch(failed);
  reliefDlg = d;
  return d;
}
/** The height map (0…1) from the chosen source, at most max cells on a side. */
async function heights(max: number): Promise<{ h: Float32Array; w: number; ht: number } | null> {
  const d = reliefDlg, src = d.querySelector<HTMLInputElement>('input[name=rl-src]:checked').value, smooth = +d.querySelector<HTMLInputElement>('.rl-smooth').value || 0;
  if (src === 'depth') {
    const key = `${imageVersion()}:${doc.width}x${doc.height}`;
    if (depthFor?.key !== key) {
      if (depthRun?.key !== key) {
        depthRun = { key, p: (async () => {
          if (!(await prepare('depth', ['depth']))) return false;
          busy(t('Working out the depth…'));
          const img = picture(1024);
          depthFor = { key, d: await call<Float32Array>('depth', { img: { width: img.width, height: img.height, data: img.data } }), w: img.width, h: img.height };
          return true;
        })() };
      }
      const ok = await depthRun.p.finally(() => { if (depthRun?.key === key) depthRun = null; });
      if (!ok) { d.querySelector<HTMLInputElement>('input[value=light]').checked = true; return heights(max); }
    }
    return Relief.shrink(depthFor.d, depthFor.w, depthFor.h, max, smooth);
  }
  const img = picture(Math.max(max * 2, 256)), b = Relief.brightness(img.data, img.width * img.height);
  if (src === 'dark') for (let i = 0; i < b.length; i++) b[i] = 1 - b[i];
  return Relief.shrink(b, img.width, img.height, max, smooth);
}
async function showRelief(): Promise<void> {
  const d = reliefDlg, hm = await heights(+d.querySelector<HTMLSelectElement>('.rl-detail').value);
  if (!hm) return;
  const c = d.querySelector<HTMLCanvasElement>('.rl-preview'), x = c.getContext('2d');
  c.width = hm.w;
  c.height = hm.ht;
  const im = x.createImageData(hm.w, hm.ht);
  for (let i = 0; i < hm.h.length; i++) { const v = hm.h[i] * 255; im.data.set([v, v, v, 255], i * 4); }
  x.putImageData(im, 0, 0);
  const size = +d.querySelector<HTMLInputElement>('.rl-size').value || 100, k = size / Math.max(hm.w, hm.ht);
  d.querySelector('.rl-info').textContent = t('{w} × {h} mm, {z} mm high', { w: Math.round(hm.w * k), h: Math.round(hm.ht * k), z: (+d.querySelector<HTMLInputElement>('.rl-base').value + +d.querySelector<HTMLInputElement>('.rl-height').value).toFixed(1) });
}
async function saveRelief(): Promise<void> {
  const d = reliefDlg, hm = await heights(+d.querySelector<HTMLSelectElement>('.rl-detail').value);
  if (!hm) return;
  const mesh = Relief.reliefMesh(hm.h, hm.w, hm.ht, {
    sizeMm: +d.querySelector<HTMLInputElement>('.rl-size').value || 100,
    baseMm: +d.querySelector<HTMLInputElement>('.rl-base').value || 0,
    heightMm: +d.querySelector<HTMLInputElement>('.rl-height').value || 3,
  });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([stl(mesh, 'Mosaic Paint relief')], { type: 'model/stl' }));
  a.download = 'relief.stl';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  toast(t('Saved relief.stl.'));
}
async function openRelief(): Promise<void> {
  if (state.floating) place();
  const d = reliefDialog();
  d.showModal();
  await showRelief().catch(failed);
}

/** Wires the add-on features into the raster app. */
export function bindAiFeatures(): void {
  selectHooks.object = (p, op) => { selectObjectAt(p, op); };
  fillers.ai = aiFill;
  // Remove can use the AI add-on: choosing it asks for the download right away
  $('#remove-method-row').hidden = false;
  const rm = $('#opt-remove-method') as HTMLSelectElement;
  rm.addEventListener('change', async () => {
    if (rm.value === 'ai' && !(await ensureAddon('inpaint'))) { rm.value = 'builtin'; state.removeMethod = 'builtin'; savePrefs(); }
  });
  $('#btn-bg').onclick = () => removeBackground();
  $('#btn-ocr').onclick = () => readText();
  $('#btn-relief').onclick = () => openRelief();
  bindAddons();
  requestRender();
}
