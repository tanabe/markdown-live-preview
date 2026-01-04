/**
 * Modal Component
 * Provides modal dialogs
 * @module ui/modal
 */

import { eventBus, EVENTS } from '../../utils/eventBus.js';

/**
 * Modal class
 * Manages modal dialogs
 */
class Modal {
    static instance = null;

    constructor() {
        if (Modal.instance) {
            return Modal.instance;
        }

        this.activeModals = [];
        this.initialized = false;

        Modal.instance = this;
    }

    /**
     * Initialize modal system
     */
    initialize() {
        if (this.initialized) return;

        this._injectStyles();
        this._setupKeyboardHandling();
        this.initialized = true;
    }

    /**
     * Inject modal styles
     * @private
     */
    _injectStyles() {
        const styleId = 'modal-styles';
        if (document.getElementById(styleId)) return;

        const styles = document.createElement('style');
        styles.id = styleId;
        styles.textContent = `
            .modal-overlay {
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                animation: modalFadeIn 0.2s ease-out;
                padding: 20px;
            }

            .modal-overlay.modal-exit {
                animation: modalFadeOut 0.2s ease-in forwards;
            }

            .modal {
                background: var(--modal-bg, #fff);
                color: var(--modal-color, #333);
                border-radius: 12px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                max-width: 90vw;
                max-height: 90vh;
                display: flex;
                flex-direction: column;
                animation: modalSlideIn 0.3s ease-out;
                overflow: hidden;
            }

            .modal-overlay.modal-exit .modal {
                animation: modalSlideOut 0.2s ease-in forwards;
            }

            .modal-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 16px 20px;
                border-bottom: 1px solid var(--modal-border, #eee);
            }

            .modal-title {
                font-size: 18px;
                font-weight: 600;
                margin: 0;
            }

            .modal-close {
                background: none;
                border: none;
                cursor: pointer;
                padding: 8px;
                border-radius: 6px;
                color: var(--modal-close-color, #666);
                transition: background 0.2s;
            }

            .modal-close:hover {
                background: var(--modal-close-hover-bg, #f0f0f0);
            }

            .modal-body {
                padding: 20px;
                overflow-y: auto;
                flex: 1;
            }

            .modal-footer {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                gap: 10px;
                padding: 16px 20px;
                border-top: 1px solid var(--modal-border, #eee);
            }

            .modal-btn {
                padding: 10px 20px;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s;
                border: 1px solid transparent;
            }

            .modal-btn-primary {
                background: var(--modal-btn-primary-bg, #3b82f6);
                color: white;
            }

            .modal-btn-primary:hover {
                background: var(--modal-btn-primary-hover-bg, #2563eb);
            }

            .modal-btn-secondary {
                background: var(--modal-btn-secondary-bg, #f3f4f6);
                color: var(--modal-btn-secondary-color, #374151);
            }

            .modal-btn-secondary:hover {
                background: var(--modal-btn-secondary-hover-bg, #e5e7eb);
            }

            .modal-btn-danger {
                background: var(--modal-btn-danger-bg, #ef4444);
                color: white;
            }

            .modal-btn-danger:hover {
                background: var(--modal-btn-danger-hover-bg, #dc2626);
            }

            .modal-sm { width: 400px; }
            .modal-md { width: 560px; }
            .modal-lg { width: 720px; }
            .modal-xl { width: 900px; }
            .modal-full { width: 95vw; height: 95vh; }

            @keyframes modalFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes modalFadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }

            @keyframes modalSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(-20px) scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }

            @keyframes modalSlideOut {
                from {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                to {
                    opacity: 0;
                    transform: translateY(20px) scale(0.95);
                }
            }

            @media (max-width: 600px) {
                .modal {
                    width: 100%;
                    max-width: none;
                    margin: 10px;
                }
            }

            /* Dark mode support */
            @media (prefers-color-scheme: dark) {
                .modal {
                    --modal-bg: #1f2937;
                    --modal-color: #f3f4f6;
                    --modal-border: #374151;
                    --modal-close-color: #9ca3af;
                    --modal-close-hover-bg: #374151;
                    --modal-btn-secondary-bg: #374151;
                    --modal-btn-secondary-color: #f3f4f6;
                    --modal-btn-secondary-hover-bg: #4b5563;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    /**
     * Setup keyboard handling for modals
     * @private
     */
    _setupKeyboardHandling() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModals.length > 0) {
                const topModal = this.activeModals[this.activeModals.length - 1];
                if (topModal.closeable) {
                    this.close(topModal.id);
                }
            }
        });
    }

    /**
     * Create and show a modal
     * @param {Object} options - Modal options
     * @returns {string} Modal ID
     */
    open(options = {}) {
        this.initialize();

        const id = `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const {
            title = '',
            content = '',
            size = 'md',
            closeable = true,
            closeOnOverlay = true,
            showClose = true,
            buttons = [],
            onOpen = null,
            onClose = null,
            className = ''
        } = options;

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.id = id;

        // Close on overlay click
        if (closeOnOverlay && closeable) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.close(id);
                }
            });
        }

        // Create modal
        const modal = document.createElement('div');
        modal.className = `modal modal-${size} ${className}`.trim();
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', `${id}-title`);

        // Header
        if (title || showClose) {
            const header = document.createElement('div');
            header.className = 'modal-header';

            if (title) {
                const titleEl = document.createElement('h2');
                titleEl.className = 'modal-title';
                titleEl.id = `${id}-title`;
                titleEl.textContent = title;
                header.appendChild(titleEl);
            }

            if (showClose && closeable) {
                const closeBtn = document.createElement('button');
                closeBtn.className = 'modal-close';
                closeBtn.setAttribute('aria-label', 'Close modal');
                closeBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                `;
                closeBtn.addEventListener('click', () => this.close(id));
                header.appendChild(closeBtn);
            }

            modal.appendChild(header);
        }

        // Body
        const body = document.createElement('div');
        body.className = 'modal-body';
        if (typeof content === 'string') {
            body.innerHTML = content;
        } else if (content instanceof HTMLElement) {
            body.appendChild(content);
        }
        modal.appendChild(body);

        // Footer with buttons
        if (buttons.length > 0) {
            const footer = document.createElement('div');
            footer.className = 'modal-footer';

            buttons.forEach(btn => {
                const button = document.createElement('button');
                button.className = `modal-btn modal-btn-${btn.type || 'secondary'}`;
                button.textContent = btn.text;

                if (btn.onClick) {
                    button.addEventListener('click', () => {
                        const result = btn.onClick();
                        if (result !== false && btn.closeOnClick !== false) {
                            this.close(id);
                        }
                    });
                } else if (btn.closeOnClick !== false) {
                    button.addEventListener('click', () => this.close(id));
                }

                footer.appendChild(button);
            });

            modal.appendChild(footer);
        }

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Store modal info
        this.activeModals.push({ id, overlay, modal, closeable, onClose });

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Focus trap
        this._setupFocusTrap(modal);

        // Callback
        if (onOpen) {
            onOpen(modal, body);
        }

        eventBus.emit(EVENTS.MODAL_OPENED, { id });

        return id;
    }

    /**
     * Setup focus trap within modal
     * @param {HTMLElement} modal - Modal element
     * @private
     */
    _setupFocusTrap(modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        firstElement.focus();

        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }

    /**
     * Close a modal
     * @param {string} id - Modal ID
     */
    close(id) {
        const index = this.activeModals.findIndex(m => m.id === id);
        if (index === -1) return;

        const modalInfo = this.activeModals[index];
        modalInfo.overlay.classList.add('modal-exit');

        setTimeout(() => {
            if (modalInfo.overlay.parentNode) {
                modalInfo.overlay.remove();
            }

            this.activeModals.splice(index, 1);

            // Restore body scroll if no more modals
            if (this.activeModals.length === 0) {
                document.body.style.overflow = '';
            }

            if (modalInfo.onClose) {
                modalInfo.onClose();
            }

            eventBus.emit(EVENTS.MODAL_CLOSED, { id });
        }, 200);
    }

    /**
     * Close all modals
     */
    closeAll() {
        [...this.activeModals].forEach(m => this.close(m.id));
    }

    /**
     * Show confirm dialog
     * @param {Object} options - Confirm options
     * @returns {Promise<boolean>} User's choice
     */
    confirm(options = {}) {
        return new Promise((resolve) => {
            const {
                title = 'Confirm',
                message = 'Are you sure?',
                confirmText = 'Confirm',
                cancelText = 'Cancel',
                confirmType = 'primary'
            } = options;

            this.open({
                title,
                content: `<p>${message}</p>`,
                size: 'sm',
                buttons: [
                    {
                        text: cancelText,
                        type: 'secondary',
                        onClick: () => {
                            resolve(false);
                        }
                    },
                    {
                        text: confirmText,
                        type: confirmType,
                        onClick: () => {
                            resolve(true);
                        }
                    }
                ],
                onClose: () => {
                    resolve(false);
                }
            });
        });
    }

    /**
     * Show alert dialog
     * @param {Object} options - Alert options
     * @returns {Promise<void>}
     */
    alert(options = {}) {
        return new Promise((resolve) => {
            const {
                title = 'Alert',
                message = '',
                buttonText = 'OK'
            } = options;

            this.open({
                title,
                content: `<p>${message}</p>`,
                size: 'sm',
                buttons: [
                    {
                        text: buttonText,
                        type: 'primary',
                        onClick: () => {
                            resolve();
                        }
                    }
                ]
            });
        });
    }

    /**
     * Show prompt dialog
     * @param {Object} options - Prompt options
     * @returns {Promise<string|null>} User input or null
     */
    prompt(options = {}) {
        return new Promise((resolve) => {
            const {
                title = 'Input',
                message = '',
                placeholder = '',
                defaultValue = '',
                confirmText = 'OK',
                cancelText = 'Cancel'
            } = options;

            const inputId = `prompt-input-${Date.now()}`;
            const content = `
                ${message ? `<p>${message}</p>` : ''}
                <input type="text" 
                    id="${inputId}" 
                    class="modal-input" 
                    placeholder="${placeholder}"
                    value="${defaultValue}"
                    style="width: 100%; padding: 10px; border: 1px solid var(--modal-border, #ddd); border-radius: 6px; font-size: 14px;">
            `;

            let inputValue = defaultValue;

            this.open({
                title,
                content,
                size: 'sm',
                onOpen: (modal) => {
                    const input = modal.querySelector(`#${inputId}`);
                    if (input) {
                        input.focus();
                        input.select();
                        input.addEventListener('input', (e) => {
                            inputValue = e.target.value;
                        });
                        input.addEventListener('keydown', (e) => {
                            if (e.key === 'Enter') {
                                resolve(inputValue);
                                this.closeAll();
                            }
                        });
                    }
                },
                buttons: [
                    {
                        text: cancelText,
                        type: 'secondary',
                        onClick: () => {
                            resolve(null);
                        }
                    },
                    {
                        text: confirmText,
                        type: 'primary',
                        onClick: () => {
                            resolve(inputValue);
                        }
                    }
                ],
                onClose: () => {
                    resolve(null);
                }
            });
        });
    }
}

// Export singleton instance
export const modal = new Modal();

// Export class for testing
export { Modal };

export default modal;
