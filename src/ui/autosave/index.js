/**
 * Autosave Indicator
 * Shows save status to user
 * @module ui/autosave
 */

import { eventBus, EVENTS } from '../../utils/eventBus.js';

/**
 * AutosaveIndicator class
 * Displays autosave status
 */
class AutosaveIndicator {
    static instance = null;

    constructor() {
        if (AutosaveIndicator.instance) {
            return AutosaveIndicator.instance;
        }

        this.element = null;
        this.timeout = null;

        AutosaveIndicator.instance = this;
    }

    /**
     * Initialize autosave indicator
     * @param {HTMLElement|string} element - Indicator element
     */
    initialize(element) {
        this.element = typeof element === 'string'
            ? document.querySelector(element)
            : element;

        if (!this.element) {
            // Create element if not exists
            this.element = document.createElement('span');
            this.element.id = 'autosave-indicator';
            this.element.className = 'autosave-indicator';

            // Try to find a place to insert
            const header = document.querySelector('header') || document.body;
            header.appendChild(this.element);
        }

        // Subscribe to save events
        eventBus.on(EVENTS.DOCUMENT_SAVING, () => this.showSaving());
        eventBus.on(EVENTS.DOCUMENT_SAVED, () => this.showSaved());
    }

    /**
     * Show saving state
     */
    showSaving() {
        if (!this.element) return;

        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.element.textContent = '💾 Saving...';
        this.element.classList.add('saving');
        this.element.classList.remove('saved');
    }

    /**
     * Show saved state
     */
    showSaved() {
        if (!this.element) return;

        this.element.textContent = '✓ Saved';
        this.element.classList.remove('saving');
        this.element.classList.add('saved');

        // Clear after delay
        this.timeout = setTimeout(() => {
            this.element.textContent = '';
            this.element.classList.remove('saved');
        }, 2000);
    }

    /**
     * Show error state
     * @param {string} message
     */
    showError(message = 'Save failed') {
        if (!this.element) return;

        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.element.textContent = `⚠ ${message}`;
        this.element.classList.remove('saving', 'saved');
        this.element.classList.add('error');

        this.timeout = setTimeout(() => {
            this.element.textContent = '';
            this.element.classList.remove('error');
        }, 3000);
    }

    /**
     * Clear indicator
     */
    clear() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        if (this.element) {
            this.element.textContent = '';
            this.element.classList.remove('saving', 'saved', 'error');
        }
    }

    /**
     * Dispose indicator
     */
    dispose() {
        this.clear();
        AutosaveIndicator.instance = null;
    }
}

export const autosaveIndicator = new AutosaveIndicator();
export { AutosaveIndicator };
export default autosaveIndicator;
