
import React from 'react';
import { ArchetypePreview } from '@/components/ArchetypePreview';
import { ArchetypeGenerator } from '@/components/ArchetypeGenerator';
import { useArchetypes } from '@/hooks/useArchetypes';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const ArchetypeShowcase = () => {
  const { archetypes, isLoading } = useArchetypes();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Editor
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                <Sparkles className="w-8 h-8 text-purple-600" />
                Archetype Showcase
              </h1>
              <p className="text-gray-600 mt-1">
                Discover your mystical zine-writer identity
              </p>
            </div>
          </div>
          
          <div className="text-right">
            {!isLoading && archetypes && archetypes.length > 0 && (
              <div className="mb-2">
                <p className="text-sm text-gray-600">Available Archetypes:</p>
                <p className="text-purple-700 font-medium">
                  {archetypes.length} unique identities
                </p>
              </div>
            )}
            <ArchetypeGenerator />
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <ArchetypePreview />
          
          <div className="text-center p-6 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-600 mb-4">
              Generate your archetype to discover your creative identity!
            </p>
            <p className="text-sm text-gray-500">
              Each archetype represents a unique way of seeing and creating in the world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchetypeShowcase;
