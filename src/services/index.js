/**
 * Services Index
 * Re-exports all services
 * @module services
 */

export { exportManager, pdfExporter, htmlExporter, markdownExporter } from './export/index.js';
export { docxExporter, DOCXExporter } from './export/docx.js';
export { shortcutsManager, ShortcutsManager, DEFAULT_SHORTCUTS } from './shortcuts/index.js';
export { pwaService, PWAService } from './pwa/index.js';

export default {
    export: () => import('./export/index.js'),
    docx: () => import('./export/docx.js'),
    shortcuts: () => import('./shortcuts/index.js'),
    pwa: () => import('./pwa/index.js')
};
