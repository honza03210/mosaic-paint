/* Mosaic Paint – color parsing and matching (no app state). */
'use strict';

const Colors = (() => {
  let ctx = null; // created on first use, so the math below also works outside a browser
  const cache = new Map();

  /** Any CSS color → '#rrggbb' (or 'rgba(...)' with alpha). null for none/invalid. */
  function norm(s) {
    if (s == null) return null;
    s = String(s).trim();
    if (!s || s === 'none') return null;
    if (cache.has(s)) return cache.get(s);
    let t = s;
    if (/^[0-9a-f]{6}([0-9a-f]{2})?$/i.test(t)) t = '#' + t;
    let out = null;
    if (CSS.supports('color', t) && !/^(inherit|initial|unset|revert|currentcolor)$/i.test(t)) {
      ctx = ctx || document.createElement('canvas').getContext('2d');
      ctx.fillStyle = '#000';
      ctx.fillStyle = t;
      out = ctx.fillStyle;
    }
    cache.set(s, out);
    return out;
  }

  /** Every color in pasted text: hex codes, rgb()/hsl(), names, coolors URLs, GIMP .gpl rows. */
  function parse(text) {
    const out = [];
    for (const line of String(text).split(/\r?\n/)) {
      const g = line.match(/^\s*(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})(\s|$)/);
      if (g && [g[1], g[2], g[3]].every(v => +v <= 255)) { out.push(norm(`rgb(${g[1]},${g[2]},${g[3]})`)); continue; }
      const re = /#[0-9a-f]{3,8}\b|\b[0-9a-f]{6}\b|(?:rgba?|hsla?)\([^)]*\)|\b[a-z]{3,20}\b/gi;
      for (const tok of line.match(re) || []) {
        const c = norm(tok);
        if (c) out.push(c);
      }
    }
    return [...new Set(out.filter(Boolean))];
  }

  function toRgb(c) {
    const n = norm(c);
    if (!n) return null;
    if (n[0] === '#') return [1, 3, 5].map(i => parseInt(n.slice(i, i + 2), 16));
    const m = n.match(/[\d.]+/g);
    return m ? m.slice(0, 3).map(Number) : null;
  }

  function toLab([r, g, b]) {
    const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    const R = lin(r), G = lin(g), B = lin(b);
    const X = (R * 0.4124 + G * 0.3576 + B * 0.1805) / 0.95047;
    const Y = R * 0.2126 + G * 0.7152 + B * 0.0722;
    const Z = (R * 0.0193 + G * 0.1192 + B * 0.9505) / 1.08883;
    const f = (t) => t > 216 / 24389 ? Math.cbrt(t) : (24389 / 27 * t + 16) / 116;
    const fx = f(X), fy = f(Y), fz = f(Z);
    return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
  }

  /** Lab → '#rrggbb' (inverse of toLab, clamped to what sRGB can show). */
  function fromLab([L, a, b]) {
    const fy = (L + 16) / 116, fx = fy + a / 500, fz = fy - b / 200;
    const inv = (t) => (t ** 3 > 216 / 24389 ? t ** 3 : (116 * t - 16) / (24389 / 27));
    const X = 0.95047 * inv(fx), Y = inv(fy), Z = 1.08883 * inv(fz);
    const gam = (v) => (v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055);
    const rgb = [
      3.2406 * X - 1.5372 * Y - 0.4986 * Z,
      -0.9689 * X + 1.8758 * Y + 0.0415 * Z,
      0.0557 * X - 0.2040 * Y + 1.0570 * Z,
    ].map(v => Math.round(Math.max(0, Math.min(1, gam(v))) * 255));
    return '#' + rgb.map(v => v.toString(16).padStart(2, '0')).join('');
  }

  /** The palette color that looks closest to rgb (distance in Lab space). */
  function nearest(rgb, palette, labs) {
    labs = labs || palette.map(c => toLab(toRgb(c)));
    const l = toLab(rgb);
    let best = null, bd = Infinity;
    palette.forEach((c, i) => {
      const L = labs[i], d = (l[0] - L[0]) ** 2 + (l[1] - L[1]) ** 2 + (l[2] - L[2]) ** 2;
      if (d < bd) { bd = d; best = c; }
    });
    return best;
  }

  /**
   * How colors look in black & white and with color-vision deficiencies (Machado et al. 2009,
   * full severity). 3×3 matrices on linear RGB – the same numbers drive the on-screen SVG filters.
   */
  const VISION = {
    gray: [0.2126, 0.7152, 0.0722, 0.2126, 0.7152, 0.0722, 0.2126, 0.7152, 0.0722],
    protan: [0.152286, 1.052583, -0.204868, 0.114503, 0.786281, 0.099216, -0.003882, -0.048116, 1.051998],
    deutan: [0.367322, 0.860646, -0.227968, 0.280085, 0.672501, 0.047413, -0.011820, 0.042940, 0.968881],
    tritan: [1.255528, -0.076749, -0.178779, -0.078411, 0.930809, 0.147602, 0.004733, 0.691367, 0.303900],
  };
  const toLin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  const fromLin = (v) => Math.round(255 * Math.max(0, Math.min(1, v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055)));
  /** The color as seen under a VISION type ('none' returns it unchanged), as [r, g, b]. */
  function simulate(c, type) {
    const rgb = Array.isArray(c) ? c : toRgb(c), m = VISION[type];
    if (!rgb || !m) return rgb;
    const [r, g, b] = rgb.map(toLin);
    return [0, 1, 2].map(i => fromLin(m[i * 3] * r + m[i * 3 + 1] * g + m[i * 3 + 2] * b));
  }
  /** Perceived difference between two colors (CIE76 ΔE; under ~10 they are easy to confuse). */
  function deltaE(a, b) {
    const la = toLab(Array.isArray(a) ? a : toRgb(a)), lb = toLab(Array.isArray(b) ? b : toRgb(b));
    return Math.hypot(la[0] - lb[0], la[1] - lb[1], la[2] - lb[2]);
  }

  function luminance(c) {
    const [r, g, b] = toRgb(c) || [255, 255, 255];
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  return { norm, parse, toRgb, toLab, fromLab, nearest, luminance, VISION, simulate, deltaE };
})();
