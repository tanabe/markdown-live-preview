/**
 * Config Index
 * Re-exports all configuration modules
 * @module config
 */

export { APP_CONFIG, FEATURE_FLAGS, BREAKPOINTS, ANIMATIONS } from './app.config.js';
export { TEMPLATES, TEMPLATE_CATEGORIES, getTemplatesByCategory, getTemplateById } from './templates.js';
export { SNIPPETS, SNIPPET_CATEGORIES, getSnippetsByCategory, getSnippetById } from './snippets.js';
export { DEFAULT_CONTENT } from './default-content.js';
