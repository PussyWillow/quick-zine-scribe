
export type AssetCategory = 'photos' | 'textures' | 'typography' | 'decorative' | 'colors';

export interface BaseAsset {
  id: string;
  name: string;
  type: string;
  category?: string;
  tags?: string[];
  created_at?: string;
  updated_at?: string;
  is_active?: boolean;
}

export interface PhotoAsset extends BaseAsset {
  type: 'photo';
  preview: string;
  description?: string;
  url?: string;
  preview_url?: string;
}

export interface TextureAsset extends BaseAsset {
  type: 'texture';
  preview: string;
}

export interface FontAsset extends BaseAsset {
  type: 'font';
  preview: string;
  fontFamily: string;
}

export interface DecorationAsset extends BaseAsset {
  type: 'decoration';
  preview: string;
}

export interface PaletteAsset extends BaseAsset {
  type: 'palette';
  colors: string[];
}

export type Asset = PhotoAsset | TextureAsset | FontAsset | DecorationAsset | PaletteAsset;

export interface CategoryInfo {
  id: AssetCategory;
  name: string;
  icon: any;
  description: string;
}
