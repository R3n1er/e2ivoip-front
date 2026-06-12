"use client";

import { HomepageHeroSectionSimple } from "@/components/homepage-hero-section-simple";
import { TransformationSection } from "@/components/transformation-section";
import { ServicesSectionSimple } from "@/components/services-section-simple";
import { AboutSectionSimple } from "@/components/about-section-simple";
import { ContactSectionSimple } from "@/components/contact-section-simple";

export function HomePageContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="relative">
        <HomepageHeroSectionSimple />
        <TransformationSection />
        <AboutSectionSimple />
        <ServicesSectionSimple />
        <ContactSectionSimple />
      </div>
    </div>
  );
}
