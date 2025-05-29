/**
 * Security utilities for Marc Ràfols Portfolio
 * Implements Content Security Policy and security headers
 */

// Content Security Policy configuration
const CSP_CONFIG = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'", // Required for Tailwind CSS
    "https://cdn.tailwindcss.com"
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'", // Required for inline styles
    "https://fonts.googleapis.com"
  ],
  'font-src': [
    "'self'",
    "https://fonts.gstatic.com"
  ],
  'img-src': [
    "'self'",
    "data:",
    "https:"
  ],
  'connect-src': [
    "'self'",
    "https:"
  ],
  'frame-ancestors': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"]
};

/**
 * Apply Content Security Policy if supported by meta tag
 */
function applyCSP() {
  // Build CSP string
  const cspDirectives = Object.entries(CSP_CONFIG)
    .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
    .join('; ');

  // Try to set CSP via meta tag (limited support)
  const existingCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
  if (!existingCSP) {
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = cspDirectives;
    document.head.appendChild(meta);
  }
}

/**
 * Implement security best practices
 */
function implementSecurityMeasures() {
  // Prevent clickjacking
  if (window.self !== window.top) {
    window.top.location = window.self.location;
  }

  // Add security headers via meta tags where possible
  const securityMetas = [
    { name: 'referrer', content: 'strict-origin-when-cross-origin' },
    { 'http-equiv': 'X-Content-Type-Options', content: 'nosniff' },
    { 'http-equiv': 'X-Frame-Options', content: 'DENY' }
  ];

  securityMetas.forEach(meta => {
    const existing = document.querySelector(
      meta.name ? `meta[name="${meta.name}"]` : `meta[http-equiv="${meta['http-equiv']}"]`
    );
    
    if (!existing) {
      const metaElement = document.createElement('meta');
      if (meta.name) metaElement.name = meta.name;
      if (meta['http-equiv']) metaElement.httpEquiv = meta['http-equiv'];
      metaElement.content = meta.content;
      document.head.appendChild(metaElement);
    }
  });
}

/**
 * Sanitize user inputs to prevent XSS
 */
function sanitizeInput(input) {
  const temp = document.createElement('div');
  temp.textContent = input;
  return temp.innerHTML;
}

/**
 * Secure form submission handler
 */
function secureFormSubmission(form) {
  const formData = new FormData(form);
  const sanitizedData = {};

  for (let [key, value] of formData.entries()) {
    if (typeof value === 'string') {
      sanitizedData[key] = sanitizeInput(value);
    } else {
      sanitizedData[key] = value;
    }
  }

  return sanitizedData;
}

/**
 * Monitor for security violations
 */
function setupSecurityMonitoring() {
  // CSP violation reporting
  document.addEventListener('securitypolicyviolation', (e) => {
    console.warn('CSP Violation:', {
      blockedURI: e.blockedURI,
      violatedDirective: e.violatedDirective,
      originalPolicy: e.originalPolicy,
      documentURI: e.documentURI
    });

    // In production, you might want to report this to an analytics service
    if (typeof gtag !== 'undefined') {
      gtag('event', 'security_violation', {
        event_category: 'Security',
        event_label: e.violatedDirective,
        value: 1
      });
    }
  });

  // Monitor for suspicious activities
  let clickCount = 0;
  let lastClickTime = 0;

  document.addEventListener('click', (e) => {
    const now = Date.now();
    if (now - lastClickTime < 100) {
      clickCount++;
      if (clickCount > 10) {
        console.warn('Suspicious rapid clicking detected');
        // Implement rate limiting or other protective measures
      }
    } else {
      clickCount = 0;
    }
    lastClickTime = now;
  });
}

// Initialize security measures when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    applyCSP();
    implementSecurityMeasures();
    setupSecurityMonitoring();
  });
} else {
  applyCSP();
  implementSecurityMeasures();
  setupSecurityMonitoring();
}

// Export functions for use in other scripts
window.PortfolioSecurity = {
  sanitizeInput,
  secureFormSubmission,
  CSP_CONFIG
};
