/**
 * Import Manager
 * Handles file imports
 * @module features/import
 */

import { eventBus, EVENTS } from '../../utils/eventBus.js';
import { editorService } from '../../core/editor/index.js';

/**
 * ImportManager class
 * Manages file imports
 */
class ImportManager {
    static instance = null;

    constructor() {
        if (ImportManager.instance) {
            return ImportManager.instance;
        }

        this.fileInput = null;
        this.acceptedTypes = ['.md', '.markdown', '.txt', '.text'];

        ImportManager.instance = this;
    }

    /**
     * Initialize import manager
     * @param {Object} options - Initialization options
     */
    initialize(options = {}) {
        const {
            fileInput = '#file-input',
            button = '#import-button'
        } = options;

        this.fileInput = typeof fileInput === 'string'
            ? document.querySelector(fileInput)
            : fileInput;

        const buttonEl = typeof button === 'string'
            ? document.querySelector(button)
            : button;

        if (buttonEl) {
            buttonEl.addEventListener('click', (e) => {
                e.preventDefault();
                this.openFilePicker();
            });
        }

        if (this.fileInput) {
            this.fileInput.addEventListener('change', (e) => this._handleFileSelect(e));
        }
    }

    /**
     * Open file picker
     */
    openFilePicker() {
        if (this.fileInput) {
            this.fileInput.click();
        }
    }

    /**
     * Handle file selection
     * @param {Event} event
     * @private
     */
    _handleFileSelect(event) {
        const file = event.target.files[0];
        if (!file) return;

        this.importFile(file);

        // Reset input
        event.target.value = '';
    }

    /**
     * Import a file
     * @param {File} file
     */
    importFile(file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const content = e.target.result;
            editorService.setValue(content);
            editorService.focus();

            eventBus.emit(EVENTS.FILE_IMPORTED, { filename: file.name });
            eventBus.emit(EVENTS.TOAST_SHOW, {
                message: `File "${file.name}" imported successfully!`,
                type: 'success'
            });
        };

        reader.onerror = () => {
            eventBus.emit(EVENTS.TOAST_SHOW, {
                message: 'Failed to import file',
                type: 'error'
            });
        };

        reader.readAsText(file);
    }

    /**
     * Import from URL
     * @param {string} url
     */
    async importFromURL(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch');

            const content = await response.text();
            editorService.setValue(content);
            editorService.focus();

            eventBus.emit(EVENTS.FILE_IMPORTED, { url });
            eventBus.emit(EVENTS.TOAST_SHOW, {
                message: 'Content imported successfully!',
                type: 'success'
            });
        } catch (error) {
            eventBus.emit(EVENTS.TOAST_SHOW, {
                message: 'Failed to import from URL',
                type: 'error'
            });
        }
    }

    /**
     * Dispose manager
     */
    dispose() {
        ImportManager.instance = null;
    }
}

export const importManager = new ImportManager();
export { ImportManager };
export default importManager;
