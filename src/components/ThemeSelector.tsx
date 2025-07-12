
import React from 'react';
import { Palette, ChevronDown } from 'lucide-react';
import { Theme } from '../types/theme';
import { themes } from '../data/themes';
import ThemePreview from './ThemePreview';

interface ThemeSelectorProps {
  selectedTheme: string;
  onThemeChange: (themeId: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ selectedTheme, onThemeChange }) => {
  const currentTheme = themes.find(t => t.id === selectedTheme) || themes[0];
  
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-600 mb-2">
        <Palette className="inline w-4 h-4 mr-1" />
        Theme/Vibe
      </label>
      <div className="relative">
        <select
          value={selectedTheme}
          onChange={(e) => onThemeChange(e.target.value)}
          className="w-full appearance-none bg-white border border-gray-200 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
        >
          {themes.map(theme => (
            <option key={theme.id} value={theme.id}>
              {theme.name} - {theme.description}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
      
      <ThemePreview theme={currentTheme} />
    </div>
  );
};

export default ThemeSelector;
