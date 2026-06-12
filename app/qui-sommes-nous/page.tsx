import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SafeImage as Image } from "@/components/ui/safe-image";
import { SecureEmail } from "@/components/secure-email";
import { CTAButton, CTAButtonMarine, CTAButtonSecondary } from "@/components/ui/cta-button";
import { MapPin, Globe, Phone, Target, Seal, Users, CheckCircle, UserCircle } from '@/lib/icons';
// Tawk.to désactivé temporairement

export const metadata: Metadata = {
  title: "Qui sommes-nous - E2I VoIP | Opérateur télécom DOM depuis 15 ans",
  description:
    "E2I VoIP : Opérateur de services télécom DOM, 15 ans d'expertise. Trunk SIP, 3CX, support par mail et téléphone — Martinique, Guadeloupe, Guyane. -20% sur le coût de vos communications.",
  keywords:
    "E2I VoIP, opérateur télécom DOM, téléphonie IP Antilles, 3CX Martinique, Trunk SIP Guadeloupe, VoIP Guyane, téléphonie Réunion, support local DOM",
  openGraph: {
    title: "Qui sommes-nous - E2I VoIP | Opérateur télécom DOM",
    description:
      "Opérateur de services télécom DOM depuis 15 ans. Support par mail et téléphone. Économisez 20% sur le coût de vos communications.",
    type: "website",
  },
};

export default function QuiSommesNous() {
  const teamMembers = [
    {
      name: "Alban",
      role: "Directeur & Customer Success Manager",
      image: "/images/team/alban-renier.jpg",
    },
    {
      name: "Valerie",
      role: "Assistante Commerciale",
      image: "/images/team/valerie-de-jesus.jpg",
    },
    {
      name: "Fabien",
      role: "Technicien VoIP",
      image: "/images/team/fabien.jpg",
    },
  ];

  const locations = [
    { name: "Guyane", phone: "0594 96 35 00", Icon: MapPin },
    { name: "Guadeloupe", phone: "0590 173 500", Icon: MapPin },
    { name: "Martinique", phone: "0596 313 500", Icon: MapPin },
    { name: "La Réunion", phone: "0262 263 085 500", Icon: MapPin },
    { name: "France Métropole", phone: "0189 563 500", Icon: Globe },
  ];

  return (
    <>
      {/* Hero Section avec Image Stylisée */}
      <section className="relative py-20 overflow-hidden">
        {/* Image de fond avec overlay */}
        <div className="absolute inset-0">
          <img
            src="/images/photos/pexels-polina-tankilevitch-5234774.webp"
            alt="Équipe E2I VoIP - Experts télécom DOM"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient Overlay uniforme */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 pointer-events-none z-10"></div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Votre opérateur de services télécom{" "}
              <span className="text-white">DOM</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              15 ans d'expertise télécom • Support par mail et téléphone
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mt-4">
              Économisez 20% sur le coût des communications dans les DROM avec
              nos solutions de téléphonie IP
            </p>
          </div>
        </div>
      </section>

      {/* Section Présentation */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-6">
                L'histoire d'une{" "}
                <span className="text-red-primary">réussite locale</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                <strong>Depuis maintenant plusieurs années, E2I VoIP</strong>{" "}
                est un opérateur de services télécom avec des Trunk SIP dédiés
                aux Antilles-Guyane et La Réunion. Nous accompagnons les
                entreprises des DROM dans leur transformation digitale, en leur
                permettant d'économiser{" "}
                <strong>20% sur le coût de leurs communications</strong>.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                <strong>Notre mission :</strong> Faciliter votre transition vers
                la téléphonie IP dans le contexte de l'arrêt du réseau cuivre.
                Nous transformons cette contrainte en opportunité pour
                moderniser vos communications et{" "}
                <strong>réduire vos coûts</strong>.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                <strong>Notre différence :</strong> Des équipes techniques
                présentes localement en Martinique, Guadeloupe et Guyane. Un
                Customer Success Manager dédié qui connaît vos besoins
                spécifiques. Une assistance en français, dans votre fuseau
                horaire, avec une connaissance parfaite du contexte des régions
                des DOM (Antilles, Guyane, Réunion).
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-red-100 to-blue-100 rounded-2xl p-8 shadow-xl">
                <div className="text-center">
                  <div className="w-24 h-24 bg-red-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Phone size={24} className="text-5xl text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Opérateur télécom certifié
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Partenaire Silver 3CX • Certifié Yeastar Cloud et On-Premise
                    • Trunk SIP dédiés DOM
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold font-mono tabular-nums text-red-primary">
                        4
                      </div>
                      <div className="text-gray-600">Territoires DOM couverts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold font-mono tabular-nums text-blue-marine">
                        15
                      </div>
                      <div className="text-gray-600">Années d'expertise</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Nos Missions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-4">
              Nos{" "}
              <span className="text-red-primary">valeurs et engagements</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Proximité, expertise et résultats concrets pour votre entreprise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="bg-red-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Target size={32} className="text-red-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Proximité et réactivité
                </h3>
                <p className="text-gray-600">
                  Équipes locales en France, Martinique, Guadeloupe et Guyane.
                  Réponse en moins de 2h, intervention rapide sur site si
                  nécessaire.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="bg-blue-marine/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Seal size={32} className="text-blue-marine" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Excellence technique
                </h3>
                <p className="text-gray-600">
                  Partenaire Silver 3CX, certifié Yeastar. Maîtrise des
                  dernières technologies VoIP et intégrations WhatsApp,
                  Microsoft Teams, CRM, IA, Microsoft 365.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="bg-gray-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Users size={32} className="text-gray-secondary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Résultats garantis
                </h3>
                <p className="text-gray-600">
                  Économies de 20% garanties sur vos factures télécom. Customer
                  Success Manager dédié pour assurer votre satisfaction.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Cœur de métier */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-6">
                Nos <span className="text-red-primary">solutions phares</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                <strong>Trunk SIP éligibles DOM</strong> : Au compteur ou
                illimité, dès 2 utilisateurs. Création et portabilité de numéros
                locaux incluses.
                <strong>Économisez jusqu'à 20%</strong> par rapport à la
                téléphonie traditionnelle.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle size={32} className="text-red-primary mt-1 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Trunk SIP au compteur ou illimité
                    </h3>
                    <p className="text-gray-600">
                      <strong>Au compteur :</strong> Payez uniquement vos
                      consommations, idéal TPE/PME.
                      <strong> Illimité :</strong> Budget fixe, appels illimités
                      France + DOM. Tarifs préférentiels spéciaux
                      Antilles-Guyane-Réunion.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <CheckCircle size={32} className="text-red-primary mt-1 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      3CX : IPBX cloud nouvelle génération
                    </h3>
                    <p className="text-gray-600">
                      <strong>3CX SMB :</strong> Dès 3 utilisateurs,
                      15€/mois/utilisateur.
                      <strong> 3CX PRO :</strong> Instance dédiée +50 postes,
                      intégrations CRM/M365. Formation incluse, Customer Success
                      Manager dédié.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <CheckCircle size={32} className="text-red-primary mt-1 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Services innovants inclus
                    </h3>
                    <p className="text-gray-600">
                      <strong>Trunk SIP agents IA</strong> pour interconnexion
                      plateformes VAPI, Rounded, ElevenLabs.
                      <strong>Intégrations</strong> WhatsApp, Teams, CRM.
                      <strong>Collaboration unifiée</strong> pour vos équipes.
                      Studio d'enregistrement pour messages professionnels.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-red-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Cas client emblématique
              </h3>
              <div className="bg-white rounded-lg p-6">
                <h4 className="font-bold text-lg text-gray-900 mb-2">
                  Titeca BEAUPORT Finance
                </h4>
                <p className="text-gray-600 mb-4">
                  Le Groupe TBF gère des magasins sur la Guadeloupe, La
                  Martinique et la Guyane dans le secteur de l'horlogerie et la
                  joaillerie. Connu plus particulièrement avec l'enseigne
                  Eurogold, Grain d'Or et Callas aux Antilles et les bijouteries
                  Buirettes en Guyane.
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>60+ utilisateurs</strong> migrés vers 3CX PRO -
                  Instance dédiée cloud
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    ✓ <strong>-20% sur les coûts télécoms</strong>
                  </p>
                  <p className="text-sm text-gray-600">
                    ✓ Parc de postes téléphoniques Fanvil
                  </p>
                  <p className="text-sm text-gray-600">
                    ✓ Collaboration fluide pour tous les collaborateurs
                  </p>
                  <p className="text-sm text-gray-600">
                    ✓ Support par mail et téléphone sur 3 départements
                    (Guadeloupe, Martinique, Guyane)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Équipe */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              data-testid="team-section-title"
            >
              Une équipe{" "}
              <span className="text-red-primary">locale et experte</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des experts présents localement pour un accompagnement
              personnalisé
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index}>
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <UserCircle size={24} className="text-5xl text-gray-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-gray-600">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section Certification et Partenariats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-6">
              Nos{" "}
              <span className="text-red-primary">
                certifications et partenariats
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Partenaire Silver 3CX • Certifié Yeastar • Distributeur officiel
              Fanvil & Yealink
            </p>
          </div>

          {/* Certifications principales */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200">
              <div className="text-center">
                <div className="mb-6">
                  <Image
                    src="/images/logo-partners/Bronze Partner badge-min.jpeg"
                    alt="Logo 3CX Bronze Partner - Certification officielle E2I VoIP"
                    width={120}
                    height={120}
                    className="mx-auto rounded-lg"
                  />
                </div>
                <h3 className="font-bold text-xl mb-2">3CX Silver Partner</h3>
                <p className="text-gray-600 mb-4">
                  Expertise CFD avancée et solutions IPBX cloud
                </p>
                <Badge className="bg-red-primary text-white">
                  Partenaire Officiel
                </Badge>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200">
              <div className="text-center">
                <div className="mb-6">
                  <Image
                    src="/images/logo-partners/yeastar-certified-expert-ysce-icon.png"
                    alt="Logo Yeastar Certified Expert - Certification officielle E2I VoIP"
                    width={120}
                    height={120}
                    className="mx-auto"
                  />
                </div>
                <h3 className="font-bold text-xl mb-2">Certifié Yeastar</h3>
                <p className="text-gray-600 mb-4">
                  Solutions économiques pour PME et entreprises
                </p>
                <Badge className="bg-blue-marine text-white">
                  Expert Certifié
                </Badge>
              </div>
            </div>
          </div>

          {/* Logos des partenaires */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Nos{" "}
              <span className="text-red-primary">partenaires matériels</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* Fanvil */}
              <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
                <div className="mb-6">
                  <Image
                    src="/images/logo-partners/Fanvil-Logo-PNG-300x117.webp"
                    alt="Logo Fanvil - Partenaire officiel E2I VoIP"
                    width={200}
                    height={80}
                    className="mx-auto"
                  />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Fanvil</h4>
                <p className="text-gray-600 mb-4">
                  Distributeur officiel des téléphones SIP haute qualité et
                  accessoires
                </p>
                <Badge className="bg-gray-secondary text-white">
                  Distributeur Officiel
                </Badge>
                <div className="mt-4">
                  <a
                    href="https://www.fanvil.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-marine hover:text-blue-700 text-sm font-medium"
                  >
                    Visiter le site officiel →
                  </a>
                </div>
              </div>

              {/* Yealink */}
              <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
                <div className="mb-6">
                  <Image
                    src="/images/logo-partners/logo-yealink.webp"
                    alt="Logo Yealink - Partenaire officiel E2I VoIP"
                    width={200}
                    height={80}
                    className="mx-auto"
                  />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  Yealink
                </h4>
                <p className="text-gray-600 mb-4">
                  Distributeur officiel des solutions de communication unifiée
                </p>
                <Badge className="bg-gray-800 text-white">
                  Distributeur Officiel
                </Badge>
                <div className="mt-4">
                  <a
                    href="https://www.yealink.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-marine hover:text-blue-700 text-sm font-medium"
                  >
                    Visiter le site officiel →
                  </a>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600 text-sm">
                Tous nos partenaires sont sélectionnés pour leur qualité et leur
                fiabilité
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Contact par région */}
      <section className="py-16 bg-gradient-to-r from-red-primary to-blue-marine">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-white mb-4">
              Support par <span className="text-white">mail et téléphone</span>
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Équipes techniques présentes localement en Guadeloupe et en Guyane
              • Réponse rapide en moins de 2h • Intervention sur site
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {locations.map((location, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors"
              >
                <CardContent className="p-6 text-center">
                  <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <location.Icon size={24} className="text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {location.name}
                  </h3>
                  <p className="text-white/90 text-sm font-bold">
                    {location.phone}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-white text-lg mb-6">
              <strong>Hotline Assistance technique :</strong> 0189 560 500
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <SecureEmail
                address="sales"
                mode="mailto"
                className="text-white hover:text-white/80 transition-colors inline-flex items-center"
                label="Nous écrire"
              />
              <CTAButtonSecondary href="/assistance" icon="Chat">
                Accéder au support complet
              </CTAButtonSecondary>
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA finale */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-6">
            Prêt à <span className="text-red-primary">économiser 20%</span> sur
            vos coûts télécoms ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Audit gratuit de votre installation • Devis personnalisé en 24h •
            Migration sans interruption
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton href="/devis-en-ligne" icon="Calculator">
              Calculez vos économies
            </CTAButton>
            <CTAButtonMarine href="/contact" icon="Phone">
              Parler à un expert
            </CTAButtonMarine>
          </div>
        </div>
      </section>

      {/* Tawk.to désactivé */}
    </>
  );
}
