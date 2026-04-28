import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Pristine Site terms of service. What we deliver, what we charge, the money-back guarantee, and the rules of working together.",
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-surface px-6 py-24 lg:py-32">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="text-sm text-muted hover:text-primary transition-colors inline-flex items-center gap-1.5 mb-8"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back home
        </Link>

        <h1 className="font-heading text-4xl sm:text-5xl tracking-tight mb-4">Terms of Service</h1>
        <p className="text-sm text-muted mb-12">Last updated: April 27, 2026</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="font-heading text-2xl mt-0 mb-3">The short version</h2>
            <p className="text-primary/80 leading-relaxed">
              You pay us, we build your site within 24 hours of receiving your brief. If you
              don&apos;t love it after revisions, you get your money back — full refund, no questions.
              You own everything we deliver. We don&apos;t lock you into hosting. Plain and simple.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl mb-3">What we deliver</h2>
            <ul className="list-disc pl-6 space-y-2 text-primary/80 leading-relaxed">
              <li>A custom-designed website matching the plan you purchased.</li>
              <li>Mobile-responsive across phone, tablet, and desktop.</li>
              <li>Hosting setup on Vercel&apos;s global edge network at no extra charge.</li>
              <li>Domain configuration help if you have your own domain.</li>
              <li>All source files (code, design assets, content) handed over to you.</li>
              <li>The number of revision rounds included in your plan.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl mb-3">The 24-hour delivery promise</h2>
            <p className="text-primary/80 leading-relaxed">
              We commit to delivering your initial design within 24 hours of receiving your complete
              project brief. &quot;Complete brief&quot; means the questions in the intake form are
              answered and any required assets (logo, photos, copy) are provided. If we miss
              the 24-hour window for reasons on our side, your build is free.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl mb-3">Money-back guarantee</h2>
            <p className="text-primary/80 leading-relaxed">
              If after the included revisions you&apos;re still not happy with the result, you get
              a full refund. No phone-call retention, no friction, no asking why. Email
              <a href="mailto:hello@pristinesite.com" className="text-accent hover:text-accent-light"> hello@pristinesite.com</a> with
              your order number and we process it within 5 business days.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl mb-3">What you own</h2>
            <p className="text-primary/80 leading-relaxed">
              On final payment, you own 100% of the code, design, and content we deliver. You can
              host it anywhere. You can hand it to a different developer. You can fork it, rewrite it,
              or print it on a t-shirt. It&apos;s yours.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl mb-3">What we expect from you</h2>
            <ul className="list-disc pl-6 space-y-2 text-primary/80 leading-relaxed">
              <li>You provide accurate brand info and any assets we need.</li>
              <li>You respond to questions within a reasonable window so we can hit the deadline.</li>
              <li>You hold the rights to anything you upload (logos, photos, copy).</li>
              <li>You don&apos;t ask us to build anything illegal, hateful, or designed to defraud.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl mb-3">Hosting</h2>
            <p className="text-primary/80 leading-relaxed">
              Free hosting on Vercel for the lifetime of the relationship. If you ever want to leave,
              we hand over the source files and you can deploy anywhere. No hostage-taking.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl mb-3">Limitation of liability</h2>
            <p className="text-primary/80 leading-relaxed">
              Our total liability for anything related to a project is capped at what you paid for that
              project. We&apos;re not liable for downstream issues like lost sales from third-party
              tools, downtime caused by your DNS provider, or anything else outside our control.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl mb-3">Changes</h2>
            <p className="text-primary/80 leading-relaxed">
              These terms apply to projects ordered after the &quot;last updated&quot; date above.
              Existing projects are governed by whatever terms were in effect when you ordered.
              Material changes get emailed to active customers with a clear summary.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl mb-3">Questions</h2>
            <p className="text-primary/80 leading-relaxed">
              Email <a href="mailto:hello@pristinesite.com" className="text-accent hover:text-accent-light">hello@pristinesite.com</a>.
              A real person reads everything that comes in.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
