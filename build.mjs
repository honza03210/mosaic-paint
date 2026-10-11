// Bundles the two apps into one classic script each, so they also run from file://:
// src/main.ts → dist/mosaic.js (vector, index.html) and src/raster/main.ts → dist/raster.js (raster.html).
// Uses the WebAssembly build of esbuild: no native binary to install. `node build.mjs --watch` rebuilds on change.
import * as esbuild from 'esbuild-wasm';

const options = {
  entryPoints: { mosaic: 'src/main.ts', raster: 'src/raster/main.ts' },
  outdir: 'dist',
  bundle: true,
  format: 'iife',
  target: 'es2020',
  sourcemap: true,
  charset: 'utf8',
  legalComments: 'none',
  logLevel: 'info',
};
if (process.argv.includes('--watch')) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
} else {
  await esbuild.build(options);
  await esbuild.stop();
}
