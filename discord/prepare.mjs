// Copies the editor into ./public for the Worker to serve: the raster app becomes the Activity's start page
// (index.html), the vector app vector.html, with the files they load. Run the main build (npm run build, one folder up) first.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..'), out = path.join(import.meta.dirname, 'public');
fs.rmSync(out, { recursive: true, force: true });
const copy = (from, to = from) => {
  fs.mkdirSync(path.dirname(path.join(out, to)), { recursive: true });
  fs.copyFileSync(path.join(root, from), path.join(out, to));
};
copy('raster.html', 'index.html');
copy('index.html', 'vector.html');
// the app switch points at the Worker's names from the start (before the Activity script adds Discord's details)
for (const f of ['index.html', 'vector.html']) {
  const p = path.join(out, f);
  fs.writeFileSync(p, fs.readFileSync(p, 'utf8')
    .replace('href="index.html" data-app="vector"', 'href="vector.html" data-app="vector"')
    .replace('href="raster.html" data-app="raster"', 'href="index.html" data-app="raster"'));
}
for (const f of ['style.css', 'dist/raster.js', 'dist/mosaic.js', 'dist/activity.js', 'icons/icon.svg', 'icons/icon-192.png']) copy(f);
console.log('Copied the editor to', out);
