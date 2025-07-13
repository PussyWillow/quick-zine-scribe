import React from 'react';
import { Image, ChevronUp, ChevronDown } from 'lucide-react';
import PhotoControlPanel from './PhotoControlPanel';
interface PhotoControlsSectionProps {
  selectedPhoto: string;
  onPhotoChange: (photoId: string) => void;
  photoOpacity: number;
  onOpacityChange: (opacity: number) => void;
  photoPosition: string;
  onPositionChange: (position: string) => void;
  photoScale: number;
  onScaleChange: (scale: number) => void;
  blendMode: string;
  onBlendModeChange: (mode: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}
const PhotoControlsSection: React.FC<PhotoControlsSectionProps> = ({
  selectedPhoto,
  onPhotoChange,
  photoOpacity,
  onOpacityChange,
  photoPosition,
  onPositionChange,
  photoScale,
  onScaleChange,
  blendMode,
  onBlendModeChange,
  isCollapsed,
  onToggleCollapse
}) => {
  return <div className="bg-card rounded-lg shadow-sm border border-border/50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/30 bg-card">
        <div className="flex items-center gap-2">
          <Image className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground font-heading">
            Photo Background Controls
          </h3>
        </div>
        <button onClick={onToggleCollapse} className="p-2 hover:bg-muted rounded-md transition-colors" aria-label={isCollapsed ? 'Expand' : 'Collapse'}>
          {isCollapsed ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronUp className="w-4 h-4 text-muted-foreground" />}
        </button>
      </div>

      {/* Content */}
      {!isCollapsed && <div className="p-6 px-[42px]">
          <PhotoControlPanel selectedPhoto={selectedPhoto} onPhotoChange={onPhotoChange} photoOpacity={photoOpacity} onOpacityChange={onOpacityChange} photoPosition={photoPosition} onPositionChange={onPositionChange} photoScale={photoScale} onScaleChange={onScaleChange} blendMode={blendMode} onBlendModeChange={onBlendModeChange} />
        </div>}
    </div>;
};
export default PhotoControlsSection;