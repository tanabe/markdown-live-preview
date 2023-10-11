document.addEventListener("DOMContentLoaded", () => {
    let hasEdited = false;
    let scrollBarSync = false;

    const localStorageNamespace = 'com.markdownlivepreview';
    const localStorageKey = 'last_state';
    const localStorageScrollBarKey = 'scroll_bar_settings';
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

    let setupEditor = () => {
        let editor = ace.edit('editor');
        editor.getSession().setUseWrapMode(true);
        editor.setOptions({
            maxLines: Infinity,
            indentedSoftWrap: false,
            fontSize: 14,
            autoScrollEditorIntoView: true,
            theme: 'ace/theme/chrome',
        });

        var MarkdownMode = ace.require("ace/mode/markdown").Mode;
        editor.session.setMode(new MarkdownMode());

        editor.on('change', () => {
            let changed = editor.getValue() != defaultInput;
            if (changed) {
                hasEdited = true;
            }
            let value = editor.getValue();
            convert(value);
            saveLastContent(value);
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
            element.scrollTo({top: 0});
        });
    };

    let presetValue = (value) => {
        editor.setValue(value);
        editor.moveCursorTo(0, 0);
        editor.focus();
        editor.navigateLineEnd();
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

        document.querySelector('#edit').addEventListener('scroll', (event) => {
            if (!scrollBarSync) {
                return;
            }
            let editorElement = event.currentTarget;
            let ratio = editorElement.scrollTop / (editorElement.scrollHeight - editorElement.clientHeight);

            let previewElement = document.querySelector('#preview');
            let targetY = (previewElement.scrollHeight - previewElement.clientHeight) * ratio;
            previewElement.scrollTo(0, targetY);
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

    // ----- local state -----

    let loadLastContent = () => {
        let lastContent = Storehouse.getItem(localStorageNamespace, localStorageKey);
        return lastContent;
    };

    let saveLastContent = (content) => {
        let expiredAt = new Date(2099, 1, 1);
        Storehouse.setItem(localStorageNamespace, localStorageKey, content, expiredAt);
    };

    let loadScrollBarSettings = () => {
        let lastContent = Storehouse.getItem(localStorageNamespace, localStorageScrollBarKey);
        return lastContent;
    };

    let saveScrollBarSettings = (settings) => {
        let expiredAt = new Date(2099, 1, 1);
        Storehouse.setItem(localStorageNamespace, localStorageScrollBarKey, settings, expiredAt);
    };


    // ----- entry point -----

    let lastContent = loadLastContent();
    let editor = setupEditor();
    if (lastContent) {
        presetValue(lastContent);
    } else {
        presetValue(defaultInput);
    }
    setupResetButton();
    setupCopyButton(editor);

    let scrollBarSettings = loadScrollBarSettings() || false;
    initScrollBarSync(scrollBarSettings);
});
