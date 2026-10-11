/* Mosaic Paint – several pages in one project (front and back, color variants, …).
   The page being edited lives in the editor; the others are kept as SVG text with their own
   undo history and view. A saved file is the current page, with the others in a hidden group. */
import { MZ } from '../core/api.ts';
import { t } from '../shared/i18n.ts';
import { $ } from '../shared/ui.ts';
import { ask, askYes } from '../shared/dialogs.ts';

export const Pages = (() => {
  const { state } = MZ;
  const attr = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const XML = '<?xml version="1.0" encoding="UTF-8"?>\n';
  let pages = [{ name: t('Page {n}', { n: 1 }), svg: null, history: null, view: null }], cur = 0, switching = false;

  /** Puts name / index attributes on the outer <svg> of a page's text (replacing old ones). */
  function tag(svg, name, index) {
    return svg.replace(/^<\?xml[^>]*>\s*/, '').replace(/<svg\b([^>]*)>/, (m, attrs) =>
      `<svg${attrs.replace(/\s+data-page-(name|index)="[^"]*"/g, '')} data-page-name="${attr(name)}" data-page-index="${index}">`);
  }

  // saving: the current page is the file; the other pages go into a hidden group inside it
  MZ.on('serialize', (out, opts) => {
    out = XML + tag(out, pages[cur].name, cur);
    if (opts.pageOnly || pages.length < 2) return out;
    const others = pages.map((p, i) => (i === cur ? '' : tag(p.svg, p.name, i))).join('\n');
    return out.replace(/<\/svg>\s*$/, `<g id="mosaic-pages" display="none">\n${others}\n</g>\n</svg>`);
  });

  // opening a file (or the autosave, or a version): read its pages
  MZ.on('deserialize', (root) => {
    if (switching) return;
    const list = [{ index: +root.getAttribute('data-page-index') || 0, name: root.getAttribute('data-page-name') || t('Page {n}', { n: 1 }), svg: null }];
    const group = root.querySelector('[id="mosaic-pages"]');
    if (group) {
      for (const s of group.children) {
        if (s.localName !== 'svg') continue;
        list.push({ index: +s.getAttribute('data-page-index'), name: s.getAttribute('data-page-name') || 'Page', svg: XML + new XMLSerializer().serializeToString(s) });
      }
    }
    list.sort((a, b) => a.index - b.index);
    pages = list.map(p => ({ name: p.name, svg: p.svg, history: null, view: null }));
    cur = pages.findIndex(p => p.svg === null);
    render();
  });
  MZ.on('reset', () => {
    pages = [{ name: t('Page {n}', { n: 1 }), svg: null, history: null, view: null }];
    cur = 0;
    render();
  });

  /** Stores the page being edited (its drawing, undo steps and view). */
  function capture() {
    const p = pages[cur];
    p.svg = MZ.buildSVGString({ pageOnly: true });
    p.history = MZ.getHistory();
    p.view = { ...state.view };
  }
  function show(i) {
    cur = i;
    const p = pages[i];
    switching = true;
    try { MZ.loadSVGText(p.svg, { restore: true, quiet: true }); } finally { switching = false; }
    p.svg = null;
    if (p.history) MZ.setHistory(p.history);
    if (p.view) { Object.assign(state.view, p.view); MZ.updateView(); }
    render();
    MZ.docChanged();
  }
  function switchTo(i) {
    if (i === cur || !pages[i]) return;
    capture();
    show(i);
  }
  function blankPage() {
    const d = state.doc, u = MZ.unit(), size = (v) => v + (u === 'px' ? '' : u);
    return `${XML}<svg xmlns="http://www.w3.org/2000/svg" viewBox="${d.x} ${d.y} ${d.w} ${d.h}" width="${size(d.w)}" height="${size(d.h)}">`
      + `<metadata id="mosaic-palette">{"unit":"${u}"}</metadata><rect id="mosaic-bg" x="${d.x}" y="${d.y}" width="${d.w}" height="${d.h}" fill="#ffffff"/>`
      + '<g id="mosaic-fills"/><g id="mosaic-shapes"/></svg>';
  }
  function add(duplicate) {
    capture();
    const src = pages[cur];
    pages.splice(cur + 1, 0, {
      name: duplicate ? t('{name} copy', { name: src.name }) : t('Page {n}', { n: pages.length + 1 }),
      svg: duplicate ? src.svg : blankPage(), history: null, view: duplicate ? { ...src.view } : null,
    });
    show(cur + 1);
    if (!duplicate) MZ.fitView();
  }
  async function rename(i) {
    const n = await ask(t('Page name:'), pages[i].name);
    if (!n || !n.trim()) return;
    pages[i].name = n.trim();
    render();
    MZ.docChanged();
  }
  async function remove(i) {
    if (pages.length < 2) { MZ.toast(t('A project needs at least one page.')); return; }
    if (!await askYes(t('Delete the page “{name}”? (A copy of the project is kept in History.)', { name: pages[i].name }))) return;
    MZ.saveVersion(t('Before deleting the page {name}', { name: pages[i].name }));
    if (i === cur) {
      pages.splice(i, 1);
      show(Math.min(i, pages.length - 1));
    } else {
      pages.splice(i, 1);
      if (i < cur) cur--;
      render();
      MZ.docChanged();
    }
  }
  function move(i, by) {
    const j = i + by;
    if (j < 0 || j >= pages.length) return;
    [pages[i], pages[j]] = [pages[j], pages[i]];
    if (cur === i) cur = j; else if (cur === j) cur = i;
    render();
    MZ.docChanged();
  }

  function closeMenu() { const m = $('#page-menu'); if (m) m.remove(); }
  function openMenu(i, anchor) {
    closeMenu();
    const m = document.createElement('div');
    m.id = 'page-menu';
    for (const [label, fn, ok] of [
      [t('Rename…'), () => rename(i), true], [t('Duplicate'), () => add(true), true],
      [t('Move left'), () => move(i, -1), i > 0], [t('Move right'), () => move(i, 1), i < pages.length - 1],
      [t('Delete…'), () => remove(i), pages.length > 1],
    ] as [string, () => void, boolean][]) {
      const b = document.createElement('button');
      b.textContent = label;
      b.disabled = !ok;
      b.onclick = () => { closeMenu(); fn(); };
      m.append(b);
    }
    document.body.append(m);
    const r = anchor.getBoundingClientRect();
    m.style.left = Math.min(r.left, innerWidth - m.offsetWidth - 8) + 'px';
    m.style.top = (r.top - m.offsetHeight - 4) + 'px';
  }
  document.addEventListener('pointerdown', (e) => { if (!(e.target as Element).closest('#page-menu, .page-more')) closeMenu(); });

  function render() {
    const box = $('#page-tabs');
    box.innerHTML = '';
    pages.forEach((p, i) => {
      const tab = document.createElement('div');
      tab.className = 'page-tab' + (i === cur ? ' active' : '');
      const b = document.createElement('button');
      b.textContent = p.name;
      b.title = i === cur ? t('Double-click to rename') : t('Switch to this page');
      b.onclick = () => switchTo(i);
      b.ondblclick = () => rename(i);
      tab.append(b);
      if (i === cur) {
        const more = document.createElement('button');
        more.className = 'page-more';
        more.textContent = '⋯';
        more.title = t('Page options');
        more.onclick = () => openMenu(i, more);
        tab.append(more);
      }
      box.append(tab);
    });
  }

  $('#page-add').onclick = () => add(false);
  render();
  return { switchTo, add, get count() { return pages.length; }, get current() { return cur; }, get names() { return pages.map(p => p.name); } };
})();
