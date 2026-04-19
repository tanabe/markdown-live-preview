import Storehouse from 'storehouse-js';
import * as monaco from 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/+esm';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const init = () => {
    let hasEdited = false;
    let scrollBarSync = false;

    const localStorageNamespace = 'com.markdownlivepreview';
    const localStorageScrollBarKey = 'scroll_bar_settings';
    const localStorageThemeKey = 'theme_settings';
    const INDEX_KEY = 'docs_index';
    const confirmationMessage = 'Are you sure you want to reset? Your changes will be lost.';
    
    // default template
    const defaultInput = `# Markdown syntax guide

## Headers

# This is a Heading h1
## This is a Heading h2
###### This is a Heading h6

## Emphasis

*This text will be italic* _This will also be italic_

**This text will be bold** __This will also be bold__

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

![This is an alt text.](/image/Markdown-mark.svg "This is a sample image.")

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

    // ----- History State Management -----
    let currentDocId = null;

    let getIndex = () => {
        return Storehouse.getItem(localStorageNamespace, INDEX_KEY) || [];
    };

    let saveIndex = (index) => {
        Storehouse.setItem(localStorageNamespace, INDEX_KEY, index, new Date(2099, 1, 1));
    };

    let generateId = () => Math.random().toString(36).substring(2, 10);

    let getTitle = (content) => {
        let lines = content.split('\n');
        let titleLine = lines.find(l => l.trim().length > 0) || 'Untitled';
        return titleLine.replace(/^#+\s*/, '').substring(0, 30);
    };

    let saveCurrentDoc = (content) => {
        if (!currentDocId) return;
        
        Storehouse.setItem(localStorageNamespace, `doc_${currentDocId}`, content, new Date(2099, 1, 1));
        
        let index = getIndex();
        let docMeta = index.find(d => d.id === currentDocId);
        
        if (!docMeta) {
            docMeta = { id: currentDocId, createdAt: Date.now() };
            index.push(docMeta);
        }
        
        docMeta.title = getTitle(content);
        docMeta.updatedAt = Date.now();
        
        index.sort((a, b) => b.updatedAt - a.updatedAt);
        saveIndex(index);
        renderSidebar();
    };

    let loadDoc = (id) => {
        currentDocId = id;
        window.location.hash = id;
        let content = Storehouse.getItem(localStorageNamespace, `doc_${id}`) || defaultInput;
        presetValue(content);
        renderSidebar();
    };

    let createNewDoc = () => {
        let id = generateId();
        currentDocId = id;
        window.location.hash = id;
        presetValue(defaultInput);
        // Force an initial save so it shows up in the sidebar immediately
        saveCurrentDoc(defaultInput); 
    };

    let deleteDoc = (id, event) => {
        event.stopPropagation();
        if(!confirm("Delete this document?")) return;
        
        Storehouse.deleteItem(localStorageNamespace, `doc_${id}`);
        let index = getIndex().filter(d => d.id !== id);
        saveIndex(index);
        
        if (currentDocId === id) {
            if (index.length > 0) loadDoc(index[0].id);
            else createNewDoc();
        } else {
            renderSidebar();
        }
    };

    let renderSidebar = () => {
        let index = getIndex();
        let list = document.getElementById('doc-list');
        list.innerHTML = '';
        
        index.forEach(doc => {
            let li = document.createElement('li');
            if (doc.id === currentDocId) li.className = 'active';
            
            let title = document.createElement('div');
            title.className = 'doc-title';
            title.innerText = doc.title || 'Untitled';
            
            let delBtn = document.createElement('span');
            delBtn.className = 'delete-btn';
            delBtn.innerHTML = '&#10005;'; 
            delBtn.onclick = (e) => deleteDoc(doc.id, e);
            title.appendChild(delBtn);

            let date = document.createElement('div');
            date.className = 'doc-date';
            date.innerText = new Date(doc.updatedAt).toLocaleString();

            li.appendChild(title);
            li.appendChild(date);
            li.onclick = () => loadDoc(doc.id);
            list.appendChild(li);
        });
    };

    let setupSidebar = () => {
        document.getElementById('toggle-sidebar').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('sidebar').classList.toggle('collapsed');
        });
        document.getElementById('btn-new-doc').addEventListener('click', createNewDoc);
    };

    // ----- Editor Setup -----
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
            saveCurrentDoc(value);
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

    // ----- preview CSS loader (switch github-markdown css) -----
    const PREVIEW_CSS_LIGHT = 'css/github-markdown-light.css?v=1.11.0';
    const PREVIEW_CSS_DARK = 'css/github-markdown-dark_dimmed.css?v=1.11.0';

    let setPreviewCss = (useDark) => {
        const link = document.getElementById('gh-markdown-link');
        if (!link) {
            const newLink = document.createElement('link');
            newLink.id = 'gh-markdown-link';
            newLink.rel = 'stylesheet';
            newLink.href = useDark ? PREVIEW_CSS_DARK : PREVIEW_CSS_LIGHT;
            document.head.appendChild(newLink);
            return;
        }

        const desired = useDark ? PREVIEW_CSS_DARK : PREVIEW_CSS_LIGHT;
        if (link.getAttribute('href') !== desired) {
            link.setAttribute('href', desired);
        }
    };

    // ----- theme toggle (dark/light) -----
    let setTheme = (enabled) => {
        document.documentElement.setAttribute('data-theme', enabled ? 'dark' : 'light');
    };

    let initThemeToggle = (settings) => {
        let checkbox = document.querySelector('#theme-checkbox');
        if (!checkbox) return;
        checkbox.checked = settings;
        setTheme(settings);

        if (monaco && monaco.editor && typeof monaco.editor.setTheme === 'function') {
            monaco.editor.setTheme(settings ? 'vs-dark' : 'vs');
        }
        setPreviewCss(settings);

        checkbox.addEventListener('change', (event) => {
            let checked = event.currentTarget.checked;
            setTheme(checked);
            saveThemeSettings(checked);
            setPreviewCss(checked);
            if (monaco && monaco.editor && typeof monaco.editor.setTheme === 'function') {
                monaco.editor.setTheme(checked ? 'vs-dark' : 'vs');
            }
        });
    };

    // ----- clipboard utils -----
    let copyToClipboard = (text, successHandler, errorHandler) => {
        navigator.clipboard.writeText(text).then(
            () => { successHandler(); },
            () => { errorHandler(); }
        );
    };

    let notifyCopied = () => {
        let labelElement = document.querySelector("#copy-button a");
        labelElement.innerHTML = "Copied!";
        setTimeout(() => {
            labelElement.innerHTML = "Copy";
        }, 1000)
    };

    // ----- export preview -----
    let exportLightCssPromise = null;

    let getLightMarkdownCss = () => {
        if (exportLightCssPromise) {
            return exportLightCssPromise;
        }

        exportLightCssPromise = fetch(PREVIEW_CSS_LIGHT)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to load export CSS: ${response.status}`);
                }
                return response.text();
            })
            .catch((error) => {
                console.error('Failed to load light markdown CSS', error);
                return '';
            });

        return exportLightCssPromise;
    };

    let exportPreviewToPdf = () => {
        const previewElement = document.querySelector('#preview-wrapper');
        if (!previewElement) return;

        if (typeof window.html2pdf !== 'function') {
            window.alert('PDF export is not available yet. Please try again in a moment.');
            return;
        }

        getLightMarkdownCss().then((lightCss) => {
            const options = {
                margin: 10,
                filename: 'markdown-preview.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    onclone: (clonedDoc) => {
                        clonedDoc.documentElement.setAttribute('data-theme', 'light');

                        const markdownLink = clonedDoc.getElementById('gh-markdown-link');
                        if (markdownLink) {
                            markdownLink.setAttribute('href', PREVIEW_CSS_LIGHT);
                        }

                        if (lightCss) {
                            const style = clonedDoc.createElement('style');
                            style.id = 'export-light-css';
                            style.textContent = `${lightCss}\n#preview-wrapper, #output, body { background: #fff !important; color: #24292f !important; }`;
                            clonedDoc.head.appendChild(style);
                        }

                        const clonedPreview = clonedDoc.getElementById('preview-wrapper');
                        if (clonedPreview) {
                            clonedPreview.style.background = '#fff';
                            clonedPreview.style.color = '#24292f';
                            clonedPreview.style.width = '190mm';
                            clonedPreview.style.maxWidth = '190mm';
                        }

                        const clonedOutput = clonedDoc.getElementById('output');
                        if (clonedOutput) {
                            clonedOutput.style.background = '#fff';
                            clonedOutput.style.color = '#24292f';
                            clonedOutput.style.width = '190mm';
                            clonedOutput.style.maxWidth = '190mm';
                        }
                    }
                },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            window.html2pdf()
                .set(options)
                .from(previewElement)
                .save()
                .catch((error) => {
                    console.error('Failed to export PDF', error);
                });
        });
    };

    // ----- setup actions -----
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
            copyToClipboard(value, () => { notifyCopied(); }, () => {});
        });
    };

    let setupExportButton = () => {
        const exportButton = document.querySelector('#export-button');
        if (!exportButton) return;
        exportButton.addEventListener('click', (event) => {
            event.preventDefault();
            exportPreviewToPdf();
        });
    };

    // ----- App Preferences Loading -----
    let loadScrollBarSettings = () => {
        return Storehouse.getItem(localStorageNamespace, localStorageScrollBarKey);
    };

    let loadThemeSettings = () => {
        let last = Storehouse.getItem(localStorageNamespace, localStorageThemeKey);
        if (last === null || last === undefined) {
            try {
                const raw = localStorage.getItem('com.markdownlivepreview_theme');
                if (raw === 'dark') return true;
                if (raw === 'light') return false;
            } catch (e) {}
        }
        return last;
    };

    let saveScrollBarSettings = (settings) => {
        let expiredAt = new Date(2099, 1, 1);
        Storehouse.setItem(localStorageNamespace, localStorageScrollBarKey, settings, expiredAt);
    };

    let saveThemeSettings = (settings) => {
        let expiredAt = new Date(2099, 1, 1);
        Storehouse.setItem(localStorageNamespace, localStorageThemeKey, settings, expiredAt);
        try {
            localStorage.setItem('com.markdownlivepreview_theme', settings ? 'dark' : 'light');
        } catch (e) {}
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
            if (!isDragging) divider.classList.remove('hover');
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

    // ----- Entry Point -----
    let editor = setupEditor();
    
    // Boot sequence: check URL hash -> check history index -> fallback to new
    let initialId = window.location.hash.substring(1);
    let index = getIndex();
    
    if (initialId) {
        currentDocId = initialId;
        let content = Storehouse.getItem(localStorageNamespace, `doc_${initialId}`);
        presetValue(content || defaultInput);
    } else if (index.length > 0) {
        loadDoc(index[0].id);
    } else {
        createNewDoc();
    }
    
    setupSidebar();
    renderSidebar();

    setupResetButton();
    setupCopyButton(editor);
    setupExportButton();

    let scrollBarSettings = loadScrollBarSettings() || false;
    initScrollBarSync(scrollBarSettings);

    let themeSettings = loadThemeSettings();
    if (themeSettings === 'true' || themeSettings === true) {
        themeSettings = true;
    } else {
        themeSettings = false;
    }
    initThemeToggle(themeSettings);

    setupDivider();

    // Seamless navigation between tabs/documents
    window.addEventListener('hashchange', () => {
        let newId = window.location.hash.substring(1);
        if (newId && newId !== currentDocId) {
            loadDoc(newId);
        }
    });
};

window.addEventListener("load", () => {
    init();
});