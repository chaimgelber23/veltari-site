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

/* ───────────────────────── Hero ───────────────────────── */
export function AnimatedHero() {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden hero-gradient">
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

      <div className="relative max-w-5xl mx-auto px-6 text-center pt-24 pb-20">
        {/* Badge */}
        <FadeIn delay={0}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/80 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow" />
            <span className="text-xs font-medium text-muted tracking-wide uppercase">
              Premium Web Design Studio
            </span>
          </div>
        </FadeIn>

        {/* Headline */}
        <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight mb-6">
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
          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            Premium design. Built to convert. No templates. No waiting.
          </p>
        </FadeIn>

        {/* CTAs */}
        <FadeIn delay={0.8}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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

        {/* Social proof line */}
        <FadeIn delay={1.0}>
          <div className="flex items-center justify-center gap-6 mt-14 text-sm text-muted">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>24-hour delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>100% satisfaction guarantee</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Free hosting included</span>
            </div>
          </div>
        </FadeIn>
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
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Blending in with template sites",
      description:
        "Cookie-cutter designs kill trust. Your website should feel as unique as the business behind it.",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
            Your website is your best salesperson.
            <br />
            <span className="text-muted">Is it working?</span>
          </h2>
        </FadeIn>

        <StaggerChildren className="grid md:grid-cols-3 gap-8">
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

/* ───────────────────── Logo Marquee ─────────────────── */
export function AnimatedLogoMarquee() {
  const logos = [
    "TechVenture",
    "GreenLeaf Co",
    "Atlas Digital",
    "Ironwork Studio",
    "Peak Performance",
    "Coastal Living",
    "Urban Eats",
    "Apex Solutions",
  ];

  const row = [...logos, ...logos]; // duplicate for seamless loop

  return (
    <section className="py-14 lg:py-16 bg-surface overflow-hidden border-b border-border">
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <FadeIn className="text-center">
          <p className="text-xs font-medium text-muted tracking-widest uppercase">
            Trusted by businesses everywhere
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

/* ────────────────────── Pricing ────────────────────── */
export function AnimatedPricingSection() {
  const plans = [
    {
      name: "Starter",
      price: 499,
      priceDisplay: "$499",
      monthly: "$119/mo x 5",
      description: "Perfect for solo businesses and personal brands",
      features: [
        "Custom one-page website",
        "Mobile-responsive design",
        "Contact form integration",
        "Basic SEO setup",
        "Free hosting forever",
        "24-hour delivery",
        "1 round of revisions",
      ],
      cta: "Start Your Project",
      popular: false,
    },
    {
      name: "Business",
      price: 899,
      priceDisplay: "$899",
      monthly: "$169/mo x 6",
      description: "For growing businesses that need more",
      features: [
        "Up to 5-page website",
        "Custom brand design",
        "Blog / News section",
        "Google Analytics setup",
        "Advanced SEO optimization",
        "Free hosting forever",
        "24-hour delivery",
        "3 rounds of revisions",
        "Social media integration",
      ],
      cta: "Start Your Project",
      popular: true,
    },
    {
      name: "Premium",
      price: 1999,
      priceDisplay: "$1,999",
      monthly: "$229/mo x 10",
      description: "Full-scale web presence with everything included",
      features: [
        "Unlimited pages",
        "Custom animations & interactions",
        "E-commerce ready",
        "CMS for easy updates",
        "Priority support",
        "Advanced analytics dashboard",
        "Free hosting forever",
        "24-hour delivery",
        "Unlimited revisions",
        "Performance optimization",
      ],
      cta: "Start Your Project",
      popular: false,
    },
  ];

  const addons = [
    { name: "SEO Management", price: "$79/mo" },
    { name: "Content Updates", price: "$49/mo" },
    { name: "Additional Pages", price: "$99 each" },
    { name: "Logo Design", price: "$199" },
  ];

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
                    or {plan.monthly}
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

        {/* Add-ons */}
        <RevealOnScroll>
          <div className="max-w-2xl mx-auto">
            <h3 className="font-heading text-xl text-center mb-6">Optional Add-ons</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {addons.map((addon) => (
                <div
                  key={addon.name}
                  className="flex items-center justify-between p-4 rounded-xl border border-border bg-card"
                >
                  <span className="text-sm text-primary">{addon.name}</span>
                  <span className="text-sm font-medium text-accent">{addon.price}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

/* ────────────────── Portfolio ────────────────── */
export function AnimatedPortfolioSection() {
  const projects = [
    {
      name: "The Corner Bakery",
      industry: "Food & Beverage",
      color: "from-amber-100 to-orange-50",
      scoreBefore: 28,
      scoreAfter: 91,
    },
    {
      name: "Atlas Fitness",
      industry: "Health & Fitness",
      color: "from-blue-100 to-indigo-50",
      scoreBefore: 35,
      scoreAfter: 94,
    },
    {
      name: "Greenleaf Dental",
      industry: "Healthcare",
      color: "from-emerald-100 to-teal-50",
      scoreBefore: 22,
      scoreAfter: 96,
    },
    {
      name: "Ironwork Studio",
      industry: "Creative Agency",
      color: "from-zinc-200 to-stone-100",
      scoreBefore: 41,
      scoreAfter: 93,
    },
  ];

  return (
    <section id="portfolio" className="py-24 lg:py-32 mesh-gradient">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <span className="text-xs font-medium text-accent tracking-widest uppercase mb-4 block">
            Portfolio
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            Sites we&apos;ve built
          </h2>
        </FadeIn>

        <StaggerChildren staggerDelay={0.12} className="grid sm:grid-cols-2 gap-8">
          {projects.map((project) => (
            <StaggerItem key={project.name}>
              <motion.div
                className="group portfolio-card rounded-2xl overflow-hidden border border-border bg-card hover:border-accent/30 transition-all duration-500"
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                data-cursor="view"
              >
                {/* Screenshot placeholder with dot pattern */}
                <div
                  className={`aspect-[16/10] bg-gradient-to-br ${project.color} relative overflow-hidden`}
                >
                  {/* Dot pattern background */}
                  <div className="absolute inset-0 dot-pattern opacity-60" />

                  {/* Score badge */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-white/80 shadow-lg">
                    <span className="text-xs font-medium text-red-400 line-through">
                      {project.scoreBefore}
                    </span>
                    <svg className="w-3 h-3 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span className="text-xs font-bold text-accent">{project.scoreAfter}</span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 rounded-lg bg-white/60 shadow-2xl border border-white/80 flex items-center justify-center backdrop-blur-sm">
                      <div className="text-center px-6">
                        {/* Mini wireframe */}
                        <div className="w-8 h-8 rounded-md bg-accent/20 mx-auto mb-3" />
                        <div className="w-16 h-1.5 bg-primary/20 rounded-full mx-auto mb-2" />
                        <div className="w-24 h-1 bg-primary/10 rounded-full mx-auto mb-1.5" />
                        <div className="w-20 h-1 bg-primary/10 rounded-full mx-auto mb-4" />
                        <div className="flex gap-2 justify-center">
                          <div className="w-10 h-6 rounded bg-accent/15" />
                          <div className="w-10 h-6 rounded bg-primary/5" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-all duration-500" />
                </div>

                {/* Info */}
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-heading text-lg">{project.name}</h3>
                    <span className="text-xs text-muted">{project.industry}</span>
                  </div>
                  <span className="text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                    View Live Site
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

/* ───────────────── Testimonials ───────────────── */
export function AnimatedTestimonialsSection() {
  const testimonials = [
    {
      quote:
        "We went from a dated WordPress site to a modern, blazing-fast website in under 24 hours. Our conversion rate doubled in the first month.",
      name: "Sarah Chen",
      business: "Peak Performance Gym",
      role: "Owner",
    },
    {
      quote:
        "I was skeptical about the 24-hour promise, but they delivered. The site looks like something a $50K agency would build.",
      name: "Marcus Rivera",
      business: "Urban Eats",
      role: "Founder",
    },
    {
      quote:
        "The free preview sold me. I could see exactly what my new site would look like before spending a cent. No other agency does this.",
      name: "Dr. Emily Foster",
      business: "Greenleaf Dental",
      role: "Practice Owner",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <span className="text-xs font-medium text-accent tracking-widest uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            What our clients say
          </h2>
        </FadeIn>

        <StaggerChildren staggerDelay={0.15} className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <StaggerItem key={i}>
              <div className="testimonial-card rounded-2xl border border-border bg-card p-8 h-full flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <svg
                      key={j}
                      className="w-4 h-4 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-sm leading-relaxed text-primary/80 mb-6 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-accent font-heading text-sm">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary">{t.name}</p>
                    <p className="text-xs text-muted">
                      {t.role}, {t.business}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
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
      a: "Yes. Business and Premium plans include a content management system (CMS) that lets you edit text, images, and blog posts without touching code. We also offer a $49/mo plan where we handle all updates for you.",
    },
  ];

  return (
    <section id="faq" className="py-24 lg:py-32 mesh-gradient">
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

/* ────────────────── CTA Section ────────────────── */
export function AnimatedCTASection() {
  return (
    <section className="py-24 lg:py-32 bg-primary relative overflow-hidden">
      {/* Subtle accent glow */}
      <ParallaxLayer speed={0.3} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-accent/10 blur-3xl rounded-full" />
      </ParallaxLayer>

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <FadeIn>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-surface tracking-tight mb-6">
            Ready to see what your
            <br />
            new site looks like?
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="text-surface/60 text-lg mb-10 max-w-xl mx-auto">
            Fill out a quick form. Get a free preview in 24 hours. No payment required.
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
          <p className="text-surface/30 text-sm mt-6">
            100% satisfaction guarantee. Full refund if you&apos;re not happy.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
