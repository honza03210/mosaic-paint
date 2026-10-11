/* Mosaic Paint – laying plan: splits the mosaic into numbered panels (the size of your work
   surface or mesh sheets) and prints an overview, every panel at real size and the tiles per panel.
   The panel math is pure; the dialog needs the editor (window.MZ). */
import { MZ } from '../core/api.ts';
import * as Printing from '../lib/print.ts';
import { PrintTools } from './print.ts';
import { panels, panelAt, countByPanel } from '../lib/layplan.ts';

export const LayPlan = (() => {
  // ---- dialog & print page (in the app) ---------------------------------------------------
  const $ = (s) => document.querySelector<any>(s);
  const { state } = MZ;
  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const opts = { w: 0, h: 0, numbers: true, grid: true, paper: 'a4' };
  try { Object.assign(opts, JSON.parse(localStorage.getItem('mz-layplan') || '{}')); } catch { /* ignore */ }
  const save = () => { try { localStorage.setItem('mz-layplan', JSON.stringify(opts)); } catch { /* ignore */ } };
  const box = () => ({ x: state.doc.x, y: state.doc.y, w: state.doc.w, h: state.doc.h });
  const k = () => Printing.MM[MZ.unit()] || Printing.MM.px;
  // a sensible start: 30 cm panels (a common mesh sheet size)
  const panelSize = () => ({ w: opts.w > 0 ? opts.w : 300 / k(), h: opts.h > 0 ? opts.h : 300 / k() });
  const plan = () => { const s = panelSize(); return panels(box(), s.w, s.h); };

  function drawGrid(show) {
    const g = $('#mz-panels');
    g.innerHTML = '';
    if (!show) return;
    const NS = 'http://www.w3.org/2000/svg';
    for (const q of plan().panels) {
      const r = document.createElementNS(NS, 'rect');
      for (const [a, v] of [['x', q.x], ['y', q.y], ['width', q.w], ['height', q.h]]) r.setAttribute(a as string, String(v));
      r.setAttribute('class', 'panel-rect');
      g.appendChild(r);
      const t = document.createElementNS(NS, 'text');
      t.setAttribute('x', String(q.x + q.w / 2));
      t.setAttribute('y', String(q.y + q.h / 2));
      t.setAttribute('font-size', String(Math.min(q.w, q.h) / 5));
      t.setAttribute('class', 'panel-label');
      t.textContent = String(q.index);
      g.appendChild(t);
    }
  }
  function renderUI() {
    const s = panelSize(), P = plan(), u = MZ.unit();
    $('#lp-w').value = MZ.fmt(s.w);
    $('#lp-h').value = MZ.fmt(s.h);
    for (const el of document.querySelectorAll<any>('#dlg-layplan .unit-label')) el.textContent = u;
    $('#lp-numbers').checked = opts.numbers;
    $('#lp-grid').checked = opts.grid;
    $('#lp-paper').value = opts.paper;
    const L = Printing.layout(s.w * k(), s.h * k(), opts.paper, 'real');
    $('#lp-info').textContent = `${P.panels.length} panel${P.panels.length === 1 ? '' : 's'} (${P.rows} × ${P.cols})`
      + ` · each printed at real size on ${L.sheets.length} ${L.paper.name} sheet${L.sheets.length === 1 ? '' : 's'}.`;
    drawGrid(opts.grid);
  }

  /** Every painted tile: a point inside it and its color. */
  function tiles() {
    const out = [];
    for (const el of MZ.allShapes()) {
      const c = MZ.fillOf(el);
      if (!c) continue;
      const p = MZ.gridSample(MZ.geomOf(el).bbox, q => MZ.insideEl(el, q), 1)[0];
      if (p) out.push({ p, color: c });
    }
    return out;
  }

  function printPlan() {
    const P = plan(), K = k(), B = box(), u = MZ.unit();
    const { art, rows, nums } = PrintTools.art(opts.numbers ? 'both' : 'colors');
    const title = MZ.fileName.replace(/\.svg$/i, '');
    // one orientation for the whole print: the one needing fewer sheets for the panels
    const sheetsFor = (o) => P.panels.reduce((s, q) => s + Printing.layout(q.w * K, q.h * K, opts.paper, 'real', o).sheets.length, 0);
    const orientation = sheetsFor('landscape') < sheetsFor('portrait') ? 'landscape' : 'portrait';
    const A = Printing.area(opts.paper, orientation);
    const sections = [Printing.overviewSection(B, K, A, P.panels.map(q => ({ ...q, label: String(q.index) })),
      `${title} – laying plan: ${P.panels.length} panels (${P.rows} rows × ${P.cols} columns) of ${MZ.fmt(panelSize().w)} × ${MZ.fmt(panelSize().h)} ${u}`)];
    for (const q of P.panels) {
      const L = Printing.layout(q.w * K, q.h * K, opts.paper, 'real', orientation);
      sections.push(...Printing.sheetSections({ x: q.x, y: q.y, w: q.w, h: q.h }, K, L, {
        title: `Panel ${q.index} – row ${q.row + 1}, column ${q.col + 1}`, prefix: `Panel ${q.index} · `,
      }));
    }
    // tiles of each color per panel: what to sort out before laying each one
    const counts = countByPanel(P, tiles());
    const chip = (c) => `<span style="background:${c}"></span>`;
    const table = `<table class="counts"><tr><td class="n">Panel</td>${rows.map(r => `<td class="n">${chip(r.c)} ${r.n}</td>`).join('')}</tr>`
      + P.panels.map(q => `<tr><td class="n">${q.index}</td>${rows.map(r => `<td>${counts.get(q.index).get(r.c) || ''}</td>`).join('')}</tr>`).join('')
      + '</table>';
    sections.push(`<section class="sheet"><div class="label">${esc(title)} – tiles per panel and color</div>${table}</section>`);
    if (rows.length) sections.push(`<section class="sheet legend">${PrintTools.legend(rows)}</section>`);
    PrintTools.open(Printing.page({ art, sections, paper: opts.paper, orientation, title: `${title} – laying plan` }));
    void nums;
  }

  $('#btn-layplan').onclick = () => { renderUI(); $('#dlg-layplan').showModal(); };
  $('#dlg-layplan').addEventListener('close', () => drawGrid(false));
  for (const id of ['#lp-w', '#lp-h']) {
    $(id).onchange = () => {
      const w = parseFloat($('#lp-w').value), h = parseFloat($('#lp-h').value);
      if (w > 0) opts.w = w;
      if (h > 0) opts.h = h;
      save();
      renderUI();
    };
  }
  $('#lp-numbers').onchange = (e) => { opts.numbers = e.target.checked; save(); };
  $('#lp-grid').onchange = (e) => { opts.grid = e.target.checked; save(); renderUI(); };
  $('#lp-paper').onchange = (e) => { opts.paper = e.target.value; save(); renderUI(); };
  $('#lp-go').onclick = () => { drawGrid(false); $('#dlg-layplan').close(); printPlan(); };

  return { panels, panelAt, countByPanel };
})();
