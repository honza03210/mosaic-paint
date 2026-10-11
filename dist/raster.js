(() => {
  // src/lib/colors.ts
  var ctx = null;
  var cache = /* @__PURE__ */ new Map();
  function norm(s) {
    if (s == null) return null;
    const str = String(s).trim();
    if (!str || str === "none") return null;
    if (cache.has(str)) return cache.get(str);
    let t = str;
    if (/^[0-9a-f]{6}([0-9a-f]{2})?$/i.test(t)) t = "#" + t;
    let out = null;
    if (CSS.supports("color", t) && !/^(inherit|initial|unset|revert|currentcolor)$/i.test(t)) {
      ctx = ctx || document.createElement("canvas").getContext("2d");
      ctx.fillStyle = "#000";
      ctx.fillStyle = t;
      out = ctx.fillStyle;
    }
    cache.set(str, out);
    return out;
  }
  function parse(text) {
    const out = [];
    for (const line of String(text).split(/\r?\n/)) {
      const g = line.match(/^\s*(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})(\s|$)/);
      if (g && [g[1], g[2], g[3]].every((v) => +v <= 255)) {
        out.push(norm(`rgb(${g[1]},${g[2]},${g[3]})`));
        continue;
      }
      const re = /#[0-9a-f]{3,8}\b|\b[0-9a-f]{6}\b|(?:rgba?|hsla?)\([^)]*\)|\b[a-z]{3,20}\b/gi;
      for (const tok of line.match(re) || []) {
        const c = norm(tok);
        if (c) out.push(c);
      }
    }
    return [...new Set(out.filter(Boolean))];
  }
  function toRgb(c) {
    if (Array.isArray(c)) return c;
    const n = norm(c);
    if (!n) return null;
    if (n[0] === "#") return [1, 3, 5].map((i) => parseInt(n.slice(i, i + 2), 16));
    const m = n.match(/[\d.]+/g);
    return m ? m.slice(0, 3).map(Number) : null;
  }
  function toLab([r, g, b]) {
    const lin = (v) => {
      v /= 255;
      return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    const R = lin(r), G = lin(g), B = lin(b);
    const X = (R * 0.4124 + G * 0.3576 + B * 0.1805) / 0.95047;
    const Y = R * 0.2126 + G * 0.7152 + B * 0.0722;
    const Z = (R * 0.0193 + G * 0.1192 + B * 0.9505) / 1.08883;
    const f = (t) => t > 216 / 24389 ? Math.cbrt(t) : (24389 / 27 * t + 16) / 116;
    const fx = f(X), fy = f(Y), fz = f(Z);
    return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
  }
  function fromLab([L, a, b]) {
    const fy = (L + 16) / 116, fx = fy + a / 500, fz = fy - b / 200;
    const inv = (t) => t ** 3 > 216 / 24389 ? t ** 3 : (116 * t - 16) / (24389 / 27);
    const X = 0.95047 * inv(fx), Y = inv(fy), Z = 1.08883 * inv(fz);
    const gam = (v) => v <= 31308e-7 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
    const rgb = [
      3.2406 * X - 1.5372 * Y - 0.4986 * Z,
      -0.9689 * X + 1.8758 * Y + 0.0415 * Z,
      0.0557 * X - 0.204 * Y + 1.057 * Z
    ].map((v) => Math.round(Math.max(0, Math.min(1, gam(v))) * 255));
    return "#" + rgb.map((v) => v.toString(16).padStart(2, "0")).join("");
  }
  function nearest(rgb, palette, labs) {
    labs = labs || palette.map((c) => toLab(toRgb(c)));
    const l = toLab(rgb);
    let best = null, bd = Infinity;
    palette.forEach((c, i) => {
      const L = labs[i], d = (l[0] - L[0]) ** 2 + (l[1] - L[1]) ** 2 + (l[2] - L[2]) ** 2;
      if (d < bd) {
        bd = d;
        best = c;
      }
    });
    return best;
  }
  function luminance(c) {
    const [r, g, b] = toRgb(c) || [255, 255, 255];
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  // src/lib/raster.ts
  var makeImg = (width, height) => ({ width, height, data: new Uint8ClampedArray(width * height * 4) });
  function rgbOf(c) {
    const m = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(c);
    return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : toRgb(c);
  }
  function rgba(c, alpha = 255) {
    const rgb = c ? rgbOf(c) : null;
    return rgb ? [rgb[0], rgb[1], rgb[2], alpha] : [0, 0, 0, 0];
  }
  var h2 = (v) => v.toString(16).padStart(2, "0");
  var hex = (r, g, b) => "#" + h2(r) + h2(g) + h2(b);
  function colorAt(img, x, y) {
    if (x < 0 || y < 0 || x >= img.width || y >= img.height) return null;
    const i = (y * img.width + x) * 4, d = img.data;
    return d[i + 3] < 128 ? null : hex(d[i], d[i + 1], d[i + 2]);
  }
  function setPx(d, i, c) {
    d[i] = c[0];
    d[i + 1] = c[1];
    d[i + 2] = c[2];
    d[i + 3] = c[3];
  }
  function grow(b, x, y) {
    if (x < b.x0) b.x0 = x;
    if (x > b.x1) b.x1 = x;
    if (y < b.y0) b.y0 = y;
    if (y > b.y1) b.y1 = y;
  }
  var toBox = (b) => b.x1 < b.x0 ? null : { x: b.x0, y: b.y0, w: b.x1 - b.x0 + 1, h: b.y1 - b.y0 + 1 };
  function floodFill(img, x, y, color, tolerance = 0, contiguous = true) {
    const { width: W, height: H, data: d } = img;
    x = Math.floor(x);
    y = Math.floor(y);
    if (x < 0 || y < 0 || x >= W || y >= H) return null;
    const s = (y * W + x) * 4, seed = [d[s], d[s + 1], d[s + 2], d[s + 3]];
    const same = (i) => {
      if (seed[3] === 0 && d[i + 3] === 0) return true;
      return Math.abs(d[i] - seed[0]) <= tolerance && Math.abs(d[i + 1] - seed[1]) <= tolerance && Math.abs(d[i + 2] - seed[2]) <= tolerance && Math.abs(d[i + 3] - seed[3]) <= tolerance;
    };
    if (seed[0] === color[0] && seed[1] === color[1] && seed[2] === color[2] && seed[3] === color[3] && tolerance === 0) return null;
    const b = { x0: W, y0: H, x1: -1, y1: -1 };
    if (!contiguous) {
      for (let p = 0, i = 0; p < W * H; p++, i += 4) if (same(i)) {
        setPx(d, i, color);
        grow(b, p % W, p / W | 0);
      }
      return toBox(b);
    }
    const done = new Uint8Array(W * H), stack = [x, y];
    while (stack.length) {
      const sy = stack.pop(), sx = stack.pop();
      let l = sx;
      while (l > 0 && !done[sy * W + l - 1] && same((sy * W + l - 1) * 4)) l--;
      let r = sx;
      while (r < W - 1 && !done[sy * W + r + 1] && same((sy * W + r + 1) * 4)) r++;
      for (let px = l; px <= r; px++) {
        const p = sy * W + px;
        if (done[p]) continue;
        done[p] = 1;
        setPx(d, p * 4, color);
      }
      grow(b, l, sy);
      grow(b, r, sy);
      for (const ny of [sy - 1, sy + 1]) {
        if (ny < 0 || ny >= H) continue;
        let inRun = false;
        for (let px = l; px <= r; px++) {
          const p = ny * W + px, ok = !done[p] && same(p * 4);
          if (ok && !inRun) {
            stack.push(px, ny);
            inRun = true;
          } else if (!ok) inRun = false;
        }
      }
    }
    return toBox(b);
  }
  function linePixels(x0, y0, x1, y1, fn) {
    x0 = Math.floor(x0);
    y0 = Math.floor(y0);
    x1 = Math.floor(x1);
    y1 = Math.floor(y1);
    const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
    let err = dx + dy;
    for (; ; ) {
      fn(x0, y0);
      if (x0 === x1 && y0 === y1) return;
      const e2 = 2 * err;
      if (e2 >= dy) {
        err += dy;
        x0 += sx;
      }
      if (e2 <= dx) {
        err += dx;
        y0 += sy;
      }
    }
  }
  function discMask(size) {
    const n = Math.max(1, Math.round(size)), r = n / 2, m = new Uint8Array(n * n);
    for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
      const dx = i + 0.5 - r, dy = j + 0.5 - r;
      if (n <= 2 || dx * dx + dy * dy <= r * r + 0.25) m[j * n + i] = 1;
    }
    return m;
  }
  function fillPolygon(img, pts, color) {
    const { width: W, height: H, data: d } = img, n = pts.length;
    if (n < 3) return null;
    const b = { x0: W, y0: H, x1: -1, y1: -1 };
    const ys = pts.map((p) => p.y), top = Math.max(0, Math.floor(Math.min(...ys))), bottom = Math.min(H - 1, Math.ceil(Math.max(...ys)));
    for (let y = top; y <= bottom; y++) {
      const cy = y + 0.5, xs = [];
      for (let i = 0; i < n; i++) {
        const a = pts[i], c = pts[(i + 1) % n];
        if (a.y <= cy !== c.y <= cy) xs.push(a.x + (cy - a.y) * (c.x - a.x) / (c.y - a.y));
      }
      xs.sort((p, q) => p - q);
      for (let k = 0; k + 1 < xs.length; k += 2) {
        const x0 = Math.max(0, Math.ceil(xs[k] - 0.5)), x1 = Math.min(W - 1, Math.floor(xs[k + 1] - 0.5));
        for (let x = x0; x <= x1; x++) setPx(d, (y * W + x) * 4, color);
        if (x0 <= x1) {
          grow(b, x0, y);
          grow(b, x1, y);
        }
      }
    }
    return toBox(b);
  }
  function paletteCounts(img, palette) {
    const key = /* @__PURE__ */ new Map();
    for (const c of palette) {
      const [r, g, b] = rgba(c);
      key.set(r << 16 | g << 8 | b, c);
    }
    const out = /* @__PURE__ */ new Map(), d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i + 3] < 128) continue;
      const c = key.get(d[i] << 16 | d[i + 1] << 8 | d[i + 2]);
      if (c) out.set(c, (out.get(c) || 0) + 1);
    }
    return out;
  }
  function uniqueColors(img, max) {
    const m = /* @__PURE__ */ new Map(), d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i + 3] < 128) continue;
      const k = d[i] << 16 | d[i + 1] << 8 | d[i + 2];
      m.set(k, (m.get(k) || 0) + 1);
      if (m.size > max) return null;
    }
    return [...m].sort((a, b) => b[1] - a[1]).map(([k]) => hex(k >> 16, k >> 8 & 255, k & 255));
  }
  function samplePixels(img, n) {
    const out = [], d = img.data, total = img.width * img.height, step = Math.max(1, Math.floor(total / n));
    for (let p = 0; p < total; p += step) {
      const i = p * 4;
      if (d[i + 3] >= 128) out.push([d[i], d[i + 1], d[i + 2]]);
    }
    return out;
  }
  function replaceColor(img, from, to) {
    const [r, g, b] = rgba(from), d = img.data;
    let n = 0;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i + 3] >= 128 && d[i] === r && d[i + 1] === g && d[i + 2] === b) {
        setPx(d, i, to);
        n++;
      }
    }
    return n;
  }
  function nearestCache(palette) {
    const labs = palette.map((c) => toLab(rgbOf(c)));
    const cache2 = /* @__PURE__ */ new Map();
    return (r, g, b) => {
      const k = r << 16 | g << 8 | b;
      let c = cache2.get(k);
      if (!c) {
        c = nearest([r, g, b], palette, labs);
        cache2.set(k, c);
      }
      return c;
    };
  }
  function quantize(img, palette) {
    const near = nearestCache(palette), rgbaOf = new Map(palette.map((c) => [c, rgba(c)]));
    const counts2 = /* @__PURE__ */ new Map(), d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i + 3] < 128) {
        d[i + 3] = 0;
        continue;
      }
      const c = near(d[i], d[i + 1], d[i + 2]);
      setPx(d, i, rgbaOf.get(c));
      counts2.set(c, (counts2.get(c) || 0) + 1);
    }
    return counts2;
  }
  function mosaic(src, o) {
    const { width: W, height: H } = src, s = src.data, out = makeImg(W, H), d = out.data;
    const T = Math.max(2, Math.round(o.tile)), G = Math.min(T - 1, Math.max(0, Math.round(o.grout)));
    const near = o.palette && o.palette.length ? nearestCache(o.palette) : null;
    const grout = rgba(o.groutColor);
    const counts2 = /* @__PURE__ */ new Map();
    let tiles = 0;
    for (let ty = 0, row = 0; ty < H; ty += T, row++) {
      const shift = o.bricks && row % 2 ? -Math.floor(T / 2) : 0;
      for (let tx = shift; tx < W; tx += T) {
        const x0 = Math.max(0, tx), x1 = Math.min(W, tx + T), y1 = Math.min(H, ty + T);
        let r = 0, g = 0, b = 0, n = 0, all = 0;
        for (let y = ty; y < y1 - (y1 === ty + T ? G : 0); y++) for (let x = x0; x < Math.min(x1, tx + T - G); x++) {
          const i = (y * W + x) * 4;
          all++;
          if (s[i + 3] < 128) continue;
          r += s[i];
          g += s[i + 1];
          b += s[i + 2];
          n++;
        }
        const filled = n > 0 && n >= all / 2;
        let c = [0, 0, 0, 0];
        if (filled) {
          r = Math.round(r / n);
          g = Math.round(g / n);
          b = Math.round(b / n);
          const name = near ? near(r, g, b) : hex(r, g, b);
          c = rgba(name);
          counts2.set(name, (counts2.get(name) || 0) + 1);
          tiles++;
        }
        for (let y = ty; y < y1; y++) for (let x = x0; x < x1; x++) {
          const inGrout = x >= tx + T - G || y >= ty + T - G;
          setPx(d, (y * W + x) * 4, inGrout ? filled ? grout : [0, 0, 0, 0] : c);
        }
      }
    }
    return { img: out, counts: counts2, tiles };
  }
  function classify(img, colors) {
    const near = nearestCache(colors), index2 = new Map(colors.map((c, i) => [c, i]));
    const n = img.width * img.height, grid = new Int16Array(n), counts2 = colors.map(() => 0), d = img.data;
    for (let p = 0, i = 0; p < n; p++, i += 4) {
      if (d[i + 3] < 128) {
        grid[p] = -1;
        continue;
      }
      const k = index2.get(near(d[i], d[i + 1], d[i + 2]));
      grid[p] = k;
      counts2[k]++;
    }
    return { grid, counts: counts2 };
  }

  // src/shared/ui.ts
  var $ = (s) => document.querySelector(s);
  var $$ = (s) => [...document.querySelectorAll(s)];
  var clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  var toastTimer;
  function toast(msg) {
    const t = $("#st-msg");
    t.textContent = msg;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      t.textContent = "";
    }, 5e3);
  }
  function lsGet(k) {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  }
  function lsSet(k, v) {
    try {
      localStorage.setItem(k, v);
      return true;
    } catch {
      return false;
    }
  }
  function download(blob, name) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      a.remove();
      URL.revokeObjectURL(a.href);
    }, 3e4);
  }
  function typingIn(t) {
    if (!t) return false;
    if (t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable) return true;
    return t.tagName === "INPUT" && !["checkbox", "radio", "range", "color", "button", "file"].includes(t.type);
  }
  function loadImg(src) {
    return new Promise((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = rej;
      i.src = src;
    });
  }

  // src/shared/shell.ts
  function initShell(stage2) {
    $("#btn-panel").onclick = () => document.body.classList.toggle("panel-open");
    new ResizeObserver(([e]) => document.documentElement.style.setProperty("--topbar-h", e.target.offsetHeight + "px")).observe($("#topbar"));
    stage2.addEventListener("pointerdown", () => document.body.classList.remove("panel-open"));
    for (const d of document.querySelectorAll("dialog")) {
      d.addEventListener("click", (e) => {
        if (e.target === d) d.close();
      });
    }
    let installEvent = null;
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      installEvent = e;
      $("#btn-install").hidden = false;
    });
    $("#btn-install").onclick = async () => {
      if (!installEvent) return;
      installEvent.prompt();
      await installEvent.userChoice;
      installEvent = null;
      $("#btn-install").hidden = true;
    };
    window.addEventListener("appinstalled", () => {
      $("#btn-install").hidden = true;
      toast("Installed – Mosaic Paint now works offline too.");
    });
    if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
      navigator.serviceWorker.register("sw.js").catch(() => {
      });
    }
  }

  // src/shared/palette-ui.ts
  var DEFAULT_PALETTE = ["#264653", "#2a9d8f", "#8ab17d", "#e9c46a", "#f4a261", "#e76f51", "#f1faee", "#a8dadc", "#457b9d", "#1d3557"];
  var SHARED_KEY = "mz-prefs";
  function readShared() {
    try {
      return JSON.parse(lsGet(SHARED_KEY) || "{}");
    } catch {
      return {};
    }
  }
  function loadSharedPalettes(st) {
    const o = readShared();
    if (o.palettes && typeof o.palettes === "object" && Object.keys(o.palettes).length) st.palettes = o.palettes;
    if (o.paletteName && st.palettes[o.paletteName]) st.paletteName = o.paletteName;
  }
  function saveSharedPalettes(st) {
    const o = readShared();
    o.palettes = st.palettes;
    o.paletteName = st.paletteName;
    lsSet(SHARED_KEY, JSON.stringify(o));
  }
  function createPaletteUI(host) {
    const st = host.state;
    function uniqueName(base) {
      let n = base, i = 2;
      while (st.palettes[n]) n = `${base} ${i++}`;
      return n;
    }
    function renderSelect() {
      const sel = $("#pal-select");
      sel.innerHTML = "";
      for (const name of Object.keys(st.palettes)) {
        const o = document.createElement("option");
        o.value = o.textContent = name;
        sel.append(o);
      }
      sel.value = st.paletteName;
    }
    function switchPalette(name) {
      if (!st.palettes[name]) return;
      st.paletteName = name;
      host.save();
      renderSelect();
      render2();
    }
    function addPalette2(name, colors) {
      const n = uniqueName(name);
      st.palettes[n] = colors;
      switchPalette(n);
      return n;
    }
    function addColors2(list) {
      let added = 0;
      for (const c of list) if (c && !st.palette.includes(c)) {
        st.palette.push(c);
        added++;
      }
      host.save();
      render2();
      return added;
    }
    let paletteKey = "";
    function render2() {
      const box = $("#palette");
      const counts2 = host.counts(), key = st.palette.join();
      if (key === paletteKey && box.children.length === st.palette.length + 1) {
        [null, ...st.palette].forEach((c, i) => updateSwatch(box.children[i], c, counts2));
      } else {
        paletteKey = key;
        box.innerHTML = "";
        for (const c of [null, ...st.palette]) box.append(makeSwatch(c, counts2));
      }
      const fb = $("#ac-fill"), sb = $("#ac-stroke");
      fb.className = "acbox" + (st.fill ? "" : " none");
      fb.style.background = st.fill || "";
      if (sb) {
        sb.className = "acbox" + (st.stroke ? "" : " none");
        sb.style.background = st.stroke || "";
      }
      if (host.rendered) host.rendered();
    }
    function updateSwatch(d, c, counts2) {
      d.classList.toggle("is-fill", c === st.fill);
      d.classList.toggle("is-stroke", c === st.stroke);
      const n = c ? counts2.get(c) || 0 : 0;
      const num2 = c ? st.palette.indexOf(c) + 1 : 0;
      const N = host.names;
      d.title = c ? `#${num2}  ${c}${n ? ` – used by ${host.usage(n)}` : ""}
Click: ${N.fill} · Right-click: ${N.stroke} · Double-click: edit` : N.none;
      let b = d.querySelector(".count");
      if (n && !b) {
        b = document.createElement("span");
        b.className = "count";
        d.prepend(b);
      }
      if (b) {
        if (n) b.textContent = n > 9999 ? Math.round(n / 1e3) + "k" : String(n);
        else b.remove();
      }
    }
    function makeSwatch(c, counts2) {
      const d = document.createElement("div");
      d.className = "swatch" + (c ? "" : " none");
      if (c) d.style.background = c;
      updateSwatch(d, c, counts2);
      if (c) {
        const x = document.createElement("button");
        x.className = "del";
        x.textContent = "×";
        x.title = "Remove from palette";
        x.onclick = (e) => {
          e.stopPropagation();
          removeColor(c);
        };
        d.append(x);
        d.ondblclick = () => editColor(c);
      }
      d.onclick = (e) => {
        if (e.shiftKey && host.shiftClick) host.shiftClick(c, e);
        else setFill2(c, true);
      };
      d.oncontextmenu = (e) => {
        e.preventDefault();
        setStroke2(c, true);
      };
      return d;
    }
    function setFill2(c, apply) {
      st.fill = c;
      host.save();
      if (!(apply && host.applyFill && host.applyFill(c))) render2();
    }
    function setStroke2(c, apply) {
      st.stroke = c;
      host.save();
      if (!(apply && host.applyStroke && host.applyStroke(c))) render2();
    }
    function removeColor(c) {
      st.palette = st.palette.filter((x) => x !== c);
      host.save();
      render2();
    }
    function editColor(old) {
      const v = prompt("Edit color (hex or any CSS color).\nThe drawing is recolored too.", old);
      if (v == null) return;
      const c = norm(v);
      if (!c) {
        toast("Not a valid color: " + v);
        return;
      }
      if (c === old) return;
      const i = st.palette.indexOf(old);
      if (st.palette.includes(c)) st.palette.splice(i, 1);
      else st.palette[i] = c;
      if (st.fill === old) st.fill = c;
      if (st.stroke === old) st.stroke = c;
      host.save();
      const msg = host.recolor ? host.recolor(old, c) : null;
      if (msg) toast(msg);
      render2();
    }
    function addFromInput() {
      const inp = $("#color-input");
      const text = inp.value.trim();
      if (!text) {
        inp.focus();
        toast("Paste a color code (or several) into the box, then press Enter.");
        return;
      }
      const cols = parse(text);
      if (!cols.length) {
        toast("No color found in: " + text);
        return;
      }
      const n = addColors2(cols);
      if (cols.length === 1) setFill2(cols[0], false);
      inp.value = "";
      updatePreview();
      toast(n ? `Added ${n} color${n > 1 ? "s" : ""}.` : "Already in the palette.");
    }
    function updatePreview() {
      const c = parse($("#color-input").value)[0];
      const p = $("#color-preview");
      p.style.background = c || "transparent";
      p.title = c || "";
    }
    function pasteColors2(text) {
      const cols = parse(text);
      if (!cols.length) return false;
      const n = addColors2(cols);
      if (cols.length === 1) setFill2(cols[0], false);
      toast(n ? `Added ${n} color${n > 1 ? "s" : ""} from the clipboard.` : "Those colors are already in the palette.");
      return true;
    }
    function bind() {
      const inp = $("#color-input");
      $("#btn-add-color").onclick = addFromInput;
      inp.addEventListener("keydown", (e) => {
        if (e.key === "Enter") addFromInput();
      });
      inp.addEventListener("input", updatePreview);
      inp.addEventListener("paste", () => setTimeout(() => {
        if (parse(inp.value).length) addFromInput();
      }, 0));
      $("#btn-swap").onclick = () => {
        const f = st.fill;
        st.fill = st.stroke;
        st.stroke = f;
        host.save();
        render2();
      };
      $("#pal-select").onchange = (e) => switchPalette(e.target.value);
      $("#btn-pal-new").onclick = () => {
        const n = prompt("Name of the new palette:", uniqueName("Palette"));
        if (!n || !n.trim()) return;
        const name = uniqueName(n.trim());
        st.palettes[name] = [];
        switchPalette(name);
        toast(`Created “${name}”. Paste colors to fill it.`);
      };
      $("#btn-pal-rename").onclick = () => {
        const old = st.paletteName, n = prompt("Rename palette:", old);
        if (!n || !n.trim() || n.trim() === old) return;
        const name = uniqueName(n.trim()), next = {};
        for (const k of Object.keys(st.palettes)) next[k === old ? name : k] = st.palettes[k];
        st.palettes = next;
        switchPalette(name);
      };
      $("#btn-pal-delete").onclick = () => {
        if (!confirm(`Delete the palette “${st.paletteName}”? (The drawing is not changed.)`)) return;
        delete st.palettes[st.paletteName];
        if (!Object.keys(st.palettes).length) st.palettes["My palette"] = [];
        switchPalette(Object.keys(st.palettes)[0]);
      };
      $("#btn-pal-doc").onclick = () => {
        const n = addColors2(host.docColors());
        toast(n ? `Added ${n} color${n > 1 ? "s" : ""} from the drawing.` : "No new colors in the drawing.");
      };
      $("#btn-pal-export").onclick = () => download(new Blob([st.palette.join("\n") + "\n"], { type: "text/plain" }), st.paletteName + ".txt");
      $("#btn-pal-clear").onclick = () => {
        if (confirm("Remove all colors from this palette? (The drawing is not changed.)")) {
          st.palette = [];
          host.save();
          render2();
        }
      };
      $("#btn-pal-import").onclick = () => $("#pal-file").click();
      $("#pal-file").onchange = async (e) => {
        const f = e.target.files[0];
        if (!f) return;
        const text = await f.text();
        e.target.value = "";
        const n = addColors2(parse(text));
        toast(n ? `Imported ${n} color${n > 1 ? "s" : ""}.` : "No new colors found in " + f.name);
      };
      window.addEventListener("storage", (e) => {
        if (e.key !== SHARED_KEY) return;
        loadSharedPalettes(st);
        renderSelect();
        render2();
      });
    }
    return { uniqueName, renderSelect, switchPalette, addPalette: addPalette2, addColors: addColors2, render: render2, setFill: setFill2, setStroke: setStroke2, addFromInput, updatePreview, pasteColors: pasteColors2, bind };
  }

  // src/raster/state.ts
  var state = {
    mode: "simple",
    tool: "brush",
    fill: "#e76f51",
    stroke: "#222222",
    palettes: { "My palette": [...DEFAULT_PALETTE] },
    paletteName: "My palette",
    size: 8,
    opacity: 1,
    smooth: true,
    sides: 6,
    ngonFill: true,
    ngonOutline: false,
    tolerance: 24,
    contiguous: true,
    grid: true,
    mosaic: { tile: 16, grout: 2, groutColor: "#b8b2a7", colors: "palette", count: 12, bricks: false },
    view: { x: 0, y: 0, s: 1 },
    /** the rectangle selection (whole pixels), or null */
    sel: null,
    floating: null,
    /** the gesture in progress */
    action: null,
    /** draws a tool's preview over the image, in image coordinates (px = one screen pixel) */
    preview: null,
    /** pointer position over the image, for the brush outline */
    cursor: null,
    space: false,
    get palette() {
      return this.palettes[this.paletteName] || (this.palettes[this.paletteName] = []);
    },
    set palette(v) {
      this.palettes[this.paletteName] = v;
    }
  };
  var rt = {
    dirty: false,
    fileName: "mosaic.png",
    fileHandle: null
  };
  var KEY = "mz-raster-prefs";
  var PREF_KEYS = ["mode", "tool", "fill", "stroke", "size", "opacity", "smooth", "sides", "ngonFill", "ngonOutline", "tolerance", "contiguous", "grid", "mosaic"];
  function savePrefs() {
    const o = {};
    for (const k of PREF_KEYS) o[k] = state[k];
    lsSet(KEY, JSON.stringify(o));
    saveSharedPalettes(state);
  }
  function loadPrefs() {
    let o = {};
    try {
      o = JSON.parse(lsGet(KEY) || "{}");
    } catch {
    }
    for (const k of PREF_KEYS) {
      if (!(k in o)) continue;
      if (k === "mosaic") Object.assign(state.mosaic, o.mosaic);
      else state[k] = o[k];
    }
    loadSharedPalettes(state);
    if (!state.palettes[state.paletteName]) state.paletteName = Object.keys(state.palettes)[0] || "My palette";
  }
  var hooks = {};
  var on = (name, fn) => {
    (hooks[name] || (hooks[name] = [])).push(fn);
  };
  var emit = (name, ...args) => (hooks[name] || []).forEach((fn) => {
    try {
      fn(...args);
    } catch (e) {
      console.error(e);
    }
  });

  // src/raster/canvas.ts
  var stage = $("#stage");
  var view = $("#view");
  var vctx = view.getContext("2d");
  var doc = document.createElement("canvas");
  doc.width = 800;
  doc.height = 600;
  var dctx = doc.getContext("2d", { willReadFrequently: true });
  function makeCanvas(w, h) {
    const c = document.createElement("canvas");
    c.width = Math.max(1, w);
    c.height = Math.max(1, h);
    return c;
  }
  function setSize(w, h) {
    if (doc.width !== w) doc.width = w;
    if (doc.height !== h) doc.height = h;
    emit("size");
  }
  var getImage = (x = 0, y = 0, w = doc.width, h = doc.height) => dctx.getImageData(x, y, w, h);
  function toDoc(cx, cy) {
    const r = view.getBoundingClientRect(), v = state.view;
    return { x: v.x + (cx - r.left) / v.s, y: v.y + (cy - r.top) / v.s };
  }
  function updateView() {
    $("#zoom-label").textContent = Math.round(state.view.s * 100) + "%";
    requestRender();
    emit("view");
  }
  var fitted = false;
  function fitView() {
    const r = view.getBoundingClientRect(), pad = 24;
    if (!r.width || !r.height) return;
    fitted = true;
    const s = Math.min((r.width - 2 * pad) / doc.width, (r.height - 2 * pad) / doc.height);
    const sc = s >= 1 ? Math.max(1, Math.floor(s)) : s;
    state.view = { s: sc, x: doc.width / 2 - r.width / 2 / sc, y: doc.height / 2 - r.height / 2 / sc };
    updateView();
  }
  function zoomAt(cx, cy, factor) {
    const before = toDoc(cx, cy), v = state.view;
    v.s = clamp(v.s * factor, 0.02, 64);
    const r = view.getBoundingClientRect();
    v.x = before.x - (cx - r.left) / v.s;
    v.y = before.y - (cy - r.top) / v.s;
    updateView();
  }
  function zoomCenter(f) {
    const r = view.getBoundingClientRect();
    zoomAt(r.left + r.width / 2, r.top + r.height / 2, f);
  }
  function actualSize() {
    const r = view.getBoundingClientRect();
    zoomAt(r.left + r.width / 2, r.top + r.height / 2, 1 / (state.view.s * (window.devicePixelRatio || 1)));
  }
  var checker = null;
  function checkerPattern() {
    if (!checker) {
      const c = makeCanvas(16, 16), x = c.getContext("2d");
      x.fillStyle = "#ffffff";
      x.fillRect(0, 0, 16, 16);
      x.fillStyle = "#d9d9d9";
      x.fillRect(0, 0, 8, 8);
      x.fillRect(8, 8, 8, 8);
      checker = vctx.createPattern(c, "repeat");
    }
    return checker;
  }
  var queued = false;
  function requestRender() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      render();
    });
  }
  function dashedRect(x, y, w, h) {
    vctx.lineWidth = 1;
    vctx.setLineDash([]);
    vctx.strokeStyle = "#000";
    vctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
    vctx.setLineDash([4, 4]);
    vctx.strokeStyle = "#fff";
    vctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
    vctx.setLineDash([]);
  }
  function render() {
    const dpr = window.devicePixelRatio || 1, v = state.view, s = v.s;
    const cw = Math.round(view.clientWidth * dpr), ch = Math.round(view.clientHeight * dpr);
    if (view.width !== cw || view.height !== ch) {
      view.width = cw;
      view.height = ch;
    }
    vctx.setTransform(1, 0, 0, 1, 0, 0);
    vctx.clearRect(0, 0, cw, ch);
    const k = s * dpr, ox = -v.x * k, oy = -v.y * k, pw = doc.width * k, ph = doc.height * k;
    vctx.save();
    vctx.shadowColor = "rgba(0,0,0,.45)";
    vctx.shadowBlur = 10 * dpr;
    vctx.shadowOffsetY = 2 * dpr;
    vctx.fillStyle = checkerPattern();
    vctx.translate(ox, oy);
    vctx.fillRect(0, 0, pw, ph);
    vctx.restore();
    vctx.imageSmoothingEnabled = k < 1;
    vctx.setTransform(k, 0, 0, k, ox, oy);
    vctx.drawImage(doc, 0, 0);
    const f = state.floating;
    if (f) vctx.drawImage(f.canvas, f.x, f.y);
    if (state.preview) {
      vctx.save();
      state.preview(vctx, 1 / k);
      vctx.restore();
    }
    const c = state.cursor;
    if (c && ["brush", "pencil", "eraser"].includes(state.tool) && !state.space) {
      const r = state.size / 2;
      vctx.beginPath();
      if (state.tool === "pencil") {
        const n = Math.max(1, Math.round(state.size)), x0 = Math.floor(c.x) - Math.floor((n - 1) / 2), y0 = Math.floor(c.y) - Math.floor((n - 1) / 2);
        vctx.rect(x0, y0, n, n);
      } else vctx.arc(c.x, c.y, Math.max(r, 0.5), 0, Math.PI * 2);
      vctx.lineWidth = 1 / k;
      vctx.strokeStyle = "rgba(0,0,0,.7)";
      vctx.stroke();
      vctx.lineWidth = 1 / k;
      vctx.setLineDash([3 / k, 3 / k]);
      vctx.strokeStyle = "rgba(255,255,255,.9)";
      vctx.stroke();
      vctx.setLineDash([]);
    }
    vctx.setTransform(1, 0, 0, 1, 0, 0);
    if (state.grid && k >= 8) {
      const x0 = Math.max(0, Math.floor(v.x)), x1 = Math.min(doc.width, Math.ceil(v.x + cw / k));
      const y0 = Math.max(0, Math.floor(v.y)), y1 = Math.min(doc.height, Math.ceil(v.y + ch / k));
      vctx.beginPath();
      for (let x = x0; x <= x1; x++) {
        const sx = Math.round(ox + x * k) + 0.5;
        vctx.moveTo(sx, oy + y0 * k);
        vctx.lineTo(sx, oy + y1 * k);
      }
      for (let y = y0; y <= y1; y++) {
        const sy = Math.round(oy + y * k) + 0.5;
        vctx.moveTo(ox + x0 * k, sy);
        vctx.lineTo(ox + x1 * k, sy);
      }
      vctx.lineWidth = 1;
      vctx.strokeStyle = "rgba(128,128,128,.35)";
      vctx.stroke();
    }
    const box = f ? { x: f.x, y: f.y, w: f.canvas.width, h: f.canvas.height } : state.sel;
    if (box) dashedRect(Math.round(ox + box.x * k), Math.round(oy + box.y * k), Math.round(box.w * k), Math.round(box.h * k));
  }
  new ResizeObserver(() => {
    if (!fitted) fitView();
    requestRender();
  }).observe(stage);

  // src/lib/store.ts
  var dbp = null;
  function open() {
    if (!dbp) {
      dbp = new Promise((resolve, reject) => {
        if (!window.indexedDB) {
          reject(new Error("IndexedDB is not available"));
          return;
        }
        const r = indexedDB.open("mosaic-paint", 1);
        r.onupgradeneeded = () => {
          const d = r.result;
          if (!d.objectStoreNames.contains("kv")) d.createObjectStore("kv");
          if (!d.objectStoreNames.contains("versions")) d.createObjectStore("versions", { keyPath: "id", autoIncrement: true });
        };
        r.onsuccess = () => resolve(r.result);
        r.onerror = () => reject(r.error);
      });
      dbp.catch(() => {
        dbp = null;
      });
    }
    return dbp;
  }
  async function run(name, mode, fn) {
    const d = await open();
    return new Promise((resolve, reject) => {
      const t = d.transaction(name, mode), req = fn(t.objectStore(name));
      t.oncomplete = () => resolve(req ? req.result : void 0);
      t.onerror = t.onabort = () => reject(t.error);
    });
  }
  var Store = {
    get: (k) => run("kv", "readonly", (s) => s.get(k)),
    set: (k, v) => run("kv", "readwrite", (s) => s.put(v, k)),
    addVersion: (v) => run("versions", "readwrite", (s) => s.add(v)),
    async listVersions() {
      return (await run("versions", "readonly", (s) => s.getAll())).sort((a, b) => b.time - a.time);
    },
    deleteVersion: (id) => run("versions", "readwrite", (s) => s.delete(id)),
    async trimVersions(max) {
      const all = await Store.listVersions();
      for (const v of all.slice(max)) await Store.deleteVersion(v.id);
    }
  };

  // src/shared/clipboard.ts
  var canCopyImages = () => !!(navigator.clipboard && navigator.clipboard.write && typeof ClipboardItem !== "undefined");
  async function copyImage(png, text) {
    if (!canCopyImages()) return false;
    const items = { "image/png": png };
    if (text) items["text/plain"] = new Blob([text], { type: "text/plain" });
    try {
      await navigator.clipboard.write([new ClipboardItem(items)]);
      return true;
    } catch {
      return false;
    }
  }
  function imageFromPaste(e) {
    const dt = e.clipboardData;
    if (!dt) return null;
    for (const f of dt.files || []) if (/^image\//.test(f.type)) return f;
    for (const it of dt.items || []) {
      if (it.kind === "file" && /^image\//.test(it.type)) {
        const f = it.getAsFile();
        if (f) return f;
      }
    }
    return null;
  }
  async function readClipboard() {
    const cb = navigator.clipboard;
    if (cb && cb.read) {
      try {
        const out = {};
        for (const item of await cb.read()) {
          const img = item.types.find((t) => /^image\//.test(t));
          if (img && !out.image) out.image = await item.getType(img);
          if (item.types.includes("text/plain") && out.text == null) out.text = await (await item.getType("text/plain")).text();
        }
        return out;
      } catch {
      }
    }
    if (cb && cb.readText) {
      try {
        return { text: await cb.readText() };
      } catch {
      }
    }
    return {};
  }
  function canvasToPng(c) {
    return new Promise((res, rej) => c.toBlob((b) => b ? res(b) : rej(new Error("PNG encoding failed")), "image/png"));
  }
  function svgSize(svg) {
    const vb = /viewBox="\s*[-\d.e]+[\s,]+[-\d.e]+[\s,]+([\d.e]+)[\s,]+([\d.e]+)/.exec(svg);
    if (vb) return { w: +vb[1], h: +vb[2] };
    const w = /\swidth="([\d.]+)/.exec(svg), h = /\sheight="([\d.]+)/.exec(svg);
    return { w: w ? +w[1] : 300, h: h ? +h[1] : 150 };
  }
  async function svgToCanvas(svg, long) {
    const { w, h } = svgSize(svg), k = long / Math.max(w, h, 1e-9);
    const W = Math.max(1, Math.round(w * k)), H = Math.max(1, Math.round(h * k));
    const sized = svg.replace(/<svg\b([^>]*)>/, (m, a) => `<svg${a.replace(/\s(width|height)="[^"]*"/g, "")} width="${W}" height="${H}">`);
    const url = URL.createObjectURL(new Blob([sized], { type: "image/svg+xml" }));
    try {
      const img = await loadImg(url);
      const c = document.createElement("canvas");
      c.width = W;
      c.height = H;
      c.getContext("2d").drawImage(img, 0, 0, W, H);
      return c;
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  // src/raster/history.ts
  var history = [];
  var index = -1;
  var MAX_BYTES = 4e8;
  var MAX_STEPS = 100;
  var snapshot = () => dctx.getImageData(0, 0, doc.width, doc.height);
  function resetHistory() {
    history = [snapshot()];
    index = 0;
    updateUndoUI();
  }
  function commit() {
    history.splice(index + 1);
    history.push(snapshot());
    let bytes = history.reduce((t, s) => t + s.data.length, 0);
    while (history.length > 2 && (history.length > MAX_STEPS || bytes > MAX_BYTES)) bytes -= history.shift().data.length;
    index = history.length - 1;
    rt.dirty = true;
    afterChange();
  }
  function restore(s) {
    if (s.width !== doc.width || s.height !== doc.height) setSize(s.width, s.height);
    dctx.putImageData(s, 0, 0);
    state.floating = null;
    if (state.sel && (state.sel.x + state.sel.w > s.width || state.sel.y + state.sel.h > s.height)) state.sel = null;
    rt.dirty = true;
    afterChange();
  }
  var restoreCurrent = () => restore(history[index]);
  function undo() {
    if (state.floating || state.action) {
      state.action = null;
      state.preview = null;
      restoreCurrent();
      return;
    }
    if (index > 0) restore(history[--index]);
  }
  function redo() {
    if (state.floating) restoreCurrent();
    if (index < history.length - 1) restore(history[++index]);
  }
  function updateUndoUI() {
    $("#btn-undo").disabled = index <= 0 && !state.floating;
    $("#btn-redo").disabled = index >= history.length - 1;
  }
  function afterChange() {
    updateUndoUI();
    updateTitle();
    scheduleAutosave();
    requestRender();
    emit("change");
  }
  function updateTitle() {
    document.title = `${rt.dirty ? "• " : ""}${rt.fileName} – Mosaic Paint Raster`;
  }
  var timer;
  var started = false;
  function startAutosave() {
    started = true;
  }
  function scheduleAutosave() {
    if (!started) return;
    clearTimeout(timer);
    timer = setTimeout(autosaveNow, 800);
  }
  async function autosaveNow() {
    try {
      const png = await (await canvasToPng(doc)).arrayBuffer();
      await Store.set("raster", { png, fileName: rt.fileName, time: Date.now() });
    } catch {
      toast("Autosave failed – remember to save your image.");
    }
  }
  async function loadAutosave() {
    try {
      const rec = await Store.get("raster");
      if (!rec || !rec.png) return null;
      return { png: rec.png instanceof Blob ? rec.png : new Blob([rec.png], { type: "image/png" }), fileName: rec.fileName };
    } catch {
      return null;
    }
  }

  // src/lib/geometry.ts
  function regularPolygon(n, cx, cy, r, rot) {
    const out = [];
    for (let i = 0; i < n; i++) {
      const a = rot + i * 2 * Math.PI / n;
      out.push({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) });
    }
    return out;
  }

  // src/lib/automosaic.ts
  function rng(seed) {
    let a = seed >>> 0 || 1;
    return () => {
      a = a + 1831565813 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function kmeans(points, k, seed = 1, iterations = 16) {
    if (!points.length) return [];
    k = Math.min(k, points.length);
    const rnd = rng(seed), d2 = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;
    const centers = [points[Math.floor(rnd() * points.length)]];
    while (centers.length < k) {
      const w = points.map((p) => Math.min(...centers.map((c) => d2(p, c))));
      let r = rnd() * w.reduce((s, v) => s + v, 0), i = 0;
      while (i < points.length - 1 && (r -= w[i]) > 0) i++;
      centers.push(points[i]);
    }
    let counts2 = [];
    for (let it = 0; it < iterations; it++) {
      const sums = centers.map(() => [0, 0, 0]);
      counts2 = centers.map(() => 0);
      for (const p of points) {
        let best = 0, bd = Infinity;
        centers.forEach((c, ci) => {
          const d = d2(p, c);
          if (d < bd) {
            bd = d;
            best = ci;
          }
        });
        sums[best][0] += p[0];
        sums[best][1] += p[1];
        sums[best][2] += p[2];
        counts2[best]++;
      }
      centers.forEach((c, ci) => {
        if (counts2[ci]) centers[ci] = sums[ci].map((v) => v / counts2[ci]);
      });
    }
    return centers.map((c, i) => ({ c, n: counts2[i] })).sort((a, b) => b.n - a.n).map((x) => x.c);
  }

  // src/raster/palette.ts
  var counts = null;
  var countsKey = "";
  on("change", () => {
    counts = null;
  });
  function colorCounts() {
    const key = state.palette.join();
    if (!counts || key !== countsKey) {
      counts = paletteCounts(getImage(), state.palette);
      countsKey = key;
    }
    return counts;
  }
  function suggestColors(img, n) {
    const labs = samplePixels(img, 5e3).map(toLab);
    return labs.length ? [...new Set(kmeans(labs, n, 7).map(fromLab))] : [];
  }
  var ui = createPaletteUI({
    state,
    save: savePrefs,
    counts: colorCounts,
    usage: (n) => `${n} pixel${n > 1 ? "s" : ""}`,
    names: { fill: "paint color", stroke: "outline color", none: "Transparent – paints and fills transparent pixels" },
    docColors() {
      const img = getImage();
      return uniqueColors(img, 64) || suggestColors(img, 16);
    },
    recolor(old, c) {
      const img = getImage(), n = replaceColor(img, old, rgba(c));
      if (!n) return null;
      dctx.putImageData(img, 0, 0);
      commit();
      return `Recolored ${n} pixel${n > 1 ? "s" : ""}.`;
    }
  });
  var {
    addPalette,
    addColors,
    setFill,
    setStroke,
    pasteColors,
    render: renderPalette,
    renderSelect: renderPaletteSelect,
    bind: bindPalette
  } = ui;
  on("change", () => renderPalette());

  // src/raster/select.ts
  var inside = (b, p) => p.x >= b.x && p.y >= b.y && p.x < b.x + b.w && p.y < b.y + b.h;
  var floatBox = () => {
    const f = state.floating;
    return f ? { x: f.x, y: f.y, w: f.canvas.width, h: f.canvas.height } : null;
  };
  function clip(b) {
    const x0 = Math.max(0, b.x), y0 = Math.max(0, b.y), x1 = Math.min(doc.width, b.x + b.w), y1 = Math.min(doc.height, b.y + b.h);
    return x1 > x0 && y1 > y0 ? { x: x0, y: y0, w: x1 - x0, h: y1 - y0 } : null;
  }
  function selectionChanged() {
    const b = floatBox() || state.sel;
    $("#sel-section").hidden = !b;
    if (b) $("#sel-info").textContent = `(${b.w} × ${b.h} px${state.floating ? ", not placed yet" : ""})`;
    $("#stage-actions").hidden = !state.floating;
    requestRender();
    emit("selection");
  }
  function lift(copy2) {
    const b = state.sel;
    const c = makeCanvas(b.w, b.h);
    c.getContext("2d").drawImage(doc, b.x, b.y, b.w, b.h, 0, 0, b.w, b.h);
    if (!copy2) dctx.clearRect(b.x, b.y, b.w, b.h);
    state.floating = { canvas: c, x: b.x, y: b.y };
    state.sel = null;
  }
  function place() {
    const f = state.floating;
    if (!f) return false;
    dctx.drawImage(f.canvas, f.x, f.y);
    state.sel = clip({ x: f.x, y: f.y, w: f.canvas.width, h: f.canvas.height });
    state.floating = null;
    commit();
    selectionChanged();
    return true;
  }
  function cancelFloating() {
    if (!state.floating) return;
    restoreCurrent();
    selectionChanged();
  }
  function deselect() {
    if (state.floating) place();
    state.sel = null;
    selectionChanged();
  }
  function selectAll() {
    if (state.floating) place();
    state.sel = { x: 0, y: 0, w: doc.width, h: doc.height };
    selectionChanged();
  }
  var selectTool = {
    down(e, p) {
      const fb = floatBox();
      if (fb && inside(fb, p)) {
        state.action = { type: "move", dx: p.x - fb.x, dy: p.y - fb.y };
        return;
      }
      if (!fb && state.sel && inside(state.sel, p)) {
        lift(e.altKey);
        state.action = { type: "move", dx: p.x - state.floating.x, dy: p.y - state.floating.y };
        selectionChanged();
        return;
      }
      if (fb) place();
      state.action = { type: "marquee", a: { x: Math.round(p.x), y: Math.round(p.y) } };
      state.sel = null;
      selectionChanged();
    },
    move(e, p) {
      const a = state.action;
      if (!a) return;
      if (a.type === "move") {
        state.floating.x = Math.round(p.x - a.dx);
        state.floating.y = Math.round(p.y - a.dy);
        requestRender();
      } else if (a.type === "marquee") {
        const b = { x: Math.round(p.x), y: Math.round(p.y) };
        state.sel = clip({ x: Math.min(a.a.x, b.x), y: Math.min(a.a.y, b.y), w: Math.abs(b.x - a.a.x), h: Math.abs(b.y - a.a.y) });
        selectionChanged();
      }
    },
    up() {
      state.action = null;
      selectionChanged();
    }
  };
  function copySource() {
    if (state.floating) return state.floating.canvas;
    const b = state.sel || { x: 0, y: 0, w: doc.width, h: doc.height };
    const c = makeCanvas(b.w, b.h);
    c.getContext("2d").drawImage(doc, b.x, b.y, b.w, b.h, 0, 0, b.w, b.h);
    return c;
  }
  var internalClip = null;
  async function copy(cut) {
    const c = copySource(), what = state.floating || state.sel ? "the selection" : "the image";
    internalClip = c;
    const ok = canCopyImages() ? await copyImage(canvasToPng(c)) : false;
    if (cut) clearSelection();
    toast(ok ? `${cut ? "Cut" : "Copied"} ${what} – paste it here, into the vector app or any other program.` : `${cut ? "Cut" : "Copied"} ${what} (this browser keeps it for pasting here only).`);
  }
  function clearSelection() {
    if (state.floating) {
      state.floating = null;
      commit();
      selectionChanged();
      return;
    }
    const b = state.sel;
    if (!b) return;
    dctx.clearRect(b.x, b.y, b.w, b.h);
    commit();
  }
  function crop() {
    if (state.floating) place();
    const b = state.sel;
    if (!b) {
      toast("Select the part to keep first.");
      return;
    }
    const c = copySource();
    setSize(b.w, b.h);
    dctx.drawImage(c, 0, 0);
    state.sel = null;
    commit();
    selectionChanged();
    fitView();
  }
  var lastPointer = null;
  view.addEventListener("pointermove", (e) => {
    lastPointer = toDoc(e.clientX, e.clientY);
  });
  view.addEventListener("pointerleave", () => {
    lastPointer = null;
  });
  async function toCanvas(blob) {
    try {
      if (/svg/.test(blob.type)) {
        const text = await blob.text(), { w, h } = svgSize(text);
        return await svgToCanvas(text, Math.max(16, Math.round(Math.max(w, h))));
      }
      const url = URL.createObjectURL(blob);
      try {
        const img = await loadImg(url);
        const c = makeCanvas(img.naturalWidth, img.naturalHeight);
        c.getContext("2d").drawImage(img, 0, 0);
        return c;
      } finally {
        URL.revokeObjectURL(url);
      }
    } catch {
      return null;
    }
  }
  async function pasteImage(src) {
    const c = src instanceof HTMLCanvasElement ? src : await toCanvas(src);
    if (!c) {
      toast("Could not read the pasted image.");
      return;
    }
    if (state.floating) place();
    if ((c.width > doc.width || c.height > doc.height) && confirm(`The pasted image (${c.width} × ${c.height}) is bigger than this one (${doc.width} × ${doc.height}). Enlarge the canvas to fit it?`)) {
      const keep = makeCanvas(doc.width, doc.height);
      keep.getContext("2d").drawImage(doc, 0, 0);
      setSize(Math.max(doc.width, c.width), Math.max(doc.height, c.height));
      dctx.drawImage(keep, 0, 0);
      commit();
      fitView();
    }
    let at = lastPointer;
    if (!at) {
      const r = view.getBoundingClientRect();
      at = toDoc(r.left + r.width / 2, r.top + r.height / 2);
    }
    const x = Math.min(Math.max(Math.floor(at.x) - Math.floor(c.width / 2), 0), Math.max(0, doc.width - c.width));
    const y = Math.min(Math.max(Math.floor(at.y) - Math.floor(c.height / 2), 0), Math.max(0, doc.height - c.height));
    emit("paste-start");
    state.floating = { canvas: c, x, y };
    state.sel = null;
    afterChange();
    selectionChanged();
    toast(`Pasted ${c.width} × ${c.height} px – drag it into place, then press Enter (or click outside it).`);
  }
  function pasteInternal() {
    if (!internalClip) return false;
    const c = makeCanvas(internalClip.width, internalClip.height);
    c.getContext("2d").drawImage(internalClip, 0, 0);
    pasteImage(c);
    return true;
  }

  // src/raster/paint.ts
  function constrain(a, b) {
    const ang = Math.atan2(b.y - a.y, b.x - a.x), step = Math.PI / 12, q = Math.round(ang / step) * step;
    const L = Math.hypot(b.x - a.x, b.y - a.y) * Math.cos(ang - q);
    return { x: a.x + L * Math.cos(q), y: a.y + L * Math.sin(q) };
  }
  function applyLayer(layer, erase, alpha) {
    dctx.save();
    dctx.globalAlpha = alpha;
    dctx.globalCompositeOperation = erase ? "destination-out" : "source-over";
    dctx.drawImage(layer, 0, 0);
    dctx.restore();
  }
  function smoothLine(ctx2, a, b, width, color) {
    ctx2.strokeStyle = color;
    ctx2.fillStyle = color;
    ctx2.lineWidth = width;
    ctx2.lineCap = "round";
    ctx2.lineJoin = "round";
    if (a.x === b.x && a.y === b.y) {
      ctx2.beginPath();
      ctx2.arc(a.x, a.y, width / 2, 0, Math.PI * 2);
      ctx2.fill();
      return;
    }
    ctx2.beginPath();
    ctx2.moveTo(a.x, a.y);
    ctx2.lineTo(b.x, b.y);
    ctx2.stroke();
  }
  var tips = /* @__PURE__ */ new Map();
  function tip(size, color) {
    const n = Math.max(1, Math.round(size)), key = n + color;
    let c = tips.get(key);
    if (!c) {
      if (tips.size > 40) tips.clear();
      c = makeCanvas(n, n);
      const x = c.getContext("2d"), im = x.createImageData(n, n), m = discMask(n), rgba2 = rgba(color);
      for (let i = 0; i < n * n; i++) if (m[i]) im.data.set(rgba2, i * 4);
      x.putImageData(im, 0, 0);
      tips.set(key, c);
    }
    return c;
  }
  function hardLine(ctx2, a, b, size, color) {
    const t = tip(size, color), o = Math.floor((t.width - 1) / 2);
    linePixels(a.x, a.y, b.x, b.y, (x, y) => ctx2.drawImage(t, x - o, y - o));
  }
  var paintColor = () => state.fill || "#000000";
  function beginStroke(kind, p) {
    const base = makeCanvas(doc.width, doc.height);
    base.getContext("2d").drawImage(doc, 0, 0);
    const layer = makeCanvas(doc.width, doc.height);
    const erase = kind === "eraser" || !state.fill;
    const alpha = kind === "pencil" ? 1 : state.opacity;
    return { kind, base, layer, lctx: layer.getContext("2d"), start: p, last: p, erase, alpha };
  }
  function strokeSegment(s, a, b) {
    if (s.kind === "pencil") hardLine(s.lctx, a, b, state.size, paintColor());
    else smoothLine(s.lctx, a, b, state.size, s.erase ? "#000" : paintColor());
  }
  function compose(s) {
    dctx.save();
    dctx.globalCompositeOperation = "copy";
    dctx.drawImage(s.base, 0, 0);
    dctx.restore();
    applyLayer(s.layer, s.erase, s.alpha);
    requestRender();
  }
  function freehand(kind) {
    return {
      down(e, p) {
        const s = beginStroke(kind, p);
        state.action = { type: "stroke", s };
        strokeSegment(s, p, p);
        compose(s);
      },
      move(e, p) {
        const a = state.action;
        if (!a || a.type !== "stroke") return;
        const s = a.s;
        if (e.shiftKey) {
          s.lctx.clearRect(0, 0, s.layer.width, s.layer.height);
          strokeSegment(s, s.start, constrain(s.start, p));
        } else {
          strokeSegment(s, s.last, p);
          s.last = p;
        }
        compose(s);
      },
      up() {
        const a = state.action;
        state.action = null;
        if (a && a.type === "stroke") commit();
      }
    };
  }
  function drawShapeLine(ctx2, a, b, color) {
    if (state.smooth) smoothLine(ctx2, a, b, state.size, color);
    else hardLine(ctx2, a, b, state.size, color);
  }
  var lineTool = {
    down(e, p) {
      state.action = { type: "line", a: p, b: p };
    },
    move(e, p) {
      const a = state.action;
      if (!a || a.type !== "line") return;
      a.b = e.shiftKey ? constrain(a.a, p) : p;
      const color = state.fill || "rgba(0,0,0,.4)";
      state.preview = (ctx2) => {
        ctx2.globalAlpha = state.fill ? state.opacity : 1;
        drawShapeLine(ctx2, a.a, a.b, color);
      };
      requestRender();
    },
    up() {
      const a = state.action;
      state.action = null;
      state.preview = null;
      if (!a || a.type !== "line" || Math.hypot(a.b.x - a.a.x, a.b.y - a.a.y) < 0.5) {
        requestRender();
        return;
      }
      const layer = makeCanvas(doc.width, doc.height);
      drawShapeLine(layer.getContext("2d"), a.a, a.b, state.fill ? paintColor() : "#000");
      applyLayer(layer, !state.fill, state.opacity);
      commit();
    }
  };
  function ngonPoints(a) {
    let rot = Math.atan2(a.b.y - a.a.y, a.b.x - a.a.x);
    if (a.shift) rot = Math.round(rot / (Math.PI / 12)) * (Math.PI / 12);
    return regularPolygon(state.sides, a.a.x, a.a.y, Math.hypot(a.b.x - a.a.x, a.b.y - a.a.y), rot);
  }
  function tracePath(ctx2, pts) {
    ctx2.beginPath();
    pts.forEach((q, i) => i ? ctx2.lineTo(q.x, q.y) : ctx2.moveTo(q.x, q.y));
    ctx2.closePath();
  }
  function drawPolygon(pts) {
    if (state.ngonFill) {
      const layer = makeCanvas(doc.width, doc.height), ctx2 = layer.getContext("2d");
      const color = state.fill || "#000";
      if (state.smooth) {
        tracePath(ctx2, pts);
        ctx2.fillStyle = color;
        ctx2.fill();
      } else {
        const im = ctx2.getImageData(0, 0, ctx2.canvas.width, ctx2.canvas.height);
        if (fillPolygon(im, pts, rgba(color))) ctx2.putImageData(im, 0, 0);
      }
      applyLayer(layer, !state.fill, state.opacity);
    }
    if (state.ngonOutline) {
      const layer = makeCanvas(doc.width, doc.height), ctx2 = layer.getContext("2d");
      const color = state.stroke || "#000";
      for (let i = 0; i < pts.length; i++) drawShapeLine(ctx2, pts[i], pts[(i + 1) % pts.length], color);
      applyLayer(layer, !state.stroke, state.opacity);
    }
  }
  var ngonTool = {
    down(e, p) {
      state.action = { type: "ngon", a: p, b: p };
    },
    move(e, p) {
      const a = state.action;
      if (!a || a.type !== "ngon") return;
      a.b = p;
      a.shift = e.shiftKey;
      const pts = ngonPoints(a);
      state.preview = (ctx2, px) => {
        ctx2.globalAlpha = state.opacity;
        if (state.ngonFill && state.fill) {
          tracePath(ctx2, pts);
          ctx2.fillStyle = state.fill;
          ctx2.fill();
        }
        if (state.ngonOutline && state.stroke) for (let i = 0; i < pts.length; i++) smoothLine(ctx2, pts[i], pts[(i + 1) % pts.length], state.size, state.stroke);
        ctx2.globalAlpha = 1;
        tracePath(ctx2, pts);
        ctx2.lineWidth = px;
        ctx2.setLineDash([4 * px, 3 * px]);
        ctx2.strokeStyle = "#2b8cff";
        ctx2.stroke();
      };
      requestRender();
    },
    up() {
      const a = state.action;
      state.action = null;
      state.preview = null;
      requestRender();
      if (!a || a.type !== "ngon" || Math.hypot(a.b.x - a.a.x, a.b.y - a.a.y) < 1) return;
      if (!state.ngonFill && !state.ngonOutline) {
        toast("Turn on “Fill” or “Outline” for polygons.");
        return;
      }
      drawPolygon(ngonPoints(a));
      commit();
    }
  };
  function bucketAt(p) {
    const x = Math.floor(p.x), y = Math.floor(p.y);
    if (x < 0 || y < 0 || x >= doc.width || y >= doc.height) return false;
    const im = getImage();
    const box = floodFill(im, x, y, rgba(state.fill), state.tolerance, state.contiguous);
    if (!box) return false;
    dctx.putImageData(im, 0, 0, box.x, box.y, box.w, box.h);
    commit();
    return true;
  }
  function pickAt(p) {
    const x = Math.floor(p.x), y = Math.floor(p.y);
    if (x < 0 || y < 0 || x >= doc.width || y >= doc.height) return;
    const c = colorAt(getImage(x, y, 1, 1), 0, 0);
    setFill(c, false);
    toast(c ? `Picked ${c}${state.palette.includes(c) ? "" : " (not in the palette – add it with “From image”)"}` : "Picked “transparent”.");
  }
  var bucketTool = {
    down(e, p) {
      if (e.altKey) pickAt(p);
      else bucketAt(p);
    },
    move() {
    },
    up() {
    }
  };
  var pickerTool = { down(e, p) {
    pickAt(p);
  }, move() {
  }, up() {
  } };
  var paintTools = {
    brush: freehand("brush"),
    pencil: freehand("pencil"),
    eraser: freehand("eraser"),
    line: lineTool,
    ngon: ngonTool,
    bucket: bucketTool,
    picker: pickerTool
  };

  // src/raster/tools.ts
  var tools = {
    ...paintTools,
    select: selectTool,
    pan: { down() {
    }, move() {
    }, up() {
    } }
  };
  var HINTS = {
    select: "Drag to select · drag inside the selection to move it (Alt: a copy) · Enter places it · Ctrl+C / X / V copy, cut, paste",
    brush: "Drag to paint · Shift: straight line · [ ] size · Alt+click: pick a color",
    pencil: "Hard pixels in exact colors · Shift: straight line · [ ] size · Alt+click: pick a color",
    eraser: "Drag to erase to transparent · Shift: straight line · [ ] size",
    line: "Drag a line · Shift: 15° steps",
    ngon: "Drag from the center · Shift: 15° rotation · keys 3–9: sides",
    bucket: "Click to fill the area of similar color · Alt+click: pick a color",
    picker: "Click to take a color from the image",
    pan: "Drag to pan · mouse wheel zooms"
  };
  function setTool(t) {
    if (!tools[t]) t = "brush";
    if (t !== "select" && state.floating) place();
    state.action = null;
    state.preview = null;
    state.tool = t;
    stage.dataset.tool = t;
    for (const b of $$("#tools button")) b.classList.toggle("active", b.dataset.tool === t);
    for (const s of $$(".tool-opts")) s.hidden = !s.dataset.for.split(" ").includes(t);
    $("#st-hint").textContent = HINTS[t];
    savePrefs();
    requestRender();
  }
  function setMode(m) {
    state.mode = m === "expert" ? "expert" : "simple";
    document.body.dataset.mode = state.mode;
    for (const b of $$("#mode-switch button")) b.classList.toggle("active", b.dataset.mode === state.mode);
    if (state.mode === "simple") state.opacity = 1;
    savePrefs();
    emit("mode");
  }

  // src/raster/files.ts
  var MAX_SIDE = 8e3;
  var IMAGE_TYPES = [{ description: "Images", accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp", ".svg"] } }];
  var PNG_TYPES = [{ description: "PNG image", accept: { "image/png": [".png"] } }];
  var baseName = (n) => n.replace(/\.[a-z0-9]+$/i, "");
  function confirmDiscard() {
    return !rt.dirty || confirm("Discard unsaved changes to the current image?\n(Save it first if you want to keep it.)");
  }
  function loadCanvas(c, name) {
    setSize(c.width, c.height);
    dctx.clearRect(0, 0, c.width, c.height);
    dctx.drawImage(c, 0, 0);
    state.sel = null;
    state.floating = null;
    rt.fileName = baseName(name) + ".png";
    rt.fileHandle = null;
    resetHistory();
    rt.dirty = false;
    afterChange();
    selectionChanged();
    fitView();
  }
  async function fileToCanvas(f) {
    try {
      if (/svg/.test(f.type)) {
        const text = await f.text(), { w, h } = svgSize(text);
        return await svgToCanvas(text, Math.min(MAX_SIDE, Math.max(512, Math.round(Math.max(w, h)))));
      }
      const url = URL.createObjectURL(f);
      try {
        const img = await loadImg(url);
        const k = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
        const c = makeCanvas(Math.round(img.naturalWidth * k), Math.round(img.naturalHeight * k));
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        return c;
      } finally {
        URL.revokeObjectURL(url);
      }
    } catch {
      return null;
    }
  }
  async function openImageFile(f) {
    const c = await fileToCanvas(f);
    if (!c) {
      toast("Could not read " + f.name + " as an image.");
      return false;
    }
    loadCanvas(c, f.name);
    toast(`Opened ${f.name} (${c.width} × ${c.height} px).`);
    return true;
  }
  async function openFile() {
    if (!confirmDiscard()) return;
    const w = window;
    if (w.showOpenFilePicker) {
      try {
        const [h] = await w.showOpenFilePicker({ types: IMAGE_TYPES });
        const f = await h.getFile();
        if (await openImageFile(f) && /\.png$/i.test(f.name)) {
          rt.fileHandle = h;
          updateTitle();
        }
        return;
      } catch (err) {
        if (err.name === "AbortError") return;
      }
    }
    $("#file-input").click();
  }
  function parseSize(s) {
    const m = /^\s*(\d+)\s*[x×*, ]\s*(\d+)\s*$/i.exec(s || "");
    if (!m) return null;
    const w = +m[1], h = +m[2];
    return w >= 1 && h >= 1 && w <= MAX_SIDE && h <= MAX_SIDE ? { w, h } : null;
  }
  function newImage() {
    if (!confirmDiscard()) return;
    const ans = prompt("Size of the new image in pixels (width × height):", `${doc.width} × ${doc.height}`);
    if (ans == null) return;
    const s = parseSize(ans);
    if (!s) {
      toast(`Enter a size like 800 × 600 (at most ${MAX_SIDE} px a side).`);
      return;
    }
    const c = makeCanvas(s.w, s.h), x = c.getContext("2d");
    x.fillStyle = "#ffffff";
    x.fillRect(0, 0, s.w, s.h);
    loadCanvas(c, "mosaic.png");
  }
  async function save() {
    const png = await canvasToPng(doc), w = window;
    if (w.showSaveFilePicker) {
      try {
        if (!rt.fileHandle) rt.fileHandle = await w.showSaveFilePicker({ suggestedName: rt.fileName, types: PNG_TYPES });
        const wr = await rt.fileHandle.createWritable();
        await wr.write(png);
        await wr.close();
        rt.fileName = rt.fileHandle.name;
        rt.dirty = false;
        updateTitle();
        toast("Saved " + rt.fileName);
        return;
      } catch (err) {
        if (err.name === "AbortError") return;
        rt.fileHandle = null;
      }
    }
    download(png, rt.fileName);
    rt.dirty = false;
    updateTitle();
  }
  function exportAs(type, quality) {
    let c = doc;
    if (type === "image/jpeg") {
      c = makeCanvas(doc.width, doc.height);
      const x = c.getContext("2d");
      x.fillStyle = "#ffffff";
      x.fillRect(0, 0, c.width, c.height);
      x.drawImage(doc, 0, 0);
    }
    const ext = { "image/jpeg": ".jpg", "image/webp": ".webp", "image/png": ".png" }[type] || ".png";
    c.toBlob((b) => b ? download(b, baseName(rt.fileName) + ext) : toast("Export failed."), type, quality);
  }
  function resizeImage(w, h) {
    if (w === doc.width && h === doc.height) return;
    const old = makeCanvas(doc.width, doc.height);
    old.getContext("2d").drawImage(doc, 0, 0);
    const shrink = w < old.width || h < old.height;
    setSize(w, h);
    dctx.save();
    dctx.imageSmoothingEnabled = shrink;
    dctx.imageSmoothingQuality = "high";
    dctx.drawImage(old, 0, 0, w, h);
    dctx.restore();
    state.sel = null;
    commit();
    selectionChanged();
    fitView();
  }
  function canvasSize(w, h) {
    if (w === doc.width && h === doc.height) return;
    const old = makeCanvas(doc.width, doc.height);
    old.getContext("2d").drawImage(doc, 0, 0);
    setSize(w, h);
    dctx.clearRect(0, 0, w, h);
    dctx.drawImage(old, Math.round((w - old.width) / 2), Math.round((h - old.height) / 2));
    state.sel = null;
    commit();
    selectionChanged();
    fitView();
  }

  // src/raster/mosaic.ts
  function region() {
    if (state.floating) place();
    return state.sel || { x: 0, y: 0, w: doc.width, h: doc.height };
  }
  var fmtN = (n) => n.toLocaleString("en");
  function summary(counts2, unit) {
    const total = [...counts2.values()].reduce((s, n) => s + n, 0);
    return `${fmtN(total)} ${unit}${total === 1 ? "" : "s"} in ${counts2.size} color${counts2.size === 1 ? "" : "s"}`;
  }
  function makeMosaic() {
    const m = state.mosaic, b = region();
    const img = dctx.getImageData(b.x, b.y, b.w, b.h);
    let palette = null;
    if (m.colors === "palette") {
      palette = state.palette;
      if (!palette.length) {
        toast("The palette is empty – add colors, or let the mosaic suggest some.");
        return;
      }
    } else if (m.colors === "suggest") {
      palette = suggestColors(img, m.count);
      if (!palette.length) {
        toast("There is nothing to make a mosaic from (the area is transparent).");
        return;
      }
      addPalette("From picture", palette);
    }
    const res = mosaic(img, { tile: m.tile, grout: m.grout, groutColor: m.groutColor, palette, bricks: m.bricks });
    dctx.putImageData(new ImageData(res.img.data, b.w, b.h), b.x, b.y);
    commit();
    toast(`Made ${summary(res.counts, "tile")}.`);
  }
  function reduceToPalette() {
    if (!state.palette.length) {
      toast("The palette is empty.");
      return;
    }
    const b = region(), img = dctx.getImageData(b.x, b.y, b.w, b.h);
    const counts2 = quantize(img, state.palette);
    dctx.putImageData(img, b.x, b.y);
    commit();
    toast(`Every pixel now has a palette color: ${summary(counts2, "pixel")}.`);
  }
  function estimate() {
    const m = state.mosaic, b = state.sel || { w: doc.width, h: doc.height };
    const n = Math.ceil(b.w / Math.max(2, m.tile)) * Math.ceil(b.h / Math.max(2, m.tile));
    $("#mo-estimate").textContent = `About ${fmtN(n)} tiles${state.sel ? " in the selection" : ""}.`;
  }
  function bindMosaic() {
    const m = state.mosaic;
    const num2 = (id, key, min) => {
      const i = $(id);
      i.value = m[key];
      i.onchange = () => {
        const v = Math.round(+i.value);
        if (v >= min) {
          m[key] = v;
          savePrefs();
        }
        i.value = m[key];
        estimate();
      };
    };
    num2("#mo-tile", "tile", 2);
    num2("#mo-grout", "grout", 0);
    num2("#mo-count", "count", 2);
    $("#mo-grout-color").value = m.groutColor;
    $("#mo-grout-color").onchange = (e) => {
      m.groutColor = e.target.value;
      savePrefs();
    };
    $("#mo-bricks").checked = m.bricks;
    $("#mo-bricks").onchange = (e) => {
      m.bricks = e.target.checked;
      savePrefs();
    };
    for (const r of document.querySelectorAll("input[name=mo-colors]")) {
      r.checked = r.value === m.colors;
      r.onchange = () => {
        if (r.checked) {
          m.colors = r.value;
          savePrefs();
        }
      };
    }
    $("#btn-mosaic").onclick = () => {
      estimate();
      $("#dlg-mosaic").showModal();
    };
    $("#mo-go").onclick = () => {
      $("#dlg-mosaic").close();
      makeMosaic();
    };
    $("#btn-reduce").onclick = reduceToPalette;
  }

  // src/raster/panel.ts
  function setSides(n) {
    state.sides = clamp(Math.round(n) || 6, 3, 64);
    $("#opt-sides").value = state.sides;
    for (const b of $$("#quick-sides button")) b.classList.toggle("active", +b.dataset.sides === state.sides);
    savePrefs();
  }
  function setBrushSize(n) {
    state.size = clamp(Math.round(n) || 1, 1, 500);
    $("#opt-size").value = state.size;
    $("#opt-size-range").value = Math.min(100, state.size);
    savePrefs();
    requestRender();
  }
  function bindCheck(id, key, after) {
    const i = $(id);
    i.checked = !!state[key];
    i.onchange = () => {
      state[key] = i.checked;
      savePrefs();
      if (after) after();
    };
  }
  function showImageSize() {
    $("#img-w").value = doc.width;
    $("#img-h").value = doc.height;
  }
  async function pasteButton() {
    const { image, text } = await readClipboard();
    if (image) {
      setTool("select");
      await pasteImage(image);
      return;
    }
    if (text && /data-mosaic-snippet/.test(text)) {
      setTool("select");
      await pasteImage(new Blob([text], { type: "image/svg+xml" }));
      return;
    }
    if (text && pasteColors(text)) return;
    if (pasteInternal()) return;
    toast("Nothing to paste – or the browser didn’t allow reading the clipboard (try Ctrl+V).");
  }
  function bindPanel() {
    for (const b of $$("#tools button")) b.onclick = () => setTool(b.dataset.tool);
    for (const b of $$("#mode-switch button")) b.onclick = () => setMode(b.dataset.mode);
    $("#btn-new").onclick = newImage;
    $("#btn-open").onclick = openFile;
    $("#file-input").onchange = async (e) => {
      const f = e.target.files[0];
      if (f) await openImageFile(f);
      e.target.value = "";
    };
    $("#btn-save").onclick = save;
    $("#btn-export").onclick = () => $("#dlg-export").showModal();
    $("#ex-format").onchange = () => {
      $("#ex-quality-row").hidden = $("#ex-format").value === "image/png";
    };
    $("#ex-go").onclick = () => {
      $("#dlg-export").close();
      exportAs($("#ex-format").value, clamp(+$("#ex-quality").value || 90, 10, 100) / 100);
    };
    $("#btn-copy").onclick = () => copy(false);
    $("#btn-paste").onclick = pasteButton;
    $("#btn-undo").onclick = undo;
    $("#btn-redo").onclick = redo;
    $("#btn-fit").onclick = fitView;
    $("#btn-actual").onclick = actualSize;
    $("#btn-zoomin").onclick = () => zoomCenter(1.25);
    $("#btn-zoomout").onclick = () => zoomCenter(0.8);
    $("#sa-finish").onclick = place;
    $("#sa-cancel").onclick = cancelFloating;
    $("#opt-size").onchange = () => setBrushSize(+$("#opt-size").value);
    $("#opt-size-range").oninput = () => setBrushSize(+$("#opt-size-range").value);
    setBrushSize(state.size);
    const op = $("#opt-opacity");
    op.value = Math.round(state.opacity * 100);
    op.oninput = () => {
      state.opacity = clamp(+op.value, 5, 100) / 100;
    };
    op.onchange = savePrefs;
    on("mode", () => {
      op.value = Math.round(state.opacity * 100);
    });
    bindCheck("#opt-smooth", "smooth");
    const sides = $("#opt-sides");
    sides.onchange = () => setSides(+sides.value);
    for (const b of $$("#quick-sides button")) b.onclick = () => setSides(+b.dataset.sides);
    setSides(state.sides);
    bindCheck("#opt-ngon-fill", "ngonFill");
    bindCheck("#opt-ngon-outline", "ngonOutline");
    const tol = $("#opt-tolerance"), tolLabel = () => {
      $("#tol-label").textContent = String(state.tolerance);
    };
    tol.value = state.tolerance;
    tol.oninput = () => {
      state.tolerance = +tol.value;
      tolLabel();
    };
    tol.onchange = savePrefs;
    tolLabel();
    bindCheck("#opt-contiguous", "contiguous");
    $("#btn-sel-copy").onclick = () => copy(false);
    $("#btn-sel-cut").onclick = () => copy(true);
    $("#btn-sel-del").onclick = clearSelection;
    $("#btn-sel-crop").onclick = crop;
    showImageSize();
    on("size", showImageSize);
    const askedSize = () => {
      const w = Math.round(+$("#img-w").value), h = Math.round(+$("#img-h").value);
      if (!(w >= 1 && h >= 1 && w <= MAX_SIDE && h <= MAX_SIDE)) {
        toast(`Enter a size from 1 to ${MAX_SIDE} px.`);
        showImageSize();
        return null;
      }
      return { w, h };
    };
    $("#btn-resize").onclick = () => {
      const s = askedSize();
      if (s) resizeImage(s.w, s.h);
    };
    $("#btn-canvas").onclick = () => {
      const s = askedSize();
      if (s) canvasSize(s.w, s.h);
    };
    bindCheck("#opt-grid", "grid", requestRender);
    bindMosaic();
    bindPalette();
  }

  // src/raster/input.ts
  var pointers = /* @__PURE__ */ new Map();
  var pinch = null;
  var pinchDone = false;
  function startPinch() {
    const a = state.action;
    if (a && a.type === "stroke") restoreCurrent();
    state.action = null;
    state.preview = null;
    const [p1, p2] = [...pointers.values()];
    pinch = { d0: Math.hypot(p1.x - p2.x, p1.y - p2.y) || 1, m0: { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 }, view: { ...state.view } };
    pinchDone = true;
  }
  function movePinch() {
    const [p1, p2] = [...pointers.values()];
    const d = Math.hypot(p1.x - p2.x, p1.y - p2.y) || 1, m = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
    const r = view.getBoundingClientRect(), v0 = pinch.view;
    const s = clamp(v0.s * d / pinch.d0, 0.02, 64);
    const docPt = { x: v0.x + (pinch.m0.x - r.left) / v0.s, y: v0.y + (pinch.m0.y - r.top) / v0.s };
    state.view = { s, x: docPt.x - (m.x - r.left) / s, y: docPt.y - (m.y - r.top) / s };
    updateView();
  }
  function capturePointer(e) {
    try {
      view.setPointerCapture(e.pointerId);
    } catch {
    }
  }
  function pointerEnd(e) {
    pointers.delete(e.pointerId);
    if (pinch || pinchDone) {
      if (pointers.size < 2) pinch = null;
      if (!pointers.size) pinchDone = false;
      return true;
    }
    return false;
  }
  var PAINT = /* @__PURE__ */ new Set(["brush", "pencil", "eraser", "line", "ngon", "bucket"]);
  function bindPointer() {
    view.addEventListener("pointerdown", (e) => {
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 2) {
        startPinch();
        return;
      }
      if (pointers.size > 2 || pinch) return;
      pinchDone = false;
      const p = toDoc(e.clientX, e.clientY);
      if (e.button === 1 || state.space || state.tool === "pan") {
        e.preventDefault();
        state.action = { type: "pan", cx: e.clientX, cy: e.clientY, vx: state.view.x, vy: state.view.y };
        capturePointer(e);
        stage.classList.add("panning");
        return;
      }
      if (e.button === 2) {
        if (state.action) {
          state.action = null;
          state.preview = null;
          restoreCurrent();
        }
        return;
      }
      if (e.button !== 0) return;
      if (e.altKey && PAINT.has(state.tool)) {
        pickAt(p);
        return;
      }
      if (state.tool !== "select" && state.floating) place();
      capturePointer(e);
      tools[state.tool].down(e, p);
    });
    view.addEventListener("pointermove", (e) => {
      if (pointers.has(e.pointerId)) pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pinch) {
        if (pointers.size >= 2) movePinch();
        return;
      }
      if (pinchDone) return;
      const p = toDoc(e.clientX, e.clientY);
      $("#st-pos").textContent = `x ${Math.floor(p.x)}  y ${Math.floor(p.y)} px`;
      state.cursor = e.pointerType === "touch" ? null : p;
      const a = state.action;
      if (a && a.type === "pan") {
        state.view.x = a.vx - (e.clientX - a.cx) / state.view.s;
        state.view.y = a.vy - (e.clientY - a.cy) / state.view.s;
        updateView();
        return;
      }
      if (!state.space && !(e.pointerType === "touch" && !pointers.has(e.pointerId))) tools[state.tool].move(e, p);
      requestRender();
    });
    view.addEventListener("pointerup", (e) => {
      if (pointerEnd(e)) return;
      const a = state.action;
      if (a && a.type === "pan") {
        state.action = null;
        stage.classList.remove("panning");
        return;
      }
      if (e.button !== 0) return;
      tools[state.tool].up(e, toDoc(e.clientX, e.clientY));
    });
    view.addEventListener("pointercancel", (e) => {
      pointerEnd(e);
      if (state.action && state.action.type === "stroke") commit();
      state.action = null;
      state.preview = null;
      stage.classList.remove("panning");
      requestRender();
    });
    view.addEventListener("pointerleave", () => {
      state.cursor = null;
      requestRender();
    });
    view.addEventListener("contextmenu", (e) => e.preventDefault());
    view.addEventListener("wheel", (e) => {
      e.preventDefault();
      const dy = e.deltaMode === 1 ? e.deltaY * 30 : e.deltaY;
      zoomAt(e.clientX, e.clientY, Math.exp(-dy * 15e-4));
    }, { passive: false });
  }
  function onKey(e) {
    const target = e.target;
    if (typingIn(target)) {
      if (e.key === "Escape") target.blur();
      return;
    }
    if (target.tagName === "INPUT" && e.key === " ") return;
    if (document.querySelector("dialog[open]")) return;
    const ctrl = e.ctrlKey || e.metaKey, k = e.key.toLowerCase();
    if (ctrl) {
      if (k === "z" && !e.shiftKey) undo();
      else if (k === "y" || k === "z" && e.shiftKey) redo();
      else if (k === "s") save();
      else if (k === "o") openFile();
      else if (k === "a") {
        setTool("select");
        selectAll();
      } else if (k === "c" || k === "x") {
        if (window.getSelection && String(window.getSelection())) return;
        copy(k === "x");
      } else if (k === "d") deselect();
      else return;
      e.preventDefault();
      return;
    }
    if (e.key === " ") {
      if (!state.space) {
        state.space = true;
        stage.classList.add("space");
      }
      e.preventDefault();
      return;
    }
    switch (k) {
      case "v":
        setTool("select");
        break;
      case "b":
        setTool("brush");
        break;
      case "p":
        setTool("pencil");
        break;
      case "e":
        setTool("eraser");
        break;
      case "l":
        setTool("line");
        break;
      case "g":
        setTool("ngon");
        break;
      case "f":
        setTool("bucket");
        break;
      case "i":
        setTool("picker");
        break;
      case "h":
        setTool("pan");
        break;
      case "x": {
        const f = state.fill;
        state.fill = state.stroke;
        state.stroke = f;
        savePrefs();
        renderPalette();
        break;
      }
      case "[":
        setBrushSize(state.size > 10 ? state.size - 5 : state.size - 1);
        break;
      case "]":
        setBrushSize(state.size >= 10 ? state.size + 5 : state.size + 1);
        break;
      case "enter":
        if (!place()) return;
        break;
      case "escape":
        if (state.floating) cancelFloating();
        else if (state.action) {
          state.action = null;
          state.preview = null;
          restoreCurrent();
        } else deselect();
        break;
      case "delete":
      case "backspace":
        clearSelection();
        break;
      case "0":
        fitView();
        break;
      case "1":
        actualSize();
        break;
      case "+":
      case "=":
        zoomCenter(1.25);
        break;
      case "-":
      case "_":
        zoomCenter(0.8);
        break;
      default:
        if (/^[3-9]$/.test(k)) {
          setSides(+k);
          if (state.tool !== "ngon") setTool("ngon");
        } else return;
    }
    e.preventDefault();
  }
  function bindInput() {
    bindPointer();
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", (e) => {
      if (e.key === " ") {
        state.space = false;
        stage.classList.remove("space");
      }
    });
    window.addEventListener("blur", () => {
      state.space = false;
      stage.classList.remove("space");
    });
    document.addEventListener("paste", (e) => {
      if (typingIn(e.target) || document.querySelector("dialog[open]")) return;
      const img = imageFromPaste(e);
      const text = e.clipboardData && e.clipboardData.getData("text") || "";
      if (img) {
        e.preventDefault();
        setTool("select");
        pasteImage(img);
        return;
      }
      if (/data-mosaic-snippet/.test(text)) {
        e.preventDefault();
        setTool("select");
        pasteImage(new Blob([text], { type: "image/svg+xml" }));
        return;
      }
      if (text && pasteColors(text)) {
        e.preventDefault();
        return;
      }
      if (pasteInternal()) {
        e.preventDefault();
        setTool("select");
        return;
      }
      toast("The clipboard has no image or color codes.");
    });
    on("paste-start", () => {
      if (state.tool !== "select") setTool("select");
    });
    stage.addEventListener("dragover", (e) => {
      e.preventDefault();
      stage.classList.add("drop");
    });
    stage.addEventListener("dragleave", () => stage.classList.remove("drop"));
    stage.addEventListener("drop", (e) => {
      e.preventDefault();
      stage.classList.remove("drop");
      const f = e.dataTransfer.files[0];
      if (f && confirmDiscard()) openImageFile(f);
    });
  }

  // src/lib/model3d.ts
  var topLayer = (i, s) => s.baseLayers + (i + 1) * s.layersPerColor;
  function greedyRects(grid, w, h) {
    const done = new Uint8Array(w * h), out = [];
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const i = y * w + x, lv = grid[i];
      if (lv < 0 || done[i]) continue;
      let rw = 1;
      while (x + rw < w && grid[i + rw] === lv && !done[i + rw]) rw++;
      let rh = 1;
      grow: while (y + rh < h) {
        const row = (y + rh) * w + x;
        for (let k = 0; k < rw; k++) if (grid[row + k] !== lv || done[row + k]) break grow;
        rh++;
      }
      for (let yy = y; yy < y + rh; yy++) done.fill(1, yy * w + x, yy * w + x + rw);
      out.push({ x, y, w: rw, h: rh, level: lv });
    }
    return out;
  }
  function cellHeights(grid, s) {
    const out = new Int16Array(grid.length);
    for (let i = 0; i < grid.length; i++) out[i] = grid[i] < 0 ? s.baseLayers : topLayer(grid[i], s);
    return out;
  }
  function closedMesh(grid, w, h, cell, s) {
    const Hc = cellHeights(grid, s);
    const height = (x, y) => x < 0 || y < 0 || x >= w || y >= h ? 0 : Hc[y * w + x];
    const level = (x, y) => x < 0 || y < 0 || x >= w || y >= h ? 0 : Math.max(0, grid[y * w + x]);
    const faces = [];
    const Y = (y) => h - y;
    const tops = new Int16Array(w * h);
    for (let i = 0; i < w * h; i++) tops[i] = Hc[i] > 0 ? Hc[i] : -1;
    for (const r of greedyRects(tops, w, h)) {
      const lv = level(r.x, r.y);
      faces.push({ o: [r.x, Y(r.y + r.h), r.level], u: [r.w, 0, 0], v: [0, r.h, 0], level: lv });
    }
    const solid = new Int16Array(w * h);
    for (let i = 0; i < w * h; i++) solid[i] = Hc[i] > 0 ? 0 : -1;
    for (const r of greedyRects(solid, w, h)) faces.push({ o: [r.x, Y(r.y + r.h), 0], u: [0, r.h, 0], v: [r.w, 0, 0], level: 0 });
    for (let y = 0; y <= h; y++) {
      for (let x = 0; x < w; ) {
        const n = height(x, y - 1), so = height(x, y);
        if (n === so) {
          x++;
          continue;
        }
        let x1 = x + 1;
        while (x1 < w && height(x1, y - 1) === n && height(x1, y) === so) x1++;
        const lo = Math.min(n, so), dz = Math.abs(n - so), Y0 = Y(y);
        if (n > so) faces.push({ o: [x, Y0, lo], u: [x1 - x, 0, 0], v: [0, 0, dz], level: level(x, y - 1) });
        else faces.push({ o: [x, Y0, lo], u: [0, 0, dz], v: [x1 - x, 0, 0], level: level(x, y) });
        x = x1;
      }
    }
    for (let x = 0; x <= w; x++) {
      for (let y = h - 1; y >= 0; ) {
        const we = height(x - 1, y), ea = height(x, y);
        if (we === ea) {
          y--;
          continue;
        }
        let y1 = y - 1;
        while (y1 >= 0 && height(x - 1, y1) === we && height(x, y1) === ea) y1--;
        const lo = Math.min(we, ea), dz = Math.abs(we - ea), Y0 = Y(y + 1), dy = y - y1;
        if (ea > we) faces.push({ o: [x, Y0, lo], u: [0, 0, dz], v: [0, dy, 0], level: level(x, y) });
        else faces.push({ o: [x, Y0, lo], u: [0, dy, 0], v: [0, 0, dz], level: level(x - 1, y) });
        y = y1;
      }
    }
    const along = [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()];
    const corner = (f, a, b) => f.o.map((c, k) => c + a * f.u[k] + b * f.v[k]);
    const lineKey = (p, axis) => axis === 0 ? p[1] * 1e5 + p[2] : axis === 1 ? p[0] * 1e5 + p[2] : p[0] * 1e5 + p[1];
    for (const f of faces) for (const [a, b] of [[0, 0], [1, 0], [1, 1], [0, 1]]) {
      const p = corner(f, a, b);
      for (let axis = 0; axis < 3; axis++) {
        const key = lineKey(p, axis);
        let list = along[axis].get(key);
        if (!list) along[axis].set(key, list = []);
        list.push(p[axis]);
      }
    }
    for (const m of along) for (const [k, list] of m) m.set(k, [...new Set(list)].sort((a, b) => a - b));
    const vertices = [], triangles = [], levels = [], index2 = /* @__PURE__ */ new Map();
    const vertex = (p) => {
      const key = (p[0] * 2e5 + p[1] * 2) * 2e5 + p[2] * 2;
      let i = index2.get(key);
      if (i == null) {
        i = vertices.length / 3;
        index2.set(key, i);
        vertices.push(p[0] * cell, p[1] * cell, p[2] * s.layerHeight);
      }
      return i;
    };
    for (const f of faces) {
      const c = [corner(f, 0, 0), corner(f, 1, 0), corner(f, 1, 1), corner(f, 0, 1)];
      const ring = [];
      for (let e = 0; e < 4; e++) {
        const a = c[e], b = c[(e + 1) % 4], axis = a.findIndex((v, k) => v !== b[k]);
        ring.push(a);
        const lo = Math.min(a[axis], b[axis]), hi = Math.max(a[axis], b[axis]);
        const mid = (along[axis].get(lineKey(a, axis)) || []).filter((v) => v > lo && v < hi);
        if (a[axis] > b[axis]) mid.reverse();
        for (const v of mid) {
          const p = [...a];
          p[axis] = v;
          ring.push(p);
        }
      }
      const ids = ring.map(vertex);
      if (ids.length === 4) {
        triangles.push(ids[0], ids[1], ids[2], ids[0], ids[2], ids[3]);
        levels.push(f.level, f.level);
      } else {
        const m = vertex(corner(f, 0.5, 0.5));
        for (let i = 0; i < ids.length; i++) {
          triangles.push(m, ids[i], ids[(i + 1) % ids.length]);
          levels.push(f.level);
        }
      }
    }
    return { vertices, triangles, levels };
  }
  function stl(mesh, name = "Mosaic Paint") {
    const V = mesh.vertices, T = mesh.triangles, n = T.length / 3, buf = new ArrayBuffer(84 + n * 50), dv = new DataView(buf);
    const header = `${name} – multi-color by layer`.slice(0, 80);
    for (let i = 0; i < header.length; i++) dv.setUint8(i, header.charCodeAt(i) & 127);
    dv.setUint32(80, n, true);
    let o = 84;
    for (let t = 0; t < n; t++) {
      const p = [0, 1, 2].map((k) => T[t * 3 + k] * 3);
      const ux = V[p[1]] - V[p[0]], uy = V[p[1] + 1] - V[p[0] + 1], uz = V[p[1] + 2] - V[p[0] + 2];
      const vx = V[p[2]] - V[p[0]], vy = V[p[2] + 1] - V[p[0] + 1], vz = V[p[2] + 2] - V[p[0] + 2];
      let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      const L = Math.hypot(nx, ny, nz) || 1;
      nx /= L;
      ny /= L;
      nz /= L;
      for (const v of [nx, ny, nz]) {
        dv.setFloat32(o, v, true);
        o += 4;
      }
      for (const q of p) for (let k = 0; k < 3; k++) {
        dv.setFloat32(o, V[q + k], true);
        o += 4;
      }
      dv.setUint16(o, 0, true);
      o += 2;
    }
    return buf;
  }
  function colorPlan(colors, s) {
    return colors.map((color, i) => {
      const from = i === 0 ? 1 : topLayer(i - 1, s) + 1, to = topLayer(i, s);
      return { color, fromLayer: from, toLayer: to, changeAtLayer: i === 0 ? null : from, z: i === 0 ? null : +(from * s.layerHeight).toFixed(3) };
    });
  }
  var modelHeight = (nColors, s) => +(topLayer(nColors - 1, s) * s.layerHeight).toFixed(3);
  var xmlAttr = (v) => v.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  var num = (v) => String(+v.toFixed(4));
  function modelXml(mesh, colors, name) {
    const V = mesh.vertices, T = mesh.triangles, out = [];
    out.push(
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<model unit="millimeter" xml:lang="en-US" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">',
      `<metadata name="Title">${xmlAttr(name)}</metadata>`,
      '<metadata name="Application">Mosaic Paint</metadata>',
      "<resources>",
      '<basematerials id="1">'
    );
    for (const c of colors) out.push(`<base name="${xmlAttr(c)}" displaycolor="${c.toUpperCase()}FF"/>`);
    out.push("</basematerials>", `<object id="2" type="model" pid="1" pindex="0" name="${xmlAttr(name)}">`, "<mesh>", "<vertices>");
    for (let i = 0; i < V.length; i += 3) out.push(`<vertex x="${num(V[i])}" y="${num(V[i + 1])}" z="${num(V[i + 2])}"/>`);
    out.push("</vertices>", "<triangles>");
    for (let t = 0; t < T.length; t += 3) out.push(`<triangle v1="${T[t]}" v2="${T[t + 1]}" v3="${T[t + 2]}" pid="1" p1="${Math.max(0, mesh.levels[t / 3])}"/>`);
    out.push("</triangles>", "</mesh>", "</object>", "</resources>", "<build>", '<item objectid="2"/>', "</build>", "</model>");
    return out.join("\n");
  }
  function colorChangeXml(plan) {
    return [
      '<?xml version="1.0" encoding="utf-8"?>',
      "<custom_gcodes_per_print_z>",
      ...plan.filter((p) => p.z != null).map((p) => `<code print_z="${p.z}" type="0" extruder="1" color="${p.color}" extra="" gcode="M600"/>`),
      '<mode value="SingleExtruder"/>',
      "</custom_gcodes_per_print_z>"
    ].join("\n");
  }
  function threeMfFiles(mesh, plan, name) {
    return [
      { name: "[Content_Types].xml", data: '<?xml version="1.0" encoding="UTF-8"?>\n<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/><Default Extension="xml" ContentType="application/xml"/></Types>' },
      { name: "_rels/.rels", data: '<?xml version="1.0" encoding="UTF-8"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Target="/3D/3dmodel.model" Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/></Relationships>' },
      { name: "3D/3dmodel.model", data: modelXml(mesh, plan.map((p) => p.color), name) },
      { name: "Metadata/Prusa_Slicer_custom_gcode_per_print_z.xml", data: colorChangeXml(plan) }
    ];
  }

  // src/lib/zip.ts
  var crcTable = null;
  function crc32(data) {
    if (!crcTable) {
      crcTable = new Uint32Array(256);
      for (let n = 0; n < 256; n++) {
        let c2 = n;
        for (let k = 0; k < 8; k++) c2 = c2 & 1 ? 3988292384 ^ c2 >>> 1 : c2 >>> 1;
        crcTable[n] = c2 >>> 0;
      }
    }
    let c = 4294967295;
    for (let i = 0; i < data.length; i++) c = crcTable[(c ^ data[i]) & 255] ^ c >>> 8;
    return (c ^ 4294967295) >>> 0;
  }
  async function deflateRaw(data) {
    if (typeof CompressionStream === "undefined") return null;
    try {
      const s = new Blob([data]).stream().pipeThrough(new CompressionStream("deflate-raw"));
      return new Uint8Array(await new Response(s).arrayBuffer());
    } catch {
      return null;
    }
  }
  async function zip(entries, { compress = true } = {}) {
    const enc = new TextEncoder(), parts = [], central = [];
    let offset = 0;
    for (const e of entries) {
      const name = enc.encode(e.name), raw = typeof e.data === "string" ? enc.encode(e.data) : e.data;
      const crc = crc32(raw), packed = compress ? await deflateRaw(raw) : null;
      const deflated = !!packed && packed.length < raw.length, body = deflated ? packed : raw;
      const local = new Uint8Array(30 + name.length), lv = new DataView(local.buffer);
      lv.setUint32(0, 67324752, true);
      lv.setUint16(4, 20, true);
      lv.setUint16(6, 2048, true);
      lv.setUint16(8, deflated ? 8 : 0, true);
      lv.setUint16(10, 0, true);
      lv.setUint16(12, 33, true);
      lv.setUint32(14, crc, true);
      lv.setUint32(18, body.length, true);
      lv.setUint32(22, raw.length, true);
      lv.setUint16(26, name.length, true);
      local.set(name, 30);
      const cd = new Uint8Array(46 + name.length), cv = new DataView(cd.buffer);
      cv.setUint32(0, 33639248, true);
      cv.setUint16(4, 20, true);
      cv.setUint16(6, 20, true);
      cv.setUint16(8, 2048, true);
      cv.setUint16(10, deflated ? 8 : 0, true);
      cv.setUint16(12, 0, true);
      cv.setUint16(14, 33, true);
      cv.setUint32(16, crc, true);
      cv.setUint32(20, body.length, true);
      cv.setUint32(24, raw.length, true);
      cv.setUint16(28, name.length, true);
      cv.setUint32(42, offset, true);
      cd.set(name, 46);
      parts.push(local, body);
      central.push(cd);
      offset += local.length + body.length;
    }
    const cdSize = central.reduce((s, c) => s + c.length, 0), end = new Uint8Array(22), ev = new DataView(end.buffer);
    ev.setUint32(0, 101010256, true);
    ev.setUint16(8, entries.length, true);
    ev.setUint16(10, entries.length, true);
    ev.setUint32(12, cdSize, true);
    ev.setUint32(16, offset, true);
    const out = new Uint8Array(offset + cdSize + 22);
    let o = 0;
    for (const p of [...parts, ...central, end]) {
      out.set(p, o);
      o += p.length;
    }
    return out;
  }

  // src/shared/export3d.ts
  var MAX_CELLS = 4e6;
  var MANY_COLORS = 16;
  var opts = { width: 150, detail: 0.4, layerHeight: 0.2, layersPerColor: 3, baseLayers: 3 };
  try {
    Object.assign(opts, JSON.parse(lsGet("mz-3d") || "{}"));
  } catch {
  }
  var saveOpts = () => lsSet("mz-3d", JSON.stringify(opts));
  var f2 = (v) => String(+v.toFixed(2));
  var DIALOG = `
<form method="dialog" class="dlg-head"><h2>3D print</h2><button title="Close">✕</button></form>
<p class="note">A model where every color stands at its own height. Print it with one nozzle and change the filament at the layers listed below – each tile’s top then shows its color. The 3MF file already contains the filament changes for PrusaSlicer; for other slicers, the plan lists them.</p>
<div class="row">
  <label>Size <input id="m3-w" type="number" min="5" max="2000" step="1"> × <input id="m3-h" type="number" min="5" max="2000" step="1"> mm</label>
  <label title="Size of the model's smallest step – about your nozzle width">Detail <input id="m3-detail" type="number" min="0.1" max="5" step="0.05"> mm</label>
</div>
<div class="row">
  <label>Layer height <input id="m3-lh" type="number" min="0.04" max="1" step="0.04"> mm</label>
  <label title="How many layers each color gets – more layers cover the color below better">Layers per color <input id="m3-lpc" type="number" min="1" max="50" step="1"></label>
  <label title="A plate under everything, printed in the first color. 0: unpainted parts are left open">Base layers <input id="m3-base" type="number" min="0" max="50" step="1"></label>
</div>
<p class="note warn" id="m3-note" hidden></p>
<div class="m3-body">
  <canvas id="m3-preview" title="Top view of the model"></canvas>
  <div class="m3-side">
    <div class="row small"><span class="note">Print order (bottom first):</span>
      <button id="m3-light" title="Lighter colors lower: a darker layer covers a lighter one well. Lines (grout) stay at the bottom">Light → dark</button>
      <button id="m3-dark">Dark → light</button>
    </div>
    <div id="m3-order"></div>
  </div>
</div>
<p class="note" id="m3-summary"></p>
<div class="row dlg-foot">
  <button id="m3-plan" title="Which filament to load at which layer, as a text file">Plan</button>
  <button id="m3-stl" title="Just the shape – add the filament changes from the plan in your slicer">STL</button>
  <button id="m3-go" class="primary" title="The model, with the filament changes for PrusaSlicer">Download 3MF</button>
</div>`;
  function initExport3D(host, button) {
    const dlg = document.createElement("dialog");
    dlg.id = "dlg-3d";
    dlg.innerHTML = DIALOG;
    document.body.append(dlg);
    dlg.addEventListener("click", (e) => {
      if (e.target === dlg) dlg.close();
    });
    let colors = [], counts2 = [], grid = null, gw = 0, gh = 0, cell = opts.detail;
    let order = [], note = "", lines = /* @__PURE__ */ new Set();
    const settings = () => ({ layerHeight: opts.layerHeight, layersPerColor: opts.layersPerColor, baseLayers: opts.baseLayers });
    const used = () => order.filter((i) => counts2[i] > 0);
    const size = () => {
      const a = host.aspect();
      return { w: opts.width, h: opts.width / a };
    };
    const byBrightness = (lightFirst) => (a, b) => +lines.has(colors[b]) - +lines.has(colors[a]) || (luminance(colors[b]) - luminance(colors[a])) * (lightFirst ? 1 : -1);
    function sortBy(lightFirst) {
      order.sort(byBrightness(lightFirst));
      render2();
    }
    async function analyse() {
      const { w, h } = size();
      cell = opts.detail;
      if (w / cell * (h / cell) > MAX_CELLS) cell = Math.sqrt(w * h / MAX_CELLS);
      gw = Math.max(1, Math.round(w / cell));
      gh = Math.max(1, Math.round(h / cell));
      const c = await host.render(gw, gh);
      const img = c.getContext("2d").getImageData(0, 0, gw, gh);
      const cs = host.colors();
      const prev = order.map((i) => colors[i]);
      colors = cs.colors;
      note = cs.note || "";
      lines = new Set(cs.lines || []);
      ({ grid, counts: counts2 } = classify(img, colors));
      const known = prev.filter((c2) => colors.includes(c2)).map((c2) => colors.indexOf(c2));
      const fresh = colors.map((_, i) => i).filter((i) => !known.includes(i)).sort(byBrightness(true));
      order = [...known, ...fresh];
      render2();
    }
    const rows = /* @__PURE__ */ new Map();
    function move(c, d) {
      const list = used(), k = list.findIndex((ci) => colors[ci] === c), other = list[k + d];
      if (k < 0 || other == null) return;
      const a = order.indexOf(list[k]), b = order.indexOf(other);
      [order[a], order[b]] = [order[b], order[a]];
      render2();
    }
    function render2() {
      const s = settings(), list = used(), { w, h } = size();
      $("#m3-w").value = f2(w);
      $("#m3-h").value = f2(h);
      const warn = [
        note,
        list.length > MANY_COLORS ? `${list.length} colors make a tall print with many filament changes – reduce the colors first (Raster: “Reduce to palette”).` : "",
        cell > opts.detail + 1e-9 ? `Detail lowered to ${f2(cell)} mm for this size.` : ""
      ].filter(Boolean).join(" ");
      $("#m3-note").hidden = !warn;
      $("#m3-note").textContent = warn;
      const plan2 = colorPlan(list.map((i) => colors[i]), s), total = gw * gh || 1, box = $("#m3-order");
      const keep = new Set(list.map((ci) => colors[ci]));
      for (const [c, el] of rows) if (!keep.has(c)) {
        el.remove();
        rows.delete(c);
      }
      list.forEach((ci, k) => {
        const c = colors[ci], p = plan2[k];
        let row = rows.get(c);
        if (!row) {
          row = document.createElement("div");
          row.className = "m3-row";
          row.innerHTML = `<span class="mini" style="background:${c}"></span><code>${c}</code>${lines.has(c) ? '<span class="tag">lines</span>' : ""}<span class="note"></span><button title="Print earlier (lower)">↑</button><button title="Print later (higher)">↓</button>`;
          const [up2, down2] = row.querySelectorAll("button");
          up2.onclick = () => move(c, -1);
          down2.onclick = () => move(c, 1);
          rows.set(c, row);
        }
        row.querySelector(".note").textContent = `${Math.max(0.1, +(counts2[ci] / total * 100).toFixed(1))} % · layers ${p.fromLayer}–${p.toLayer}${p.z == null ? "" : ` · change at Z ${p.z.toFixed(2)}`}`;
        const [up, down] = row.querySelectorAll("button");
        up.disabled = k === 0;
        down.disabled = k === list.length - 1;
        if (box.children[k] !== row) box.insertBefore(row, box.children[k] || null);
      });
      const unpainted = grid ? grid.filter((v) => v < 0).length : 0;
      $("#m3-summary").textContent = list.length ? `${list.length} color${list.length === 1 ? "" : "s"} · height ${modelHeight(list.length, s)} mm (${topLayer(list.length - 1, s)} layers) · ${list.length - 1} filament change${list.length === 2 ? "" : "s"}` + (unpainted ? ` · unpainted parts ${opts.baseLayers ? `stay at the base (${f2(opts.baseLayers * opts.layerHeight)} mm)` : "are left open"}` : "") : "Nothing is painted yet.";
      $("#m3-go").disabled = $("#m3-stl").disabled = $("#m3-plan").disabled = !list.length;
      drawPreview();
    }
    function drawPreview() {
      const cv = $("#m3-preview");
      if (!grid) return;
      const k = Math.min(1, 300 / Math.max(gw, gh));
      cv.width = Math.max(1, Math.round(gw * k));
      cv.height = Math.max(1, Math.round(gh * k));
      const small = document.createElement("canvas");
      small.width = gw;
      small.height = gh;
      const sx = small.getContext("2d"), im = sx.createImageData(gw, gh), rgb = colors.map((c) => rgba(c));
      for (let p = 0; p < grid.length; p++) if (grid[p] >= 0) im.data.set(rgb[grid[p]], p * 4);
      sx.putImageData(im, 0, 0);
      const x = cv.getContext("2d");
      x.imageSmoothingEnabled = k < 1;
      x.drawImage(small, 0, 0, cv.width, cv.height);
    }
    function levels() {
      const rank = new Int16Array(colors.length).fill(-1);
      used().forEach((ci, k) => {
        rank[ci] = k;
      });
      return grid.map((v) => v < 0 ? -1 : rank[v]);
    }
    const base = () => host.fileName().replace(/\.[a-z0-9]+$/i, "");
    const plan = () => colorPlan(used().map((i) => colors[i]), settings());
    const mesh = () => closedMesh(levels(), gw, gh, cell, settings());
    function planText() {
      const s = settings(), list = used(), plan2 = colorPlan(list.map((i) => colors[i]), s), { w, h } = size();
      const lines2 = [
        `Mosaic Paint – 3D print plan for ${base()}.3mf / ${base()}.stl`,
        `Size ${f2(w)} × ${f2(h)} mm · layer height ${s.layerHeight} mm · ${s.layersPerColor} layers per color · base ${s.baseLayers} layers`,
        `Total height ${modelHeight(list.length, s)} mm (${topLayer(list.length - 1, s)} layers). Set the slicer's first layer height to ${s.layerHeight} mm too.`,
        "",
        `Start with ${plan2[0].color} – layers ${plan2[0].fromLayer}–${plan2[0].toLayer}${s.baseLayers ? " (base plate included)" : ""}`,
        ...plan2.slice(1).map((p) => `Layer ${p.changeAtLayer} (Z ${p.z.toFixed(2)} mm): change to ${p.color} – layers ${p.fromLayer}–${p.toLayer}`),
        "",
        "PrusaSlicer: the 3MF file already contains these changes – open it and check the layer slider.",
        "Other slicers (they read only the shape from the 3MF or STL) – add the changes by hand:",
        '- PrusaSlicer, Bambu Studio, OrcaSlicer: in the preview, move the layer slider to each Z above and click "+" (Add color change, M600).',
        '- Cura: Extensions › Post Processing › Modify G-Code › "Filament Change" at each layer number above.',
        "- Multi-material printers (AMS, MMU): the same changes work; or assign the filaments to the color changes in the slicer."
      ];
      return lines2.join("\n") + "\n";
    }
    let busy;
    const reanalyse = () => {
      clearTimeout(busy);
      busy = setTimeout(() => analyse().catch(() => toast("Could not read the picture.")), 50);
    };
    const bindNum = (id, key, min, max, whole, again) => {
      const i = $(id);
      i.value = opts[key];
      i.onchange = () => {
        let v = +i.value;
        if (Number.isFinite(v) && v > 0 || key === "baseLayers" && v === 0) {
          v = clamp(whole ? Math.round(v) : v, min, max);
          opts[key] = v;
          saveOpts();
        }
        i.value = opts[key];
        if (again) reanalyse();
        else render2();
      };
    };
    bindNum("#m3-detail", "detail", 0.1, 5, false, true);
    bindNum("#m3-lh", "layerHeight", 0.04, 1, false, false);
    bindNum("#m3-lpc", "layersPerColor", 1, 50, true, false);
    bindNum("#m3-base", "baseLayers", 0, 50, true, false);
    $("#m3-w").onchange = () => {
      const v = +$("#m3-w").value;
      if (v >= 5 && v <= 2e3) {
        opts.width = v;
        saveOpts();
      }
      reanalyse();
    };
    $("#m3-h").onchange = () => {
      const v = +$("#m3-h").value;
      if (v >= 5 && v <= 2e3) {
        opts.width = v * host.aspect();
        saveOpts();
      }
      reanalyse();
    };
    $("#m3-light").onclick = () => sortBy(true);
    $("#m3-dark").onclick = () => sortBy(false);
    const triangles = (m) => (m.triangles.length / 3).toLocaleString("en");
    $("#m3-go").onclick = async () => {
      const m = mesh(), p = plan();
      $("#m3-go").disabled = true;
      try {
        const data = await zip(threeMfFiles(m, p, base()));
        download(new Blob([data], { type: "model/3mf" }), base() + ".3mf");
        toast(`Saved ${base()}.3mf (${triangles(m)} triangles; PrusaSlicer reads its ${p.length - 1} filament change${p.length === 2 ? "" : "s"}, other slicers need the plan).`);
      } finally {
        $("#m3-go").disabled = false;
      }
    };
    $("#m3-stl").onclick = () => {
      const m = mesh();
      download(new Blob([stl(m, base())], { type: "model/stl" }), base() + ".stl");
      toast(`Saved ${base()}.stl (${triangles(m)} triangles). Add the filament changes from the plan in your slicer.`);
    };
    $("#m3-plan").onclick = () => download(new Blob([planText()], { type: "text/plain" }), base() + "-3d-plan.txt");
    button.onclick = async () => {
      const real = host.realSize();
      if (real) opts.width = +real.w.toFixed(2);
      $("#m3-summary").textContent = "Reading the picture…";
      dlg.showModal();
      await analyse().catch(() => toast("Could not read the picture."));
    };
  }

  // src/raster/export3d.ts
  var MAX_COLORS = 24;
  function bindExport3D() {
    initExport3D({
      aspect: () => doc.width / doc.height,
      realSize: () => null,
      async render(w, h) {
        const c = makeCanvas(w, h), x = c.getContext("2d");
        x.imageSmoothingEnabled = w < doc.width;
        x.drawImage(doc, 0, 0, w, h);
        return c;
      },
      colors() {
        const img = getImage(), own = uniqueColors(img, MAX_COLORS);
        if (own) return { colors: own };
        if (state.palette.length) return { colors: [...state.palette], note: "The picture has many colors: it is snapped to the current palette (use “Reduce to palette” to see the result first)." };
        return { colors: suggestColors(img, 8), note: "The picture has many colors: it is snapped to 8 colors suggested from it." };
      },
      fileName: () => rt.fileName
    }, $("#btn-3d"));
  }

  // src/raster/main.ts
  loadPrefs();
  bindPanel();
  bindInput();
  bindExport3D();
  initShell(stage);
  renderPaletteSelect();
  document.body.dataset.mode = state.mode;
  for (const b of $$("#mode-switch button")) b.classList.toggle("active", b.dataset.mode === state.mode);
  setTool(state.tool);
  dctx.fillStyle = "#ffffff";
  dctx.fillRect(0, 0, doc.width, doc.height);
  resetHistory();
  afterChange();
  rt.dirty = false;
  updateTitle();
  renderPalette();
  requestAnimationFrame(fitView);
  var RZ = {
    state,
    rt,
    doc,
    ready: false,
    /** '#rrggbb' at an image pixel, or null where it is transparent */
    colorAt: (x, y) => colorAt(getImage(Math.floor(x), Math.floor(y), 1, 1), 0, 0),
    alphaAt: (x, y) => getImage(Math.floor(x), Math.floor(y), 1, 1).data[3],
    /** screen position (CSS pixels) of an image point */
    screen(x, y) {
      const r = document.querySelector("#view").getBoundingClientRect(), v = state.view;
      return { x: (x - v.x) * v.s + r.left, y: (y - v.y) * v.s + r.top };
    },
    toDoc,
    setTool,
    setMode,
    commit,
    fitView,
    selectionChanged,
    pasteImage,
    /** Replaces the image with a blank one of the given size and color (null = transparent). */
    blank(w, h, color = "#ffffff") {
      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      if (color) {
        const x = c.getContext("2d");
        x.fillStyle = color;
        x.fillRect(0, 0, w, h);
      }
      loadCanvas(c, "test.png");
    }
  };
  window.RZ = RZ;
  (async () => {
    const rec = await loadAutosave();
    if (rec && rec.png) {
      const c = await fileToCanvas(rec.png);
      if (c) {
        loadCanvas(c, rec.fileName || "mosaic.png");
        rt.fileName = rec.fileName || "mosaic.png";
        updateTitle();
      }
    }
    startAutosave();
    selectionChanged();
    RZ.ready = true;
  })();
})();
//# sourceMappingURL=raster.js.map
