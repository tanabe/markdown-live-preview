/**
 * Scroll Sync Utilities
 * Synchronize scroll position between editor and preview
 * @module utils/scroll-sync
 */

import { eventBus, EVENTS } from './eventBus.js';

/**
 * ScrollSync class
 * Manages bidirectional scroll synchronization
 */
class ScrollSync {
    constructor() {
        this.enabled = false;
        this.isSyncing = false;
        this.syncDelay = 50; // ms
        this.editor = null;
        this.preview = null;
        this.cleanupFunctions = [];
    }

    /**
     * Initialize scroll sync with editor and preview elements
     * @param {Object} editor - Monaco editor instance
     * @param {HTMLElement} preview - Preview container element
     */
    initialize(editor, preview) {
        this.editor = editor;
        this.preview = preview;
        this.setupEventListeners();
    }

    /**
     * Enable scroll sync
     */
    enable() {
        this.enabled = true;
        eventBus.emit(EVENTS.MODE_CHANGED, { scrollSync: true });
    }

    /**
     * Disable scroll sync
     */
    disable() {
        this.enabled = false;
        eventBus.emit(EVENTS.MODE_CHANGED, { scrollSync: false });
    }

    /**
     * Toggle scroll sync
     * @returns {boolean} New state
     */
    toggle() {
        if (this.enabled) {
            this.disable();
        } else {
            this.enable();
        }
        return this.enabled;
    }

    /**
     * Check if scroll sync is enabled
     * @returns {boolean} Enabled state
     */
    isEnabled() {
        return this.enabled;
    }

    /**
     * Set up event listeners for scroll sync
     * @private
     */
    setupEventListeners() {
        if (!this.editor || !this.preview) return;

        // Editor scroll handler
        const editorScrollHandler = this.editor.onDidScrollChange((e) => {
            if (!this.enabled || this.isSyncing) return;
            this.syncEditorToPreview();
        });
        this.cleanupFunctions.push(() => editorScrollHandler.dispose());

        // Preview scroll handler
        const previewScrollHandler = () => {
            if (!this.enabled || this.isSyncing) return;
            this.syncPreviewToEditor();
        };
        this.preview.addEventListener('scroll', previewScrollHandler);
        this.cleanupFunctions.push(() => {
            this.preview.removeEventListener('scroll', previewScrollHandler);
        });
    }

    /**
     * Sync editor scroll to preview
     * @private
     */
    syncEditorToPreview() {
        if (!this.editor || !this.preview) return;

        this.isSyncing = true;

        const scrollTop = this.editor.getScrollTop();
        const scrollHeight = this.editor.getScrollHeight();
        const viewportHeight = this.editor.getLayoutInfo().height;

        // Calculate scroll ratio (0 to 1)
        const maxScrollTop = Math.max(0, scrollHeight - viewportHeight);
        const scrollRatio = maxScrollTop > 0 ? scrollTop / maxScrollTop : 0;

        // Apply ratio to preview
        const previewMaxScroll = Math.max(0, this.preview.scrollHeight - this.preview.clientHeight);
        const targetY = previewMaxScroll * scrollRatio;

        this.preview.scrollTop = targetY;

        // Reset flag after delay
        setTimeout(() => {
            this.isSyncing = false;
        }, this.syncDelay);

        eventBus.emit(EVENTS.SCROLL_SYNC_PREVIEW, { ratio: scrollRatio });
    }

    /**
     * Sync preview scroll to editor
     * @private
     */
    syncPreviewToEditor() {
        if (!this.editor || !this.preview) return;

        this.isSyncing = true;

        const scrollTop = this.preview.scrollTop;
        const maxScrollTop = Math.max(0, this.preview.scrollHeight - this.preview.clientHeight);
        const scrollRatio = maxScrollTop > 0 ? scrollTop / maxScrollTop : 0;

        // Apply ratio to editor
        const editorMaxScroll = Math.max(0, this.editor.getScrollHeight() - this.editor.getLayoutInfo().height);
        const targetY = editorMaxScroll * scrollRatio;

        this.editor.setScrollTop(targetY);

        // Reset flag after delay
        setTimeout(() => {
            this.isSyncing = false;
        }, this.syncDelay);

        eventBus.emit(EVENTS.SCROLL_SYNC_EDITOR, { ratio: scrollRatio });
    }

    /**
     * Scroll both editor and preview to top
     */
    scrollToTop() {
        this.isSyncing = true;
        this.editor?.setScrollTop(0);
        if (this.preview) this.preview.scrollTop = 0;
        setTimeout(() => {
            this.isSyncing = false;
        }, this.syncDelay);
    }

    /**
     * Scroll both editor and preview to a specific ratio
     * @param {number} ratio - Scroll ratio (0 to 1)
     */
    scrollToRatio(ratio) {
        this.isSyncing = true;

        if (this.editor) {
            const editorMaxScroll = Math.max(0, this.editor.getScrollHeight() - this.editor.getLayoutInfo().height);
            this.editor.setScrollTop(editorMaxScroll * ratio);
        }

        if (this.preview) {
            const previewMaxScroll = Math.max(0, this.preview.scrollHeight - this.preview.clientHeight);
            this.preview.scrollTop = previewMaxScroll * ratio;
        }

        setTimeout(() => {
            this.isSyncing = false;
        }, this.syncDelay);
    }

    /**
     * Clean up event listeners
     */
    destroy() {
        this.cleanupFunctions.forEach(cleanup => cleanup());
        this.cleanupFunctions = [];
        this.editor = null;
        this.preview = null;
    }
}

// Singleton instance
export const scrollSync = new ScrollSync();

export default scrollSync;
