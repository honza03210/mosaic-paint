/* The Activity's video compressor dialog: a video from the chat ("Compress video", /compress-video with a file)
   or from the user's device, made small enough for Discord on the device (dist/compress.js, loaded here when
   needed), shown, and posted to the channel as an answer to the user's command. */
import type { Job, Result } from './compress.ts';

type T = (s: string, vars?: Record<string, string | number>) => string;
export interface CompressContext {
  t: T;
  toast(msg: string): void;
  /** posts the video; the answer of the Worker's /api/post */
  post(video: Blob): Promise<Response>;
  /** after posting: the Activity closes */
  done(): void;
}
/** Where the video comes from: the chat (an address the compressor reads in pieces) or a file. */
export type VideoSource = { url: string; name: string; size: number | null } | File;

const MB = 1024 * 1024;
/** Discord's limits: 10 MB for everyone; 20 MB (asked for as the default – the Worker takes up to 25). */
export const TARGETS = [10, 20];

let loading: Promise<{ openVideo(src: Blob | string): Promise<Job> }> | null = null;
/** The compressor's code (Mediabunny, about 450 kB) – only when a video is compressed. */
function compressor(): Promise<{ openVideo(src: Blob | string): Promise<Job> }> {
  if ((window as any).MosaicCompress) return Promise.resolve((window as any).MosaicCompress);
  return loading || (loading = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'dist/compress.js';
    s.onload = () => resolve((window as any).MosaicCompress);
    s.onerror = () => { loading = null; reject(new Error('could not load the compressor')); };
    document.head.append(s);
  }));
}

const mb = (bytes: number) => (bytes / MB).toFixed(bytes < 10 * MB ? 1 : 0) + ' MB';
const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

let dlg: HTMLDialogElement | null = null;
function dialog(t: T): HTMLDialogElement {
  if (dlg) return dlg;
  dlg = document.createElement('dialog');
  dlg.id = 'dlg-compress';
  dlg.innerHTML = `<div class="dlg-head"><h2>${t('Compress a video')}</h2></div>
<p class="note">${t('The video is made smaller on your device, then posted to the channel.')}</p>
<div class="row"><button class="cz-pick">${t('Choose a video…')}</button><input class="cz-file" type="file" accept="video/*" hidden><span class="cz-src note grow"></span></div>
<div class="row"><label>${t('Size')} <select class="cz-target">${TARGETS.map(n => `<option value="${n}"${n === 20 ? ' selected' : ''}>${n} MB</option>`).join('')}</select></label><span class="cz-plan note grow"></span></div>
<div class="addon-progress cz-progress" hidden><progress max="1" value="0"></progress><span class="cz-pct"></span></div>
<video class="cz-result" controls playsinline hidden></video>
<p class="cz-out note"></p>
<div class="row dlg-foot"><button class="cz-close">${t('Close')}</button><button class="cz-go primary" disabled>${t('Compress')}</button><button class="cz-post primary" hidden>${t('Post to the channel')}</button></div>`;
  document.body.append(dlg);
  return dlg;
}

/** Opens the dialog (with a video from the chat, if any). */
export function openCompress(ctx: CompressContext, source: VideoSource | null): void {
  const { t } = ctx, d = dialog(t), q = <E extends Element>(s: string) => d.querySelector(s) as unknown as E;
  const src = q<HTMLElement>('.cz-src'), plan = q<HTMLElement>('.cz-plan'), out = q<HTMLElement>('.cz-out');
  const go = q<HTMLButtonElement>('.cz-go'), post = q<HTMLButtonElement>('.cz-post'), target = q<HTMLSelectElement>('.cz-target');
  const bar = q<HTMLElement>('.cz-progress'), result = q<HTMLVideoElement>('.cz-result');
  let job: Job | null = null, size: number | null = null, made: Result | null = null, busy = false, original: Blob | null = null;

  const reset = () => {
    made = null;
    post.hidden = true;
    go.hidden = false;
    result.hidden = true;
    if (result.src) { URL.revokeObjectURL(result.src); result.removeAttribute('src'); result.load(); }
    out.textContent = '';
  };
  const showPlan = () => {
    reset();
    if (!job) { plan.textContent = ''; go.disabled = true; return; }
    const bytes = +target.value * MB, p = job.plan(bytes);
    go.disabled = false;
    // already small enough: it goes as it is (when it is a file Discord plays)
    if (size !== null && size <= bytes && original) {
      plan.textContent = t('Small enough already – it is posted as it is.');
      go.textContent = t('Use as it is');
      return;
    }
    go.textContent = t('Compress');
    plan.textContent = p.tooLong
      ? t('Too long for {size} MB – the picture would be very poor. Choose the larger size or a shorter video.', { size: target.value })
      : t('→ about {w} × {h}, {rate} Mbit/s', { w: p.width, h: p.height, rate: (p.videoBitrate / 1e6).toFixed(1) });
  };
  const load = async (s: VideoSource) => {
    job?.dispose();
    job = null;
    original = s instanceof File ? s : null;
    size = s instanceof File ? s.size : s.size;
    const name = s.name;
    src.textContent = t('Opening {name}…', { name });
    showPlan();
    try {
      job = await (await compressor()).openVideo(s instanceof File ? s : s.url);
      const i = job.info;
      src.textContent = [name, size !== null ? mb(size) : '', clock(i.duration), `${i.width} × ${i.height}`].filter(Boolean).join(' · ');
    } catch {
      src.textContent = name;
      plan.textContent = t('This video can’t be read here – try another one (MP4, MOV or WebM).');
    }
    showPlan();
  };

  q<HTMLButtonElement>('.cz-pick').onclick = () => q<HTMLInputElement>('.cz-file').click();
  q<HTMLInputElement>('.cz-file').onchange = (e) => {
    const f = (e.target as HTMLInputElement).files?.[0];
    (e.target as HTMLInputElement).value = '';
    if (f) void load(f);
  };
  target.onchange = showPlan;
  go.onclick = async () => {
    if (!job) return;
    const bytes = +target.value * MB;
    if (size !== null && size <= bytes && original) {
      made = { blob: original, type: original.type, ext: /webm/.test(original.type) ? 'webm' : 'mp4', width: job.info.width, height: job.info.height, tries: 0, audio: job.info.hasAudio };
    } else {
      busy = true;
      go.disabled = true;
      bar.hidden = false;
      const pct = q<HTMLElement>('.cz-pct'), progress = q<HTMLProgressElement>('progress');
      try {
        made = await job.run(bytes, (p) => { progress.value = p; pct.textContent = Math.round(p * 100) + ' %'; });
      } catch (e) {
        made = null;
        if (busy) plan.textContent = t('Could not compress the video.') + ' ' + String((e as Error)?.message || '');
      }
      busy = false;
      bar.hidden = true;
      go.disabled = false;
      if (!made) return;
    }
    result.src = URL.createObjectURL(made.blob);
    result.hidden = false;
    const fits = made.blob.size <= bytes;
    out.textContent = (size !== null ? t('{size} (was {before})', { size: mb(made.blob.size), before: mb(size) }) : mb(made.blob.size))
      + (made.audio || !job.info.hasAudio ? '' : ' · ' + t('without sound (this browser can’t make it)'))
      + (fits ? '' : ' · ' + t('still too big – choose the larger size or a shorter video'));
    go.hidden = fits;
    post.hidden = !fits;
  };
  post.onclick = async () => {
    if (!made) return;
    post.disabled = true;
    try {
      const sent = await ctx.post(made.blob);
      if (sent.ok) { ctx.toast(t('Posted to the channel.')); d.close(); ctx.done(); return; }
      ctx.toast(sent.status === 413 ? t('Discord did not take a video this big – try 10 MB.')
        : sent.status === 403 ? t('Use “Compress video” on a message or /compress-video in this chat to post here.')
        : sent.status === 409 ? t('More than 15 minutes have passed, and Discord no longer lets the app post. Run /compress-video again.')
        : t('Discord did not take the video.'));
    } catch {
      ctx.toast(t('Could not reach the server.'));
    }
    post.disabled = false;
  };
  q<HTMLButtonElement>('.cz-close').onclick = () => d.close();
  d.onclose = () => { if (busy) { busy = false; job?.cancel(); } };
  reset();
  plan.textContent = '';
  src.textContent = source ? '' : t('Choose a video from your device.');
  go.disabled = true;
  if (!d.open) d.showModal();
  if (source) void load(source);
}
