/**
 * Clipboard Utilities
 * Helpers for clipboard operations
 * @module utils/clipboard
 */

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export async function copyToClipboard(text) {
    try {
        // Modern API
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
            return true;
        }

        // Fallback for older browsers
        return fallbackCopy(text);
    } catch (error) {
        console.error('Clipboard copy failed:', error);
        return fallbackCopy(text);
    }
}

/**
 * Fallback copy using execCommand
 * @private
 * @param {string} text - Text to copy
 * @returns {boolean} Success status
 */
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 2em;
        height: 2em;
        padding: 0;
        border: none;
        outline: none;
        box-shadow: none;
        background: transparent;
    `;

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    let success = false;
    try {
        success = document.execCommand('copy');
    } catch (err) {
        console.error('Fallback copy failed:', err);
    }

    document.body.removeChild(textArea);
    return success;
}

/**
 * Copy HTML to clipboard
 * @param {string} html - HTML to copy
 * @returns {Promise<boolean>} Success status
 */
export async function copyHTMLToClipboard(html) {
    try {
        if (navigator.clipboard && navigator.clipboard.write) {
            const blob = new Blob([html], { type: 'text/html' });
            const item = new ClipboardItem({ 'text/html': blob });
            await navigator.clipboard.write([item]);
            return true;
        }

        // Fallback to plain text
        return copyToClipboard(html);
    } catch (error) {
        console.error('HTML clipboard copy failed:', error);
        return copyToClipboard(html);
    }
}

/**
 * Read text from clipboard
 * @returns {Promise<string|null>} Clipboard text or null
 */
export async function readFromClipboard() {
    try {
        if (navigator.clipboard && navigator.clipboard.readText) {
            return await navigator.clipboard.readText();
        }
        return null;
    } catch (error) {
        console.error('Clipboard read failed:', error);
        return null;
    }
}

/**
 * Check if clipboard API is available
 * @returns {boolean} Whether clipboard API is available
 */
export function isClipboardAvailable() {
    return !!(navigator.clipboard && navigator.clipboard.writeText);
}

/**
 * Copy element's text content
 * @param {Element} element - Element to copy from
 * @returns {Promise<boolean>} Success status
 */
export async function copyElementText(element) {
    const text = element?.textContent || element?.innerText;
    if (text) {
        return copyToClipboard(text);
    }
    return false;
}

/**
 * Copy element's inner HTML
 * @param {Element} element - Element to copy from
 * @returns {Promise<boolean>} Success status
 */
export async function copyElementHTML(element) {
    const html = element?.innerHTML;
    if (html) {
        return copyHTMLToClipboard(html);
    }
    return false;
}

export default {
    copyToClipboard,
    copyHTMLToClipboard,
    readFromClipboard,
    isClipboardAvailable,
    copyElementText,
    copyElementHTML
};
