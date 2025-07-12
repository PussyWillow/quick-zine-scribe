
import React from 'react';
import { Moon, Skull } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGothicMode } from '@/contexts/GothicModeContext';

export const GothicToggle: React.FC = () => {
  const { isGothicMode, toggleGothicMode } = useGothicMode();

  return (
    <Button
      variant={isGothicMode ? "default" : "outline"}
      onClick={toggleGothicMode}
      className={`gap-2 transition-all duration-300 font-gothic-display ${
        isGothicMode 
          ? 'gothic-glow bg-accent hover:bg-accent/90 text-accent-foreground border-accent/50' 
          : 'hover:bg-muted'
      }`}
    >
      {isGothicMode ? (
        <Skull className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
      {isGothicMode ? 'Gothic Mode' : 'Turn Gothic'}
    </Button>
  );
};
