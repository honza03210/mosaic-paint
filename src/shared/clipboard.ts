/* Images on the system clipboard, for both apps: copying a PNG (optionally with text alongside, so the
   vector app can paste its own shapes back), and finding an image in a paste. */
import { loadImg } from './ui.ts';

/** Can this browser put images on the clipboard? */
export const canCopyImages = (): boolean =>
  !!(navigator.clipboard && navigator.clipboard.write && typeof ClipboardItem !== 'undefined');

/**
 * Puts a PNG (and optional text) on the clipboard. Call it straight from the key press or click:
 * the PNG may still be a promise, so browsers that need the user's gesture (Safari) accept it.
 */
export async function copyImage(png: Blob | Promise<Blob>, text?: string): Promise<boolean> {
  if (!canCopyImages()) return false;
  const items: Record<string, Blob | Promise<Blob>> = { 'image/png': png };
  if (text) items['text/plain'] = new Blob([text], { type: 'text/plain' });
  try {
    await navigator.clipboard.write([new ClipboardItem(items)]);
    return true;
  } catch {
    return false;
  }
}

/** The image in a paste event, if there is one. */
export function imageFromPaste(e: ClipboardEvent): File | null {
  const dt = e.clipboardData;
  if (!dt) return null;
  for (const f of dt.files || []) if (/^image\//.test(f.type)) return f;
  for (const it of dt.items || []) {
    if (it.kind === 'file' && /^image\//.test(it.type)) {
      const f = it.getAsFile();
      if (f) return f;
    }
  }
  return null;
}

/** Reads the clipboard on request (a Paste button: touch screens have no Ctrl+V). */
export async function readClipboard(): Promise<{ image?: Blob; text?: string }> {
  const cb = navigator.clipboard;
  if (cb && cb.read) {
    try {
      const out: { image?: Blob; text?: string } = {};
      for (const item of await cb.read()) {
        const img = item.types.find(t => /^image\//.test(t));
        if (img && !out.image) out.image = await item.getType(img);
        if (item.types.includes('text/plain') && out.text == null) out.text = await (await item.getType('text/plain')).text();
      }
      return out;
    } catch { /* not allowed: try text */ }
  }
  if (cb && cb.readText) {
    try { return { text: await cb.readText() }; } catch { /* not allowed */ }
  }
  return {};
}

export function canvasToPng(c: HTMLCanvasElement): Promise<Blob> {
  return new Promise((res, rej) => c.toBlob(b => (b ? res(b) : rej(new Error('PNG encoding failed'))), 'image/png'));
}

/** Size of an SVG text from its viewBox (or width / height). */
export function svgSize(svg: string): { w: number; h: number } {
  const vb = /viewBox="\s*[-\d.e]+[\s,]+[-\d.e]+[\s,]+([\d.e]+)[\s,]+([\d.e]+)/.exec(svg);
  if (vb) return { w: +vb[1], h: +vb[2] };
  const w = /\swidth="([\d.]+)/.exec(svg), h = /\sheight="([\d.]+)/.exec(svg);
  return { w: w ? +w[1] : 300, h: h ? +h[1] : 150 };
}
/** Renders SVG text to a canvas whose longer side is `long` pixels. */
export async function svgToCanvas(svg: string, long: number): Promise<HTMLCanvasElement> {
  const { w, h } = svgSize(svg), k = long / Math.max(w, h, 1e-9);
  const W = Math.max(1, Math.round(w * k)), H = Math.max(1, Math.round(h * k));
  // explicit pixel size, so the browser rasterizes the vector shapes at full resolution
  const sized = svg.replace(/<svg\b([^>]*)>/, (m, a) =>
    `<svg${a.replace(/\s(width|height)="[^"]*"/g, '')} width="${W}" height="${H}">`);
  const url = URL.createObjectURL(new Blob([sized], { type: 'image/svg+xml' }));
  try {
    const img = await loadImg(url);
    const c = document.createElement('canvas');
    c.width = W;
    c.height = H;
    c.getContext('2d').drawImage(img, 0, 0, W, H);
    return c;
  } finally {
    URL.revokeObjectURL(url);
  }
}
export async function svgToPng(svg: string, long: number): Promise<Blob> {
  return canvasToPng(await svgToCanvas(svg, long));
}
