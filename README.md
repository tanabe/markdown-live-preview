# Markdown Live Preview

[Markdown Live Preview](https://markdownlivepreview.com/) is a feature-rich web tool to preview and edit Markdown formatted text in real-time.

## ✨ Features

### Core Functionality
- **Live Preview**: Real-time markdown rendering as you type
- **Split View**: Side-by-side editor and preview with resizable divider
- **Sync Scroll**: Synchronized scrolling between editor and preview

### Export & Import
- **📄 Download as Markdown**: Save your work as .md file
- **📑 Export to PDF**: Convert preview to PDF with preserved formatting
- **📂 Import Files**: Load .md, .markdown, or .txt files
- **📋 Copy to Clipboard**: Quick copy of markdown content

### Editor Features
- **Monaco Editor**: Powerful code editor with syntax highlighting
- **Word/Character Count**: Real-time statistics display
- **Auto-save**: Content automatically saved to local storage
- **Dark Mode**: Toggle between light and dark themes

### Keyboard Shortcuts
- `Ctrl/Cmd + S` - Download as Markdown
- `Ctrl/Cmd + P` - Export to PDF
- `Ctrl/Cmd + O` - Import file
- `Ctrl/Cmd + H` - Show/Hide help
- `Ctrl/Cmd + D` - Toggle dark mode
- `Ctrl/Cmd + K` - Reset content

### User Interface
- **Help Modal**: Built-in markdown syntax reference
- **Responsive Design**: Works on desktop and mobile devices
- **Print-Friendly**: Optimized for printing

## 🚀 Setup

```bash
$ make setup
```

Or using npm:

```bash
$ npm install
```

## 🔨 Build

```bash
$ make build
```

Or using npm:

```bash
$ npm run build
```

## 💻 Local Development

```bash
$ make dev
```

Or using npm:

```bash
$ npm run dev
```

This will start a local development server at `http://localhost:5173/`

## 📦 Dependencies

- **marked** - Markdown parser
- **monaco-editor** - Code editor
- **dompurify** - HTML sanitizer
- **html2pdf.js** - PDF export functionality
- **github-markdown-css** - GitHub-style markdown rendering
- **storehouse-js** - Local storage management

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
See the [LICENSE](https://github.com/tanabe/markdown-live-preview/blob/master/LICENSE) file in this repo.

## 🙏 Acknowledgments

Built with ❤️ using open source tools and libraries.
