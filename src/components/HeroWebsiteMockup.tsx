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

// Shared mini-nav atom (consistent across all variants — top of every site)
function MiniNav({ v, navItems }: { v: VariantTheme; navItems: string[] }) {
  return (
    <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/70 shrink-0">
      <div className="flex items-center gap-1.5">
        <div className={`w-4 h-4 rounded-md ${v.accentBg}`} />
        <div className="font-serif text-[11px] font-bold text-slate-900 tracking-tight">{v.brandName}</div>
      </div>
      <div className="flex items-center gap-2.5">
        {navItems.map((item) => (
          <span key={item} className="text-[7px] text-slate-500 uppercase tracking-wide hidden sm:inline">
            {item}
          </span>
        ))}
        <div className={`h-4 px-2 rounded-md ${v.accentBg} flex items-center text-[8px] font-semibold text-white`}>
          {v.primaryCta}
        </div>
      </div>
    </div>
  );
}

// ── Variant 1: Dental — clinical, appointment-led with insurance trust ──
function DentalLayout({ v }: { v: VariantTheme }) {
  return (
    <div className={`bg-gradient-to-br ${v.bg} h-full p-3 sm:p-4 flex flex-col gap-3`}>
      <MiniNav v={v} navItems={["Services", "Team", "Insurance"]} />
      {/* Hero: photo placeholder + appointment CTA */}
      <div className="grid grid-cols-[1fr_auto] gap-3 items-center">
        <div>
          <div className={`inline-block rounded ${v.accentSoftBg} px-1.5 py-0.5 mb-1.5`}>
            <span className={`text-[7px] font-semibold ${v.accentSoftText} tracking-wide uppercase`}>{v.badgeText}</span>
          </div>
          <div className="font-serif text-[14px] font-semibold leading-tight text-slate-900">{v.headline}</div>
          <div className="mt-1 text-[8px] text-slate-500 leading-snug max-w-[140px]">{v.subhead}</div>
        </div>
        {/* Doctor avatar bubble */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-200 to-rose-300 ring-2 ring-white shadow-sm flex items-end justify-center overflow-hidden">
          <div className="w-8 h-6 rounded-t-full bg-rose-100" />
        </div>
      </div>
      {/* Appointment slots widget — vertical-specific */}
      <div className="rounded-md bg-white/80 border border-slate-200/70 p-2 shrink-0">
        <div className="text-[7px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Next available</div>
        <div className="grid grid-cols-3 gap-1">
          {[
            { d: "Tue", t: "10:30" },
            { d: "Wed", t: "2:00", on: true },
            { d: "Thu", t: "9:15" },
          ].map((s, i) => (
            <div
              key={i}
              className={`rounded px-1.5 py-1 text-center ${
                s.on ? `${v.accentBg} text-white` : "bg-slate-100 text-slate-700"
              }`}
            >
              <div className="text-[7px] font-semibold uppercase">{s.d}</div>
              <div className="text-[8px] font-bold">{s.t}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Insurance trust strip — vertical-specific */}
      <div className="mt-auto pt-2 border-t border-slate-200/70">
        <div className="text-[7px] text-slate-400 uppercase tracking-wide mb-1.5 text-center">In-network with</div>
        <div className="flex items-center justify-center gap-2">
          {["BCBS", "Aetna", "Cigna", "Delta"].map((p) => (
            <div key={p} className="text-[8px] font-bold text-slate-400 tracking-tight">{p}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Variant 2: Salon — image-led, gallery + price-list dominant ──
function SalonLayout({ v }: { v: VariantTheme }) {
  return (
    <div className={`bg-gradient-to-br ${v.bg} h-full p-3 sm:p-4 flex flex-col gap-3`}>
      <MiniNav v={v} navItems={["Stylists", "Lookbook", "Book"]} />
      <div className="text-center px-1 shrink-0">
        <div className="font-serif text-[13px] font-semibold leading-tight text-slate-900">{v.headline}</div>
      </div>
      {/* Look gallery — 3 image squares with overlay labels */}
      <div className="grid grid-cols-3 gap-1.5 shrink-0">
        {[
          { l: "Balayage", c: "from-amber-200 to-orange-300" },
          { l: "Blonde", c: "from-yellow-100 to-amber-200" },
          { l: "Brunette", c: "from-amber-700 to-stone-700" },
        ].map((s, i) => (
          <div key={i} className={`relative aspect-square rounded bg-gradient-to-br ${s.c} overflow-hidden`}>
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-[6px] font-semibold text-white text-center py-0.5 uppercase tracking-wide">
              {s.l}
            </div>
          </div>
        ))}
      </div>
      {/* Price list — vertical-specific */}
      <div className="rounded-md bg-white/80 border border-slate-200/70 p-2 shrink-0">
        <div className="text-[7px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Services</div>
        {[
          { s: "Balayage · long", p: "$215" },
          { s: "Color refresh", p: "$95" },
          { s: "Cut + style", p: "$75" },
        ].map((row) => (
          <div key={row.s} className="flex items-center justify-between text-[8px] py-0.5">
            <span className="text-slate-700">{row.s}</span>
            <span className={`font-bold ${v.accentClass}`}>{row.p}</span>
          </div>
        ))}
      </div>
      {/* Book CTA */}
      <div className="mt-auto flex items-center justify-center">
        <div className={`h-5 px-3 rounded-full ${v.accentBg} flex items-center text-[8px] font-semibold text-white shadow-sm`}>
          {v.primaryCta}
        </div>
      </div>
    </div>
  );
}

// ── Variant 3: Restaurant — menu-led with reservation widget ──
function RestaurantLayout({ v }: { v: VariantTheme }) {
  return (
    <div className={`bg-gradient-to-br ${v.bg} h-full p-3 sm:p-4 flex flex-col gap-3`}>
      <MiniNav v={v} navItems={["Menu", "Reserve", "Hours"]} />
      <div className="text-center px-1 shrink-0">
        <div className="font-serif text-[13px] italic text-slate-900 leading-tight">{v.headline}</div>
        <div className="mt-1 text-[8px] text-slate-500 italic">{v.subhead}</div>
      </div>
      {/* Tonight's menu cards — vertical-specific */}
      <div className="grid grid-cols-2 gap-1.5 shrink-0">
        {[
          { d: "Roasted Branzino", p: "$32", n: "Lemon · capers · fennel" },
          { d: "Wild Mushroom Risotto", p: "$26", n: "Truffle · pecorino" },
        ].map((m) => (
          <div key={m.d} className="rounded-md bg-white/85 border border-slate-200/70 p-1.5">
            <div className="font-serif text-[9px] font-semibold text-slate-900 leading-tight">{m.d}</div>
            <div className="text-[6px] text-slate-500 italic mt-0.5">{m.n}</div>
            <div className={`text-[8px] font-bold mt-1 ${v.accentClass}`}>{m.p}</div>
          </div>
        ))}
      </div>
      {/* Reservation widget — vertical-specific */}
      <div className="rounded-md bg-slate-900 text-white p-2 shrink-0 mt-auto">
        <div className="text-[7px] font-semibold uppercase tracking-wide opacity-60 mb-1">Reserve a table</div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            {[2, 4, 6].map((n) => (
              <div key={n} className="w-5 h-5 rounded border border-white/20 flex items-center justify-center text-[8px] font-medium">
                {n}
              </div>
            ))}
          </div>
          <div className={`h-5 px-2.5 rounded-md ${v.accentBg} flex items-center text-[8px] font-semibold`}>
            6:00pm
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Variant 4: Real Estate — listing cards + map sliver ──
function RealestateLayout({ v }: { v: VariantTheme }) {
  return (
    <div className={`bg-gradient-to-br ${v.bg} h-full p-3 sm:p-4 flex flex-col gap-3`}>
      <MiniNav v={v} navItems={["Listings", "Sold", "Agents"]} />
      <div className="px-1 shrink-0">
        <div className={`inline-block rounded ${v.accentSoftBg} px-1.5 py-0.5 mb-1`}>
          <span className={`text-[7px] font-semibold ${v.accentSoftText} tracking-wide uppercase`}>{v.badgeText}</span>
        </div>
        <div className="font-serif text-[13px] font-semibold leading-tight text-slate-900">{v.headline}</div>
      </div>
      {/* Listing cards — vertical-specific */}
      <div className="space-y-1.5 shrink-0">
        {[
          { addr: "12 Harbor View Rd", p: "$895K", b: "4bd · 3ba · 2,400 sqft", c: "from-sky-200 to-sky-300" },
          { addr: "47 Pier Lane", p: "$675K", b: "3bd · 2ba · 1,850 sqft", c: "from-blue-200 to-sky-200" },
        ].map((l) => (
          <div key={l.addr} className="flex items-center gap-2 rounded-md bg-white/85 border border-slate-200/70 p-1.5">
            <div className={`w-10 h-10 rounded bg-gradient-to-br ${l.c} shrink-0`} />
            <div className="flex-1 min-w-0">
              <div className="font-serif text-[10px] font-semibold text-slate-900 truncate leading-tight">{l.addr}</div>
              <div className="text-[7px] text-slate-500 truncate">{l.b}</div>
            </div>
            <div className={`text-[10px] font-bold ${v.accentClass} shrink-0`}>{l.p}</div>
          </div>
        ))}
      </div>
      {/* Map sliver — vertical-specific */}
      <div className="mt-auto rounded-md overflow-hidden border border-slate-200/70 h-12 relative bg-gradient-to-br from-slate-100 to-slate-200">
        {/* Fake roads */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-1/3 left-0 right-0 h-px bg-slate-400" />
          <div className="absolute top-2/3 left-0 right-0 h-px bg-slate-400" />
          <div className="absolute top-0 bottom-0 left-1/4 w-px bg-slate-400" />
          <div className="absolute top-0 bottom-0 left-2/3 w-px bg-slate-400" />
        </div>
        {/* Pins */}
        {[
          { x: "20%", y: "30%" },
          { x: "55%", y: "60%" },
          { x: "75%", y: "40%" },
        ].map((pin, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${v.accentBg} ring-2 ring-white shadow`}
            style={{ left: pin.x, top: pin.y, transform: "translate(-50%, -50%)" }}
          />
        ))}
        <div className="absolute bottom-0.5 right-1.5 text-[6px] font-semibold text-slate-600 bg-white/80 px-1 rounded">
          32 listings
        </div>
      </div>
    </div>
  );
}

export function MockedWebsiteContent({ variant }: MockedWebsiteContentProps) {
  const v = VARIANTS[variant];
  switch (variant) {
    case "dental":
      return <DentalLayout v={v} />;
    case "salon":
      return <SalonLayout v={v} />;
    case "restaurant":
      return <RestaurantLayout v={v} />;
    case "realestate":
      return <RealestateLayout v={v} />;
  }
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
