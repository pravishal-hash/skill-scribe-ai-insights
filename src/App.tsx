
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SkillsManagement from "./pages/skills-management/SkillsManagement";
import ResumeInference from "./pages/skills-management/ResumeInference";
import CertificateInference from "./pages/skills-management/CertificateInference";
import EmployeeSkills from "./pages/skills-management/EmployeeSkills";
import Settings from "./pages/skills-management/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard/module/skills-management" element={<AppLayout><SkillsManagement /></AppLayout>} />
          <Route path="/dashboard/module/skills-management/resume-inference" element={<AppLayout><ResumeInference /></AppLayout>} />
          <Route path="/dashboard/module/skills-management/certificate-inference" element={<AppLayout><CertificateInference /></AppLayout>} />
          <Route path="/dashboard/module/skills-management/employee-skills" element={<AppLayout><EmployeeSkills /></AppLayout>} />
          <Route path="/dashboard/module/skills-management/settings" element={<AppLayout><Settings /></AppLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
