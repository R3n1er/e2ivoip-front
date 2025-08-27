import { Metadata } from "next";
import { TawkTo } from "@/components/tawk-to";
import { ProblemSolutionSection } from "@/components/problem-solution-section";
import { PricingTiers } from "@/components/pricing-tiers";
import { TestimonialsSection } from "@/components/testimonial-card";
import { GeographicAdvantage } from "@/components/geographic-advantage";
import { CTACalendarSection } from "@/components/cta-calendar-section";

export const metadata: Metadata = {
  title: "3CX PRO Cloud - Solution Téléphonique d'Entreprise qui Révolutionne vos Communications | E2I VoIP",
  description: "Transformez votre téléphonie d'entreprise avec 3CX PRO : solution cloud dédiée, tarification transparente par appels simultanés, intégrations CRM et WhatsApp Business. Expertise DOM-TOM.",
  keywords: "3CX PRO, téléphonie cloud entreprise, standard téléphonique cloud, IPBX hébergé, calls simultanés, WhatsApp Business, CRM intégré, téléphonie DOM-TOM",
  openGraph: {
    title: "3CX PRO Cloud - Solution Téléphonique d'Entreprise | E2I VoIP",
    description: "Révolutionnez vos communications avec 3CX PRO. Solution cloud dédiée, tarification transparente, expertise DOM-TOM. Démonstration gratuite.",
    type: "website",
  },
};

export default function ThreeCXCloudPage() {
  // Données pour les composants
  const problems = [
    {
      icon: "phone-error",
      title: "Saturation d'appels",
      description: "Vos clients potentiels fuient à cause des lignes occupées et de l'impossibilité de vous joindre aux heures de pointe."
    },
    {
      icon: "dollar",
      title: "Coûts téléphoniques explosifs",
      description: "Votre facture téléphonique augmente sans transparence, avec des frais cachés et une tarification complexe."
    },
    {
      icon: "warning",
      title: "Obsolescence technique",
      description: "L'arrêt du réseau cuivre approche et votre système actuel devient obsolète face aux nouveaux enjeux technologiques."
    },
    {
      icon: "map",
      title: "Sites multiples non centralisés", 
      description: "Impossible de centraliser les communications entre vos sites éloignés, créant des silos de communication."
    },
    {
      icon: "cog",
      title: "Absence d'intégrations",
      description: "Aucune intégration avec vos outils CRM et Office 365, obligeant vos équipes à travailler en mode cloisonné."
    }
  ];

  const solutions = [
    {
      icon: "cloud",
      title: "Serveur cloud dédié",
      description: "Instance dédiée dans le cloud garantissant performances optimales et sécurité maximale.",
      highlight: "AWS EU"
    },
    {
      icon: "dollar-sign",
      title: "Tarification transparente",
      description: "Vous payez uniquement pour votre capacité réelle d'appels simultanés, pas pour chaque collaborateur.",
      highlight: "40% d'économies"
    },
    {
      icon: "shield",
      title: "Hébergement souverain France/UE",
      description: "Vos données restent en Europe sur notre infrastructure redondée, conformité RGPD garantie.",
    },
    {
      icon: "award",
      title: "Expertise certifiée 3CX",
      description: "Partenaire Silver 3CX maîtrisant les configurations complexes et le Call Flow Designer (CFD).",
    },
    {
      icon: "phone",
      title: "Minimum 8 appels simultanés",
      description: "Solution parfaite pour les entreprises exigeantes nécessitant une capacité d'appels professionnelle.",
    }
  ];

  const pricingTiers = [
    {
      calls: 8,
      title: "TPE Dynamiques",
      description: "Parfait pour les petites entreprises dynamiques",
      features: ["8 lignes simultanées", "Multi-appareils", "WhatsApp Business", "Support local"],
    },
    {
      calls: 16,
      title: "PME Multi-sites",
      description: "Idéal pour les PME avec plusieurs sites",
      features: ["16 lignes simultanées", "Intégrations CRM", "Files d'attente", "Tableau de bord"],
      highlighted: true,
      badge: "Populaire"
    },
    {
      calls: 24,
      title: "Entreprises en croissance", 
      description: "Adapté aux structures en développement",
      features: ["24 lignes simultanées", "IA intégrée", "Multi-sites", "Customer Success Manager"],
    },
    {
      calls: 32,
      title: "Structures importantes",
      description: "Pour les entreprises établies",
      features: ["32 lignes simultanées", "Configuration avancée", "SLA prioritaire", "Formation équipes"],
    },
    {
      calls: 64,
      title: "Haute capacité",
      description: "Solution enterprise complète",
      features: ["64 lignes simultanées", "Architectures complexes", "Support dédié", "Consulting inclus"],
    }
  ];

  const testimonials = [
    {
      company: "Titeca BEAUPORT Finance",
      description: "Gestionnaire des bijouteries Eurogold aux Antilles-Guyane. Solution multi-sites parfaitement adaptée à nos besoins avec une centralisation entre les DOM et la Métropole.",
      users: "90+",
      solution: "Multi-sites",
      industry: "Bijouteries / Finance"
    }
  ];

  const locations = [
    {
      region: "Guyane",
      phone: "0594 963 500",
      features: ["Support technique local", "Installation sur site", "Maintenance préventive"]
    },
    {
      region: "Guadeloupe", 
      phone: "0590 173 500",
      features: ["Équipe dédiée", "Formation utilisateurs", "Support réactif"]
    },
    {
      region: "Martinique",
      phone: "0596 313 500", 
      features: ["Techniciens certifiés", "Suivi personnalisé", "Intervention rapide"]
    },
    {
      region: "La Réunion",
      phone: "+262 263 085 500",
      features: ["Accompagnement local", "Support multi-sites", "Expertise DOM"]
    },
    {
      region: "France Métropolitaine",
      phone: "0189 563 500",
      features: ["Coordination nationale", "Support technique", "Supervision centralisée"]
    }
  ];

  return (
    <div className="min-h-screen">
      <TawkTo />
      
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
              La Solution Téléphonique Cloud d'Entreprise qui Révolutionne vos Communications
            </p>
            <p className="text-xl md:text-2xl mb-8 font-medium opacity-90 max-w-3xl mx-auto">
              Transformez votre téléphonie d'entreprise avec une solution moderne, évolutive 
              et parfaitement intégrée à vos outils métier
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#calendrier"
                className="btn bg-red-600 hover:bg-red-700 text-white border-none px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 shadow-lg"
              >
                <i className="lni lni-calendar mr-2"></i>
                Réserver ma démonstration gratuite
              </a>
              <a
                href="/devis-en-ligne"
                className="btn bg-white/10 hover:bg-white/20 text-white border-white/30 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
              >
                <i className="lni lni-calculator mr-2"></i>
                Calculer mes économies
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section Problèmes vs Solutions */}
      <ProblemSolutionSection 
        problems={problems}
        solutions={solutions}
      />

      {/* Section Intégrations et fonctionnalités avancées */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Des Intégrations qui <span className="text-red-600">Décuplent</span> votre Efficacité
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connectez tous vos outils pour une expérience unifiée
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* WhatsApp Business */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="lni lni-whatsapp text-green-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">WhatsApp Business</h3>
              <p className="text-gray-600 text-center mb-4">
                Centralisez vos conversations WhatsApp directement dans votre standard téléphonique
              </p>
              <div className="text-center">
                <span className="px-3 py-1 bg-green-200 text-green-800 text-sm font-semibold rounded-full">
                  Intégration native
                </span>
              </div>
            </div>

            {/* CRM Connecté */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="lni lni-database text-blue-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">CRM Connecté</h3>
              <p className="text-gray-600 text-center mb-4">
                HubSpot, Zoho, Salesforce, Organilog - Historique complet affiché automatiquement
              </p>
              <div className="text-center">
                <span className="px-3 py-1 bg-blue-200 text-blue-800 text-sm font-semibold rounded-full">
                  Multi-CRM
                </span>
              </div>
            </div>

            {/* Microsoft 365 */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="lni lni-microsoft text-orange-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Microsoft 365</h3>
              <p className="text-gray-600 text-center mb-4">
                Synchronisation complète avec calendriers, contacts et Teams. Appels depuis Outlook
              </p>
              <div className="text-center">
                <span className="px-3 py-1 bg-orange-200 text-orange-800 text-sm font-semibold rounded-full">
                  Sync complète
                </span>
              </div>
            </div>

            {/* IA Intégrée */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="lni lni-brain text-purple-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">IA Intégrée</h3>
              <p className="text-gray-600 text-center mb-4">
                Transcription automatique via Google Speech ou OpenAI Whisper. Données exploitables
              </p>
              <div className="text-center">
                <span className="px-3 py-1 bg-purple-200 text-purple-800 text-sm font-semibold rounded-full">
                  IA avancée
                </span>
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