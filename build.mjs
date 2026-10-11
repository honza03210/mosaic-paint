// Bundles the two apps into one classic script each, so they also run from file://:
// src/main.ts → dist/mosaic.js (vector, index.html) and src/raster/main.ts → dist/raster.js (raster.html).
// The worker (src/worker/worker.ts) is bundled first and goes into each app as a string (import
// 'worker-source'): the apps start it from a blob URL, which works from file:// too.
// Uses the WebAssembly build of esbuild: no native binary to install. `node build.mjs --watch` rebuilds on change.
import * as esbuild from 'esbuild-wasm';

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

const options = {
  ...common,
  entryPoints: { mosaic: 'src/main.ts', raster: 'src/raster/main.ts' },
  outdir: 'dist',
  format: 'iife',
  sourcemap: true,
  logLevel: 'info',
  plugins: [workerSource],
};
if (process.argv.includes('--watch')) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
} else {
  await esbuild.build(options);
  await esbuild.stop();
}
