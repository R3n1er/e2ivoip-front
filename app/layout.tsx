import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HubSpotTracking } from "@/components/hubspot-tracking";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HotjarTracking } from "@/components/hotjar-tracking";
import { HeaderSimple } from "@/components/header-simple";
import { Footer } from "@/components/footer";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
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
        <QueryClientProvider client={queryClient}>
          <HubSpotTracking />
          <HotjarTracking />
          <HeaderSimple />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
