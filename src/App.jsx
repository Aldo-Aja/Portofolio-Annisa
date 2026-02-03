import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HeroSection from "./components/HeroSection.jsx";
import SkillsSection from "./components/SkillsSection.jsx";
import ExperienceSection from "./components/ExperienceSection.jsx";
import PortfolioSection from "./components/PortfolioSection.jsx";
import ContactFooter from "./components/ContactFooter.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx"; // Pastikan file Admin dibuat

function Home() {
  return (
    <div className="min-h-screen smooth-scroll">
      <Navbar />
      <main>
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <PortfolioSection />
        <ContactFooter />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
