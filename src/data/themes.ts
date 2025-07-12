
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
  // Gothic Themes
  {
    id: 'victorian-gothic',
    name: 'Victorian Gothic',
    description: 'Dark elegance and ornate details',
    category: 'artistic',
    styles: {
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0505 100%)',
      text: '#e8e8e8',
      accent: '#8b0000',
      headingFont: 'Cinzel, serif',
      bodyFont: 'Crimson Text, serif',
      spacing: 'relaxed',
      borderRadius: 'ornate',
      shadowLevel: 'gothic',
      backgroundTexture: 'damask',
      listStyle: 'gothic'
    }
  },
  {
    id: 'modern-gothic',
    name: 'Modern Gothic',
    description: 'Contemporary darkness meets tradition',
    category: 'experimental',
    styles: {
      background: 'linear-gradient(135deg, #000000 0%, #1a0a1a 100%)',
      text: '#f0f0f0',
      accent: '#dc143c',
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
    description: 'Mystical symbols and arcane knowledge',
    category: 'experimental',
    styles: {
      background: 'linear-gradient(135deg, #000000 0%, #4b0082 100%)',
      text: '#e0e0e0',
      accent: '#9370db',
      headingFont: 'Uncial Antiqua, serif',
      bodyFont: 'Crimson Text, serif',
      spacing: 'loose',
      borderRadius: 'mystical',
      shadowLevel: 'occult',
      backgroundTexture: 'pentagram',
      listStyle: 'occult'
    }
  },
  {
    id: 'grunge-gothic',
    name: 'Grunge Gothic',
    description: 'Raw darkness with rebellious edge',
    category: 'creative',
    styles: {
      background: 'linear-gradient(135deg, #0a0a0a 0%, #2d1b1b 100%)',
      text: '#d3d3d3',
      accent: '#b22222',
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
