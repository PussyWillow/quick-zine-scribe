
import React from 'react';
import ZinePreview from './ZinePreview';
import { Eye, EyeOff } from 'lucide-react';

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
}) => {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-between p-3 bg-card border-b border-border">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Preview</span>
        </div>
        <button
          onClick={onToggleCollapse}
          className="p-1 hover:bg-muted rounded transition-colors"
        >
          {isCollapsed ? (
            <EyeOff className="w-4 h-4 text-muted-foreground" />
          ) : (
            <Eye className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </div>
      
      {!isCollapsed && (
        <div className="flex-1">
          <ZinePreview
            content={content}
            title={title}
            subtitle={subtitle}
            selectedTheme={selectedTheme}
            selectedPhoto={selectedPhoto}
            headingFont={headingFont}
            bodyFont={bodyFont}
          />
        </div>
      )}
    </div>
  );
};
