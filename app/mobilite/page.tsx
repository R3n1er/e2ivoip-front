import { Metadata } from "next";
import { MobilityHeroSection } from "@/components/mobility-hero-section";
import { MobilityServicesSection } from "@/components/mobility-services-section";
import { MobilityBackupSection } from "@/components/mobility-backup-section";
import { ContactSection } from "@/components/contact-section";

export const metadata: Metadata = {
  title: "Solutions de Mobilité 4G/5G | Téléphonie Mobile Entreprise | E2I VoIP",
  description: "Solutions complètes de téléphonie mobile 4G/5G pour entreprises : voix, data, backups internet avec modems routeurs. Connectivité fiable partout.",
  keywords: "téléphonie mobile, 4G, 5G, backup internet, modem routeur, voix data, entreprise, connectivité mobile",
  openGraph: {
    title: "Solutions de Mobilité 4G/5G | E2I VoIP",
    description: "Solutions complètes de téléphonie mobile et backup internet pour entreprises",
    type: "website",
  },
};

export default function MobilitePage() {
  return (
    <main className="min-h-screen">
      <MobilityHeroSection />
      <MobilityServicesSection />
      <MobilityBackupSection />
      <ContactSection />
    </main>
  );
}