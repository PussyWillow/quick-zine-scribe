
import React, { useState } from 'react';
import { Camera, X } from 'lucide-react';

const eeriePhotos = [
  { id: 'none', name: 'None', url: '', preview: '' },
  { 
    id: 'foggy-mountain', 
    name: 'Mist', 
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
    preview: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=150&q=80'
  },
  { 
    id: 'cathedral', 
    name: 'Sacred', 
    url: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=800&q=80',
    preview: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=150&q=80'
  },
  { 
    id: 'starry-night', 
    name: 'Night', 
    url: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&q=80',
    preview: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=150&q=80'
  },
  { 
    id: 'building', 
    name: 'Shadow', 
    url: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?w=800&q=80',
    preview: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?w=150&q=80'
  }
];

interface FloatingPhotoGalleryProps {
  selectedPhoto: string;
  onPhotoChange: (photoId: string) => void;
}

const FloatingPhotoGallery: React.FC<FloatingPhotoGalleryProps> = ({
  selectedPhoto,
  onPhotoChange
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const selectedPhotoData = eeriePhotos.find(p => p.id === selectedPhoto);

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Collapsed State - Floating Button */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="group relative bg-card/80 backdrop-blur-sm border border-border rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/20 to-primary/20 animate-pulse" />
          <Camera className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors relative z-10" />
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-full bg-accent/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Current selection indicator */}
          {selectedPhoto !== 'none' && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-background animate-pulse" />
          )}
        </button>
      )}

      {/* Expanded State - Photo Gallery */}
      {isExpanded && (
        <div className="bg-card/95 backdrop-blur-md border border-border rounded-xl p-4 shadow-2xl min-w-[280px] animate-in slide-in-from-top-2 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Atmosphere</span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 hover:bg-muted rounded-md transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-3 gap-2">
            {eeriePhotos.map((photo) => (
              <button
                key={photo.id}
                onClick={() => {
                  onPhotoChange(photo.id);
                  setIsExpanded(false);
                }}
                className={`group relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                  selectedPhoto === photo.id
                    ? 'border-accent shadow-lg'
                    : 'border-border hover:border-accent/50'
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
                  />
                )}
                
                {/* Selected indicator */}
                {selectedPhoto === photo.id && (
                  <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  </div>
                )}
                
                {/* Name tooltip */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1">
                  <span className="text-xs text-white font-medium">{photo.name}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Current selection info */}
          {selectedPhotoData && selectedPhoto !== 'none' && (
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Current: <span className="text-foreground font-medium">{selectedPhotoData.name}</span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FloatingPhotoGallery;
