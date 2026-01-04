/**
 * UI Components Index
 * Re-exports all UI components
 * @module ui
 */

export { toast, Toast, TOAST_TYPES } from './toast/index.js';
export { modal, Modal } from './modal/index.js';
export { themeManager, ThemeManager, THEMES } from './theme/index.js';
export { autosaveIndicator, AutosaveIndicator } from './autosave/index.js';

export default {
    toast: () => import('./toast/index.js'),
    modal: () => import('./modal/index.js'),
    theme: () => import('./theme/index.js'),
    autosave: () => import('./autosave/index.js')
};
