
import React from 'react';
import { Filter } from 'lucide-react';
import { Asset } from '@/types/assets';
import { AssetCard } from './AssetCard';

interface AssetGridProps {
  assets: Asset[];
  selectedPhoto: string;
  onAssetClick: (asset: Asset) => void;
  isLoading?: boolean;
}

export const AssetGrid: React.FC<AssetGridProps> = ({
  assets,
  selectedPhoto,
  onAssetClick,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage-green"></div>
      </div>
    );
  }

  if (assets.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-12 text-muted-foreground">
        <Filter className="w-12 h-12 mb-4 opacity-50" />
        <p className="text-lg font-medium mb-2">No assets found</p>
        <p className="text-sm">Try adjusting your search or selecting a different category</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 auto-rows-max">
      {assets.map((asset) => (
        <AssetCard
          key={asset.id}
          asset={asset}
          isSelected={selectedPhoto === asset.id}
          onClick={onAssetClick}
        />
      ))}
    </div>
  );
};
