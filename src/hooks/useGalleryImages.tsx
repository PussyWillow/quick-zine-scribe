
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface GalleryImage {
  id: string;
  url: string;
  preview_url: string | null;
  name: string;
  description: string | null;
  category: string | null;
  tags: string[] | null;
  is_active: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

export const useGalleryImages = () => {
  return useQuery({
    queryKey: ['gallery-images'],
    queryFn: async (): Promise<GalleryImage[]> => {
      console.log('Fetching gallery images from Supabase...');
      
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching gallery images:', error);
        throw error;
      }

      console.log('Gallery images fetched:', data);
      return data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (replaced cacheTime)
  });
};

export const useGalleryImagesByCategory = (category?: string) => {
  return useQuery({
    queryKey: ['gallery-images', category],
    queryFn: async (): Promise<GalleryImage[]> => {
      console.log('Fetching gallery images by category:', category);
      
      let query = supabase
        .from('gallery_images')
        .select('*')
        .eq('is_active', true);

      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching gallery images by category:', error);
        throw error;
      }

      console.log('Gallery images by category fetched:', data);
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000, // 10 minutes (replaced cacheTime)
  });
};
