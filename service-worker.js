const CACHE_NAME = 'marc-rafols-portfolio-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/manifest.json',
  '/assets/fonts/inter-latin.woff2',
  '/assets/fonts/firacode-latin.woff2',
  '/assets/img/illustrated-avatar.webp',
  '/assets/img/hero-bg.jpg',
  '/assets/img/apple-touch-icon.png',
  '/assets/img/favicon-32x32.png',
  '/assets/img/companies/hornetsecurity.png',
  '/assets/img/companies/leadtech-group.png',
  '/assets/img/companies/privalia.png',
  '/assets/img/companies/social-point.png',
  '/assets/img/companies/ecoburo-consulting.png',
  '/assets/img/companies/fhios-smart-knowledge.png',
  '/assets/img/companies/incubio.png',
  '/assets/img/companies/mediacloud.png',
  '/assets/img/companies/monlau-centro-de-estudios.png',
  '/assets/img/companies/monlau-corporate.png',
  '/assets/img/companies/saboredo-sa.png',
  '/assets/img/companies/upc.png'
];

// Install Service Worker
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Service Worker
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

function isCacheable(response) {
  return response && response.ok && response.type === 'basic';
}

// Documents: network first so content updates show up, with the cached page as fallback.
async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);
    if (isCacheable(response)) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    const cached = await cache.match(request);
    return cached || cache.match('/index.html');
  }
}

// Static assets: serve the cached copy immediately and refresh it in the background.
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then(response => {
      if (isCacheable(response)) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached);

  return cached || network;
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  let url;
  try {
    url = new URL(request.url);
  } catch (err) {
    return;
  }
  // Leave fonts, analytics and other third parties to the browser.
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(request));
});

// Background Sync
self.addEventListener('sync', event => {
  if (event.tag === 'sync-messages') {
    event.waitUntil(syncMessages());
  }
});

async function syncMessages() {
  // Placeholder for background sync functionality
  console.log('Background sync: Messages');
}

// Push Notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'Nueva notificación',
    icon: '/assets/img/icon-192x192.png',
    badge: '/assets/img/favicon-96x96.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver más',
        icon: '/assets/img/favicon-32x32.png'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: '/assets/img/favicon-32x32.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Marc Ràfols Portfolio', options)
  );
});

// Notification Click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message Handler
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Periodic Background Sync (if supported)
self.addEventListener('periodicsync', event => {
  if (event.tag === 'update-portfolio') {
    event.waitUntil(updatePortfolio());
  }
});

async function updatePortfolio() {
  // Placeholder for periodic updates
  console.log('Periodic sync: Update portfolio');
}


