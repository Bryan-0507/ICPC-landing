"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const SCAN_GRID_OPACITY = 0.17;

type Props = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export default function TerminalStatsSection({
  id,
  title,
  description,
  image,
}: Props) {
  const containerRef = useRef<HTMLElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Blinking cursor effect - slower
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 12200); // Slower, less distracting blink
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const hero = containerRef.current;
      const gradient = gradientRef.current;
      if (!hero || !gradient) return;

      // Text reveal with flicker effect
      if (!prefersReducedMotion) {
        const titleEl = hero.querySelector(".terminal-title");
        const descEl = hero.querySelector(".terminal-desc");

        if (titleEl) {
          gsap.fromTo(
            titleEl,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              onComplete: () => {
                // Add flicker after initial reveal
                gsap.to(titleEl, {
                  opacity: 0.7,
                  duration: 0.05,
                  yoyo: true,
                  repeat: 3,
                });
              },
            },
          );
        }

        if (descEl) {
          gsap.from(descEl, {
            opacity: 0,
            y: 15,
            delay: 0.4,
            duration: 0.7,
            ease: "power2.out",
          });
        }
      }

      // Gradient slow pulse
      gsap.to(gradient, {
        opacity: 0.25,
        duration: 5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // Reduced parallax (heavier feel)
      if (!prefersReducedMotion) {
        const titleEl = hero.querySelector(".terminal-title");
        const descEl = hero.querySelector(".terminal-desc");

        const handleMouseMove = (e: MouseEvent) => {
          const rect = hero.getBoundingClientRect();
          mousePos.current = {
            x: (e.clientX - rect.left) / rect.width - 0.5,
            y: (e.clientY - rect.top) / rect.height - 0.5,
          };
        };

        const animate = () => {
          // Slower lerp for heavier feel
          currentPos.current.x +=
            (mousePos.current.x - currentPos.current.x) * 0.08;
          currentPos.current.y +=
            (mousePos.current.y - currentPos.current.y) * 0.08;

          if (titleEl) {
            (titleEl as HTMLElement).style.transform =
              `translate(${currentPos.current.x * 12}px, ${currentPos.current.y * 12}px)`;
          }

          if (descEl) {
            (descEl as HTMLElement).style.transform =
              `translate(${currentPos.current.x * 6}px, ${currentPos.current.y * 6}px)`;
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

  // Scan grid characters - MORE on desktop
  const [scanChars, setScanChars] = useState<
    {
      char: string;
      left: string;
      top: string;
      delay: string;
    }[]
  >([]);

  useEffect(() => {
    const chars = [">", "_", "|", "-", "+", "=", "%"];
    const charCount = isMobile ? 25 : 50; // Increased from 20/35 to 25/50
    const generated = Array.from({ length: charCount }, () => ({
      char: chars[Math.floor(Math.random() * chars.length)],
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
    }));
    setScanChars(generated);
  }, [isMobile]);

  return (
    <section
      id={id}
      ref={containerRef}
      className="relative grid min-h-screen place-items-center overflow-hidden px-6 snap-start"
    >
      {/* Background image */}
      <Image
        alt={title || "Stats image"}
        src={image}
        fill
        quality={100}
        sizes="100vw"
        className="object-cover"
        priority
      />

      {/* Overlay with purple/magenta tones */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#52357B]/90 via-[#3d2a5c]/60 to-[#2d1a4a]/98 mix-blend-multiply" />

      {/* Animated gradient - purple/magenta/cyan */}
      <div
        ref={gradientRef}
        className="absolute inset-0 z-20 pointer-events-none gradient-terminal"
        style={{
          opacity: 0.5,
          willChange: "opacity",
        }}
      />

      {/* Scan grid pattern (horizontal and vertical lines) */}
      <div className="absolute inset-0 z-10 pointer-events-none scan-grid" />

      {/* ASCII-style floating characters - magenta/cyan themed */}
      <div className="absolute inset-0 z-12 overflow-hidden pointer-events-none">
        {scanChars.map((char, i) => (
          <span
            key={i}
            className="absolute font-mono text-[#d946ef] animate-char-flicker"
            style={{
              left: char.left,
              top: char.top,
              fontSize: isMobile ? "18px" : "22px",
              animationDelay: char.delay,
              textShadow:
                "0 0 12px rgba(217, 70, 239, 0.9), 0 0 24px rgba(6, 182, 212, 0.5)",
              fontWeight: "bold",
            }}
          >
            {char.char}
          </span>
        ))}
      </div>

      {/* Text content */}
      <div className="relative z-30 max-w-4xl text-center terminal-content">
        <div className="relative inline-block">
          <h2 className="terminal-title font-heading text-4xl md:text-[17.942rem] font-bold leading-tight tracking-tight text-gray-100">
            {title}
          </h2>
          {/* Blinking cursor - cyan accent */}
          {showCursor && (
            <span
              className="absolute"
              style={{
                right: "-0.5em",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#06b6d4",
                fontSize: "inherit",
                textShadow: "0 0 10px rgba(6, 182, 212, 0.8)",
              }}
            >
              _
            </span>
          )}
        </div>
        <p className="terminal-desc mx-auto max-w-2xl text-base md:text-xl font-semibold mt-4 text-gray-100">
          {description}
        </p>
      </div>

      {/* CSS animations */}
      <style jsx global>{`
        /* Terminal gradient - purple/magenta/cyan */
        @keyframes gradient-terminal {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        .gradient-terminal {
          background: linear-gradient(
            270deg,
            #52357b,
            #d946ef,
            #06b6d4,
            #52357b
          );
          background-size: 200% 100%;
          animation: gradient-terminal 30s linear infinite;
        }

        /* Scan grid pattern - magenta/cyan */
        .scan-grid {
          background-image:
            repeating-linear-gradient(
              0deg,
              rgba(217, 70, 239, ${SCAN_GRID_OPACITY}) 0px,
              transparent 1px,
              transparent 2px,
              rgba(217, 70, 239, ${SCAN_GRID_OPACITY}) 3px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(6, 182, 212, ${SCAN_GRID_OPACITY}) 0px,
              transparent 1px,
              transparent 2px,
              rgba(6, 182, 212, ${SCAN_GRID_OPACITY}) 3px
            );
        }

        /* Character flicker */
        @keyframes char-flicker {
          0%,
          100% {
            opacity: var(--char-opacity, 0.5);
          }
          50% {
            opacity: calc(var(--char-opacity, 0.5) * 1.8);
          }
        }

        .animate-char-flicker {
          animation: char-flicker 4s ease-in-out infinite;
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .animate-char-flicker,
          .screen-flicker,
          .gradient-terminal {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
