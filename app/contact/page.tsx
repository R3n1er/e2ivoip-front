import { Metadata } from "next";
import Link from "next/link";
import WorkingFAQ from "@/components/faq-working";
import { InlineContactForm } from "@/components/hubspot";

export const metadata: Metadata = {
  title: "Contact | E2I VoIP — Experts telephonie IP France & DOM",
  description:
    "Contactez nos experts VoIP pour votre projet de telephonie IP. Devis gratuit, support 24/7. Equipes locales en France, Martinique, Guadeloupe, Guyane, Reunion.",
  keywords:
    "contact E2I VoIP, expert telephonie IP, devis VoIP gratuit, support technique DOM, standard telephonique entreprise, 3CX Yeastar",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | E2I VoIP — Experts telephonie IP France & DOM",
    description:
      "Contactez nos experts VoIP pour votre projet de telephonie IP. Devis gratuit, support 24/7. Equipes locales partout en France.",
    url: "/contact",
    siteName: "E2I VoIP",
    type: "website",
  },
};


const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "E2I VoIP",
  "url": "https://www.e2i-voip.com/contact",
  "description": "Experts VoIP — Trunk SIP, 3CX, PBX. Devis gratuit, support. Equipes locales en France et DOM.",
  "telephone": "+33-1-89-56-05-00",
  "address": { "@type": "PostalAddress", "addressCountry": "FR" },
  "areaServed": [
    { "@type": "Country", "name": "France" },
    { "@type": "AdministrativeArea", "name": "Martinique" },
    { "@type": "AdministrativeArea", "name": "Guadeloupe" },
    { "@type": "AdministrativeArea", "name": "Guyane francaise" },
    { "@type": "AdministrativeArea", "name": "La Reunion" }
  ],
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.e2i-voip.com" },
      { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://www.e2i-voip.com/contact" }
    ]
  }
};

function JsonLdScript() {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function ContactPage() {
  const locations = [
    { name: "France", phone: "01 89 56 05 00", tel: "+33189560500", detail: "Siege Social" },
    { name: "Guyane", phone: "05 94 96 35 00", tel: "+594594963500", detail: "Cayenne - Bureau Regional" },
    { name: "Guadeloupe", phone: "+590 590 173 500", tel: "+590590173500", detail: "Pointe-a-Pitre - Agence" },
    { name: "Martinique", phone: "+596 596 313 500", tel: "+596596313500", detail: "Fort-de-France - Support" },
    { name: "La Reunion", phone: "+262 263 085 500", tel: "+262263085500", detail: "Saint-Denis" },
  ];

  return (
    <>
      <JsonLdScript />
      {/* ══════════════════════════════════════
          HERO — Stitch: aligne gauche, border-l-8
          ══════════════════════════════════════ */}
      <section className="relative h-[400px] flex items-center overflow-hidden bg-[#091421]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#091421]/80 z-10" />
          <img
            src="/images/photos/pexels-ketut-subiyanto-4559714-min.jpg"
            alt="Contact E2I VoIP - Experts telephonie IP"
            className="w-full h-full object-cover grayscale opacity-30"
          />
        </div>
        <div className="max-w-7xl mx-auto px-8 relative z-20 w-full">
          <div className="max-w-4xl border-l-8 border-red-primary pl-8">
            <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-4">
              CONTACTEZ NOS<br />EXPERTS VOIP
            </h1>
            <p className="text-red-primary font-bold tracking-[0.2em] uppercase text-sm">
              Solutions telecoms de haute precision
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FORMULAIRE + INFOS — Grid 7/5 Stitch
          ══════════════════════════════════════ */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Formulaire HubSpot */}
          <div className="lg:col-span-7">
            <h2 className="text-4xl font-black text-[#091421] uppercase tracking-tighter mb-12 flex items-center gap-4">
              <span className="w-12 h-[2px] bg-[#091421]"></span>
              DEMANDE DE CONTACT
            </h2>
            <div data-testid="contact-form-card">
              <InlineContactForm className="w-full" />
            </div>
          </div>

          {/* Infos de contact — 2 colonnes */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Hotline Support — fond sombre Stitch */}
              <div
                className="bg-[#091421] p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] relative overflow-hidden group"
                data-testid="hotline-card"
              >
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                  <i className="lni lni-customer text-6xl text-white"></i>
                </div>
                <h3 className="text-red-primary font-black uppercase tracking-widest text-[10px] mb-3">
                  HOTLINE SUPPORT
                </h3>
                <div className="text-white text-3xl font-black mb-2" data-testid="hotline-phone">
                  01 89 56 05 00
                </div>
                <p className="text-white/60 text-[10px] font-bold uppercase">
                  Lun-Ven 8h-18h
                </p>
              </div>

              {/* WhatsApp Business — fond blanc Stitch */}
              <div
                className="bg-white border-2 border-[#091421] p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group"
                data-testid="whatsapp-card"
              >
                <div className="absolute top-0 right-0 p-2 opacity-10">
                  <i className="lni lni-comments text-6xl text-[#091421]"></i>
                </div>
                <h3 className="text-[#091421] font-black uppercase tracking-widest text-[10px] mb-3">
                  WHATSAPP BUSINESS
                </h3>
                <div className="text-[#091421] text-3xl font-black mb-2" data-testid="whatsapp-phone">
                  05 94 96 35 00
                </div>
                <p className="text-gray-500 text-[10px] font-bold uppercase">
                  Support commercial
                </p>
              </div>
            </div>

            {/* Info complementaire */}
            <div className="bg-gray-50 p-10 border-l-4 border-red-primary">
              <h3 className="text-[#091421] font-black uppercase tracking-widest text-xs mb-4">
                NOS EXPERTS
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Notre equipe d&apos;experts est la pour vous accompagner dans
                vos projets de telephonie IP. Devis gratuit, audit de votre installation,
                migration sans interruption.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#091421] border border-[#091421] px-3 py-1">
                  Expert telephonie IP
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#091421] border border-[#091421] px-3 py-1">
                  Standard telephonique
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#091421] border border-[#091421] px-3 py-1">
                  Devis gratuit
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          IMPLANTATIONS — Stitch: fond tres sombre, border-l-4
          ══════════════════════════════════════ */}
      <section className="bg-[#050f1c] py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-16">
            <p className="text-red-primary font-black tracking-widest text-xs uppercase mb-2">Notre Reseau</p>
            <h2 className="text-5xl font-black text-white uppercase tracking-tighter">NOS IMPLANTATIONS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {locations.map((loc, index) => (
              <div
                key={index}
                className="bg-[#212b39] p-8 border-l-4 border-red-primary hover:bg-[#303a48] transition-colors group"
                data-testid={`location-${loc.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="mb-6">
                  <i className="lni lni-map-marker text-red-primary text-4xl"></i>
                </div>
                <h4 className="text-white text-xl font-black uppercase mb-2">{loc.name}</h4>
                <a
                  href={`tel:${loc.tel}`}
                  className="text-white/80 text-sm font-bold block mb-1 hover:text-white transition-colors"
                  data-testid={`phone-${loc.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {loc.phone}
                </a>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                  {loc.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FAQ — Stitch: fond blanc, composant existant
          ══════════════════════════════════════ */}
      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-4xl font-black text-[#091421] uppercase tracking-tighter mb-16 text-center">
            QUESTIONS FREQUENTES
          </h2>
          <WorkingFAQ />
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA — Stitch: fond rose, texte fonce
          ══════════════════════════════════════ */}
      <section className="bg-[#ffb3ad] text-[#68000a] py-20">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <h2 className="text-4xl md:text-5xl font-black uppercase leading-none">
            PRET A MODERNISER<br />VOTRE ARCHITECTURE ?
          </h2>
          <Link
            href="/devis-en-ligne"
            className="bg-[#091421] text-white px-12 py-5 font-black uppercase tracking-widest shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] transition-all"
          >
            COMMENCER ICI
          </Link>
        </div>
      </section>
    </>
  );
}
