import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import Projetos from "./pages/Projetos";
import ProjetoDetalhes from "./pages/ProjetoDetalhes";
import NovoProjeto from "./pages/NovoProjeto";
import Comunicacao from "./pages/Comunicacao";
import Agenda from "./pages/Agenda";
import Relatorios from "./pages/Relatorios";
import Votacao from "./pages/Votacao";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="flex min-h-screen w-full">
                    <AppSidebar />
                    <div className="flex-1">
                      <Routes>
                        <Route path="/dashboard" element={<Index />} />
                        <Route path="/projetos" element={<Projetos />} />
                        <Route path="/projetos/:id" element={<ProjetoDetalhes />} />
                        <Route path="/projetos/novo" element={<NovoProjeto />} />
                        <Route path="/comunicacao" element={<Comunicacao />} />
                        <Route path="/agenda" element={<Agenda />} />
                        <Route path="/votacao" element={<Votacao />} />
                        <Route path="/relatorios" element={<Relatorios />} />
                        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </div>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
