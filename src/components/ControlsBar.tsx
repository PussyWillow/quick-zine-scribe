
import React from 'react';
import { ControlsAccordion } from './ControlsAccordion';
import { Template } from '../data/templates';
import { Settings } from 'lucide-react';

interface ControlsBarProps {
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

export const ControlsBar: React.FC<ControlsBarProps> = ({
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
    <div className="h-full bg-card border-b border-border">
      <div className="flex items-center gap-2 p-3 border-b border-border/50 flex-shrink-0">
        <Settings className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">Controls</span>
      </div>
      
      <div className="p-4 h-full overflow-y-auto">
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
    </div>
  );
};
