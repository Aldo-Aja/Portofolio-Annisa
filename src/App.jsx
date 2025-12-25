import React from 'react'
import Navbar from './components/Navbar.jsx'
import HeroSection from './components/HeroSection.jsx'
import SkillsSection from './components/SkillsSection.jsx'
import ExperienceSection from './components/ExperienceSection.jsx'
import PortfolioSection from './components/PortfolioSection.jsx'
import ContactFooter from './components/ContactFooter.jsx'

export default function App() {
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
  )
}
