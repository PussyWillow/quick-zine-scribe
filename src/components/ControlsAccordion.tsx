
import React from 'react';
import VisualThemeSelector from './VisualThemeSelector';
import FontSelector from './FontSelector';
import TemplateSelector from './TemplateSelector';
import ExportButtons from './ExportButtons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Template } from '../data/templates';

interface ControlsAccordionProps {
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

export const ControlsAccordion: React.FC<ControlsAccordionProps> = ({
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
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
      {/* Templates Section */}
      <div className="control-group-frame">
        <Accordion type="single" defaultValue="templates" collapsible>
          <AccordionItem value="templates" className="border-none">
            <AccordionTrigger className="text-sm font-semibold text-muted-foreground hover:no-underline px-0 py-3">
              Templates
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-0">
              <TemplateSelector onSelectTemplate={onSelectTemplate} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Themes Section */}
      <div className="control-group-frame">
        <Accordion type="single" defaultValue="themes" collapsible>
          <AccordionItem value="themes" className="border-none">
            <AccordionTrigger className="text-sm font-semibold text-muted-foreground hover:no-underline px-0 py-3">
              Themes
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-0">
              <VisualThemeSelector 
                selectedTheme={selectedTheme}
                onThemeChange={onThemeChange}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      {/* Typography Section */}
      <div className="control-group-frame">
        <Accordion type="single" defaultValue="typography" collapsible>
          <AccordionItem value="typography" className="border-none">
            <AccordionTrigger className="text-sm font-semibold text-muted-foreground hover:no-underline px-0 py-3">
              Typography
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-0">
              <FontSelector
                selectedHeadingFont={selectedHeadingFont}
                selectedBodyFont={selectedBodyFont}
                onHeadingFontChange={onHeadingFontChange}
                onBodyFontChange={onBodyFontChange}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      {/* Export Options Section */}
      <div className="control-group-frame">
        <Accordion type="single" defaultValue="export" collapsible>
          <AccordionItem value="export" className="border-none">
            <AccordionTrigger className="text-sm font-semibold text-muted-foreground hover:no-underline px-0 py-3">
              Export Options
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-0">
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
    </div>
  );
};
