/**
 * Features Index
 * Re-exports all feature modules
 * @module features
 */

export { tabsManager, TabsManager } from './tabs/index.js';
export { goalsManager, GoalsManager, GOAL_TYPES } from './goals/index.js';
export { statsManager, StatsManager } from './stats/index.js';
export { linterManager, LinterManager, SEVERITY } from './linter/index.js';
export { tocManager, TOCManager } from './toc/index.js';
export { searchManager, SearchManager } from './search/index.js';
export { templatesManager, TemplatesManager } from './templates/index.js';
export { snippetsManager, SnippetsManager } from './snippets/index.js';
export { toolbarManager, ToolbarManager } from './toolbar/index.js';
export { modesManager, ModesManager, VIEW_MODES, SPLIT_ORIENTATION } from './modes/index.js';

// Additional feature modules
export { focusManager, FocusManager } from './focus/index.js';
export { typewriterManager, TypewriterManager } from './typewriter/index.js';
export { fullscreenManager, FullscreenManager } from './fullscreen/index.js';
export { imageUploadManager, ImageUploadManager } from './image-upload/index.js';
export { dividerManager, DividerManager } from './divider/index.js';
export { mobileUIManager, MobileUIManager } from './mobile/index.js';
export { importManager, ImportManager } from './import/index.js';

export default {
    tabs: () => import('./tabs/index.js'),
    goals: () => import('./goals/index.js'),
    stats: () => import('./stats/index.js'),
    linter: () => import('./linter/index.js'),
    toc: () => import('./toc/index.js'),
    search: () => import('./search/index.js'),
    templates: () => import('./templates/index.js'),
    snippets: () => import('./snippets/index.js'),
    toolbar: () => import('./toolbar/index.js'),
    modes: () => import('./modes/index.js'),
    focus: () => import('./focus/index.js'),
    typewriter: () => import('./typewriter/index.js'),
    fullscreen: () => import('./fullscreen/index.js'),
    imageUpload: () => import('./image-upload/index.js'),
    divider: () => import('./divider/index.js'),
    mobile: () => import('./mobile/index.js'),
    import: () => import('./import/index.js')
};
