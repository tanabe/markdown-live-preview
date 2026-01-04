/**
 * View Modes Feature Module
 * Manages editor/preview layout modes
 * @module features/modes
 */

import { eventBus, EVENTS } from '../../utils/eventBus.js';
import { storageService } from '../../core/storage/index.js';
import { STORAGE_KEYS } from '../../core/storage/keys.js';
import { editorService } from '../../core/editor/index.js';

/**
 * Available view modes
 */
export const VIEW_MODES = {
    SPLIT: 'split',
    EDITOR: 'editor',
    PREVIEW: 'preview'
};

/**
 * Split orientations
 */
export const SPLIT_ORIENTATION = {
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical'
};

/**
 * ModesManager class
 * Manages editor/preview layout modes
 */
class ModesManager {
    static instance = null;

    constructor() {
        if (ModesManager.instance) {
            return ModesManager.instance;
        }

        this.currentMode = VIEW_MODES.SPLIT;
        this.orientation = SPLIT_ORIENTATION.HORIZONTAL;
        this.splitRatio = 50; // percentage for left/top panel
        this.editorContainer = null;
        this.previewContainer = null;
        this.mainContainer = null;
        this.initialized = false;

        ModesManager.instance = this;
    }

    /**
     * Initialize modes manager
     * @param {Object} containers - Container elements
     */
    initialize(containers = {}) {
        if (this.initialized) return;

        this.mainContainer = containers.main || document.querySelector('.main-container');
        this.editorContainer = containers.editor || document.querySelector('.editor-container');
        this.previewContainer = containers.preview || document.querySelector('.preview-container');

        // Load saved mode
        this._loadSettings();

        // Apply initial mode
        this._applyMode();

        // Setup resize observer
        this._setupResizeObserver();

        // Setup keyboard shortcuts
        this._setupKeyboardShortcuts();

        this.initialized = true;
    }

    /**
     * Load settings from storage
     * @private
     */
    _loadSettings() {
        const saved = storageService.get(STORAGE_KEYS.VIEW_MODE);
        if (saved) {
            this.currentMode = saved.mode || VIEW_MODES.SPLIT;
            this.orientation = saved.orientation || SPLIT_ORIENTATION.HORIZONTAL;
            this.splitRatio = saved.splitRatio || 50;
        }
    }

    /**
     * Save settings to storage
     * @private
     */
    _saveSettings() {
        storageService.set(STORAGE_KEYS.VIEW_MODE, {
            mode: this.currentMode,
            orientation: this.orientation,
            splitRatio: this.splitRatio
        });
    }

    /**
     * Setup resize observer for container
     * @private
     */
    _setupResizeObserver() {
        if (!this.mainContainer) return;

        const observer = new ResizeObserver(() => {
            editorService.layout();
        });

        observer.observe(this.mainContainer);
    }

    /**
     * Setup keyboard shortcuts
     * @private
     */
    _setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + \ - Toggle mode
            if ((e.ctrlKey || e.metaKey) && e.key === '\\') {
                e.preventDefault();
                this.cycleMode();
            }

            // Ctrl/Cmd + Shift + \ - Toggle orientation
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === '|') {
                e.preventDefault();
                this.toggleOrientation();
            }
        });
    }

    /**
     * Set view mode
     * @param {string} mode - View mode
     */
    setMode(mode) {
        if (!Object.values(VIEW_MODES).includes(mode)) {
            console.error(`Invalid mode: ${mode}`);
            return;
        }

        this.currentMode = mode;
        this._applyMode();
        this._saveSettings();

        eventBus.emit(EVENTS.VIEW_MODE_CHANGED, { mode });
    }

    /**
     * Get current mode
     * @returns {string} Current mode
     */
    getMode() {
        return this.currentMode;
    }

    /**
     * Cycle through modes
     */
    cycleMode() {
        const modes = Object.values(VIEW_MODES);
        const currentIndex = modes.indexOf(this.currentMode);
        const nextIndex = (currentIndex + 1) % modes.length;
        this.setMode(modes[nextIndex]);
    }

    /**
     * Set split orientation
     * @param {string} orientation - Orientation
     */
    setOrientation(orientation) {
        if (!Object.values(SPLIT_ORIENTATION).includes(orientation)) {
            console.error(`Invalid orientation: ${orientation}`);
            return;
        }

        this.orientation = orientation;
        this._applyMode();
        this._saveSettings();

        eventBus.emit(EVENTS.ORIENTATION_CHANGED, { orientation });
    }

    /**
     * Toggle split orientation
     */
    toggleOrientation() {
        const newOrientation = this.orientation === SPLIT_ORIENTATION.HORIZONTAL
            ? SPLIT_ORIENTATION.VERTICAL
            : SPLIT_ORIENTATION.HORIZONTAL;
        this.setOrientation(newOrientation);
    }

    /**
     * Set split ratio
     * @param {number} ratio - Split ratio (0-100)
     */
    setSplitRatio(ratio) {
        this.splitRatio = Math.max(10, Math.min(90, ratio));
        this._applyMode();
        this._saveSettings();
    }

    /**
     * Apply current mode to containers
     * @private
     */
    _applyMode() {
        if (!this.mainContainer) return;

        // Remove all mode classes
        this.mainContainer.classList.remove(
            'mode-split',
            'mode-editor',
            'mode-preview',
            'orientation-horizontal',
            'orientation-vertical'
        );

        // Add current mode class
        this.mainContainer.classList.add(`mode-${this.currentMode}`);

        // Apply orientation for split mode
        if (this.currentMode === VIEW_MODES.SPLIT) {
            this.mainContainer.classList.add(`orientation-${this.orientation}`);

            // Apply split ratio
            if (this.editorContainer && this.previewContainer) {
                if (this.orientation === SPLIT_ORIENTATION.HORIZONTAL) {
                    this.editorContainer.style.width = `${this.splitRatio}%`;
                    this.previewContainer.style.width = `${100 - this.splitRatio}%`;
                    this.editorContainer.style.height = '';
                    this.previewContainer.style.height = '';
                } else {
                    this.editorContainer.style.height = `${this.splitRatio}%`;
                    this.previewContainer.style.height = `${100 - this.splitRatio}%`;
                    this.editorContainer.style.width = '';
                    this.previewContainer.style.width = '';
                }
            }
        }

        // Show/hide containers based on mode
        if (this.editorContainer) {
            this.editorContainer.style.display =
                this.currentMode === VIEW_MODES.PREVIEW ? 'none' : '';
        }

        if (this.previewContainer) {
            this.previewContainer.style.display =
                this.currentMode === VIEW_MODES.EDITOR ? 'none' : '';
        }

        // Trigger editor layout update
        setTimeout(() => {
            editorService.layout();
        }, 0);
    }

    /**
     * Enable resizable split
     * @param {HTMLElement} handle - Resize handle element
     */
    enableResizable(handle) {
        if (!handle) return;

        let isResizing = false;
        let startPos = 0;
        let startRatio = this.splitRatio;

        const onMouseMove = (e) => {
            if (!isResizing || !this.mainContainer) return;

            const rect = this.mainContainer.getBoundingClientRect();
            let newRatio;

            if (this.orientation === SPLIT_ORIENTATION.HORIZONTAL) {
                newRatio = ((e.clientX - rect.left) / rect.width) * 100;
            } else {
                newRatio = ((e.clientY - rect.top) / rect.height) * 100;
            }

            this.setSplitRatio(newRatio);
        };

        const onMouseUp = () => {
            isResizing = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };

        handle.addEventListener('mousedown', (e) => {
            if (this.currentMode !== VIEW_MODES.SPLIT) return;

            isResizing = true;
            startPos = this.orientation === SPLIT_ORIENTATION.HORIZONTAL
                ? e.clientX
                : e.clientY;
            startRatio = this.splitRatio;

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);

            document.body.style.cursor = this.orientation === SPLIT_ORIENTATION.HORIZONTAL
                ? 'col-resize'
                : 'row-resize';
            document.body.style.userSelect = 'none';
        });
    }

    /**
     * Check if in editor-only mode
     * @returns {boolean}
     */
    isEditorMode() {
        return this.currentMode === VIEW_MODES.EDITOR;
    }

    /**
     * Check if in preview-only mode
     * @returns {boolean}
     */
    isPreviewMode() {
        return this.currentMode === VIEW_MODES.PREVIEW;
    }

    /**
     * Check if in split mode
     * @returns {boolean}
     */
    isSplitMode() {
        return this.currentMode === VIEW_MODES.SPLIT;
    }

    /**
     * Dispose modes manager
     */
    dispose() {
        this._saveSettings();
        this.initialized = false;
        ModesManager.instance = null;
    }
}

// Export singleton instance
export const modesManager = new ModesManager();

// Export class and constants
export { ModesManager, VIEW_MODES, SPLIT_ORIENTATION };

export default modesManager;
