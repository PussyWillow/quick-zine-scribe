
import React from 'react';
import { Palette, ChevronDown } from 'lucide-react';

export interface Theme {
  id: string;
  name: string;
  description: string;
  category: 'professional' | 'creative' | 'artistic' | 'experimental';
  styles: {
    background: string;
    text: string;
    accent: string;
    headingFont: string;
    bodyFont: string;
    spacing: string;
    borderRadius: string;
    shadowLevel: string;
    backgroundTexture?: string;
    listStyle: string;
  };
}

export const themes: Theme[] = [
  {
    id: 'dreamy',
    name: 'Dreamy',
    description: 'Soft pastels and flowing typography',
    category: 'artistic',
    styles: {
      background: 'linear-gradient(135deg, #ffeef8 0%, #f0f4ff 100%)',
      text: '#4a5568',
      accent: '#9f7aea',
      headingFont: 'Georgia, serif',
      bodyFont: 'system-ui, sans-serif',
      spacing: 'relaxed',
      borderRadius: 'rounded',
      shadowLevel: 'soft',
      listStyle: 'decorative'
    }
  },
  {
    id: 'urgent',
    name: 'Urgent',
    description: 'Bold reds and tight spacing',
    category: 'professional',
    styles: {
      background: '#fff5f5',
      text: '#1a1a1a',
      accent: '#e53e3e',
      headingFont: 'Impact, Arial Black, sans-serif',
      bodyFont: 'Arial, sans-serif',
      spacing: 'tight',
      borderRadius: 'sharp',
      shadowLevel: 'none',
      listStyle: 'bold'
    }
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Timeless newspaper style',
    category: 'professional',
    styles: {
      background: '#fffef7',
      text: '#2d3748',
      accent: '#2b6cb0',
      headingFont: 'Times New Roman, serif',
      bodyFont: 'Times New Roman, serif',
      spacing: 'normal',
      borderRadius: 'minimal',
      shadowLevel: 'subtle',
      listStyle: 'traditional'
    }
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean lines and minimal design',
    category: 'professional',
    styles: {
      background: '#ffffff',
      text: '#1f2937',
      accent: '#10b981',
      headingFont: 'Inter, sans-serif',
      bodyFont: 'Inter, sans-serif',
      spacing: 'loose',
      borderRadius: 'rounded',
      shadowLevel: 'clean',
      listStyle: 'minimal'
    }
  },
  {
    id: 'retro',
    name: 'Retro',
    description: 'Vintage vibes with warm colors',
    category: 'creative',
    styles: {
      background: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)',
      text: '#2d3436',
      accent: '#e17055',
      headingFont: 'Courier New, monospace',
      bodyFont: 'Georgia, serif',
      spacing: 'normal',
      borderRadius: 'vintage',
      shadowLevel: 'retro',
      backgroundTexture: 'paper',
      listStyle: 'retro'
    }
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Neon future aesthetic',
    category: 'experimental',
    styles: {
      background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 100%)',
      text: '#00ff88',
      accent: '#ff0080',
      headingFont: 'Orbitron, monospace',
      bodyFont: 'Roboto Mono, monospace',
      spacing: 'tight',
      borderRadius: 'sharp',
      shadowLevel: 'neon',
      listStyle: 'cyber'
    }
  },
  {
    id: 'nature',
    name: 'Nature',
    description: 'Earth tones and organic feel',
    category: 'artistic',
    styles: {
      background: 'linear-gradient(135deg, #f4f1de 0%, #e9edc9 100%)',
      text: '#264653',
      accent: '#2a9d8f',
      headingFont: 'Crimson Text, serif',
      bodyFont: 'Source Sans Pro, sans-serif',
      spacing: 'relaxed',
      borderRadius: 'organic',
      shadowLevel: 'natural',
      listStyle: 'organic'
    }
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    description: 'Pure black and white contrast',
    category: 'professional',
    styles: {
      background: '#ffffff',
      text: '#000000',
      accent: '#666666',
      headingFont: 'Helvetica Neue, sans-serif',
      bodyFont: 'Helvetica Neue, sans-serif',
      spacing: 'normal',
      borderRadius: 'minimal',
      shadowLevel: 'stark',
      listStyle: 'clean'
    }
  },
  {
    id: 'neon',
    name: 'Neon',
    description: 'Electric colors and bold contrast',
    category: 'experimental',
    styles: {
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      text: '#ffffff',
      accent: '#39ff14',
      headingFont: 'Orbitron, sans-serif',
      bodyFont: 'Roboto, sans-serif',
      spacing: 'loose',
      borderRadius: 'rounded',
      shadowLevel: 'glow',
      listStyle: 'electric'
    }
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Less is more philosophy',
    category: 'professional',
    styles: {
      background: '#fafafa',
      text: '#333333',
      accent: '#007acc',
      headingFont: 'Lato, sans-serif',
      bodyFont: 'Open Sans, sans-serif',
      spacing: 'loose',
      borderRadius: 'subtle',
      shadowLevel: 'minimal',
      listStyle: 'simple'
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
      
      {/* Enhanced Theme Preview */}
      <div className="mt-2 p-3 rounded-md border border-gray-200">
        <div 
          className="w-full h-8 rounded mb-2 relative overflow-hidden"
          style={{ background: currentTheme.styles.background }}
        >
          {currentTheme.styles.backgroundTexture && (
            <div className="absolute inset-0 opacity-10 bg-repeat bg-[length:20px_20px]" />
          )}
        </div>
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: currentTheme.styles.accent }}
            />
            <span>{currentTheme.description}</span>
          </div>
          <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium capitalize">
            {currentTheme.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
