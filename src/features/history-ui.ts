/* Mosaic Paint – the version history dialog (shared with the raster app), wired to the drawing. */
import { MZ } from '../core/api.ts';
import { Store } from '../lib/store.ts';
import { initHistoryUI } from '../shared/history-ui.ts';
import { PhotoTools } from './photo-tools.ts';
import { t } from '../shared/i18n.ts';

const $ = (s: string): any => document.querySelector<any>(s);
const { state } = MZ;

initHistoryUI({
  texts: {
    intro: t('Versions are kept in this browser: every few minutes while you work, and before you open, start or restore another drawing. Restoring keeps your current drawing as a version too.'),
    empty: t('No versions yet. A version is kept every few minutes while you work, and before you open or start another drawing.'),
  },
  list: () => Store.listVersions('vector'),
  thumbnail: (v) => new Blob([v.svg || ''], { type: 'image/svg+xml' }),
  detail: (v) => (v.tiles ? t('{n} painted {n|area|areas}', { n: v.tiles }) : ''),
  restore: (v) => MZ.restoreVersion(v as { svg: string; name?: string; time: number }),
  saveNow: () => MZ.saveVersion(t('Saved by hand')),
}, $('#btn-history'));

// ---- color the tiles from the photo (features/photo-tools.ts) -----------------------------------
$('#btn-autocolor').onclick = () => PhotoTools.colorTiles({ onlyUnpainted: state.onlyUnpainted });
