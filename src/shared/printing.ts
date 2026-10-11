/* Printing and color reports, shared by both apps: the print page in a new tab, the color legend printed
   with the templates, and the colors as a CSV file. */
import { esc } from '../lib/html.ts';
import { toast } from './ui.ts';
import { t } from './i18n.ts';

/** Opens a print page (complete HTML) in a new tab, where it prints itself. */
export function openPrintPage(html: string): void {
  const url = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
  const w = window.open(url, '_blank');
  if (!w) { toast(t('The browser blocked the print window – allow pop-ups for this page.')); return; }
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

/** A row of the color legend: the color's number, the color, how many pieces (in words) and their area. */
export interface LegendRow { n: number; color: string; count: string; area: string }
/** The color legend of a print: "<title> – colors", then a table of the numbered colors. */
export function legendHTML(title: string, rows: LegendRow[]): string {
  return rows.length ? `<h2>${esc(title)} – ${t('colors')}</h2><table>`
    + rows.map(r => `<tr><td class="n">${r.n}</td><td><span style="background:${r.color}"></span></td><td>${r.color}</td><td>${esc(r.count)}</td><td>${esc(r.area)}</td></tr>`).join('')
    + '</table>' : '';
}

/** A CSV file's text: the header, then a line per row (values with no commas or quotes). */
export const csvText = (header: string[], rows: (string | number)[][]): string =>
  [header, ...rows].map(r => r.join(',')).join('\n') + '\n';
