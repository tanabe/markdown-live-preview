<div align="center">

# ✨ Markdown Live Preview

**A powerful, feature-rich markdown editor with real-time preview**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FNir-Bhay%2Fmarkdown-live-preview)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Monaco Editor](https://img.shields.io/badge/Monaco%20Editor-0.52-007ACC?logo=visual-studio-code&logoColor=white)](https://microsoft.github.io/monaco-editor/)

[Live Demo](https://markdownlivepreview.com) • [Report Bug](https://github.com/Nir-Bhay/markdown-live-preview/issues) • [Request Feature](https://github.com/Nir-Bhay/markdown-live-preview/issues)

![Markdown Live Preview Screenshot](https://via.placeholder.com/800x450/1e293b/ffffff?text=Markdown+Live+Preview)

</div>

---

## 🚀 Features

### ✍️ Editor
- **Monaco Editor** — VS Code's powerful editor with IntelliSense
- **Syntax Highlighting** — Full markdown syntax support
- **Multiple Themes** — VS Light/Dark, Dracula, GitHub, Solarized
- **Customizable** — Font size, font family, line numbers, word wrap

### 👁️ Preview
- **Live Preview** — Real-time rendering as you type
- **Split View** — Side-by-side editor and preview with resizable divider
- **Scroll Sync** — Synchronized scrolling between editor and preview
- **Dark/Light Mode** — Automatic theme switching

### 📝 Markdown Support
- **GitHub Flavored Markdown** — Tables, task lists, strikethrough
- **KaTeX Math** — LaTeX math equations ($inline$ and $$block$$)
- **Mermaid Diagrams** — Flowcharts, sequence diagrams, Gantt charts
- **Syntax Highlighting** — Code blocks with Prism.js
- **Footnotes** — Reference-style footnotes
- **Alerts** — GitHub-style alert blocks

### 📤 Export Options
- **📄 Markdown** — Download as .md file
- **📑 PDF** — Export with preserved formatting
- **🌐 HTML** — Clean HTML with embedded styles
- **📋 Copy** — Quick copy to clipboard

### 🛠️ Advanced Features
- **📑 Multi-Tab Support** — Work on multiple documents
- **📚 Templates** — Pre-built document templates
- **⌨️ Snippets** — Quick text insertions
- **🎯 Focus Mode** — Distraction-free writing
- **⌨️ Typewriter Mode** — Keep cursor centered
- **📊 Statistics** — Word/character/reading time
- **🎯 Writing Goals** — Set and track word count goals
- **📋 Table of Contents** — Auto-generated navigation
- **🔍 Linting** — Markdown best practices checking
- **💾 Auto-Save** — Never lose your work
- **📱 PWA Support** — Install as desktop/mobile app

---

## 🖥️ Demo

Try it live at **[markdownlivepreview.com](https://markdownlivepreview.com)**

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** 9.0 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/Nir-Bhay/markdown-live-preview.git

# Navigate to directory
cd markdown-live-preview

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

The build output will be in the `dist/` folder.

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FNir-Bhay%2Fmarkdown-live-preview)

Or manually:

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com/new)
3. Vercel auto-detects Vite and deploys

**Build Settings:**
| Setting | Value |
|---------|-------|
| Framework | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

### Deploy to GitHub Pages

```bash
# Build the project
npm run build

# Deploy dist folder to gh-pages branch
npx gh-pages -d dist
```

---

## ⌨️ Keyboard Shortcuts

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Save as Markdown | `Ctrl + S` | `⌘ + S` |
| Export to PDF | `Ctrl + P` | `⌘ + P` |
| Import File | `Ctrl + O` | `⌘ + O` |
| Toggle Dark Mode | `Ctrl + D` | `⌘ + D` |
| Bold | `Ctrl + B` | `⌘ + B` |
| Italic | `Ctrl + I` | `⌘ + I` |
| Insert Link | `Ctrl + K` | `⌘ + K` |
| Heading 1 | `Ctrl + 1` | `⌘ + 1` |
| Heading 2 | `Ctrl + 2` | `⌘ + 2` |
| Heading 3 | `Ctrl + 3` | `⌘ + 3` |
| Toggle Focus Mode | `Ctrl + Shift + F` | `⌘ + ⇧ + F` |
| Open Export Modal | `Ctrl + Shift + E` | `⌘ + ⇧ + E` |
| Fullscreen | `F11` | `F11` |
| Show Help | `Ctrl + H` | `⌘ + H` |

---

## 🏗️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [Monaco Editor](https://microsoft.github.io/monaco-editor/) | Code editor |
| [Marked](https://marked.js.org/) | Markdown parser |
| [Mermaid](https://mermaid.js.org/) | Diagrams |
| [KaTeX](https://katex.org/) | Math equations |
| [Prism.js](https://prismjs.com/) | Syntax highlighting |
| [DOMPurify](https://github.com/cure53/DOMPurify) | XSS sanitization |
| [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/) | PDF export |

---

## 📁 Project Structure

```
markdown-live-preview/
├── index.html              # Main HTML entry
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
├── vercel.json             # Vercel deployment config
├── public/
│   ├── css/                # Stylesheets
│   │   ├── premium-ui.css  # Main UI styles
│   │   └── style.css       # Base styles
│   ├── image/              # Static images
│   ├── manifest.json       # PWA manifest
│   └── sw.js               # Service worker
└── src/
    ├── main.js             # Application entry
    ├── config/             # Configuration
    ├── core/               # Core services
    │   ├── editor/         # Monaco editor
    │   ├── markdown/       # Markdown parser
    │   └── storage/        # LocalStorage
    ├── features/           # Feature modules
    │   ├── tabs/           # Multi-tab support
    │   ├── toc/            # Table of contents
    │   ├── goals/          # Writing goals
    │   └── ...
    ├── services/           # Services
    │   ├── export/         # Export (PDF, HTML, MD)
    │   └── shortcuts/      # Keyboard shortcuts
    ├── ui/                 # UI components
    │   ├── toast/          # Notifications
    │   ├── modal/          # Modal dialogs
    │   └── theme/          # Theme management
    └── utils/              # Utilities
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Monaco Editor](https://microsoft.github.io/monaco-editor/) by Microsoft
- [Marked](https://marked.js.org/) for markdown parsing
- [Mermaid](https://mermaid.js.org/) for diagram support
- [KaTeX](https://katex.org/) for math rendering

---

<div align="center">

**Made with ❤️ by [Nir-Bhay](https://github.com/Nir-Bhay)**

⭐ Star this repo if you find it useful!

</div>
