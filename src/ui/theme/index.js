/**
 * Theme Manager
 * Handles application theme switching (dark/light mode)
 * @module ui/theme
 */

import { eventBus, EVENTS } from '../../utils/eventBus.js';
import { storageService } from '../../core/storage/index.js';
import { STORAGE_KEYS } from '../../core/storage/keys.js';

/**
 * Theme values
 */
export const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system'
};

/**
 * CSS custom properties for themes
 */
const THEME_PROPERTIES = {
    light: {
        '--bg-primary': '#ffffff',
        '--bg-secondary': '#f5f5f5',
        '--bg-tertiary': '#e5e5e5',
        '--text-primary': '#1a1a1a',
        '--text-secondary': '#666666',
        '--text-tertiary': '#999999',
        '--border-color': '#e0e0e0',
        '--accent-color': '#3b82f6',
        '--accent-hover': '#2563eb',
        '--shadow': '0 2px 8px rgba(0, 0, 0, 0.1)',
        '--toast-bg': '#333',
        '--toast-color': '#fff',
        '--modal-bg': '#fff',
        '--modal-color': '#333'
    },
    dark: {
        '--bg-primary': '#1a1a1a',
        '--bg-secondary': '#262626',
        '--bg-tertiary': '#333333',
        '--text-primary': '#f5f5f5',
        '--text-secondary': '#a0a0a0',
        '--text-tertiary': '#666666',
        '--border-color': '#404040',
        '--accent-color': '#60a5fa',
        '--accent-hover': '#3b82f6',
        '--shadow': '0 2px 8px rgba(0, 0, 0, 0.4)',
        '--toast-bg': '#404040',
        '--toast-color': '#f5f5f5',
        '--modal-bg': '#262626',
        '--modal-color': '#f5f5f5'
    }
};

/**
 * ThemeManager class
 * Manages application theme
 */
class ThemeManager {
    static instance = null;

    constructor() {
        if (ThemeManager.instance) {
            return ThemeManager.instance;
        }

        this.currentTheme = THEMES.SYSTEM;
        this.resolvedTheme = THEMES.LIGHT;
        this.mediaQuery = null;

        ThemeManager.instance = this;
    }

    /**
     * Initialize theme manager
     */
    initialize() {
        // Get saved theme preference
        const savedTheme = storageService.get(STORAGE_KEYS.APP_THEME);
        this.currentTheme = savedTheme || THEMES.SYSTEM;

        // Setup system theme detection
        this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        this.mediaQuery.addEventListener('change', this._handleSystemThemeChange.bind(this));

        // Apply initial theme
        this._applyTheme();
    }

    /**
     * Handle system theme change
     * @private
     */
    _handleSystemThemeChange() {
        if (this.currentTheme === THEMES.SYSTEM) {
            this._applyTheme();
        }
    }

    /**
     * Get the actual theme (resolving 'system')
     * @returns {string} 'light' or 'dark'
     */
    getResolvedTheme() {
        if (this.currentTheme === THEMES.SYSTEM) {
            return this.mediaQuery?.matches ? THEMES.DARK : THEMES.LIGHT;
        }
        return this.currentTheme;
    }

    /**
     * Apply current theme to document
     * @private
     */
    _applyTheme() {
        this.resolvedTheme = this.getResolvedTheme();
        const properties = THEME_PROPERTIES[this.resolvedTheme];

        // Apply CSS custom properties
        Object.entries(properties).forEach(([prop, value]) => {
            document.documentElement.style.setProperty(prop, value);
        });

        // Set data attribute for CSS selectors
        document.documentElement.setAttribute('data-theme', this.resolvedTheme);

        // Update meta theme-color
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) {
            metaTheme.content = properties['--bg-primary'];
        }

        eventBus.emit(EVENTS.THEME_CHANGED, {
            theme: this.currentTheme,
            resolved: this.resolvedTheme,
            isDark: this.resolvedTheme === THEMES.DARK
        });
    }

    /**
     * Set theme
     * @param {string} theme - Theme to set ('light', 'dark', 'system')
     */
    setTheme(theme) {
        if (!Object.values(THEMES).includes(theme)) {
            console.warn(`Invalid theme: ${theme}`);
            return;
        }

        this.currentTheme = theme;
        storageService.set(STORAGE_KEYS.APP_THEME, theme);
        this._applyTheme();
    }
    /**
     * Cycle through themes
     */
    cycleTheme() {
        const themes = [THEMES.LIGHT, THEMES.DARK, THEMES.SYSTEM];
        const currentIndex = themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        const nextTheme = themes[nextIndex];

        this.setTheme(nextTheme);

        eventBus.emit(EVENTS.TOAST_SHOW, {
            message: `Theme: ${nextTheme.charAt(0).toUpperCase() + nextTheme.slice(1)}`,
            type: 'info',
            duration: 1500
        });
    }
    /**
     * Get current theme setting
     * @returns {string} Current theme
     */
    getTheme() {
        return this.currentTheme;
    }

    /**
     * Check if current theme is dark
     * @returns {boolean} True if dark theme
     */
    isDark() {
        return this.resolvedTheme === THEMES.DARK;
    }

    /**
     * Toggle between light and dark
     */
    toggle() {
        const newTheme = this.resolvedTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
        this.setTheme(newTheme);
    }

    /**
     * Get all available themes
     * @returns {Object} Theme options
     */
    getAvailableThemes() {
        return { ...THEMES };
    }

    /**
     * Add custom theme
     * @param {string} name - Theme name
     * @param {Object} properties - CSS custom properties
     */
    addCustomTheme(name, properties) {
        THEME_PROPERTIES[name] = properties;
    }
}

// Export singleton instance
export const themeManager = new ThemeManager();

// Export class and constants
export { ThemeManager, THEMES };

export default themeManager;
