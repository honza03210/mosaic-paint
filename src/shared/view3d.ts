/* A small 3D view of a mesh (plain WebGL, no library): flat-shaded triangles in their colors, turned by
   dragging (mouse or finger), zoomed with the wheel or a pinch, double-click resets. Heights can be
   exaggerated, because a mosaic is a few millimetres high and hundreds wide. */
import type { Mesh } from '../lib/model3d.ts';

type RGB = [number, number, number];
export interface View3D {
  /** Shows a mesh; colorOf(level) gives each triangle's color. */
  show(mesh: Mesh, colorOf: (level: number) => RGB): void;
  setExaggeration(k: number): void;
  reset(): void;
  render(): void;
}

const VS = `
attribute vec3 aPos; attribute vec3 aNormal; attribute vec3 aColor;
uniform mat4 uView; uniform float uZ;
varying vec3 vColor; varying vec3 vNormal;
void main() {
  vec3 p = vec3(aPos.xy, aPos.z * uZ);
  vec3 n = normalize(vec3(aNormal.xy * uZ, aNormal.z));
  vNormal = n; vColor = aColor;
  gl_Position = uView * vec4(p, 1.0);
}`;
const FS = `
precision mediump float;
varying vec3 vColor; varying vec3 vNormal;
uniform vec3 uLight;
void main() {
  float d = max(dot(normalize(vNormal), uLight), 0.0);
  gl_FragColor = vec4(vColor * (0.45 + 0.6 * d), 1.0);
}`;

// ---- 4 × 4 matrices (column-major, as WebGL wants them) ----
type M4 = Float32Array;
const mul = (a: M4, b: M4): M4 => {
  const o = new Float32Array(16);
  for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) {
    let s = 0;
    for (let k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k];
    o[c * 4 + r] = s;
  }
  return o;
};
const perspective = (fov: number, aspect: number, near: number, far: number): M4 => {
  const f = 1 / Math.tan(fov / 2), nf = 1 / (near - far);
  return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]);
};
const translate = (x: number, y: number, z: number): M4 => new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1]);
const rotX = (a: number): M4 => { const c = Math.cos(a), s = Math.sin(a); return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]); };
const rotZ = (a: number): M4 => { const c = Math.cos(a), s = Math.sin(a); return new Float32Array([c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]); };

/** null where WebGL is not available. */
export function createView3D(canvas: HTMLCanvasElement): View3D | null {
  const gl = canvas.getContext('webgl', { antialias: true, preserveDrawingBuffer: true }) as WebGLRenderingContext | null;
  if (!gl) return null;
  const shader = (type: number, src: string) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };
  const prog = gl.createProgram();
  gl.attachShader(prog, shader(gl.VERTEX_SHADER, VS));
  gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  const loc = { pos: gl.getAttribLocation(prog, 'aPos'), normal: gl.getAttribLocation(prog, 'aNormal'), color: gl.getAttribLocation(prog, 'aColor') };
  const uView = gl.getUniformLocation(prog, 'uView'), uZ = gl.getUniformLocation(prog, 'uZ'), uLight = gl.getUniformLocation(prog, 'uLight');
  const buffers = { pos: gl.createBuffer(), normal: gl.createBuffer(), color: gl.createBuffer() };

  let count = 0, center = [0, 0, 0], radius = 1, exaggeration = 3;
  const cam = { yaw: -0.5, pitch: 0.85, dist: 3 };

  function upload(name: 'pos' | 'normal' | 'color', data: Float32Array) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers[name]);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  }
  function show(mesh: Mesh, colorOf: (level: number) => RGB): void {
    const V = mesh.vertices, T = mesh.triangles, n = T.length / 3;
    const pos = new Float32Array(n * 9), nor = new Float32Array(n * 9), col = new Float32Array(n * 9);
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity, z1 = 0;
    for (let t = 0; t < n; t++) {
      const a = T[t * 3] * 3, b = T[t * 3 + 1] * 3, c = T[t * 3 + 2] * 3;
      const ux = V[b] - V[a], uy = V[b + 1] - V[a + 1], uz = V[b + 2] - V[a + 2];
      const vx = V[c] - V[a], vy = V[c + 1] - V[a + 1], vz = V[c + 2] - V[a + 2];
      let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      const L = Math.hypot(nx, ny, nz) || 1;
      nx /= L; ny /= L; nz /= L;
      const rgb = colorOf(mesh.levels[t]);
      // the sides of a band are shown a little darker than its top
      const shade = Math.abs(nz) > 0.5 ? 1 : 0.85;
      [a, b, c].forEach((p, k) => {
        const o = t * 9 + k * 3;
        pos[o] = V[p]; pos[o + 1] = V[p + 1]; pos[o + 2] = V[p + 2];
        nor[o] = nx; nor[o + 1] = ny; nor[o + 2] = nz;
        col[o] = rgb[0] / 255 * shade; col[o + 1] = rgb[1] / 255 * shade; col[o + 2] = rgb[2] / 255 * shade;
        x0 = Math.min(x0, V[p]); x1 = Math.max(x1, V[p]); y0 = Math.min(y0, V[p + 1]); y1 = Math.max(y1, V[p + 1]); z1 = Math.max(z1, V[p + 2]);
      });
    }
    upload('pos', pos); upload('normal', nor); upload('color', col);
    count = n * 3;
    center = [(x0 + x1) / 2, (y0 + y1) / 2, 0];
    radius = Math.max(1e-3, Math.hypot(x1 - x0, y1 - y0) / 2, z1);
    render();
  }
  function render(): void {
    const dpr = window.devicePixelRatio || 1, w = Math.round(canvas.clientWidth * dpr) || canvas.width, h = Math.round(canvas.clientHeight * dpr) || canvas.height;
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    gl.viewport(0, 0, w, h);
    gl.clearColor(0.15, 0.16, 0.18, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    if (!count) return;
    gl.enable(gl.DEPTH_TEST);
    gl.useProgram(prog);
    const proj = perspective(0.7, w / h, radius * 0.05, radius * 20);
    const view = mul(translate(0, 0, -radius * cam.dist), mul(rotX(-cam.pitch), mul(rotZ(cam.yaw), translate(-center[0], -center[1], -center[2]))));
    gl.uniformMatrix4fv(uView, false, mul(proj, view));
    gl.uniform1f(uZ, exaggeration);
    const lx = 0.3, ly = -0.5, lz = 0.8, ll = Math.hypot(lx, ly, lz);
    gl.uniform3f(uLight, lx / ll, ly / ll, lz / ll);
    for (const [name, at] of [['pos', loc.pos], ['normal', loc.normal], ['color', loc.color]] as const) {
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers[name]);
      gl.enableVertexAttribArray(at);
      gl.vertexAttribPointer(at, 3, gl.FLOAT, false, 0, 0);
    }
    gl.drawArrays(gl.TRIANGLES, 0, count);
  }
  function reset(): void { cam.yaw = -0.5; cam.pitch = 0.85; cam.dist = 3; render(); }

  // ---- turning and zooming ----
  const pointers = new Map<number, { x: number; y: number }>();
  let pinch = 0;
  canvas.style.touchAction = 'none';
  canvas.addEventListener('pointerdown', (e) => {
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    try { canvas.setPointerCapture(e.pointerId); } catch { /* gone */ }
    if (pointers.size === 2) { const [a, b] = [...pointers.values()]; pinch = Math.hypot(a.x - b.x, a.y - b.y); }
  });
  canvas.addEventListener('pointermove', (e) => {
    const p = pointers.get(e.pointerId);
    if (!p) return;
    if (pointers.size === 2) {
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const [a, b] = [...pointers.values()], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinch) cam.dist = Math.min(8, Math.max(0.4, cam.dist * pinch / d));
      pinch = d;
    } else {
      cam.yaw += (e.clientX - p.x) * 0.01;
      cam.pitch = Math.min(1.5, Math.max(0, cam.pitch - (e.clientY - p.y) * 0.01));
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    }
    render();
  });
  const end = (e: PointerEvent) => { pointers.delete(e.pointerId); pinch = 0; };
  canvas.addEventListener('pointerup', end);
  canvas.addEventListener('pointercancel', end);
  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    cam.dist = Math.min(8, Math.max(0.4, cam.dist * Math.exp(e.deltaY * 0.001)));
    render();
  }, { passive: false });
  canvas.addEventListener('dblclick', reset);

  return { show, setExaggeration: (k) => { exaggeration = k; render(); }, reset, render };
}
