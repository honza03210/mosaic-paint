/* Mosaic Paint – the version history dialog. */
import { MZ } from '../core/api.ts';
import { Store } from '../lib/store.ts';
import { PhotoTools } from './photo-tools.ts';

const $ = (s: string): any => document.querySelector<any>(s);
const { state } = MZ;
const esc = (s: unknown) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// ---- version history -------------------------------------------------------------------
let thumbs = [];
async function renderHistory() {
  const list = $('#hist-list');
  thumbs.forEach(u => URL.revokeObjectURL(u));
  thumbs = [];
  let versions = [];
  try { versions = await Store.listVersions(); } catch { list.innerHTML = '<p class="note">Version history needs browser storage (IndexedDB), which is not available here.</p>'; return; }
  if (!versions.length) { list.innerHTML = '<p class="note">No versions yet. A version is kept every few minutes while you work, and before you open or start another drawing.</p>'; return; }
  list.innerHTML = '';
  for (const v of versions) {
    const row = document.createElement('div');
    row.className = 'hist-row';
    const url = URL.createObjectURL(new Blob([v.svg], { type: 'image/svg+xml' }));
    thumbs.push(url);
    row.innerHTML = `<img src="${url}" alt=""><div class="hist-info"><b>${new Date(v.time).toLocaleString()}</b><span>${esc(v.name || '')} · ${esc(v.note || '')}${v.tiles ? ` · ${v.tiles} painted areas` : ''}</span></div>`;
    const b = document.createElement('button');
    b.textContent = 'Restore';
    b.onclick = async () => { $('#dlg-history').close(); await MZ.restoreVersion(v); };
    row.append(b);
    list.append(row);
  }
}
$('#btn-history').onclick = () => { renderHistory(); $('#dlg-history').showModal(); };
$('#hist-save').onclick = async () => {
  MZ.toast(await MZ.saveVersion('Saved by hand') ? 'Version saved.' : 'Could not save a version (browser storage unavailable).');
  renderHistory();
};

// ---- color the tiles from the photo (js/photo.js) ----------------------------------------
$('#btn-autocolor').onclick = () => PhotoTools.colorTiles({ onlyUnpainted: state.onlyUnpainted });
