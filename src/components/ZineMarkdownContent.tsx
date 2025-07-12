
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Theme } from './ThemeSelector';
import { getSpacingClass, getListStyleClass, getBorderRadiusClass, getTextShadow } from '../utils/themeUtils';

interface ZineMarkdownContentProps {
  content: string;
  theme: Theme;
  headingFont: string;
  bodyFont: string;
}

const ZineMarkdownContent: React.FC<ZineMarkdownContentProps> = ({
  content,
  theme,
  headingFont,
  bodyFont
}) => {
  return (
    <article className={`prose max-w-none ${getSpacingClass(theme.styles.spacing)} relative z-10`}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 
              className="text-3xl font-bold mb-4"
              style={{ 
                fontFamily: headingFont,
                color: theme.styles.accent,
                textShadow: getTextShadow(theme.styles.shadowLevel, theme.styles.accent)
              }}
            >
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 
              className="text-2xl font-semibold mb-3"
              style={{ 
                fontFamily: headingFont,
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
                fontFamily: headingFont,
                color: theme.styles.accent 
              }}
            >
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p 
              className="mb-4 leading-relaxed"
              style={{ 
                color: theme.styles.text,
                fontFamily: bodyFont
              }}
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
            <li className="mb-1" style={{ 
              color: theme.styles.text,
              fontFamily: bodyFont
            }}>
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
            <em className="italic" style={{ fontFamily: bodyFont }}>
              {children}
            </em>
          ),
          blockquote: ({ children }) => (
            <blockquote 
              className={`border-l-4 pl-4 italic my-4 ${getBorderRadiusClass(theme.styles.borderRadius)}`}
              style={{ 
                borderColor: theme.styles.accent,
                color: theme.styles.text,
                fontFamily: bodyFont,
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
  );
};

export default ZineMarkdownContent;
