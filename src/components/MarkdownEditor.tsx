
import React from 'react';
import { FileText } from 'lucide-react';

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
  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b border-gray-100">
        <FileText className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800">Editor</h2>
      </div>
      
      {/* Metadata Section */}
      <div className="p-4 border-b border-gray-100 space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Your zine title..."
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Subtitle
          </label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => onSubtitleChange(e.target.value)}
            placeholder="Optional subtitle..."
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600"
          />
        </div>
      </div>
      
      {/* Markdown Editor */}
      <div className="flex-1 p-4">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Content (Markdown supported)
        </label>
        <textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Start writing your zine content here...

## Section Title
Write your fragments here. You can use:
- **Bold text**
- *Italic text*
- [Links](https://example.com)
- Lists and more!

Add as many sections as you need."
          className="w-full h-full resize-none border border-gray-200 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 font-mono text-sm leading-relaxed"
        />
      </div>
    </div>
  );
};

export default MarkdownEditor;
