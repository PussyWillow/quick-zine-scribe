import React from 'react';
import { useGalleryImages } from '@/hooks/useGalleryImages';
import { Image, X } from 'lucide-react';

interface PhotoGalleryGridProps {
  selectedPhoto: string;
  onPhotoChange: (photoId: string) => void;
}

const PhotoGalleryGrid: React.FC<PhotoGalleryGridProps> = ({
  selectedPhoto,
  onPhotoChange,
}) => {
  const { data: galleryImages, isLoading } = useGalleryImages();

  // Create a 3x3 grid with "none" option first, then up to 8 photos
  const gridItems = [
    { id: 'none', name: 'No Background', url: null, preview_url: null, isNone: true },
    ...(galleryImages?.slice(0, 8).map(img => ({ ...img, isNone: false })) || [])
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-3 p-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-amber-50/30 dark:bg-amber-900/10 border border-amber-300/30 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Image className="w-4 h-4 text-amber-600/70" />
        <h3 className="text-sm font-medium text-foreground/80">Photo Gallery</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {gridItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => onPhotoChange(item.id)}
            className={`group relative aspect-square rounded-lg border-2 transition-all duration-300 overflow-hidden ${
              selectedPhoto === item.id
                ? 'border-amber-500 shadow-lg shadow-amber-500/25 scale-105'
                : 'border-amber-300/30 hover:border-amber-400/50 hover:scale-105 hover:shadow-md hover:shadow-amber-500/15'
            }`}
            title={item.name}
          >
            {'isNone' in item && item.isNone ? (
              <div className="w-full h-full bg-gradient-to-br from-amber-50/50 to-amber-100/30 dark:from-amber-900/20 dark:to-amber-800/10 flex items-center justify-center">
                <X className="w-6 h-6 text-amber-600/60 group-hover:text-amber-600/80 transition-colors" />
              </div>
            ) : (
              <>
                <img
                  src={('preview_url' in item ? item.preview_url : null) || item.url}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </>
            )}
            
            {/* Golden glow effect for selected item */}
            {selectedPhoto === item.id && (
              <div className="absolute inset-0 bg-amber-400/20 animate-pulse" />
            )}
          </button>
        ))}
      </div>
      
      {/* Selected photo info */}
      {selectedPhoto !== 'none' && (
        <div className="text-center">
          <p className="text-xs text-foreground/60">
            {gridItems.find(item => item.id === selectedPhoto)?.name || 'Selected Photo'}
          </p>
        </div>
      )}
    </div>
  );
};

export default PhotoGalleryGrid;