
import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import ZinePreview from './ZinePreview';

interface PreviewSectionProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  content: string;
  title: string;
  subtitle: string;
  selectedTheme: string;
  selectedPhoto: string;
  headingFont: string;
  bodyFont: string;
  photoOpacity?: number;
  photoPosition?: string;
  photoScale?: number;
  blendMode?: string;
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({
  isCollapsed,
  onToggleCollapse,
  content,
  title,
  subtitle,
  selectedTheme,
  selectedPhoto,
  headingFont,
  bodyFont,
  photoOpacity,
  photoPosition,
  photoScale,
  blendMode,
}) => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/30 bg-card">
        <h3 className="text-lg font-semibold text-foreground font-heading">Preview</h3>
        <button
          onClick={onToggleCollapse}
          className="p-2 hover:bg-muted rounded-md transition-colors"
          aria-label={isCollapsed ? 'Expand preview' : 'Collapse preview'}
        >
          {isCollapsed ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Preview Content */}
      {!isCollapsed && (
        <div className="flex-1 min-h-0">
          <ZinePreview
            content={content}
            title={title}
            subtitle={subtitle}
            selectedTheme={selectedTheme}
            selectedPhoto={selectedPhoto}
            headingFont={headingFont}
            bodyFont={bodyFont}
            photoOpacity={photoOpacity}
            photoPosition={photoPosition}
            photoScale={photoScale}
            blendMode={blendMode}
          />
        </div>
      )}
    </div>
  );
};
