
import React from 'react';
import { Eye } from 'lucide-react';

interface ZinePreviewHeaderProps {
  themeName: string;
}

const ZinePreviewHeader: React.FC<ZinePreviewHeaderProps> = ({ themeName }) => {
  return (
    <div className="flex items-center gap-2 p-4 border-b border-gray-200 bg-white">
      <Eye className="w-5 h-5 text-gray-600" />
      <h2 className="text-lg font-semibold text-gray-800">Preview</h2>
      <div className="ml-auto text-sm text-gray-500">
        {themeName} Theme
      </div>
    </div>
  );
};

export default ZinePreviewHeader;
