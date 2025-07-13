
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AuthActionsProps {
  onSignInClick: () => void;
}

export const AuthActions: React.FC<AuthActionsProps> = ({ onSignInClick }) => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (user) {
    return (
      <Button
        variant="rococo"
        size="sm"
        onClick={handleSignOut}
        className="gap-2 text-white shadow-md border-yellow-400/30"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </Button>
    );
  }

  return (
    <Button
      variant="rococo"
      onClick={onSignInClick}
      className="gap-2 text-white shadow-md border-yellow-400/30"
    >
      <User className="w-4 h-4" />
      Sign In
    </Button>
  );
};
