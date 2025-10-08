"use client";

import { useEffect, useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type ConvergeImage = {
  src: StaticImageData | string;
  alt?: string;
};

type Props = {
  id?: string;
  className?: string;
  title?: string;
  kicker?: string;
  images: ConvergeImage[];
};

export default function QuestionConvergeSection({
  id,
  className,
  title,
  kicker,
  images,
}: Props) {
  /**
   * How long the pinned scroll should be (in viewport heights).
   */
  const scrollVh = 4

  /**
   * Initial and final scale for the text block.
   */
  const initialScale = 1.8
  const finalScale = 0.7

  /**
   * Random spread radius for where cards start (in px). Default: 480
   */
  const startSpreadPx = 480

  const rootRef = useRef<HTMLDivElement | null>(null);
  const textWrapRef = useRef<HTMLDivElement | null>(null);
  const qRef = useRef<HTMLHeadingElement | null>(null);
  const cardsWrapRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const resolvedTitle = title;
  const resolvedKicker = kicker;

  // Ensure we don't overflow the ref array on re-renders
  cardRefs.current = [];

  const setCardRef = (el: HTMLDivElement | null) => {
    if (el && !cardRefs.current.includes(el)) cardRefs.current.push(el);
  };

  useEffect(() => {
    if (!rootRef.current) return;

    // GSAP setup (client only)
    gsap.registerPlugin(ScrollTrigger);

    // use context to scope selectors & cleanup properly on Fast Refresh
    const ctx = gsap.context(() => {
      const root = rootRef.current!;
      const textWrap = textWrapRef.current!;
      const cards = cardRefs.current;
      const cardsWrap = cardsWrapRef.current!;

      // helper: measure rect ignoring current GSAP scale
      const measureUnscaled = (el: HTMLElement) => {
        const r = el.getBoundingClientRect();
        const sx = (gsap.getProperty(el, "scaleX") as number) || 1;
        const sy = (gsap.getProperty(el, "scaleY") as number) || 1;
        return { width: r.width / sx, height: r.height / sy };
      };

      // helper: measure rect ignoring current GSAP scale
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let baseTextRect = measureUnscaled(textWrap);

      // Responsive breakpoints
      const isSM = window.matchMedia("(max-width: 640px)").matches;
      const isMD = !isSM && window.matchMedia("(max-width: 1024px)").matches;
      const isXL = window.matchMedia("(min-width: 1280px)").matches;
      const is2XL = window.matchMedia("(min-width: 1536px)").matches;

      // Desired scales by breakpoint
      const effFinalScale = isSM ? Math.max(finalScale, 0.85) : isMD ? Math.min(finalScale, 0.75) : finalScale;
      const effScrollVh = isSM ? Math.min(scrollVh, 3.0) : isMD ? Math.min(scrollVh, 3.5) : scrollVh;

      const getVW = () => (window.visualViewport?.width ?? window.innerWidth ?? root.clientWidth);
      const getVH = () => (window.visualViewport?.height ?? window.innerHeight ?? root.clientHeight);

      const updateCardsWrapSize = () => {
        const vw = getVW();
        const vh = getVH();
        const vv = window.visualViewport;
        const left = vv?.offsetLeft ?? 0;
        const top = vv?.offsetTop ?? 0;
        gsap.set(cardsWrap, { position: "fixed", left, top, width: vw, height: vh });
      };
      let detachVV: null | (() => void) = null;

      const getRingRadius = () => {
        const base = Math.min(getVW(), getVH());
        return base * (isSM ? 0.12 : isMD ? 0.15 : is2XL ? 0.22 : isXL ? 0.20 : 0.16);
      };

      // Angles are stable across calls
      const angles = cards.map((_, i) => (i / Math.max(1, cards.length)) * Math.PI * 2);

      // Compute Y offset so the average of clamped Y targets sits at 0 (true vertical center)
      const computeYCenterOffset = (rr: number) => {
        const vh = getVH();
        const margin = isSM ? 10 : isMD ? 14 : 12;
        let sum = 0;
        for (let i = 0; i < cards.length; i++) {
          const el = cards[i];
          const halfH = Math.min(el.offsetHeight / 2, vh / 2 - margin - 1);
          const minY = -vh / 2 + halfH + margin;
          const maxY =  vh / 2 - halfH - margin;
          const raw = Math.sin(angles[i]) * rr;
          const clamped = Math.max(minY, Math.min(maxY, raw));
          sum += clamped;
        }
        const avg = sum / Math.max(cards.length, 1);
        return -avg; // negate to re-center around 0
      };

      // Compute X offset so the average of clamped X targets sits at 0 (true horizontal center)
      const computeXCenterOffset = (rr: number) => {
        const vw = getVW();
        const margin = isSM ? 10 : isMD ? 14 : 12;
        let sum = 0;
        for (let i = 0; i < cards.length; i++) {
          const el = cards[i];
          const halfW = Math.min(el.offsetWidth / 2, vw / 2 - margin - 1);
          const minX = -vw / 2 + halfW + margin;
          const maxX =  vw / 2 - halfW - margin;
          const raw = Math.cos(angles[i]) * rr;
          const clamped = Math.max(minX, Math.min(maxX, raw));
          sum += clamped;
        }
        const avg = sum / Math.max(cards.length, 1);
        return -avg;
      };

      // Place cards just outside the viewport edges so they fly inward toward the viewport center.
      const placeCardsAtEdges = () => {
        const w = getVW();
        const h = getVH();

        // Distribute Y uniformly by index (same every time)
        const bandTop = -h / 2 + 80;
        const bandBottom = h / 2 - 80;
        const mapIdx = gsap.utils.mapRange(0, Math.max(1, cards.length - 1), bandTop, bandBottom);

        cards.forEach((card, i) => {
          const fromRight = i % 2 === 1;
          const cardW = card.offsetWidth || 300;
          const half = cardW / 2;

          // tiny deterministic “jitter” by index (optional)
          const j = ((i * 73) % 100) / 100 - 0.5; // -0.5..0.5
          const jitterX = j * Math.min(startSpreadPx, 480) * 0.06;
          const jitterY = j * 12;

          const xEdge = fromRight ? w / 2 + half + 12 : -(w / 2 + half + 12);
          const x = xEdge + jitterX;
          const y = mapIdx(i) + jitterY;

          gsap.set(card, {
            x,
            y,
            rotate: j * 18, // -9..+9 deg
            opacity: 0,
            scale: 0.9,
            transformOrigin: "50% 50%",
            filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.12))",
            willChange: "transform, opacity, filter",
          });
          card.style.zIndex = String(cards.length - i);
        });
      };

      // Initial placement before the timeline runs
      placeCardsAtEdges();

      const scrollLenPx = () => Math.max(window.innerHeight * effScrollVh, 600);

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => "+=" + scrollLenPx(),
          scrub: true,
          pin: true,
          anticipatePin: 1,
          pinSpacing: true,
          invalidateOnRefresh: true,
          onRefreshInit: () => {
            // keep footprint math accurate after resizes/refreshes even if wrapper is scaled
            baseTextRect = measureUnscaled(textWrap);
          },
          onRefresh: () => {
            baseTextRect = measureUnscaled(textWrap);
            updateCardsWrapSize();
            placeCardsAtEdges();
          },
          onEnter: () => {
            updateCardsWrapSize();
          
            if (!detachVV && window.visualViewport) {
              const vv = window.visualViewport;
              const handler = () => updateCardsWrapSize();
              vv.addEventListener("resize", handler);
              vv.addEventListener("scroll", handler);
              detachVV = () => {
                vv.removeEventListener("resize", handler);
                vv.removeEventListener("scroll", handler);
              };
            }
          },
          onEnterBack: () => {
            updateCardsWrapSize();
            if (!detachVV && window.visualViewport) {
              const vv = window.visualViewport;
              const handler = () => updateCardsWrapSize();
              vv.addEventListener("resize", handler);
              vv.addEventListener("scroll", handler);
              detachVV = () => {
                vv.removeEventListener("resize", handler);
                vv.removeEventListener("scroll", handler);
              };
            }
          },
          onLeave: () => {
            if (detachVV) { detachVV(); detachVV = null; }
            gsap.set(cardsWrap, { clearProps: "position,width,height,left,top" });
          },
          onLeaveBack: () => {
            if (detachVV) { detachVV(); detachVV = null; }
            gsap.set(cardsWrap, { clearProps: "position,width,height,left,top" });
          },
          onKill: () => {
            if (detachVV) { detachVV(); detachVV = null; }
            gsap.set(cardsWrap, { clearProps: "position,width,height,left,top" });
          },
        },
      });

      // Phase 1: shrink text smoothly
      tl.to(textWrap, { scale: effFinalScale, duration: 0.5 }, 0);

      // Phase 2: bring cards to the center area
      tl.to(
        cards,
        {
          x: (i: number, el: HTMLElement) => {
            const rr = getRingRadius();
            const offsetX = computeXCenterOffset(rr);
            const angle = (i / Math.max(1, cards.length)) * Math.PI * 2;
            const raw = Math.cos(angle) * rr + offsetX;
            const vw = getVW();
            const margin = isSM ? 10 : isMD ? 14 : 12;
            const halfW = Math.min(el.offsetWidth / 2, vw / 2 - margin - 1);
            const minX = -vw / 2 + halfW + margin;
            const maxX =  vw / 2 - halfW - margin;
            return Math.max(minX, Math.min(maxX, raw));
          },
          y: (i: number, el: HTMLElement) => {
            const rr = getRingRadius();
            const offsetY = computeYCenterOffset(rr);
            const angle = (i / Math.max(1, cards.length)) * Math.PI * 2;
            const raw = Math.sin(angle) * rr + offsetY;
            const vh = getVH();
            const margin = isSM ? 10 : isMD ? 14 : 12;
            const halfH = Math.min(el.offsetHeight / 2, vh / 2 - margin - 1);
            const minY = -vh / 2 + halfH + margin;
            const maxY =  vh / 2 - halfH - margin;
            return Math.max(minY, Math.min(maxY, raw));
          },
          rotate: 0,
          opacity: 1,
          scale: 1,
          filter: "drop-shadow(0 18px 40px rgba(0,0,0,0.28))",
          ease: "power2.out",
          duration: 1,
          stagger: 0, // all together
        },
        0
      );

      // subtle float after converging
      tl.to(
        cards,
        {
          x: (i: number) => (i % 2 === 0 ? "+=6" : "-=6"),
          y: (i: number) => (i % 2 === 0 ? "-=6" : "+=6"),
          rotate: (i: number) => (i % 2 === 0 ? -2 : 2),
          duration: 0.4,
          ease: "sine.inOut",
        },
        ">-0.05"
      );


      tl.to(
        cards,
        {
          filter: "drop-shadow(0 12px 28px rgba(0,0,0,0.20))",
          duration: 0.35,
          ease: "sine.out",
        },
        ">" // after float
      );

      // Center squeeze to close any remaining gap
      const centerBias = isSM ? 0.82 : isMD ? 0.84 : is2XL ? 0.90 : isXL ? 0.88 : 0.86;
      tl.to(
        cards,
        {
          x: (_: number, el: HTMLElement) => (gsap.getProperty(el, "x") as number) * centerBias,
          y: (_: number, el: HTMLElement) => (gsap.getProperty(el, "y") as number) * centerBias,
          duration: 0.10,
          ease: "power2.in",
        },
        ">-0.05"
      );

      const toward0 = (v: number, px: number) => (v > 0 ? Math.max(0, v - px) : Math.min(0, v + px));
      const nudgeX = isSM ? 4 : isMD ? 6 : 8;
      const nudgeY = isSM ? 3 : isMD ? 4 : 6;

      tl.to(
        cards,
        {
          x: (_: number, el: HTMLElement) => toward0(gsap.getProperty(el, "x") as number, nudgeX),
          y: (_: number, el: HTMLElement) => toward0(gsap.getProperty(el, "y") as number, nudgeY),
          duration: 0.18,
          ease: "power1.out",
          stagger: 0,
        },
        ">-0.02"
      );

      // Cleanup on unmount
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        ScrollTrigger.refresh();
      };
    }, rootRef);

    return () => ctx.revert();
  }, [initialScale, finalScale, scrollVh, startSpreadPx]);

  return (
    <section
      id={id}
      ref={rootRef}
      className={`relative isolate flex items-center justify-center min-h-[100svh] w-full max-w-full overflow-x-hidden bg-background bg-grid-pattern overflow-hidden contain-layout contain-paint ${className ?? ""}`}
    >
      {/* Centered content wrapper (scaled by GSAP) */}
      <div
        ref={textWrapRef}
        className="relative z-20 text-center w-full px-4 sm:px-6 md:px-10 mx-auto
                   max-w-[min(92vw,40ch)] sm:max-w-[min(88vw,48ch)] md:max-w-[min(86vw,60ch)]
                   lg:max-w-[min(82vw,72ch)] xl:max-w-[min(78vw,84ch)] 2xl:max-w-[min(74vw,96ch)]"
      >
        {/* Kicker */}
        <span
          className="hidden sm:inline-block mb-3 font-extrabold tracking-widest uppercase text-md
                    sm:text-base md:text-xl lg:text-2xl
                    px-5.5 py-2 rounded-full bg-primary/10 text-primary"
        >
          {resolvedKicker}
        </span>

        {/* Title 1 */}
        <h1
          ref={qRef}
          className="font-nuno break-words hyphens-none text-wrap
                     leading-tight md:leading-tight lg:leading-[1.05]
                     font-extrabold tracking-tight select-none text-blue-950
                     text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl"
        >
          {resolvedTitle}
        </h1>
      </div>

      {/* Card images (absolute, converging toward center) */}
      <div ref={cardsWrapRef} aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center z-30 overflow-x-hidden">
        {images.map((img, i) => (
          <div
            key={i}
            ref={setCardRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                       rounded-2xl shadow-xl overflow-hidden ring-1 ring-black/5 aspect-[6/5]
                       w-[55%] sm:w-64 md:w-[38%] lg:w-[28%] xl:w-[24%] 2xl:w-[22%]
                       min-w-[120px] max-w-[420px] 2xl:max-w-[480px]"
          >
            <Image
              src={img.src}
              alt={img.alt ?? ""}
              fill
              sizes="(max-width: 640px) 59vw, (max-width: 1024px) 42vw, (max-width: 1280px) 32vw, (max-width: 1536px) 28vw, 24vw"
              quality={95}
              placeholder="empty"
              priority={i < 3}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Faint vignette for focus */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-background/20 via-transparent to-background/20" />
    </section>
  );
}
