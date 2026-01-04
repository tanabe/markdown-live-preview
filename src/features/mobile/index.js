/**
 * Mobile UI Manager
 * Handles mobile-specific UI components
 * @module features/mobile
 */

import { eventBus, EVENTS } from '../../utils/eventBus.js';

/**
 * MobileUIManager class
 * Manages mobile drawer, FAB, and view switching
 */
class MobileUIManager {
    static instance = null;

    constructor() {
        if (MobileUIManager.instance) {
            return MobileUIManager.instance;
        }

        this.drawer = null;
        this.overlay = null;
        this.menuToggle = null;
        this.fabContainer = null;
        this.viewTabs = null;
        this.currentView = 'editor';

        MobileUIManager.instance = this;
    }

    /**
     * Initialize mobile UI
     * @param {Object} options - Initialization options
     */
    initialize(options = {}) {
        const {
            drawer = '#mobile-nav-drawer',
            overlay = '#mobile-nav-overlay',
            menuToggle = '#mobile-menu-toggle',
            drawerClose = '#drawer-close',
            fabContainer = '#fab-container',
            fabMain = '#fab-main',
            viewTabs = '#mobile-view-tabs'
        } = options;

        // Get elements
        this.drawer = document.querySelector(drawer);
        this.overlay = document.querySelector(overlay);
        this.menuToggle = document.querySelector(menuToggle);
        this.fabContainer = document.querySelector(fabContainer);
        this.viewTabs = document.querySelector(viewTabs);

        const closeBtn = document.querySelector(drawerClose);
        const fabMainBtn = document.querySelector(fabMain);

        // Setup drawer
        this._setupDrawer(closeBtn);

        // Setup FAB
        this._setupFAB(fabMainBtn);

        // Setup view tabs
        this._setupViewTabs();

        // Setup dropdown touch handling
        this._setupDropdowns();

        // Sync checkboxes
        this._syncCheckboxes();

        // Set default mobile view
        if (window.innerWidth <= 768) {
            this.setView('editor');
        }
    }

    /**
     * Setup drawer functionality
     * @param {HTMLElement} closeBtn
     * @private
     */
    _setupDrawer(closeBtn) {
        if (!this.drawer) return;

        // Open drawer
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => {
                this.toggleDrawer();
            });
        }

        // Close on overlay click
        if (this.overlay) {
            this.overlay.addEventListener('click', () => {
                this.closeDrawer();
            });
        }

        // Close button
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeDrawer();
            });
        }

        // Drawer item clicks
        const drawerItems = this.drawer.querySelectorAll('.drawer-item');
        drawerItems.forEach(item => {
            item.addEventListener('click', () => {
                const action = item.dataset.action;
                if (action) {
                    this._handleDrawerAction(action);
                }
                this.closeDrawer();
            });
        });
    }

    /**
     * Setup FAB functionality
     * @param {HTMLElement} fabMainBtn
     * @private
     */
    _setupFAB(fabMainBtn) {
        if (!this.fabContainer) return;

        // Toggle FAB menu
        if (fabMainBtn) {
            fabMainBtn.addEventListener('click', () => {
                this.fabContainer.classList.toggle('open');
            });
        }

        // Close FAB on outside click
        document.addEventListener('click', (e) => {
            if (!this.fabContainer.contains(e.target)) {
                this.fabContainer.classList.remove('open');
            }
        });

        // FAB actions
        const fabActions = this.fabContainer.querySelectorAll('.fab-action');
        fabActions.forEach(action => {
            action.addEventListener('click', (e) => {
                e.stopPropagation();
                const actionType = action.dataset.action;
                this._handleFabAction(actionType);
                this.fabContainer.classList.remove('open');
            });
        });
    }

    /**
     * Setup view tabs functionality
     * @private
     */
    _setupViewTabs() {
        if (!this.viewTabs) return;

        const editorTab = this.viewTabs.querySelector('[data-view="editor"]');
        const previewTab = this.viewTabs.querySelector('[data-view="preview"]');
        const splitTab = this.viewTabs.querySelector('[data-view="split"]');

        if (editorTab) {
            editorTab.addEventListener('click', () => this.setView('editor'));
        }
        if (previewTab) {
            previewTab.addEventListener('click', () => this.setView('preview'));
        }
        if (splitTab) {
            splitTab.addEventListener('click', () => this.setView('split'));
        }
    }

    /**
     * Setup dropdown touch handling
     * @private
     */
    _setupDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown-wrapper');

        dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('.dropdown-trigger');

            if (trigger) {
                trigger.addEventListener('click', (e) => {
                    e.stopPropagation();
                    // Close other dropdowns
                    dropdowns.forEach(other => {
                        if (other !== dropdown) {
                            other.classList.remove('open');
                        }
                    });
                    dropdown.classList.toggle('open');
                });
            }
        });

        // Close dropdowns on outside click
        document.addEventListener('click', () => {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('open');
            });
        });
    }

    /**
     * Sync mobile checkboxes with desktop
     * @private
     */
    _syncCheckboxes() {
        // Dark mode
        const mobileDarkMode = document.getElementById('mobile-dark-mode-checkbox');
        const desktopDarkMode = document.getElementById('dark-mode-checkbox');

        if (mobileDarkMode && desktopDarkMode) {
            mobileDarkMode.checked = desktopDarkMode.checked;

            mobileDarkMode.addEventListener('change', () => {
                desktopDarkMode.checked = mobileDarkMode.checked;
                desktopDarkMode.dispatchEvent(new Event('change'));
            });

            desktopDarkMode.addEventListener('change', () => {
                mobileDarkMode.checked = desktopDarkMode.checked;
            });
        }

        // Sync scroll
        const mobileSyncScroll = document.getElementById('mobile-sync-scroll-checkbox');
        const desktopSyncScroll = document.getElementById('sync-scroll-checkbox');

        if (mobileSyncScroll && desktopSyncScroll) {
            mobileSyncScroll.checked = desktopSyncScroll.checked;

            mobileSyncScroll.addEventListener('change', () => {
                desktopSyncScroll.checked = mobileSyncScroll.checked;
                desktopSyncScroll.dispatchEvent(new Event('change'));
            });

            desktopSyncScroll.addEventListener('change', () => {
                mobileSyncScroll.checked = desktopSyncScroll.checked;
            });
        }
    }

    /**
     * Toggle drawer
     */
    toggleDrawer() {
        if (this.drawer?.classList.contains('open')) {
            this.closeDrawer();
        } else {
            this.openDrawer();
        }
    }

    /**
     * Open drawer
     */
    openDrawer() {
        if (this.drawer) {
            this.drawer.classList.add('open');
        }
        if (this.menuToggle) {
            this.menuToggle.classList.add('active');
        }
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close drawer
     */
    closeDrawer() {
        if (this.drawer) {
            this.drawer.classList.remove('open');
        }
        if (this.menuToggle) {
            this.menuToggle.classList.remove('active');
        }
        document.body.style.overflow = '';
    }

    /**
     * Set mobile view
     * @param {string} view - 'editor', 'preview', or 'split'
     */
    setView(view) {
        this.currentView = view;

        document.body.classList.remove('mobile-view-editor', 'mobile-view-preview', 'mobile-view-split');
        document.body.classList.add(`mobile-view-${view}`);

        // Update active tab
        if (this.viewTabs) {
            const tabs = this.viewTabs.querySelectorAll('[data-view]');
            tabs.forEach(tab => {
                tab.classList.toggle('active', tab.dataset.view === view);
            });
        }

        eventBus.emit(EVENTS.MOBILE_VIEW_CHANGED, { view });
    }

    /**
     * Handle drawer action
     * @param {string} action
     * @private
     */
    _handleDrawerAction(action) {
        const buttonMap = {
            'reset': '#reset-button',
            'import': '#import-button',
            'download-md': '#download-md-button',
            'export-html': '#export-html-button',
            'export-docx': '#export-docx-button',
            'copy-md': '#copy-button',
            'copy-html': '#copy-html-button',
            'export-pdf': '#export-pdf-button',
            'templates': '#templates-button',
            'toc': '#toc-button',
            'lint': '#lint-button',
            'goals': '#goals-button',
            'stats': '#stats-button',
            'help': '#help-button',
            'focus-mode': '#focus-button',
            'fullscreen': '#fullscreen-button'
        };

        const selector = buttonMap[action];
        if (selector) {
            document.querySelector(selector)?.click();
        }
    }

    /**
     * Handle FAB action
     * @param {string} action
     * @private
     */
    _handleFabAction(action) {
        const buttonMap = {
            'copy-md': '#copy-button',
            'download-md': '#download-md-button',
            'export-pdf': '#export-pdf-button'
        };

        const selector = buttonMap[action];
        if (selector) {
            document.querySelector(selector)?.click();
        }
    }

    /**
     * Check if mobile
     * @returns {boolean}
     */
    isMobile() {
        return window.innerWidth <= 768;
    }

    /**
     * Get current view
     * @returns {string}
     */
    getView() {
        return this.currentView;
    }

    /**
     * Dispose manager
     */
    dispose() {
        this.closeDrawer();
        MobileUIManager.instance = null;
    }
}

export const mobileUIManager = new MobileUIManager();
export { MobileUIManager };
export default mobileUIManager;
