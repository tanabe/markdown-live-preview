/**
 * Markdown Live Preview
 * Main entry point
 * 
 * This is the new modular version that replaces the monolithic main.js
 * @module main
 */

import { app } from './app.js';

// Import global styles
import 'katex/dist/katex.min.css';
import 'prismjs/themes/prism.css';

/**
 * DOM Ready handler
 */
function onReady(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
}

/**
 * Initialize application
 */
onReady(async () => {
    try {
        await app.initialize({
            containers: {
                editor: '#editor',
                preview: '#preview',
                main: '.main-container',
                toolbar: '.toolbar-container',
                tabs: '.tabs-container',
                stats: '.stats-container',
                toc: '.toc-panel',
                search: '.search-panel',
                linter: '.linter-panel',
                templates: '.templates-panel',
                snippets: '.snippets-panel',
                goals: '.goals-container'
            }
        });

        // Expose app to window for debugging
        if (import.meta.env.DEV) {
            window.app = app;
            window.mdPreview = {
                app,
                editor: () => import('./core/editor/index.js'),
                markdown: () => import('./core/markdown/index.js'),
                eventBus: () => import('./utils/eventBus.js'),
                features: () => import('./features/index.js'),
                services: () => import('./services/index.js'),
                ui: () => import('./ui/index.js')
            };
            console.log('📚 Dev mode: Access app via window.mdPreview');
        }

    } catch (error) {
        console.error('Failed to initialize application:', error);

        // Show error message
        const errorContainer = document.createElement('div');
        errorContainer.className = 'app-error';
        errorContainer.innerHTML = `
            <h1>Failed to Load</h1>
            <p>Something went wrong while loading the application.</p>
            <pre>${error.message}</pre>
            <button onclick="location.reload()">Reload</button>
        `;
        errorContainer.style.cssText = `
            position: fixed;
            inset: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: #1a1a1a;
            color: #fff;
            font-family: system-ui;
            text-align: center;
            padding: 20px;
        `;
        document.body.appendChild(errorContainer);
    }
});

// Export for external use
export { app };
export default app;
