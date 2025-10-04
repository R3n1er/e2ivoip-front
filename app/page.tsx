import { HomepageHeroSectionSimple } from "@/components/homepage-hero-section-simple";
import { TransformationSection } from "@/components/transformation-section";
import { ServicesSectionSimple } from "@/components/services-section-simple";
import { AboutSectionSimple } from "@/components/about-section-simple";
import { ClientsCarousel } from "@/components/clients-carousel";
import { TestimonialsSectionSimple } from "@/components/testimonials-section-simple";
import { ContactSectionSimple } from "@/components/contact-section-simple";
import { ChatPreOverlay } from "@/components/chat-preoverlay";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        <HomepageHeroSectionSimple />
        <TransformationSection />
        <ClientsCarousel />
        <AboutSectionSimple />
        <ServicesSectionSimple />
        <ContactSectionSimple />
      </div>

      <ChatPreOverlay />
    </div>
  );
}
