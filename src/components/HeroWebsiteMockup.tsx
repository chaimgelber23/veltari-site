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
    headline: <>The <em className="text-rose-500 not-italic font-bold">smile</em> you&apos;ve been hiding.</>,
    subhead: "Same-day crowns. All insurance. Open evenings & weekends.",
    primaryCta: "Book a visit",
    secondaryCta: "Meet Dr. Chen",
    stats: [{ v: "4.9★", l: "240 reviews" }, { v: "12yr", l: "in practice" }, { v: "Same", l: "day crowns" }],
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
    stats: [{ v: "8yr", l: "balayage focus" }, { v: "$185", l: "starting" }, { v: "Free", l: "consult" }],
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
    stats: [{ v: "Farm", l: "to table" }, { v: "BYOB", l: "Tue-Wed" }, { v: "5★", l: "Yelp" }],
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
    stats: [{ v: "$480K+", l: "starting" }, { v: "32", l: "active listings" }, { v: "20yr", l: "local" }],
  },
};

interface MockedWebsiteContentProps {
  variant: SiteVariant;
}

export function MockedWebsiteContent({ variant }: MockedWebsiteContentProps) {
  // Compact card-sized version of each variant for the Portfolio section.
  // The hero uses ScrollingDentalSite (fully-built tall site) instead.
  const v = VARIANTS[variant];
  return (
    <div className={`bg-gradient-to-br ${v.bg} h-full p-3 sm:p-4 flex flex-col gap-3`}>
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/70 shrink-0">
        <div className="flex items-center gap-1.5">
          <div className={`w-4 h-4 rounded-md ${v.accentBg}`} />
          <div className="font-serif text-[11px] font-bold text-slate-900 tracking-tight">{v.brandName}</div>
        </div>
        <div className={`h-4 px-2 rounded-md ${v.accentBg} flex items-center text-[8px] font-semibold text-white`}>
          {v.primaryCta}
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center text-center px-1">
        <div className={`inline-flex items-center gap-1 rounded-full ${v.accentSoftBg} px-2 py-0.5 mb-2`}>
          <span className={`text-[8px] font-semibold ${v.accentSoftText} tracking-wide uppercase`}>{v.badgeText}</span>
        </div>
        <div className="font-serif text-[15px] font-semibold leading-tight text-slate-900">{v.headline}</div>
        <div className="mt-1.5 text-[9px] text-slate-500 max-w-[180px] leading-snug">{v.subhead}</div>
      </div>
      <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-slate-200/70 shrink-0">
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
// ScrollingDentalSite — the polished site that lives inside the hero frame.
// 6 stacked sections rendered with real-feeling layout/density. The parent
// hero auto-scrolls the inner content from y=0 to y=-(innerHeight - viewport)
// over ~14s, pauses 1s, then restarts. Looks like watching a real visitor
// scroll through a finished site.
// ============================================================================

function FakeImg({ className = "", gradient = "from-rose-200 to-rose-300" }: { className?: string; gradient?: string }) {
  return <div className={`bg-gradient-to-br ${gradient} ${className}`} />;
}

function ScrollingDentalSite() {
  return (
    <div className="bg-white">
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
            { t: "Cleanings", n: "Hygienist visits in 30 min", icon: "🦷" },
            { t: "Same-day crowns", n: "CEREC · 2 hour visit", icon: "✨" },
            { t: "Implants", n: "0% financing · 24mo", icon: "🪥" },
            { t: "Whitening", n: "ZOOM in-office · Take-home", icon: "💎" },
          ].map((s) => (
            <div key={s.t} className="rounded-md border border-slate-200 bg-white p-2">
              <div className="text-[10px] mb-0.5">{s.icon}</div>
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
