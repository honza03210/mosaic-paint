/* Mosaic Paint – rulers along the canvas edges (Expert mode). */
import { MZ } from '../core/api.ts';
import { $ } from '../shared/ui.ts';

const { state } = MZ;

// ---- rulers ------------------------------------------------------------------------------
const rx = $('#ruler-x'), ry = $('#ruler-y'), corner = $('#ruler-corner');
function niceStep(raw) {
  const p = Math.pow(10, Math.floor(Math.log10(raw)));
  for (const m of [1, 2, 5, 10]) if (m * p >= raw) return { step: m * p, minor: m === 2 ? 4 : 5 };
  return { step: 10 * p, minor: 5 };
}
function drawRuler(cv, horizontal) {
  const dpr = window.devicePixelRatio || 1, w = cv.clientWidth, h = cv.clientHeight;
  if (!w || !h) return;
  cv.width = Math.round(w * dpr);
  cv.height = Math.round(h * dpr);
  const c = cv.getContext('2d');
  c.setTransform(dpr, 0, 0, dpr, 0, 0);
  c.fillStyle = '#27282c';
  c.fillRect(0, 0, w, h);
  c.strokeStyle = '#7d8088';
  c.fillStyle = '#b5b7bd';
  c.font = '10px system-ui, sans-serif';
  const v = state.view, d = state.doc, len = horizontal ? w : h;
  const origin = horizontal ? d.x : d.y, start = horizontal ? v.x : v.y;
  // the ruler sits over the canvas edge, so position 0 of the ruler is the canvas edge
  const { step, minor } = niceStep(60 / v.s);
  const first = Math.floor((start - origin) / step) * step;
  c.beginPath();
  for (let t = first; ; t += step / minor) {
    const s = (origin + t - start) * v.s;
    if (s > len) break;
    if (s < 0) continue;
    const major = Math.abs(t / step - Math.round(t / step)) < 1e-6;
    const tick = major ? h * 0.6 : h * 0.25;
    if (horizontal) { c.moveTo(s + 0.5, h); c.lineTo(s + 0.5, h - tick); }
    else { c.moveTo(w, s + 0.5); c.lineTo(w - tick, s + 0.5); }
    if (major) {
      const label = String(+t.toFixed(6));
      if (horizontal) c.fillText(label, s + 3, 10);
      else { c.save(); c.translate(10, s + 3); c.rotate(-Math.PI / 2); c.textAlign = 'right'; c.fillText(label, 0, 0); c.restore(); }
    }
  }
  c.stroke();
}
function drawRulers() {
  const show = state.mode === 'expert' && state.rulers;
  MZ.stage.classList.toggle('with-rulers', show);
  rx.hidden = ry.hidden = corner.hidden = !show;
  if (!show) return;
  corner.textContent = MZ.unit();
  drawRuler(rx, true);
  drawRuler(ry, false);
}
MZ.on('view', drawRulers);
MZ.on('mode', drawRulers);
