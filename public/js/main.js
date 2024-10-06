document.addEventListener("DOMContentLoaded", () => {
    mermaid.initialize({ startOnLoad: false });

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

![This is an alt text.](image/sample.webp "This is a sample image.") 

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

## Flow Chart (Mermaid) Example

${"`"}${"`"}${"`"}mermaid
graph LR;
    A[Start] --> B[Process];
    B --> C[Decision];
    C -->|Yes| D[End];
    C -->|No| A;
${"`"}${"`"}${"`"}      

See [Mermaid Documentation](https://mermaid.js.org/intro/syntax-reference.html)

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

    let blinkCopyButton = (copyBtn) => {
        copyBtn.style.visibility = 'hidden';
        setTimeout(() => {
            copyBtn.style.visibility = 'visible';
        }, 400);
    }; 
    
    let copySVG = (svgElement,copyBtn) => {
        const svgData = new XMLSerializer().serializeToString(svgElement);
    
        // Encode SVG to Base64
        const base64 = btoa(unescape(encodeURIComponent(svgData)));
        const imgSrc = `data:image/svg+xml;base64,${base64}`;
        
        // make canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
    
        // Set canvas attributes
        const svgWidth = svgElement.viewBox.baseVal.width;
        const svgHeight = svgElement.viewBox.baseVal.height;
        canvas.width = svgWidth;
        canvas.height = svgHeight;
        canvas.style.position = 'fixed';
        canvas.style.top = '-500000px';
        document.body.appendChild(canvas);
    
        // Make image from SVG
        const img = new Image();
        img.style.position = 'fixed';
        img.style.top = '-500000px';
        document.body.appendChild(img);
    
        img.onload = function() {
            // draw SVG to canvas
            ctx.drawImage(img, 0, 0);
            
            // convert image to blob and copy img
            canvas.toBlob(function(blob) {
                const item = new ClipboardItem({ 'image/png': blob });
                navigator.clipboard.write([item]).then(function() {
                blinkCopyButton(copyBtn);
                document.body.removeChild(canvas);
                document.body.removeChild(img);
                }, function(err) {
                console.error('Could not copy image: ', err);
                document.body.removeChild(canvas);
                document.body.removeChild(img);
                });
            });
        };

        img.src = imgSrc;
    }

    // Render markdown text as html
    let convert = (markdown) => {
        let options = {
            headerIds: false,
            mangle: false
        };
        let html = marked.parse(markdown, options);
        let sanitized = DOMPurify.sanitize(html);
        let output = document.querySelector('#output');
        output.innerHTML = sanitized;
        mermaid.init(undefined, output.querySelectorAll('.language-mermaid'));

        // Add random target (like win_xxx) to all <a> tags
        const links = output.querySelectorAll('a');
        links.forEach(link => {
            link.setAttribute('target', 'win_' + Math.random().toString(36).substr(2, 5)); // Short random string
        });

        const codes = output.querySelectorAll('code');
        codes.forEach(code => {
            const pre = code.parentNode;
            if(pre.nodeName != 'PRE'){return}

            // Create the copy button
            const copyBtn = document.createElement('button');
            copyBtn.classList.add('code-copy-button');

            // Append the copy button to the parent <pre> element
            pre.style.position = 'relative';
            pre.style.width = 'calc(100% - 40px)';
            pre.appendChild(copyBtn);

            // Add copy functionality
            copyBtn.addEventListener('click', () => {
                if (code.innerHTML.match(/^\s*<svg/si)) {
                    const svgElement = code.firstElementChild;
                    copySVG(svgElement,copyBtn);
                    return;
                }
                
                //- other text code
                navigator.clipboard.writeText(code.innerText).then(() => {
                    //- blink button
                    blinkCopyButton(copyBtn);
                }).catch(err => {
                    console.error('Failed to copy code: ', err);
                });
            });
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

    let setupLoadButton = () => {
        document.querySelector("#load-button").addEventListener('click', (event) => {
            event.preventDefault();
            loadMD();
        });
    };

    let setupSaveButton = () => {
        document.querySelector("#save-button").addEventListener('click', (event) => {
            event.preventDefault();
            saveMD();
        });
    };

    let setupPrinterButton = () => {
        document.querySelector("#printer-button").addEventListener('click', (event) => {
            event.preventDefault();
            self['iframe-pdf'].window.generatePrinter();
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

    // ----- load save button ----

    self.currentFileName = 'document.md';
    let loadMD = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.md';
        const textarea = 

        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    presetValue(ev.target.result)
                    currentFileName = file.name; // Update filename
                };
                reader.readAsText(file);
            }

            document.body.removeChild(input); // Remove the input element after usage
        };

        input.click(); // Trigger file input click
    }

    let saveMD = () => {
        const blob = new Blob([editor.getValue()], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        link.href = url;
        link.download = currentFileName; // Use the current file name for saving
        document.body.appendChild(link);
        link.click();

        // Clean up
        URL.revokeObjectURL(url);
        document.body.removeChild(link); // Remove the link element after usage
    }    

    // ----- divider resize ----
    
    let setupDividerResize = () => {
        const container = document.getElementById('container');
        const edit = document.getElementById('edit');
        const preview = document.getElementById('preview');
        const divider = document.getElementById('divider');

        let isDragging = false;

        // Saat user mulai drag
        divider.addEventListener('mousedown', function(e) {
            isDragging = true;
            document.body.style.cursor = 'ew-resize';
        });

        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            
            // Dapatkan lebar total container
            const containerWidth = container.offsetWidth;
            
            // Hitung posisi relatif dari mouse terhadap container
            const newLeftWidth = (e.clientX / containerWidth) * 100;
            const newRightWidth = 100 - newLeftWidth;
            
            // Update lebar edit dan preview
            edit.style.flexBasis = `${newLeftWidth}%`;
            preview.style.flexBasis = `${newRightWidth}%`;
        });

        document.addEventListener('mouseup', function() {
            isDragging = false;
            document.body.style.cursor = 'default';
        });
    }

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
    setupLoadButton();
    setupSaveButton();
    setupPrinterButton();
    setupDividerResize();

    let scrollBarSettings = loadScrollBarSettings() || false;
    initScrollBarSync(scrollBarSettings);
    
});
