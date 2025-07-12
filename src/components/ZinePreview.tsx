
import React from 'react';
import { themes } from '../data/themes';
import { getBorderRadiusClass, getShadowClass } from '../utils/themeUtils';
import ZinePreviewHeader from './ZinePreviewHeader';
import BackgroundTexture from './BackgroundTexture';
import ZineTitleSection from './ZineTitleSection';
import ZineMarkdownContent from './ZineMarkdownContent';
import ZineSignature from './ZineSignature';
import { useGalleryImages } from '@/hooks/useGalleryImages';

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
  const { data: galleryImages = [] } = useGalleryImages();
  
  // Find the selected photo from either gallery images or fallback to none
  const selectedPhotoData = selectedPhoto === 'none' 
    ? { id: 'none', url: '' }
    : galleryImages.find(img => img.id === selectedPhoto) || { id: 'none', url: '' };
  
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
          className={`max-w-2xl mx-auto min-h-full p-8 zine-preview-frame ornate-frame relative overflow-hidden`}
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
          
          <ZineSignature theme={theme} />
        </div>
      </div>
    </div>
  );
};

export default ZinePreview;
