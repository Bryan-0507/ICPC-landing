"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TEAMS } from "@/data/teams";
import { UNIVERSITY_COLORS, type University } from "@/types/participants";
import { calculateTeamStats } from "@/lib/participants.utils";
import { PARTICIPANTS_CONFIG } from "@/config/participants.config";

export default function ParticipantsStats() {
  const statsRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<HTMLSpanElement[]>([]);

  counterRefs.current = [];

  const addCounterRef = (el: HTMLSpanElement | null) => {
    if (el && !counterRefs.current.includes(el)) {
      counterRefs.current.push(el);
    }
  };

  const universities = Object.keys(UNIVERSITY_COLORS) as University[];
  const teamStats = calculateTeamStats(TEAMS);

  const stats = [
    { label: "Universidades", value: universities.length, suffix: "" },
    { label: "Equipos", value: teamStats.totalTeams, suffix: "" },
    { label: "Participantes", value: teamStats.totalParticipants, suffix: "" },
    { label: "Punteo Promedio", value: teamStats.avgScore, suffix: " pts" },
  ];

  useEffect(() => {
    if (!statsRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate stat cards with wave effect
      if (statsRef.current) {
        const cards = statsRef.current.querySelectorAll(".stat-card");
        
        cards.forEach((card, index) => {
          // Card entrance with 3D flip
          gsap.fromTo(
            card,
            { 
              opacity: 0, 
              y: 80,
              rotateX: -90,
              scale: 0.5,
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              scale: 1,
              duration: 1,
              delay: index * 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: statsRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );

          // Floating animation - más lento y suave
          gsap.to(card, {
            y: -8,
            duration: 3 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.3,
          });

          // Subtle rotation on scroll
          gsap.to(card, {
            rotateZ: index % 2 === 0 ? 2 : -2,
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            },
          });
        });
      }

      // Animate counters with enhanced effects
      counterRefs.current.forEach((counter, index) => {
        const endValue = stats[index].value;

        // Pulse effect before counting
        gsap.fromTo(
          counter,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Counter animation
        gsap.fromTo(
          counter,
          { innerText: 0 },
          {
            innerText: endValue,
            duration: PARTICIPANTS_CONFIG.animations.counterDuration,
            ease: "power2.out",
            snap: { innerText: 1 },
            delay: 0.3 + index * 0.1,
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            onUpdate: function () {
              if (counter) {
                const current = Math.ceil(parseFloat(counter.innerText));
                counter.innerText = current.toString();
                
                // Pulse on significant numbers
                if (current % 10 === 0 && current > 0 && current < endValue) {
                  gsap.to(counter, {
                    scale: 1.2,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                  });
                }
              }
            },
          }
        );
      });
    }, statsRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={statsRef} className="mb-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="stat-card relative overflow-hidden bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-tertiary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                {stat.label}
              </p>
              <div className="flex items-baseline gap-1">
                <span
                  ref={addCounterRef}
                  className="text-4xl md:text-5xl font-heading font-bold bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent"
                >
                  0
                </span>
                <span className="text-lg font-semibold text-muted-foreground">
                  {stat.suffix}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
