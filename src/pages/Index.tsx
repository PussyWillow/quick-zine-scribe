
import React, { useState } from 'react';
import { AppHeader } from '../components/AppHeader';
import { EditorPanel } from '../components/EditorPanel';
import { PreviewSection } from '../components/PreviewSection';
import { ControlsBar } from '../components/ControlsBar';
import FloatingPhotoGallery from '../components/FloatingPhotoGallery';
import { fonts } from '../components/FontSelector';
import { Template } from '../data/templates';

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
  const [selectedPhoto, setSelectedPhoto] = useState('none');
  const [showAuthModal, setShowAuthModal] = useState(false);

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
    <div className="min-h-screen bg-background">
      <AppHeader 
        showAuthModal={showAuthModal}
        setShowAuthModal={setShowAuthModal}
      />

      <div className="flex flex-col h-[calc(100vh-73px)]">
        {/* Controls Section - Top 1/3 */}
        <div className="h-1/3 min-h-[200px]">
          <ControlsBar
            selectedTheme={selectedTheme}
            onThemeChange={setSelectedTheme}
            selectedHeadingFont={selectedHeadingFont}
            selectedBodyFont={selectedBodyFont}
            onHeadingFontChange={setSelectedHeadingFont}
            onBodyFontChange={setSelectedBodyFont}
            onSelectTemplate={handleSelectTemplate}
            title={title}
            subtitle={subtitle}
            content={content}
          />
        </div>

        {/* Editor and Preview Section - Bottom 2/3 Side by Side */}
        <div className="flex h-2/3 min-h-[400px]">
          {/* Editor - Left Half */}
          <div className="w-1/2 border-r border-border">
            <EditorPanel
              content={content}
              onChange={setContent}
              title={title}
              subtitle={subtitle}
              onTitleChange={setTitle}
              onSubtitleChange={setSubtitle}
            />
          </div>

          {/* Preview - Right Half */}
          <div className="w-1/2">
            <PreviewSection
              isCollapsed={false}
              onToggleCollapse={() => {}}
              content={content}
              title={title}
              subtitle={subtitle}
              selectedTheme={selectedTheme}
              selectedPhoto={selectedPhoto}
              headingFont={headingFont}
              bodyFont={bodyFont}
            />
          </div>
        </div>
      </div>

      {/* Floating Photo Gallery */}
      <FloatingPhotoGallery
        selectedPhoto={selectedPhoto}
        onPhotoChange={setSelectedPhoto}
      />
    </div>
  );
};

export default Index;
