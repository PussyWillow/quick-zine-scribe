
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Eye } from 'lucide-react';
import { Theme, themes } from './ThemeSelector';

interface ZinePreviewProps {
  content: string;
  title: string;
  subtitle: string;
  selectedTheme: string;
}

const ZinePreview: React.FC<ZinePreviewProps> = ({ 
  content, 
  title, 
  subtitle, 
  selectedTheme 
}) => {
  const theme = themes.find(t => t.id === selectedTheme) || themes[0];
  
  const getSpacingClass = (spacing: string) => {
    switch (spacing) {
      case 'tight': return 'space-y-2';
      case 'relaxed': return 'space-y-6';
      case 'loose': return 'space-y-8';
      default: return 'space-y-4';
    }
  };

  const previewStyles = {
    background: theme.styles.background,
    color: theme.styles.text,
    fontFamily: theme.styles.bodyFont
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b border-gray-200 bg-white">
        <Eye className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800">Preview</h2>
        <div className="ml-auto text-sm text-gray-500">
          {theme.name} Theme
        </div>
      </div>
      
      {/* Preview Content */}
      <div className="flex-1 overflow-auto p-6">
        <div 
          className="max-w-2xl mx-auto min-h-full p-8 rounded-lg shadow-sm"
          style={previewStyles}
          id="zine-preview"
        >
          {/* Title Section */}
          {title && (
            <header className="mb-8 text-center">
              <h1 
                className="text-4xl font-bold mb-2"
                style={{ 
                  fontFamily: theme.styles.headingFont,
                  color: theme.styles.accent 
                }}
              >
                {title}
              </h1>
              {subtitle && (
                <p 
                  className="text-xl opacity-80"
                  style={{ color: theme.styles.text }}
                >
                  {subtitle}
                </p>
              )}
            </header>
          )}
          
          {/* Content */}
          <article className={`prose max-w-none ${getSpacingClass(theme.styles.spacing)}`}>
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 
                    className="text-3xl font-bold mb-4"
                    style={{ 
                      fontFamily: theme.styles.headingFont,
                      color: theme.styles.accent 
                    }}
                  >
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 
                    className="text-2xl font-semibold mb-3"
                    style={{ 
                      fontFamily: theme.styles.headingFont,
                      color: theme.styles.accent 
                    }}
                  >
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 
                    className="text-xl font-medium mb-2"
                    style={{ 
                      fontFamily: theme.styles.headingFont,
                      color: theme.styles.accent 
                    }}
                  >
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p 
                    className="mb-4 leading-relaxed"
                    style={{ color: theme.styles.text }}
                  >
                    {children}
                  </p>
                ),
                a: ({ children, href }) => (
                  <a 
                    href={href}
                    className="underline hover:no-underline transition-all"
                    style={{ color: theme.styles.accent }}
                  >
                    {children}
                  </a>
                ),
                strong: ({ children }) => (
                  <strong style={{ color: theme.styles.accent }}>
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em className="italic">
                    {children}
                  </em>
                )
              }}
            >
              {content || '*Start writing to see your zine preview...*'}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
};

export default ZinePreview;
