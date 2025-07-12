
-- Create a table for gallery images
CREATE TABLE public.gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  preview_url TEXT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category VARCHAR(50), -- 'atmospheric', 'gothic', 'nature', etc.
  tags TEXT[], -- Array of searchable tags
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to active images
CREATE POLICY "Public can view active gallery images" 
  ON public.gallery_images 
  FOR SELECT 
  USING (is_active = true);

-- Create policy for authenticated users to manage images (optional admin access)
CREATE POLICY "Authenticated users can manage gallery images" 
  ON public.gallery_images 
  FOR ALL 
  USING (auth.role() = 'authenticated');

-- Insert sample data from current hardcoded images
INSERT INTO public.gallery_images (url, preview_url, name, description, category, tags) VALUES
('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80', 
 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=150&q=80', 
 'Mist', 
 'Foggy mountain landscape with ethereal atmosphere', 
 'atmospheric', 
 ARRAY['fog', 'mountain', 'mist', 'ethereal', 'nature']),

('https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=800&q=80', 
 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=150&q=80', 
 'Sacred', 
 'Gothic cathedral interior with dramatic lighting', 
 'gothic', 
 ARRAY['cathedral', 'gothic', 'sacred', 'architecture', 'dramatic']),

('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&q=80', 
 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=150&q=80', 
 'Night', 
 'Starry night sky with celestial beauty', 
 'atmospheric', 
 ARRAY['stars', 'night', 'sky', 'celestial', 'dark']),

('https://images.unsplash.com/photo-1527576539890-dfa815648363?w=800&q=80', 
 'https://images.unsplash.com/photo-1527576539890-dfa815648363?w=150&q=80', 
 'Shadow', 
 'Urban architecture with dramatic shadows', 
 'urban', 
 ARRAY['building', 'shadow', 'architecture', 'urban', 'contrast']);

-- Create index for better performance on active images
CREATE INDEX idx_gallery_images_active ON public.gallery_images (is_active) WHERE is_active = true;

-- Create index for category filtering
CREATE INDEX idx_gallery_images_category ON public.gallery_images (category) WHERE is_active = true;
