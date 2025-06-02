/**
 * Theme Management for Marc Ràfols Portfolio
 * Implements dark/light theme with system preference detection
 */

const THEME_CONFIG = {
  STORAGE_KEY: 'portfolio-theme',
  THEMES: {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system'
  },
  CSS_VARIABLES: {
    light: {
      '--color-background': '#ffffff',
      '--color-surface': '#f8fafc',
      '--color-text-primary': '#1f2937',
      '--color-text-secondary': '#6b7280',
      '--color-border': '#e5e7eb',
      '--color-accent': '#0c77f2',
      '--color-accent-hover': '#0969da',
      '--shadow-sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      '--shadow-md': '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      '--shadow-lg': '0 10px 15px -3px rgb(0 0 0 / 0.1)'
    },
    dark: {
      '--color-background': '#0f172a',
      '--color-surface': '#1e293b',
      '--color-text-primary': '#f1f5f9',
      '--color-text-secondary': '#94a3b8',
      '--color-border': '#334155',
      '--color-accent': '#3b82f6',
      '--color-accent-hover': '#60a5fa',
      '--shadow-sm': '0 1px 2px 0 rgb(0 0 0 / 0.2)',
      '--shadow-md': '0 4px 6px -1px rgb(0 0 0 / 0.3)',
      '--shadow-lg': '0 10px 15px -3px rgb(0 0 0 / 0.4)'
    }
  }
};

class ThemeManager {
  constructor() {
    this.currentTheme = this.getStoredTheme();
    this.systemTheme = this.getSystemTheme();
    this.init();
  }

  /**
   * Get stored theme preference
   */
  getStoredTheme() {
    try {
      return localStorage.getItem(THEME_CONFIG.STORAGE_KEY) || THEME_CONFIG.THEMES.SYSTEM;
    } catch (e) {
      return THEME_CONFIG.THEMES.SYSTEM;
    }
  }

  /**
   * Get system theme preference
   */
  getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEME_CONFIG.THEMES.DARK;
    }
    return THEME_CONFIG.THEMES.LIGHT;
  }

  /**
   * Store theme preference
   */
  storeTheme(theme) {
    try {
      localStorage.setItem(THEME_CONFIG.STORAGE_KEY, theme);
    } catch (e) {
      console.warn('Unable to store theme preference:', e);
    }
  }

  /**
   * Get effective theme (resolves 'system' to actual theme)
   */
  getEffectiveTheme() {
    if (this.currentTheme === THEME_CONFIG.THEMES.SYSTEM) {
      return this.systemTheme;
    }
    return this.currentTheme;
  }

  /**
   * Apply theme styles
   */
  applyTheme(theme) {
    const effectiveTheme = theme === THEME_CONFIG.THEMES.SYSTEM ? this.systemTheme : theme;
    const variables = THEME_CONFIG.CSS_VARIABLES[effectiveTheme];
    
    if (!variables) return;

    // Apply CSS custom properties
    const root = document.documentElement;
    Object.entries(variables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Update body class
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${effectiveTheme}`);

    // Update data attribute
    document.documentElement.setAttribute('data-theme', effectiveTheme);

    // Update meta theme-color for mobile browsers
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.content = variables['--color-background'];
    }
  }

  /**
   * Set theme
   */
  setTheme(theme) {
    this.currentTheme = theme;
    this.storeTheme(theme);
    this.applyTheme(theme);
    this.notifyThemeChange(theme);
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme() {
    const effectiveTheme = this.getEffectiveTheme();
    const newTheme = effectiveTheme === THEME_CONFIG.THEMES.LIGHT 
      ? THEME_CONFIG.THEMES.DARK 
      : THEME_CONFIG.THEMES.LIGHT;
    
    this.setTheme(newTheme);
  }

  /**
   * Notify theme change to other components
   */
  notifyThemeChange(theme) {
    const event = new CustomEvent('themechange', {
      detail: { 
        theme: theme,
        effectiveTheme: this.getEffectiveTheme()
      }
    });
    window.dispatchEvent(event);
  }

  /**
   * Create theme toggle button
   */
  createThemeToggle() {
    const button = document.createElement('button');
    button.className = 'theme-toggle';
    button.setAttribute('aria-label', 'Toggle theme');
    button.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      width: 48px;
      height: 48px;
      border: none;
      border-radius: 50%;
      background: var(--color-surface);
      color: var(--color-text-primary);
      cursor: pointer;
      z-index: 1000;
      box-shadow: var(--shadow-md);
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    `;

    // Update button content based on theme
    const updateButton = () => {
      const effectiveTheme = this.getEffectiveTheme();
      button.innerHTML = effectiveTheme === THEME_CONFIG.THEMES.DARK ? '☀️' : '🌙';
      button.setAttribute('aria-label', 
        effectiveTheme === THEME_CONFIG.THEMES.DARK ? 'Switch to light theme' : 'Switch to dark theme'
      );
    };

    updateButton();

    button.addEventListener('click', () => {
      this.toggleTheme();
      updateButton();
    });

    // Listen for theme changes
    window.addEventListener('themechange', updateButton);

    return button;
  }

  /**
   * Setup system theme change listener
   */
  setupSystemThemeListener() {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleSystemThemeChange = (e) => {
        this.systemTheme = e.matches ? THEME_CONFIG.THEMES.DARK : THEME_CONFIG.THEMES.LIGHT;
        
        // If user has system preference, update the theme
        if (this.currentTheme === THEME_CONFIG.THEMES.SYSTEM) {
          this.applyTheme(THEME_CONFIG.THEMES.SYSTEM);
          this.notifyThemeChange(THEME_CONFIG.THEMES.SYSTEM);
        }
      };

      // Modern browsers
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleSystemThemeChange);
      } else {
        // Older browsers
        mediaQuery.addListener(handleSystemThemeChange);
      }
    }
  }

  /**
   * Initialize theme manager
   */
  init() {
    // Apply initial theme
    this.applyTheme(this.currentTheme);
    
    // Setup system theme listener
    this.setupSystemThemeListener();
      // Theme toggle button disabled
    // if (window.location.hostname === 'localhost' || 
    //     window.location.search.includes('theme-toggle=true')) {
    //   document.addEventListener('DOMContentLoaded', () => {
    //     const toggle = this.createThemeToggle();
    //     document.body.appendChild(toggle);
    //   });
    // }

    // Listen for theme preference from keyboard shortcut
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + Shift + T to toggle theme
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }
}

/**
 * Utility functions for theme-aware components
 */
const ThemeUtils = {
  /**
   * Get current effective theme
   */
  getCurrentTheme() {
    return window.portfolioTheme?.getEffectiveTheme() || THEME_CONFIG.THEMES.LIGHT;
  },

  /**
   * Check if dark theme is active
   */
  isDarkTheme() {
    return this.getCurrentTheme() === THEME_CONFIG.THEMES.DARK;
  },

  /**
   * Get theme-appropriate color
   */
  getThemeColor(lightColor, darkColor) {
    return this.isDarkTheme() ? darkColor : lightColor;
  },

  /**
   * Apply theme-aware styles to element
   */
  applyThemeStyles(element, styles) {
    const effectiveTheme = this.getCurrentTheme();
    const themeStyles = styles[effectiveTheme] || styles.light || {};
    
    Object.assign(element.style, themeStyles);
  }
};

// Initialize theme manager
const portfolioTheme = new ThemeManager();

// Export for global use
window.portfolioTheme = portfolioTheme;
window.ThemeUtils = ThemeUtils;
window.THEME_CONFIG = THEME_CONFIG;
