# Markdown Live Preview - AI Coding Agent Instructions

## Project Overview

Single-page web application for live Markdown editing and preview using Monaco Editor, marked.js parser, and DOMPurify sanitization. Deployed to Firebase Hosting via Vite bundler.

## Architecture

### Core Components

- **[src/main.js](../src/main.js)**: Single-file application with modular functions
  - Monaco Editor initialization (lines 88-111)
  - Markdown conversion pipeline: `marked.parse()` → `DOMPurify.sanitize()` (lines 135-141)
  - State persistence via `storehouse-js` localStorage wrapper (lines 241-257)
  - Split-pane divider with proportional resizing (lines 259-339)

### Key Dependencies

- `monaco-editor`: CDN ESM import (`https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/+esm`)
- `storehouse-js`: Custom fork from GitHub (`github:tanabe/Storehouse-js`)
- `marked` + `DOMPurify`: Markdown parsing and XSS protection pipeline

## Development Workflow

### Commands (prefer Makefile over npm)

```bash
make setup    # npm install
make dev      # Vite dev server (HMR enabled)
make build    # Production build to dist/
make deploy   # Firebase deploy (requires firebase-tools)
```

### Build System

- **Vite**: No configuration file present; uses defaults
- **Output**: `dist/` directory (configured in [firebase.json](../firebase.json))
- **Entry point**: [index.html](../index.html) with module script `<script type="module" src="/src/main.js">`

## Code Patterns

### State Management

```javascript
// LocalStorage wrapper with namespace + expiration
Storehouse.setItem(localStorageNamespace, key, value, expiredAt);
Storehouse.getItem(localStorageNamespace, key);
```

- Namespace: `com.markdownlivepreview`
- Keys: `last_state` (editor content), `scroll_bar_settings` (sync toggle)

### Editor-Preview Sync

- **Scroll sync**: Calculate ratio from Monaco scroll event, apply to preview element
- **Content sync**: Triggered on `onDidChangeModelContent` event
- **Manual reset**: Confirms if content differs from `defaultInput` template

### Monaco Editor Configuration

```javascript
// Minimal config: no minimap, no hover, no suggestions
monaco.editor.create(element, {
  language: "markdown",
  minimap: { enabled: false },
  wordWrap: "on",
  hover: { enabled: false },
  quickSuggestions: false,
});
```

## Project-Specific Conventions

### HTML Structure

- Split-pane layout: `#edit` (editor) | `#split-divider` | `#preview` (rendered output)
- GitHub Markdown CSS applied to output: `class="markdown-body"`

### Styling

- Custom split-pane styles in [public/css/style.css](../public/css/style.css)
- GitHub-flavored Markdown styles from `github-markdown-css` package

### Default Template

- Comprehensive Markdown syntax guide embedded in [src/main.js](../src/main.js) (lines 17-83)
- Loaded on first visit; persisted content takes precedence

## Deployment Notes

- Firebase Hosting serves `dist/` directory
- No server-side logic; pure client-side rendering
- Cache busting via query params: `?v=1.10.1` in [index.html](../index.html)

## Testing

No test framework configured. Manual testing via `make dev`.
