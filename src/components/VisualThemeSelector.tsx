
import React, { useState } from 'react';
import { Palette, Shuffle, Grid3X3 } from 'lucide-react';
import { Theme } from '../types/theme';
import { themes } from '../data/themes';
import { useGothicMode } from '@/contexts/GothicModeContext';
import { getGothicThemes } from '../utils/themeUtils';

interface VisualThemeSelectorProps {
  selectedTheme: string;
  onThemeChange: (themeId: string) => void;
}

const VisualThemeSelector: React.FC<VisualThemeSelectorProps> = ({ 
  selectedTheme, 
  onThemeChange 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { isGothicMode } = useGothicMode();
  
  // Filter themes based on gothic mode
  const availableThemes = isGothicMode 
    ? themes.filter(theme => getGothicThemes().includes(theme.id))
    : themes;

  const categories = [
    { id: 'all', name: 'All', count: availableThemes.length },
    { id: 'professional', name: 'Professional', count: availableThemes.filter(t => t.category === 'professional').length },
    { id: 'creative', name: 'Creative', count: availableThemes.filter(t => t.category === 'creative').length },
    { id: 'artistic', name: 'Artistic', count: availableThemes.filter(t => t.category === 'artistic').length },
    { id: 'experimental', name: 'Experimental', count: availableThemes.filter(t => t.category === 'experimental').length }
  ].filter(cat => cat.count > 0); // Only show categories with themes

  const filteredThemes = selectedCategory === 'all' 
    ? availableThemes 
    : availableThemes.filter(theme => theme.category === selectedCategory);

  const handleRandomTheme = () => {
    const availableForRandom = selectedCategory === 'all' ? availableThemes : filteredThemes;
    const randomTheme = availableForRandom[Math.floor(Math.random() * availableForRandom.length)];
    onThemeChange(randomTheme.id);
  };

  const getThemePreviewStyle = (theme: Theme) => ({
    background: theme.styles.background,
    color: theme.styles.text,
    fontFamily: theme.styles.headingFont
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <Palette className="w-4 h-4" />
          {isGothicMode ? 'Gothic Themes' : 'Theme/Vibe'}
        </label>
        <button
          onClick={handleRandomTheme}
          className={`flex items-center gap-1 px-2 py-1 text-xs rounded-md transition-colors ${
            isGothicMode
              ? 'bg-red-900 hover:bg-red-800 text-red-100'
              : 'bg-purple-100 hover:bg-purple-200 text-purple-700'
          }`}
          title="Pick a random theme"
        >
          <Shuffle className="w-3 h-3" />
          Random
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-1">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-2 py-1 text-xs rounded-md transition-colors ${
              selectedCategory === category.id
                ? isGothicMode
                  ? 'bg-red-800 text-red-100'
                  : 'bg-purple-600 text-white'
                : isGothicMode
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>

      {/* Theme Grid */}
      <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
        {filteredThemes.map(theme => (
          <button
            key={theme.id}
            onClick={() => onThemeChange(theme.id)}
            className={`relative p-3 rounded-lg border-2 transition-all hover:scale-105 ${
              selectedTheme === theme.id
                ? isGothicMode
                  ? 'border-red-500 ring-2 ring-red-200'
                  : 'border-purple-500 ring-2 ring-purple-200'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            style={getThemePreviewStyle(theme)}
          >
            {/* Background texture overlay */}
            {theme.styles.backgroundTexture && (
              <div 
                className="absolute inset-0 opacity-10 rounded-lg pointer-events-none"
                style={{
                  backgroundImage: theme.styles.backgroundTexture === 'paper' 
                    ? 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)'
                    : theme.styles.backgroundTexture === 'damask'
                    ? 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(139,0,0,0.1) 10px, rgba(139,0,0,0.1) 20px)'
                    : 'none',
                  backgroundSize: '10px 10px'
                }}
              />
            )}
            
            {/* Theme Preview Content */}
            <div className="relative z-10 text-left">
              <div 
                className="text-sm font-bold mb-1 truncate"
                style={{ 
                  color: theme.styles.accent,
                  textShadow: ['neon', 'glow', 'gothic', 'dramatic', 'occult'].includes(theme.styles.shadowLevel)
                    ? `0 0 4px ${theme.styles.accent}` 
                    : 'none'
                }}
              >
                {theme.name}
              </div>
              <div className="text-xs opacity-70 mb-2 line-clamp-2">
                {theme.description}
              </div>
              
              {/* Mini preview elements */}
              <div className="space-y-1">
                <div 
                  className="h-1 rounded"
                  style={{ backgroundColor: theme.styles.accent, opacity: 0.8 }}
                />
                <div 
                  className="h-1 w-3/4 rounded"
                  style={{ backgroundColor: theme.styles.text, opacity: 0.4 }}
                />
                <div 
                  className="h-1 w-1/2 rounded"
                  style={{ backgroundColor: theme.styles.text, opacity: 0.4 }}
                />
              </div>
            </div>

            {/* Category Badge */}
            <div className="absolute top-1 right-1">
              <span className="px-1 py-0.5 text-xs bg-black/20 text-white rounded capitalize">
                {theme.category.charAt(0)}
              </span>
            </div>

            {/* Selected Indicator */}
            {selectedTheme === theme.id && (
              <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center ${
                isGothicMode ? 'bg-red-600' : 'bg-purple-500'
              } text-white`}>
                <Grid3X3 className="w-2 h-2" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Current Theme Info */}
      <div className="text-xs text-gray-500 text-center">
        {filteredThemes.length} theme{filteredThemes.length !== 1 ? 's' : ''} available
        {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
        {isGothicMode && (
          <div className="mt-1 text-red-400 gothic-text-glow">
            Gothic Mode Active
          </div>
        )}
      </div>
    </div>
  );
};

export default VisualThemeSelector;
