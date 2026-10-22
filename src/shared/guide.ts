/* A short guide for newcomers, shared by both apps: a few steps in a card in the corner, each pointing at
   the part of the app it talks about. It opens by itself the first time an app is opened (not for shared
   links or pages opened from the other app), and the "?" button shows it again. */
import { lsGet, lsSet } from './ui.ts';
import { t } from './i18n.ts';
import { LESSON } from './lesson-mode.ts';

export interface GuideStep {
  title: string;
  text: string;
  /** what to point at (a selector); skipped where it is hidden, e.g. the side panel on a phone */
  target?: string;
}

/** steps: fixed, or worked out each time it opens (they can depend on the mode) */
/** link: one more place to go from the guide (the raster app: its lessons) */
export function initGuide(button: HTMLElement, stepsOf: GuideStep[] | (() => GuideStep[]), key: string, link?: { text: string; href: string }): { show(): void } {
  let steps = typeof stepsOf === 'function' ? stepsOf() : stepsOf;
  const card = document.createElement('dialog');
  card.id = 'guide';
  card.innerHTML = `<div class="dlg-head"><h2></h2><button class="guide-close" title="${t('Close')}">✕</button></div>
<p class="guide-text"></p>
<div class="row dlg-foot"><span class="note guide-count"></span><button class="guide-back">${t('Back')}</button><button class="guide-next primary"></button></div>`;
  if (link) {
    const p = document.createElement('p');
    p.className = 'note guide-link';
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.text;
    p.append(a);
    card.querySelector('.dlg-foot').before(p);
  }
  document.body.append(card);
  let at = 0, marked: HTMLElement | null = null;
  const mark = (el: HTMLElement | null) => {
    marked?.classList.remove('guide-target');
    marked = el;
    marked?.classList.add('guide-target');
  };
  function draw(): void {
    const s = steps[at];
    card.querySelector('h2').textContent = s.title;
    card.querySelector('.guide-text').textContent = s.text;
    card.querySelector('.guide-count').textContent = t('{k} of {n}', { k: at + 1, n: steps.length });
    (card.querySelector('.guide-back') as HTMLButtonElement).disabled = at === 0;
    card.querySelector('.guide-next').textContent = at === steps.length - 1 ? t('Done') : t('Next');
    const el = s.target ? document.querySelector<HTMLElement>(s.target) : null;
    mark(el && el.offsetParent ? el : null);
    marked?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }
  function close(): void {
    mark(null);
    card.close();
    lsSet(key, '1');
  }
  function show(): void {
    if (typeof stepsOf === 'function') steps = stepsOf();
    at = 0;
    draw();
    if (!card.open) card.show();
  }
  card.querySelector<HTMLElement>('.guide-close').onclick = close;
  card.querySelector<HTMLElement>('.guide-back').onclick = () => { at = Math.max(0, at - 1); draw(); };
  card.querySelector<HTMLElement>('.guide-next').onclick = () => { if (at === steps.length - 1) close(); else { at++; draw(); } };
  card.addEventListener('keydown', (e) => { if (e.key === 'Escape') { e.preventDefault(); close(); } });
  button.onclick = show;
  // the first time only – and not while a test robot drives the page
  // (nor inside Discord, where the app opens for a quick edit)
  // (nor in a lesson: the lesson guides)
  if (!lsGet(key) && !location.hash && !navigator.webdriver && !location.hostname.endsWith('discordsays.com') && !LESSON) setTimeout(show, 600);
  return { show };
}
