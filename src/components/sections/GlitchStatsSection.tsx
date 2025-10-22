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

export default function GlitchStatsSection({
  id,
  title,
  description,
  image,
}: Props) {
  const containerRef = useRef<HTMLElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const rafRef = useRef<number>(0);
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const hero = containerRef.current;
      const gradient = gradientRef.current;
      if (!hero || !gradient) return;

      // Text reveal with glitch effect
      if (!prefersReducedMotion) {
        const titleEl = hero.querySelector(".glitch-title");
        const descEl = hero.querySelector(".glitch-desc");

        if (titleEl) {
          gsap.fromTo(
            titleEl,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
            },
          );
        }

        if (descEl) {
          gsap.from(descEl, {
            opacity: 0,
            y: 20,
            delay: 0.2,
            duration: 0.8,
            ease: "power2.out",
          });
        }
      }

      // Gradient pulse
      gsap.to(gradient, {
        opacity: 0.4,
        duration: 3.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // Standard parallax
      if (!prefersReducedMotion) {
        const titleEl = hero.querySelector(".glitch-title");
        const descEl = hero.querySelector(".glitch-desc");

        const handleMouseMove = (e: MouseEvent) => {
          const rect = hero.getBoundingClientRect();
          mousePos.current = {
            x: (e.clientX - rect.left) / rect.width - 0.5,
            y: (e.clientY - rect.top) / rect.height - 0.5,
          };
        };

        const animate = () => {
          currentPos.current.x +=
            (mousePos.current.x - currentPos.current.x) * 0.15;
          currentPos.current.y +=
            (mousePos.current.y - currentPos.current.y) * 0.15;

          if (titleEl) {
            (titleEl as HTMLElement).style.transform =
              `translate(${currentPos.current.x * 20}px, ${currentPos.current.y * 20}px)`;
          }

          if (descEl) {
            (descEl as HTMLElement).style.transform =
              `translate(${currentPos.current.x * 10}px, ${currentPos.current.y * 10}px)`;
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

  // Fragmented squares data
  const [squares, setSquares] = useState<
    {
      x: number;
      y: number;
      size: number;
      opacity: number;
      missing: boolean;
    }[]
  >([]);

  useEffect(() => {
    const squareSize = isMobile ? 20 : 55;
    const cols = Math.ceil(window.innerWidth / squareSize);
    const rows = Math.ceil(window.innerHeight / squareSize);
    const generated = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        generated.push({
          x: col * squareSize,
          y: row * squareSize,
          size: squareSize,
          opacity: 0.1 + Math.random() * 0.2,
          missing: Math.random() > 0.7, // 30% chance of missing
        });
      }
    }
    setSquares(generated);
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
      <div className="absolute inset-0 bg-gradient-to-b from-[#52357B]/85 via-[#3d2a5c]/50 to-[#2d1a4a]/95 mix-blend-multiply" />

      {/* Animated gradient */}
      <div
        ref={gradientRef}
        className="absolute inset-0 z-20 pointer-events-none gradient-glitch"
        style={{
          opacity: 0.5,
          willChange: "opacity",
        }}
      />

      {/* Fragmented squares pattern */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {squares.map((square, i) =>
          !square.missing ? (
            <div
              key={i}
              className="absolute border animate-square-glitch"
              style={{
                left: square.x,
                top: square.y,
                width: square.size,
                height: square.size,
                borderColor: `rgba(132, 89, 172, ${square.opacity})`,
                borderWidth: "1px",
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ) : null,
        )}
      </div>

      {/* Digital static overlay */}
      <div className="absolute inset-0 z-15 pointer-events-none digital-static" />

      {/* White flash pixels */}
      <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
        {[...Array(isMobile ? 15 : 25)].map((_, i) => (
          <div
            key={i}
            className="flash-pixel"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Text content with glitch effects */}
      <div className="relative z-30 max-w-4xl text-center glitch-content">
        <h2
          ref={titleRef}
          className={`glitch-title font-heading text-4xl md:text-[17.942rem] font-bold leading-tight tracking-tight text-gray-100`}
        >
          {title}
        </h2>
        <p className="glitch-desc mx-auto max-w-2xl text-base text-gray-300 md:text-xl font-semibold mt-4">
          {description}
        </p>
      </div>

      {/* CSS animations */}
      <style jsx global>{`
        /* Gradient with purple/magenta/cyan */
        @keyframes gradient-glitch {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        .gradient-glitch {
          background: linear-gradient(
            270deg,
            #52357b,
            #d946ef,
            #06b6d4,
            #52357b
          );
          background-size: 300% 100%;
          animation: gradient-glitch 15s linear infinite;
        }

        /* Fragmented squares glitch */
        @keyframes square-glitch {
          0%,
          90% {
            opacity: 1;
            transform: translate(0, 0);
          }
          91% {
            opacity: 0.3;
            transform: translate(2px, -2px);
          }
          93% {
            opacity: 1;
            transform: translate(-1px, 1px);
          }
          95% {
            opacity: 0.7;
            transform: translate(1px, 0);
          }
          100% {
            opacity: 1;
            transform: translate(0, 0);
          }
        }

        .animate-square-glitch {
          animation: square-glitch 4s ease-in-out infinite;
        }

        /* Digital static */
        @keyframes static {
          0%,
          100% {
            opacity: 0.03;
          }
          50% {
            opacity: 0.08;
          }
        }

        .digital-static {
          background-image: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(217, 70, 239, 0.03) 2px,
            rgba(217, 70, 239, 0.03) 4px
          );
          animation: static 0.3s linear infinite;
        }

        /* White flash pixels */
        @keyframes flash-pixel {
          0%,
          90% {
            opacity: 0;
            transform: scale(0);
          }
          92% {
            opacity: 1;
            transform: scale(1);
            box-shadow:
              0 0 10px rgba(255, 255, 255, 1),
              0 0 20px rgba(255, 255, 255, 0.8),
              2px 0 8px rgba(6, 182, 212, 0.6),
              -2px 0 8px rgba(239, 68, 68, 0.6);
          }
          94% {
            opacity: 0.7;
            transform: scale(1.7);
          }
          96% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          100% {
            opacity: 0;
            transform: scale(0);
            box-shadow: none;
          }
        }

        .flash-pixel {
          position: absolute;
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          animation: flash-pixel 3s ease-in-out infinite;
          will-change: opacity, transform;
        }

        /* VHS tracking lines */
        @keyframes tracking-sweep {
          0% {
            transform: translateY(-100vh);
          }
          100% {
            transform: translateY(100vh);
          }
        }

        .tracking-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 3px;
          background: rgba(217, 70, 239, 0.3);
          box-shadow: 0 0 10px rgba(217, 70, 239, 0.5);
          animation: tracking-sweep 6s linear infinite;
          will-change: transform;
        }

        /* Screen tear effect */
        .screen-tear {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: rgba(6, 182, 212, 0.8);
          box-shadow: 0 0 5px rgba(6, 182, 212, 1);
          animation: tear-glitch 0.2s ease-in-out;
        }

        @keyframes tear-glitch {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(10px);
          }
          75% {
            transform: translateX(-8px);
          }
        }

        /* Text glitch effect */
        .glitching {
          animation: text-glitch 0.2s ease-in-out;
        }

        @keyframes text-glitch {
          0% {
            transform: translate(0);
            text-shadow:
              3px 0 #06b6d4,
              -3px 0 #ef4444;
          }
          20% {
            transform: translate(-5px, 2px);
            text-shadow:
              8px 0 #06b6d4,
              -8px 0 #ef4444;
          }
          40% {
            transform: translate(3px, -3px);
            text-shadow:
              -5px 0 #06b6d4,
              5px 0 #ef4444;
          }
          60% {
            transform: translate(-2px, 1px);
            text-shadow:
              6px 0 #06b6d4,
              -6px 0 #ef4444;
          }
          80% {
            transform: translate(4px, -2px);
            text-shadow:
              -4px 0 #06b6d4,
              4px 0 #ef4444;
          }
          100% {
            transform: translate(0);
            text-shadow:
              3px 0 #06b6d4,
              -3px 0 #ef4444;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .animate-square-glitch,
          .flash-pixel,
          .digital-static,
          .gradient-glitch,
          .glitching {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
