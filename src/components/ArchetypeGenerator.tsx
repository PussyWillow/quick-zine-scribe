
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useArchetypes } from '@/hooks/useArchetypes';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Loader2 } from 'lucide-react';

interface ArchetypeData {
  name: string;
  motto?: string;
  description?: string;
}

export const ArchetypeGenerator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [archetype, setArchetype] = useState<ArchetypeData | null>(null);
  const { archetypes, isLoading, getRandomArchetype } = useArchetypes();
  const { toast } = useToast();

  const generateArchetype = () => {
    const randomArchetype = getRandomArchetype();
    
    if (!randomArchetype) {
      toast({
        title: 'No archetypes available',
        description: 'Please try again later.',
        variant: 'destructive',
      });
      return;
    }

    setArchetype({
      name: randomArchetype.Name,
      motto: randomArchetype.Motto,
      description: randomArchetype.Description,
    });
    
    toast({
      title: '✨ Archetype Generated!',
      description: 'Your mystical zine-writer identity has been revealed.',
    });
  };

  const handleOpen = () => {
    setIsOpen(true);
    setArchetype(null);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="outline"
        className="gap-2 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 hover:from-purple-100 hover:to-pink-100"
      >
        <Sparkles className="w-4 h-4" />
        🎭 Generate My Archetype
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              🎭 Archetype Generator
            </DialogTitle>
          </DialogHeader>
          
          <div className="text-center space-y-6 py-4">
            {!archetype && (
              <>
                <p className="text-gray-600">
                  Discover your mystical zine-writer identity—a poetic title that captures your creative essence in this moment.
                </p>
                <Button 
                  onClick={generateArchetype}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Loading Archetypes...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate My Archetype
                    </>
                  )}
                </Button>
              </>
            )}

            {archetype && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Your Archetype:
                  </h3>
                  <p className="text-xl font-medium text-purple-800 mb-3">
                    {archetype.name}
                  </p>
                  
                  {archetype.motto && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">Motto:</p>
                      <p className="text-base italic text-purple-700">
                        "{archetype.motto}"
                      </p>
                    </div>
                  )}
                  
                  {archetype.description && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Description:</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {archetype.description}
                      </p>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  This archetype reflects your creative spirit for this moment.
                </p>
                <Button 
                  onClick={() => setIsOpen(false)}
                  variant="outline"
                  className="w-full"
                >
                  Close
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
