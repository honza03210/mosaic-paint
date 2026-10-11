/* Mosaic Paint – tiles handed over from the raster app ("Open as vector tiles"): they arrive through
   browser storage and index.html#from-raster, and open like a file (the current drawing goes to History). */
import { MZ } from '../core/api.ts';
import { Store } from '../lib/store.ts';
import { t } from '../shared/i18n.ts';

async function importFromRaster(): Promise<void> {
  if (location.hash !== '#from-raster') return;
  history.replaceState(null, '', location.pathname + location.search);
  let rec: { svg: string; name: string; tiles: number } | null = null;
  try { rec = await Store.get('handoff'); } catch { /* storage unavailable */ }
  if (!rec || !rec.svg) { MZ.toast(t('Nothing to import from the raster app.')); return; }
  await Store.set('handoff', null).catch(() => {});
  if (await MZ.openText(rec.svg, rec.name)) {
    MZ.toast(t('Opened {n} tiles from the raster app – your previous drawing is in History.', { n: rec.tiles }));
  }
}
MZ.on('ready', importFromRaster);
window.addEventListener('hashchange', importFromRaster);
