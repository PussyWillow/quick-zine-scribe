
import React, { useState } from 'react';
import { Camera, X, Loader2 } from 'lucide-react';
import { useGalleryImages, GalleryImage } from '@/hooks/useGalleryImages';

interface FloatingPhotoGalleryProps {
  selectedPhoto: string;
  onPhotoChange: (photoId: string) => void;
}

interface PhotoItem {
  id: string;
  name: string;
  url: string;
  preview: string;
  description?: string | null;
  category?: string | null;
  tags?: string[] | null;
}

const FloatingPhotoGallery: React.FC<FloatingPhotoGalleryProps> = ({
  selectedPhoto,
  onPhotoChange
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: galleryImages = [], isLoading, error } = useGalleryImages();

  // Create the complete photo list with 'none' option + dynamic images
  const allPhotos: PhotoItem[] = [
    { 
      id: 'none', 
      name: 'None', 
      url: '', 
      preview: '',
      description: null,
      category: null,
      tags: null
    },
    ...galleryImages.map((img: GalleryImage) => ({
      id: img.id,
      name: img.name,
      url: img.url,
      preview: img.preview_url || img.url,
      description: img.description,
      category: img.category,
      tags: img.tags
    }))
  ];

  const selectedPhotoData = allPhotos.find(p => p.id === selectedPhoto);

  if (error) {
    console.error('Error loading gallery images:', error);
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Collapsed State - Floating Button */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="group relative elegant-frame p-3 hover:scale-105 transition-all duration-300"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-sage-green/20 to-lavender/20 animate-pulse" />
          <Camera className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors relative z-10" />
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-full bg-sage-green/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Current selection indicator */}
          {selectedPhoto !== 'none' && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-sage-green rounded-full border-2 border-background animate-pulse" />
          )}
        </button>
      )}

      {/* Expanded State - Photo Gallery */}
      {isExpanded && (
        <div className="photo-gallery-frame p-4 min-w-[280px] animate-in slide-in-from-top-2 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground font-heading">Atmosphere</span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 hover:bg-muted rounded-md transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-sage-green" />
              <span className="ml-2 text-sm text-muted-foreground">Loading images...</span>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="text-center py-4">
              <p className="text-sm text-destructive mb-2">Failed to load images</p>
              <p className="text-xs text-muted-foreground">Using fallback images</p>
            </div>
          )}

          {/* Photo Grid */}
          {!isLoading && (
            <div className="grid grid-cols-3 gap-2">
              {allPhotos.map((photo) => (
                <button
                  key={photo.id}
                  onClick={() => {
                    onPhotoChange(photo.id);
                    setIsExpanded(false);
                  }}
                  className={`group relative aspect-square photo-thumbnail-frame transition-all duration-200 ${
                    selectedPhoto === photo.id ? 'selected' : ''
                  }`}
                >
                  {photo.id === 'none' ? (
                    <div className="w-full h-full bg-muted/50 flex items-center justify-center">
                      <X className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ) : (
                    <img
                      src={photo.preview}
                      alt={photo.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                      onError={(e) => {
                        console.error('Failed to load image:', photo.preview);
                        // Fallback to main URL if preview fails
                        if (e.currentTarget.src !== photo.url) {
                          e.currentTarget.src = photo.url;
                        }
                      }}
                    />
                  )}
                  
                  {/* Selected indicator */}
                  {selectedPhoto === photo.id && (
                    <div className="absolute inset-0 bg-sage-green/20 flex items-center justify-center">
                      <div className="w-2 h-2 bg-sage-green rounded-full animate-pulse" />
                    </div>
                  )}
                  
                  {/* Name tooltip */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1">
                    <span className="text-xs text-white font-medium font-heading">{photo.name}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Current selection info */}
          {selectedPhotoData && selectedPhoto !== 'none' && (
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Current: <span className="text-foreground font-medium font-heading">{selectedPhotoData.name}</span>
              </p>
              {selectedPhotoData.description && (
                <p className="text-xs text-muted-foreground mt-1 italic">
                  {selectedPhotoData.description}
                </p>
              )}
            </div>
          )}

          {/* Gallery stats */}
          <div className="mt-2 text-center">
            <p className="text-xs text-muted-foreground">
              {allPhotos.length - 1} image{allPhotos.length !== 2 ? 's' : ''} available
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingPhotoGallery;
