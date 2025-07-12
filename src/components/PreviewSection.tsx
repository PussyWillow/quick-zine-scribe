
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
  headingFont,
  bodyFont,
}) => {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-between p-3 bg-white border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Preview</span>
        </div>
        <button
          onClick={onToggleCollapse}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          {isCollapsed ? (
            <EyeOff className="w-4 h-4 text-gray-600" />
          ) : (
            <Eye className="w-4 h-4 text-gray-600" />
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
            headingFont={headingFont}
            bodyFont={bodyFont}
          />
        </div>
      )}
    </div>
  );
};
