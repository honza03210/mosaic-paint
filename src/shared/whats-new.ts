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
    version: '2.7.1', date: '2026-10-17', items: [
      'In a narrower window the top bar scrolls on its own instead of pushing the whole page sideways (the canvas could slide out of view).',
    ],
  },
  {
    version: '2.7.0', date: '2026-10-17', items: [
      'Blur (U) and Noise (N) brushes, to blend photos into each other: blur along the edge of a pasted photo to soften it (a cut-out’s edge fades out), then add a little grain so it matches the picture around it.',
    ],
  },
  {
    version: '2.6.0', date: '2026-10-17', items: [
      'Scale a selection with the mouse: drag one of the handles in its corners – the opposite corner stays put and the proportions are kept. As with two fingers, it is always made from the original pixels.',
    ],
  },
  {
    version: '2.5.1', date: '2026-10-17', items: [
      'On phones, the Select shapes (and other rows of choices) wrap onto a second line instead of cutting off the last one – Object (AI) can be tapped again.',
    ],
  },
  {
    version: '2.5.0', date: '2026-10-14', items: [
      'Two fingers on a selection (or a pasted, imported picture or text) scale and turn it: spread or pinch, twist – and move it. It snaps upright and to its own size, and is always made from the original pixels, so it doesn’t blur. Elsewhere two fingers zoom the view as before.',
    ],
  },
  {
    version: '2.4.0', date: '2026-10-14', items: [
      'Import… puts a picture from a file into the current image (also in the quick menu): it comes in floating, scaled to fit – drag it into place.',
    ],
  },
  {
    version: '2.3.1', date: '2026-10-13', items: [
      'Select object (AI) no longer crashes on phones: it now uses MobileSAM, which needs a quarter of the memory (and is faster). Its download is larger (45 MB); the old model is removed.',
    ],
  },
  {
    version: '2.3.0', date: '2026-10-13', items: [
      'Nicer icons for undo / redo, zoom, fit and help; Adjust is in the toolbar and the quick menu, with new sliders – shadows, highlights, warmth, tint, vibrance, fade and vignette. Invert selection (Ctrl+I) in both apps.',
    ],
  },
  {
    version: '2.2.0', date: '2026-10-13', items: [
      'GIFs and videos: open one (or, in Discord, a GIF, a video or a Tenor / Giphy GIF from the chat) and choose the frame to edit – with a slider, frame steps and play.',
    ],
  },
  {
    version: '2.1.1', date: '2026-10-13', items: [
      'The AI add-ons on phones: much less memory (no more crash on iPhone when selecting an object) – the CPU engine on iPhone and iPad, and one feature\'s models at a time.',
    ],
  },
  {
    version: '2.1.0', date: '2026-10-13', items: [
      'Layers in the raster app: paint on the active layer, show / hide, opacity, move, merge, flatten – undo knows them all. Save layers keeps them in an OpenRaster file (.ora – GIMP and Krita open it), and autosave keeps them too.',
    ],
  },
  {
    version: '2.0.0', date: '2026-10-13', items: [
      'Add-ons that run on your device, each downloaded only after you agree to its size: Select object (tap it), AI object removal, background removal, Read text (OCR) and depth for 3D reliefs. The side panel lists them and removes them again.',
      '3D relief…: a printable relief (STL) from the picture\'s brightness – or a lithophane – or from AI depth.',
    ],
  },
  {
    version: '1.9.0', date: '2026-10-13', items: [
      'Text tool in the raster app (T): any font (also the installed ones, where the browser lists them), size, bold, italic, alignment, outline, shadow and curved text. It floats until placed – drag it, tap it to edit.',
    ],
  },
  {
    version: '1.8.0', date: '2026-10-13', items: [
      'Shaped selections: Lasso, Magnetic (snaps to edges) and Wand (by color), with New / Add / Subtract (or Shift / Alt) – copy, clear, move and Adjust colors follow the shape.',
      'Removing things: the Remove brush (R) and Fill from surroundings for a selection fill the spot with the picture around it – content-aware, on the device.',
    ],
  },
  {
    version: '1.7.0', date: '2026-10-13', items: [
      'Photo fixes in the raster app: Adjust colors… – brightness, contrast, saturation, levels with Auto, sharpening and noise smoothing, previewed live (hold Before to compare).',
      'Heal brush (J): paints over blemishes, spots and scratches with texture from elsewhere, in the color and light of the spot.',
    ],
  },
  {
    version: '1.6.0', date: '2026-10-13', items: [
      'Clone tool in the raster app (S): paint with a copy of another part of the image. Tap (or Alt+click) where to copy from, paint the copy, drag the source disc with a finger to move it; aligned or not, with the brush’s size, tip, opacity and pen pressure.',
    ],
  },
  {
    version: '1.5.0', date: '2026-10-13', items: [
      'Quick menu on phones and tablets: double-tap the drawing with a finger for undo, the main tools, colors and size – right where you draw.',
    ],
  },
  {
    version: '1.4.0', date: '2026-10-12', items: [
      'Ellipses and curves in both apps: the Ellipse tool (O, Shift for a circle) and the Curve tool (C) – smooth through the points, smooth near them (B-spline), or cubic and quadratic Bézier.',
      'In the vector app, ellipses and curves stay exact curves: drag their points or axis ends to change them, and paint, cut and mirror them like any tile.',
    ],
  },
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
