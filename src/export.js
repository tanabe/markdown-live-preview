// Export utilities for HTML, PDF (via browser print), and DOCX
// Keeps everything client-side and uses the already-sanitized preview HTML

// Load a non-ESM script once and return a promise when its global is available
function loadScriptOnce(url, globalVar) {
  return new Promise((resolve, reject) => {
    if (globalVar && typeof window !== 'undefined' && window[globalVar]) {
      resolve(window[globalVar]);
      return;
    }
    const existing = document.querySelector(`script[data-dynamic="${url}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve(window[globalVar]));
      existing.addEventListener('error', reject);
      return;
    }
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.defer = true;
    script.setAttribute('data-dynamic', url);
    script.onload = () => resolve(window[globalVar]);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export function getDocumentTitleFromMarkdown(markdown) {
  try {
    const m = markdown.match(/^#\s+(.+)$/m);
    let title = (m && m[1]) ? m[1].trim() : 'document';
    // sanitize filename
    title = title.replace(/[\\/:*?"<>|\n\r\t]/g, ' ').trim();
    if (!title) title = 'document';
    return title;
  } catch (_) {
    return 'document';
  }
}

export function buildExportHTML({ bodyHtml, title }) {
  // Wrap sanitized HTML in a standalone document
  // Use GitHub Markdown CSS via CDN for portability
  const cssCdn = 'https://cdn.jsdelivr.net/npm/github-markdown-css@5.8.1/github-markdown-light.min.css';
  const doc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <link rel="stylesheet" href="${cssCdn}" />
  <style>
    body { margin: 0; padding: 24px; }
    .markdown-body { box-sizing: border-box; max-width: 980px; margin: 0 auto; }
  </style>
</head>
<body>
  <article class="markdown-body">${bodyHtml}</article>
</body>
</html>`;
  return doc;
}

export function downloadBlob({ blob, filename }) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function exportAsHTML({ bodyHtml, title }) {
  const html = buildExportHTML({ bodyHtml, title });
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  downloadBlob({ blob, filename: `${title}.html` });
}

export function exportAsPDF({ bodyHtml, title }) {
  // Open a print-ready window using same origin to allow resource loading
  const cssCdn = 'https://cdn.jsdelivr.net/npm/github-markdown-css@5.8.1/github-markdown-light.min.css';
  const printCss = '/css/print.css';
  const win = window.open('', '_blank');
  if (!win) {
    alert('Popup blocked. Please allow popups to export as PDF.');
    return;
  }
  win.document.open();
  win.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <link rel="stylesheet" href="${cssCdn}" />
  <link rel="stylesheet" href="${printCss}" />
</head>
<body>
  <article class="markdown-body">${bodyHtml}</article>
  <script>window.addEventListener('load', () => { setTimeout(() => { window.print(); }, 50); });</script>
</body>
</html>`);
  win.document.close();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#039;');
}
