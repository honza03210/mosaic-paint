/* Example projects, made on the spot: two vector drawings (a coaster and a sign) and two raster images
   (a pixel-art heart and a sunset to turn into a mosaic). Pure: the apps open what these return. */
import type { Img } from './raster.ts';

const n = (v: number) => String(Math.round(v * 1000) / 1000);
const GROUT = '#d9d4cb';

/** A Mosaic Paint SVG of square tiles on a grout background. tiles: [x, y, size, color] in mm. */
function tileSvg(w: number, h: number, tiles: [number, number, number, string][], paletteName: string): string {
  const palette = [...new Set(tiles.map(t => t[3]))];
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}mm" height="${h}mm">
<metadata id="mosaic-palette">${JSON.stringify({ palette: [...palette, GROUT], paletteName, unit: 'mm' })}</metadata>
<rect id="mosaic-bg" x="0" y="0" width="${w}" height="${h}" fill="${GROUT}"/>
<g id="mosaic-fills"></g>
<g id="mosaic-shapes">
${tiles.map(([x, y, s, c]) => `<rect x="${n(x)}" y="${n(y)}" width="${n(s)}" height="${n(s)}" fill="${c}" stroke="none"/>`).join('\n')}
</g>
</svg>`;
}

/** A 100 mm coaster: 10 × 10 tiles in rings of color around the middle. */
export function coasterSvg(paletteName: string): string {
  const rings = ['#e76f51', '#f4a261', '#e9c46a', '#2a9d8f', '#264653'], tiles: [number, number, number, string][] = [];
  for (let j = 0; j < 10; j++) for (let i = 0; i < 10; i++) {
    const ring = Math.floor(Math.max(Math.abs(i - 4.5), Math.abs(j - 4.5)));
    tiles.push([i * 10 + 0.75, j * 10 + 0.75, 8.5, rings[ring]]);
  }
  return tileSvg(100, 100, tiles, paletteName);
}

/** 5 × 7 letters for the signs (rows top down, # = tile). */
const FONT: Record<string, string[]> = {
  A: ['.###.', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  D: ['####.', '#...#', '#...#', '#...#', '#...#', '#...#', '####.'],
  E: ['#####', '#....', '#....', '####.', '#....', '#....', '#####'],
  H: ['#...#', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  I: ['.###.', '..#..', '..#..', '..#..', '..#..', '..#..', '.###.'],
  J: ['..###', '...#.', '...#.', '...#.', '#..#.', '#..#.', '.##..'],
  M: ['#...#', '##.##', '#.#.#', '#.#.#', '#...#', '#...#', '#...#'],
  O: ['.###.', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
  V: ['#...#', '#...#', '#...#', '#...#', '#...#', '.#.#.', '..#..'],
};
/** The letters signs can be made of. */
export const signLetters = Object.keys(FONT).join('');

/** A sign: the word in dark tiles on light ones, with a border, tiles 6 mm apart. */
export function signSvg(word: string, paletteName: string): string {
  const letters = [...word.toUpperCase()].filter(c => FONT[c]), pitch = 6, cols = letters.length * 6 + 3, rows = 11;
  const tiles: [number, number, number, string][] = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    let color = r === 0 || c === 0 || r === rows - 1 || c === cols - 1 ? '#e76f51' : '#f1e3c6';
    const li = Math.floor((c - 2) / 6), lc = (c - 2) % 6, lr = r - 2;
    if (lr >= 0 && lr < 7 && li >= 0 && li < letters.length && lc < 5 && FONT[letters[li]][lr][lc] === '#') color = '#264653';
    tiles.push([c * pitch + 0.5, r * pitch + 0.5, pitch - 1, color]);
  }
  return tileSvg(cols * pitch, rows * pitch, tiles, paletteName);
}

const hex = (c: string) => [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];

/** A 16 × 16 pixel-art heart (o outline, R red, r shade, * highlight, . nothing). */
const HEART = [
  '................',
  '................',
  '...ooo....ooo...',
  '..oRRRo..oRRRo..',
  '.oR**RRooRRRRRo.',
  '.oR*RRRRRRRRRRo.',
  '.oRRRRRRRRRRRro.',
  '.oRRRRRRRRRRRro.',
  '..oRRRRRRRRRro..',
  '...oRRRRRRRro...',
  '....oRRRRRro....',
  '.....oRRRro.....',
  '......oRro......',
  '.......oo.......',
  '................',
  '................',
];
const HEART_COLORS: Record<string, string> = { o: '#6b1d2a', R: '#e63946', r: '#c1121f', '*': '#ffd6dc' };
/** The heart's colors. */
export const HEART_PALETTE = Object.values(HEART_COLORS);

/** A 16 × 16 pixel-art heart: dark outline, red, a light highlight; transparent around it. */
export function heartImage(): Img {
  const W = 16, H = 16, data = new Uint8ClampedArray(W * H * 4);
  HEART.forEach((row, y) => [...row].forEach((ch, x) => { if (HEART_COLORS[ch]) data.set([...hex(HEART_COLORS[ch]), 255], (y * W + x) * 4); }));
  return { width: W, height: H, data };
}

/** The sunset's colors – the palette its mosaic is made of. */
export const SUNSET_COLORS = ['#2b2d5c', '#6b3e75', '#c0566b', '#f28a4a', '#ffd27a', '#1d3557', '#457b9d', '#f4a261'];

/** A sunset over the sea (smooth colors – the example turns it into a mosaic). */
export function sunsetImage(W = 240, H = 160): Img {
  const data = new Uint8ClampedArray(W * H * 4), horizon = Math.round(H * 0.58);
  const mix = (a: number[], b: number[], f: number) => a.map((v, i) => v + (b[i] - v) * f);
  const sky = ['#2b2d5c', '#6b3e75', '#c0566b', '#f28a4a'].map(hex), sea = ['#457b9d', '#1d3557'].map(hex);
  const sun = { x: W / 2, y: horizon, r: H * 0.2 };
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    let c: number[];
    if (y < horizon) {
      const f = (y / horizon) * (sky.length - 1), k = Math.min(sky.length - 2, Math.floor(f));
      c = mix(sky[k], sky[k + 1], f - k);
      if ((x - sun.x) ** 2 + (y - sun.y) ** 2 < sun.r ** 2) c = hex('#ffd27a');
    } else {
      c = mix(sea[0], sea[1], (y - horizon) / (H - horizon));
      // the sun's path on the water: broken stripes, narrower further down
      const half = sun.r * (1 - 0.6 * (y - horizon) / (H - horizon));
      if (Math.abs(x - sun.x) < half && Math.floor((y - horizon) / 6) % 2 === 0) c = hex('#f4a261');
    }
    data.set([...c.map(Math.round), 255], (y * W + x) * 4);
  }
  return { width: W, height: H, data };
}

/** A picture for "Mosaic from your photo": the sunset as 16 × 12 square tiles. */
export function photoTilesSvg(paletteName: string): string {
  const img = sunsetImage(16, 12), tiles: [number, number, number, string][] = [];
  for (let y = 0; y < 12; y++) for (let x = 0; x < 16; x++) {
    const i = (y * 16 + x) * 4, c = '#' + [0, 1, 2].map(k => img.data[i + k].toString(16).padStart(2, '0')).join('');
    tiles.push([x * 10 + 0.75, y * 10 + 0.75, 8.5, c]);
  }
  return tileSvg(160, 120, tiles, paletteName);
}
