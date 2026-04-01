export const dynamic = "force-dynamic";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CTAButton } from "@/components/ui/cta-button";

export default function TelephonieDentreprise() {
  const solutions = [
    {
      icon: "lni-phone",
      title: "Standards téléphoniques IP",
      description:
        "Solutions complètes de téléphonie d'entreprise avec toutes les fonctionnalités avancées",
      features: [
        "Auto-commutateur",
        "Messagerie vocale",
        "Transfert d'appels",
        "Conférence téléphonique",
      ],
    },
    {
      icon: "lni-users",
      title: "Solutions multi-sites",
      description:
        "Interconnectez tous vos sites avec une solution de téléphonie unifiée",
      features: [
        "Numérotation abrégée",
        "Transfert inter-sites",
        "Annuaire centralisé",
        "Gestion centralisée",
      ],
    },
    {
      icon: "lni-headphone",
      title: "Centre d'appels",
      description:
        "Optimisez votre relation client avec nos solutions de centre d'appels professionnelles",
      features: [
        "Distribution automatique",
        "Supervision temps réel",
        "Enregistrement",
        "Statistiques détaillées",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-6">
        {/* Hero Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Téléphonie <span className="text-red-primary">d'entreprise</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Des solutions de téléphonie IP complètes et évolutives pour
                répondre aux besoins de votre entreprise
              </p>
              <CTAButton href="/devis-en-ligne" icon="lni-bubble">
                Demander un devis gratuit
              </CTAButton>
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {solutions.map((solution, index) => (
                <Card
                  key={index}
                  className="rounded-none border border-gray-secondary/10 shadow-[4px_4px_0_0_#1F2937] hover:translate-x-[2px] hover:translate-y-[2px] transition-transform"
                >
                  <CardHeader>
                    <div className="bg-red-primary/10 w-12 h-12 rounded-none flex items-center justify-center mb-4">
                      <i
                        className={`lni ${solution.icon} w-6 h-6 text-red-primary`}
                      ></i>
                    </div>
                    <CardTitle className="text-xl">{solution.title}</CardTitle>
                    <CardDescription>{solution.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {solution.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <div className="w-1.5 h-1.5 bg-red-primary rounded-none mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Sub-navigation */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Nos solutions <span className="text-red-primary">spécialisées</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Trunk SIP",
                  href: "/telephonie-entreprise/trunk-sip-compteur",
                  description: "Connexions SIP professionnelles",
                },
                {
                  title: "3CX PRO dédiée",
                  href: "/telephonie-3cx",
                  description: "Solution 3CX dédiée",
                },
                {
                  title: "3CX SMB mutualisée",
                  href: "/telephonie-entreprise/3cx-smb-mutualisee",
                  description: "Solution 3CX partagée",
                },
                {
                  title: "Yeastar",
                  href: "/telephonie-entreprise/pbx-yeastar",
                  description: "IPBX Yeastar",
                },
              ].map((item, index) => (
                <Link key={index} href={item.href} className="block h-full">
                  <Card className="rounded-none border border-gray-secondary/10 shadow-[4px_4px_0_0_#1F2937] hover:translate-x-[2px] hover:translate-y-[2px] transition-transform cursor-pointer h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
