/* The spotlight that guides a lesson ("follow the glowing finger"): over the editor in its frame, everything
   is dimmed except the one thing to use next – a button, a setting, or a part of the picture – with one
   short instruction beside it. Taps elsewhere don't go through (the bubble wiggles instead), so a child
   can't get lost. Each step moves on by itself as soon as the editor shows it is done. */
import type { Box, Ctx, Step } from './types.ts';

const PAD = 6;
const CSS = `
#lsn-layer { position: fixed; inset: 0; margin: 0; padding: 0; border: 0; width: 100vw; height: 100vh; max-width: none; max-height: none;
  background: none; overflow: visible; pointer-events: none; z-index: 2147483000; }
#lsn-layer .lsn-shade { position: fixed; background: rgba(10, 12, 20, .62); pointer-events: auto; transition: background .25s ease; }
#lsn-layer.open .lsn-shade { pointer-events: none; background: rgba(10, 12, 20, .18); }
#lsn-layer .lsn-ring { position: fixed; border: 3px solid #ffd23f; border-radius: 10px; box-shadow: 0 0 0 4px rgba(255,210,63,.35), 0 0 24px rgba(255,210,63,.6);
  animation: lsn-pulse 1.4s ease-in-out infinite; transition: all .25s ease; pointer-events: none; }
#lsn-layer .lsn-bubble { position: fixed; max-width: min(320px, 86vw); padding: 12px 16px; border-radius: 14px; background: #fffdf3; color: #1d1d24;
  font: 600 17px/1.35 system-ui, -apple-system, "Segoe UI", sans-serif; box-shadow: 0 8px 28px rgba(0,0,0,.45); transition: top .25s ease, left .25s ease; pointer-events: none; }
#lsn-layer .lsn-bubble::before { content: '👉 '; }
#lsn-layer .lsn-bubble.done::before { content: '✅ '; }
#lsn-layer .lsn-bubble.wiggle { animation: lsn-wiggle .45s ease; }
@keyframes lsn-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.04); } }
@keyframes lsn-wiggle { 0%, 100% { transform: translateX(0); } 20%, 60% { transform: translateX(-8px); } 40%, 80% { transform: translateX(8px); } }
@media (prefers-reduced-motion: reduce) { #lsn-layer .lsn-ring, #lsn-layer .lsn-bubble.wiggle { animation: none; } }
`;

export interface Spotlight {
  /** shows a step (its instruction and target); resolves when its check is true */
  run(step: Step): Promise<void>;
  /** the instruction of the step shown (to read it aloud) */
  text(): string;
  stop(): void;
}

export function spotlight(c: Ctx): Spotlight {
  const d = c.d;
  const style = d.createElement('style');
  style.textContent = CSS;
  d.head.append(style);
  // a popover: it can come above the editor's own dialogs (the text sheet), which sit in the top layer
  const layer = d.createElement('div');
  layer.id = 'lsn-layer';
  layer.setAttribute('popover', 'manual');
  layer.innerHTML = '<div class="lsn-shade"></div><div class="lsn-shade"></div><div class="lsn-shade"></div><div class="lsn-shade"></div><div class="lsn-ring"></div><div class="lsn-bubble" role="status" aria-live="polite"></div>';
  d.body.append(layer);
  const shades = [...layer.querySelectorAll<HTMLElement>('.lsn-shade')], ring = layer.querySelector<HTMLElement>('.lsn-ring'), bubble = layer.querySelector<HTMLElement>('.lsn-bubble');
  const showLayer = () => {
    try { if (layer.matches(':popover-open')) layer.hidePopover(); layer.showPopover(); } catch { /* no popovers: an ordinary layer on top */ }
  };
  showLayer();
  // a tap outside the spotlight: not passed on; the instruction wiggles
  for (const s of shades) {
    for (const ev of ['pointerdown', 'mousedown', 'touchstart', 'click', 'dblclick', 'contextmenu', 'wheel']) {
      s.addEventListener(ev, (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (ev === 'pointerdown') { bubble.classList.remove('wiggle'); void bubble.offsetWidth; bubble.classList.add('wiggle'); }
      }, { passive: false });
    }
  }

  let current: Step | null = null, timer = 0, stopped = false, modalOpen = false, recheck: (() => void) | null = null;
  // the spotlight follows its target every frame (a panel sliding in, the view moving); the checks run less often
  const follow = () => { if (stopped) return; place(); c.w.requestAnimationFrame(follow); };
  c.w.requestAnimationFrame(follow);
  for (const ev of ['pointerup', 'click', 'input', 'change', 'keyup']) d.addEventListener(ev, () => recheck?.(), true);
  /** Where the spotlight goes now (screen px), or null (no target: everything is free). */
  function hole(step: Step): Box | null {
    if (step.at) {
      const el = typeof step.at === 'string' ? d.querySelector(step.at) : step.at(c);
      if (el) {
        // inside the side panel on a narrow screen: open the panel first
        const panel = el.closest('#panel');
        // (opened, not toggled: while it slides in it still looks closed)
        if (panel && c.w.innerWidth <= 900 && !d.body.classList.contains('panel-open')) d.body.classList.add('panel-open');
        (el as HTMLElement).scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
        const r = el.getBoundingClientRect();
        if (r.width || r.height) return { x: r.left - PAD, y: r.top - PAD, w: r.width + 2 * PAD, h: r.height + 2 * PAD };
      }
      return null;
    }
    if (step.area) {
      // a part of the picture: the side panel (on a phone) out of the way
      if (d.body.classList.contains('panel-open') && c.w.innerWidth <= 900) d.body.classList.remove('panel-open');
      const a = step.area(c), p = c.RZ.screen(a.x, a.y), q = c.RZ.screen(a.x + a.w, a.y + a.h);
      const st = d.querySelector('#stage').getBoundingClientRect();
      const x0 = Math.max(st.left, p.x - PAD * 2), y0 = Math.max(st.top, p.y - PAD * 2), x1 = Math.min(st.right, q.x + PAD * 2), y1 = Math.min(st.bottom, q.y + PAD * 2);
      return { x: x0, y: y0, w: Math.max(20, x1 - x0), h: Math.max(20, y1 - y0) };
    }
    if (step.free) return null;
    return null;
  }
  function place(): void {
    if (!current) return;
    // a dialog of the editor's (the text sheet) is open: highlight only, don't block it
    const open = !!d.querySelector('dialog[open]:modal');
    if (open !== modalOpen) { modalOpen = open; layer.classList.toggle('open', open); showLayer(); }
    const W = c.w.innerWidth, H = c.w.innerHeight, h = hole(current);
    if (!h) {
      // nothing to point at: no dimming, the bubble in the middle at the top
      for (const s of shades) Object.assign(s.style, { left: '0px', top: '0px', width: '0px', height: '0px' });
      ring.style.display = 'none';
      Object.assign(bubble.style, { left: Math.max(8, (W - bubble.offsetWidth) / 2) + 'px', top: '64px' });
      return;
    }
    const [a, b, e, f] = shades;
    Object.assign(a.style, { left: '0px', top: '0px', width: W + 'px', height: Math.max(0, h.y) + 'px' });
    Object.assign(b.style, { left: '0px', top: h.y + h.h + 'px', width: W + 'px', height: Math.max(0, H - h.y - h.h) + 'px' });
    Object.assign(e.style, { left: '0px', top: h.y + 'px', width: Math.max(0, h.x) + 'px', height: h.h + 'px' });
    Object.assign(f.style, { left: h.x + h.w + 'px', top: h.y + 'px', width: Math.max(0, W - h.x - h.w) + 'px', height: h.h + 'px' });
    ring.style.display = '';
    Object.assign(ring.style, { left: h.x + 'px', top: h.y + 'px', width: h.w + 'px', height: h.h + 'px' });
    // the instruction beside it: below, else above, else to the side
    const bw = bubble.offsetWidth, bh = bubble.offsetHeight, gap = 14;
    let top = h.y + h.h + gap, left = h.x + h.w / 2 - bw / 2;
    if (top + bh > H - 8) top = h.y - bh - gap;
    if (top < 8) { top = Math.min(H - bh - 8, Math.max(8, h.y + h.h / 2 - bh / 2)); left = h.x + h.w + gap > W - bw - 8 ? h.x - bw - gap : h.x + h.w + gap; }
    Object.assign(bubble.style, { left: Math.max(8, Math.min(W - bw - 8, left)) + 'px', top: Math.max(8, top) + 'px' });
  }

  return {
    run(given) {
      // the button isn't shown here (a phone): the other way to do it
      let step = given;
      if (given.alt && given.at) {
        const el = typeof given.at === 'string' ? d.querySelector<HTMLElement>(given.at) : given.at(c) as HTMLElement | null;
        if (!el || !el.getClientRects().length) step = { ...given, ...given.alt, at: given.alt.at, area: given.alt.area };
      }
      current = step;
      bubble.classList.remove('done');
      bubble.textContent = step.say;
      step.enter?.(c);
      place();
      return new Promise<void>((resolve) => {
        const check = () => {
          if (stopped || current !== step) return;
          place();
          let ok: boolean;
          try { ok = step.done(c); } catch { ok = false; }
          if (!ok) return;
          c.w.clearInterval(timer);
          bubble.classList.add('done');
          // a moment to see the tick
          c.w.setTimeout(() => { if (!stopped) resolve(); }, 450);
        };
        c.w.clearInterval(timer);
        timer = c.w.setInterval(check, 200);
        // and right after every action (a quick child may already be on to the next one)
        recheck = check;
        check();
      });
    },
    text: () => current?.say || '',
    stop() {
      stopped = true;
      c.w.clearInterval(timer);
      try { layer.hidePopover(); } catch { /* not a popover */ }
      layer.remove();
      style.remove();
    },
  };
}
