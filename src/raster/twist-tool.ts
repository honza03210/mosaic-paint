/* The Twist tool: press where the swirl's centre is, drag out – how far is how big the circle is – and go round
   it: the further round, the stronger the twist (either way, past a full turn too). The picture shows it while
   dragging; lifting the pointer makes it one undo step. With a selection only the selected pixels twist. */
import type { Pt } from '../lib/geometry.ts';
import { twist } from '../lib/twist.ts';
import { state } from './state.ts';
import { doc, dctx, requestRender } from './canvas.ts';
import { commit, restoreCurrent } from './history.ts';
import { selectionFullMask } from './select.ts';
import type { Tool } from './paint.ts';

interface TwistAction { type: 'twist'; c: Pt; r: number; angle: number; last: number | null; base: ImageData; mask: Uint8Array | null; box: { x: number; y: number; w: number; h: number } | null; frame: number }
/** Nearer the centre than this (screen px), going round is not counted (the angle jumps there). */
const DEAD = 10;
/** The angle turned between two directions, the short way (−π…π). */
const turned = (a: number, b: number) => Math.atan2(Math.sin(b - a), Math.cos(b - a));

/** Puts back what the last preview changed, then twists as the action says now. */
function show(a: TwistAction): void {
  a.frame = 0;
  if (a.box) dctx.putImageData(a.base, 0, 0, a.box.x, a.box.y, a.box.w, a.box.h);
  a.box = null;
  if (!a.angle || a.r < 1) { requestRender(); return; }
  const t = twist(a.base.data, doc.width, doc.height, a.c.x, a.c.y, a.r, a.angle, a.mask);
  if (t) {
    dctx.putImageData(new ImageData(t.data as any, t.box.w, t.box.h), t.box.x, t.box.y);
    a.box = t.box;
  }
  requestRender();
}

/** The circle and its centre while twisting (how far it reaches). */
function outline(a: TwistAction): void {
  state.preview = (ctx, px) => {
    ctx.lineWidth = px;
    ctx.beginPath();
    ctx.arc(a.c.x, a.c.y, Math.max(a.r, px), 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0,0,0,.7)';
    ctx.stroke();
    ctx.setLineDash([4 * px, 4 * px]);
    ctx.strokeStyle = 'rgba(255,255,255,.9)';
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(a.c.x - 5 * px, a.c.y); ctx.lineTo(a.c.x + 5 * px, a.c.y);
    ctx.moveTo(a.c.x, a.c.y - 5 * px); ctx.lineTo(a.c.x, a.c.y + 5 * px);
    ctx.strokeStyle = '#fff';
    ctx.stroke();
  };
}

export const twistTool: Tool = {
  down(_e, p) {
    const a: TwistAction = {
      type: 'twist', c: { x: p.x, y: p.y }, r: 0, angle: 0, last: null,
      base: dctx.getImageData(0, 0, doc.width, doc.height), mask: selectionFullMask(), box: null, frame: 0,
    };
    state.action = a;
    outline(a);
    requestRender();
  },
  move(_e, p) {
    const a = state.action as TwistAction | null;
    if (a?.type !== 'twist') return;
    const dx = p.x - a.c.x, dy = p.y - a.c.y, d = Math.hypot(dx, dy);
    a.r = d;
    if (d * state.view.s > DEAD) {
      const dir = Math.atan2(dy, dx);
      if (a.last !== null) a.angle += turned(a.last, dir);
      a.last = dir;
    } else a.last = null;
    // one twist per frame, however fast the pointer sends moves
    if (!a.frame) a.frame = requestAnimationFrame(() => show(a));
  },
  up() {
    const a = state.action as TwistAction | null;
    state.action = null;
    state.preview = null;
    if (a?.type !== 'twist') return;
    if (a.frame) cancelAnimationFrame(a.frame);
    // what it is at the end (the last frame may not have been drawn yet)
    show(a);
    if (a.box) commit(); else restoreCurrent();
    requestRender();
  },
};
