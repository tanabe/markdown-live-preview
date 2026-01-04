/**
 * Tabs Feature Module
 * Manages document tabs for multi-document editing
 * @module features/tabs
 */

import { eventBus, EVENTS } from '../../utils/eventBus.js';
import { storageService } from '../../core/storage/index.js';
import { STORAGE_KEYS } from '../../core/storage/keys.js';
import { editorService } from '../../core/editor/index.js';
import { DEFAULT_CONTENT } from '../../config/default-content.js';

/**
 * Tab data structure
 * @typedef {Object} Tab
 * @property {string} id - Unique tab identifier
 * @property {string} name - Tab display name
 * @property {string} content - Tab content
 * @property {boolean} isDirty - Has unsaved changes
 * @property {number} createdAt - Creation timestamp
 * @property {number} updatedAt - Last update timestamp
 */

/**
 * TabsManager class
 * Manages multiple document tabs
 */
class TabsManager {
    static instance = null;

    constructor() {
        if (TabsManager.instance) {
            return TabsManager.instance;
        }

        this.tabs = [];
        this.activeTabId = null;
        this.container = null;
        this.maxTabs = 20;
        this.initialized = false;

        TabsManager.instance = this;
    }

    /**
     * Initialize tabs manager
     * @param {HTMLElement|string} container - Tabs container element
     */
    initialize(container) {
        if (this.initialized) return;

        this.container = typeof container === 'string'
            ? document.querySelector(container)
            : container;

        // Load saved tabs
        this._loadTabs();

        // Setup event listeners
        this._setupEventListeners();

        // Render initial tabs
        this.render();

        // If no tabs, create default one
        if (this.tabs.length === 0) {
            this.createTab('Untitled', DEFAULT_CONTENT);
        } else {
            // Activate first tab or last active
            const lastActiveId = storageService.get(STORAGE_KEYS.ACTIVE_TAB);
            const tabToActivate = this.tabs.find(t => t.id === lastActiveId) || this.tabs[0];
            this.activateTab(tabToActivate.id);
        }

        this.initialized = true;
    }

    /**
     * Load tabs from storage
     * @private
     */
    _loadTabs() {
        const savedTabs = storageService.get(STORAGE_KEYS.TABS);
        if (savedTabs && Array.isArray(savedTabs)) {
            this.tabs = savedTabs;
        }
    }

    /**
     * Save tabs to storage
     * @private
     */
    _saveTabs() {
        storageService.set(STORAGE_KEYS.TABS, this.tabs);
        storageService.set(STORAGE_KEYS.ACTIVE_TAB, this.activeTabId);
    }

    /**
     * Setup event listeners
     * @private
     */
    _setupEventListeners() {
        // Listen for content changes to mark tab dirty
        eventBus.on(EVENTS.CONTENT_CHANGED, ({ content }) => {
            this.updateActiveTabContent(content);
        });
    }

    /**
     * Create a new tab
     * @param {string} name - Tab name
     * @param {string} content - Initial content
     * @returns {Tab} Created tab
     */
    createTab(name = 'Untitled', content = '') {
        if (this.tabs.length >= this.maxTabs) {
            eventBus.emit(EVENTS.ERROR, {
                message: `Maximum ${this.maxTabs} tabs allowed`
            });
            return null;
        }

        const tab = {
            id: `tab-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: this._getUniqueName(name),
            content,
            isDirty: false,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };

        this.tabs.push(tab);
        this._saveTabs();
        this.render();
        this.activateTab(tab.id);

        eventBus.emit(EVENTS.TAB_CREATED, { tab });

        return tab;
    }

    /**
     * Get unique tab name
     * @param {string} baseName - Base name
     * @returns {string} Unique name
     * @private
     */
    _getUniqueName(baseName) {
        const existingNames = this.tabs.map(t => t.name);
        if (!existingNames.includes(baseName)) return baseName;

        let counter = 1;
        let newName = `${baseName} (${counter})`;
        while (existingNames.includes(newName)) {
            counter++;
            newName = `${baseName} (${counter})`;
        }
        return newName;
    }

    /**
     * Activate a tab
     * @param {string} tabId - Tab ID to activate
     */
    activateTab(tabId) {
        const tab = this.tabs.find(t => t.id === tabId);
        if (!tab) return;

        // Save current content before switching
        if (this.activeTabId) {
            const currentTab = this.tabs.find(t => t.id === this.activeTabId);
            if (currentTab) {
                currentTab.content = editorService.getValue();
            }
        }

        this.activeTabId = tabId;

        // Update editor content
        editorService.setValue(tab.content);

        this._saveTabs();
        this.render();

        eventBus.emit(EVENTS.TAB_ACTIVATED, { tab });
    }

    /**
     * Close a tab
     * @param {string} tabId - Tab ID to close
     * @param {boolean} force - Force close without save prompt
     */
    closeTab(tabId, force = false) {
        const tabIndex = this.tabs.findIndex(t => t.id === tabId);
        if (tabIndex === -1) return;

        const tab = this.tabs[tabIndex];

        // Check if tab has unsaved changes
        if (tab.isDirty && !force) {
            eventBus.emit(EVENTS.CONFIRM_REQUIRED, {
                title: 'Unsaved Changes',
                message: `"${tab.name}" has unsaved changes. Close anyway?`,
                onConfirm: () => this.closeTab(tabId, true)
            });
            return;
        }

        // Remove tab
        this.tabs.splice(tabIndex, 1);

        // If closing active tab, activate another
        if (this.activeTabId === tabId) {
            if (this.tabs.length > 0) {
                // Activate previous or next tab
                const newIndex = Math.min(tabIndex, this.tabs.length - 1);
                this.activateTab(this.tabs[newIndex].id);
            } else {
                // Create new tab if last one was closed
                this.createTab('Untitled', DEFAULT_CONTENT);
            }
        }

        this._saveTabs();
        this.render();

        eventBus.emit(EVENTS.TAB_CLOSED, { tabId });
    }

    /**
     * Rename a tab
     * @param {string} tabId - Tab ID
     * @param {string} newName - New name
     */
    renameTab(tabId, newName) {
        const tab = this.tabs.find(t => t.id === tabId);
        if (!tab) return;

        tab.name = newName || 'Untitled';
        tab.updatedAt = Date.now();

        this._saveTabs();
        this.render();

        eventBus.emit(EVENTS.TAB_RENAMED, { tab });
    }

    /**
     * Update active tab content
     * @param {string} content - New content
     */
    updateActiveTabContent(content) {
        const tab = this.tabs.find(t => t.id === this.activeTabId);
        if (!tab) return;

        const hasChanged = tab.content !== content;
        tab.content = content;
        tab.isDirty = hasChanged;
        tab.updatedAt = Date.now();

        // Debounced save
        this._debouncedSave();
    }

    /**
     * Debounced save
     * @private
     */
    _debouncedSave() {
        if (this._saveTimeout) {
            clearTimeout(this._saveTimeout);
        }
        this._saveTimeout = setTimeout(() => {
            this._saveTabs();
        }, 1000);
    }

    /**
     * Get active tab
     * @returns {Tab|null} Active tab
     */
    getActiveTab() {
        return this.tabs.find(t => t.id === this.activeTabId) || null;
    }
    /**
     * Reset active tab to default content
     */
    resetActiveTab() {
        const tab = this.getActiveTab();
        if (!tab) return;

        const confirmed = window.confirm('Are you sure you want to reset the current tab to default content? This cannot be undone.');
        if (!confirmed) return;

        tab.content = DEFAULT_CONTENT;
        tab.isDirty = false;
        tab.updatedAt = Date.now();

        this._saveTabs();

        // Update editor
        editorService.setValue(DEFAULT_CONTENT);

        eventBus.emit(EVENTS.TAB_SWITCHED, { tab });
        eventBus.emit(EVENTS.TOAST_SHOW, { message: 'Editor reset to default content', type: 'info' });
    }
    /**
     * Get all tabs
     * @returns {Tab[]} All tabs
     */
    getAllTabs() {
        return [...this.tabs];
    }

    /**
     * Render tabs UI
     */
    render() {
        if (!this.container) return;

        this.container.innerHTML = '';

        // Create tabs
        this.tabs.forEach(tab => {
            const tabEl = this._createTabElement(tab);
            this.container.appendChild(tabEl);
        });

        // Add "new tab" button
        const addBtn = document.createElement('button');
        addBtn.className = 'tab-add-btn';
        addBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
        `;
        addBtn.setAttribute('aria-label', 'New tab');
        addBtn.addEventListener('click', () => this.createTab());
        this.container.appendChild(addBtn);
    }

    /**
     * Create tab element
     * @param {Tab} tab - Tab data
     * @returns {HTMLElement} Tab element
     * @private
     */
    _createTabElement(tab) {
        const tabEl = document.createElement('div');
        tabEl.className = `tab ${tab.id === this.activeTabId ? 'active' : ''}`;
        tabEl.setAttribute('data-tab-id', tab.id);
        tabEl.setAttribute('role', 'tab');
        tabEl.setAttribute('aria-selected', tab.id === this.activeTabId);

        tabEl.innerHTML = `
            <span class="tab-name">${tab.name}</span>
            ${tab.isDirty ? '<span class="tab-dirty">•</span>' : ''}
            <button class="tab-close" aria-label="Close tab">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        `;

        // Click to activate
        tabEl.addEventListener('click', (e) => {
            if (!e.target.closest('.tab-close')) {
                this.activateTab(tab.id);
            }
        });

        // Double-click to rename
        tabEl.addEventListener('dblclick', () => {
            this._showRenameInput(tabEl, tab);
        });

        // Close button
        const closeBtn = tabEl.querySelector('.tab-close');
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.closeTab(tab.id);
        });

        // Middle-click to close
        tabEl.addEventListener('mousedown', (e) => {
            if (e.button === 1) {
                e.preventDefault();
                this.closeTab(tab.id);
            }
        });

        return tabEl;
    }

    /**
     * Show rename input for tab
     * @param {HTMLElement} tabEl - Tab element
     * @param {Tab} tab - Tab data
     * @private
     */
    _showRenameInput(tabEl, tab) {
        const nameSpan = tabEl.querySelector('.tab-name');
        const currentName = tab.name;

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'tab-rename-input';
        input.value = currentName;

        nameSpan.replaceWith(input);
        input.focus();
        input.select();

        const finishRename = () => {
            const newName = input.value.trim() || 'Untitled';
            this.renameTab(tab.id, newName);
        };

        input.addEventListener('blur', finishRename);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                finishRename();
            } else if (e.key === 'Escape') {
                input.value = currentName;
                finishRename();
            }
        });
    }

    /**
     * Reorder tabs
     * @param {number} fromIndex - Source index
     * @param {number} toIndex - Target index
     */
    reorderTabs(fromIndex, toIndex) {
        const [tab] = this.tabs.splice(fromIndex, 1);
        this.tabs.splice(toIndex, 0, tab);
        this._saveTabs();
        this.render();
    }

    /**
     * Dispose tabs manager
     */
    dispose() {
        if (this._saveTimeout) {
            clearTimeout(this._saveTimeout);
        }
        this._saveTabs();
        this.tabs = [];
        this.activeTabId = null;
        this.initialized = false;
        TabsManager.instance = null;
    }
}

// Export singleton instance
export const tabsManager = new TabsManager();

// Export class for testing
export { TabsManager };

export default tabsManager;
