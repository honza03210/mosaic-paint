/* The files the add-ons download (src/shared/addons.ts): where from, and how big. Pinned versions, so what
   is downloaded is always the same. The Discord Worker allows exactly these through (discord/src/app.ts). */
/** A downloadable file: where it comes from and how big it is (bytes, for the dialogs). */
export interface AddonFile { url: string; bytes: number }

const HF = (repo: string, rev: string, path: string) => `https://huggingface.co/${repo}/resolve/${rev}/${path}`;
const ORT = (f: string) => `https://cdn.jsdelivr.net/npm/onnxruntime-web@1.30.0/dist/${f}`;
const TESS = (f: string) => `https://cdn.jsdelivr.net/npm/${f}`;

/** Every file an add-on can need. */
export const FILES = {
  // the AI engine: with WebGPU (faster, needs the bigger build) or without
  ortGpu: { url: ORT('ort-wasm-simd-threaded.asyncify.wasm'), bytes: 26781914 },
  ortCpu: { url: ORT('ort-wasm-simd-threaded.wasm'), bytes: 14239897 },
  samEncoder: { url: HF('Xenova/slimsam-77-uniform', '5850ab45f587c112167512ffef949107115e26a0', 'onnx/vision_encoder_quantized.onnx'), bytes: 8882165 },
  samDecoder: { url: HF('Xenova/slimsam-77-uniform', '5850ab45f587c112167512ffef949107115e26a0', 'onnx/prompt_encoder_mask_decoder_quantized.onnx'), bytes: 4903810 },
  migan: { url: HF('andraniksargsyan/migan', '406830d0fa60666da0071c342ad2fbc8f30c5c64', 'migan_pipeline_v2.onnx'), bytes: 28079181 },
  modnet: { url: HF('Xenova/modnet', 'fa2fa546052fba4c08921230a26cc69a333fca12', 'onnx/model_quantized.onnx'), bytes: 6632188 },
  u2netp: { url: HF('BritishWerewolf/U-2-Netp', '7112208dbac3a3642496c8d54e2f0f9bb3dc1dc8', 'onnx/model.onnx'), bytes: 4574861 },
  depth: { url: HF('onnx-community/depth-anything-v2-small', '4472b7362082ad9968fee890ca0f1e5aca36b93d', 'onnx/model_quantized.onnx'), bytes: 27258801 },
  tessWorker: { url: TESS('tesseract.js@7.0.0/dist/worker.min.js'), bytes: 111307 },
  tessCore: { url: TESS('tesseract.js-core@7.0.0/tesseract-core-simd-lstm.wasm.js'), bytes: 3899472 },
  tessEng: { url: TESS('@tesseract.js-data/eng/4.0.0_best_int/eng.traineddata.gz'), bytes: 2952873 },
  tessCes: { url: TESS('@tesseract.js-data/ces/4.0.0_best_int/ces.traineddata.gz'), bytes: 2225029 },
  tessDeu: { url: TESS('@tesseract.js-data/deu/4.0.0_best_int/deu.traineddata.gz'), bytes: 1333102 },
  tessSlk: { url: TESS('@tesseract.js-data/slk/4.0.0_best_int/slk.traineddata.gz'), bytes: 2377899 },
  tessPol: { url: TESS('@tesseract.js-data/pol/4.0.0_best_int/pol.traineddata.gz'), bytes: 2642356 },
} satisfies Record<string, AddonFile>;
export type FileId = keyof typeof FILES;
