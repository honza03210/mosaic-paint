// The GIF reader against GIFs written by Pillow (tests/fixtures/gif, with what Pillow itself reads from them).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { decodeGif } from '../../src/lib/gif.ts';

const dir = path.join(import.meta.dirname, '..', 'fixtures', 'gif');
for (const name of ['solid', 'moving', 'interlaced', 'noise']) {
  test(`${name}.gif: size, frames and pixels as Pillow reads them`, () => {
    const gif = decodeGif(new Uint8Array(fs.readFileSync(path.join(dir, name + '.gif'))));
    const want = JSON.parse(fs.readFileSync(path.join(dir, name + '.json'), 'utf8'));
    assert.equal(gif.width, want.width);
    assert.equal(gif.height, want.height);
    assert.equal(gif.frames.length, want.frames);
    // every frame, whole (the color of transparent pixels doesn't matter)
    gif.frames.forEach((fr, i) => {
      const b = Buffer.from(fr.rgba);
      for (let k = 0; k < b.length; k += 4) if (!b[k + 3]) b.fill(0, k, k + 3);
      assert.equal(createHash('sha1').update(b).digest('hex'), want.sha1[i], `frame ${i}`);
    });
    for (const c of want.checks) {
      for (const [x, y, rgba] of c.pixels) {
        const o = (y * gif.width + x) * 4, got = [...gif.frames[c.frame].rgba.slice(o, o + 4)];
        // a transparent pixel's color doesn't matter
        if (rgba[3] === 0) assert.equal(got[3], 0, `frame ${c.frame} (${x}, ${y})`);
        else assert.deepEqual(got, rgba, `frame ${c.frame} (${x}, ${y})`);
      }
    }
  });
}

test('delays; not a GIF', () => {
  const gif = decodeGif(new Uint8Array(fs.readFileSync(path.join(dir, 'solid.gif'))));
  assert.deepEqual(gif.frames.map(f => f.delay), [100, 200, 300]);
  assert.throws(() => decodeGif(new Uint8Array([1, 2, 3])), /not a GIF/);
});

test('frame by frame: the same pictures, and it can stop early', () => {
  const buf = new Uint8Array(fs.readFileSync(path.join(dir, 'moving.gif')));
  const all = decodeGif(buf), seen = [];
  decodeGif(buf, (rgba, delay, i) => { seen.push(Buffer.from(rgba).equals(Buffer.from(all.frames[i].rgba))); return i === 1; });
  assert.deepEqual(seen, [true, true]);
});
