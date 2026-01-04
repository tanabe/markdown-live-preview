/**
 * DOCX Exporter
 * Exports content as Word-compatible document
 * @module services/export/docx
 */

import { eventBus, EVENTS } from '../../utils/eventBus.js';
import { markdownService } from '../../core/markdown/index.js';
import { downloadBlob } from '../../utils/file.js';

/**
 * DOCXExporter class
 * Exports markdown as Word-compatible HTML
 */
class DOCXExporter {
    static instance = null;

    constructor() {
        if (DOCXExporter.instance) {
            return DOCXExporter.instance;
        }
        DOCXExporter.instance = this;
    }

    /**
     * Export content as DOCX (Word-compatible HTML)
     * @param {string} content - Markdown content
     * @param {string} filename - Output filename
     */
    async export(content, filename = 'document.doc') {
        try {
            // Convert markdown to HTML
            const html = await markdownService.parse(content);

            // Create Word-compatible HTML
            const docxHtml = this._createWordHTML(html);

            // Create blob and download
            const blob = new Blob([docxHtml], { type: 'application/msword' });
            downloadBlob(blob, filename);

            eventBus.emit(EVENTS.EXPORT_COMPLETE, { format: 'docx', filename });
        } catch (error) {
            console.error('DOCX export failed:', error);
            eventBus.emit(EVENTS.EXPORT_ERROR, { format: 'docx', error });
            throw error;
        }
    }

    /**
     * Create Word-compatible HTML
     * @param {string} content - HTML content
     * @returns {string} Word-compatible HTML
     * @private
     */
    _createWordHTML(content) {
        return `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' 
      xmlns:w='urn:schemas-microsoft-com:office:word' 
      xmlns='http://www.w3.org/TR/REC-html40'>
<head>
    <meta charset='utf-8'>
    <title>Export Document</title>
    <!--[if gte mso 9]>
    <xml>
        <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>90</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
        </w:WordDocument>
    </xml>
    <![endif]-->
    <style>
        body {
            font-family: 'Calibri', 'Arial', sans-serif;
            font-size: 11pt;
            line-height: 1.5;
            color: #333;
        }
        h1 { font-size: 24pt; margin-bottom: 12pt; }
        h2 { font-size: 18pt; margin-bottom: 10pt; }
        h3 { font-size: 14pt; margin-bottom: 8pt; }
        h4 { font-size: 12pt; margin-bottom: 6pt; }
        p { margin-bottom: 10pt; }
        code {
            font-family: 'Consolas', 'Courier New', monospace;
            background-color: #f5f5f5;
            padding: 2px 4px;
        }
        pre {
            font-family: 'Consolas', 'Courier New', monospace;
            background-color: #f5f5f5;
            padding: 10pt;
            border: 1pt solid #ddd;
        }
        blockquote {
            border-left: 3pt solid #ddd;
            margin-left: 0;
            padding-left: 10pt;
            color: #666;
        }
        table {
            border-collapse: collapse;
            width: 100%;
        }
        th, td {
            border: 1pt solid #ddd;
            padding: 8pt;
            text-align: left;
        }
        th {
            background-color: #f5f5f5;
        }
        ul, ol {
            margin-left: 20pt;
        }
        a {
            color: #0066cc;
        }
    </style>
</head>
<body>
${content}
</body>
</html>`;
    }
}

export const docxExporter = new DOCXExporter();
export { DOCXExporter };
export default docxExporter;
