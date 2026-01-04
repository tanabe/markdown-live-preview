/**
 * PDF Export Service
 * Exports markdown content to PDF
 * @module services/export/pdf
 */

import { markdownService } from '../../core/markdown/index.js';
import { eventBus, EVENTS } from '../../utils/eventBus.js';

/**
 * PDF export options
 */
const DEFAULT_OPTIONS = {
    margin: 10,
    filename: 'document.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
};

/**
 * PDFExporter class
 * Handles PDF export functionality
 */
class PDFExporter {
    static instance = null;

    constructor() {
        if (PDFExporter.instance) {
            return PDFExporter.instance;
        }

        this.html2pdf = null;
        this.loaded = false;

        PDFExporter.instance = this;
    }

    /**
     * Load html2pdf library dynamically
     * @returns {Promise<void>}
     * @private
     */
    async _loadLibrary() {
        if (this.loaded) return;

        try {
            const module = await import('html2pdf.js');
            this.html2pdf = module.default;
            this.loaded = true;
        } catch (error) {
            console.error('Failed to load html2pdf:', error);
            throw new Error('PDF export library not available');
        }
    }

    /**
     * Export markdown to PDF
     * @param {string} markdown - Markdown content
     * @param {Object} options - Export options
     * @returns {Promise<Blob>} PDF blob
     */
    async export(markdown, options = {}) {
        await this._loadLibrary();

        const opts = { ...DEFAULT_OPTIONS, ...options };

        // Parse markdown to HTML
        const html = markdownService.parse(markdown);

        // Create container for PDF generation
        const container = document.createElement('div');
        container.className = 'pdf-export-container markdown-body';
        container.innerHTML = html;
        container.style.cssText = `
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
        `;

        // Add styles for PDF
        this._addPDFStyles(container);

        // Temporarily add to document for rendering
        document.body.appendChild(container);

        try {
            eventBus.emit(EVENTS.EXPORT_STARTED, { type: 'pdf' });

            const pdfBlob = await this.html2pdf()
                .set(opts)
                .from(container)
                .outputPdf('blob');

            eventBus.emit(EVENTS.EXPORT_COMPLETED, { type: 'pdf' });

            return pdfBlob;
        } finally {
            // Clean up
            document.body.removeChild(container);
        }
    }

    /**
     * Export and download PDF
     * @param {string} markdown - Markdown content
     * @param {string} filename - Output filename
     * @param {Object} options - Export options
     */
    async exportAndDownload(markdown, filename = 'document.pdf', options = {}) {
        await this._loadLibrary();

        const opts = { ...DEFAULT_OPTIONS, ...options, filename };

        // Parse markdown to HTML
        const html = markdownService.parse(markdown);

        // Create container
        const container = document.createElement('div');
        container.className = 'pdf-export-container markdown-body';
        container.innerHTML = html;
        container.style.cssText = `
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
        `;

        this._addPDFStyles(container);
        document.body.appendChild(container);

        try {
            eventBus.emit(EVENTS.EXPORT_STARTED, { type: 'pdf', filename });

            await this.html2pdf()
                .set(opts)
                .from(container)
                .save();

            eventBus.emit(EVENTS.EXPORT_COMPLETED, { type: 'pdf', filename });
        } finally {
            document.body.removeChild(container);
        }
    }

    /**
     * Add PDF-specific styles
     * @param {HTMLElement} container - Container element
     * @private
     */
    _addPDFStyles(container) {
        const style = document.createElement('style');
        style.textContent = `
            .pdf-export-container {
                color: #1a1a1a;
                background: white;
            }
            .pdf-export-container h1 { font-size: 24px; margin: 0 0 16px 0; }
            .pdf-export-container h2 { font-size: 20px; margin: 24px 0 12px 0; }
            .pdf-export-container h3 { font-size: 16px; margin: 20px 0 10px 0; }
            .pdf-export-container p { margin: 0 0 12px 0; }
            .pdf-export-container pre {
                background: #f6f8fa;
                padding: 12px;
                border-radius: 6px;
                overflow-x: auto;
                font-size: 13px;
            }
            .pdf-export-container code {
                background: #f6f8fa;
                padding: 2px 6px;
                border-radius: 4px;
                font-size: 13px;
            }
            .pdf-export-container pre code {
                background: none;
                padding: 0;
            }
            .pdf-export-container blockquote {
                border-left: 4px solid #ddd;
                margin: 0 0 12px 0;
                padding: 0 16px;
                color: #666;
            }
            .pdf-export-container table {
                border-collapse: collapse;
                width: 100%;
                margin: 12px 0;
            }
            .pdf-export-container th, .pdf-export-container td {
                border: 1px solid #ddd;
                padding: 8px 12px;
                text-align: left;
            }
            .pdf-export-container th {
                background: #f6f8fa;
            }
            .pdf-export-container img {
                max-width: 100%;
                height: auto;
            }
            .pdf-export-container a {
                color: #0366d6;
                text-decoration: none;
            }
            .pdf-export-container ul, .pdf-export-container ol {
                margin: 0 0 12px 0;
                padding-left: 24px;
            }
            .pdf-export-container li {
                margin: 4px 0;
            }
            .pdf-export-container hr {
                border: none;
                border-top: 1px solid #ddd;
                margin: 24px 0;
            }
        `;
        container.prepend(style);
    }
}

// Export singleton instance
export const pdfExporter = new PDFExporter();

export { PDFExporter };

export default pdfExporter;
