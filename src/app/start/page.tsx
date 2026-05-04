"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";

const industries = [
  "Restaurant / Food & Beverage",
  "Healthcare / Medical",
  "Real Estate",
  "Fitness / Wellness",
  "Legal / Law Firm",
  "Construction / Trades",
  "Retail / E-commerce",
  "Creative / Agency",
  "Technology / SaaS",
  "Education",
  "Other",
];

const projectTypes = [
  "Brand new website",
  "Redesign existing site",
  "Add pages to existing site",
  "Landing page",
  "E-commerce store",
];

export default function StartPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    websiteUrl: "",
    industry: "",
    projectType: "",
    email: "",
    phone: "",
    details: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would POST to an API endpoint
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main id="main" className="min-h-screen bg-surface">
        <Navigation />
        <div className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-lg text-center">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl mb-4">
              We&apos;re on it.
            </h1>
            <p className="text-muted text-lg mb-8 leading-relaxed">
              We&apos;ll review your details and send you a free preview within
              minutes. Keep an eye on your inbox.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-muted border border-border rounded-xl hover:bg-card-hover transition-all duration-200"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="main" className="min-h-screen bg-surface">
      <Navigation />

      <div className="max-w-3xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-medium text-accent tracking-widest uppercase mb-4 block">
            Start Your Project
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
            Tell us about your business
          </h1>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Fill out the form below and we&apos;ll send you a free preview of your
            new website within minutes.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business Name + Website URL */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="businessName"
                className="block text-sm font-medium text-primary mb-2"
              >
                Business Name <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
                placeholder="Acme Inc."
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-primary text-sm placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
              />
            </div>

            <div>
              <label
                htmlFor="websiteUrl"
                className="block text-sm font-medium text-primary mb-2"
              >
                Current Website URL{" "}
                <span className="text-muted text-xs">(if any)</span>
              </label>
              <input
                type="url"
                id="websiteUrl"
                name="websiteUrl"
                value={formData.websiteUrl}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-primary text-sm placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
              />
            </div>
          </div>

          {/* Industry + Project Type */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="industry"
                className="block text-sm font-medium text-primary mb-2"
              >
                Industry <span className="text-accent">*</span>
              </label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200 appearance-none"
              >
                <option value="">Select your industry</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="projectType"
                className="block text-sm font-medium text-primary mb-2"
              >
                What do you need? <span className="text-accent">*</span>
              </label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200 appearance-none"
              >
                <option value="">Select project type</option>
                {projectTypes.map((pt) => (
                  <option key={pt} value={pt}>
                    {pt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Email + Phone */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-primary mb-2"
              >
                Email Address <span className="text-accent">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@company.com"
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-primary text-sm placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-primary mb-2"
              >
                Phone <span className="text-muted text-xs">(optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 000-0000"
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-primary text-sm placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
              />
            </div>
          </div>

          {/* Details */}
          <div>
            <label
              htmlFor="details"
              className="block text-sm font-medium text-primary mb-2"
            >
              Tell us about your business{" "}
              <span className="text-muted text-xs">(optional)</span>
            </label>
            <textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleChange}
              rows={5}
              placeholder="What does your business do? What kind of feel or style are you going for? Any websites you admire?"
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-primary text-sm placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200 resize-none"
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 text-base font-medium text-white bg-accent hover:bg-accent-light rounded-xl transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30"
            >
              Get Your Free Preview
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>

          {/* Trust note */}
          <div className="flex items-start gap-3 pt-2">
            <svg
              className="w-5 h-5 text-accent shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
            <p className="text-sm text-muted">
              We&apos;ll send you a free preview within minutes. No payment
              required. No spam, ever.
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
