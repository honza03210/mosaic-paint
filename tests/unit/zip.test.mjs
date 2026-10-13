// ZIP files: what zip() writes, unzip() reads back – stored and deflated entries.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { zip, unzip } from '../../src/lib/zip.ts';

test('zip and unzip round trip', async () => {
  const big = 'mosaic '.repeat(500), bytes = new Uint8Array([0, 1, 2, 250, 251]);
  for (const compress of [false, true]) {
    const z = await zip([{ name: 'mimetype', data: 'image/openraster' }, { name: 'data/a.txt', data: big }, { name: 'b.bin', data: bytes }], { compress });
    const files = await unzip(z);
    assert.deepEqual([...files.keys()], ['mimetype', 'data/a.txt', 'b.bin']);
    assert.equal(new TextDecoder().decode(files.get('data/a.txt')), big);
    assert.deepEqual([...files.get('b.bin')], [...bytes]);
  }
});

test('not a ZIP file', async () => {
  await assert.rejects(unzip(new Uint8Array(30)), /not a ZIP/);
});
