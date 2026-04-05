import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HotjarTracking } from "@/components/hotjar-tracking";
import { HeaderSimple } from "@/components/layout/header-simple";
import { Footer } from "@/components/layout/footer";
import { ChatPreOverlay } from "@/components/chat-preoverlay";
import { PostHogProvider } from "@/lib/analytics/posthog-provider";
// Tawk.to désactivé temporairement (on conserve uniquement HubSpot Conversations)
// import { TawkTo } from "@/components/tawk-to";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E2I VoIP - Solutions de téléphonie IP professionnelles",
  description:
    "Solutions de téléphonie IP professionnelles pour optimiser vos communications d'entreprise. Trunk SIP, 3CX, PBX Yeastar et assistants vocaux IA.",
  keywords:
    "téléphonie IP, trunk SIP, 3CX, PBX Yeastar, communications d'entreprise, VoIP",
  authors: [{ name: "E2I VoIP" }],
  openGraph: {
    title: "E2I VoIP - Solutions de téléphonie IP professionnelles",
    description:
      "Solutions de téléphonie IP professionnelles pour optimiser vos communications d'entreprise.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "E2I VoIP - Solutions de téléphonie IP professionnelles",
    description:
      "Solutions de téléphonie IP professionnelles pour optimiser vos communications d'entreprise.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.e2i-voip.com/#website",
  name: "E2I VoIP",
  url: "https://www.e2i-voip.com",
  description:
    "Operateur telecom et integrateur VoIP pour PME et groupes multisites. Trunk SIP, 3CX, Assistants IA — specialiste DOM.",
  inLanguage: "fr-FR",
  publisher: {
    "@type": "Organization",
    "@id": "https://www.e2i-voip.com/#organization",
    name: "E2I VoIP",
    alternateName: "E2I Assistance",
    url: "https://www.e2i-voip.com",
    foundingDate: "2010",
    areaServed: ["FR", "GP", "MQ", "GF", "RE"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+33-1-89-56-05-00",
        contactType: "customer service",
        areaServed: "FR",
        availableLanguage: "French",
      },
      {
        "@type": "ContactPoint",
        telephone: "+594-594-963-500",
        contactType: "customer service",
        areaServed: "GF",
        availableLanguage: "French",
      },
      {
        "@type": "ContactPoint",
        telephone: "+590-590-173-500",
        contactType: "customer service",
        areaServed: "GP",
        availableLanguage: "French",
      },
      {
        "@type": "ContactPoint",
        telephone: "+596-596-313-500",
        contactType: "customer service",
        areaServed: "MQ",
        availableLanguage: "French",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className="scroll-smooth"
      data-theme="e2ivoip"
      suppressHydrationWarning
    >
      <head>
        <link
          href="https://cdn.lineicons.com/4.0/lineicons.css"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        {/* JSON-LD: WebSite + Organization structured data — static hardcoded object, no XSS risk */}
        {/* eslint-disable-next-line react/no-danger */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <PostHogProvider>
          <HotjarTracking />
          <HeaderSimple />
          <main className="flex-1 pt-20 lg:pt-24">{children}</main>
          <Footer />
          <ChatPreOverlay />
        </PostHogProvider>
      </body>
    </html>
  );
}
