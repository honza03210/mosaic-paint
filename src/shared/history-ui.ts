/* The version history dialog shared by both apps: earlier versions kept in the browser, with a picture
   of each, its size and colors, restored with one click; versions can be named and pinned (pinned ones are
   kept when old versions are cleared). The app (host) says how to list, show, save and restore its versions. */
import { Store, type Version } from '../lib/store.ts';
import { toast } from './ui.ts';
import { t, lang, num } from './i18n.ts';
import { esc } from '../lib/html.ts';

export interface HistoryHost {
  /** the texts that name what the app edits (whole sentences: other languages change words around the noun) */
  texts: { intro: string; empty: string };
  list(): Promise<Version[]>;
  /** a picture of the version */
  thumbnail(v: Version): Blob;
  /** extra detail shown with it (e.g. "120 painted areas") */
  detail(v: Version): string;
  restore(v: Version): Promise<void>;
  /** saves the current state as a version now */
  saveNow(): Promise<boolean>;
}

export function initHistoryUI(host: HistoryHost, button: HTMLElement): void {
  const dlg = document.createElement('dialog');
  dlg.id = 'dlg-history';
  dlg.innerHTML = `<form method="dialog" class="dlg-head"><h2>${t('History')}</h2><button title="${t('Close')}">✕</button></form>
<p class="note">${esc(host.texts.intro)}</p>
<div class="row"><button id="hist-save">${t('Save a version now')}</button></div>
<div id="hist-list"></div>`;
  document.body.append(dlg);
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  const list = dlg.querySelector('#hist-list') as HTMLElement;

  let thumbs: string[] = [];
  async function render(): Promise<void> {
    thumbs.forEach(u => URL.revokeObjectURL(u));
    thumbs = [];
    let versions: Version[];
    try { versions = await host.list(); } catch { list.innerHTML = `<p class="note">${t('Version history needs browser storage (IndexedDB), which is not available here.')}</p>`; return; }
    if (!versions.length) { list.innerHTML = `<p class="note">${esc(host.texts.empty)}</p>`; return; }
    list.innerHTML = '';
    for (const v of versions) {
      const row = document.createElement('div');
      row.className = 'hist-row' + (v.pinned ? ' pinned' : '');
      const url = URL.createObjectURL(host.thumbnail(v));
      thumbs.push(url);
      const when = new Date(v.time).toLocaleString(lang);
      const facts = [v.title ? when : '', v.name, v.note, host.detail(v),
        v.size ? `${num(+v.size.w.toFixed(1))} × ${num(+v.size.h.toFixed(1))} ${v.size.unit}` : '',
        v.colors != null ? t('{n} {n|color|colors}', { n: v.colors }) : ''].filter(Boolean);
      row.innerHTML = `<img src="${url}" alt=""><div class="hist-info"><b>${v.pinned ? '★ ' : ''}${esc(v.title || when)}</b><span>${esc(facts.join(' · '))}</span></div>`;
      const pin = document.createElement('button'), rename = document.createElement('button'), restore = document.createElement('button');
      pin.className = 'hist-pin';
      pin.textContent = '★';
      pin.title = v.pinned ? t('Unpin – it may be cleared with old versions') : t('Pin – kept when old versions are cleared');
      pin.setAttribute('aria-pressed', String(!!v.pinned));
      pin.onclick = () => change(v, { pinned: !v.pinned });
      rename.textContent = '✎';
      rename.title = rename.ariaLabel = t('Name this version');
      rename.onclick = () => {
        const title = prompt(t('Name of this version:'), v.title || '');
        if (title != null) change(v, { title: title.trim() || undefined });
      };
      restore.textContent = t('Restore');
      restore.onclick = async () => { dlg.close(); await host.restore(v); };
      row.append(pin, rename, restore);
      list.append(row);
    }
  }
  async function change(v: Version, what: Partial<Version>): Promise<void> {
    try { await Store.updateVersion({ ...v, ...what }); } catch { toast(t('Could not save a version (browser storage unavailable).')); }
    render();
  }
  button.onclick = () => { render(); dlg.showModal(); };
  (dlg.querySelector('#hist-save') as HTMLElement).onclick = async () => {
    toast(await host.saveNow() ? t('Version saved.') : t('Could not save a version (browser storage unavailable).'));
    render();
  };
}
