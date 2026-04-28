"use client";

// ============================================================================
// <HeroWebsiteMockup /> + <MockedWebsiteContent />
//
// The hero shows a fake browser window wrapping a TALL polished website that
// auto-scrolls top-to-bottom inside the frame, like watching someone scroll
// through a real site preview. After reaching the bottom it pauses then
// restarts. Way more interesting than a static screenshot or a slideshow of
// 4 mini-mockups.
//
// MockedWebsiteContent is also exported (in 4 vertical variants) so the
// Portfolio section can render style examples for different industries.
// The hero uses the dental variant by default — most fleshed-out vertical.
// ============================================================================

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// useLayoutEffect on client, no-op on server (avoids React SSR warning).
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

// Attribution banner — sits above each scrolling site's sticky nav so it's
// unambiguously OUR concept work, not a fake business pretending to be real.
// Reads as a "Pristine Site presents:" strip — explicit, restrained.
function SampleBanner() {
  return (
    <div className="px-4 py-1.5 bg-primary text-white flex items-center justify-between border-b border-white/5">
      <div className="flex items-center gap-1.5">
        <div className="w-2.5 h-2.5 rounded-sm bg-accent" />
        <span className="text-[7px] font-semibold tracking-[0.22em] uppercase">
          Pristine Site
        </span>
      </div>
      <span className="text-[7px] font-medium text-white/60 tracking-[0.18em] uppercase">
        Sample Build &middot; Concept
      </span>
    </div>
  );
}

type BadgePosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface ProofBadge {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  position: BadgePosition;
}

// Sit straight — rotated badges read as Web 2.0 stickers, not editorial.
const BADGE_POS: Record<BadgePosition, string> = {
  "top-left": "absolute -left-4 sm:-left-8 top-12 hidden md:block",
  "top-right": "absolute -right-4 sm:-right-8 top-12 hidden md:block",
  "bottom-left": "absolute -left-4 sm:-left-8 bottom-20 hidden md:block",
  "bottom-right": "absolute -right-2 sm:-right-6 bottom-20 hidden md:block",
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
// MockedWebsiteContent — short variants for the Portfolio "style examples"
// section. The hero uses ScrollingDentalSite below instead.
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
  bg: string;
  brandName: string;
  accentClass: string;
  accentBg: string;
  accentSoftBg: string;
  accentSoftText: string;
  badgeText: string;
  pillText: string;
  headline: React.ReactNode;
  subhead: string;
  primaryCta: string;
  secondaryCta: string;
  stats: { v: string; l: string }[];
}

// Per-vertical themes. Restrained palettes — deeper, less candy. Each
// vertical reads as Pristine-Site-designed-work (sophisticated, editorial)
// rather than generic colorful templates. Pop accents (rose-500, amber-600,
// sky-500) replaced with dialed-down studio versions.
const VARIANTS: Record<SiteVariant, VariantTheme> = {
  dental: {
    bg: "from-slate-50 via-white to-slate-100",
    brandName: "Bright Smile",
    accentClass: "text-rose-700",
    accentBg: "bg-rose-700",
    accentSoftBg: "bg-rose-50",
    accentSoftText: "text-rose-800",
    badgeText: "Now booking · Sat 1pm",
    pillText: "Book a visit",
    headline: <>The <em className="text-rose-700 not-italic font-bold">smile</em> you&apos;ve been hiding.</>,
    subhead: "Same-day crowns. All insurance. Open evenings & weekends.",
    primaryCta: "Book a visit",
    secondaryCta: "Meet Dr. Chen",
    stats: [{ v: "4.9★", l: "240 reviews" }, { v: "12yr", l: "in practice" }, { v: "Same", l: "day crowns" }],
  },
  salon: {
    bg: "from-stone-50 via-white to-stone-100",
    brandName: "Luna",
    accentClass: "text-amber-800",
    accentBg: "bg-amber-800",
    accentSoftBg: "bg-amber-50",
    accentSoftText: "text-amber-900",
    badgeText: "Saturday slots open",
    pillText: "Book balayage",
    headline: <>Hair that turns <em className="text-amber-800 not-italic font-bold">heads</em>.</>,
    subhead: "Balayage · color · cut. Master stylists, no chair-rentals.",
    primaryCta: "Book online",
    secondaryCta: "See lookbook",
    stats: [{ v: "8yr", l: "balayage focus" }, { v: "$185", l: "starting" }, { v: "Free", l: "consult" }],
  },
  restaurant: {
    bg: "from-stone-100 via-amber-50 to-stone-100",
    brandName: "Corner Table",
    accentClass: "text-emerald-800",
    accentBg: "bg-emerald-800",
    accentSoftBg: "bg-emerald-50",
    accentSoftText: "text-emerald-900",
    badgeText: "Tonight · 6pm slot open",
    pillText: "Reserve",
    headline: <>Where <em className="text-emerald-800 not-italic font-bold">neighbors</em> meet.</>,
    subhead: "Seasonal menu. Local sourcing. Open every night except Sunday.",
    primaryCta: "Reserve table",
    secondaryCta: "View menu",
    stats: [{ v: "Farm", l: "to table" }, { v: "BYOB", l: "Tue-Wed" }, { v: "5★", l: "Yelp" }],
  },
  realestate: {
    bg: "from-slate-50 via-white to-slate-100",
    brandName: "Harbor View",
    accentClass: "text-slate-800",
    accentBg: "bg-slate-800",
    accentSoftBg: "bg-slate-100",
    accentSoftText: "text-slate-900",
    badgeText: "32 listings · this week",
    pillText: "See homes",
    headline: <>The <em className="text-slate-800 not-italic font-bold">harbor</em> is calling.</>,
    subhead: "Waterfront homes from $480K. New listings every Friday.",
    primaryCta: "Browse homes",
    secondaryCta: "Talk to an agent",
    stats: [{ v: "$480K+", l: "starting" }, { v: "32", l: "active listings" }, { v: "20yr", l: "local" }],
  },
};

// Per-variant photo-block palettes. Gradient placeholders stand in for
// real photography but feel intentional, not stock. Each set is curated
// to the vertical's palette.
const MOCK_PHOTO_BLOCKS: Record<SiteVariant, string[]> = {
  dental: ["from-slate-300 to-slate-500", "from-rose-200 to-rose-400", "from-stone-300 to-stone-500"],
  salon: ["from-amber-200 to-amber-500", "from-stone-300 to-stone-500", "from-rose-200 to-rose-400"],
  restaurant: ["from-amber-300 to-orange-500", "from-emerald-300 to-emerald-600", "from-rose-300 to-rose-500"],
  realestate: ["from-slate-400 to-slate-700", "from-sky-200 to-sky-500", "from-blue-300 to-blue-600"],
};

// Per-variant service/feature pills — adds content density and gives each
// vertical visible specifics that prove this isn't a template.
const MOCK_PILLS: Record<SiteVariant, string[]> = {
  dental: ["Same-day crowns", "All insurance", "Open evenings"],
  salon: ["Balayage", "Color", "Cut & finish"],
  restaurant: ["Reservations", "Private events", "Wine pairing"],
  realestate: ["Waterfront", "New listings", "Local 20yr"],
};

interface MockedWebsiteContentProps {
  variant: SiteVariant;
}

export function MockedWebsiteContent({ variant }: MockedWebsiteContentProps) {
  // Polished card-sized mockup — each variant feels like a designed site,
  // not a wireframe. Includes: nav with menu links, hero with badge+headline,
  // a 3-up photo strip, service pills, and a stats footer. Same density as
  // a real one-page site, just compressed.
  const v = VARIANTS[variant];
  const photos = MOCK_PHOTO_BLOCKS[variant];
  const pills = MOCK_PILLS[variant];

  return (
    <div className={`bg-gradient-to-br ${v.bg} h-full flex flex-col`}>
      {/* Nav strip — brand mark + menu hints + CTA pill */}
      <div className="px-3 sm:px-4 py-2.5 flex items-center justify-between border-b border-slate-200/50 shrink-0">
        <div className="flex items-center gap-1.5">
          <div className={`w-4 h-4 rounded-md ${v.accentBg}`} />
          <div className="font-serif text-[11px] font-bold text-slate-900 tracking-tight">{v.brandName}</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[7px] uppercase tracking-wider text-slate-400 hidden sm:inline">Menu</span>
          <span className="text-[7px] uppercase tracking-wider text-slate-400 hidden sm:inline">About</span>
          <div className={`h-4 px-1.5 rounded-md ${v.accentBg} flex items-center text-[7px] font-semibold text-white`}>
            {v.primaryCta}
          </div>
        </div>
      </div>

      {/* Hero — badge, headline, subhead */}
      <div className="px-3 sm:px-4 pt-3 pb-2 text-center">
        <div className={`inline-flex items-center gap-1 rounded-full ${v.accentSoftBg} px-2 py-0.5 mb-1.5`}>
          <span className={`text-[8px] font-semibold ${v.accentSoftText} tracking-wide uppercase`}>{v.badgeText}</span>
        </div>
        <div className="font-serif text-[14px] sm:text-[15px] font-semibold leading-[1.15] text-slate-900 px-1">
          {v.headline}
        </div>
        <div className="mt-1 text-[8px] text-slate-500 max-w-[200px] mx-auto leading-snug">{v.subhead}</div>
      </div>

      {/* Photo strip — 3-up gradient blocks, adds editorial richness */}
      <div className="px-3 sm:px-4 mt-1">
        <div className="grid grid-cols-3 gap-1">
          {photos.map((p, i) => (
            <div key={i} className={`aspect-[4/3] rounded bg-gradient-to-br ${p}`} />
          ))}
        </div>
      </div>

      {/* Service / feature pills */}
      <div className="px-3 sm:px-4 mt-2 flex flex-wrap justify-center gap-1">
        {pills.map((p) => (
          <span
            key={p}
            className={`text-[7px] font-semibold ${v.accentSoftText} ${v.accentSoftBg} px-1.5 py-0.5 rounded`}
          >
            {p}
          </span>
        ))}
      </div>

      {/* Spacer pushes stats to bottom */}
      <div className="flex-1" />

      {/* Stats footer */}
      <div className="px-3 sm:px-4 py-2 grid grid-cols-3 gap-1.5 border-t border-slate-200/50 shrink-0">
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
// ScrollingRestaurantSite — polished restaurant site for AFTER pane in the
// portfolio when the BEFORE is a real restaurant prospect's screenshot.
// 6 sections: nav · hero · tonight's menu · chef · reservation · reviews · footer.
// Same scroll-friendly structure as the dental version.
// ============================================================================

export function ScrollingRestaurantSite() {
  return (
    <div className="bg-stone-50">
      <SampleBanner />
      {/* Sticky nav */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-2.5 bg-stone-50/95 backdrop-blur border-b border-stone-300/70">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-md bg-gradient-to-br from-emerald-700 to-emerald-900" />
          <div className="font-serif text-[11px] italic font-bold text-stone-900 tracking-tight">Corner Table</div>
        </div>
        <div className="flex items-center gap-2.5">
          {["Menu", "Reserve", "Hours", "About"].map((n) => (
            <span key={n} className="text-[7px] text-stone-500 uppercase tracking-wide hidden sm:inline">{n}</span>
          ))}
          <div className="h-4 px-2 rounded-md bg-emerald-800 text-white text-[8px] font-semibold flex items-center">
            Reserve
          </div>
        </div>
      </div>

      {/* Section 1 — Hero */}
      <section className="bg-gradient-to-b from-amber-50 via-stone-50 to-stone-50 px-4 py-6">
        <div className="text-center">
          <div className="inline-block rounded bg-emerald-100 px-1.5 py-0.5 mb-1.5">
            <span className="text-[7px] font-semibold text-emerald-800 uppercase tracking-wide">Tonight · 6pm slot open</span>
          </div>
          <div className="font-serif italic text-[18px] font-semibold leading-[1.1] text-stone-900">
            Where <span className="text-emerald-800 font-bold not-italic">neighbors</span> meet.
          </div>
          <div className="mt-1.5 text-[8px] text-stone-600 italic max-w-[200px] mx-auto leading-snug">
            Seasonal menu · local sourcing · open every night except Sunday.
          </div>
          <div className="mt-3 flex items-center justify-center gap-1.5">
            <div className="h-5 px-2.5 rounded-full bg-stone-900 text-white text-[8px] font-semibold flex items-center">Reserve a table</div>
            <div className="h-5 px-2.5 rounded-full border border-stone-400 text-stone-700 text-[8px] font-semibold flex items-center">View menu</div>
          </div>
        </div>
        {/* Photo strip */}
        <div className="mt-4 grid grid-cols-3 gap-1">
          <div className="aspect-square rounded bg-gradient-to-br from-amber-300 to-orange-500" />
          <div className="aspect-square rounded bg-gradient-to-br from-emerald-200 to-emerald-500" />
          <div className="aspect-square rounded bg-gradient-to-br from-rose-300 to-rose-500" />
        </div>
      </section>

      {/* Section 2 — Tonight's menu */}
      <section className="px-4 py-5 bg-stone-50">
        <div className="text-center mb-3">
          <div className="text-[7px] font-semibold text-emerald-800 tracking-widest uppercase mb-1">Tonight&apos;s menu</div>
          <div className="font-serif italic text-[14px] font-semibold text-stone-900 leading-tight">Chef Marco&apos;s seasonal picks.</div>
        </div>
        <div className="space-y-1.5">
          {[
            { d: "Roasted Branzino", s: "Lemon · capers · fennel · charred radicchio", p: "$32" },
            { d: "Wild Mushroom Risotto", s: "Truffle · pecorino · spring herbs", p: "$26" },
            { d: "Bavette Steak Frites", s: "Béarnaise · twice-cooked fries · arugula", p: "$34" },
            { d: "Heirloom Tomato Burrata", s: "Aged balsamic · basil oil · sea salt", p: "$18" },
          ].map((m) => (
            <div key={m.d} className="rounded-md bg-white border border-stone-200 p-2 flex items-start gap-2">
              <div className="flex-1">
                <div className="font-serif text-[10px] font-semibold text-stone-900 leading-tight">{m.d}</div>
                <div className="text-[7px] text-stone-500 italic mt-0.5">{m.s}</div>
              </div>
              <div className="text-[10px] font-bold text-emerald-800 shrink-0">{m.p}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3 — Chef bio */}
      <section className="px-4 py-5 bg-stone-100">
        <div className="grid grid-cols-[auto_1fr] gap-3 items-start">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-stone-300 to-stone-500 ring-2 ring-white shadow shrink-0" />
          <div>
            <div className="text-[7px] font-semibold text-emerald-800 uppercase tracking-widest">Meet our chef</div>
            <div className="font-serif italic text-[13px] font-semibold text-stone-900 leading-tight mt-0.5">Chef Marco Bianchi</div>
            <div className="text-[8px] text-stone-700 leading-relaxed mt-1.5">
              15 years in Italian kitchens, last 6 leading the line at Spritz in NYC.
              Focused on what&apos;s in season locally — menu changes monthly with the produce.
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {["Italian", "Farm-to-table", "BYOB Tue-Wed"].map((c) => (
                <span key={c} className="text-[7px] font-semibold text-emerald-900 bg-emerald-100 px-1.5 py-0.5 rounded">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — Reservation widget */}
      <section className="px-4 py-5 bg-stone-50">
        <div className="text-center mb-3">
          <div className="text-[7px] font-semibold text-emerald-800 tracking-widest uppercase mb-1">Reserve a table</div>
          <div className="font-serif italic text-[14px] font-semibold text-stone-900 leading-tight">Confirmed instantly.</div>
        </div>
        <div className="rounded-md bg-stone-900 text-white p-2.5">
          <div className="text-[7px] font-semibold uppercase tracking-wide opacity-60 mb-2 text-center">Tonight</div>
          <div className="grid grid-cols-6 gap-1 mb-2">
            {[2, 3, 4, 5, 6, 8].map((n, i) => (
              <div
                key={n}
                className={`h-5 rounded flex items-center justify-center text-[8px] font-semibold ${
                  i === 1 ? "bg-emerald-600" : "bg-white/10"
                }`}
              >
                {n}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-1">
            {["5:30pm", "6:00pm", "6:30pm", "7:00pm", "7:30pm", "8:00pm", "8:30pm", "9:00pm"].map((t, i) => (
              <div
                key={t}
                className={`h-5 rounded flex items-center justify-center text-[7px] font-semibold ${
                  i === 1 ? "bg-emerald-600" : "bg-white/5 border border-white/10 text-white/80"
                }`}
              >
                {t}
              </div>
            ))}
          </div>
          <div className="mt-2 text-center">
            <div className="inline-flex h-5 px-3 rounded-full bg-white text-stone-900 text-[8px] font-semibold items-center">
              Confirm 6:00pm · party of 3
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — Reviews */}
      <section className="px-4 py-5 bg-stone-100">
        <div className="text-center mb-3">
          <div className="text-[7px] font-semibold text-emerald-800 tracking-widest uppercase mb-1">What guests say</div>
          <div className="font-serif italic text-[14px] font-semibold text-stone-900 leading-tight">5-star, every time.</div>
        </div>
        <div className="space-y-1.5">
          {[
            { q: "Best risotto I've had outside Italy. Marco's attention to seasonality shows.", n: "L. Park", r: "Sept 2024" },
            { q: "Our anniversary spot. Patio in summer, fireplace in winter — never disappoints.", n: "T. Murray", r: "Nov 2024" },
          ].map((t, i) => (
            <div key={i} className="rounded-md bg-white border border-stone-200 p-2">
              <div className="flex gap-0.5 mb-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} className="w-2 h-2 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="text-[8px] text-stone-700 leading-relaxed italic">&ldquo;{t.q}&rdquo;</div>
              <div className="text-[7px] text-stone-500 mt-1">— {t.n} · {t.r}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6 — Footer */}
      <section className="px-4 py-5 bg-stone-900 text-white">
        <div className="grid grid-cols-[1fr_auto] gap-3 items-start">
          <div>
            <div className="font-serif italic text-[11px] font-bold tracking-tight">Corner Table</div>
            <div className="text-[7px] text-stone-400 mt-1.5 leading-relaxed">
              218 East Ave · East Nashville<br />
              (615) 555-0144
            </div>
            <div className="text-[7px] text-stone-400 mt-2 uppercase tracking-wide">Hours</div>
            <div className="text-[7px] text-stone-300 mt-0.5">Mon-Sat · 5pm–11pm</div>
            <div className="text-[7px] text-stone-300">Sunday · closed</div>
          </div>
          <div className="w-20 h-16 rounded bg-stone-700 relative overflow-hidden shrink-0">
            <div className="absolute inset-0 opacity-50">
              <div className="absolute top-1/3 left-0 right-0 h-px bg-stone-500" />
              <div className="absolute top-2/3 left-0 right-0 h-px bg-stone-500" />
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-stone-500" />
            </div>
            <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-white -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-white/10 text-[6px] text-stone-500">
          © 2026 Corner Table · Built by Pristine Site
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// ScrollingDentalSite — the polished site that lives inside the hero frame.
// 6 stacked sections rendered with real-feeling layout/density. The parent
// hero auto-scrolls the inner content from y=0 to y=-(innerHeight - viewport)
// over ~14s, pauses 1s, then restarts. Looks like watching a real visitor
// scroll through a finished site.
// ============================================================================

function FakeImg({ className = "", gradient = "from-rose-200 to-rose-300" }: { className?: string; gradient?: string }) {
  return <div className={`bg-gradient-to-br ${gradient} ${className}`} />;
}

export function ScrollingDentalSite() {
  return (
    <div className="bg-white">
      <SampleBanner />
      {/* Sticky-look mini nav */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-2.5 bg-white/95 backdrop-blur border-b border-slate-200/70">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-md bg-gradient-to-br from-rose-500 to-rose-600" />
          <div className="font-serif text-[11px] font-bold text-slate-900 tracking-tight">Bright Smile Dental</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[7px] text-slate-500 uppercase tracking-wide">Services</span>
          <span className="text-[7px] text-slate-500 uppercase tracking-wide">Team</span>
          <span className="text-[7px] text-slate-500 uppercase tracking-wide">Insurance</span>
          <div className="h-4 px-2 rounded-md bg-rose-500 flex items-center text-[8px] font-semibold text-white">
            Book
          </div>
        </div>
      </div>

      {/* Section 1 — Hero */}
      <section className="bg-gradient-to-b from-rose-50 via-white to-white px-4 py-5">
        <div className="grid grid-cols-[1fr_auto] gap-3 items-center">
          <div>
            <div className="inline-block rounded bg-rose-100 px-1.5 py-0.5 mb-1.5">
              <span className="text-[7px] font-semibold text-rose-700 tracking-wide uppercase">Now booking · Sat 1pm</span>
            </div>
            <div className="font-serif text-[17px] font-semibold leading-[1.1] text-slate-900">
              The <em className="text-rose-500 not-italic font-bold">smile</em> you&apos;ve been hiding.
            </div>
            <div className="mt-1.5 text-[8px] text-slate-500 leading-snug max-w-[160px]">
              Same-day crowns. All insurance. Evenings &amp; weekends.
            </div>
            <div className="mt-2.5 flex items-center gap-1.5">
              <div className="h-5 px-2.5 rounded-full bg-slate-900 text-white text-[8px] font-semibold flex items-center">Book a visit</div>
              <div className="h-5 px-2.5 rounded-full border border-slate-300 text-slate-700 text-[8px] font-semibold flex items-center">Meet the team</div>
            </div>
          </div>
          <FakeImg className="w-20 h-24 rounded-xl ring-2 ring-white shadow-md shrink-0" gradient="from-rose-200 via-rose-100 to-rose-300" />
        </div>
        {/* Insurance strip */}
        <div className="mt-4 pt-3 border-t border-slate-200/70">
          <div className="text-[7px] text-slate-400 uppercase tracking-wide mb-1.5 text-center">In-network with</div>
          <div className="flex items-center justify-center gap-2.5">
            {["BCBS", "Aetna", "Cigna", "Delta", "Met"].map((p) => (
              <div key={p} className="text-[8px] font-bold text-slate-400 tracking-tight">{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2 — Services grid */}
      <section className="px-4 py-5 bg-white">
        <div className="text-center mb-3">
          <div className="text-[7px] font-semibold text-rose-500 tracking-widest uppercase mb-1">Care that fits your life</div>
          <div className="font-serif text-[14px] font-semibold text-slate-900 leading-tight">Everything you need under one roof.</div>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { t: "Cleanings", n: "Hygienist visits in 30 min" },
            { t: "Same-day crowns", n: "CEREC · 2 hour visit" },
            { t: "Implants", n: "0% financing · 24mo" },
            { t: "Whitening", n: "ZOOM in-office · Take-home" },
          ].map((s, i) => (
            <div key={s.t} className="rounded-md border border-slate-200 bg-white p-2">
              <div className="text-[7px] font-bold text-rose-700 tracking-widest mb-0.5">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="font-serif text-[10px] font-bold text-slate-900 leading-tight">{s.t}</div>
              <div className="text-[7px] text-slate-500 mt-0.5">{s.n}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3 — Doctor bio */}
      <section className="px-4 py-5 bg-rose-50/60">
        <div className="grid grid-cols-[auto_1fr] gap-3 items-start">
          <FakeImg className="w-16 h-16 rounded-full ring-2 ring-white shadow shrink-0" gradient="from-rose-300 to-rose-400" />
          <div>
            <div className="text-[7px] font-semibold text-rose-500 uppercase tracking-widest">Meet your dentist</div>
            <div className="font-serif text-[13px] font-semibold text-slate-900 leading-tight mt-0.5">
              Dr. Sarah Chen, DDS
            </div>
            <div className="text-[8px] text-slate-600 leading-relaxed mt-1.5">
              12 years in Bright Smile practice. UPenn dental school. Member of the American Academy of
              Cosmetic Dentistry. Believes the best appointment is one you don&apos;t dread.
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {["DDS", "AACD", "Invisalign Provider"].map((c) => (
                <span key={c} className="text-[7px] font-semibold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — Booking widget */}
      <section className="px-4 py-5 bg-white">
        <div className="text-center mb-3">
          <div className="text-[7px] font-semibold text-rose-500 tracking-widest uppercase mb-1">Book online</div>
          <div className="font-serif text-[14px] font-semibold text-slate-900 leading-tight">Pick a time that works.</div>
          <div className="text-[8px] text-slate-500 mt-1">Confirmed instantly. Reminders by text.</div>
        </div>
        <div className="rounded-md border border-slate-200 bg-white p-2.5">
          <div className="text-[7px] font-semibold text-slate-500 uppercase tracking-wide mb-2 text-center">This week</div>
          <div className="grid grid-cols-5 gap-1">
            {[
              { d: "Tue", n: "21" },
              { d: "Wed", n: "22", on: true },
              { d: "Thu", n: "23" },
              { d: "Fri", n: "24" },
              { d: "Sat", n: "25" },
            ].map((s, i) => (
              <div
                key={i}
                className={`rounded p-1 text-center ${s.on ? "bg-rose-500 text-white" : "bg-slate-50 text-slate-700"}`}
              >
                <div className="text-[6px] font-semibold uppercase">{s.d}</div>
                <div className="text-[10px] font-bold">{s.n}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1">
            {["9:30am", "11:00am", "2:00pm", "3:30pm", "5:00pm", "6:15pm"].map((t, i) => (
              <div
                key={t}
                className={`rounded text-center text-[8px] font-semibold py-1 ${
                  i === 2 ? "bg-rose-500 text-white" : "bg-slate-50 text-slate-700 border border-slate-200"
                }`}
              >
                {t}
              </div>
            ))}
          </div>
          <div className="mt-2 text-center">
            <div className="inline-flex h-5 px-3 rounded-full bg-slate-900 text-white text-[8px] font-semibold items-center">
              Confirm Wed · 2:00pm
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — Testimonials */}
      <section className="px-4 py-5 bg-slate-50">
        <div className="text-center mb-3">
          <div className="text-[7px] font-semibold text-rose-500 tracking-widest uppercase mb-1">Patient stories</div>
          <div className="font-serif text-[14px] font-semibold text-slate-900 leading-tight">240 five-star reviews and counting.</div>
        </div>
        <div className="space-y-1.5">
          {[
            { q: "Dr. Chen fixed my crown in 90 minutes — same day. I was shocked.", n: "M. Rivera", r: "Crown · 2024" },
            { q: "First dentist I haven't dreaded going to. The whole team is kind.", n: "S. Park", r: "New patient · 2024" },
          ].map((t, i) => (
            <div key={i} className="rounded-md bg-white border border-slate-200 p-2">
              <div className="flex gap-0.5 mb-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} className="w-2 h-2 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="text-[8px] text-slate-700 leading-relaxed italic">&ldquo;{t.q}&rdquo;</div>
              <div className="text-[7px] text-slate-500 mt-1">— {t.n} · {t.r}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6 — Footer + map sliver */}
      <section className="px-4 py-5 bg-slate-900 text-white">
        <div className="grid grid-cols-[1fr_auto] gap-3 items-start">
          <div>
            <div className="font-serif text-[11px] font-bold tracking-tight">Bright Smile Dental</div>
            <div className="text-[7px] text-slate-400 mt-1.5 leading-relaxed">
              412 Maple St · Suite 2B<br />
              Riverside, CA 92501<br />
              (555) 030-2200
            </div>
            <div className="text-[7px] text-slate-400 mt-2 uppercase tracking-wide">Hours</div>
            <div className="text-[7px] text-slate-300 mt-0.5">Mon-Fri · 8am – 7pm</div>
            <div className="text-[7px] text-slate-300">Sat · 9am – 2pm</div>
          </div>
          {/* Tiny map */}
          <div className="w-20 h-16 rounded bg-slate-700 relative overflow-hidden shrink-0">
            <div className="absolute inset-0 opacity-50">
              <div className="absolute top-1/3 left-0 right-0 h-px bg-slate-500" />
              <div className="absolute top-2/3 left-0 right-0 h-px bg-slate-500" />
              <div className="absolute top-0 bottom-0 left-1/3 w-px bg-slate-500" />
            </div>
            <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-rose-400 ring-2 ring-white -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-white/10 text-[6px] text-slate-500">
          © 2026 Bright Smile Dental · Built by Pristine Site
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// ScrollingSalonSite — polished salon site (Luna). Same 6-section structure
// + Pristine-Site quality bar as the dental/restaurant builds. Restrained
// amber/stone palette, lookbook strip + service price menu replace the
// dental booking widget — vertical-appropriate layout twist proves "custom
// per industry, not template".
// ============================================================================

export function ScrollingSalonSite() {
  return (
    <div className="bg-stone-50">
      <SampleBanner />
      {/* Sticky nav */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-2.5 bg-stone-50/95 backdrop-blur border-b border-stone-300/60">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-md bg-gradient-to-br from-amber-700 to-amber-900" />
          <div className="font-serif text-[11px] font-bold text-stone-900 tracking-tight">Luna</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[7px] text-stone-500 uppercase tracking-wide">Services</span>
          <span className="text-[7px] text-stone-500 uppercase tracking-wide">Stylists</span>
          <span className="text-[7px] text-stone-500 uppercase tracking-wide">Lookbook</span>
          <div className="h-4 px-2 rounded-md bg-amber-800 flex items-center text-[8px] font-semibold text-white">
            Book
          </div>
        </div>
      </div>

      {/* Section 1 — Hero */}
      <section className="bg-gradient-to-b from-stone-100 via-stone-50 to-stone-50 px-4 py-5">
        <div className="grid grid-cols-[1fr_auto] gap-3 items-center">
          <div>
            <div className="inline-block rounded bg-amber-50 px-1.5 py-0.5 mb-1.5">
              <span className="text-[7px] font-semibold text-amber-900 tracking-wide uppercase">Saturday slots open</span>
            </div>
            <div className="font-serif text-[17px] font-semibold leading-[1.1] text-stone-900">
              Hair that turns <em className="text-amber-800 not-italic font-bold">heads</em>.
            </div>
            <div className="mt-1.5 text-[8px] text-stone-500 leading-snug max-w-[160px]">
              Balayage · color · cut. Master stylists. No chair-rentals.
            </div>
            <div className="mt-2.5 flex items-center gap-1.5">
              <div className="h-5 px-2.5 rounded-full bg-stone-900 text-white text-[8px] font-semibold flex items-center">Book online</div>
              <div className="h-5 px-2.5 rounded-full border border-stone-400 text-stone-700 text-[8px] font-semibold flex items-center">Lookbook</div>
            </div>
          </div>
          <FakeImg className="w-20 h-24 rounded-xl ring-2 ring-white shadow-md shrink-0" gradient="from-amber-200 via-stone-200 to-stone-400" />
        </div>
        {/* Photo strip */}
        <div className="mt-4 grid grid-cols-4 gap-1">
          <FakeImg className="aspect-square rounded" gradient="from-amber-200 to-amber-400" />
          <FakeImg className="aspect-square rounded" gradient="from-stone-300 to-stone-500" />
          <FakeImg className="aspect-square rounded" gradient="from-rose-200 to-rose-400" />
          <FakeImg className="aspect-square rounded" gradient="from-amber-300 to-stone-500" />
        </div>
      </section>

      {/* Section 2 — Service price menu */}
      <section className="px-4 py-5 bg-stone-50">
        <div className="text-center mb-3">
          <div className="text-[7px] font-semibold text-amber-800 tracking-widest uppercase mb-1">The menu</div>
          <div className="font-serif text-[14px] font-semibold text-stone-900 leading-tight">Transparent pricing. No surprises.</div>
        </div>
        <div className="space-y-1.5">
          {[
            { d: "Signature Balayage", s: "Hand-painted highlights · 3hr", p: "$185" },
            { d: "Full Color + Gloss", s: "Single-process color · finish blow", p: "$135" },
            { d: "Precision Cut", s: "Consultation · cut · style", p: "$85" },
            { d: "Olaplex Treatment", s: "Add to any service", p: "+$45" },
          ].map((m) => (
            <div key={m.d} className="rounded-md bg-white border border-stone-200 p-2 flex items-start gap-2">
              <div className="flex-1">
                <div className="font-serif text-[10px] font-semibold text-stone-900 leading-tight">{m.d}</div>
                <div className="text-[7px] text-stone-500 italic mt-0.5">{m.s}</div>
              </div>
              <div className="text-[10px] font-bold text-amber-900 shrink-0">{m.p}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3 — Featured stylist */}
      <section className="px-4 py-5 bg-amber-50/60">
        <div className="grid grid-cols-[auto_1fr] gap-3 items-start">
          <FakeImg className="w-16 h-16 rounded-full ring-2 ring-white shadow shrink-0" gradient="from-amber-300 to-amber-500" />
          <div>
            <div className="text-[7px] font-semibold text-amber-800 uppercase tracking-widest">Meet your stylist</div>
            <div className="font-serif text-[13px] font-semibold text-stone-900 leading-tight mt-0.5">
              Mara Lindqvist
            </div>
            <div className="text-[8px] text-stone-700 leading-relaxed mt-1.5">
              8 years in balayage, formerly senior at Sally Hershberger NYC. Specializes in lived-in
              color for fine and curly textures. Trains the rest of the team monthly.
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {["Balayage Master", "Olaplex Cert", "Curly specialist"].map((c) => (
                <span key={c} className="text-[7px] font-semibold text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — Lookbook grid */}
      <section className="px-4 py-5 bg-stone-50">
        <div className="text-center mb-3">
          <div className="text-[7px] font-semibold text-amber-800 tracking-widest uppercase mb-1">Recent work</div>
          <div className="font-serif text-[14px] font-semibold text-stone-900 leading-tight">Color stories from the chair.</div>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            "from-amber-200 to-amber-500",
            "from-stone-300 to-stone-600",
            "from-rose-200 to-amber-300",
            "from-amber-100 to-stone-400",
            "from-stone-200 to-rose-300",
            "from-amber-300 to-stone-500",
          ].map((g, i) => (
            <FakeImg key={i} className="aspect-[3/4] rounded" gradient={g} />
          ))}
        </div>
        <div className="mt-2 text-center">
          <span className="text-[7px] text-stone-500 italic">Tap any look to book that style</span>
        </div>
      </section>

      {/* Section 5 — Reviews */}
      <section className="px-4 py-5 bg-stone-100">
        <div className="text-center mb-3">
          <div className="text-[7px] font-semibold text-amber-800 tracking-widest uppercase mb-1">Client love</div>
          <div className="font-serif text-[14px] font-semibold text-stone-900 leading-tight">4.9★ across 180 visits.</div>
        </div>
        <div className="space-y-1.5">
          {[
            { q: "Mara totally got what I wanted from one Pinterest board. Best color I've had in years.", n: "J. Whitfield", r: "Balayage · 2024" },
            { q: "Finally found a salon that handles my curls without trying to straighten them out.", n: "A. Okafor", r: "Cut + gloss · 2024" },
          ].map((t, i) => (
            <div key={i} className="rounded-md bg-white border border-stone-200 p-2">
              <div className="flex gap-0.5 mb-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} className="w-2 h-2 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="text-[8px] text-stone-700 leading-relaxed italic">&ldquo;{t.q}&rdquo;</div>
              <div className="text-[7px] text-stone-500 mt-1">— {t.n} · {t.r}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6 — Footer */}
      <section className="px-4 py-5 bg-stone-900 text-white">
        <div className="grid grid-cols-[1fr_auto] gap-3 items-start">
          <div>
            <div className="font-serif text-[11px] font-bold tracking-tight">Luna Salon</div>
            <div className="text-[7px] text-stone-400 mt-1.5 leading-relaxed">
              78 Greenpoint Ave · Brooklyn<br />
              (718) 555-0192
            </div>
            <div className="text-[7px] text-stone-400 mt-2 uppercase tracking-wide">Hours</div>
            <div className="text-[7px] text-stone-300 mt-0.5">Tue-Sat · 10am – 7pm</div>
            <div className="text-[7px] text-stone-300">Sun-Mon · closed</div>
          </div>
          <div className="w-20 h-16 rounded bg-stone-700 relative overflow-hidden shrink-0">
            <div className="absolute inset-0 opacity-50">
              <div className="absolute top-1/3 left-0 right-0 h-px bg-stone-500" />
              <div className="absolute top-2/3 left-0 right-0 h-px bg-stone-500" />
              <div className="absolute top-0 bottom-0 left-1/3 w-px bg-stone-500" />
            </div>
            <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-white -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-white/10 text-[6px] text-stone-500">
          &copy; 2026 Luna Salon &middot; Built by Pristine Site
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// ScrollingRealEstateSite — polished real-estate site (Harbor View). Hero
// puts a featured property photo + price overlay front and center; listings
// grid + sell-side CTA + market-stats panel are vertical-specific layout
// twists. Same 6-section quality bar as the others.
// ============================================================================

export function ScrollingRealEstateSite() {
  return (
    <div className="bg-white">
      <SampleBanner />
      {/* Sticky nav */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-2.5 bg-white/95 backdrop-blur border-b border-slate-200/70">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-md bg-gradient-to-br from-slate-700 to-slate-900" />
          <div className="font-serif text-[11px] font-bold text-slate-900 tracking-tight">Harbor View Properties</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[7px] text-slate-500 uppercase tracking-wide">Listings</span>
          <span className="text-[7px] text-slate-500 uppercase tracking-wide">Sell</span>
          <span className="text-[7px] text-slate-500 uppercase tracking-wide">Team</span>
          <div className="h-4 px-2 rounded-md bg-slate-800 flex items-center text-[8px] font-semibold text-white">
            See homes
          </div>
        </div>
      </div>

      {/* Section 1 — Hero with featured property image */}
      <section className="bg-gradient-to-b from-slate-100 via-white to-white px-4 py-5">
        <div className="text-center mb-3">
          <div className="inline-block rounded bg-slate-100 px-1.5 py-0.5 mb-1.5">
            <span className="text-[7px] font-semibold text-slate-800 tracking-wide uppercase">32 listings · this week</span>
          </div>
          <div className="font-serif text-[17px] font-semibold leading-[1.1] text-slate-900 px-2">
            The <em className="text-slate-800 not-italic font-bold">harbor</em> is calling.
          </div>
          <div className="mt-1.5 text-[8px] text-slate-500 leading-snug">
            Waterfront homes from $480K. New listings every Friday.
          </div>
        </div>
        {/* Featured property card with overlay */}
        <div className="relative rounded-lg overflow-hidden shadow-sm">
          <FakeImg className="w-full h-28" gradient="from-slate-400 via-slate-600 to-slate-800" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          <div className="absolute bottom-2 left-2 right-2 flex items-end justify-between text-white">
            <div>
              <div className="text-[7px] font-semibold uppercase tracking-widest text-slate-300">Featured</div>
              <div className="font-serif text-[11px] font-bold leading-tight">412 Harbor Bluff Road</div>
              <div className="text-[7px] text-slate-200 mt-0.5">4 bd · 3 ba · 2,840 sqft</div>
            </div>
            <div className="text-right">
              <div className="font-serif text-[12px] font-bold">$1.4M</div>
              <div className="text-[6px] text-slate-300 uppercase tracking-wide">Just listed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Listings grid */}
      <section className="px-4 py-5 bg-white">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[7px] font-semibold text-slate-800 tracking-widest uppercase">Active listings</div>
            <div className="font-serif text-[13px] font-semibold text-slate-900 leading-tight">This week&apos;s waterfront.</div>
          </div>
          <div className="text-[7px] font-semibold text-slate-700 underline decoration-dotted">View all 32 →</div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { p: "$890K", b: "3·2", a: "1,940", g: "from-sky-200 to-sky-400" },
            { p: "$1.1M", b: "4·3", a: "2,310", g: "from-slate-300 to-slate-500" },
            { p: "$680K", b: "3·2", a: "1,520", g: "from-blue-300 to-slate-500" },
          ].map((l, i) => (
            <div key={i} className="rounded-md overflow-hidden border border-slate-200 bg-white">
              <FakeImg className="aspect-[4/3]" gradient={l.g} />
              <div className="p-1.5">
                <div className="font-serif text-[10px] font-bold text-slate-900 leading-tight">{l.p}</div>
                <div className="text-[7px] text-slate-500 mt-0.5">{l.b} · {l.a} sqft</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3 — Sell-side CTA */}
      <section className="px-4 py-5 bg-slate-50">
        <div className="rounded-lg bg-white border border-slate-200 p-3">
          <div className="grid grid-cols-[1fr_auto] gap-3 items-center">
            <div>
              <div className="text-[7px] font-semibold text-slate-800 tracking-widest uppercase mb-0.5">Thinking of selling?</div>
              <div className="font-serif text-[12px] font-semibold text-slate-900 leading-tight">
                Get your home&apos;s value in 60 seconds.
              </div>
              <div className="text-[7px] text-slate-500 mt-1 leading-snug">
                Free, no-pressure estimate. Used by 600+ homeowners on the bluff this year.
              </div>
            </div>
            <div className="h-6 px-2.5 rounded-full bg-slate-900 text-white text-[8px] font-semibold flex items-center shrink-0">
              Get value
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — Featured agent */}
      <section className="px-4 py-5 bg-white">
        <div className="grid grid-cols-[auto_1fr] gap-3 items-start">
          <FakeImg className="w-16 h-16 rounded-full ring-2 ring-white shadow shrink-0" gradient="from-slate-300 to-slate-500" />
          <div>
            <div className="text-[7px] font-semibold text-slate-800 uppercase tracking-widest">Meet your agent</div>
            <div className="font-serif text-[13px] font-semibold text-slate-900 leading-tight mt-0.5">
              Eleanor Whitfield
            </div>
            <div className="text-[8px] text-slate-700 leading-relaxed mt-1.5">
              20 years on the harbor. Closed $48M in waterfront last year. Specializes in
              first-time buyers and estate sales. Lives on the bluff she sells.
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {["Top 1% local", "$48M / yr", "Lived here 20yr"].map((c) => (
                <span key={c} className="text-[7px] font-semibold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — Market stats grid */}
      <section className="px-4 py-5 bg-slate-50">
        <div className="text-center mb-3">
          <div className="text-[7px] font-semibold text-slate-800 tracking-widest uppercase mb-1">The harbor in numbers</div>
          <div className="font-serif text-[14px] font-semibold text-slate-900 leading-tight">Updated weekly &middot; Q4 2025</div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { v: "$890K", l: "Median price" },
            { v: "18 days", l: "Avg time to sell" },
            { v: "+4.2%", l: "YoY appreciation" },
          ].map((s) => (
            <div key={s.l} className="rounded-md bg-white border border-slate-200 p-2 text-center">
              <div className="font-serif text-[12px] font-bold text-slate-900">{s.v}</div>
              <div className="text-[7px] text-slate-500 uppercase tracking-wide mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6 — Footer */}
      <section className="px-4 py-5 bg-slate-900 text-white">
        <div className="grid grid-cols-[1fr_auto] gap-3 items-start">
          <div>
            <div className="font-serif text-[11px] font-bold tracking-tight">Harbor View Properties</div>
            <div className="text-[7px] text-slate-400 mt-1.5 leading-relaxed">
              22 Wharf Lane · Marblehead, MA<br />
              (781) 555-0177
            </div>
            <div className="text-[7px] text-slate-400 mt-2 uppercase tracking-wide">Office hours</div>
            <div className="text-[7px] text-slate-300 mt-0.5">Mon-Fri · 9am – 6pm</div>
            <div className="text-[7px] text-slate-300">Sat · by appointment</div>
          </div>
          <div className="w-20 h-16 rounded bg-slate-700 relative overflow-hidden shrink-0">
            <div className="absolute inset-0 opacity-50">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-500" />
              <div className="absolute top-0 bottom-0 left-1/3 w-px bg-slate-500" />
              <div className="absolute top-0 bottom-0 left-2/3 w-px bg-slate-500" />
            </div>
            <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-sky-400 ring-2 ring-white -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-white/10 text-[6px] text-slate-500">
          &copy; 2026 Harbor View Properties &middot; Built by Pristine Site
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// Hero — auto-scrolls the polished dental site top to bottom inside the
// browser frame. Loops indefinitely.
// ============================================================================

const SCROLL_DURATION_S = 12;   // smooth top→bottom
const PAUSE_AT_END_S = 1.2;     // brief pause at top + bottom (via repeatDelay)
// Fallback scroll distance when measurement isn't available yet (or fails).
// Inner site has min-height ~1100px below; viewport is roughly 580px on
// desktop hero column. So 500-600px of scroll always.
const FALLBACK_SCROLL_PX = 540;

export function HeroWebsiteMockup() {
  const [mounted, setMounted] = useState(false);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  // Start with the fallback so the animation runs from the very first render
  // — don't wait on measurement. ResizeObserver corrects it after.
  const [scrollDistance, setScrollDistance] = useState(FALLBACK_SCROLL_PX);

  useEffect(() => setMounted(true), []);

  // Measure on mount + on resize. Uses useLayoutEffect so it runs before
  // paint when the DOM is ready.
  useIsoLayoutEffect(() => {
    const measure = () => {
      const inner = innerRef.current;
      const viewport = viewportRef.current;
      if (!inner || !viewport) return;
      const dist = Math.max(0, inner.offsetHeight - viewport.offsetHeight);
      // Only update if measurement gives a sensible non-zero value.
      // Otherwise keep the fallback so the animation still runs.
      if (dist > 50) setScrollDistance(dist);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (innerRef.current) ro.observe(innerRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, []);

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
            <span className="text-[10px] text-muted font-mono truncate">brightsmiledental.com</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-muted">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </div>
        </div>

        {/* Viewport — scrolls the inner site */}
        <div
          ref={viewportRef}
          className="aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-b-2xl relative bg-white"
        >
          <motion.div
            ref={innerRef}
            // Hardcoded min-height so the inner is GUARANTEED taller than the
            // viewport, so scrolling always has somewhere to go even before
            // measurement runs.
            className="absolute inset-x-0 top-0 will-change-transform min-h-[1100px]"
            // Two-keyframe animation with reverse-repeat = clean bounce
            // top → bottom → top → bottom forever. RepeatDelay gives the
            // pause at each extreme.
            animate={{ y: [0, -scrollDistance] }}
            transition={{
              duration: SCROLL_DURATION_S,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: PAUSE_AT_END_S,
            }}
          >
            <ScrollingDentalSite />
          </motion.div>

          {/* Soft top + bottom fades to mask scroll boundaries */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-white to-transparent z-10" />

          {/* Scroll-progress dot — synced to the same animation */}
          <div className="absolute right-1.5 top-3 bottom-3 w-1 rounded-full bg-slate-200/40 z-10">
            <motion.div
              className="absolute left-0 right-0 rounded-full bg-rose-500/70"
              style={{ height: "20%" }}
              animate={{ top: ["0%", "80%"] }}
              transition={{
                duration: SCROLL_DURATION_S,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: PAUSE_AT_END_S,
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
