// Loads the app's plain browser scripts into a Node sandbox so the pure modules can be unit tested.
const vm = require('vm');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

/** load(['js/geometry.js', ...], ['Geo', ...]) → { Geo, ... } */
function load(files, names) {
  const ctx = vm.createContext({
    console, Math, Number, Array, Map, Set, Object, JSON, String, Infinity, NaN,
    // web APIs Node also has (used by share.js)
    TextEncoder, TextDecoder, Blob, Response, CompressionStream, DecompressionStream, btoa, atob,
  });
  for (const f of files) vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
  return vm.runInContext(`({ ${names.join(', ')} })`, ctx);
}

module.exports = { load };
