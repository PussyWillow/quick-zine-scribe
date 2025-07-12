
import React from 'react';
import { ArchetypeGenerator } from './ArchetypeGenerator';
import { AuthModal } from './AuthModal';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { Zap, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AppHeaderProps {
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ showAuthModal, setShowAuthModal }) => {
  const { user, signOut } = useAuth();
  const { profile } = useProfile();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-800">Flash Zine</h1>
            </div>
            <span className="text-sm text-gray-500 hidden sm:inline">
              Quick newsletter & zine creator
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                {profile?.Name && (
                  <div className="hidden md:block text-right">
                    <div className="text-sm text-purple-600 font-medium">
                      {profile.Name}
                    </div>
                    {profile.Motto && (
                      <div className="text-xs text-gray-500 italic">
                        "{profile.Motto}"
                      </div>
                    )}
                  </div>
                )}
                <ArchetypeGenerator />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </div>
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
