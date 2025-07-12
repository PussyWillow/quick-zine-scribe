
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Shuffle, Heart, Coffee, Frown, Zap } from 'lucide-react';
import { archetypeDataset, getRandomArchetype, getArchetypesByMood } from '@/data/archetypeDataset';

export const ArchetypePreview = () => {
  const [currentArchetype, setCurrentArchetype] = useState(archetypeDataset[0]);

  const handleRandomArchetype = () => {
    setCurrentArchetype(getRandomArchetype());
  };

  const moodConfig = {
    absurd: { icon: Zap, color: 'bg-yellow-100 text-yellow-800', label: 'Absurd' },
    cute: { icon: Heart, color: 'bg-pink-100 text-pink-800', label: 'Cute' },
    mundane: { icon: Coffee, color: 'bg-gray-100 text-gray-800', label: 'Mundane' },
    tragic: { icon: Frown, color: 'bg-blue-100 text-blue-800', label: 'Tragic' }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Shuffle className="w-5 h-5" />
          Archetype Dataset Preview
        </CardTitle>
        <CardDescription>
          A collection of {archetypeDataset.length} quirky archetype titles to inspire your zine-writing identity
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Current Archetype Display */}
        <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <p className="text-lg font-medium text-purple-800 italic">
            "{currentArchetype}"
          </p>
          <Button 
            onClick={handleRandomArchetype}
            variant="outline"
            className="mt-4 gap-2"
          >
            <Shuffle className="w-4 h-4" />
            Get Random Archetype
          </Button>
        </div>

        {/* Mood Categories */}
        <Tabs defaultValue="absurd" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {Object.entries(moodConfig).map(([mood, config]) => {
              const Icon = config.icon;
              return (
                <TabsTrigger key={mood} value={mood} className="gap-1">
                  <Icon className="w-4 h-4" />
                  {config.label}
                </TabsTrigger>
              );
            })}
          </TabsList>
          
          {Object.entries(moodConfig).map(([mood, config]) => (
            <TabsContent key={mood} value={mood} className="space-y-2">
              <div className="grid gap-2 max-h-64 overflow-y-auto">
                {getArchetypesByMood(mood as any).map((archetype, index) => (
                  <div 
                    key={index}
                    className="p-3 bg-white border rounded-lg hover:shadow-sm transition-shadow cursor-pointer"
                    onClick={() => setCurrentArchetype(archetype)}
                  >
                    <p className="text-sm font-medium text-gray-800">
                      {archetype}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center text-sm text-gray-500">
          Click any archetype above to preview it, or use the random generator for inspiration.
        </div>
      </CardContent>
    </Card>
  );
};
