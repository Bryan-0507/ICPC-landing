"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Inicio", href: "#hero" },
  { label: "Estadísticas", href: "#estadisticas" },
  { label: "Dónde Estamos", href: "#donde-estamos" },
  { label: "Participantes", href: "#participants" },
];

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      
      // Para las secciones con convergencia, hacer scroll antes para resetear la animación
      const convergeIds = ['#que-es-icpc', '#desafio'];
      const isConvergeSection = convergeIds.includes(href);
      
      // Si estamos navegando hacia arriba a una sección de convergencia, ir más arriba
      const currentScroll = window.pageYOffset;
      const isScrollingUp = currentScroll > elementPosition;
      
      let offsetPosition;
      if (isConvergeSection && isScrollingUp) {
        // Hacer scroll a 200px antes de la sección para que la animación se reproduzca
        offsetPosition = elementPosition - window.innerHeight * 0.3;
      } else {
        offsetPosition = elementPosition - 80;
      }
      
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth"
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg"
          : "bg-slate-900/30 dark:bg-slate-900/40 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center">
          <div className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className={`relative font-medium text-sm transition-colors duration-300 group ${
                  isScrolled
                    ? "text-foreground hover:text-primary"
                    : "text-white hover:text-primary"
                }`}
              >
                {item.label}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-tertiary transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between">
          <button
            onClick={() => handleNavClick("#hero")}
            className="flex items-center gap-2"
          >
            <Image
              src="/icpc_icon.svg"
              alt="ICPC Logo"
              width={40}
              height={40}
              className="transition-transform duration-300 hover:scale-110"
            />
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2 transition-colors ${isScrolled ? "text-foreground hover:text-primary" : "text-white hover:text-primary"}`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 shadow-lg border-t border-border">
            <div className="flex flex-col py-4">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="px-6 py-3 text-left text-foreground font-medium hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary transition-all duration-200"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
