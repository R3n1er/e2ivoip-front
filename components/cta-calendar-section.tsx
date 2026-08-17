"use client";

import { HubSpotCalendar } from "@/components/hubspot/legacy/hubspot-calendar";

export function CTACalendarSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-3xl font-black tracking-[-0.04em] text-gray-dark md:text-4xl">
            Parlons de votre projet 3CX
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            Présentez-nous votre installation, vos sites et vos usages. Nous vous aiderons à choisir la capacité adaptée.
          </p>
        </div>

        <HubSpotCalendar
          meetingUrl="https://meetings-eu1.hubspot.com/alban-renier"
          title=""
          description=""
          height={650}
          showContactInfo={false}
        />
      </div>
    </section>
  );
}
