"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import Image from "next/image";

type Props = {
  id: string;
  title: string;
  description: string;
  image: string;
};

type Packet = {
  id: number;
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  size: number;
};

const TRIANGLE_TESSELLATION_OPACITY = 0.2;
const PREDICTED_PATH_OPACITY = 0.7;
const GLOW = 0.75;

// Define nodes outside component to prevent recreation
const desktopNodes = [
  { x: 15, y: 20 },
  { x: 35, y: 15 },
  { x: 55, y: 25 },
  { x: 75, y: 20 },
  { x: 85, y: 40 },
  { x: 70, y: 55 },
  { x: 80, y: 75 },
  { x: 55, y: 70 },
  { x: 45, y: 85 },
  { x: 25, y: 75 },
  { x: 15, y: 55 },
  { x: 30, y: 45 },
];

const mobileNodes = [
  { x: 20, y: 25 },
  { x: 50, y: 15 },
  { x: 80, y: 30 },
  { x: 75, y: 60 },
  { x: 45, y: 75 },
  { x: 20, y: 65 },
];

export default function ModernStatsSection({
  id,
  title,
  description,
  image,
}: Props) {
  const containerRef = useRef<HTMLElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const packetRafRef = useRef<number>(0);
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const activeNodes = useMemo(
    () => (isMobile ? mobileNodes : desktopNodes),
    [isMobile],
  );

  // Detect mobile and get dimensions
  useEffect(() => {
    const updateDimensions = () => {
      setIsMobile(window.innerWidth < 768);
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const hero = containerRef.current;
      const gradient = gradientRef.current;
      if (!hero || !gradient) return;

      // Text fade-in animation
      if (!prefersReducedMotion) {
        const titleEl = hero.querySelector(".stats-title");
        const descEl = hero.querySelector(".stats-desc");

        if (titleEl) {
          gsap.from(titleEl, {
            opacity: 0,
            y: 40,
            duration: 1,
            ease: "power3.out",
          });
        }

        if (descEl) {
          gsap.from(descEl, {
            opacity: 0,
            y: 20,
            delay: 0.2,
            duration: 0.9,
            ease: "power2.out",
          });
        }
      }

      // Gradient subtle pulse
      gsap.to(gradient, {
        opacity: 0.35,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // Parallax effect
      if (!prefersReducedMotion) {
        const titleEl = hero.querySelector(".stats-title");
        const descEl = hero.querySelector(".stats-desc");

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

  // Data packet animation system
  const [packets, setPackets] = useState<Packet[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const packetCount = isMobile ? 6 : 10;

    // Initialize packets
    const initialPackets: Packet[] = Array.from(
      { length: packetCount },
      (_, i) => ({
        id: i,
        fromNode: Math.floor(Math.random() * activeNodes.length),
        toNode: Math.floor(Math.random() * activeNodes.length),
        progress: Math.random(),
        speed: 0.0003 + Math.random() * 0.0005,
        size: 4 + Math.random() * 3,
      }),
    );

    setPackets(initialPackets);

    // Animation loop
    const animatePackets = () => {
      setPackets((prevPackets) =>
        prevPackets.map((packet) => {
          let newProgress = packet.progress + packet.speed;
          let newFromNode = packet.fromNode;
          let newToNode = packet.toNode;

          // Reset packet when it reaches destination
          if (newProgress >= 1) {
            newProgress = 0;
            newFromNode = packet.toNode;
            // Pick a new destination (not the same as current)
            do {
              newToNode = Math.floor(Math.random() * activeNodes.length);
            } while (newToNode === newFromNode);
          }

          return {
            ...packet,
            fromNode: newFromNode,
            toNode: newToNode,
            progress: newProgress,
          };
        }),
      );

      packetRafRef.current = requestAnimationFrame(animatePackets);
    };

    packetRafRef.current = requestAnimationFrame(animatePackets);

    return () => {
      if (packetRafRef.current) {
        cancelAnimationFrame(packetRafRef.current);
      }
    };
  }, [isMobile]);

  // Calculate packet position with curved path (quadratic bezier)
  const getPacketPosition = (packet: Packet) => {
    const from = activeNodes[packet.fromNode];
    const to = activeNodes[packet.toNode];
    const t = packet.progress;

    // Control point for curve (perpendicular offset)
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const curveAmount = 0.2;
    const controlX = midX - dy * curveAmount;
    const controlY = midY + dx * curveAmount;

    // Quadratic bezier formula
    const x =
      Math.pow(1 - t, 2) * from.x +
      2 * (1 - t) * t * controlX +
      Math.pow(t, 2) * to.x;
    const y =
      Math.pow(1 - t, 2) * from.y +
      2 * (1 - t) * t * controlY +
      Math.pow(t, 2) * to.y;

    return { x, y, controlX, controlY };
  };

  // Generate SVG path for packet route
  const getPacketPath = (packet: Packet) => {
    const from = activeNodes[packet.fromNode];
    const to = activeNodes[packet.toNode];

    // Control point for curve
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const curveAmount = 0.2;
    const controlX = midX - dy * curveAmount;
    const controlY = midY + dx * curveAmount;

    // Convert percentages to actual coordinates
    const fromX = (from.x / 100) * dimensions.width;
    const fromY = (from.y / 100) * dimensions.height;
    const controlXPx = (controlX / 100) * dimensions.width;
    const controlYPx = (controlY / 100) * dimensions.height;
    const toX = (to.x / 100) * dimensions.width;
    const toY = (to.y / 100) * dimensions.height;

    return `M ${fromX} ${fromY} Q ${controlXPx} ${controlYPx} ${toX} ${toY}`;
  };

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

      {/* Overlay with purple tones */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#52357B]/80 via-[#5459AC]/30 to-[#52357B]/90 mix-blend-multiply" />

      {/* Animated gradient */}
      <div
        ref={gradientRef}
        className="absolute inset-0 z-20 pointer-events-none gradient-shimmer-modern"
        style={{
          opacity: 0.45,
          willChange: "opacity",
        }}
      />

      {/* Triangle tessellation pattern - stroke only - FIXED TO COVER FULL SCREEN */}
      <svg
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ opacity: TRIANGLE_TESSELLATION_OPACITY }}
        width="100%"
        height="100%"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="trianglePattern"
            x="0"
            y="0"
            width="120"
            height="104"
            patternUnits="userSpaceOnUse"
          >
            {/* Row 1 */}
            <polygon
              points="0,0 60,0 30,52"
              fill="none"
              stroke="#648DB3"
              strokeWidth="1.5"
              opacity="0.6"
            />
            <polygon
              points="60,0 90,52 30,52"
              fill="none"
              stroke="#5459AC"
              strokeWidth="1.5"
              opacity="0.4"
            />
            <polygon
              points="60,0 120,0 90,52"
              fill="none"
              stroke="#648DB3"
              strokeWidth="1.5"
              opacity="0.5"
            />
            {/* Row 2 */}
            <polygon
              points="0,52 30,52 0,104"
              fill="none"
              stroke="#5459AC"
              strokeWidth="1.5"
              opacity="0.5"
            />
            <polygon
              points="30,52 90,52 60,104"
              fill="none"
              stroke="#648DB3"
              strokeWidth="1.5"
              opacity="0.6"
            />
            <polygon
              points="90,52 120,104 60,104"
              fill="none"
              stroke="#5459AC"
              strokeWidth="1.5"
              opacity="0.4"
            />
            <polygon
              points="90,52 120,52 120,104"
              fill="none"
              stroke="#648DB3"
              strokeWidth="1.5"
              opacity="0.5"
            />
            {/* Connecting triangles */}
            <polygon
              points="0,52 30,52 0,104"
              fill="none"
              stroke="#648DB3"
              strokeWidth="1.5"
              opacity="0.3"
            />
            <polygon
              points="30,52 60,104 0,104"
              fill="none"
              stroke="#5459AC"
              strokeWidth="1.5"
              opacity="0.4"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#trianglePattern)" />
      </svg>

      {/* Network nodes (static) */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        {activeNodes.map((node, i) => (
          <div
            key={`node-${i}`}
            className="absolute rounded-full bg-[#648DB3] animate-node-pulse"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: "6px",
              height: "6px",
              boxShadow: "0 0 10px rgba(100, 141, 179, 0.8)",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>

      {/* Connection lines between nodes */}
      <svg
        className="absolute inset-0 z-14 pointer-events-none"
        style={{ opacity: 0.25 }}
      >
        {activeNodes.map((node1, i) =>
          activeNodes.slice(i + 1).map((node2, j) => {
            const dx = node2.x - node1.x;
            const dy = node2.y - node1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Only draw lines between close nodes
            if (distance < (isMobile ? 35 : 30)) {
              return (
                <line
                  key={`line-${i}-${j}`}
                  x1={`${node1.x}%`}
                  y1={`${node1.y}%`}
                  x2={`${node2.x}%`}
                  y2={`${node2.y}%`}
                  stroke="#648DB3"
                  strokeWidth="1"
                  opacity="0.5"
                />
              );
            }
            return null;
          }),
        )}
      </svg>

      {/* Predicted path glow for packets */}
      {dimensions.width > 0 && (
        <svg
          className="absolute inset-0 z-15 pointer-events-none"
          width={dimensions.width}
          height={dimensions.height}
        >
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                stopColor="#648DB3"
                stopOpacity={PREDICTED_PATH_OPACITY}
              />
              <stop
                offset="50%"
                stopColor="#648DB3"
                stopOpacity={PREDICTED_PATH_OPACITY}
              />
              <stop
                offset="100%"
                stopColor="#648DB3"
                stopOpacity={PREDICTED_PATH_OPACITY}
              />
            </linearGradient>
          </defs>
          {packets.map((packet) => (
            <path
              key={`path-${packet.id}`}
              d={getPacketPath(packet)}
              fill="none"
              stroke="url(#pathGradient)"
              strokeWidth={isMobile ? "2" : "1.5"}
              style={{
                filter: `blur(${GLOW}px)`,
                willChange: "opacity",
              }}
            />
          ))}
        </svg>
      )}

      {/* Data packets */}
      <div className="absolute inset-0 z-16 pointer-events-none">
        {packets.map((packet) => {
          const pos = getPacketPosition(packet);
          const opacity =
            packet.progress < 0.1
              ? packet.progress * 10
              : packet.progress > 0.9
                ? (1 - packet.progress) * 10
                : 1;

          return (
            <div
              key={packet.id}
              className="absolute rounded-full bg-[#648DB3]"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                width: `${packet.size}px`,
                height: `${packet.size}px`,
                boxShadow: `0 0 ${packet.size * 3}px rgba(100, 141, 179, 0.9)`,
                transform: "translate(-50%, -50%)",
                opacity: opacity,
                willChange: "transform, opacity",
              }}
            />
          );
        })}
      </div>

      {/* Text content */}
      <div className="relative z-30 max-w-4xl text-center stats-content">
        <h2 className="stats-title font-heading text-4xl md:text-[17.942rem] font-bold text-gray-100 leading-tight tracking-tight">
          {title}
        </h2>
        <p className="stats-desc mx-auto max-w-2xl text-base text-gray-300 md:text-xl font-semibold">
          {description}
        </p>
      </div>

      {/* CSS animations */}
      <style jsx global>{`
        /* Gradient shimmer with palette colors */
        @keyframes gradient-slide-modern {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        .gradient-shimmer-modern {
          background: linear-gradient(
            270deg,
            #5459ac,
            #648db3,
            #5459ac,
            #648db3
          );
          background-size: 200% 100%;
          animation: gradient-slide-modern 20s linear infinite;
        }

        /* Node pulse animation */
        @keyframes node-pulse {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-node-pulse {
          animation: node-pulse 3s ease-in-out infinite;
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .animate-node-pulse,
          .gradient-shimmer-modern {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
