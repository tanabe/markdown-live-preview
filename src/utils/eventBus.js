/**
 * EventBus - Central communication hub for decoupled feature communication
 * @module utils/eventBus
 */

class EventBus {
    constructor() {
        this.events = new Map();
    }

    /**
     * Subscribe to an event
     * @param {string} event - Event name
     * @param {Function} callback - Handler function
     * @returns {Function} Unsubscribe function
     */
    on(event, callback) {
        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }
        this.events.get(event).add(callback);

        // Return unsubscribe function
        return () => this.off(event, callback);
    }

    /**
     * Unsubscribe from an event
     * @param {string} event - Event name
     * @param {Function} callback - Handler function to remove
     */
    off(event, callback) {
        this.events.get(event)?.delete(callback);
    }

    /**
     * Emit an event with data
     * @param {string} event - Event name
     * @param {*} data - Data to pass to handlers
     */
    emit(event, data) {
        this.events.get(event)?.forEach(cb => {
            try {
                cb(data);
            } catch (err) {
                console.error(`EventBus error in ${event}:`, err);
            }
        });
    }

    /**
     * Subscribe to an event once
     * @param {string} event - Event name
     * @param {Function} callback - Handler function
     * @returns {Function} Unsubscribe function
     */
    once(event, callback) {
        const wrapper = (data) => {
            callback(data);
            this.off(event, wrapper);
        };
        return this.on(event, wrapper);
    }

    /**
     * Remove all listeners for an event or all events
     * @param {string} [event] - Optional event name
     */
    clear(event) {
        if (event) {
            this.events.delete(event);
        } else {
            this.events.clear();
        }
    }
}

// Singleton instance
export const eventBus = new EventBus();

/**
 * Event constants for type-safe event handling
 */
export const EVENTS = {
    // App events
    APP_READY: 'app:ready',
    APP_ERROR: 'app:error',

    // Editor events
    CONTENT_CHANGED: 'editor:content-changed',
    CURSOR_MOVED: 'editor:cursor-moved',
    EDITOR_SCROLLED: 'editor:scrolled',
    EDITOR_READY: 'editor:ready',
    SELECTION_CHANGED: 'editor:selection-changed',

    // Document events
    DOCUMENT_SAVING: 'doc:saving',
    DOCUMENT_SAVED: 'doc:saved',
    DOC_SAVED: 'doc:saved',
    DOC_LOADED: 'doc:loaded',
    DOC_CREATED: 'doc:created',
    DOC_DELETED: 'doc:deleted',
    TAB_SWITCHED: 'doc:tab-switched',
    TAB_CLOSED: 'doc:tab-closed',

    // Markdown events
    MARKDOWN_CONVERTED: 'markdown:converted',
    TOC_UPDATED: 'toc:updated',
    MERMAID_RENDERED: 'mermaid:rendered',

    // UI events
    THEME_CHANGED: 'ui:theme-changed',
    DARK_MODE_TOGGLED: 'ui:dark-mode-toggled',
    MODE_CHANGED: 'ui:mode-changed',
    VIEW_CHANGED: 'ui:view-changed',
    TOAST_SHOW: 'ui:toast-show',
    MODAL_OPENED: 'ui:modal-opened',
    MODAL_CLOSED: 'ui:modal-closed',
    SHOW_PROMPT: 'ui:show-prompt',
    CONFIRM_REQUIRED: 'ui:confirm-required',

    // Feature events
    STATS_UPDATED: 'stats:updated',
    LINT_COMPLETE: 'lint:complete',
    LINT_STARTED: 'lint:started',
    GOAL_UPDATED: 'goals:updated',
    GOAL_REACHED: 'goals:reached',
    SEARCH_PERFORMED: 'search:performed',
    SNIPPET_INSERTED: 'snippet:inserted',
    TEMPLATE_LOADED: 'template:loaded',

    // Mode events
    FOCUS_MODE_TOGGLE: 'mode:focus-toggle',
    FOCUS_MODE_CHANGED: 'mode:focus-changed',
    TYPEWRITER_MODE_TOGGLE: 'mode:typewriter-toggle',
    TYPEWRITER_MODE_CHANGED: 'mode:typewriter-changed',
    FULLSCREEN_TOGGLE: 'mode:fullscreen-toggle',
    FULLSCREEN_CHANGED: 'mode:fullscreen-changed',

    // Export events
    EXPORT_STARTED: 'export:started',
    EXPORT_COMPLETE: 'export:complete',
    EXPORT_FAILED: 'export:failed',
    EXPORT_ERROR: 'export:error',

    // Import events
    IMPORT_STARTED: 'import:started',
    IMPORT_COMPLETE: 'import:complete',
    IMPORT_FAILED: 'import:failed',
    FILE_IMPORTED: 'import:file-imported',

    // Scroll sync
    SCROLL_SYNC_EDITOR: 'scroll:sync-editor',
    SCROLL_SYNC_PREVIEW: 'scroll:sync-preview',

    // Divider events
    DIVIDER_CHANGED: 'divider:changed',

    // Mobile events
    MOBILE_MENU_TOGGLED: 'mobile:menu-toggled',
    MOBILE_VIEW_CHANGED: 'mobile:view-changed',

    // Keyboard shortcuts
    SHORTCUT_TRIGGERED: 'shortcut:triggered'
};

export default eventBus;
