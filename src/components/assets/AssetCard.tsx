
import React from 'react';
import { Asset, PhotoAsset, FontAsset, DecorationAsset, PaletteAsset, TextureAsset } from '@/types/assets';

interface AssetCardProps {
  asset: Asset;
  isSelected: boolean;
  onClick: (asset: Asset) => void;
}

export const AssetCard: React.FC<AssetCardProps> = ({
  asset,
  isSelected,
  onClick,
}) => {
  const renderAssetPreview = () => {
    switch (asset.type) {
      case 'photo':
        return (
          <img
            src={(asset as PhotoAsset).preview}
            alt={asset.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/api/placeholder/120/120';
            }}
          />
        );
      
      case 'font':
        return (
          <div 
            className="w-full h-full flex flex-col items-center justify-center text-foreground p-3"
            style={{ fontFamily: (asset as FontAsset).fontFamily }}
          >
            <div className="text-3xl font-bold">{(asset as FontAsset).preview}</div>
            <div className="text-xs opacity-70 mt-2">Sample</div>
          </div>
        );
      
      case 'decoration':
        return (
          <div className="w-full h-full flex items-center justify-center text-2xl text-foreground">
            {(asset as DecorationAsset).preview}
          </div>
        );
      
      case 'palette':
        return (
          <div className="w-full h-full flex">
            {(asset as PaletteAsset).colors?.slice(0, 4).map((color: string, idx: number) => (
              <div
                key={idx}
                className="flex-1 h-full"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        );
      
      case 'texture':
        return (
          <img
            src={(asset as TextureAsset).preview}
            alt={asset.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/api/placeholder/120/120';
            }}
          />
        );
      
      default:
        return <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20" />;
    }
  };

  const getAspectRatio = () => {
    switch (asset.type) {
      case 'palette':
        return 'aspect-[2/1]';
      case 'font':
        return 'aspect-[3/2]';
      default:
        return 'aspect-square';
    }
  };

  return (
    <div
      onClick={() => onClick(asset)}
      className={`group cursor-pointer transition-all duration-200 ${
        isSelected && asset.type === 'photo'
          ? 'ring-2 ring-sage-green'
          : 'hover:scale-105 hover:shadow-md'
      }`}
    >
      <div className={`relative overflow-hidden rounded-lg bg-muted border border-border group-hover:border-sage-green/50 transition-colors ${getAspectRatio()}`}>
        {renderAssetPreview()}
        
        {/* Hover overlay for better UX */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
      </div>
      
      {/* Asset name */}
      <div className="text-xs text-center mt-2 text-muted-foreground truncate px-1 leading-tight">
        {asset.name}
      </div>
    </div>
  );
};
