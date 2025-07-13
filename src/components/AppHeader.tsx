
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
      <header className="bg-card border-b-2 border-gradient-to-r from-yellow-400/30 via-yellow-500/40 to-amber-600/30 px-6 py-4 relative overflow-hidden">
        {/* Elegant golden accent border */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent"></div>
        
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-50/5 via-transparent to-yellow-50/5 pointer-events-none"></div>
        
        <div className="flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-gradient-to-br from-yellow-400/20 to-amber-600/20 border border-yellow-400/30">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h1 className="text-2xl font-bold text-foreground font-serif">Flash Zine</h1>
            </div>
            <span className="text-sm text-muted-foreground hidden sm:inline font-serif">
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
