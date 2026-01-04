/**
 * File Utilities
 * Helpers for file operations
 * @module utils/file
 */

/**
 * Download content as file
 * @param {string} content - File content
 * @param {string} filename - File name
 * @param {string} mimeType - MIME type
 */
export function downloadFile(content, filename, mimeType = 'text/plain') {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * Download as Markdown file
 * @param {string} content - Markdown content
 * @param {string} filename - File name (without extension)
 */
export function downloadMarkdown(content, filename = 'document') {
    downloadFile(content, `${filename}.md`, 'text/markdown');
}

/**
 * Download as HTML file
 * @param {string} content - HTML content
 * @param {string} filename - File name (without extension)
 */
export function downloadHTML(content, filename = 'document') {
    downloadFile(content, `${filename}.html`, 'text/html');
}

/**
 * Download as JSON file
 * @param {Object} data - JSON data
 * @param {string} filename - File name (without extension)
 */
export function downloadJSON(data, filename = 'data') {
    const content = JSON.stringify(data, null, 2);
    downloadFile(content, `${filename}.json`, 'application/json');
}

/**
 * Read file as text
 * @param {File} file - File object
 * @returns {Promise<string>} File content
 */
export function readFileAsText(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
    });
}

/**
 * Read file as Data URL
 * @param {File} file - File object
 * @returns {Promise<string>} Data URL
 */
export function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
    });
}

/**
 * Read file as ArrayBuffer
 * @param {File} file - File object
 * @returns {Promise<ArrayBuffer>} Array buffer
 */
export function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsArrayBuffer(file);
    });
}

/**
 * Get file extension
 * @param {string} filename - File name
 * @returns {string} Extension (lowercase, without dot)
 */
export function getExtension(filename) {
    const parts = filename.split('.');
    return parts.length > 1 ? parts.pop().toLowerCase() : '';
}

/**
 * Get file name without extension
 * @param {string} filename - File name
 * @returns {string} Name without extension
 */
export function getBaseName(filename) {
    const lastDot = filename.lastIndexOf('.');
    return lastDot > 0 ? filename.slice(0, lastDot) : filename;
}

/**
 * Check if file is an image
 * @param {File} file - File object
 * @returns {boolean} Whether file is an image
 */
export function isImageFile(file) {
    return file.type.startsWith('image/');
}

/**
 * Check if file is a markdown file
 * @param {File} file - File object
 * @returns {boolean} Whether file is markdown
 */
export function isMarkdownFile(file) {
    const ext = getExtension(file.name);
    return ['md', 'markdown', 'mdown', 'mkdn', 'mkd'].includes(ext);
}

/**
 * Check if file is a text file
 * @param {File} file - File object
 * @returns {boolean} Whether file is text
 */
export function isTextFile(file) {
    return file.type.startsWith('text/') || isMarkdownFile(file);
}

/**
 * Format file size
 * @param {number} bytes - File size in bytes
 * @param {number} decimals - Decimal places
 * @returns {string} Formatted size
 */
export function formatFileSize(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

/**
 * Validate file size
 * @param {File} file - File object
 * @param {number} maxSizeMB - Maximum size in MB
 * @returns {boolean} Whether file is within size limit
 */
export function validateFileSize(file, maxSizeMB) {
    const maxBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxBytes;
}

/**
 * Create file input and trigger click
 * @param {Object} options - Options
 * @param {string} options.accept - Accept attribute
 * @param {boolean} options.multiple - Allow multiple files
 * @returns {Promise<FileList>} Selected files
 */
export function selectFiles({ accept = '*', multiple = false } = {}) {
    return new Promise((resolve) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = accept;
        input.multiple = multiple;
        input.style.display = 'none';

        input.addEventListener('change', () => {
            resolve(input.files);
            document.body.removeChild(input);
        });

        input.addEventListener('cancel', () => {
            resolve(null);
            document.body.removeChild(input);
        });

        document.body.appendChild(input);
        input.click();
    });
}

/**
 * Select markdown files
 * @returns {Promise<FileList>} Selected files
 */
export function selectMarkdownFile() {
    return selectFiles({ accept: '.md,.markdown,.txt' });
}

/**
 * Select image files
 * @param {boolean} multiple - Allow multiple
 * @returns {Promise<FileList>} Selected files
 */
export function selectImageFiles(multiple = false) {
    return selectFiles({ accept: 'image/*', multiple });
}

export default {
    downloadFile,
    downloadMarkdown,
    downloadHTML,
    downloadJSON,
    readFileAsText,
    readFileAsDataURL,
    readFileAsArrayBuffer,
    getExtension,
    getBaseName,
    isImageFile,
    isMarkdownFile,
    isTextFile,
    formatFileSize,
    validateFileSize,
    selectFiles,
    selectMarkdownFile,
    selectImageFiles
};
