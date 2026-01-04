/**
 * Toast Notification Component
 * Provides toast/snackbar notifications
 * @module ui/toast
 */

import { eventBus, EVENTS } from '../../utils/eventBus.js';

/**
 * Toast types
 */
export const TOAST_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info'
};

/**
 * Toast class
 * Manages toast notifications
 */
class Toast {
    static instance = null;

    constructor() {
        if (Toast.instance) {
            return Toast.instance;
        }

        this.container = null;
        this.queue = [];
        this.activeToasts = [];
        this.maxVisible = 5;
        this.defaultDuration = 3000;

        Toast.instance = this;
    }

    /**
     * Initialize toast container
     */
    initialize() {
        if (this.container) return;

        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        this.container.setAttribute('aria-live', 'polite');
        this.container.setAttribute('aria-atomic', 'true');
        document.body.appendChild(this.container);

        // Add styles if not present
        this._injectStyles();
    }

    /**
     * Inject toast styles
     * @private
     */
    _injectStyles() {
        const styleId = 'toast-styles';
        if (document.getElementById(styleId)) return;

        const styles = document.createElement('style');
        styles.id = styleId;
        styles.textContent = `
            .toast-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 10000;
                display: flex;
                flex-direction: column-reverse;
                gap: 10px;
                max-width: 400px;
            }

            .toast {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px 16px;
                border-radius: 8px;
                background: var(--toast-bg, #333);
                color: var(--toast-color, #fff);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                font-size: 14px;
                animation: toastSlideIn 0.3s ease-out;
                min-width: 280px;
            }

            .toast.toast-exit {
                animation: toastSlideOut 0.3s ease-in forwards;
            }

            .toast-icon {
                flex-shrink: 0;
                width: 20px;
                height: 20px;
            }

            .toast-content {
                flex: 1;
            }

            .toast-title {
                font-weight: 600;
                margin-bottom: 2px;
            }

            .toast-message {
                opacity: 0.9;
            }

            .toast-close {
                flex-shrink: 0;
                background: none;
                border: none;
                color: inherit;
                cursor: pointer;
                padding: 4px;
                opacity: 0.7;
                transition: opacity 0.2s;
            }

            .toast-close:hover {
                opacity: 1;
            }

            .toast.success {
                background: var(--toast-success-bg, #10b981);
            }

            .toast.error {
                background: var(--toast-error-bg, #ef4444);
            }

            .toast.warning {
                background: var(--toast-warning-bg, #f59e0b);
            }

            .toast.info {
                background: var(--toast-info-bg, #3b82f6);
            }

            @keyframes toastSlideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes toastSlideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }

            @media (max-width: 480px) {
                .toast-container {
                    left: 20px;
                    right: 20px;
                    bottom: 10px;
                }

                .toast {
                    min-width: auto;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    /**
     * Show a toast notification
     * @param {string} message - Toast message
     * @param {Object} options - Toast options
     * @returns {string} Toast ID
     */
    show(message, options = {}) {
        this.initialize();

        const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const {
            type = TOAST_TYPES.INFO,
            title = '',
            duration = this.defaultDuration,
            closeable = true,
            onClose = null
        } = options;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.id = id;
        toast.setAttribute('role', 'alert');

        toast.innerHTML = `
            <span class="toast-icon">${this._getIcon(type)}</span>
            <div class="toast-content">
                ${title ? `<div class="toast-title">${title}</div>` : ''}
                <div class="toast-message">${message}</div>
            </div>
            ${closeable ? `
                <button class="toast-close" aria-label="Close">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            ` : ''}
        `;

        // Close button handler
        if (closeable) {
            const closeBtn = toast.querySelector('.toast-close');
            closeBtn.addEventListener('click', () => this.dismiss(id));
        }

        // Add to container
        this.container.appendChild(toast);
        this.activeToasts.push({ id, element: toast, onClose });

        // Auto dismiss
        if (duration > 0) {
            setTimeout(() => this.dismiss(id), duration);
        }

        // Limit visible toasts
        this._enforceMaxVisible();

        eventBus.emit(EVENTS.TOAST_SHOWN, { id, message, type });

        return id;
    }

    /**
     * Get icon for toast type
     * @param {string} type - Toast type
     * @returns {string} SVG icon
     * @private
     */
    _getIcon(type) {
        const icons = {
            success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>`,
            error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>`,
            warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>`,
            info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>`
        };
        return icons[type] || icons.info;
    }

    /**
     * Enforce maximum visible toasts
     * @private
     */
    _enforceMaxVisible() {
        while (this.activeToasts.length > this.maxVisible) {
            const oldest = this.activeToasts.shift();
            if (oldest && oldest.element.parentNode) {
                oldest.element.remove();
            }
        }
    }

    /**
     * Dismiss a toast
     * @param {string} id - Toast ID
     */
    dismiss(id) {
        const index = this.activeToasts.findIndex(t => t.id === id);
        if (index === -1) return;

        const toast = this.activeToasts[index];
        toast.element.classList.add('toast-exit');

        setTimeout(() => {
            if (toast.element.parentNode) {
                toast.element.remove();
            }
            if (toast.onClose) {
                toast.onClose();
            }
            this.activeToasts.splice(index, 1);
        }, 300);

        eventBus.emit(EVENTS.TOAST_DISMISSED, { id });
    }

    /**
     * Dismiss all toasts
     */
    dismissAll() {
        [...this.activeToasts].forEach(toast => this.dismiss(toast.id));
    }

    /**
     * Show success toast
     * @param {string} message - Message
     * @param {Object} options - Options
     * @returns {string} Toast ID
     */
    success(message, options = {}) {
        return this.show(message, { ...options, type: TOAST_TYPES.SUCCESS });
    }

    /**
     * Show error toast
     * @param {string} message - Message
     * @param {Object} options - Options
     * @returns {string} Toast ID
     */
    error(message, options = {}) {
        return this.show(message, { ...options, type: TOAST_TYPES.ERROR });
    }

    /**
     * Show warning toast
     * @param {string} message - Message
     * @param {Object} options - Options
     * @returns {string} Toast ID
     */
    warning(message, options = {}) {
        return this.show(message, { ...options, type: TOAST_TYPES.WARNING });
    }

    /**
     * Show info toast
     * @param {string} message - Message
     * @param {Object} options - Options
     * @returns {string} Toast ID
     */
    info(message, options = {}) {
        return this.show(message, { ...options, type: TOAST_TYPES.INFO });
    }
}

// Export singleton instance
export const toast = new Toast();

// Export class for testing
export { Toast };

export default toast;
