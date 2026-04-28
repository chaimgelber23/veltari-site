"use client";

// ============================================================================
// <HeroWebsiteMockup />
//
// A hero-mockup that renders a FAKE BROWSER WINDOW with a stylized premium
// website inside it. All CSS — no image dependencies, perfectly crisp at any
// resolution, fast to load. The website inside the browser frame mimics the
// kind of work Pristine Site sells: clean nav, big headline, accent CTA,
// proof cards.
//
// Floating proof badges around the frame fade in on a stagger when the
// component mounts, reinforcing the value props (24h delivery, satisfaction
// guarantee, free hosting, no templates).
//
// On-brand for a web-design studio: the hero literally shows what they sell.
// ============================================================================

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type BadgePosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface ProofBadge {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  position: BadgePosition;
}

const BADGE_POS: Record<BadgePosition, string> = {
  "top-left": "absolute -left-4 sm:-left-8 top-12 hidden md:block rotate-[-3deg]",
  "top-right": "absolute -right-4 sm:-right-8 top-12 hidden md:block rotate-[3deg]",
  "bottom-left": "absolute -left-4 sm:-left-8 bottom-20 hidden md:block rotate-[3deg]",
  "bottom-right": "absolute -right-2 sm:-right-6 bottom-20 hidden md:block rotate-[2deg]",
};

const STAGGER_ORDER: BadgePosition[] = ["top-left", "top-right", "bottom-right", "bottom-left"];
function staggerDelay(p: BadgePosition): number {
  return 0.6 + STAGGER_ORDER.indexOf(p) * 0.18;
}

const BADGES: ProofBadge[] = [
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "24-hour delivery",
    subtitle: "Live by tomorrow",
    position: "top-left",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "100% guarantee",
    subtitle: "Or your money back",
    position: "top-right",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ),
    title: "5.0 stars",
    subtitle: "Every client, every project",
    position: "bottom-right",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Free hosting",
    subtitle: "Built on Vercel · No fees",
    position: "bottom-left",
  },
];

function FloatingBadge({ badge }: { badge: ProofBadge }) {
  return (
    <motion.div
      className={`${BADGE_POS[badge.position]} z-20 rounded-2xl border border-border bg-card px-3.5 py-2.5 shadow-[0_8px_28px_-8px_rgba(15,15,15,0.18)]`}
      initial={{ opacity: 0, y: 12, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: staggerDelay(badge.position), ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-2 text-[12px] text-muted">
        <span className="text-accent">{badge.icon}</span>
        <span className="font-medium text-primary">{badge.title}</span>
      </div>
      <div className="mt-0.5 text-[11px] text-muted">{badge.subtitle}</div>
    </motion.div>
  );
}

/* The website rendered INSIDE the browser frame.
   Pure CSS, no images. Mimics a premium service-business site —
   a chic dental practice as the example. Easily restylable per visit. */
function MockedWebsiteContent() {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 h-full p-3 sm:p-5 flex flex-col gap-3">
      {/* Mini nav */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/70">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-md bg-gradient-to-br from-rose-400 to-rose-600" />
          <div className="font-serif text-[11px] font-bold text-slate-900 tracking-tight">Bright Smile</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-7 rounded-full bg-slate-300" />
          <div className="h-1.5 w-5 rounded-full bg-slate-300" />
          <div className="h-1.5 w-6 rounded-full bg-slate-300" />
          <div className="h-4 w-12 rounded-md bg-rose-500" />
        </div>
      </div>

      {/* Mini hero */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-2">
        <div className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2 py-0.5 mb-2">
          <span className="text-[8px] font-semibold text-rose-700 tracking-wide uppercase">Now booking · Sat 1pm</span>
        </div>
        <div className="font-serif text-[15px] sm:text-lg font-semibold leading-tight text-slate-900">
          The <em className="text-rose-500 not-italic font-bold">smile</em> you've been hiding.
        </div>
        <div className="mt-1.5 text-[9px] text-slate-500 max-w-[180px] leading-snug">
          Same-day crowns. All insurance accepted. Open evenings &amp; weekends.
        </div>
        <div className="mt-2.5 flex items-center gap-1.5">
          <div className="h-5 px-2.5 rounded-full bg-slate-900 flex items-center text-[8px] font-semibold text-white">
            Book a visit
          </div>
          <div className="h-5 px-2.5 rounded-full border border-slate-300 flex items-center text-[8px] font-semibold text-slate-700">
            Meet Dr. Chen
          </div>
        </div>
      </div>

      {/* Mini stats row */}
      <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-slate-200/70">
        {[
          { v: "4.9★", l: "240 reviews" },
          { v: "12yr", l: "in practice" },
          { v: "Same", l: "day crowns" },
        ].map((s, i) => (
          <div key={i} className="text-center">
            <div className="font-serif text-[11px] font-bold text-slate-900">{s.v}</div>
            <div className="text-[7px] text-slate-500 uppercase tracking-wide">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroWebsiteMockup() {
  // Trigger badges only after first paint (avoids hydration mismatch and
  // ensures the stagger plays on initial view).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      {mounted && BADGES.map((b) => <FloatingBadge key={b.position} badge={b} />)}

      <motion.div
        className="relative rounded-2xl border border-border bg-card shadow-[0_30px_80px_-30px_rgba(15,15,15,0.45)]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="flex-1 mx-2 h-6 rounded-md bg-card-hover flex items-center justify-center px-3">
            <span className="text-[10px] text-muted font-mono truncate">brightsmiledental.com</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-muted">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </div>
        </div>

        {/* The mocked site */}
        <div className="aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-b-2xl">
          <MockedWebsiteContent />
        </div>
      </motion.div>
    </div>
  );
}
