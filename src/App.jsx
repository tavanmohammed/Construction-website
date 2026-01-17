import { Routes, Route, Navigate } from "react-router-dom";

import TopContactBar from "./components/TopContactBar";
import MainNavbar from "./components/MainNavbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import StatsSection from "./components/StatsSection";
import ServicesSection from "./components/ServicesSection";
import RepairServicesSection from "./components/RepairServicesSection";
import RestorationServicesSection from "./components/RestorationServicesSection";
import ProjectsSection from "./components/ProjectsSection";
import ReviewsSection from "./components/ReviewsSection";
import ServiceAreasSection from "./components/ServiceAreasSection";
import ContactSection from "./components/ContactSection";
import SiteFooter from "./components/SiteFooter";
import CommercialProjectsPage from "./pages/CommercialProjectsPage";


import ProjectPage from "./pages/ProjectPage";

function HomePage() {
  return (
    <>
      <TopContactBar />
      <MainNavbar />
      <Hero />
      <AboutSection />
      <StatsSection />
      <ServicesSection />
      <RepairServicesSection />
      <RestorationServicesSection />
      <ProjectsSection />
      <ReviewsSection />
      <ServiceAreasSection />
      <ContactSection />
      <SiteFooter />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* single projects page */}
      <Route path="/projects" element={<ProjectPage />} />

      {/* redirect old /projects/anything */}
      <Route path="/projects/*" element={<Navigate to="/projectPage" replace />} />

      <Route path="/commercialprojects" element={<CommercialProjectsPage />} />


      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
