
-- Create a table for snippets
CREATE TABLE public.snippets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to ensure users can only see their own snippets
ALTER TABLE public.snippets ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to SELECT their own snippets
CREATE POLICY "Users can view their own snippets" 
  ON public.snippets 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to INSERT their own snippets
CREATE POLICY "Users can create their own snippets" 
  ON public.snippets 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to UPDATE their own snippets
CREATE POLICY "Users can update their own snippets" 
  ON public.snippets 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy that allows users to DELETE their own snippets
CREATE POLICY "Users can delete their own snippets" 
  ON public.snippets 
  FOR DELETE 
  USING (auth.uid() = user_id);
