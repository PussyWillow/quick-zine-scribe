
import React, { useState } from 'react';
import { Palette, Shuffle, Grid3X3 } from 'lucide-react';
import { Theme, themes } from './ThemeSelector';

interface VisualThemeSelectorProps {
  selectedTheme: string;
  onThemeChange: (themeId: string) => void;
}

const VisualThemeSelector: React.FC<VisualThemeSelectorProps> = ({ 
  selectedTheme, 
  onThemeChange 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories = [
    { id: 'all', name: 'All', count: themes.length },
    { id: 'professional', name: 'Professional', count: themes.filter(t => t.category === 'professional').length },
    { id: 'creative', name: 'Creative', count: themes.filter(t => t.category === 'creative').length },
    { id: 'artistic', name: 'Artistic', count: themes.filter(t => t.category === 'artistic').length },
    { id: 'experimental', name: 'Experimental', count: themes.filter(t => t.category === 'experimental').length }
  ];

  const filteredThemes = selectedCategory === 'all' 
    ? themes 
    : themes.filter(theme => theme.category === selectedCategory);

  const handleRandomTheme = () => {
    const availableThemes = selectedCategory === 'all' ? themes : filteredThemes;
    const randomTheme = availableThemes[Math.floor(Math.random() * availableThemes.length)];
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
          Theme/Vibe
        </label>
        <button
          onClick={handleRandomTheme}
          className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-md transition-colors"
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
                ? 'bg-purple-600 text-white'
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
                ? 'border-purple-500 ring-2 ring-purple-200'
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
                  textShadow: theme.styles.shadowLevel === 'neon' || theme.styles.shadowLevel === 'glow' 
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
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 text-white rounded-full flex items-center justify-center">
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
      </div>
    </div>
  );
};

export default VisualThemeSelector;
