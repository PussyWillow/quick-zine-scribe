import { Theme } from '../types/theme';

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
  },
  // Updated Gothic Themes with Blue and Orange palette
  {
    id: 'victorian-gothic',
    name: 'Victorian Gothic',
    description: 'Vintage blue depths with warm orange accents',
    category: 'artistic',
    styles: {
      background: 'linear-gradient(135deg, hsl(212, 85%, 8%) 0%, hsl(212, 70%, 12%) 100%)',
      text: 'hsl(35, 85%, 82%)',
      accent: 'hsl(25, 100%, 65%)',
      headingFont: 'Cinzel, serif',
      bodyFont: 'Crimson Text, serif',
      spacing: 'relaxed',
      borderRadius: 'ornate',
      shadowLevel: 'gothic',
      backgroundTexture: 'vintage-print',
      listStyle: 'gothic'
    }
  },
  {
    id: 'modern-gothic',
    name: 'Modern Gothic',
    description: 'Contemporary midnight blue with copper highlights',
    category: 'experimental',
    styles: {
      background: 'linear-gradient(135deg, hsl(212, 90%, 6%) 0%, hsl(212, 80%, 10%) 100%)',
      text: 'hsl(35, 80%, 85%)',
      accent: 'hsl(25, 95%, 60%)',
      headingFont: 'Playfair Display, serif',
      bodyFont: 'Source Sans Pro, sans-serif',
      spacing: 'normal',
      borderRadius: 'sharp',
      shadowLevel: 'dramatic',
      listStyle: 'modern-gothic'
    }
  },
  {
    id: 'occult',
    name: 'Occult',
    description: 'Deep azure mysticism with bronze symbols',
    category: 'experimental',
    styles: {
      background: 'linear-gradient(135deg, hsl(212, 95%, 5%) 0%, hsl(240, 80%, 8%) 100%)',
      text: 'hsl(35, 75%, 80%)',
      accent: 'hsl(30, 90%, 58%)',
      headingFont: 'Uncial Antiqua, serif',
      bodyFont: 'Crimson Text, serif',
      spacing: 'loose',
      borderRadius: 'mystical',
      shadowLevel: 'occult',
      backgroundTexture: 'arcane-symbols',
      listStyle: 'occult'
    }
  },
  {
    id: 'grunge-gothic',
    name: 'Grunge Gothic',
    description: 'Raw midnight tones with fiery orange rebellion',
    category: 'creative',
    styles: {
      background: 'linear-gradient(135deg, hsl(212, 80%, 10%) 0%, hsl(25, 60%, 15%) 100%)',
      text: 'hsl(35, 70%, 75%)',
      accent: 'hsl(20, 100%, 62%)',
      headingFont: 'Bebas Neue, sans-serif',
      bodyFont: 'Roboto Condensed, sans-serif',
      spacing: 'tight',
      borderRadius: 'rough',
      shadowLevel: 'grunge',
      backgroundTexture: 'distressed',
      listStyle: 'grunge'
    }
  }
];
