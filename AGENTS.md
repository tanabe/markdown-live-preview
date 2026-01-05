# AGENTS.md

> Configuration file for AI coding agents working on **Markups** - Free Online Markdown Editor.

## Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start Vite dev server (http://localhost:5173) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |

## Architecture

**Frontend-only** Vite + vanilla JavaScript application.
**Live URL**: https://markups.vercel.app/

### Entry Points
- `index.html` — Main HTML file
- `src/main.js` — Primary JavaScript entry point

### Key Libraries
| Library | Purpose |
|---------|---------|
| Monaco Editor | Code editor (VS Code's editor) |
| Marked | Markdown parser |
| Mermaid | Diagram rendering |
| KaTeX | Math equation rendering |
| Prism.js | Syntax highlighting |
| DOMPurify | XSS sanitization |
| html2pdf.js | PDF export |

### Storage
- LocalStorage for document persistence
- Settings stored under `markdown_editor_settings` key

## Project Structure

```
src/
├── main.js             # Main entry point
├── config/             # Configuration files
│   ├── app.config.js   # App settings & feature flags
│   ├── default-content.js
│   ├── snippets.js
│   └── templates.js
├── core/               # Core services
│   ├── editor/         # Monaco editor setup
│   ├── markdown/       # Markdown parser config
│   └── storage/        # LocalStorage service
├── features/           # Feature modules
│   ├── tabs/           # Multi-tab support
│   ├── toc/            # Table of contents
│   ├── goals/          # Writing goals
│   ├── stats/          # Word/char statistics
│   ├── linter/         # Markdown linting
│   ├── search/         # Search in preview
│   ├── templates/      # Document templates
│   ├── snippets/       # Text snippets
│   ├── toolbar/        # Formatting toolbar
│   ├── modes/          # Editor modes
│   ├── focus/          # Focus mode
│   ├── typewriter/     # Typewriter mode
│   ├── fullscreen/     # Fullscreen mode
│   ├── divider/        # Resizable divider
│   ├── image-upload/   # Image handling
│   ├── import/         # File import
│   └── mobile/         # Mobile optimizations
├── services/           # Application services
│   ├── export/         # Export (PDF, HTML, MD, DOCX)
│   ├── pwa/            # PWA service worker
│   └── shortcuts/      # Keyboard shortcuts
├── ui/                 # UI components
│   ├── toast/          # Notifications
│   ├── modal/          # Modal dialogs
│   ├── theme/          # Theme management
│   └── autosave/       # Autosave indicator
└── utils/              # Utility functions
    ├── eventBus.js     # Event system
    ├── debounce.js     # Debounce utility
    ├── dom.js          # DOM helpers
    ├── clipboard.js    # Clipboard helpers
    ├── file.js         # File utilities
    └── scroll-sync.js  # Scroll synchronization
```

## Code Style

- **Language**: Vanilla JavaScript (ES6+)
- **Modules**: ES modules with named imports
- **Pattern**: Singleton services, event-driven communication
- **DOM**: `document.querySelector` for DOM access
- **Formatting**: Semicolons required, consistent indentation

## Deployment

Optimized for **Vercel** deployment:
- `vercel.json` — Deployment configuration
- Framework: Vite
- Build: `npm run build`
- Output: `dist/`
