import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import { person } from "@/lib/data";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${person.domain}`),
  title: {
    default: `${person.name} | ${person.title}`,
    template: `%s | ${person.name}`,
  },
  description:
    "وبسایت شخصی علی ظفری مقدم، دانشجوی دکتری اقتصاد. تجربیات کاری، تحصیلات و مهارت‌های تخصصی در حوزه اقتصاد و توسعه.",
  keywords: [
    "علی ظفری مقدم",
    "اقتصاددان",
    "دانشجوی دکتری اقتصاد",
    "توسعه اقتصادی",
    "برندینگ شخصی",
    "مشهد",
    "دانشگاه فردوسی مشهد",
    "Iran Economist",
    "Ali Zafari Moghaddam",
  ],
  authors: [{ name: person.name, url: `https://${person.domain}` }],
  creator: person.name,
  publisher: person.name,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: "/profile.jpg",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "profile",
    locale: "fa_IR",
    url: `https://${person.domain}`,
    title: `${person.name} | ${person.title}`,
    description: `وبسایت شخصی ${person.name}، ${person.title} از ${person.city}.`,
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
    description: `وبسایت شخصی ${person.name}، ${person.title}.`,
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
    },
  },
  alternates: {
    canonical: `https://${person.domain}`,
    types: {
      "application/rss+xml": `https://${person.domain}/feed.xml`,
    },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: person.title,
  email: `mailto:${person.email}`,
  telephone: person.phone,
  url: `https://${person.domain}`,
  image: `https://${person.domain}/profile.jpg`,
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
    "حل مسئله",
    "رهبری",
    "ارتباطات",
  ],
  knowsLanguage: ["fa", "en"],
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
