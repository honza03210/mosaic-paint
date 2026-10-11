/* Laying plan math: splitting the mosaic into numbered panels and counting tiles per panel. Pure. */
import type { Pt } from './geometry.ts';

export interface Panel { index: number; row: number; col: number; x: number; y: number; w: number; h: number }
export interface Plan { rows: number; cols: number; panels: Panel[] }

/** Panels of at most pw × ph covering box, numbered 1… row by row. */
export function panels(box: { x: number; y: number; w: number; h: number }, pw: number, ph: number): Plan {
  const cols = Math.max(1, Math.ceil(box.w / pw - 1e-9)), rows = Math.max(1, Math.ceil(box.h / ph - 1e-9)), out: Panel[] = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const x = box.x + c * pw, y = box.y + r * ph;
    out.push({ index: out.length + 1, row: r, col: c, x, y, w: Math.min(pw, box.x + box.w - x), h: Math.min(ph, box.y + box.h - y) });
  }
  return { rows, cols, panels: out };
}

/** The panel containing p (tiles are counted where their middle is). */
export function panelAt(plan: Plan, p: Pt): Panel | null {
  return plan.panels.find(q => p.x >= q.x && p.x < q.x + q.w + 1e-9 && p.y >= q.y && p.y < q.y + q.h + 1e-9) || null;
}

/** tiles: [{ p, color }] → Map panel index → Map color → count. */
export function countByPanel(plan: Plan, tiles: { p: Pt; color: string }[]): Map<number, Map<string, number>> {
  const out = new Map(plan.panels.map(q => [q.index, new Map<string, number>()]));
  for (const t of tiles) {
    const q = panelAt(plan, t.p);
    if (!q) continue;
    const m = out.get(q.index)!;
    m.set(t.color, (m.get(t.color) || 0) + 1);
  }
  return out;
}
