/* Small HTML helpers, for pages and for the pure modules that write HTML or SVG. */

/** Text made safe to put into HTML or an attribute value. */
export const esc = (s: unknown): string => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
