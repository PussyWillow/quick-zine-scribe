
import React from 'react';
import { ArchetypeGenerator } from './ArchetypeGenerator';
import { AuthModal } from './AuthModal';
import { GothicToggle } from './GothicToggle';
import { useAuth } from '@/hooks/useAuth';
import { Zap, User, LogOut, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface AppHeaderProps {
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ showAuthModal, setShowAuthModal }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleQuestionsClick = () => {
    navigate('/questions');
  };

  return (
    <>
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-purple-600" />
              <h1 className="text-2xl font-bold text-foreground">Flash Zine</h1>
            </div>
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Quick newsletter & zine creator
            </span>
          </div>
          
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
            {user ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => setShowAuthModal(true)}
                className="gap-2"
              >
                <User className="w-4 h-4" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </>
  );
};
