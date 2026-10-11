/* Packing a drawing into text that fits in a URL: deflate-compressed, base64url. Works in browsers and Node. */

const b64url = (bytes: Uint8Array): string => {
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + 0x8000)));
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};
const fromB64url = (s: string): Uint8Array => {
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/'));
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
};
const pipe = async (bytes: Uint8Array, stream: { readable: ReadableStream; writable: WritableStream }): Promise<Uint8Array> =>
  new Uint8Array(await new Response(new Blob([bytes as BlobPart]).stream().pipeThrough(stream)).arrayBuffer());

/** 'z…' = deflate-compressed, 'u…' = plain (browsers without CompressionStream). */
export async function pack(text: string): Promise<string> {
  const bytes = new TextEncoder().encode(text);
  if (typeof CompressionStream !== 'undefined') return 'z' + b64url(await pipe(bytes, new CompressionStream('deflate-raw')));
  return 'u' + b64url(bytes);
}
export async function unpack(s: string): Promise<string> {
  const bytes = fromB64url(s.slice(1));
  return new TextDecoder().decode(s[0] === 'z' ? await pipe(bytes, new DecompressionStream('deflate-raw')) : bytes);
}
/** Bytes that are already compressed (a PNG) as link text: 'p…'. */
export const packBytes = (bytes: Uint8Array): string => 'p' + b64url(bytes);
export const unpackBytes = (s: string): Uint8Array => fromB64url(s.slice(1));
