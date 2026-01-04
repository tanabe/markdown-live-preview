/**
 * TOC (Table of Contents) Feature Module
 * Extracts and renders document headings as a navigable TOC
 * @module features/toc
 */

import { eventBus, EVENTS } from '../../utils/eventBus.js';
import { editorService } from '../../core/editor/index.js';
import { debounce } from '../../utils/debounce.js';

/**
 * TOC item structure
 * @typedef {Object} TOCItem
 * @property {number} level - Heading level (1-6)
 * @property {string} text - Heading text
 * @property {string} id - Anchor ID
 * @property {number} line - Line number in editor
 * @property {TOCItem[]} children - Nested headings
 */

/**
 * TOCManager class
 * Manages table of contents generation and navigation
 */
class TOCManager {
    static instance = null;

    constructor() {
        if (TOCManager.instance) {
            return TOCManager.instance;
        }

        this.items = [];
        this.flat = [];
        this.container = null;
        this.visible = false;
        this.initialized = false;

        TOCManager.instance = this;
    }

    /**
     * Initialize TOC manager
     * @param {HTMLElement|string} container - TOC container element
     */
    initialize(container = null) {
        if (this.initialized) return;

        if (container) {
            this.container = typeof container === 'string'
                ? document.querySelector(container)
                : container;
        }

        // Setup event listeners
        this._setupEventListeners();

        this.initialized = true;
    }

    /**
     * Setup event listeners
     * @private
     */
    _setupEventListeners() {
        // Debounced update on content change
        const debouncedUpdate = debounce((content) => {
            this.update(content);
        }, 500);

        eventBus.on(EVENTS.CONTENT_CHANGED, ({ content }) => {
            debouncedUpdate(content);
        });
    }

    /**
     * Extract headings from markdown content
     * @param {string} content - Markdown content
     */
    update(content) {
        if (!content) {
            this.items = [];
            this.flat = [];
            this.render();
            return;
        }

        this.flat = this._extractHeadings(content);
        this.items = this._buildTree(this.flat);
        this.render();

        eventBus.emit(EVENTS.TOC_UPDATED, { items: this.items, flat: this.flat });
    }

    /**
     * Extract headings from content
     * @param {string} content - Markdown content
     * @returns {TOCItem[]} Flat list of headings
     * @private
     */
    _extractHeadings(content) {
        const headings = [];
        const lines = content.split('\n');
        const headingRegex = /^(#{1,6})\s+(.+)$/;

        let inCodeBlock = false;

        lines.forEach((line, index) => {
            // Track code blocks
            if (line.startsWith('```')) {
                inCodeBlock = !inCodeBlock;
                return;
            }

            // Skip if inside code block
            if (inCodeBlock) return;

            const match = line.match(headingRegex);
            if (match) {
                const level = match[1].length;
                const text = match[2].trim()
                    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
                    .replace(/\*([^*]+)\*/g, '$1') // Remove italic
                    .replace(/`([^`]+)`/g, '$1') // Remove inline code
                    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // Extract link text

                const id = text
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-')
                    .trim();

                headings.push({
                    level,
                    text,
                    id,
                    line: index + 1,
                    children: []
                });
            }
        });

        return headings;
    }

    /**
     * Build hierarchical tree from flat list
     * @param {TOCItem[]} flat - Flat list of headings
     * @returns {TOCItem[]} Hierarchical tree
     * @private
     */
    _buildTree(flat) {
        const root = [];
        const stack = [{ level: 0, children: root }];

        flat.forEach(item => {
            const newItem = { ...item, children: [] };

            // Pop stack until we find a parent
            while (stack.length > 1 && stack[stack.length - 1].level >= item.level) {
                stack.pop();
            }

            // Add to current parent
            stack[stack.length - 1].children.push(newItem);

            // Push as potential parent
            stack.push(newItem);
        });

        return root;
    }

    /**
     * Get flat list of headings
     * @returns {TOCItem[]} Flat list
     */
    getFlat() {
        return [...this.flat];
    }

    /**
     * Get hierarchical tree
     * @returns {TOCItem[]} Tree structure
     */
    getTree() {
        return JSON.parse(JSON.stringify(this.items));
    }

    /**
     * Navigate to heading in editor
     * @param {number} line - Line number
     */
    navigateTo(line) {
        editorService.setPosition({ lineNumber: line, column: 1 });
        editorService.revealLine(line, 'center');
        editorService.focus();

        eventBus.emit(EVENTS.TOC_NAVIGATED, { line });
    }

    /**
     * Navigate to heading in preview
     * @param {string} id - Heading ID
     */
    navigateToPreview(id) {
        const previewElement = document.querySelector(`#${id}, [id="${id}"]`);
        if (previewElement) {
            previewElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    /**
     * Show TOC panel
     */
    show() {
        this.visible = true;
        if (this.container) {
            this.container.classList.add('visible');
        }
        eventBus.emit(EVENTS.TOC_SHOWN);
    }

    /**
     * Hide TOC panel
     */
    hide() {
        this.visible = false;
        if (this.container) {
            this.container.classList.remove('visible');
        }
        eventBus.emit(EVENTS.TOC_HIDDEN);
    }

    /**
     * Toggle TOC visibility
     * @returns {boolean} New visibility state
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
     * Generate TOC as markdown
     * @param {Object} options - Options
     * @returns {string} Markdown TOC
     */
    toMarkdown(options = {}) {
        const { minLevel = 1, maxLevel = 6, ordered = false } = options;

        return this.flat
            .filter(item => item.level >= minLevel && item.level <= maxLevel)
            .map(item => {
                const indent = '  '.repeat(item.level - minLevel);
                const bullet = ordered ? '1.' : '-';
                return `${indent}${bullet} [${item.text}](#${item.id})`;
            })
            .join('\n');
    }

    /**
     * Insert TOC at cursor position
     */
    insertAtCursor() {
        const tocMarkdown = this.toMarkdown();
        const tocContent = `## Table of Contents\n\n${tocMarkdown}\n\n`;
        editorService.insertText(tocContent);
    }

    /**
     * Render TOC UI
     */
    render() {
        if (!this.container) return;

        if (this.flat.length === 0) {
            this.container.innerHTML = `
                <div class="toc-empty">
                    <p>No headings found</p>
                    <small>Add headings with # to see the table of contents</small>
                </div>
            `;
            return;
        }

        this.container.innerHTML = `
            <div class="toc-header">
                <h3>Contents</h3>
                <span class="toc-count">${this.flat.length} headings</span>
            </div>
            <div class="toc-list">
                ${this._renderItems(this.items)}
            </div>
        `;

        // Add click handlers
        this.container.querySelectorAll('.toc-item').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                const line = parseInt(el.dataset.line, 10);
                this.navigateTo(line);
            });
        });
    }

    /**
     * Render TOC items recursively
     * @param {TOCItem[]} items - Items to render
     * @param {number} depth - Current depth
     * @returns {string} HTML string
     * @private
     */
    _renderItems(items, depth = 0) {
        if (!items.length) return '';

        return `
            <ul class="toc-level toc-level-${depth}">
                ${items.map(item => `
                    <li>
                        <a href="#${item.id}" 
                           class="toc-item toc-h${item.level}" 
                           data-line="${item.line}"
                           title="Go to line ${item.line}">
                            ${item.text}
                        </a>
                        ${item.children.length ? this._renderItems(item.children, depth + 1) : ''}
                    </li>
                `).join('')}
            </ul>
        `;
    }

    /**
     * Render compact TOC (for dropdown)
     * @returns {string} HTML string
     */
    renderCompact() {
        return this.flat.map(item => `
            <option value="${item.line}" class="toc-option-h${item.level}">
                ${'—'.repeat(item.level - 1)} ${item.text}
            </option>
        `).join('');
    }

    /**
     * Dispose TOC manager
     */
    dispose() {
        this.items = [];
        this.flat = [];
        this.initialized = false;
        TOCManager.instance = null;
    }
}

// Export singleton instance
export const tocManager = new TOCManager();

// Export class for testing
export { TOCManager };

export default tocManager;
