import React from 'react';
import { Image, ChevronDown } from 'lucide-react';
import { useGalleryImages } from '@/hooks/useGalleryImages';
interface PhotoSelectorProps {
  selectedPhoto: string;
  onPhotoChange: (photoId: string) => void;
}
const PhotoSelector: React.FC<PhotoSelectorProps> = ({
  selectedPhoto,
  onPhotoChange
}) => {
  const {
    data: galleryImages = []
  } = useGalleryImages();

  // Create the complete photo list with 'none' option + dynamic images
  const allPhotos = [{
    id: 'none',
    name: 'None',
    url: '',
    description: 'No background'
  }, ...galleryImages.map(img => ({
    id: img.id,
    name: img.name,
    url: img.url,
    description: img.description || 'Gallery image'
  }))];
  const currentPhoto = allPhotos.find(p => p.id === selectedPhoto) || allPhotos[0];
  return <div className="space-y-3">
      <label className="block text-sm font-medium text-muted-foreground mb-2">
        <Image className="inline w-4 h-4 mr-1" />
        Photo Selection
      </label>
      
      <div className="relative">
        <select value={selectedPhoto} onChange={e => onPhotoChange(e.target.value)} className="w-full appearance-none bg-card border border-border rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-foreground text-sm">
          {allPhotos.map(photo => <option key={photo.id} value={photo.id}>
              {photo.name}
            </option>)}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      </div>
      
      <div className="text-xs text-muted-foreground">{currentPhoto.description}</div>
      
      {/* Photo preview thumbnails */}
      {galleryImages.length > 0 && <div className="flex gap-2 mt-2 flex-wrap px- my-[22px] py-0 mx-[152px]">
          {allPhotos.slice(0, 6).map(photo => <button key={photo.id} onClick={() => onPhotoChange(photo.id)} className={`w-10 h-10 rounded border-2 transition-all overflow-hidden ${selectedPhoto === photo.id ? 'border-ring shadow-md' : 'border-border hover:border-muted-foreground'}`} title={photo.description}>
              {photo.id === 'none' ? <div className="w-full h-full bg-muted/50 flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">×</span>
                </div> : <img src={photo.url} alt={photo.name} loading="lazy" className="size-full " />}
            </button>)}
        </div>}
    </div>;
};
export default PhotoSelector;