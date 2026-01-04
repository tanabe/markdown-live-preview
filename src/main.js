import Storehouse from 'storehouse-js';
import * as monaco from 'monaco-editor';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import 'github-markdown-css/github-markdown-light.css';
import html2pdf from 'html2pdf.js';

// Monaco Editor Worker Setup
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

self.MonacoEnvironment = {
    getWorker(_, label) {
        if (label === 'json') return new jsonWorker();
        if (label === 'css' || label === 'scss' || label === 'less') return new cssWorker();
        if (label === 'html' || label === 'handlebars' || label === 'razor') return new htmlWorker();
        if (label === 'typescript' || label === 'javascript') return new tsWorker();
        return new editorWorker();
    }
};

// Syntax highlighting
import { markedHighlight } from 'marked-highlight';
import Prism from 'prismjs';

// Import common language support
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-docker';
import 'prismjs/themes/prism-tomorrow.css';

// Mermaid for diagrams
import mermaid from 'mermaid';

// KaTeX for math
import katex from 'katex';
import 'katex/dist/katex.min.css';
import markedKatex from 'marked-katex-extension';

// GFM Extensions
import markedAlert from 'marked-alert';
import markedFootnote from 'marked-footnote';
// Note: markdownlint is Node.js only, using custom browser-based linting instead

// Global configuration constants
const APP_CONFIG = {
    MAX_IMAGE_SIZE_MB: 5,
    READING_SPEED_WPM: 200,
    SERVICE_WORKER_UPDATE_INTERVAL_MS: 30 * 60 * 1000 // 30 minutes
};

const init = () => {
    // Define custom themes first (will be called after function is defined below)
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
    const defaultInput = `# Markdown Live Preview

<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&duration=3000&pause=1000&color=6AD3F7&center=true&vCenter=true&multiline=true&repeat=true&width=600&height=100&lines=%F0%9F%9A%80+Building+Next-Gen+Digital+Experiences;%F0%9F%92%BB+React+%7C+Node.js+%7C+React+Native+%7C+Three.js;%F0%9F%8E%AF+397%2B+Commits+%7C+76%2B+Repositories" alt="Typing SVG" /></a>

---

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

You may be using this Markdown Live Preview tool.

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

This web site is using open-source libraries.

## Mermaid Diagram

${"`"}${"`"}${"`"}mermaid
graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
${"`"}${"`"}${"`"}

## Math (LaTeX)

Inline math: $E = mc^2$

Block math:
$$
\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}
$$
`;

    // ----- Tabs System -----
    let documents = [];
    let activeDocId = null;
    const localStorageDocsKey = 'docs';

    let initTabs = () => {
        const savedDocs = Storehouse.getItem(localStorageNamespace, localStorageDocsKey);

        if (savedDocs && savedDocs.length > 0) {
            documents = savedDocs;
            activeDocId = documents[0].id; // Default to first if state lost
            // Try to find last active? For now, first is fine or maybe store activeId
        } else {
            // Migration or init
            const oldContent = loadLastContent() || defaultInput;
            const newDoc = {
                id: Date.now().toString(),
                title: 'Untitled',
                content: oldContent,
                lastModified: Date.now()
            };
            documents = [newDoc];
            activeDocId = newDoc.id;
        }

        renderTabs();
        loadActiveDocument();

        // Setup New Tab button
        const newTabBtn = document.getElementById('new-tab-button');
        if (newTabBtn) newTabBtn.addEventListener('click', () => addNewTab());
    };

    let renderTabs = () => {
        const tabsList = document.getElementById('tabs-list');
        if (!tabsList) return;
        tabsList.innerHTML = '';

        documents.forEach(doc => {
            const tab = document.createElement('div');
            tab.className = `tab-item ${doc.id === activeDocId ? 'active' : ''}`;
            tab.innerHTML = `
                <span class="tab-title">${doc.title}</span>
                <span class="tab-close" title="Close Tab">×</span>
            `;

            tab.addEventListener('click', (e) => {
                if (!e.target.classList.contains('tab-close')) {
                    switchTab(doc.id);
                }
            });

            tab.querySelector('.tab-close').addEventListener('click', (e) => {
                e.stopPropagation();
                closeTab(doc.id);
            });

            tabsList.appendChild(tab);
        });
    };

    let addNewTab = () => {
        // saveCurrentDoc(); // Auto-save happens on change anyway

        const newDoc = {
            id: Date.now().toString(),
            title: 'Untitled',
            content: '',
            lastModified: Date.now()
        };
        documents.push(newDoc);
        switchTab(newDoc.id);
    };

    let switchTab = (id) => {
        if (id === activeDocId) return;

        // Save current before switching? Done by onDidChangeModelContent
        activeDocId = id;
        renderTabs();
        loadActiveDocument();
    };

    let closeTab = (id) => {
        if (documents.length <= 1) {
            showToast('Cannot close the last tab', 'warning');
            return;
        }

        if (confirm('Are you sure you want to close this tab?')) {
            const index = documents.findIndex(d => d.id === id);

            // If closing active tab, switch to another
            if (id === activeDocId) {
                const newIndex = index === 0 ? 1 : index - 1;
                activeDocId = documents[newIndex].id; // Set new active
                // loadActiveDocument happens after render
            }

            documents = documents.filter(d => d.id !== id);
            saveDocsToStorage();

            renderTabs();
            loadActiveDocument();
        }
    };

    let saveCurrentDoc = () => {
        const content = editor.getValue();
        const docIndex = documents.findIndex(d => d.id === activeDocId);

        if (docIndex !== -1) {
            documents[docIndex].content = content;
            documents[docIndex].lastModified = Date.now();

            // Auto update title from first H1
            const firstLine = content.split('\n')[0];
            if (firstLine && firstLine.startsWith('# ')) {
                documents[docIndex].title = firstLine.substring(2).trim().substring(0, 20);
            } else {
                documents[docIndex].title = 'Untitled';
            }

            saveDocsToStorage();
            renderTabs(); // Refresh titles
            showAutosaveIndicator();
        }
    };

    let loadActiveDocument = () => {
        const doc = documents.find(d => d.id === activeDocId);
        if (doc) {
            // Prevent triggering save loop if possible, or accept it
            // editor.setValue triggers onDidChangeModelContent
            // We can set a temporary flag to ignore save? 
            // For simplicity, let it save (no change to content)
            const current = editor.getValue();
            if (current !== doc.content) {
                editor.setValue(doc.content);
                editor.setScrollTop(0);
            }
        }
    };

    let saveDocsToStorage = () => {
        const expiredAt = new Date(2099, 1, 1);
        Storehouse.setItem(localStorageNamespace, localStorageDocsKey, documents, expiredAt);
    };

    let setupEditor = () => {
        let editor = monaco.editor.create(document.querySelector('#editor'), {
            fontSize: 16,
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
            saveCurrentDoc();
            updateStats(value);
        });

        // Scroll sync flag to prevent infinite loops
        let isScrollSyncing = false;

        editor.onDidScrollChange((e) => {
            if (!scrollBarSync || isScrollSyncing) {
                return;
            }

            isScrollSyncing = true;
            const previewElement = document.querySelector('#preview');

            // Get editor scroll metrics
            const scrollTop = editor.getScrollTop();
            const scrollHeight = editor.getScrollHeight();
            const viewportHeight = editor.getLayoutInfo().height;

            // Calculate scroll ratio (0 to 1)
            const maxScrollTop = Math.max(0, scrollHeight - viewportHeight);
            const scrollRatio = maxScrollTop > 0 ? scrollTop / maxScrollTop : 0;

            // Apply ratio to preview
            const previewMaxScroll = Math.max(0, previewElement.scrollHeight - previewElement.clientHeight);
            const targetY = previewMaxScroll * scrollRatio;

            previewElement.scrollTop = targetY;

            // Reset flag after a short delay
            setTimeout(() => { isScrollSyncing = false; }, 50);
        });

        // Add preview-to-editor scroll sync
        const previewElement = document.querySelector('#preview');
        previewElement.addEventListener('scroll', () => {
            if (!scrollBarSync || isScrollSyncing) {
                return;
            }

            isScrollSyncing = true;

            // Get preview scroll metrics
            const scrollTop = previewElement.scrollTop;
            const maxScrollTop = Math.max(0, previewElement.scrollHeight - previewElement.clientHeight);
            const scrollRatio = maxScrollTop > 0 ? scrollTop / maxScrollTop : 0;

            // Apply ratio to editor
            const editorMaxScroll = Math.max(0, editor.getScrollHeight() - editor.getLayoutInfo().height);
            const targetY = editorMaxScroll * scrollRatio;

            editor.setScrollTop(targetY);

            // Reset flag after a short delay
            setTimeout(() => { isScrollSyncing = false; }, 50);
        });

        // Typewriter Mode: Center cursor
        editor.onDidChangeCursorPosition((e) => {
            if (isTypewriterMode) {
                editor.revealLineInCenter(e.position.lineNumber);
            }
        });

        return editor;
    };

    // Configure marked with syntax highlighting
    marked.use(markedHighlight({
        langPrefix: 'language-',
        highlight(code, lang) {
            if (lang && Prism.languages[lang]) {
                try {
                    return Prism.highlight(code, Prism.languages[lang], lang);
                } catch (e) {
                    console.warn('Prism highlighting failed:', e);
                }
            }
            return code;
        }
    }));

    // Configure marked with KaTeX
    marked.use(markedKatex({
        throwOnError: false,
        output: 'html' // or 'mathml'
    }));

    // Configure GFM Extensions
    marked.use(markedAlert());
    marked.use(markedFootnote());

    // Slugify function for heading IDs
    let slugify = (text) => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    // Track headings for TOC
    let tocItems = [];

    // Custom renderer for headings with anchor links
    const renderer = new marked.Renderer();
    renderer.heading = function (text, level) {
        // Handle marked v15+ where text is an object with text property
        const headingText = typeof text === 'object' ? text.text : text;
        const headingLevel = typeof text === 'object' ? text.depth : level;
        const slug = slugify(headingText);

        // Store for TOC
        tocItems.push({ text: headingText, level: headingLevel, slug });

        return `
            <h${headingLevel} id="${slug}" class="heading-anchor">
                ${headingText}
                <a href="#${slug}" class="anchor-link" aria-label="Link to ${headingText}">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"/>
                    </svg>
                </a>
            </h${headingLevel}>
        `;
    };
    marked.use({ renderer });

    // Generate TOC HTML
    let generateTOC = () => {
        if (tocItems.length === 0) return '';

        let tocHtml = '<nav class="toc-nav"><h4 class="toc-title">📑 Table of Contents</h4><ul class="toc-list">';
        tocItems.forEach((item) => {
            const indent = (item.level - 1) * 16;
            tocHtml += `<li class="toc-item toc-level-${item.level}" style="padding-left: ${indent}px;">
                <a href="#${item.slug}" class="toc-link">${item.text}</a>
            </li>`;
        });
        tocHtml += '</ul></nav>';
        return tocHtml;
    };

    // Update TOC panel
    let updateTOC = () => {
        const tocPanel = document.getElementById('toc-panel');
        if (tocPanel) {
            tocPanel.innerHTML = generateTOC();
        }
    };

    // Initialize Mermaid
    mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose'
    });

    // ----- Goals System -----
    const localStorageGoalsKey = 'writing_goals';
    let goalsData = {
        dailyTarget: 500,
        streak: 0,
        lastGoalDate: null,
        history: {}
    };

    let setupGoals = () => {
        const saved = Storehouse.getItem(localStorageNamespace, localStorageGoalsKey);
        if (saved) goalsData = saved;

        const btn = document.getElementById('goals-button');
        const modal = document.getElementById('goals-modal');
        const closeBtn = document.querySelector('.close-goals');
        const input = document.getElementById('daily-goal-input');

        if (input) {
            input.value = goalsData.dailyTarget;
            input.addEventListener('change', (e) => {
                goalsData.dailyTarget = parseInt(e.target.value);
                saveGoals();
                updateGoalProgress(editor.getValue());
            });
        }

        if (btn) {
            btn.addEventListener('click', () => {
                modal.style.display = 'block';
                updateGoalProgress(editor.getValue());
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        // Listen for content changes
        editor.onDidChangeModelContent(() => {
            updateGoalProgress(editor.getValue());
        });
    };

    let updateGoalProgress = (content) => {
        // Simple word count approximation
        const text = content.replace(/[#*`_~\[\]()]/g, '').trim();
        const wordCount = text ? text.split(/\s+/).length : 0;

        const progressBar = document.getElementById('goal-progress-bar');
        const goalText = document.getElementById('goal-text');
        const streakDisplay = document.getElementById('streak-count');

        if (progressBar && goalText) {
            let percentage = Math.min((wordCount / goalsData.dailyTarget) * 100, 100);
            progressBar.style.width = percentage + '%';
            goalText.textContent = `${wordCount} / ${goalsData.dailyTarget} words`;

            if (percentage >= 100) {
                progressBar.style.backgroundColor = 'gold';
                // Trigger check
                const today = new Date().toDateString();
                if (goalsData.lastGoalDate !== today) {
                    checkDailyGoal(wordCount);
                }
            } else {
                progressBar.style.backgroundColor = 'var(--success-color)';
            }
        }

        if (streakDisplay) {
            streakDisplay.textContent = goalsData.streak;
        }
    };

    let checkDailyGoal = (count) => {
        const today = new Date().toDateString();

        if (goalsData.lastGoalDate !== today && count >= goalsData.dailyTarget) {
            goalsData.streak++;
            goalsData.lastGoalDate = today;
            goalsData.history[today] = count;
            saveGoals();
            showToast('🎉 Daily Goal Reached!', 'success');
        }
    };

    let saveGoals = () => {
        const expiredAt = new Date(2099, 1, 1);
        Storehouse.setItem(localStorageNamespace, localStorageGoalsKey, goalsData, expiredAt);
    };

    // ----- Linter System -----
    let linterDebounceTimer;

    let setupLinter = () => {
        const lintBtn = document.getElementById('lint-button');
        const lintPanel = document.getElementById('lint-panel');
        const closeBtn = document.querySelector('.close-lint');

        if (lintBtn) {
            lintBtn.addEventListener('click', () => {
                const isHidden = lintPanel.style.display === 'none';
                lintPanel.style.display = isHidden ? 'flex' : 'none';
                lintBtn.classList.toggle('active', isHidden);
                if (isHidden) runLinter(); // Run when opening
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                lintPanel.style.display = 'none';
                if (lintBtn) lintBtn.classList.remove('active');
            });
        }

        // Run linter on change (debounced)
        editor.onDidChangeModelContent(() => {
            clearTimeout(linterDebounceTimer);
            linterDebounceTimer = setTimeout(() => {
                runLinter();
            }, 1000);
        });
    };

    // Simple browser-based markdown linter
    let runLinter = () => {
        const content = editor.getValue();
        const lines = content.split('\n');
        const issues = [];

        lines.forEach((line, index) => {
            const lineNumber = index + 1;

            // Check for trailing spaces (MD009)
            if (line.match(/\s+$/) && !line.match(/\s{2}$/)) {
                issues.push({
                    lineNumber,
                    ruleNames: ['MD009', 'no-trailing-spaces'],
                    errorDescription: 'Trailing spaces'
                });
            }

            // Check for multiple blank lines (MD012)
            if (index > 0 && line === '' && lines[index - 1] === '') {
                issues.push({
                    lineNumber,
                    ruleNames: ['MD012', 'no-multiple-blanks'],
                    errorDescription: 'Multiple consecutive blank lines'
                });
            }

            // Check for hard tabs (MD010)
            if (line.includes('\t')) {
                issues.push({
                    lineNumber,
                    ruleNames: ['MD010', 'no-hard-tabs'],
                    errorDescription: 'Hard tabs found'
                });
            }

            // Check for missing space after header (MD018)
            if (line.match(/^#+[^#\s]/)) {
                issues.push({
                    lineNumber,
                    ruleNames: ['MD018', 'no-missing-space-atx'],
                    errorDescription: 'No space after hash in header'
                });
            }

            // Check for multiple spaces after header hash (MD019)
            if (line.match(/^#+\s{2,}/)) {
                issues.push({
                    lineNumber,
                    ruleNames: ['MD019', 'no-multiple-space-atx'],
                    errorDescription: 'Multiple spaces after hash in header'
                });
            }

            // Check for missing blank line before header (MD022)
            if (line.match(/^#{1,6}\s/) && index > 0 && lines[index - 1].trim() !== '') {
                issues.push({
                    lineNumber,
                    ruleNames: ['MD022', 'blanks-around-headings'],
                    errorDescription: 'Headers should be surrounded by blank lines'
                });
            }
        });

        updateLintUI(issues);
        updateEditorMarkers(issues);
    };

    let updateLintUI = (issues) => {
        const list = document.getElementById('lint-list');
        const btn = document.getElementById('lint-button');
        if (!list) return;
        list.innerHTML = '';

        if (issues.length === 0) {
            list.innerHTML = '<div style="padding:16px; color:var(--success-color); text-align:center;">✨ No issues found!</div>';
            if (btn) btn.textContent = '✅ Lint';
        } else {
            if (btn) btn.textContent = `⚠️ Lint (${issues.length})`;
            issues.forEach(issue => {
                const item = document.createElement('div');
                item.className = 'lint-item';
                item.innerHTML = `
                    <span class="lint-line">L${issue.lineNumber}</span>
                    <span class="lint-msg">${issue.ruleNames[1] || issue.ruleNames[0]}: ${issue.errorDescription}</span>
                `;
                item.addEventListener('click', () => {
                    editor.revealLineInCenter(issue.lineNumber);
                    editor.setPosition({ lineNumber: issue.lineNumber, column: 1 });
                    editor.focus();
                });
                list.appendChild(item);
            });
        }
    };

    let updateEditorMarkers = (issues) => {
        const markers = issues.map(issue => ({
            severity: monaco.MarkerSeverity.Warning,
            message: issue.errorDescription,
            startLineNumber: issue.lineNumber,
            startColumn: 1,
            endLineNumber: issue.lineNumber,
            endColumn: 1000
        }));
        monaco.editor.setModelMarkers(editor.getModel(), "markdownlint", markers);
    };

    // ----- Search System -----
    let currentSearchQuery = '';

    let setupSearch = () => {
        const searchInput = document.getElementById('search-input');
        if (!searchInput) return;

        searchInput.addEventListener('input', (e) => {
            currentSearchQuery = e.target.value;
            convert(editor.getValue());
        });
    };

    let highlightText = () => {
        if (!currentSearchQuery) return;
        const root = document.querySelector('#output');
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        const nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);

        nodes.forEach(node => {
            const text = node.nodeValue;
            if (text.toLowerCase().includes(currentSearchQuery.toLowerCase())) {
                const fragment = document.createDocumentFragment();
                let lastIdx = 0;
                const regex = new RegExp(currentSearchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');

                text.replace(regex, (match, idx) => {
                    fragment.appendChild(document.createTextNode(text.substring(lastIdx, idx)));
                    const mark = document.createElement('mark');
                    mark.className = 'search-highlight';
                    mark.textContent = match;
                    fragment.appendChild(mark);
                    lastIdx = idx + match.length;
                    return match;
                });
                fragment.appendChild(document.createTextNode(text.substring(lastIdx)));
                node.parentNode.replaceChild(fragment, node);
            }
        });
    };

    // Render markdown text as html
    let convert = (markdown) => {
        // Reset TOC items
        tocItems = [];

        // options variable removed as headerIds and mangle are deprecated
        let html = marked.parse(markdown);
        let sanitized = DOMPurify.sanitize(html, { ADD_ATTR: ['id'] });

        const outputElement = document.querySelector('#output');
        outputElement.innerHTML = sanitized;

        // Process Mermaid diagrams
        const mermaidBlocks = outputElement.querySelectorAll('pre code.language-mermaid');
        if (mermaidBlocks.length > 0) {
            mermaidBlocks.forEach(block => {
                const pre = block.parentElement;
                const code = block.textContent;
                const div = document.createElement('div');
                div.className = 'mermaid';
                div.textContent = code;
                pre.replaceWith(div);
            });

            try {
                mermaid.run({
                    nodes: outputElement.querySelectorAll('.mermaid')
                });
            } catch (err) {
                console.error('Mermaid rendering failed:', err);
            }
        }

        // Add copy buttons to code blocks
        addCodeCopyButtons();

        // Update TOC
        updateTOC();
        highlightText();
    };

    // Add copy buttons to all code blocks
    let addCodeCopyButtons = () => {
        const codeBlocks = document.querySelectorAll('#output pre');
        codeBlocks.forEach((pre) => {
            if (pre.querySelector('.code-copy-btn')) return; // Already has button

            const copyBtn = document.createElement('button');
            copyBtn.className = 'code-copy-btn';
            copyBtn.innerHTML = '📋';
            copyBtn.title = 'Copy code';
            copyBtn.addEventListener('click', () => {
                const code = pre.querySelector('code')?.textContent || pre.textContent;
                navigator.clipboard.writeText(code).then(() => {
                    copyBtn.innerHTML = '✓';
                    copyBtn.classList.add('copied');
                    setTimeout(() => {
                        copyBtn.innerHTML = '📋';
                        copyBtn.classList.remove('copied');
                    }, 2000);
                });
            });
            pre.style.position = 'relative';
            pre.appendChild(copyBtn);
        });
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
            <button class="toast-close">×</button>
        `;

        // Add event listener for close button
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => toast.remove());

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

        // Calculate reading time (configurable words per minute)
        const readingTime = Math.ceil(wordCount / APP_CONFIG.READING_SPEED_WPM) || 0;

        // Count paragraphs
        const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;

        // Count sentences (approximate)
        const sentences = text.split(/[.(!?)]+/).filter(s => s.trim().length > 0).length;

        // Count headings
        const headings = (text.match(/^#{1,6}\s/gm) || []).length;

        // Update footer stats
        const wordCountEl = document.querySelector('#word-count');
        const charCountEl = document.querySelector('#char-count');
        const readingTimeEl = document.querySelector('#reading-time');

        if (wordCountEl) wordCountEl.textContent = `Words: ${wordCount}`;
        if (charCountEl) charCountEl.textContent = `Chars: ${charCount}`;
        if (readingTimeEl) readingTimeEl.textContent = `Reading: ${readingTime} min`;

        // Update header stats
        const wordCountHeader = document.querySelector('#word-count-header');
        const charCountHeader = document.querySelector('#char-count-header');
        const readingTimeHeader = document.querySelector('#reading-time-header');

        if (wordCountHeader) wordCountHeader.textContent = `Words: ${wordCount}`;
        if (charCountHeader) charCountHeader.textContent = `Chars: ${charCount}`;
        if (readingTimeHeader) readingTimeHeader.textContent = `Reading: ${readingTime} min`;

        // Update modal stats if open
        const modal = document.getElementById('stats-modal');
        if (modal && modal.style.display === 'block') {
            document.querySelector('#stat-words').textContent = wordCount.toLocaleString();
            document.querySelector('#stat-chars').textContent = charCount.toLocaleString();
            document.querySelector('#stat-paragraphs').textContent = paragraphs.toLocaleString();
            document.querySelector('#stat-sentences').textContent = sentences.toLocaleString();
            document.querySelector('#stat-headings').textContent = headings.toLocaleString();
            document.querySelector('#stat-reading-time').textContent = `${readingTime} min`;
        }
    };

    let setupStatsButton = () => {
        const statsBtn = document.querySelector("#stats-button");
        const modal = document.querySelector("#stats-modal");
        const closeBtn = modal.querySelector(".close-modal");

        if (statsBtn) {
            statsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.style.display = "block";

                // Force update stats when opening
                const text = editor.getValue();
                updateStats(text);
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = "none";
            });
        }

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    };

    // ----- templates -----

    const TEMPLATES = {
        readme: {
            title: 'Project README',
            icon: '📘',
            description: 'Standard README with installation, usage, and license sections.',
            content: `# Project Title

> A brief description of your project.

## Features
- Feature 1
- Feature 2
- Feature 3

## Installation
\`\`\`bash
npm install my-project
\`\`\`

## Usage
\`\`\`javascript
const myProject = require('my-project');
myProject.start();
\`\`\`

## License
MIT
`
        },
        cv: {
            title: 'CV / Resume',
            icon: '📄',
            description: 'Professional resume layout with experience and skills.',
            content: `# Your Name
*Software Engineer*
email@example.com | [LinkedIn](https://linkedin.com) | [GitHub](https://github.com)

## Summary
Experienced developer with a passion for building scalable web applications.

## Experience
**Senior Developer** | *Company Name*
*2020 - Present*
- Led a team of 5 developers
- Improved performance by 30%

## Skills
- JavaScript, React, Node.js
- Python, Django
- SQL, MongoDB

## Education
**BS Computer Science** | *University Name*
*2016 - 2020*
`
        },
        blog: {
            title: 'Blog Post',
            icon: '✍️',
            description: 'Article structure with headers, lists, and code blocks.',
            content: `# Blog Post Title
*By Author Name | Jan 1, 2024*

![Cover Image](https://via.placeholder.com/800x400)

## Introduction
Hook the reader with an interesting opening.

## Main Point
Explain your concept here.

### Key Takeaway
1. Point one
2. Point two
3. Point three

> "Quote to emphasize a point."

## Conclusion
Wrap up your thoughts.
`
        },
        meeting: {
            title: 'Meeting Notes',
            icon: '📅',
            description: 'Structure for agendas, attendees, and action items.',
            content: `# Meeting: [Topic]
**Date:** Jan 1, 2024
**Attendees:** Person A, Person B, Person C

## Agenda
1. Review last week's progress
2. Discuss new features
3. Plan next sprint

## Notes
- Key discussion point
- Decision made

## Action Items
- [ ] Person A: Task 1
- [ ] Person B: Task 2
`
        }
    };

    let setupTemplatesButton = () => {
        const templatesBtn = document.querySelector("#templates-button");
        const modal = document.querySelector("#templates-modal");
        const closeBtn = modal.querySelector(".close-templates");
        const grid = document.querySelector("#templates-grid");

        // Populate grid once
        if (grid && grid.children.length === 0) {
            Object.entries(TEMPLATES).forEach(([key, template]) => {
                const card = document.createElement('div');
                card.className = 'template-card';
                card.innerHTML = `
                    <div class="template-icon">${template.icon}</div>
                    <div class="template-title">${template.title}</div>
                    <div class="template-desc">${template.description}</div>
                `;

                card.addEventListener('click', () => {
                    if (confirm('This will overwrite your current editor content. Continue?')) {
                        editor.setValue(template.content);
                        editor.revealPosition({ lineNumber: 1, column: 1 });
                        modal.style.display = "none";
                        showToast(`Template "${template.title}" loaded!`, 'success');
                    }
                });

                grid.appendChild(card);
            });
        }

        if (templatesBtn) {
            templatesBtn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.style.display = "block";
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = "none";
            });
        }

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    };

    // ----- snippets -----

    const SNIPPETS = {
        table: {
            title: 'Table',
            icon: '📊',
            content: `
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
`
        },
        alertNote: {
            title: 'Alert: Note',
            icon: 'ℹ️',
            content: `> [!NOTE]
> This is a note alert.
`
        },
        alertWarning: {
            title: 'Alert: Warning',
            icon: '⚠️',
            content: `> [!WARNING]
> This is a warning alert.
`
        },
        mermaidGraph: {
            title: 'Mermaid: Flowchart',
            icon: '🔄',
            content: `\`\`\`mermaid
graph TD
    A[Start] --> B{Condition}
    B -->|Yes| C[OK]
    B -->|No| D[Error]
\`\`\`
`
        },
        mermaidSeq: {
            title: 'Mermaid: Sequence',
            icon: '⏱️',
            content: `\`\`\`mermaid
sequenceDiagram
    Alice->>Bob: Hello Bob, how are you?
    Bob-->>Alice: I am good thanks!
\`\`\`
`
        },
        math: {
            title: 'Math Block',
            icon: '∑',
            content: `$$
\\int_0^\\infty x^2 dx
$$
`
        },
        checklist: {
            title: 'Checklist',
            icon: '☑️',
            content: `- [ ] Task 1
- [x] Task 2
- [ ] Task 3
`
        }
    };

    let setupSnippetsButton = () => {
        const dropdown = document.querySelector("#snippets-dropdown");

        if (dropdown && dropdown.children.length === 0) {
            Object.entries(SNIPPETS).forEach(([key, snippet]) => {
                const item = document.createElement('div');
                item.className = 'dropdown-item';
                item.innerHTML = `
                    <span class="dropdown-icon">${snippet.icon}</span>
                    <span>${snippet.title}</span>
                `;

                item.addEventListener('click', () => {
                    const selection = editor.getSelection();
                    const text = snippet.content;
                    const op = { range: selection, text: text, forceMoveMarkers: true };
                    editor.executeEdits("my-source", [op]);
                    editor.focus();
                    showToast(`Snippet "${snippet.title}" inserted!`, 'success');
                });

                dropdown.appendChild(item);
            });
        }
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

    let exportToHTML = () => {
        const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Exported Document</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.5.0/github-markdown.min.css">
<style>
    .markdown-body {
        box-sizing: border-box;
        min-width: 200px;
        max-width: 980px;
        margin: 0 auto;
        padding: 45px;
    }
    @media (max-width: 767px) {
        .markdown-body {
            padding: 15px;
        }
    }
</style>
</head>
<body class="markdown-body">
${document.getElementById('output').innerHTML}
</body>
</html>`;

        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.html';
        a.click();
        URL.revokeObjectURL(url);
        showToast('HTML exported successfully!', 'success');
    };

    let exportToDOCX = () => {
        const content = document.getElementById('output').innerHTML;
        const html = `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head><meta charset='utf-8'><title>Export Document</title></head><body>
${content}
</body></html>`;

        const blob = new Blob([html], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.doc';
        a.click();
        URL.revokeObjectURL(url);
        showToast('DOCX (Compat) exported successfully!', 'success');
    };

    let setupAdditionalExportButtons = () => {
        const btnHtml = document.getElementById('export-html-button');
        const btnDocx = document.getElementById('export-docx-button');
        if (btnHtml) btnHtml.addEventListener('click', (e) => { e.preventDefault(); exportToHTML(); });
        if (btnDocx) btnDocx.addEventListener('click', (e) => { e.preventDefault(); exportToDOCX(); });
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
        // Check file size (configurable max size)
        const maxSize = APP_CONFIG.MAX_IMAGE_SIZE_MB * 1024 * 1024;
        if (file.size > maxSize) {
            showToast(`Image size should be less than ${APP_CONFIG.MAX_IMAGE_SIZE_MB}MB`, 'error');
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
        let toggleBtn = document.querySelector('#dark-mode-toggle');

        checkbox.checked = settings;
        darkMode = settings;
        applyDarkMode(settings);

        checkbox.addEventListener('change', (event) => {
            let checked = event.currentTarget.checked;
            darkMode = checked;
            applyDarkMode(checked);
            saveDarkModeSettings(checked);
        });

        // Dark mode quick toggle button in header
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                darkMode = !darkMode;
                checkbox.checked = darkMode;
                applyDarkMode(darkMode);
                saveDarkModeSettings(darkMode);
                showToast(darkMode ? 'Dark mode enabled' : 'Light mode enabled', 'info', 1500);
            });
        }
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

    // ----- settings modal -----

    let setupSettingsModal = () => {
        const settingsBtn = document.querySelector('#settings-btn');
        const modal = document.querySelector('#settings-modal');
        const overlay = document.querySelector('#settings-modal-overlay');
        const closeBtn = document.querySelector('#settings-close');

        if (settingsBtn && modal) {
            settingsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.style.display = 'block';
                if (overlay) overlay.style.display = 'block';
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
                if (overlay) overlay.style.display = 'none';
            });
        }

        // Close on overlay click
        if (overlay) {
            overlay.addEventListener('click', () => {
                modal.style.display = 'none';
                overlay.style.display = 'none';
            });
        }

        // Close on clicking outside modal
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
                if (overlay) overlay.style.display = 'none';
            }
        });

        // Setup font size selector
        const fontSizeDropdown = document.querySelector('#font-size-dropdown');
        if (fontSizeDropdown) {
            fontSizeDropdown.addEventListener('change', (e) => {
                const size = parseInt(e.target.value);
                editor.updateOptions({ fontSize: size });
                showToast(`Font size: ${size}px`, 'info', 1500);
            });
        }

        // Setup line numbers toggle
        const lineNumbersCheckbox = document.querySelector('#line-numbers-checkbox');
        if (lineNumbersCheckbox) {
            lineNumbersCheckbox.addEventListener('change', (e) => {
                editor.updateOptions({ lineNumbers: e.target.checked ? 'on' : 'off' });
                showToast(e.target.checked ? 'Line numbers enabled' : 'Line numbers disabled', 'info', 1500);
            });
        }

        // Setup word wrap toggle
        const wordWrapCheckbox = document.querySelector('#word-wrap-checkbox');
        if (wordWrapCheckbox) {
            wordWrapCheckbox.addEventListener('change', (e) => {
                editor.updateOptions({ wordWrap: e.target.checked ? 'on' : 'off' });
                showToast(e.target.checked ? 'Word wrap enabled' : 'Word wrap disabled', 'info', 1500);
            });
        }
    };

    // ----- theme switching -----

    let initThemeSelector = (savedTheme) => {
        const themeDropdown = document.querySelector('#theme-dropdown');

        // Check for system preference if no saved theme
        if (!savedTheme) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            savedTheme = prefersDark ? 'vs-dark' : 'vs';
        }

        currentTheme = savedTheme;
        themeDropdown.value = currentTheme;
        applyTheme(currentTheme);

        themeDropdown.addEventListener('change', (event) => {
            const theme = event.target.value;
            currentTheme = theme;
            applyTheme(theme);
            saveThemeSettings(theme);
            showToast(`Theme changed to ${getThemeName(theme)}`, 'success', 2000);
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            // Only auto-switch if user hasn't explicitly set a theme
            const userTheme = loadThemeSettings();
            if (!userTheme) {
                const newTheme = e.matches ? 'vs-dark' : 'vs';
                currentTheme = newTheme;
                themeDropdown.value = newTheme;
                applyTheme(newTheme);
                showToast(`Theme auto-switched to ${getThemeName(newTheme)}`, 'info', 2000);
            }
        });
    };

    let defineCustomThemes = () => {
        monaco.editor.defineTheme('dracula', {
            base: 'vs-dark',
            inherit: true,
            rules: [{ background: '282a36' }],
            colors: { 'editor.background': '#282a36' }
        });
        monaco.editor.defineTheme('solarized-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [{ background: '002b36' }],
            colors: { 'editor.background': '#002b36' }
        });
        monaco.editor.defineTheme('solarized-light', {
            base: 'vs',
            inherit: true,
            rules: [{ background: 'fdf6e3' }],
            colors: { 'editor.background': '#fdf6e3' }
        });
        monaco.editor.defineTheme('github-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [{ background: '0d1117' }],
            colors: { 'editor.background': '#0d1117' }
        });
        monaco.editor.defineTheme('github-light', {
            base: 'vs',
            inherit: true,
            rules: [{ background: 'ffffff' }],
            colors: { 'editor.background': '#ffffff' }
        });
    };

    let applyTheme = (theme) => {
        monaco.editor.setTheme(theme);

        // Remove all theme classes
        document.body.classList.remove('dark-mode', 'light-mode', 'hc-mode');
        const themes = ['dracula', 'solarized-dark', 'solarized-light', 'github-dark', 'github-light'];
        themes.forEach(t => document.body.classList.remove(`theme-${t}`));

        // Apply base mode
        if (theme.includes('dark') || theme === 'hc-black' || theme === 'dracula') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.add('light-mode');
        }

        // Apply specific theme class
        if (theme === 'hc-black') {
            document.body.classList.add('hc-mode');
        } else if (theme !== 'vs' && theme !== 'vs-dark') {
            document.body.classList.add(`theme-${theme}`);
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

    // TOC toggle button
    let setupTOCButton = () => {
        const tocBtn = document.querySelector("#toc-button");
        const tocPanel = document.querySelector("#toc-panel");

        tocBtn.addEventListener('click', (event) => {
            event.preventDefault();
            tocPanel.classList.toggle('toc-visible');
            tocBtn.classList.toggle('active');
            showToast(tocPanel.classList.contains('toc-visible') ? 'Table of Contents shown' : 'Table of Contents hidden', 'info', 1500);
        });
    };

    // ----- Focus Mode -----

    // ----- View Mode -----

    let setViewMode = (mode) => {
        const leftPane = document.getElementById('editor-wrapper');
        const rightPane = document.getElementById('preview-wrapper');
        const divider = document.getElementById('split-divider');
        const btns = {
            code: document.getElementById('view-code'),
            split: document.getElementById('view-split'),
            preview: document.getElementById('view-preview')
        };

        // Reset active state
        Object.values(btns).forEach(btn => {
            if (btn) btn.classList.remove('active')
        });
        if (btns[mode]) btns[mode].classList.add('active');

        // Reset display default
        leftPane.style.display = 'flex';
        rightPane.style.display = 'block';
        divider.style.display = 'block';

        if (mode === 'code') {
            rightPane.style.display = 'none';
            divider.style.display = 'none';
            leftPane.style.width = '100%';
        } else if (mode === 'preview') {
            leftPane.style.display = 'none';
            divider.style.display = 'none';
            rightPane.style.width = '100%';
        } else {
            // Split
            leftPane.style.width = '50%';
            rightPane.style.width = '50%';
        }

        // Trigger resize for Monaco
        setTimeout(() => {
            if (editor) editor.layout();
        }, 50);
    };

    let setupViewButtons = () => {
        const btnCode = document.getElementById('view-code');
        const btnSplit = document.getElementById('view-split');
        const btnPreview = document.getElementById('view-preview');

        if (btnCode) btnCode.addEventListener('click', () => setViewMode('code'));
        if (btnSplit) btnSplit.addEventListener('click', () => setViewMode('split'));
        if (btnPreview) btnPreview.addEventListener('click', () => setViewMode('preview'));
    };

    // ----- Focus Mode -----

    let isFocusMode = false;

    let toggleFocusMode = () => {
        const focusBtn = document.querySelector("#focus-button");
        isFocusMode = !isFocusMode;

        if (isFocusMode) {
            document.body.classList.add('focus-mode');
            if (focusBtn) focusBtn.querySelector('a').textContent = 'Exit Focus';
            showToast('Focus Mode Enabled (Press ESC to exit)', 'success');
        } else {
            document.body.classList.remove('focus-mode');
            if (focusBtn) focusBtn.querySelector('a').textContent = 'Focus';
            showToast('Focus Mode Disabled', 'info', 1500);
        }
    };

    let setupFocusMode = () => {
        const focusBtn = document.querySelector("#focus-button");
        if (focusBtn) {
            focusBtn.addEventListener('click', (e) => {
                e.preventDefault();
                toggleFocusMode();
            });
        }
    };

    // ----- Typewriter Mode -----

    let isTypewriterMode = false;

    let toggleTypewriterMode = () => {
        const typewriterBtn = document.querySelector("#typewriter-button");
        isTypewriterMode = !isTypewriterMode;

        if (isTypewriterMode) {
            if (typewriterBtn) typewriterBtn.classList.add('active');

            // Center current line immediately
            const position = editor.getPosition();
            if (position) {
                editor.revealLineInCenter(position.lineNumber);
            }

            showToast('Typewriter Mode Enabled', 'success', 1500);
        } else {
            if (typewriterBtn) typewriterBtn.classList.remove('active');
            showToast('Typewriter Mode Disabled', 'info', 1500);
        }
    };

    let setupTypewriterButton = () => {
        const typewriterBtn = document.querySelector("#typewriter-button");
        if (typewriterBtn) {
            typewriterBtn.addEventListener('click', (e) => {
                e.preventDefault();
                toggleTypewriterMode();
            });
        }
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
            // Ctrl/Cmd + Shift + F: Focus Mode
            else if (ctrlKey && event.shiftKey && event.key === 'F') {
                event.preventDefault();
                toggleFocusMode();
            }
            // ESC: Exit Focus/Fullscreen
            else if (event.key === 'Escape') {
                if (isFocusMode) {
                    toggleFocusMode();
                }
            }
        });
    };

    // ----- toolbar actions -----

    let insertMarkdown = (type) => {
        const selection = editor.getSelection();
        const selectedText = editor.getModel().getValueInRange(selection);
        let replacement = '';
        let cursorOffset = 0;

        switch (type) {
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

    // ----- Mobile UI Setup -----
    let setupMobileUI = () => {
        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
        const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
        const mobileNavClose = document.getElementById('drawer-close');

        if (mobileMenuToggle && mobileNavDrawer) {
            const openDrawer = () => {
                mobileNavDrawer.classList.add('open');
                mobileMenuToggle.classList.add('active');
                document.body.style.overflow = 'hidden';
            };

            const closeDrawer = () => {
                mobileNavDrawer.classList.remove('open');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            };

            mobileMenuToggle.addEventListener('click', () => {
                if (mobileNavDrawer.classList.contains('open')) {
                    closeDrawer();
                } else {
                    openDrawer();
                }
            });

            if (mobileNavOverlay) {
                mobileNavOverlay.addEventListener('click', closeDrawer);
            }

            if (mobileNavClose) {
                mobileNavClose.addEventListener('click', closeDrawer);
            }

            // Close drawer when clicking a drawer item
            const drawerItems = mobileNavDrawer.querySelectorAll('.drawer-item');
            drawerItems.forEach(item => {
                item.addEventListener('click', () => {
                    // Handle action
                    const action = item.dataset.action;
                    if (action) {
                        handleMobileDrawerAction(action);
                    }
                    closeDrawer();
                });
            });
        }

        // Mobile view tabs
        const mobileViewTabs = document.getElementById('mobile-view-tabs');
        if (mobileViewTabs) {
            const editorTab = mobileViewTabs.querySelector('[data-view="editor"]');
            const previewTab = mobileViewTabs.querySelector('[data-view="preview"]');
            const splitTab = mobileViewTabs.querySelector('[data-view="split"]');

            const setMobileView = (view) => {
                document.body.classList.remove('mobile-view-editor', 'mobile-view-preview', 'mobile-view-split');
                document.body.classList.add(`mobile-view-${view}`);

                // Update active tab
                [editorTab, previewTab, splitTab].forEach(tab => {
                    if (tab) tab.classList.remove('active');
                });

                if (view === 'editor' && editorTab) editorTab.classList.add('active');
                if (view === 'preview' && previewTab) previewTab.classList.add('active');
                if (view === 'split' && splitTab) splitTab.classList.add('active');
            };

            if (editorTab) {
                editorTab.addEventListener('click', () => setMobileView('editor'));
            }
            if (previewTab) {
                previewTab.addEventListener('click', () => setMobileView('preview'));
            }
            if (splitTab) {
                splitTab.addEventListener('click', () => setMobileView('split'));
            }

            // Set default mobile view
            if (window.innerWidth <= 768) {
                setMobileView('editor');
            }
        }

        // FAB functionality
        const fabContainer = document.getElementById('fab-container');
        const fabMain = document.getElementById('fab-main');

        if (fabContainer && fabMain) {
            fabMain.addEventListener('click', () => {
                fabContainer.classList.toggle('open');
            });

            // Close FAB when clicking outside
            document.addEventListener('click', (e) => {
                if (!fabContainer.contains(e.target)) {
                    fabContainer.classList.remove('open');
                }
            });

            // FAB action buttons
            const fabActions = fabContainer.querySelectorAll('.fab-action');
            fabActions.forEach(action => {
                action.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const actionType = action.dataset.action;
                    handleFabAction(actionType);
                    fabContainer.classList.remove('open');
                });
            });
        }

        // Sync mobile dark mode toggle with desktop
        const mobileDarkModeCheckbox = document.getElementById('mobile-dark-mode-checkbox');
        const desktopDarkModeCheckbox = document.getElementById('dark-mode-checkbox');

        if (mobileDarkModeCheckbox && desktopDarkModeCheckbox) {
            mobileDarkModeCheckbox.checked = desktopDarkModeCheckbox.checked;

            mobileDarkModeCheckbox.addEventListener('change', () => {
                desktopDarkModeCheckbox.checked = mobileDarkModeCheckbox.checked;
                desktopDarkModeCheckbox.dispatchEvent(new Event('change'));
            });

            desktopDarkModeCheckbox.addEventListener('change', () => {
                mobileDarkModeCheckbox.checked = desktopDarkModeCheckbox.checked;
            });
        }

        // Sync mobile sync scroll toggle with desktop
        const mobileSyncScrollCheckbox = document.getElementById('mobile-sync-scroll-checkbox');
        const desktopSyncScrollCheckbox = document.querySelector('#sync-scroll-checkbox');

        if (mobileSyncScrollCheckbox && desktopSyncScrollCheckbox) {
            mobileSyncScrollCheckbox.checked = desktopSyncScrollCheckbox.checked;

            mobileSyncScrollCheckbox.addEventListener('change', () => {
                desktopSyncScrollCheckbox.checked = mobileSyncScrollCheckbox.checked;
                desktopSyncScrollCheckbox.dispatchEvent(new Event('change'));
            });

            desktopSyncScrollCheckbox.addEventListener('change', () => {
                mobileSyncScrollCheckbox.checked = desktopSyncScrollCheckbox.checked;
            });
        }

        // Handle dropdown menus for touch devices
        const dropdowns = document.querySelectorAll('.dropdown-wrapper');
        dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('.dropdown-trigger');
            const menu = dropdown.querySelector('.dropdown-menu');

            if (trigger && menu) {
                trigger.addEventListener('click', (e) => {
                    e.stopPropagation();
                    // Close other dropdowns
                    dropdowns.forEach(other => {
                        if (other !== dropdown) {
                            other.classList.remove('open');
                        }
                    });
                    dropdown.classList.toggle('open');
                });
            }
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', () => {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('open');
            });
        });
    };

    // Handle mobile drawer actions
    let handleMobileDrawerAction = (action) => {
        switch (action) {
            case 'reset':
                document.querySelector('#reset-button')?.click();
                break;
            case 'import':
                document.querySelector('#import-button')?.click();
                break;
            case 'download-md':
                document.querySelector('#download-md-button')?.click();
                break;
            case 'export-html':
                document.querySelector('#export-html-button')?.click();
                break;
            case 'export-docx':
                document.querySelector('#export-docx-button')?.click();
                break;
            case 'copy-md':
                document.querySelector('#copy-button')?.click();
                break;
            case 'copy-html':
                document.querySelector('#copy-html-button')?.click();
                break;
            case 'export-pdf':
                document.querySelector('#export-pdf-button')?.click();
                break;
            case 'templates':
                document.querySelector('#templates-button')?.click();
                break;
            case 'toc':
                document.querySelector('#toc-button')?.click();
                break;
            case 'lint':
                document.querySelector('#lint-button')?.click();
                break;
            case 'goals':
                document.querySelector('#goals-button')?.click();
                break;
            case 'stats':
                document.querySelector('#stats-button')?.click();
                break;
            case 'help':
                document.querySelector('#help-button')?.click();
                break;
            case 'focus-mode':
                document.querySelector('#focus-button')?.click();
                break;
            case 'fullscreen':
                document.querySelector('#fullscreen-button')?.click();
                break;
        }
    };

    // Handle FAB actions
    let handleFabAction = (action) => {
        switch (action) {
            case 'copy-md':
                document.querySelector('#copy-button')?.click();
                break;
            case 'download-md':
                document.querySelector('#download-md-button')?.click();
                break;
            case 'export-pdf':
                document.querySelector('#export-pdf-button')?.click();
                break;
        }
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
    // Define custom Monaco themes first
    defineCustomThemes();

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
    setupAdditionalExportButtons();
    setupImportButton();
    setupImageUpload();
    setupHelpButton();
    setupStatsButton();
    setupTemplatesButton();
    setupSnippetsButton();
    setupTOCButton();
    setupFocusMode();
    setupTypewriterButton();
    setupFullscreenButton();
    setupViewButtons(); initTabs(); setupSearch(); setupLinter(); setupGoals();
    setupKeyboardShortcuts();

    let scrollBarSettings = loadScrollBarSettings() || false;
    initScrollBarSync(scrollBarSettings);

    let themeSettings = loadThemeSettings() || 'vs';
    initThemeSelector(themeSettings);

    let darkModeSettings = loadDarkModeSettings() || false;
    initDarkMode(darkModeSettings);

    setupSettingsModal();
    setupDivider();
    setupMobileUI();

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

                // Check for updates periodically (every 30 minutes)
                setInterval(() => {
                    registration.update();
                }, APP_CONFIG.SERVICE_WORKER_UPDATE_INTERVAL_MS);
            })
            .catch((error) => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}

window.addEventListener("load", () => {
    init();
});
