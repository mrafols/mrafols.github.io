// The previous worker intercepted every request and precached the large
// images. After a deploy it kept serving the old page and its install
// could hang (a missing file fails the whole cache), so the site stayed
// slow for anyone who had visited before. This version only clears that
// cache and unregisters itself.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));
    const windows = await self.clients.matchAll({ type: 'window' });
    await self.clients.claim();
    await Promise.all(windows.map((client) => client.navigate(client.url)));
    await self.registration.unregister();
  })());
});
