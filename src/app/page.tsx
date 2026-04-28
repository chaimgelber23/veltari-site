import Link from "next/link";
import Navigation from "@/components/Navigation";
import {
  AnimatedHero,
  AnimatedProblemSection,
  AnimatedHowItWorks,
  AnimatedPricingSection,
  AnimatedPortfolioSection,
  AnimatedTestimonialsSection,
  AnimatedFAQSection,
  AnimatedCTASection,
} from "@/components/AnimatedSections";

/* ────────────────── Footer ────────────────── */
// Designed footer — sculptural wordmark anchors the bottom edge, designed
// logo + tagline up top, sectioned columns instead of one horizontal row,
// contact email visible. Same wordmark treatment as Navigation.
function Footer() {
  return (
    <footer className="relative pt-20 pb-10 bg-primary border-t border-white/5 overflow-hidden">
      {/* Sculptural background wordmark — anchors the footer with brand
          identity at low opacity. Sets the editorial-studio feel. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-6 lg:-bottom-10 text-center pointer-events-none select-none"
      >
        <span className="font-heading text-[26vw] lg:text-[16rem] leading-none text-white/[0.035] tracking-tighter">
          Pristine
        </span>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Top row: brand + tagline + mini CTA */}
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 pb-12 border-b border-white/5">
          <div>
            <div className="inline-flex items-baseline gap-2 leading-none mb-4">
              <span className="font-heading text-2xl tracking-tight text-surface leading-none">
                Pristine
              </span>
              <span className="font-sans text-[11px] font-semibold text-accent-light tracking-[0.22em] uppercase leading-none">
                Site
              </span>
            </div>
            <p className="text-surface/60 text-sm max-w-md leading-relaxed">
              Websites that convert. Live within 24 hours. Built from scratch — no templates, no monthly fees, free hosting forever.
            </p>
          </div>
          <div className="flex items-start lg:items-center">
            <Link
              href="/start"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-primary bg-surface hover:bg-surface/90 rounded-xl transition-all duration-300 shadow-lg whitespace-nowrap"
            >
              Get a free preview
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Middle: sectioned columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 py-12">
          <div>
            <h4 className="text-[10px] font-semibold text-surface tracking-[0.18em] uppercase mb-5">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#how-it-works" className="text-surface/55 hover:text-surface transition-colors">How it works</a></li>
              <li><a href="#pricing" className="text-surface/55 hover:text-surface transition-colors">Pricing</a></li>
              <li><a href="#portfolio" className="text-surface/55 hover:text-surface transition-colors">Portfolio</a></li>
              <li><a href="#faq" className="text-surface/55 hover:text-surface transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-semibold text-surface tracking-[0.18em] uppercase mb-5">Promise</h4>
            <ul className="space-y-3 text-sm text-surface/55">
              <li>24-hour delivery</li>
              <li>100% money-back</li>
              <li>You own everything</li>
              <li>No templates ever</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-semibold text-surface tracking-[0.18em] uppercase mb-5">Get started</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/start" className="text-surface/55 hover:text-surface transition-colors">Start a project</Link></li>
              <li>
                <a href="mailto:hello@pristinesite.com" className="text-surface/55 hover:text-surface transition-colors">
                  hello@pristinesite.com
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-semibold text-surface tracking-[0.18em] uppercase mb-5">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/privacy" className="text-surface/55 hover:text-surface transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="text-surface/55 hover:text-surface transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom edge: copyright + accent line */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5">
          <p className="text-xs text-surface/40">
            &copy; 2026 Pristine Site &middot; Crafted with care
          </p>
          <div className="flex items-center gap-2 text-xs text-surface/35">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-light animate-pulse-slow" />
            <span>Live &middot; accepting new projects</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ────────────────── Page ────────────────── */
export default function Home() {
  return (
    <main id="main" className="min-h-screen">
      <Navigation />
      <AnimatedHero />
      <AnimatedProblemSection />
      <AnimatedHowItWorks />
      <AnimatedPricingSection />
      <AnimatedPortfolioSection />
      <AnimatedTestimonialsSection />
      <AnimatedFAQSection />
      <AnimatedCTASection />
      <Footer />
    </main>
  );
}
