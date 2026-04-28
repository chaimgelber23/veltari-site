"use client";

// ============================================================================
// <BeforeAfterScrollingMockup />
//
// Portfolio-style mockup. Renders a fake browser frame whose inner content
// auto-toggles between TWO states every ~6s:
//   * BEFORE — the ugly outdated WordPress-template site the customer had
//   * AFTER  — the polished modern site Pristine Site would build
//
// A label badge animates with the toggle so the comparison is unmissable.
// The AFTER state can be its own scrolling-site (same pattern as the hero);
// the BEFORE state is short and ugly enough to fit in the viewport without
// scrolling.
//
// The "before" mockup is a deliberate caricature of common pain — broken
// fonts, mismatched colors, no responsive considerations, hard-coded
// "lorem ipsum"-vibes copy, and a "Best viewed in IE 6"-feeling layout.
// We're not screenshotting a real competitor's site.
// ============================================================================

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ────────────────────────────────────────────────────────────────────────────
// BoringDentalBefore — a deliberately bad mockup of an outdated dental site.
// Comic-sans-feel font, mismatched colors, busy/cluttered layout.
// Fits in a single viewport (no scroll needed).
// ────────────────────────────────────────────────────────────────────────────
export function BoringDentalBefore() {
  return (
    <div
      className="bg-white h-full overflow-hidden relative"
      style={{ fontFamily: "'Times New Roman', serif" }}
    >
      {/* Top "Best viewed in" banner — instantly dates the site */}
      <div className="bg-yellow-300 border-b-2 border-yellow-600 px-3 py-1 text-center">
        <span className="text-[8px] text-blue-800 font-bold underline">
          ★ Welcome to Bright Smile Dental! ★ Established 1998 ★
        </span>
      </div>

      {/* "Header" — Comic-Sans-ish title, marquee-feel */}
      <div className="bg-gradient-to-b from-blue-700 to-blue-900 px-3 py-3 text-center">
        <div className="text-[16px] font-bold text-yellow-300" style={{ fontFamily: "Comic Sans MS, cursive", textShadow: "1px 1px 0 #000" }}>
          Bright Smile Dental Office
        </div>
        <div className="text-[7px] text-white italic mt-0.5">
          &quot;Your Family Dentist Since 1998&quot;
        </div>
        {/* "Visitor counter" */}
        <div className="text-[7px] text-yellow-200 mt-1">
          Visitor #047,283 &nbsp;|&nbsp; Last updated: 03/14/2009
        </div>
      </div>

      {/* Awful horizontal nav — bevel buttons */}
      <div className="bg-gray-200 border-y border-gray-400 px-1.5 py-1 flex items-center justify-around gap-0.5">
        {["HOME", "About Us", "Services", "Contact!!", "Insurance.html"].map((item) => (
          <div
            key={item}
            className="text-[7px] text-blue-800 underline px-1 py-0.5 bg-gradient-to-b from-gray-100 to-gray-300 border border-gray-500"
            style={{ fontFamily: "'Times New Roman', serif" }}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Main content — left sidebar of links + center "welcome" + right sidebar of clip-art */}
      <div className="grid grid-cols-[1fr_2.5fr_1fr] gap-1.5 p-2.5 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22><circle cx=%2220%22 cy=%2220%22 r=%2218%22 fill=%22none%22 stroke=%22%23eef%22 stroke-width=%221%22/></svg>')]">
        {/* Left sidebar */}
        <div className="bg-blue-50 border border-blue-300 p-1.5">
          <div className="text-[7px] font-bold text-blue-900 underline mb-1">QUICK LINKS</div>
          <div className="space-y-0.5">
            {["» Office Hours", "» Find Us", "» Patient Forms", "» Make a Payment", "» FAQ.htm", "» Site Map"].map((l) => (
              <div key={l} className="text-[6px] text-blue-700 underline">{l}</div>
            ))}
          </div>
          <div className="mt-2 bg-red-200 border border-red-500 p-1 text-[6px] text-red-800 font-bold text-center">
            ★ NEW ★ Insurance Forms Now Online!
          </div>
        </div>

        {/* Center column */}
        <div className="bg-white border border-gray-300 p-2">
          <div className="text-[10px] font-bold text-blue-900 mb-1.5 underline" style={{ fontFamily: "Comic Sans MS, cursive" }}>
            Welcome to Our Office!
          </div>
          <div className="text-[7px] text-gray-800 leading-snug mb-1.5">
            Bright Smile Dental Office is a family-owned dental practice serving the
            community since 1998. Our friendly staff is ready to take care of all your
            dental needs! We accept most major insurance plans.
          </div>
          <div className="text-[7px] text-gray-800 leading-snug mb-1.5">
            We offer cleanings, fillings, crowns, root canals, and emergency dental
            services. Please call us today to schedule an appointment!
          </div>
          {/* Bad clipart placeholder */}
          <div className="my-1.5 bg-gradient-to-br from-gray-200 to-gray-300 border border-gray-500 h-8 flex items-center justify-center">
            <span className="text-[7px] text-gray-500 italic">[ smiling family clipart.gif ]</span>
          </div>
          <div className="text-[7px] text-blue-700 underline">Click here to read more about our services!</div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-1.5">
          <div className="bg-yellow-100 border border-yellow-500 p-1">
            <div className="text-[7px] font-bold text-yellow-900 mb-0.5">Hours:</div>
            <div className="text-[6px] text-yellow-800">M-F 9am-5pm</div>
            <div className="text-[6px] text-yellow-800">Sat by appt.</div>
          </div>
          <div className="bg-green-100 border border-green-600 p-1 text-center">
            <div className="text-[7px] font-bold text-green-800 underline">Call Us!</div>
            <div className="text-[8px] font-bold text-green-900">555-0188</div>
          </div>
          <div className="bg-pink-100 border border-pink-400 p-1">
            <div className="text-[6px] text-pink-700 italic">&quot;The best dentist around!&quot;</div>
            <div className="text-[5px] text-pink-600">- A patient</div>
          </div>
        </div>
      </div>

      {/* Footer — copyright + webring */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-gray-200 to-gray-400 border-t-2 border-gray-600 px-2 py-1.5 text-center">
        <div className="text-[6px] text-gray-700">
          © 2009 Bright Smile Dental Office &nbsp;|&nbsp; All rights reserved &nbsp;|&nbsp;
          <span className="text-blue-700 underline">Email Webmaster</span>
        </div>
        <div className="text-[5px] text-gray-500 mt-0.5">
          Site designed by My Cousin&apos;s Brother &nbsp;★&nbsp; Best viewed at 800×600
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// BeforeAfterScrollingMockup
//
// Toggles between a "before" component (renders inside the frame statically,
// ugly outdated style) and an "after" component (typically a tall scrolling
// site — the parent passes a render-prop that handles its own scroll).
//
// Shows BEFORE / AFTER badge that animates with the cross-fade. URL bar
// morphs between an "olddental.com/index.html" feel and a polished
// "brightsmiledental.com" feel.
// ────────────────────────────────────────────────────────────────────────────

export interface BeforeAfterScrollingMockupProps {
  beforeUrl: string;
  afterUrl: string;
  /**
   * BEFORE pane content. Either a React node (for CSS mockups) OR
   * an `{ image: ... }` to display a real screenshot URL (e.g. from
   * thum.io of a real prospect's site). Image renders as object-cover
   * scrolling slowly to reveal full-page screenshots that are taller
   * than the viewport.
   */
  before: React.ReactNode | { image: string; alt?: string };
  after: React.ReactNode;
  /** Time each state is shown in ms. Default 6000. */
  intervalMs?: number;
  /** Cross-fade duration in ms. Default 600. */
  transitionMs?: number;
}

function isImageBefore(b: BeforeAfterScrollingMockupProps["before"]): b is { image: string; alt?: string } {
  return typeof b === "object" && b !== null && "image" in b && typeof (b as { image: string }).image === "string";
}

export function BeforeAfterScrollingMockup({
  beforeUrl,
  afterUrl,
  before,
  after,
  intervalMs = 6000,
  transitionMs = 600,
}: BeforeAfterScrollingMockupProps) {
  const [showAfter, setShowAfter] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setShowAfter((s) => !s), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);

  const url = showAfter ? afterUrl : beforeUrl;

  return (
    <div className="relative rounded-2xl border border-border bg-card shadow-[0_30px_80px_-30px_rgba(15,15,15,0.45)] overflow-hidden">
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
              key={url}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.25 }}
              className="text-[10px] text-muted font-mono truncate"
            >
              {url}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Viewport — toggles between before and after */}
      <div className="aspect-[4/5] sm:aspect-[3/4] overflow-hidden relative bg-white">
        <AnimatePresence mode="sync">
          {showAfter ? (
            <motion.div
              key="after"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: transitionMs / 1000, ease: "easeInOut" }}
              className="absolute inset-0 overflow-hidden"
            >
              {/* AFTER pane wraps children in auto-scroll motion so it FEELS
                  like watching someone scroll through a finished site.
                  Same pattern as the hero's HeroWebsiteMockup. */}
              <motion.div
                className="absolute inset-x-0 top-0 will-change-transform min-h-[1100px]"
                animate={{ y: [0, -540] }}
                transition={{
                  duration: 10,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1,
                }}
              >
                {after}
              </motion.div>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-white to-transparent z-10" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-white to-transparent z-10" />
            </motion.div>
          ) : (
            <motion.div
              key="before"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: transitionMs / 1000, ease: "easeInOut" }}
              className="absolute inset-0 overflow-hidden"
            >
              {isImageBefore(before) ? (
                // Real screenshot — auto-pans top→bottom to reveal full-page
                // captures that are usually taller than the viewport.
                <motion.img
                  // eslint-disable-next-line @next/next/no-img-element
                  src={before.image}
                  alt={before.alt || "Before — real prospect site we'd transform"}
                  className="absolute inset-x-0 top-0 w-full will-change-transform"
                  initial={{ y: 0 }}
                  animate={{ y: ["0%", "-65%"] }}
                  transition={{
                    duration: 5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              ) : (
                before
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* BEFORE / AFTER label badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={showAfter ? "AFTER" : "BEFORE"}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.3 }}
            className={`absolute left-3 top-3 z-20 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] ${
              showAfter ? "bg-rose-500 text-white" : "bg-slate-900/85 text-white"
            }`}
          >
            {showAfter ? "AFTER" : "BEFORE"}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
