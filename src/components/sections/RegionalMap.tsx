"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DONDE_ESTAMOS_CONFIG } from "@/config/donde-estamos.config";
import * as LucideIcons from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function RegionalMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const { countries } = DONDE_ESTAMOS_CONFIG;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const countryCards = mapRef.current?.querySelectorAll(".country-card");

      if (countryCards && countryCards.length > 0) {
        gsap.from(countryCards, {
          opacity: 0,
          y: 50,
          scale: 0.95,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.1)",
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, mapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mapRef} className="relative z-10 container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h3 className="font-heading text-6xl md:text-7xl font-bold text-slate-800 mb-6 text-center">
          Países Participantes
        </h3>
        <p className="text-xl text-slate-600 mb-16 text-center max-w-3xl mx-auto">
          Representación centroamericana en ICPC 2025 - equipos, universidades y logros destacados
        </p>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {countries.map((country, index) => (
            <CountryCard key={index} country={country} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CountryCard({ country }: { country: typeof DONDE_ESTAMOS_CONFIG.countries[number] }) {
  // Dynamically get the icon component from Lucide
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (LucideIcons as any)[country.flag] || LucideIcons.MapPin;
  
  return (
    <div className="country-card group relative">
      {/* Card */}
      <div className="relative bg-white/90 backdrop-blur-sm border-2 border-slate-200 hover:border-[#5459ab]/40 rounded-3xl p-8 transition-all duration-300 group-hover:scale-[1.05] group-hover:shadow-2xl overflow-hidden">
        {/* Top gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#5459ab] to-[#648db3]" />

        {/* Icon */}
        <div className="mb-6 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#5459ab] to-[#52357b] flex items-center justify-center shadow-lg">
            <IconComponent className="w-10 h-10 text-white stroke-[1.5]" />
          </div>
        </div>

        {/* Country Name */}
        <h4 className="text-3xl font-bold text-slate-800 mb-2 text-center">
          {country.name}
        </h4>

        {/* Year Joined */}
        <p className="text-sm text-slate-500 mb-6 text-center font-medium">
          Desde {country.yearJoined}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-4 text-center border border-slate-100">
            <div className="text-3xl font-bold bg-gradient-to-r from-[#5459ab] to-[#648db3] bg-clip-text text-transparent">
              {country.teams}
            </div>
            <div className="text-xs text-slate-600 mt-1 font-medium">Equipos</div>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-purple-50 rounded-xl p-4 text-center border border-slate-100">
            <div className="text-3xl font-bold bg-gradient-to-r from-[#52357b] to-[#5459ab] bg-clip-text text-transparent">
              {country.universities}
            </div>
            <div className="text-xs text-slate-600 mt-1 font-medium">Universidades</div>
          </div>
        </div>

        {/* Problems Solved */}
        <div className="bg-gradient-to-br from-slate-50 to-green-50 rounded-xl p-4 mb-6 text-center border border-slate-100">
          <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            {country.problemsSolved}
          </div>
          <div className="text-xs text-slate-600 mt-1 font-medium">Problemas Resueltos</div>
        </div>

        {/* Highlights */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">
            Logros Destacados:
          </p>
          {country.highlights.map((highlight, index) => (
            <div
              key={index}
              className="flex items-start gap-2 text-sm text-slate-600 bg-slate-50 rounded-lg p-2 border border-slate-100"
            >
              <LucideIcons.CheckCircle2 className="w-4 h-4 text-[#5459ab] mt-0.5 flex-shrink-0" />
              <span className="leading-snug">{highlight}</span>
            </div>
          ))}
        </div>

        {/* Decorative gradient hover effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#5459ab]/5 to-[#648db3]/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300 pointer-events-none" />
      </div>
    </div>
  );
}
