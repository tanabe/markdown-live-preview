/**
 * PWA Service
 * Handles Progressive Web App functionality
 * @module services/pwa
 */

import { APP_CONFIG } from '../../config/app.config.js';

/**
 * PWAService class
 * Manages service worker registration and install prompts
 */
class PWAService {
    static instance = null;

    constructor() {
        if (PWAService.instance) {
            return PWAService.instance;
        }

        this.deferredPrompt = null;
        this.registration = null;
        this.updateInterval = APP_CONFIG.SERVICE_WORKER_UPDATE_INTERVAL_MS || 30 * 60 * 1000;

        PWAService.instance = this;
    }

    /**
     * Initialize PWA service
     */
    initialize() {
        // Capture install prompt
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            console.log('PWA install prompt available');
            this._onInstallPromptAvailable();
        });

        // Handle app installed
        window.addEventListener('appinstalled', () => {
            console.log('PWA installed successfully');
            this.deferredPrompt = null;
            this._onAppInstalled();
        });

        // Register service worker
        this._registerServiceWorker();
    }

    /**
     * Register service worker
     * @private
     */
    async _registerServiceWorker() {
        if (!('serviceWorker' in navigator)) {
            console.log('Service workers not supported');
            return;
        }

        try {
            this.registration = await navigator.serviceWorker.register('/sw.js');
            console.log('ServiceWorker registered:', this.registration.scope);

            // Check for updates periodically
            setInterval(() => {
                this.checkForUpdates();
            }, this.updateInterval);

            // Listen for updates
            this.registration.addEventListener('updatefound', () => {
                const newWorker = this.registration.installing;

                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        this._onUpdateAvailable();
                    }
                });
            });

        } catch (error) {
            console.log('ServiceWorker registration failed:', error);
        }
    }

    /**
     * Check for service worker updates
     */
    async checkForUpdates() {
        if (this.registration) {
            try {
                await this.registration.update();
            } catch (error) {
                console.error('Failed to check for updates:', error);
            }
        }
    }

    /**
     * Show install prompt
     * @returns {Promise<boolean>} True if user accepted
     */
    async showInstallPrompt() {
        if (!this.deferredPrompt) {
            return false;
        }

        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        this.deferredPrompt = null;

        return outcome === 'accepted';
    }

    /**
     * Check if app is installable
     * @returns {boolean}
     */
    isInstallable() {
        return !!this.deferredPrompt;
    }

    /**
     * Check if app is installed (standalone mode)
     * @returns {boolean}
     */
    isInstalled() {
        return window.matchMedia('(display-mode: standalone)').matches ||
            window.navigator.standalone === true;
    }

    /**
     * Called when install prompt becomes available
     * @private
     */
    _onInstallPromptAvailable() {
        // Show install button or banner
        const installBtn = document.querySelector('#pwa-install-button');
        if (installBtn) {
            installBtn.style.display = 'block';
            installBtn.addEventListener('click', () => this.showInstallPrompt());
        }
    }

    /**
     * Called when app is installed
     * @private
     */
    _onAppInstalled() {
        // Hide install button
        const installBtn = document.querySelector('#pwa-install-button');
        if (installBtn) {
            installBtn.style.display = 'none';
        }
    }

    /**
     * Called when update is available
     * @private
     */
    _onUpdateAvailable() {
        // Show update notification
        const updateBanner = document.querySelector('#pwa-update-banner');
        if (updateBanner) {
            updateBanner.style.display = 'block';

            const updateBtn = updateBanner.querySelector('.pwa-update-button');
            if (updateBtn) {
                updateBtn.addEventListener('click', () => {
                    window.location.reload();
                });
            }
        }
    }

    /**
     * Skip waiting and activate new service worker
     */
    async activateUpdate() {
        if (this.registration?.waiting) {
            this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            window.location.reload();
        }
    }
}

export const pwaService = new PWAService();
export { PWAService };
export default pwaService;
