/* Languages: English (the source text) and Czech. t('English text') returns the text in the chosen
   language. Placeholders: {name} is replaced by a value; {n|tile|tiles} picks the word form for the number
   n (English: one | other; Czech: one | 2–4 | other, e.g. {n|dlaždice|dlaždice|dlaždic}). The static
   page is translated by translateDom. Works without a browser too (tests): then it is English. */
import { CS } from './i18n-cs.ts';

export type Lang = 'en' | 'cs';
export const LANGS: [Lang, string][] = [['en', 'English'], ['cs', 'Čeština']];
const KEY = 'mz-lang';

function detect(): Lang {
  try {
    const saved = typeof localStorage !== 'undefined' && localStorage.getItem(KEY);
    if (saved === 'en' || saved === 'cs') return saved;
  } catch { /* storage unavailable */ }
  // only a browser's language counts (Node, running the tests, also has a navigator)
  const nav = typeof window !== 'undefined' && typeof navigator !== 'undefined' ? navigator.language || '' : '';
  return /^(cs|sk)\b/i.test(nav) ? 'cs' : 'en';
}
export const lang: Lang = detect();
const dict: Record<string, string> = lang === 'cs' ? CS : {};

/** Chooses the language (the page reloads to show it). */
export function setLang(l: Lang): void {
  try { localStorage.setItem(KEY, l); } catch { /* storage unavailable */ }
  location.reload();
}
/** Which plural form a number takes: English one | other, Czech one | few (2–4) | other. */
function form(n: number, forms: string[]): string {
  const i = lang === 'cs'
    ? (n === 1 ? 0 : Number.isInteger(n) && n >= 2 && n <= 4 ? 1 : 2)
    : (n === 1 ? 0 : 1);
  return forms[Math.min(i, forms.length - 1)];
}
/** A number written the language's way (1,152 / 1 152; 2.5 / 2,5). */
export const num = (v: number, digits?: number): string =>
  v.toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en', digits == null ? undefined : { minimumFractionDigits: digits, maximumFractionDigits: digits });

/** The text in the chosen language, with {placeholders} filled in. */
export function t(s: string, vars?: Record<string, string | number>): string {
  let out = dict[s] ?? s;
  if (vars) {
    out = out.replace(/\{(\w+)\|([^}]*)\}/g, (m, k, forms) => (k in vars ? form(+vars[k], forms.split('|')) : m));
    out = out.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? (typeof vars[k] === 'number' ? num(vars[k] as number) : String(vars[k])) : m));
  }
  return out;
}

const ATTRS = ['title', 'placeholder', 'aria-label'];
/** Translates the texts and tooltips of a part of the page (texts that are in the dictionary). */
export function translateDom(root: ParentNode): void {
  if (lang === 'en') return;
  const walk = document.createTreeWalker(root as Node, NodeFilter.SHOW_TEXT);
  for (let n = walk.nextNode(); n; n = walk.nextNode()) {
    const v = n.nodeValue, key = v.trim();
    if (key && dict[key] != null) n.nodeValue = v.replace(key, dict[key]);
  }
  for (const el of (root as Element).querySelectorAll ? [root as Element, ...(root as Element).querySelectorAll('*')] : []) {
    if (!el.getAttribute) continue;
    for (const a of ATTRS) {
      const v = el.getAttribute(a);
      if (v && dict[v.trim()] != null) el.setAttribute(a, dict[v.trim()]);
    }
  }
  if (root === document.body || root === (document as unknown as ParentNode)) document.documentElement.lang = lang;
}
