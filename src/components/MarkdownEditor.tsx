
import React, { useState, useRef } from 'react';
import { FileText, Save, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SaveSnippetModal } from './SaveSnippetModal';
import { SnippetLibrary } from './SnippetLibrary';
import { AuthModal } from './AuthModal';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface MarkdownEditorProps {
  content: string;
  onChange: (content: string) => void;
  title: string;
  subtitle: string;
  onTitleChange: (title: string) => void;
  onSubtitleChange: (subtitle: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  content,
  onChange,
  title,
  subtitle,
  onTitleChange,
  onSubtitleChange
}) => {
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleTextSelection = () => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const selected = content.substring(start, end);
      setSelectedText(selected);
    }
  };

  const handleSaveSnippet = () => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    const textToSave = selectedText.trim() || content.trim();
    if (!textToSave) {
      toast({ title: 'No content to save', variant: 'destructive' });
      return;
    }

    setSelectedText(textToSave);
    setSaveModalOpen(true);
  };

  const handleInsertSnippet = (snippetContent: string) => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const newContent = content.substring(0, start) + snippetContent + content.substring(end);
      onChange(newContent);
      
      // Set cursor position after inserted content
      setTimeout(() => {
        if (textareaRef.current) {
          const newPosition = start + snippetContent.length;
          textareaRef.current.setSelectionRange(newPosition, newPosition);
          textareaRef.current.focus();
        }
      }, 0);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({ title: 'Signed out successfully' });
    } catch (error: any) {
      toast({ title: 'Error signing out', description: error.message, variant: 'destructive' });
    }
  };

  return (
    <div className="h-full flex flex-col editor-panel-frame">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50 flex-shrink-0">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Editor</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <SnippetLibrary onInsert={handleInsertSnippet} />
          
          <Button
            size="sm"
            variant="outline"
            onClick={handleSaveSnippet}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Snippet
          </Button>

          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{user.email}</span>
              <Button size="sm" variant="ghost" onClick={handleSignOut}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button size="sm" variant="outline" onClick={() => setAuthModalOpen(true)}>
              <User className="w-4 h-4 mr-1" />
              Sign In
            </Button>
          )}
        </div>
      </div>
      
      {/* Metadata Section */}
      <div className="p-4 border-b border-border/50 space-y-3 flex-shrink-0">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Your zine title..."
            className="w-full editor-input-frame border-0 focus:outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Subtitle
          </label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => onSubtitleChange(e.target.value)}
            placeholder="Optional subtitle..."
            className="w-full editor-input-frame border-0 focus:outline-none text-muted-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>
      
      {/* Markdown Editor */}
      <div className="flex-1 min-h-0 p-4 flex flex-col">
        <label className="block text-sm font-medium text-muted-foreground mb-2 flex-shrink-0">
          Content (Markdown supported)
        </label>
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => onChange(e.target.value)}
          onSelect={handleTextSelection}
          placeholder="Start writing your zine content here...

## Section Title
Write your fragments here. You can use:
- **Bold text**
- *Italic text*
- [Links](https://example.com)
- Lists and more!

Add as many sections as you need."
          className="flex-1 resize-none editor-input-frame border-0 focus:outline-none text-foreground font-mono text-sm leading-relaxed placeholder:text-muted-foreground"
        />
      </div>

      <SaveSnippetModal
        open={saveModalOpen}
        onOpenChange={setSaveModalOpen}
        initialContent={selectedText}
        onSaved={() => {
          // Refresh snippet library if it's open
          setSelectedText('');
        }}
      />

      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
      />
    </div>
  );
};

export default MarkdownEditor;
