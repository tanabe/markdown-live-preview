/**
 * Toolbar Feature Module
 * Provides markdown formatting toolbar
 * @module features/toolbar
 */

import { eventBus, EVENTS } from '../../utils/eventBus.js';
import { editorService } from '../../core/editor/index.js';

/**
 * Toolbar button definition
 * @typedef {Object} ToolbarButton
 * @property {string} id - Button ID
 * @property {string} icon - Button icon (emoji or SVG)
 * @property {string} title - Button tooltip
 * @property {string} shortcut - Keyboard shortcut
 * @property {Function} action - Button action
 */

/**
 * Default toolbar buttons
 */
const DEFAULT_BUTTONS = [
    {
        id: 'bold',
        icon: '𝐁',
        title: 'Bold',
        shortcut: 'Ctrl+B',
        action: () => wrapSelection('**', '**')
    },
    {
        id: 'italic',
        icon: '𝐼',
        title: 'Italic',
        shortcut: 'Ctrl+I',
        action: () => wrapSelection('*', '*')
    },
    {
        id: 'strikethrough',
        icon: 'S̶',
        title: 'Strikethrough',
        shortcut: 'Ctrl+Shift+S',
        action: () => wrapSelection('~~', '~~')
    },
    { id: 'divider-1', type: 'divider' },
    {
        id: 'h1',
        icon: 'H1',
        title: 'Heading 1',
        action: () => prefixLine('# ')
    },
    {
        id: 'h2',
        icon: 'H2',
        title: 'Heading 2',
        action: () => prefixLine('## ')
    },
    {
        id: 'h3',
        icon: 'H3',
        title: 'Heading 3',
        action: () => prefixLine('### ')
    },
    { id: 'divider-2', type: 'divider' },
    {
        id: 'ul',
        icon: '•',
        title: 'Bullet List',
        action: () => prefixLine('- ')
    },
    {
        id: 'ol',
        icon: '1.',
        title: 'Numbered List',
        action: () => prefixLine('1. ')
    },
    {
        id: 'task',
        icon: '☐',
        title: 'Task List',
        action: () => prefixLine('- [ ] ')
    },
    { id: 'divider-3', type: 'divider' },
    {
        id: 'code',
        icon: '</>',
        title: 'Inline Code',
        shortcut: 'Ctrl+`',
        action: () => wrapSelection('`', '`')
    },
    {
        id: 'codeblock',
        icon: '```',
        title: 'Code Block',
        action: () => wrapSelection('```\n', '\n```')
    },
    {
        id: 'quote',
        icon: '"',
        title: 'Quote',
        action: () => prefixLine('> ')
    },
    { id: 'divider-4', type: 'divider' },
    {
        id: 'link',
        icon: '🔗',
        title: 'Link',
        shortcut: 'Ctrl+K',
        action: insertLink
    },
    {
        id: 'image',
        icon: '🖼️',
        title: 'Image',
        action: insertImage
    },
    {
        id: 'table',
        icon: '📊',
        title: 'Table',
        action: insertTable
    },
    { id: 'divider-5', type: 'divider' },
    {
        id: 'hr',
        icon: '—',
        title: 'Horizontal Rule',
        action: () => insertText('\n---\n')
    }
];

/**
 * Wrap selection with prefix and suffix
 * @param {string} prefix - Text before selection
 * @param {string} suffix - Text after selection
 */
function wrapSelection(prefix, suffix) {
    const editor = editorService.getEditor();
    if (!editor) return;

    const selection = editor.getSelection();
    const selectedText = editor.getModel().getValueInRange(selection);

    // Check if already wrapped
    const fullRange = {
        startLineNumber: selection.startLineNumber,
        startColumn: Math.max(1, selection.startColumn - prefix.length),
        endLineNumber: selection.endLineNumber,
        endColumn: selection.endColumn + suffix.length
    };

    const extendedText = editor.getModel().getValueInRange(fullRange);
    const isWrapped = extendedText.startsWith(prefix) && extendedText.endsWith(suffix);

    if (isWrapped && selectedText) {
        // Unwrap
        editor.executeEdits('toolbar', [{
            range: fullRange,
            text: selectedText
        }]);
    } else {
        // Wrap
        editor.executeEdits('toolbar', [{
            range: selection,
            text: `${prefix}${selectedText || 'text'}${suffix}`
        }]);

        // Select the inserted text if nothing was selected
        if (!selectedText) {
            const newPosition = {
                lineNumber: selection.startLineNumber,
                column: selection.startColumn + prefix.length
            };
            editor.setSelection({
                startLineNumber: newPosition.lineNumber,
                startColumn: newPosition.column,
                endLineNumber: newPosition.lineNumber,
                endColumn: newPosition.column + 4 // 'text'.length
            });
        }
    }

    editor.focus();
}

/**
 * Add prefix to current line
 * @param {string} prefix - Prefix to add
 */
function prefixLine(prefix) {
    const editor = editorService.getEditor();
    if (!editor) return;

    const position = editor.getPosition();
    const lineContent = editor.getModel().getLineContent(position.lineNumber);

    // Check if line already has the prefix
    if (lineContent.startsWith(prefix)) {
        // Remove prefix
        editor.executeEdits('toolbar', [{
            range: {
                startLineNumber: position.lineNumber,
                startColumn: 1,
                endLineNumber: position.lineNumber,
                endColumn: prefix.length + 1
            },
            text: ''
        }]);
    } else {
        // Add prefix
        editor.executeEdits('toolbar', [{
            range: {
                startLineNumber: position.lineNumber,
                startColumn: 1,
                endLineNumber: position.lineNumber,
                endColumn: 1
            },
            text: prefix
        }]);
    }

    editor.focus();
}

/**
 * Insert text at cursor
 * @param {string} text - Text to insert
 */
function insertText(text) {
    editorService.insertText(text);
    editorService.focus();
}

/**
 * Insert link
 */
function insertLink() {
    const selectedText = editorService.getSelectedText();
    const linkText = selectedText || 'link text';
    editorService.insertText(`[${linkText}](url)`);
    editorService.focus();
}

/**
 * Insert image
 */
function insertImage() {
    const selectedText = editorService.getSelectedText();
    const altText = selectedText || 'alt text';
    editorService.insertText(`![${altText}](image-url)`);
    editorService.focus();
}

/**
 * Insert table
 */
function insertTable() {
    const table = `
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
`;
    editorService.insertText(table);
    editorService.focus();
}

/**
 * ToolbarManager class
 * Manages the formatting toolbar
 */
class ToolbarManager {
    static instance = null;

    constructor() {
        if (ToolbarManager.instance) {
            return ToolbarManager.instance;
        }

        this.buttons = [...DEFAULT_BUTTONS];
        this.container = null;
        this.visible = true;
        this.initialized = false;

        ToolbarManager.instance = this;
    }

    /**
     * Initialize toolbar
     * @param {HTMLElement|string} container - Toolbar container
     */
    initialize(container) {
        if (this.initialized) return;

        this.container = typeof container === 'string'
            ? document.querySelector(container)
            : container;

        this._setupKeyboardShortcuts();
        this.render();

        this.initialized = true;
    }

    /**
     * Setup keyboard shortcuts
     * @private
     */
    _setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Only when editor is focused or in main area
            const button = this._findButtonByShortcut(e);
            if (button) {
                e.preventDefault();
                button.action();
            }
        });
    }

    /**
     * Find button matching keyboard event
     * @param {KeyboardEvent} e - Keyboard event
     * @returns {ToolbarButton|null} Matching button
     * @private
     */
    _findButtonByShortcut(e) {
        const ctrl = e.ctrlKey || e.metaKey;
        const shift = e.shiftKey;
        const key = e.key.toLowerCase();

        return this.buttons.find(btn => {
            if (!btn.shortcut) return false;

            const shortcut = btn.shortcut.toLowerCase();
            const parts = shortcut.split('+');

            const needsCtrl = parts.includes('ctrl');
            const needsShift = parts.includes('shift');
            const shortcutKey = parts[parts.length - 1];

            return ctrl === needsCtrl &&
                shift === needsShift &&
                key === shortcutKey;
        });
    }

    /**
     * Add custom button
     * @param {ToolbarButton} button - Button definition
     * @param {number} position - Insert position (-1 for end)
     */
    addButton(button, position = -1) {
        if (position === -1) {
            this.buttons.push(button);
        } else {
            this.buttons.splice(position, 0, button);
        }
        this.render();
    }

    /**
     * Remove button
     * @param {string} id - Button ID
     */
    removeButton(id) {
        const index = this.buttons.findIndex(b => b.id === id);
        if (index !== -1) {
            this.buttons.splice(index, 1);
            this.render();
        }
    }

    /**
     * Show toolbar
     */
    show() {
        this.visible = true;
        if (this.container) {
            this.container.style.display = '';
        }
    }

    /**
     * Hide toolbar
     */
    hide() {
        this.visible = false;
        if (this.container) {
            this.container.style.display = 'none';
        }
    }

    /**
     * Toggle toolbar visibility
     * @returns {boolean} New visibility
     */
    toggle() {
        if (this.visible) {
            this.hide();
        } else {
            this.show();
        }
        return this.visible;
    }

    /**
     * Render toolbar
     */
    render() {
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="toolbar" role="toolbar" aria-label="Formatting toolbar">
                ${this.buttons.map(btn => {
            if (btn.type === 'divider') {
                return '<div class="toolbar-divider"></div>';
            }

            return `
                        <button class="toolbar-btn" 
                                data-id="${btn.id}"
                                title="${btn.title}${btn.shortcut ? ` (${btn.shortcut})` : ''}"
                                aria-label="${btn.title}">
                            ${btn.icon}
                        </button>
                    `;
        }).join('')}
            </div>
        `;

        this._attachEventHandlers();
    }

    /**
     * Attach event handlers
     * @private
     */
    _attachEventHandlers() {
        if (!this.container) return;

        this.container.querySelectorAll('.toolbar-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const button = this.buttons.find(b => b.id === btn.dataset.id);
                if (button && button.action) {
                    button.action();
                }
            });
        });
    }

    /**
     * Dispose toolbar
     */
    dispose() {
        this.buttons = [];
        this.initialized = false;
        ToolbarManager.instance = null;
    }
}

// Export singleton instance
export const toolbarManager = new ToolbarManager();

// Export utility functions
export { wrapSelection, prefixLine, insertText, insertLink, insertImage, insertTable };

// Export class for testing
export { ToolbarManager };

export default toolbarManager;
