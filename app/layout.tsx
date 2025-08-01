import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HubSpotTracking } from "@/components/hubspot-tracking";

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
  description: "Solutions de téléphonie IP professionnelles pour optimiser vos communications d'entreprise. Trunk SIP, 3CX, PBX Yeastar, mobilité et assistants vocaux IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HubSpotTracking />
        {children}
      </body>
    </html>
  );
}
