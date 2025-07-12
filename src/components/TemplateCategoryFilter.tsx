
import React from 'react';

interface Category {
  id: string;
  name: string;
}

interface TemplateCategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories: Category[] = [
  { id: 'all', name: 'All Templates' },
  { id: 'newsletter', name: 'Newsletter' },
  { id: 'zine', name: 'Zine' },
  { id: 'creative', name: 'Creative' }
];

export const TemplateCategoryFilter: React.FC<TemplateCategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex gap-1 flex-wrap">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
            selectedCategory === category.id
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};
