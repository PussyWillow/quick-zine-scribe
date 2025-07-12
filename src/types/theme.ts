
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
