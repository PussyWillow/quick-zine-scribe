
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CollectedArchetype {
  id: string;
  name: string;
  motto?: string;
  description?: string;
  collectedAt: string;
}

export interface CollectedTemplate {
  id: string;
  name: string;
  category: string;
  collectedAt: string;
}

export interface CollectedTheme {
  id: string;
  name: string;
  description: string;
  collectedAt: string;
}

interface Collections {
  archetypes: CollectedArchetype[];
  templates: CollectedTemplate[];
  themes: CollectedTheme[];
}

interface CollectionsContextType {
  collections: Collections;
  isDrawerOpen: boolean;
  addArchetype: (archetype: Omit<CollectedArchetype, 'id' | 'collectedAt'>) => void;
  addTemplate: (template: Omit<CollectedTemplate, 'id' | 'collectedAt'>) => void;
  addTheme: (theme: Omit<CollectedTheme, 'id' | 'collectedAt'>) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  removeItem: (type: keyof Collections, id: string) => void;
}

const CollectionsContext = createContext<CollectionsContextType | undefined>(undefined);

export const useCollections = () => {
  const context = useContext(CollectionsContext);
  if (context === undefined) {
    throw new Error('useCollections must be used within a CollectionsProvider');
  }
  return context;
};

export const CollectionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collections, setCollections] = useState<Collections>({
    archetypes: [],
    templates: [],
    themes: []
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Load collections from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('gothic-collections');
    if (saved) {
      try {
        setCollections(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load collections:', error);
      }
    }
  }, []);

  // Save collections to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('gothic-collections', JSON.stringify(collections));
  }, [collections]);

  const addArchetype = (archetype: Omit<CollectedArchetype, 'id' | 'collectedAt'>) => {
    // Check for duplicates
    const exists = collections.archetypes.some(existing => existing.name === archetype.name);
    if (exists) return;

    const newArchetype: CollectedArchetype = {
      ...archetype,
      id: crypto.randomUUID(),
      collectedAt: new Date().toISOString()
    };
    
    setCollections(prev => ({
      ...prev,
      archetypes: [...prev.archetypes, newArchetype]
    }));
    
    // Briefly show the drawer to indicate collection
    setIsDrawerOpen(true);
    setTimeout(() => setIsDrawerOpen(false), 3000);
  };

  const addTemplate = (template: Omit<CollectedTemplate, 'id' | 'collectedAt'>) => {
    // Check for duplicates
    const exists = collections.templates.some(existing => existing.name === template.name);
    if (exists) return;

    const newTemplate: CollectedTemplate = {
      ...template,
      id: crypto.randomUUID(),
      collectedAt: new Date().toISOString()
    };
    
    setCollections(prev => ({
      ...prev,
      templates: [...prev.templates, newTemplate]
    }));
  };

  const addTheme = (theme: Omit<CollectedTheme, 'id' | 'collectedAt'>) => {
    // Check for duplicates
    const exists = collections.themes.some(existing => existing.name === theme.name);
    if (exists) return;

    const newTheme: CollectedTheme = {
      ...theme,
      id: crypto.randomUUID(),
      collectedAt: new Date().toISOString()
    };
    
    setCollections(prev => ({
      ...prev,
      themes: [...prev.themes, newTheme]
    }));
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const removeItem = (type: keyof Collections, id: string) => {
    setCollections(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== id)
    }));
  };

  return (
    <CollectionsContext.Provider value={{
      collections,
      isDrawerOpen,
      addArchetype,
      addTemplate,
      addTheme,
      openDrawer,
      closeDrawer,
      removeItem
    }}>
      {children}
    </CollectionsContext.Provider>
  );
};
