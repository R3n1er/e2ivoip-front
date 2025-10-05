import { Metadata } from "next";
// Tawk.to désactivé temporairement
import { ProblemSolutionSection } from "@/components/problem-solution-section";
import { PricingTiers } from "@/components/pricing-tiers";
import { TestimonialsSection } from "@/components/testimonial-card";
import { GeographicAdvantage } from "@/components/geographic-advantage";
import { CTACalendarSection } from "@/components/cta-calendar-section";

export const metadata: Metadata = {
  title:
    "3CX PRO Cloud - Solution Téléphonique d'Entreprise qui Révolutionne vos Communications | E2I VoIP",
  description:
    "Transformez votre téléphonie d'entreprise avec 3CX PRO : solution cloud dédiée, tarification transparente par appels simultanés, intégrations CRM et WhatsApp Business. Expertise DOM-TOM.",
  keywords:
    "3CX PRO, téléphonie cloud entreprise, standard téléphonique cloud, IPBX hébergé, calls simultanés, WhatsApp Business, CRM intégré, téléphonie DOM-TOM",
  openGraph: {
    title: "3CX PRO Cloud - Solution Téléphonique d'Entreprise | E2I VoIP",
    description:
      "Révolutionnez vos communications avec 3CX PRO. Solution cloud dédiée, tarification transparente, expertise DOM-TOM. Démonstration gratuite.",
    type: "website",
  },
};

export default function ThreeCXCloudPage() {
  // Données pour les composants
  const problems = [
    {
      icon: "phone-error",
      title: "Saturation d'appels",
      description:
        "Vos clients potentiels fuient à cause des lignes occupées et de l'impossibilité de vous joindre aux heures de pointe.",
    },
    {
      icon: "dollar",
      title: "Coûts téléphoniques explosifs",
      description:
        "Votre facture téléphonique augmente sans transparence, avec des frais cachés et une tarification complexe.",
    },
    {
      icon: "warning",
      title: "Obsolescence technique",
      description:
        "L'arrêt du réseau cuivre approche et votre système actuel devient obsolète face aux nouveaux enjeux technologiques.",
    },
    {
      icon: "map",
      title: "Sites multiples non centralisés",
      description:
        "Impossible de centraliser les communications entre vos sites éloignés, créant des silos de communication.",
    },
    {
      icon: "cog",
      title: "Absence d'intégrations",
      description:
        "Aucune intégration avec vos outils CRM et Office 365, obligeant vos équipes à travailler en mode cloisonné.",
    },
  ];

  const solutions = [
    {
      icon: "cloud",
      title: "Serveur cloud dédié",
      description:
        "Instance dédiée dans le cloud garantissant performances optimales et sécurité maximale.",
      highlight: "AWS EU",
    },
    {
      icon: "dollar-sign",
      title: "Tarification transparente",
      description:
        "Vous payez uniquement pour votre capacité réelle d'appels simultanés, pas pour chaque collaborateur.",
      highlight: "40% d'économies",
    },
    {
      icon: "shield",
      title: "Hébergement souverain France/UE",
      description:
        "Vos données restent en Europe sur notre infrastructure redondée, conformité RGPD garantie.",
    },
    {
      icon: "award",
      title: "Expertise certifiée 3CX",
      description:
        "Partenaire Silver 3CX maîtrisant les configurations complexes et le Call Flow Designer (CFD).",
    },
    {
      icon: "phone",
      title: "Minimum 8 appels simultanés",
      description:
        "Solution parfaite pour les entreprises exigeantes nécessitant une capacité d'appels professionnelle.",
    },
  ];

  const pricingTiers = [
    {
      calls: 8,
      title: "TPE Dynamiques",
      description: "Parfait pour les petites entreprises dynamiques",
      features: [
        "8 lignes simultanées",
        "Multi-appareils",
        "WhatsApp Business",
        "Support local",
      ],
    },
    {
      calls: 16,
      title: "PME Multi-sites",
      description: "Idéal pour les PME avec plusieurs sites",
      features: [
        "16 lignes simultanées",
        "Intégrations CRM",
        "Files d'attente",
        "Tableau de bord",
      ],
      highlighted: true,
      badge: "Populaire",
    },
    {
      calls: 24,
      title: "Entreprises en croissance",
      description: "Adapté aux structures en développement",
      features: [
        "24 lignes simultanées",
        "IA intégrée",
        "Multi-sites",
        "Customer Success Manager",
      ],
    },
    {
      calls: 32,
      title: "Structures importantes",
      description: "Pour les entreprises établies",
      features: [
        "32 lignes simultanées",
        "Configuration avancée",
        "SLA prioritaire",
        "Formation équipes",
      ],
    },
    {
      calls: 64,
      title: "Haute capacité",
      description: "Solution enterprise complète",
      features: [
        "64 lignes simultanées",
        "Architectures complexes",
        "Support dédié",
        "Consulting inclus",
      ],
    },
  ];

  const testimonials = [
    {
      company: "Titeca BEAUPORT Finance",
      description:
        "Gestionnaire des bijouteries Eurogold aux Antilles-Guyane. Solution multi-sites parfaitement adaptée à nos besoins avec une centralisation entre les DOM et la Métropole.",
      users: "90+",
      solution: "Multi-sites",
      industry: "Bijouteries / Finance",
    },
  ];

  const locations = [
    {
      region: "Guyane",
      phone: "0594 963 500",
      features: [
        "Support technique local",
        "Installation sur site",
        "Maintenance préventive",
      ],
    },
    {
      region: "Guadeloupe",
      phone: "0590 173 500",
      features: ["Équipe dédiée", "Formation utilisateurs", "Support réactif"],
    },
    {
      region: "Martinique",
      phone: "0596 313 500",
      features: [
        "Techniciens certifiés",
        "Suivi personnalisé",
        "Intervention rapide",
      ],
    },
    {
      region: "La Réunion",
      phone: "+262 263 085 500",
      features: [
        "Accompagnement local",
        "Support multi-sites",
        "Expertise DOM",
      ],
    },
    {
      region: "France Métropolitaine",
      phone: "0189 563 500",
      features: [
        "Coordination nationale",
        "Support technique",
        "Supervision centralisée",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section avec dégradé standardisé */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/photos/3CX-On-Premise-Solution.webp"
            alt="3CX PRO - Solution téléphonique d'entreprise cloud"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dégradé Hero uniforme standardisé */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 pointer-events-none z-10"></div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">3CX</span>{" "}
              <span className="text-red-400">PRO</span>
            </h1>
            <p className="text-2xl md:text-3xl mb-4 font-bold">
              La Solution Téléphonique Cloud d'Entreprise qui Révolutionne vos
              Communications
            </p>
            <p className="text-xl md:text-2xl mb-8 font-medium opacity-90 max-w-3xl mx-auto">
              Transformez votre téléphonie d'entreprise avec une solution
              moderne, évolutive et parfaitement intégrée à vos outils métier
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#calendrier"
                className="btn btn-lg bg-red-primary text-white border-0 shadow-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold min-w-[300px] relative overflow-hidden group"
              >
                <span className="flex items-center justify-center">
                  <i className="lni lni-calendar mr-2 text-lg"></i>
                  Réserver ma démonstration gratuite
                  <i className="lni lni-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
                </span>
                <div className="absolute inset-0 bg-black opacity-0 group-active:opacity-10 transition-opacity duration-150"></div>
              </a>
              <a
                href="/devis-en-ligne"
                className="btn btn-lg bg-white/10 text-white border-2 border-white/60 backdrop-blur-sm shadow-xl hover:bg-white hover:text-red-primary hover:border-white hover:scale-105 transition-all duration-300 font-semibold min-w-[250px] relative overflow-hidden group"
              >
                <span className="flex items-center justify-center">
                  <i className="lni lni-calculator mr-2 text-lg"></i>
                  Calculer mes économies
                  <i className="lni lni-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
                </span>
                <div className="absolute inset-0 bg-black opacity-0 group-active:opacity-10 transition-opacity duration-150"></div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section Problèmes vs Solutions */}
      <ProblemSolutionSection problems={problems} solutions={solutions} />

      {/* Section Intégrations et fonctionnalités avancées */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Des Intégrations qui{" "}
              <span className="text-red-600">Décuplent</span> votre Efficacité
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connectez tous vos outils pour une expérience unifiée
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* WhatsApp Business */}
            <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group">
              {/* Gradient border top - Bleu marine vers gris */}
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-500"></div>

              {/* Background pattern subtil */}
              <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232D3848' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                  }}
                ></div>
              </div>

              <div className="relative p-6">
                {/* Icon avec style amélioré */}
                <div className="relative mb-4">
                  <div className="relative w-16 h-16 bg-gradient-to-br from-gray-100 via-gray-50 to-white rounded-xl flex items-center justify-center shadow-lg mx-auto group-hover:shadow-xl transition-shadow">
                    <i className="lni lni-whatsapp text-3xl text-gray-800"></i>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center group-hover:text-red-primary transition-colors">
                  WhatsApp Business
                </h3>
                <p className="text-gray-secondary text-center mb-4 text-sm leading-relaxed">
                  Centralisez vos conversations WhatsApp directement dans votre
                  standard téléphonique
                </p>

                {/* Badge en bas */}
                <div className="text-center">
                  <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full">
                    <i className="lni lni-checkmark-circle mr-1"></i>
                    Intégration native
                  </span>
                </div>
              </div>
            </div>

            {/* CRM Connecté */}
            <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group">
              {/* Gradient border top - Rouge vers orange */}
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-red-primary via-red-500 to-orange-500"></div>

              {/* Background pattern subtil */}
              <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E53E3E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                  }}
                ></div>
              </div>

              <div className="relative p-6">
                {/* Icon avec style amélioré */}
                <div className="relative mb-4">
                  <div className="relative w-16 h-16 bg-gradient-to-br from-red-100 via-red-50 to-white rounded-xl flex items-center justify-center shadow-lg mx-auto group-hover:shadow-xl transition-shadow">
                    <i className="lni lni-database text-3xl text-red-primary"></i>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center group-hover:text-red-primary transition-colors">
                  CRM Connecté
                </h3>
                <p className="text-gray-secondary text-center mb-4 text-sm leading-relaxed">
                  HubSpot, Zoho, Salesforce, Organilog - Historique complet
                  affiché automatiquement
                </p>

                {/* Badge en bas */}
                <div className="text-center">
                  <span className="inline-flex items-center px-3 py-1 bg-red-50 text-red-primary text-xs font-semibold rounded-full">
                    <i className="lni lni-link mr-1"></i>
                    Multi-CRM
                  </span>
                </div>
              </div>
            </div>

            {/* Microsoft 365 */}
            <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group">
              {/* Gradient border top - Gris secondaire */}
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-gray-500 via-gray-400 to-gray-300"></div>

              {/* Background pattern subtil */}
              <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23818096' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                  }}
                ></div>
              </div>

              <div className="relative p-6">
                {/* Icon avec style amélioré */}
                <div className="relative mb-4">
                  <div className="relative w-16 h-16 bg-gradient-to-br from-gray-100 via-gray-50 to-white rounded-xl flex items-center justify-center shadow-lg mx-auto group-hover:shadow-xl transition-shadow">
                    <i className="lni lni-microsoft text-3xl text-gray-secondary"></i>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center group-hover:text-red-primary transition-colors">
                  Microsoft 365
                </h3>
                <p className="text-gray-secondary text-center mb-4 text-sm leading-relaxed">
                  Synchronisation complète avec calendriers, contacts et Teams.
                  Appels depuis Outlook
                </p>

                {/* Badge en bas */}
                <div className="text-center">
                  <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full">
                    <i className="lni lni-sync mr-1"></i>
                    Sync complète
                  </span>
                </div>
              </div>
            </div>

            {/* IA Intégrée */}
            <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group">
              {/* Gradient border top - Mix rouge et gris */}
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-gray-800 via-red-primary to-gray-500"></div>

              {/* Background pattern subtil */}
              <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232D3848' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                  }}
                ></div>
              </div>

              <div className="relative p-6">
                {/* Icon avec style amélioré */}
                <div className="relative mb-4">
                  <div className="relative w-16 h-16 bg-gradient-to-br from-red-50 via-gray-50 to-white rounded-xl flex items-center justify-center shadow-lg mx-auto group-hover:shadow-xl transition-shadow">
                    <i className="lni lni-brain text-3xl text-red-primary"></i>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center group-hover:text-red-primary transition-colors">
                  IA Intégrée
                </h3>
                <p className="text-gray-secondary text-center mb-4 text-sm leading-relaxed">
                  Transcription automatique via Google Speech ou OpenAI Whisper.
                  Données exploitables
                </p>

                {/* Badge en bas */}
                <div className="text-center">
                  <span className="inline-flex items-center px-3 py-1 bg-red-50 text-red-primary text-xs font-semibold rounded-full">
                    <i className="lni lni-bulb mr-1"></i>
                    IA avancée
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Tarification */}
      <PricingTiers tiers={pricingTiers} />

      {/* Section Témoignages */}
      <TestimonialsSection testimonials={testimonials} />

      {/* Section Avantage géographique */}
      <GeographicAdvantage locations={locations} />

      {/* Section CTA avec Calendrier */}
      <div id="calendrier">
        <CTACalendarSection />
      </div>
    </div>
  );
}
