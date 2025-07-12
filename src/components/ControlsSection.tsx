
import React from 'react';
import VisualThemeSelector from './VisualThemeSelector';
import FontSelector from './FontSelector';
import TemplateSelector, { Template } from './TemplateSelector';
import ExportButtons from './ExportButtons';
import { Settings, ChevronUp, ChevronDown } from 'lucide-react';

interface ControlsSectionProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
  selectedHeadingFont: string;
  selectedBodyFont: string;
  onHeadingFontChange: (font: string) => void;
  onBodyFontChange: (font: string) => void;
  onSelectTemplate: (template: Template) => void;
  title: string;
  subtitle: string;
  content: string;
}

export const ControlsSection: React.FC<ControlsSectionProps> = ({
  isCollapsed,
  onToggleCollapse,
  selectedTheme,
  onThemeChange,
  selectedHeadingFont,
  selectedBodyFont,
  onHeadingFontChange,
  onBodyFontChange,
  onSelectTemplate,
  title,
  subtitle,
  content,
}) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between p-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Controls</span>
        </div>
        <button
          onClick={onToggleCollapse}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          {isCollapsed ? (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronUp className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>
      
      {!isCollapsed && (
        <div className="p-4 space-y-4 max-h-64 overflow-y-auto">
          <TemplateSelector onSelectTemplate={onSelectTemplate} />
          
          <VisualThemeSelector 
            selectedTheme={selectedTheme}
            onThemeChange={onThemeChange}
          />
          
          <FontSelector
            selectedHeadingFont={selectedHeadingFont}
            selectedBodyFont={selectedBodyFont}
            onHeadingFontChange={onHeadingFontChange}
            onBodyFontChange={onBodyFontChange}
          />
          
          <ExportButtons
            title={title}
            subtitle={subtitle}
            content={content}
            selectedTheme={selectedTheme}
          />
        </div>
      )}
    </div>
  );
};
