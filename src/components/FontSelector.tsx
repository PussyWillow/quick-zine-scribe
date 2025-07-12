
import React from 'react';
import { Type, ChevronDown } from 'lucide-react';

export interface Font {
  id: string;
  name: string;
  category: 'serif' | 'sans-serif' | 'display' | 'monospace' | 'script' | 'gothic';
  fontFamily: string;
  description: string;
}

export const fonts: Font[] = [
  // Serif fonts
  { id: 'playfair', name: 'Playfair Display', category: 'serif', fontFamily: 'Playfair Display, serif', description: 'Elegant serif for headlines' },
  { id: 'crimson', name: 'Crimson Text', category: 'serif', fontFamily: 'Crimson Text, serif', description: 'Classic book serif' },
  { id: 'libre', name: 'Libre Baskerville', category: 'serif', fontFamily: 'Libre Baskerville, serif', description: 'Traditional serif' },
  { id: 'lora', name: 'Lora', category: 'serif', fontFamily: 'Lora, serif', description: 'Modern serif for body text' },
  
  // Sans-serif fonts
  { id: 'inter', name: 'Inter', category: 'sans-serif', fontFamily: 'Inter, sans-serif', description: 'Clean & modern' },
  { id: 'poppins', name: 'Poppins', category: 'sans-serif', fontFamily: 'Poppins, sans-serif', description: 'Friendly geometric' },
  { id: 'source-sans', name: 'Source Sans Pro', category: 'sans-serif', fontFamily: 'Source Sans Pro, sans-serif', description: 'Professional sans-serif' },
  { id: 'nunito', name: 'Nunito Sans', category: 'sans-serif', fontFamily: 'Nunito Sans, sans-serif', description: 'Rounded & approachable' },
  
  // Display fonts
  { id: 'oswald', name: 'Oswald', category: 'display', fontFamily: 'Oswald, sans-serif', description: 'Bold condensed headlines' },
  { id: 'montserrat', name: 'Montserrat', category: 'display', fontFamily: 'Montserrat, sans-serif', description: 'Urban inspired' },
  { id: 'bebas', name: 'Bebas Neue', category: 'display', fontFamily: 'Bebas Neue, sans-serif', description: 'Strong & impactful' },
  
  // Gothic fonts
  { id: 'cinzel', name: 'Cinzel', category: 'gothic', fontFamily: 'Cinzel, serif', description: 'Carved stone gothic' },
  { id: 'butcherman', name: 'Butcherman', category: 'gothic', fontFamily: 'Butcherman, serif', description: 'Bold intimidating serif' },
  { id: 'pirata', name: 'Pirata One', category: 'gothic', fontFamily: 'Pirata One, serif', description: 'Sharp angular gothic' },
  { id: 'creepster', name: 'Creepster', category: 'gothic', fontFamily: 'Creepster, cursive', description: 'Horror display font' },
  
  // Monospace fonts
  { id: 'jetbrains', name: 'JetBrains Mono', category: 'monospace', fontFamily: 'JetBrains Mono, monospace', description: 'Code-friendly monospace' },
  { id: 'fira-code', name: 'Fira Code', category: 'monospace', fontFamily: 'Fira Code, monospace', description: 'Programming ligatures' },
  { id: 'source-code', name: 'Source Code Pro', category: 'monospace', fontFamily: 'Source Code Pro, monospace', description: 'Adobe\'s monospace' },
  
  // Script/Creative fonts
  { id: 'dancing', name: 'Dancing Script', category: 'script', fontFamily: 'Dancing Script, cursive', description: 'Playful handwriting' },
  { id: 'pacifico', name: 'Pacifico', category: 'script', fontFamily: 'Pacifico, cursive', description: 'Surf-inspired script' },
  { id: 'caveat', name: 'Caveat', category: 'script', fontFamily: 'Caveat, cursive', description: 'Casual handwritten' }
];

interface FontSelectorProps {
  selectedHeadingFont: string;
  selectedBodyFont: string;
  onHeadingFontChange: (fontId: string) => void;
  onBodyFontChange: (fontId: string) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({
  selectedHeadingFont,
  selectedBodyFont,
  onHeadingFontChange,
  onBodyFontChange
}) => {
  const currentHeadingFont = fonts.find(f => f.id === selectedHeadingFont) || fonts[0];
  const currentBodyFont = fonts.find(f => f.id === selectedBodyFont) || fonts[4]; // Default to Inter

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-muted-foreground mb-2">
        <Type className="inline w-4 h-4 mr-1" />
        Typography
      </label>
      
      {/* Heading Font */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1">
          Heading Font
        </label>
        <div className="relative">
          <select
            value={selectedHeadingFont}
            onChange={(e) => onHeadingFontChange(e.target.value)}
            className="w-full appearance-none bg-card border border-border rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-foreground text-sm"
            style={{ fontFamily: currentHeadingFont.fontFamily }}
          >
            {fonts.map(font => (
              <option key={font.id} value={font.id} style={{ fontFamily: font.fontFamily }}>
                {font.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
        <div className="mt-1 text-xs text-muted-foreground">{currentHeadingFont.description}</div>
      </div>

      {/* Body Font */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1">
          Body Font
        </label>
        <div className="relative">
          <select
            value={selectedBodyFont}
            onChange={(e) => onBodyFontChange(e.target.value)}
            className="w-full appearance-none bg-card border border-border rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-foreground text-sm"
            style={{ fontFamily: currentBodyFont.fontFamily }}
          >
            {fonts.map(font => (
              <option key={font.id} value={font.id} style={{ fontFamily: font.fontFamily }}>
                {font.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
        <div className="mt-1 text-xs text-muted-foreground">{currentBodyFont.description}</div>
      </div>

      {/* Font Preview */}
      <div className="mt-3 p-3 rounded-md border border-border bg-muted/30">
        <div 
          className="text-lg font-semibold mb-1 text-foreground"
          style={{ fontFamily: currentHeadingFont.fontFamily }}
        >
          Heading Preview
        </div>
        <div 
          className="text-sm text-muted-foreground"
          style={{ fontFamily: currentBodyFont.fontFamily }}
        >
          This is how your body text will look in the selected font.
        </div>
      </div>
    </div>
  );
};

export default FontSelector;
