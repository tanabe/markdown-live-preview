import Storehouse from 'storehouse-js';
import * as monaco from 'monaco-editor';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import 'github-markdown-css/github-markdown-light.css';
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';

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

// Global state and constants
let editor;
let hasEdited = false;
let scrollBarSync = false;
let darkMode = false;
let currentTheme = 'vs';

let goalsData = {
    dailyTarget: 500,
    streak: 0,
    lastGoalDate: null,
    history: {}
};

const localStorageNamespace = 'com.markdownlivepreview';
const localStorageKey = 'last_state';
const localStorageScrollBarKey = 'scroll_bar_settings';
const localStorageDarkModeKey = 'dark_mode_settings';
const localStorageThemeKey = 'theme_settings';
const localStorageDocsKey = 'docs';
const localStorageGoalsKey = 'writing_goals';
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

    // Setup mouse wheel horizontal scroll for tabs
    setupTabsWheelScroll();
};

// Mouse wheel horizontal scroll for tabs
let setupTabsWheelScroll = () => {
    const tabsList = document.getElementById('tabs-list');
    if (!tabsList) return;

    tabsList.addEventListener('wheel', (e) => {
        // Prevent vertical scroll, enable horizontal scroll with mouse wheel
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
            tabsList.scrollLeft += e.deltaY * 0.8; // Smooth multiplier
        }
    }, { passive: false });
};

// Rename tab functionality
let startRenameTab = (docId, tabNameElement) => {
    const doc = documents.find(d => d.id === docId);
    if (!doc) return;

    const currentName = doc.title;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentName;
    input.className = 'tab-rename-input';

    // Replace tab name with input
    tabNameElement.style.display = 'none';
    tabNameElement.parentNode.insertBefore(input, tabNameElement.nextSibling);
    input.focus();
    input.select();

    const finishRename = () => {
        const newName = input.value.trim() || 'Untitled';
        doc.title = newName.replace(/\.md$/i, '').substring(0, 30); // Remove .md if user typed it, limit length
        saveDocsToStorage();
        renderTabs();
    };

    input.addEventListener('blur', finishRename);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            input.blur();
        } else if (e.key === 'Escape') {
            input.value = currentName; // Restore original name
            input.blur();
        }
    });

    // Prevent click from bubbling to tab
    input.addEventListener('click', (e) => e.stopPropagation());
};

let renderTabs = () => {
    const tabsList = document.getElementById('tabs-list');
    if (!tabsList) return;

    // Keep the "Add Tab" button
    const addBtn = document.getElementById('new-tab-button');
    tabsList.innerHTML = '';

    documents.forEach(doc => {
        const tab = document.createElement('button');
        tab.className = `header-tab ${doc.id === activeDocId ? 'active' : ''}`;
        tab.dataset.docId = doc.id;
        tab.innerHTML = `
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M14 4.5V14a2 2 0 01-2 2H4a2 2 0 01-2-2V2a2 2 0 012-2h5.5L14 4.5zm-3 0A1.5 1.5 0 019.5 3V1H4a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V4.5h-2z" />
                </svg>
                <span class="tab-name">${doc.title}.md</span>
                <span class="tab-close" aria-label="Close tab" title="Close tab">×</span>
            `;

        // Single click to switch tab
        tab.addEventListener('click', (e) => {
            if (!e.target.classList.contains('tab-close') && !e.target.classList.contains('tab-rename-input')) {
                switchTab(doc.id);
            }
        });

        // Double-click to rename
        const tabName = tab.querySelector('.tab-name');
        tabName.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            startRenameTab(doc.id, tabName);
        });

        // Close button
        tab.querySelector('.tab-close').addEventListener('click', (e) => {
            e.stopPropagation();
            closeTab(doc.id);
        });

        tabsList.appendChild(tab);
    });

    if (addBtn) tabsList.appendChild(addBtn);
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
    editor = monaco.editor.create(document.querySelector('#editor'), {
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
        // Use .preview-wrapper as it's the scrollable element (not #preview which has overflow: hidden)
        const previewElement = document.querySelector('.preview-wrapper');

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
    // Use .preview-wrapper as it's the scrollable element
    const previewElement = document.querySelector('.preview-wrapper');
    previewElement.addEventListener('scroll', () => {
        // Update outline scroll progress
        updateOutlineScrollProgress();
        updateActiveOutlineItem();

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

    // Typewriter Mode: Center cursor + Update cursor position in status bar
    editor.onDidChangeCursorPosition((e) => {
        // Update status bar cursor position
        const cursorPosEl = document.getElementById('cursor-position');
        if (cursorPosEl) {
            const pos = e.position;
            cursorPosEl.querySelector('span').textContent = `Ln ${pos.lineNumber}, Col ${pos.column}`;
        }

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

    // Also update the left sidebar outline
    updateOutline();

    // Also update the right TOC sidebar
    updateRightTOC();
};

// Update Right TOC Sidebar (preview mode)
let updateRightTOC = () => {
    const tocList = document.getElementById('toc-list');
    const outputElement = document.querySelector('#output');

    if (!tocList || !outputElement) return;

    // Find all headings in the preview
    const headings = outputElement.querySelectorAll('h1, h2, h3, h4, h5, h6');

    // Clear existing items
    tocList.innerHTML = '';

    if (headings.length === 0) {
        tocList.innerHTML = '<li class="toc-empty">No headings found</li>';
        return;
    }

    headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName.charAt(1));
        const text = heading.textContent.trim();
        const id = heading.id || `heading-${index}`;

        // Ensure heading has an ID for navigation
        if (!heading.id) heading.id = id;

        const li = document.createElement('li');
        li.className = `toc-item level-${level}`;

        const link = document.createElement('a');
        link.className = 'toc-link';
        link.textContent = text;
        link.href = `#${id}`;
        link.setAttribute('data-heading-id', id);

        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active from all items
            tocList.querySelectorAll('.toc-link').forEach(el => el.classList.remove('active'));
            link.classList.add('active');

            // Scroll to heading in preview
            heading.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Close TOC sidebar on mobile after clicking
            if (window.innerWidth <= 768) {
                const tocSidebar = document.querySelector('.toc-sidebar');
                const mobileOverlay = document.querySelector('#mobile-toc-overlay');
                if (tocSidebar) {
                    tocSidebar.classList.remove('visible');
                    tocSidebar.classList.add('hidden');
                }
                if (mobileOverlay) {
                    mobileOverlay.classList.remove('active');
                }
            }
        });

        li.appendChild(link);
        tocList.appendChild(li);
    });
};

// Update Document Outline (left sidebar)
let updateOutline = () => {
    const outlineList = document.getElementById('outline-list');
    const outlineEmpty = document.getElementById('outline-empty');
    const outputElement = document.querySelector('#output');

    if (!outlineList || !outputElement) return;

    // Find all headings in the preview
    const headings = outputElement.querySelectorAll('h1, h2, h3, h4, h5, h6');

    // Clear existing items
    outlineList.innerHTML = '';

    if (headings.length === 0) {
        // Show empty state
        if (outlineEmpty) outlineEmpty.style.display = 'flex';
        outlineList.style.display = 'none';
        return;
    }

    // Hide empty state, show list
    if (outlineEmpty) outlineEmpty.style.display = 'none';
    outlineList.style.display = 'block';

    headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName.charAt(1));
        const text = heading.textContent.trim();
        const id = heading.id || `heading-${index}`;

        // Ensure heading has an ID for navigation
        if (!heading.id) heading.id = id;

        const li = document.createElement('li');
        const item = document.createElement('a');
        item.className = `outline-item level-${level}`;
        item.textContent = text;
        item.href = `#${id}`;
        item.setAttribute('data-heading-id', id);

        item.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active from all items
            outlineList.querySelectorAll('.outline-item').forEach(el => el.classList.remove('active'));
            item.classList.add('active');

            // Scroll to heading in preview
            heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        li.appendChild(item);
        outlineList.appendChild(li);
    });

    // Update scroll indicator
    updateOutlineScrollProgress();
};

// Update scroll progress in outline
let updateOutlineScrollProgress = () => {
    const previewWrapper = document.querySelector('#preview-wrapper');
    const progressBar = document.querySelector('.outline-scroll-indicator .scroll-progress');

    if (!previewWrapper || !progressBar) return;

    const scrollTop = previewWrapper.scrollTop;
    const scrollHeight = previewWrapper.scrollHeight - previewWrapper.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    progressBar.style.width = `${Math.min(100, progress)}%`;
};

// Update active item in outline based on scroll position
let updateActiveOutlineItem = () => {
    const previewElement = document.querySelector('#preview');
    const outlineList = document.getElementById('outline-list');
    const outputElement = document.querySelector('#output');

    if (!previewElement || !outlineList || !outputElement) return;

    const headings = outputElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length === 0) return;

    const scrollTop = previewElement.scrollTop;
    const threshold = 100; // Offset from top

    let activeHeading = null;

    // Find the heading that's currently visible at the top
    headings.forEach(heading => {
        const rect = heading.getBoundingClientRect();
        const containerRect = previewElement.getBoundingClientRect();
        const relativeTop = rect.top - containerRect.top;

        if (relativeTop <= threshold) {
            activeHeading = heading;
        }
    });

    // Update active class in outline
    if (activeHeading) {
        outlineList.querySelectorAll('.outline-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-heading-id') === activeHeading.id) {
                item.classList.add('active');
            }
        });
    }
};

let setupGoals = () => {
    const saved = Storehouse.getItem(localStorageNamespace, localStorageGoalsKey);
    if (saved) goalsData = saved;

    const btn = document.getElementById('goals-button');
    const modal = document.getElementById('goals-modal');
    const overlay = document.getElementById('goals-modal-overlay');
    const closeBtns = document.querySelectorAll('.close-goals');
    const saveBtn = document.getElementById('save-goals-btn');
    const input = document.getElementById('daily-goal-input');

    const openModal = () => {
        modal.style.display = 'block';
        if (overlay) overlay.style.display = 'block';
        updateGoalProgress(editor.getValue());
    };

    const closeModal = () => {
        modal.style.display = 'none';
        if (overlay) overlay.style.display = 'none';
    };

    if (input) {
        input.value = goalsData.dailyTarget;
        input.addEventListener('change', (e) => {
            goalsData.dailyTarget = parseInt(e.target.value) || 500;
            saveGoals();
            updateGoalProgress(editor.getValue());
        });
    }

    if (btn) {
        btn.addEventListener('click', openModal);
    }

    // All close buttons
    closeBtns.forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModal);
    });

    // Save button
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            goalsData.dailyTarget = parseInt(input?.value) || 500;
            saveGoals();
            closeModal();
            showToast('Goals saved!', 'success');
        });
    }

    // Click overlay to close
    if (overlay) {
        overlay.addEventListener('click', closeModal);
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

    const openPanel = () => {
        lintPanel.classList.remove('hidden');
        lintBtn?.classList.add('active');
        runLinter();
    };

    const closePanel = () => {
        lintPanel.classList.add('hidden');
        lintBtn?.classList.remove('active');
    };

    if (lintBtn && lintPanel) {
        lintBtn.addEventListener('click', () => {
            const isHidden = lintPanel.classList.contains('hidden');
            if (isHidden) {
                openPanel();
            } else {
                closePanel();
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closePanel);
    }

    // Run linter on change (debounced)
    editor.onDidChangeModelContent(() => {
        clearTimeout(linterDebounceTimer);
        linterDebounceTimer = setTimeout(() => {
            // Only run if panel is visible
            if (lintPanel && !lintPanel.classList.contains('hidden')) {
                runLinter();
            }
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

    // Remove existing badge
    if (btn) {
        const existingBadge = btn.querySelector('.badge');
        if (existingBadge) existingBadge.remove();
    }

    if (issues.length === 0) {
        list.innerHTML = '<div style="padding:16px; color:var(--accent-success); text-align:center;"><svg width="20" height="20" style="margin-bottom:8px; display:block; margin:0 auto 8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>No issues found!</div>';
    } else {
        // Add badge to button
        if (btn) {
            const badge = document.createElement('span');
            badge.className = 'badge';
            badge.textContent = issues.length > 99 ? '99+' : issues.length;
            btn.appendChild(badge);
        }

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
    const searchBtn = document.getElementById('search-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-input');
    const searchClose = document.getElementById('search-close');

    if (!searchBtn || !searchOverlay || !searchInput) {
        console.warn('Search elements not found');
        return;
    }

    // Toggle search overlay on button click
    searchBtn.addEventListener('click', () => {
        searchOverlay.classList.toggle('hidden');
        if (!searchOverlay.classList.contains('hidden')) {
            searchInput.focus();
            searchInput.select();
        }
    });

    // Close search overlay
    if (searchClose) {
        searchClose.addEventListener('click', () => {
            searchOverlay.classList.add('hidden');
            currentSearchQuery = '';
            searchInput.value = '';
            convert(editor.getValue()); // Re-render without highlights
        });
    }

    // Handle search input
    searchInput.addEventListener('input', (e) => {
        currentSearchQuery = e.target.value;
        convert(editor.getValue());
    });

    // Handle Enter key to find next
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchOverlay.classList.add('hidden');
            currentSearchQuery = '';
            searchInput.value = '';
            convert(editor.getValue());
        }
        if (e.key === 'Enter') {
            // Scroll to first match
            const firstMatch = document.querySelector('.search-highlight');
            if (firstMatch) {
                firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    // Keyboard shortcut Ctrl+F
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            searchOverlay.classList.remove('hidden');
            searchInput.focus();
            searchInput.select();
        }
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
            if (successHandler) successHandler();
        },

        () => {
            if (errorHandler) errorHandler();
        }
    );
};

let copyMarkdownToClipboard = () => {
    const mdContent = editor.getValue();
    copyToClipboard(mdContent, () => {
        showToast('Markdown copied to clipboard!', 'success');
    }, () => {
        showToast('Failed to copy Markdown', 'error');
    });
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
    const overlay = document.querySelector("#stats-modal-overlay");
    const closeBtn = modal?.querySelector("#stats-close");
    const closeBtnFooter = modal?.querySelector("#stats-close-btn");

    const openModal = () => {
        if (modal) modal.style.display = "block";
        if (overlay) overlay.style.display = "block";
        // Force update stats when opening
        const text = editor.getValue();
        updateStats(text);
    };

    const closeModal = () => {
        if (modal) modal.style.display = "none";
        if (overlay) overlay.style.display = "none";
    };

    if (statsBtn) {
        statsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (closeBtnFooter) {
        closeBtnFooter.addEventListener('click', closeModal);
    }

    // Click overlay to close
    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }

    // Click outside modal to close
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
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
    const overlay = document.querySelector("#templates-modal-overlay");
    const closeBtns = document.querySelectorAll(".close-templates");
    const grid = document.querySelector("#templates-grid");

    const openModal = () => {
        if (modal) modal.style.display = "block";
        if (overlay) overlay.style.display = "block";
    };

    const closeModal = () => {
        if (modal) modal.style.display = "none";
        if (overlay) overlay.style.display = "none";
    };

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
                    closeModal();
                    showToast(`Template "${template.title}" loaded!`, 'success');
                }
            });

            grid.appendChild(card);
        });
    }

    if (templatesBtn) {
        templatesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }

    // All close buttons
    closeBtns.forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModal);
    });

    // Click overlay to close
    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }

    // Click outside modal to close
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
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
    const content = editor.getValue();
    const filename = getExportFilename('md');
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded: ${filename}`, 'success');
};

let exportToPDF = () => {
    showToast('Generating PDF...', 'info', 2000);
    const element = document.querySelector('#output');
    const filename = getExportFilename('pdf');
    const options = {
        margin: [0.75, 0.75, 0.75, 0.75],
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            logging: false,
            letterRendering: true
        },
        jsPDF: {
            unit: 'in',
            format: 'letter',
            orientation: 'portrait'
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf().set(options).from(element).save().then(() => {
        showToast(`PDF exported: ${filename}`, 'success');
    }).catch(() => {
        showToast('Failed to export PDF', 'error');
    });
};

let exportToHTML = () => {
    const title = getActiveDocTitle();
    const filename = getExportFilename('html');
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.5.0/github-markdown.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<style>
    body {
        background: #ffffff;
        color: #24292e;
    }
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
    @media print {
        .markdown-body {
            max-width: none;
            padding: 20px;
        }
    }
    pre {
        background: #2d2d2d;
        border-radius: 6px;
        padding: 16px;
        overflow-x: auto;
    }
    code {
        font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
    }
    img {
        max-width: 100%;
        height: auto;
    }
    table {
        border-collapse: collapse;
        width: 100%;
    }
    th, td {
        border: 1px solid #dfe2e5;
        padding: 8px 12px;
    }
    blockquote {
        border-left: 4px solid #dfe2e5;
        padding-left: 16px;
        color: #6a737d;
        margin: 16px 0;
    }
</style>
</head>
<body class="markdown-body">
${document.getElementById('output').innerHTML}
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"><\/script>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`HTML exported: ${filename}`, 'success');
};

let exportToDOCX = () => {
    const title = getActiveDocTitle();
    const filename = getExportFilename('doc');
    const content = document.getElementById('output').innerHTML;
    const html = `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset='utf-8'>
<title>${title}</title>
<style>
    body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; line-height: 1.6; }
    h1 { font-size: 24pt; color: #333; }
    h2 { font-size: 18pt; color: #444; }
    h3 { font-size: 14pt; color: #555; }
    pre, code { font-family: Consolas, monospace; background: #f4f4f4; padding: 2px 4px; }
    pre { padding: 10px; border: 1px solid #ddd; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ccc; padding: 8px; }
    blockquote { border-left: 3px solid #ccc; padding-left: 10px; color: #666; }
</style>
</head>
<body>
${content}
</body>
</html>`;

    const blob = new Blob([html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`DOCX exported: ${filename}`, 'success');
};

// Export as Plain Text
let exportToTXT = () => {
    const content = editor.getValue();
    // Strip markdown syntax for plain text
    const plainText = content
        .replace(/^#{1,6}\s+/gm, '')  // Remove headings
        .replace(/\*\*(.+?)\*\*/g, '$1')  // Remove bold
        .replace(/\*(.+?)\*/g, '$1')  // Remove italic
        .replace(/~~(.+?)~~/g, '$1')  // Remove strikethrough
        .replace(/`{3}[\s\S]*?`{3}/g, '')  // Remove code blocks
        .replace(/`(.+?)`/g, '$1')  // Remove inline code
        .replace(/\[(.+?)\]\(.+?\)/g, '$1')  // Remove links, keep text
        .replace(/!\[.*?\]\(.+?\)/g, '')  // Remove images
        .replace(/^[-*+]\s+/gm, '• ')  // Convert bullets
        .replace(/^\d+\.\s+/gm, '')  // Remove numbered list markers
        .replace(/^>\s+/gm, '')  // Remove blockquotes
        .replace(/^---+$/gm, '────────────────')  // Convert horizontal rules
        .trim();

    const filename = getExportFilename('txt');
    const blob = new Blob([plainText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Text exported: ${filename}`, 'success');
};

// Export as PNG Image
let exportToPNG = () => {
    showToast('Generating image...', 'info', 2000);
    const element = document.querySelector('#output');

    html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = getExportFilename('png');
        link.href = canvas.toDataURL('image/png');
        link.click();
        showToast('Image exported successfully!', 'success');
    }).catch(() => {
        showToast('Failed to export image', 'error');
    });
};

// Print document
let printDocument = () => {
    const content = document.getElementById('output').innerHTML;
    const title = getActiveDocTitle();
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${title}</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.5.0/github-markdown.min.css">
            <style>
                body { padding: 20px; }
                .markdown-body { max-width: 800px; margin: 0 auto; }
                @media print {
                    body { padding: 0; }
                    .markdown-body { max-width: none; }
                }
            </style>
        </head>
        <body class="markdown-body">
            ${content}
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 500);
};

// Helper: Get active document title
let getActiveDocTitle = () => {
    const doc = documents.find(d => d.id === activeDocId);
    return doc ? doc.title : 'Untitled';
};

// Helper: Generate export filename with extension
let getExportFilename = (ext) => {
    const title = getActiveDocTitle();
    // Sanitize filename: remove invalid characters
    const sanitized = title.replace(/[<>:"/\\|?*]/g, '').trim() || 'document';
    return `${sanitized}.${ext}`;
};

let setupAdditionalExportButtons = () => {
    const btnHtml = document.getElementById('export-html-button');
    const btnDocx = document.getElementById('export-docx-button');
    const btnTxt = document.getElementById('export-txt-button');
    const btnPng = document.getElementById('export-png-button');
    const btnPrint = document.getElementById('print-button');

    if (btnHtml) btnHtml.addEventListener('click', (e) => { e.preventDefault(); exportToHTML(); });
    if (btnDocx) btnDocx.addEventListener('click', (e) => { e.preventDefault(); exportToDOCX(); });
    if (btnTxt) btnTxt.addEventListener('click', (e) => { e.preventDefault(); exportToTXT(); });
    if (btnPng) btnPng.addEventListener('click', (e) => { e.preventDefault(); exportToPNG(); });
    if (btnPrint) btnPrint.addEventListener('click', (e) => { e.preventDefault(); printDocument(); });
};

// ==================== EXPORT MODAL ====================
let currentExportFormat = 'pdf';
let exportModalZoom = 0.9;

let setupExportModal = () => {
    const modal = document.getElementById('export-modal');
    const overlay = document.getElementById('export-modal-overlay');
    const closeBtn = document.getElementById('export-modal-close');
    const cancelBtn = document.getElementById('export-cancel-btn');
    const confirmBtn = document.getElementById('export-confirm-btn');
    const formatBtns = document.querySelectorAll('.export-format-btn');
    const headerExportBtn = document.getElementById('export-btn');

    if (!modal) return;

    // Header Export button opens the modal
    headerExportBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        openExportModal();
    });

    // Format button click handlers
    formatBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const format = btn.dataset.format;
            if (!format) return;

            // Handle immediate actions
            if (format === 'copy-md') {
                copyMarkdownToClipboard();
                return;
            }
            if (format === 'copy-html') {
                copyHTMLToClipboard();
                return;
            }
            if (format === 'reset') {
                closeExportModal();
                reset();
                return;
            }

            // Set active format
            formatBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentExportFormat = format;

            updateExportUI(format);
            updateExportPreview(format);
        });
    });

    // Close handlers
    const closeHandler = () => {
        closeExportModal();
    };

    closeBtn?.addEventListener('click', closeHandler);
    cancelBtn?.addEventListener('click', closeHandler);
    overlay?.addEventListener('click', closeHandler);

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeExportModal();
        }
    });

    // Confirm button
    confirmBtn?.addEventListener('click', () => {
        executeExport(currentExportFormat);
        closeExportModal();
    });

    // Zoom controls for PNG
    document.getElementById('zoom-in-btn')?.addEventListener('click', () => {
        exportModalZoom = Math.min(exportModalZoom + 0.1, 1.5);
        updateZoom();
    });

    document.getElementById('zoom-out-btn')?.addEventListener('click', () => {
        exportModalZoom = Math.max(exportModalZoom - 0.1, 0.5);
        updateZoom();
    });

    document.getElementById('zoom-fit-btn')?.addEventListener('click', () => {
        exportModalZoom = 0.9;
        updateZoom();
    });

    // Auto-update preview when options change
    setupExportOptionListeners();
};

let updateZoom = () => {
    const pngContainer = document.getElementById('png-container');
    if (pngContainer) {
        pngContainer.style.transform = `scale(${exportModalZoom})`;
    }
};

// Setup listeners for all export options to auto-update preview
let setupExportOptionListeners = () => {
    // PDF options
    const pdfOptions = ['export-paper-size', 'export-orientation', 'export-page-numbers', 'export-header-footer'];
    pdfOptions.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', () => {
                if (currentExportFormat === 'pdf') {
                    updateExportPreview('pdf');
                    estimateFileSize('pdf');
                }
            });
        }
    });

    // HTML options
    const htmlOptions = ['export-html-theme', 'export-include-css', 'export-minify-html'];
    htmlOptions.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', () => {
                if (currentExportFormat === 'html') {
                    updateExportPreview('html');
                    estimateFileSize('html');
                }
            });
        }
    });

    // PNG options
    const pngOptions = ['export-image-width', 'export-resolution', 'export-transparent-bg', 'export-include-shadow'];
    pngOptions.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            const eventType = el.type === 'text' ? 'input' : 'change';
            el.addEventListener(eventType, () => {
                if (currentExportFormat === 'png') {
                    updateExportPreview('png');
                    estimateFileSize('png');
                }
            });
        }
    });

    // TXT options
    const txtOptions = ['export-word-wrap', 'export-frontmatter'];
    txtOptions.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', () => {
                if (currentExportFormat === 'txt') {
                    updateExportPreview('txt');
                    estimateFileSize('txt');
                }
            });
        }
    });

    // Print options
    const printOptions = ['print-paper-size', 'print-orientation', 'print-margins', 'print-scale'];
    printOptions.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', () => {
                if (currentExportFormat === 'print') {
                    updateExportPreview('print');
                }
            });
        }
    });

    // Refresh button
    document.getElementById('export-refresh-btn')?.addEventListener('click', () => {
        updateExportPreview(currentExportFormat);
        estimateFileSize(currentExportFormat);
        showToast('Preview refreshed!', 'info', 1500);
    });
};

let openExportModal = () => {
    const modal = document.getElementById('export-modal');
    const overlay = document.getElementById('export-modal-overlay');

    if (!modal || !overlay) return;

    // Reset loading state
    const loadingOverlay = document.getElementById('export-loading-overlay');
    if (loadingOverlay) loadingOverlay.classList.add('hidden');

    // Set default format to PDF
    currentExportFormat = 'pdf';
    document.querySelectorAll('.export-format-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.format === 'pdf');
    });

    updateExportUI('pdf');
    updateExportPreview('pdf');

    // Show modal
    modal.classList.add('active');
    overlay.classList.add('active');
};

let closeExportModal = () => {
    const modal = document.getElementById('export-modal');
    const overlay = document.getElementById('export-modal-overlay');
    const loadingOverlay = document.getElementById('export-loading-overlay');

    modal?.classList.remove('active');
    overlay?.classList.remove('active');
    loadingOverlay?.classList.add('hidden');
};

let updateExportUI = (format) => {
    // Hide all option panels
    document.querySelectorAll('.export-options').forEach(el => el.classList.add('hidden'));

    // Hide all previews
    document.querySelectorAll('.export-preview').forEach(el => el.classList.add('hidden'));

    // Show relevant options
    const optionsId = `${format}-options`;
    document.getElementById(optionsId)?.classList.remove('hidden');

    // Update button text and icon
    const btnText = document.getElementById('export-btn-text');
    const btnIcon = document.getElementById('export-btn-icon');
    const previewLabel = document.getElementById('preview-label');

    const formatConfig = {
        pdf: { text: 'Export PDF', icon: 'picture_as_pdf', label: 'Previewing 1 of 1 pages' },
        html: { text: 'Export HTML', icon: 'html', label: 'HTML Preview' },
        markdown: { text: 'Download Markdown', icon: 'download', label: 'Markdown file' },
        docx: { text: 'Export DOCX', icon: 'description', label: 'Word Document' },
        txt: { text: 'Export Text', icon: 'text_snippet', label: 'Plain Text Preview' },
        png: { text: 'Export Image', icon: 'image', label: 'Image Preview' },
        print: { text: 'Print Document', icon: 'print', label: 'Print Preview' }
    };

    const config = formatConfig[format] || formatConfig.pdf;
    if (btnText) btnText.textContent = config.text;
    if (btnIcon) btnIcon.textContent = config.icon;
    if (previewLabel) previewLabel.textContent = config.label;

    // Estimate file size
    estimateFileSize(format);
};

let updateExportPreview = (format) => {
    const content = document.getElementById('output').innerHTML;
    const title = getActiveDocTitle();
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

    // Update filename and date
    const filenameEl = document.getElementById('page-filename');
    const dateEl = document.getElementById('page-date');
    const urlEl = document.getElementById('browser-url-text');

    if (filenameEl) filenameEl.textContent = `${title}.md`;
    if (dateEl) dateEl.textContent = today;
    if (urlEl) urlEl.textContent = `file:///Documents/${title}.html`;

    // Get PDF/Print options
    const showPageNumbers = document.getElementById('export-page-numbers')?.checked ?? true;
    const showHeaderFooter = document.getElementById('export-header-footer')?.checked ?? false;

    // Show appropriate preview
    if (format === 'pdf' || format === 'print') {
        document.getElementById('pdf-preview')?.classList.remove('hidden');
        const pageContent = document.getElementById('export-page-content');
        const pageFooter = document.querySelector('.page-footer');
        const pageHeader = document.querySelector('.page-header');

        if (pageContent) {
            pageContent.innerHTML = `<div class="markdown-body">${content}</div>`;
        }

        // Toggle page number visibility
        if (pageFooter) {
            pageFooter.style.display = showPageNumbers ? 'flex' : 'none';
        }

        // Toggle header visibility
        if (pageHeader) {
            pageHeader.style.display = showHeaderFooter ? 'flex' : 'none';
        }
    } else if (format === 'html') {
        document.getElementById('html-preview')?.classList.remove('hidden');
        const htmlContent = document.getElementById('html-preview-content');
        const theme = document.getElementById('export-html-theme')?.value || 'light';

        if (htmlContent) {
            // Apply theme to preview
            htmlContent.className = 'browser-content';
            if (theme === 'dark') {
                htmlContent.style.backgroundColor = '#1e1e1e';
                htmlContent.style.color = '#d4d4d4';
            } else {
                htmlContent.style.backgroundColor = '#ffffff';
                htmlContent.style.color = '#24292f';
            }
            htmlContent.innerHTML = `<div class="markdown-body">${content}</div>`;
        }
    } else if (format === 'txt') {
        document.getElementById('txt-preview')?.classList.remove('hidden');
        const txtContent = document.getElementById('txt-preview-content');
        const wordWrap = document.getElementById('export-word-wrap')?.checked ?? true;
        const includeFrontmatter = document.getElementById('export-frontmatter')?.checked ?? false;

        if (txtContent) {
            // Convert to plain text
            let plainText = editor.getValue()
                .replace(/^#{1,6}\s+/gm, '')
                .replace(/\*\*(.+?)\*\*/g, '$1')
                .replace(/\*(.+?)\*/g, '$1')
                .replace(/~~(.+?)~~/g, '$1')
                .replace(/`{3}[\s\S]*?`{3}/g, '')
                .replace(/`(.+?)`/g, '$1')
                .replace(/\[(.+?)\]\(.+?\)/g, '$1')
                .replace(/!\[.*?\]\(.+?\)/g, '')
                .replace(/^[-*+]\s+/gm, '• ')
                .replace(/^\d+\.\s+/gm, '')
                .replace(/^>\s+/gm, '')
                .trim();

            // Add frontmatter if enabled
            if (includeFrontmatter) {
                const frontmatter = `---\ntitle: ${title}\ndate: ${today}\n---\n\n`;
                plainText = frontmatter + plainText;
            }

            txtContent.textContent = plainText;
            txtContent.style.whiteSpace = wordWrap ? 'pre-wrap' : 'pre';
        }
    } else if (format === 'png') {
        document.getElementById('png-preview')?.classList.remove('hidden');
        const pngContent = document.getElementById('png-preview-content');
        const pngContainer = document.getElementById('png-container');
        const transparentBg = document.getElementById('export-transparent-bg')?.checked ?? false;
        const includeShadow = document.getElementById('export-include-shadow')?.checked ?? true;

        if (pngContent) {
            pngContent.innerHTML = `<div class="markdown-body">${content}</div>`;
        }

        // Apply styling to preview based on options
        if (pngContainer) {
            if (transparentBg) {
                pngContainer.style.background = 'repeating-conic-gradient(#e0e0e0 0% 25%, #ffffff 0% 50%) 50% / 20px 20px';
            } else {
                pngContainer.style.background = '#ffffff';
            }

            if (includeShadow) {
                pngContainer.style.boxShadow = '0 10px 40px rgba(0,0,0,0.15)';
            } else {
                pngContainer.style.boxShadow = 'none';
            }
        }
    } else if (format === 'markdown' || format === 'docx') {
        // Show PDF preview as placeholder
        document.getElementById('pdf-preview')?.classList.remove('hidden');
        const pageContent = document.getElementById('export-page-content');
        const pageFooter = document.querySelector('.page-footer');
        const pageHeader = document.querySelector('.page-header');

        if (pageContent) {
            pageContent.innerHTML = `<div class="markdown-body">${content}</div>`;
        }

        // Hide header/footer for markdown/docx preview
        if (pageFooter) pageFooter.style.display = 'none';
        if (pageHeader) pageHeader.style.display = 'none';
    }
};

let estimateFileSize = (format) => {
    const content = editor.getValue();
    const htmlContent = document.getElementById('output').innerHTML;
    let estimatedSize = 0;

    switch (format) {
        case 'markdown':
            estimatedSize = new Blob([content]).size;
            break;
        case 'txt':
            estimatedSize = new Blob([content]).size * 0.7;
            break;
        case 'html':
            estimatedSize = new Blob([htmlContent]).size + 5000; // CSS overhead
            break;
        case 'pdf':
            estimatedSize = new Blob([htmlContent]).size * 3; // PDF is larger
            break;
        case 'docx':
            estimatedSize = new Blob([htmlContent]).size * 1.5;
            break;
        case 'png':
            estimatedSize = new Blob([htmlContent]).size * 10; // Images are larger
            break;
        case 'print':
            estimatedSize = 0; // N/A for print
            break;
    }

    const sizeEl = document.getElementById('export-file-size');
    if (sizeEl) {
        if (format === 'print') {
            sizeEl.textContent = 'N/A';
        } else if (estimatedSize < 1024) {
            sizeEl.textContent = `${estimatedSize} B`;
        } else if (estimatedSize < 1024 * 1024) {
            sizeEl.textContent = `${(estimatedSize / 1024).toFixed(1)} KB`;
        } else {
            sizeEl.textContent = `${(estimatedSize / (1024 * 1024)).toFixed(1)} MB`;
        }
    }
};

let showExportLoading = (text = 'Generating your file...', progress = 30) => {
    const overlay = document.getElementById('export-loading-overlay');
    const textEl = document.getElementById('export-loading-text');
    const progressEl = document.getElementById('export-loading-progress-bar');

    if (overlay) overlay.classList.remove('hidden');
    if (textEl) textEl.textContent = text;
    if (progressEl) progressEl.style.width = `${progress}%`;
};

let updateExportProgress = (progress, text) => {
    const progressEl = document.getElementById('export-loading-progress-bar');
    const textEl = document.getElementById('export-loading-text');

    if (progressEl) progressEl.style.width = `${progress}%`;
    if (textEl && text) textEl.textContent = text;
};

let hideExportLoading = () => {
    const overlay = document.getElementById('export-loading-overlay');
    if (overlay) {
        // Small delay to show 100% progress
        updateExportProgress(100, 'Complete!');
        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 500);
    }
};

let executeExport = (format) => {
    switch (format) {
        case 'pdf':
            exportToPDFWithOptions();
            break;
        case 'html':
            exportToHTMLWithOptions();
            break;
        case 'markdown':
            downloadMarkdownWithOptions();
            break;
        case 'docx':
            exportToDOCXWithOptions();
            break;
        case 'txt':
            exportToTXTWithOptions();
            break;
        case 'png':
            exportToPNGWithOptions();
            break;
        case 'print':
            printDocumentWithOptions();
            break;
    }
};

// Enhanced export functions with options
let exportToPDFWithOptions = () => {
    const paperSize = document.getElementById('export-paper-size')?.value || 'letter';
    const orientation = document.getElementById('export-orientation')?.value || 'portrait';
    const pageNumbers = document.getElementById('export-page-numbers')?.checked ?? true;
    const headerFooter = document.getElementById('export-header-footer')?.checked ?? false;

    showExportLoading('Preparing PDF document...', 20);
    const element = document.querySelector('#output');
    const filename = getExportFilename('pdf');
    const title = getActiveDocTitle();
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

    const formatMap = {
        'a4': 'a4',
        'letter': 'letter',
        'legal': 'legal',
        'tabloid': [11, 17]
    };

    // Create a wrapper with header/footer if enabled
    const wrapper = document.createElement('div');
    wrapper.className = 'pdf-export-wrapper';

    if (headerFooter) {
        wrapper.innerHTML = `
            <style>
                .pdf-header { 
                    position: running(header);
                    font-size: 10pt;
                    color: #666;
                    border-bottom: 1px solid #ddd;
                    padding-bottom: 8px;
                    margin-bottom: 16px;
                }
                .pdf-footer {
                    position: running(footer);
                    font-size: 9pt;
                    color: #888;
                    text-align: center;
                    border-top: 1px solid #ddd;
                    padding-top: 8px;
                    margin-top: 16px;
                }
                @page {
                    @top-center { content: element(header); }
                    @bottom-center { content: element(footer); }
                }
            </style>
            <div class="pdf-header">${title}</div>
            ${element.innerHTML}
            <div class="pdf-footer">${today}</div>
        `;
    } else {
        wrapper.innerHTML = element.innerHTML;
    }

    const options = {
        margin: headerFooter ? [0.75, 0.5, 0.75, 0.5] : [0.5, 0.5, 0.5, 0.5],
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            logging: false,
            letterRendering: true,
            backgroundColor: '#ffffff'
        },
        jsPDF: {
            unit: 'in',
            format: formatMap[paperSize] || 'letter',
            orientation: orientation
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    // Add page numbers if enabled
    if (pageNumbers) {
        updateExportProgress(50, 'Rendering pages...');
        html2pdf().set(options).from(headerFooter ? wrapper : element).toPdf().get('pdf').then((pdf) => {
            updateExportProgress(80, 'Adding page numbers...');
            const totalPages = pdf.internal.getNumberOfPages();
            for (let i = 1; i <= totalPages; i++) {
                pdf.setPage(i);
                pdf.setFontSize(9);
                pdf.setTextColor(128);
                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                pdf.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 0.3, { align: 'center' });
            }
        }).save().then(() => {
            hideExportLoading();
            showToast(`PDF exported: ${filename}`, 'success');
        }).catch((err) => {
            console.error('PDF export error:', err);
            hideExportLoading();
            showToast('Failed to export PDF', 'error');
        });
    } else {
        updateExportProgress(60, 'Generating PDF file...');
        html2pdf().set(options).from(headerFooter ? wrapper : element).save().then(() => {
            hideExportLoading();
            showToast(`PDF exported: ${filename}`, 'success');
        }).catch((err) => {
            console.error('PDF export error:', err);
            hideExportLoading();
            showToast('Failed to export PDF', 'error');
        });
    }
};

let exportToHTMLWithOptions = () => {
    const theme = document.getElementById('export-html-theme')?.value || 'light';
    const includeCSS = document.getElementById('export-include-css')?.checked ?? true;
    const minify = document.getElementById('export-minify-html')?.checked ?? false;

    showExportLoading('Generating HTML file...', 40);
    const title = getActiveDocTitle();
    const filename = getExportFilename('html');
    const content = document.getElementById('output').innerHTML;

    let themeStyles = '';
    if (theme === 'dark') {
        themeStyles = `
            body { background: #0d1117; color: #c9d1d9; }
            .markdown-body { color: #c9d1d9; }
            .markdown-body h1, .markdown-body h2, .markdown-body h3 { color: #c9d1d9; border-color: #30363d; }
            .markdown-body code { background: #161b22; }
            .markdown-body pre { background: #161b22; }
        `;
    } else if (theme === 'system') {
        themeStyles = `
            @media (prefers-color-scheme: dark) {
                body { background: #0d1117; color: #c9d1d9; }
                .markdown-body { color: #c9d1d9; }
                .markdown-body h1, .markdown-body h2, .markdown-body h3 { color: #c9d1d9; border-color: #30363d; }
            }
        `;
    }

    let html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
${includeCSS ? `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.5.0/github-markdown.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css">` : ''}
<style>
body { background: #ffffff; color: #24292e; }
.markdown-body { box-sizing: border-box; min-width: 200px; max-width: 980px; margin: 0 auto; padding: 45px; }
@media (max-width: 767px) { .markdown-body { padding: 15px; } }
${themeStyles}
</style>
</head>
<body class="markdown-body">
${content}
</body>
</html>`;

    if (minify) {
        html = html.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();
    }

    updateExportProgress(80, 'Preparing download...');
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    hideExportLoading();
    showToast(`HTML exported: ${filename}`, 'success');
};

let exportToPNGWithOptions = () => {
    const widthInput = document.getElementById('export-image-width')?.value || '1200 px';
    const resolution = parseInt(document.getElementById('export-resolution')?.value || '2');
    const transparentBg = document.getElementById('export-transparent-bg')?.checked ?? false;
    const includeShadow = document.getElementById('export-include-shadow')?.checked ?? true;

    // Parse width value
    const width = parseInt(widthInput.replace(/[^0-9]/g, '')) || 1200;

    showExportLoading('Capturing document as image...', 30);
    const element = document.querySelector('#output');
    const filename = getExportFilename('png');

    // Create a wrapper for shadow effect if needed
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
        display: inline-block;
        background: ${transparentBg ? 'transparent' : '#ffffff'};
        ${includeShadow ? 'padding: 40px; box-shadow: 0 10px 40px rgba(0,0,0,0.2);' : ''}
        border-radius: ${includeShadow ? '8px' : '0'};
        width: ${width}px;
        overflow: hidden;
    `;

    // Clone content
    const clone = element.cloneNode(true);
    clone.style.width = '100%';
    clone.style.maxWidth = 'none';
    wrapper.appendChild(clone);

    // Append to body temporarily
    wrapper.style.position = 'absolute';
    wrapper.style.left = '-9999px';
    document.body.appendChild(wrapper);

    updateExportProgress(60, 'Rendering image canvas...');
    html2canvas(wrapper, {
        scale: resolution,
        useCORS: true,
        logging: false,
        backgroundColor: transparentBg ? null : (includeShadow ? '#f5f5f5' : '#ffffff'),
        width: includeShadow ? width + 80 : width,
        windowWidth: width + (includeShadow ? 80 : 0)
    }).then(canvas => {
        updateExportProgress(90, 'Finalizing image...');
        // Remove wrapper
        document.body.removeChild(wrapper);

        const link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL('image/png');
        link.click();
        hideExportLoading();
        showToast(`Image exported: ${filename}`, 'success');
    }).catch((err) => {
        document.body.removeChild(wrapper);
        console.error('PNG export error:', err);
        hideExportLoading();
        showToast('Failed to export image', 'error');
    });
};

let printDocumentWithOptions = () => {
    const paperSize = document.getElementById('print-paper-size')?.value || 'a4';
    const orientation = document.getElementById('print-orientation')?.value || 'portrait';
    const margins = document.getElementById('print-margins')?.value || 'default';
    const scale = document.getElementById('print-scale')?.value || '100';

    showExportLoading('Preparing print dialog...', 50);
    const content = document.getElementById('output').innerHTML;
    const title = getActiveDocTitle();

    const marginMap = {
        'default': '20mm',
        'none': '0',
        'narrow': '10mm',
        'moderate': '15mm'
    };

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${title}</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.5.0/github-markdown.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css">
            <style>
                @page {
                    size: ${paperSize} ${orientation};
                    margin: ${marginMap[margins]};
                }
                body { 
                    padding: 20px; 
                    transform: scale(${parseInt(scale) / 100});
                    transform-origin: top left;
                }
                .markdown-body { max-width: 800px; margin: 0 auto; }
                @media print {
                    body { padding: 0; transform: none; }
                    .markdown-body { max-width: none; }
                }
                pre, code { background: #f6f8fa; }
                pre { padding: 16px; border-radius: 6px; overflow-x: auto; }
                table { border-collapse: collapse; width: 100%; }
                th, td { border: 1px solid #d0d7de; padding: 8px 12px; }
                th { background: #f6f8fa; }
                blockquote { border-left: 4px solid #d0d7de; padding-left: 16px; margin-left: 0; color: #656d76; }
                img { max-width: 100%; height: auto; }
            </style>
        </head>
        <body class="markdown-body">
            ${content}
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
        hideExportLoading();
    }, 500);
    showToast('Print dialog opened', 'info');
};

// Download Markdown with options
let downloadMarkdownWithOptions = () => {
    showExportLoading('Preparing Markdown file...', 50);
    const content = editor.getValue();
    const filename = getExportFilename('md');
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    hideExportLoading();
    showToast(`Markdown downloaded: ${filename}`, 'success');
};

// Export DOCX with options
let exportToDOCXWithOptions = () => {
    const title = getActiveDocTitle();
    const filename = getExportFilename('doc');
    const content = document.getElementById('output').innerHTML;

    showExportLoading('Generating Word document...', 40);

    const html = `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset='utf-8'>
<title>${title}</title>
<!--[if gte mso 9]>
<xml>
<w:WordDocument>
<w:View>Print</w:View>
<w:Zoom>100</w:Zoom>
<w:DoNotOptimizeForBrowser/>
</w:WordDocument>
</xml>
<![endif]-->
<style>
    @page { 
        size: letter;
        margin: 1in;
    }
    body { 
        font-family: 'Calibri', 'Arial', sans-serif; 
        font-size: 11pt; 
        line-height: 1.6; 
        color: #333;
    }
    h1 { font-size: 26pt; color: #1a1a1a; margin-top: 24pt; margin-bottom: 12pt; font-weight: 600; }
    h2 { font-size: 20pt; color: #333; margin-top: 20pt; margin-bottom: 10pt; font-weight: 600; }
    h3 { font-size: 14pt; color: #444; margin-top: 16pt; margin-bottom: 8pt; font-weight: 600; }
    h4, h5, h6 { font-size: 12pt; color: #555; margin-top: 12pt; margin-bottom: 6pt; font-weight: 600; }
    p { margin: 0 0 12pt 0; }
    pre, code { 
        font-family: 'Consolas', 'Courier New', monospace; 
        background: #f5f5f5; 
        padding: 2pt 4pt;
        font-size: 10pt;
    }
    pre { 
        padding: 10pt; 
        border: 1pt solid #ddd; 
        border-radius: 4pt;
        white-space: pre-wrap;
        margin: 12pt 0;
    }
    table { 
        border-collapse: collapse; 
        width: 100%; 
        margin: 12pt 0;
    }
    th, td { 
        border: 1pt solid #bbb; 
        padding: 8pt 10pt; 
        text-align: left;
    }
    th { background: #f0f0f0; font-weight: 600; }
    blockquote { 
        border-left: 3pt solid #ccc; 
        padding-left: 12pt; 
        margin: 12pt 0 12pt 0;
        color: #666; 
        font-style: italic;
    }
    ul, ol { margin: 6pt 0 12pt 24pt; padding: 0; }
    li { margin: 4pt 0; }
    a { color: #0366d6; text-decoration: underline; }
    hr { border: none; border-top: 1pt solid #ddd; margin: 24pt 0; }
    img { max-width: 100%; height: auto; }
</style>
</head>
<body>
${content}
</body>
</html>`;

    const blob = new Blob([html], { type: 'application/msword' });
    updateExportProgress(80, 'Preparing download...');
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    hideExportLoading();
    showToast(`DOCX exported: ${filename}`, 'success');
};

// Export TXT with options
let exportToTXTWithOptions = () => {
    const wordWrap = document.getElementById('export-word-wrap')?.checked ?? true;
    const includeFrontmatter = document.getElementById('export-frontmatter')?.checked ?? false;

    showExportLoading('Converting to plain text...', 40);
    const content = editor.getValue();
    const title = getActiveDocTitle();
    const today = new Date().toISOString().split('T')[0];

    // Strip markdown syntax for plain text
    let plainText = content
        .replace(/^#{1,6}\s+(.+)/gm, (match, p1) => p1.toUpperCase())  // Convert headings to uppercase
        .replace(/\*\*(.+?)\*\*/g, '$1')  // Remove bold
        .replace(/\*(.+?)\*/g, '$1')  // Remove italic
        .replace(/~~(.+?)~~/g, '$1')  // Remove strikethrough
        .replace(/`{3}(\w*)\n([\s\S]*?)`{3}/g, (match, lang, code) => `[CODE${lang ? `: ${lang}` : ''}]\n${code}\n[/CODE]`)  // Mark code blocks
        .replace(/`(.+?)`/g, '"$1"')  // Convert inline code to quotes
        .replace(/\[(.+?)\]\((.+?)\)/g, '$1 ($2)')  // Convert links to text (URL)
        .replace(/!\[(.+?)\]\(.+?\)/g, '[Image: $1]')  // Convert images to placeholder
        .replace(/^[-*+]\s+/gm, '  • ')  // Convert bullets with indent
        .replace(/^\d+\.\s+/gm, '  ')  // Convert numbered lists
        .replace(/^>\s+/gm, '    ')  // Convert blockquotes to indent
        .replace(/^---+$/gm, '\n' + '─'.repeat(50) + '\n')  // Convert horizontal rules
        .replace(/\|(.+)\|/g, (match) => {
            // Convert table rows
            return match.replace(/\|/g, ' | ').replace(/^\s*\|\s*/, '').replace(/\s*\|\s*$/, '');
        })
        .trim();

    // Apply word wrap if enabled
    if (wordWrap) {
        const lines = plainText.split('\n');
        plainText = lines.map(line => {
            if (line.length <= 80) return line;
            const words = line.split(' ');
            let result = '';
            let currentLine = '';
            words.forEach(word => {
                if ((currentLine + ' ' + word).trim().length > 80) {
                    result += currentLine.trim() + '\n';
                    currentLine = word;
                } else {
                    currentLine += ' ' + word;
                }
            });
            result += currentLine.trim();
            return result;
        }).join('\n');
    }

    // Add frontmatter if enabled
    if (includeFrontmatter) {
        const wordCount = plainText.split(/\s+/).filter(w => w.length > 0).length;
        const frontmatter = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Document: ${title}
Date: ${today}
Words: ${wordCount}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

`;
        plainText = frontmatter + plainText;
    }

    const filename = getExportFilename('txt');
    updateExportProgress(80, 'Preparing download...');
    const blob = new Blob([plainText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    hideExportLoading();
    showToast(`Text exported: ${filename}`, 'success');
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

// Settings state storage
const SETTINGS_STORAGE_KEY = 'markdown_editor_settings';

let loadSettings = () => {
    try {
        const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
        return saved ? JSON.parse(saved) : getDefaultSettings();
    } catch {
        return getDefaultSettings();
    }
};

let getDefaultSettings = () => ({
    general: {
        darkMode: false,
        autoSave: true,
        scrollSync: true
    },
    editor: {
        fontFamily: 'JetBrains Mono',
        fontSize: 14,
        lineHeight: 1.6,
        tabSize: 2,
        wordWrap: true,
        lineNumbers: true,
        minimap: false,
        bracketMatching: true
    },
    preview: {
        livePreview: true,
        syntaxHighlight: true,
        mathRendering: true,
        mermaid: true
    },
    theme: 'vs-dark'
});

let saveSettings = (settings) => {
    try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
        console.error('Failed to save settings:', e);
    }
};

let currentSettings = loadSettings();

let setupSettingsModal = () => {
    const settingsBtn = document.querySelector('#settings-btn');
    const modal = document.querySelector('#settings-modal');
    const overlay = document.querySelector('#settings-modal-overlay');
    const closeBtn = document.querySelector('#settings-close');
    const saveBtn = document.querySelector('#settings-save-btn');
    const resetBtn = document.querySelector('#settings-reset-btn');

    // Tab navigation
    const navItems = document.querySelectorAll('.settings-nav-item');
    const tabPanels = document.querySelectorAll('.settings-tab-panel');

    // Panel titles and descriptions
    const panelInfo = {
        general: { title: 'General Settings', desc: 'Configure your general preferences and application behavior.' },
        editor: { title: 'Editor Settings', desc: 'Customize the code editor appearance and behavior.' },
        preview: { title: 'Preview Settings', desc: 'Configure the markdown preview options.' },
        themes: { title: 'Themes', desc: 'Choose your preferred color theme for the editor.' },
        keyboard: { title: 'Keyboard Shortcuts', desc: 'View and customize keyboard shortcuts.' },
        about: { title: 'About', desc: 'Information about Markdown Live Preview.' }
    };

    // Open modal
    if (settingsBtn && modal) {
        settingsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openSettingsModal();
        });
    }

    let openSettingsModal = () => {
        modal.classList.add('active');
        overlay.classList.add('active');
        loadSettingsUI();
    };

    let closeSettingsModal = () => {
        modal.classList.remove('active');
        overlay.classList.remove('active');
    };

    // Close handlers
    if (closeBtn) {
        closeBtn.addEventListener('click', closeSettingsModal);
    }

    if (overlay) {
        overlay.addEventListener('click', closeSettingsModal);
    }

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeSettingsModal();
        }
    });

    // Tab switching
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabName = item.dataset.tab;

            // Update nav active state
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');

            // Update panel visibility
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `settings-tab-${tabName}`) {
                    panel.classList.add('active');
                }
            });

            // Update header
            const titleEl = document.getElementById('settings-panel-title');
            const descEl = document.getElementById('settings-panel-description');
            if (titleEl && panelInfo[tabName]) {
                titleEl.textContent = panelInfo[tabName].title;
            }
            if (descEl && panelInfo[tabName]) {
                descEl.textContent = panelInfo[tabName].desc;
            }
        });
    });

    // Load settings into UI
    let loadSettingsUI = () => {
        // General
        setCheckbox('dark-mode-checkbox', document.body.classList.contains('dark-mode'));
        setCheckbox('auto-save-checkbox', currentSettings.general.autoSave);
        setCheckbox('sync-scroll-checkbox', currentSettings.general.scrollSync);

        // Editor
        setDropdown('font-family-dropdown', currentSettings.editor.fontFamily);
        setDropdown('font-size-dropdown', currentSettings.editor.fontSize);
        setDropdown('line-height-dropdown', currentSettings.editor.lineHeight);
        setDropdown('tab-size-dropdown', currentSettings.editor.tabSize);
        setCheckbox('word-wrap-checkbox', currentSettings.editor.wordWrap);
        setCheckbox('line-numbers-checkbox', currentSettings.editor.lineNumbers);
        setCheckbox('minimap-checkbox', currentSettings.editor.minimap);
        setCheckbox('bracket-matching-checkbox', currentSettings.editor.bracketMatching);

        // Preview
        setCheckbox('live-preview-checkbox', currentSettings.preview.livePreview);
        setCheckbox('syntax-highlight-checkbox', currentSettings.preview.syntaxHighlight);
        setCheckbox('math-rendering-checkbox', currentSettings.preview.mathRendering);
        setCheckbox('mermaid-checkbox', currentSettings.preview.mermaid);

        // Theme
        const themeRadios = document.querySelectorAll('input[name="editor-theme"]');
        themeRadios.forEach(radio => {
            radio.checked = (radio.value === currentSettings.theme);
        });
    };

    let setCheckbox = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.checked = value;
    };

    let setDropdown = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.value = value;
    };

    // Setup all settings event listeners
    setupGeneralSettings();
    setupEditorSettings();
    setupPreviewSettings();
    setupThemeSettings();
    setupKeyboardSearch();

    // Save button
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            saveSettings(currentSettings);
            showToast('Settings saved successfully!', 'success', 2000);
            closeSettingsModal();
        });
    }

    // Reset button
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all settings to defaults?')) {
                currentSettings = getDefaultSettings();
                applyAllSettings();
                loadSettingsUI();
                saveSettings(currentSettings);
                showToast('Settings reset to defaults', 'info', 2000);
            }
        });
    }
};

let setupGeneralSettings = () => {
    // Dark mode toggle
    const darkModeCheckbox = document.getElementById('dark-mode-checkbox');
    if (darkModeCheckbox) {
        darkModeCheckbox.addEventListener('change', (e) => {
            currentSettings.general.darkMode = e.target.checked;
            toggleDarkMode(e.target.checked);
        });
    }

    // Auto save toggle
    const autoSaveCheckbox = document.getElementById('auto-save-checkbox');
    if (autoSaveCheckbox) {
        autoSaveCheckbox.addEventListener('change', (e) => {
            currentSettings.general.autoSave = e.target.checked;
            showToast(e.target.checked ? 'Auto save enabled' : 'Auto save disabled', 'info', 1500);
        });
    }

    // Scroll sync toggle
    const syncScrollCheckbox = document.getElementById('sync-scroll-checkbox');
    if (syncScrollCheckbox) {
        syncScrollCheckbox.addEventListener('change', (e) => {
            currentSettings.general.scrollSync = e.target.checked;
            showToast(e.target.checked ? 'Scroll sync enabled' : 'Scroll sync disabled', 'info', 1500);
        });
    }
};

let setupEditorSettings = () => {
    // Font family
    const fontFamilyDropdown = document.getElementById('font-family-dropdown');
    if (fontFamilyDropdown) {
        fontFamilyDropdown.addEventListener('change', (e) => {
            currentSettings.editor.fontFamily = e.target.value;
            editor.updateOptions({ fontFamily: e.target.value });
            showToast(`Font: ${e.target.value}`, 'info', 1500);
        });
    }

    // Font size
    const fontSizeDropdown = document.getElementById('font-size-dropdown');
    if (fontSizeDropdown) {
        fontSizeDropdown.addEventListener('change', (e) => {
            const size = parseInt(e.target.value);
            currentSettings.editor.fontSize = size;
            editor.updateOptions({ fontSize: size });
            showToast(`Font size: ${size}px`, 'info', 1500);
        });
    }

    // Line height
    const lineHeightDropdown = document.getElementById('line-height-dropdown');
    if (lineHeightDropdown) {
        lineHeightDropdown.addEventListener('change', (e) => {
            const height = parseFloat(e.target.value);
            currentSettings.editor.lineHeight = height;
            editor.updateOptions({ lineHeight: height * 14 }); // Monaco uses pixels
            showToast(`Line height: ${height}`, 'info', 1500);
        });
    }

    // Tab size
    const tabSizeDropdown = document.getElementById('tab-size-dropdown');
    if (tabSizeDropdown) {
        tabSizeDropdown.addEventListener('change', (e) => {
            const size = parseInt(e.target.value);
            currentSettings.editor.tabSize = size;
            editor.updateOptions({ tabSize: size });
            showToast(`Tab size: ${size} spaces`, 'info', 1500);
        });
    }

    // Word wrap
    const wordWrapCheckbox = document.getElementById('word-wrap-checkbox');
    if (wordWrapCheckbox) {
        wordWrapCheckbox.addEventListener('change', (e) => {
            currentSettings.editor.wordWrap = e.target.checked;
            editor.updateOptions({ wordWrap: e.target.checked ? 'on' : 'off' });
            showToast(e.target.checked ? 'Word wrap enabled' : 'Word wrap disabled', 'info', 1500);
        });
    }

    // Line numbers
    const lineNumbersCheckbox = document.getElementById('line-numbers-checkbox');
    if (lineNumbersCheckbox) {
        lineNumbersCheckbox.addEventListener('change', (e) => {
            currentSettings.editor.lineNumbers = e.target.checked;
            editor.updateOptions({ lineNumbers: e.target.checked ? 'on' : 'off' });
            showToast(e.target.checked ? 'Line numbers enabled' : 'Line numbers disabled', 'info', 1500);
        });
    }

    // Minimap
    const minimapCheckbox = document.getElementById('minimap-checkbox');
    if (minimapCheckbox) {
        minimapCheckbox.addEventListener('change', (e) => {
            currentSettings.editor.minimap = e.target.checked;
            editor.updateOptions({ minimap: { enabled: e.target.checked } });
            showToast(e.target.checked ? 'Minimap enabled' : 'Minimap disabled', 'info', 1500);
        });
    }

    // Bracket matching
    const bracketMatchingCheckbox = document.getElementById('bracket-matching-checkbox');
    if (bracketMatchingCheckbox) {
        bracketMatchingCheckbox.addEventListener('change', (e) => {
            currentSettings.editor.bracketMatching = e.target.checked;
            editor.updateOptions({ matchBrackets: e.target.checked ? 'always' : 'never' });
            showToast(e.target.checked ? 'Bracket matching enabled' : 'Bracket matching disabled', 'info', 1500);
        });
    }
};

let setupPreviewSettings = () => {
    // Live preview
    const livePreviewCheckbox = document.getElementById('live-preview-checkbox');
    if (livePreviewCheckbox) {
        livePreviewCheckbox.addEventListener('change', (e) => {
            currentSettings.preview.livePreview = e.target.checked;
            showToast(e.target.checked ? 'Live preview enabled' : 'Live preview disabled', 'info', 1500);
        });
    }

    // Syntax highlighting
    const syntaxHighlightCheckbox = document.getElementById('syntax-highlight-checkbox');
    if (syntaxHighlightCheckbox) {
        syntaxHighlightCheckbox.addEventListener('change', (e) => {
            currentSettings.preview.syntaxHighlight = e.target.checked;
            updatePreview();
            showToast(e.target.checked ? 'Syntax highlighting enabled' : 'Syntax highlighting disabled', 'info', 1500);
        });
    }

    // Math rendering
    const mathRenderingCheckbox = document.getElementById('math-rendering-checkbox');
    if (mathRenderingCheckbox) {
        mathRenderingCheckbox.addEventListener('change', (e) => {
            currentSettings.preview.mathRendering = e.target.checked;
            updatePreview();
            showToast(e.target.checked ? 'Math rendering enabled' : 'Math rendering disabled', 'info', 1500);
        });
    }

    // Mermaid diagrams
    const mermaidCheckbox = document.getElementById('mermaid-checkbox');
    if (mermaidCheckbox) {
        mermaidCheckbox.addEventListener('change', (e) => {
            currentSettings.preview.mermaid = e.target.checked;
            updatePreview();
            showToast(e.target.checked ? 'Mermaid diagrams enabled' : 'Mermaid diagrams disabled', 'info', 1500);
        });
    }
};

let setupThemeSettings = () => {
    const themeRadios = document.querySelectorAll('input[name="editor-theme"]');
    themeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.checked) {
                const theme = e.target.value;
                currentSettings.theme = theme;
                currentTheme = theme;
                applyTheme(theme);
                saveThemeSettings(theme);
                showToast(`Theme: ${getThemeName(theme)}`, 'success', 2000);
            }
        });
    });
};

let setupKeyboardSearch = () => {
    const searchInput = document.getElementById('shortcuts-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const shortcutItems = document.querySelectorAll('.shortcut-item');

            shortcutItems.forEach(item => {
                const action = item.querySelector('.shortcut-action');
                if (action) {
                    const text = action.textContent.toLowerCase();
                    item.style.display = text.includes(query) ? 'flex' : 'none';
                }
            });
        });
    }
};

let applyAllSettings = () => {
    // Apply dark mode
    toggleDarkMode(currentSettings.general.darkMode);

    // Apply editor settings
    if (editor) {
        editor.updateOptions({
            fontFamily: currentSettings.editor.fontFamily,
            fontSize: currentSettings.editor.fontSize,
            lineHeight: currentSettings.editor.lineHeight * 14,
            tabSize: currentSettings.editor.tabSize,
            wordWrap: currentSettings.editor.wordWrap ? 'on' : 'off',
            lineNumbers: currentSettings.editor.lineNumbers ? 'on' : 'off',
            minimap: { enabled: currentSettings.editor.minimap },
            matchBrackets: currentSettings.editor.bracketMatching ? 'always' : 'never'
        });
    }

    // Apply theme
    currentTheme = currentSettings.theme;
    applyTheme(currentSettings.theme);

    // Update preview
    updatePreview();
};

// ----- theme switching -----

let initThemeSelector = (savedTheme) => {
    const themeRadios = document.querySelectorAll('input[name="editor-theme"]');

    // Check for system preference if no saved theme
    if (!savedTheme) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        savedTheme = prefersDark ? 'vs-dark' : 'vs';
    }

    currentTheme = savedTheme;
    currentSettings.theme = savedTheme;

    // Set the correct radio button
    themeRadios.forEach(radio => {
        radio.checked = (radio.value === currentTheme);
    });

    applyTheme(currentTheme);

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only auto-switch if user hasn't explicitly set a theme
        const userTheme = loadThemeSettings();
        if (!userTheme) {
            const newTheme = e.matches ? 'vs-dark' : 'vs';
            currentTheme = newTheme;
            currentSettings.theme = newTheme;
            themeRadios.forEach(radio => {
                radio.checked = (radio.value === newTheme);
            });
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
    const btn = document.querySelector("#reset-button");
    if (btn) {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            reset();
        });
    }
};

let setupCopyButton = (editor) => {
    const btn = document.querySelector("#copy-button");
    if (btn) {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            let value = editor.getValue();
            copyToClipboard(value, () => {
                notifyCopied();
            },
                () => {
                    // nothing to do
                });
        });
    }
};

let setupCopyHTMLButton = () => {
    const btn = document.querySelector("#copy-html-button");
    if (btn) {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            copyHTMLToClipboard();
        });
    }
};

let setupDownloadButton = () => {
    const btn = document.querySelector("#download-md-button");
    if (btn) {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            downloadMarkdown();
        });
    }
};

let setupExportPDFButton = () => {
    const btn = document.querySelector("#export-pdf-button");
    if (btn) {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            exportToPDF();
        });
    }
};

let setupImportButton = () => {
    const btn = document.querySelector("#import-button");
    if (btn) {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            importFile();
        });
    }

    const fileInput = document.querySelector("#file-input");
    if (fileInput) {
        fileInput.addEventListener('change', handleFileImport);
    }
};

let setupHelpButton = () => {
    const modal = document.querySelector("#help-modal");
    const overlay = document.querySelector("#help-modal-overlay");
    const helpBtn = document.querySelector("#help-button");
    const closeBtns = modal?.querySelectorAll(".close-modal");

    const openModal = () => {
        if (modal) modal.style.display = "block";
        if (overlay) overlay.style.display = "block";
    };

    const closeModal = () => {
        if (modal) modal.style.display = "none";
        if (overlay) overlay.style.display = "none";
    };

    if (helpBtn) {
        helpBtn.addEventListener('click', (event) => {
            event.preventDefault();
            openModal();
        });
    }

    // All close buttons in modal
    closeBtns?.forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModal);
    });

    // Click overlay to close
    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }

    // Click outside modal to close
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
};

// TOC toggle button (now controls doc-outline)
let setupTOCButton = () => {
    const tocBtn = document.querySelector("#toc-button");
    const docOutline = document.querySelector("#doc-outline");
    const outlineClose = document.querySelector("#outline-close");
    const tocSidebar = document.querySelector("#toc-sidebar");

    if (tocBtn && docOutline) {
        tocBtn.addEventListener('click', (event) => {
            event.preventDefault();
            docOutline.classList.toggle('visible');
            tocBtn.classList.toggle('active');

            // Also toggle right TOC sidebar visibility
            if (tocSidebar) {
                if (docOutline.classList.contains('visible')) {
                    // When showing outline, also show right sidebar if it was hidden
                    tocSidebar.classList.remove('hidden');
                }
            }

            showToast(docOutline.classList.contains('visible') ? 'Outline shown' : 'Outline hidden', 'info', 1500);
        });
    }

    // Close button inside outline
    if (outlineClose && docOutline) {
        outlineClose.addEventListener('click', () => {
            docOutline.classList.remove('visible');
            tocBtn?.classList.remove('active');
        });
    }

    // Close button for right TOC sidebar
    const tocCloseBtn = document.querySelector("#toc-close-btn");

    if (tocCloseBtn && tocSidebar) {
        tocCloseBtn.addEventListener('click', () => {
            tocSidebar.classList.remove('visible');
            tocSidebar.classList.add('hidden');
            // Also hide mobile overlay
            const mobileOverlay = document.querySelector('#mobile-toc-overlay');
            if (mobileOverlay) mobileOverlay.classList.remove('active');
            showToast('Table of contents hidden. Click Toggle Outline to show again.', 'info', 2500);
        });
    }

    // Floating TOC button for mobile
    const floatingTocBtn = document.querySelector('#floating-toc-btn');
    const mobileOverlay = document.querySelector('#mobile-toc-overlay');

    if (floatingTocBtn && tocSidebar) {
        floatingTocBtn.addEventListener('click', () => {
            const isVisible = tocSidebar.classList.contains('visible');

            if (isVisible) {
                tocSidebar.classList.remove('visible');
                tocSidebar.classList.add('hidden');
                if (mobileOverlay) mobileOverlay.classList.remove('active');
            } else {
                tocSidebar.classList.add('visible');
                tocSidebar.classList.remove('hidden');
                if (mobileOverlay) mobileOverlay.classList.add('active');
            }
        });
    }

    // Close TOC when clicking overlay
    if (mobileOverlay && tocSidebar) {
        mobileOverlay.addEventListener('click', () => {
            tocSidebar.classList.remove('visible');
            tocSidebar.classList.add('hidden');
            mobileOverlay.classList.remove('active');
        });
    }
};

// Scroll Sync toggle button
let setupScrollSyncButton = () => {
    const scrollSyncBtn = document.querySelector("#scroll-sync-button");
    const syncScrollCheckbox = document.querySelector('#sync-scroll-checkbox');

    if (scrollSyncBtn) {
        // Set initial state
        if (scrollBarSync) {
            scrollSyncBtn.classList.add('active');
        }

        scrollSyncBtn.addEventListener('click', (event) => {
            event.preventDefault();
            scrollBarSync = !scrollBarSync;
            scrollSyncBtn.classList.toggle('active', scrollBarSync);

            // Sync with checkbox if exists
            if (syncScrollCheckbox) {
                syncScrollCheckbox.checked = scrollBarSync;
            }

            saveScrollBarSettings(scrollBarSync);
            showToast(scrollBarSync ? 'Scroll sync enabled' : 'Scroll sync disabled', 'info', 1500);
        });
    }
};

// ----- Focus Mode -----

// ----- View Mode -----

let setViewMode = (mode) => {
    // Use the actual pane elements (same IDs as setupDivider uses)
    const leftPane = document.getElementById('edit');      // .editor-pane
    const rightPane = document.getElementById('preview');  // .preview-pane
    const divider = document.getElementById('split-divider');
    const tocSidebar = document.querySelector('.right-toc-sidebar');
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

    // Update body class for CSS styling
    document.body.classList.remove('view-editor', 'view-split', 'view-preview');

    // Reset ALL inline styles first (including flex from divider resizing)
    if (leftPane) {
        leftPane.style.display = '';
        leftPane.style.width = '';
        leftPane.style.flex = '';
    }
    if (rightPane) {
        rightPane.style.display = '';
        rightPane.style.width = '';
        rightPane.style.flex = '';
    }
    if (divider) divider.style.display = '';
    if (tocSidebar) tocSidebar.style.display = '';

    if (mode === 'code') {
        document.body.classList.add('view-editor');
        // Editor only - full width, hide preview and divider
        if (rightPane) rightPane.style.display = 'none';
        if (divider) divider.style.display = 'none';
        if (tocSidebar) tocSidebar.style.display = 'none';
    } else if (mode === 'preview') {
        document.body.classList.add('view-preview');
        // Preview only - full width, hide editor and divider
        if (leftPane) leftPane.style.display = 'none';
        if (divider) divider.style.display = 'none';
        // TOC sidebar stays visible in preview mode
    } else {
        document.body.classList.add('view-split');
        // Split view - let CSS handle 50/50 with flex: 1
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
    const floatingEditBtn = document.getElementById('floating-edit-btn');

    if (btnCode) btnCode.addEventListener('click', () => setViewMode('code'));
    if (btnSplit) btnSplit.addEventListener('click', () => setViewMode('split'));
    if (btnPreview) btnPreview.addEventListener('click', () => setViewMode('preview'));

    // Floating edit button - switches to split mode
    if (floatingEditBtn) {
        floatingEditBtn.addEventListener('click', () => {
            setViewMode('split');
        });
    }
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
        // Ctrl/Cmd + Shift + P: Print document
        else if (ctrlKey && event.shiftKey && event.key === 'p') {
            event.preventDefault();
            printDocument();
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
        // Ctrl/Cmd + Shift + E: Open Export Modal
        else if (ctrlKey && event.shiftKey && event.key === 'E') {
            event.preventDefault();
            openExportModal();
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
    const outline = document.getElementById('doc-outline');

    if (!divider || !leftPane || !rightPane || !container) return;

    let isDragging = false;

    // Helper to calculate available width (excluding outline sidebar)
    const getAvailableWidth = () => {
        const containerRect = container.getBoundingClientRect();
        const outlineWidth = outline && outline.classList.contains('visible') ? outline.offsetWidth : 0;
        const dividerWidth = divider.offsetWidth || 8;
        return containerRect.width - outlineWidth - dividerWidth;
    };

    // Helper to get outline offset
    const getOutlineOffset = () => {
        return outline && outline.classList.contains('visible') ? outline.offsetWidth : 0;
    };

    divider.addEventListener('mouseenter', () => {
        divider.classList.add('hover');
    });

    divider.addEventListener('mouseleave', () => {
        if (!isDragging) {
            divider.classList.remove('hover');
        }
    });

    divider.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isDragging = true;
        divider.classList.add('active');
        document.body.style.cursor = 'col-resize';
        document.body.classList.add('resizing');
    });

    divider.addEventListener('dblclick', () => {
        // Reset to 50/50 split
        const availableWidth = getAvailableWidth();
        const halfWidth = availableWidth / 2;
        leftPane.style.flex = 'none';
        rightPane.style.flex = 'none';
        leftPane.style.width = halfWidth + 'px';
        rightPane.style.width = halfWidth + 'px';
        lastLeftRatio = 0.5;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();

        const containerRect = container.getBoundingClientRect();
        const outlineOffset = getOutlineOffset();
        const dividerWidth = divider.offsetWidth || 8;

        // Calculate mouse position relative to available space
        const offsetX = e.clientX - containerRect.left - outlineOffset;
        const availableWidth = getAvailableWidth();

        // Set min/max widths
        const minWidth = 200;
        const maxWidth = availableWidth - minWidth;

        let leftWidth = Math.max(minWidth, Math.min(offsetX, maxWidth));
        let rightWidth = availableWidth - leftWidth;

        // Set flex to none and use explicit widths
        leftPane.style.flex = 'none';
        rightPane.style.flex = 'none';
        leftPane.style.width = leftWidth + 'px';
        rightPane.style.width = rightWidth + 'px';

        lastLeftRatio = leftWidth / availableWidth;
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            divider.classList.remove('active');
            divider.classList.remove('hover');
            document.body.style.cursor = 'default';
            document.body.classList.remove('resizing');
        }
    });

    window.addEventListener('resize', () => {
        if (isDragging) return; // Don't resize during drag
        // Only resize in split mode
        if (!document.body.classList.contains('view-split')) return;

        const availableWidth = getAvailableWidth();
        if (availableWidth <= 0) return;

        const newLeft = availableWidth * lastLeftRatio;
        const newRight = availableWidth * (1 - lastLeftRatio);

        leftPane.style.flex = 'none';
        rightPane.style.flex = 'none';
        leftPane.style.width = newLeft + 'px';
        rightPane.style.width = newRight + 'px';
    });

    // Initialize with 50/50 split - only if in split mode
    setTimeout(() => {
        // Only set dimensions if in split mode
        if (!document.body.classList.contains('view-split')) return;

        const availableWidth = getAvailableWidth();
        if (availableWidth > 0) {
            const halfWidth = availableWidth / 2;
            leftPane.style.flex = 'none';
            rightPane.style.flex = 'none';
            leftPane.style.width = halfWidth + 'px';
            rightPane.style.width = halfWidth + 'px';
        }
    }, 100);
};

// ----- Global Escape Key Handler -----
let setupGlobalEscapeKey = () => {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            let closed = false;

            // Close all modals
            const modals = [
                { modal: '#stats-modal', overlay: '#stats-modal-overlay' },
                { modal: '#help-modal', overlay: '#help-modal-overlay' },
                { modal: '#goals-modal', overlay: '#goals-modal-overlay' },
                { modal: '#templates-modal', overlay: '#templates-modal-overlay' },
                { modal: '#settings-modal', overlay: '#settings-modal-overlay' }
            ];

            modals.forEach(({ modal, overlay }) => {
                const modalEl = document.querySelector(modal);
                const overlayEl = document.querySelector(overlay);
                if (modalEl && modalEl.style.display === 'block') {
                    modalEl.style.display = 'none';
                    if (overlayEl) overlayEl.style.display = 'none';
                    closed = true;
                }
            });

            // Close floating panels
            const panels = ['#lint-panel', '#toc-panel', '#snippets-dropdown'];
            panels.forEach(panelId => {
                const panel = document.querySelector(panelId);
                if (panel && !panel.classList.contains('hidden')) {
                    panel.classList.add('hidden');
                    // Also update button active state
                    if (panelId === '#lint-panel') {
                        document.querySelector('#lint-button')?.classList.remove('active');
                    }
                    closed = true;
                }
            });

            // Close search overlay
            const searchOverlay = document.querySelector('#search-overlay');
            if (searchOverlay && !searchOverlay.classList.contains('hidden')) {
                searchOverlay.classList.add('hidden');
                closed = true;
            }

            // Close mobile drawer
            const mobileDrawer = document.querySelector('#mobile-nav-drawer');
            const mobileOverlay = document.querySelector('#mobile-nav-overlay');
            if (mobileDrawer && mobileDrawer.classList.contains('open')) {
                mobileDrawer.classList.remove('open');
                mobileOverlay?.classList.remove('active');
                closed = true;
            }

            // Close export dropdown
            const exportDropdown = document.querySelector('#export-dropdown-wrapper');
            if (exportDropdown?.classList.contains('open')) {
                exportDropdown.classList.remove('open');
                closed = true;
            }

            if (closed) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
    });
};

// ----- entry point -----
const initializeApp = () => {
    // Define custom Monaco themes first
    defineCustomThemes();

    let lastContent = loadLastContent();
    editor = setupEditor();
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
    setupScrollSyncButton();
    setupFocusMode();
    setupTypewriterButton();
    setupFullscreenButton();
    setupViewButtons(); initTabs(); setupSearch(); setupLinter(); setupGoals();
    setupKeyboardShortcuts();
    setupGlobalEscapeKey();

    let scrollBarSettings = loadScrollBarSettings() || false;
    initScrollBarSync(scrollBarSettings);

    let themeSettings = loadThemeSettings() || 'vs';
    initThemeSelector(themeSettings);

    let darkModeSettings = loadDarkModeSettings() || false;
    initDarkMode(darkModeSettings);

    setupSettingsModal();
    setupDivider();
    setupMobileUI();
    setupExportModal();

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
    initializeApp();
});
