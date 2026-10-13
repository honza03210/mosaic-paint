/* Page helpers used by both apps (vector and raster): element lookup, messages, downloads, storage. */

// DOM lookups are typed loosely: the page's markup is the contract
export const $ = (s: string): any => document.querySelector(s);
export const $$ = (s: string): any[] => [...document.querySelectorAll(s)];
export const clamp = (v: number, a: number, b: number): number => Math.max(a, Math.min(b, v));

let toastTimer: any;
/** A short message in the status bar. */
export function toast(msg: string): void {
  const t = $('#st-msg');
  t.textContent = msg;
  clearTimeout(toastTimer);
  // long enough to read: longer messages stay longer
  toastTimer = setTimeout(() => { t.textContent = ''; }, Math.min(15000, 4000 + msg.length * 60));
}
/** Work in progress, in the status bar: the label, then its share done (0…1); done() clears it. */
export function working(label: string): { set(f: number): void; done(): void } {
  const el = $('#st-msg');
  clearTimeout(toastTimer);
  document.body.classList.add('working');
  el.textContent = label;
  return {
    set: (f) => { el.textContent = `${label} ${Math.round(f * 100)} %`; },
    done: () => {
      document.body.classList.remove('working');
      if (el.textContent.startsWith(label)) el.textContent = '';
    },
  };
}
export function lsGet(k: string): string | null { try { return localStorage.getItem(k); } catch { return null; } }
export function lsSet(k: string, v: string): boolean { try { localStorage.setItem(k, v); return true; } catch { return false; } }
/** Settings remembered in the browser: fills `into` with what was saved under the key, if it can be read. */
export function loadSettings(key: string, into: object): void {
  try { Object.assign(into, JSON.parse(lsGet(key) || '{}')); } catch { /* unreadable: keep the defaults */ }
}
export const saveSettings = (key: string, value: unknown): boolean => lsSet(key, JSON.stringify(value));
export function download(blob: Blob, name: string): void {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  // Safari needs the link (and its URL) for a while after the click
  setTimeout(() => { a.remove(); URL.revokeObjectURL(a.href); }, 30000);
}
/** Is the user typing in a field? (Checkboxes, sliders and buttons don't take keys, so shortcuts still work there.) */
export function typingIn(t: any): boolean {
  if (!t) return false;
  if (t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable) return true;
  return t.tagName === 'INPUT' && !['checkbox', 'radio', 'range', 'color', 'button', 'file'].includes(t.type);
}
/**
 * Whether a modal dialog is open (keyboard shortcuts wait until it closes). A card shown without being
 * modal – the guide – leaves them working.
 */
export function modalOpen(): boolean {
  return [...document.querySelectorAll('dialog[open]')].some((d) => {
    try { return d.matches(':modal'); } catch { return d.id !== 'guide'; } // browsers without :modal
  });
}
export function readAsDataURL(file: Blob): Promise<string> {
  return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result as string); r.onerror = rej; r.readAsDataURL(file); });
}
export function loadImg(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
}
