/* Icons for the buttons that show a symbol (outlines in the text color – class "ic"). The pages have them
   written in (raster.html, index.html: the same drawings); scripts take them from here. */
const svg = (body: string) => `<svg class="ic" viewBox="0 0 20 20" aria-hidden="true">${body}</svg>`;

export const ICONS = {
  undo: svg('<path d="M7.5 4.5l-4 4 4 4"/><path d="M3.5 8.5h8.25a4.25 4.25 0 0 1 0 8.5H9"/>'),
  redo: svg('<path d="M12.5 4.5l4 4-4 4"/><path d="M16.5 8.5H8.25a4.25 4.25 0 0 0 0 8.5H11"/>'),
  zoomOut: svg('<circle cx="8.5" cy="8.5" r="5.5"/><path d="M12.6 12.6l4.4 4.4M6 8.5h5"/>'),
  zoomIn: svg('<circle cx="8.5" cy="8.5" r="5.5"/><path d="M12.6 12.6l4.4 4.4M6 8.5h5M8.5 6v5"/>'),
  fit: svg('<path d="M3 7.5V3h4.5M12.5 3H17v4.5M17 12.5V17h-4.5M7.5 17H3v-4.5"/>'),
  help: svg('<circle cx="10" cy="10" r="7.5"/><path d="M7.7 7.8a2.4 2.4 0 1 1 3.3 2.2c-.6.3-1 .8-1 1.5v.5"/><circle cx="10" cy="14.4" r=".5" class="dot"/>'),
  panel: svg('<path d="M3 5.5h14M3 10h14M3 14.5h14"/>'),
  adjust: svg('<path d="M4 4v12M10 4v12M16 4v12"/><circle cx="4" cy="12" r="1.8" class="knob"/><circle cx="10" cy="7" r="1.8" class="knob"/><circle cx="16" cy="13" r="1.8" class="knob"/>'),
  importImage: svg('<rect x="3" y="4" width="14" height="12" rx="1.5"/><path d="M3 13l4-4 3 3 2-2 5 5"/><path d="M14 1v6M11 4h6"/>'),
  close: svg('<path d="M5 5l10 10M15 5L5 15"/>'),
};
