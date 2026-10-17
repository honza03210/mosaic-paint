// Fitting a video into a file size: bitrate, resolution, frame rate.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { planVideo, retryBitrate, MARGIN } from '../../src/lib/video-plan.ts';

const MB = 1024 * 1024;

test('a minute of 1080p into 20 MB: about 2.6 Mbit/s for the picture, 720p, the sound at 128 kbit/s', () => {
  const p = planVideo(20 * MB, 60, 1920, 1080, true, 30);
  assert.equal(p.audioBitrate, 128_000);
  assert.ok(Math.abs((p.videoBitrate + p.audioBitrate) * 60 / 8 - 20 * MB * MARGIN) < 1000, 'uses the size, less the margin');
  assert.deepEqual([p.width, p.height, p.frameRate, p.tooLong], [1280, 720, null, false]);
});

test('a short clip keeps its full size; never larger than the original; even sides', () => {
  const p = planVideo(20 * MB, 10, 1920, 1080, false);
  assert.deepEqual([p.width, p.height], [1920, 1080]);
  const small = planVideo(20 * MB, 10, 641, 361, true);
  assert.deepEqual([small.width, small.height], [642, 362]);
  // portrait: the long side is the height
  const tall = planVideo(20 * MB, 120, 1080, 1920, true);
  assert.equal(tall.height, 854);
  assert.equal(tall.width % 2, 0);
});

test('long videos: smaller, 60 fps to 30, and too long when the picture would be mush', () => {
  const p = planVideo(20 * MB, 10 * 60, 1920, 1080, true, 60);
  assert.ok(p.videoBitrate < 300_000 && p.videoBitrate > 120_000, String(p.videoBitrate));
  assert.deepEqual([p.width, p.frameRate, p.tooLong], [480, 30, false]);
  assert.equal(planVideo(10 * MB, 60 * 60, 1920, 1080, true).tooLong, true);
  // the sound gets less as the room shrinks
  assert.equal(planVideo(10 * MB, 30 * 60, 1280, 720, true).audioBitrate, 32_000);
});

test('a try that came out too big: the next bitrate is lower, in proportion to the overshoot', () => {
  const p = planVideo(20 * MB, 60, 1920, 1080, true);
  const next = retryBitrate(p, 24 * MB, 20 * MB, 60);
  assert.ok(next < p.videoBitrate * 0.85 && next > p.videoBitrate * 0.6, String(next / p.videoBitrate));
});
