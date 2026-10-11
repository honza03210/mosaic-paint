/* The tool switcher and the Simple / Expert mode. */
import { $, $$ } from '../shared/ui.ts';
import { state, savePrefs, emit } from './state.ts';
import { stage, requestRender } from './canvas.ts';
import { paintTools, type Tool } from './paint.ts';
import { selectTool, place } from './select.ts';
import { t } from '../shared/i18n.ts';

export const tools: Record<string, Tool> = {
  ...paintTools, select: selectTool, pan: { down() {}, move() {}, up() {} },
};
const HINTS: Record<string, string> = {
  select: t('Drag to select · drag inside the selection to move it (Alt: a copy) · Enter places it · Ctrl+C / X / V copy, cut, paste'),
  brush: t('Drag to paint · Shift: straight line · [ ] size · Alt+click: pick a color'),
  pencil: t('Hard pixels in exact colors · Shift: straight line · [ ] size · Alt+click: pick a color'),
  eraser: t('Drag to erase to transparent · Shift: straight line · [ ] size'),
  line: t('Drag a line · Shift: 15° steps'),
  ngon: t('Drag from the center · Shift: 15° rotation · keys 3–9: sides'),
  bucket: t('Click to fill the area of similar color · Alt+click: pick a color'),
  picker: t('Click to take a color from the image'),
  pan: t('Drag to pan · mouse wheel zooms'),
};
export function setTool(tool: string): void {
  if (!tools[tool]) tool = 'brush';
  // moving on from the selection tool places what was being moved or pasted
  if (tool !== 'select' && state.floating) place();
  state.action = null;
  state.preview = null;
  state.tool = tool;
  stage.dataset.tool = tool;
  for (const b of $$('#tools button')) b.classList.toggle('active', b.dataset.tool === tool);
  for (const s of $$('.tool-opts')) s.hidden = !s.dataset.for.split(' ').includes(tool);
  $('#st-hint').textContent = HINTS[tool];
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
