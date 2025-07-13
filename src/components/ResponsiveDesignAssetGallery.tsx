import React, { useState } from 'react';
import { Palette, Search, ChevronUp, ChevronDown, Image, Shapes, Type, Star } from 'lucide-react';
import { useGalleryImages } from '@/hooks/useGalleryImages';
import { useIsMobile } from '@/hooks/use-mobile';
import { AssetCategory, Asset, PhotoAsset } from '@/types/assets';
import { AssetGrid } from './assets/AssetGrid';
import { mockAssets } from '@/data/mockAssets';

interface ResponsiveDesignAssetGalleryProps {
  onAssetSelect: (asset: any) => void;
  selectedPhoto: string;
  onPhotoChange: (photoId: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const ResponsiveDesignAssetGallery: React.FC<ResponsiveDesignAssetGalleryProps> = ({
  onAssetSelect,
  selectedPhoto,
  onPhotoChange,
  isCollapsed,
  onToggleCollapse
}) => {
  const [activeCategory, setActiveCategory] = useState<AssetCategory>('photos');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const { data: galleryImages = [], isLoading } = useGalleryImages();
  const isMobile = useIsMobile();

  const categories = [
    { id: 'photos' as AssetCategory, name: 'Photos', icon: 'Image', description: 'Background photos' },
    { id: 'textures' as AssetCategory, name: 'Textures', icon: 'Shapes', description: 'Patterns & textures' },
    { id: 'typography' as AssetCategory, name: 'Fonts', icon: 'Type', description: 'Typography' },
    { id: 'decorative' as AssetCategory, name: 'Elements', icon: 'Star', description: 'Decorative' },
    { id: 'colors' as AssetCategory, name: 'Colors', icon: 'Palette', description: 'Palettes' },
  ];

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
      {/* Header */}
      <div className="flex-shrink-0 bg-card border-b border-border/30 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-foreground">Design Assets</h3>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {filteredAssets.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Search Toggle (Mobile) */}
            {isMobile && (
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 hover:bg-muted rounded transition-colors"
              >
                <Search className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
            
            {/* Collapse Toggle */}
            <button
              onClick={onToggleCollapse}
              className="p-1 hover:bg-muted rounded transition-colors"
            >
              {isCollapsed ? (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>

        {!isCollapsed && (
          <>
            {/* Category Tabs - Horizontal scroll on mobile */}
            <div className="px-4 pb-3">
              <div className={`flex gap-1 ${isMobile ? 'overflow-x-auto scrollbar-hide' : 'flex-wrap'} bg-muted/50 rounded-lg p-1`}>
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all whitespace-nowrap touch-manipulation ${
                        activeCategory === category.id
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                      } ${isMobile ? 'min-w-[80px] justify-center' : ''}`}
                      title={category.description}
                    >
                      <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className={isMobile ? 'text-xs' : 'hidden sm:inline text-sm'}>
                        {isMobile ? category.name.slice(0, 6) : category.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search Bar */}
            {(!isMobile || showSearch) && (
              <div className="px-4 pb-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search assets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Asset Grid */}
      {!isCollapsed && (
        <div className="flex-1 min-h-0 p-4 overflow-y-auto">
          <div className={isMobile ? "grid grid-cols-2 gap-3" : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4"}>
            <AssetGrid
              assets={filteredAssets}
              selectedPhoto={selectedPhoto}
              onAssetClick={handleAssetClick}
              isLoading={isLoading && activeCategory === 'photos'}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponsiveDesignAssetGallery;
