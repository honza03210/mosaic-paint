// Checks the 3D print export against a real slicer (not part of npm test: it needs PrusaSlicer installed).
//   npm run check:slicer [-- <work folder>]
// Builds a sample 3MF with the app's own code, slices it with PrusaSlicer's command line and checks that
// the filament changes (M600) land at the start of the layers the plan names, and that PrusaSlicer finds
// the mesh closed (manifold); then the same for the flat multi-filament model on a 3-tool printer. The G-code
// is read back with the app's own reader (lib/gcode.ts).
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import * as M from '../../src/lib/model3d.ts';
import { zip } from '../../src/lib/zip.ts';
import * as G from '../../src/lib/gcode.ts';

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
const expected = plan.filter(p => p.z != null).map(p => p.z);
const height = M.modelHeight(plan.length, s);
// the app's own G-code reader (lib/gcode.ts) – as the 3D dialog's "Check G-code" uses it
const read = G.readGcode(fs.readFileSync(gcode, 'utf8'));
const findings = G.checkHeights(read, plan, height, s.layerHeight);
console.log({ slicer, file, manifold, layers: read.layers, top: read.top, changes: read.changes.map(c => c.z), expected, height });
let ok = findings.every(f => f.ok) && read.changes.length === expected.length && manifold === 'yes';

// several filaments: the flat model, one part per color, sliced for a 4-tool printer
const f = { layerHeight: 0.2, baseLayers: 2, tileLayers: 6, groutRecess: 2 }, colors = ['#222222', '#f4a261', '#264653'];
const parts = M.flatParts(grid, W, H, 3, [true, false, false], f).map(p => ({
  name: p.part < 0 ? 'Base' : colors[p.part], color: colors[Math.max(0, p.part)], filament: Math.max(0, p.part) + 1,
  mesh: M.solidMesh(p.solid, W, H, 0.5, f.layerHeight),
}));
const flatFile = path.join(dir, 'flat.3mf'), flatGcode = path.join(dir, 'flat.gcode');
fs.writeFileSync(flatFile, await zip(M.threeMfPartsFiles(parts, 'flat', 'prusa')));
execFileSync(slicer, ['--export-gcode', '--layer-height', '0.2', '--first-layer-height', '0.2', '--nozzle-diameter', '0.4,0.4,0.4',
  '--single-extruder-multi-material', '--wipe-tower', '--use-relative-e-distances', '--output', flatGcode, flatFile], { encoding: 'utf8' });
const flat = G.readGcode(fs.readFileSync(flatGcode, 'utf8'));
const tops = [(f.baseLayers + f.tileLayers - f.groutRecess) * f.layerHeight, (f.baseLayers + f.tileLayers) * f.layerHeight, (f.baseLayers + f.tileLayers) * f.layerHeight];
const flatFindings = G.checkFilaments(flat, colors.map((c, k) => ({ color: c, top: tops[k] })), f.layerHeight);
console.log({ flatTools: flat.tools, flatFindings });
ok = ok && flatFindings.every(x => x.ok);
console.log(ok ? 'OK – the slicer puts the filament changes where the plan says, and prints each filament as high as it should.' : 'MISMATCH');
process.exit(ok ? 0 : 1);
