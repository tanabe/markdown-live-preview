/**
 * Fullscreen Mode Manager
 * Handles browser fullscreen API
 * @module features/fullscreen
 */

import { eventBus, EVENTS } from '../../utils/eventBus.js';

/**
 * FullscreenManager class
 * Manages fullscreen mode
 */
class FullscreenManager {
    static instance = null;

    constructor() {
        if (FullscreenManager.instance) {
            return FullscreenManager.instance;
        }

        this.isEnabled = false;
        this.button = null;

        FullscreenManager.instance = this;
    }

    /**
     * Initialize fullscreen mode
     * @param {HTMLElement|string} button - Fullscreen toggle button
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

        // Handle fullscreen change events from browser
        document.addEventListener('fullscreenchange', () => this._handleFullscreenChange());
        document.addEventListener('webkitfullscreenchange', () => this._handleFullscreenChange());
        document.addEventListener('mozfullscreenchange', () => this._handleFullscreenChange());
        document.addEventListener('MSFullscreenChange', () => this._handleFullscreenChange());

        // Subscribe to events
        eventBus.on(EVENTS.FULLSCREEN_TOGGLE, () => this.toggle());
    }

    /**
     * Handle browser fullscreen change events
     * @private
     */
    _handleFullscreenChange() {
        const isFullscreen = !!(
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement
        );

        if (!isFullscreen && this.isEnabled) {
            this.isEnabled = false;
            document.body.classList.remove('fullscreen-mode');
            this._updateButtonText('Fullscreen');
        }
    }

    /**
     * Update button text
     * @param {string} text
     * @private
     */
    _updateButtonText(text) {
        if (this.button) {
            const link = this.button.querySelector('a');
            if (link) {
                link.textContent = text;
            }
        }
    }

    /**
     * Toggle fullscreen mode
     */
    toggle() {
        if (this.isEnabled) {
            this.exit();
        } else {
            this.enter();
        }
    }

    /**
     * Enter fullscreen mode
     */
    async enter() {
        const elem = document.documentElement;

        try {
            if (elem.requestFullscreen) {
                await elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                await elem.webkitRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                await elem.mozRequestFullScreen();
            } else if (elem.msRequestFullscreen) {
                await elem.msRequestFullscreen();
            }

            this.isEnabled = true;
            document.body.classList.add('fullscreen-mode');
            this._updateButtonText('Exit Fullscreen');

            eventBus.emit(EVENTS.FULLSCREEN_CHANGED, { enabled: true });
        } catch (error) {
            console.error('Failed to enter fullscreen:', error);
            eventBus.emit(EVENTS.TOAST_SHOW, {
                message: 'Failed to enter fullscreen',
                type: 'error'
            });
        }
    }

    /**
     * Exit fullscreen mode
     */
    async exit() {
        try {
            if (document.exitFullscreen) {
                await document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                await document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                await document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                await document.msExitFullscreen();
            }

            this.isEnabled = false;
            document.body.classList.remove('fullscreen-mode');
            this._updateButtonText('Fullscreen');

            eventBus.emit(EVENTS.FULLSCREEN_CHANGED, { enabled: false });
        } catch (error) {
            console.error('Failed to exit fullscreen:', error);
        }
    }

    /**
     * Check if fullscreen is supported
     * @returns {boolean}
     */
    isSupported() {
        return !!(
            document.documentElement.requestFullscreen ||
            document.documentElement.webkitRequestFullscreen ||
            document.documentElement.mozRequestFullScreen ||
            document.documentElement.msRequestFullscreen
        );
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
        if (this.isEnabled) {
            this.exit();
        }
        FullscreenManager.instance = null;
    }
}

export const fullscreenManager = new FullscreenManager();
export { FullscreenManager };
export default fullscreenManager;
