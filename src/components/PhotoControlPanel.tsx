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
  const positions = [{
    id: 'center',
    label: 'Center',
    class: 'object-center'
  }, {
    id: 'top',
    label: 'Top',
    class: 'object-top'
  }, {
    id: 'bottom',
    label: 'Bottom',
    class: 'object-bottom'
  }, {
    id: 'left',
    label: 'Left',
    class: 'object-left'
  }, {
    id: 'right',
    label: 'Right',
    class: 'object-right'
  }, {
    id: 'top-left',
    label: 'Top Left',
    class: 'object-left-top'
  }, {
    id: 'top-right',
    label: 'Top Right',
    class: 'object-right-top'
  }, {
    id: 'bottom-left',
    label: 'Bottom Left',
    class: 'object-left-bottom'
  }, {
    id: 'bottom-right',
    label: 'Bottom Right',
    class: 'object-right-bottom'
  }];
  const blendModes = [{
    id: 'normal',
    label: 'Normal'
  }, {
    id: 'multiply',
    label: 'Multiply'
  }, {
    id: 'overlay',
    label: 'Overlay'
  }, {
    id: 'soft-light',
    label: 'Soft Light'
  }, {
    id: 'hard-light',
    label: 'Hard Light'
  }, {
    id: 'color-dodge',
    label: 'Color Dodge'
  }, {
    id: 'color-burn',
    label: 'Color Burn'
  }];
  return <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 py-0 my-0 mx-[21px] px-0">
      {/* Photo Selection */}
      <div className="space-y-3 py-0 my-[28px] mx-0 px-[4px] ">
        <PhotoSelector selectedPhoto={selectedPhoto} onPhotoChange={onPhotoChange} />
      </div>

      {/* Opacity Control */}
      <div className="space-y-3 px-[19px] py-0 bg-transparent mx-[144px] my-[117px]">
        <div className="flex items-center gap-2 mb-3">
          <Sliders className="w-4 h-4 text-muted-foreground" />
          <Label className="text-sm font-medium text-foreground font-heading">
            Opacity: {photoOpacity}%
          </Label>
        </div>
        <Slider value={[photoOpacity]} onValueChange={value => onOpacityChange(value[0])} max={50} min={0} step={1} className="w-full" />
      </div>

      {/* Position Grid Selector */}
      <div className="rounded-bl-none space-y-3.5 mx-0">
        <div className="flex items-center gap-2 mb-3 flex my-0 py-0 px-[156px] mx-[80px]">
          <Grid3x3 className="w-4 h-4 text-muted-foreground" />
          <Label className="text-sm font-medium text-foreground font-heading">Position</Label>
        </div>
        <div className="grid grid-cols-3 py-[9px] rounded-br-sm my-[10px] mx-[183px]">
          {positions.map(pos => <button key={pos.id} onClick={() => onPositionChange(pos.id)} className={`w-8 h-8 rounded border-2 transition-all ${photoPosition === pos.id ? 'border-ring bg-accent' : 'border-border hover:border-muted-foreground bg-card'}`} title={pos.label}>
              <div className={`w-full h-full rounded-sm ${pos.id.includes('top') ? 'bg-gradient-to-b from-primary/60 to-transparent' : pos.id.includes('bottom') ? 'bg-gradient-to-t from-primary/60 to-transparent' : pos.id.includes('left') ? 'bg-gradient-to-r from-primary/60 to-transparent' : pos.id.includes('right') ? 'bg-gradient-to-l from-primary/60 to-transparent' : 'bg-primary/40'}`} />
            </button>)}
        </div>
      </div>

      {/* Scale and Blend Mode */}
      <div className="space-y-4">
        {/* Scale Control */}
        <div className="space-y-2 py-0 my-0 mx-[2px] px-[157px]">
          <Label className="text-sm font-medium text-foreground font-heading">
            Scale: {photoScale}x
          </Label>
          <Slider value={[photoScale]} onValueChange={value => onScaleChange(value[0])} max={2} min={0.5} step={0.1} className="w-full" />
        </div>

        {/* Blend Mode */}
        <div className="space-y-2 px-[152px] my-[12px] py-0 mx-[9px]">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-muted-foreground" />
            <Label className="text-sm font-medium text-foreground font-heading">Blend Mode</Label>
          </div>
          <Select value={blendMode} onValueChange={onBlendModeChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {blendModes.map(mode => <SelectItem key={mode.id} value={mode.id}>
                  {mode.label}
                </SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick Presets - Span full width on mobile, partial on larger screens */}
      <div className="lg:col-span-2 xl:col-span-4 space-y-3 px-[135px] py-0 my-0 mx-0">
        <Label className="text-sm font-medium text-foreground font-heading my-0 px-[55px] mx-[149px] rounded-md">Quick Styles</Label>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          <button onClick={() => {
          onOpacityChange(15);
          onPositionChange('center');
          onScaleChange(1.2);
          onBlendModeChange('multiply');
        }} className="px-3 py-2 text-xs bg-card border border-border rounded-md hover:bg-muted transition-colors">
            Subtle Atmosphere
          </button>
          <button onClick={() => {
          onOpacityChange(25);
          onPositionChange('bottom-right');
          onScaleChange(0.8);
          onBlendModeChange('overlay');
        }} className="px-3 py-2 text-xs bg-card border border-border rounded-md hover:bg-muted transition-colors">
            Corner Vignette
          </button>
          <button onClick={() => {
          onOpacityChange(35);
          onPositionChange('center');
          onScaleChange(1);
          onBlendModeChange('soft-light');
        }} className="px-3 py-2 text-xs bg-card border border-border rounded-md hover:bg-muted transition-colors">
            Background Art
          </button>
          <button onClick={() => {
          onOpacityChange(8);
          onPositionChange('top');
          onScaleChange(1.5);
          onBlendModeChange('multiply');
        }} className="px-3 py-2 text-xs bg-card border border-border rounded-md hover:bg-muted transition-colors">
            Header Decoration
          </button>
        </div>
      </div>
    </div>;
};
export default PhotoControlPanel;