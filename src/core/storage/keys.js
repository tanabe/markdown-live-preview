/**
 * Storage Keys - Constants for all localStorage keys
 * @module core/storage/keys
 */

/**
 * Namespace for all storage keys
 */
export const NAMESPACE = 'com.markdownlivepreview';

/**
 * Storage key constants
 */
export const STORAGE_KEYS = {
    // Document storage
    DOCUMENTS: 'docs',
    LAST_STATE: 'last_state',
    ACTIVE_TAB: 'active_tab',

    // Settings
    SCROLL_SYNC: 'scroll_bar_settings',
    DARK_MODE: 'dark_mode_settings',
    THEME: 'theme_settings',
    VIEW_MODE: 'view_mode',

    // Goals
    WRITING_GOALS: 'writing_goals',

    // Editor preferences
    FONT_SIZE: 'font_size',
    WORD_WRAP: 'word_wrap',
    LINE_NUMBERS: 'line_numbers',

    // UI state
    SIDEBAR_COLLAPSED: 'sidebar_collapsed',
    TOC_VISIBLE: 'toc_visible',
    LINT_PANEL_VISIBLE: 'lint_panel_visible',

    // Feature flags
    TYPEWRITER_MODE: 'typewriter_mode',
    FOCUS_MODE: 'focus_mode',

    // Cache
    LAST_EXPORT_FORMAT: 'last_export_format',
    RECENT_TEMPLATES: 'recent_templates'
};

/**
 * Default values for storage keys
 */
export const STORAGE_DEFAULTS = {
    [STORAGE_KEYS.SCROLL_SYNC]: false,
    [STORAGE_KEYS.DARK_MODE]: false,
    [STORAGE_KEYS.THEME]: 'vs',
    [STORAGE_KEYS.VIEW_MODE]: 'split',
    [STORAGE_KEYS.WRITING_GOALS]: {
        dailyTarget: 500,
        streak: 0,
        lastGoalDate: null,
        history: {}
    },
    [STORAGE_KEYS.FONT_SIZE]: 16,
    [STORAGE_KEYS.WORD_WRAP]: true,
    [STORAGE_KEYS.LINE_NUMBERS]: false,
    [STORAGE_KEYS.SIDEBAR_COLLAPSED]: false,
    [STORAGE_KEYS.TOC_VISIBLE]: false,
    [STORAGE_KEYS.LINT_PANEL_VISIBLE]: false,
    [STORAGE_KEYS.TYPEWRITER_MODE]: false,
    [STORAGE_KEYS.FOCUS_MODE]: false
};

export default STORAGE_KEYS;
