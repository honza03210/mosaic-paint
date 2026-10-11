import test from 'node:test';
import assert from 'node:assert/strict';

import * as Share from '../../src/lib/pack.ts';

test('a drawing survives packing into a link and back, and gets much smaller', async () => {
  let svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">';
  for (let i = 0; i < 400; i++) svg += `<line x1="${i}" y1="0" x2="${i}" y2="300" stroke="#222222" stroke-width="2"/>`;
  svg += '<text>Žluťoučký kůň ✓</text></svg>';
  const packed = await Share.pack(svg);
  assert.match(packed, /^z[A-Za-z0-9_-]+$/); // safe in a URL
  assert.ok(packed.length < svg.length / 5, `${packed.length} vs ${svg.length}`);
  assert.equal(await Share.unpack(packed), svg);
});

test('uncompressed links (older browsers) can still be opened', async () => {
  const text = '<svg>ü</svg>';
  const bytes = new TextEncoder().encode(text);
  const plain = 'u' + Buffer.from(bytes).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  assert.equal(await Share.unpack(plain), text);
});
