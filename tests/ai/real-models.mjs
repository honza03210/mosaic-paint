// A check of the AI add-ons' pre- and post-processing (src/ai/prep.ts) with the real models, outside the
// browser. Not part of the normal tests (the models are big): download them into a folder, then
//   AI_MODELS=<folder> node --experimental-strip-types tests/ai/real-models.mjs
// with onnxruntime-node installed somewhere it can be imported from (ORT=<path to onnxruntime-node>).
// Files: sam_enc.onnx, sam_dec.onnx (SlimSAM quantized), migan.onnx, modnet.onnx, depth.onnx, u2netp.onnx.
import path from 'node:path';
import { createRequire } from 'node:module';
import * as P from '../../src/ai/prep.ts';

const dir = process.env.AI_MODELS, ort = createRequire(import.meta.url)(process.env.ORT || 'onnxruntime-node');
const model = (f) => ort.InferenceSession.create(path.join(dir, f));
let failed = 0;
const check = (ok, what) => { console.log(ok ? '  ok ' : '  FAIL', what); if (!ok) failed++; };

// a test picture: a shaded red ball on a textured green-gray background
const W = 320, H = 240, data = new Uint8ClampedArray(W * H * 4);
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const d = Math.hypot(x - 160, y - 120), i = (y * W + x) * 4;
  if (d < 60) { const l = 0.55 + 0.45 * Math.sqrt(Math.max(0, 1 - (d / 60) ** 2)); data.set([230 * l, 40 * l, 40 * l, 255], i); } else {
    const n = rnd() * 30;
    data.set([90 + n + y * 0.1, 120 + n, 90 + n, 255], i);
  }
}
const img = { width: W, height: H, data };
const inBall = (x, y) => Math.hypot(x - 160, y - 120) < 60;

console.log('SlimSAM: tap the ball');
{
  const enc = await model('sam_enc.onnx'), dec = await model('sam_dec.onnx');
  const { pixels, scale } = P.samInput(img);
  let t = Date.now();
  const e = await enc.run({ pixel_values: new ort.Tensor('float32', pixels, [1, 3, 1024, 1024]) });
  console.log('  encoder', Date.now() - t, 'ms');
  const { coords, labels } = P.samPoints([{ x: 160, y: 120, label: 1 }], scale);
  t = Date.now();
  const r = await dec.run({ input_points: new ort.Tensor('float32', coords, [1, 1, 1, 2]), input_labels: new ort.Tensor('int64', labels, [1, 1, 1]), image_embeddings: e.image_embeddings, image_positional_embeddings: e.image_positional_embeddings });
  console.log('  decoder', Date.now() - t, 'ms');
  const m = P.samMask(r.pred_masks.data, r.iou_scores.data, W, H, scale);
  let inter = 0, uni = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const a = m[y * W + x] > 0, b = inBall(x, y); if (a && b) inter++; if (a || b) uni++; }
  check(inter / uni > 0.85, `mask matches the ball (IoU ${(inter / uni).toFixed(2)})`);
}

console.log('MI-GAN: fill the ball away');
{
  const s = await model('migan.onnx'), hole = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) hole[y * W + x] = Math.hypot(x - 160, y - 120) < 66 ? 255 : 0;
  const { image, mask } = P.miganInput(img, hole), t = Date.now();
  const r = await s.run({ image: new ort.Tensor('uint8', image, [1, 3, H, W]), mask: new ort.Tensor('uint8', mask, [1, 1, H, W]) });
  console.log('  ', Date.now() - t, 'ms');
  const out = P.miganOut(r.result.data, W, H), c = out.slice((120 * W + 160) * 4, (120 * W + 160) * 4 + 3);
  check(c[1] > c[0], `the middle is background-colored now (${[...c]})`);
}

console.log('U²-Netp: the subject');
{
  const s = await model('u2netp.onnx'), t = Date.now();
  const r = await s.run({ 'input.1': new ort.Tensor('float32', P.u2netInput(img), [1, 3, 320, 320]) });
  console.log('  ', Date.now() - t, 'ms');
  const a = P.matteToAlpha(r[s.outputNames[0]].data, 320, 320, W, H, true);
  check(a[120 * W + 160] > 200 && a[5 * W + 5] < 60, `ball kept, corner removed (${a[120 * W + 160]}, ${a[5 * W + 5]})`);
}

console.log('MODNet: runs (it is for people; no ball expected)');
{
  const s = await model('modnet.onnx'), { pixels, w, h } = P.modnetInput(img), t = Date.now();
  const r = await s.run({ input: new ort.Tensor('float32', pixels, [1, 3, h, w]) });
  console.log('  ', Date.now() - t, 'ms', w + '×' + h);
  check(r.output.dims[2] === h && r.output.dims[3] === w, 'the matte has the input size');
}

console.log('Depth Anything: runs, 0…1 at the picture size');
{
  const s = await model('depth.onnx'), { pixels, w, h } = P.depthInput(img), t = Date.now();
  const r = await s.run({ pixel_values: new ort.Tensor('float32', pixels, [1, 3, h, w]) });
  console.log('  ', Date.now() - t, 'ms', w + '×' + h, '→', r.predicted_depth.dims.join('×'));
  const d = P.depthOut(r.predicted_depth.data, r.predicted_depth.dims[2], r.predicted_depth.dims[1], W, H);
  check(d.length === W * H && Math.min(...d) >= 0 && Math.max(...d) <= 1 && Math.max(...d) > 0.9, 'stretched to 0…1');
  check(d[120 * W + 160] > d[5 * W + 5], `the ball is nearer than the corner (${d[120 * W + 160].toFixed(2)} > ${d[5 * W + 5].toFixed(2)})`);
}
console.log(failed ? `${failed} failed` : 'all ok');
process.exit(failed ? 1 : 0);
