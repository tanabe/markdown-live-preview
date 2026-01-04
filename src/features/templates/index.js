/**
 * Templates Feature Module
 * Provides document templates
 * @module features/templates
 */

import { eventBus, EVENTS } from '../../utils/eventBus.js';
import { editorService } from '../../core/editor/index.js';
import { TEMPLATES } from '../../config/templates.js';

/**
 * TemplatesManager class
 * Manages document templates
 */
class TemplatesManager {
    static instance = null;

    constructor() {
        if (TemplatesManager.instance) {
            return TemplatesManager.instance;
        }

        this.templates = { ...TEMPLATES };
        this.customTemplates = {};
        this.container = null;
        this.visible = false;
        this.initialized = false;

        TemplatesManager.instance = this;
    }

    /**
     * Initialize templates manager
     * @param {HTMLElement|string} container - Templates panel container
     */
    initialize(container = null) {
        if (this.initialized) return;

        if (container) {
            this.container = typeof container === 'string'
                ? document.querySelector(container)
                : container;
        }

        // Load custom templates from storage
        this._loadCustomTemplates();

        this.initialized = true;
    }

    /**
     * Load custom templates from storage
     * @private
     */
    _loadCustomTemplates() {
        try {
            const saved = localStorage.getItem('custom_templates');
            if (saved) {
                this.customTemplates = JSON.parse(saved);
            }
        } catch (e) {
            console.error('Failed to load custom templates:', e);
        }
    }

    /**
     * Save custom templates to storage
     * @private
     */
    _saveCustomTemplates() {
        try {
            localStorage.setItem('custom_templates', JSON.stringify(this.customTemplates));
        } catch (e) {
            console.error('Failed to save custom templates:', e);
        }
    }

    /**
     * Get all templates (built-in + custom)
     * @returns {Object} All templates
     */
    getAllTemplates() {
        return {
            ...this.templates,
            ...Object.fromEntries(
                Object.entries(this.customTemplates).map(([key, val]) => [
                    key,
                    { ...val, isCustom: true }
                ])
            )
        };
    }

    /**
     * Get template by ID
     * @param {string} id - Template ID
     * @returns {Object|null} Template object
     */
    getTemplate(id) {
        return this.templates[id] || this.customTemplates[id] || null;
    }

    /**
     * Apply template to editor
     * @param {string} id - Template ID
     * @param {boolean} replace - Replace entire content
     */
    apply(id, replace = true) {
        const template = this.getTemplate(id);
        if (!template) {
            console.error(`Template not found: ${id}`);
            return;
        }

        if (replace) {
            editorService.setValue(template.content);
        } else {
            editorService.insertText(template.content);
        }

        this.hide();

        eventBus.emit(EVENTS.TEMPLATE_APPLIED, { id, template });
    }

    /**
     * Add custom template
     * @param {Object} template - Template object
     * @returns {string} Template ID
     */
    addCustomTemplate(template) {
        const id = `custom-${Date.now()}`;

        this.customTemplates[id] = {
            id,
            name: template.name || 'Custom Template',
            description: template.description || '',
            category: template.category || 'Custom',
            content: template.content || ''
        };

        this._saveCustomTemplates();
        this.render();

        eventBus.emit(EVENTS.TEMPLATE_CREATED, { id, template: this.customTemplates[id] });

        return id;
    }

    /**
     * Remove custom template
     * @param {string} id - Template ID
     */
    removeCustomTemplate(id) {
        if (this.customTemplates[id]) {
            delete this.customTemplates[id];
            this._saveCustomTemplates();
            this.render();

            eventBus.emit(EVENTS.TEMPLATE_REMOVED, { id });
        }
    }

    /**
     * Create template from current content
     * @param {string} name - Template name
     * @param {string} description - Template description
     * @returns {string} Template ID
     */
    createFromCurrent(name, description = '') {
        return this.addCustomTemplate({
            name,
            description,
            content: editorService.getValue()
        });
    }

    /**
     * Show templates panel
     */
    show() {
        this.visible = true;
        this.render();

        if (this.container) {
            this.container.classList.add('visible');
        }

        eventBus.emit(EVENTS.TEMPLATES_SHOWN);
    }

    /**
     * Hide templates panel
     */
    hide() {
        this.visible = false;

        if (this.container) {
            this.container.classList.remove('visible');
        }

        eventBus.emit(EVENTS.TEMPLATES_HIDDEN);
    }

    /**
     * Toggle templates panel
     * @returns {boolean} New visibility
     */
    toggle() {
        if (this.visible) {
            this.hide();
        } else {
            this.show();
        }
        return this.visible;
    }

    /**
     * Get templates grouped by category
     * @returns {Object} Templates by category
     */
    getByCategory() {
        const all = this.getAllTemplates();
        const grouped = {};

        Object.values(all).forEach(template => {
            const category = template.category || 'Other';
            if (!grouped[category]) {
                grouped[category] = [];
            }
            grouped[category].push(template);
        });

        return grouped;
    }

    /**
     * Render templates panel
     */
    render() {
        if (!this.container) return;

        const grouped = this.getByCategory();

        this.container.innerHTML = `
            <div class="templates-panel">
                <div class="templates-header">
                    <h3>Templates</h3>
                    <button class="templates-close" title="Close">×</button>
                </div>
                <div class="templates-search">
                    <input type="text" 
                           class="templates-search-input" 
                           placeholder="Search templates...">
                </div>
                <div class="templates-content">
                    ${Object.entries(grouped).map(([category, templates]) => `
                        <div class="template-category">
                            <h4 class="category-title">${category}</h4>
                            <div class="template-grid">
                                ${templates.map(template => `
                                    <div class="template-card" data-id="${template.id}">
                                        <div class="template-icon">${this._getCategoryIcon(category)}</div>
                                        <div class="template-info">
                                            <span class="template-name">${template.name}</span>
                                            <span class="template-desc">${template.description || ''}</span>
                                        </div>
                                        ${template.isCustom ? `
                                            <button class="template-delete" data-id="${template.id}" title="Delete">
                                                ×
                                            </button>
                                        ` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="templates-footer">
                    <button class="templates-btn save-current">
                        + Save Current as Template
                    </button>
                </div>
            </div>
        `;

        this._attachEventHandlers();
    }

    /**
     * Get category icon
     * @param {string} category - Category name
     * @returns {string} Icon
     * @private
     */
    _getCategoryIcon(category) {
        const icons = {
            'Documentation': '📚',
            'Development': '💻',
            'Writing': '✍️',
            'Personal': '👤',
            'Custom': '⭐'
        };
        return icons[category] || '📄';
    }

    /**
     * Attach event handlers
     * @private
     */
    _attachEventHandlers() {
        if (!this.container) return;

        // Close button
        this.container.querySelector('.templates-close')
            ?.addEventListener('click', () => this.hide());

        // Template cards
        this.container.querySelectorAll('.template-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.template-delete')) {
                    this.apply(card.dataset.id);
                }
            });
        });

        // Delete buttons
        this.container.querySelectorAll('.template-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.removeCustomTemplate(btn.dataset.id);
            });
        });

        // Search
        const searchInput = this.container.querySelector('.templates-search-input');
        searchInput?.addEventListener('input', (e) => {
            this._filterTemplates(e.target.value);
        });

        // Save current
        this.container.querySelector('.save-current')
            ?.addEventListener('click', () => {
                this._showSaveDialog();
            });
    }

    /**
     * Filter templates by search term
     * @param {string} term - Search term
     * @private
     */
    _filterTemplates(term) {
        if (!this.container) return;

        const cards = this.container.querySelectorAll('.template-card');
        const lowerTerm = term.toLowerCase();

        cards.forEach(card => {
            const name = card.querySelector('.template-name')?.textContent.toLowerCase() || '';
            const desc = card.querySelector('.template-desc')?.textContent.toLowerCase() || '';

            if (name.includes(lowerTerm) || desc.includes(lowerTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });

        // Hide empty categories
        this.container.querySelectorAll('.template-category').forEach(cat => {
            const visibleCards = cat.querySelectorAll('.template-card:not([style*="display: none"])');
            cat.style.display = visibleCards.length > 0 ? '' : 'none';
        });
    }

    /**
     * Show save template dialog
     * @private
     */
    _showSaveDialog() {
        eventBus.emit(EVENTS.SHOW_PROMPT, {
            title: 'Save as Template',
            message: 'Enter a name for this template:',
            placeholder: 'My Template',
            onConfirm: (name) => {
                if (name) {
                    this.createFromCurrent(name);
                }
            }
        });
    }

    /**
     * Dispose templates manager
     */
    dispose() {
        this.customTemplates = {};
        this.initialized = false;
        TemplatesManager.instance = null;
    }
}

// Export singleton instance
export const templatesManager = new TemplatesManager();

// Export class for testing
export { TemplatesManager };

export default templatesManager;
