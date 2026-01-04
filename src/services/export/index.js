/**
 * Export Services Index
 * Re-exports all export services
 * @module services/export
 */

export { pdfExporter, PDFExporter } from './pdf.js';
export { htmlExporter, HTMLExporter } from './html.js';
export { markdownExporter, MarkdownExporter } from './markdown.js';

/**
 * Export manager - unified interface
 */
export const exportManager = {
    /**
     * Export to PDF
     * @param {string} markdown - Markdown content
     * @param {string} filename - Output filename
     * @param {Object} options - Export options
     */
    async toPDF(markdown, filename = 'document.pdf', options = {}) {
        const { pdfExporter } = await import('./pdf.js');
        return pdfExporter.exportAndDownload(markdown, filename, options);
    },

    /**
     * Export to HTML
     * @param {string} markdown - Markdown content
     * @param {string} filename - Output filename
     * @param {Object} options - Export options
     */
    async toHTML(markdown, filename = 'document.html', options = {}) {
        const { htmlExporter } = await import('./html.js');
        return htmlExporter.exportAndDownload(markdown, filename, options);
    },

    /**
     * Export to Markdown
     * @param {string} markdown - Markdown content
     * @param {string} filename - Output filename
     * @param {Object} options - Export options
     */
    async toMarkdown(markdown, filename = 'document.md', options = {}) {
        const { markdownExporter } = await import('./markdown.js');
        return markdownExporter.exportAndDownload(markdown, filename, options);
    },

    /**
     * Copy HTML to clipboard
     * @param {string} markdown - Markdown content
     */
    async copyAsHTML(markdown) {
        const { htmlExporter } = await import('./html.js');
        const html = htmlExporter.getContent(markdown);

        try {
            await navigator.clipboard.write([
                new ClipboardItem({
                    'text/html': new Blob([html], { type: 'text/html' }),
                    'text/plain': new Blob([html], { type: 'text/plain' })
                })
            ]);
            return true;
        } catch (err) {
            console.error('Failed to copy HTML:', err);
            return false;
        }
    }
};

export default exportManager;
