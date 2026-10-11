/* Raster tiles → vector tiles: every piece (connected area of one color) of the image becomes a polygon
   in the vector app, at the real size, so the vector app's print templates, laying plan and editing work
   on it. The grout color (if any) becomes the page background; tiles are the other pieces. */
import * as R from '../lib/raster.ts';
import { traceAll, ringArea } from '../lib/trace.ts';
import { Store } from '../lib/store.ts';
import { $, toast } from '../shared/ui.ts';
import { state, rt, savePrefs } from './state.ts';
import { doc, getImage } from './canvas.ts';
import { colorRows } from './report.ts';
import { t } from '../shared/i18n.ts';

const MAX_TILES = 20000;
const n = (v: number) => String(Math.round(v * 1000) / 1000);

/** The image as a Mosaic Paint SVG: one filled polygon (or path, with holes) per piece. */
export function vectorSVG(grout: string | null, widthMm: number): { svg: string; tiles: number } {
  const W = doc.width, H = doc.height, k = widthMm / W, p = R.pieces(getImage());
  // tiles: the pieces that are not grout, numbered 0…
  const ids = new Int32Array(p.colors.length).fill(-1), colors: string[] = [];
  p.colors.forEach((c, i) => { if (c !== grout) { ids[i] = colors.length; colors.push(c); } });
  const labels = p.labels.map(l => (l < 0 ? -1 : ids[l]));
  const rings = traceAll(labels, W, H, colors.length);
  const shapes: string[] = [];
  rings.forEach((list, i) => {
    const pts = (r: { x: number; y: number }[]) => r.map(q => `${n(q.x * k)},${n(q.y * k)}`).join(' ');
    if (list.length === 1) shapes.push(`<polygon points="${pts(list[0])}" fill="${colors[i]}" stroke="none"/>`);
    else {
      // outer edge first, then the holes
      const sorted = [...list].sort((a, b) => Math.abs(ringArea(b)) - Math.abs(ringArea(a)));
      const d = sorted.map(r => 'M' + pts(r).replace(/ /g, 'L') + 'Z').join('');
      shapes.push(`<path d="${d}" fill="${colors[i]}" fill-rule="evenodd" stroke="none"/>`);
    }
  });
  const w = n(widthMm), h = n(H * k), palette = [...new Set([...colorRows(p).map(r => r.color)])];
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}mm" height="${h}mm">
<metadata id="mosaic-palette">${JSON.stringify({ palette, paletteName: rt.fileName.replace(/\.[a-z0-9]+$/i, ''), unit: 'mm' })}</metadata>
${grout ? `<rect id="mosaic-bg" x="0" y="0" width="${w}" height="${h}" fill="${grout}"/>` : ''}
<g id="mosaic-fills"></g>
<g id="mosaic-shapes">
${shapes.join('\n')}
</g>
</svg>`;
  return { svg, tiles: colors.length };
}

function fillDialog(): void {
  const rows = colorRows(R.pieces(getImage())), sel = $('#vz-grout');
  sel.innerHTML = `<option value="">${t('No grout – every piece is a tile')}</option>`
    + rows.map(r => `<option value="${r.color}">${r.color} – ${t('{n} {n|piece|pieces}', { n: r.pieces })}</option>`).join('');
  // a mosaic made here has grout in the mosaic's grout color
  sel.value = rows.some(r => r.color === state.mosaic.groutColor) ? state.mosaic.groutColor : '';
  $('#vz-width').value = state.realWidth;
  info();
}
function info(): void {
  const grout = $('#vz-grout').value || null, rows = colorRows(R.pieces(getImage()));
  const tiles = rows.filter(r => r.color !== grout).reduce((s, r) => s + r.pieces, 0);
  const size = { n: tiles, w: n(state.realWidth), h: n(state.realWidth * doc.height / doc.width) };
  $('#vz-info').textContent = tiles > MAX_TILES
    ? t('{n} {n|tile|tiles} at {w} × {h} mm – too many: make a mosaic or reduce the picture to the palette first.', size)
    : t('{n} {n|tile|tiles} at {w} × {h} mm.', size);
  $('#vz-go').disabled = tiles > MAX_TILES || !tiles;
}
export function bindVectorize(): void {
  $('#btn-vectorize').onclick = () => { fillDialog(); $('#dlg-vectorize').showModal(); };
  $('#vz-grout').onchange = info;
  $('#vz-width').onchange = () => {
    const v = +$('#vz-width').value;
    if (v > 0) { state.realWidth = v; savePrefs(); }
    $('#vz-width').value = state.realWidth;
    info();
  };
  $('#vz-go').onclick = async () => {
    const { svg, tiles } = vectorSVG($('#vz-grout').value || null, state.realWidth);
    try {
      await Store.set('handoff', { svg, name: rt.fileName.replace(/\.[a-z0-9]+$/i, '') + '.svg', time: Date.now(), tiles });
    } catch { toast(t('Could not hand the tiles over (browser storage unavailable).')); return; }
    location.href = 'index.html#from-raster';
  };
}
