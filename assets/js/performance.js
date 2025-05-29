/**
 * Core Web Vitals Monitoring for Marc Ràfols Portfolio
 * Tracks LCP, FID, CLS and other performance metrics
 */

// Performance metrics storage
let performanceMetrics = {
  lcp: null,
  fid: null,
  cls: null,
  fcp: null,
  ttfb: null,
  loadTime: null
};

/**
 * Report metric to console and analytics (if available)
 */
function reportMetric(name, value, rating) {
  console.log(`[Performance] ${name}: ${value}ms (${rating})`);
  
  performanceMetrics[name.toLowerCase()] = {
    value: value,
    rating: rating,
    timestamp: Date.now()
  };

  // Send to Google Analytics if available
  if (typeof gtag !== 'undefined') {
    gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: rating,
      value: Math.round(value),
      custom_map: { metric_value: value }
    });
  }

  // Store in localStorage for debugging
  try {
    localStorage.setItem('portfolio_performance', JSON.stringify(performanceMetrics));
  } catch (e) {
    // Ignore localStorage errors
  }
}

/**
 * Get rating for metric values
 */
function getMetricRating(name, value) {
  const thresholds = {
    lcp: { good: 2500, poor: 4000 },
    fid: { good: 100, poor: 300 },
    cls: { good: 0.1, poor: 0.25 },
    fcp: { good: 1800, poor: 3000 },
    ttfb: { good: 800, poor: 1800 }
  };

  const threshold = thresholds[name];
  if (!threshold) return 'unknown';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Measure Largest Contentful Paint (LCP)
 */
function measureLCP() {
  if (!('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      if (lastEntry) {
        const value = lastEntry.startTime;
        const rating = getMetricRating('lcp', value);
        reportMetric('LCP', value, rating);
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    console.warn('LCP measurement failed:', e);
  }
}

/**
 * Measure First Input Delay (FID)
 */
function measureFID() {
  if (!('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const value = entry.processingStart - entry.startTime;
        const rating = getMetricRating('fid', value);
        reportMetric('FID', value, rating);
      });
    });

    observer.observe({ entryTypes: ['first-input'] });
  } catch (e) {
    console.warn('FID measurement failed:', e);
  }
}

/**
 * Measure Cumulative Layout Shift (CLS)
 */
function measureCLS() {
  if (!('PerformanceObserver' in window)) return;

  try {
    let clsValue = 0;
    let sessionValue = 0;
    let sessionEntries = [];

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      for (const entry of entries) {
        // Only count layout shifts without recent user input
        if (!entry.hadRecentInput) {
          const firstSessionEntry = sessionEntries[0];
          const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

          // If session gap, start a new session
          if (sessionValue && 
              entry.startTime - lastSessionEntry.startTime > 1000 ||
              entry.startTime - firstSessionEntry.startTime > 5000) {
            clsValue = Math.max(clsValue, sessionValue);
            sessionValue = 0;
            sessionEntries = [];
          }

          sessionEntries.push(entry);
          sessionValue += entry.value;
        }
      }

      // Update final CLS score
      clsValue = Math.max(clsValue, sessionValue);
      const rating = getMetricRating('cls', clsValue);
      reportMetric('CLS', clsValue, rating);
    });

    observer.observe({ entryTypes: ['layout-shift'] });
  } catch (e) {
    console.warn('CLS measurement failed:', e);
  }
}

/**
 * Measure First Contentful Paint (FCP)
 */
function measureFCP() {
  if (!('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
      
      if (fcpEntry) {
        const value = fcpEntry.startTime;
        const rating = getMetricRating('fcp', value);
        reportMetric('FCP', value, rating);
      }
    });

    observer.observe({ entryTypes: ['paint'] });
  } catch (e) {
    console.warn('FCP measurement failed:', e);
  }
}

/**
 * Measure Time to First Byte (TTFB)
 */
function measureTTFB() {
  try {
    const navEntry = performance.getEntriesByType('navigation')[0];
    if (navEntry) {
      const value = navEntry.responseStart - navEntry.requestStart;
      const rating = getMetricRating('ttfb', value);
      reportMetric('TTFB', value, rating);
    }
  } catch (e) {
    console.warn('TTFB measurement failed:', e);
  }
}

/**
 * Measure page load time
 */
function measureLoadTime() {
  window.addEventListener('load', () => {
    try {
      const navEntry = performance.getEntriesByType('navigation')[0];
      if (navEntry) {
        const loadTime = navEntry.loadEventEnd - navEntry.loadEventStart;
        reportMetric('LoadTime', loadTime, 'info');
      }
    } catch (e) {
      console.warn('Load time measurement failed:', e);
    }
  });
}

/**
 * Generate performance report
 */
function generatePerformanceReport() {
  const report = {
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    metrics: performanceMetrics,
    recommendations: []
  };

  // Add recommendations based on metrics
  Object.entries(performanceMetrics).forEach(([metric, data]) => {
    if (data && data.rating === 'poor') {
      switch (metric) {
        case 'lcp':
          report.recommendations.push('Consider optimizing largest contentful paint by reducing server response times and optimizing critical resources');
          break;
        case 'fid':
          report.recommendations.push('Reduce JavaScript execution time and break up long tasks to improve first input delay');
          break;
        case 'cls':
          report.recommendations.push('Minimize layout shifts by setting explicit dimensions on images and avoiding inserting content above existing content');
          break;
        case 'fcp':
          report.recommendations.push('Optimize first contentful paint by reducing render-blocking resources and improving server response time');
          break;
        case 'ttfb':
          report.recommendations.push('Improve server response time by optimizing backend performance and using a CDN');
          break;
      }
    }
  });

  return report;
}

/**
 * Export performance data
 */
function exportPerformanceData() {
  const report = generatePerformanceReport();
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `performance-report-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Monitor resource loading performance
 */
function monitorResourcePerformance() {
  if (!('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        // Log slow resources
        if (entry.duration > 1000) {
          console.warn(`Slow resource: ${entry.name} took ${entry.duration}ms`);
        }
        
        // Check for failed resources
        if (entry.transferSize === 0 && entry.decodedBodySize === 0) {
          console.error(`Failed to load resource: ${entry.name}`);
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });
  } catch (e) {
    console.warn('Resource performance monitoring failed:', e);
  }
}

/**
 * Initialize all performance monitoring
 */
function initPerformanceMonitoring() {
  measureLCP();
  measureFID();
  measureCLS();
  measureFCP();
  measureTTFB();
  measureLoadTime();
  monitorResourcePerformance();

  // Add debug panel in development
  if (window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1')) {
    setTimeout(() => {
      const debugPanel = document.createElement('div');
      debugPanel.id = 'performance-debug';
      debugPanel.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 10px;
        border-radius: 5px;
        font-family: monospace;
        font-size: 12px;
        z-index: 10000;
        max-width: 300px;
      `;
      
      const content = Object.entries(performanceMetrics)
        .filter(([_, data]) => data !== null)
        .map(([metric, data]) => `${metric.toUpperCase()}: ${data.value.toFixed(2)}ms (${data.rating})`)
        .join('<br>');
      
      debugPanel.innerHTML = `
        <strong>Performance Metrics</strong><br>
        ${content}<br>
        <button onclick="exportPerformanceData()" style="margin-top: 5px; padding: 2px 5px;">Export Report</button>
      `;
      
      document.body.appendChild(debugPanel);
    }, 3000);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPerformanceMonitoring);
} else {
  initPerformanceMonitoring();
}

// Export functions for global use
window.PortfolioPerformance = {
  generatePerformanceReport,
  exportPerformanceData,
  performanceMetrics
};
