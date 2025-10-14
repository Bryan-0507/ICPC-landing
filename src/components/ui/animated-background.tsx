"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fade in canvas
    gsap.fromTo(
      canvas,
      { opacity: 0 },
      { opacity: 0.3, duration: 2, ease: "power2.out" }
    );

    // Set canvas size
    const setCanvasSize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      baseSize: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      baseOpacity: number;
      canvasWidth: number;
      canvasHeight: number;
      angle: number;
      angleSpeed: number;

      constructor(width: number, height: number) {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.x = Math.random() * this.canvasWidth;
        this.y = Math.random() * this.canvasHeight;
        this.baseSize = Math.random() * 4 + 2;
        this.size = this.baseSize;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        
        const colors = ["#5459ab", "#52357b", "#648db3"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.baseOpacity = Math.random() * 0.6 + 0.2;
        this.opacity = this.baseOpacity;
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = Math.random() * 0.02 - 0.01;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.angleSpeed;

        // Pulse effect
        this.size = this.baseSize + Math.sin(this.angle) * 1.5;
        this.opacity = this.baseOpacity + Math.sin(this.angle * 2) * 0.2;

        if (this.x < 0 || this.x > this.canvasWidth) this.speedX *= -1;
        if (this.y < 0 || this.y > this.canvasHeight) this.speedY *= -1;
      }

      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.globalAlpha = this.opacity;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
        
        // Glow effect
        context.shadowBlur = 10;
        context.shadowColor = this.color;
      }
    }

    // Create particles
    const particles: Particle[] = [];
    const particleCount = 60;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    // Connect nearby particles
    function connectParticles() {
      if (!ctx || !canvas) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = particles[i].color;
            ctx.globalAlpha = (1 - distance / 150) * 0.2;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    // Animation loop
    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.shadowBlur = 0;
      
      particles.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });

      connectParticles();

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0 }}
    />
  );
}
