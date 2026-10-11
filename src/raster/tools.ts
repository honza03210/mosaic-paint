/* The tool switcher and the Simple / Expert mode. */
import { $, $$ } from '../shared/ui.ts';
import { state, savePrefs, emit } from './state.ts';
import { stage, requestRender } from './canvas.ts';
import { paintTools, type Tool } from './paint.ts';
import { selectTool, place } from './select.ts';

export const tools: Record<string, Tool> = {
  ...paintTools, select: selectTool, pan: { down() {}, move() {}, up() {} },
};
const HINTS: Record<string, string> = {
  select: 'Drag to select · drag inside the selection to move it (Alt: a copy) · Enter places it · Ctrl+C / X / V copy, cut, paste',
  brush: 'Drag to paint · Shift: straight line · [ ] size · Alt+click: pick a color',
  pencil: 'Hard pixels in exact colors · Shift: straight line · [ ] size · Alt+click: pick a color',
  eraser: 'Drag to erase to transparent · Shift: straight line · [ ] size',
  line: 'Drag a line · Shift: 15° steps',
  ngon: 'Drag from the center · Shift: 15° rotation · keys 3–9: sides',
  bucket: 'Click to fill the area of similar color · Alt+click: pick a color',
  picker: 'Click to take a color from the image',
  pan: 'Drag to pan · mouse wheel zooms',
};
export function setTool(t: string): void {
  if (!tools[t]) t = 'brush';
  // moving on from the selection tool places what was being moved or pasted
  if (t !== 'select' && state.floating) place();
  state.action = null;
  state.preview = null;
  state.tool = t;
  stage.dataset.tool = t;
  for (const b of $$('#tools button')) b.classList.toggle('active', b.dataset.tool === t);
  for (const s of $$('.tool-opts')) s.hidden = !s.dataset.for.split(' ').includes(t);
  $('#st-hint').textContent = HINTS[t];
  savePrefs();
  requestRender();
}
export function setMode(m: string): void {
  state.mode = m === 'expert' ? 'expert' : 'simple';
  document.body.dataset.mode = state.mode;
  for (const b of $$('#mode-switch button')) b.classList.toggle('active', b.dataset.mode === state.mode);
  // Simple mode has full opacity
  if (state.mode === 'simple') state.opacity = 1;
  savePrefs();
  emit('mode');
}
