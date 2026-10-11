/* Questions asked in the page, in place of the browser's own prompt() and confirm() boxes: those are blocked
   inside Discord's Activity frame (they silently answer "cancel") and look out of place on phones. Shared by
   both apps. Enter answers OK, Esc cancels. */
import { t } from './i18n.ts';

let dlg: HTMLDialogElement | null = null;
function box(): HTMLDialogElement {
  if (dlg) return dlg;
  dlg = document.createElement('dialog');
  dlg.id = 'dlg-ask';
  dlg.innerHTML = `<form method="dialog">
<p class="ask-msg"></p>
<input class="ask-input" type="text" autocomplete="off" spellcheck="false">
<div class="row dlg-foot"><button value="cancel" formnovalidate>${t('Cancel')}</button><button value="ok" class="primary">OK</button></div>
</form>`;
  document.body.append(dlg);
  return dlg;
}

/** Asks and waits: OK gives the field's text (or '' without a field), Cancel / Esc null. */
function show(message: string, value: string | null): Promise<string | null> {
  const d = box(), input = d.querySelector<HTMLInputElement>('.ask-input');
  d.querySelector('.ask-msg').textContent = message;
  input.hidden = value == null;
  input.value = value ?? '';
  d.returnValue = 'cancel';
  return new Promise((resolve) => {
    d.addEventListener('close', () => resolve(d.returnValue === 'ok' ? input.value : null), { once: true });
    d.showModal();
    if (value != null) { input.focus(); input.select(); } else d.querySelector<HTMLElement>('button.primary').focus();
  });
}

/** A question with a text answer (like prompt): the text, or null when cancelled. */
export const ask = (message: string, value = ''): Promise<string | null> => show(message, value);
/** A yes / no question (like confirm). */
export const askYes = async (message: string): Promise<boolean> => (await show(message, null)) != null;
