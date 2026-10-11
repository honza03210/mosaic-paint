/* The app shell shared by both apps: the phone / tablet layout, dialogs, installing the app and offline support. */
import { $, toast } from './ui.ts';
import { t, lang, LANGS, setLang } from './i18n.ts';

export function initShell(stage: HTMLElement): void {
  // ---- language ---------------------------------------------------------------------------------
  const ls = $('#lang-select');
  for (const [code, name] of LANGS) { const o = document.createElement('option'); o.value = code; o.textContent = name; ls.append(o); }
  ls.value = lang;
  ls.onchange = () => setLang(ls.value);

  // ---- phone / tablet layout ------------------------------------------------------------------
  $('#btn-panel').onclick = () => document.body.classList.toggle('panel-open');
  // the slide-in panel starts below the top bar, so ☰ stays reachable to close it
  new ResizeObserver(([e]) => document.documentElement.style.setProperty('--topbar-h', (e.target as HTMLElement).offsetHeight + 'px')).observe($('#topbar'));
  stage.addEventListener('pointerdown', () => document.body.classList.remove('panel-open'));
  for (const d of document.querySelectorAll('dialog')) {
    d.addEventListener('click', (e) => { if (e.target === d) d.close(); }); // click on the backdrop closes
  }

  // ---- install & offline ----------------------------------------------------------------------
  let installEvent: any = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    installEvent = e;
    $('#btn-install').hidden = false;
  });
  $('#btn-install').onclick = async () => {
    if (!installEvent) return;
    installEvent.prompt();
    await installEvent.userChoice;
    installEvent = null;
    $('#btn-install').hidden = true;
  };
  window.addEventListener('appinstalled', () => { $('#btn-install').hidden = true; toast(t('Installed – Mosaic Paint now works offline too.')); });
  // offline support – not inside Discord, where the Activity is always online
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol) && !location.hostname.endsWith('discordsays.com')) {
    navigator.serviceWorker.register('sw.js').catch(() => { /* offline support is optional */ });
  }
}
