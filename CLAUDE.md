# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

[Markdown Live Preview](https://markdownlivepreview.com/) — a single-page, no-backend web tool that renders Markdown to HTML as you type. Vite builds it; Firebase Hosting serves the static output.

## Commands

```
make setup        # npm install
make dev          # vite dev server
make build        # vite build -> dist/
make preview      # vite preview of the build
make serve-dist   # http-server dist -p 5001 (no cache)
make build-serve  # build + serve-dist
make clean        # rm -rf dist
make deploy       # firebase deploy (hosting -> dist/)
```

There is no test suite and no linter (`npm test` intentionally exits 1). Verify changes by running `make dev` and exercising the UI.

## Architecture

Everything lives in three files: `index.html` (markup + boot script), `src/main.js` (all app logic), `public/css/style.css` (chrome/layout). There is no `vite.config.js` — Vite defaults apply (repo root as root, `index.html` as entry, `public/` copied verbatim into `dist/`).

`src/main.js` is one `init()` closure wired up on `window.load`. Its pieces:

- **Editor**: Monaco, bundled from the `monaco-editor` npm dep via two deep ESM imports — `monaco-editor/esm/vs/editor/edcore.main` (the editor API plus every editor contribution: find widget, context menu, multicursor, bracket matching, clipboard, line/word ops, links) and `monaco-editor/esm/vs/basic-languages/markdown/markdown.contribution` (registers *only* markdown, so the language registry is just `plaintext` + `markdown`). Do not switch to the package root (`'monaco-editor'`) — that drags in the css/html/json/typescript language services, which are dead weight here. Do not switch to bare `editor.api` either — that silently drops every editor contribution (⌘F, context menu, multicursor). Nothing is loaded from a CDN: ES module imports cannot carry an SRI hash, so third-party code with access to the editor buffer must be served from our own origin. Because Monaco is bundled, `make build` now also emits an `assets/index-*.css` (Monaco's stylesheet, auto-injected into `dist/index.html` after `css/style.css`) and a hashed `assets/codicon-*.ttf`. `MonacoEnvironment.getWorker` returns a no-op Proxy, meaning Monaco runs worker-less (no language services); that's why `hover`, `quickSuggestions`, `suggestOnTriggerCharacters`, and `folding` are disabled. Keep it that way unless you intentionally wire up `?worker` imports.
- **Render pipeline**: `editor.onDidChangeModelContent` → `convert()` → `marked.parse` (custom renderer) → `DOMPurify.sanitize` → `#output.innerHTML` → debounced Mermaid pass. Sanitization is not optional — user input reaches `innerHTML`.
- **Mermaid**: the custom `marked` renderer turns ```` ```mermaid ```` fences into `<pre class="mermaid">` with escaped text; `renderMermaidDiagramsNow()` then swaps in SVG. A monotonic `mermaidRenderVersion` counter cancels stale async renders, and the original source is stashed on `dataset.mermaidSource` so re-renders (e.g. theme change) don't read back the already-rendered SVG. Preserve both when touching this path.
- **Persistence**: `storehouse-js` (a GitHub dependency, not npm) under namespace `com.markdownlivepreview` — keys `last_state`, `scroll_bar_settings`, `theme_settings`, all with a year-2099 expiry.
- **PDF export**: `html2pdf.js` loaded from a CDN `<script defer>` in `index.html` (`window.html2pdf`, guarded because it may not have loaded yet). Export forces light mode inside the html2canvas `onclone` document, re-renders Mermaid with the `default` theme first, then restores dark afterwards.
- **Split panes**: hand-rolled mouse drag on `#split-divider` setting pixel widths on `#edit`/`#preview`, with `lastLeftRatio` reapplied on window resize. Double-click resets to 50/50.

### Theme handling (the fiddly part)

The theme is duplicated in three places and must stay in sync:

1. An inline script at the top of `index.html` reads raw `localStorage['com.markdownlivepreview_theme']` before paint, sets `data-theme` on `<html>`, and injects the `#gh-markdown-link` stylesheet — this exists purely to avoid a flash of the wrong theme.
2. `src/main.js` re-reads the setting through Storehouse (falling back to the raw boot key), and writes *both* stores on change.
3. Toggling must update four things: `data-theme`, `monaco.editor.setTheme`, the `#gh-markdown-link` href, and a Mermaid re-render.

Preview styling comes from swapping `public/css/github-markdown-light.css` ↔ `github-markdown-dark_dimmed.css` on that one `<link>`. (`github-markdown-dark.css` ships but is unreferenced.) The `PREVIEW_CSS_*` constants are declared independently in `index.html` and `src/main.js` — change one, change the other.

## Conventions

- Static assets are cache-busted with hand-maintained `?v=X.Y.Z` query strings — `index.html` and the `PREVIEW_CSS_*` constants in `src/main.js` are both at `1.14.0`. Bump them together when changing `style.css` or `src/main.js`; if they drift, `setPreviewCss` sees a differing href on every load and re-downloads the github-markdown stylesheet under a second URL.
- `dist/` is committed to the repo. Run `make build` and commit the regenerated output alongside source changes.
- Third-party CDN `<script>` tags carry SRI `integrity` + `crossorigin`; keep that if you add more.
