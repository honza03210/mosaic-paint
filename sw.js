/* Mosaic Paint – service worker: keeps a copy of the app so it also runs offline.
   Network first, so updates arrive as soon as you're online; the cache is the fallback. */
const CACHE = 'mosaic-paint-v3';
const FILES = [
  './', 'index.html', 'style.css', 'manifest.webmanifest',
  'js/colors.js', 'js/geometry.js', 'js/patterns.js', 'js/store.js', 'js/print.js', 'js/app.js', 'js/features.js',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req)
      .then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('index.html'))),
  );
});
