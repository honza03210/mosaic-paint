// Checks the 3D print export against a real slicer (not part of npm test: it needs PrusaSlicer installed).
//   npm run check:slicer [-- <work folder>]
// Builds a sample 3MF with the app's own code, slices it with PrusaSlicer's command line and checks that
// the filament changes (M600) land at the start of the layers the plan names, and that PrusaSlicer finds
// the mesh closed (manifold).
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import * as M from '../../src/lib/model3d.ts';
import { zip } from '../../src/lib/zip.ts';

const CANDIDATES = [
  process.env.PRUSA_SLICER,
  'C:/Program Files/Prusa3D/PrusaSlicer/prusa-slicer-console.exe',
  '/Applications/PrusaSlicer.app/Contents/MacOS/PrusaSlicer',
  '/usr/bin/prusa-slicer',
].filter(Boolean);
const slicer = CANDIDATES.find(p => fs.existsSync(p));
if (!slicer) { console.log('PrusaSlicer not found (set PRUSA_SLICER to its command-line program). Skipped.'); process.exit(0); }

const dir = process.argv[2] || fs.mkdtempSync(path.join(os.tmpdir(), 'mosaic-slicer-'));
fs.mkdirSync(dir, { recursive: true });
// 40 × 30 cells of 0.5 mm: grout frame (color 0), two tile colors in a checkerboard of 10-cell tiles
const W = 40, H = 30, grid = new Int16Array(W * H);
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  grid[y * W + x] = x % 10 === 0 || y % 10 === 0 ? 0 : 1 + ((Math.floor(x / 10) + Math.floor(y / 10)) % 2);
}
const s = { layerHeight: 0.2, layersPerColor: 3, baseLayers: 2 };
const plan = M.colorPlan(['#222222', '#f4a261', '#264653'], s);
const mesh = M.closedMesh(grid, W, H, 0.5, s);
const file = path.join(dir, 'check.3mf'), gcode = path.join(dir, 'check.gcode');
fs.writeFileSync(file, await zip(M.threeMfFiles(mesh, plan, 'check')));

const info = execFileSync(slicer, ['--info', file], { encoding: 'utf8' });
const manifold = /manifold = (\w+)/.exec(info)?.[1];
execFileSync(slicer, ['--export-gcode', '--layer-height', String(s.layerHeight), '--first-layer-height', String(s.layerHeight), '--output', gcode, file], { encoding: 'utf8' });
const lines = fs.readFileSync(gcode, 'utf8').split('\n');
let z = 0;
const changes = [], layers = new Set();
for (const l of lines) {
  const m = /^;Z:([\d.]+)/.exec(l);
  if (m) { z = +m[1]; layers.add(z); }
  if (/^M600/.test(l)) changes.push(z);
}
const expected = plan.filter(p => p.z != null).map(p => p.z);
const height = M.modelHeight(plan.length, s);
console.log({ slicer, file, manifold, layers: layers.size, top: Math.max(...layers), changes, expected, height });
const ok = JSON.stringify(changes) === JSON.stringify(expected) && Math.abs(Math.max(...layers) - height) < 1e-6 && manifold === 'yes';
console.log(ok ? 'OK – the slicer puts the filament changes where the plan says.' : 'MISMATCH');
process.exit(ok ? 0 : 1);
