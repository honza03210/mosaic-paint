/* The AI worker (dist/ai-worker.js, a module worker): runs the add-ons' models with ONNX Runtime Web, away
   from the page so it never freezes. The page hands it the engine and the models (from the add-on cache);
   it keeps the sessions, and SAM's picture encoding between taps. WebGPU where there is one, else the CPU. */
import * as ortGpu from 'onnxruntime-web/webgpu';
import * as ortCpu from 'onnxruntime-web/wasm';
import * as P from './prep.ts';

type Ort = typeof ortGpu;
let ort: Ort | null = null, gpu = false;
const sessions = new Map<string, any>();
/** SAM's encoding of the current picture (tapping again only runs the small decoder) */
let sam: { key: string; emb: any; pos: any; w: number; h: number; scale: number } | null = null;

async function session(name: string): Promise<any> {
  const s = sessions.get(name);
  if (!s) throw new Error(`model ${name} not loaded`);
  return s;
}
const T = (type: 'float32' | 'uint8' | 'int64', data: any, dims: number[]) => new ort.Tensor(type, data, dims);

const ops: Record<string, (a: any) => Promise<unknown> | unknown> = {
  init(a: { gpu: boolean; wasm: ArrayBuffer }) {
    if (ort) return gpu;
    gpu = a.gpu;
    ort = (a.gpu ? ortGpu : ortCpu) as Ort;
    ort.env.wasm.wasmBinary = a.wasm;
    ort.env.wasm.numThreads = 1;
    ort.env.logLevel = 'error';
    return gpu;
  },
  has: (a: { name: string }) => sessions.has(a.name),
  async load(a: { name: string; model: ArrayBuffer }) {
    if (sessions.has(a.name)) return true;
    const bytes = new Uint8Array(a.model);
    let s;
    try {
      s = await ort.InferenceSession.create(bytes, { executionProviders: gpu ? ['webgpu', 'wasm'] : ['wasm'] });
    } catch (e) {
      // WebGPU there but not working (an old driver): the CPU then
      if (!gpu) throw e;
      s = await ort.InferenceSession.create(bytes, { executionProviders: ['wasm'] });
    }
    sessions.set(a.name, s);
    return true;
  },
  /** Encodes the picture for SAM (once per picture: key). */
  async samEncode(a: { key: string; img: P.Rgba }) {
    if (sam?.key === a.key) return true;
    const { pixels, scale } = P.samInput(a.img);
    const r = await (await session('samEncoder')).run({ pixel_values: T('float32', pixels, [1, 3, 1024, 1024]) });
    sam = { key: a.key, emb: r.image_embeddings, pos: r.image_positional_embeddings, w: a.img.width, h: a.img.height, scale };
    return true;
  },
  /** The object at the tapped points (labels 1: it, 0: not it) as a mask, 0 / 255 per pixel. */
  async samMask(a: { points: { x: number; y: number; label: number }[] }) {
    if (!sam) throw new Error('no picture encoded');
    const { coords, labels } = P.samPoints(a.points, sam.scale), n = a.points.length;
    const r = await (await session('samDecoder')).run({
      input_points: T('float32', coords, [1, 1, n, 2]), input_labels: T('int64', labels, [1, 1, n]),
      image_embeddings: sam.emb, image_positional_embeddings: sam.pos,
    });
    return P.samMask(r.pred_masks.data as Float32Array, r.iou_scores.data as Float32Array, sam.w, sam.h, sam.scale);
  },
  /** Fills the hole (mask > 127) with MI-GAN: RGBA back. */
  async inpaint(a: { img: P.Rgba; mask: Uint8Array }) {
    const { width: w, height: h } = a.img, { image, mask } = P.miganInput(a.img, a.mask);
    const r = await (await session('migan')).run({ image: T('uint8', image, [1, 3, h, w]), mask: T('uint8', mask, [1, 1, h, w]) });
    return P.miganOut(r.result.data as Uint8Array, w, h);
  },
  /** The subject's matte (0…255 per pixel): MODNet (people) or U²-Netp (anything). */
  async matte(a: { model: 'modnet' | 'u2netp'; img: P.Rgba }) {
    const { width: w, height: h } = a.img;
    if (a.model === 'modnet') {
      const inp = P.modnetInput(a.img);
      const r = await (await session('modnet')).run({ input: T('float32', inp.pixels, [1, 3, inp.h, inp.w]) });
      return P.matteToAlpha(r.output.data as Float32Array, inp.w, inp.h, w, h);
    }
    const s = await session('u2netp'), r = await s.run({ 'input.1': T('float32', P.u2netInput(a.img), [1, 3, 320, 320]) });
    // the first of its outputs is the final matte; stretched to its own range (as rembg does)
    return P.matteToAlpha(r[s.outputNames[0]].data as Float32Array, 320, 320, w, h, true);
  },
  /** Depth, 0 (far) … 1 (near), at the picture's size. */
  async depth(a: { img: P.Rgba }) {
    const { width: w, height: h } = a.img, inp = P.depthInput(a.img);
    const r = await (await session('depth')).run({ pixel_values: T('float32', inp.pixels, [1, 3, inp.h, inp.w]) });
    const d = r.predicted_depth;
    return P.depthOut(d.data as Float32Array, d.dims[2], d.dims[1], w, h);
  },
};

const post = (m: unknown, transfer: Transferable[] = []) => (self as any).postMessage(m, transfer);
// one operation at a time: a model must not run twice at once (it can stall)
let queue: Promise<unknown> = Promise.resolve();
self.onmessage = (e: MessageEvent<{ id: number; op: string; args: any }>) => { queue = queue.then(() => handle(e.data)); };
async function handle({ id, op, args }: { id: number; op: string; args: any }): Promise<void> {
  try {
    const result = await ops[op](args);
    const buf = (result as any)?.buffer;
    post({ id, result }, buf instanceof ArrayBuffer ? [buf] : []);
  } catch (err) {
    post({ id, error: String((err as Error)?.message || err) });
  }
}
