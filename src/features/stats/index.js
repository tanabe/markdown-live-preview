/**
 * Stats Feature Module
 * Tracks document statistics (words, characters, reading time)
 * @module features/stats
 */

import { eventBus, EVENTS } from '../../utils/eventBus.js';
import { markdownService } from '../../core/markdown/index.js';
import { debounce } from '../../utils/debounce.js';

/**
 * StatsManager class
 * Manages document statistics
 */
class StatsManager {
    static instance = null;

    constructor() {
        if (StatsManager.instance) {
            return StatsManager.instance;
        }

        this.stats = {
            words: 0,
            characters: 0,
            charactersNoSpaces: 0,
            lines: 0,
            paragraphs: 0,
            readingTime: 0
        };

        this.container = null;
        this.initialized = false;

        StatsManager.instance = this;
    }

    /**
     * Initialize stats manager
     * @param {HTMLElement|string} container - Stats container element
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
        }, 300);

        eventBus.on(EVENTS.CONTENT_CHANGED, ({ content }) => {
            debouncedUpdate(content);
        });
    }

    /**
     * Update statistics
     * @param {string} content - Document content
     */
    update(content) {
        this.stats = markdownService.extractStats(content);
        this.render();

        eventBus.emit(EVENTS.STATS_UPDATED, { stats: this.stats });
    }

    /**
     * Get current statistics
     * @returns {Object} Current stats
     */
    getStats() {
        return { ...this.stats };
    }

    /**
     * Get formatted stats string
     * @returns {string} Formatted stats
     */
    getFormattedStats() {
        return `${this.stats.words} words | ${this.stats.characters} chars | ${this.stats.readingTime} min read`;
    }

    /**
     * Render stats UI
     */
    render() {
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="stats-grid">
                <div class="stat-item">
                    <span class="stat-value">${this.stats.words.toLocaleString()}</span>
                    <span class="stat-label">Words</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${this.stats.characters.toLocaleString()}</span>
                    <span class="stat-label">Characters</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${this.stats.lines.toLocaleString()}</span>
                    <span class="stat-label">Lines</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${this.stats.paragraphs.toLocaleString()}</span>
                    <span class="stat-label">Paragraphs</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${this.stats.readingTime}</span>
                    <span class="stat-label">Min Read</span>
                </div>
            </div>
        `;
    }

    /**
     * Render compact stats (for status bar)
     * @param {HTMLElement} element - Target element
     */
    renderCompact(element) {
        if (!element) return;

        element.innerHTML = `
            <span class="stat-compact">${this.stats.words} words</span>
            <span class="stat-divider">|</span>
            <span class="stat-compact">${this.stats.characters} chars</span>
            <span class="stat-divider">|</span>
            <span class="stat-compact">${this.stats.readingTime} min</span>
        `;
    }

    /**
     * Dispose stats manager
     */
    dispose() {
        this.stats = {
            words: 0,
            characters: 0,
            charactersNoSpaces: 0,
            lines: 0,
            paragraphs: 0,
            readingTime: 0
        };
        this.initialized = false;
        StatsManager.instance = null;
    }
}

// Export singleton instance
export const statsManager = new StatsManager();

// Export class for testing
export { StatsManager };

export default statsManager;
