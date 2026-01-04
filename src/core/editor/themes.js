/**
 * Monaco Editor Themes
 * Custom theme definitions for the editor
 * @module core/editor/themes
 */

/**
 * Define all custom themes
 * @param {Object} monaco - Monaco editor module
 */
export function defineCustomThemes(monaco) {
    // Dracula Theme
    monaco.editor.defineTheme('dracula', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { token: 'comment', foreground: '6272a4', fontStyle: 'italic' },
            { token: 'keyword', foreground: 'ff79c6' },
            { token: 'string', foreground: 'f1fa8c' },
            { token: 'number', foreground: 'bd93f9' },
            { token: 'type', foreground: '8be9fd', fontStyle: 'italic' },
            { token: 'function', foreground: '50fa7b' },
            { token: 'variable', foreground: 'f8f8f2' },
            { token: 'constant', foreground: 'bd93f9' },
            { token: 'tag', foreground: 'ff79c6' },
            { token: 'attribute', foreground: '50fa7b' },
        ],
        colors: {
            'editor.background': '#282a36',
            'editor.foreground': '#f8f8f2',
            'editor.lineHighlightBackground': '#44475a',
            'editor.selectionBackground': '#44475a',
            'editorCursor.foreground': '#f8f8f2',
            'editorWhitespace.foreground': '#44475a',
            'editorLineNumber.foreground': '#6272a4',
            'editorLineNumber.activeForeground': '#f8f8f2'
        }
    });

    // Solarized Dark Theme
    monaco.editor.defineTheme('solarized-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { token: 'comment', foreground: '586e75', fontStyle: 'italic' },
            { token: 'keyword', foreground: '859900' },
            { token: 'string', foreground: '2aa198' },
            { token: 'number', foreground: 'd33682' },
            { token: 'type', foreground: 'b58900' },
            { token: 'function', foreground: '268bd2' },
        ],
        colors: {
            'editor.background': '#002b36',
            'editor.foreground': '#839496',
            'editor.lineHighlightBackground': '#073642',
            'editor.selectionBackground': '#073642',
            'editorCursor.foreground': '#839496',
            'editorLineNumber.foreground': '#586e75'
        }
    });

    // Solarized Light Theme
    monaco.editor.defineTheme('solarized-light', {
        base: 'vs',
        inherit: true,
        rules: [
            { token: 'comment', foreground: '93a1a1', fontStyle: 'italic' },
            { token: 'keyword', foreground: '859900' },
            { token: 'string', foreground: '2aa198' },
            { token: 'number', foreground: 'd33682' },
            { token: 'type', foreground: 'b58900' },
            { token: 'function', foreground: '268bd2' },
        ],
        colors: {
            'editor.background': '#fdf6e3',
            'editor.foreground': '#657b83',
            'editor.lineHighlightBackground': '#eee8d5',
            'editor.selectionBackground': '#eee8d5',
            'editorCursor.foreground': '#657b83',
            'editorLineNumber.foreground': '#93a1a1'
        }
    });

    // GitHub Dark Theme
    monaco.editor.defineTheme('github-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { token: 'comment', foreground: '8b949e', fontStyle: 'italic' },
            { token: 'keyword', foreground: 'ff7b72' },
            { token: 'string', foreground: 'a5d6ff' },
            { token: 'number', foreground: '79c0ff' },
            { token: 'type', foreground: 'ffa657' },
            { token: 'function', foreground: 'd2a8ff' },
            { token: 'variable', foreground: 'c9d1d9' },
        ],
        colors: {
            'editor.background': '#0d1117',
            'editor.foreground': '#c9d1d9',
            'editor.lineHighlightBackground': '#161b22',
            'editor.selectionBackground': '#264f78',
            'editorCursor.foreground': '#c9d1d9',
            'editorLineNumber.foreground': '#8b949e',
            'editorLineNumber.activeForeground': '#c9d1d9'
        }
    });

    // GitHub Light Theme
    monaco.editor.defineTheme('github-light', {
        base: 'vs',
        inherit: true,
        rules: [
            { token: 'comment', foreground: '6e7781', fontStyle: 'italic' },
            { token: 'keyword', foreground: 'cf222e' },
            { token: 'string', foreground: '0a3069' },
            { token: 'number', foreground: '0550ae' },
            { token: 'type', foreground: '953800' },
            { token: 'function', foreground: '8250df' },
            { token: 'variable', foreground: '24292f' },
        ],
        colors: {
            'editor.background': '#ffffff',
            'editor.foreground': '#24292f',
            'editor.lineHighlightBackground': '#f6f8fa',
            'editor.selectionBackground': '#add6ff',
            'editorCursor.foreground': '#24292f',
            'editorLineNumber.foreground': '#8c959f',
            'editorLineNumber.activeForeground': '#24292f'
        }
    });

    // Nord Theme
    monaco.editor.defineTheme('nord', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { token: 'comment', foreground: '616e88', fontStyle: 'italic' },
            { token: 'keyword', foreground: '81a1c1' },
            { token: 'string', foreground: 'a3be8c' },
            { token: 'number', foreground: 'b48ead' },
            { token: 'type', foreground: '8fbcbb' },
            { token: 'function', foreground: '88c0d0' },
        ],
        colors: {
            'editor.background': '#2e3440',
            'editor.foreground': '#d8dee9',
            'editor.lineHighlightBackground': '#3b4252',
            'editor.selectionBackground': '#434c5e',
            'editorCursor.foreground': '#d8dee9',
            'editorLineNumber.foreground': '#4c566a'
        }
    });

    // One Dark Theme
    monaco.editor.defineTheme('one-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { token: 'comment', foreground: '5c6370', fontStyle: 'italic' },
            { token: 'keyword', foreground: 'c678dd' },
            { token: 'string', foreground: '98c379' },
            { token: 'number', foreground: 'd19a66' },
            { token: 'type', foreground: 'e5c07b' },
            { token: 'function', foreground: '61afef' },
        ],
        colors: {
            'editor.background': '#282c34',
            'editor.foreground': '#abb2bf',
            'editor.lineHighlightBackground': '#2c313c',
            'editor.selectionBackground': '#3e4451',
            'editorCursor.foreground': '#528bff',
            'editorLineNumber.foreground': '#5c6370'
        }
    });

    // Monokai Theme
    monaco.editor.defineTheme('monokai', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { token: 'comment', foreground: '75715e', fontStyle: 'italic' },
            { token: 'keyword', foreground: 'f92672' },
            { token: 'string', foreground: 'e6db74' },
            { token: 'number', foreground: 'ae81ff' },
            { token: 'type', foreground: '66d9ef', fontStyle: 'italic' },
            { token: 'function', foreground: 'a6e22e' },
        ],
        colors: {
            'editor.background': '#272822',
            'editor.foreground': '#f8f8f2',
            'editor.lineHighlightBackground': '#3e3d32',
            'editor.selectionBackground': '#49483e',
            'editorCursor.foreground': '#f8f8f0',
            'editorLineNumber.foreground': '#75715e'
        }
    });
}

/**
 * Available themes with metadata
 */
export const THEMES = {
    'vs': {
        id: 'vs',
        name: 'Light',
        base: 'vs',
        isDark: false
    },
    'vs-dark': {
        id: 'vs-dark',
        name: 'Dark',
        base: 'vs-dark',
        isDark: true
    },
    'hc-black': {
        id: 'hc-black',
        name: 'High Contrast',
        base: 'hc-black',
        isDark: true
    },
    'dracula': {
        id: 'dracula',
        name: 'Dracula',
        base: 'vs-dark',
        isDark: true
    },
    'solarized-dark': {
        id: 'solarized-dark',
        name: 'Solarized Dark',
        base: 'vs-dark',
        isDark: true
    },
    'solarized-light': {
        id: 'solarized-light',
        name: 'Solarized Light',
        base: 'vs',
        isDark: false
    },
    'github-dark': {
        id: 'github-dark',
        name: 'GitHub Dark',
        base: 'vs-dark',
        isDark: true
    },
    'github-light': {
        id: 'github-light',
        name: 'GitHub Light',
        base: 'vs',
        isDark: false
    },
    'nord': {
        id: 'nord',
        name: 'Nord',
        base: 'vs-dark',
        isDark: true
    },
    'one-dark': {
        id: 'one-dark',
        name: 'One Dark',
        base: 'vs-dark',
        isDark: true
    },
    'monokai': {
        id: 'monokai',
        name: 'Monokai',
        base: 'vs-dark',
        isDark: true
    }
};

/**
 * Get theme by ID
 * @param {string} id - Theme ID
 * @returns {Object|null} Theme object or null
 */
export function getTheme(id) {
    return THEMES[id] || null;
}

/**
 * Get all dark themes
 * @returns {Object[]} Array of dark themes
 */
export function getDarkThemes() {
    return Object.values(THEMES).filter(t => t.isDark);
}

/**
 * Get all light themes
 * @returns {Object[]} Array of light themes
 */
export function getLightThemes() {
    return Object.values(THEMES).filter(t => !t.isDark);
}

export default { defineCustomThemes, THEMES, getTheme, getDarkThemes, getLightThemes };
