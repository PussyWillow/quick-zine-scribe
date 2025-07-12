
import React from 'react';
import { ArchetypeGenerator } from './ArchetypeGenerator';
import { GothicToggle } from './GothicToggle';
import { HelpCircle, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useCollections } from '@/contexts/CollectionsContext';

export const HeaderActions: React.FC = () => {
  const navigate = useNavigate();
  const { collections, openDrawer } = useCollections();

  const handleQuestionsClick = () => {
    navigate('/questions');
  };

  const handleNotebookClick = () => {
    openDrawer();
  };

  // Calculate total collection count
  const totalCollections = collections.archetypes.length + 
                          collections.templates.length + 
                          collections.themes.length;

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Button
          onClick={handleQuestionsClick}
          variant="outline"
          size="sm"
          className="gap-2 bg-blue-500/10 border-blue-500/30 text-blue-500 hover:bg-blue-500/20 hover:border-blue-500/50 hover:text-blue-500 transition-all duration-200 hover:scale-105 hover:shadow-md font-heading"
        >
          <HelpCircle className="w-4 h-4" />
          Questions?
        </Button>
        
        {totalCollections > 0 && (
          <div className="relative">
            <Button
              onClick={handleNotebookClick}
              variant="outline"
              size="sm"
              className="gap-2 bg-purple-500/10 border-purple-500/30 text-purple-500 hover:bg-purple-500/20 hover:border-purple-500/50 hover:text-purple-500 transition-all duration-200 hover:scale-105 hover:shadow-md font-heading"
            >
              <BookOpen className="w-4 h-4" />
              📜 Grimoire
            </Button>
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-600 hover:bg-red-600"
            >
              {totalCollections}
            </Badge>
          </div>
        )}
        
        <ArchetypeGenerator />
      </div>
      <GothicToggle />
    </div>
  );
};
