// Service Worker Registration and PWA Features
// Marc Ràfols Portfolio

(function() {
  'use strict';
  
  // Check if service workers are supported
  if ('serviceWorker' in navigator) {
    // Register service worker
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('[PWA] Service Worker registered successfully:', registration.scope);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              showUpdateNotification();
            }
          });
        });
      })
      .catch(error => {
        console.error('[PWA] Service Worker registration failed:', error);
      });
    
    // Listen for service worker messages
    navigator.serviceWorker.addEventListener('message', event => {
      if (event.data.type === 'CACHE_UPDATED') {
        showUpdateNotification();
      }
    });
  }
  
  // Show update notification
  function showUpdateNotification() {
    // Create notification element
    const notification = document.createElement('div');
    notification.id = 'update-notification';
    notification.className = 'fixed top-4 right-4 bg-[#0c77f2] text-white p-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    notification.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="flex-1">
          <p class="font-medium">New version available!</p>
          <p class="text-sm opacity-90">Click to update</p>
        </div>
        <button onclick="updateApp()" class="bg-white text-[#0c77f2] px-3 py-1 rounded text-sm font-medium hover:bg-gray-100">
          Update
        </button>
        <button onclick="dismissUpdate()" class="text-white hover:text-gray-200">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Slide in animation
    setTimeout(() => {
      notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto-dismiss after 10 seconds
    setTimeout(() => {
      dismissUpdate();
    }, 10000);
  }
  
  // Update app
  window.updateApp = function() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(registration => {
        if (registration && registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          registration.waiting.addEventListener('statechange', e => {
            if (e.target.state === 'activated') {
              window.location.reload();
            }
          });
        }
      });
    }
  };
  
  // Dismiss update notification
  window.dismissUpdate = function() {
    const notification = document.getElementById('update-notification');
    if (notification) {
      notification.classList.add('translate-x-full');
      setTimeout(() => notification.remove(), 300);
    }
  };
  
  // Install prompt handling
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    
    // Show install button if not already installed
    if (!window.matchMedia('(display-mode: standalone)').matches) {
      showInstallPrompt();
    }
  });
  
  // Show install prompt
  function showInstallPrompt() {
    const installButton = document.getElementById('install-app');
    if (installButton) {
      installButton.style.display = 'block';
      installButton.addEventListener('click', installApp);
    } else {
      // Create floating install button
      const installBtn = document.createElement('button');
      installBtn.id = 'install-app-float';
      installBtn.className = 'fixed bottom-4 right-4 bg-[#0c77f2] text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-40';
      installBtn.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
      `;
      installBtn.title = 'Install App';
      installBtn.addEventListener('click', installApp);
      document.body.appendChild(installBtn);
    }
  }
  
  // Install app
  function installApp() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('[PWA] User accepted the install prompt');
        }
        deferredPrompt = null;
        
        // Hide install button
        const installBtn = document.getElementById('install-app-float');
        if (installBtn) installBtn.remove();
      });
    }
  }
  
  // Handle offline form submissions
  function handleOfflineForm() {
    const contactForm = document.querySelector('form[action="#"]');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        if (!navigator.onLine) {
          e.preventDefault();
          
          // Store form data for later submission
          const formData = new FormData(contactForm);
          const formObject = {};
          formData.forEach((value, key) => {
            formObject[key] = value;
          });
          
          // Store in localStorage for now (could use IndexedDB for better persistence)
          const offlineSubmissions = JSON.parse(localStorage.getItem('offline-submissions') || '[]');
          offlineSubmissions.push({
            ...formObject,
            timestamp: Date.now()
          });
          localStorage.setItem('offline-submissions', JSON.stringify(offlineSubmissions));
          
          // Show success message
          showOfflineSubmissionMessage();
        }
      });
    }
  }
  
  // Show offline submission message
  function showOfflineSubmissionMessage() {
    const message = document.createElement('div');
    message.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50';
    message.innerHTML = `
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>
        <p>Message saved! Will send when online.</p>
      </div>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
      message.remove();
    }, 3000);
  }
  
  // Process offline submissions when back online
  function processOfflineSubmissions() {
    if (navigator.onLine) {
      const offlineSubmissions = JSON.parse(localStorage.getItem('offline-submissions') || '[]');
      if (offlineSubmissions.length > 0) {
        console.log('[PWA] Processing offline form submissions:', offlineSubmissions);
        // Here you would typically send to your server
        localStorage.removeItem('offline-submissions');
      }
    }
  }
  
  // Listen for online/offline events
  window.addEventListener('online', processOfflineSubmissions);
  window.addEventListener('offline', () => {
    console.log('[PWA] App is now offline');
  });
  
  // Initialize offline form handling when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleOfflineForm);
  } else {
    handleOfflineForm();
  }
  
})();
