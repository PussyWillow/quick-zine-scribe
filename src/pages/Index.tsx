
import React, { useState } from 'react';
import { AppHeader } from '../components/AppHeader';
import { EditorPanel } from '../components/EditorPanel';
import { PreviewSection } from '../components/PreviewSection';
import { ResponsiveControlsBar } from '../components/ResponsiveControlsBar';
import PhotoControlsSection from '../components/PhotoControlsSection';
import { fonts } from '../components/FontSelector';
import { Template } from '../data/templates';
import { useIsMobile } from '../hooks/use-mobile';

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
  
  // Photo control states
  const [photoOpacity, setPhotoOpacity] = useState(10);
  const [photoPosition, setPhotoPosition] = useState('center');
  const [photoScale, setPhotoScale] = useState(1);
  const [blendMode, setBlendMode] = useState('multiply');
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [controlsCollapsed, setControlsCollapsed] = useState(false);
  const [photoControlsCollapsed, setPhotoControlsCollapsed] = useState(false);
  
  const isMobile = useIsMobile();

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

      <div className="flex flex-col min-h-[calc(100vh-73px)] gap-3 p-3">
        {/* Top Section - Theme & Font Controls */}
        <div className="bg-card rounded-lg shadow-sm border border-border/50 overflow-hidden">
          <ResponsiveControlsBar
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
            isCollapsed={controlsCollapsed}
            onToggleCollapse={() => setControlsCollapsed(!controlsCollapsed)}
          />
        </div>

        {/* Middle Section - Photo Controls (Prominent) */}
        <PhotoControlsSection
          selectedPhoto={selectedPhoto}
          onPhotoChange={setSelectedPhoto}
          photoOpacity={photoOpacity}
          onOpacityChange={setPhotoOpacity}
          photoPosition={photoPosition}
          onPositionChange={setPhotoPosition}
          photoScale={photoScale}
          onScaleChange={setPhotoScale}
          blendMode={blendMode}
          onBlendModeChange={setBlendMode}
          isCollapsed={photoControlsCollapsed}
          onToggleCollapse={() => setPhotoControlsCollapsed(!photoControlsCollapsed)}
        />

        {/* Bottom Section - Editor and Preview */}
        <div className="flex-1 flex flex-col lg:flex-row gap-3 min-h-[400px]">
          {/* Editor - Mobile: Full width, Desktop: Half width */}
          <div className="flex-1 lg:w-1/2 bg-card rounded-lg shadow-sm border border-border/50 overflow-hidden">
            <EditorPanel
              content={content}
              onChange={setContent}
              title={title}
              subtitle={subtitle}
              onTitleChange={setTitle}
              onSubtitleChange={setSubtitle}
            />
          </div>

          {/* Preview - Mobile: Full width, Desktop: Half width */}
          <div className="flex-1 lg:w-1/2 bg-card rounded-lg shadow-sm border border-border/50 overflow-hidden">
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
              photoOpacity={photoOpacity}
              photoPosition={photoPosition}
              photoScale={photoScale}
              blendMode={blendMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
