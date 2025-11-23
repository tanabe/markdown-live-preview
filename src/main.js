import Storehouse from 'storehouse-js';
import * as monaco from 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/+esm';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import 'github-markdown-css/github-markdown-light.css';
import html2pdf from 'html2pdf.js';

const init = () => {
    let hasEdited = false;
    let scrollBarSync = false;
    let darkMode = false;

    const localStorageNamespace = 'com.markdownlivepreview';
    const localStorageKey = 'last_state';
    const localStorageScrollBarKey = 'scroll_bar_settings';
    const localStorageDarkModeKey = 'dark_mode_settings';
    const confirmationMessage = 'Are you sure you want to reset? Your changes will be lost.';
    // default template
    const defaultInput = `# Markdown syntax guide

## Headers

# This is a Heading h1
## This is a Heading h2
###### This is a Heading h6

## Emphasis

*This text will be italic*  
_This will also be italic_

**This text will be bold**  
__This will also be bold__

_You **can** combine them_

## Lists

### Unordered

* Item 1
* Item 2
* Item 2a
* Item 2b
    * Item 3a
    * Item 3b

### Ordered

1. Item 1
2. Item 2
3. Item 3
    1. Item 3a
    2. Item 3b

## Images

![This is an alt text.](/image/sample.webp "This is a sample image.")

## Links

You may be using [Markdown Live Preview](https://markdownlivepreview.com/).

## Blockquotes

> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.
>
>> Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.

## Tables

| Left columns  | Right columns |
| ------------- |:-------------:|
| left foo      | right foo     |
| left bar      | right bar     |
| left baz      | right baz     |

## Blocks of code

${"`"}${"`"}${"`"}
let message = 'Hello world';
alert(message);
${"`"}${"`"}${"`"}

## Inline code

This web site is using ${"`"}markedjs/marked${"`"}.
`;

    self.MonacoEnvironment = {
        getWorker(_, label) {
            return new Proxy({}, { get: () => () => { } });
        }
    }

    let setupEditor = () => {
        let editor = monaco.editor.create(document.querySelector('#editor'), {
            fontSize: 14,
            language: 'markdown',
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            scrollbar: {
                vertical: 'visible',
                horizontal: 'visible'
            },
            wordWrap: 'on',
            hover: { enabled: false },
            quickSuggestions: false,
            suggestOnTriggerCharacters: false,
            folding: false
        });

        editor.onDidChangeModelContent(() => {
            let changed = editor.getValue() != defaultInput;
            if (changed) {
                hasEdited = true;
            }
            let value = editor.getValue();
            convert(value);
            saveLastContent(value);
            updateStats(value);
        });

        editor.onDidScrollChange((e) => {
            if (!scrollBarSync) {
                return;
            }

            const scrollTop = e.scrollTop;
            const scrollHeight = e.scrollHeight;
            const height = editor.getLayoutInfo().height;

            const maxScrollTop = scrollHeight - height;
            const scrollRatio = scrollTop / maxScrollTop;

            let previewElement = document.querySelector('#preview');
            let targetY = (previewElement.scrollHeight - previewElement.clientHeight) * scrollRatio;
            previewElement.scrollTo(0, targetY);
        });

        return editor;
    };

    // Render markdown text as html
    let convert = (markdown) => {
        let options = {
            headerIds: false,
            mangle: false
        };
        let html = marked.parse(markdown, options);
        let sanitized = DOMPurify.sanitize(html);
        document.querySelector('#output').innerHTML = sanitized;
    };

    // Reset input text
    let reset = () => {
        let changed = editor.getValue() != defaultInput;
        if (hasEdited || changed) {
            var confirmed = window.confirm(confirmationMessage);
            if (!confirmed) {
                return;
            }
        }
        presetValue(defaultInput);
        document.querySelectorAll('.column').forEach((element) => {
            element.scrollTo({ top: 0 });
        });
    };

    let presetValue = (value) => {
        editor.setValue(value);
        editor.revealPosition({ lineNumber: 1, column: 1 });
        editor.focus();
        hasEdited = false;
    };

    // ----- sync scroll position -----

    let initScrollBarSync = (settings) => {
        let checkbox = document.querySelector('#sync-scroll-checkbox');
        checkbox.checked = settings;
        scrollBarSync = settings;

        checkbox.addEventListener('change', (event) => {
            let checked = event.currentTarget.checked;
            scrollBarSync = checked;
            saveScrollBarSettings(checked);
        });
    };

    let enableScrollBarSync = () => {
        scrollBarSync = true;
    };

    let disableScrollBarSync = () => {
        scrollBarSync = false;
    };

    // ----- clipboard utils -----

    let copyToClipboard = (text, successHandler, errorHandler) => {
        navigator.clipboard.writeText(text).then(
            () => {
                successHandler();
            },

            () => {
                errorHandler();
            }
        );
    };

    let notifyCopied = () => {
        let labelElement = document.querySelector("#copy-button a");
        labelElement.innerHTML = "Copied!";
        setTimeout(() => {
            labelElement.innerHTML = "Copy";
        }, 1000)
    };

    // ----- stats utils -----

    let updateStats = (text) => {
        // Count words (split by whitespace and filter empty strings)
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        const wordCount = text.trim() === '' ? 0 : words.length;
        
        // Count total characters
        const charCount = text.length;
        
        document.querySelector('#word-count').textContent = `Words: ${wordCount}`;
        document.querySelector('#char-count').textContent = `Chars: ${charCount}`;
    };

    // ----- download utils -----

    let downloadMarkdown = () => {
        let content = editor.getValue();
        let blob = new Blob([content], { type: 'text/markdown' });
        let url = URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = 'document.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    let exportToPDF = () => {
        const element = document.querySelector('#output');
        const options = {
            margin: 1,
            filename: 'document.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                logging: false
            },
            jsPDF: { 
                unit: 'in', 
                format: 'letter', 
                orientation: 'portrait' 
            }
        };
        
        html2pdf().set(options).from(element).save();
    };

    // ----- import utils -----

    let importFile = () => {
        let fileInput = document.querySelector('#file-input');
        fileInput.click();
    };

    let handleFileImport = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            editor.setValue(content);
            editor.revealPosition({ lineNumber: 1, column: 1 });
            editor.focus();
            hasEdited = true;
        };
        reader.readAsText(file);
        
        // Reset file input
        event.target.value = '';
    };

    // ----- dark mode -----

    let initDarkMode = (settings) => {
        let checkbox = document.querySelector('#dark-mode-checkbox');
        checkbox.checked = settings;
        darkMode = settings;
        applyDarkMode(settings);

        checkbox.addEventListener('change', (event) => {
            let checked = event.currentTarget.checked;
            darkMode = checked;
            applyDarkMode(checked);
            saveDarkModeSettings(checked);
        });
    };

    let applyDarkMode = (enabled) => {
        if (enabled) {
            document.body.classList.add('dark-mode');
            monaco.editor.setTheme('vs-dark');
        } else {
            document.body.classList.remove('dark-mode');
            monaco.editor.setTheme('vs');
        }
    };

    // ----- setup -----

    // setup navigation actions
    let setupResetButton = () => {
        document.querySelector("#reset-button").addEventListener('click', (event) => {
            event.preventDefault();
            reset();
        });
    };

    let setupCopyButton = (editor) => {
        document.querySelector("#copy-button").addEventListener('click', (event) => {
            event.preventDefault();
            let value = editor.getValue();
            copyToClipboard(value, () => {
                notifyCopied();
            },
                () => {
                    // nothing to do
                });
        });
    };

    let setupDownloadButton = () => {
        document.querySelector("#download-md-button").addEventListener('click', (event) => {
            event.preventDefault();
            downloadMarkdown();
        });
    };

    let setupExportPDFButton = () => {
        document.querySelector("#export-pdf-button").addEventListener('click', (event) => {
            event.preventDefault();
            exportToPDF();
        });
    };

    let setupImportButton = () => {
        document.querySelector("#import-button").addEventListener('click', (event) => {
            event.preventDefault();
            importFile();
        });
        
        document.querySelector("#file-input").addEventListener('change', handleFileImport);
    };

    let setupHelpButton = () => {
        const modal = document.querySelector("#help-modal");
        const helpBtn = document.querySelector("#help-button");
        const closeBtn = document.querySelector(".close-modal");

        helpBtn.addEventListener('click', (event) => {
            event.preventDefault();
            modal.style.display = "block";
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = "none";
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    };

    // ----- fullscreen -----

    let isFullscreen = false;
    
    let toggleFullscreen = () => {
        const fullscreenBtn = document.querySelector("#fullscreen-button");
        
        if (!isFullscreen) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            }
            document.body.classList.add('fullscreen-mode');
            if (fullscreenBtn) {
                fullscreenBtn.querySelector('a').textContent = 'Exit Fullscreen';
            }
            isFullscreen = true;
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            document.body.classList.remove('fullscreen-mode');
            if (fullscreenBtn) {
                fullscreenBtn.querySelector('a').textContent = 'Fullscreen';
            }
            isFullscreen = false;
        }
    };

    let setupFullscreenButton = () => {
        const fullscreenBtn = document.querySelector("#fullscreen-button");

        fullscreenBtn.addEventListener('click', (event) => {
            event.preventDefault();
            toggleFullscreen();
        });

        // Handle fullscreen change from browser (e.g., ESC key)
        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) {
                document.body.classList.remove('fullscreen-mode');
                fullscreenBtn.querySelector('a').textContent = 'Fullscreen';
                isFullscreen = false;
            }
        });

        document.addEventListener('webkitfullscreenchange', () => {
            if (!document.webkitFullscreenElement) {
                document.body.classList.remove('fullscreen-mode');
                fullscreenBtn.querySelector('a').textContent = 'Fullscreen';
                isFullscreen = false;
            }
        });
    };

    let setupKeyboardShortcuts = () => {
        document.addEventListener('keydown', (event) => {
            const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
            const ctrlKey = isMac ? event.metaKey : event.ctrlKey;

            // Ctrl/Cmd + S: Download Markdown
            if (ctrlKey && event.key === 's') {
                event.preventDefault();
                downloadMarkdown();
            }
            // Ctrl/Cmd + P: Export PDF
            else if (ctrlKey && event.key === 'p') {
                event.preventDefault();
                exportToPDF();
            }
            // Ctrl/Cmd + O: Import file
            else if (ctrlKey && event.key === 'o') {
                event.preventDefault();
                importFile();
            }
            // Ctrl/Cmd + H: Show/Hide help
            else if (ctrlKey && event.key === 'h') {
                event.preventDefault();
                const modal = document.querySelector("#help-modal");
                const isVisible = modal.style.display === "block";
                modal.style.display = isVisible ? "none" : "block";
            }
            // Ctrl/Cmd + D: Toggle dark mode
            else if (ctrlKey && event.key === 'd') {
                event.preventDefault();
                const checkbox = document.querySelector('#dark-mode-checkbox');
                checkbox.checked = !checkbox.checked;
                darkMode = checkbox.checked;
                applyDarkMode(checkbox.checked);
                saveDarkModeSettings(checkbox.checked);
            }
            // Ctrl/Cmd + K: Reset
            else if (ctrlKey && event.key === 'k') {
                event.preventDefault();
                reset();
            }
        });
    };

    // ----- local state -----

    let loadLastContent = () => {
        let lastContent = Storehouse.getItem(localStorageNamespace, localStorageKey);
        return lastContent;
    };

    let saveLastContent = (content) => {
        let expiredAt = new Date(2099, 1, 1);
        Storehouse.setItem(localStorageNamespace, localStorageKey, content, expiredAt);
        showAutosaveIndicator();
    };

    let showAutosaveIndicator = () => {
        const indicator = document.querySelector('#autosave-indicator');
        indicator.textContent = '💾 Saving...';
        indicator.classList.add('saving');
        
        setTimeout(() => {
            indicator.textContent = '✓ Saved';
            indicator.classList.remove('saving');
        }, 500);
    };

    let loadScrollBarSettings = () => {
        let lastContent = Storehouse.getItem(localStorageNamespace, localStorageScrollBarKey);
        return lastContent;
    };

    let saveScrollBarSettings = (settings) => {
        let expiredAt = new Date(2099, 1, 1);
        Storehouse.setItem(localStorageNamespace, localStorageScrollBarKey, settings, expiredAt);
    };

    let loadDarkModeSettings = () => {
        let lastSettings = Storehouse.getItem(localStorageNamespace, localStorageDarkModeKey);
        return lastSettings;
    };

    let saveDarkModeSettings = (settings) => {
        let expiredAt = new Date(2099, 1, 1);
        Storehouse.setItem(localStorageNamespace, localStorageDarkModeKey, settings, expiredAt);
    };

    let setupDivider = () => {
        let lastLeftRatio = 0.5;
        const divider = document.getElementById('split-divider');
        const leftPane = document.getElementById('edit');
        const rightPane = document.getElementById('preview');
        const container = document.getElementById('container');

        let isDragging = false;

        divider.addEventListener('mouseenter', () => {
            divider.classList.add('hover');
        });

        divider.addEventListener('mouseleave', () => {
            if (!isDragging) {
                divider.classList.remove('hover');
            }
        });

        divider.addEventListener('mousedown', () => {
            isDragging = true;
            divider.classList.add('active');
            document.body.style.cursor = 'col-resize';
        });

        divider.addEventListener('dblclick', () => {
            const containerRect = container.getBoundingClientRect();
            const totalWidth = containerRect.width;
            const dividerWidth = divider.offsetWidth;
            const halfWidth = (totalWidth - dividerWidth) / 2;

            leftPane.style.width = halfWidth + 'px';
            rightPane.style.width = halfWidth + 'px';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            document.body.style.userSelect = 'none';
            const containerRect = container.getBoundingClientRect();
            const totalWidth = containerRect.width;
            const offsetX = e.clientX - containerRect.left;
            const dividerWidth = divider.offsetWidth;

            // Prevent overlap or out-of-bounds
            const minWidth = 100;
            const maxWidth = totalWidth - minWidth - dividerWidth;
            const leftWidth = Math.max(minWidth, Math.min(offsetX, maxWidth));
            leftPane.style.width = leftWidth + 'px';
            rightPane.style.width = (totalWidth - leftWidth - dividerWidth) + 'px';
            lastLeftRatio = leftWidth / (totalWidth - dividerWidth);
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                divider.classList.remove('active');
                divider.classList.remove('hover');
                document.body.style.cursor = 'default';
                document.body.style.userSelect = '';
            }
        });

        window.addEventListener('resize', () => {
            const containerRect = container.getBoundingClientRect();
            const totalWidth = containerRect.width;
            const dividerWidth = divider.offsetWidth;
            const availableWidth = totalWidth - dividerWidth;

            const newLeft = availableWidth * lastLeftRatio;
            const newRight = availableWidth * (1 - lastLeftRatio);

            leftPane.style.width = newLeft + 'px';
            rightPane.style.width = newRight + 'px';
        });
    };

    // ----- entry point -----
    let lastContent = loadLastContent();
    let editor = setupEditor();
    if (lastContent) {
        presetValue(lastContent);
    } else {
        presetValue(defaultInput);
    }
    
    // Initialize UI components
    setupResetButton();
    setupCopyButton(editor);
    setupDownloadButton();
    setupExportPDFButton();
    setupImportButton();
    setupHelpButton();
    setupFullscreenButton();
    setupKeyboardShortcuts();

    let scrollBarSettings = loadScrollBarSettings() || false;
    initScrollBarSync(scrollBarSettings);

    let darkModeSettings = loadDarkModeSettings() || false;
    initDarkMode(darkModeSettings);

    setupDivider();
    
    // Initialize stats with current content
    updateStats(editor.getValue());
};

window.addEventListener("load", () => {
    init();
});
