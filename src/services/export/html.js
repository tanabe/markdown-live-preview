/**
 * HTML Export Service
 * Exports markdown content to standalone HTML
 * @module services/export/html
 */

import { markdownService } from '../../core/markdown/index.js';
import { eventBus, EVENTS } from '../../utils/eventBus.js';
import { downloadFile } from '../../utils/file.js';

/**
 * HTML template
 */
const HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
    <style>
        * {
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #24292e;
            background: #ffffff;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
        }
        
        h1, h2, h3, h4, h5, h6 {
            margin-top: 24px;
            margin-bottom: 16px;
            font-weight: 600;
            line-height: 1.25;
        }
        
        h1 { font-size: 2em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
        h2 { font-size: 1.5em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
        h3 { font-size: 1.25em; }
        h4 { font-size: 1em; }
        
        p { margin: 0 0 16px 0; }
        
        a {
            color: #0366d6;
            text-decoration: none;
        }
        
        a:hover {
            text-decoration: underline;
        }
        
        code {
            background: #f6f8fa;
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
            font-size: 85%;
        }
        
        pre {
            background: #f6f8fa;
            padding: 16px;
            overflow: auto;
            border-radius: 6px;
            line-height: 1.45;
        }
        
        pre code {
            background: none;
            padding: 0;
            font-size: 100%;
        }
        
        blockquote {
            margin: 0 0 16px 0;
            padding: 0 1em;
            color: #6a737d;
            border-left: 0.25em solid #dfe2e5;
        }
        
        ul, ol {
            margin: 0 0 16px 0;
            padding-left: 2em;
        }
        
        li + li {
            margin-top: 0.25em;
        }
        
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 16px 0;
        }
        
        th, td {
            border: 1px solid #dfe2e5;
            padding: 6px 13px;
        }
        
        th {
            background: #f6f8fa;
            font-weight: 600;
        }
        
        tr:nth-child(2n) {
            background: #f6f8fa;
        }
        
        img {
            max-width: 100%;
            height: auto;
        }
        
        hr {
            border: 0;
            border-top: 1px solid #eaecef;
            margin: 24px 0;
        }
        
        .task-list-item {
            list-style: none;
            margin-left: -1.5em;
        }
        
        .task-list-item input {
            margin-right: 0.5em;
        }
        
        .mermaid-diagram {
            text-align: center;
            margin: 16px 0;
        }
        
        .katex-display {
            overflow-x: auto;
            overflow-y: hidden;
        }

        {{customStyles}}
    </style>
    {{head}}
</head>
<body>
    <article class="markdown-body">
        {{content}}
    </article>
    {{scripts}}
</body>
</html>`;

/**
 * HTMLExporter class
 * Handles HTML export functionality
 */
class HTMLExporter {
    static instance = null;

    constructor() {
        if (HTMLExporter.instance) {
            return HTMLExporter.instance;
        }

        HTMLExporter.instance = this;
    }

    /**
     * Export markdown to standalone HTML
     * @param {string} markdown - Markdown content
     * @param {Object} options - Export options
     * @returns {string} HTML string
     */
    export(markdown, options = {}) {
        const {
            title = 'Document',
            includeStyles = true,
            customStyles = '',
            head = '',
            scripts = ''
        } = options;

        // Parse markdown to HTML
        const content = markdownService.parse(markdown);

        // Build HTML
        let html = HTML_TEMPLATE
            .replace('{{title}}', this._escapeHtml(title))
            .replace('{{content}}', content)
            .replace('{{customStyles}}', customStyles)
            .replace('{{head}}', head)
            .replace('{{scripts}}', scripts);

        eventBus.emit(EVENTS.EXPORT_COMPLETED, { type: 'html' });

        return html;
    }

    /**
     * Export and download HTML
     * @param {string} markdown - Markdown content
     * @param {string} filename - Output filename
     * @param {Object} options - Export options
     */
    exportAndDownload(markdown, filename = 'document.html', options = {}) {
        eventBus.emit(EVENTS.EXPORT_STARTED, { type: 'html', filename });

        const html = this.export(markdown, options);
        const blob = new Blob([html], { type: 'text/html;charset=utf-8' });

        downloadFile(blob, filename);

        eventBus.emit(EVENTS.EXPORT_COMPLETED, { type: 'html', filename });
    }

    /**
     * Export with inline assets
     * @param {string} markdown - Markdown content
     * @param {Object} options - Export options
     * @returns {Promise<string>} HTML with inlined assets
     */
    async exportWithInlineAssets(markdown, options = {}) {
        const html = this.export(markdown, options);

        // TODO: Inline external images as base64
        // This would require fetching images and converting them

        return html;
    }

    /**
     * Get just the HTML content (without wrapper)
     * @param {string} markdown - Markdown content
     * @returns {string} HTML content
     */
    getContent(markdown) {
        return markdownService.parse(markdown);
    }

    /**
     * Escape HTML special characters
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     * @private
     */
    _escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}

// Export singleton instance
export const htmlExporter = new HTMLExporter();

export { HTMLExporter };

export default htmlExporter;
