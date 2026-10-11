/* Mosaic Paint – the phone / tablet layout, installing the app and offline support. */
import { MZ } from '../core/api.ts';

const $ = (s: string): any => document.querySelector<any>(s);
const { state } = MZ;

// ---- phone / tablet layout ------------------------------------------------------------
$('#btn-panel').onclick = () => document.body.classList.toggle('panel-open');
// the slide-in panel starts below the top bar, so ☰ stays reachable to close it
new ResizeObserver(([e]) => document.documentElement.style.setProperty('--topbar-h', (e.target as HTMLElement).offsetHeight + 'px')).observe($('#topbar'));
MZ.stage.addEventListener('pointerdown', () => document.body.classList.remove('panel-open'));
for (const d of document.querySelectorAll<any>('dialog')) {
  d.addEventListener('click', (e) => { if (e.target === d) d.close(); }); // click on the backdrop closes
}

// ---- install & offline ---------------------------------------------------------------------
let installEvent = null;
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
window.addEventListener('appinstalled', () => { $('#btn-install').hidden = true; MZ.toast('Installed – Mosaic Paint now works offline too.'); });
if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
  navigator.serviceWorker.register('sw.js').catch(() => { /* offline support is optional */ });
}
