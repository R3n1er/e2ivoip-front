import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { LayoutClientChrome } from "@/components/layout/layout-client-chrome";
import { Footer } from "@/components/layout/footer";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";
import { Analytics } from "@vercel/analytics/next";
// Police officielle E2I VoIP — Inter (cohérence avec le logo). Voir CHARTE_GRAPHIQUE.md
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

// Mono pour les données chiffrées (effet « télécom/data »)
const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  // metadataBase : résout toutes les URL relatives (OG images, canonical) en
  // URL absolues sur le domaine de prod. Sans lui, Next logge un warning et les
  // aperçus sociaux cassent.
  metadataBase: new URL(SITE_URL),
  // Favicon & icons : Next.js App Router auto-découvre app/favicon.ico,
  // app/icon.png (512×512) et app/apple-icon.png (180×180) — pas besoin de
  // références manuelles. Les anciens fichiers public/favicon-*.png restent
  // disponibles comme fallback pour les anciens navigateurs.
  title: {
    default: "E2I VoIP - Solutions de téléphonie IP professionnelles",
    // Les pages enfant qui définissent un title court héritent du suffixe marque.
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Solutions de téléphonie IP professionnelles pour optimiser vos communications d'entreprise. Trunk SIP, 3CX, PBX Yeastar et interconnexion agents vocaux IA.",
  keywords:
    "téléphonie IP, trunk SIP, 3CX, PBX Yeastar, communications d'entreprise, VoIP",
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  // Canonical par défaut = racine. Chaque page surcharge avec son propre chemin.
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "E2I VoIP - Solutions de téléphonie IP professionnelles",
    description:
      "Solutions de téléphonie IP professionnelles pour optimiser vos communications d'entreprise.",
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: "/images/e2i-voip-partage.png",
        width: 1200,
        height: 630,
        alt: "E2I VoIP — Opérateur de services télécom, spécialiste des DOM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "E2I VoIP - Solutions de téléphonie IP professionnelles",
    description:
      "Solutions de téléphonie IP professionnelles pour optimiser vos communications d'entreprise.",
    images: ["/images/e2i-voip-partage.png"],
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
        {/* Données structurées globales (entité + site) sur toutes les pages */}
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
      </head>
      <body
        className={`${inter.variable} ${plexMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <LayoutClientChrome>{children}</LayoutClientChrome>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
