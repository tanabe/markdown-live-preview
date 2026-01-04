# AGENTS.md

## Commands
- **Dev server**: `npm run dev` (Vite dev server)
- **Build**: `npm run build` (production build to dist/)
- **Preview**: `npm run preview` (preview production build)
- **Tests**: No test framework configured

## Architecture
- **Frontend-only** Vite + vanilla JavaScript application
- **Entry point**: `src/main.js` or `src/main.modular.js` (new modular architecture)
- **App orchestrator**: `src/app.js` - coordinates all modules
- **Key libraries**: Monaco Editor (code editor), Marked (markdown parser), Mermaid (diagrams), KaTeX (math), Prism.js (syntax highlighting), DOMPurify (sanitization)
- **Storage**: localStorage via custom StorageService for document persistence
- **Styling**: GitHub Markdown CSS, custom styles in `public/`

## Modular Structure
```
src/
├── app.js              # App orchestrator
├── main.modular.js     # New modular entry point
├── config/             # Configuration files
├── utils/              # Utility functions (EventBus, debounce, DOM helpers)
├── core/               # Core services (editor, markdown, storage)
├── ui/                 # UI components (toast, modal, theme)
├── features/           # Feature modules (tabs, goals, stats, linter, toc, search, templates, snippets, toolbar, modes)
└── services/           # Services (export, shortcuts)
```

## Code Style
- Vanilla JavaScript (no TypeScript)
- ES modules with named imports
- Singleton pattern for services and managers
- Event-driven communication via EventBus
- DOM manipulation via `document.querySelector`
- LocalStorage keys namespaced under `com.markdownlivepreview`
- Config centralized in `src/config/` directory
- Feature flags in `src/config/app.config.js`
- Prefer semicolons for consistency
