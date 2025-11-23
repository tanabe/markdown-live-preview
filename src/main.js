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
    let currentTheme = 'vs';

    const localStorageNamespace = 'com.markdownlivepreview';
    const localStorageKey = 'last_state';
    const localStorageScrollBarKey = 'scroll_bar_settings';
    const localStorageDarkModeKey = 'dark_mode_settings';
    const localStorageThemeKey = 'theme_settings';
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
        showToast('Editor reset to default content', 'info');
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

    // ----- toast notification system -----
    
    let showToast = (message, type = 'info', duration = 3000) => {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.info}</span>
            <span class="toast-message">${message}</span>
            <button class="toast-close" onclick="this.parentElement.remove()">×</button>
        `;
        
        container.appendChild(toast);
        
        if (duration > 0) {
            setTimeout(() => {
                toast.classList.add('removing');
                setTimeout(() => toast.remove(), 300);
            }, duration);
        }
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
        showToast('Markdown copied to clipboard!', 'success');
    };

    let copyHTMLToClipboard = () => {
        const htmlContent = document.querySelector('#output').innerHTML;
        copyToClipboard(htmlContent, () => {
            showToast('HTML copied to clipboard!', 'success');
        }, () => {
            showToast('Failed to copy HTML', 'error');
        });
    };

    // ----- stats utils -----

    let updateStats = (text) => {
        // Count words (split by whitespace and filter empty strings)
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        const wordCount = text.trim() === '' ? 0 : words.length;
        
        // Count total characters
        const charCount = text.length;
        
        // Calculate reading time (average 200 words per minute)
        const readingTime = Math.ceil(wordCount / 200) || 0;
        
        document.querySelector('#word-count').textContent = `Words: ${wordCount}`;
        document.querySelector('#char-count').textContent = `Chars: ${charCount}`;
        document.querySelector('#reading-time').textContent = `Reading: ${readingTime} min`;
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
        showToast('Markdown file downloaded successfully!', 'success');
    };

    let exportToPDF = () => {
        showToast('Generating PDF...', 'info', 2000);
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
        
        html2pdf().set(options).from(element).save().then(() => {
            showToast('PDF exported successfully!', 'success');
        }).catch(() => {
            showToast('Failed to export PDF', 'error');
        });
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
            showToast(`File "${file.name}" imported successfully!`, 'success');
        };
        reader.onerror = () => {
            showToast('Failed to import file', 'error');
        };
        reader.readAsText(file);
        
        // Reset file input
        event.target.value = '';
    };

    // ----- image upload -----

    let setupImageUpload = () => {
        const imageInput = document.querySelector('#image-input');
        const editorElement = document.querySelector('#editor');
        
        // Handle image button click
        document.getElementById('toolbar-image').addEventListener('click', (e) => {
            e.preventDefault();
            imageInput.click();
        });
        
        // Handle image file selection
        imageInput.addEventListener('change', handleImageUpload);
        
        // Drag and drop support
        editorElement.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
            editorElement.classList.add('drag-over');
        });
        
        editorElement.addEventListener('dragleave', (e) => {
            e.preventDefault();
            e.stopPropagation();
            editorElement.classList.remove('drag-over');
        });
        
        editorElement.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            editorElement.classList.remove('drag-over');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleImageDrop(files);
            }
        });
    };
    
    let handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        
        if (!file.type.startsWith('image/')) {
            showToast('Please select an image file', 'error');
            return;
        }
        
        processImageFile(file);
        event.target.value = '';
    };
    
    let handleImageDrop = (files) => {
        for (let file of files) {
            if (file.type.startsWith('image/')) {
                processImageFile(file);
            }
        }
    };
    
    let processImageFile = (file) => {
        // Check file size (max 5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            showToast('Image size should be less than 5MB', 'error');
            return;
        }
        
        showToast('Processing image...', 'info', 1500);
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64Image = e.target.result;
            const selection = editor.getSelection();
            const fileName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
            const markdown = `![${fileName}](${base64Image})`;
            
            editor.executeEdits('image-upload', [{
                range: selection,
                text: markdown
            }]);
            
            editor.focus();
            showToast('Image inserted successfully!', 'success');
        };
        
        reader.onerror = () => {
            showToast('Failed to process image', 'error');
        };
        
        reader.readAsDataURL(file);
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

    // ----- theme switching -----

    let initThemeSelector = (savedTheme) => {
        const themeDropdown = document.querySelector('#theme-dropdown');
        currentTheme = savedTheme || 'vs';
        themeDropdown.value = currentTheme;
        applyTheme(currentTheme);

        themeDropdown.addEventListener('change', (event) => {
            const theme = event.target.value;
            currentTheme = theme;
            applyTheme(theme);
            saveThemeSettings(theme);
            showToast(`Theme changed to ${getThemeName(theme)}`, 'success', 2000);
        });
    };

    let applyTheme = (theme) => {
        monaco.editor.setTheme(theme);
        
        // Apply corresponding body class for preview styling
        document.body.classList.remove('dark-mode', 'light-mode', 'hc-mode');
        
        if (theme === 'vs-dark') {
            document.body.classList.add('dark-mode');
        } else if (theme === 'hc-black') {
            document.body.classList.add('dark-mode', 'hc-mode');
        } else {
            document.body.classList.add('light-mode');
        }
    };

    let getThemeName = (theme) => {
        const themeNames = {
            'vs': 'Light',
            'vs-dark': 'Dark',
            'hc-black': 'High Contrast'
        };
        return themeNames[theme] || theme;
    };

    let loadThemeSettings = () => {
        return Storehouse.getItem(localStorageNamespace, localStorageThemeKey);
    };

    let saveThemeSettings = (theme) => {
        const expiredAt = new Date(2099, 1, 1);
        Storehouse.setItem(localStorageNamespace, localStorageThemeKey, theme, expiredAt);
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

    let setupCopyHTMLButton = () => {
        document.querySelector("#copy-html-button").addEventListener('click', (event) => {
            event.preventDefault();
            copyHTMLToClipboard();
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
            // Ctrl/Cmd + D: Cycle through themes
            else if (ctrlKey && event.key === 'd') {
                event.preventDefault();
                const themeDropdown = document.querySelector('#theme-dropdown');
                const themes = ['vs', 'vs-dark', 'hc-black'];
                const currentIndex = themes.indexOf(currentTheme);
                const nextIndex = (currentIndex + 1) % themes.length;
                const nextTheme = themes[nextIndex];
                themeDropdown.value = nextTheme;
                currentTheme = nextTheme;
                applyTheme(nextTheme);
                saveThemeSettings(nextTheme);
                showToast(`Theme: ${getThemeName(nextTheme)}`, 'info', 1500);
            }
            // Ctrl/Cmd + K: Reset
            else if (ctrlKey && event.key === 'k') {
                event.preventDefault();
                reset();
            }
            // Ctrl/Cmd + B: Bold
            else if (ctrlKey && event.key === 'b') {
                event.preventDefault();
                insertMarkdown('bold');
            }
            // Ctrl/Cmd + I: Italic
            else if (ctrlKey && event.key === 'i') {
                event.preventDefault();
                insertMarkdown('italic');
            }
        });
    };

    // ----- toolbar actions -----
    
    let insertMarkdown = (type) => {
        const selection = editor.getSelection();
        const selectedText = editor.getModel().getValueInRange(selection);
        let replacement = '';
        let cursorOffset = 0;

        switch(type) {
            case 'bold':
                replacement = selectedText ? `**${selectedText}**` : '**bold text**';
                cursorOffset = selectedText ? 2 : 2;
                break;
            case 'italic':
                replacement = selectedText ? `*${selectedText}*` : '*italic text*';
                cursorOffset = selectedText ? 1 : 1;
                break;
            case 'strikethrough':
                replacement = selectedText ? `~~${selectedText}~~` : '~~strikethrough text~~';
                cursorOffset = selectedText ? 2 : 2;
                break;
            case 'h1':
                replacement = selectedText ? `# ${selectedText}` : '# Heading 1';
                cursorOffset = 2;
                break;
            case 'h2':
                replacement = selectedText ? `## ${selectedText}` : '## Heading 2';
                cursorOffset = 3;
                break;
            case 'h3':
                replacement = selectedText ? `### ${selectedText}` : '### Heading 3';
                cursorOffset = 4;
                break;
            case 'link':
                replacement = selectedText ? `[${selectedText}](url)` : '[link text](url)';
                cursorOffset = selectedText ? selectedText.length + 3 : 12;
                break;
            case 'image':
                replacement = selectedText ? `![${selectedText}](image-url)` : '![alt text](image-url)';
                cursorOffset = selectedText ? selectedText.length + 4 : 13;
                break;
            case 'code':
                replacement = selectedText ? `\`\`\`\n${selectedText}\n\`\`\`` : '```\ncode block\n```';
                cursorOffset = 4;
                break;
            case 'inline-code':
                replacement = selectedText ? `\`${selectedText}\`` : '`code`';
                cursorOffset = selectedText ? 1 : 1;
                break;
            case 'ul':
                replacement = selectedText ? `- ${selectedText}` : '- List item';
                cursorOffset = 2;
                break;
            case 'ol':
                replacement = selectedText ? `1. ${selectedText}` : '1. List item';
                cursorOffset = 3;
                break;
            case 'task':
                replacement = selectedText ? `- [ ] ${selectedText}` : '- [ ] Task item';
                cursorOffset = 6;
                break;
            case 'quote':
                replacement = selectedText ? `> ${selectedText}` : '> Blockquote';
                cursorOffset = 2;
                break;
            case 'table':
                replacement = '| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Cell 1   | Cell 2   | Cell 3   |';
                cursorOffset = 2;
                break;
            case 'emoji':
                replacement = '😊';
                cursorOffset = 0;
                break;
        }

        editor.executeEdits('toolbar', [{
            range: selection,
            text: replacement
        }]);

        // Set cursor position
        if (!selectedText) {
            const position = selection.getStartPosition();
            editor.setPosition({
                lineNumber: position.lineNumber,
                column: position.column + cursorOffset
            });
        }
        
        editor.focus();
    };

    let setupToolbar = () => {
        document.getElementById('toolbar-bold').addEventListener('click', () => insertMarkdown('bold'));
        document.getElementById('toolbar-italic').addEventListener('click', () => insertMarkdown('italic'));
        document.getElementById('toolbar-strikethrough').addEventListener('click', () => insertMarkdown('strikethrough'));
        document.getElementById('toolbar-h1').addEventListener('click', () => insertMarkdown('h1'));
        document.getElementById('toolbar-h2').addEventListener('click', () => insertMarkdown('h2'));
        document.getElementById('toolbar-h3').addEventListener('click', () => insertMarkdown('h3'));
        document.getElementById('toolbar-link').addEventListener('click', () => insertMarkdown('link'));
        // toolbar-image is handled in setupImageUpload for file upload functionality
        document.getElementById('toolbar-code').addEventListener('click', () => insertMarkdown('code'));
        document.getElementById('toolbar-inline-code').addEventListener('click', () => insertMarkdown('inline-code'));
        document.getElementById('toolbar-ul').addEventListener('click', () => insertMarkdown('ul'));
        document.getElementById('toolbar-ol').addEventListener('click', () => insertMarkdown('ol'));
        document.getElementById('toolbar-task').addEventListener('click', () => insertMarkdown('task'));
        document.getElementById('toolbar-quote').addEventListener('click', () => insertMarkdown('quote'));
        document.getElementById('toolbar-table').addEventListener('click', () => insertMarkdown('table'));
        document.getElementById('toolbar-emoji').addEventListener('click', () => insertMarkdown('emoji'));
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
    setupToolbar();
    setupResetButton();
    setupCopyButton(editor);
    setupCopyHTMLButton();
    setupDownloadButton();
    setupExportPDFButton();
    setupImportButton();
    setupImageUpload();
    setupHelpButton();
    setupFullscreenButton();
    setupKeyboardShortcuts();

    let scrollBarSettings = loadScrollBarSettings() || false;
    initScrollBarSync(scrollBarSettings);

    let themeSettings = loadThemeSettings() || 'vs';
    initThemeSelector(themeSettings);

    let darkModeSettings = loadDarkModeSettings() || false;
    initDarkMode(darkModeSettings);

    setupDivider();
    
    // Initialize stats with current content
    updateStats(editor.getValue());
};

// ----- PWA Support -----

let deferredPrompt;

// Capture the install prompt event
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // Show install button/prompt if needed
    console.log('PWA install prompt available');
});

// Handle app installed
window.addEventListener('appinstalled', () => {
    console.log('PWA installed successfully');
    deferredPrompt = null;
});

// Register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('ServiceWorker registered:', registration.scope);
                
                // Check for updates periodically
                setInterval(() => {
                    registration.update();
                }, 60000); // Check every minute
            })
            .catch((error) => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}

window.addEventListener("load", () => {
    init();
});
