/**
 * MarkdownService
 * Handles Markdown parsing and rendering
 * @module core/markdown
 */

import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { markedAlerts } from '@polyipseity/marked-alert';
import { markedFootnote } from 'marked-footnote';
import Prism from 'prismjs';
import DOMPurify from 'dompurify';
import mermaid from 'mermaid';
import katex from 'katex';
import { eventBus, EVENTS } from '../../utils/eventBus.js';

// Import Prism language components
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-sql';

/**
 * KaTeX renderer extension
 */
const katexExtension = {
    name: 'katex',
    level: 'inline',
    start(src) {
        const match = src.match(/\$[^\$\n]/);
        return match ? match.index : -1;
    },
    tokenizer(src) {
        // Block math: $$...$$
        const blockMatch = /^\$\$([^\$]+)\$\$/.exec(src);
        if (blockMatch) {
            return {
                type: 'katex',
                raw: blockMatch[0],
                text: blockMatch[1].trim(),
                displayMode: true
            };
        }
        // Inline math: $...$
        const inlineMatch = /^\$([^\$\n]+)\$/.exec(src);
        if (inlineMatch) {
            return {
                type: 'katex',
                raw: inlineMatch[0],
                text: inlineMatch[1].trim(),
                displayMode: false
            };
        }
    },
    renderer(token) {
        try {
            return katex.renderToString(token.text, {
                displayMode: token.displayMode,
                throwOnError: false,
                output: 'htmlAndMathml'
            });
        } catch (err) {
            console.error('KaTeX error:', err);
            return `<code class="katex-error">${token.text}</code>`;
        }
    }
};

/**
 * MarkdownService class
 * Manages Markdown parsing with extensions
 */
class MarkdownService {
    static instance = null;

    constructor() {
        if (MarkdownService.instance) {
            return MarkdownService.instance;
        }

        this.initialized = false;
        this.mermaidEnabled = true;
        this.katexEnabled = true;
        this.renderCount = 0;

        MarkdownService.instance = this;
    }

    /**
     * Initialize the Markdown service
     * @param {Object} options - Configuration options
     */
    initialize(options = {}) {
        if (this.initialized) {
            return;
        }

        // Configure marked with extensions
        marked.use(
            markedHighlight({
                langPrefix: 'language-',
                highlight(code, lang) {
                    const language = Prism.languages[lang] ? lang : 'plaintext';
                    try {
                        return Prism.highlight(
                            code,
                            Prism.languages[language] || Prism.languages.plaintext,
                            language
                        );
                    } catch (err) {
                        console.error('Prism highlight error:', err);
                        return code;
                    }
                }
            }),
            gfmHeadingId(),
            markedAlerts(),
            markedFootnote(),
            {
                extensions: [katexExtension]
            }
        );

        // Configure marked options
        marked.setOptions({
            gfm: true,
            breaks: true,
            pedantic: false,
            ...options.markedOptions
        });

        // Initialize Mermaid
        this._initializeMermaid(options.mermaidOptions);

        // Configure DOMPurify
        this._configureDOMPurify();

        this.mermaidEnabled = options.mermaidEnabled !== false;
        this.katexEnabled = options.katexEnabled !== false;
        this.initialized = true;

        eventBus.emit(EVENTS.MARKDOWN_READY);
    }

    /**
     * Initialize Mermaid
     * @param {Object} options - Mermaid options
     * @private
     */
    _initializeMermaid(options = {}) {
        mermaid.initialize({
            startOnLoad: false,
            theme: 'default',
            securityLevel: 'loose',
            fontFamily: 'inherit',
            ...options
        });
    }

    /**
     * Configure DOMPurify hooks
     * @private
     */
    _configureDOMPurify() {
        // Allow specific attributes for features
        DOMPurify.addHook('uponSanitizeElement', (node, data) => {
            // Preserve mermaid diagrams
            if (data.tagName === 'code' &&
                node.classList &&
                node.classList.contains('language-mermaid')) {
                node.setAttribute('data-processed', 'false');
            }
        });

        // Allow data attributes
        DOMPurify.addHook('afterSanitizeAttributes', (node) => {
            // Allow target="_blank" but add security
            if (node.tagName === 'A' && node.hasAttribute('target')) {
                node.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }

    /**
     * Parse markdown to HTML
     * @param {string} markdown - Markdown content
     * @param {Object} options - Parse options
     * @returns {string} HTML content
     */
    parse(markdown, options = {}) {
        if (!markdown) return '';

        try {
            let html = marked.parse(markdown);

            // Sanitize HTML
            if (options.sanitize !== false) {
                html = this.sanitize(html);
            }

            return html;
        } catch (err) {
            console.error('Markdown parse error:', err);
            return `<p class="error">Error parsing markdown: ${err.message}</p>`;
        }
    }

    /**
     * Sanitize HTML content
     * @param {string} html - HTML to sanitize
     * @returns {string} Sanitized HTML
     */
    sanitize(html) {
        return DOMPurify.sanitize(html, {
            USE_PROFILES: { html: true },
            ADD_TAGS: ['iframe', 'math', 'mrow', 'mo', 'mi', 'mn', 'msup', 'mfrac', 'semantics', 'annotation'],
            ADD_ATTR: ['target', 'class', 'id', 'style', 'data-*', 'aria-*', 'frameborder', 'allowfullscreen'],
            ALLOW_DATA_ATTR: true
        });
    }

    /**
     * Render markdown to a container
     * @param {string} markdown - Markdown content
     * @param {HTMLElement} container - Target container
     * @param {Object} options - Render options
     */
    async render(markdown, container, options = {}) {
        if (!container) return;

        const html = this.parse(markdown, options);
        container.innerHTML = html;

        // Post-process: render mermaid diagrams
        if (this.mermaidEnabled && options.renderMermaid !== false) {
            await this._renderMermaidDiagrams(container);
        }

        this.renderCount++;
        eventBus.emit(EVENTS.PREVIEW_UPDATED, {
            renderCount: this.renderCount
        });
    }

    /**
     * Render Mermaid diagrams in container
     * @param {HTMLElement} container - Container element
     * @private
     */
    async _renderMermaidDiagrams(container) {
        const mermaidBlocks = container.querySelectorAll('code.language-mermaid');

        for (let i = 0; i < mermaidBlocks.length; i++) {
            const block = mermaidBlocks[i];
            const pre = block.parentElement;
            const code = block.textContent;

            try {
                const id = `mermaid-${Date.now()}-${i}`;
                const { svg } = await mermaid.render(id, code);

                const wrapper = document.createElement('div');
                wrapper.className = 'mermaid-diagram';
                wrapper.innerHTML = svg;

                pre.replaceWith(wrapper);
            } catch (err) {
                console.error('Mermaid render error:', err);
                const errorDiv = document.createElement('div');
                errorDiv.className = 'mermaid-error';
                errorDiv.textContent = `Mermaid error: ${err.message}`;
                pre.after(errorDiv);
            }
        }
    }

    /**
     * Set Mermaid theme
     * @param {string} theme - Theme name ('default', 'dark', 'forest', 'neutral')
     */
    setMermaidTheme(theme) {
        mermaid.initialize({
            startOnLoad: false,
            theme: theme
        });
    }

    /**
     * Toggle Mermaid rendering
     * @param {boolean} enabled - Enable/disable
     */
    setMermaidEnabled(enabled) {
        this.mermaidEnabled = enabled;
    }

    /**
     * Toggle KaTeX rendering
     * @param {boolean} enabled - Enable/disable
     */
    setKatexEnabled(enabled) {
        this.katexEnabled = enabled;
    }

    /**
     * Extract table of contents from markdown
     * @param {string} markdown - Markdown content
     * @returns {Array} TOC items
     */
    extractTOC(markdown) {
        const toc = [];
        const headingRegex = /^(#{1,6})\s+(.+)$/gm;
        let match;

        while ((match = headingRegex.exec(markdown)) !== null) {
            const level = match[1].length;
            const text = match[2].trim();
            const id = text
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-');

            toc.push({
                level,
                text,
                id,
                line: markdown.substring(0, match.index).split('\n').length
            });
        }

        return toc;
    }

    /**
     * Extract statistics from markdown
     * @param {string} markdown - Markdown content
     * @returns {Object} Statistics
     */
    extractStats(markdown) {
        const words = markdown
            .replace(/```[\s\S]*?```/g, '') // Remove code blocks
            .replace(/`[^`]*`/g, '') // Remove inline code
            .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Extract link text
            .replace(/[#*_~`]/g, '') // Remove markdown symbols
            .trim()
            .split(/\s+/)
            .filter(w => w.length > 0);

        const chars = markdown.replace(/\s/g, '').length;
        const lines = markdown.split('\n').length;
        const paragraphs = markdown.split(/\n\n+/).filter(p => p.trim()).length;

        return {
            words: words.length,
            characters: markdown.length,
            charactersNoSpaces: chars,
            lines,
            paragraphs,
            readingTime: Math.ceil(words.length / 200) // ~200 WPM
        };
    }

    /**
     * Check if markdown has valid structure
     * @param {string} markdown - Markdown content
     * @returns {Array} Issues found
     */
    lint(markdown) {
        const issues = [];
        const lines = markdown.split('\n');

        lines.forEach((line, index) => {
            const lineNumber = index + 1;

            // Check for multiple H1
            if (/^#\s/.test(line)) {
                const h1Count = lines.filter(l => /^#\s/.test(l)).length;
                if (h1Count > 1) {
                    issues.push({
                        line: lineNumber,
                        type: 'warning',
                        message: 'Multiple H1 headings found'
                    });
                }
            }

            // Check for trailing spaces
            if (/\s{3,}$/.test(line)) {
                issues.push({
                    line: lineNumber,
                    type: 'info',
                    message: 'Excessive trailing spaces'
                });
            }

            // Check for broken links
            const linkMatch = line.match(/\[([^\]]*)\]\(([^)]*)\)/g);
            if (linkMatch) {
                linkMatch.forEach(link => {
                    const urlMatch = link.match(/\]\(([^)]*)\)/);
                    if (urlMatch && urlMatch[1] === '') {
                        issues.push({
                            line: lineNumber,
                            type: 'error',
                            message: 'Empty link URL'
                        });
                    }
                });
            }

            // Check for inconsistent heading levels
            const headingMatch = line.match(/^(#+)\s/);
            if (headingMatch) {
                const level = headingMatch[1].length;
                if (level > 1) {
                    const prevHeadings = lines.slice(0, index)
                        .filter(l => /^#+\s/.test(l));
                    if (prevHeadings.length > 0) {
                        const lastHeading = prevHeadings[prevHeadings.length - 1];
                        const lastLevel = lastHeading.match(/^(#+)/)[1].length;
                        if (level > lastLevel + 1) {
                            issues.push({
                                line: lineNumber,
                                type: 'warning',
                                message: `Heading level jumped from H${lastLevel} to H${level}`
                            });
                        }
                    }
                }
            }
        });

        return issues;
    }
}

// Export singleton instance
export const markdownService = new MarkdownService();

// Also export the class for testing
export { MarkdownService };

export default markdownService;
