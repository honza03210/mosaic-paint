// Example projects (lib/examples.ts): made on the spot, as the apps open them.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as Ex from '../../src/lib/examples.ts';

test('the coaster: 100 tiles on grout, with its palette', () => {
  const svg = Ex.coasterSvg('Coaster');
  assert.match(svg, /width="100mm" height="100mm"/);
  assert.equal((svg.match(/<rect x=/g) || []).length, 100);
  const meta = JSON.parse(/<metadata id="mosaic-palette">(.*)<\/metadata>/.exec(svg)[1]);
  assert.equal(meta.paletteName, 'Coaster');
  assert.equal(meta.palette.length, 6); // five rings and the grout
});

test('the sign spells the word in the letters it knows', () => {
  for (const word of ['HOME', 'DOMOV', 'AHOJ', 'HEIM', 'DOM']) {
    assert.ok([...word].every(c => Ex.signLetters.includes(c)), word);
    const svg = Ex.signSvg(word, 'Sign'), cols = word.length * 6 + 3;
    assert.equal((svg.match(/<rect x=/g) || []).length, cols * 11);
    assert.match(svg, new RegExp(`width="${cols * 6}mm" height="66mm"`));
  }
  // H: 7 + 7 + 3 dark tiles
  assert.equal((Ex.signSvg('H', 'Sign').match(/fill="#264653"/g) || []).length, 17);
});

test('the heart and the sunset are images of their colors', () => {
  const heart = Ex.heartImage(), seen = new Set();
  for (let i = 0; i < heart.data.length; i += 4) if (heart.data[i + 3]) seen.add('#' + [...heart.data.slice(i, i + 3)].map(v => v.toString(16).padStart(2, '0')).join(''));
  assert.deepEqual([...seen].sort(), [...Ex.HEART_PALETTE].sort());
  const sunset = Ex.sunsetImage(120, 80);
  assert.equal(sunset.data.length, 120 * 80 * 4);
  assert.ok(sunset.data.every((v, i) => i % 4 !== 3 || v === 255)); // no transparent pixels
});
