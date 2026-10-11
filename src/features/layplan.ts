/* Mosaic Paint – laying plan: splits the mosaic into numbered panels (the size of your work
   surface or mesh sheets) and prints an overview, every panel at real size and the tiles per panel.
   The panel math is pure; the dialog needs the editor (window.MZ). */
import { MZ } from '../core/api.ts';
import * as Printing from '../lib/print.ts';
import { PrintTools } from './print.ts';
import { openPrintPage } from '../shared/printing.ts';
import { panels, panelAt, countByPanel } from '../lib/layplan.ts';
import { t } from '../shared/i18n.ts';
import { $, loadSettings, saveSettings } from '../shared/ui.ts';
import { esc } from '../lib/html.ts';

export const LayPlan = (() => {
  // ---- dialog & print page (in the app) ---------------------------------------------------
  const { state } = MZ;
  const opts = { w: 0, h: 0, numbers: true, grid: true, paper: 'a4' };
  loadSettings('mz-layplan', opts);
  const save = () => saveSettings('mz-layplan', opts);
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
    $('#lp-info').textContent = t('{n} {n|panel|panels} ({rows} × {cols}) · each printed at real size on {s} {paper} {s|sheet|sheets}.', { n: P.panels.length, rows: P.rows, cols: P.cols, s: L.sheets.length, paper: L.paper.name });
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
      `${title} – ` + t('laying plan: {n} {n|panel|panels} ({rows} rows × {cols} columns) of {w} × {h} {unit}', { n: P.panels.length, rows: P.rows, cols: P.cols, w: MZ.fmt(panelSize().w), h: MZ.fmt(panelSize().h), unit: u }))];
    for (const q of P.panels) {
      const L = Printing.layout(q.w * K, q.h * K, opts.paper, 'real', orientation);
      sections.push(...Printing.sheetSections({ x: q.x, y: q.y, w: q.w, h: q.h }, K, L, {
        title: t('Panel {n} – row {row}, column {col}', { n: q.index, row: q.row + 1, col: q.col + 1 }), prefix: t('Panel {n}', { n: q.index }) + ' · ',
      }));
    }
    // tiles of each color per panel: what to sort out before laying each one
    const counts = countByPanel(P, tiles());
    const chip = (c) => `<span style="background:${c}"></span>`;
    const table = `<table class="counts"><tr><td class="n">${t('Panel')}</td>${rows.map(r => `<td class="n">${chip(r.c)} ${r.n}</td>`).join('')}</tr>`
      + P.panels.map(q => `<tr><td class="n">${q.index}</td>${rows.map(r => `<td>${counts.get(q.index).get(r.c) || ''}</td>`).join('')}</tr>`).join('')
      + '</table>';
    sections.push(`<section class="sheet"><div class="label">${esc(title)} – ${t('tiles per panel and color')}</div>${table}</section>`);
    if (rows.length) sections.push(`<section class="sheet legend">${PrintTools.legend(rows)}</section>`);
    openPrintPage(Printing.page({ art, sections, paper: opts.paper, orientation, title: `${title} – ${t('laying plan')}` }));
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
