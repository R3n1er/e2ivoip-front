import dynamic from "next/dynamic";
import { HomepageHeroSectionSimple } from "@/components/homepage-hero-section-simple";
import { ClientsCarousel } from "@/components/clients-carousel";
import { ServicesSectionSimple } from "@/components/services-section-simple";
import { StatsSection } from "@/components/stats-section";
import { ContactSectionSimple } from "@/components/contact-section-simple";

const PartnersSection = dynamic(
  () => import("@/components/partners-section").then((mod) => mod.PartnersSection),
  { ssr: true }
);

export const metadata = {
  title: "E2I VoIP - Solutions de téléphonie IP professionnelles",
  description:
    "Opérateur télécom & intégrateur VoIP pour PME et groupes multisites. Trunk SIP, 3CX, Assistants IA — spécialiste DOM (Guyane, Martinique, Guadeloupe, Réunion).",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <HomepageHeroSectionSimple />
      <ClientsCarousel />
      <PartnersSection />
      <ServicesSectionSimple />
      <StatsSection />
      <ContactSectionSimple />
    </main>
  );
}
