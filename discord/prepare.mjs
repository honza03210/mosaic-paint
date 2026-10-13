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
// the app's ID (public – it is in every Activity's address too) from the environment or ./.env, so the Activity
// needn't ask the Worker for it first; and the Activity script starts at once, while the editor is still loading
let clientId = process.env.DISCORD_CLIENT_ID || '';
const envFile = path.join(import.meta.dirname, '.env');
if (!clientId && fs.existsSync(envFile)) clientId = (/^DISCORD_CLIENT_ID\s*=\s*["']?([0-9]+)/m.exec(fs.readFileSync(envFile, 'utf8')) || [])[1] || '';
const head = (clientId ? `<meta name="discord-client-id" content="${clientId}">\n` : '') + '<script src="dist/activity.js" async></script>\n</head>';
for (const f of ['index.html', 'vector.html']) {
  const p = path.join(out, f);
  fs.writeFileSync(p, fs.readFileSync(p, 'utf8')
    .replace('href="index.html" data-app="vector"', 'href="vector.html" data-app="vector"')
    .replace('href="raster.html" data-app="raster"', 'href="index.html" data-app="raster"')
    .replace('</head>', head));
}
if (!clientId) console.warn('No DISCORD_CLIENT_ID (environment or .env): the Activity will ask the Worker for it.');
for (const f of ['style.css', 'dist/raster.js', 'dist/mosaic.js', 'dist/activity.js', 'dist/ai-worker.js', 'dist/ocr.js', 'icons/icon.svg', 'icons/icon-192.png']) copy(f);
console.log('Copied the editor to', out);
