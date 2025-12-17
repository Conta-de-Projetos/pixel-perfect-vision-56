import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Premium from "./pages/Premium";
import MangaDetailsPage from "./pages/MangaDetailsPage";
import CollectionPage from "./pages/CollectionPage"; // Import new page
import MenuPage from "./pages/MenuPage"; // Import new page
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/manga/:slug" element={<MangaDetailsPage />} />
          <Route path="/colecao" element={<CollectionPage />} /> {/* New route */}
          <Route path="/menu" element={<MenuPage />} /> {/* New route */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;