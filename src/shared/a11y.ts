/* Accessible names for buttons that show only a symbol (↑ ↓ ✕ ☰ ★ ✎ ? …): their tooltip becomes what a
   screen reader says, also for buttons added later and when a tooltip changes. Imported by both apps. */

const SYMBOLS = /^[^\p{L}\p{N}]{1,3}$/u;

function label(b: Element): void {
  if (b.tagName !== 'BUTTON') return;
  const title = b.getAttribute('title');
  if (title && SYMBOLS.test((b.textContent || '').trim())) b.setAttribute('aria-label', title);
}
function labelAll(root: ParentNode): void {
  if (root instanceof Element && root.matches('button')) label(root);
  root.querySelectorAll?.('button[title]').forEach(label);
}

labelAll(document.body);
new MutationObserver((changes) => {
  for (const c of changes) {
    if (c.type === 'attributes') label(c.target as Element);
    else c.addedNodes.forEach(n => { if (n instanceof Element) labelAll(n); });
  }
}).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['title'] });
