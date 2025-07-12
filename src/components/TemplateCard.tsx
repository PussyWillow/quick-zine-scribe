
import React from 'react';
import { Plus, Clock } from 'lucide-react';
import { Template } from '../data/templates';

interface TemplateCardProps {
  template: Template;
  onSelect: (template: Template) => void;
  onFavorite: (e: React.MouseEvent, template: Template) => void;
  isFavorited: boolean;
  onClockClick?: (e: React.MouseEvent) => void;
  onCultClick?: (e: React.MouseEvent) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onSelect,
  onFavorite,
  isFavorited,
  onClockClick,
  onCultClick,
}) => {
  return (
    <div
      className="border border-gray-200 rounded-md p-3 hover:border-blue-300 cursor-pointer transition-colors group relative"
      onClick={() => onSelect(template)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-gray-800 group-hover:text-blue-700 transition-colors">
              {template.name}
            </h4>
            {template.id === 'travel-journal' && onClockClick && (
              <button
                onClick={onClockClick}
                className="text-xs opacity-60 hover:opacity-100 transition-opacity"
                title="⏰"
              >
                <Clock className="w-3 h-3" />
              </button>
            )}
            {template.id === 'community-digest' && onCultClick && (
              <button
                onClick={onCultClick}
                className="text-xs opacity-60 hover:opacity-100 transition-opacity"
                title="👁️"
              >
                👁️
              </button>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">{template.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium capitalize">
              {template.category}
            </span>
            <span className="text-xs text-gray-400">
              Suggested: {template.suggestedTheme}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-2 flex-shrink-0">
          <button
            onClick={(e) => onFavorite(e, template)}
            className="text-lg hover:scale-110 transition-transform"
            title="Add to Grimoire"
          >
            {isFavorited ? '❤️' : '🤍'}
          </button>
          <Plus className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
        </div>
      </div>
    </div>
  );
};
