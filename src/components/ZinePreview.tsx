
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

  const getBorderRadiusClass = (borderRadius: string) => {
    switch (borderRadius) {
      case 'sharp': return 'rounded-none';
      case 'minimal': return 'rounded-sm';
      case 'rounded': return 'rounded-lg';
      case 'vintage': return 'rounded-tl-lg rounded-br-lg';
      case 'organic': return 'rounded-2xl';
      case 'subtle': return 'rounded-md';
      default: return 'rounded-lg';
    }
  };

  const getShadowClass = (shadowLevel: string) => {
    switch (shadowLevel) {
      case 'none': return '';
      case 'minimal': return 'shadow-sm';
      case 'soft': return 'shadow-md';
      case 'clean': return 'shadow-lg';
      case 'subtle': return 'shadow-sm';
      case 'retro': return 'shadow-lg shadow-orange-200/50';
      case 'neon': return 'shadow-lg shadow-pink-500/25';
      case 'natural': return 'shadow-md shadow-green-200/30';
      case 'stark': return 'shadow-2xl';
      case 'glow': return 'shadow-xl shadow-green-400/20';
      default: return 'shadow-sm';
    }
  };

  const getListStyleClass = (listStyle: string) => {
    switch (listStyle) {
      case 'decorative': return 'list-disc marker:text-purple-400';
      case 'bold': return 'list-disc marker:text-red-600';
      case 'traditional': return 'list-decimal marker:text-blue-600';
      case 'minimal': return 'list-none pl-4';
      case 'retro': return 'list-disc marker:text-orange-500';
      case 'cyber': return 'list-disc marker:text-pink-500';
      case 'organic': return 'list-disc marker:text-green-600';
      case 'clean': return 'list-disc marker:text-gray-600';
      case 'electric': return 'list-disc marker:text-lime-400';
      case 'simple': return 'list-disc marker:text-blue-500';
      default: return 'list-disc';
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
          className={`max-w-2xl mx-auto min-h-full p-8 ${getBorderRadiusClass(theme.styles.borderRadius)} ${getShadowClass(theme.styles.shadowLevel)} relative overflow-hidden`}
          style={previewStyles}
          id="zine-preview"
        >
          {/* Background texture overlay */}
          {theme.styles.backgroundTexture && (
            <div 
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage: theme.styles.backgroundTexture === 'paper' 
                  ? 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)'
                  : 'none',
                backgroundSize: '20px 20px'
              }}
            />
          )}
          
          {/* Title Section */}
          {title && (
            <header className="mb-8 text-center relative z-10">
              <h1 
                className="text-4xl font-bold mb-2"
                style={{ 
                  fontFamily: theme.styles.headingFont,
                  color: theme.styles.accent,
                  textShadow: theme.styles.shadowLevel === 'neon' || theme.styles.shadowLevel === 'glow' 
                    ? `0 0 10px ${theme.styles.accent}` 
                    : 'none'
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
          <article className={`prose max-w-none ${getSpacingClass(theme.styles.spacing)} relative z-10`}>
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 
                    className="text-3xl font-bold mb-4"
                    style={{ 
                      fontFamily: theme.styles.headingFont,
                      color: theme.styles.accent,
                      textShadow: theme.styles.shadowLevel === 'neon' || theme.styles.shadowLevel === 'glow' 
                        ? `0 0 8px ${theme.styles.accent}` 
                        : 'none'
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
                      color: theme.styles.accent,
                      textShadow: theme.styles.shadowLevel === 'neon' || theme.styles.shadowLevel === 'glow' 
                        ? `0 0 6px ${theme.styles.accent}` 
                        : 'none'
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
                ul: ({ children }) => (
                  <ul className={`mb-4 ${getListStyleClass(theme.styles.listStyle)} pl-6`}>
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className={`mb-4 ${getListStyleClass(theme.styles.listStyle)} pl-6`}>
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="mb-1" style={{ color: theme.styles.text }}>
                    {children}
                  </li>
                ),
                a: ({ children, href }) => (
                  <a 
                    href={href}
                    className="underline hover:no-underline transition-all"
                    style={{ 
                      color: theme.styles.accent,
                      textShadow: theme.styles.shadowLevel === 'neon' || theme.styles.shadowLevel === 'glow' 
                        ? `0 0 4px ${theme.styles.accent}` 
                        : 'none'
                    }}
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
                ),
                blockquote: ({ children }) => (
                  <blockquote 
                    className={`border-l-4 pl-4 italic my-4 ${getBorderRadiusClass(theme.styles.borderRadius)}`}
                    style={{ 
                      borderColor: theme.styles.accent,
                      color: theme.styles.text,
                      backgroundColor: theme.id === 'cyberpunk' || theme.id === 'neon' 
                        ? 'rgba(255,255,255,0.05)' 
                        : 'rgba(0,0,0,0.05)'
                    }}
                  >
                    {children}
                  </blockquote>
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
