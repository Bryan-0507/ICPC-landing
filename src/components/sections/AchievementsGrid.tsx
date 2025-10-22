"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DONDE_ESTAMOS_CONFIG } from "@/config/donde-estamos.config";
import * as LucideIcons from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AchievementsGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const { achievements } = DONDE_ESTAMOS_CONFIG;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".achievement-card");
      
      if (cards && cards.length > 0) {
        // Animación de entrada con stagger optimizado
        gsap.from(cards, {
          opacity: 0,
          y: 40,
          scale: 0.9,
          duration: 0.4,
          stagger: 0.06,
          ease: "back.out(1.1)",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={gridRef} className="relative z-10 container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {achievements.map((achievement, index) => (
          <AchievementCard key={index} achievement={achievement} />
        ))}
      </div>
    </div>
  );
}

function AchievementCard({ achievement }: { achievement: typeof DONDE_ESTAMOS_CONFIG.achievements[number] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Dynamically get the icon component from Lucide
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (LucideIcons as any)[achievement.icon] || LucideIcons.Circle;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Contador animado con requestAnimationFrame
            const duration = 1800; // ms
            const startTime = performance.now();
            const targetValue = achievement.value;

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              
              // Easing suave
              const easeProgress = 1 - Math.pow(1 - progress, 3);
              const currentCount = Math.floor(easeProgress * targetValue);
              
              setCount(currentCount);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCount(targetValue);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [achievement.value, hasAnimated]);

  return (
    <div
      ref={cardRef}
      className="achievement-card group relative overflow-hidden"
    >
      {/* Fondo con gradiente */}
      <div className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
      
      {/* Border glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300`} />
      
      {/* Card content */}
      <div className="relative bg-white/80 backdrop-blur-sm border-2 border-slate-200 group-hover:border-slate-300 rounded-2xl p-8 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl">
        {/* Icon */}
        <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
          <IconComponent className="w-14 h-14 text-[#5459ab] stroke-[1.5]" />
        </div>

        {/* Number */}
        <div className="mb-3">
          <span className={`text-6xl font-bold bg-gradient-to-br ${achievement.gradient} bg-clip-text text-transparent`}>
            {count}
            {achievement.suffix}
          </span>
        </div>

        {/* Label */}
        <h4 className="text-lg font-bold text-slate-800">
          {achievement.label}
        </h4>

        {/* Decorative corner */}
        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${achievement.gradient} opacity-5 blur-2xl`} />
      </div>
    </div>
  );
}
