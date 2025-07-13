
import React, { useState } from 'react';
import { Palette, ChevronDown, ChevronUp } from 'lucide-react';
import { useGalleryImages } from '@/hooks/useGalleryImages';
import { AssetCategory, Asset, PhotoAsset } from '@/types/assets';
import { AssetCategoryTabs } from './assets/AssetCategoryTabs';
import { AssetSearchBar } from './assets/AssetSearchBar';
import { AssetGrid } from './assets/AssetGrid';
import { mockAssets } from '@/data/mockAssets';
import { Button } from '@/components/ui/button';

interface ResponsiveDesignAssetGalleryProps {
  onAssetSelect: (asset: any) => void;
  selectedPhoto: string;
  onPhotoChange: (photoId: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const ResponsiveDesignAssetGallery: React.FC<ResponsiveDesignAssetGalleryProps> = ({
  onAssetSelect,
  selectedPhoto,
  onPhotoChange,
  isCollapsed = false,
  onToggleCollapse
}) => {
  const [activeCategory, setActiveCategory] = useState<AssetCategory>('photos');
  const [searchTerm, setSearchTerm] = useState('');
  const { data: galleryImages = [], isLoading } = useGalleryImages();

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
      {/* Collapsible Header */}
      <div className="flex-shrink-0 bg-card border-b border-border/30 sticky top-0 z-10">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground font-heading">Design Assets</h3>
              <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {filteredAssets.length}
              </span>
            </div>
            
            {onToggleCollapse && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleCollapse}
                className="ml-auto"
              >
                {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </Button>
            )}
          </div>

          {!isCollapsed && (
            <div className="mt-4 space-y-4">
              {/* Category Tabs */}
              <div className="overflow-x-auto">
                <AssetCategoryTabs
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                />
              </div>

              {/* Search */}
              <AssetSearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>
          )}
        </div>
      </div>

      {/* Asset Grid */}
      {!isCollapsed && (
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-4">
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
