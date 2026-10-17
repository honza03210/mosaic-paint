/* How to make a video fit a file size: the bitrate the size allows for its length, shared between picture and
   sound, and the resolution and frame rate that bitrate can carry well. Pure functions (tests run them in Node). */

export interface VideoPlan {
  /** bits per second */
  videoBitrate: number;
  audioBitrate: number;
  /** the output size (even numbers – H.264 needs them) */
  width: number;
  height: number;
  /** a lower frame rate (a 60 fps clip at a low bitrate), or null to keep the video's own */
  frameRate: number | null;
  /** so long for the size that the picture would be mush */
  tooLong: boolean;
}

/** What is kept back from the size: the container, and the encoder going a little over. */
export const MARGIN = 0.92;
/** The lowest video bitrate still worth making. */
export const MIN_VIDEO_BITRATE = 120_000;

const even = (n: number) => Math.max(2, Math.round(n / 2) * 2);

/**
 * The plan for a video of this length (s) and size (px) to come out at about targetBytes. Never larger than
 * the original; the longest side goes down as the bitrate does (1080p needs about 4 Mbit/s to look good).
 */
export function planVideo(targetBytes: number, duration: number, width: number, height: number, hasAudio: boolean, fps: number | null = null): VideoPlan {
  const total = targetBytes * 8 * MARGIN / Math.max(0.1, duration);
  const audioBitrate = !hasAudio ? 0 : total >= 2_000_000 ? 128_000 : total >= 600_000 ? 96_000 : total >= 250_000 ? 64_000 : 32_000;
  const videoBitrate = Math.max(MIN_VIDEO_BITRATE / 2, Math.round(total - audioBitrate));
  const side = videoBitrate >= 4_000_000 ? 1920 : videoBitrate >= 1_800_000 ? 1280 : videoBitrate >= 800_000 ? 854 : videoBitrate >= 400_000 ? 640 : 480;
  const k = Math.min(1, side / Math.max(width, height, 1));
  const frameRate = fps && fps > 31 && videoBitrate < 2_500_000 ? 30 : null;
  return { videoBitrate, audioBitrate, width: even(width * k), height: even(height * k), frameRate, tooLong: videoBitrate < MIN_VIDEO_BITRATE };
}

/** After a try that came out too big: the next video bitrate, so the file shrinks to the target (with a bit to spare). */
export function retryBitrate(plan: VideoPlan, gotBytes: number, targetBytes: number, duration: number): number {
  const audioBytes = plan.audioBitrate * duration / 8, videoBytes = Math.max(1, gotBytes - audioBytes);
  const want = Math.max(1, targetBytes * 0.97 - audioBytes);
  return Math.max(MIN_VIDEO_BITRATE / 2, Math.round(plan.videoBitrate * want / videoBytes * 0.95));
}
