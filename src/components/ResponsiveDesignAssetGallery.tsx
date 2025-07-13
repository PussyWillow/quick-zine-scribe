
import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import DesignAssetGallery from './DesignAssetGallery';
import PhotoControlPanel from './PhotoControlPanel';
import { useIsMobile } from '../hooks/use-mobile';

interface ResponsiveDesignAssetGalleryProps {
  onAssetSelect: (asset: any) => void;
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

const ResponsiveDesignAssetGallery: React.FC<ResponsiveDesignAssetGalleryProps> = ({
  onAssetSelect,
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
  onToggleCollapse,
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/30 bg-card">
        <h3 className="text-lg font-semibold text-foreground font-heading">
          Design Assets & Photo Controls
        </h3>
        <button
          onClick={onToggleCollapse}
          className="p-2 hover:bg-muted rounded-md transition-colors"
          aria-label={isCollapsed ? 'Expand' : 'Collapse'}
        >
          {isCollapsed ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Content */}
      {!isCollapsed && (
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row">
          {/* Photo Controls Panel */}
          <div className="lg:w-80 border-r border-border/30 bg-card">
            <div className="p-4 h-full overflow-y-auto">
              <PhotoControlPanel
                selectedPhoto={selectedPhoto}
                onPhotoChange={onPhotoChange}
                photoOpacity={photoOpacity}
                onOpacityChange={onOpacityChange}
                photoPosition={photoPosition}
                onPositionChange={onPositionChange}
                photoScale={photoScale}
                onScaleChange={onScaleChange}
                blendMode={blendMode}
                onBlendModeChange={onBlendModeChange}
              />
            </div>
          </div>

          {/* Asset Gallery */}
          <div className="flex-1 min-h-0">
            <DesignAssetGallery
              onAssetSelect={onAssetSelect}
              selectedPhoto={selectedPhoto}
              onPhotoChange={onPhotoChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponsiveDesignAssetGallery;
