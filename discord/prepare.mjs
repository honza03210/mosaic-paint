// Copies the editor into ./public for the Worker to serve: the raster app becomes the Activity's start page
// (index.html), with the files it loads. Run the main build (npm run build, one folder up) first.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..'), out = path.join(import.meta.dirname, 'public');
fs.rmSync(out, { recursive: true, force: true });
const copy = (from, to = from) => {
  fs.mkdirSync(path.dirname(path.join(out, to)), { recursive: true });
  fs.copyFileSync(path.join(root, from), path.join(out, to));
};
copy('raster.html', 'index.html');
for (const f of ['style.css', 'dist/raster.js', 'dist/activity.js', 'icons/icon.svg', 'icons/icon-192.png']) copy(f);
console.log('Copied the editor to', out);
