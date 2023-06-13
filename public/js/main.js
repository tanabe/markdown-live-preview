$(function() {
    let hasEdited = false;

    const localStorageNamespace = 'com.markdownlivepreview';
    const localStorageKey = 'last_state';
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
1. Item 2
1. Item 3
  1. Item 3a
  1. Item 3b

## Images

![This is an alt text.](/image/sample.png "This is a sample image.")

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

    let adjustScreen = () => {
        let screenHeight = $(window).height();
        let headerHeight = $('#header').outerHeight();
        let footerHeight = $('#footer').outerHeight();
        let containerHeight = screenHeight - headerHeight - footerHeight;
        $('#container').css({ top: `${headerHeight}px` });
        $('.column').css({ height: `${containerHeight}px`});
    };

    $(window).resize(() => {
        adjustScreen();
    });

    let setupEditor = () => {
        let editor = ace.edit('editor');
        editor.getSession().setUseWrapMode(true);
        editor.renderer.setScrollMargin(10, 10, 10, 10);
        editor.setOptions({
            maxLines: Infinity,
            indentedSoftWrap: false,
            fontSize: 14,
            autoScrollEditorIntoView: true,
            theme: 'ace/theme/github',
            // TODO consider some options
        });

        editor.on('change', () => {
            let changed = editor.getValue() != defaultInput;
            if (changed) {
                hasEdited = true;
            }
            convert(editor.getValue());
            adjustScreen();

            saveLastState();
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
        $('#output').html(sanitized);
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
    };

    let presetValue = (value) => {
        editor.setValue(value);
        editor.moveCursorTo(0, 0);
        editor.focus();
        editor.navigateLineEnd();
        hasEdited = false;
    };

    let setupResetButton = () => {
        document.querySelector("#reset").addEventListener('click', (event) => {
            event.preventDefault();
            reset();
        });
    };

    let loadLastState = () => {
        let lastState = Storehouse.getItem(localStorageNamespace, localStorageKey);
        return lastState;
    };

    let saveLastState = () => {
        let expiredAt = new Date(2099, 1, 1);
        Storehouse.setItem(localStorageNamespace, localStorageKey, editor.getValue(), expiredAt);
    };

    // entry point
    let lastState = loadLastState();
    let editor = setupEditor();
    if (lastState) {
        presetValue(lastState);
    } else {
        presetValue(defaultInput);
    }
    setupResetButton();
    adjustScreen();
});
