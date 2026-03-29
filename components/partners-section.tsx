"use client";

const partners = [
  {
    name: "3CX",
    logo: "/images/logos-sip-compatibility/logo-3cx.webp",
    width: 100,
  },
  {
    name: "Yeastar",
    logo: "/images/logos-sip-compatibility/Yeastar_Logo.webp",
    width: 130,
  },
  {
    name: "SFR Business",
    logo: "/images/logos-clients/lofo-SFR-black-optimize.png",
    width: 80,
  },
  {
    name: "Fanvil",
    logo: "/images/logo-partners/Fanvil-Logo-PNG-300x117.webp",
    width: 120,
  },
  {
    name: "Yealink",
    logo: "/images/logo-partners/logo-yealink.webp",
    width: 120,
  },
  {
    name: "3CX Silver Partner",
    logo: "/images/logo-3CX-partner-e2i/3cx-Silver-Partner-badge.webp",
    width: 80,
  },
];

export function PartnersSection() {
  return (
    <section className="py-20 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre */}
        <div className="text-center mb-14">
          <h2 className="text-sm font-black uppercase tracking-[-0.04em] text-[#091421] mb-2">
            Nos Partenaires Technologiques
          </h2>
          <p className="text-xs text-gray-secondary uppercase tracking-[0.3em]">
            Des certifications reconnues pour une intégration de qualité
          </p>
        </div>

        {/* Logos */}
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16 opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center"
              title={partner.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={partner.logo}
                alt={`Partenaire ${partner.name}`}
                width={partner.width}
                className="object-contain max-h-10 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
