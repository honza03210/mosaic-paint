/* Mosaic Paint – the version history dialog (shared with the raster app), wired to the drawing. */
import { MZ } from '../core/api.ts';
import { Store } from '../lib/store.ts';
import { initHistoryUI } from '../shared/history-ui.ts';
import { PhotoTools } from './photo-tools.ts';

const $ = (s: string): any => document.querySelector<any>(s);
const { state } = MZ;

initHistoryUI({
  noun: 'drawing',
  list: () => Store.listVersions('vector'),
  thumbnail: (v) => new Blob([v.svg || ''], { type: 'image/svg+xml' }),
  detail: (v) => (v.tiles ? `${v.tiles} painted areas` : ''),
  restore: (v) => MZ.restoreVersion(v as { svg: string; name?: string; time: number }),
  saveNow: () => MZ.saveVersion('Saved by hand'),
}, $('#btn-history'));

// ---- color the tiles from the photo (features/photo-tools.ts) -----------------------------------
$('#btn-autocolor').onclick = () => PhotoTools.colorTiles({ onlyUnpainted: state.onlyUnpainted });
