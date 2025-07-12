
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

interface Archetype {
  Name: string;
  Motto?: string;
  Description?: string;
}

export const useArchetypes = () => {
  const { data: archetypes, isLoading, error, refetch } = useQuery({
    queryKey: ['archetypes'],
    queryFn: async (): Promise<Archetype[]> => {
      const { data, error } = await supabase
        .from('profiles')
        .select('Name, Motto, Description');

      if (error) throw error;
      return data || [];
    },
  });

  const getRandomArchetype = (): Archetype | null => {
    if (!archetypes || archetypes.length === 0) return null;
    return archetypes[Math.floor(Math.random() * archetypes.length)];
  };

  return {
    archetypes,
    isLoading,
    error,
    refetch,
    getRandomArchetype,
  };
};
