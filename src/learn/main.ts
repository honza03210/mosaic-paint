/* The lessons page (learn.html): the course – every raster tool, a small task each, in five units – and the
   lesson itself: the editor in a frame (raster.html?lesson=…, a world of its own: lesson-mode.ts) with the
   spotlight guiding each step (engine.ts). Stars for finished tasks are kept in this browser. */
import '../shared/i18n-start.ts';
import { t, lang, LANGS, setLang } from '../shared/i18n.ts';
import { lsGet, lsSet } from '../shared/ui.ts';
import { TASKS, UNITS } from './tasks.ts';
import { spotlight, type Spotlight } from './engine.ts';
import type { Ctx, Task } from './types.ts';

const $ = <E extends HTMLElement = HTMLElement>(s: string) => document.querySelector<E>(s);
const ICON: Record<string, string> = {
  pan: '✋', brush: '🖌️', pencil: '✏️', eraser: '🧽', picker: '💧', bucket: '🪣', line: '📏', ngon: '⬡', ellipse: '⭕', curve: '〰️',
  select: '⬚', text: '🔤', clone: '🌸', heal: '🩹', remove: '✨', blur: '🌫️', noise: '✳️', twist: '🌀',
};
const KEY = 'mz-learn';
const done = (): Set<string> => { try { return new Set(JSON.parse(lsGet(KEY) || '[]')); } catch { return new Set(); } };
function markDone(id: string): void { const s = done(); s.add(id); lsSet(KEY, JSON.stringify([...s])); }

// ---- the course --------------------------------------------------------------------------------------------
function renderCourse(): void {
  const have = done(), list = $('#course');
  list.innerHTML = '';
  const next = TASKS.find(k => !have.has(k.id));
  UNITS.forEach((name, i) => {
    const sec = document.createElement('section');
    sec.className = 'unit';
    sec.innerHTML = `<h2><span class="unit-n">${i + 1}</span> ${name}</h2><div class="cards"></div>`;
    for (const task of TASKS.filter(k => k.unit === i + 1)) {
      const b = document.createElement('button');
      b.className = 'card' + (have.has(task.id) ? ' done' : '') + (task === next ? ' next' : '');
      b.innerHTML = `<span class="card-icon" aria-hidden="true">${ICON[task.tool] || '★'}</span><span class="card-title"></span><span class="card-star" aria-hidden="true">${have.has(task.id) ? '⭐' : '☆'}</span>`;
      b.querySelector('.card-title').textContent = task.title;
      b.setAttribute('aria-label', task.title + (have.has(task.id) ? ' – ' + t('done') : ''));
      b.onclick = () => start(task);
      sec.querySelector('.cards').append(b);
    }
    list.append(sec);
  });
  const n = have.size;
  $('#progress').textContent = t('{n} of {m} tasks done', { n, m: TASKS.length });
  ($('#progress-bar') as HTMLProgressElement).value = n / TASKS.length;
}

// ---- a lesson ------------------------------------------------------------------------------------------------
let light: Spotlight | null = null, running: Task | null = null, run = 0;
function stopLesson(): void { light?.stop(); light = null; running = null; run++; }

async function start(task: Task): Promise<void> {
  stopLesson();
  const me = run;
  running = task;
  document.body.classList.add('in-lesson');
  $('#finish').hidden = true;
  $('#lesson-title').textContent = task.title;
  $('#lesson-story').textContent = task.story;
  const dots = $('#dots');
  dots.innerHTML = task.steps.map(() => '<span class="dot"></span>').join('');
  // a fresh editor – in a new frame – for every lesson (and every new start): a frame being emptied or
  // reloaded may drop the next address (WebKit)
  const frame = newFrame();
  const token = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  frame.src = `raster.html?lesson=${encodeURIComponent(task.id)}&_=${token}`;
  // the frame's page as it is now, each time: the page from before (a blank one, or the same task before Start
  // again) may still be there for a moment
  const editorReady = () => { const fw = frame.contentWindow as Ctx['w'] | null; try { return fw?.location.href.includes('_=' + token) && fw.RZ?.ready ? fw : null; } catch { return null; } };
  const w = await new Promise<Ctx['w']>((res) => { const wait = () => { const fw = editorReady(); if (fw) res(fw); else setTimeout(wait, 50); }; wait(); });
  if (me !== run) return;
  const c: Ctx = { w, d: frame.contentDocument, RZ: w.RZ, mem: {} };
  task.setup(c);
  await new Promise(r => setTimeout(r, 150));
  light = spotlight(c);
  for (let i = 0; i < task.steps.length; i++) {
    if (me !== run) return;
    dots.children[i].classList.add('now');
    await light.run(task.steps[i]);
    if (me !== run) return;
    dots.children[i].classList.replace('now', 'ok');
  }
  light.stop();
  light = null;
  markDone(task.id);
  finish(task);
}

function finish(task: Task): void {
  const i = TASKS.indexOf(task), next = TASKS[i + 1];
  $('#finish-learned').textContent = task.learned;
  const b = $<HTMLButtonElement>('#btn-next');
  b.hidden = !next;
  if (next) { b.textContent = t('Next: {title}', { title: next.title }); b.onclick = () => start(next); }
  $('#finish').hidden = false;
  $('#btn-next').focus();
}

/** A new, empty frame for the editor in place of the one there was. */
function newFrame(): HTMLIFrameElement {
  const old = $<HTMLIFrameElement>('#editor'), f = document.createElement('iframe');
  f.id = 'editor';
  f.title = old.title;
  old.replaceWith(f);
  return f;
}

function backToCourse(): void {
  stopLesson();
  document.body.classList.remove('in-lesson');
  newFrame();
  renderCourse();
}

// ---- controls -------------------------------------------------------------------------------------------------
$('#btn-back').onclick = backToCourse;
$('#btn-done-back').onclick = backToCourse;
$('#btn-again').onclick = () => { if (running) start(running); };
$('#btn-speak').onclick = () => {
  const say = light?.text() || running?.story;
  if (!say || !('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(say);
  u.lang = lang;
  u.rate = 0.95;
  speechSynthesis.speak(u);
};
$('#btn-speak').hidden = !('speechSynthesis' in window);
const ls = $<HTMLSelectElement>('#lang-select');
for (const [code, name] of LANGS) ls.add(new Option(name, code));
ls.value = lang;
ls.onchange = () => setLang(ls.value as typeof lang);
renderCourse();
// (for the tests)
(window as any).LEARN = { TASKS, start, done };
