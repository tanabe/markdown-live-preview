/**
 * Search Feature Module
 * Provides search and replace functionality
 * @module features/search
 */

import { eventBus, EVENTS } from '../../utils/eventBus.js';
import { editorService } from '../../core/editor/index.js';

/**
 * Search match structure
 * @typedef {Object} SearchMatch
 * @property {number} line - Line number
 * @property {number} column - Column number
 * @property {number} endColumn - End column
 * @property {string} text - Matched text
 * @property {string} context - Line context
 */

/**
 * SearchManager class
 * Manages search and replace operations
 */
class SearchManager {
    static instance = null;

    constructor() {
        if (SearchManager.instance) {
            return SearchManager.instance;
        }

        this.searchTerm = '';
        this.replaceTerm = '';
        this.matches = [];
        this.currentMatchIndex = -1;
        this.options = {
            caseSensitive: false,
            wholeWord: false,
            regex: false
        };
        this.container = null;
        this.visible = false;
        this.decorations = [];
        this.initialized = false;

        SearchManager.instance = this;
    }

    /**
     * Initialize search manager
     * @param {HTMLElement|string} container - Search panel container
     */
    initialize(container = null) {
        if (this.initialized) return;

        if (container) {
            this.container = typeof container === 'string'
                ? document.querySelector(container)
                : container;
        }

        this._setupKeyboardShortcuts();

        this.initialized = true;
    }

    /**
     * Setup keyboard shortcuts
     * @private
     */
    _setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + F - Find
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                e.preventDefault();
                this.show();
            }

            // Ctrl/Cmd + H - Replace
            if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
                e.preventDefault();
                this.show(true);
            }

            // Escape - Close
            if (e.key === 'Escape' && this.visible) {
                this.hide();
            }

            // F3 or Enter in search - Next
            if ((e.key === 'F3' || (e.key === 'Enter' && this.visible)) && !e.shiftKey) {
                if (this.matches.length > 0) {
                    e.preventDefault();
                    this.next();
                }
            }

            // Shift + F3 - Previous
            if (e.key === 'F3' && e.shiftKey) {
                if (this.matches.length > 0) {
                    e.preventDefault();
                    this.previous();
                }
            }
        });
    }

    /**
     * Perform search
     * @param {string} term - Search term
     * @param {Object} options - Search options
     * @returns {SearchMatch[]} Matches found
     */
    search(term, options = {}) {
        this.searchTerm = term;
        this.options = { ...this.options, ...options };
        this.matches = [];
        this.currentMatchIndex = -1;

        // Clear previous decorations
        this._clearDecorations();

        if (!term) {
            this._updateUI();
            return [];
        }

        const content = editorService.getValue();
        const lines = content.split('\n');

        // Build regex
        let searchRegex;
        try {
            let pattern = this.options.regex
                ? term
                : term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

            if (this.options.wholeWord) {
                pattern = `\\b${pattern}\\b`;
            }

            const flags = this.options.caseSensitive ? 'g' : 'gi';
            searchRegex = new RegExp(pattern, flags);
        } catch (e) {
            console.error('Invalid regex:', e);
            return [];
        }

        // Find matches
        lines.forEach((line, lineIndex) => {
            let match;
            while ((match = searchRegex.exec(line)) !== null) {
                this.matches.push({
                    line: lineIndex + 1,
                    column: match.index + 1,
                    endColumn: match.index + match[0].length + 1,
                    text: match[0],
                    context: line.trim()
                });
            }
        });

        // Highlight matches
        this._highlightMatches();

        // Go to first match
        if (this.matches.length > 0) {
            this.currentMatchIndex = 0;
            this._goToCurrentMatch();
        }

        this._updateUI();

        eventBus.emit(EVENTS.SEARCH_COMPLETED, {
            term,
            matches: this.matches.length
        });

        return this.matches;
    }

    /**
     * Highlight matches in editor
     * @private
     */
    _highlightMatches() {
        if (!editorService.getEditor()) return;

        const decorations = this.matches.map((match, index) => ({
            range: {
                startLineNumber: match.line,
                startColumn: match.column,
                endLineNumber: match.line,
                endColumn: match.endColumn
            },
            options: {
                className: index === this.currentMatchIndex
                    ? 'search-match-current'
                    : 'search-match',
                overviewRuler: {
                    color: index === this.currentMatchIndex ? '#ffeb3b' : '#ffd54f',
                    position: 1
                }
            }
        }));

        this.decorations = editorService.getEditor().deltaDecorations(
            this.decorations,
            decorations
        );
    }

    /**
     * Clear search decorations
     * @private
     */
    _clearDecorations() {
        if (editorService.getEditor() && this.decorations.length) {
            this.decorations = editorService.getEditor().deltaDecorations(
                this.decorations,
                []
            );
        }
    }

    /**
     * Go to current match
     * @private
     */
    _goToCurrentMatch() {
        if (this.currentMatchIndex < 0 || this.currentMatchIndex >= this.matches.length) {
            return;
        }

        const match = this.matches[this.currentMatchIndex];
        editorService.setPosition({
            lineNumber: match.line,
            column: match.column
        });
        editorService.revealLine(match.line, 'center');

        // Update highlights
        this._highlightMatches();

        eventBus.emit(EVENTS.SEARCH_MATCH_CHANGED, {
            current: this.currentMatchIndex + 1,
            total: this.matches.length,
            match
        });
    }

    /**
     * Go to next match
     */
    next() {
        if (this.matches.length === 0) return;

        this.currentMatchIndex = (this.currentMatchIndex + 1) % this.matches.length;
        this._goToCurrentMatch();
    }

    /**
     * Go to previous match
     */
    previous() {
        if (this.matches.length === 0) return;

        this.currentMatchIndex = this.currentMatchIndex <= 0
            ? this.matches.length - 1
            : this.currentMatchIndex - 1;
        this._goToCurrentMatch();
    }

    /**
     * Replace current match
     * @param {string} replacement - Replacement text
     */
    replaceCurrent(replacement) {
        if (this.matches.length === 0 || this.currentMatchIndex < 0) return;

        const match = this.matches[this.currentMatchIndex];
        const range = {
            startLineNumber: match.line,
            startColumn: match.column,
            endLineNumber: match.line,
            endColumn: match.endColumn
        };

        editorService.replaceRange(range, replacement);

        // Re-search to update matches
        this.search(this.searchTerm, this.options);
    }

    /**
     * Replace all matches
     * @param {string} replacement - Replacement text
     * @returns {number} Number of replacements made
     */
    replaceAll(replacement) {
        if (this.matches.length === 0) return 0;

        const count = this.matches.length;

        // Replace from end to start to maintain positions
        const reversedMatches = [...this.matches].reverse();

        reversedMatches.forEach(match => {
            const range = {
                startLineNumber: match.line,
                startColumn: match.column,
                endLineNumber: match.line,
                endColumn: match.endColumn
            };
            editorService.replaceRange(range, replacement);
        });

        // Clear search
        this.clear();

        eventBus.emit(EVENTS.REPLACE_ALL_COMPLETED, {
            count,
            replacement
        });

        return count;
    }

    /**
     * Clear search
     */
    clear() {
        this.searchTerm = '';
        this.matches = [];
        this.currentMatchIndex = -1;
        this._clearDecorations();
        this._updateUI();
    }

    /**
     * Show search panel
     * @param {boolean} showReplace - Show replace field
     */
    show(showReplace = false) {
        this.visible = true;
        this.render(showReplace);

        if (this.container) {
            this.container.classList.add('visible');
            const input = this.container.querySelector('.search-input');
            if (input) {
                input.focus();
                input.select();
            }
        }

        eventBus.emit(EVENTS.SEARCH_SHOWN);
    }

    /**
     * Hide search panel
     */
    hide() {
        this.visible = false;
        this.clear();

        if (this.container) {
            this.container.classList.remove('visible');
        }

        editorService.focus();

        eventBus.emit(EVENTS.SEARCH_HIDDEN);
    }

    /**
     * Toggle search panel
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
     * Get matches
     * @returns {SearchMatch[]} All matches
     */
    getMatches() {
        return [...this.matches];
    }

    /**
     * Update UI
     * @private
     */
    _updateUI() {
        if (!this.container) return;

        const countEl = this.container.querySelector('.search-count');
        if (countEl) {
            if (this.matches.length > 0) {
                countEl.textContent = `${this.currentMatchIndex + 1} of ${this.matches.length}`;
            } else if (this.searchTerm) {
                countEl.textContent = 'No results';
            } else {
                countEl.textContent = '';
            }
        }
    }

    /**
     * Render search panel
     * @param {boolean} showReplace - Show replace field
     */
    render(showReplace = false) {
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="search-panel">
                <div class="search-row">
                    <div class="search-input-wrapper">
                        <input type="text" 
                               class="search-input" 
                               placeholder="Search..."
                               value="${this.searchTerm}">
                        <span class="search-count"></span>
                    </div>
                    <div class="search-options">
                        <button class="search-option ${this.options.caseSensitive ? 'active' : ''}" 
                                data-option="caseSensitive" 
                                title="Case Sensitive (Alt+C)">
                            Aa
                        </button>
                        <button class="search-option ${this.options.wholeWord ? 'active' : ''}" 
                                data-option="wholeWord" 
                                title="Whole Word (Alt+W)">
                            \\b
                        </button>
                        <button class="search-option ${this.options.regex ? 'active' : ''}" 
                                data-option="regex" 
                                title="Regular Expression (Alt+R)">
                            .*
                        </button>
                    </div>
                    <div class="search-nav">
                        <button class="search-nav-btn" data-action="prev" title="Previous (Shift+F3)">↑</button>
                        <button class="search-nav-btn" data-action="next" title="Next (F3)">↓</button>
                    </div>
                    <button class="search-close" title="Close (Esc)">×</button>
                </div>
                ${showReplace ? `
                <div class="replace-row">
                    <input type="text" 
                           class="replace-input" 
                           placeholder="Replace with..."
                           value="${this.replaceTerm}">
                    <button class="replace-btn" data-action="replace">Replace</button>
                    <button class="replace-btn" data-action="replaceAll">All</button>
                </div>
                ` : ''}
            </div>
        `;

        this._attachEventHandlers(showReplace);
        this._updateUI();
    }

    /**
     * Attach event handlers to search panel
     * @param {boolean} showReplace - Is replace visible
     * @private
     */
    _attachEventHandlers(showReplace) {
        if (!this.container) return;

        // Search input
        const searchInput = this.container.querySelector('.search-input');
        searchInput.addEventListener('input', (e) => {
            this.search(e.target.value, this.options);
        });

        // Options
        this.container.querySelectorAll('.search-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const option = btn.dataset.option;
                this.options[option] = !this.options[option];
                btn.classList.toggle('active');
                if (this.searchTerm) {
                    this.search(this.searchTerm, this.options);
                }
            });
        });

        // Navigation
        this.container.querySelector('[data-action="prev"]')
            .addEventListener('click', () => this.previous());
        this.container.querySelector('[data-action="next"]')
            .addEventListener('click', () => this.next());

        // Close
        this.container.querySelector('.search-close')
            .addEventListener('click', () => this.hide());

        // Replace handlers
        if (showReplace) {
            const replaceInput = this.container.querySelector('.replace-input');
            replaceInput.addEventListener('input', (e) => {
                this.replaceTerm = e.target.value;
            });

            this.container.querySelector('[data-action="replace"]')
                .addEventListener('click', () => this.replaceCurrent(this.replaceTerm));
            this.container.querySelector('[data-action="replaceAll"]')
                .addEventListener('click', () => this.replaceAll(this.replaceTerm));
        }
    }

    /**
     * Dispose search manager
     */
    dispose() {
        this.clear();
        this.initialized = false;
        SearchManager.instance = null;
    }
}

// Export singleton instance
export const searchManager = new SearchManager();

// Export class for testing
export { SearchManager };

export default searchManager;
