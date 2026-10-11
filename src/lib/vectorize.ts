/* Raster tiles → vector tiles: every piece (connected area of one color) of an image becomes a polygon at
   the real size, in a Mosaic Paint SVG. The grout color (if any) becomes the page background; tiles are the
   other pieces. Pure: runs in a worker too. */
import * as R from './raster.ts';
import { traceAll, ringArea, type Ring } from './trace.ts';

const n = (v: number) => String(Math.round(v * 1000) / 1000);

/**
 * The image as a Mosaic Paint SVG: one filled polygon (or path, with holes) per piece. widthMm: its real
 * width; name: the palette's name. progress: 0…1, now and then.
 */
export function piecesSvg(img: R.Img, grout: string | null, widthMm: number, name: string, progress?: (f: number) => void): { svg: string; tiles: number } {
  const W = img.width, H = img.height, k = widthMm / W, p = R.pieces(img);
  progress?.(0.15);
  // tiles: the pieces that are not grout, numbered 0…
  const ids = new Int32Array(p.colors.length).fill(-1), colors: string[] = [];
  p.colors.forEach((c, i) => { if (c !== grout) { ids[i] = colors.length; colors.push(c); } });
  const labels = p.labels.map(l => (l < 0 ? -1 : ids[l]));
  const rings = traceAll(labels, W, H, colors.length, progress && (f => progress(0.15 + 0.8 * f)));
  const shapes: string[] = [];
  const pts = (r: Ring) => r.map(q => `${n(q.x * k)},${n(q.y * k)}`).join(' ');
  rings.forEach((list, i) => {
    if (list.length === 1) shapes.push(`<polygon points="${pts(list[0])}" fill="${colors[i]}" stroke="none"/>`);
    else {
      // outer edge first, then the holes
      const sorted = [...list].sort((a, b) => Math.abs(ringArea(b)) - Math.abs(ringArea(a)));
      const d = sorted.map(r => 'M' + pts(r).replace(/ /g, 'L') + 'Z').join('');
      shapes.push(`<path d="${d}" fill="${colors[i]}" fill-rule="evenodd" stroke="none"/>`);
    }
  });
  const w = n(widthMm), h = n(H * k), palette = [...new Set(R.colorRows(p).map(r => r.color))];
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}mm" height="${h}mm">
<metadata id="mosaic-palette">${JSON.stringify({ palette, paletteName: name, unit: 'mm' })}</metadata>
${grout ? `<rect id="mosaic-bg" x="0" y="0" width="${w}" height="${h}" fill="${grout}"/>` : ''}
<g id="mosaic-fills"></g>
<g id="mosaic-shapes">
${shapes.join('\n')}
</g>
</svg>`;
  return { svg, tiles: colors.length };
}
