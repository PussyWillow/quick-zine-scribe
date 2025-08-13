
import React from 'react';
import { Sliders, Grid3x3, Palette } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PhotoGalleryGrid from './PhotoGalleryGrid';

interface PhotoControlPanelProps {
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
}

const PhotoControlPanel: React.FC<PhotoControlPanelProps> = ({
  selectedPhoto,
  onPhotoChange,
  photoOpacity,
  onOpacityChange,
  photoPosition,
  onPositionChange,
  photoScale,
  onScaleChange,
  blendMode,
  onBlendModeChange
}) => {
  const positions = [
    { id: 'center', label: 'Center', class: 'object-center' },
    { id: 'top', label: 'Top', class: 'object-top' },
    { id: 'bottom', label: 'Bottom', class: 'object-bottom' },
    { id: 'left', label: 'Left', class: 'object-left' },
    { id: 'right', label: 'Right', class: 'object-right' },
    { id: 'top-left', label: 'Top Left', class: 'object-left-top' },
    { id: 'top-right', label: 'Top Right', class: 'object-right-top' },
    { id: 'bottom-left', label: 'Bottom Left', class: 'object-left-bottom' },
    { id: 'bottom-right', label: 'Bottom Right', class: 'object-right-bottom' }
  ];

  const blendModes = [
    { id: 'normal', label: 'Normal' },
    { id: 'multiply', label: 'Multiply' },
    { id: 'overlay', label: 'Overlay' },
    { id: 'soft-light', label: 'Soft Light' },
    { id: 'hard-light', label: 'Hard Light' },
    { id: 'color-dodge', label: 'Color Dodge' },
    { id: 'color-burn', label: 'Color Burn' }
  ];

  return (
    <div className="space-y-6 p-4">
      {/* Main Photo Gallery - 3x3 Grid with Hover Effects */}
      <div className="bg-gradient-to-br from-amber-50/20 to-amber-100/10 dark:from-amber-900/10 dark:to-amber-800/5 rounded-xl p-4 border border-amber-300/20">
        <PhotoGalleryGrid
          selectedPhoto={selectedPhoto}
          onPhotoChange={onPhotoChange}
        />
      </div>

      {/* Secondary Controls - Compact Layout */}
      <div className="grid grid-cols-4 gap-4">
        {/* Position Grid - Smaller & More Elegant */}
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <Grid3x3 className="w-3 h-3 text-amber-600/70" />
            <Label className="text-xs font-medium text-foreground/70">Position</Label>
          </div>
          <div className="grid grid-cols-3 gap-0.5 p-1.5 bg-amber-50/20 dark:bg-amber-900/10 rounded border border-amber-300/20">
            {positions.map((pos) => (
              <button
                key={pos.id}
                onClick={() => onPositionChange(pos.id)}
                className={`w-3 h-3 rounded-sm transition-all duration-200 hover:scale-125 ${
                  photoPosition === pos.id
                    ? 'bg-amber-500 shadow-sm border border-amber-600/50'
                    : 'bg-amber-200/50 dark:bg-amber-700/30 hover:bg-amber-300/60 dark:hover:bg-amber-600/40 border border-amber-300/20'
                }`}
                title={pos.label}
              >
                <div className={`w-full h-full rounded-sm ${
                  pos.id.includes('top') ? 'bg-gradient-to-b from-amber-600/40 to-transparent' :
                  pos.id.includes('bottom') ? 'bg-gradient-to-t from-amber-600/40 to-transparent' :
                  pos.id.includes('left') ? 'bg-gradient-to-r from-amber-600/40 to-transparent' :
                  pos.id.includes('right') ? 'bg-gradient-to-l from-amber-600/40 to-transparent' :
                  pos.id === 'center' ? 'bg-amber-600/30' : ''
                }`} />
              </button>
            ))}
          </div>
        </div>

        {/* Opacity Control - Thin Golden Slider */}
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <Sliders className="w-3 h-3 text-amber-600/70" />
            <Label className="text-xs font-medium text-foreground/70">
              Opacity {photoOpacity}%
            </Label>
          </div>
          <div className="px-1">
            <Slider
              value={[photoOpacity]}
              onValueChange={(value) => onOpacityChange(value[0])}
              max={50}
              min={0}
              step={1}
              className="delicate-golden-slider"
            />
          </div>
        </div>

        {/* Scale Control - Thin Golden Slider */}
        <div className="space-y-2">
          <Label className="text-xs font-medium text-foreground/70">
            Scale {photoScale}x
          </Label>
          <div className="px-1">
            <Slider
              value={[photoScale]}
              onValueChange={(value) => onScaleChange(value[0])}
              max={2}
              min={0.5}
              step={0.1}
              className="delicate-golden-slider"
            />
          </div>
        </div>

        {/* Blend Mode - Compact */}
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <Palette className="w-3 h-3 text-amber-600/70" />
            <Label className="text-xs font-medium text-foreground/70">Blend</Label>
          </div>
          <Select value={blendMode} onValueChange={onBlendModeChange}>
            <SelectTrigger className="h-7 text-xs bg-amber-50/20 dark:bg-amber-900/10 border-amber-300/20 hover:bg-amber-100/30 transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {blendModes.map((mode) => (
                <SelectItem key={mode.id} value={mode.id} className="text-xs">
                  {mode.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick Presets - Elegant Gallery Grid */}
      <div className="space-y-3">
        <Label className="text-xs font-medium text-foreground/70">Quick Styles</Label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              onOpacityChange(15);
              onPositionChange('center');
              onScaleChange(1.2);
              onBlendModeChange('multiply');
            }}
            className="group relative p-2 bg-gradient-to-br from-amber-50/30 to-amber-100/20 dark:from-amber-900/15 dark:to-amber-800/5 border border-amber-300/20 rounded-md hover:from-amber-100/40 hover:to-amber-200/30 dark:hover:from-amber-800/25 dark:hover:to-amber-700/15 transition-all duration-200 hover:scale-105"
          >
            <div className="w-full h-4 bg-gradient-to-br from-amber-400/30 to-amber-600/20 rounded-sm mb-1 border border-amber-400/20"></div>
            <span className="text-xs font-medium text-foreground/60 group-hover:text-foreground/80 transition-colors">Subtle</span>
          </button>
          <button
            onClick={() => {
              onOpacityChange(35);
              onPositionChange('center');
              onScaleChange(1);
              onBlendModeChange('soft-light');
            }}
            className="group relative p-2 bg-gradient-to-br from-amber-50/30 to-amber-100/20 dark:from-amber-900/15 dark:to-amber-800/5 border border-amber-300/20 rounded-md hover:from-amber-100/40 hover:to-amber-200/30 dark:hover:from-amber-800/25 dark:hover:to-amber-700/15 transition-all duration-200 hover:scale-105"
          >
            <div className="w-full h-4 bg-gradient-to-br from-amber-500/40 to-amber-600/30 rounded-sm mb-1 border border-amber-400/20"></div>
            <span className="text-xs font-medium text-foreground/60 group-hover:text-foreground/80 transition-colors">Bold</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoControlPanel;
