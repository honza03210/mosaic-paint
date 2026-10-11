/* Mosaic Paint – checking brightness and color blindness: view filters (screen only),
   pairs of colors that are hard to tell apart, and marks on tiles that blend into a neighbour. */
import { MZ } from '../core/api.ts';
import * as Colors from '../lib/colors.ts';
import { t } from '../shared/i18n.ts';

export const Vision = (() => {
  const $ = (s) => document.querySelector<any>(s);
  const NS = 'http://www.w3.org/2000/svg';
  const VIEWS = [
    ['none', t('Normal colors')], ['gray', t('Black & white')], ['protan', t('Red-blind (protanopia)')],
    ['deutan', t('Green-blind (deuteranopia)')], ['tritan', t('Blue-blind (tritanopia)')],
  ];
  const ALIKE = 10; // ΔE below this: easy to confuse
  let view = 'none', marking = false;

  /** Pairs of colors that look alike: normally, in black & white, or for color-blind viewers. */
  function similarPairs(colors) {
    const out = [];
    for (let i = 0; i < colors.length; i++) for (let j = i + 1; j < colors.length; j++) {
      const a = colors[i], b = colors[j];
      const seen = VIEWS.filter(([t]) => Colors.deltaE(Colors.simulate(a, t), Colors.simulate(b, t)) < ALIKE).map(([t]) => t);
      if (seen.length) out.push({ a, b, views: seen, d: Colors.deltaE(a, b) });
    }
    return out;
  }
  function describe(views) {
    if (views.includes('none')) return t('look almost the same');
    const who = { gray: t('in black & white'), protan: t('for red-blind viewers'), deutan: t('for green-blind viewers'), tritan: t('for blue-blind viewers') };
    return t('look alike {who}', { who: views.map(v => who[v]).join(', ') });
  }

  // ---- on-screen filters --------------------------------------------------------------
  function buildFilters() {
    const defs = $('#mz-uidefs');
    for (const [t] of VIEWS) {
      if (t === 'none') continue;
      const m = Colors.VISION[t], f = document.createElementNS(NS, 'filter'), c = document.createElementNS(NS, 'feColorMatrix');
      f.id = 'mz-vision-' + t;
      f.setAttribute('color-interpolation-filters', 'linearRGB');
      c.setAttribute('type', 'matrix');
      c.setAttribute('values', `${m[0]} ${m[1]} ${m[2]} 0 0  ${m[3]} ${m[4]} ${m[5]} 0 0  ${m[6]} ${m[7]} ${m[8]} 0 0  0 0 0 1 0`);
      f.appendChild(c);
      defs.appendChild(f);
    }
  }
  function setView(v) {
    view = VIEWS.some(([t]) => t === v) ? v : 'none';
    const f = view === 'none' ? null : `url(#mz-vision-${view})`;
    for (const id of ['#mz-doc', '#mz-page', '#mz-ref']) {
      const el = $(id);
      if (f) el.setAttribute('filter', f); else el.removeAttribute('filter');
    }
    $('#view-filter').value = view;
    $('#stage').classList.toggle('vision-on', view !== 'none');
    if (marking) markLowContrast();
  }

  // ---- tiles that blend into a neighbour (Expert) ------------------------------------------
  function markLowContrast() {
    const g = $('#mz-marks');
    g.innerHTML = '';
    if (!marking) return 0;
    const ix = MZ.regionIndex();
    let n = 0;
    for (const f of ix.faces) {
      const reg = ix.region(f), p = MZ.gridSample(reg.bb, q => MZ.insideRegion(reg, q), 1)[0];
      const c = p && MZ.paintedColorAt(p);
      if (!c) continue;
      const mine = Colors.simulate(c, view);
      const blends = [...MZ.neighbourColors(reg)].some(o => o !== c && Colors.deltaE(mine, Colors.simulate(o, view)) < ALIKE);
      if (!blends) continue;
      const path = document.createElementNS(NS, 'path');
      path.setAttribute('d', [reg.outer, ...reg.holes].map(r => 'M' + r.map(q => `${q.x} ${q.y}`).join('L') + 'Z').join(''));
      path.setAttribute('class', 'contrast-mark');
      g.appendChild(path);
      n++;
    }
    return n;
  }
  function setMarking(on) {
    marking = on;
    $('#btn-contrast').classList.toggle('active', on);
    const n = markLowContrast();
    if (on) MZ.toast(n ? (view === 'none' ? t('{n} {n|tile blends|tiles blend} into a neighbour of another color.', { n }) : t('{n} {n|tile blends|tiles blend} into a neighbour of another color (in this view).', { n })) : t('No tile blends into its neighbours.'));
  }

  function init() {
    buildFilters();
    const sel = $('#view-filter');
    for (const [v, label] of VIEWS) { const o = document.createElement('option'); o.value = v; o.textContent = label; sel.append(o); }
    sel.onchange = () => setView(sel.value);
    $('#btn-contrast').onclick = () => setMarking(!marking);
    MZ.on('change', () => { if (marking) markLowContrast(); });
    MZ.on('mode', () => { if (MZ.state.mode !== 'expert' && marking) setMarking(false); });
  }

  return { VIEWS, similarPairs, describe, setView, init, get view() { return view; } };
})();

Vision.init();
