/* Mosaic Paint – the vector app as a Discord Activity: what the Activity script (src/discord/activity.ts,
   loaded here only inside Discord) needs from the app. A picture from the chat opens as a new drawing of
   its size with the picture as the photo layer (fully visible), to draw on; what is posted back is the
   drawing with the photo under it. */
import { MZ } from '../core/api.ts';
import { loadPhoto, refImage, renderPhotoUI } from '../core/photo.ts';
import { svgToCanvas, canvasToPng } from '../shared/clipboard.ts';
import { t } from '../shared/i18n.ts';
import { isMotion, chooseFrame } from '../shared/frames.ts';

/** Largest side of a picture opened from the chat (as the photo layer keeps it). */
const MAX = 2400;

Object.assign(MZ, {
  async openImage(blob: Blob, name: string, o: { src?: string } = {}): Promise<void> {
    // a GIF or a video: the frame the user chooses
    if (isMotion(blob, name)) {
      const c = await chooseFrame(blob, name, o);
      if (!c) return;
      blob = await canvasToPng(c);
      name = name.replace(/\.[a-z0-9]+$/i, '') + '.png';
    }
    const url = URL.createObjectURL(blob);
    let w: number, h: number;
    try {
      const img = await MZ.loadImg(url), k = Math.min(1, MAX / Math.max(img.naturalWidth, img.naturalHeight));
      w = Math.max(1, Math.round(img.naturalWidth * k));
      h = Math.max(1, Math.round(img.naturalHeight * k));
    } catch { MZ.toast(t('Could not read that image.')); return; } finally { URL.revokeObjectURL(url); }
    // a new drawing the size of the picture (in pixels); the current one is kept in History
    const page = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"></svg>`;
    if (!await MZ.openText(page, name.replace(/\.[a-z0-9]+$/i, '') + '.svg')) return;
    await loadPhoto(blob);
    // drawn on, not traced: the picture fully visible
    MZ.state.refOpacity = 1;
    const im = refImage();
    if (im) im.style.opacity = '1';
    renderPhotoUI();
  },
  /** The drawing with the photo under it, as a PNG (pixel drawings at their size, others 2000 px wide). */
  async png(): Promise<Blob> {
    const d = MZ.state.doc;
    const svg = MZ.buildSVGString({ photo: true, grout: MZ.state.grout.on, pageOnly: true })
      .replace(/(<g id="mosaic-reference")[^>]*>/, '$1>'); // the photo, hidden in saved files, shows here
    const long = MZ.unit() === 'px' ? Math.round(Math.max(d.w, d.h)) : 2000;
    return canvasToPng(await svgToCanvas(svg, long));
  },
  t,
});

// inside Discord (an Activity): the part that talks to Discord, loaded only there
if (location.hostname.endsWith('discordsays.com') || (window as any).__discordSdk) {
  const s = document.createElement('script');
  s.src = 'dist/activity.js';
  document.head.append(s);
}
