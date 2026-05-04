// ============================================================================
// JSON-LD structured data for pristinesite.com.
// Renders <script type="application/ld+json"> blocks that Google + AI search
// (ChatGPT, Perplexity, Claude) parse to identify the business, its service,
// and FAQ answers. Without these, structured-data score = 0/100.
//
// Server component — no "use client" — so the JSON is in the initial HTML.
// ============================================================================

const SITE_URL = "https://pristinesite.com";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Pristine Site",
    url: SITE_URL,
    description:
      "Premium custom websites delivered in minutes. No templates. No waiting. Built to convert. 100% money-back guarantee.",
    foundingDate: "2026",
    sameAs: [],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Pristine Site",
    url: SITE_URL,
    description:
      "Custom website design + development in minutes. Premium quality, money-back guaranteed.",
    publisher: {
      "@type": "Organization",
      name: "Pristine Site",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ServiceJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Custom Website Design and Development",
    provider: {
      "@type": "Organization",
      name: "Pristine Site",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    description:
      "Custom websites built in minutes. No templates. Premium design, free hosting, 100% money-back guarantee.",
    offers: [
      {
        "@type": "Offer",
        name: "Starter",
        description: "Custom one-page website with mobile-responsive design, contact form, basic SEO, and free hosting forever.",
        price: "499",
        priceCurrency: "USD",
        eligibleDuration: { "@type": "QuantitativeValue", value: 1, unitCode: "DAY" },
      },
      {
        "@type": "Offer",
        name: "Business",
        description: "Up to 5-page website with brand color customization, blog, advanced SEO, and free hosting forever.",
        price: "899",
        priceCurrency: "USD",
        eligibleDuration: { "@type": "QuantitativeValue", value: 1, unitCode: "DAY" },
      },
      {
        "@type": "Offer",
        name: "Premium",
        description: "Unlimited pages, custom animations, e-commerce ready, CMS, performance optimization.",
        price: "1999",
        priceCurrency: "USD",
        eligibleDuration: { "@type": "QuantitativeValue", value: 1, unitCode: "DAY" },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export function FAQPageJsonLd({ items }: { items: FaqEntry[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.answer,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
