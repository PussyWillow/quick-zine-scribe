
import React from 'react';
import { HeaderActions } from './HeaderActions';
import { AuthActions } from './AuthActions';
import { AuthModal } from './AuthModal';
import { Zap } from 'lucide-react';

interface AppHeaderProps {
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ showAuthModal, setShowAuthModal }) => {
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
            <HeaderActions />
            <AuthActions onSignInClick={() => setShowAuthModal(true)} />
          </div>
        </div>
      </header>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </>
  );
};
