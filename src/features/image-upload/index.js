/**
 * Image Upload Manager
 * Handles image upload via button click and drag & drop
 * @module features/image-upload
 */

import { eventBus, EVENTS } from '../../utils/eventBus.js';
import { editorService } from '../../core/editor/index.js';
import { APP_CONFIG } from '../../config/app.config.js';

/**
 * ImageUploadManager class
 * Manages image uploads and drag/drop
 */
class ImageUploadManager {
    static instance = null;

    constructor() {
        if (ImageUploadManager.instance) {
            return ImageUploadManager.instance;
        }

        this.maxSizeMB = APP_CONFIG.MAX_IMAGE_SIZE_MB || 5;
        this.fileInput = null;
        this.dropZone = null;

        ImageUploadManager.instance = this;
    }

    /**
     * Initialize image upload
     * @param {Object} options - Initialization options
     */
    initialize(options = {}) {
        const {
            fileInput = '#image-input',
            button = '#toolbar-image',
            dropZone = '#editor'
        } = options;

        // Get file input
        this.fileInput = typeof fileInput === 'string'
            ? document.querySelector(fileInput)
            : fileInput;

        // Get button
        const buttonEl = typeof button === 'string'
            ? document.querySelector(button)
            : button;

        // Get drop zone
        this.dropZone = typeof dropZone === 'string'
            ? document.querySelector(dropZone)
            : dropZone;

        // Setup button click
        if (buttonEl && this.fileInput) {
            buttonEl.addEventListener('click', (e) => {
                e.preventDefault();
                this.fileInput.click();
            });
        }

        // Setup file input change
        if (this.fileInput) {
            this.fileInput.addEventListener('change', (e) => this._handleFileSelect(e));
        }

        // Setup drag and drop
        if (this.dropZone) {
            this._setupDragDrop();
        }
    }

    /**
     * Setup drag and drop handlers
     * @private
     */
    _setupDragDrop() {
        this.dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.dropZone.classList.add('drag-over');
        });

        this.dropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.dropZone.classList.remove('drag-over');
        });

        this.dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.dropZone.classList.remove('drag-over');

            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this._handleDrop(files);
            }
        });
    }

    /**
     * Handle file input selection
     * @param {Event} event
     * @private
     */
    _handleFileSelect(event) {
        const file = event.target.files[0];
        if (file) {
            this._processFile(file);
        }
        // Reset input
        event.target.value = '';
    }

    /**
     * Handle dropped files
     * @param {FileList} files
     * @private
     */
    _handleDrop(files) {
        for (const file of files) {
            if (file.type.startsWith('image/')) {
                this._processFile(file);
            }
        }
    }

    /**
     * Process image file
     * @param {File} file
     * @private
     */
    _processFile(file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            eventBus.emit(EVENTS.TOAST_SHOW, {
                message: 'Please select an image file',
                type: 'error'
            });
            return;
        }

        // Validate file size
        const maxSize = this.maxSizeMB * 1024 * 1024;
        if (file.size > maxSize) {
            eventBus.emit(EVENTS.TOAST_SHOW, {
                message: `Image size should be less than ${this.maxSizeMB}MB`,
                type: 'error'
            });
            return;
        }

        eventBus.emit(EVENTS.TOAST_SHOW, {
            message: 'Processing image...',
            type: 'info',
            duration: 1500
        });

        const reader = new FileReader();

        reader.onload = (e) => {
            const base64Image = e.target.result;
            this._insertImage(file.name, base64Image);
        };

        reader.onerror = () => {
            eventBus.emit(EVENTS.TOAST_SHOW, {
                message: 'Failed to process image',
                type: 'error'
            });
        };

        reader.readAsDataURL(file);
    }

    /**
     * Insert image markdown at cursor
     * @param {string} filename - Original filename
     * @param {string} dataUrl - Base64 data URL
     * @private
     */
    _insertImage(filename, dataUrl) {
        // Remove file extension for alt text
        const altText = filename.replace(/\.[^/.]+$/, '');
        const markdown = `![${altText}](${dataUrl})`;

        editorService.insertText(markdown);

        eventBus.emit(EVENTS.TOAST_SHOW, {
            message: 'Image inserted successfully!',
            type: 'success'
        });
    }

    /**
     * Trigger file picker
     */
    openFilePicker() {
        if (this.fileInput) {
            this.fileInput.click();
        }
    }

    /**
     * Set max file size
     * @param {number} sizeMB - Max size in megabytes
     */
    setMaxSize(sizeMB) {
        this.maxSizeMB = sizeMB;
    }

    /**
     * Dispose manager
     */
    dispose() {
        ImageUploadManager.instance = null;
    }
}

export const imageUploadManager = new ImageUploadManager();
export { ImageUploadManager };
export default imageUploadManager;
