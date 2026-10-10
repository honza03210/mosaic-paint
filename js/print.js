/* Mosaic Paint – printing: splitting a drawing onto paper sheets and building the print page.
   Pure functions (no DOM); the print dialog lives in features.js. */
'use strict';

const Printing = (() => {
  const PAPERS = {
    a4: { w: 210, h: 297, name: 'A4' },
    letter: { w: 215.9, h: 279.4, name: 'Letter' },
    a3: { w: 297, h: 420, name: 'A3' },
    tabloid: { w: 279.4, h: 431.8, name: 'Tabloid' },
  };
  /** Millimetres per drawing unit. */
  const MM = { mm: 1, cm: 10, in: 25.4, px: 25.4 / 96 };
  const MARGIN = 10;   // paper margin, mm
  const LABEL = 7;     // room for the sheet label above the drawing, mm
  const OVERLAP = 10;  // neighbouring sheets repeat this much, for taping them together, mm

  const rowName = (r) => (r >= 26 ? rowName(Math.floor(r / 26) - 1) : '') + String.fromCharCode(65 + (r % 26));

  /**
   * Places a wmm × hmm drawing on sheets of paper.
   * mode 'real': real size, split into rows × columns of sheets that overlap a little.
   * mode 'fit': scaled to one sheet.
   * Returns { orientation, paper: {w,h,name}, scale, rows, cols, sheets: [{ label, x, y, w, h }] } (drawing mm).
   */
  function layout(wmm, hmm, paperKey = 'a4', mode = 'real') {
    const paper = PAPERS[paperKey] || PAPERS.a4;
    const options = [['portrait', paper.w, paper.h], ['landscape', paper.h, paper.w]].map(([orientation, pw, ph]) => {
      const aw = pw - 2 * MARGIN, ah = ph - 2 * MARGIN - LABEL;
      if (mode === 'fit') {
        const scale = Math.min(aw / wmm, ah / hmm);
        return { orientation, pw, ph, aw, ah, scale, rows: 1, cols: 1, sheets: [{ label: '', x: 0, y: 0, w: wmm, h: hmm }], cost: -scale };
      }
      const count = (len, avail) => (len <= avail ? 1 : Math.ceil((len - OVERLAP) / (avail - OVERLAP)));
      const cols = count(wmm, aw), rows = count(hmm, ah), sheets = [];
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const x = c * (aw - OVERLAP), y = r * (ah - OVERLAP);
        sheets.push({ label: rows * cols > 1 ? rowName(r) + (c + 1) : '', row: r, col: c, x, y, w: Math.min(aw, wmm - x), h: Math.min(ah, hmm - y) });
      }
      return { orientation, pw, ph, aw, ah, scale: 1, rows, cols, sheets, cost: rows * cols };
    });
    const best = options[1].cost < options[0].cost ? options[1] : options[0];
    return { ...best, paper };
  }

  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const n = (v) => String(Math.round(v * 1000) / 1000);

  /**
   * The print page. art: inner SVG markup of the drawing; box: its viewBox {x,y,w,h} in drawing units;
   * unit: 'mm' | 'cm' | 'in' | 'px'; legend: HTML (optional); title: string.
   */
  function html({ art, box, unit, paper = 'a4', mode = 'real', legend = '', title = 'Mosaic' }) {
    const k = MM[unit] || MM.px;               // mm per drawing unit
    const L = layout(box.w * k, box.h * k, paper, mode);
    const multi = L.sheets.length > 1;
    const sheet = (s) => {
      const vb = [box.x + s.x / k, box.y + s.y / k, s.w / k, s.h / k];
      // shade the strips that the next sheet repeats, so you know where to overlap
      const shade = [];
      if (multi && s.col < L.cols - 1 && s.w >= L.aw) shade.push([vb[0] + vb[2] - OVERLAP / k, vb[1], OVERLAP / k, vb[3]]);
      if (multi && s.row < L.rows - 1 && s.h >= L.ah) shade.push([vb[0], vb[1] + vb[3] - OVERLAP / k, vb[2], OVERLAP / k]);
      const marks = shade.map(r => `<rect x="${n(r[0])}" y="${n(r[1])}" width="${n(r[2])}" height="${n(r[3])}" fill="rgba(0,120,255,0.12)" stroke="rgba(0,120,255,0.6)" stroke-dasharray="${n(2 / k)} ${n(2 / k)}" stroke-width="${n(0.3 / k)}"/>`).join('');
      const label = multi ? `Sheet ${s.label} – row ${s.label.replace(/\d+$/, '')}, column ${s.col + 1} of ${L.cols} · blue strips are covered by the next sheet` : esc(title);
      return `<section class="sheet"><div class="label">${esc(label)}</div>`
        + `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.map(n).join(' ')}" style="width:${n(s.w * L.scale)}mm;height:${n(s.h * L.scale)}mm">`
        + `<use href="#art"/>${marks}</svg></section>`;
    };
    // an overview of how the sheets fit together
    let overview = '';
    if (multi) {
      const s = Math.min(L.aw / (box.w * k), (L.ah - 20) / (box.h * k));
      const rects = L.sheets.map(sh => `<rect x="${n(box.x + sh.x / k)}" y="${n(box.y + sh.y / k)}" width="${n(sh.w / k)}" height="${n(sh.h / k)}" fill="none" stroke="#0070f0" stroke-width="${n(0.6 / k / s)}"/>`
        + `<text x="${n(box.x + (sh.x + sh.w / 2) / k)}" y="${n(box.y + (sh.y + sh.h / 2) / k)}" font-size="${n(Math.min(sh.w, sh.h) / k / 4)}" text-anchor="middle" dominant-baseline="central" fill="#0070f0" font-family="Arial">${sh.label}</text>`).join('');
      overview = `<section class="sheet"><div class="label">${esc(title)} – ${L.sheets.length} sheets (${L.rows} × ${L.cols}), real size ${n(box.w * k / 10)} × ${n(box.h * k / 10)} cm</div>`
        + `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${[box.x, box.y, box.w, box.h].map(n).join(' ')}" style="width:${n(box.w * k * s)}mm;height:${n(box.h * k * s)}mm"><use href="#art" opacity="0.45"/>${rects}</svg></section>`;
    }
    return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(title)}</title><style>
  @page { size: ${L.paper.name} ${L.orientation}; margin: ${MARGIN}mm; }
  html, body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
  .sheet { page-break-after: always; break-after: page; }
  .sheet:last-child { page-break-after: auto; break-after: auto; }
  .sheet svg { display: block; }
  .label { height: ${LABEL}mm; font-size: 3.2mm; color: #333; }
  .legend table { border-collapse: collapse; }
  .legend td { padding: 1.2mm 3mm; border-bottom: 0.2mm solid #ccc; font-size: 3.6mm; }
  .legend td.n { font-weight: bold; }
  .legend span { display: inline-block; width: 9mm; height: 6mm; border: 0.2mm solid #888; vertical-align: middle; }
  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
</style></head><body>
<svg width="0" height="0" style="position:absolute"><defs><g id="art">${art}</g></defs></svg>
${overview}${L.sheets.map(sheet).join('\n')}${legend ? `<section class="sheet legend">${legend}</section>` : ''}
<script>window.onload = () => setTimeout(() => window.print(), 400);<\/script>
</body></html>`;
  }

  return { PAPERS, MM, MARGIN, OVERLAP, layout, html };
})();
