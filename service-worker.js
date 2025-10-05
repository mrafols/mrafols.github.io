const CACHE_NAME = 'marc-rafols-portfolio-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/manifest.json',
  '/assets/img/profile-img.jpg',
  '/assets/img/hero-bg.jpg',
  '/assets/img/apple-touch-icon.png',
  '/assets/img/favicon.png',
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

// Fetch Strategy: Network First, fallback to Cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone the response
        const responseClone = response.clone();
        
        // Cache the fetched response
        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseClone);
          });
        
        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(event.request)
          .then(response => {
            if (response) {
              return response;
            }
            
            // If no cache, return offline page
            if (event.request.destination === 'document') {
              return caches.match('/index.html');
            }
          });
      })
  );
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


