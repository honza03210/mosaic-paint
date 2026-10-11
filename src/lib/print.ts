/* Printing: splitting a drawing onto paper sheets and building print pages.
   Pure functions (no DOM); the dialogs live in features/print.ts and features/layplan.ts. */
export const PAPERS: Record<string, { w: number; h: number; name: string }> = {
  a4: { w: 210, h: 297, name: 'A4' },
  letter: { w: 215.9, h: 279.4, name: 'Letter' },
  a3: { w: 297, h: 420, name: 'A3' },
  tabloid: { w: 279.4, h: 431.8, name: 'Tabloid' },
};
/** Millimetres per drawing unit. */
export const MM: Record<string, number> = { mm: 1, cm: 10, in: 25.4, px: 25.4 / 96 };
export const MARGIN = 10;   // paper margin, mm
const LABEL = 7;     // room for the sheet label above the drawing, mm
export const OVERLAP = 10;  // neighbouring sheets repeat this much, for taping them together, mm

const rowName = (r) => (r >= 26 ? rowName(Math.floor(r / 26) - 1) : '') + String.fromCharCode(65 + (r % 26));
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const n = (v) => String(Math.round(v * 1000) / 1000);

/** Printable area of the paper in an orientation, mm. */
export function area(paperKey, orientation) {
  const p = PAPERS[paperKey] || PAPERS.a4;
  const [pw, ph] = orientation === 'landscape' ? [p.h, p.w] : [p.w, p.h];
  return { paper: p, orientation, aw: pw - 2 * MARGIN, ah: ph - 2 * MARGIN - LABEL };
}

/** Sheets for a wmm × hmm drawing in one orientation ('real' size or 'fit' on one sheet). */
function sheetsFor(wmm, hmm, A, mode) {
  if (mode === 'fit') {
    const scale = Math.min(A.aw / wmm, A.ah / hmm);
    return { ...A, scale, rows: 1, cols: 1, sheets: [{ label: '', row: 0, col: 0, x: 0, y: 0, w: wmm, h: hmm }], cost: -scale };
  }
  const count = (len, avail) => (len <= avail ? 1 : Math.ceil((len - OVERLAP) / (avail - OVERLAP)));
  const cols = count(wmm, A.aw), rows = count(hmm, A.ah), sheets = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const x = c * (A.aw - OVERLAP), y = r * (A.ah - OVERLAP);
    sheets.push({ label: rows * cols > 1 ? rowName(r) + (c + 1) : '', row: r, col: c, x, y, w: Math.min(A.aw, wmm - x), h: Math.min(A.ah, hmm - y) });
  }
  return { ...A, scale: 1, rows, cols, sheets, cost: rows * cols };
}

/**
 * Places a wmm × hmm drawing on sheets of paper, picking the orientation that needs fewer sheets.
 * Returns { orientation, paper: {w,h,name}, scale, rows, cols, aw, ah, sheets: [{ label, row, col, x, y, w, h }] } (mm).
 */
export function layout(wmm, hmm, paperKey = 'a4', mode = 'real', orientation = null) {
  const opts = (orientation ? [orientation] : ['portrait', 'landscape']).map(o => sheetsFor(wmm, hmm, area(paperKey, o), mode));
  return opts.length > 1 && opts[1].cost < opts[0].cost ? opts[1] : opts[0];
}

/**
 * Print sections showing the part `box` (drawing units) of the art, laid out by L = layout(…).
 * title: label of a single sheet; prefix: put before sheet labels (e.g. "Panel 3 · ").
 */
export function sheetSections(box, k, L, { title = '', prefix = '' } = {}) {
  const multi = L.sheets.length > 1;
  return L.sheets.map((s) => {
    const vb = [box.x + s.x / k, box.y + s.y / k, s.w / k, s.h / k];
    // shade the strips that the next sheet repeats, so you know where to overlap
    const shade = [];
    if (multi && s.col < L.cols - 1 && s.w >= L.aw) shade.push([vb[0] + vb[2] - OVERLAP / k, vb[1], OVERLAP / k, vb[3]]);
    if (multi && s.row < L.rows - 1 && s.h >= L.ah) shade.push([vb[0], vb[1] + vb[3] - OVERLAP / k, vb[2], OVERLAP / k]);
    const marks = shade.map(r => `<rect x="${n(r[0])}" y="${n(r[1])}" width="${n(r[2])}" height="${n(r[3])}" fill="rgba(0,120,255,0.12)" stroke="rgba(0,120,255,0.6)" stroke-dasharray="${n(2 / k)} ${n(2 / k)}" stroke-width="${n(0.3 / k)}"/>`).join('');
    const label = multi ? `${prefix}Sheet ${s.label} – row ${s.label.replace(/\d+$/, '')}, column ${s.col + 1} of ${L.cols} · blue strips are covered by the next sheet` : (prefix + title);
    return `<section class="sheet"><div class="label">${esc(label)}</div>`
      + `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.map(n).join(' ')}" style="width:${n(s.w * L.scale)}mm;height:${n(s.h * L.scale)}mm">`
      + `<use href="#art"/>${marks}</svg></section>`;
  });
}

/** A sheet showing the whole box with labelled rectangles on top (sheets or panels). */
export function overviewSection(box, k, A, rects, heading, extra = '') {
  const s = Math.min(A.aw / (box.w * k), (A.ah - 20) / (box.h * k));
  const stroke = 0.6 / k / s;
  const marks = rects.map(r => `<rect x="${n(r.x)}" y="${n(r.y)}" width="${n(r.w)}" height="${n(r.h)}" fill="none" stroke="#0070f0" stroke-width="${n(stroke)}"/>`
    + `<text x="${n(r.x + r.w / 2)}" y="${n(r.y + r.h / 2)}" font-size="${n(Math.min(r.w, r.h) / 4)}" text-anchor="middle" dominant-baseline="central" fill="#0070f0" font-family="Arial" font-weight="bold">${esc(r.label)}</text>`).join('');
  return `<section class="sheet"><div class="label">${esc(heading)}</div>`
    + `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${[box.x, box.y, box.w, box.h].map(n).join(' ')}" style="width:${n(box.w * k * s)}mm;height:${n(box.h * k * s)}mm"><use href="#art" opacity="0.45"/>${marks}</svg>${extra}</section>`;
}

/** The complete print page: art (inner SVG markup) shared by all sections. */
export function page({ art, sections, paper = 'a4', orientation = 'portrait', title = 'Mosaic' }) {
  const p = PAPERS[paper] || PAPERS.a4;
  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(title)}</title><style>
@page { size: ${p.name} ${orientation}; margin: ${MARGIN}mm; }
html, body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
.sheet { page-break-after: always; break-after: page; }
.sheet:last-child { page-break-after: auto; break-after: auto; }
.sheet svg { display: block; }
.label { height: ${LABEL}mm; font-size: 3.2mm; color: #333; }
.legend table, .counts { border-collapse: collapse; }
.legend td, .counts td { padding: 1.2mm 3mm; border-bottom: 0.2mm solid #ccc; font-size: 3.6mm; }
.counts { margin-top: 3mm; }
.legend td.n, .counts td.n { font-weight: bold; }
.legend span, .counts span { display: inline-block; width: 9mm; height: 6mm; border: 0.2mm solid #888; vertical-align: middle; }
* { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
</style></head><body>
<svg width="0" height="0" style="position:absolute"><defs><g id="art">${art}</g></defs></svg>
${sections.join('\n')}
<script>window.onload = () => setTimeout(() => window.print(), 400);<\/script>
</body></html>`;
}

/**
 * The template print page. art: inner SVG markup of the drawing; box: its viewBox {x,y,w,h} in drawing
 * units; unit: 'mm' | 'cm' | 'in' | 'px' (or mmPerUnit: mm per unit); legend: HTML (optional); title: string.
 */
export function html({ art, box, unit, mmPerUnit = 0, paper = 'a4', mode = 'real', legend = '', title = 'Mosaic' }) {
  const k = mmPerUnit || MM[unit] || MM.px; // mm per drawing unit (mmPerUnit: e.g. per pixel of a raster image)
  const L = layout(box.w * k, box.h * k, paper, mode);
  const sections = [];
  if (L.sheets.length > 1) {
    // an overview of how the sheets fit together
    sections.push(overviewSection(box, k, L, L.sheets.map(s => ({ x: box.x + s.x / k, y: box.y + s.y / k, w: s.w / k, h: s.h / k, label: s.label })),
      `${title} – ${L.sheets.length} sheets (${L.rows} × ${L.cols}), real size ${n(box.w * k / 10)} × ${n(box.h * k / 10)} cm`));
  }
  sections.push(...sheetSections(box, k, L, { title }));
  if (legend) sections.push(`<section class="sheet legend">${legend}</section>`);
  return page({ art, sections, paper, orientation: L.orientation, title });
}

