"use client";

// ============================================================================
// <HeroWebsiteMockup /> + <MockedWebsiteContent />
//
// The hero shows a fake browser window wrapping a CSS-only stylized website
// preview. The inner preview auto-cycles through 4 industry variants
// (dental, salon, restaurant, real estate) on a 5s cross-fade so visitors
// see multiple styles we can build, not just one.
//
// MockedWebsiteContent is exported so the Portfolio section can render the
// same 4 variants as static "style example" cards (replacing what used to
// be fake-named project screenshots — see feedback_no_fake_social_proof_own_sites).
//
// All CSS, no images: perfectly crisp at any resolution, fast first paint,
// honest about what they are (stylistic mockups, not specific real clients).
// ============================================================================

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    title: "Money-back guarantee",
    subtitle: "Don't love it · full refund",
    position: "top-right",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    title: "Free hosting",
    subtitle: "Forever · No fees",
    position: "bottom-right",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "You own everything",
    subtitle: "Code · design · hosting",
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

// ============================================================================
// MockedWebsiteContent — 4 industry style variants, all pure CSS
// ============================================================================

export type SiteVariant = "dental" | "salon" | "restaurant" | "realestate";

const VARIANT_LABELS: Record<SiteVariant, string> = {
  dental: "Dental practice",
  salon: "Salon & spa",
  restaurant: "Restaurant",
  realestate: "Real estate",
};

const VARIANT_DOMAINS: Record<SiteVariant, string> = {
  dental: "brightsmiledental.com",
  salon: "lunabalayage.com",
  restaurant: "thecornertable.com",
  realestate: "harborviewproperties.com",
};

interface VariantTheme {
  bg: string; // gradient classes
  brandName: string;
  accentClass: string; // e.g. text-rose-500
  accentBg: string;   // e.g. bg-rose-500
  accentSoftBg: string; // e.g. bg-rose-100
  accentSoftText: string; // e.g. text-rose-700
  badgeText: string;
  pillText: string;
  headline: React.ReactNode;
  subhead: string;
  primaryCta: string;
  secondaryCta: string;
  stats: { v: string; l: string }[];
}

const VARIANTS: Record<SiteVariant, VariantTheme> = {
  dental: {
    bg: "from-slate-50 via-white to-slate-100",
    brandName: "Bright Smile",
    accentClass: "text-rose-500",
    accentBg: "bg-rose-500",
    accentSoftBg: "bg-rose-100",
    accentSoftText: "text-rose-700",
    badgeText: "Now booking · Sat 1pm",
    pillText: "Book a visit",
    headline: <>The <em className="text-rose-500 not-italic font-bold">smile</em> you've been hiding.</>,
    subhead: "Same-day crowns. All insurance. Open evenings & weekends.",
    primaryCta: "Book a visit",
    secondaryCta: "Meet Dr. Chen",
    stats: [
      { v: "4.9★", l: "240 reviews" },
      { v: "12yr", l: "in practice" },
      { v: "Same", l: "day crowns" },
    ],
  },
  salon: {
    bg: "from-pink-50 via-white to-orange-50",
    brandName: "Luna",
    accentClass: "text-amber-600",
    accentBg: "bg-amber-600",
    accentSoftBg: "bg-amber-100",
    accentSoftText: "text-amber-800",
    badgeText: "Saturday slots open",
    pillText: "Book balayage",
    headline: <>Hair that turns <em className="text-amber-600 not-italic font-bold">heads</em>.</>,
    subhead: "Balayage · color · cut. Master stylists, no chair-rentals.",
    primaryCta: "Book online",
    secondaryCta: "See lookbook",
    stats: [
      { v: "8yr", l: "balayage focus" },
      { v: "$185", l: "starting" },
      { v: "Free", l: "consult" },
    ],
  },
  restaurant: {
    bg: "from-stone-100 via-amber-50 to-stone-100",
    brandName: "Corner Table",
    accentClass: "text-emerald-700",
    accentBg: "bg-emerald-700",
    accentSoftBg: "bg-emerald-100",
    accentSoftText: "text-emerald-800",
    badgeText: "Tonight · 6pm slot open",
    pillText: "Reserve",
    headline: <>Where <em className="text-emerald-700 not-italic font-bold">neighbors</em> meet.</>,
    subhead: "Seasonal menu. Local sourcing. Open every night except Sunday.",
    primaryCta: "Reserve table",
    secondaryCta: "View menu",
    stats: [
      { v: "Farm", l: "to table" },
      { v: "BYOB", l: "Tue-Wed" },
      { v: "5★", l: "Yelp" },
    ],
  },
  realestate: {
    bg: "from-sky-50 via-white to-slate-50",
    brandName: "Harbor View",
    accentClass: "text-sky-700",
    accentBg: "bg-sky-700",
    accentSoftBg: "bg-sky-100",
    accentSoftText: "text-sky-800",
    badgeText: "32 listings · this week",
    pillText: "See homes",
    headline: <>The <em className="text-sky-700 not-italic font-bold">harbor</em> is calling.</>,
    subhead: "Waterfront homes from $480K. New listings every Friday.",
    primaryCta: "Browse homes",
    secondaryCta: "Talk to an agent",
    stats: [
      { v: "$480K+", l: "starting" },
      { v: "32", l: "active listings" },
      { v: "20yr", l: "local" },
    ],
  },
};

interface MockedWebsiteContentProps {
  variant: SiteVariant;
}

export function MockedWebsiteContent({ variant }: MockedWebsiteContentProps) {
  const v = VARIANTS[variant];
  return (
    <div className={`bg-gradient-to-br ${v.bg} h-full p-3 sm:p-5 flex flex-col gap-3`}>
      {/* Mini nav */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/70">
        <div className="flex items-center gap-1.5">
          <div className={`w-4 h-4 rounded-md ${v.accentBg}`} />
          <div className="font-serif text-[11px] font-bold text-slate-900 tracking-tight">{v.brandName}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-7 rounded-full bg-slate-300" />
          <div className="h-1.5 w-5 rounded-full bg-slate-300" />
          <div className="h-1.5 w-6 rounded-full bg-slate-300" />
          <div className={`h-4 w-12 rounded-md ${v.accentBg}`} />
        </div>
      </div>

      {/* Mini hero */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-2">
        <div className={`inline-flex items-center gap-1 rounded-full ${v.accentSoftBg} px-2 py-0.5 mb-2`}>
          <span className={`text-[8px] font-semibold ${v.accentSoftText} tracking-wide uppercase`}>
            {v.badgeText}
          </span>
        </div>
        <div className="font-serif text-[15px] sm:text-lg font-semibold leading-tight text-slate-900">
          {v.headline}
        </div>
        <div className="mt-1.5 text-[9px] text-slate-500 max-w-[180px] leading-snug">{v.subhead}</div>
        <div className="mt-2.5 flex items-center gap-1.5">
          <div className="h-5 px-2.5 rounded-full bg-slate-900 flex items-center text-[8px] font-semibold text-white">
            {v.primaryCta}
          </div>
          <div className="h-5 px-2.5 rounded-full border border-slate-300 flex items-center text-[8px] font-semibold text-slate-700">
            {v.secondaryCta}
          </div>
        </div>
      </div>

      {/* Mini stats row */}
      <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-slate-200/70">
        {v.stats.map((s, i) => (
          <div key={i} className="text-center">
            <div className="font-serif text-[11px] font-bold text-slate-900">{s.v}</div>
            <div className="text-[7px] text-slate-500 uppercase tracking-wide">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const SITE_VARIANTS: SiteVariant[] = ["dental", "salon", "restaurant", "realestate"];
export { VARIANT_LABELS, VARIANT_DOMAINS };

// ============================================================================
// Hero — auto-cycles through all 4 variants
// ============================================================================

const CYCLE_INTERVAL_MS = 5000;

export function HeroWebsiteMockup() {
  const [mounted, setMounted] = useState(false);
  const [variantIdx, setVariantIdx] = useState(0);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const id = setInterval(() => {
      setVariantIdx((i) => (i + 1) % SITE_VARIANTS.length);
    }, CYCLE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const variant = SITE_VARIANTS[variantIdx];

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
          <div className="flex-1 mx-2 h-6 rounded-md bg-card-hover flex items-center justify-center px-3 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={variant}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.25 }}
                className="text-[10px] text-muted font-mono truncate"
              >
                {VARIANT_DOMAINS[variant]}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-muted">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </div>
        </div>

        {/* The mocked site — cross-fades on variant change */}
        <div className="aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-b-2xl relative">
          <AnimatePresence mode="sync">
            <motion.div
              key={variant}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              <MockedWebsiteContent variant={variant} />
            </motion.div>
          </AnimatePresence>

          {/* Variant indicator dots */}
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {SITE_VARIANTS.map((v, i) => (
              <span
                key={v}
                className="h-1.5 rounded-full transition-all duration-500"
                style={{
                  background: i === variantIdx ? "rgba(15,15,15,0.55)" : "rgba(15,15,15,0.18)",
                  width: i === variantIdx ? "16px" : "5px",
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
