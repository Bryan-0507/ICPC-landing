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
      const steps = sectionRef.current?.querySelectorAll(".path-step");
      const connectors = sectionRef.current?.querySelectorAll(".path-connector");

      if (steps && steps.length > 0) {
        // Animar steps con stagger
        gsap.from(steps, {
          opacity: 0,
          x: -40,
          duration: 0.5,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        // Animar conectores con delay
        if (connectors && connectors.length > 0) {
          gsap.from(connectors, {
            scaleY: 0,
            transformOrigin: "top",
            duration: 0.4,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          });
        }
      }
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
                  <div className={`flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br ${styles.iconBg} flex items-center justify-center shadow-lg relative`}>
                    <IconComponent className="w-10 h-10 text-white stroke-[1.5]" />
                    {styles.statusIcon && (
                      <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center">
                        {styles.statusIcon}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className={`flex-1 bg-white/80 backdrop-blur-sm border-2 ${styles.borderColor} rounded-2xl p-6 hover:shadow-xl transition-all duration-300`}>
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
                  <div className="path-connector flex items-center justify-center my-4 ml-10">
                    <div className={`w-0.5 h-8 bg-gradient-to-b ${styles.badgeGradient}`} />
                    <LucideIcons.ChevronDown className={`absolute w-6 h-6 translate-y-3`} style={{ color: styles.iconBg.includes('5459ab') ? '#5459ab' : styles.iconBg.includes('green') ? '#059669' : styles.iconBg.includes('red') ? '#dc2626' : styles.iconBg.includes('yellow') ? '#d97706' : '#5459ab' }} />
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
