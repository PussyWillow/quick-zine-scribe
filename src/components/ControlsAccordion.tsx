
import React from 'react';
import VisualThemeSelector from './VisualThemeSelector';
import FontSelector from './FontSelector';
import TemplateSelector, { Template } from './TemplateSelector';
import ExportButtons from './ExportButtons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

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
    <Accordion type="multiple" defaultValue={["templates", "themes"]} className="space-y-2">
      {/* Templates Section */}
      <AccordionItem value="templates" className="control-group-frame">
        <AccordionTrigger className="text-sm font-semibold text-muted-foreground hover:no-underline px-0">
          Templates
        </AccordionTrigger>
        <AccordionContent className="pt-2">
          <TemplateSelector onSelectTemplate={onSelectTemplate} />
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
  );
};
