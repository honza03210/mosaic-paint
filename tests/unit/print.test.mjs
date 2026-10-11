import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import * as Printing from '../../src/lib/print.ts';

test('a mosaic that fits on one sheet is not split', () => {
  const L = Printing.layout(150, 150, 'a4', 'real');
  assert.equal(L.sheets.length, 1);
  assert.equal(L.scale, 1);
});

test('a 30 × 30 cm mosaic needs 2 × 2 overlapping A4 sheets at real size', () => {
  const L = Printing.layout(300, 300, 'a4', 'real');
  assert.equal(L.sheets.length, 4);
  assert.equal(L.sheets.map(s => s.label).join(), 'A1,A2,B1,B2');
  // together the sheets cover the whole drawing, each staying within the printable area
  const right = Math.max(...L.sheets.map(s => s.x + s.w)), bottom = Math.max(...L.sheets.map(s => s.y + s.h));
  assert.equal(right, 300);
  assert.equal(bottom, 300);
  for (const s of L.sheets) {
    assert.ok(s.w <= (L.orientation === 'portrait' ? 190 : 277) + 1e-9);
    assert.ok(s.w > 0 && s.h > 0);
  }
  // neighbours overlap by the overlap strip
  const [a1, a2] = L.sheets;
  assert.equal(a1.x + a1.w - a2.x, Printing.OVERLAP);
});

test('wide mosaics pick landscape when that needs fewer sheets', () => {
  const L = Printing.layout(270, 150, 'a4', 'real');
  assert.equal(L.orientation, 'landscape');
  assert.equal(L.sheets.length, 1);
});

test('fit mode scales down to one sheet', () => {
  const L = Printing.layout(1000, 500, 'a4', 'fit');
  assert.equal(L.sheets.length, 1);
  assert.ok(L.scale < 0.3 && L.scale > 0.25);
});

test('the print page puts the drawing on every sheet', () => {
  const html = Printing.html({ art: '<rect width="300" height="300"/>', box: { x: 0, y: 0, w: 300, h: 300 }, unit: 'mm', title: 'T' });
  assert.equal((html.match(/<use href="#art"/g) || []).length, 5); // overview + 4 sheets
  assert.match(html, /@page \{ size: A4 (portrait|landscape)/);
});

test('the offline cache lists both pages and every script and stylesheet they load', () => {
  const root = path.resolve(import.meta.dirname, '..', '..');
  const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
  for (const page of ['index.html', 'raster.html']) {
    assert.ok(sw.includes(`'${page}'`), `${page} is missing from sw.js`);
    const index = fs.readFileSync(path.join(root, page), 'utf8');
    for (const [, src] of index.matchAll(/<script src="([^"]+)"/g)) assert.ok(sw.includes(`'${src}'`), `${src} is missing from sw.js`);
    for (const [, href] of index.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)) assert.ok(sw.includes(`'${href}'`), `${href} is missing from sw.js`);
  }
});
