// Bundles the two apps into one classic script each, so they also run from file://:
// src/main.ts → dist/mosaic.js (vector, index.html) and src/raster/main.ts → dist/raster.js (raster.html);
// src/discord/activity.ts → dist/activity.js, which the raster app loads only when it runs inside Discord.
// The add-ons' code loads only when one is used: src/ai/worker.ts → dist/ai-worker.js (a module worker with
// ONNX Runtime Web; the engine and the models themselves are downloaded, see src/shared/addons.ts) and
// src/ocr/ocr.ts → dist/ocr.js (Tesseract's page side).
// The worker (src/worker/worker.ts) is bundled first and goes into each app as a string (import
// 'worker-source'): the apps start it from a blob URL, which works from file:// too.
// The version in package.json goes into the apps (__VERSION__), and the offline cache in sw.js is named
// after it and the files it keeps: every release replaces the offline copy.
// Uses the WebAssembly build of esbuild: no native binary to install. `node build.mjs --watch` rebuilds on change.
import * as esbuild from 'esbuild-wasm';
import fs from 'node:fs';
import { createHash } from 'node:crypto';

const { version } = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const common = { bundle: true, target: 'es2020', charset: 'utf8', legalComments: 'none' };

/** `import source from 'worker-source'`: the worker's bundled code. */
const workerSource = {
  name: 'worker-source',
  setup(build) {
    build.onResolve({ filter: /^worker-source$/ }, () => ({ path: 'worker-source', namespace: 'worker-source' }));
    build.onLoad({ filter: /.*/, namespace: 'worker-source' }, async () => {
      const r = await esbuild.build({ ...common, entryPoints: ['src/worker/worker.ts'], format: 'iife', minify: true, write: false, metafile: true });
      return { contents: r.outputFiles[0].text, loader: 'text', watchFiles: Object.keys(r.metafile.inputs) };
    });
  },
};

/** Names the offline cache in sw.js after the version and the content of the files it keeps. */
function stampCache() {
  const sw = fs.readFileSync('sw.js', 'utf8');
  const files = JSON.parse('[' + /const FILES = \[([^\]]*)\]/.exec(sw)[1].replace(/'/g, '"').replace(/,\s*$/, '') + ']');
  const hash = createHash('sha256');
  // the same hash on every system: line endings left out
  for (const f of files.filter(f => f !== './')) hash.update(fs.readFileSync(f).toString('latin1').replace(/\r\n/g, '\n'));
  const name = `mosaic-paint-${version}-${hash.digest('hex').slice(0, 10)}`;
  const out = sw.replace(/const CACHE = '[^']*';/, `const CACHE = '${name}';`);
  if (out !== sw) fs.writeFileSync('sw.js', out);
}
const stamp = { name: 'stamp-cache', setup(build) { build.onEnd((r) => { if (!r.errors.length) stampCache(); }); } };

const options = {
  ...common,
  entryPoints: { mosaic: 'src/main.ts', raster: 'src/raster/main.ts', activity: 'src/discord/activity.ts' },
  outdir: 'dist',
  format: 'iife',
  sourcemap: true,
  logLevel: 'info',
  define: { __VERSION__: JSON.stringify(version) },
  plugins: [workerSource, stamp],
};
/** The add-ons' code: the AI worker as an ES module (ONNX Runtime needs one), the OCR side as a script. */
const addons = [
  { ...common, entryPoints: { 'ai-worker': 'src/ai/worker.ts' }, outdir: 'dist', format: 'esm', minify: true, logLevel: 'info' },
  { ...common, entryPoints: { ocr: 'src/ocr/ocr.ts' }, outdir: 'dist', format: 'iife', minify: true, logLevel: 'info' },
];
if (process.argv.includes('--watch')) {
  for (const o of [options, ...addons]) await (await esbuild.context(o)).watch();
} else {
  await esbuild.build(options);
  for (const o of addons) await esbuild.build(o);
  await esbuild.stop();
}
