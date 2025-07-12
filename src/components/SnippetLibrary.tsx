
import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Library, Search, ArrowDownToDot, Copy, Trash2, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Snippet {
  id: string;
  title: string | null;
  content: string;
  tags: string[] | null;
  created_at: string;
}

interface SnippetLibraryProps {
  onInsert: (content: string) => void;
}

export const SnippetLibrary = ({ onInsert }: SnippetLibraryProps) => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [filteredSnippets, setFilteredSnippets] = useState<Snippet[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchSnippets = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('snippets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSnippets(data || []);
    } catch (error: any) {
      toast({
        title: 'Error fetching snippets',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && user) {
      fetchSnippets();
    }
  }, [open, user]);

  useEffect(() => {
    let filtered = snippets;

    if (searchQuery) {
      filtered = filtered.filter(snippet =>
        snippet.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        snippet.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedTag) {
      filtered = filtered.filter(snippet =>
        snippet.tags?.includes(selectedTag)
      );
    }

    setFilteredSnippets(filtered);
  }, [snippets, searchQuery, selectedTag]);

  const getAllTags = () => {
    const tagSet = new Set<string>();
    snippets.forEach(snippet => {
      snippet.tags?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  };

  const handleInsert = (content: string) => {
    onInsert(content);
    setOpen(false);
    toast({ title: 'Snippet inserted!' });
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({ title: 'Snippet copied to clipboard!' });
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('snippets').delete().eq('id', id);
      if (error) throw error;
      
      setSnippets(snippets.filter(s => s.id !== id));
      toast({ title: 'Snippet deleted!' });
    } catch (error: any) {
      toast({
        title: 'Error deleting snippet',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const allTags = getAllTags();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Library className="w-4 h-4" />
          Snippets
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-2xl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Library className="w-5 h-5" />
            Snippet Library
          </SheetTitle>
        </SheetHeader>

        {!user ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Library className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">Sign in to access your snippet library</p>
          </div>
        ) : (
          <div className="space-y-4 mt-6">
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search snippets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {allTags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  <Button
                    variant={selectedTag === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTag(null)}
                  >
                    All
                  </Button>
                  {allTags.map((tag) => (
                    <Button
                      key={tag}
                      variant={selectedTag === tag ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 max-h-[calc(100vh-200px)]">
              {loading ? (
                <div className="text-center py-8 text-gray-500">Loading snippets...</div>
              ) : filteredSnippets.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {snippets.length === 0 ? 'No snippets saved yet' : 'No snippets match your search'}
                </div>
              ) : (
                filteredSnippets.map((snippet) => (
                  <div key={snippet.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {snippet.title && (
                          <h3 className="font-medium text-sm mb-1">{snippet.title}</h3>
                        )}
                        <p className="text-sm text-gray-600 line-clamp-3 mb-2">
                          {snippet.content}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(snippet.created_at), 'MMM d, yyyy')}
                        </div>
                      </div>
                    </div>

                    {snippet.tags && snippet.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {snippet.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-1 pt-2">
                      <Button
                        size="sm"
                        onClick={() => handleInsert(snippet.content)}
                        className="flex items-center gap-1"
                      >
                        <ArrowDownToDot className="w-3 h-3" />
                        Insert
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopy(snippet.content)}
                        className="flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" />
                        Copy
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(snippet.id)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
