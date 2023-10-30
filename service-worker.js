// service-worker.js
self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('my-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/manifest.json',
          // Ajoutez ici d'autres fichiers statiques à mettre en cache
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (e) => {
    e.respondWith(
      caches.match(e.request).then((response) => {
        return response || fetch(e.request);
      })
    );
  });
  