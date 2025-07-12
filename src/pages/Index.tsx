
import React, { useState } from 'react';
import MarkdownEditor from '../components/MarkdownEditor';
import ZinePreview from '../components/ZinePreview';
import ThemeSelector from '../components/ThemeSelector';
import FontSelector, { fonts } from '../components/FontSelector';
import TemplateSelector, { Template } from '../components/TemplateSelector';
import ExportButtons from '../components/ExportButtons';
import { Zap } from 'lucide-react';

const Index = () => {
  const [content, setContent] = useState(`# Welcome to Flash Zine

This is your creative space for quick newsletter and zine creation.

## Getting Started

Write your content using **markdown formatting**. You can:

- Create **bold** and *italic* text
- Add [links](https://example.com)
- Make lists and headers
- Express your unique voice

## Your Story

Every zine tells a story. What's yours?

Start writing and watch your words come to life with beautiful themes.

---

*Created with Flash Zine - where ideas become beautiful publications.*`);

  const [title, setTitle] = useState('My Flash Zine');
  const [subtitle, setSubtitle] = useState('A quick publication');
  const [selectedTheme, setSelectedTheme] = useState('dreamy');
  const [selectedHeadingFont, setSelectedHeadingFont] = useState('playfair');
  const [selectedBodyFont, setSelectedBodyFont] = useState('inter');

  const handleSelectTemplate = (template: Template) => {
    setTitle(template.title);
    setSubtitle(template.subtitle);
    setContent(template.content);
    setSelectedTheme(template.suggestedTheme);
  };

  // Get actual font families for preview
  const headingFont = fonts.find(f => f.id === selectedHeadingFont)?.fontFamily || fonts[0].fontFamily;
  const bodyFont = fonts.find(f => f.id === selectedBodyFont)?.fontFamily || fonts[4].fontFamily;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-800">Flash Zine</h1>
            </div>
            <span className="text-sm text-gray-500 hidden sm:inline">
              Quick newsletter & zine creator
            </span>
          </div>
          
          <div className="text-sm text-gray-500">
            Start writing → Choose style → Export
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Panel - Editor */}
        <div className="w-1/2 flex flex-col">
          <MarkdownEditor
            content={content}
            onChange={setContent}
            title={title}
            subtitle={subtitle}
            onTitleChange={setTitle}
            onSubtitleChange={setSubtitle}
          />
        </div>

        {/* Right Panel - Preview & Controls */}
        <div className="w-1/2 flex flex-col">
          {/* Controls */}
          <div className="bg-white border-b border-gray-200 p-4 space-y-4 max-h-80 overflow-y-auto">
            <TemplateSelector onSelectTemplate={handleSelectTemplate} />
            
            <ThemeSelector 
              selectedTheme={selectedTheme}
              onThemeChange={setSelectedTheme}
            />
            
            <FontSelector
              selectedHeadingFont={selectedHeadingFont}
              selectedBodyFont={selectedBodyFont}
              onHeadingFontChange={setSelectedHeadingFont}
              onBodyFontChange={setSelectedBodyFont}
            />
            
            <ExportButtons
              title={title}
              subtitle={subtitle}
              content={content}
              selectedTheme={selectedTheme}
            />
          </div>
          
          {/* Preview */}
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
        </div>
      </div>
    </div>
  );
};

export default Index;
