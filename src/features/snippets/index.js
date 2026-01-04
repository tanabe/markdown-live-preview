/**
 * Snippets Feature Module
 * Provides quick text snippets for markdown
 * @module features/snippets
 */

import { eventBus, EVENTS } from '../../utils/eventBus.js';
import { editorService } from '../../core/editor/index.js';
import { SNIPPETS } from '../../config/snippets.js';

/**
 * SnippetsManager class
 * Manages markdown snippets
 */
class SnippetsManager {
    static instance = null;

    constructor() {
        if (SnippetsManager.instance) {
            return SnippetsManager.instance;
        }

        this.snippets = { ...SNIPPETS };
        this.customSnippets = {};
        this.container = null;
        this.visible = false;
        this.initialized = false;

        SnippetsManager.instance = this;
    }

    /**
     * Initialize snippets manager
     * @param {HTMLElement|string} container - Snippets panel container
     */
    initialize(container = null) {
        if (this.initialized) return;

        if (container) {
            this.container = typeof container === 'string'
                ? document.querySelector(container)
                : container;
        }

        // Load custom snippets
        this._loadCustomSnippets();

        this.initialized = true;
    }

    /**
     * Load custom snippets from storage
     * @private
     */
    _loadCustomSnippets() {
        try {
            const saved = localStorage.getItem('custom_snippets');
            if (saved) {
                this.customSnippets = JSON.parse(saved);
            }
        } catch (e) {
            console.error('Failed to load custom snippets:', e);
        }
    }

    /**
     * Save custom snippets to storage
     * @private
     */
    _saveCustomSnippets() {
        try {
            localStorage.setItem('custom_snippets', JSON.stringify(this.customSnippets));
        } catch (e) {
            console.error('Failed to save custom snippets:', e);
        }
    }

    /**
     * Get all snippets
     * @returns {Object} All snippets
     */
    getAllSnippets() {
        return {
            ...this.snippets,
            ...Object.fromEntries(
                Object.entries(this.customSnippets).map(([key, val]) => [
                    key,
                    { ...val, isCustom: true }
                ])
            )
        };
    }

    /**
     * Get snippet by ID
     * @param {string} id - Snippet ID
     * @returns {Object|null} Snippet object
     */
    getSnippet(id) {
        return this.snippets[id] || this.customSnippets[id] || null;
    }

    /**
     * Insert snippet at cursor
     * @param {string} id - Snippet ID
     */
    insert(id) {
        const snippet = this.getSnippet(id);
        if (!snippet) {
            console.error(`Snippet not found: ${id}`);
            return;
        }

        // Get selected text (for wrap snippets)
        const selectedText = editorService.getSelectedText();
        let content = snippet.content;

        // Replace placeholders
        content = this._processPlaceholders(content, selectedText);

        editorService.insertText(content);
        editorService.focus();

        eventBus.emit(EVENTS.SNIPPET_INSERTED, { id, snippet });
    }

    /**
     * Process placeholders in snippet
     * @param {string} content - Snippet content
     * @param {string} selectedText - Currently selected text
     * @returns {string} Processed content
     * @private
     */
    _processPlaceholders(content, selectedText) {
        // Replace ${selection} with selected text
        content = content.replace(/\$\{selection\}/g, selectedText);

        // Replace ${date} with current date
        content = content.replace(/\$\{date\}/g, new Date().toLocaleDateString());

        // Replace ${time} with current time
        content = content.replace(/\$\{time\}/g, new Date().toLocaleTimeString());

        // Replace ${datetime} with current datetime
        content = content.replace(/\$\{datetime\}/g, new Date().toLocaleString());

        // Replace ${isodate} with ISO date
        content = content.replace(/\$\{isodate\}/g, new Date().toISOString().split('T')[0]);

        // Replace ${cursor} - remove placeholder, cursor will be at end
        content = content.replace(/\$\{cursor\}/g, '');

        return content;
    }

    /**
     * Add custom snippet
     * @param {Object} snippet - Snippet object
     * @returns {string} Snippet ID
     */
    addCustomSnippet(snippet) {
        const id = `custom-${Date.now()}`;

        this.customSnippets[id] = {
            id,
            name: snippet.name || 'Custom Snippet',
            description: snippet.description || '',
            category: snippet.category || 'Custom',
            content: snippet.content || '',
            shortcut: snippet.shortcut || null
        };

        this._saveCustomSnippets();
        this.render();

        eventBus.emit(EVENTS.SNIPPET_CREATED, { id, snippet: this.customSnippets[id] });

        return id;
    }

    /**
     * Remove custom snippet
     * @param {string} id - Snippet ID
     */
    removeCustomSnippet(id) {
        if (this.customSnippets[id]) {
            delete this.customSnippets[id];
            this._saveCustomSnippets();
            this.render();

            eventBus.emit(EVENTS.SNIPPET_REMOVED, { id });
        }
    }

    /**
     * Show snippets panel
     */
    show() {
        this.visible = true;
        this.render();

        if (this.container) {
            this.container.classList.add('visible');
        }

        eventBus.emit(EVENTS.SNIPPETS_SHOWN);
    }

    /**
     * Hide snippets panel
     */
    hide() {
        this.visible = false;

        if (this.container) {
            this.container.classList.remove('visible');
        }

        eventBus.emit(EVENTS.SNIPPETS_HIDDEN);
    }

    /**
     * Toggle snippets panel
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
     * Get snippets grouped by category
     * @returns {Object} Snippets by category
     */
    getByCategory() {
        const all = this.getAllSnippets();
        const grouped = {};

        Object.values(all).forEach(snippet => {
            const category = snippet.category || 'Other';
            if (!grouped[category]) {
                grouped[category] = [];
            }
            grouped[category].push(snippet);
        });

        return grouped;
    }

    /**
     * Render snippets panel
     */
    render() {
        if (!this.container) return;

        const grouped = this.getByCategory();

        this.container.innerHTML = `
            <div class="snippets-panel">
                <div class="snippets-header">
                    <h3>Snippets</h3>
                    <button class="snippets-close" title="Close">×</button>
                </div>
                <div class="snippets-search">
                    <input type="text" 
                           class="snippets-search-input" 
                           placeholder="Search snippets...">
                </div>
                <div class="snippets-content">
                    ${Object.entries(grouped).map(([category, snippets]) => `
                        <div class="snippet-category">
                            <h4 class="category-title">${this._getCategoryIcon(category)} ${category}</h4>
                            <div class="snippet-list">
                                ${snippets.map(snippet => `
                                    <div class="snippet-item" data-id="${snippet.id}">
                                        <div class="snippet-info">
                                            <span class="snippet-name">${snippet.name}</span>
                                            ${snippet.shortcut ? `
                                                <kbd class="snippet-shortcut">${snippet.shortcut}</kbd>
                                            ` : ''}
                                        </div>
                                        <span class="snippet-desc">${snippet.description || ''}</span>
                                        ${snippet.isCustom ? `
                                            <button class="snippet-delete" data-id="${snippet.id}" title="Delete">
                                                ×
                                            </button>
                                        ` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="snippets-footer">
                    <button class="snippets-btn create-snippet">
                        + Create Snippet
                    </button>
                </div>
            </div>
        `;

        this._attachEventHandlers();
    }

    /**
     * Get category icon
     * @param {string} category - Category name
     * @returns {string} Icon
     * @private
     */
    _getCategoryIcon(category) {
        const icons = {
            'Formatting': '🔤',
            'Headers': '📑',
            'Lists': '📋',
            'Code': '💻',
            'Links & Media': '🔗',
            'Tables': '📊',
            'Custom': '⭐'
        };
        return icons[category] || '📄';
    }

    /**
     * Attach event handlers
     * @private
     */
    _attachEventHandlers() {
        if (!this.container) return;

        // Close button
        this.container.querySelector('.snippets-close')
            ?.addEventListener('click', () => this.hide());

        // Snippet items
        this.container.querySelectorAll('.snippet-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.closest('.snippet-delete')) {
                    this.insert(item.dataset.id);
                    this.hide();
                }
            });
        });

        // Delete buttons
        this.container.querySelectorAll('.snippet-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.removeCustomSnippet(btn.dataset.id);
            });
        });

        // Search
        const searchInput = this.container.querySelector('.snippets-search-input');
        searchInput?.addEventListener('input', (e) => {
            this._filterSnippets(e.target.value);
        });

        // Create snippet
        this.container.querySelector('.create-snippet')
            ?.addEventListener('click', () => {
                this._showCreateDialog();
            });
    }

    /**
     * Filter snippets by search term
     * @param {string} term - Search term
     * @private
     */
    _filterSnippets(term) {
        if (!this.container) return;

        const items = this.container.querySelectorAll('.snippet-item');
        const lowerTerm = term.toLowerCase();

        items.forEach(item => {
            const name = item.querySelector('.snippet-name')?.textContent.toLowerCase() || '';
            const desc = item.querySelector('.snippet-desc')?.textContent.toLowerCase() || '';

            if (name.includes(lowerTerm) || desc.includes(lowerTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });

        // Hide empty categories
        this.container.querySelectorAll('.snippet-category').forEach(cat => {
            const visibleItems = cat.querySelectorAll('.snippet-item:not([style*="display: none"])');
            cat.style.display = visibleItems.length > 0 ? '' : 'none';
        });
    }

    /**
     * Show create snippet dialog
     * @private
     */
    _showCreateDialog() {
        const selectedText = editorService.getSelectedText();

        eventBus.emit(EVENTS.SHOW_SNIPPET_DIALOG, {
            defaultContent: selectedText,
            onConfirm: (snippet) => {
                this.addCustomSnippet(snippet);
            }
        });
    }

    /**
     * Dispose snippets manager
     */
    dispose() {
        this.customSnippets = {};
        this.initialized = false;
        SnippetsManager.instance = null;
    }
}

// Export singleton instance
export const snippetsManager = new SnippetsManager();

// Export class for testing
export { SnippetsManager };

export default snippetsManager;
