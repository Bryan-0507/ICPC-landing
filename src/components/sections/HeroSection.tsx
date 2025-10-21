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

export default function HeroSection({ id, title, description, image }: Props) {
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
      // 🌀 Multi-layer parallax (title + description)
      // =====================
      if (!prefersReducedMotion) {
        const titleEl = hero.querySelector(".hero-title");
        const descEl = hero.querySelector(".hero-desc");

        const handleMouseMove = (e: MouseEvent) => {
          const rect = hero.getBoundingClientRect();
          mousePos.current = {
            x: (e.clientX - rect.left) / rect.width - 0.5,
            y: (e.clientY - rect.top) / rect.height - 0.5,
          };
        };

        // Smooth animation loop with lerp
        const animate = () => {
          // Lerp for smooth easing (0.21 = balanced responsiveness)
          currentPos.current.x +=
            (mousePos.current.x - currentPos.current.x) * 0.21;
          currentPos.current.y +=
            (mousePos.current.y - currentPos.current.y) * 0.21;

          // Apply layered transforms for depth
          if (titleEl) {
            (titleEl as HTMLElement).style.transform =
              `translate(${currentPos.current.x * 30}px, ${currentPos.current.y * 30}px)`;
          }

          if (descEl) {
            (descEl as HTMLElement).style.transform =
              `translate(${currentPos.current.x * 15}px, ${currentPos.current.y * 15}px)`;
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

  // =====================
  // 💾 Binary rain particles
  // =====================
  const [binaryChars, setBinaryChars] = useState<
    {
      char: string;
      left: string;
      fontSize: string;
      opacity: number;
      delay: string;
      duration: string;
    }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 27 }, () => {
      const char = Math.random() > 0.5 ? "1" : "0";
      const fontSize = 16 + Math.random() * 4;
      const opacity = 0.85 + Math.random() * 0.15;
      return {
        char,
        left: `${Math.random() * 100}%`,
        fontSize: `${fontSize}px`,
        opacity,
        delay: `${Math.random() * 8}s`,
        duration: `${8 + Math.random() * 6}s`, // 8-14s fall time
      };
    });
    setBinaryChars(generated);
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

      {/* Animated gradient */}
      <div
        ref={gradientRef}
        className="absolute inset-0 z-20 pointer-events-none gradient-shimmer"
        style={{
          opacity: 0.55,
          willChange: "opacity",
        }}
      />

      {/* 💾 Binary code rain */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {binaryChars.map((char, i) => (
          <span
            key={i}
            className="absolute font-mono text-cyan-400 animate-binary-fall"
            style={{
              left: char.left,
              top: "-50px",
              fontSize: char.fontSize,
              opacity: char.opacity,
              animationDelay: char.delay,
              animationDuration: char.duration,
            }}
          >
            {char.char}
          </span>
        ))}
      </div>

      {/* 📺 Terminal scanline effect */}
      <div className="absolute inset-0 z-30 overflow-hidden pointer-events-none">
        <div className="scanline" />
      </div>

      {/* Text content */}
      <div className="relative z-30 max-w-4xl text-center hero-content">
        <h2 className="hero-title font-heading text-4xl md:text-[17.942rem] font-bold text-gray-100 leading-tight tracking-tight">
          {title}
        </h2>
        <p className="hero-desc mx-auto max-w-2xl text-base text-gray-300 md:text-xl font-semibold">
          {description}
        </p>
      </div>

      {/* CSS animations */}
      <style jsx global>{`
        /* Gradient shimmer */
        @keyframes gradient-slide {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
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

        /* Binary rain fall */
        @keyframes binary-fall {
          0% {
            transform: translateY(-50px);
            opacity: 0;
          }
          10% {
            opacity: var(--char-opacity, 0.5);
          }
          90% {
            opacity: var(--char-opacity, 0.5);
          }
          100% {
            transform: translateY(calc(100vh + 50px));
            opacity: 0;
          }
        }

        .animate-binary-fall {
          animation: binary-fall 10s linear infinite;
          text-shadow: 0 0 8px rgba(6, 182, 212, 0.5);
          will-change: transform;
        }

        /* Terminal scanline - VERTICAL (right to left) */
        @keyframes scanline-sweep {
          0% {
            transform: translateX(100vw);
            opacity: 0;
          }
          5% {
            opacity: 0.7;
          }
          95% {
            opacity: 0.7;
          }
          100% {
            transform: translateX(calc(-100vw - 2px));
            opacity: 0;
          }
        }

        .scanline {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 12px;
          background: linear-gradient(
            to right,
            transparent,
            rgba(6, 182, 212, 0.8),
            transparent
          );
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.6);
          animation: scanline-sweep 12s ease-in-out infinite;
          animation-delay: 2s;
          will-change: transform;
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .animate-binary-fall,
          .scanline,
          .gradient-shimmer {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
