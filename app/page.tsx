import { HomepageHeroSectionSimple } from "@/components/homepage-hero-section-simple";
import { TransformationSection } from "@/components/transformation-section";
import { ClientsCarousel } from "@/components/clients-carousel";
import { PartnersSection } from "@/components/partners-section";
import { ServicesSectionSimple } from "@/components/services-section-simple";
import { StatsSection } from "@/components/stats-section";
import { ContactSectionSimple } from "@/components/contact-section-simple";

export const metadata = {
  title: "E2I VoIP - Solutions de téléphonie IP professionnelles",
  description:
    "Opérateur télécom & intégrateur VoIP pour PME et groupes multisites. Trunk SIP, 3CX, Assistants IA — spécialiste DOM (Guyane, Martinique, Guadeloupe, Réunion).",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <HomepageHeroSectionSimple />
      <TransformationSection />
      <ClientsCarousel />
      <PartnersSection />
      <ServicesSectionSimple />
      <StatsSection />
      <ContactSectionSimple />
    </main>
  );
}
