
import React from 'react';
import { Image, ChevronDown } from 'lucide-react';

const eeriePhotos = [
  {
    id: 'none',
    name: 'None',
    url: '',
    description: 'No background'
  },
  {
    id: 'foggy-mountain',
    name: 'Foggy Summit',
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
    description: 'Misty mountain peak'
  },
  {
    id: 'cathedral',
    name: 'Empty Cathedral',
    url: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=800&q=80',
    description: 'Gothic cathedral interior'
  },
  {
    id: 'starry-night',
    name: 'Dark Stars',
    url: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&q=80',
    description: 'Blue starry night'
  },
  {
    id: 'building',
    name: 'Gothic Architecture',
    url: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?w=800&q=80',
    description: 'Low angle gothic building'
  }
];

interface PhotoSelectorProps {
  selectedPhoto: string;
  onPhotoChange: (photoId: string) => void;
}

const PhotoSelector: React.FC<PhotoSelectorProps> = ({
  selectedPhoto,
  onPhotoChange
}) => {
  const currentPhoto = eeriePhotos.find(p => p.id === selectedPhoto) || eeriePhotos[0];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-muted-foreground mb-2">
        <Image className="inline w-4 h-4 mr-1" />
        Atmosphere
      </label>
      
      <div className="relative">
        <select
          value={selectedPhoto}
          onChange={(e) => onPhotoChange(e.target.value)}
          className="w-full appearance-none bg-card border border-border rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-foreground text-sm"
        >
          {eeriePhotos.map(photo => (
            <option key={photo.id} value={photo.id}>
              {photo.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      </div>
      
      <div className="text-xs text-muted-foreground">{currentPhoto.description}</div>
      
      {/* Photo preview thumbnails */}
      <div className="flex gap-2 mt-2">
        {eeriePhotos.slice(1).map(photo => (
          <button
            key={photo.id}
            onClick={() => onPhotoChange(photo.id)}
            className={`w-10 h-10 rounded border-2 transition-all overflow-hidden ${
              selectedPhoto === photo.id 
                ? 'border-ring shadow-md' 
                : 'border-border hover:border-muted-foreground'
            }`}
            title={photo.description}
          >
            <img
              src={photo.url}
              alt={photo.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PhotoSelector;
