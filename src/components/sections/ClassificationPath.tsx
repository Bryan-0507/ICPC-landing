"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DONDE_ESTAMOS_CONFIG } from "@/config/donde-estamos.config";
import * as LucideIcons from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ClassificationPath() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { classificationPath } = DONDE_ESTAMOS_CONFIG;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>(".path-step", sectionRef.current);
      const connectors = gsap.utils.toArray<HTMLElement>(".path-connector", sectionRef.current);

      // Estados iniciales para evitar parpadeos (FOUC)
      gsap.set(steps, { opacity: 0, y: 36 });
      const stepIcons = steps
        .map((s) => s.querySelector(".path-icon"))
        .filter(Boolean) as HTMLElement[];
      if (stepIcons.length) gsap.set(stepIcons, { opacity: 0, scale: 0.88, rotate: -6 });

      const connectorLines = connectors
        .map((c) => c.querySelector(".connector-line"))
        .filter(Boolean) as HTMLElement[];
      if (connectorLines.length) gsap.set(connectorLines, { scaleY: 0, transformOrigin: "top" });

      const connectorChevrons = connectors
        .map((c) => c.querySelector("svg"))
        .filter((el): el is SVGSVGElement => el instanceof SVGSVGElement);
      if (connectorChevrons.length) gsap.set(connectorChevrons, { opacity: 0, y: -6 });

      // Batch para STEPS (tarjetas)
      ScrollTrigger.batch(steps, {
        start: "top 85%",
        onEnter: (batch) => {
          const els = batch as HTMLElement[];
          gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.12,
            overwrite: "auto",
            lazy: false,
          });
          const icons = els
            .map((s) => s.querySelector(".path-icon"))
            .filter(Boolean) as HTMLElement[];
          if (icons.length)
            gsap.to(icons, {
              opacity: 1,
              scale: 1,
              rotate: 0,
              duration: 0.5,
              ease: "back.out(1.4)",
              stagger: 0.12,
              overwrite: "auto",
              lazy: false,
            });
        },
        onEnterBack: (batch) => {
          const els = batch as HTMLElement[];
          gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.1,
            overwrite: "auto",
            lazy: false,
          });
        },
        onLeaveBack: (batch) => {
          const els = batch as HTMLElement[];
          gsap.set(els, { opacity: 0, y: 24 });
          const icons = els
            .map((s) => s.querySelector(".path-icon"))
            .filter(Boolean) as HTMLElement[];
          if (icons.length) gsap.set(icons, { opacity: 0, scale: 0.88, rotate: -6 });
        },
        interval: 0.15,
        batchMax: 3,
      });

      // Batch para CONNECTORS (línea + chevron)
      ScrollTrigger.batch(connectors, {
        start: "top 85%",
        onEnter: (batch) => {
          const cons = batch as HTMLElement[];
          const lines = cons
            .map((c) => c.querySelector(".connector-line"))
            .filter(Boolean) as HTMLElement[];
          if (lines.length)
            gsap.to(lines, {
              scaleY: 1,
              duration: 0.45,
              ease: "power2.out",
              stagger: 0.1,
            });
          const chevs = cons
            .map((c) => c.querySelector("svg"))
            .filter((el): el is SVGSVGElement => el instanceof SVGSVGElement);
          if (chevs.length)
            gsap.to(chevs, {
              opacity: 1,
              y: 0,
              duration: 0.35,
              ease: "power2.out",
              stagger: 0.1,
            });
        },
        onLeaveBack: (batch) => {
          const cons = batch as HTMLElement[];
          const lines = cons
            .map((c) => c.querySelector(".connector-line"))
            .filter(Boolean) as HTMLElement[];
          if (lines.length) gsap.set(lines, { scaleY: 0 });
          const chevs = cons
            .map((c) => c.querySelector("svg"))
            .filter((el): el is SVGSVGElement => el instanceof SVGSVGElement);
          if (chevs.length) gsap.set(chevs, { opacity: 0, y: -6 });
        },
        interval: 0.15,
        batchMax: 3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Función para obtener estilos según el estado
  const getStatusStyles = (status?: string) => {
    switch (status) {
      case "completed":
        return {
          badgeGradient: "from-green-600 to-emerald-600",
          iconBg: "from-green-600 to-emerald-600",
          borderColor: "border-green-200 hover:border-green-400",
          dateColor: "from-green-600/10 to-emerald-600/10 text-green-700 border-green-600/20",
          statusIcon: <LucideIcons.Check className="w-5 h-5 text-white" />,
        };
      case "cancelled":
        return {
          badgeGradient: "from-red-600 to-rose-600",
          iconBg: "from-red-600 to-rose-600",
          borderColor: "border-red-200 hover:border-red-400",
          dateColor: "from-red-600/10 to-rose-600/10 text-red-700 border-red-600/20",
          statusIcon: <LucideIcons.X className="w-5 h-5 text-white" />,
        };
      case "pending":
        return {
          badgeGradient: "from-yellow-600 to-amber-600",
          iconBg: "from-yellow-600 to-amber-600",
          borderColor: "border-yellow-200 hover:border-yellow-400",
          dateColor: "from-yellow-600/10 to-amber-600/10 text-yellow-700 border-yellow-600/20",
          statusIcon: <LucideIcons.Clock className="w-5 h-5 text-white" />,
        };
      case "upcoming":
        return {
          badgeGradient: "from-[#5459ab] to-[#52357b]",
          iconBg: "from-[#5459ab] to-[#52357b]",
          borderColor: "border-[#5459ab]/20 hover:border-[#5459ab]/40",
          dateColor: "from-[#5459ab]/10 to-[#648db3]/10 text-[#5459ab] border-[#5459ab]/20",
          statusIcon: <LucideIcons.Star className="w-5 h-5 text-white" />,
        };
      default:
        return {
          badgeGradient: "from-[#5459ab] to-[#52357b]",
          iconBg: "from-[#5459ab] to-[#52357b]",
          borderColor: "border-slate-200 hover:border-[#5459ab]/40",
          dateColor: "from-[#5459ab]/10 to-[#648db3]/10 text-[#5459ab] border-[#5459ab]/20",
          statusIcon: null,
        };
    }
  };

  return (
    <div ref={sectionRef} className="relative z-10 container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h3 className="font-heading text-6xl md:text-7xl font-bold text-slate-800 mb-6 text-center">
          Gran Premio CA
        </h3>
        <p className="text-xl text-slate-600 mb-16 text-center max-w-3xl mx-auto">
          Principales fechas del clasificatorio al Gran Premio Centroamérica 2025
        </p>

        {/* Steps */}
        <div className="relative">
          {classificationPath.map((step, index) => {
            // Dynamically get the icon component from Lucide
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const IconComponent = (LucideIcons as any)[step.icon] || LucideIcons.Circle;
            const styles = getStatusStyles(step.status);
            
            return (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className="path-step flex items-start gap-6 mb-8">
                  {/* Icon Circle */}
                  <div className={`path-icon flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br ${styles.iconBg} flex items-center justify-center shadow-lg relative`}>
                    <IconComponent className="w-10 h-10 text-white stroke-[1.5]" />
                    {styles.statusIcon && (
                      <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-slate-700 shadow-md flex items-center justify-center">
                        {styles.statusIcon}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 bg-white/80 backdrop-blur-sm border-2 ${styles.borderColor} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 will-change-transform`}
                    style={{ willChange: "transform, opacity" }}
                  >
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span className={`px-4 py-1.5 bg-gradient-to-r ${styles.dateColor} text-sm font-bold rounded-full border`}>
                        {step.date}
                      </span>
                      {step.status === "completed" && (
                        <span className="text-xs text-green-600 font-medium">✓ Completado</span>
                      )}
                      {step.status === "cancelled" && (
                        <span className="text-xs text-red-600 font-medium">✗ Cancelado</span>
                      )}
                  
                      {step.status === "upcoming" && (
                        <span className="text-xs text-[#5459ab] font-medium">🔜 Próximo</span>
                      )}
                    </div>
                    <h4 className="text-2xl font-bold text-slate-800 mb-2">
                      {step.title}
                    </h4>
                    <p className="text-slate-600 mb-4 font-medium">
                      {step.description}
                    </p>
                    {step.details && step.details.length > 0 && (
                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                            <LucideIcons.Info className="w-4 h-4 text-[#5459ab] mt-0.5 flex-shrink-0" />
                            <span className="italic">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Connector Arrow */}
                {index < classificationPath.length - 1 && (
                  <div className="path-connector relative flex items-center justify-center my-4 ml-10">
                    {/* vertical stem, thicker and rounded */}
                    <div className={`connector-line relative z-0 w-[3px] h-8 mb-[12px] bg-gradient-to-b ${styles.badgeGradient}`} />
                    {/* chevron head slightly overlapping the stem */}
                    <LucideIcons.ChevronDown
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-[3px] w-8 h-8 pointer-events-none z-10 stroke-[2]"
                      style={{
                        color: styles.iconBg.includes("5459ab")
                          ? "#5459ab"
                          : styles.iconBg.includes("green")
                          ? "#059669"
                          : styles.iconBg.includes("red")
                          ? "#dc2626"
                          : styles.iconBg.includes("yellow")
                          ? "#d97706"
                          : "#5459ab",
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
