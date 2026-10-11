/* The "Examples" dialog shared by both apps: a card per example project, with a small picture of it. The
   app says what its examples are and how to open one. */
import { t } from './i18n.ts';

export interface Example {
  id: string;
  title: string;
  text: string;
  /** a picture of it (an image URL) */
  preview(): string;
  /** opens it as the current drawing / image */
  open(): Promise<void> | void;
}

export function initExamples(button: HTMLElement, examples: Example[]): void {
  const dlg = document.createElement('dialog');
  dlg.id = 'dlg-examples';
  dlg.innerHTML = `<form method="dialog" class="dlg-head"><h2>${t('Examples')}</h2><button title="${t('Close')}">✕</button></form>
<p class="note">${t('Open an example to see how it is made, or to start from it. Your current work is kept in History.')}</p>
<div class="ex-list"></div>`;
  document.body.append(dlg);
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  const list = dlg.querySelector('.ex-list');
  for (const ex of examples) {
    const card = document.createElement('button');
    card.className = 'ex-card';
    card.dataset.example = ex.id;
    card.innerHTML = `<img alt=""><b></b><span class="note"></span>`;
    card.querySelector('b').textContent = ex.title;
    card.querySelector('.note').textContent = ex.text;
    card.onclick = async () => { dlg.close(); await ex.open(); };
    list.append(card);
  }
  button.onclick = () => {
    // pictures are made when first needed
    list.querySelectorAll<HTMLImageElement>('img').forEach((img, k) => { if (!img.src) img.src = examples[k].preview(); });
    dlg.showModal();
  };
}
