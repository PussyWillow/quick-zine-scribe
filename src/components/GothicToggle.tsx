
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
      className={`gap-2 transition-all duration-300 ${
        isGothicMode 
          ? 'gothic-glow bg-red-950 hover:bg-red-900 text-red-100 border-red-800' 
          : 'hover:bg-gray-100'
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
