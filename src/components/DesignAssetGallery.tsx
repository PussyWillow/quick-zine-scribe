
import React, { useState } from 'react';
import { Palette, Image, Type, Shapes, Star, Search, Filter } from 'lucide-react';
import { useGalleryImages } from '@/hooks/useGalleryImages';

interface DesignAssetGalleryProps {
  onAssetSelect: (asset: any) => void;
  selectedPhoto: string;
  onPhotoChange: (photoId: string) => void;
}

type AssetCategory = 'photos' | 'textures' | 'typography' | 'decorative' | 'colors';

interface BaseAsset {
  id: string;
  name: string;
  type: string;
}

interface PhotoAsset extends BaseAsset {
  type: 'photo';
  preview: string;
  description?: string;
}

interface TextureAsset extends BaseAsset {
  type: 'texture';
  preview: string;
}

interface FontAsset extends BaseAsset {
  type: 'font';
  preview: string;
  fontFamily: string;
}

interface DecorationAsset extends BaseAsset {
  type: 'decoration';
  preview: string;
}

interface PaletteAsset extends BaseAsset {
  type: 'palette';
  colors: string[];
}

type Asset = PhotoAsset | TextureAsset | FontAsset | DecorationAsset | PaletteAsset;

const DesignAssetGallery: React.FC<DesignAssetGalleryProps> = ({
  onAssetSelect,
  selectedPhoto,
  onPhotoChange
}) => {
  const [activeCategory, setActiveCategory] = useState<AssetCategory>('photos');
  const [searchTerm, setSearchTerm] = useState('');
  const { data: galleryImages = [], isLoading } = useGalleryImages();

  const categories = [
    { id: 'photos' as AssetCategory, name: 'Photos', icon: Image, description: 'Background photos' },
    { id: 'textures' as AssetCategory, name: 'Textures', icon: Shapes, description: 'Patterns & textures' },
    { id: 'typography' as AssetCategory, name: 'Typography', icon: Type, description: 'Font specimens' },
    { id: 'decorative' as AssetCategory, name: 'Decorative', icon: Star, description: 'Borders & elements' },
    { id: 'colors' as AssetCategory, name: 'Colors', icon: Palette, description: 'Color palettes' },
  ];

  const mockAssets = {
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

  const getCurrentAssets = (): Asset[] => {
    switch (activeCategory) {
      case 'photos':
        return galleryImages.map(img => ({
          id: img.id,
          name: img.name,
          preview: img.preview_url || img.url,
          type: 'photo',
          description: img.description
        } as PhotoAsset));
      case 'textures':
      case 'typography':
      case 'decorative':
      case 'colors':
        return mockAssets[activeCategory] || [];
      default:
        return [];
    }
  };

  const handleAssetClick = (asset: Asset) => {
    if (asset.type === 'photo') {
      onPhotoChange(asset.id);
    }
    onAssetSelect(asset);
  };

  const currentAssets = getCurrentAssets();
  const filteredAssets = currentAssets.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full bg-card flex flex-col">
      {/* Sticky Header with Category Tabs */}
      <div className="flex-shrink-0 bg-card border-b border-border/30 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground font-heading">Design Assets</h3>
              <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {filteredAssets.length}
              </span>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      activeCategory === category.id
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                    }`}
                    title={category.description}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring w-48"
            />
          </div>
        </div>
      </div>

      {/* Asset Grid */}
      <div className="flex-1 min-h-0 p-4 overflow-y-auto">
        {isLoading && activeCategory === 'photos' ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage-green"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 auto-rows-max">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                onClick={() => handleAssetClick(asset)}
                className={`group cursor-pointer transition-all duration-200 ${
                  selectedPhoto === asset.id && asset.type === 'photo'
                    ? 'ring-2 ring-sage-green'
                    : 'hover:scale-105 hover:shadow-md'
                }`}
              >
                <div className={`relative overflow-hidden rounded-lg bg-muted border border-border group-hover:border-sage-green/50 transition-colors ${
                  asset.type === 'palette' ? 'aspect-[2/1]' : 
                  asset.type === 'typography' ? 'aspect-[3/2]' : 
                  'aspect-square'
                }`}>
                  {asset.type === 'photo' ? (
                    <img
                      src={(asset as PhotoAsset).preview}
                      alt={asset.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/api/placeholder/120/120';
                      }}
                    />
                  ) : asset.type === 'font' ? (
                    <div 
                      className="w-full h-full flex flex-col items-center justify-center text-foreground p-2"
                      style={{ fontFamily: (asset as FontAsset).fontFamily }}
                    >
                      <div className="text-2xl font-bold">{(asset as FontAsset).preview}</div>
                      <div className="text-xs opacity-70 mt-1">Sample</div>
                    </div>
                  ) : asset.type === 'decoration' ? (
                    <div className="w-full h-full flex items-center justify-center text-2xl text-foreground">
                      {(asset as DecorationAsset).preview}
                    </div>
                  ) : asset.type === 'palette' ? (
                    <div className="w-full h-full flex">
                      {(asset as PaletteAsset).colors?.slice(0, 4).map((color: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex-1 h-full"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  ) : asset.type === 'texture' ? (
                    <img
                      src={(asset as TextureAsset).preview}
                      alt={asset.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/api/placeholder/120/120';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20" />
                  )}
                  
                  {/* Hover overlay for better UX */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
                
                {/* Asset name */}
                <div className="text-xs text-center mt-2 text-muted-foreground truncate px-1 leading-tight">
                  {asset.name}
                </div>
              </div>
            ))}
            
            {filteredAssets.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Filter className="w-12 h-12 mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No assets found</p>
                <p className="text-sm">Try adjusting your search or selecting a different category</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignAssetGallery;
