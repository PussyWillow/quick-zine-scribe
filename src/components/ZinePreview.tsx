
import React from 'react';
import { themes } from './ThemeSelector';
import { getBorderRadiusClass, getShadowClass } from '../utils/themeUtils';
import ZinePreviewHeader from './ZinePreviewHeader';
import BackgroundTexture from './BackgroundTexture';
import ZineTitleSection from './ZineTitleSection';
import ZineMarkdownContent from './ZineMarkdownContent';

interface ZinePreviewProps {
  content: string;
  title: string;
  subtitle: string;
  selectedTheme: string;
  headingFont?: string;
  bodyFont?: string;
}

const ZinePreview: React.FC<ZinePreviewProps> = ({ 
  content, 
  title, 
  subtitle, 
  selectedTheme,
  headingFont,
  bodyFont
}) => {
  const theme = themes.find(t => t.id === selectedTheme) || themes[0];
  
  // Use font overrides if provided, otherwise fall back to theme fonts
  const actualHeadingFont = headingFont || theme.styles.headingFont;
  const actualBodyFont = bodyFont || theme.styles.bodyFont;

  const previewStyles = {
    background: theme.styles.background,
    color: theme.styles.text,
    fontFamily: actualBodyFont
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <ZinePreviewHeader themeName={theme.name} />
      
      {/* Preview Content */}
      <div className="flex-1 overflow-auto p-6">
        <div 
          className={`max-w-2xl mx-auto min-h-full p-8 ${getBorderRadiusClass(theme.styles.borderRadius)} ${getShadowClass(theme.styles.shadowLevel)} relative overflow-hidden`}
          style={previewStyles}
          id="zine-preview"
        >
          <BackgroundTexture texture={theme.styles.backgroundTexture} />
          
          <ZineTitleSection
            title={title}
            subtitle={subtitle}
            headingFont={actualHeadingFont}
            accentColor={theme.styles.accent}
            textColor={theme.styles.text}
            shadowLevel={theme.styles.shadowLevel}
          />
          
          <ZineMarkdownContent
            content={content}
            theme={theme}
            headingFont={actualHeadingFont}
            bodyFont={actualBodyFont}
          />
        </div>
      </div>
    </div>
  );
};

export default ZinePreview;
