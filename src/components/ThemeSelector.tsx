
import React from 'react';
import { Palette, ChevronDown } from 'lucide-react';

export interface Theme {
  id: string;
  name: string;
  description: string;
  styles: {
    background: string;
    text: string;
    accent: string;
    headingFont: string;
    bodyFont: string;
    spacing: string;
  };
}

export const themes: Theme[] = [
  {
    id: 'dreamy',
    name: 'Dreamy',
    description: 'Soft pastels and flowing typography',
    styles: {
      background: 'linear-gradient(135deg, #ffeef8 0%, #f0f4ff 100%)',
      text: '#4a5568',
      accent: '#9f7aea',
      headingFont: 'Georgia, serif',
      bodyFont: 'system-ui, sans-serif',
      spacing: 'relaxed'
    }
  },
  {
    id: 'urgent',
    name: 'Urgent',
    description: 'Bold reds and tight spacing',
    styles: {
      background: '#fff5f5',
      text: '#1a1a1a',
      accent: '#e53e3e',
      headingFont: 'Impact, Arial Black, sans-serif',
      bodyFont: 'Arial, sans-serif',
      spacing: 'tight'
    }
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Timeless newspaper style',
    styles: {
      background: '#fffef7',
      text: '#2d3748',
      accent: '#2b6cb0',
      headingFont: 'Times New Roman, serif',
      bodyFont: 'Times New Roman, serif',
      spacing: 'normal'
    }
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean lines and minimal design',
    styles: {
      background: '#ffffff',
      text: '#1f2937',
      accent: '#10b981',
      headingFont: 'Inter, sans-serif',
      bodyFont: 'Inter, sans-serif',
      spacing: 'loose'
    }
  }
];

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
      
      {/* Theme Preview */}
      <div className="mt-2 p-3 rounded-md border border-gray-200">
        <div 
          className="w-full h-8 rounded mb-2"
          style={{ background: currentTheme.styles.background }}
        />
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <span 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: currentTheme.styles.accent }}
          />
          <span>{currentTheme.description}</span>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
