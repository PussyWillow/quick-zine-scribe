
import React from 'react';
import { ControlsSection } from './ControlsSection';
import { PreviewSection } from './PreviewSection';
import { Template } from './TemplateSelector';

interface PreviewPanelProps {
  isControlsCollapsed: boolean;
  isPreviewCollapsed: boolean;
  onToggleControls: () => void;
  onTogglePreview: () => void;
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
  selectedHeadingFont: string;
  selectedBodyFont: string;
  onHeadingFontChange: (font: string) => void;
  onBodyFontChange: (font: string) => void;
  onSelectTemplate: (template: Template) => void;
  selectedPhoto: string;
  onPhotoChange: (photoId: string) => void;
  title: string;
  subtitle: string;
  content: string;
  headingFont: string;
  bodyFont: string;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({
  isControlsCollapsed,
  isPreviewCollapsed,
  onToggleControls,
  onTogglePreview,
  selectedTheme,
  onThemeChange,
  selectedHeadingFont,
  selectedBodyFont,
  onHeadingFontChange,
  onBodyFontChange,
  onSelectTemplate,
  selectedPhoto,
  onPhotoChange,
  title,
  subtitle,
  content,
  headingFont,
  bodyFont,
}) => {
  return (
    <div className="w-1/2 flex flex-col">
      <ControlsSection
        isCollapsed={isControlsCollapsed}
        onToggleCollapse={onToggleControls}
        selectedTheme={selectedTheme}
        onThemeChange={onThemeChange}
        selectedHeadingFont={selectedHeadingFont}
        selectedBodyFont={selectedBodyFont}
        onHeadingFontChange={onHeadingFontChange}
        onBodyFontChange={onBodyFontChange}
        onSelectTemplate={onSelectTemplate}
        selectedPhoto={selectedPhoto}
        onPhotoChange={onPhotoChange}
        title={title}
        subtitle={subtitle}
        content={content}
      />
      
      <PreviewSection
        isCollapsed={isPreviewCollapsed}
        onToggleCollapse={onTogglePreview}
        content={content}
        title={title}
        subtitle={subtitle}
        selectedTheme={selectedTheme}
        selectedPhoto={selectedPhoto}
        headingFont={headingFont}
        bodyFont={bodyFont}
      />
    </div>
  );
};
