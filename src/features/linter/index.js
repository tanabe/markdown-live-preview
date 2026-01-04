/**
 * Linter Feature Module
 * Provides markdown linting and suggestions
 * @module features/linter
 */

import { eventBus, EVENTS } from '../../utils/eventBus.js';
import { markdownService } from '../../core/markdown/index.js';
import { editorService } from '../../core/editor/index.js';
import { debounce } from '../../utils/debounce.js';

/**
 * Issue severity levels
 */
export const SEVERITY = {
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info'
};

/**
 * Linter rules
 */
const LINTER_RULES = [
    {
        id: 'multiple-h1',
        name: 'Multiple H1 Headings',
        severity: SEVERITY.WARNING,
        check: (lines) => {
            const h1Lines = lines
                .map((line, i) => ({ line, index: i }))
                .filter(({ line }) => /^#\s/.test(line));

            if (h1Lines.length > 1) {
                return h1Lines.slice(1).map(({ index }) => ({
                    line: index + 1,
                    message: 'Multiple H1 headings found. Consider using only one H1 per document.'
                }));
            }
            return [];
        }
    },
    {
        id: 'heading-increment',
        name: 'Heading Level Increment',
        severity: SEVERITY.WARNING,
        check: (lines) => {
            const issues = [];
            let lastLevel = 0;

            lines.forEach((line, index) => {
                const match = line.match(/^(#+)\s/);
                if (match) {
                    const level = match[1].length;
                    if (lastLevel > 0 && level > lastLevel + 1) {
                        issues.push({
                            line: index + 1,
                            message: `Heading level jumped from H${lastLevel} to H${level}. Consider using H${lastLevel + 1} instead.`
                        });
                    }
                    lastLevel = level;
                }
            });

            return issues;
        }
    },
    {
        id: 'trailing-spaces',
        name: 'Trailing Spaces',
        severity: SEVERITY.INFO,
        check: (lines) => {
            return lines
                .map((line, index) => ({ line, index }))
                .filter(({ line }) => /\s{3,}$/.test(line))
                .map(({ index }) => ({
                    line: index + 1,
                    message: 'Excessive trailing whitespace'
                }));
        }
    },
    {
        id: 'empty-links',
        name: 'Empty Link URLs',
        severity: SEVERITY.ERROR,
        check: (lines) => {
            const issues = [];

            lines.forEach((line, index) => {
                const matches = line.matchAll(/\[([^\]]*)\]\(\s*\)/g);
                for (const match of matches) {
                    issues.push({
                        line: index + 1,
                        message: `Empty link URL for "${match[1]}"`
                    });
                }
            });

            return issues;
        }
    },
    {
        id: 'empty-alt-text',
        name: 'Empty Image Alt Text',
        severity: SEVERITY.WARNING,
        check: (lines) => {
            const issues = [];

            lines.forEach((line, index) => {
                const matches = line.matchAll(/!\[\s*\]\([^)]+\)/g);
                for (const match of matches) {
                    issues.push({
                        line: index + 1,
                        message: 'Image missing alt text for accessibility'
                    });
                }
            });

            return issues;
        }
    },
    {
        id: 'unbalanced-brackets',
        name: 'Unbalanced Brackets',
        severity: SEVERITY.ERROR,
        check: (lines) => {
            const issues = [];

            lines.forEach((line, index) => {
                // Check for unbalanced square brackets
                const openSquare = (line.match(/\[/g) || []).length;
                const closeSquare = (line.match(/\]/g) || []).length;
                if (openSquare !== closeSquare) {
                    issues.push({
                        line: index + 1,
                        message: 'Unbalanced square brackets []'
                    });
                }

                // Check for unbalanced parentheses in links
                const linkPattern = /\]\([^)]*$/;
                if (linkPattern.test(line)) {
                    issues.push({
                        line: index + 1,
                        message: 'Unclosed link parenthesis'
                    });
                }
            });

            return issues;
        }
    },
    {
        id: 'duplicate-links',
        name: 'Duplicate Links',
        severity: SEVERITY.INFO,
        check: (lines) => {
            const links = {};
            const issues = [];

            lines.forEach((line, index) => {
                const matches = line.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g);
                for (const match of matches) {
                    const url = match[2];
                    if (links[url]) {
                        issues.push({
                            line: index + 1,
                            message: `Duplicate link to "${url}" (first used on line ${links[url]})`
                        });
                    } else {
                        links[url] = index + 1;
                    }
                }
            });

            return issues;
        }
    },
    {
        id: 'long-lines',
        name: 'Long Lines',
        severity: SEVERITY.INFO,
        check: (lines) => {
            const maxLength = 120;
            return lines
                .map((line, index) => ({ line, index }))
                .filter(({ line }) => line.length > maxLength && !line.startsWith('|'))
                .map(({ line, index }) => ({
                    line: index + 1,
                    message: `Line exceeds ${maxLength} characters (${line.length})`
                }));
        }
    },
    {
        id: 'fenced-code-language',
        name: 'Fenced Code Without Language',
        severity: SEVERITY.INFO,
        check: (lines) => {
            const issues = [];

            lines.forEach((line, index) => {
                if (/^```\s*$/.test(line)) {
                    issues.push({
                        line: index + 1,
                        message: 'Fenced code block without language specifier'
                    });
                }
            });

            return issues;
        }
    }
];

/**
 * LinterManager class
 * Manages markdown linting
 */
class LinterManager {
    static instance = null;

    constructor() {
        if (LinterManager.instance) {
            return LinterManager.instance;
        }

        this.issues = [];
        this.enabled = true;
        this.rules = [...LINTER_RULES];
        this.disabledRules = new Set();
        this.container = null;
        this.initialized = false;

        LinterManager.instance = this;
    }

    /**
     * Initialize linter manager
     * @param {HTMLElement|string} container - Issues container element
     */
    initialize(container = null) {
        if (this.initialized) return;

        if (container) {
            this.container = typeof container === 'string'
                ? document.querySelector(container)
                : container;
        }

        // Setup event listeners
        this._setupEventListeners();

        this.initialized = true;
    }

    /**
     * Setup event listeners
     * @private
     */
    _setupEventListeners() {
        // Debounced lint on content change
        const debouncedLint = debounce((content) => {
            this.lint(content);
        }, 500);

        eventBus.on(EVENTS.CONTENT_CHANGED, ({ content }) => {
            if (this.enabled) {
                debouncedLint(content);
            }
        });
    }

    /**
     * Run linter on content
     * @param {string} content - Markdown content
     * @returns {Array} Issues found
     */
    lint(content) {
        if (!content) {
            this.issues = [];
            this._updateEditor();
            this.render();
            return this.issues;
        }

        const lines = content.split('\n');
        this.issues = [];

        // Run each enabled rule
        this.rules.forEach(rule => {
            if (this.disabledRules.has(rule.id)) return;

            const ruleIssues = rule.check(lines);
            ruleIssues.forEach(issue => {
                this.issues.push({
                    ...issue,
                    ruleId: rule.id,
                    ruleName: rule.name,
                    severity: rule.severity
                });
            });
        });

        // Sort by line number
        this.issues.sort((a, b) => a.line - b.line);

        // Update editor markers
        this._updateEditor();

        // Render issues panel
        this.render();

        eventBus.emit(EVENTS.LINT_COMPLETED, { issues: this.issues });

        return this.issues;
    }

    /**
     * Update editor with lint markers
     * @private
     */
    _updateEditor() {
        const markerSeverity = {
            [SEVERITY.ERROR]: 8, // MarkerSeverity.Error
            [SEVERITY.WARNING]: 4, // MarkerSeverity.Warning
            [SEVERITY.INFO]: 2 // MarkerSeverity.Info
        };

        const markers = this.issues.map(issue => ({
            severity: markerSeverity[issue.severity] || 4,
            message: `[${issue.ruleName}] ${issue.message}`,
            startLine: issue.line,
            startColumn: 1,
            endLine: issue.line,
            endColumn: 1000
        }));

        editorService.setMarkers(markers, 'linter');
    }

    /**
     * Enable linter
     */
    enable() {
        this.enabled = true;
        eventBus.emit(EVENTS.LINTER_ENABLED);
    }

    /**
     * Disable linter
     */
    disable() {
        this.enabled = false;
        this.issues = [];
        editorService.clearMarkers('linter');
        this.render();
        eventBus.emit(EVENTS.LINTER_DISABLED);
    }

    /**
     * Toggle linter
     * @returns {boolean} New enabled state
     */
    toggle() {
        if (this.enabled) {
            this.disable();
        } else {
            this.enable();
        }
        return this.enabled;
    }

    /**
     * Disable a specific rule
     * @param {string} ruleId - Rule ID
     */
    disableRule(ruleId) {
        this.disabledRules.add(ruleId);
    }

    /**
     * Enable a specific rule
     * @param {string} ruleId - Rule ID
     */
    enableRule(ruleId) {
        this.disabledRules.delete(ruleId);
    }

    /**
     * Add custom rule
     * @param {Object} rule - Rule definition
     */
    addRule(rule) {
        if (!rule.id || !rule.check) {
            console.error('Invalid rule: must have id and check function');
            return;
        }
        this.rules.push({
            severity: SEVERITY.WARNING,
            ...rule
        });
    }

    /**
     * Get all issues
     * @returns {Array} All issues
     */
    getIssues() {
        return [...this.issues];
    }

    /**
     * Get issues by severity
     * @param {string} severity - Severity level
     * @returns {Array} Filtered issues
     */
    getIssuesBySeverity(severity) {
        return this.issues.filter(i => i.severity === severity);
    }

    /**
     * Get issue count by severity
     * @returns {Object} Count by severity
     */
    getIssueCounts() {
        return {
            error: this.issues.filter(i => i.severity === SEVERITY.ERROR).length,
            warning: this.issues.filter(i => i.severity === SEVERITY.WARNING).length,
            info: this.issues.filter(i => i.severity === SEVERITY.INFO).length,
            total: this.issues.length
        };
    }

    /**
     * Navigate to issue line
     * @param {number} line - Line number
     */
    goToLine(line) {
        editorService.setPosition({ lineNumber: line, column: 1 });
        editorService.revealLine(line, 'center');
        editorService.focus();
    }

    /**
     * Render issues panel
     */
    render() {
        if (!this.container) return;

        const counts = this.getIssueCounts();

        if (this.issues.length === 0) {
            this.container.innerHTML = `
                <div class="linter-empty">
                    <span class="linter-check">✓</span>
                    <p>No issues found</p>
                </div>
            `;
            return;
        }

        this.container.innerHTML = `
            <div class="linter-summary">
                ${counts.error > 0 ? `<span class="linter-count error">${counts.error} errors</span>` : ''}
                ${counts.warning > 0 ? `<span class="linter-count warning">${counts.warning} warnings</span>` : ''}
                ${counts.info > 0 ? `<span class="linter-count info">${counts.info} hints</span>` : ''}
            </div>
            <div class="linter-issues">
                ${this.issues.map(issue => `
                    <div class="linter-issue ${issue.severity}" data-line="${issue.line}">
                        <span class="issue-icon">${this._getSeverityIcon(issue.severity)}</span>
                        <span class="issue-line">Line ${issue.line}</span>
                        <span class="issue-message">${issue.message}</span>
                    </div>
                `).join('')}
            </div>
        `;

        // Add click handlers to navigate to issues
        this.container.querySelectorAll('.linter-issue').forEach(el => {
            el.addEventListener('click', () => {
                const line = parseInt(el.dataset.line, 10);
                this.goToLine(line);
            });
        });
    }

    /**
     * Get severity icon
     * @param {string} severity - Severity level
     * @returns {string} Icon HTML
     * @private
     */
    _getSeverityIcon(severity) {
        switch (severity) {
            case SEVERITY.ERROR:
                return '❌';
            case SEVERITY.WARNING:
                return '⚠️';
            case SEVERITY.INFO:
                return 'ℹ️';
            default:
                return '•';
        }
    }

    /**
     * Dispose linter manager
     */
    dispose() {
        editorService.clearMarkers('linter');
        this.issues = [];
        this.initialized = false;
        LinterManager.instance = null;
    }
}

// Export singleton instance
export const linterManager = new LinterManager();

// Export class and constants
export { LinterManager, SEVERITY };

export default linterManager;
