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
function Footer() {
  return (
    <footer className="py-16 bg-primary border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo — clean text wordmark, matches Navigation */}
          <div className="font-heading text-xl tracking-tight text-surface leading-none">
            Pristine Site
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            <a href="/" data-cursor="pointer" className="text-sm text-surface/50 hover:text-surface/80 transition-colors">
              Home
            </a>
            <a href="#pricing" data-cursor="pointer" className="text-sm text-surface/50 hover:text-surface/80 transition-colors">
              Pricing
            </a>
            <a href="#portfolio" data-cursor="pointer" className="text-sm text-surface/50 hover:text-surface/80 transition-colors">
              Portfolio
            </a>
            <Link href="/start" data-cursor="pointer" className="text-sm text-surface/50 hover:text-surface/80 transition-colors">
              Start Your Project
            </Link>
          </div>
        </div>

        <div className="border-t border-white/5 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-surface/30">
            &copy; 2026 Pristine Site. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-surface/30 hover:text-surface/50 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-surface/30 hover:text-surface/50 transition-colors">
              Terms of Service
            </Link>
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
