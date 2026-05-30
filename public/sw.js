const CACHE_NAME = 'masti-music-v1';
const scopeUrl = new URL(self.registration.scope);
const appShell = ['', 'manifest.json', 'icon.svg'].map((path) => new URL(path, scopeUrl).toString());

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(appShell)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).catch(() => caches.match(scopeUrl.toString()))));
});
