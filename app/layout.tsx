import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { LayoutClientChrome } from "@/components/layout/layout-client-chrome";
import { Footer } from "@/components/layout/footer";
// Tawk.to désactivé temporairement (on conserve uniquement HubSpot Conversations)
// import { TawkTo } from "@/components/tawk-to";

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
  title: "E2I VoIP - Solutions de téléphonie IP professionnelles",
  description:
    "Solutions de téléphonie IP professionnelles pour optimiser vos communications d'entreprise. Trunk SIP, 3CX, PBX Yeastar et interconnexion agents vocaux IA.",
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
      <head />
      <body
        className={`${inter.variable} ${plexMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <LayoutClientChrome>{children}</LayoutClientChrome>
        <Footer />
      </body>
    </html>
  );
}
