"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AchievementsGrid from "./AchievementsGrid";
import ProgressTimeline from "./ProgressTimeline";
import RegionalMap from "./RegionalMap";
import ClassificationPath from "./ClassificationPath";

gsap.registerPlugin(ScrollTrigger);

export default function WhereWeAreSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation - título y subtítulo con efecto wave
      const heroTitle = heroRef.current?.querySelector(".hero-title");
      const heroSubtitle = heroRef.current?.querySelector(".hero-subtitle");
      const heroKicker = heroRef.current?.querySelector(".hero-kicker");
      const heroDesc = heroRef.current?.querySelector(".hero-description");

      if (heroTitle && heroSubtitle && heroKicker && heroDesc) {
        // Kicker fade in
        gsap.from(heroKicker, {
          opacity: 0,
          y: 20,
          duration: 0.4,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });

        // Título principal - animación por palabras
        const titleWords = (heroTitle as HTMLElement).innerText.split(" ");
        (heroTitle as HTMLElement).innerHTML = titleWords
          .map((word) => `<span class="inline-block">${word}</span>`)
          .join(" ");

        gsap.from(heroTitle.querySelectorAll("span"), {
          opacity: 0,
          y: 40,
          rotationX: -30,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });

        // Subtítulo con delay
        gsap.from(heroSubtitle, {
          opacity: 0,
          y: 30,
          duration: 0.5,
          delay: 0.3,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });

        // Descripción fade in
        gsap.from(heroDesc, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          delay: 0.5,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Context section - párrafos con stagger
      const contextParagraphs = contextRef.current?.querySelectorAll(".context-paragraph");
      if (contextParagraphs && contextParagraphs.length > 0) {
        gsap.from(contextParagraphs, {
          opacity: 0,
          y: 30,
          duration: 0.4,
          stagger: 0.1,
          scrollTrigger: {
            trigger: contextRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Vision section - similar effect
      const visionParagraphs = visionRef.current?.querySelectorAll(".vision-paragraph");
      if (visionParagraphs && visionParagraphs.length > 0) {
        gsap.from(visionParagraphs, {
          opacity: 0,
          y: 30,
          duration: 0.4,
          stagger: 0.1,
          scrollTrigger: {
            trigger: visionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="donde-estamos"
      className="relative w-full overflow-visible bg-gradient-to-b from-slate-50 via-blue-50/30 to-white"
    >
      {/* Decorative gradient orbs */}
      <div className="absolute inset-0 overflow-visible pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#5459ab]/20 to-[#648db3]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#52357b]/15 to-[#5459ab]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-gradient-to-br from-[#648db3]/15 to-blue-200/15 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <div ref={heroRef} className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Kicker */}
          <div className="hero-kicker mb-24">
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-[#5459ab]/10 to-[#648db3]/10 border border-[#5459ab]/20 rounded-full text-sm font-bold text-[#5459ab] tracking-wide uppercase">
              Contexto Regional
            </span>
          </div>

          {/* Main Title */}
          <h3 className="hero-subtitle font-heading text-5xl md:text-7xl font-bold text-slate-800 mb-6 leading-tight">
            El Camino de ICPC en Centroamérica
          </h3>

          {/* Description */}
          <p className="hero-description text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Desde los inicios en el año 2000 hasta la actualidad, descubre cómo Centroamérica se ha convertido en una región destacada en programación competitiva
          </p>
        </div>
      </div>

      {/* Separador visual */}
      <div className="h-4" />

      {/* Achievements Grid */}
      <AchievementsGrid />

      {/* Separador visual */}
      <div className="h-24" />

      {/* Classification Path */}
      <ClassificationPath />

      {/* Separador visual */}
      <div className="h-12" />

      {/* Timeline */}
      <ProgressTimeline />

      {/* Separador visual */}
      <div className="h-24" />

      {/* Regional Map */}
      <RegionalMap />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
