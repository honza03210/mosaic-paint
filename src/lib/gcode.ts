/* Reading sliced G-code back, to check it against the 3D print plan: where filament changes (M600) and
   tool changes (T0, T1…) take effect, which heights each tool prints, and the top. Works with any slicer:
   it follows the moves (Z, and extrusion in absolute or relative E); slicer comments only tell it to leave
   out wipe towers, skirts and brims. Pure. */

export interface GcodeSummary {
  /** heights (mm) that something is printed at */
  layers: number;
  top: number;
  /** filament changes and tool changes, at the height where printing goes on after them */
  changes: { kind: 'M600' | 'tool'; tool?: number; z: number }[];
  /** each tool's lowest and highest printed height */
  tools: { tool: number; from: number; to: number }[];
}

const WORD: Record<string, RegExp> = Object.fromEntries(['X', 'Y', 'Z', 'E'].map(l => [l, new RegExp(`(?:^|\\s)${l}(-?[\\d.]+)`, 'i')]));
/** The number after a letter in a G-code line (X, Y, Z or E), if it has one. */
const num = (line: string, letter: string): number | null => {
  const m = WORD[letter].exec(line);
  return m ? +m[1] : null;
};

/** The slicers' comments naming what is printed next. */
const FEATURE = /^;\s*(?:TYPE|FEATURE)\s*:\s*(.*)$/i;
/** Printing that is not the model: wipe / prime towers, skirt, brim (they go up with every tool). */
const NOT_MODEL = /wipe|prime|tower|skirt|brim|purge/i;

export function readGcode(text: string, progress?: (f: number) => void): GcodeSummary {
  let z = 0, e = 0, relative = false, tool = 0, printed = false, notModel = false;
  const zs = new Set<number>(), tools = new Map<number, { from: number; to: number }>(), changes: GcodeSummary['changes'] = [];
  // a change waits for the next extrusion to know its height
  let pending: { kind: 'M600' | 'tool'; tool?: number } | null = null;
  for (let at = 0, n = 0; at < text.length; n++) {
    let end = text.indexOf('\n', at);
    if (end < 0) end = text.length;
    let line = text.slice(at, end);
    at = end + 1;
    if (progress && n % 50000 === 0) progress(at / text.length);
    const semi = line.indexOf(';');
    if (semi >= 0) {
      // what is being printed (PrusaSlicer, Cura: ;TYPE:…, Bambu Studio, OrcaSlicer: ; FEATURE: …)
      const type = FEATURE.exec(line.slice(semi));
      if (type) notModel = NOT_MODEL.test(type[1]);
      line = line.slice(0, semi);
    }
    line = line.trim();
    if (!line) continue;
    const cmd = line.split(/\s/, 1)[0].toUpperCase();
    if (cmd === 'G0' || cmd === 'G1') {
      const nz = num(line, 'Z'), ne = num(line, 'E');
      if (nz != null) z = nz;
      if (ne != null) {
        const extrudes = relative ? ne > 0 : ne > e;
        if (!relative) e = ne;
        if (extrudes && !notModel && (num(line, 'X') != null || num(line, 'Y') != null)) {
          const key = Math.round(z * 1000) / 1000;
          zs.add(key);
          const r = tools.get(tool);
          if (r) { r.from = Math.min(r.from, key); r.to = Math.max(r.to, key); } else tools.set(tool, { from: key, to: key });
          if (pending) { changes.push({ ...pending, z: key }); pending = null; }
          printed = true;
        }
      }
    } else if (cmd === 'G92') {
      const ne = num(line, 'E');
      if (ne != null) e = ne;
    } else if (cmd === 'M82') relative = false;
    else if (cmd === 'M83') relative = true;
    else if (cmd === 'M600') pending = { kind: 'M600' };
    else if (/^T\d+$/.test(cmd)) {
      const next = +cmd.slice(1);
      // the tool chosen before anything is printed is not a change
      if (printed && next !== tool) pending = { kind: 'tool', tool: next };
      tool = next;
    }
  }
  return {
    layers: zs.size,
    top: zs.size ? Math.max(...zs) : 0,
    changes,
    tools: [...tools].map(([t, r]) => ({ tool: t, ...r })).sort((a, b) => a.tool - b.tool),
  };
}

/** One finding of a check: ok or not, and what it is about (the dialog words it). */
export type Finding =
  | { ok: boolean; kind: 'change'; color: string; z: number; found: number | null }
  | { ok: boolean; kind: 'extra'; z: number }
  | { ok: boolean; kind: 'top'; z: number; found: number }
  | { ok: boolean; kind: 'filament'; filament: number; color: string; top: number; found: number | null };

/** One nozzle: is every planned change there (at its height), are there others, and is the top right? */
export function checkHeights(g: GcodeSummary, plan: { color: string; z: number | null }[], top: number, layerHeight: number): Finding[] {
  const near = (a: number, b: number) => Math.abs(a - b) <= layerHeight / 2 + 1e-6, used = new Set<number>(), out: Finding[] = [];
  for (const p of plan) {
    if (p.z == null) continue;
    const i = g.changes.findIndex((c, k) => !used.has(k) && near(c.z, p.z));
    if (i >= 0) used.add(i);
    out.push({ ok: i >= 0, kind: 'change', color: p.color, z: p.z, found: i >= 0 ? g.changes[i].z : null });
  }
  g.changes.forEach((c, k) => { if (!used.has(k)) out.push({ ok: false, kind: 'extra', z: c.z }); });
  out.push({ ok: near(g.top, top), kind: 'top', z: top, found: g.top });
  return out;
}

/** Several filaments: does filament k (tool k − 1) print, up to the height it should? */
export function checkFilaments(g: GcodeSummary, expected: { color: string; top: number }[], layerHeight: number): Finding[] {
  return expected.map((f, k) => {
    const r = g.tools.find(x => x.tool === k), found = r ? r.to : null;
    return { ok: found != null && Math.abs(found - f.top) <= layerHeight / 2 + 1e-6, kind: 'filament', filament: k + 1, color: f.color, top: f.top, found };
  });
}
