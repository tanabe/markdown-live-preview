/**
 * Markdown Export Service
 * Exports and processes markdown content
 * @module services/export/markdown
 */

import { eventBus, EVENTS } from '../../utils/eventBus.js';
import { downloadFile } from '../../utils/file.js';

/**
 * MarkdownExporter class
 * Handles Markdown export functionality
 */
class MarkdownExporter {
    static instance = null;

    constructor() {
        if (MarkdownExporter.instance) {
            return MarkdownExporter.instance;
        }

        MarkdownExporter.instance = this;
    }

    /**
     * Export markdown content
     * @param {string} markdown - Markdown content
     * @param {Object} options - Export options
     * @returns {string} Processed markdown
     */
    export(markdown, options = {}) {
        const {
            normalizeLineEndings = true,
            trimTrailingWhitespace = true,
            ensureFinalNewline = true,
            format = false
        } = options;

        let content = markdown;

        // Normalize line endings
        if (normalizeLineEndings) {
            content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        }

        // Trim trailing whitespace
        if (trimTrailingWhitespace) {
            content = content
                .split('\n')
                .map(line => line.replace(/\s+$/, ''))
                .join('\n');
        }

        // Ensure final newline
        if (ensureFinalNewline && !content.endsWith('\n')) {
            content += '\n';
        }

        // Format markdown
        if (format) {
            content = this._formatMarkdown(content);
        }

        return content;
    }

    /**
     * Export and download markdown
     * @param {string} markdown - Markdown content
     * @param {string} filename - Output filename
     * @param {Object} options - Export options
     */
    exportAndDownload(markdown, filename = 'document.md', options = {}) {
        eventBus.emit(EVENTS.EXPORT_STARTED, { type: 'markdown', filename });

        const content = this.export(markdown, options);
        const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });

        downloadFile(blob, filename);

        eventBus.emit(EVENTS.EXPORT_COMPLETED, { type: 'markdown', filename });
    }

    /**
     * Format markdown content
     * @param {string} markdown - Markdown content
     * @returns {string} Formatted markdown
     * @private
     */
    _formatMarkdown(markdown) {
        const lines = markdown.split('\n');
        const formatted = [];
        let lastLineType = null;

        lines.forEach((line, index) => {
            const lineType = this._getLineType(line);

            // Add blank line before headings (unless at start)
            if (lineType === 'heading' && index > 0 && lastLineType !== 'blank') {
                formatted.push('');
            }

            // Add blank line before code blocks
            if (lineType === 'code-start' && lastLineType !== 'blank') {
                formatted.push('');
            }

            // Add blank line after code blocks
            if (lastLineType === 'code-end' && lineType !== 'blank') {
                formatted.push('');
            }

            formatted.push(line);
            lastLineType = lineType;
        });

        return formatted.join('\n');
    }

    /**
     * Get line type for formatting
     * @param {string} line - Line content
     * @returns {string} Line type
     * @private
     */
    _getLineType(line) {
        if (line.trim() === '') return 'blank';
        if (/^#{1,6}\s/.test(line)) return 'heading';
        if (/^```/.test(line)) return line === '```' ? 'code-end' : 'code-start';
        if (/^[-*+]\s/.test(line)) return 'list';
        if (/^\d+\.\s/.test(line)) return 'ordered-list';
        if (/^>\s/.test(line)) return 'quote';
        if (/^\|/.test(line)) return 'table';
        return 'paragraph';
    }

    /**
     * Extract frontmatter from markdown
     * @param {string} markdown - Markdown content
     * @returns {Object} { frontmatter, content }
     */
    extractFrontmatter(markdown) {
        const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
        const match = markdown.match(frontmatterRegex);

        if (match) {
            const frontmatterText = match[1];
            const content = markdown.slice(match[0].length);

            // Parse YAML-like frontmatter
            const frontmatter = {};
            frontmatterText.split('\n').forEach(line => {
                const colonIndex = line.indexOf(':');
                if (colonIndex > 0) {
                    const key = line.slice(0, colonIndex).trim();
                    const value = line.slice(colonIndex + 1).trim();
                    frontmatter[key] = value;
                }
            });

            return { frontmatter, content };
        }

        return { frontmatter: null, content: markdown };
    }

    /**
     * Add frontmatter to markdown
     * @param {string} markdown - Markdown content
     * @param {Object} frontmatter - Frontmatter object
     * @returns {string} Markdown with frontmatter
     */
    addFrontmatter(markdown, frontmatter) {
        const lines = Object.entries(frontmatter)
            .map(([key, value]) => `${key}: ${value}`);

        return `---\n${lines.join('\n')}\n---\n\n${markdown}`;
    }

    /**
     * Remove all comments from markdown
     * @param {string} markdown - Markdown content
     * @returns {string} Markdown without comments
     */
    removeComments(markdown) {
        // Remove HTML comments
        return markdown.replace(/<!--[\s\S]*?-->/g, '');
    }

    /**
     * Convert URLs to reference-style links
     * @param {string} markdown - Markdown content
     * @returns {string} Markdown with reference links
     */
    convertToReferenceLinks(markdown) {
        const links = [];
        let counter = 1;

        // Find all inline links
        const converted = markdown.replace(
            /\[([^\]]+)\]\(([^)]+)\)/g,
            (match, text, url) => {
                links.push({ id: counter, url });
                return `[${text}][${counter++}]`;
            }
        );

        // Add references at the end
        if (links.length > 0) {
            const references = links
                .map(link => `[${link.id}]: ${link.url}`)
                .join('\n');
            return `${converted}\n\n${references}`;
        }

        return converted;
    }
}

// Export singleton instance
export const markdownExporter = new MarkdownExporter();

export { MarkdownExporter };

export default markdownExporter;
