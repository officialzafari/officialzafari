import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import { person } from "@/lib/data";

const siteUrl = `https://${person.domain}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${person.name} | ${person.title}`,
    template: `%s | ${person.name}`,
  },
  description:
    "وبسایت شخصی علی ظفری مقدم، دانشجوی دکتری اقتصاد از مشهد. پژوهشگر در حوزه توسعه اقتصادی، برنامه‌ریزی اقتصادی و اقتصاد رفتاری. تجربیات کاری، تحصیلات و مقالات تخصصی.",
  keywords: [
    // فارسی — اصلی
    "علی ظفری مقدم",
    "ظفری مقدم",
    "علی ظفری",
    "اقتصاددان",
    "دانشجوی دکتری اقتصاد",
    "دکتری اقتصاد",
    "توسعه اقتصادی",
    "برنامه‌ریزی اقتصادی",
    "اقتصاد رفتاری",
    "اقتصادسنجی",
    "اقتصاد ایران",
    "برندینگ شخصی",
    "مشهد",
    "دانشگاه فردوسی مشهد",
    "دانشگاه علامه طباطبایی",
    "پژوهشگر اقتصاد",
    "تحلیل اقتصادی",
    // انگلیسی — برای سرچ انگلیسی
    "Ali Zafari Moghaddam",
    "Ali Zafari",
    "Zafari Moghaddam",
    "Iran Economist",
    "Economics PhD Student",
    "Economic Development Researcher",
    "Ferdowsi University of Mashhad",
    "Iran Economics Blog",
  ],
  authors: [{ name: person.name, url: siteUrl }],
  creator: person.name,
  publisher: person.name,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/profile.jpg",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "profile",
    locale: "fa_IR",
    alternateLocale: ["en_US"],
    url: siteUrl,
    title: `${person.name} | ${person.title}`,
    description: `وبسایت شخصی ${person.name}، ${person.title} از ${person.city}. پژوهشگر اقتصاد توسعه.`,
    siteName: person.name,
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: `${person.name} — ${person.title}`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${person.name} | ${person.title}`,
    description: `وبسایت شخصی ${person.name}، ${person.title} از ${person.city}.`,
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    types: {
      "application/rss+xml": `${siteUrl}/feed.xml`,
    },
  },
};

// Schema.org Person — برای غنی‌سازی نتایج گوگل
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  alternateName: ["Ali Zafari Moghaddam", "علی ظفری مقدم"],
  jobTitle: person.title,
  description:
    "اقتصاددان و دانشجوی دکتری اقتصاد از مشهد، ایران. پژوهشگر در حوزه توسعه اقتصادی، برنامه‌ریزی اقتصادی و اقتصاد رفتاری.",
  email: `mailto:${person.email}`,
  telephone: person.phone,
  url: siteUrl,
  image: `${siteUrl}/profile.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: person.city,
    addressCountry: "IR",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "دانشگاه فردوسی مشهد",
      sameAs: "https://www.um.ac.ir",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "دانشگاه علامه طباطبایی",
      sameAs: "https://www.atu.ac.ir",
    },
  ],
  knowsAbout: [
    "اقتصاد",
    "توسعه اقتصادی",
    "برنامه‌ریزی اقتصادی",
    "اقتصاد رفتاری",
    "اقتصادسنجی",
    "اقتصاد ایران",
    "Economics",
    "Economic Development",
    "Behavioral Economics",
  ],
  knowsLanguage: ["fa", "en"],
  sameAs: [siteUrl],
};

// Schema.org WebSite — برای کمک به گوگل در درک سایت
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${person.name} — وبسایت شخصی`,
  alternateName: `${person.name} — Personal Website`,
  url: siteUrl,
  inLanguage: ["fa-IR", "en"],
  description:
    "وبسایت شخصی علی ظفری مقدم، دانشجوی دکتری اقتصاد. مقالات، پژوهش‌ها و تجربیات حرفه‌ای در حوزه اقتصاد.",
  publisher: {
    "@type": "Person",
    name: person.name,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen flex flex-col bg-parchment">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
