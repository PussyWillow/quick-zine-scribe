
import React from 'react';
import { Image, Sliders, Grid3x3, Palette } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PhotoSelector from './PhotoSelector';

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
    <div className="grid grid-cols-3 gap-6 p-4">
      {/* Photo Gallery Grid */}
      <div className="col-span-3 space-y-3">
        <PhotoSelector
          selectedPhoto={selectedPhoto}
          onPhotoChange={onPhotoChange}
        />
      </div>

      {/* Position Grid - Compact & Elegant */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Grid3x3 className="w-3 h-3 text-amber-600/70" />
          <Label className="text-xs font-medium text-foreground/80">Position</Label>
        </div>
        <div className="grid grid-cols-3 gap-1 p-2 bg-amber-50/30 dark:bg-amber-900/10 rounded-md">
          {positions.map((pos) => (
            <button
              key={pos.id}
              onClick={() => onPositionChange(pos.id)}
              className={`w-5 h-5 rounded transition-all duration-200 hover:scale-110 ${
                photoPosition === pos.id
                  ? 'bg-amber-500/70 shadow-amber-500/30 shadow-md border border-amber-600/50'
                  : 'bg-amber-100/50 dark:bg-amber-800/20 hover:bg-amber-200/60 dark:hover:bg-amber-700/30 border border-amber-300/30'
              }`}
              title={pos.label}
            >
              <div className={`w-full h-full rounded-sm ${
                pos.id.includes('top') ? 'bg-gradient-to-b from-amber-600/60 to-transparent' :
                pos.id.includes('bottom') ? 'bg-gradient-to-t from-amber-600/60 to-transparent' :
                pos.id.includes('left') ? 'bg-gradient-to-r from-amber-600/60 to-transparent' :
                pos.id.includes('right') ? 'bg-gradient-to-l from-amber-600/60 to-transparent' :
                'bg-amber-600/40'
              }`} />
            </button>
          ))}
        </div>
      </div>

      {/* Opacity Control - Delicate Golden Slider */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-3 h-3 text-amber-600/70" />
          <Label className="text-xs font-medium text-foreground/80">
            Opacity: {photoOpacity}%
          </Label>
        </div>
        <div className="relative">
          <Slider
            value={[photoOpacity]}
            onValueChange={(value) => onOpacityChange(value[0])}
            max={50}
            min={0}
            step={1}
            className="w-full [&_.relative]:h-1 [&_.relative_.absolute]:bg-amber-100/40 [&_.relative_.absolute]:border [&_.relative_.absolute]:border-amber-300/30 [&_[data-orientation=horizontal]]:bg-amber-500/60 [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:bg-amber-500 [&_[role=slider]]:border-2 [&_[role=slider]]:border-amber-600/50 [&_[role=slider]]:shadow-amber-500/30 [&_[role=slider]]:shadow-md hover:[&_[role=slider]]:bg-amber-400 transition-colors"
          />
        </div>
      </div>

      {/* Scale Control - Delicate Golden Slider */}
      <div className="space-y-3">
        <Label className="text-xs font-medium text-foreground/80">
          Scale: {photoScale}x
        </Label>
        <div className="relative">
          <Slider
            value={[photoScale]}
            onValueChange={(value) => onScaleChange(value[0])}
            max={2}
            min={0.5}
            step={0.1}
            className="w-full [&_.relative]:h-1 [&_.relative_.absolute]:bg-amber-100/40 [&_.relative_.absolute]:border [&_.relative_.absolute]:border-amber-300/30 [&_[data-orientation=horizontal]]:bg-amber-500/60 [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:bg-amber-500 [&_[role=slider]]:border-2 [&_[role=slider]]:border-amber-600/50 [&_[role=slider]]:shadow-amber-500/30 [&_[role=slider]]:shadow-md hover:[&_[role=slider]]:bg-amber-400 transition-colors"
          />
        </div>
      </div>

      {/* Blend Mode - Elegant */}
      <div className="col-span-2 space-y-3">
        <div className="flex items-center gap-2">
          <Palette className="w-3 h-3 text-amber-600/70" />
          <Label className="text-xs font-medium text-foreground/80">Blend Mode</Label>
        </div>
        <Select value={blendMode} onValueChange={onBlendModeChange}>
          <SelectTrigger className="h-8 text-xs bg-amber-50/30 dark:bg-amber-900/10 border-amber-300/30 hover:bg-amber-100/40 transition-colors">
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

      {/* Quick Presets - Elegant Gallery Grid */}
      <div className="col-span-3 space-y-3">
        <Label className="text-xs font-medium text-foreground/80">Quick Styles</Label>
        <div className="grid grid-cols-4 gap-3">
          <button
            onClick={() => {
              onOpacityChange(15);
              onPositionChange('center');
              onScaleChange(1.2);
              onBlendModeChange('multiply');
            }}
            className="group relative p-3 bg-gradient-to-br from-amber-50/50 to-amber-100/30 dark:from-amber-900/20 dark:to-amber-800/10 border border-amber-300/30 rounded-lg hover:from-amber-100/60 hover:to-amber-200/40 dark:hover:from-amber-800/30 dark:hover:to-amber-700/20 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20"
          >
            <div className="w-full h-8 bg-gradient-to-br from-amber-400/30 to-amber-600/20 rounded-md mb-2 border border-amber-400/30"></div>
            <span className="text-xs font-medium text-foreground/70 group-hover:text-foreground transition-colors">Subtle Atmosphere</span>
          </button>
          <button
            onClick={() => {
              onOpacityChange(25);
              onPositionChange('bottom-right');
              onScaleChange(0.8);
              onBlendModeChange('overlay');
            }}
            className="group relative p-3 bg-gradient-to-br from-amber-50/50 to-amber-100/30 dark:from-amber-900/20 dark:to-amber-800/10 border border-amber-300/30 rounded-lg hover:from-amber-100/60 hover:to-amber-200/40 dark:hover:from-amber-800/30 dark:hover:to-amber-700/20 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20"
          >
            <div className="w-full h-8 bg-gradient-to-tl from-amber-400/50 to-transparent rounded-md mb-2 border border-amber-400/30"></div>
            <span className="text-xs font-medium text-foreground/70 group-hover:text-foreground transition-colors">Corner Vignette</span>
          </button>
          <button
            onClick={() => {
              onOpacityChange(35);
              onPositionChange('center');
              onScaleChange(1);
              onBlendModeChange('soft-light');
            }}
            className="group relative p-3 bg-gradient-to-br from-amber-50/50 to-amber-100/30 dark:from-amber-900/20 dark:to-amber-800/10 border border-amber-300/30 rounded-lg hover:from-amber-100/60 hover:to-amber-200/40 dark:hover:from-amber-800/30 dark:hover:to-amber-700/20 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20"
          >
            <div className="w-full h-8 bg-gradient-to-br from-amber-500/40 to-amber-600/30 rounded-md mb-2 border border-amber-400/30"></div>
            <span className="text-xs font-medium text-foreground/70 group-hover:text-foreground transition-colors">Background Art</span>
          </button>
          <button
            onClick={() => {
              onOpacityChange(8);
              onPositionChange('top');
              onScaleChange(1.5);
              onBlendModeChange('multiply');
            }}
            className="group relative p-3 bg-gradient-to-br from-amber-50/50 to-amber-100/30 dark:from-amber-900/20 dark:to-amber-800/10 border border-amber-300/30 rounded-lg hover:from-amber-100/60 hover:to-amber-200/40 dark:hover:from-amber-800/30 dark:hover:to-amber-700/20 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20"
          >
            <div className="w-full h-8 bg-gradient-to-b from-amber-400/50 to-transparent rounded-md mb-2 border border-amber-400/30"></div>
            <span className="text-xs font-medium text-foreground/70 group-hover:text-foreground transition-colors">Header Decoration</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoControlPanel;
