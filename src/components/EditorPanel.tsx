
import React from 'react';
import MarkdownEditor from './MarkdownEditor';

interface EditorPanelProps {
  content: string;
  onChange: (content: string) => void;
  title: string;
  subtitle: string;
  onTitleChange: (title: string) => void;
  onSubtitleChange: (subtitle: string) => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
  content,
  onChange,
  title,
  subtitle,
  onTitleChange,
  onSubtitleChange,
}) => {
  return (
    <div className="flex flex-col h-full">
      <MarkdownEditor
        content={content}
        onChange={onChange}
        title={title}
        subtitle={subtitle}
        onTitleChange={onTitleChange}
        onSubtitleChange={onSubtitleChange}
      />
    </div>
  );
};
