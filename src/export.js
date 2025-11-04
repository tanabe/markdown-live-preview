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
  const cssCdn = 'https://cdn.jsdelivr.net/npm/github-markdown-css@5.8.1/github-markdown-light.min.css';
  const printCss = '/css/style.css'; // Reference the main stylesheet for print media

  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <link rel="stylesheet" href="${cssCdn}" />
  <link rel="stylesheet" href="${printCss}" media="print" />
  <style>
    /* Additional print-specific styles if needed, or overrides */
    @page {
      margin: 10mm;
    }
    html, body {
      padding: 10mm !important;
      overflow: hidden !important;
    }
    article.markdown-body {
      padding: 0;
    }
    table {
      border-collapse: collapse;
      width: 100%;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
  </style>
</head>
<body>
  <article class="markdown-body">${bodyHtml}</article>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const newWindow = window.open(url, '_blank');
  if (!newWindow) {
    alert('Popup blocked. Please allow popups to export as PDF.');
    URL.revokeObjectURL(url);
    return;
  }

  newWindow.addEventListener('load', () => {
    newWindow.print();
    URL.revokeObjectURL(url); // Clean up the Blob URL after printing
  });

  newWindow.addEventListener('afterprint', () => {
    newWindow.close(); // Close the window after printing
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#039;');
}
