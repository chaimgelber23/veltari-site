import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pristinesite.com"),
  title: {
    default: "Pristine Site — Custom Websites in 24 Hours",
    template: "%s | Pristine Site",
  },
  description:
    "Premium custom websites delivered in 24 hours. No templates. No waiting. Built to convert. 100% satisfaction guarantee.",
  keywords: [
    "custom website",
    "web design agency",
    "24 hour website",
    "premium web design",
    "fast website builder",
    "professional website",
    "business website",
    "website redesign",
  ],
  authors: [{ name: "Pristine Site" }],
  creator: "Pristine Site",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pristinesite.com",
    siteName: "Pristine Site",
    title: "Pristine Site — Custom Websites in 24 Hours",
    description:
      "Premium custom websites delivered in 24 hours. No templates. No waiting. Built to convert.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pristine Site — Custom Websites in 24 Hours",
    description:
      "Premium custom websites delivered in 24 hours. No templates. No waiting. Built to convert.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${dmSerif.variable} ${inter.variable} antialiased bg-surface text-primary`}
      >
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black">Skip to content</a>
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
