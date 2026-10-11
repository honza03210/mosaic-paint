/* Mosaic Paint – sharing. The whole drawing (all pages) is compressed into the link itself, after
   the "#", so no server is involved and it is never uploaded anywhere. Opening such a link shows
   the mosaic read-only; "Make my own copy" turns it into an editable drawing. */
import { MZ } from '../core/api.ts';
import { pack, unpack } from '../lib/pack.ts';
import { t } from '../shared/i18n.ts';
import { $ } from '../shared/ui.ts';

export const Share = (() => {
  const LONG = 64 * 1024, MAX = 2 * 1024 * 1024; // links get unwieldy above ~64 KB; browsers stop at a few MB

  // ---- dialog -------------------------------------------------------------------------------
  let link = '';
  async function makeLink() {
    const svg = MZ.buildSVGString({ photo: $('#share-photo').checked }).replace(/>\n</g, '><');
    const packed = await pack(svg);
    link = `${location.origin}${location.pathname}#view=${packed}`;
    const kb = Math.round(link.length / 1024);
    $('#share-link').value = link;
    $('#share-size').textContent = link.length > MAX
      ? t('The link would be {kb} KB – too long. Share the file instead, or leave out the photo.', { kb })
      : (link.length > LONG ? t('The link is {kb} KB – long links can get cut off in some messengers; sharing the file is safer. Anyone with it can view the mosaic and make their own copy.', { kb }) : t('The link is {kb} KB. Anyone with it can view the mosaic and make their own copy.', { kb }));
    $('#share-copy').disabled = link.length > MAX;
  }
  async function shareFile() {
    const file = new File([MZ.buildSVGString()], MZ.fileName, { type: 'image/svg+xml' });
    try { await navigator.share({ files: [file], title: MZ.fileName }); } catch (e) { if (e.name !== 'AbortError') MZ.toast(t('Sharing failed.')); }
  }
  $('#btn-share').onclick = async () => { $('#dlg-share').showModal(); await makeLink(); };
  $('#share-photo').onchange = makeLink;
  $('#share-copy').onclick = async () => {
    try { await navigator.clipboard.writeText(link); MZ.toast(t('Link copied.')); } catch { $('#share-link').select(); document.execCommand('copy'); MZ.toast(t('Link copied.')); }
  };
  const canShareFiles = !!(navigator.canShare && navigator.canShare({ files: [new File(['x'], 'x.svg', { type: 'image/svg+xml' })] }));
  $('#share-file').hidden = !canShareFiles;
  $('#share-file').onclick = shareFile;

  // ---- opening a shared link: read-only viewer -----------------------------------------------
  let viewing = false;
  const blockKeys = (e) => {
    if (!viewing || MZ.typingIn(e.target)) return;
    const k = e.key;
    // zooming and panning stay available
    if (['+', '=', '-', '_', '0', ' '].includes(k) && !e.ctrlKey && !e.metaKey) return;
    if (k === 'Escape') return;
    e.stopPropagation();
  };
  document.addEventListener('keydown', blockKeys, true);
  document.addEventListener('paste', (e) => { if (viewing) e.stopPropagation(); }, true);

  async function openShared(packed) {
    let svg;
    try { svg = await unpack(packed); } catch { MZ.toast(t('This share link is damaged or incomplete.')); return; }
    // the visitor's own drawing stays untouched: autosave pauses, and a copy goes into History
    MZ.pauseAutosave(true);
    if (MZ.hasContent()) await MZ.saveVersion(t('Before opening a shared mosaic'));
    if (!MZ.loadSVGText(svg, { restore: true, name: 'shared.svg' })) { MZ.pauseAutosave(false); return; }
    viewing = true;
    document.body.classList.add('viewer');
    MZ.setTool('pan');
    MZ.fitView();
  }
  function makeCopy() {
    viewing = false;
    document.body.classList.remove('viewer');
    history.replaceState(null, '', location.pathname + location.search);
    MZ.pauseAutosave(false);
    MZ.setTool('select');
    MZ.docChanged();
    MZ.toast(t('This is now your own copy – it is saved in this browser like any drawing.'));
  }
  function closeViewer() {
    history.replaceState(null, '', location.pathname + location.search);
    location.reload(); // back to the visitor's own drawing, untouched
  }
  $('#viewer-copy').onclick = makeCopy;
  $('#viewer-close').onclick = closeViewer;
  const fromHash = () => {
    const m = /^#view=([zu][A-Za-z0-9_-]+)$/.exec(location.hash);
    if (m) openShared(m[1]);
  };
  MZ.on('ready', fromHash);
  window.addEventListener('hashchange', fromHash); // a link pasted into a tab that is already open

  return { pack, unpack, get viewing() { return viewing; } };
})();
