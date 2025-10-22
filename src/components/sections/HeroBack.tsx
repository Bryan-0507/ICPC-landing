"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

type Props = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export default function HeroBack({ id, title, description, image }: Props) {
  const containerRef = useRef<HTMLElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const hero = containerRef.current;
      const gradient = gradientRef.current;
      if (!hero || !gradient) return;

      // =====================
      // 🎬 Text reveal animation
      // =====================
      if (!prefersReducedMotion) {
        const titleEl = hero.querySelector(".hero-title");
        const descEl = hero.querySelector(".hero-desc");

        if (titleEl) {
          gsap.from(titleEl, {
            opacity: 0,
            y: 60,
            duration: 1.2,
            ease: "power3.out",
          });
        }

        if (descEl) {
          gsap.from(descEl, {
            opacity: 0,
            y: 25,
            delay: 0.3,
            duration: 1,
            ease: "power2.out",
          });
        }
      }

      // =====================
      // 🌈 Gradient opacity pulse (GSAP)
      // =====================
      gsap.to(gradient, {
        opacity: 0.25,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // =====================
      // 🌀 Smooth parallax on title only
      // =====================
      if (!prefersReducedMotion) {
        const titleEl = hero.querySelector(".hero-title");

        const handleMouseMove = (e: MouseEvent) => {
          const rect = hero.getBoundingClientRect();
          mousePos.current = {
            x: (e.clientX - rect.left) / rect.width - 0.5,
            y: (e.clientY - rect.top) / rect.height - 0.5,
          };
        };

        // Smooth animation loop with lerp (linear interpolation)
        const animate = () => {
          // Lerp for smooth easing (0.1 = smoothness factor)
          currentPos.current.x +=
            (mousePos.current.x - currentPos.current.x) * 0.21;
          currentPos.current.y +=
            (mousePos.current.y - currentPos.current.y) * 0.21;

          // Apply transform only to title
          if (titleEl) {
            (titleEl as HTMLElement).style.transform =
              `translate(${currentPos.current.x * 30}px, ${currentPos.current.y * 30}px)`;
          }

          rafRef.current = requestAnimationFrame(animate);
        };

        hero.addEventListener("mousemove", handleMouseMove);
        rafRef.current = requestAnimationFrame(animate);

        return () => {
          hero.removeEventListener("mousemove", handleMouseMove);
          if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
          }
        };
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const [particles, setParticles] = useState<
    {
      top: string;
      left: string;
      width: string;
      height: string;
      background: string;
      boxShadow: string;
      delay: string;
      duration: string;
    }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 17 }, () => {
      const size = 10 + Math.random() * 8;
      const opacity = 0.45 + Math.random() * 0.3;
      return {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        background: `rgba(255, 255, 255, ${opacity})`,
        boxShadow: `0 0 ${4 + Math.random() * 8}px rgba(255, 255, 255, 0.3)`,
        delay: `${Math.random() * 5}s`,
        duration: `${12 + Math.random() * 8}s`,
      };
    });
    setParticles(generated);
  }, []);

  return (
    <section
      id={id}
      ref={containerRef}
      className="relative grid min-h-screen place-items-center overflow-hidden px-6 snap-start"
    >
      {/* Background image */}
      <Image
        alt={title || "Hero image"}
        src={image}
        fill
        quality={100}
        sizes="100vw"
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/90 mix-blend-multiply" />

      {/* Animated gradient - NOW OPTIMIZED */}
      <div
        ref={gradientRef}
        className="absolute inset-0 z-20 pointer-events-none gradient-shimmer"
        style={{
          opacity: 0.55,
          willChange: "transform, opacity",
        }}
      />

      {/* 🌟 Floating particles */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              top: p.top,
              left: p.left,
              width: p.width,
              height: p.height,
              background: p.background,
              boxShadow: p.boxShadow,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* Text content */}
      <div className="relative z-30 max-w-4xl text-center hero-content">
        <h2 className="hero-title font-heading text-4xl md:text-8xl font-bold text-gray-100 leading-tight tracking-tight">
          {title}
        </h2>
        <p className="hero-desc mx-auto mt-6 max-w-2xl text-base text-gray-300 md:text-lg">
          {description}
        </p>
      </div>

      {/* CSS animations */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-20px);
            opacity: 0.8;
          }
        }

        @keyframes gradient-slide {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .gradient-shimmer {
          background: linear-gradient(
            270deg,
            #6366f1,
            #06b6d4,
            #6366f1,
            #06b6d4
          );
          background-size: 200% 100%;
          animation: gradient-slide 25s linear infinite;
        }
      `}</style>
    </section>
  );
}
