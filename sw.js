// Service Worker for Marc Ràfols Portfolio
// Version 1.0.0

const CACHE_NAME = 'marc-portfolio-v1';
const STATIC_CACHE_NAME = 'marc-portfolio-static-v1';
const DYNAMIC_CACHE_NAME = 'marc-portfolio-dynamic-v1';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/index.html',
  '/experience.html',
  '/contact.html',
  '/assets/css/style.css',
  '/assets/js/main.js',
  '/assets/js/language.js',
  '/assets/img/profile-img.jpg',
  '/assets/img/hero-bg.jpg',
  // Fallback for offline
  '/offline.html'
];

// External resources to cache
const EXTERNAL_RESOURCES = [
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Spline+Sans:wght@400;500;700',
  'https://fonts.googleapis.com/css2?family=Material+Icons'
];

// Install event - cache static files
self.addEventListener('install', event => {
  console.log('[SW] Installing Service Worker');
  
  event.waitUntil(
    Promise.all([
      // Cache static files
      caches.open(STATIC_CACHE_NAME).then(cache => {
        console.log('[SW] Caching static files');
        return cache.addAll(STATIC_FILES.filter(url => url !== '/offline.html'));
      }),
      // Create offline fallback
      caches.open(DYNAMIC_CACHE_NAME).then(cache => {
        console.log('[SW] Creating offline fallback');
        return cache.add('/offline.html');
      })
    ]).then(() => {
      console.log('[SW] Installation complete');
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating Service Worker');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Activation complete');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Handle navigation requests (HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache successful responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE_NAME).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Serve from cache or offline fallback
          return caches.match(request).then(cachedResponse => {
            return cachedResponse || caches.match('/offline.html');
          });
        })
    );
    return;
  }
  
  // Handle static assets
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        
        return fetch(request).then(response => {
          // Cache successful responses
          if (response.status === 200) {
            const responseClone = response.clone();
            const cacheToUse = STATIC_FILES.includes(url.pathname) ? STATIC_CACHE_NAME : DYNAMIC_CACHE_NAME;
            
            caches.open(cacheToUse).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return response;
        });
      })
    );
    return;
  }
  
  // Handle external resources (fonts, CDN)
  if (url.hostname === 'fonts.googleapis.com' || 
      url.hostname === 'fonts.gstatic.com' || 
      url.hostname === 'cdn.tailwindcss.com') {
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        return cachedResponse || fetch(request).then(response => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE_NAME).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return response;
        });
      })
    );
    return;
  }
});

// Background sync for form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'contact-form') {
    event.waitUntil(
      // Handle offline form submissions when back online
      handleOfflineFormSubmissions()
    );
  }
});

// Handle offline form submissions
async function handleOfflineFormSubmissions() {
  try {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const offlineSubmissions = await cache.match('/offline-submissions');
    
    if (offlineSubmissions) {
      const submissions = await offlineSubmissions.json();
      
      for (const submission of submissions) {
        try {
          await fetch('/submit-form', {
            method: 'POST',
            body: JSON.stringify(submission),
            headers: {
              'Content-Type': 'application/json'
            }
          });
        } catch (error) {
          console.error('[SW] Failed to sync form submission:', error);
        }
      }
      
      // Clear processed submissions
      await cache.delete('/offline-submissions');
    }
  } catch (error) {
    console.error('[SW] Error handling offline submissions:', error);
  }
}

// Push notification handler (for future use)
self.addEventListener('push', event => {
  if (event.data) {
    const options = {
      body: event.data.text(),
      icon: '/assets/img/favicon.png',
      badge: '/assets/img/favicon.png',
      vibrate: [200, 100, 200],
      actions: [
        {
          action: 'view',
          title: 'View Portfolio'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification('Marc Ràfols Portfolio', options)
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
