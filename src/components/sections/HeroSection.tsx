"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

type Props = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export default function HeroSection({ id, title, description, image }: Props) {
  const containerRef = useRef<HTMLElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const isMobile = window.innerWidth < 768;

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
      // 🌈 Gradient shimmer and motion
      // =====================
      gsap.to(gradient, {
        backgroundPositionX: "200%",
        duration: 25,
        repeat: -1,
        ease: "linear",
      });

      gsap.to(gradient, {
        opacity: 0.25,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // =====================
      // 🌀 Parallax motion (desktop only)
      // =====================
      if (!prefersReducedMotion && !isMobile) {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = hero.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          // Move gradient subtly
          gsap.to(gradient, {
            x: x * 20,
            y: y * 20,
            duration: 0.5,
            ease: "power2.out",
          });

          // Move text slightly faster
          gsap.to(hero.querySelector(".hero-content"), {
            x: x * 40,
            y: y * 40,
            duration: 0.6,
            ease: "power2.out",
          });
        };

        hero.addEventListener("mousemove", handleMouseMove);
        return () => hero.removeEventListener("mousemove", handleMouseMove);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id={id}
      ref={containerRef}
      className="relative grid min-h-screen place-items-center overflow-hidden px-6 snap-start"
      style={{ "--x": "50%", "--y": "50%" } as React.CSSProperties}
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

      {/* Animated gradient */}
      <div
        ref={gradientRef}
        className="absolute inset-0 z-20 hidden pointer-events-none md:block"
        style={{
          background:
            "linear-gradient(270deg, #6366F1, #06B6D4, #6366F1, #06B6D4)",
          backgroundSize: "400% 400%",
          backgroundPosition: "0% 50%",
          opacity: 0.35,
          willChange: "transform, opacity, background-position",
        }}
      />

      {/* 🌟 Floating particles (optional) */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className="absolute w-3 h-3 bg-white/10 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
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

      {/* Floating animation CSS (via Tailwind plugin or global.css) */}
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
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
