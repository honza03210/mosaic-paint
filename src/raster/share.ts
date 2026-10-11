/* Sharing: the image (as PNG) is packed into the link itself, after the "#", so nothing is uploaded.
   Opening such a link shows the image read-only; "Make my own copy" turns it into an editable image. */
import { packBytes, unpackBytes } from '../lib/pack.ts';
import { $, toast, typingIn } from '../shared/ui.ts';
import { canvasToPng } from '../shared/clipboard.ts';
import { rt } from './state.ts';
import { doc, fitView } from './canvas.ts';
import { pauseAutosave, saveVersion, scheduleAutosave, updateTitle } from './history.ts';
import { setTool } from './tools.ts';
import { loadCanvas, fileToCanvas } from './files.ts';

const LONG = 64 * 1024, MAX = 2 * 1024 * 1024; // links get unwieldy above ~64 KB; browsers stop at a few MB
let link = '', viewing = false;

async function makeLink(): Promise<void> {
  const png = new Uint8Array(await (await canvasToPng(doc)).arrayBuffer());
  link = `${location.origin}${location.pathname}#view=${packBytes(png)}`;
  const kb = Math.round(link.length / 1024);
  $('#share-link').value = link;
  $('#share-size').textContent = link.length > MAX
    ? `The link would be ${kb} KB – too long. Share the file instead (or make the image smaller).`
    : `The link is ${kb} KB${link.length > LONG ? ' – long links can get cut off in some messengers; sharing the file is safer' : ''}. Anyone with it can view the image and make their own copy.`;
  $('#share-copy').disabled = link.length > MAX;
}
async function shareFile(): Promise<void> {
  const file = new File([await canvasToPng(doc)], rt.fileName, { type: 'image/png' });
  try { await navigator.share({ files: [file], title: rt.fileName }); } catch (e) { if (e.name !== 'AbortError') toast('Sharing failed.'); }
}

// ---- opening a shared link: read-only viewer -------------------------------------------------------
async function openShared(packed: string): Promise<void> {
  let c: HTMLCanvasElement | null = null;
  try { c = await fileToCanvas(new Blob([unpackBytes(packed) as BlobPart], { type: 'image/png' })); } catch { /* damaged */ }
  if (!c) { toast('This share link is damaged or incomplete.'); return; }
  // the visitor's own image stays untouched: autosave pauses, and a copy goes into History
  pauseAutosave(true);
  await saveVersion('Before opening a shared image');
  loadCanvas(c, 'shared.png');
  viewing = true;
  document.body.classList.add('viewer');
  setTool('pan');
  fitView();
}
function makeCopy(): void {
  viewing = false;
  document.body.classList.remove('viewer');
  history.replaceState(null, '', location.pathname + location.search);
  pauseAutosave(false);
  setTool('brush');
  rt.dirty = true;
  updateTitle();
  scheduleAutosave();
  toast('This is now your own copy – it is saved in this browser like any image.');
}
function closeViewer(): void {
  history.replaceState(null, '', location.pathname + location.search);
  location.reload(); // back to the visitor's own image, untouched
}
export const isViewing = (): boolean => viewing;

export function bindShare(): void {
  $('#btn-share').onclick = async () => { $('#dlg-share').showModal(); await makeLink(); };
  $('#share-copy').onclick = async () => {
    try { await navigator.clipboard.writeText(link); } catch { $('#share-link').select(); document.execCommand('copy'); }
    toast('Link copied.');
  };
  const canShareFiles = !!(navigator.canShare && navigator.canShare({ files: [new File(['x'], 'x.png', { type: 'image/png' })] }));
  $('#share-file').hidden = !canShareFiles;
  $('#share-file').onclick = shareFile;
  $('#viewer-copy').onclick = makeCopy;
  $('#viewer-close').onclick = closeViewer;
  // while viewing, only zooming and panning work
  document.addEventListener('keydown', (e) => {
    if (!viewing || typingIn(e.target)) return;
    if (['+', '=', '-', '_', '0', '1', ' ', 'Escape'].includes(e.key) && !e.ctrlKey && !e.metaKey) return;
    e.stopPropagation();
  }, true);
  document.addEventListener('paste', (e) => { if (viewing) e.stopPropagation(); }, true);
  window.addEventListener('hashchange', fromHash); // a link pasted into a tab that is already open
}
/** Opens the shared image in the address, if there is one (after the app has started). */
export function fromHash(): void {
  const m = /^#view=(p[A-Za-z0-9_-]+)$/.exec(location.hash);
  if (m) openShared(m[1]);
}
