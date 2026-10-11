/* Mosaic Paint – copy / cut / paste of shapes (system clipboard, so it works between pages, drawings
   and browser tabs) and a library of saved motifs to place again and again. Uses snippets.js. */
import { MZ } from '../core/api.ts';
import { Store } from '../lib/store.ts';
import { Snippets } from './snippets.ts';
import { canCopyImages, copyImage, svgToPng, svgSize } from '../shared/clipboard.ts';
import { imageSize } from './image-clipboard.ts';
import { t } from '../shared/i18n.ts';
import { $ } from '../shared/ui.ts';

const { state } = MZ;
let lastPointer = null, internalClip = null;

MZ.svg.addEventListener('pointermove', (e) => { lastPointer = MZ.toDoc(e.clientX, e.clientY); });
MZ.svg.addEventListener('pointerleave', () => { lastPointer = null; });

/** Where pasted / placed things go: under the mouse if it's over the drawing, else where they came from. */
function target(snip) {
  if (lastPointer) return MZ.snapPoint(lastPointer, {});
  return { x: snip.box.x + snip.box.w / 2, y: snip.box.y + snip.box.h / 2 };
}

// ---- clipboard ------------------------------------------------------------------------
// Ctrl+C / Ctrl+X are handled as keys (Safari only sends "copy" events when text is selected);
// the text goes to the system clipboard, and is also kept here in case the browser refuses that.
let clipboardOk = false, pendingCopy = null;
/** viaKey: Ctrl+C / Ctrl+X, which is followed by a copy event that can carry the text too. */
export function copySelection(cut, viaKey = true) {
  const text = Snippets.fromElements(state.selection);
  if (!text) return;
  internalClip = text;
  pendingCopy = viaKey ? text : null;
  clipboardOk = false;
  if (canCopyImages()) {
    // shapes as text (pasted back as shapes here) plus a picture of them for other programs and the raster app
    const { w, h } = svgSize(text);
    copyImage(svgToPng(text, imageSize(w, h)), text).then((ok) => {
      if (ok) clipboardOk = true;
      else if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(() => { clipboardOk = true; }, () => {});
    });
  } else if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(() => { clipboardOk = true; }, () => {});
  const n = state.selection.size;
  if (cut) {
    for (const el of state.selection) el.remove();
    MZ.setSelection([]);
    MZ.commitGeometry();
  }
  MZ.toast(cut ? t('Cut {n} {n|shape|shapes}. Paste with Ctrl+V – also in another page or drawing.', { n }) : t('Copied {n} {n|shape|shapes}. Paste with Ctrl+V – also in another page or drawing.', { n }));
}
document.addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase();
  if (!(e.ctrlKey || e.metaKey) || MZ.typingIn(e.target)) return;
  if ((k === 'c' || k === 'x') && state.selection.size) copySelection(k === 'x');
  if (k === 'v' && internalClip) {
    // the copy never reached the system clipboard: paste ours right away
    if (!clipboardOk) { e.preventDefault(); pasteSnippet(internalClip); return; }
    // some browsers send no paste event at all: if none arrives, paste ours
    pasteSeen = false;
    setTimeout(() => { if (!pasteSeen && internalClip) pasteSnippet(internalClip); }, 80);
  }
});
let pasteSeen = true;
// any paste event (also an image, handled by the editor core) means the browser delivered the clipboard
document.addEventListener('paste', () => { pasteSeen = true; }, true);
// leaving the window may mean copying something else elsewhere: then the system clipboard wins again
window.addEventListener('blur', () => { if (!clipboardOk) internalClip = null; });
// when the browser does send a copy event, it is the surest way into the clipboard
for (const type of ['copy', 'cut']) {
  document.addEventListener(type, (e: ClipboardEvent) => {
    if (!pendingCopy || !e.clipboardData) return;
    e.clipboardData.setData('text/plain', pendingCopy);
    e.preventDefault();
    clipboardOk = true;
    pendingCopy = null;
  });
}

function pasteSnippet(text) {
  const snip = Snippets.parse(text);
  if (!snip) return false;
  const els = Snippets.place(snip, target(snip));
  if (!els.length) return false;
  if (state.tool !== 'select') MZ.setTool('select');
  MZ.commitGeometry();
  MZ.setSelection(els.filter(el => el.isConnected));
  MZ.toast(t('Pasted {n} {n|shape|shapes}.', { n: els.length }));
  return true;
}
MZ.on('pasteText', (text) => {
  pasteSeen = true;
  if (Snippets.isSnippet(text)) return pasteSnippet(text);
  // the copy never reached the system clipboard (or the browser hides it): paste what was copied here
  if (internalClip && (!clipboardOk || !text.trim())) return pasteSnippet(internalClip);
  return false;
});

// ---- motif library ------------------------------------------------------------------------
let motifs = [], placing = null;
async function load() {
  try { motifs = (await Store.get('motifs')) || []; } catch { motifs = JSON.parse(localStorage.getItem('mz-motifs') || '[]'); }
  render();
}
async function persist() {
  try { await Store.set('motifs', motifs); } catch { try { localStorage.setItem('mz-motifs', JSON.stringify(motifs)); } catch { MZ.toast(t('Could not store the motifs.')); } }
}
let thumbs = [];
function render() {
  thumbs.forEach(u => URL.revokeObjectURL(u));
  thumbs = [];
  const list = $('#motif-list');
  list.innerHTML = '';
  if (!motifs.length) { list.innerHTML = `<p class="note">${t('No motifs yet. Select some shapes and save them.')}</p>`; return; }
  for (const m of motifs) {
    const item = document.createElement('div');
    item.className = 'motif' + (placing && placing.id === m.id ? ' active' : '');
    item.title = t('{name} – click, then click on the drawing to place it', { name: m.name });
    const url = URL.createObjectURL(new Blob([m.svg], { type: 'image/svg+xml' }));
    thumbs.push(url);
    item.innerHTML = `<img src="${url}" alt=""><span></span><button class="del" title="${t('Delete this motif')}">×</button>`;
    item.querySelector<any>('span').textContent = m.name;
    item.onclick = () => startPlacing(m);
    item.querySelector<any>('.del').onclick = async (e) => {
      e.stopPropagation();
      if (!confirm(t('Delete the motif “{name}”?', { name: m.name }))) return;
      motifs = motifs.filter(x => x !== m);
      await persist();
      render();
    };
    list.append(item);
  }
}
async function saveSelection() {
  if (!state.selection.size) { MZ.toast(t('Select the shapes of the motif first (Select tool).')); return; }
  const svg = Snippets.fromElements(state.selection);
  const name = prompt(t('Name of the motif:'), t('Motif {n}', { n: motifs.length + 1 }));
  if (!name || !name.trim()) return;
  motifs.push({ id: Date.now().toString(36), name: name.trim(), svg, created: Date.now() });
  await persist();
  render();
  MZ.toast(t('Saved the motif “{name}”.', { name: name.trim() }));
}

// placing: a preview follows the mouse; click to place, R to turn, Esc to stop
function startPlacing(m) {
  const snip = Snippets.parse(m.svg);
  if (!snip) { MZ.toast(t('This motif could not be read.')); return; }
  placing = { id: m.id, name: m.name, snip, angle: 0 };
  MZ.setTool('place-motif');
  render();
  if (lastPointer) preview(lastPointer);
}
function preview(p) {
  const g = $('#mz-preview');
  g.innerHTML = '';
  if (!placing) return;
  const at = MZ.snapPoint(p, {}), m = Snippets.placement(placing.snip, at, placing.angle);
  const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  group.setAttribute('transform', m.toString());
  group.setAttribute('opacity', '0.6');
  for (const layer of placing.snip.root.children) for (const c of layer.children) group.appendChild(document.importNode(c, true));
  g.appendChild(group);
}
MZ.registerTool('place-motif', {
  down(e, raw) {
    if (!placing) return;
    const els = Snippets.place(placing.snip, MZ.snapPoint(raw, {}), placing.angle);
    MZ.commitGeometry();
    MZ.toast(t('Placed “{name}”. Click again for another one, R turns it, Esc stops.', { name: placing.name }));
    return els;
  },
  move(e, raw) { preview(raw); },
  up() {},
}, t('Click to place the motif · R: turn it by 15° (Shift+R: 90°) · Esc: stop'));
document.addEventListener('keydown', (e) => {
  if (state.tool !== 'place-motif' || MZ.typingIn(e.target)) return;
  if (e.key === 'Escape') { placing = null; MZ.setTool('select'); render(); }
  else if (e.key.toLowerCase() === 'r' && !e.ctrlKey && !e.metaKey) {
    placing.angle = (placing.angle + (e.shiftKey ? 90 : 15)) % 360;
    if (lastPointer) preview(lastPointer);
    e.stopPropagation();
  }
}, true);
document.addEventListener('pointerdown', (e) => {
  // choosing another tool ends placing
  const b = (e.target as Element).closest?.('#tools button');
  if (b && placing) { placing = null; render(); }
});

// import / export the library as a file
$('#btn-motif-save').onclick = saveSelection;
$('#btn-motif-export').onclick = () => {
  if (!motifs.length) { MZ.toast(t('There are no motifs to export yet.')); return; }
  MZ.download(new Blob([JSON.stringify({ mosaicMotifs: 1, motifs }, null, 1)], { type: 'application/json' }), 'motifs.json');
};
$('#btn-motif-import').onclick = () => $('#motif-file').click();
$('#motif-file').onchange = async (e) => {
  const f = e.target.files[0];
  if (!f) return;
  const text = await f.text();
  e.target.value = '';
  try {
    const data = JSON.parse(text), list = Array.isArray(data) ? data : data.motifs;
    let n = 0;
    for (const m of list || []) {
      if (!m || typeof m.svg !== 'string' || !Snippets.parse(m.svg)) continue;
      motifs.push({ id: Date.now().toString(36) + n, name: String(m.name || 'Motif'), svg: m.svg, created: Date.now() });
      n++;
    }
    await persist();
    render();
    MZ.toast(n ? t('Imported {n} {n|motif|motifs}.', { n }) : t('No motifs found in that file.'));
  } catch (err) { console.warn(err); MZ.toast(t('That file is not a motif library.')); }
};

load();
