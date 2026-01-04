/**
 * Focus Mode Manager
 * Handles focus mode for distraction-free writing
 * @module features/focus
 */

import { eventBus, EVENTS } from '../../utils/eventBus.js';
import { storageService } from '../../core/storage/index.js';

/**
 * FocusManager class
 * Manages focus mode state and behavior
 */
class FocusManager {
    static instance = null;

    constructor() {
        if (FocusManager.instance) {
            return FocusManager.instance;
        }

        this.isEnabled = false;
        this.button = null;
        this.escHandler = null;

        FocusManager.instance = this;
    }

    /**
     * Initialize focus mode
     * @param {HTMLElement|string} button - Focus toggle button
     */
    initialize(button) {
        this.button = typeof button === 'string'
            ? document.querySelector(button)
            : button;

        if (this.button) {
            this.button.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggle();
            });
        }

        // ESC key handler
        this.escHandler = (e) => {
            if (e.key === 'Escape' && this.isEnabled) {
                this.disable();
            }
        };

        document.addEventListener('keydown', this.escHandler);

        // Subscribe to events
        eventBus.on(EVENTS.FOCUS_MODE_TOGGLE, () => this.toggle());
    }

    /**
     * Toggle focus mode
     */
    toggle() {
        if (this.isEnabled) {
            this.disable();
        } else {
            this.enable();
        }
    }

    /**
     * Enable focus mode
     */
    enable() {
        this.isEnabled = true;
        document.body.classList.add('focus-mode');

        if (this.button) {
            const link = this.button.querySelector('a');
            if (link) link.textContent = 'Exit Focus';
            this.button.classList.add('active');
        }

        eventBus.emit(EVENTS.FOCUS_MODE_CHANGED, { enabled: true });
        eventBus.emit(EVENTS.TOAST_SHOW, {
            message: 'Focus Mode Enabled (Press ESC to exit)',
            type: 'success'
        });
    }

    /**
     * Disable focus mode
     */
    disable() {
        this.isEnabled = false;
        document.body.classList.remove('focus-mode');

        if (this.button) {
            const link = this.button.querySelector('a');
            if (link) link.textContent = 'Focus';
            this.button.classList.remove('active');
        }

        eventBus.emit(EVENTS.FOCUS_MODE_CHANGED, { enabled: false });
        eventBus.emit(EVENTS.TOAST_SHOW, {
            message: 'Focus Mode Disabled',
            type: 'info',
            duration: 1500
        });
    }

    /**
     * Get current state
     * @returns {boolean}
     */
    getState() {
        return this.isEnabled;
    }

    /**
     * Dispose manager
     */
    dispose() {
        if (this.escHandler) {
            document.removeEventListener('keydown', this.escHandler);
        }
        this.isEnabled = false;
        document.body.classList.remove('focus-mode');
        FocusManager.instance = null;
    }
}

export const focusManager = new FocusManager();
export { FocusManager };
export default focusManager;
