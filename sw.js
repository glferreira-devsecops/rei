importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

// ==========================================================================
// V99 SERVICE WORKER — Cache Versioning + Auto-Purge + Force-Reload
// ==========================================================================
const CACHE_VERSION = 'v3';
const EXPECTED_CACHES = [
  `celtinha-assets-${CACHE_VERSION}`,
  `celtinha-logic-${CACHE_VERSION}`,
  `celtinha-html-${CACHE_VERSION}`
];

if (workbox) {
  console.log(`[DarkForge-X V99] Workbox operacional. Cache ${CACHE_VERSION}.`);

  workbox.core.skipWaiting();
  workbox.core.clientsClaim();

  // Cache First: Imagens e Fontes (Assets estáticos)
  workbox.routing.registerRoute(
    ({request}) => request.destination === 'image' || request.destination === 'font',
    new workbox.strategies.CacheFirst({
      cacheName: `celtinha-assets-${CACHE_VERSION}`,
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({ statuses: [0, 200] }),
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 30,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ],
    })
  );

  // Network First: JS e CSS (Lógica de negócios — preço nunca pode ficar stale)
  workbox.routing.registerRoute(
    ({request}) => request.destination === 'script' || request.destination === 'style',
    new workbox.strategies.NetworkFirst({
      cacheName: `celtinha-logic-${CACHE_VERSION}`,
      networkTimeoutSeconds: 3,
    })
  );

  // Network First: HTML Navigation
  workbox.routing.registerRoute(
    ({request}) => request.mode === 'navigate',
    new workbox.strategies.NetworkFirst({
      cacheName: `celtinha-html-${CACHE_VERSION}`,
      networkTimeoutSeconds: 3,
    })
  );
} else {
  console.error(`[Aviso] Falha ao carregar a máquina no Service Worker.`);
}

// ==========================================================================
// ACTIVATE: Purge stale caches + Force-reload clientes com versão antiga
// Garante que NINGUÉM fique preso com o JS quebrado no cache.
// ==========================================================================
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => {
        const staleCaches = keys.filter(k => !EXPECTED_CACHES.includes(k));
        const hadStale = staleCaches.length > 0;
        if (hadStale) {
          console.log(`[V99 SW] Purgando ${staleCaches.length} caches stale:`, staleCaches);
        }
        return Promise.all(staleCaches.map(k => caches.delete(k)))
          .then(() => hadStale);
      })
      .then(hadStale => {
        return self.clients.claim().then(() => hadStale);
      })
      .then(hadStale => {
        if (!hadStale) return;
        // Force-reload TODOS os clientes que tinham cache stale
        return self.clients.matchAll({ type: 'window' }).then(windowClients => {
          windowClients.forEach(client => {
            if (client.url && 'navigate' in client) {
              client.navigate(client.url);
            }
          });
        });
      })
  );
});
