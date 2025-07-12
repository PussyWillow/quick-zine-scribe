
import React, { useState } from 'react';
import { AppHeader } from '../components/AppHeader';
import { EditorPanel } from '../components/EditorPanel';
import { PreviewPanel } from '../components/PreviewPanel';
import { fonts } from '../components/FontSelector';
import { Template } from '../components/TemplateSelector';

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
  const [isControlsCollapsed, setIsControlsCollapsed] = useState(false);
  const [isPreviewCollapsed, setIsPreviewCollapsed] = useState(false);
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

      <div className="flex h-[calc(100vh-73px)]">
        <EditorPanel
          content={content}
          onChange={setContent}
          title={title}
          subtitle={subtitle}
          onTitleChange={setTitle}
          onSubtitleChange={setSubtitle}
        />

        <PreviewPanel
          isControlsCollapsed={isControlsCollapsed}
          isPreviewCollapsed={isPreviewCollapsed}
          onToggleControls={() => setIsControlsCollapsed(!isControlsCollapsed)}
          onTogglePreview={() => setIsPreviewCollapsed(!isPreviewCollapsed)}
          selectedTheme={selectedTheme}
          onThemeChange={setSelectedTheme}
          selectedHeadingFont={selectedHeadingFont}
          selectedBodyFont={selectedBodyFont}
          onHeadingFontChange={setSelectedHeadingFont}
          onBodyFontChange={setSelectedBodyFont}
          onSelectTemplate={handleSelectTemplate}
          selectedPhoto={selectedPhoto}
          onPhotoChange={setSelectedPhoto}
          title={title}
          subtitle={subtitle}
          content={content}
          headingFont={headingFont}
          bodyFont={bodyFont}
        />
      </div>
    </div>
  );
};

export default Index;
