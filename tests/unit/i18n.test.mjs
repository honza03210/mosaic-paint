// Every text people see has a Czech translation: the t('…') texts in the code, the static texts and
// tooltips of both pages, and the labels the libraries provide. Placeholders must match.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { CS } from '../../src/shared/i18n-cs.ts';
import * as Patterns from '../../src/lib/patterns.ts';
import * as AutoMosaic from '../../src/lib/automosaic.ts';
import { t, num } from '../../src/shared/i18n.ts';

const root = path.resolve(import.meta.dirname, '..', '..');
const hasWords = (s) => /[A-Za-z]{2}/.test(s);

function codeKeys() {
  const keys = new Set(), files = [];
  (function walk(d) {
    for (const f of fs.readdirSync(d)) {
      const p = path.join(d, f);
      if (fs.statSync(p).isDirectory()) walk(p); else if (p.endsWith('.ts')) files.push(p);
    }
  })(path.join(root, 'src'));
  const re = /(?<![\w.])t\(\s*('(?:[^'\\\n]|\\.)*'|`(?:[^`\\$]|\\.)*`)/g;
  for (const f of files) {
    // comments may mention t('…') as an example: they are not texts people see
    const code = fs.readFileSync(f, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
    for (const m of code.matchAll(re)) keys.add(new Function(`return ${m[1]}`)());
  }
  return keys;
}
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
function htmlKeys(file) {
  const html = fs.readFileSync(path.join(root, file), 'utf8').replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
  const keys = new Set();
  for (const m of html.matchAll(/>([^<]+)</g)) { const s = decode(m[1]).trim(); if (s) keys.add(s); }
  for (const m of html.matchAll(/\s(?:title|placeholder|aria-label)="([^"]*)"/g)) { const s = decode(m[1]).trim(); if (s) keys.add(s); }
  // the page title and description are for search engines and tabs: kept as they are
  for (const m of html.matchAll(/<title>([^<]*)<\/title>/g)) keys.delete(decode(m[1]).trim());
  return keys;
}
function allKeys() {
  const keys = new Set([...codeKeys(), ...htmlKeys('index.html'), ...htmlKeys('raster.html')]);
  for (const [, label] of Patterns.TYPES) keys.add(label);
  for (const [, label] of AutoMosaic.STYLES) keys.add(label);
  for (const k of ['portrait', 'landscape']) keys.add(k);
  // names (the app, languages, file formats, keys and units) stay as they are
  return [...keys].filter(hasWords).filter(k => !/^(Mosaic Paint|English|Čeština|STL|PNG|SVG|Ctrl\+.*|px|mm|cm|in|1:1)$/.test(k));
}

test('every text has a Czech translation', () => {
  const missing = allKeys().filter(k => CS[k] == null);
  if (missing.length) fs.writeFileSync(path.join(root, 'test-results-i18n-missing.json'), JSON.stringify(missing, null, 1));
  assert.deepEqual(missing.slice(0, 20), [], `${missing.length} texts have no Czech translation (all listed in test-results-i18n-missing.json)`);
});

test('translations keep the placeholders of the English text', () => {
  // the same names (Czech may add a word form, e.g. {n|dlaždice|dlaždice|dlaždic}, where English needs none)
  const names = (s) => [...new Set([...s.matchAll(/\{(\w+)(?:\|[^}]*)?\}/g)].map(m => m[1]))].sort();
  const bad = Object.entries(CS).filter(([en, cs]) => names(en).join() !== names(cs).join());
  assert.deepEqual(bad, []);
});

test('t() fills in values and picks the English word form', () => {
  assert.equal(t('Made {n} {n|tile|tiles} in {c} {c|color|colors}.', { n: 1, c: 3 }), 'Made 1 tile in 3 colors.');
  assert.equal(t('Made {n} {n|tile|tiles} in {c} {c|color|colors}.', { n: 1152, c: 1 }), 'Made 1,152 tiles in 1 color.');
  assert.equal(num(2.5, 2), '2.50');
});
