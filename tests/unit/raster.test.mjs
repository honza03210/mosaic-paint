import test from 'node:test';
import assert from 'node:assert/strict';
import * as R from '../../src/lib/raster.ts';

/** An image from rows of characters: '.' transparent, other letters are colors from `key`. */
function img(rows, key) {
  const H = rows.length, W = rows[0].length, im = R.makeImg(W, H);
  rows.forEach((row, y) => [...row].forEach((ch, x) => {
    if (ch === '.') return;
    im.data.set(R.rgba(key[ch]), (y * W + x) * 4);
  }));
  return im;
}
/** Back to rows of characters (colors not in `key` become '?'). */
function rows(im, key) {
  const back = Object.fromEntries(Object.entries(key).map(([k, v]) => [v, k]));
  const out = [];
  for (let y = 0; y < im.height; y++) {
    let s = '';
    for (let x = 0; x < im.width; x++) { const c = R.colorAt(im, x, y); s += c ? (back[c] || '?') : '.'; }
    out.push(s);
  }
  return out;
}
const K = { w: '#ffffff', k: '#000000', r: '#ff0000', b: '#0000ff' };

test('flood fill stays inside the outline, and transparent areas fill as one', () => {
  const im = img([
    'wwwww',
    'wkkkw',
    'wkwkw',
    'wkkkw',
    'wwwww',
  ], K);
  const box = R.floodFill(im, 2, 2, R.rgba('#ff0000'));
  assert.deepEqual(box, { x: 2, y: 2, w: 1, h: 1 });
  assert.deepEqual(rows(im, K), ['wwwww', 'wkkkw', 'wkrkw', 'wkkkw', 'wwwww']);
  // the outer ring goes all the way around the black square
  R.floodFill(im, 0, 0, R.rgba('#0000ff'));
  assert.deepEqual(rows(im, K), ['bbbbb', 'bkkkb', 'bkrkb', 'bkkkb', 'bbbbb']);
  // filling with the same color does nothing
  assert.equal(R.floodFill(im, 0, 0, R.rgba('#0000ff')), null);

  const t = img(['..k..', '..k..'], K);
  R.floodFill(t, 0, 0, R.rgba('#ff0000'));
  assert.deepEqual(rows(t, K), ['rrk..', 'rrk..']);
});

test('flood fill with tolerance takes similar colors; non-contiguous fills them everywhere', () => {
  const key = { a: '#646464', c: '#6e6e6e', k: '#000000', r: '#ff0000' };
  const im = img(['acka', 'acka'], key);
  R.floodFill(im, 0, 0, R.rgba('#ff0000'), 0);
  assert.deepEqual(rows(im, key), ['rcka', 'rcka']);
  const im2 = img(['acka', 'acka'], key);
  R.floodFill(im2, 0, 0, R.rgba('#ff0000'), 12);
  assert.deepEqual(rows(im2, key), ['rrka', 'rrka']);
  const im3 = img(['acka', 'acka'], key);
  R.floodFill(im3, 0, 0, R.rgba('#ff0000'), 0, false);
  assert.deepEqual(rows(im3, key), ['rckr', 'rckr']);
  // filling with a color that still matches the tolerance must still stop
  const im4 = img(['aa', 'aa'], key);
  assert.deepEqual(R.floodFill(im4, 0, 0, R.rgba('#6e6e6e'), 40), { x: 0, y: 0, w: 2, h: 2 });
});

test('lines and polygons are drawn without blending', () => {
  const pts = [];
  R.linePixels(0, 0, 4, 2, (x, y) => pts.push([x, y]));
  assert.deepEqual(pts[0], [0, 0]);
  assert.deepEqual(pts.at(-1), [4, 2]);
  assert.equal(pts.length, 5);

  const im = R.makeImg(6, 6);
  const box = R.fillPolygon(im, [{ x: 1, y: 1 }, { x: 5, y: 1 }, { x: 5, y: 5 }, { x: 1, y: 5 }], R.rgba('#ff0000'));
  assert.deepEqual(box, { x: 1, y: 1, w: 4, h: 4 });
  assert.deepEqual(rows(im, K), ['......', '.rrrr.', '.rrrr.', '.rrrr.', '.rrrr.', '......']);

  assert.deepEqual([...R.discMask(1)], [1]);
  const m = R.discMask(5);
  assert.equal(m[0], 0); // corners stay empty: it is round
  assert.equal(m[2 * 5 + 2], 1);
  assert.equal(m[2], 1);
});

test('reducing to a palette maps every pixel to its nearest palette color', () => {
  const key = { a: '#f01010', b: '#1010e0', w: '#fafafa' };
  const im = img(['ab', 'w.'], key);
  const counts = R.quantize(im, ['#ff0000', '#0000ff', '#ffffff']);
  assert.deepEqual(rows(im, K), ['rb', 'w.']);
  assert.deepEqual([...counts].sort(), [['#0000ff', 1], ['#ff0000', 1], ['#ffffff', 1]]);
  assert.deepEqual(R.paletteCounts(im, ['#ff0000', '#00ff00']), new Map([['#ff0000', 1]]));
  assert.deepEqual(R.uniqueColors(im, 10), ['#ff0000', '#0000ff', '#ffffff']);
  assert.equal(R.uniqueColors(im, 2), null);
  assert.equal(R.replaceColor(im, '#ff0000', R.rgba('#000000')), 1);
  assert.equal(R.colorAt(im, 0, 0), '#000000');
});

test('the mosaic effect makes tiles of one color each, separated by grout', () => {
  // left half red-ish, right half blue-ish, 8 × 4 pixels → tiles of 4 px with 1 px grout
  const key = { a: '#e01010', c: '#ff2020', b: '#1010e0', d: '#2020ff' };
  const im = img([
    'acacbdbd',
    'cacadbdb',
    'acacbdbd',
    'cacadbdb',
  ], key);
  const { img: out, counts, tiles } = R.mosaic(im, { tile: 4, grout: 1, groutColor: '#000000', palette: ['#ff0000', '#0000ff', '#00ff00'] });
  assert.equal(tiles, 2);
  assert.deepEqual([...counts].sort(), [['#0000ff', 1], ['#ff0000', 1]]);
  assert.deepEqual(rows(out, K), ['rrrkbbbk', 'rrrkbbbk', 'rrrkbbbk', 'kkkkkkkk']);
  // without a palette each tile keeps its average color
  const avg = R.mosaic(im, { tile: 4, grout: 0, groutColor: null, palette: null });
  assert.equal(R.colorAt(avg.img, 0, 0), '#f01818');
});

test('classify maps pixels to the nearest of a few colors, transparent to -1', () => {
  const key = { a: '#f01010', b: '#1010e0' };
  const im = img(['ab', '.a'], key);
  const { grid, counts } = R.classify(im, ['#0000ff', '#ff0000']);
  assert.deepEqual([...grid], [1, 0, -1, 1]);
  assert.deepEqual(counts, [1, 2]);
});

test('pieces are areas of one color; each gets a spot inside it for its number and an outline', () => {
  const key = { r: '#ff0000', b: '#0000ff' };
  const im = img([
    'rrrbb',
    'rrrbb',
    'rrr.r',
  ], key);
  const p = R.pieces(im);
  assert.deepEqual(p.colors, ['#ff0000', '#0000ff', '#ff0000']); // the lone red pixel is its own piece
  assert.deepEqual(p.sizes, [9, 4, 1]);
  const c = R.pieceCentres(p, 5, 3);
  assert.deepEqual([c[0].x, c[0].y], [1.5, 1.5]); // the middle of the 3 × 3 red square
  assert.ok(c[0].r > c[2].r);
  const d = R.pieceOutlines(p, 5, 3);
  assert.match(d, /M0 0H5/); // the top edge in one run
  assert.match(d, /M3 0V3/); // right of the red square: the blue piece, then the transparent pixel
});
