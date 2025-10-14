"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TEAMS } from "@/data/teams";
import { UNIVERSITY_COLORS } from "@/types/participants";
import { getTopTeams } from "@/lib/participants.utils";
import { PARTICIPANTS_CONFIG } from "@/config/participants.config";

export default function TeamRanking() {
  const rankingRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<HTMLDivElement[]>([]);

  rowRefs.current = [];

  const addRowRef = (el: HTMLDivElement | null) => {
    if (el && !rowRefs.current.includes(el)) {
      rowRefs.current.push(el);
    }
  };

  const sortedTeams = getTopTeams(TEAMS, PARTICIPANTS_CONFIG.TOP_TEAMS_COUNT);

  useEffect(() => {
    if (!rankingRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate ranking title with slide from left
      gsap.fromTo(
        ".ranking-title",
        { opacity: 0, x: -100, skewX: -10 },
        {
          opacity: 1,
          x: 0,
          skewX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rankingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate header with reveal effect
      const header = rankingRef.current?.querySelector('.ranking-header');
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, scaleY: 0, transformOrigin: "top" },
          {
            opacity: 1,
            scaleY: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rankingRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Animate rows with creative entrances
      rowRefs.current.forEach((row, index) => {
        const position = index + 1;
        const isTopThree = position <= 3;
        
        // Different animation for top 3
        if (isTopThree) {
          // Podium effect for top 3
          gsap.fromTo(
            row,
            { 
              opacity: 0, 
              y: 100,
              scale: 0.8,
              rotateZ: position === 1 ? 0 : position === 2 ? -5 : 5,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateZ: 0,
              duration: 1,
              delay: index * 0.15,
              ease: "elastic.out(1, 0.8)",
              scrollTrigger: {
                trigger: rankingRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            }
          );

          // Special glow for winner
          if (position === 1) {
            gsap.to(row, {
              boxShadow: "0 0 30px rgba(251, 191, 36, 0.5)",
              duration: 1.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          }
        } else {
          // Standard slide for others
          gsap.fromTo(
            row,
            { opacity: 0, x: index % 2 === 0 ? -100 : 100, rotateY: index % 2 === 0 ? -20 : 20 },
            {
              opacity: 1,
              x: 0,
              rotateY: 0,
              duration: 0.8,
              delay: index * 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: rankingRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Parallax effect on each row
        gsap.to(row, {
          y: -15,
          scrollTrigger: {
            trigger: row,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        // Hover scale animation con z-index mejorado
        row.addEventListener('mouseenter', () => {
          gsap.to(row, {
            scale: 1.02,
            x: 10,
            zIndex: 50,
            boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.3)",
            duration: 0.3,
            ease: "power2.out",
          });
        });

        row.addEventListener('mouseleave', () => {
          gsap.to(row, {
            scale: 1,
            x: 0,
            zIndex: 1,
            boxShadow: "none",
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }, rankingRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rankingRef} className="mb-16">
      <h3 className="ranking-title text-2xl font-heading font-bold mb-6 text-foreground flex items-center gap-3">
        <span className="w-1.5 h-8 rounded-full bg-gradient-to-b from-primary to-secondary" />
        Top 5 - Ranking General
      </h3>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-visible">
        {/* Header */}
        <div className="ranking-header bg-gradient-to-r from-primary via-secondary to-tertiary text-white p-4 grid grid-cols-12 gap-4 font-heading font-bold text-sm uppercase tracking-wide rounded-t-2xl">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-5">Equipo</div>
          <div className="col-span-3">Universidad</div>
          <div className="col-span-3 text-right">Puntos</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-slate-200 dark:divide-slate-700 overflow-visible">
          {sortedTeams.map((team, index) => {
            const colors = UNIVERSITY_COLORS[team.university];
            const position = index + 1;
            
            return (
              <div
                key={team.id}
                ref={addRowRef}
                className="grid grid-cols-12 gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-300 cursor-pointer group relative hover:z-50"
              >
                {/* Position */}
                <div className="col-span-1 flex items-center justify-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-white shadow-md group-hover:scale-110 transition-transform duration-300 ${
                      position === 1
                        ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                        : position === 2
                        ? "bg-gradient-to-br from-slate-300 to-slate-500"
                        : position === 3
                        ? "bg-gradient-to-br from-amber-600 to-amber-800"
                        : "bg-gradient-to-br from-slate-400 to-slate-600"
                    }`}
                  >
                    {position}
                  </div>
                </div>

                {/* Team Name */}
                <div className="col-span-5 flex items-center">
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {team.name}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {team.description}
                    </p>
                  </div>
                </div>

                {/* University */}
                <div className="col-span-3 flex items-center">
                  <div
                    className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                    style={{ backgroundColor: colors.primary }}
                  >
                    {team.university}
                  </div>
                </div>

                {/* Score */}
                <div className="col-span-3 flex items-center justify-end">
                  <div className="text-right">
                    <p className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {team.score}
                    </p>
                    <p className="text-xs text-muted-foreground">puntos</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
