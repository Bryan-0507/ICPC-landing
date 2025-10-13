"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TEAMS } from "@/data/teams";
import { UNIVERSITY_COLORS, type University, type Team } from "@/types/participants";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import ParticipantsStats from "./ParticipantsStats";
import AnimatedBackground from "@/components/ui/animated-background";
import TeamRanking from "./TeamRanking";
import { filterAndSortTeams, calculateRanking, getInitials } from "@/lib/participants.utils";
import { PARTICIPANTS_CONFIG, FILTER_LABELS } from "@/config/participants.config";

type SortBy = "score" | "alphabetical";

export default function ParticipantsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const [selectedUniversity, setSelectedUniversity] = useState<University | "all">("all");
  const [sortBy, setSortBy] = useState<SortBy>("score");
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  cardRefs.current = [];

  const addCardRef = (el: HTMLDivElement | null) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  // Filter and sort teams
  const filteredTeams = useMemo(() => {
    return filterAndSortTeams(TEAMS, selectedUniversity, sortBy);
  }, [selectedUniversity, sortBy]);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;

      // Animate title with creative split text effect
      if (titleRef.current) {
        const chars = titleRef.current.innerText.split('');
        titleRef.current.innerHTML = chars.map(char => 
          `<span style="display: inline-block; opacity: 0;">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
        
        const charElements = titleRef.current.querySelectorAll('span');
        
        gsap.fromTo(
          charElements,
          { 
            opacity: 0, 
            y: 100,
            rotateX: -90,
            transformOrigin: "50% 50%"
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: {
              each: 0.03,
              from: "center",
            },
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Animate kicker with slide and fade from left
      if (kickerRef.current) {
        gsap.fromTo(
          kickerRef.current,
          { opacity: 0, x: -100, rotateY: -45 },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Animate filters with cascade effect
      if (filtersRef.current) {
        const filterSections = filtersRef.current.querySelectorAll('& > div');
        
        gsap.fromTo(
          filterSections,
          { 
            opacity: 0, 
            y: 50,
            scale: 0.9,
            rotateX: -20
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.25,
            ease: "power2.out",
            scrollTrigger: {
              trigger: filtersRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Animate filter buttons individually - más fluido
        const buttons = filtersRef.current.querySelectorAll('button');
        gsap.fromTo(
          buttons,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "back.out(1.5)",
            delay: 0.3,
            scrollTrigger: {
              trigger: filtersRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Animate grid with reveal effect
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate cards when they change
  useEffect(() => {
    if (cardRefs.current.length === 0) return;

    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, index) => {
        // Calculate position for creative entrance
        const row = Math.floor(index / 3);
        const col = index % 3;
        const isEven = row % 2 === 0;
        
        // Entrance animation with 3D rotation and perspective
        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            y: 100,
            x: isEven ? (col === 0 ? -100 : col === 2 ? 100 : 0) : (col === 0 ? 100 : col === 2 ? -100 : 0),
            rotateY: isEven ? -45 : 45,
            rotateX: -20,
            scale: 0.7,
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 1,
            delay: index * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Parallax effect on scroll
        gsap.to(card, {
          y: -20,
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        // Hover effects with enhanced animations
        const handleMouseEnter = () => {
          gsap.to(card, {
            scale: 1.08,
            y: -12,
            rotateY: 3,
            rotateX: -3,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            duration: PARTICIPANTS_CONFIG.animations.hoverDuration,
            ease: "power2.out",
          });
          
          // Animate avatars on hover
          const avatars = card.querySelectorAll('.team-avatar');
          gsap.to(avatars, {
            scale: 1.15,
            y: -5,
            stagger: 0.05,
            duration: 0.3,
            ease: "back.out(2)",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            rotateY: 0,
            rotateX: 0,
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            duration: PARTICIPANTS_CONFIG.animations.hoverDuration,
            ease: "power2.out",
          });
          
          // Reset avatars
          const avatars = card.querySelectorAll('.team-avatar');
          gsap.to(avatars, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          card.removeEventListener("mouseenter", handleMouseEnter);
          card.removeEventListener("mouseleave", handleMouseLeave);
        };
      });
    });

    return () => ctx.revert();
  }, [filteredTeams]);

  return (
    <>
      <section
        ref={sectionRef}
        id="participants"
        className="snap-start min-h-screen py-20 px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden"
      >
        {/* Animated background */}
        <AnimatedBackground />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <p
              ref={kickerRef}
              className="text-primary font-semibold text-sm uppercase tracking-wider mb-3"
            >
              Equipos Competidores
            </p>
            <h2
              ref={titleRef}
              className="font-heading text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent"
            >
              PARTICIPANTES
            </h2>
          </div>

          {/* Statistics */}
          <ParticipantsStats />

          {/* Top 5 Ranking */}
          <TeamRanking />

          {/* Filters */}
          <div ref={filtersRef} className="mb-12 space-y-6">
            {/* University filters */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                {FILTER_LABELS.filterByUniversity}
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedUniversity("all")}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                    selectedUniversity === "all"
                      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105"
                      : "bg-white dark:bg-slate-800 text-foreground hover:shadow-md hover:scale-105"
                  }`}
                >
                  {FILTER_LABELS.all}
                </button>
                {(Object.keys(UNIVERSITY_COLORS) as University[]).map((uni) => {
                  const colors = UNIVERSITY_COLORS[uni];
                  return (
                    <button
                      key={uni}
                      onClick={() => setSelectedUniversity(uni)}
                      className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                        selectedUniversity === uni
                          ? "shadow-lg scale-105"
                          : "hover:shadow-md hover:scale-105"
                      }`}
                      style={{
                        backgroundColor: selectedUniversity === uni ? colors.primary : "#fff",
                        color: selectedUniversity === uni ? colors.text : colors.primary,
                        border: `2px solid ${colors.primary}`,
                      }}
                    >
                      {uni}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sort filters */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                {FILTER_LABELS.sortBy}
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSortBy("score")}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                    sortBy === "score"
                      ? "bg-gradient-to-r from-tertiary to-primary text-white shadow-lg scale-105"
                      : "bg-white dark:bg-slate-800 text-foreground hover:shadow-md hover:scale-105"
                  }`}
                >
                  {FILTER_LABELS.score}
                </button>
                <button
                  onClick={() => setSortBy("alphabetical")}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                    sortBy === "alphabetical"
                      ? "bg-gradient-to-r from-tertiary to-primary text-white shadow-lg scale-105"
                      : "bg-white dark:bg-slate-800 text-foreground hover:shadow-md hover:scale-105"
                  }`}
                >
                  {FILTER_LABELS.alphabetical}
                </button>
              </div>
            </div>
          </div>

          {/* Teams Grid */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeams.map((team) => {
              const colors = UNIVERSITY_COLORS[team.university];
              return (
                <div
                  key={team.id}
                  ref={addCardRef}
                  onClick={() => setSelectedTeam(team)}
                  className="group cursor-pointer bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md transition-shadow duration-500"
                  style={{
                    borderTop: `4px solid ${colors.primary}`,
                  }}
                >
                  {/* Card Header */}
                  <div
                    className="p-6 pb-4"
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white/90 uppercase tracking-wider">
                        {team.university}
                      </span>
                      <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-sm font-bold text-white">{team.score} pts</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-white group-hover:scale-105 transition-transform duration-300">
                      {team.name}
                    </h3>
                  </div>

                  {/* Team Members */}
                  <div className="p-6">
                    <div className="flex justify-center -space-x-4 mb-4">
                      {team.members
                        .filter((m) => m.role === "Competidor")
                        .map((member, idx) => (
                          <div
                            key={idx}
                            className="team-avatar relative w-16 h-16 rounded-full border-4 border-white dark:border-slate-800 overflow-hidden shadow-lg transition-all duration-300"
                            style={{
                              transitionDelay: `${idx * 50}ms`,
                            }}
                          >
                            <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-400 flex items-center justify-center text-xl font-bold text-white">
                              {getInitials(member.name)}
                            </div>
                          </div>
                        ))}
                    </div>
                    <p className="text-sm text-center text-muted-foreground line-clamp-2">
                      {team.description || "Equipo competitivo listo para el desafío ICPC"}
                    </p>
                    <div className="mt-4 text-center">
                      <span className="text-xs font-medium text-primary group-hover:underline">
                        {PARTICIPANTS_CONFIG.messages.clickForDetails}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty state */}
          {filteredTeams.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl font-heading text-muted-foreground">
                {PARTICIPANTS_CONFIG.messages.emptyState}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Team Detail Dialog */}
      <Dialog open={!!selectedTeam} onOpenChange={(open) => !open && setSelectedTeam(null)}>
        {selectedTeam && (
          <DialogContent className="max-w-3xl">
            <DialogClose onClose={() => setSelectedTeam(null)} />
            
            {/* Animated Header with gradient */}
            <div className="relative overflow-hidden rounded-t-lg">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `linear-gradient(135deg, ${UNIVERSITY_COLORS[selectedTeam.university].primary} 0%, ${UNIVERSITY_COLORS[selectedTeam.university].secondary} 100%)`,
                  filter: "blur(40px)",
                }}
              />
              <DialogHeader
                className="pb-0 relative z-10"
                style={{
                  background: `linear-gradient(135deg, ${UNIVERSITY_COLORS[selectedTeam.university].primary} 0%, ${UNIVERSITY_COLORS[selectedTeam.university].secondary} 100%)`,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white/90 uppercase tracking-wider">
                    {selectedTeam.university}
                  </span>
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-bold text-white">
                      {selectedTeam.score} puntos
                    </span>
                  </div>
                </div>
                <DialogTitle className="text-white text-3xl">{selectedTeam.name}</DialogTitle>
                <DialogDescription className="text-white/90 text-base">
                  {selectedTeam.description}
                </DialogDescription>
              </DialogHeader>
            </div>

            <div className="p-6 pt-8 space-y-8">
              {/* Stats Grid */}
              <div className="dialog-section grid grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Ranking</p>
                  <p className="text-3xl font-heading font-bold text-foreground">
                    #{calculateRanking(TEAMS, selectedTeam.id)}
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Integrantes</p>
                  <p className="text-3xl font-heading font-bold text-foreground">
                    {selectedTeam.members.filter(m => m.role === "Competidor").length}
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Puntaje</p>
                  <p className="text-3xl font-heading font-bold text-foreground">
                    {selectedTeam.score}
                  </p>
                </div>
              </div>

              {/* Members Section */}
              <div className="dialog-section">
                <h4 className="text-xl font-heading font-semibold mb-5 text-foreground flex items-center gap-2">
                  <span className="w-1 h-6 rounded-full" style={{ backgroundColor: UNIVERSITY_COLORS[selectedTeam.university].primary }} />
                  Integrantes del Equipo
                </h4>
                <div className="space-y-3">
                  {selectedTeam.members.map((member, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                    >
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${UNIVERSITY_COLORS[selectedTeam.university].primary} 0%, ${UNIVERSITY_COLORS[selectedTeam.university].secondary} 100%)`
                        }}
                      >
                        {getInitials(member.name)}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground text-lg">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                      {member.role === "Coach" && (
                        <div 
                          className="px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-md"
                          style={{
                            backgroundColor: UNIVERSITY_COLORS[selectedTeam.university].primary
                          }}
                        >
                          Coach
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="dialog-section pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Universidad:</span>
                  <span 
                    className="font-bold px-4 py-1 rounded-full text-white"
                    style={{
                      backgroundColor: UNIVERSITY_COLORS[selectedTeam.university].primary
                    }}
                  >
                    {selectedTeam.university}
                  </span>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
