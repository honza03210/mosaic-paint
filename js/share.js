/* Mosaic Paint – sharing. The whole drawing (all pages) is compressed into the link itself, after
   the "#", so no server is involved and it is never uploaded anywhere. Opening such a link shows
   the mosaic read-only; "Make my own copy" turns it into an editable drawing. */
'use strict';

const Share = (() => {
  const LONG = 64 * 1024, MAX = 2 * 1024 * 1024; // links get unwieldy above ~64 KB; browsers stop at a few MB

  // ---- packing a drawing into text for a URL ---------------------------------------------
  const b64url = (bytes) => {
    let s = '';
    for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  };
  const fromB64url = (s) => {
    const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/'));
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  };
  const pipe = async (bytes, stream) => new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(stream)).arrayBuffer());
  /** 'z…' = deflate-compressed, 'u…' = plain (browsers without CompressionStream). */
  async function pack(text) {
    const bytes = new TextEncoder().encode(text);
    if (typeof CompressionStream !== 'undefined') return 'z' + b64url(await pipe(bytes, new CompressionStream('deflate-raw')));
    return 'u' + b64url(bytes);
  }
  async function unpack(s) {
    const bytes = fromB64url(s.slice(1));
    return new TextDecoder().decode(s[0] === 'z' ? await pipe(bytes, new DecompressionStream('deflate-raw')) : bytes);
  }

  if (typeof MZ === 'undefined') return { pack, unpack };

  // ---- dialog -------------------------------------------------------------------------------
  const $ = (s) => document.querySelector(s);
  let link = '';
  async function makeLink() {
    const svg = MZ.buildSVGString({ photo: $('#share-photo').checked }).replace(/>\n</g, '><');
    const packed = await pack(svg);
    link = `${location.origin}${location.pathname}#view=${packed}`;
    const kb = Math.round(link.length / 1024);
    $('#share-link').value = link;
    $('#share-size').textContent = link.length > MAX
      ? `The link would be ${kb} KB – too long. Share the file instead, or leave out the photo.`
      : `The link is ${kb} KB${link.length > LONG ? ' – long links can get cut off in some messengers; sharing the file is safer' : ''}. Anyone with it can view the mosaic and make their own copy.`;
    $('#share-copy').disabled = link.length > MAX;
  }
  async function shareFile() {
    const file = new File([MZ.buildSVGString()], MZ.fileName, { type: 'image/svg+xml' });
    try { await navigator.share({ files: [file], title: MZ.fileName }); } catch (e) { if (e.name !== 'AbortError') MZ.toast('Sharing failed.'); }
  }
  $('#btn-share').onclick = async () => { $('#dlg-share').showModal(); await makeLink(); };
  $('#share-photo').onchange = makeLink;
  $('#share-copy').onclick = async () => {
    try { await navigator.clipboard.writeText(link); MZ.toast('Link copied.'); } catch { $('#share-link').select(); document.execCommand('copy'); MZ.toast('Link copied.'); }
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
    try { svg = await unpack(packed); } catch { MZ.toast('This share link is damaged or incomplete.'); return; }
    // the visitor's own drawing stays untouched: autosave pauses, and a copy goes into History
    MZ.pauseAutosave(true);
    if (MZ.hasContent()) await MZ.saveVersion('Before opening a shared mosaic');
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
    MZ.toast('This is now your own copy – it is saved in this browser like any drawing.');
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
