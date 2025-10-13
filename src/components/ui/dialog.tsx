"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  const backdropRef = React.useRef<HTMLDivElement>(null);
  const contentWrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";

      // Animate backdrop
      if (backdropRef.current) {
        gsap.fromTo(
          backdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" }
        );
      }
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  const handleBackdropClick = () => {
    if (backdropRef.current) {
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => onOpenChange(false),
      });
    } else {
      onOpenChange(false);
    }
  };

  return (
    <div ref={contentWrapperRef} className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleBackdropClick}
      />
      {children}
    </div>
  );
};

const DialogContent = ({ children, className }: DialogContentProps) => {
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          scale: 0.8,
          y: 50,
          rotateX: -15,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotateX: 0,
          duration: 0.4,
          ease: "back.out(1.7)",
        }
      );

      // Animate children elements
      const sections = contentRef.current.querySelectorAll('.dialog-section');
      if (sections.length > 0) {
        gsap.fromTo(
          sections,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            delay: 0.2,
            ease: "power2.out",
          }
        );
      }
    }
  }, []);

  return (
    <div
      ref={contentRef}
      className={cn(
        "relative z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto",
        "bg-card rounded-lg shadow-2xl",
        className
      )}
    >
      {children}
    </div>
  );
};

const DialogHeader = ({ 
  children, 
  className,
  style 
}: { 
  children: React.ReactNode; 
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <div className={cn("flex flex-col space-y-1.5 p-6 pb-4", className)} style={style}>
      {children}
    </div>
  );
};

const DialogTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <h2 className={cn("text-2xl font-heading font-semibold tracking-tight", className)}>
      {children}
    </h2>
  );
};

const DialogDescription = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  );
};

const DialogClose = ({ onClose }: { onClose: () => void }) => {
  return (
    <button
      onClick={onClose}
      className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
    >
      <X className="h-5 w-5" />
      <span className="sr-only">Close</span>
    </button>
  );
};

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose };
