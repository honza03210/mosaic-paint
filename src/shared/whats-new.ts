/* The app's version (from package.json, put in by the build) and "What's new": a button in the status bar
   shows the version and opens the list of releases. After an update it is marked until opened; a first
   visit is left alone (the guide is for that). Shared by both apps. */
import { $, lsGet, lsSet, toast } from './ui.ts';
import { t } from './i18n.ts';
import { esc } from '../lib/html.ts';

declare const __VERSION__: string;
export const VERSION = typeof __VERSION__ === 'string' ? __VERSION__ : 'dev';

/** The releases, newest first: version, date, and what changed (English, translated when shown). */
export const RELEASES: { version: string; date: string; items: string[] }[] = [
  {
    version: '1.3.0', date: '2026-10-12', items: [
      'Brush tips for the brush and the eraser: soft (airbrush), spray, calligraphy and chalk. Shift+B switches between them.',
      'The spray keeps spraying while you hold it still, like an airbrush; the calligraphy nib’s angle can be set (also for left-handed writing).',
    ],
  },
  {
    version: '1.2.1', date: '2026-10-12', items: [
      'Choose any color: a color area, a hue slider and a color code (Choose… under the palette, or click the current colors).',
      'Inside Discord: New, Save as, renaming and the other questions work (they are asked in the page now), and switching between the apps keeps the Post button.',
      'On phones inside Discord, the top bar stays clear of Discord’s own controls.',
    ],
  },
  {
    version: '1.2.0', date: '2026-10-12', items: [
      'Edit images from a Discord chat: right-click › Apps › Edit image, draw on it, post it back – in the raster or the vector app.',
      'Pen pressure: with a graphics tablet or stylus, the brush, pencil and eraser paint thinner the lighter you press.',
      'Image editing in the raster app: rotate (by 90° or any angle), flip, crop to the selection, trim the border, resize keeping proportions.',
    ],
  },
  {
    version: '1.1.0', date: '2026-10-11', items: [
      'The raster app: paint with pixels, turn photos into mosaics, and copy pictures between both apps.',
      '3D print: a 3D preview, models for multi-filament printers (AMS, MMU), a frame, rounded corners, a hanging hole and magnet pockets – and a check of the sliced G-code against the plan.',
      'Examples to start from, and a short guide for newcomers.',
      'German, Slovak and Polish.',
      'Heavy work – mosaics, tracing, 3D models – no longer holds up the page.',
      'History: name and pin versions; see their size and colors.',
      'Big images can be scaled down when opened.',
      'Better keyboard and screen-reader support.',
    ],
  },
  {
    version: '1.0.0', date: '2026-10-10', items: [
      'The vector editor: lines, tile patterns, the paint bucket, palettes, reports, printing at real size and sharing as a link.',
    ],
  },
];

const KEY = 'mz-version';

export function initWhatsNew(): void {
  const dlg = document.createElement('dialog');
  dlg.id = 'dlg-whats-new';
  dlg.innerHTML = `<form method="dialog" class="dlg-head"><h2>${t('What’s new')}</h2><button title="${t('Close')}">✕</button></form>`
    + RELEASES.map(r => `<h3>${esc(r.version)} <span class="note">${esc(new Date(r.date).toLocaleDateString(document.documentElement.lang || 'en'))}</span></h3><ul>`
      + r.items.map(i => `<li>${esc(t(i))}</li>`).join('') + '</ul>').join('');
  document.body.append(dlg);
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });

  const button = document.createElement('button');
  button.id = 'st-version';
  button.textContent = 'v' + VERSION;
  button.title = t('Version {v} – what’s new', { v: VERSION });
  $('#status').append(button);
  const seen = lsGet(KEY);
  if (seen && seen !== VERSION) {
    // updated since the last visit: point at what changed until it has been looked at
    button.classList.add('new');
    toast(t('Updated to version {v} – click v{v} in the corner to see what’s new.', { v: VERSION }));
  } else if (!seen) lsSet(KEY, VERSION);
  button.onclick = () => {
    button.classList.remove('new');
    lsSet(KEY, VERSION);
    dlg.showModal();
  };
}
