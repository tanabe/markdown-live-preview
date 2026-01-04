/**
 * Application Orchestrator
 * Main application controller that initializes and coordinates all modules
 * @module app
 */

import { eventBus, EVENTS } from './utils/eventBus.js';
import { storageService } from './core/storage/index.js';
import { STORAGE_KEYS } from './core/storage/keys.js';
import { editorService } from './core/editor/index.js';
import { markdownService } from './core/markdown/index.js';
import { APP_CONFIG, FEATURE_FLAGS } from './config/app.config.js';
import { DEFAULT_CONTENT } from './config/default-content.js';

// UI Components
import { toast } from './ui/toast/index.js';
import { modal } from './ui/modal/index.js';
import { themeManager } from './ui/theme/index.js';
import { autosaveIndicator } from './ui/autosave/index.js';

// Features
import { tabsManager } from './features/tabs/index.js';
import { goalsManager } from './features/goals/index.js';
import { statsManager } from './features/stats/index.js';
import { linterManager } from './features/linter/index.js';
import { tocManager } from './features/toc/index.js';
import { searchManager } from './features/search/index.js';
import { templatesManager } from './features/templates/index.js';
import { snippetsManager } from './features/snippets/index.js';
import { toolbarManager } from './features/toolbar/index.js';
import { modesManager } from './features/modes/index.js';
import { focusManager } from './features/focus/index.js';
import { typewriterManager } from './features/typewriter/index.js';
import { fullscreenManager } from './features/fullscreen/index.js';
import { imageUploadManager } from './features/image-upload/index.js';
import { dividerManager } from './features/divider/index.js';
import { mobileUIManager } from './features/mobile/index.js';
import { importManager } from './features/import/index.js';

// Services
import { shortcutsManager } from './services/shortcuts/index.js';
import { exportManager } from './services/export/index.js';
import { pwaService } from './services/pwa/index.js';

import { debounce } from './utils/debounce.js';

/**
 * App class
 * Main application orchestrator
 */
class App {
    static instance = null;

    constructor() {
        if (App.instance) {
            return App.instance;
        }

        this.initialized = false;
        this.containers = {};

        App.instance = this;
    }

    /**
     * Initialize the application
     * @param {Object} options - Initialization options
     */
    async initialize(options = {}) {
        if (this.initialized) {
            console.warn('App already initialized');
            return;
        }

        console.log('🚀 Initializing Markdown Live Preview...');

        try {
            // Get container references
            this._resolveContainers(options.containers || {});

            // Initialize core services
            await this._initCore();

            // Initialize UI
            this._initUI();

            // Initialize features
            this._initFeatures();

            // Initialize services
            this._initServices();

            // Setup event listeners
            this._setupEventListeners();

            // Load initial content
            this._loadInitialContent();

            this.initialized = true;

            eventBus.emit(EVENTS.APP_READY);
            console.log('✅ App initialized successfully');

        } catch (error) {
            console.error('❌ Failed to initialize app:', error);
            throw error;
        }
    }

    /**
     * Resolve container elements
     * @param {Object} containers - Container selectors or elements
     * @private
     */
    _resolveContainers(containers) {
        const defaults = {
            editor: '#editor',
            preview: '#preview',
            main: '.main-container',
            toolbar: '.toolbar-container',
            tabs: '.tabs-container',
            stats: '.stats-container',
            toc: '.toc-panel',
            search: '.search-panel',
            linter: '.linter-panel',
            templates: '.templates-panel',
            snippets: '.snippets-panel',
            goals: '.goals-container'
        };

        const resolved = { ...defaults, ...containers };

        for (const [key, selector] of Object.entries(resolved)) {
            this.containers[key] = typeof selector === 'string'
                ? document.querySelector(selector)
                : selector;
        }
    }

    /**
     * Initialize core services
     * @private
     */
    async _initCore() {
        // Initialize storage
        storageService.initialize();

        // Initialize editor
        if (this.containers.editor) {
            const savedFontSize = storageService.get(STORAGE_KEYS.FONT_SIZE) || APP_CONFIG.DEFAULT_FONT_SIZE;
            const savedTheme = storageService.get(STORAGE_KEYS.EDITOR_THEME) || 'vs';

            editorService.initialize(this.containers.editor, {
                fontSize: savedFontSize,
                theme: savedTheme
            });
        }

        // Initialize markdown service
        markdownService.initialize();
    }

    /**
     * Initialize UI components
     * @private
     */
    _initUI() {
        // Initialize theme manager
        themeManager.initialize();

        // Initialize autosave indicator
        autosaveIndicator.initialize();

        // Toast and modal auto-initialize on first use
    }

    /**
     * Initialize feature modules
     * @private
     */
    _initFeatures() {
        // Toolbar
        if (this.containers.toolbar && FEATURE_FLAGS.TOOLBAR) {
            toolbarManager.initialize(this.containers.toolbar);
        }

        // Tabs
        if (this.containers.tabs && FEATURE_FLAGS.TABS) {
            tabsManager.initialize(this.containers.tabs);
        }

        // Stats
        if (this.containers.stats && FEATURE_FLAGS.STATS) {
            statsManager.initialize(this.containers.stats);
        }

        // TOC
        if (this.containers.toc && FEATURE_FLAGS.TOC) {
            tocManager.initialize(this.containers.toc);
        }

        // Linter
        if (this.containers.linter && FEATURE_FLAGS.LINTER) {
            linterManager.initialize(this.containers.linter);
        }

        // Search
        if (this.containers.search && FEATURE_FLAGS.SEARCH) {
            searchManager.initialize(this.containers.search);
        }

        // Templates
        if (this.containers.templates && FEATURE_FLAGS.TEMPLATES) {
            templatesManager.initialize(this.containers.templates);
        }

        // Snippets
        if (this.containers.snippets && FEATURE_FLAGS.SNIPPETS) {
            snippetsManager.initialize(this.containers.snippets);
        }

        // Goals
        if (this.containers.goals && FEATURE_FLAGS.GOALS) {
            goalsManager.initialize(this.containers.goals);
        }

        // View modes
        modesManager.initialize({
            main: this.containers.main,
            editor: this.containers.editor?.parentElement,
            preview: this.containers.preview?.parentElement
        });

        // Focus mode
        focusManager.initialize('#focus-button');

        // Typewriter mode
        typewriterManager.initialize();

        // Fullscreen mode
        fullscreenManager.initialize('#fullscreen-button');

        // Image upload
        imageUploadManager.initialize();

        // Split divider
        dividerManager.initialize({
            divider: '#split-divider',
            leftPane: '#edit',
            rightPane: '#preview',
            container: '#container'
        });

        // Mobile UI
        mobileUIManager.initialize();

        // File import
        importManager.initialize();
    }

    /**
     * Initialize services
     * @private
     */
    _initServices() {
        // Initialize shortcuts
        shortcutsManager.initialize();

        // Register shortcut handlers
        this._registerShortcutHandlers();

        // Initialize PWA
        pwaService.initialize();
    }

    /**
     * Register keyboard shortcut handlers
     * @private
     */
    _registerShortcutHandlers() {
        shortcutsManager.registerAll({
            'save': () => this.save(),
            'new': () => tabsManager.createTab(),
            'find': () => searchManager.show(),
            'replace': () => searchManager.show(true),
            'togglePreview': () => modesManager.cycleMode(),
            'toggleTOC': () => tocManager.toggle(),
            'toggleLinter': () => linterManager.toggle(),
            'toggleSnippets': () => snippetsManager.toggle(),
            'toggleFocus': () => focusManager.toggle(),
            'toggleFullscreen': () => fullscreenManager.toggle(),
            'cycleTheme': () => themeManager.cycleTheme(),
            'reset': () => tabsManager.resetActiveTab(),
            'exportPDF': () => this.exportPDF(),
            'exportHTML': () => this.exportHTML(),
            'help': () => this.showHelp()
        });
    }

    /**
     * Setup event listeners
     * @private
     */
    _setupEventListeners() {
        // Content change -> update preview
        const debouncedPreviewUpdate = debounce((content) => {
            this._updatePreview(content);
        }, APP_CONFIG.DEBOUNCE_DELAY);

        eventBus.on(EVENTS.CONTENT_CHANGED, ({ content }) => {
            debouncedPreviewUpdate(content);
        });

        // Theme changes
        eventBus.on(EVENTS.THEME_CHANGED, ({ resolved }) => {
            // Update mermaid theme
            markdownService.setMermaidTheme(resolved === 'dark' ? 'dark' : 'default');
        });

        // Toast events
        eventBus.on(EVENTS.TOAST_SHOW, ({ message, type, duration }) => {
            toast.show(message, { type, duration });
        });

        // Prompt events
        eventBus.on(EVENTS.SHOW_PROMPT, async ({ title, message, placeholder, onConfirm }) => {
            const result = await modal.prompt({ title, message, placeholder });
            if (result !== null && onConfirm) {
                onConfirm(result);
            }
        });

        // Confirm events
        eventBus.on(EVENTS.CONFIRM_REQUIRED, async ({ title, message, onConfirm, onCancel }) => {
            const confirmed = await modal.confirm({ title, message });
            if (confirmed && onConfirm) {
                onConfirm();
            } else if (!confirmed && onCancel) {
                onCancel();
            }
        });

        // Window beforeunload
        window.addEventListener('beforeunload', (e) => {
            // Save current state
            this.save();
        });

        // Window resize
        window.addEventListener('resize', debounce(() => {
            editorService.layout();
        }, 100));
    }

    /**
     * Load initial content
     * @private
     */
    _loadInitialContent() {
        // Check for saved content
        const savedContent = storageService.get(STORAGE_KEYS.CONTENT);

        if (savedContent) {
            editorService.setValue(savedContent);
        } else {
            editorService.setValue(DEFAULT_CONTENT);
        }

        // Trigger initial preview update
        this._updatePreview(editorService.getValue());
    }

    /**
     * Update preview
     * @param {string} content - Markdown content
     * @private
     */
    async _updatePreview(content) {
        if (!this.containers.preview) return;

        await markdownService.render(content, this.containers.preview);
    }

    /**
     * Save current state
     */
    save() {
        const content = editorService.getValue();
        storageService.set(STORAGE_KEYS.CONTENT, content);

        toast.success('Document saved', { duration: 2000 });
        eventBus.emit(EVENTS.DOCUMENT_SAVED);
    }

    /**
     * Export to PDF
     */
    async exportPDF() {
        const content = editorService.getValue();
        const filename = this._getFilename('pdf');

        toast.info('Generating PDF...', { duration: 2000 });

        try {
            await exportManager.toPDF(content, filename);
            toast.success('PDF exported successfully');
        } catch (error) {
            console.error('PDF export failed:', error);
            toast.error('Failed to export PDF');
        }
    }

    /**
     * Export to HTML
     */
    async exportHTML() {
        const content = editorService.getValue();
        const filename = this._getFilename('html');

        try {
            await exportManager.toHTML(content, filename);
            toast.success('HTML exported successfully');
        } catch (error) {
            console.error('HTML export failed:', error);
            toast.error('Failed to export HTML');
        }
    }

    /**
     * Export to Markdown
     */
    async exportMarkdown() {
        const content = editorService.getValue();
        const filename = this._getFilename('md');

        try {
            await exportManager.toMarkdown(content, filename);
            toast.success('Markdown exported successfully');
        } catch (error) {
            console.error('Markdown export failed:', error);
            toast.error('Failed to export Markdown');
        }
    }

    /**
     * Get filename for export
     * @param {string} extension - File extension
     * @returns {string} Filename
     * @private
     */
    _getFilename(extension) {
        const activeTab = tabsManager?.getActiveTab();
        const baseName = activeTab?.name || 'document';
        return `${baseName}.${extension}`;
    }

    /**
     * Show help dialog
     */
    showHelp() {
        modal.open({
            title: 'Keyboard Shortcuts',
            content: shortcutsManager.renderHelp(),
            size: 'lg'
        });
    }

    /**
     * Get current content
     * @returns {string} Editor content
     */
    getContent() {
        return editorService.getValue();
    }

    /**
     * Set content
     * @param {string} content - Content to set
     */
    setContent(content) {
        editorService.setValue(content);
    }

    /**
     * Dispose application
     */
    dispose() {
        // Save state before disposing
        this.save();

        // Dispose all modules
        editorService.dispose();
        tabsManager.dispose();
        goalsManager.dispose();
        statsManager.dispose();
        linterManager.dispose();
        tocManager.dispose();
        searchManager.dispose();
        templatesManager.dispose();
        snippetsManager.dispose();
        toolbarManager.dispose();
        modesManager.dispose();
        shortcutsManager.dispose();

        this.initialized = false;
        App.instance = null;
    }
}

// Export singleton instance
export const app = new App();

export { App };

export default app;
