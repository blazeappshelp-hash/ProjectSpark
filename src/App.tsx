import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "./components/Navbar";
import WhatsAppButton from "./components/WhatsAppButton";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

import About from "./pages/About.tsx";
import JoinUS from "./pages/JoinUS.tsx";
import { ThemeProvider } from "./context/ThemeContext";
import OfflineEvents from "./pages/OfflineEvents";

import Events from "./pages/Events";

const queryClient = new QueryClient();



const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <Navbar />
       <WhatsAppButton />
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Explore Vision Route */}
          
          <Route path="/About" element={<About />} />
          <Route path="/JoinUS" element={<JoinUS />} />
          <Route path="/OfflineEvents" element={<OfflineEvents />} />

          <Route path="/Events" element={<Events />} />

          {/* KEEP THIS LAST */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;