/* Compressing a video on the user's device so it fits Discord's size limit (dist/compress.js, loaded by the
   Activity only when a video is compressed). Mediabunny reads the video (MP4, MOV, WebM, MKV), the browser's
   own encoders (WebCodecs) make it again – H.264 + AAC in MP4 where the browser has them, else VP9 / VP8 +
   Opus in WebM – at the bitrate and size the target allows (src/lib/video-plan.ts). If a try still comes out
   too big, it is made once more at a lower bitrate. Nothing is uploaded until the result is posted. */
import {
  Input, MP4, QTFF, WEBM, MATROSKA, BlobSource, UrlSource, Output, Mp4OutputFormat, WebMOutputFormat, BufferTarget, Conversion, Quality,
  getFirstEncodableVideoCodec, getFirstEncodableAudioCodec, type VideoCodec, type AudioCodec,
} from 'mediabunny';
import { planVideo, retryBitrate, type VideoPlan } from '../lib/video-plan.ts';

export interface VideoInfo { duration: number; width: number; height: number; hasAudio: boolean; fps: number | null }
export interface Result { blob: Blob; type: string; ext: 'mp4' | 'webm'; width: number; height: number; tries: number; audio: boolean }
export interface Job {
  info: VideoInfo;
  /** what the target size gives (before compressing) */
  plan(targetBytes: number): VideoPlan;
  /** progress: 0…1 over all tries */
  run(targetBytes: number, onProgress: (p: number) => void): Promise<Result>;
  cancel(): void;
  dispose(): void;
}

/** The output formats the browser can make: H.264 in MP4 (plays everywhere Discord runs), else VP9 / VP8 in WebM. */
async function codecs(width: number, height: number, bitrate: number): Promise<{ video: VideoCodec; audio: AudioCodec | null; ext: 'mp4' | 'webm' } | null> {
  const q = new Quality({ bitrate });
  const avc = await getFirstEncodableVideoCodec(['avc'], { width, height, quality: q });
  if (avc) return { video: avc, audio: await getFirstEncodableAudioCodec(['aac', 'opus']), ext: 'mp4' };
  const vp = await getFirstEncodableVideoCodec(['vp9', 'vp8'], { width, height, quality: q });
  if (vp) return { video: vp, audio: await getFirstEncodableAudioCodec(['opus', 'vorbis']), ext: 'webm' };
  return null;
}

/** Opens a video (a file, or an address that answers byte ranges). */
export async function openVideo(src: Blob | string): Promise<Job> {
  const input = new Input({ source: typeof src === 'string' ? new UrlSource(src) : new BlobSource(src), formats: [MP4, QTFF, WEBM, MATROSKA] });
  const vt = await input.getPrimaryVideoTrack();
  if (!vt) { input.dispose(); throw new Error('no video'); }
  const at = await input.getPrimaryAudioTrack();
  const duration = await input.computeDuration();
  let fps: number | null = null;
  try { fps = (await vt.computePacketStats(120)).averagePacketRate || null; } catch { /* unknown */ }
  const info: VideoInfo = { duration, width: vt.displayWidth, height: vt.displayHeight, hasAudio: !!at, fps };
  let current: Conversion | null = null, cancelled = false;

  async function once(plan: VideoPlan, onProgress: (p: number) => void): Promise<Omit<Result, 'tries'>> {
    const c = await codecs(plan.width, plan.height, plan.videoBitrate);
    if (!c) throw new Error('This browser can’t make videos (no video encoder).');
    const target = new BufferTarget();
    const output = new Output({ format: c.ext === 'mp4' ? new Mp4OutputFormat({ fastStart: 'in-memory' }) : new WebMOutputFormat(), target });
    const audio = !!(info.hasAudio && c.audio);
    current = await Conversion.init({
      input, output, tracks: 'primary', showWarnings: false,
      video: { width: plan.width, height: plan.height, fit: 'contain', codec: c.video, quality: new Quality({ bitrate: plan.videoBitrate, bitrateMode: 'variable' }), forceTranscode: true, ...(plan.frameRate ? { frameRate: plan.frameRate } : {}) },
      // no encoder for the sound: the video goes without it (said in the dialog)
      audio: audio ? { codec: c.audio, quality: new Quality({ bitrate: plan.audioBitrate }), forceTranscode: true } : { discard: true },
    });
    if (!current.isValid) throw new Error('This video can’t be converted here.');
    current.onProgress = (p) => onProgress(p);
    await current.execute();
    current = null;
    const type = c.ext === 'mp4' ? 'video/mp4' : 'video/webm';
    return { blob: new Blob([target.buffer], { type }), type, ext: c.ext, width: plan.width, height: plan.height, audio };
  }

  return {
    info,
    plan: (bytes) => planVideo(bytes, info.duration, info.width, info.height, info.hasAudio, info.fps),
    async run(targetBytes, onProgress) {
      cancelled = false;
      let plan = planVideo(targetBytes, info.duration, info.width, info.height, info.hasAudio, info.fps);
      // up to three tries: the first usually fits; an encoder that overshoots gets a lower bitrate
      for (let tries = 1; ; tries++) {
        const r = await once(plan, (p) => onProgress(Math.min(0.99, (tries - 1 + p) / Math.max(tries, 2))));
        if (r.blob.size <= targetBytes || tries === 3 || cancelled) { onProgress(1); return { ...r, tries }; }
        plan = { ...plan, videoBitrate: retryBitrate(plan, r.blob.size, targetBytes, info.duration) };
      }
    },
    cancel() { cancelled = true; void current?.cancel(); },
    dispose() { input.dispose(); },
  };
}

(window as any).MosaicCompress = { openVideo };
