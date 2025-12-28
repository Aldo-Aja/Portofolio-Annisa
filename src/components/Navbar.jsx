import React, { useEffect, useState } from 'react'
import { Download } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'About', target: 'about' },
  { label: 'Skills', target: 'skills' },
  { label: 'Experience', target: 'experience' },
  { label: 'Portfolio', target: 'portfolio' },
  { label: 'Contact', target: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleScroll = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const offset = 80
    const rect = el.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const top = rect.top + scrollTop - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled ? "bg-[#F4ECE6]/90 shadow-md backdrop-blur-sm" : "bg-[#F4ECE6]"
      }`}
    >
      <div className="section-container flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <img
            src="/img/FotoAnnisa.jpg"
            alt="Foto profil Annisa Furna Nazuwa"
            className="h-8 w-8 rounded-full object-cover"
          />
          <div className="flex flex-col leading-normal">
            <span className="font-heading text-[20px] font-semibold text-[#222222]">
              Annisa Furna Nazuwa
            </span>
            <span className="text-xs text-[#666666]">
              Student • Desain Komunikasi Visual
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6 text-sm font-medium text-[#666666]">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.target}
                type="button"
                onClick={() => handleScroll(item.target)}
                className="hover:text-[#222222] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
          <a
            href="/cv/CV-Annisa.pdf"
            download="Annisa-Furna-Nazuwa-CV.pdf"
            className="inline-flex items-center gap-2 rounded-full border border-[#222222] bg-white px-5 py-2.5 text-xs font-semibold text-[#222222] shadow-sm hover:bg-[#222222] hover:text-white transition-colors"
          >
            <Download className="h-4 w-4" />
            Download CV
          </a>
        </div>
      </div>
    </nav>
  );
}
