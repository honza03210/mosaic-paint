/* Setting up the palette from colors copied elsewhere: paste anything – a palette site (Coolors, Color Hunt,
   Adobe Color…), a list of color codes, a page's CSS – and every color in it shows; click one to leave it
   out, then add them to the palette or use them instead of it. Shared by both apps. */
import * as Colors from '../lib/colors.ts';
import { t } from './i18n.ts';

let dlg: HTMLDialogElement | null = null;
function dialog(): HTMLDialogElement {
  if (dlg) return dlg;
  dlg = document.createElement('dialog');
  dlg.id = 'dlg-palsetup';
  dlg.innerHTML = `<form method="dialog">
<div class="dlg-head"><h2>${t('Set up the palette')}</h2></div>
<p class="note">${t('Copy colors on any website – a palette site, color codes, a list – and paste them here (Ctrl+V). Every color found shows below; click one to leave it out.')}</p>
<div class="row"><button type="button" class="ps-clip">${t('Paste from clipboard')}</button></div>
<textarea class="ps-text" rows="4" spellcheck="false" aria-label="${t('Colors to paste')}" placeholder="#264653, #2a9d8f, rgb(233 196 106), https://coolors.co/264653-2a9d8f-e9c46a"></textarea>
<p class="ps-count note"></p>
<div class="ps-found" role="group" aria-label="${t('Colors found')}"></div>
<div class="row seg">
  <label><input type="radio" name="ps-how" value="add" checked> ${t('Add to my palette')}</label>
  <label><input type="radio" name="ps-how" value="replace"> ${t('Use instead of my palette')}</label>
</div>
<div class="row dlg-foot"><button value="cancel" formnovalidate>${t('Cancel')}</button><button value="ok" class="primary ps-ok">${t('Use these colors')}</button></div>
</form>`;
  document.body.append(dlg);
  return dlg;
}

/** Opens the setup; resolves with the colors chosen and whether they replace the palette (null: cancelled). */
export function paletteSetup(): Promise<{ colors: string[]; replace: boolean } | null> {
  const d = dialog(), q = <E extends Element>(s: string) => d.querySelector(s) as unknown as E;
  const text = q<HTMLTextAreaElement>('.ps-text'), found = q<HTMLElement>('.ps-found'), ok = q<HTMLButtonElement>('.ps-ok');
  let colors: string[] = [];
  const off = new Set<string>();
  const show = () => {
    colors = Colors.parse(text.value);
    found.innerHTML = '';
    for (const c of colors) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'ps-swatch' + (off.has(c) ? ' off' : '');
      b.style.background = c;
      b.title = c;
      b.setAttribute('aria-pressed', String(!off.has(c)));
      b.setAttribute('aria-label', c);
      b.onclick = () => { if (off.has(c)) off.delete(c); else off.add(c); show(); };
      found.append(b);
    }
    const n = colors.filter(c => !off.has(c)).length;
    q<HTMLElement>('.ps-count').textContent = !text.value.trim() ? '' : colors.length
      ? t('{n} {n|color|colors} found.', { n })
      : t('No colors found in this text – copy the color codes (like #2a9d8f), not just the picture.');
    ok.disabled = !n;
  };
  text.value = '';
  off.clear();
  // adding is the safe choice: replacing is chosen each time
  q<HTMLInputElement>('input[value=add]').checked = true;
  text.oninput = show;
  q<HTMLButtonElement>('.ps-clip').onclick = async () => {
    try { text.value = await navigator.clipboard.readText(); show(); } catch { text.focus(); q<HTMLElement>('.ps-count').textContent = t('This browser won’t let the page read the clipboard – click in the box and press Ctrl+V.'); }
  };
  show();
  return new Promise((resolve) => {
    d.onclose = () => {
      d.onclose = null;
      const keep = colors.filter(c => !off.has(c));
      resolve(d.returnValue === 'ok' && keep.length ? { colors: keep, replace: q<HTMLInputElement>('input[value=replace]').checked } : null);
    };
    d.returnValue = '';
    d.showModal();
    text.focus();
  });
}
