import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Pristine Site privacy policy. What information we collect, how we use it, and how to contact us about your data.",
};

export default function PrivacyPolicy() {
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

        <h1 className="font-heading text-4xl sm:text-5xl tracking-tight mb-4">Privacy Policy</h1>
        <p className="text-sm text-muted mb-12">Last updated: April 27, 2026</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="font-heading text-2xl mt-0 mb-3">The short version</h2>
            <p className="text-primary/80 leading-relaxed">
              We collect the minimum we need to build your website and contact you about it.
              We don&apos;t sell your data. We don&apos;t share it with anyone outside the
              vendors that help us deliver our service. You can ask us to delete everything
              we have on you at any time and we&apos;ll do it.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl mb-3">What we collect</h2>
            <ul className="list-disc pl-6 space-y-2 text-primary/80 leading-relaxed">
              <li>The information you give us in the project intake form (name, email, business name, brand details).</li>
              <li>Files you upload as part of your build (logos, photos, copy).</li>
              <li>Standard website analytics — page views and source — via Vercel&apos;s built-in analytics. No cross-site tracking, no advertising cookies.</li>
              <li>Email address if you contact us via the form or hello@pristinesite.com.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl mb-3">How we use it</h2>
            <ul className="list-disc pl-6 space-y-2 text-primary/80 leading-relaxed">
              <li>To deliver the website you ordered.</li>
              <li>To send you updates and revisions during the build.</li>
              <li>To send you receipts and (optional) follow-up surveys.</li>
              <li>To improve our service in aggregate (which heroes convert best, etc.) — never with personally identifying data.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl mb-3">Vendors we use</h2>
            <p className="text-primary/80 leading-relaxed mb-3">
              We use a small number of trusted vendors that process limited data on our behalf:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-primary/80 leading-relaxed">
              <li><strong>Vercel</strong> — hosting + analytics</li>
              <li><strong>Stripe</strong> — payments (we never see your card number)</li>
              <li><strong>Resend</strong> — email delivery</li>
            </ul>
            <p className="text-primary/80 leading-relaxed mt-3">
              Each has its own privacy policy you can review on their site.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl mb-3">Your rights</h2>
            <p className="text-primary/80 leading-relaxed">
              Email <a href="mailto:hello@pristinesite.com" className="text-accent hover:text-accent-light">hello@pristinesite.com</a> to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-primary/80 leading-relaxed mt-2">
              <li>See what data we have on you</li>
              <li>Correct anything that&apos;s wrong</li>
              <li>Delete your account and all associated data</li>
              <li>Opt out of any non-transactional emails</li>
            </ul>
            <p className="text-primary/80 leading-relaxed mt-3">
              We respond to data requests within 30 days, usually within 48 hours.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl mb-3">Changes</h2>
            <p className="text-primary/80 leading-relaxed">
              If we materially change this policy we&apos;ll email everyone we have on file with a clear summary
              of what changed and when it takes effect. The current version is always at this URL.
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
