
import React, { useState } from 'react';
import { Palette } from 'lucide-react';
import { useGalleryImages } from '@/hooks/useGalleryImages';
import { AssetCategory, Asset, PhotoAsset } from '@/types/assets';
import { AssetCategoryTabs } from './assets/AssetCategoryTabs';
import { AssetSearchBar } from './assets/AssetSearchBar';
import { AssetGrid } from './assets/AssetGrid';
import { mockAssets } from '@/data/mockAssets';

interface DesignAssetGalleryProps {
  onAssetSelect: (asset: any) => void;
  selectedPhoto: string;
  onPhotoChange: (photoId: string) => void;
}

const DesignAssetGallery: React.FC<DesignAssetGalleryProps> = ({
  onAssetSelect,
  selectedPhoto,
  onPhotoChange
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
      </div>

      {/* Asset Grid */}
      <div className="flex-1 min-h-0 p-4 overflow-y-auto">
        <AssetGrid
          assets={filteredAssets}
          selectedPhoto={selectedPhoto}
          onAssetClick={handleAssetClick}
          isLoading={isLoading && activeCategory === 'photos'}
        />
      </div>
    </div>
  );
};

export default DesignAssetGallery;
