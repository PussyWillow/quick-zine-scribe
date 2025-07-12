
import React, { useState } from 'react';
import { X, BookOpen, Scroll, Palette, Trash2 } from 'lucide-react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { useCollections } from '@/contexts/CollectionsContext';
import { useGothicMode } from '@/contexts/GothicModeContext';

type TabType = 'archetypes' | 'templates' | 'themes';

export const GothicNotebookDrawer: React.FC = () => {
  const { collections, isDrawerOpen, closeDrawer, removeItem } = useCollections();
  const { isGothicMode } = useGothicMode();
  const [activeTab, setActiveTab] = useState<TabType>('archetypes');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const tabs = [
    { id: 'archetypes' as TabType, label: 'Archetypes', icon: Scroll, count: collections.archetypes.length },
    { id: 'templates' as TabType, label: 'Templates', icon: BookOpen, count: collections.templates.length },
    { id: 'themes' as TabType, label: 'Themes', icon: Palette, count: collections.themes.length }
  ];

  return (
    <Drawer open={isDrawerOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <DrawerContent className={`gothic-notebook-drawer max-h-[80vh] ${isGothicMode ? 'gothic' : ''}`}>
        {/* Decorative ink stains */}
        <div className="ink-stain" style={{ top: '20px', right: '30px' }} />
        <div className="ink-stain" style={{ bottom: '40px', left: '50px' }} />
        
        <DrawerHeader className="relative z-10">
          <div className="flex items-center justify-between">
            <DrawerTitle className="notebook-heading text-2xl">
              ✦ My Gothic Grimoire ✦
            </DrawerTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={closeDrawer}
              className="hover:bg-transparent"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Notebook tabs */}
          <div className="notebook-tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`notebook-tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon className="w-4 h-4 inline mr-2" />
                  {tab.label}
                  {tab.count > 0 && (
                    <span className="ml-2 text-xs opacity-70">({tab.count})</span>
                  )}
                </button>
              );
            })}
          </div>
        </DrawerHeader>

        <div className="notebook-page flex-1 overflow-y-auto">
          {activeTab === 'archetypes' && (
            <div>
              <h3 className="notebook-heading text-lg mb-4">Collected Archetypes</h3>
              {collections.archetypes.length === 0 ? (
                <div className="empty-collection">
                  <Scroll className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No archetypes collected yet.</p>
                  <p className="text-sm mt-1">Generate an archetype to start your collection!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {collections.archetypes.map((archetype, index) => (
                    <div key={archetype.id} className={`collection-item ${index === 0 ? 'collection-animation' : ''}`}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="collection-item-title">{archetype.name}</h4>
                          {archetype.motto && (
                            <p className="text-sm italic mb-2 opacity-80">"{archetype.motto}"</p>
                          )}
                          {archetype.description && (
                            <p className="text-sm mb-2 opacity-90">{archetype.description}</p>
                          )}
                          <p className="collection-item-meta">
                            Discovered on {formatDate(archetype.collectedAt)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem('archetypes', archetype.id)}
                          className="opacity-50 hover:opacity-100 ml-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'templates' && (
            <div>
              <h3 className="notebook-heading text-lg mb-4">Used Templates</h3>
              {collections.templates.length === 0 ? (
                <div className="empty-collection">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No templates used yet.</p>
                  <p className="text-sm mt-1">Try a template to add it to your collection!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {collections.templates.map((template) => (
                    <div key={template.id} className="collection-item">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="collection-item-title">{template.name}</h4>
                          <p className="text-sm mb-2 opacity-80 capitalize">{template.category}</p>
                          <p className="collection-item-meta">
                            Used on {formatDate(template.collectedAt)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem('templates', template.id)}
                          className="opacity-50 hover:opacity-100 ml-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'themes' && (
            <div>
              <h3 className="notebook-heading text-lg mb-4">Favorite Themes</h3>
              {collections.themes.length === 0 ? (
                <div className="empty-collection">
                  <Palette className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No favorite themes yet.</p>
                  <p className="text-sm mt-1">Mark themes as favorites to collect them!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {collections.themes.map((theme) => (
                    <div key={theme.id} className="collection-item">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="collection-item-title">{theme.name}</h4>
                          <p className="text-sm mb-2 opacity-80">{theme.description}</p>
                          <p className="collection-item-meta">
                            Favorited on {formatDate(theme.collectedAt)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem('themes', theme.id)}
                          className="opacity-50 hover:opacity-100 ml-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
