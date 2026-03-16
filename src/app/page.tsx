import Link from "next/link";
import Navigation from "@/components/Navigation";
import {
  AnimatedHero,
  AnimatedProblemSection,
  AnimatedStatsRow,
  AnimatedHowItWorks,
  AnimatedPricingSection,
  AnimatedPortfolioSection,
  AnimatedTrustSection,
  AnimatedFAQSection,
  AnimatedCTASection,
} from "@/components/AnimatedSections";

/* ────────────────── Footer ────────────────── */
function Footer() {
  return (
    <footer className="py-16 bg-primary border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-white font-bold text-xs">V</span>
            </div>
            <span className="font-heading text-lg text-surface">Veltari</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            <a href="/" className="text-sm text-surface/50 hover:text-surface/80 transition-colors">
              Home
            </a>
            <a href="#pricing" className="text-sm text-surface/50 hover:text-surface/80 transition-colors">
              Pricing
            </a>
            <a href="#portfolio" className="text-sm text-surface/50 hover:text-surface/80 transition-colors">
              Portfolio
            </a>
            <Link href="/start" className="text-sm text-surface/50 hover:text-surface/80 transition-colors">
              Start Your Project
            </Link>
          </div>
        </div>

        <div className="border-t border-white/5 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-surface/30">
            &copy; 2026 Veltari. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-surface/30 hover:text-surface/50 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-surface/30 hover:text-surface/50 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ────────────────── Page ────────────────── */
export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <AnimatedHero />
      <AnimatedProblemSection />
      <AnimatedStatsRow />
      <AnimatedHowItWorks />
      <AnimatedPricingSection />
      <AnimatedPortfolioSection />
      <AnimatedTrustSection />
      <AnimatedFAQSection />
      <AnimatedCTASection />
      <Footer />
    </main>
  );
}
