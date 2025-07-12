
import React from 'react';
import VisualThemeSelector from './VisualThemeSelector';
import FontSelector from './FontSelector';
import TemplateSelector, { Template } from './TemplateSelector';
import ExportButtons from './ExportButtons';
import { ArchetypeGenerator } from './ArchetypeGenerator';
import { Button } from './ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
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
        <div className="p-4 max-h-64 overflow-y-auto">
          <Accordion type="multiple" defaultValue={["templates", "themes"]} className="space-y-2">
            {/* Templates & Tools Section */}
            <AccordionItem value="templates" className="control-group-frame">
              <AccordionTrigger className="text-sm font-semibold text-muted-foreground hover:no-underline px-0">
                Templates & Tools
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                <TemplateSelector onSelectTemplate={onSelectTemplate} />
                
                <div className="space-y-3">
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Need Help?
                  </h4>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleQuestionsClick}
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-2 bg-blue-500/10 border-blue-500/30 text-blue-500 hover:bg-blue-500/20 hover:border-blue-500/50 hover:text-blue-500 transition-all duration-200 hover:scale-105 hover:shadow-md font-heading"
                    >
                      <HelpCircle className="w-4 h-4" />
                      Questions?
                    </Button>
                    <ArchetypeGenerator />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Themes Section */}
            <AccordionItem value="themes" className="control-group-frame">
              <AccordionTrigger className="text-sm font-semibold text-muted-foreground hover:no-underline px-0">
                Themes
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <VisualThemeSelector 
                  selectedTheme={selectedTheme}
                  onThemeChange={onThemeChange}
                />
              </AccordionContent>
            </AccordionItem>
            
            {/* Typography Section */}
            <AccordionItem value="typography" className="control-group-frame">
              <AccordionTrigger className="text-sm font-semibold text-muted-foreground hover:no-underline px-0">
                Typography
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <FontSelector
                  selectedHeadingFont={selectedHeadingFont}
                  selectedBodyFont={selectedBodyFont}
                  onHeadingFontChange={onHeadingFontChange}
                  onBodyFontChange={onBodyFontChange}
                />
              </AccordionContent>
            </AccordionItem>
            
            {/* Export Options Section */}
            <AccordionItem value="export" className="control-group-frame">
              <AccordionTrigger className="text-sm font-semibold text-muted-foreground hover:no-underline px-0">
                Export Options
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <ExportButtons
                  title={title}
                  subtitle={subtitle}
                  content={content}
                  selectedTheme={selectedTheme}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </div>
  );
};
