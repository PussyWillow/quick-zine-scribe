
import React from 'react';
import { Theme } from '../types/theme';

interface ThemePreviewProps {
  theme: Theme;
}

const ThemePreview: React.FC<ThemePreviewProps> = ({ theme }) => {
  return (
    <div className="mt-2 p-3 rounded-md border border-gray-200">
      <div 
        className="w-full h-8 rounded mb-2 relative overflow-hidden"
        style={{ background: theme.styles.background }}
      >
        {theme.styles.backgroundTexture && (
          <div className="absolute inset-0 opacity-10 bg-repeat bg-[length:20px_20px]" />
        )}
      </div>
      <div className="flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <span 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: theme.styles.accent }}
          />
          <span>{theme.description}</span>
        </div>
        <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium capitalize">
          {theme.category}
        </span>
      </div>
    </div>
  );
};

export default ThemePreview;
