// Bundles src/main.ts into dist/mosaic.js (one classic script, so the app also runs from file://).
// Uses the WebAssembly build of esbuild: no native binary to install. `node build.mjs --watch` rebuilds on change.
import * as esbuild from 'esbuild-wasm';

const options = {
  entryPoints: ['src/main.ts'],
  outfile: 'dist/mosaic.js',
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
