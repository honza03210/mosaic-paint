// Every text people see has a Czech translation: the t('…') texts in the code, the static texts and
// tooltips of both pages, and the labels the libraries provide. Placeholders must match.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { DICTS, LANGS } from '../../src/shared/i18n.ts';
import * as Patterns from '../../src/lib/patterns.ts';
import * as AutoMosaic from '../../src/lib/automosaic.ts';
import { t, num, wordForm } from '../../src/shared/i18n.ts';

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

const others = LANGS.map(([code]) => code).filter(code => code !== 'en');

for (const code of others) test(`every text has a translation: ${code}`, () => {
  const missing = allKeys().filter(k => DICTS[code][k] == null);
  if (missing.length) fs.writeFileSync(path.join(root, `test-results-i18n-missing-${code}.json`), JSON.stringify(missing, null, 1));
  assert.deepEqual(missing.slice(0, 20), [], `${missing.length} texts have no ${code} translation (all listed in test-results-i18n-missing-${code}.json)`);
});

test('translations keep the placeholders of the English text', () => {
  // the same names (Czech may add a word form, e.g. {n|dlaždice|dlaždice|dlaždic}, where English needs none)
  const names = (s) => [...new Set([...s.matchAll(/\{(\w+)(?:\|[^}]*)?\}/g)].map(m => m[1]))].sort();
  for (const code of others) {
    const bad = Object.entries(DICTS[code]).filter(([en, tr]) => names(en).join() !== names(tr).join());
    assert.deepEqual(bad, [], code);
  }
});

test('word forms come in the number each language has', () => {
  // German: one | other; Czech, Slovak, Polish: one | few | many
  const want = { de: 2, cs: 3, sk: 3, pl: 3 };
  for (const code of others) {
    const bad = Object.values(DICTS[code]).flatMap(tr => [...tr.matchAll(/\{\w+\|([^}]*)\}/g)].filter(m => m[1].split('|').length !== want[code]).map(m => m[0] + ' in ' + tr));
    assert.deepEqual(bad, [], code);
  }
});

test('t() fills in values and picks the English word form', () => {
  assert.equal(t('Made {n} {n|tile|tiles} in {c} {c|color|colors}.', { n: 1, c: 3 }), 'Made 1 tile in 3 colors.');
  assert.equal(t('Made {n} {n|tile|tiles} in {c} {c|color|colors}.', { n: 1152, c: 1 }), 'Made 1,152 tiles in 1 color.');
  assert.equal(num(2.5, 2), '2.50');
});

test('each language picks its own word form', () => {
  const pl = ['płytka', 'płytki', 'płytek'], cs = ['dlaždice', 'dlaždice', 'dlaždic'], de = ['Fliese', 'Fliesen'];
  assert.deepEqual([1, 2, 4, 5, 12, 22, 25, 0].map(n => wordForm('pl', n, pl)), ['płytka', 'płytki', 'płytki', 'płytek', 'płytek', 'płytki', 'płytek', 'płytek']);
  assert.deepEqual([1, 3, 5, 22, 2.5].map(n => wordForm('cs', n, cs)), ['dlaždice', 'dlaždice', 'dlaždic', 'dlaždic', 'dlaždic']);
  assert.deepEqual([1, 3, 5].map(n => wordForm('sk', n, ['dlaždica', 'dlaždice', 'dlaždíc'])), ['dlaždica', 'dlaždice', 'dlaždíc']);
  assert.deepEqual([1, 2, 0].map(n => wordForm('de', n, de)), ['Fliese', 'Fliesen', 'Fliesen']);
});
