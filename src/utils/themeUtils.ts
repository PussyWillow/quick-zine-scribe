
export const getSpacingClass = (spacing: string) => {
  switch (spacing) {
    case 'tight': return 'space-y-2';
    case 'relaxed': return 'space-y-6';
    case 'loose': return 'space-y-8';
    default: return 'space-y-4';
  }
};

export const getBorderRadiusClass = (borderRadius: string) => {
  switch (borderRadius) {
    case 'sharp': return 'rounded-none';
    case 'minimal': return 'rounded-sm';
    case 'rounded': return 'rounded-lg';
    case 'vintage': return 'rounded-tl-lg rounded-br-lg';
    case 'organic': return 'rounded-2xl';
    case 'subtle': return 'rounded-md';
    case 'ornate': return 'rounded-lg border-2 border-opacity-30';
    case 'mystical': return 'rounded-full';
    case 'rough': return 'rounded-sm';
    default: return 'rounded-lg';
  }
};

export const getShadowClass = (shadowLevel: string) => {
  switch (shadowLevel) {
    case 'none': return '';
    case 'minimal': return 'shadow-sm';
    case 'soft': return 'shadow-md';
    case 'clean': return 'shadow-lg';
    case 'subtle': return 'shadow-sm';
    case 'retro': return 'shadow-lg shadow-orange-200/50';
    case 'neon': return 'shadow-lg shadow-pink-500/25';
    case 'natural': return 'shadow-md shadow-green-200/30';
    case 'stark': return 'shadow-2xl';
    case 'glow': return 'shadow-xl shadow-green-400/20';
    case 'gothic': return 'shadow-2xl shadow-red-900/40';
    case 'dramatic': return 'shadow-xl shadow-red-800/30';
    case 'occult': return 'shadow-2xl shadow-purple-900/50';
    case 'grunge': return 'shadow-lg shadow-gray-900/60';
    default: return 'shadow-sm';
  }
};

export const getListStyleClass = (listStyle: string) => {
  switch (listStyle) {
    case 'decorative': return 'list-disc marker:text-purple-400';
    case 'bold': return 'list-disc marker:text-red-600';
    case 'traditional': return 'list-decimal marker:text-blue-600';
    case 'minimal': return 'list-none pl-4';
    case 'retro': return 'list-disc marker:text-orange-500';
    case 'cyber': return 'list-disc marker:text-pink-500';
    case 'organic': return 'list-disc marker:text-green-600';
    case 'clean': return 'list-disc marker:text-gray-600';
    case 'electric': return 'list-disc marker:text-lime-400';
    case 'simple': return 'list-disc marker:text-blue-500';
    case 'gothic': return 'list-disc marker:text-red-500';
    case 'modern-gothic': return 'list-disc marker:text-crimson-400';
    case 'occult': return 'list-disc marker:text-purple-400';
    case 'grunge': return 'list-disc marker:text-gray-400';
    default: return 'list-disc';
  }
};

export const getTextShadow = (shadowLevel: string, accentColor: string) => {
  switch (shadowLevel) {
    case 'neon':
    case 'glow':
      return `0 0 10px ${accentColor}`;
    case 'gothic':
    case 'dramatic':
      return `0 0 8px ${accentColor}, 0 0 16px rgba(139, 0, 0, 0.4)`;
    case 'occult':
      return `0 0 12px ${accentColor}, 0 0 24px rgba(147, 112, 219, 0.3)`;
    case 'grunge':
      return `2px 2px 4px rgba(0, 0, 0, 0.8)`;
    default:
      return 'none';
  }
};

export const getGothicThemes = () => {
  return ['victorian-gothic', 'modern-gothic', 'occult', 'grunge-gothic'];
};

export const isGothicTheme = (themeId: string) => {
  return getGothicThemes().includes(themeId);
};
