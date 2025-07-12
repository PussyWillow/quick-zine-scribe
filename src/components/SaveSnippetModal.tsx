
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface SaveSnippetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialContent: string;
  onSaved?: () => void;
}

export const SaveSnippetModal = ({ open, onOpenChange, initialContent, onSaved }: SaveSnippetModalProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(initialContent);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = async () => {
    if (!user) {
      toast({ title: 'Please sign in to save snippets', variant: 'destructive' });
      return;
    }

    if (!content.trim()) {
      toast({ title: 'Content cannot be empty', variant: 'destructive' });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from('snippets').insert({
        user_id: user.id,
        title: title.trim() || null,
        content: content.trim(),
        tags: tags.length > 0 ? tags : null,
      });

      if (error) throw error;

      toast({ title: 'Snippet saved successfully!' });
      onOpenChange(false);
      onSaved?.();
      
      // Reset form
      setTitle('');
      setContent('');
      setTags([]);
      setTagInput('');
    } catch (error: any) {
      toast({
        title: 'Error saving snippet',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Save Snippet</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title (optional)</label>
            <Input
              placeholder="Enter snippet title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <Textarea
              placeholder="Snippet content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Add tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} disabled={loading} className="flex-1">
              {loading ? 'Saving...' : 'Save Snippet'}
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
