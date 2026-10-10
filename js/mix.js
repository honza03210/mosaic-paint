/* Mosaic Paint – color mix: tiles get a random color from a few palette colors, so big
   backgrounds don't look flat. Optionally avoids putting the same color next to itself. */
(() => {
'use strict';

const $ = (s) => document.querySelector(s);
const { state } = MZ;
const mix = { on: false, colors: [], avoid: true };
try { Object.assign(mix, JSON.parse(localStorage.getItem('mz-mix') || '{}')); } catch { /* ignore */ }
const save = () => { try { localStorage.setItem('mz-mix', JSON.stringify(mix)); } catch { /* ignore */ } };
const active = () => mix.on && mix.colors.length >= 2;

function pick(reg) {
  let options = mix.colors;
  if (mix.avoid && reg) {
    const taken = MZ.neighbourColors(reg), free = options.filter(c => !taken.has(c));
    if (free.length) options = free;
  }
  return options[Math.floor(Math.random() * options.length)];
}
/** The bucket asks this for every tile it paints. */
const chooser = (q, face, ctx) => pick(face ? ctx.ix.region(face) : null);

function render() {
  MZ.setFillChooser(active() ? chooser : null);
  $('#mix-on').checked = mix.on;
  $('#mix-avoid').checked = mix.avoid;
  const box = $('#mix-colors');
  box.innerHTML = '';
  for (const c of mix.colors) {
    const chip = document.createElement('span');
    chip.className = 'mix-chip';
    chip.style.background = c;
    chip.title = `${c} – click to remove from the mix`;
    chip.onclick = () => toggle(c);
    box.append(chip);
  }
  $('#mix-hint').textContent = mix.colors.length < 2
    ? 'Shift+click two or more swatches to put them in the mix.'
    : `Each tile gets one of these ${mix.colors.length} colors at random. Shift+click swatches to change the mix.`;
  $('#btn-mix-sel').hidden = mix.colors.length < 2;
  markSwatches();
  save();
}
function markSwatches() {
  const sw = document.querySelectorAll('#palette .swatch');
  [null, ...state.palette].forEach((c, i) => sw[i] && sw[i].classList.toggle('in-mix', !!c && active() && mix.colors.includes(c)));
}
function toggle(c) {
  const i = mix.colors.indexOf(c);
  if (i >= 0) mix.colors.splice(i, 1); else mix.colors.push(c);
  if (mix.colors.length >= 2 && i < 0) mix.on = true;
  render();
}

/** Recolors the selected painted areas with random mix colors. */
function mixSelection() {
  if (!active()) { MZ.toast('Put at least two colors in the mix first (Shift+click swatches).'); return; }
  const ix = MZ.regionIndex();
  let n = 0;
  for (const el of state.selection) {
    if (!MZ.fillOf(el)) continue;
    const g = MZ.geomOf(el), p = MZ.gridSample(g.bbox, (q) => MZ.insideEl(el, q), 1)[0], f = p && ix.locate(p);
    MZ.paintFill(el, pick(f ? ix.region(f) : null));
    n++;
  }
  if (n) MZ.commit(true);
  MZ.toast(n ? `Mixed the colors of ${n} area${n === 1 ? '' : 's'}.` : 'Select painted areas first.');
}

MZ.on('swatch-shift', (c) => { if (c) toggle(c); });
MZ.on('palette', markSwatches);
$('#mix-on').onchange = (e) => {
  mix.on = e.target.checked;
  if (mix.on && mix.colors.length < 2) MZ.toast('Shift+click two or more swatches to put them in the mix.');
  render();
};
$('#mix-avoid').onchange = (e) => { mix.avoid = e.target.checked; render(); };
$('#btn-mix-sel').onclick = mixSelection;
render();
})();
