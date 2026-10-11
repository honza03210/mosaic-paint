/* The version history dialog shared by both apps: earlier versions kept in the browser, with a picture
   of each, restored with one click. The app (host) says how to list, show, save and restore its versions. */
import type { Version } from '../lib/store.ts';
import { toast } from './ui.ts';
import { t, lang } from './i18n.ts';
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
      row.className = 'hist-row';
      const url = URL.createObjectURL(host.thumbnail(v));
      thumbs.push(url);
      const detail = host.detail(v);
      row.innerHTML = `<img src="${url}" alt=""><div class="hist-info"><b>${new Date(v.time).toLocaleString(lang)}</b><span>${esc(v.name || '')} · ${esc(v.note || '')}${detail ? ` · ${esc(detail)}` : ''}</span></div>`;
      const b = document.createElement('button');
      b.textContent = t('Restore');
      b.onclick = async () => { dlg.close(); await host.restore(v); };
      row.append(b);
      list.append(row);
    }
  }
  button.onclick = () => { render(); dlg.showModal(); };
  (dlg.querySelector('#hist-save') as HTMLElement).onclick = async () => {
    toast(await host.saveNow() ? t('Version saved.') : t('Could not save a version (browser storage unavailable).'));
    render();
  };
}
