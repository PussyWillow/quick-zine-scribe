
import React from 'react';
import { Search } from 'lucide-react';

interface AssetSearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const AssetSearchBar: React.FC<AssetSearchBarProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search assets..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-9 pr-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring w-48"
      />
    </div>
  );
};
