/* Choosing a frame: an animated GIF or a video (also Tenor / Giphy "GIFs", which are videos) opens as one of
   its pictures – the user picks which with a slider, frame steps and play / pause. GIFs are read here
   (src/lib/gif.ts: every browser the same); the dialog shows small copies, and only the chosen frame is made
   at full size. Videos play in a <video>. Shared by both apps. */
import { decodeGif } from '../lib/gif.ts';
import { t } from './i18n.ts';
import { toast } from './ui.ts';

/** A GIF or a video (by its type, or its name when the type is missing). */
export const isMotion = (b: Blob, name = ''): boolean => /^video\//.test(b.type) || b.type === 'image/gif' || /\.(gif|mp4|webm|mov|m4v)$/i.test(name);
const isVideo = (b: Blob, name: string) => /^video\//.test(b.type) || /\.(mp4|webm|mov|m4v)$/i.test(name);

const PREVIEW = 480;
const canvasOf = (w: number, h: number) => { const c = document.createElement('canvas'); c.width = Math.max(1, w); c.height = Math.max(1, h); return c; };

interface Source {
  count: number;
  /** seconds (video) or frame number (GIF) of position i */
  label(i: number): string;
  /** shows position i on the preview canvas */
  show(i: number): Promise<void>;
  /** ms until the next position when playing */
  delay(i: number): number;
  /** the full-size picture at position i */
  take(i: number): Promise<HTMLCanvasElement>;
  close(): void;
}

async function gifSource(bytes: Uint8Array, view: HTMLCanvasElement): Promise<Source | HTMLCanvasElement> {
  // first pass: small copies of every frame (a long GIF would take too much memory at full size)
  // (the size, from the GIF's header)
  const W = bytes[6] | (bytes[7] << 8), H = bytes[8] | (bytes[9] << 8), k = Math.min(1, PREVIEW / Math.max(W, H, 1));
  const small: ImageBitmap[] = [], delays: number[] = [], work: Promise<void>[] = [];
  const g = decodeGif(bytes, (rgba, delay, i) => {
    delays[i] = delay;
    work.push(createImageBitmap(new ImageData(rgba.slice(), W, H), { resizeWidth: Math.max(1, Math.round(W * k)), resizeHeight: Math.max(1, Math.round(H * k)), resizeQuality: 'medium' }).then((b) => { small[i] = b; }));
  });
  await Promise.all(work);
  const full = (i: number) => {
    let out: HTMLCanvasElement | null = null;
    decodeGif(bytes, (rgba, _d, k) => {
      if (k !== i) return false;
      out = canvasOf(W, H);
      out.getContext('2d').putImageData(new ImageData(rgba.slice(), W, H), 0, 0);
      return true;
    });
    return out as HTMLCanvasElement;
  };
  // a still GIF: no need to choose
  if (g.frames.length < 2) return full(0);
  view.width = small[0].width;
  view.height = small[0].height;
  return {
    count: g.frames.length,
    label: (i) => t('Frame {n} of {count}', { n: i + 1, count: g.frames.length }),
    async show(i) { view.getContext('2d').clearRect(0, 0, view.width, view.height); view.getContext('2d').drawImage(small[i], 0, 0); },
    delay: (i) => Math.max(20, delays[i] || 100),
    async take(i) { return full(i); },
    close() { for (const b of small) b.close(); },
  };
}

/** A video: loads it (from the blob, or from src when the page may not play blobs – Discord) and seeks in it. */
function videoSource(blob: Blob, src: string | undefined, video: HTMLVideoElement): Promise<Source> {
  const url = URL.createObjectURL(blob);
  const tryLoad = (s: string) => new Promise<void>((resolve, reject) => {
    video.onloadeddata = () => resolve();
    video.onerror = () => reject(new Error('cannot play'));
    video.src = s;
    video.load();
  });
  return tryLoad(url).catch(() => (src ? tryLoad(src) : Promise.reject(new Error('cannot play')))).then(async () => {
    // a video that doesn't say how long it is (recorded in a browser): seeking far makes it find out
    if (!isFinite(video.duration)) {
      await new Promise<void>((resolve) => {
        const done = () => { if (isFinite(video.duration)) { video.ondurationchange = null; resolve(); } };
        video.ondurationchange = done;
        video.currentTime = 1e7;
        setTimeout(resolve, 3000);
      });
      video.currentTime = 0;
    }
    const fps = 30, d = isFinite(video.duration) && video.duration > 0 ? video.duration : 0, count = Math.max(1, Math.floor(d * fps));
    const seek = (i: number) => new Promise<void>((resolve) => {
      const tm = Math.min(Math.max(0, d - 0.001), i / fps);
      if (Math.abs(video.currentTime - tm) < 1e-3) { resolve(); return; }
      video.onseeked = () => resolve();
      video.currentTime = tm;
    });
    return {
      count,
      label: (i) => t('{s} s of {total} s', { s: (i / fps).toFixed(2), total: d.toFixed(1) }),
      show: seek,
      delay: () => 1000 / fps,
      async take(i) {
        await seek(i);
        const c = canvasOf(video.videoWidth, video.videoHeight);
        c.getContext('2d').drawImage(video, 0, 0);
        return c;
      },
      close() { video.removeAttribute('src'); video.load(); URL.revokeObjectURL(url); },
    };
  });
}

let dlg: HTMLDialogElement | null = null;
function dialog(): HTMLDialogElement {
  if (dlg) return dlg;
  dlg = document.createElement('dialog');
  dlg.id = 'dlg-frame';
  dlg.innerHTML = `<div class="dlg-head"><h2>${t('Choose a frame')}</h2></div>
<div class="fr-stage"><canvas class="fr-canvas"></canvas><video class="fr-video" muted playsinline preload="auto"></video></div>
<input class="fr-slider" type="range" min="0" step="1" aria-label="${t('Frame')}">
<div class="row fr-controls">
  <button class="fr-prev" title="${t('One frame back')}" aria-label="${t('One frame back')}">◀</button>
  <button class="fr-play" title="${t('Play / pause')}" aria-label="${t('Play / pause')}">▶</button>
  <button class="fr-next" title="${t('One frame on')}" aria-label="${t('One frame on')}">▶▏</button>
  <span class="fr-label note grow"></span>
</div>
<div class="row dlg-foot"><button class="fr-cancel">${t('Cancel')}</button><button class="fr-ok primary">${t('Use this frame')}</button></div>`;
  document.body.append(dlg);
  return dlg;
}

/**
 * Lets the user choose a frame of a GIF or a video; resolves with it at full size (null: cancelled or not
 * playable). A GIF with one frame comes back at once. src: where the video can also be loaded from.
 */
export async function chooseFrame(blob: Blob, name: string, o: { src?: string } = {}): Promise<HTMLCanvasElement | null> {
  const d = dialog(), q = <T extends Element>(s: string) => d.querySelector(s) as unknown as T;
  const view = q<HTMLCanvasElement>('.fr-canvas'), video = q<HTMLVideoElement>('.fr-video'), slider = q<HTMLInputElement>('.fr-slider');
  const vid = isVideo(blob, name);
  view.hidden = vid;
  video.hidden = !vid;
  let src: Source;
  try {
    if (vid) src = await videoSource(blob, o.src, video);
    else {
      const s = await gifSource(new Uint8Array(await blob.arrayBuffer()), view);
      if (s instanceof HTMLCanvasElement) return s;
      src = s;
    }
  } catch {
    toast(vid ? t('This video can’t be played here – try a GIF or a screenshot of it.') : t('Could not read {name} as an image.', { name }));
    return null;
  }
  let i = 0, playing = false, timer = 0;
  const go = async (k: number) => {
    i = Math.max(0, Math.min(src.count - 1, k));
    slider.value = String(i);
    q<HTMLElement>('.fr-label').textContent = src.label(i);
    await src.show(i);
  };
  const stop = () => { playing = false; clearTimeout(timer); q<HTMLElement>('.fr-play').textContent = '▶'; };
  const tick = async () => {
    if (!playing) return;
    await go(i + 1 >= src.count ? 0 : i + 1);
    timer = window.setTimeout(tick, src.delay(i));
  };
  slider.max = String(src.count - 1);
  slider.oninput = () => { stop(); go(+slider.value); };
  q<HTMLElement>('.fr-prev').onclick = () => { stop(); go(i - 1); };
  q<HTMLElement>('.fr-next').onclick = () => { stop(); go(i + 1); };
  q<HTMLElement>('.fr-play').onclick = () => { if (playing) stop(); else { playing = true; q<HTMLElement>('.fr-play').textContent = '❚❚'; tick(); } };
  await go(0);
  const pick = await new Promise<boolean>((resolve) => {
    const answer = (yes: boolean) => () => { d.oncancel = null; d.close(); resolve(yes); };
    q<HTMLElement>('.fr-ok').onclick = answer(true);
    q<HTMLElement>('.fr-cancel').onclick = answer(false);
    d.oncancel = answer(false);
    d.showModal();
  });
  stop();
  try { return pick ? await src.take(i) : null; } finally { src.close(); }
}
