import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Qui sommes-nous | E2I VoIP — Operateur telecom DOM depuis 15 ans",
  description:
    "E2I VoIP : operateur de services telecom DOM, 15 ans d'expertise, 100+ clients. Trunk SIP, 3CX, support local Martinique, Guadeloupe, Guyane. Economisez 30% sur vos couts telecoms.",
  keywords:
    "E2I VoIP, operateur telecom DOM, telephonie IP Antilles, 3CX Martinique, Trunk SIP Guadeloupe, VoIP Guyane, telephonie Reunion, support local DOM",
  alternates: {
    canonical: "/qui-sommes-nous",
  },
  openGraph: {
    title: "Qui sommes-nous | E2I VoIP — Operateur telecom DOM",
    description:
      "Operateur de services telecom DOM depuis 15 ans. Support local, 100+ clients satisfaits. Economisez 30% sur vos couts telecoms.",
    url: "/qui-sommes-nous",
    siteName: "E2I VoIP",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "E2I VoIP",
  url: "https://www.e2i-voip.com",
  description:
    "Operateur de services telecom DOM specialise en telephonie IP, Trunk SIP et solutions 3CX pour les entreprises des Antilles, Guyane et Reunion.",
  foundingDate: "2010",
  areaServed: [
    { "@type": "AdministrativeArea", name: "Martinique" },
    { "@type": "AdministrativeArea", name: "Guadeloupe" },
    { "@type": "AdministrativeArea", name: "Guyane francaise" },
    { "@type": "AdministrativeArea", name: "La Reunion" },
    { "@type": "Country", name: "France" },
  ],
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+594594963500", contactType: "customer service", areaServed: "Guyane francaise", availableLanguage: "French" },
    { "@type": "ContactPoint", telephone: "+590590173500", contactType: "customer service", areaServed: "Guadeloupe", availableLanguage: "French" },
    { "@type": "ContactPoint", telephone: "+596596313500", contactType: "customer service", areaServed: "Martinique", availableLanguage: "French" },
    { "@type": "ContactPoint", telephone: "+33189560500", contactType: "customer service", areaServed: "France", availableLanguage: "French" },
  ],
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

export default function QuiSommesNous() {
  const teamMembers = [
    { name: "Alban", role: "Directeur & Customer Success Manager", image: "/images/team/alban-renier.jpg" },
    { name: "Valerie", role: "Assistante Commerciale", image: "/images/team/valerie-de-jesus.jpg" },
    { name: "Fabien", role: "Technicien VoIP", image: "/images/team/fabien.jpg" },
  ];

  const locations = [
    { name: "Guyane", phone: "0594 96 35 00", icon: "lni-map-marker" },
    { name: "Guadeloupe", phone: "0590 173 500", icon: "lni-map-marker" },
    { name: "Martinique", phone: "0596 313 500", icon: "lni-map-marker" },
    { name: "La Reunion", phone: "0262 263 085 500", icon: "lni-map-marker" },
    { name: "France Metropole", phone: "01 89 56 35 00", icon: "lni-world" },
  ];

  return (
    <>
      <JsonLdScript />

      {/* ══════════════════════════════════════
          SECTION 1 — HERO (image fond + Stitch)
          ══════════════════════════════════════ */}
      <section className="relative min-h-[819px] flex items-center overflow-hidden bg-[#091421]">
        <div className="absolute inset-0">
          <img
            src="/images/photos/pexels-polina-tankilevitch-5234774.webp"
            alt="Equipe E2I VoIP - Experts telecom DOM"
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-20"
          />
          <div className="absolute inset-0 bg-[#091421]/70 pointer-events-none" />
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, #E53E3E 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-8 lg:px-24 py-20">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-[-0.05em] leading-[0.9] text-white mb-8 uppercase">
            Votre operateur de services telecom{" "}
            <span className="text-red-primary">DOM</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl leading-relaxed mb-4">
            15 ans d&apos;expertise &bull; 100+ entreprises nous font confiance &bull; Support local reactif
          </p>
          <p className="text-lg text-white/70 max-w-2xl mb-10">
            Economisez jusqu&apos;a 30% sur vos couts telecoms avec nos solutions de telephonie IP
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/devis-en-ligne" className="bg-red-primary text-white px-10 py-5 font-black uppercase tracking-[0.2em] text-xs border-4 border-red-primary shadow-[8px_8px_0px_0px_rgba(229,62,62,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(229,62,62,0.3)] transition-all">
              Demander un devis
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 2 — PRESENTATION
          ══════════════════════════════════════ */}
      <section className="py-32 bg-white px-8 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-5xl font-black tracking-[-0.05em] uppercase mb-24 flex items-center gap-4 text-blue-marine">
                <span className="w-12 h-1 bg-red-primary inline-block"></span>
                L&apos;HISTOIRE D&apos;UNE REUSSITE LOCALE
              </h2>
              <p className="text-lg text-gray-500 mb-6 leading-relaxed">
                <strong className="text-blue-marine">Depuis maintenant plusieurs annees, E2I VoIP</strong>{" "}
                est un operateur de services telecom avec des Trunk SIP dedies
                aux Antilles-Guyane et La Reunion. Nous avons accompagne plus de{" "}
                <strong className="text-blue-marine">100 entreprises</strong> dans leur transformation
                digitale, leur permettant d&apos;economiser en moyenne{" "}
                <strong className="text-blue-marine">30% sur leurs couts telecoms</strong>.
              </p>
              <p className="text-lg text-gray-500 mb-6 leading-relaxed">
                <strong className="text-blue-marine">Notre mission :</strong> Faciliter votre transition vers
                la telephonie IP dans le contexte de l&apos;arret du reseau cuivre.
                Nous transformons cette contrainte en opportunite pour
                moderniser vos communications et{" "}
                <strong className="text-blue-marine">reduire vos couts</strong>.
              </p>
              <p className="text-lg text-gray-500 leading-relaxed">
                <strong className="text-blue-marine">Notre difference :</strong> Des equipes techniques
                presentes localement en Martinique, Guadeloupe et Guyane. Un
                Customer Success Manager dedie qui connait vos besoins
                specifiques. Une assistance en francais, dans votre fuseau
                horaire, avec une connaissance parfaite du contexte des regions
                des DOM (Antilles, Guyane, Reunion).
              </p>
            </div>
            <div>
              <div className="bg-white border-4 border-blue-marine p-12 shadow-[12px_12px_0px_0px_#1F2937]">
                <div className="text-center">
                  <div className="w-24 h-24 bg-red-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="lni lni-phone text-5xl text-white"></i>
                  </div>
                  <h3 className="text-2xl font-black tracking-[-0.04em] text-blue-marine mb-4">
                    Operateur telecom certifie
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Partenaire Silver 3CX &bull; Certifie Yeastar Cloud et On-Premise &bull; Trunk SIP dedies DOM
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-black text-red-primary">100+</div>
                      <div className="text-gray-500 text-xs font-bold uppercase tracking-wider">Clients satisfaits</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-blue-marine">15+</div>
                      <div className="text-gray-500 text-xs font-bold uppercase tracking-wider">Annees d&apos;expertise</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 3 — VALEURS ET ENGAGEMENTS
          ══════════════════════════════════════ */}
      <section className="bg-[#091421] py-32 px-8 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <h2 className="text-5xl md:text-7xl font-black tracking-[-0.05em] uppercase text-red-primary max-w-xl leading-none">
              NOS VALEURS ET ENGAGEMENTS
            </h2>
            <p className="text-white/60 max-w-sm uppercase text-sm tracking-widest font-bold">
              Proximite, expertise et resultats concrets pour votre entreprise.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            <div className="bg-[#121c2a] border border-white/10 p-16 hover:bg-[#1a2536] transition-colors">
              <i className="lni lni-target text-5xl text-red-primary mb-8 block"></i>
              <h4 className="text-3xl font-black text-white mb-6 uppercase tracking-tight">Proximite et reactivite</h4>
              <p className="text-white/60 leading-relaxed">
                Equipes locales en France, Martinique, Guadeloupe et Guyane.
                Reponse en moins de 2h, intervention rapide sur site si necessaire.
              </p>
            </div>
            <div className="bg-[#1a2536] border border-white/10 p-16 hover:bg-[#212b39] transition-colors">
              <i className="lni lni-certificate text-5xl text-red-primary mb-8 block"></i>
              <h4 className="text-3xl font-black text-white mb-6 uppercase tracking-tight">Excellence technique</h4>
              <p className="text-white/60 leading-relaxed">
                Partenaire Silver 3CX, certifie Yeastar. Maitrise des
                dernieres technologies VoIP et integrations WhatsApp,
                Microsoft Teams, CRM, IA, Microsoft 365.
              </p>
            </div>
            <div className="bg-[#212b39] border border-white/10 p-16 hover:bg-[#2b3544] transition-colors">
              <i className="lni lni-users text-5xl text-red-primary mb-8 block"></i>
              <h4 className="text-3xl font-black text-white mb-6 uppercase tracking-tight">Resultats garantis</h4>
              <p className="text-white/60 leading-relaxed">
                Economies de 30% garanties sur vos factures telecom. Customer
                Success Manager dedie pour assurer votre satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 4 — ILS NOUS FONT CONFIANCE
          ══════════════════════════════════════ */}
      <section className="bg-white py-32 px-8 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black tracking-[-0.05em] uppercase text-blue-marine mb-4">
              ILS NOUS FONT CONFIANCE
            </h2>
            <div className="w-24 h-2 bg-red-primary mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="aspect-video bg-gray-50 flex items-center justify-center p-8 border border-gray-100 hover:border-red-primary transition-colors">
              <Image
                src="/images/logo-partners/Bronze Partner badge-min.jpeg"
                alt="3CX Silver Partner"
                width={160}
                height={90}
                className="grayscale contrast-125 opacity-70 hover:grayscale-0 hover:opacity-100 transition-all object-contain"
              />
            </div>
            <div className="aspect-video bg-gray-50 flex items-center justify-center p-8 border border-gray-100 hover:border-red-primary transition-colors">
              <Image
                src="/images/logo-partners/yeastar-certified-expert-ysce-icon.png"
                alt="Yeastar Certified Expert"
                width={160}
                height={90}
                className="grayscale contrast-125 opacity-70 hover:grayscale-0 hover:opacity-100 transition-all object-contain"
              />
            </div>
            <div className="aspect-video bg-gray-50 flex items-center justify-center p-8 border border-gray-100 hover:border-red-primary transition-colors">
              <Image
                src="/images/logo-partners/Fanvil-Logo-PNG-300x117.webp"
                alt="Fanvil - Distributeur officiel"
                width={160}
                height={90}
                className="grayscale contrast-125 opacity-70 hover:grayscale-0 hover:opacity-100 transition-all object-contain"
              />
            </div>
            <div className="aspect-video bg-gray-50 flex items-center justify-center p-8 border border-gray-100 hover:border-red-primary transition-colors">
              <Image
                src="/images/logo-partners/logo-yealink.webp"
                alt="Yealink - Distributeur officiel"
                width={160}
                height={90}
                className="grayscale contrast-125 opacity-70 hover:grayscale-0 hover:opacity-100 transition-all object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 5 — SOLUTIONS PHARES + CAS CLIENT
          ══════════════════════════════════════ */}
      <section className="py-32 bg-white px-8 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            <div>
              <h2 className="text-5xl font-black tracking-[-0.05em] uppercase mb-12 flex items-center gap-4 text-blue-marine">
                <span className="w-12 h-1 bg-red-primary inline-block"></span>
                NOS SOLUTIONS PHARES
              </h2>
              <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                <strong className="text-blue-marine">Trunk SIP eligibles DOM</strong> : Au compteur ou
                illimite, des 2 utilisateurs. Creation et portabilite de numeros
                locaux incluses.{" "}
                <strong className="text-blue-marine">Economisez jusqu&apos;a 30%</strong> par rapport a la
                telephonie traditionnelle.
              </p>

              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="w-10 h-10 bg-red-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="lni lni-checkmark-circle text-xl text-white"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase text-blue-marine mb-2">
                      Trunk SIP au compteur ou illimite
                    </h3>
                    <p className="text-gray-500 leading-relaxed">
                      <strong className="text-blue-marine">Au compteur :</strong> Payez uniquement vos
                      consommations, ideal TPE/PME.
                      <strong className="text-blue-marine"> Illimite :</strong> Budget fixe, appels illimites
                      France + DOM. Tarifs preferentiels speciaux Antilles-Guyane-Reunion.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-10 h-10 bg-red-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="lni lni-checkmark-circle text-xl text-white"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase text-blue-marine mb-2">
                      3CX : IPBX cloud nouvelle generation
                    </h3>
                    <p className="text-gray-500 leading-relaxed">
                      <strong className="text-blue-marine">3CX SMB :</strong> Des 3 utilisateurs,
                      15&euro;/mois/utilisateur.
                      <strong className="text-blue-marine"> 3CX PRO :</strong> Instance dediee +50 postes,
                      integrations CRM/M365. Formation incluse, Customer Success Manager dedie.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-10 h-10 bg-red-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="lni lni-checkmark-circle text-xl text-white"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase text-blue-marine mb-2">
                      Services innovants inclus
                    </h3>
                    <p className="text-gray-500 leading-relaxed">
                      <strong className="text-blue-marine">Assistants vocaux IA</strong> pour accueil 24/7.
                      <strong className="text-blue-marine"> Integrations</strong> WhatsApp, Teams, CRM.
                      <strong className="text-blue-marine"> Collaboration unifiee</strong> pour vos equipes.
                      Studio d&apos;enregistrement pour messages professionnels.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cas client */}
            <div className="bg-white border-4 border-blue-marine p-12 shadow-[12px_12px_0px_0px_#1F2937] relative">
              <span className="absolute -top-5 -left-3 text-[10px] font-black uppercase tracking-[0.3em] bg-red-primary text-white px-4 py-2">
                CAS CLIENT
              </span>
              <h3 className="text-3xl font-black uppercase text-blue-marine mb-6 mt-4">
                Titeca BEAUPORT Finance
              </h3>
              <p className="text-gray-500 mb-4 leading-relaxed">
                Le Groupe TBF gere des magasins sur la Guadeloupe, La
                Martinique et la Guyane dans le secteur de l&apos;horlogerie et la
                joaillerie. Connu plus particulierement avec l&apos;enseigne
                Eurogold, Grain d&apos;Or et Callas aux Antilles et les bijouteries
                Buirettes en Guyane.
              </p>
              <p className="text-blue-marine font-black text-lg mb-6">
                60+ utilisateurs migres vers 3CX PRO — Instance dediee cloud
              </p>
              <div className="space-y-3 border-t-4 border-blue-marine pt-6">
                <p className="text-gray-500 flex items-center">
                  <span className="w-3 h-3 bg-red-primary mr-4 flex-shrink-0"></span>
                  <strong className="text-blue-marine">-30% sur les couts telecoms</strong>
                </p>
                <p className="text-gray-500 flex items-center">
                  <span className="w-3 h-3 bg-red-primary mr-4 flex-shrink-0"></span>
                  Parc de postes telephoniques Fanvil
                </p>
                <p className="text-gray-500 flex items-center">
                  <span className="w-3 h-3 bg-red-primary mr-4 flex-shrink-0"></span>
                  Collaboration fluide pour tous les collaborateurs
                </p>
                <p className="text-gray-500 flex items-center">
                  <span className="w-3 h-3 bg-red-primary mr-4 flex-shrink-0"></span>
                  Support local reactif sur 3 departements (Guadeloupe, Martinique, Guyane)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 6 — EQUIPE
          ══════════════════════════════════════ */}
      <section className="py-32 bg-gray-50 px-8 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-5xl font-black tracking-[-0.05em] uppercase text-blue-marine mb-4"
              data-testid="team-section-title"
            >
              Une equipe{" "}
              <span className="text-red-primary">locale et experte</span>
            </h2>
            <div className="w-24 h-2 bg-red-primary mx-auto mb-6"></div>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto">
              Des experts presents localement pour un accompagnement personnalise
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-0 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white border-4 border-blue-marine p-12 text-center shadow-[8px_8px_0px_0px_#1F2937]">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <i className="lni lni-user text-5xl text-gray-400"></i>
                </div>
                <h3 className="text-2xl font-black uppercase text-blue-marine mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-500 uppercase text-sm tracking-widest font-bold">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 7 — CERTIFICATIONS ET PARTENARIATS
          ══════════════════════════════════════ */}
      <section className="py-32 bg-white px-8 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black tracking-[-0.05em] uppercase text-blue-marine mb-4">
              Nos{" "}
              <span className="text-red-primary">certifications et partenariats</span>
            </h2>
            <div className="w-24 h-2 bg-red-primary mx-auto mb-6"></div>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto">
              Partenaire Silver 3CX &bull; Certifie Yeastar &bull; Distributeur officiel Fanvil &amp; Yealink
            </p>
          </div>

          {/* Certifications principales */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            <div className="bg-white border-4 border-blue-marine p-12 shadow-[12px_12px_0px_0px_#1F2937] text-center">
              <div className="mb-6">
                <Image
                  src="/images/logo-partners/Bronze Partner badge-min.jpeg"
                  alt="Logo 3CX Bronze Partner - Certification officielle E2I VoIP"
                  width={120}
                  height={120}
                  className="mx-auto"
                />
              </div>
              <h3 className="font-black text-xl tracking-[-0.04em] text-blue-marine mb-2">3CX Silver Partner</h3>
              <p className="text-gray-500 mb-4">
                Expertise CFD avancee et solutions IPBX cloud
              </p>
              <span className="inline-block bg-red-primary text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2">
                Partenaire Officiel
              </span>
            </div>

            <div className="bg-white border-4 border-blue-marine p-12 shadow-[12px_12px_0px_0px_#1F2937] text-center">
              <div className="mb-6">
                <Image
                  src="/images/logo-partners/yeastar-certified-expert-ysce-icon.png"
                  alt="Logo Yeastar Certified Expert - Certification officielle E2I VoIP"
                  width={120}
                  height={120}
                  className="mx-auto"
                />
              </div>
              <h3 className="font-black text-xl tracking-[-0.04em] text-blue-marine mb-2">Certifie Yeastar</h3>
              <p className="text-gray-500 mb-4">
                Solutions economiques pour PME et entreprises
              </p>
              <span className="inline-block bg-blue-marine text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2">
                Expert Certifie
              </span>
            </div>
          </div>

          {/* Partenaires materiels */}
          <div className="bg-gray-50 p-12 border-4 border-gray-200">
            <h3 className="text-3xl font-black tracking-[-0.05em] text-blue-marine mb-12 text-center uppercase">
              Nos{" "}
              <span className="text-red-primary">partenaires materiels</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white border-4 border-blue-marine p-8 shadow-[8px_8px_0px_0px_#1F2937] text-center">
                <div className="mb-6">
                  <Image
                    src="/images/logo-partners/Fanvil-Logo-PNG-300x117.webp"
                    alt="Logo Fanvil - Partenaire officiel E2I VoIP pour telephones SIP"
                    width={200}
                    height={80}
                    className="mx-auto"
                  />
                </div>
                <h4 className="text-xl font-black text-blue-marine mb-3 uppercase">Fanvil</h4>
                <p className="text-gray-500 mb-4">
                  Distributeur officiel des telephones SIP haute qualite et accessoires
                </p>
                <span className="inline-block bg-gray-secondary text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 mb-4">
                  Distributeur Officiel
                </span>
                <div>
                  <a
                    href="https://www.fanvil.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-primary hover:text-[#091421] transition-colors text-xs font-black uppercase tracking-[0.2em]"
                  >
                    Visiter le site officiel &rarr;
                  </a>
                </div>
              </div>

              <div className="bg-white border-4 border-blue-marine p-8 shadow-[8px_8px_0px_0px_#1F2937] text-center">
                <div className="mb-6">
                  <Image
                    src="/images/logo-partners/logo-yealink.webp"
                    alt="Logo Yealink - Partenaire officiel E2I VoIP pour solutions de communication unifiee"
                    width={200}
                    height={80}
                    className="mx-auto"
                  />
                </div>
                <h4 className="text-xl font-black text-blue-marine mb-3 uppercase">Yealink</h4>
                <p className="text-gray-500 mb-4">
                  Distributeur officiel des solutions de communication unifiee
                </p>
                <span className="inline-block bg-[#091421] text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 mb-4">
                  Distributeur Officiel
                </span>
                <div>
                  <a
                    href="https://www.yealink.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-primary hover:text-[#091421] transition-colors text-xs font-black uppercase tracking-[0.2em]"
                  >
                    Visiter le site officiel &rarr;
                  </a>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-500 text-sm uppercase tracking-widest font-bold">
                Tous nos partenaires sont selectionnes pour leur qualite et leur fiabilite
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 8 — CONTACT PAR REGION
          ══════════════════════════════════════ */}
      <section className="bg-[#091421] py-32 px-8 lg:px-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, #E53E3E 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black tracking-[-0.05em] uppercase text-white mb-4">
              Support local <span className="text-red-primary">24/7</span>
            </h2>
            <div className="w-24 h-2 bg-red-primary mx-auto mb-6"></div>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Equipes techniques presentes localement en Guadeloupe et en Guyane
              &bull; Reponse rapide en moins de 2h &bull; Intervention sur site
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
            {locations.map((location, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 p-8 text-center hover:bg-white/10 transition-colors"
              >
                <div className="bg-white/10 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <i className={`lni ${location.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-lg font-black text-white mb-2 uppercase tracking-tight">
                  {location.name}
                </h3>
                <p className="text-white/80 text-sm font-bold">
                  {location.phone}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-white text-xl mb-10 font-bold">
              Hotline Assistance technique : 01 89 56 05 00
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-red-primary text-white px-10 py-5 font-black uppercase tracking-[0.2em] text-xs border-4 border-red-primary shadow-[8px_8px_0px_0px_rgba(229,62,62,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(229,62,62,0.3)] transition-all"
              >
                Nous contacter
              </Link>
              <Link
                href="/assistance"
                className="bg-white text-[#091421] px-10 py-5 font-black uppercase tracking-[0.2em] text-xs border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] transition-all"
              >
                Acceder au support complet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 9 — CTA FINALE
          ══════════════════════════════════════ */}
      <section className="bg-red-primary py-24 px-8 text-center border-y-8 border-blue-marine">
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
          Pret a economiser 30% sur vos couts telecoms ?
        </h2>
        <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto">
          Audit gratuit de votre installation &bull; Devis personnalise en 24h &bull; Migration sans interruption
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/devis-en-ligne"
            className="inline-block bg-white border-4 border-blue-marine px-12 py-6 font-black uppercase text-xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all text-blue-marine"
          >
            Calculez vos economies
          </Link>
          <Link
            href="/contact"
            className="inline-block bg-[#091421] border-4 border-blue-marine px-12 py-6 font-black uppercase text-xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all text-white"
          >
            Parler a un expert
          </Link>
        </div>
      </section>
    </>
  );
}
