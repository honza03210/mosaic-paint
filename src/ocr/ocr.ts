/* Read text (dist/ocr.js, loaded only when used): Tesseract's page side. Its worker, its engine and the
   language data come from the add-on cache (src/shared/addons.ts), handed over as blob URLs and bytes, so
   nothing is fetched from elsewhere and it works offline once downloaded. */
import { createWorker, type Worker as TWorker } from 'tesseract.js';

interface OcrFiles { worker: ArrayBuffer; core: ArrayBuffer; langs: { code: string; data: ArrayBuffer }[] }
let worker: TWorker | null = null, langsKey = '';

async function recognize(image: HTMLCanvasElement, f: OcrFiles): Promise<string> {
  const key = f.langs.map(l => l.code).join('+');
  if (!worker || langsKey !== key) {
    await worker?.terminate();
    // Tesseract 7 names languages given as data by their data instead of their code when it starts
    // ("initialization failed"): the worker's code is put right before it runs
    const code = new TextDecoder().decode(f.worker).replace('t:t.data})).join("+")', 't:t.code})).join("+")');
    const workerPath = URL.createObjectURL(new Blob([code], { type: 'text/javascript' }));
    // Tesseract loads a core path that ends in "js" as it is; a blob URL's #fragment does that
    const corePath = URL.createObjectURL(new Blob([f.core], { type: 'text/javascript' })) + '#core.js';
    worker = await createWorker(f.langs.map(l => ({ code: l.code, data: new Uint8Array(l.data) })) as any, 1, { workerPath, corePath, workerBlobURL: false, cacheMethod: 'none' });
    langsKey = key;
  }
  const { data } = await worker.recognize(image);
  return data.text.trim();
}
(window as any).MZOCR = { recognize };
