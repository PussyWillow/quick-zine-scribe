import React from 'react';
import { Download, Mail, Globe, FileText } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { Theme } from '../types/theme';
import { themes } from '../data/themes';

interface ExportButtonsProps {
  title: string;
  subtitle: string;
  content: string;
  selectedTheme: string;
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ 
  title, 
  subtitle, 
  content, 
  selectedTheme 
}) => {
  const theme = themes.find(t => t.id === selectedTheme) || themes[0];

  const exportToPDF = async () => {
    const element = document.getElementById('zine-preview');
    if (!element) return;

    const opt = {
      margin: 1,
      filename: `${title || 'zine'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('PDF export failed. Please try again.');
    }
  };

  const exportToHTML = () => {
    const htmlContent = generateHTMLEmail();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title || 'zine'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportToWebPage = () => {
    const webContent = generateWebPage();
    const blob = new Blob([webContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const generateHTMLEmail = () => {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      margin: 0;
      padding: 20px;
      font-family: ${theme.styles.bodyFont};
      background: ${theme.styles.background};
      color: ${theme.styles.text};
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
    }
    h1, h2, h3 {
      font-family: ${theme.styles.headingFont};
      color: ${theme.styles.accent};
    }
    h1 { font-size: 2.5em; margin-bottom: 0.5em; }
    h2 { font-size: 2em; margin-bottom: 0.75em; }
    h3 { font-size: 1.5em; margin-bottom: 1em; }
    p { margin-bottom: 1em; }
    a { color: ${theme.styles.accent}; }
    strong { color: ${theme.styles.accent}; }
  </style>
</head>
<body>
  <div class="container">
    ${title ? `<h1>${title}</h1>` : ''}
    ${subtitle ? `<p style="font-size: 1.2em; opacity: 0.8;">${subtitle}</p>` : ''}
    <div>${content.split('\n').map(line => {
      if (line.startsWith('# ')) return `<h1>${line.slice(2)}</h1>`;
      if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`;
      if (line.startsWith('### ')) return `<h3>${line.slice(4)}</h3>`;
      if (line.trim() === '') return '<br>';
      return `<p>${line}</p>`;
    }).join('')}</div>
  </div>
</body>
</html>`;
  };

  const generateWebPage = () => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title || 'Flash Zine'}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: ${theme.styles.bodyFont};
      background: ${theme.styles.background};
      color: ${theme.styles.text};
      line-height: 1.6;
      padding: 2rem;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 3rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    h1, h2, h3 {
      font-family: ${theme.styles.headingFont};
      color: ${theme.styles.accent};
      margin-bottom: 1rem;
    }
    h1 { font-size: 3rem; text-align: center; }
    h2 { font-size: 2rem; }
    h3 { font-size: 1.5rem; }
    p { margin-bottom: 1.5rem; }
    a { color: ${theme.styles.accent}; text-decoration: none; }
    a:hover { text-decoration: underline; }
    strong { color: ${theme.styles.accent}; }
    .subtitle { 
      text-align: center; 
      font-size: 1.2rem; 
      opacity: 0.8; 
      margin-bottom: 2rem; 
    }
    .footer {
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 1px solid #eee;
      text-align: center;
      color: #666;
      font-size: 0.9rem;
    }
  </style>
</head>
<body>
  <div class="container">
    ${title ? `<h1>${title}</h1>` : ''}
    ${subtitle ? `<p class="subtitle">${subtitle}</p>` : ''}
    <div>${content.split('\n').map(line => {
      if (line.startsWith('# ')) return `<h1>${line.slice(2)}</h1>`;
      if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`;
      if (line.startsWith('### ')) return `<h3>${line.slice(4)}</h3>`;
      if (line.trim() === '') return '<br>';
      return `<p>${line}</p>`;
    }).join('')}</div>
    <div class="footer">
      Created with Flash Zine
    </div>
  </div>
</body>
</html>`;
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground mb-4 tracking-wide uppercase">
        Export Options
      </h3>
      
      <button
        onClick={exportToPDF}
        className="w-full flex items-center gap-4 px-5 py-4 export-btn-pdf rounded-lg font-medium text-sm tracking-wide"
      >
        <FileText className="w-5 h-5" />
        <div className="flex flex-col items-start">
          <span className="font-semibold">Export as PDF</span>
          <span className="text-xs opacity-80 font-normal">High-quality document</span>
        </div>
      </button>
      
      <button
        onClick={exportToHTML}
        className="w-full flex items-center gap-4 px-5 py-4 export-btn-html rounded-lg font-medium text-sm tracking-wide"
      >
        <Mail className="w-5 h-5" />
        <div className="flex flex-col items-start">
          <span className="font-semibold">Export as HTML Email</span>
          <span className="text-xs opacity-80 font-normal">Email-ready format</span>
        </div>
      </button>
      
      <button
        onClick={exportToWebPage}
        className="w-full flex items-center gap-4 px-5 py-4 export-btn-web rounded-lg font-medium text-sm tracking-wide"
      >
        <Globe className="w-5 h-5" />
        <div className="flex flex-col items-start">
          <span className="font-semibold">Preview as Web Page</span>
          <span className="text-xs opacity-80 font-normal">Interactive preview</span>
        </div>
      </button>
    </div>
  );
};

export default ExportButtons;
