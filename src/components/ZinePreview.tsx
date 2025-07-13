
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
  photoOpacity?: number;
  photoPosition?: string;
  photoScale?: number;
  blendMode?: string;
}

const ZinePreview: React.FC<ZinePreviewProps> = ({ 
  content, 
  title, 
  subtitle, 
  selectedTheme,
  selectedPhoto,
  headingFont,
  bodyFont,
  photoOpacity = 10,
  photoPosition = 'center',
  photoScale = 1,
  blendMode = 'multiply'
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

  // Map position to CSS object-position values
  const getObjectPosition = (position: string) => {
    const positionMap: { [key: string]: string } = {
      'center': 'center center',
      'top': 'center top',
      'bottom': 'center bottom',
      'left': 'left center',
      'right': 'right center',
      'top-left': 'left top',
      'top-right': 'right top',
      'bottom-left': 'left bottom',
      'bottom-right': 'right bottom'
    };
    return positionMap[position] || 'center center';
  };

  // Map blend mode to CSS mix-blend-mode values
  const getCSSBlendMode = (mode: string) => {
    const blendMap: { [key: string]: string } = {
      'normal': 'normal',
      'multiply': 'multiply',
      'overlay': 'overlay',
      'soft-light': 'soft-light',
      'hard-light': 'hard-light',
      'color-dodge': 'color-dodge',
      'color-burn': 'color-burn'
    };
    return blendMap[mode] || 'multiply';
  };

  const backgroundImageStyle = selectedPhotoData?.url ? {
    backgroundImage: `url(${selectedPhotoData.url})`,
    backgroundSize: `${photoScale * 100}%`,
    backgroundPosition: getObjectPosition(photoPosition),
    backgroundRepeat: 'no-repeat',
    opacity: photoOpacity / 100,
    mixBlendMode: getCSSBlendMode(blendMode) as any
  } : {};

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <ZinePreviewHeader themeName={theme.name} />
      
      {/* Preview Content */}
      <div className="flex-1 min-h-0 overflow-auto p-6">
        <div 
          className={`max-w-2xl mx-auto min-h-full p-8 zine-preview-frame ornate-frame relative overflow-hidden`}
          style={previewStyles}
          id="zine-preview"
        >
          {/* Enhanced Background Photo Layer */}
          {selectedPhotoData?.url && (
            <div 
              className="absolute inset-0 pointer-events-none transition-all duration-300"
              style={backgroundImageStyle}
            />
          )}
          
          <BackgroundTexture texture={theme.styles.backgroundTexture} />
          
          {/* Content layers with proper z-index */}
          <div className="relative z-10">
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
    </div>
  );
};

export default ZinePreview;
