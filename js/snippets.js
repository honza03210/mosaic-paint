/* Mosaic Paint – snippets: a few shapes as a small standalone SVG (for the clipboard and the motif
   library), and placing one back into a drawing: moved, rotated, and scaled between units. */
'use strict';

const Snippets = (() => {
  const NS = 'http://www.w3.org/2000/svg';
  const MM = { mm: 1, cm: 10, in: 25.4, px: 25.4 / 96 };
  const n = (v) => String(Math.round(v * 1000) / 1000);

  /** SVG text for the given elements (painted areas first), positioned in drawing coordinates. */
  function fromElements(els) {
    const fills = [], shapes = [];
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    const ordered = [...els].sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
    for (const el of ordered) {
      const c = el.cloneNode(true), m = MZ.elMatrix(el);
      // the copy sits at the top level, so it carries the full transform of where it came from
      if (!m.isIdentity) c.setAttribute('transform', m.toString()); else c.removeAttribute('transform');
      (MZ.isFill(el) ? fills : shapes).push(c);
      const b = MZ.geomOf(el).bbox;
      if (Number.isFinite(b.x0)) { x0 = Math.min(x0, b.x0); y0 = Math.min(y0, b.y0); x1 = Math.max(x1, b.x1); y1 = Math.max(y1, b.y1); }
    }
    if (!Number.isFinite(x0)) return null;
    const root = document.createElementNS(NS, 'svg');
    root.setAttribute('data-mosaic-snippet', '1');
    root.setAttribute('data-unit', MZ.unit());
    root.setAttribute('viewBox', [x0, y0, x1 - x0, y1 - y0].map(n).join(' '));
    for (const [layer, list] of [['fills', fills], ['shapes', shapes]]) {
      const g = document.createElementNS(NS, 'g');
      g.setAttribute('data-layer', layer);
      for (const c of list) g.appendChild(c);
      root.appendChild(g);
    }
    return new XMLSerializer().serializeToString(root);
  }

  /** Is this text a snippet (or any SVG we can place)? */
  const isSnippet = (text) => /^\s*(<\?xml[^>]*>\s*)?<svg[\s>]/i.test(text) && /data-mosaic-snippet/.test(text);

  function parse(text) {
    const xml = new DOMParser().parseFromString(text, 'image/svg+xml'), root = xml.documentElement;
    if (!root || root.localName !== 'svg' || xml.getElementsByTagName('parsererror').length) return null;
    root.querySelectorAll('script,foreignObject').forEach(e => e.remove());
    const vb = (root.getAttribute('viewBox') || '0 0 0 0').split(/[\s,]+/).map(Number);
    return { root, box: { x: vb[0], y: vb[1], w: vb[2], h: vb[3] }, unit: root.getAttribute('data-unit') || 'px' };
  }

  /**
   * The matrix that places a snippet: its center goes to `at` (drawing coordinates), turned by
   * `angle` degrees, scaled from the snippet's unit to the drawing's.
   */
  function placement(snip, at, angle = 0) {
    const k = (MM[snip.unit] || 1) / (MM[MZ.unit()] || 1), cx = snip.box.x + snip.box.w / 2, cy = snip.box.y + snip.box.h / 2;
    return new DOMMatrix().translateSelf(at.x, at.y).rotateSelf(angle).scaleSelf(k).translateSelf(-cx, -cy);
  }

  const mapPt = (m, x, y) => ({ x: m.a * x + m.c * y + m.e, y: m.b * x + m.d * y + m.f });
  /** Moves an element's own coordinates by m (keeps lines, polygons and painted areas editable). */
  function mapElement(el, m) {
    const scale = Math.sqrt(Math.abs(m.a * m.d - m.b * m.c)), angle = Math.atan2(m.b, m.a) * 180 / Math.PI;
    const has = el.hasAttribute('transform'), tag = el.localName;
    if (!has && tag === 'line') {
      const a = mapPt(m, +el.getAttribute('x1'), +el.getAttribute('y1')), b = mapPt(m, +el.getAttribute('x2'), +el.getAttribute('y2'));
      el.setAttribute('x1', n(a.x)); el.setAttribute('y1', n(a.y)); el.setAttribute('x2', n(b.x)); el.setAttribute('y2', n(b.y));
    } else if (!has && (tag === 'polygon' || tag === 'polyline')) {
      const nums = (el.getAttribute('points') || '').match(/[-+]?(?:\d*\.\d+|\d+\.?)(?:e[-+]?\d+)?/gi) || [];
      const pts = [];
      for (let i = 0; i + 1 < nums.length; i += 2) { const p = mapPt(m, +nums[i], +nums[i + 1]); pts.push(n(p.x) + ',' + n(p.y)); }
      el.setAttribute('points', pts.join(' '));
      const ng = (el.getAttribute('data-ngon') || '').split(/\s+/).map(Number);
      if (ng.length === 5 && ng.every(Number.isFinite)) {
        const c = mapPt(m, ng[1], ng[2]);
        el.setAttribute('data-ngon', [ng[0], n(c.x), n(c.y), n(ng[3] * scale), n(ng[4] + angle)].join(' '));
      }
    } else if (!has && tag === 'path' && /^[\s\dMLZmlz.,eE+-]*$/.test(el.getAttribute('d') || '') && !/[mlz]/.test(el.getAttribute('d'))) {
      // painted areas: absolute M/L/Z only
      el.setAttribute('d', el.getAttribute('d').replace(/([-+]?(?:\d*\.\d+|\d+\.?)(?:e[-+]?\d+)?)[\s,]+([-+]?(?:\d*\.\d+|\d+\.?)(?:e[-+]?\d+)?)/gi,
        (s, x, y) => { const p = mapPt(m, +x, +y); return n(p.x) + ' ' + n(p.y); }));
      if (el.hasAttribute('data-area')) el.setAttribute('data-area', n(+el.getAttribute('data-area') * scale * scale));
    } else {
      el.setAttribute('transform', `${m.toString()} ${el.getAttribute('transform') || ''}`.trim());
      return;
    }
    if (scale !== 1 && el.hasAttribute('stroke-width')) el.setAttribute('stroke-width', n(+el.getAttribute('stroke-width') * scale));
  }

  /** Adds the snippet's shapes to the drawing at `at`. Returns the new elements (not committed). */
  function place(snip, at, angle = 0) {
    const m = placement(snip, at, angle), out = [];
    const fillsG = document.querySelector('#mz-fills'), shapesG = document.querySelector('#mz-shapes');
    for (const g of snip.root.children) {
      const dest = g.getAttribute('data-layer') === 'fills' ? fillsG : shapesG;
      for (const c of [...g.children]) {
        const el = document.importNode(c, true);
        mapElement(el, m);
        dest.appendChild(el);
        out.push(el);
      }
    }
    return out;
  }

  return { fromElements, isSnippet, parse, placement, place, mapElement };
})();
