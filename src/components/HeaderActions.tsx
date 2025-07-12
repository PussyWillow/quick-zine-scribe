
import React from 'react';
import { ArchetypeGenerator } from './ArchetypeGenerator';
import { GothicToggle } from './GothicToggle';
import { HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const HeaderActions: React.FC = () => {
  const navigate = useNavigate();

  const handleQuestionsClick = () => {
    navigate('/questions');
  };

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
        <ArchetypeGenerator />
      </div>
      <GothicToggle />
    </div>
  );
};
