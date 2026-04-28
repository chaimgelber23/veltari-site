"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FadeIn,
  StaggerChildren,
  StaggerItem,
  TextReveal,
  CountUp,
  ParallaxLayer,
  MagneticButton,
  RevealOnScroll,
} from "./animations";
import {
  HeroWebsiteMockup,
  SITE_VARIANTS,
  VARIANT_LABELS,
  ScrollingRestaurantSite,
  ScrollingDentalSite,
  ScrollingSalonSite,
  ScrollingRealEstateSite,
  type SiteVariant,
} from "./HeroWebsiteMockup";

// Map each vertical to its polished scrolling site. Used in the Portfolio
// "Other styles" grid so each card shows a scaled-down view of the actual
// polished build (not a schematic placeholder), demonstrating the same
// quality bar across every vertical we build for.
const SCROLLING_SITE_FOR: Record<SiteVariant, () => React.JSX.Element> = {
  dental: ScrollingDentalSite,
  salon: ScrollingSalonSite,
  restaurant: ScrollingRestaurantSite,
  realestate: ScrollingRealEstateSite,
};
import { BeforeAfterScrollingMockup } from "./BeforeAfterScrollingMockup";
import { FAQPageJsonLd } from "./JsonLd";

/* ───────────────────────── Hero ───────────────────────── */
export function AnimatedHero() {
  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden hero-gradient">
      {/* Mesh gradient blobs with parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ParallaxLayer speed={0.3}>
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent/[0.06] blur-3xl animate-float" />
        </ParallaxLayer>
        <ParallaxLayer speed={-0.2}>
          <div
            className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-accent-light/[0.05] blur-3xl animate-float"
            style={{ animationDelay: "3s" }}
          />
        </ParallaxLayer>
        <ParallaxLayer speed={0.5}>
          <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] rounded-full bg-accent/[0.04] blur-3xl animate-pulse-slow" />
        </ParallaxLayer>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-20 lg:pt-24 lg:pb-32">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* LEFT — text content */}
          <div className="lg:col-span-6 lg:pr-6 text-center lg:text-left">
            {/* Badge — includes the brand name so title, H1, and schema all
                anchor on "Pristine Site" (fixes the geo-analyzer entity-clarity
                gap). Reads naturally as a credit line above the H1. */}
            <FadeIn delay={0}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/80 backdrop-blur-sm mb-8">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow" />
                <span className="text-xs font-medium text-muted tracking-wide uppercase">
                  Pristine Site &middot; Custom Web Design
                </span>
              </div>
            </FadeIn>

            {/* Headline */}
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-6">
              <TextReveal text="Your Custom Website." delay={0.1} />
              <br />
              <TextReveal
                text="Live in 24 Hours."
                className="text-gradient"
                delay={0.4}
              />
            </h1>

            {/* Subtitle */}
            <FadeIn delay={0.6}>
              <p className="text-lg sm:text-xl text-muted max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                Premium design. Built to convert. No templates. No waiting.
              </p>
            </FadeIn>

            {/* CTAs */}
            <FadeIn delay={0.8}>
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 sm:justify-center lg:justify-start">
                <MagneticButton>
                  <Link
                    href="/start"
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-accent hover:bg-accent-light rounded-xl transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5"
                  >
                    Get Your Free Preview
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </MagneticButton>
                <a
                  href="#portfolio"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-primary bg-card hover:bg-card-hover border border-border rounded-xl transition-all duration-300"
                >
                  See Our Work
                </a>
              </div>
            </FadeIn>
          </div>

          {/* RIGHT — animated website mockup with floating proof badges */}
          <div className="lg:col-span-6 mt-4 lg:mt-0">
            <HeroWebsiteMockup />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent" />
    </section>
  );
}

/* ───────────────────── Problem Section ─────────────────── */
export function AnimatedProblemSection() {
  const problems = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Losing customers to slow load times",
      description:
        "53% of visitors leave if a site takes more than 3 seconds to load. Every second costs you revenue.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        </svg>
      ),
      title: "Looking outdated on mobile",
      description:
        "Over 60% of traffic comes from phones. If your site isn't mobile-first, you're invisible to most buyers.",
    },
  ];

  return (
    <section className="py-20 lg:py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
            Your website is your best salesperson.
            <br />
            <span className="text-muted">Is it working?</span>
          </h2>
        </FadeIn>

        <StaggerChildren className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {problems.map((p, i) => (
            <StaggerItem key={i}>
              <div className="group p-8 rounded-2xl border border-border bg-card hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  {p.icon}
                </div>
                <h3 className="font-heading text-xl mb-3">{p.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{p.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

/* ───────────────────── Stats Row (NEW) ─────────────────── */
export function AnimatedStatsRow() {
  const stats = [
    { value: 24, suffix: "h", label: "Delivery Time" },
    { value: 90, suffix: "+", label: "Lighthouse Score" },
    { value: 100, suffix: "%", label: "Satisfaction Rate" },
    { value: 0, from: 99, suffix: "", prefix: "$", label: "Monthly Fees" },
  ];

  return (
    <section className="py-16 lg:py-20 mesh-gradient border-y border-border">
      <div className="max-w-5xl mx-auto px-6">
        <StaggerChildren className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <StaggerItem key={i}>
              <div className="text-center">
                <div className="font-heading text-4xl sm:text-5xl lg:text-6xl tracking-tight text-primary mb-2">
                  <CountUp
                    from={stat.from ?? 0}
                    to={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    duration={1.8}
                  />
                </div>
                <p className="text-sm text-muted font-medium tracking-wide uppercase">
                  {stat.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

/* ───────────────────── Verticals We Build For ─────────────────── */
// Replaces the old "fake client logo marquee". We don't list specific
// companies because we don't have permission + we'd rather honestly say
// what KINDS of businesses we build for than fake a name-drop strip.
export function AnimatedLogoMarquee() {
  const logos = [
    "Dental practices",
    "Salons & spas",
    "Restaurants",
    "Real estate offices",
    "HVAC & plumbing",
    "Law firms",
    "Chiropractors",
    "Photographers",
    "Boutique fitness",
    "Wedding vendors",
  ];

  const row = [...logos, ...logos]; // duplicate for seamless loop

  return (
    <section className="py-14 lg:py-16 bg-surface overflow-hidden border-b border-border">
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <FadeIn className="text-center">
          <p className="text-xs font-medium text-muted tracking-widest uppercase">
            We build for service businesses like
          </p>
        </FadeIn>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="overflow-hidden mb-4">
        <div className="marquee-track">
          {row.map((logo, i) => (
            <div
              key={`r1-${i}`}
              className="flex-shrink-0 mx-8 lg:mx-12 flex items-center justify-center"
            >
              <span className="font-heading text-xl lg:text-2xl text-primary/20 whitespace-nowrap select-none">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="overflow-hidden">
        <div className="marquee-track-reverse">
          {[...row].reverse().map((logo, i) => (
            <div
              key={`r2-${i}`}
              className="flex-shrink-0 mx-8 lg:mx-12 flex items-center justify-center"
            >
              <span className="font-heading text-xl lg:text-2xl text-primary/20 whitespace-nowrap select-none">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────── How It Works ────────────────── */
export function AnimatedHowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Tell us about your business",
      description: "Fill out a quick form with your business details, goals, and style preferences.",
    },
    {
      num: "02",
      title: "We extract your brand",
      description:
        "Colors, fonts, and style pulled from your existing presence — or crafted from scratch.",
    },
    {
      num: "03",
      title: "Preview in 24 hours",
      description:
        "See your new site before you pay a dime. No commitment, no pressure.",
    },
    {
      num: "04",
      title: "Go live",
      description:
        "We handle everything — hosting, domain setup, and launch. You just approve and we ship.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 lg:py-32 mesh-gradient">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <span className="text-xs font-medium text-accent tracking-widest uppercase mb-4 block">
            The Process
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            From idea to live site.{" "}
            <span className="text-gradient">In one day.</span>
          </h2>
        </FadeIn>

        <StaggerChildren staggerDelay={0.15} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <StaggerItem key={i}>
              <div className="relative">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-40px)] h-px bg-border connector-line" />
                )}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 text-accent font-heading text-2xl mb-5 relative">
                    {step.num}
                  </div>
                  <h3 className="font-heading text-lg mb-2">{step.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

/* ────────────────────── Pricing ──────────────────────
   Plans MUST match seo-business/src/lib/wb/brand-config.ts WB_BRAND.packages.
   The "New Business Checklist" + pricing-sync-guard verify this at build time
   in the seo-business hub. Drift = misleading prospects. */
export function AnimatedPricingSection() {
  const plans = [
    {
      name: "Starter",
      price: 499,
      pages: "1-3 pages",
      description: "Perfect for solo businesses and personal brands",
      features: [
        "Up to 3 pages",
        "Custom domain (you only pay registrar)",
        "Mobile-first responsive design",
        "Brand-matched colors & fonts",
        "Contact form integration",
        "Basic SEO setup",
        "1 round of revisions",
        "No Pristine Site branding",
        "Free hosting on Vercel — forever",
        "Email support",
      ],
      cta: "Start Your Project",
      popular: false,
    },
    {
      name: "Business",
      price: 899,
      pages: "3-7 pages",
      description: "For growing businesses that need more",
      features: [
        "Up to 7 pages",
        "Everything in Starter",
        "Custom animations & hover effects",
        "Blog / News section",
        "SEO optimization + Schema markup",
        "Google Business integration",
        "2 rounds of revisions",
        "Free hosting on Vercel — forever",
        "Priority support",
      ],
      cta: "Start Your Project",
      popular: true,
    },
    {
      name: "Premium",
      price: 1999,
      pages: "7-20 pages",
      description: "Full-scale web presence with everything included",
      features: [
        "Up to 20 pages",
        "Everything in Business",
        "E-commerce / booking integration",
        "Custom forms & integrations",
        "Advanced animations",
        "3 rounds of revisions",
        "Free hosting on Vercel — forever",
        "Dedicated support",
        "Monthly performance reports (3 months included)",
      ],
      cta: "Start Your Project",
      popular: false,
    },
  ];

  // Add-ons removed — we don't have a confirmed list of add-ons we actually
  // offer at fixed prices yet. Pretending to have a SEO/content/animation
  // menu would set false expectations. Replaced with a "Talk to us" CTA below.

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <span className="text-xs font-medium text-accent tracking-widest uppercase mb-4 block">
            Pricing
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            One-time payment. No subscriptions. No hidden fees. Free hosting included forever.
          </p>
        </FadeIn>

        <StaggerChildren staggerDelay={0.15} className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <StaggerItem key={plan.name}>
              <div
                className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 h-full ${
                  plan.popular
                    ? "bg-primary text-surface border-2 border-accent shadow-2xl shadow-accent/10 scale-[1.02] popular-card-glow"
                    : "bg-card border border-border hover:border-accent/30 hover:shadow-lg"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-xs font-medium rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3
                    className={`font-heading text-xl mb-1 ${
                      plan.popular ? "text-surface" : "text-primary"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-sm mb-4 ${
                      plan.popular ? "text-surface/60" : "text-muted"
                    }`}
                  >
                    {plan.description}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`font-heading text-4xl ${
                        plan.popular ? "text-surface" : "text-primary"
                      }`}
                    >
                      <span className="inline-flex">$</span>
                      <CountUp to={plan.price} duration={1.2} />
                    </span>
                    <span
                      className={`text-sm ${
                        plan.popular ? "text-surface/50" : "text-muted"
                      }`}
                    >
                      one-time
                    </span>
                  </div>
                  <p
                    className={`text-xs mt-1 ${
                      plan.popular ? "text-surface/40" : "text-muted/70"
                    }`}
                  >
                    {plan.pages} &middot; No subscription
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <svg
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          plan.popular ? "text-accent-light" : "text-accent"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className={plan.popular ? "text-surface/80" : "text-muted"}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/start"
                  className={`block w-full text-center py-3 px-6 rounded-xl text-sm font-medium transition-all duration-300 ${
                    plan.popular
                      ? "bg-accent text-white hover:bg-accent-light shadow-lg shadow-accent/20"
                      : "bg-primary text-surface hover:bg-primary/90"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Custom requests — replaces fake addons menu */}
        <RevealOnScroll>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm text-muted leading-relaxed mb-4">
              Need something not in the plans above? E-commerce, custom integration,
              ongoing maintenance, anything else — tell us about it and we&apos;ll quote it honestly.
            </p>
            <Link
              href="/start"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-light transition-colors"
            >
              Talk to us about a custom build
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

/* ────────────────── Portfolio ──────────────────
   Featured BEFORE/AFTER card (scrolling mockup that toggles between the
   ugly outdated original and the polished site Pristine Site would build),
   followed by 3 small "style example" cards for the other verticals so
   the section still shows breadth. */
export function AnimatedPortfolioSection() {
  // The featured card uses the real restaurant prospect transformation.
  // The 3 small examples below are the OTHER three verticals.
  const otherVariants = SITE_VARIANTS.filter((v) => v !== "restaurant");

  return (
    <section id="portfolio" className="py-20 lg:py-28 mesh-gradient">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <span className="text-xs font-medium text-accent tracking-widest uppercase mb-4 block">
            What a transformation looks like
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
            Outdated &rarr; polished, in 24 hours
          </h2>
          <p className="text-muted max-w-xl mx-auto text-sm">
            Watch the BEFORE/AFTER toggle below. The &ldquo;before&rdquo; is the kind of dated WordPress
            template we typically replace; the &ldquo;after&rdquo; is the polished site we build —
            same screen, scrolled top to bottom.
          </p>
        </FadeIn>

        {/* Featured BEFORE/AFTER card — uses a REAL screenshot of a real
            prospect site for the BEFORE pane (anonymized URL bar). The
            AFTER is a polished restaurant-vertical mockup. */}
        <FadeIn className="mb-16">
          <div className="grid lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 items-center">
            <div className="mx-auto w-full max-w-[460px] lg:max-w-none">
              <BeforeAfterScrollingMockup
                beforeUrl="your-current-site.com"
                afterUrl="your-new-site.com"
                before={{
                  // Real screenshot via thum.io (free public service).
                  // maxAge=3600 caches for 1 hour so we don't hammer them.
                  // The URL bar above is masked; only the screenshot is real.
                  image:
                    "https://image.thum.io/get/width/720/maxAge/3600/png/https://stregabar.com",
                  alt: "A real prospect site we'd transform",
                }}
                after={<ScrollingRestaurantSite />}
              />
            </div>
            <div className="text-center lg:text-left">
              <span className="text-[10px] font-medium text-accent tracking-widest uppercase">
                Featured transformation
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl tracking-tight mt-2 mb-4">
                Restaurant rebuild
              </h3>
              <p className="text-muted leading-relaxed text-sm mb-3">
                Real prospect site on the BEFORE — exactly the kind of cluttered, hard-to-read
                local-restaurant page that loses reservations. The AFTER is a 24-hour rebuild:
                seasonal menu cards, chef bio, live reservation widget with party-size + time
                pickers, real reviews, mobile-first.
              </p>
              <p className="text-muted/70 text-[11px] mb-5 italic">
                BEFORE is a real public site we&apos;ve engaged with as a prospect; the URL bar above is
                anonymized. AFTER is a CSS mockup of what we&apos;d build — actual builds are tailored
                to each customer.
              </p>
              <Link
                href="/start"
                className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-light transition-colors"
              >
                Start your transformation
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </FadeIn>

        {/* Other verticals — small style examples (still honest: labeled as CSS mockups) */}
        <FadeIn className="text-center mb-8">
          <span className="text-xs font-medium text-accent tracking-widest uppercase mb-2 block">
            Other styles we build
          </span>
          <p className="text-muted text-sm max-w-md mx-auto">
            CSS mockups, not specific clients. Yours starts as a free preview tailored to your business.
          </p>
        </FadeIn>

        <StaggerChildren staggerDelay={0.12} className="grid sm:grid-cols-3 gap-6">
          {otherVariants.map((variant) => {
            const ScrollingSite = SCROLLING_SITE_FOR[variant];
            return (
              <StaggerItem key={variant}>
                <motion.div
                  className="group rounded-2xl overflow-hidden border border-border bg-card hover:border-accent/30 transition-all duration-500"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Scaled-down view of the FULL polished build for this
                      vertical. transform-origin top-left + scale 0.55 +
                      compensating width/height so the card crops to the
                      top portion of the actual site (nav + hero + first
                      sections). Shows real design density, not a wireframe. */}
                  <div className="aspect-[4/5] sm:aspect-[3/4] overflow-hidden relative bg-white">
                    <div
                      className="absolute top-0 left-0 origin-top-left pointer-events-none"
                      style={{
                        transform: "scale(0.55)",
                        width: "182%",
                        height: "182%",
                      }}
                    >
                      <ScrollingSite />
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between border-t border-border">
                    <div>
                      <span className="text-[10px] font-medium text-accent tracking-widest uppercase">
                        Style example
                      </span>
                      <h3 className="font-heading text-base leading-tight mt-0.5">
                        {VARIANT_LABELS[variant]}
                      </h3>
                    </div>
                    <Link
                      href="/start"
                      className="text-xs font-medium text-accent opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      Start
                    </Link>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}

/* ───────────────── Honest Promise (replaces fake Testimonials) ─────────────────
   Per memory feedback_no_fake_social_proof_own_sites: Rule 6 (no fake outcomes)
   applies to OUR sites too, not just sites we build for prospects. We don't have
   real reviews yet — instead of stock-photo testimonials, this section is the
   honest promise we make + the money-back guarantee front and center. */
export function AnimatedTestimonialsSection() {
  const promises = [
    {
      title: "24-hour delivery",
      detail: "Guaranteed in writing. If we miss it, your build is free.",
    },
    {
      title: "100% money-back",
      detail: "Don't love your preview? Full refund. No questions, no friction.",
    },
    {
      title: "You own everything",
      detail: "Code, design, hosting, every pixel. No lock-in. We hand it over.",
    },
    {
      title: "No templates ever",
      detail: "Every site built from scratch around your business. No cookie-cutter.",
    },
  ];

  return (
    <section className="py-20 lg:py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <span className="text-xs font-medium text-accent tracking-widest uppercase mb-4 block">
            Our honest promise
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
            Real reviews coming soon.
            <br />
            <span className="text-muted">Until then, here&apos;s what we promise in writing.</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto text-sm">
            We&apos;re newer than most agencies. Instead of stock-photo testimonials,
            we put every promise in plain text — and back it with a real money-back guarantee.
          </p>
        </FadeIn>

        <StaggerChildren staggerDelay={0.12} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {promises.map((p) => (
            <StaggerItem key={p.title}>
              <div className="p-6 rounded-2xl border border-border bg-card h-full flex flex-col">
                <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-heading text-lg mb-2">{p.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{p.detail}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Money-back guarantee — front and center */}
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/5 via-card to-card p-10 lg:p-12">
            <div className="grid lg:grid-cols-[auto_1fr_auto] items-center gap-8">
              {/* Big shield icon */}
              <div className="flex justify-center lg:justify-start">
                <div className="w-20 h-20 rounded-2xl bg-accent/10 text-accent flex items-center justify-center">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
              </div>

              <div className="text-center lg:text-left">
                <h3 className="font-heading text-2xl sm:text-3xl tracking-tight mb-2">
                  100% money-back guarantee
                </h3>
                <p className="text-muted leading-relaxed max-w-xl">
                  See your free preview. If you don&apos;t love it, walk away — you don&apos;t pay a cent.
                  Build it and still don&apos;t love it after revisions? Full refund. No questions asked.
                </p>
              </div>

              <div className="flex justify-center lg:justify-end">
                <Link
                  href="/start"
                  className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-medium text-white bg-accent hover:bg-accent-light rounded-xl transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5 whitespace-nowrap"
                >
                  Get your free preview
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ────────────────── Trust Section ────────────────── */
export function AnimatedTrustSection() {
  const badges = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      title: "100% Satisfaction Guarantee",
      description: "Don't love it? Full refund. No questions asked.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      title: "90+ Lighthouse Score",
      description: "Every site is performance-optimized and blazing fast.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
        </svg>
      ),
      title: "Free Hosting Forever",
      description: "Built on Next.js & Vercel. Enterprise infrastructure, zero cost to you.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      ),
      title: "Built with Modern Tech",
      description: "Next.js, React, Tailwind CSS. Your site will stay modern for years.",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
            Built to last. <span className="text-gradient">Guaranteed.</span>
          </h2>
        </FadeIn>

        <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((b, i) => (
            <StaggerItem key={i}>
              <div className="text-center p-8 rounded-2xl border border-border bg-card hover:border-accent/30 hover:shadow-lg transition-all duration-300 group h-full">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 text-accent mb-5 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  {b.icon}
                </div>
                <h3 className="font-heading text-base mb-2">{b.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{b.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

/* ────────────────── FAQ Section ────────────────── */
export function AnimatedFAQSection() {
  const faqs = [
    {
      q: "How can you build a site in 24 hours?",
      a: "We combine AI-powered design tools with experienced developers. Our streamlined process extracts your brand, generates layouts, and our team polishes everything to perfection — all within 24 hours of receiving your brief.",
    },
    {
      q: "What if I don't like the design?",
      a: "We offer a 100% satisfaction guarantee. If you're not happy with the initial design, we'll revise it at no extra cost. If we still can't get it right, you get a full refund. Zero risk.",
    },
    {
      q: "What's included in the price?",
      a: "Everything you need: custom design, responsive development, hosting setup, domain configuration, basic SEO, contact forms, and analytics. The price you see is the price you pay — no hidden fees.",
    },
    {
      q: "Do I own my website?",
      a: "Absolutely. You own 100% of the code, design, and content. Want to move to a different host someday? We'll hand over all source files. No lock-in, ever.",
    },
    {
      q: "What about hosting and maintenance?",
      a: "Hosting is free forever — included with every plan. We host on Vercel's global edge network, the same infrastructure used by companies like Nike and Twitch. Optional maintenance plans are available if you want ongoing content updates.",
    },
    {
      q: "Can I update my site myself?",
      a: "Yes. Business and Premium plans include a content management system (CMS) that lets you edit text, images, and blog posts without touching code. If you'd rather have us handle ongoing updates, email hello@pristinesite.com and we'll quote a maintenance arrangement that fits your needs.",
    },
  ];

  return (
    <section id="faq" className="py-24 lg:py-32 mesh-gradient">
      <FAQPageJsonLd items={faqs.map((f) => ({ question: f.q, answer: f.a }))} />
      <div className="max-w-3xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <span className="text-xs font-medium text-accent tracking-widest uppercase mb-4 block">
            FAQ
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            Questions? Answered.
          </h2>
        </FadeIn>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <details className="group rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-accent/30">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none select-none">
                  <span className="font-heading text-base pr-4">{faq.q}</span>
                  <svg
                    className="w-5 h-5 text-muted shrink-0 transition-transform duration-300 group-open:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-sm text-muted leading-relaxed -mt-2">
                  {faq.a}
                </div>
              </details>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────── CTA Section ──────────────────
   Designed CTA — kicker label, oversized editorial headline, indigo
   accent rule above the button to "frame" it as the next step. */
export function AnimatedCTASection() {
  return (
    <section className="py-28 lg:py-36 bg-primary relative overflow-hidden">
      {/* Subtle accent glow */}
      <ParallaxLayer speed={0.3} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[260px] bg-accent/15 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[180px] bg-accent-light/10 blur-3xl rounded-full" />
      </ParallaxLayer>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Kicker label */}
        <FadeIn>
          <div className="inline-flex items-center gap-3 mb-8">
            <span className="h-px w-10 bg-accent-light/50" />
            <span className="text-[11px] font-semibold text-accent-light tracking-[0.22em] uppercase">
              The next step
            </span>
            <span className="h-px w-10 bg-accent-light/50" />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-surface tracking-tight leading-[1.05] mb-8">
            See your new site
            <br />
            <span className="text-gradient">before you pay a cent.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-surface/60 text-lg sm:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Fill out a quick brief. Get a free, custom-built preview in 24 hours.
            Love it &mdash; we ship it. Don&apos;t &mdash; walk away. No payment required to start.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <MagneticButton className="inline-block">
            <Link
              href="/start"
              className="inline-flex items-center justify-center px-10 py-4 text-base font-medium text-primary bg-surface hover:bg-surface/90 rounded-xl transition-all duration-300 shadow-xl hover:-translate-y-0.5"
            >
              Get Your Free Preview
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </MagneticButton>
        </FadeIn>

        <FadeIn delay={0.45}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-surface/45">
            <span className="inline-flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-accent-light" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No payment to start
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-accent-light" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              100% money-back guarantee
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-accent-light" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              You own everything
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
