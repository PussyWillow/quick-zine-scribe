
import React, { useState } from 'react';
import { FileText, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCollections } from '@/contexts/CollectionsContext';
import { templates, Template } from '../data/templates';
import { TemplateCategoryFilter } from './TemplateCategoryFilter';
import { TemplateCard } from './TemplateCard';

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showTimeTravelJournal, setShowTimeTravelJournal] = useState(false);
  const [showCultDigest, setShowCultDigest] = useState(false);
  const { collections, addTemplate } = useCollections();

  const handleClockClick = () => {
    setShowTimeTravelJournal(true);
  };

  const handleCultClick = () => {
    setShowCultDigest(true);
  };

  const handleFavoriteTemplate = (e: React.MouseEvent, template: Template) => {
    e.stopPropagation();
    addTemplate({
      name: template.name,
      category: template.category
    });
  };

  const isTemplateFavorited = (templateId: string) => {
    return collections.templates.some(t => t.name === templates.find(template => template.id === templateId)?.name);
  };

  const allTemplates = templates.filter(t => {
    if (t.id === 'time-travel-journal') return showTimeTravelJournal;
    if (t.id === 'cult-digest') return showCultDigest;
    return !t.isHidden;
  });

  const filteredTemplates = selectedCategory === 'all' 
    ? allTemplates 
    : allTemplates.filter(t => t.category === selectedCategory);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-600">
          <FileText className="inline w-4 h-4 mr-1" />
          Templates
        </label>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            const randomTemplate = allTemplates[Math.floor(Math.random() * allTemplates.length)];
            onSelectTemplate(randomTemplate);
          }}
          className="text-xs"
        >
          <Sparkles className="w-3 h-3 mr-1" />
          Random
        </Button>
      </div>

      <TemplateCategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {filteredTemplates.map(template => (
          <TemplateCard
            key={template.id}
            template={template}
            onSelect={onSelectTemplate}
            onFavorite={handleFavoriteTemplate}
            isFavorited={isTemplateFavorited(template.id)}
            onClockClick={template.id === 'travel-journal' ? (e) => {
              e.stopPropagation();
              handleClockClick();
            } : undefined}
            onCultClick={template.id === 'community-digest' ? (e) => {
              e.stopPropagation();
              handleCultClick();
            } : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
