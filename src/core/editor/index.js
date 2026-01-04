/**
 * EditorService
 * Singleton service for managing Monaco editor instance
 * @module core/editor
 */

import * as monaco from 'monaco-editor';
import { setupMonacoWorkers } from './workers.js';
import { defineCustomThemes, THEMES } from './themes.js';
import { eventBus, EVENTS } from '../../utils/eventBus.js';
import { APP_CONFIG } from '../../config/app.config.js';

// Setup workers on module load
setupMonacoWorkers();

/**
 * EditorService class
 * Manages the Monaco editor instance
 */
class EditorService {
    static instance = null;

    constructor() {
        if (EditorService.instance) {
            return EditorService.instance;
        }

        this.editor = null;
        this.initialized = false;
        this.currentTheme = 'vs';
        this.disposables = [];

        EditorService.instance = this;
    }

    /**
     * Initialize the editor
     * @param {HTMLElement|string} container - Container element or selector
     * @param {Object} options - Editor options
     * @returns {Object} Monaco editor instance
     */
    initialize(container, options = {}) {
        if (this.initialized) {
            console.warn('Editor already initialized');
            return this.editor;
        }

        // Define custom themes
        defineCustomThemes(monaco);

        // Get container element
        const containerEl = typeof container === 'string'
            ? document.querySelector(container)
            : container;

        if (!containerEl) {
            throw new Error('Editor container not found');
        }

        // Default options
        const defaultOptions = {
            language: 'markdown',
            fontSize: APP_CONFIG.DEFAULT_FONT_SIZE,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            scrollbar: {
                vertical: 'visible',
                horizontal: 'visible'
            },
            wordWrap: 'on',
            hover: { enabled: false },
            quickSuggestions: false,
            suggestOnTriggerCharacters: false,
            folding: false,
            lineNumbers: 'off',
            renderLineHighlight: 'line',
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            smoothScrolling: true,
            padding: { top: 16, bottom: 16 }
        };

        // Create editor
        this.editor = monaco.editor.create(containerEl, {
            ...defaultOptions,
            ...options
        });

        // Set up event listeners
        this._setupEventListeners();

        this.initialized = true;
        eventBus.emit(EVENTS.EDITOR_READY, { editor: this.editor });

        return this.editor;
    }

    /**
     * Set up internal event listeners
     * @private
     */
    _setupEventListeners() {
        // Content change
        const contentDisposable = this.editor.onDidChangeModelContent((e) => {
            eventBus.emit(EVENTS.CONTENT_CHANGED, {
                content: this.getValue(),
                changes: e.changes
            });
        });
        this.disposables.push(contentDisposable);

        // Cursor position change
        const cursorDisposable = this.editor.onDidChangeCursorPosition((e) => {
            eventBus.emit(EVENTS.CURSOR_MOVED, {
                position: e.position,
                lineNumber: e.position.lineNumber,
                column: e.position.column
            });
        });
        this.disposables.push(cursorDisposable);

        // Selection change
        const selectionDisposable = this.editor.onDidChangeCursorSelection((e) => {
            eventBus.emit(EVENTS.SELECTION_CHANGED, {
                selection: e.selection,
                selections: e.secondarySelections
            });
        });
        this.disposables.push(selectionDisposable);

        // Scroll change
        const scrollDisposable = this.editor.onDidScrollChange((e) => {
            eventBus.emit(EVENTS.EDITOR_SCROLLED, {
                scrollTop: e.scrollTop,
                scrollLeft: e.scrollLeft,
                scrollHeight: e.scrollHeight,
                scrollWidth: e.scrollWidth
            });
        });
        this.disposables.push(scrollDisposable);
    }

    /**
     * Get editor instance
     * @returns {Object|null} Monaco editor instance
     */
    getEditor() {
        return this.editor;
    }

    /**
     * Get editor value
     * @returns {string} Editor content
     */
    getValue() {
        return this.editor?.getValue() ?? '';
    }

    /**
     * Set editor value
     * @param {string} value - Content to set
     */
    setValue(value) {
        if (this.editor) {
            this.editor.setValue(value);
        }
    }

    /**
     * Get current selection
     * @returns {Object|null} Selection object
     */
    getSelection() {
        return this.editor?.getSelection() ?? null;
    }

    /**
     * Get selected text
     * @returns {string} Selected text
     */
    getSelectedText() {
        const selection = this.getSelection();
        if (!selection || !this.editor) return '';
        return this.editor.getModel().getValueInRange(selection);
    }

    /**
     * Insert text at current position or selection
     * @param {string} text - Text to insert
     * @param {Object} range - Optional range to replace
     */
    insertText(text, range = null) {
        if (!this.editor) return;

        const selection = range || this.getSelection();
        this.editor.executeEdits('insert', [{
            range: selection,
            text: text,
            forceMoveMarkers: true
        }]);
    }

    /**
     * Replace text in range
     * @param {Object} range - Range to replace
     * @param {string} text - Replacement text
     */
    replaceRange(range, text) {
        if (!this.editor) return;

        this.editor.executeEdits('replace', [{
            range: range,
            text: text
        }]);
    }

    /**
     * Get cursor position
     * @returns {Object|null} Position object
     */
    getPosition() {
        return this.editor?.getPosition() ?? null;
    }

    /**
     * Set cursor position
     * @param {Object} position - Position { lineNumber, column }
     */
    setPosition(position) {
        this.editor?.setPosition(position);
    }

    /**
     * Reveal line in editor
     * @param {number} lineNumber - Line number to reveal
     * @param {string} position - 'center', 'top', 'bottom'
     */
    revealLine(lineNumber, position = 'center') {
        if (!this.editor) return;

        switch (position) {
            case 'center':
                this.editor.revealLineInCenter(lineNumber);
                break;
            case 'top':
                this.editor.revealLineNearTop(lineNumber);
                break;
            case 'bottom':
                this.editor.revealLine(lineNumber);
                break;
            default:
                this.editor.revealLineInCenter(lineNumber);
        }
    }

    /**
     * Focus the editor
     */
    focus() {
        this.editor?.focus();
    }

    /**
     * Trigger layout recalculation
     */
    layout() {
        this.editor?.layout();
    }

    /**
     * Get scroll position
     * @returns {Object} { scrollTop, scrollLeft }
     */
    getScrollPosition() {
        return {
            scrollTop: this.editor?.getScrollTop() ?? 0,
            scrollLeft: this.editor?.getScrollLeft() ?? 0
        };
    }

    /**
     * Set scroll position
     * @param {number} top - Scroll top
     */
    setScrollTop(top) {
        this.editor?.setScrollTop(top);
    }

    /**
     * Get scroll info
     * @returns {Object} Scroll info object
     */
    getScrollInfo() {
        if (!this.editor) return null;
        return {
            scrollTop: this.editor.getScrollTop(),
            scrollHeight: this.editor.getScrollHeight(),
            viewportHeight: this.editor.getLayoutInfo().height
        };
    }

    /**
     * Set editor theme
     * @param {string} theme - Theme ID
     */
    setTheme(theme) {
        if (THEMES[theme]) {
            monaco.editor.setTheme(theme);
            this.currentTheme = theme;
            eventBus.emit(EVENTS.THEME_CHANGED, { theme });
        }
    }

    /**
     * Get current theme
     * @returns {string} Current theme ID
     */
    getTheme() {
        return this.currentTheme;
    }

    /**
     * Set font size
     * @param {number} size - Font size in pixels
     */
    setFontSize(size) {
        this.editor?.updateOptions({ fontSize: size });
    }

    /**
     * Toggle word wrap
     * @param {boolean} enabled - Enable word wrap
     */
    setWordWrap(enabled) {
        this.editor?.updateOptions({
            wordWrap: enabled ? 'on' : 'off'
        });
    }

    /**
     * Set editor markers (for linting)
     * @param {Array} markers - Array of marker objects
     * @param {string} owner - Marker owner ID
     */
    setMarkers(markers, owner = 'custom') {
        if (!this.editor) return;

        const monacoMarkers = markers.map(m => ({
            severity: m.severity || monaco.MarkerSeverity.Warning,
            message: m.message,
            startLineNumber: m.startLine || m.lineNumber,
            startColumn: m.startColumn || 1,
            endLineNumber: m.endLine || m.lineNumber,
            endColumn: m.endColumn || 1000
        }));

        monaco.editor.setModelMarkers(
            this.editor.getModel(),
            owner,
            monacoMarkers
        );
    }

    /**
     * Clear markers
     * @param {string} owner - Marker owner ID
     */
    clearMarkers(owner = 'custom') {
        if (!this.editor) return;
        monaco.editor.setModelMarkers(this.editor.getModel(), owner, []);
    }

    /**
     * Execute editor action
     * @param {string} actionId - Action ID
     */
    executeAction(actionId) {
        this.editor?.getAction(actionId)?.run();
    }

    /**
     * Add action to editor
     * @param {Object} action - Action definition
     * @returns {Object} Disposable
     */
    addAction(action) {
        return this.editor?.addAction(action);
    }

    /**
     * Get line content
     * @param {number} lineNumber - Line number
     * @returns {string} Line content
     */
    getLineContent(lineNumber) {
        return this.editor?.getModel()?.getLineContent(lineNumber) ?? '';
    }

    /**
     * Get line count
     * @returns {number} Number of lines
     */
    getLineCount() {
        return this.editor?.getModel()?.getLineCount() ?? 0;
    }

    /**
     * Update editor options
     * @param {Object} options - Options to update
     */
    updateOptions(options) {
        this.editor?.updateOptions(options);
    }

    /**
     * Dispose editor and clean up
     */
    dispose() {
        this.disposables.forEach(d => d.dispose());
        this.disposables = [];
        this.editor?.dispose();
        this.editor = null;
        this.initialized = false;
        EditorService.instance = null;
    }
}

// Export singleton instance
export const editorService = new EditorService();

// Also export the class for testing
export { EditorService };

// Re-export themes and utils
export { THEMES, defineCustomThemes } from './themes.js';

export default editorService;
