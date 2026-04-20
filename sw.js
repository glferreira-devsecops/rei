importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

if (workbox) {
  console.log(`[DarkForge-X V99] Workbox operacional. O asfalto foi digitalizado.`);

  // Forçar ativação imediata do SW (Bypass Waiting) na rua não tem tempo a perder.
  workbox.core.skipWaiting();
  workbox.core.clientsClaim();

  // Cache First para o App Shell (Imagens e Fontes) - Foco em Fricção Zero
  workbox.routing.registerRoute(
    ({request}) => request.destination === 'image' || request.destination === 'font',
    new workbox.strategies.CacheFirst({
      cacheName: 'celtinha-assets-v1',
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({ statuses: [0, 200] }),
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 30, // Segura o peso do aparelho
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Dias
        }),
      ],
    })
  );

  // JS e CSS sempre atualizados (NetworkFirst) para evitar "Cache-Trap" da lógica de negócios.
  // Se o JS ficar stale, o cliente poderia fechar carrinho com o Preço Antigo! (Dessincronia Logística)
  workbox.routing.registerRoute(
    ({request}) => request.destination === 'script' || request.destination === 'style',
    new workbox.strategies.NetworkFirst({
      cacheName: 'celtinha-logic-v2',
      networkTimeoutSeconds: 3, // Vai pra Rede primeiro, se for túnel cai pro cache
    })
  );

  // Fallback de Rede para a Página Principal (Network First, Cache Fallback)
  workbox.routing.registerRoute(
    ({request}) => request.mode === 'navigate',
    new workbox.strategies.NetworkFirst({
      cacheName: 'celtinha-html-v1',
      networkTimeoutSeconds: 3, // 3s ou puxa do cache (Se o 4G morrer, ainda vendemos)
    })
  );
} else {
  console.error(`[Aviso] Falha ao carregar a máquina no Service Worker.`);
}
