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
            toggleActions: "play none none reverse",
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
      className="relative w-full overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/30 to-white"
    >
      {/* Decorative gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#5459ab]/20 to-[#648db3]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#52357b]/15 to-[#5459ab]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-gradient-to-br from-[#648db3]/15 to-blue-200/15 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <div ref={heroRef} className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Kicker */}
          <div className="hero-kicker mb-6">
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-[#5459ab]/10 to-[#648db3]/10 border border-[#5459ab]/20 rounded-full text-sm font-bold text-[#5459ab] tracking-wide uppercase">
              Contexto Regional
            </span>
          </div>

          {/* Main Title */}
          <h2 className="hero-title font-heading text-8xl md:text-9xl font-bold bg-gradient-to-br from-[#5459ab] via-[#648db3] to-[#52357b] bg-clip-text text-transparent mb-8 leading-tight">
            DÓNDE ESTAMOS
          </h2>

          {/* Subtitle */}
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
      <div className="h-20" />

      {/* Achievements Grid */}
      <AchievementsGrid />

      {/* Separador visual */}
      <div className="h-24" />

      {/* Classification Path */}
      <ClassificationPath />

      {/* Separador visual */}
      <div className="h-24" />

      {/* Timeline */}
      <ProgressTimeline />

      {/* Separador visual */}
      <div className="h-24" />

      {/* Regional Map */}
      <RegionalMap />

      {/* Separador visual */}
      <div className="h-24" />

      {/* Context Section */}
      <div ref={contextRef} className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <h3 className="font-heading text-6xl md:text-7xl font-bold text-slate-800 mb-12 text-center">
            Contexto Regional
          </h3>
          <div className="space-y-6">
            <p className="context-paragraph text-lg md:text-xl text-slate-600 leading-relaxed">
              ICPC (International Collegiate Programming Contest) es la competencia de programación universitaria más antigua, grande y prestigiosa del mundo. Desde su fundación en 1977, ha reunido a millones de estudiantes de todo el planeta en un desafío que combina algoritmos, trabajo en equipo y pensamiento crítico.
            </p>
            <p className="context-paragraph text-lg md:text-xl text-slate-600 leading-relaxed">
              Centroamérica ha sido parte activa de ICPC desde el año 2000, cuando Guatemala se convirtió en el primer país de la región en participar. Desde entonces, Costa Rica (2005) y El Salvador (2016) se han sumado a esta comunidad global, consolidando una presencia cada vez más fuerte en el panorama latinoamericano.
            </p>
            <p className="context-paragraph text-lg md:text-xl text-slate-600 leading-relaxed">
              Hoy en día, más de 95 equipos de 23 universidades compiten anualmente en el clasificatorio regional, demostrando el crecimiento sostenido y el compromiso de nuestras instituciones con la excelencia en ciencias de la computación.
            </p>
          </div>
        </div>
      </div>

      {/* Separador visual */}
      <div className="h-24" />

      {/* Vision Section */}
      <div ref={visionRef} className="relative z-10 container mx-auto px-4 py-20 pb-32">
        <div className="max-w-5xl mx-auto">
          <h3 className="font-heading text-6xl md:text-7xl font-bold text-slate-800 mb-12 text-center">
            Visión y Futuro
          </h3>
          <div className="space-y-6">
            <p className="vision-paragraph text-lg md:text-xl text-slate-600 leading-relaxed">
              El éxito reciente de equipos centroamericanos, como la histórica clasificación del TEC Alajuela a las Finales Mundiales 2024 y 2025, marca un antes y un después para nuestra región. Estos logros demuestran que Centroamérica no solo participa, sino que compite al más alto nivel.
            </p>
            <p className="vision-paragraph text-lg md:text-xl text-slate-600 leading-relaxed">
              Mirando hacia adelante, nuestra meta es consolidar a Centroamérica como una potencia regional en programación competitiva, inspirando a más estudiantes a desarrollar sus habilidades algorítmicas y abrir puertas hacia carreras tecnológicas de alcance global.
            </p>
            <p className="vision-paragraph text-lg md:text-xl text-slate-600 leading-relaxed">
              Con cada competencia, forjamos una comunidad más sólida de programadores talentosos que representan el futuro digital de nuestra región. El camino hacia el World Finals continúa, y Centroamérica está lista para el desafío.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
