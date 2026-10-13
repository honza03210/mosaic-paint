/* Add-ons: features that need a one-time download (AI models, the engine that runs them, text recognition).
   Nothing is downloaded until the user agrees to a dialog that says how much; files are kept in the
   browser's Cache Storage (so they work offline afterwards) and can be removed again in the Add-ons list.
   Inside Discord the files come through the Activity's own Worker (Discord only lets an Activity load
   from its own address); elsewhere straight from their source (Hugging Face, jsDelivr). */
import { $, toast } from './ui.ts';
import { t } from './i18n.ts';
import { esc } from '../lib/html.ts';

import { FILES, type FileId } from './addon-files.ts';
export { FILES, type FileId };

export interface Addon {
  id: string;
  /** shown translated (getters, so the language is the current one) */
  readonly name: string;
  readonly what: string;
  /** its own files; AI add-ons also need the engine (shared by all of them) */
  files: FileId[];
  engine: boolean;
  license: string;
  /** why it can't run on this device (null: it can) */
  unavailable?: () => string | null;
}
/** WebGPU (tests can turn it off with window.__noWebGPU, to try the other engine) */
const nav = () => (typeof navigator === 'undefined' ? null : navigator);
/** iPhone and iPad (all their browsers are Safari's engine; iPadOS says it is a Mac, but has touch) */
const appleMobile = () => { const n = nav(); return !!n && (/iPhone|iPad|iPod/.test(n.userAgent) || (/Macintosh/.test(n.userAgent) && n.maxTouchPoints > 1)); };
/**
 * A phone or tablet, or little memory: the AI then works in less memory (slower) and keeps one feature's
 * models at a time – iOS closes a tab that takes much more than a gigabyte. (Tests can set window.__lowMemory.)
 */
export const lowMemory = (): boolean => {
  const n = nav() as any;
  return !!(globalThis as any).__lowMemory || appleMobile() || (!!n && /Android|Mobile/.test(n.userAgent)) || (n?.deviceMemory ?? 8) <= 4;
};
/** WebGPU – not on iPhone / iPad, where it is new in Safari's engine and the CPU is the safe way (tests can turn it
    off with window.__noWebGPU, to try the other engine) */
const hasGpu = () => { const n = nav(); return !!n && 'gpu' in n && !appleMobile() && !(globalThis as any).__noWebGPU; };
/** The engine file this device uses. */
export const engineFile = (): FileId => (hasGpu() ? 'ortGpu' : 'ortCpu');
/** The text-recognition languages: English and the app's language. */
export function ocrLangs(): { code: string; file: FileId }[] {
  const all: Record<string, { code: string; file: FileId }> = { en: { code: 'eng', file: 'tessEng' }, cs: { code: 'ces', file: 'tessCes' }, de: { code: 'deu', file: 'tessDeu' }, sk: { code: 'slk', file: 'tessSlk' }, pl: { code: 'pol', file: 'tessPol' } };
  const lang = (document.documentElement.lang || 'en').slice(0, 2);
  return lang !== 'en' && all[lang] ? [all.en, all[lang]] : [all.en];
}

export const ADDONS: Addon[] = [
  { id: 'select', get name() { return t('Select object (AI)'); }, get what() { return t('Tap an object to select it.'); }, files: ['msamEncoder', 'msamDecoder'], engine: true, license: 'MobileSAM – Apache-2.0' },
  { id: 'inpaint', get name() { return t('Object removal (AI)'); }, get what() { return t('Remove fills the spot with a trained model – better on objects and structure than the built-in fill.'); }, files: ['migan'], engine: true, license: 'MI-GAN (Picsart) – MIT' },
  { id: 'bg-people', get name() { return t('Background removal – people'); }, get what() { return t('Removes the background behind people (portraits).'); }, files: ['modnet'], engine: true, license: 'MODNet – Apache-2.0' },
  { id: 'bg-any', get name() { return t('Background removal – any subject'); }, get what() { return t('Removes the background behind the main subject: objects, animals, products.'); }, files: ['u2netp'], engine: true, license: 'U²-Netp – Apache-2.0' },
  { id: 'ocr', get name() { return t('Read text (OCR)'); }, get what() { return t('Recognizes text in the image, to copy it.'); }, files: [], engine: false, license: 'Tesseract – Apache-2.0' },
  { id: 'depth', get name() { return t('Depth for 3D relief (AI)'); }, get what() { return t('Estimates the depth of a photo for a 3D-printable relief.'); }, files: ['depth'], engine: true, license: 'Depth Anything V2 small – Apache-2.0' },
];
/** All the files an add-on needs on this device (the engine, OCR's languages). */
export function filesOf(a: Addon): FileId[] {
  const f = [...a.files];
  if (a.engine) f.unshift(engineFile());
  if (a.id === 'ocr') f.push('tessWorker', 'tessCore', ...ocrLangs().map(l => l.file));
  return f;
}
export const addon = (id: string): Addon => ADDONS.find(a => a.id === id);

// ---- the cache ------------------------------------------------------------------------------------------------
const CACHE = 'mosaic-paint-addons-1';
const inDiscord = () => location.hostname.endsWith('discordsays.com') || !!(window as any).__discordSdk;
/** Where a file is fetched from: inside Discord through the Activity's Worker. */
const source = (url: string) => (inDiscord() ? `/.proxy/api/fetch?u=${encodeURIComponent(url)}` : url);
async function cache(): Promise<Cache | null> {
  try { return await caches.open(CACHE); } catch { return null; }
}
/** Downloads kept for this visit too: where the browser has no Cache Storage (or won't keep the files), the
    add-ons still work until the page is closed. */
const memory = new Map<string, ArrayBuffer>();
export async function hasFile(id: FileId): Promise<boolean> {
  if (memory.has(FILES[id].url)) return true;
  const c = await cache();
  try { return !!c && !!(await c.match(FILES[id].url)); } catch { return false; }
}
export async function isInstalled(a: Addon): Promise<boolean> {
  for (const f of filesOf(a)) if (!(await hasFile(f))) return false;
  return true;
}
/** A downloaded file (from the cache; a file that is missing is downloaded – no question asked, so ask first). */
export async function getFile(id: FileId, progress?: (got: number) => void): Promise<ArrayBuffer> {
  const f = FILES[id], kept = memory.get(f.url);
  if (kept) return kept.slice(0);
  const c = await cache();
  const hit = c && await c.match(f.url).catch(() => undefined);
  if (hit) return hit.arrayBuffer();
  const r = await fetch(source(f.url));
  if (!r.ok || !r.body) throw new Error(t('Download failed ({status}).', { status: r.status }));
  // read it in chunks, to show progress
  const reader = r.body.getReader(), parts: Uint8Array[] = [];
  let got = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    parts.push(value);
    got += value.length;
    progress?.(got);
  }
  const buf = new Uint8Array(got);
  let o = 0;
  for (const p of parts) { buf.set(p, o); o += p.length; }
  // kept in the browser's cache; only where that is missing or full, in memory for this visit
  let stored = false;
  if (c) {
    try { await c.put(f.url, new Response(buf, { headers: { 'content-type': 'application/octet-stream' } })); stored = true; } catch { /* full */ }
  }
  if (!stored) memory.set(f.url, buf.buffer.slice(0));
  return buf.buffer;
}
/** Removes an add-on's files that no other installed add-on needs (the shared engine stays while one does). */
export async function removeAddon(a: Addon): Promise<void> {
  const c = await cache() || { delete: async () => true } as unknown as Cache;
  const keep = new Set<FileId>();
  for (const b of ADDONS) if (b !== a && await isInstalled(b)) for (const f of filesOf(b)) keep.add(f);
  for (const f of filesOf(a)) if (!keep.has(f)) { memory.delete(FILES[f].url); await c.delete(FILES[f].url); }
}

export const mb = (bytes: number): string => (bytes >= 1e6 ? `${(bytes / 1e6).toFixed(bytes >= 1e7 ? 0 : 1)} MB` : `${Math.max(1, Math.round(bytes / 1e3))} kB`);
/** What is still to be downloaded for the add-on (its missing files). */
async function missing(a: Addon): Promise<FileId[]> {
  const out: FileId[] = [];
  for (const f of filesOf(a)) if (!(await hasFile(f))) out.push(f);
  return out;
}

// ---- asking first ---------------------------------------------------------------------------------------------
let dlg: HTMLDialogElement | null = null;
function dialog(): HTMLDialogElement {
  if (dlg) return dlg;
  dlg = document.createElement('dialog');
  dlg.id = 'dlg-addon';
  document.body.append(dlg);
  return dlg;
}
/**
 * Makes sure the add-on's files are here: when some are missing, says what it is and how much it needs and
 * downloads them if the user agrees. Resolves true when the add-on can be used.
 */
const inFlight = new Map<string, Promise<boolean>>();
export function ensureAddon(id: string): Promise<boolean> {
  // asked again while it is being asked for or downloaded: the same answer
  let p = inFlight.get(id);
  if (!p) { p = ensure(id).finally(() => inFlight.delete(id)); inFlight.set(id, p); }
  return p;
}
async function ensure(id: string): Promise<boolean> {
  const a = addon(id), why = a.unavailable?.();
  if (why) { toast(why); return false; }
  const need = await missing(a);
  if (!need.length) return true;
  const total = need.reduce((s, f) => s + FILES[f].bytes, 0), engine = need.find(f => f === 'ortGpu' || f === 'ortCpu');
  const d = dialog();
  d.innerHTML = `<form method="dialog">
<div class="dlg-head"><h2>${esc(a.name)}</h2></div>
<p>${esc(a.what)}</p>
<p class="addon-size"><b>${esc(t('This needs a one-time download of {size}.', { size: mb(total) }))}</b>${engine ? ` ${esc(t('That includes the AI engine ({size}), shared by all AI add-ons.', { size: mb(FILES[engine].bytes) }))}` : ''}</p>
<p class="note">${esc(t('It is kept in this browser and works offline afterwards; the Add-ons list in the side panel removes it again. Everything runs on this device – your pictures are not uploaded.'))} ${esc(a.license)}.</p>
<div class="addon-progress" hidden><progress max="1" value="0"></progress> <span></span></div>
<div class="row dlg-foot"><button value="cancel" formnovalidate>${esc(t('Cancel'))}</button><button value="ok" class="primary">${esc(t('Download {size}', { size: mb(total) }))}</button></div>
</form>`;
  d.returnValue = '';
  // the answer comes from the buttons themselves (Esc: no) – not from the close event, which comes a moment
  // later: a tap in between must not get this answer
  const ok = await new Promise<boolean>((resolve) => {
    const answer = (yes: boolean) => (e?: Event) => { e?.preventDefault(); d.oncancel = null; d.close(); resolve(yes); };
    d.querySelector<HTMLElement>('button[value=ok]').onclick = answer(true);
    d.querySelector<HTMLElement>('button[value=cancel]').onclick = answer(false);
    d.oncancel = answer(false);
    d.showModal();
  });
  if (!ok) return false;
  // downloading: the same dialog shows the progress (it can't be cancelled midway, but the files are small)
  d.innerHTML = `<div class="dlg-head"><h2>${esc(a.name)}</h2></div><p>${esc(t('Downloading…'))}</p><div class="addon-progress"><progress max="1" value="0"></progress> <span></span></div>`;
  d.showModal();
  const bar = d.querySelector('progress'), label = d.querySelector('.addon-progress span');
  let done = 0;
  try {
    for (const f of need) {
      await getFile(f, (got) => {
        bar.value = Math.min(1, (done + got) / total);
        label.textContent = `${mb(done + got)} / ${mb(total)}`;
      });
      done += FILES[f].bytes;
    }
    // ask to keep the files when space runs low – without waiting: Firefox asks the user, who may not answer
    try { navigator.storage?.persist?.().catch(() => {}); } catch { /* best effort */ }
    d.close();
    toast(t('{name} is ready.', { name: a.name }));
    renderAddons();
    return true;
  } catch (e) {
    d.close();
    toast(t('Could not download it: {why}', { why: String((e as Error)?.message || e) }));
    return false;
  }
}

// ---- the list in the side panel ---------------------------------------------------------------------------------
/** Fills the Add-ons section (#addons): every add-on with its size, and Download / Remove. */
export async function renderAddons(): Promise<void> {
  const box = document.getElementById('addons');
  if (!box) return;
  const rows: string[] = [];
  let used = 0;
  for (const a of ADDONS) {
    const files = filesOf(a), size = files.reduce((s, f) => s + FILES[f].bytes, 0), inst = await isInstalled(a), why = a.unavailable?.();
    if (inst) used += a.files.reduce((s, f) => s + FILES[f].bytes, 0);
    rows.push(`<div class="addon-row" data-id="${a.id}"><div><b>${esc(a.name)}</b> <span class="note">${inst ? esc(t('installed')) : esc(mb(size))}</span><div class="note">${esc(a.what)}</div></div>`
      + (why && !inst ? `<span class="note">${esc(why)}</span>` : `<button class="${inst ? 'addon-remove' : 'addon-get'}">${esc(inst ? t('Remove') : t('Download'))}</button>`) + '</div>');
  }
  if (await hasFile(engineFile())) used += FILES[engineFile()].bytes;
  box.innerHTML = rows.join('') + `<p class="note">${esc(t('Used by add-ons: {size}. Sizes include the shared AI engine where it is not downloaded yet.', { size: mb(used) }))}</p>`;
  for (const b of box.querySelectorAll<HTMLElement>('.addon-get')) b.onclick = () => ensureAddon(b.closest<HTMLElement>('.addon-row').dataset.id);
  for (const b of box.querySelectorAll<HTMLElement>('.addon-remove')) {
    b.onclick = async () => {
      await removeAddon(addon(b.closest<HTMLElement>('.addon-row').dataset.id));
      toast(t('Removed the add-on.'));
      renderAddons();
    };
  }
}
/** Removes downloads no add-on uses any more (an add-on that changed its model leaves the old one behind). */
export async function pruneCache(): Promise<void> {
  const c = await cache();
  if (!c) return;
  const known = new Set(Object.values(FILES).map(f => f.url));
  try { for (const r of await c.keys()) if (!known.has(r.url)) await c.delete(r); } catch { /* best effort */ }
}
export const bindAddons = (): void => { pruneCache().then(() => { if ($('#addons')) renderAddons(); }); };
