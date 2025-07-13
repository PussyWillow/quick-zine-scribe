
import React, { useState } from 'react';
import { Settings, ChevronUp, ChevronDown, Palette, Type, FileText, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import VisualThemeSelector from './VisualThemeSelector';
import FontSelector from './FontSelector';
import TemplateSelector from './TemplateSelector';
import ExportButtons from './ExportButtons';
import { Template } from '../data/templates';
import { useIsMobile } from '../hooks/use-mobile';

interface ResponsiveControlsBarProps {
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
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const ResponsiveControlsBar: React.FC<ResponsiveControlsBarProps> = ({
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
  isCollapsed,
  onToggleCollapse,
}) => {
  const [activeTab, setActiveTab] = useState('templates');
  const isMobile = useIsMobile();

  return (
    <div className="h-full bg-card flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/30 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Creative Controls</span>
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
        <div className="flex-1 p-4 overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} mb-4`}>
              <TabsTrigger value="templates" className="flex items-center gap-2 text-xs sm:text-sm">
                <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Templates</span>
              </TabsTrigger>
              <TabsTrigger value="themes" className="flex items-center gap-2 text-xs sm:text-sm">
                <Palette className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Themes</span>
              </TabsTrigger>
              {!isMobile && (
                <>
                  <TabsTrigger value="typography" className="flex items-center gap-2 text-xs sm:text-sm">
                    <Type className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Typography</span>
                  </TabsTrigger>
                  <TabsTrigger value="export" className="flex items-center gap-2 text-xs sm:text-sm">
                    <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Export</span>
                  </TabsTrigger>
                </>
              )}
            </TabsList>

            <div className="space-y-4">
              <TabsContent value="templates" className="mt-0">
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Choose a Template</h3>
                  <TemplateSelector onSelectTemplate={onSelectTemplate} />
                </div>
              </TabsContent>

              <TabsContent value="themes" className="mt-0">
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Visual Theme</h3>
                  <VisualThemeSelector 
                    selectedTheme={selectedTheme}
                    onThemeChange={onThemeChange}
                  />
                </div>
              </TabsContent>

              <TabsContent value="typography" className="mt-0">
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Typography</h3>
                  <FontSelector
                    selectedHeadingFont={selectedHeadingFont}
                    selectedBodyFont={selectedBodyFont}
                    onHeadingFontChange={onHeadingFontChange}
                    onBodyFontChange={onBodyFontChange}
                  />
                </div>
              </TabsContent>

              <TabsContent value="export" className="mt-0">
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Export Options</h3>
                  <ExportButtons
                    title={title}
                    subtitle={subtitle}
                    content={content}
                    selectedTheme={selectedTheme}
                  />
                </div>
              </TabsContent>

              {/* Mobile: Typography and Export in second row */}
              {isMobile && (
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/30">
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-foreground">Typography</h3>
                    <FontSelector
                      selectedHeadingFont={selectedHeadingFont}
                      selectedBodyFont={selectedBodyFont}
                      onHeadingFontChange={onHeadingFontChange}
                      onBodyFontChange={onBodyFontChange}
                    />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-foreground">Export</h3>
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
          </Tabs>
        </div>
      )}
    </div>
  );
};
