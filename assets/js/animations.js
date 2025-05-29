/**
 * Accessible Animations for Marc Ràfols Portfolio
 * Respects user preferences for reduced motion
 */

// Animation configuration
const ANIMATION_CONFIG = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500
  },
  easing: {
    ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
  }
};

/**
 * Check if user prefers reduced motion
 */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get animation duration based on user preferences
 */
function getAnimationDuration(requested = 'normal') {
  if (prefersReducedMotion()) {
    return 0; // No animation for users who prefer reduced motion
  }
  return ANIMATION_CONFIG.duration[requested] || ANIMATION_CONFIG.duration.normal;
}

/**
 * Create CSS animation with reduced motion support
 */
function createAnimation(element, keyframes, options = {}) {
  if (prefersReducedMotion()) {
    // Apply final state immediately for reduced motion
    const finalKeyframe = keyframes[keyframes.length - 1];
    Object.assign(element.style, finalKeyframe);
    return Promise.resolve();
  }

  const duration = options.duration || ANIMATION_CONFIG.duration.normal;
  const easing = options.easing || ANIMATION_CONFIG.easing.ease;

  return element.animate(keyframes, {
    duration,
    easing,
    fill: 'forwards',
    ...options
  }).finished;
}

/**
 * Fade in animation
 */
function fadeIn(element, duration = 'normal') {
  const animDuration = getAnimationDuration(duration);
  
  if (animDuration === 0) {
    element.style.opacity = '1';
    return Promise.resolve();
  }

  return createAnimation(element, [
    { opacity: 0, transform: 'translateY(20px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ], { duration: animDuration });
}

/**
 * Fade out animation
 */
function fadeOut(element, duration = 'normal') {
  const animDuration = getAnimationDuration(duration);
  
  if (animDuration === 0) {
    element.style.opacity = '0';
    return Promise.resolve();
  }

  return createAnimation(element, [
    { opacity: 1, transform: 'translateY(0)' },
    { opacity: 0, transform: 'translateY(-20px)' }
  ], { duration: animDuration });
}

/**
 * Scale animation for buttons and interactive elements
 */
function scaleAnimation(element, scale = 1.05, duration = 'fast') {
  const animDuration = getAnimationDuration(duration);
  
  if (animDuration === 0) {
    return Promise.resolve();
  }

  return createAnimation(element, [
    { transform: 'scale(1)' },
    { transform: `scale(${scale})` },
    { transform: 'scale(1)' }
  ], { duration: animDuration });
}

/**
 * Slide in from direction
 */
function slideIn(element, direction = 'left', duration = 'normal') {
  const animDuration = getAnimationDuration(duration);
  
  if (animDuration === 0) {
    element.style.transform = 'translate(0, 0)';
    element.style.opacity = '1';
    return Promise.resolve();
  }

  const transforms = {
    left: ['translateX(-100%)', 'translateX(0)'],
    right: ['translateX(100%)', 'translateX(0)'],
    up: ['translateY(-100%)', 'translateY(0)'],
    down: ['translateY(100%)', 'translateY(0)']
  };

  const [start, end] = transforms[direction] || transforms.left;

  return createAnimation(element, [
    { opacity: 0, transform: start },
    { opacity: 1, transform: end }
  ], { duration: animDuration });
}

/**
 * Stagger animation for multiple elements
 */
function staggerAnimation(elements, animationFn, delay = 100) {
  if (prefersReducedMotion()) {
    // Apply animations immediately without stagger
    return Promise.all(elements.map(el => animationFn(el)));
  }

  return elements.reduce((promise, element, index) => {
    return promise.then(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          animationFn(element).then(resolve);
        }, index * delay);
      });
    });
  }, Promise.resolve());
}

/**
 * Intersection Observer for scroll animations
 */
function createScrollAnimations() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animationType = element.dataset.animation || 'fadeIn';
        const delay = parseInt(element.dataset.delay) || 0;

        setTimeout(() => {
          switch (animationType) {
            case 'fadeIn':
              fadeIn(element);
              break;
            case 'slideLeft':
              slideIn(element, 'left');
              break;
            case 'slideRight':
              slideIn(element, 'right');
              break;
            case 'slideUp':
              slideIn(element, 'up');
              break;
            case 'slideDown':
              slideIn(element, 'down');
              break;
          }
        }, delay);

        observer.unobserve(element);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe elements with animation data attributes
  document.querySelectorAll('[data-animation]').forEach(el => {
    observer.observe(el);
  });
}

/**
 * Enhanced focus animations
 */
function setupFocusAnimations() {
  const focusableElements = document.querySelectorAll(
    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );

  focusableElements.forEach(element => {
    element.addEventListener('focus', () => {
      if (!prefersReducedMotion()) {
        element.style.transition = `box-shadow ${getAnimationDuration('fast')}ms ease`;
        element.style.boxShadow = '0 0 0 3px rgba(12, 119, 242, 0.3)';
      } else {
        element.style.outline = '2px solid #0c77f2';
      }
    });

    element.addEventListener('blur', () => {
      element.style.boxShadow = '';
      element.style.outline = '';
    });
  });
}

/**
 * Hover animations for interactive elements
 */
function setupHoverAnimations() {
  const interactiveElements = document.querySelectorAll('.hover-animate');

  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      if (!prefersReducedMotion()) {
        scaleAnimation(element, 1.05, 'fast');
      }
    });

    element.addEventListener('mouseleave', () => {
      if (!prefersReducedMotion()) {
        scaleAnimation(element, 1, 'fast');
      }
    });
  });
}

/**
 * Loading animations
 */
function createLoadingAnimation(container) {
  const loader = document.createElement('div');
  loader.className = 'loading-spinner';
  loader.style.cssText = `
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #0c77f2;
    border-radius: 50%;
    margin: 20px auto;
  `;

  if (!prefersReducedMotion()) {
    loader.style.animation = 'spin 1s linear infinite';
    
    // Add keyframes if not already present
    if (!document.querySelector('#spinner-keyframes')) {
      const style = document.createElement('style');
      style.id = 'spinner-keyframes';
      style.textContent = `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  container.appendChild(loader);
  return loader;
}

/**
 * Page transition animations
 */
function setupPageTransitions() {
  const links = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      if (prefersReducedMotion()) return;

      // Only animate if it's a same-origin navigation
      try {
        const url = new URL(link.href);
        if (url.origin === window.location.origin) {
          e.preventDefault();
          
          fadeOut(document.body, 'fast').then(() => {
            window.location.href = link.href;
          });
        }
      } catch (err) {
        // Invalid URL, let default behavior occur
      }
    });
  });
}

/**
 * Initialize all animations
 */
function initAnimations() {
  // Set up CSS custom properties for animation durations
  const root = document.documentElement;
  root.style.setProperty('--anim-duration-fast', `${getAnimationDuration('fast')}ms`);
  root.style.setProperty('--anim-duration-normal', `${getAnimationDuration('normal')}ms`);
  root.style.setProperty('--anim-duration-slow', `${getAnimationDuration('slow')}ms`);

  // Initialize animation systems
  createScrollAnimations();
  setupFocusAnimations();
  setupHoverAnimations();
  setupPageTransitions();

  // Add reduced motion class to body if user prefers it
  if (prefersReducedMotion()) {
    document.body.classList.add('reduce-motion');
  }

  // Listen for changes in motion preference
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addListener((e) => {
    if (e.matches) {
      document.body.classList.add('reduce-motion');
    } else {
      document.body.classList.remove('reduce-motion');
    }
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimations);
} else {
  initAnimations();
}

// Export functions for global use
window.PortfolioAnimations = {
  fadeIn,
  fadeOut,
  slideIn,
  scaleAnimation,
  staggerAnimation,
  createLoadingAnimation,
  prefersReducedMotion,
  getAnimationDuration
};
