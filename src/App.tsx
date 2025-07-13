
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { GothicModeProvider } from "@/contexts/GothicModeContext";
import { CollectionsProvider } from "@/contexts/CollectionsContext";
import { GothicNotebookDrawer } from "@/components/GothicNotebookDrawer";
import Index from "./pages/Index";
import Questions from "./pages/Questions";
import NotFound from "./pages/NotFound";

// Create QueryClient instance outside component to avoid recreation
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GothicModeProvider>
          <CollectionsProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/questions" element={<Questions />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
              <GothicNotebookDrawer />
            </TooltipProvider>
          </CollectionsProvider>
        </GothicModeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
