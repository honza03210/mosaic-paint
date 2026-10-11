/* Languages: English (the source text), Czech, German, Slovak and Polish. t('English text') returns the
   text in the chosen language. Placeholders: {name} is replaced by a value; {n|tile|tiles} picks the word
   form for the number n, in the order of the language's forms (English, German: one | other; Czech,
   Slovak: one | 2–4 | other, e.g. {n|dlaždice|dlaždice|dlaždic}; Polish: one | 2–4, 22–24… | other). The
   static page is translated by translateDom. Works without a browser too (tests): then it is English. */
import { CS } from './i18n-cs.ts';
import { DE } from './i18n-de.ts';
import { SK } from './i18n-sk.ts';
import { PL } from './i18n-pl.ts';

export type Lang = 'en' | 'cs' | 'de' | 'sk' | 'pl';
export const LANGS: [Lang, string][] = [['en', 'English'], ['cs', 'Čeština'], ['de', 'Deutsch'], ['sk', 'Slovenčina'], ['pl', 'Polski']];
/** each language's texts, keyed by the English text */
export const DICTS: Record<Lang, Record<string, string>> = { en: {}, cs: CS, de: DE, sk: SK, pl: PL };
const LOCALES: Record<Lang, string> = { en: 'en', cs: 'cs-CZ', de: 'de-DE', sk: 'sk-SK', pl: 'pl-PL' };
const isLang = (v: unknown): v is Lang => typeof v === 'string' && v in LOCALES;
const KEY = 'mz-lang';

function detect(): Lang {
  try {
    const saved = typeof localStorage !== 'undefined' && localStorage.getItem(KEY);
    if (isLang(saved)) return saved;
  } catch { /* storage unavailable */ }
  // only a browser's language counts (Node, running the tests, also has a navigator)
  const nav = typeof window !== 'undefined' && typeof navigator !== 'undefined' ? (navigator.language || '').slice(0, 2).toLowerCase() : '';
  return isLang(nav) ? nav : 'en';
}
export const lang: Lang = detect();
const dict: Record<string, string> = DICTS[lang];

/** Chooses the language (the page reloads to show it). */
export function setLang(l: Lang): void {
  try { localStorage.setItem(KEY, l); } catch { /* storage unavailable */ }
  location.reload();
}
const plurals = new Map<Lang, Intl.PluralRules>();
/** Which word form a number takes in a language: one, then few (Czech, Slovak, Polish 2–4), then the rest. */
export function wordForm(l: Lang, n: number, forms: string[]): string {
  let p = plurals.get(l);
  if (!p) plurals.set(l, p = new Intl.PluralRules(LOCALES[l]));
  const c = p.select(n), i = c === 'one' ? 0 : c === 'few' ? 1 : forms.length - 1;
  return forms[Math.min(i, forms.length - 1)];
}
/** A number written the language's way (1,152 / 1 152; 2.5 / 2,5). */
export const num = (v: number, digits?: number): string =>
  v.toLocaleString(LOCALES[lang], digits == null ? undefined : { minimumFractionDigits: digits, maximumFractionDigits: digits });

/** The text in the chosen language, with {placeholders} filled in. */
export function t(s: string, vars?: Record<string, string | number>): string {
  let out = dict[s] ?? s;
  if (vars) {
    out = out.replace(/\{(\w+)\|([^}]*)\}/g, (m, k, forms) => (k in vars ? wordForm(lang, +vars[k], forms.split('|')) : m));
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
