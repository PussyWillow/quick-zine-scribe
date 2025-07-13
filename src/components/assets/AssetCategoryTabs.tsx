
import React from 'react';
import { Image, Shapes, Type, Star, Palette } from 'lucide-react';
import { AssetCategory, CategoryInfo } from '@/types/assets';

interface AssetCategoryTabsProps {
  activeCategory: AssetCategory;
  onCategoryChange: (category: AssetCategory) => void;
}

const categories: CategoryInfo[] = [
  { id: 'photos', name: 'Photos', icon: Image, description: 'Background photos' },
  { id: 'textures', name: 'Textures', icon: Shapes, description: 'Patterns & textures' },
  { id: 'typography', name: 'Typography', icon: Type, description: 'Font specimens' },
  { id: 'decorative', name: 'Decorative', icon: Star, description: 'Borders & elements' },
  { id: 'colors', name: 'Colors', icon: Palette, description: 'Color palettes' },
];

export const AssetCategoryTabs: React.FC<AssetCategoryTabsProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
              activeCategory === category.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
            }`}
            title={category.description}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{category.name}</span>
          </button>
        );
      })}
    </div>
  );
};
