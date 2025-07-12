
import React from 'react';
import VisualThemeSelector from './VisualThemeSelector';
import FontSelector from './FontSelector';
import TemplateSelector, { Template } from './TemplateSelector';
import ExportButtons from './ExportButtons';
import { ArchetypeGenerator } from './ArchetypeGenerator';
import { Button } from './ui/button';
import { HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleQuestionsClick = () => {
    navigate('/questions');
  };

  return (
    <div className="controls-frame">
      <div className="flex items-center justify-between p-3 border-b border-border/50">
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
        <div className="p-4 space-y-4 max-h-64 overflow-y-auto">
          <div className="control-group-frame">
            <TemplateSelector onSelectTemplate={onSelectTemplate} />
          </div>
          
          <div className="control-group-frame">
            <VisualThemeSelector 
              selectedTheme={selectedTheme}
              onThemeChange={onThemeChange}
            />
          </div>
          
          <div className="control-group-frame">
            <FontSelector
              selectedHeadingFont={selectedHeadingFont}
              selectedBodyFont={selectedBodyFont}
              onHeadingFontChange={onHeadingFontChange}
              onBodyFontChange={onBodyFontChange}
            />
          </div>

          <div className="control-group-frame">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 tracking-wide uppercase">
                Creative Tools
              </h3>
              <div className="flex gap-2">
                <ArchetypeGenerator />
                <Button
                  onClick={handleQuestionsClick}
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-blue-500/10 border-blue-500/30 text-blue-500 hover:bg-blue-500/20 hover:border-blue-500/50 hover:text-blue-500 transition-all duration-200 hover:scale-105 hover:shadow-md font-heading"
                >
                  <HelpCircle className="w-4 h-4" />
                  Questions?
                </Button>
              </div>
            </div>
          </div>
          
          <div className="control-group-frame">
            <ExportButtons
              title={title}
              subtitle={subtitle}
              content={content}
              selectedTheme={selectedTheme}
            />
          </div>
        </div>
      )}
    </div>
  );
};
