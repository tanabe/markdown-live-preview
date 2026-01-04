/**
 * Keyboard Shortcuts Manager
 * Centralized keyboard shortcut handling
 * @module services/shortcuts
 */

import { eventBus, EVENTS } from '../utils/eventBus.js';
import { storageService } from '../core/storage/index.js';
import { STORAGE_KEYS } from '../core/storage/keys.js';

/**
 * Default keyboard shortcuts
 */
const DEFAULT_SHORTCUTS = {
    // File operations
    'save': { key: 's', ctrl: true, description: 'Save document' },
    'new': { key: 'n', ctrl: true, description: 'New document' },
    'open': { key: 'o', ctrl: true, description: 'Open document' },

    // Edit operations
    'undo': { key: 'z', ctrl: true, description: 'Undo' },
    'redo': { key: 'z', ctrl: true, shift: true, description: 'Redo' },
    'find': { key: 'f', ctrl: true, description: 'Find' },
    'replace': { key: 'h', ctrl: true, description: 'Find and replace' },

    // Formatting
    'bold': { key: 'b', ctrl: true, description: 'Bold' },
    'italic': { key: 'i', ctrl: true, description: 'Italic' },
    'link': { key: 'k', ctrl: true, description: 'Insert link' },
    'code': { key: '`', ctrl: true, description: 'Inline code' },

    // View
    'togglePreview': { key: '\\', ctrl: true, description: 'Toggle preview' },
    'toggleFullscreen': { key: 'Enter', ctrl: true, shift: true, description: 'Toggle fullscreen' },
    'toggleFocus': { key: 'f', ctrl: true, shift: true, description: 'Toggle focus mode' },
    'zoomIn': { key: '=', ctrl: true, description: 'Zoom in' },
    'zoomOut': { key: '-', ctrl: true, description: 'Zoom out' },
    'resetZoom': { key: '0', ctrl: true, description: 'Reset zoom' },

    // Panels
    'toggleTOC': { key: 't', ctrl: true, shift: true, description: 'Toggle table of contents' },
    'toggleLinter': { key: 'l', ctrl: true, shift: true, description: 'Toggle linter' },
    'toggleSnippets': { key: 'p', ctrl: true, shift: true, description: 'Toggle snippets' },

    // Export
    'exportPDF': { key: 'e', ctrl: true, shift: true, description: 'Export to PDF' },
    'exportHTML': { key: 'h', ctrl: true, shift: true, alt: true, description: 'Export to HTML' },

    // Misc
    'commandPalette': { key: 'p', ctrl: true, description: 'Command palette' },
    'cycleTheme': { key: 'd', ctrl: true, description: 'Cycle editor themes' },
    'reset': { key: 'k', ctrl: true, description: 'Reset editor to default' },
    'help': { key: '?', ctrl: true, description: 'Show help' }
};

/**
 * ShortcutsManager class
 * Manages keyboard shortcuts
 */
class ShortcutsManager {
    static instance = null;

    constructor() {
        if (ShortcutsManager.instance) {
            return ShortcutsManager.instance;
        }

        this.shortcuts = { ...DEFAULT_SHORTCUTS };
        this.customShortcuts = {};
        this.handlers = new Map();
        this.enabled = true;
        this.initialized = false;

        ShortcutsManager.instance = this;
    }

    /**
     * Initialize shortcuts manager
     */
    initialize() {
        if (this.initialized) return;

        // Load custom shortcuts
        this._loadCustomShortcuts();

        // Setup global keyboard listener
        document.addEventListener('keydown', this._handleKeyDown.bind(this));

        this.initialized = true;
    }

    /**
     * Load custom shortcuts from storage
     * @private
     */
    _loadCustomShortcuts() {
        const saved = storageService.get(STORAGE_KEYS.SHORTCUTS);
        if (saved) {
            this.customShortcuts = saved;
            // Merge custom shortcuts
            Object.assign(this.shortcuts, this.customShortcuts);
        }
    }

    /**
     * Save custom shortcuts to storage
     * @private
     */
    _saveCustomShortcuts() {
        storageService.set(STORAGE_KEYS.SHORTCUTS, this.customShortcuts);
    }

    /**
     * Handle keydown event
     * @param {KeyboardEvent} e - Keyboard event
     * @private
     */
    _handleKeyDown(e) {
        if (!this.enabled) return;

        // Find matching shortcut
        const matchingAction = this._findMatchingAction(e);

        if (matchingAction) {
            const handler = this.handlers.get(matchingAction);
            if (handler) {
                e.preventDefault();
                handler(e);
                eventBus.emit(EVENTS.SHORTCUT_TRIGGERED, { action: matchingAction });
            }
        }
    }

    /**
     * Find action matching keyboard event
     * @param {KeyboardEvent} e - Keyboard event
     * @returns {string|null} Action name or null
     * @private
     */
    _findMatchingAction(e) {
        const key = e.key.toLowerCase();
        const ctrl = e.ctrlKey || e.metaKey;
        const shift = e.shiftKey;
        const alt = e.altKey;

        for (const [action, shortcut] of Object.entries(this.shortcuts)) {
            if (
                shortcut.key.toLowerCase() === key &&
                !!shortcut.ctrl === ctrl &&
                !!shortcut.shift === shift &&
                !!shortcut.alt === alt
            ) {
                return action;
            }
        }

        return null;
    }

    /**
     * Register handler for shortcut action
     * @param {string} action - Action name
     * @param {Function} handler - Handler function
     */
    register(action, handler) {
        this.handlers.set(action, handler);
    }

    /**
     * Unregister handler for action
     * @param {string} action - Action name
     */
    unregister(action) {
        this.handlers.delete(action);
    }

    /**
     * Register multiple handlers
     * @param {Object} handlers - Object of action: handler pairs
     */
    registerAll(handlers) {
        Object.entries(handlers).forEach(([action, handler]) => {
            this.register(action, handler);
        });
    }

    /**
     * Set custom shortcut
     * @param {string} action - Action name
     * @param {Object} shortcut - Shortcut definition
     */
    setShortcut(action, shortcut) {
        // Check for conflicts
        const conflict = this._findConflict(shortcut);
        if (conflict && conflict !== action) {
            throw new Error(`Shortcut conflicts with "${conflict}"`);
        }

        this.shortcuts[action] = shortcut;
        this.customShortcuts[action] = shortcut;
        this._saveCustomShortcuts();
    }

    /**
     * Reset shortcut to default
     * @param {string} action - Action name
     */
    resetShortcut(action) {
        if (DEFAULT_SHORTCUTS[action]) {
            this.shortcuts[action] = { ...DEFAULT_SHORTCUTS[action] };
            delete this.customShortcuts[action];
            this._saveCustomShortcuts();
        }
    }

    /**
     * Reset all shortcuts to defaults
     */
    resetAll() {
        this.shortcuts = { ...DEFAULT_SHORTCUTS };
        this.customShortcuts = {};
        this._saveCustomShortcuts();
    }

    /**
     * Find conflicting shortcut
     * @param {Object} shortcut - Shortcut to check
     * @returns {string|null} Conflicting action or null
     * @private
     */
    _findConflict(shortcut) {
        for (const [action, existing] of Object.entries(this.shortcuts)) {
            if (
                existing.key.toLowerCase() === shortcut.key.toLowerCase() &&
                !!existing.ctrl === !!shortcut.ctrl &&
                !!existing.shift === !!shortcut.shift &&
                !!existing.alt === !!shortcut.alt
            ) {
                return action;
            }
        }
        return null;
    }

    /**
     * Get shortcut display string
     * @param {string} action - Action name
     * @returns {string} Display string (e.g., "Ctrl+S")
     */
    getDisplayString(action) {
        const shortcut = this.shortcuts[action];
        if (!shortcut) return '';

        const parts = [];
        if (shortcut.ctrl) parts.push('Ctrl');
        if (shortcut.alt) parts.push('Alt');
        if (shortcut.shift) parts.push('Shift');
        parts.push(shortcut.key.toUpperCase());

        return parts.join('+');
    }

    /**
     * Get all shortcuts
     * @returns {Object} All shortcuts
     */
    getAllShortcuts() {
        return { ...this.shortcuts };
    }

    /**
     * Enable shortcuts
     */
    enable() {
        this.enabled = true;
    }

    /**
     * Disable shortcuts
     */
    disable() {
        this.enabled = false;
    }

    /**
     * Check if shortcuts are enabled
     * @returns {boolean}
     */
    isEnabled() {
        return this.enabled;
    }

    /**
     * Render shortcuts help
     * @returns {string} HTML string
     */
    renderHelp() {
        const categories = {
            'File': ['save', 'new', 'open'],
            'Edit': ['undo', 'redo', 'find', 'replace'],
            'Format': ['bold', 'italic', 'link', 'code'],
            'View': ['togglePreview', 'toggleFullscreen', 'zoomIn', 'zoomOut', 'resetZoom'],
            'Panels': ['toggleTOC', 'toggleLinter', 'toggleSnippets'],
            'Export': ['exportPDF', 'exportHTML'],
            'Misc': ['commandPalette', 'help']
        };

        return Object.entries(categories).map(([category, actions]) => `
            <div class="shortcuts-category">
                <h4>${category}</h4>
                <ul>
                    ${actions.map(action => {
            const shortcut = this.shortcuts[action];
            if (!shortcut) return '';
            return `
                            <li>
                                <span class="shortcut-action">${shortcut.description}</span>
                                <kbd>${this.getDisplayString(action)}</kbd>
                            </li>
                        `;
        }).join('')}
                </ul>
            </div>
        `).join('');
    }

    /**
     * Dispose shortcuts manager
     */
    dispose() {
        document.removeEventListener('keydown', this._handleKeyDown.bind(this));
        this.handlers.clear();
        this.initialized = false;
        ShortcutsManager.instance = null;
    }
}

// Export singleton instance
export const shortcutsManager = new ShortcutsManager();

export { ShortcutsManager, DEFAULT_SHORTCUTS };

export default shortcutsManager;
