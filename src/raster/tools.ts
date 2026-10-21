/* The tool switcher and the Simple / Expert mode. */
import { $, $$ } from '../shared/ui.ts';
import { state, savePrefs, emit } from './state.ts';
import { stage, view, requestRender } from './canvas.ts';
import { paintTools, cancelCurve, type Tool } from './paint.ts';
import { selectTool, place } from './select.ts';
import { textTool } from './text.ts';
import { twistTool } from './twist-tool.ts';
import { t } from '../shared/i18n.ts';

export const tools: Record<string, Tool> = {
  ...paintTools, select: selectTool, text: textTool, twist: twistTool, pan: { down() {}, move() {}, up() {} },
};
const HINTS: Record<string, string> = {
  select: t('Drag to select · drag inside the selection to move it (Alt: a copy) · Enter places it · Ctrl+C / X / V copy, cut, paste'),
  brush: t('Drag to paint · Shift: straight line · [ ] size · Shift+B: tip · Alt+click: pick a color'),
  pencil: t('Hard pixels in exact colors · Shift: straight line · [ ] size · Alt+click: pick a color'),
  eraser: t('Drag to erase to transparent · Shift: straight line · [ ] size'),
  clone: t('Tap where to copy from (or Alt+click), then paint the copy · drag the source disc to move it'),
  heal: t('Tap where to copy from (or Alt+click), then paint over the spot – it blends in when you lift'),
  remove: t('Paint over what should disappear – it is filled from the surroundings when you lift'),
  blur: t('Paint to soften – edges of pasted photos blend in · [ ] size · a soft tip blends best'),
  noise: t('Paint to add grain – a smooth patch matches the photo around it · [ ] size'),
  twist: t('Press at the centre, drag out for the size, then go round it to twist – the further round, the stronger · lift to finish'),
  text: t('Tap to add text · drag it into place · tap it to edit · Enter places it'),
  line: t('Drag a line · Shift: 15° steps'),
  ngon: t('Drag from the center · Shift: 15° rotation · keys 3–9: sides'),
  ellipse: t('Drag from corner to corner (or from the center) · Shift: a circle'),
  curve: t('Click the curve’s points · click the first point to close it · double-click or Enter ends it open · Backspace removes the last point · Esc cancels'),
  bucket: t('Click to fill the area of similar color · Alt+click: pick a color'),
  picker: t('Click to take a color from the image'),
  pan: t('Drag to pan · mouse wheel zooms'),
};
export function setTool(tool: string): void {
  if (!tools[tool]) tool = 'brush';
  // moving on from the selection tool places what was being moved or pasted
  if (tool !== 'select' && tool !== 'text' && state.floating) place();
  state.action = null;
  view.style.cursor = '';
  cancelCurve();
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
