
import React from 'react';
import { themes } from '../data/themes';
import { getBorderRadiusClass, getShadowClass } from '../utils/themeUtils';
import ZinePreviewHeader from './ZinePreviewHeader';
import BackgroundTexture from './BackgroundTexture';
import ZineTitleSection from './ZineTitleSection';
import ZineMarkdownContent from './ZineMarkdownContent';

const eeriePhotos = [
  { id: 'none', url: '' },
  { id: 'foggy-mountain', url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80' },
  { id: 'cathedral', url: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=800&q=80' },
  { id: 'starry-night', url: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&q=80' },
  { id: 'building', url: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?w=800&q=80' }
];

interface ZinePreviewProps {
  content: string;
  title: string;
  subtitle: string;
  selectedTheme: string;
  selectedPhoto: string;
  headingFont?: string;
  bodyFont?: string;
}

const ZinePreview: React.FC<ZinePreviewProps> = ({ 
  content, 
  title, 
  subtitle, 
  selectedTheme,
  selectedPhoto,
  headingFont,
  bodyFont
}) => {
  const theme = themes.find(t => t.id === selectedTheme) || themes[0];
  const selectedPhotoData = eeriePhotos.find(p => p.id === selectedPhoto);
  
  // Use font overrides if provided, otherwise fall back to theme fonts
  const actualHeadingFont = headingFont || theme.styles.headingFont;
  const actualBodyFont = bodyFont || theme.styles.bodyFont;

  const previewStyles = {
    background: theme.styles.background,
    color: theme.styles.text,
    fontFamily: actualBodyFont
  };

  const backgroundImageStyle = selectedPhotoData?.url ? {
    backgroundImage: `url(${selectedPhotoData.url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  } : {};

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
          {/* Background Photo Overlay */}
          {selectedPhotoData?.url && (
            <div 
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={backgroundImageStyle}
            />
          )}
          
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
