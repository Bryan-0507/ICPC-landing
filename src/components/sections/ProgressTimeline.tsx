"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DONDE_ESTAMOS_CONFIG } from "@/config/donde-estamos.config";
import * as LucideIcons from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ProgressTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { timeline } = DONDE_ESTAMOS_CONFIG;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const events = timelineRef.current?.querySelectorAll(".timeline-event");

      if (events && events.length > 0) {
        const items = gsap.utils.toArray<HTMLElement>(".timeline-event", timelineRef.current);

        // Estado inicial para evitar parpadeos (FOUC) y saltos en first paint
        gsap.set(items, { opacity: 0, y: 36 });

        ScrollTrigger.batch(items, {
          start: "top 85%",
          onEnter: (batch) => {
            gsap.to(batch as HTMLElement[], {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.12,
              overwrite: "auto",
              lazy: false,
            });
          },
          onEnterBack: (batch) => {
            gsap.to(batch as HTMLElement[], {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.1,
              overwrite: "auto",
              lazy: false,
            });
          },
          onLeave: (batch) => {
            // Evitar animación inversa visible para que no "parpadee"
            gsap.set(batch as HTMLElement[], { opacity: 0, y: 24 });
          },
          onLeaveBack: (batch) => {
            gsap.set(batch as HTMLElement[], { opacity: 0, y: 24 });
          },
          interval: 0.15,
          batchMax: 3,
        });
      }
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={timelineRef} className="relative z-10 container mx-auto px-4 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h3 className="font-heading text-6xl md:text-7xl font-bold text-slate-800 mb-6 text-center">
          Nuestra Trayectoria
        </h3>
        <p className="text-xl text-slate-600 mb-16 text-center max-w-3xl mx-auto">
          Desde los inicios de ICPC hasta la actualidad - hitos que marcaron la historia de la programación competitiva en Centroamérica
        </p>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {timeline.map((event, index) => (
            <TimelineEvent key={`${event.year}-${index}`} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineEvent({ event }: { event: typeof DONDE_ESTAMOS_CONFIG.timeline[number] }) {
  const eventRef = useRef<HTMLDivElement>(null);
  
  // Dynamically get the icon component from Lucide
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (LucideIcons as any)[event.icon] || LucideIcons.Circle;

  return (
    <div
      ref={eventRef}
      className="timeline-event group relative"
    >
      {/* Card */}
      <div
        className="relative bg-white/80 backdrop-blur-sm border-2 border-slate-200 group-hover:border-[#5459ab]/40 rounded-2xl p-6 h-full transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-xl will-change-transform"
        style={{ willChange: "transform, opacity" }}
      >
        {/* Year Badge */}
        <div className="mb-4">
          <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-[#5459ab] to-[#52357b] text-white font-bold text-sm shadow-md">
            {event.year}
          </span>
        </div>

        {/* Icon */}
        <div className="mb-4">
          <IconComponent className="w-12 h-12 text-[#5459ab] stroke-[1.5] block shrink-0" />
        </div>

        {/* Title */}
        <h4 className="text-xl font-bold text-slate-800 mb-3">
          {event.title}
        </h4>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed">
          {event.description}
        </p>

        {/* Decorative gradient hover effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#5459ab]/5 to-[#52357b]/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none" />
      </div>
    </div>
  );
}
