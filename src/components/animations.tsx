"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useScroll,
  useSpring,
} from "framer-motion";

/*  Entry animations (FadeIn, StaggerChildren, StaggerItem, TextReveal,
    RevealOnScroll, CountUp) used to gate visibility on `useInView` with
    `initial={{ opacity: 0 }}`. On a tall multi-section page, the
    IntersectionObserver fires unreliably for sections far below the fold,
    leaving 20-50 elements permanently at opacity:0 — a real customer-facing
    render bug, not just a screenshot artifact.

    They are now visibility-passthrough wrappers. Hover effects (MagneticButton)
    and decorative parallax (ParallaxLayer) still run because they aren't
    entry-gated. */

interface PassthroughProps {
  children: ReactNode;
  className?: string;
}

export function FadeIn({
  children,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function StaggerChildren({
  children,
  className,
}: {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function StaggerItem({ children, className }: PassthroughProps) {
  return <div className={className}>{children}</div>;
}

export function TextReveal({
  text,
  className,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return <span className={className}>{text}</span>;
}

export function CountUp({
  to,
  suffix = "",
  prefix = "",
  className,
}: {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  return (
    <span className={className}>
      {prefix}
      {to}
      {suffix}
    </span>
  );
}

export function RevealOnScroll({
  children,
  className,
  width = "100%",
}: {
  children: ReactNode;
  className?: string;
  width?: "fit-content" | "100%";
}) {
  return (
    <div style={{ width }} className={className}>
      {children}
    </div>
  );
}

/* ─────────────── ParallaxLayer ─────────────── */
interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxLayer({
  children,
  speed = 0.5,
  className,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 120]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30, mass: 1 });

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─────────────── MagneticButton ─────────────── */
interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 200, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 200, damping: 20 });

  function handleMouse(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ x: smoothX, y: smoothY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
