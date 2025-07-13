
import { TextureAsset, FontAsset, DecorationAsset, PaletteAsset } from '@/types/assets';

export const mockAssets = {
  textures: [
    { id: 'paper-1', name: 'Vintage Paper', preview: '/api/placeholder/100/100', type: 'texture' },
    { id: 'fabric-1', name: 'Linen Texture', preview: '/api/placeholder/100/100', type: 'texture' },
    { id: 'grunge-1', name: 'Grunge Effect', preview: '/api/placeholder/100/100', type: 'texture' },
  ] as TextureAsset[],
  typography: [
    { id: 'serif-1', name: 'Elegant Serif', preview: 'Aa', type: 'font', fontFamily: 'Playfair Display' },
    { id: 'script-1', name: 'Script Font', preview: 'Aa', type: 'font', fontFamily: 'Dancing Script' },
    { id: 'mono-1', name: 'Monospace', preview: 'Aa', type: 'font', fontFamily: 'JetBrains Mono' },
  ] as FontAsset[],
  decorative: [
    { id: 'border-1', name: 'Ornate Border', preview: '═══', type: 'decoration' },
    { id: 'divider-1', name: 'Line Divider', preview: '───', type: 'decoration' },
    { id: 'flourish-1', name: 'Flourish', preview: '❋', type: 'decoration' },
  ] as DecorationAsset[],
  colors: [
    { id: 'pastel-1', name: 'Pastel Dreams', colors: ['#FFE4E1', '#E6E6FA', '#F0F8FF'], type: 'palette' },
    { id: 'warm-1', name: 'Warm Sunset', colors: ['#FF6B6B', '#FFE66D', '#FF8E53'], type: 'palette' },
    { id: 'cool-1', name: 'Cool Ocean', colors: ['#4ECDC4', '#45B7D1', '#96CEB4'], type: 'palette' },
  ] as PaletteAsset[]
};
