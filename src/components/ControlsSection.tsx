
import React from 'react';
import { ControlsAccordion } from './ControlsAccordion';
import { Template } from '../data/templates';
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
    <div className="controls-frame flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-border/50 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Controls</span>
        </div>
        <button
          onClick={onToggleCollapse}
          className="p-1 hover:bg-muted rounded transition-colors"
        >
          {isCollapsed ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </div>
      
      {!isCollapsed && (
        <div className="flex-1 p-6 overflow-y-auto min-h-0">
          <ControlsAccordion
            selectedTheme={selectedTheme}
            onThemeChange={onThemeChange}
            selectedHeadingFont={selectedHeadingFont}
            selectedBodyFont={selectedBodyFont}
            onHeadingFontChange={onHeadingFontChange}
            onBodyFontChange={onBodyFontChange}
            onSelectTemplate={onSelectTemplate}
            title={title}
            subtitle={subtitle}
            content={content}
          />
        </div>
      )}
    </div>
  );
};
