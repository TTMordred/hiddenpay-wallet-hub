import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Docs from "./pages/Docs";
import DocsGettingStarted from "./pages/docs/GettingStarted";
import DocsQuickStart from "./pages/docs/QuickStart";
import DocsCoreConceptsIndex from "./pages/docs/CoreConcepts";
import DocsAuthentication from "./pages/docs/Authentication";
import DocsApiReference from "./pages/docs/ApiReference";
import DocsErrors from "./pages/docs/Errors";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Documentation Routes */}
          <Route path="/docs" element={<Docs />} />
          <Route path="/docs/getting-started" element={<DocsGettingStarted />} />
          <Route path="/docs/getting-started/quick-start" element={<DocsQuickStart />} />
          <Route path="/docs/getting-started/*" element={<DocsGettingStarted />} />
          <Route path="/docs/core-concepts" element={<DocsCoreConceptsIndex />} />
          <Route path="/docs/core-concepts/*" element={<DocsCoreConceptsIndex />} />
          <Route path="/docs/authentication" element={<DocsAuthentication />} />
          <Route path="/docs/authentication/*" element={<DocsAuthentication />} />
          <Route path="/docs/api" element={<DocsApiReference />} />
          <Route path="/docs/api/*" element={<DocsApiReference />} />
          <Route path="/docs/errors" element={<DocsErrors />} />
          <Route path="/docs/webhooks" element={<DocsApiReference />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
