// Increment version to bust old cache
const CACHE_NAME = 'love-today-v5';

// Only cache essential static assets — NOT index.html so updates work
const ASSETS = [
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network first for HTML — always get fresh version
// Cache first only for static assets
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Always fetch HTML fresh from network
  if (event.request.destination === 'document' || url.pathname.endsWith('.html')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // For Firebase/Google CDN requests — always network (never cache)
  if (url.hostname.includes('googleapis.com') || 
      url.hostname.includes('firestore.googleapis.com') ||
      url.hostname.includes('gstatic.com')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // For other assets — cache first
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      });
    })
  );
});
