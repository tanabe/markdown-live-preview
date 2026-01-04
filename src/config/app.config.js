/**
 * Application Configuration
 * Central place for all app-wide constants and settings
 * @module config/app.config
 */

export const APP_CONFIG = {
    // Image handling
    MAX_IMAGE_SIZE_MB: 5,
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],

    // Reading/Writing
    READING_SPEED_WPM: 200,
    CHARACTERS_PER_MINUTE: 1000,

    // PWA
    SERVICE_WORKER_UPDATE_INTERVAL_MS: 30 * 60 * 1000, // 30 minutes

    // UI
    TOAST_DURATION_MS: 3000,
    AUTOSAVE_INDICATOR_DURATION_MS: 500,
    DEBOUNCE_DELAY_MS: 1000,
    THROTTLE_DELAY_MS: 200,

    // Limits
    MAX_TITLE_LENGTH: 20,
    MIN_PANE_WIDTH: 100,
    MAX_DOCUMENTS: 50,
    MAX_UNDO_HISTORY: 100,

    // Editor
    DEFAULT_FONT_SIZE: 16,
    MIN_FONT_SIZE: 10,
    MAX_FONT_SIZE: 32,

    // Linter
    LINTER_DEBOUNCE_MS: 1000,

    // Export
    PDF_OPTIONS: {
        margin: 1,
        filename: 'document.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            logging: false
        },
        jsPDF: {
            unit: 'in',
            format: 'letter',
            orientation: 'portrait'
        }
    },

    // Mermaid
    MERMAID_CONFIG: {
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose'
    }
};

/**
 * Feature flags for enabling/disabling features
 */
export const FEATURE_FLAGS = {
    ENABLE_TABS: true,
    ENABLE_GOALS: true,
    ENABLE_LINTER: true,
    ENABLE_TOC: true,
    ENABLE_SEARCH: true,
    ENABLE_TEMPLATES: true,
    ENABLE_SNIPPETS: true,
    ENABLE_EXPORT_PDF: true,
    ENABLE_EXPORT_DOCX: true,
    ENABLE_IMAGE_UPLOAD: true,
    ENABLE_MERMAID: true,
    ENABLE_KATEX: true,
    ENABLE_PWA: true,
    ENABLE_SCROLL_SYNC: true,
    ENABLE_FOCUS_MODE: true,
    ENABLE_TYPEWRITER_MODE: true,
    ENABLE_FULLSCREEN: true,
    ENABLE_MOBILE_UI: true
};

/**
 * Breakpoints for responsive design
 */
export const BREAKPOINTS = {
    MOBILE: 480,
    TABLET: 768,
    DESKTOP: 1024,
    WIDE: 1280
};

/**
 * Animation durations (in ms)
 */
export const ANIMATIONS = {
    FAST: 150,
    NORMAL: 250,
    SLOW: 350
};

export default APP_CONFIG;
