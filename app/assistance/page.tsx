import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WorkingFAQ from "@/components/faq-working";
import Link from "next/link";
import Script from "next/script";
import { CTAButton } from "@/components/ui/cta-button";
import { ContactSectionSimple } from "@/components/contact-section-simple";
import { PhoneLink } from "@/components/ui/phone-link";
import { TERRITORY_PHONES } from "@/lib/constants/phone-numbers";
import { Phone, Chat } from '@/lib/icons';
import { JsonLd } from "@/components/seo/json-ld";
import { faqPageSchema } from "@/lib/structured-data";
import { GENERAL_FAQ, toFaqSchemaItems } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "Assistance & Support - E2I VoIP | Support technique DOM",
  description:
    "Support technique E2I VoIP par mail et téléphone, du lundi au vendredi de 8h à 18h. Hotline 01 89 56 05 00, chat en ligne. Guides, tutoriels 3CX, dépannage téléphonie IP.",
  keywords:
    "assistance E2I VoIP, support technique DOM, hotline téléphonie IP, dépannage 3CX, assistance Martinique Guadeloupe Guyane, chat assistance",
  openGraph: {
    title: "Assistance & Support - E2I VoIP | Support technique par mail et téléphone",
    description:
      "Support technique E2I VoIP par mail et téléphone. Présents dans les DOM, chat en ligne, guides et tutoriels.",
    type: "website",
  },
};

export default function AssistancePage() {
  return (
    <div className="min-h-screen">
      <JsonLd data={faqPageSchema(toFaqSchemaItems(GENERAL_FAQ))} />
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-red-primary to-blue-marine overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-red-primary/90 to-blue-marine/90 z-10"></div>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Assistance & <span className="text-white">Support VoIP</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Support technique 3CX et Yeastar • Présents en France et
              Outre-mer (Antilles-Guyane, Réunion) • Support à distance
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mt-4 mb-8">
              Notre équipe d'experts est là pour vous accompagner dans
              l'utilisation de vos solutions téléphoniques
            </p>
            <CTAButton href="/contact?objet=support" icon="Headphone">
              DEMANDER UN SUPPORT
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Hotline Support */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-8">
            Hotline <span className="text-red-primary">Support</span>
          </h2>
          <Card className="border-red-primary border-2 hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-12">
              <div className="w-20 h-20 bg-red-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone size={24} className="text-white" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Assistance téléphonique directe
              </h3>
              <a
                href="tel:+33189560500"
                suppressHydrationWarning
                className="block text-3xl font-bold font-mono tabular-nums text-red-primary mb-4 hover:underline"
              >
                01 89 56 05 00
              </a>
              <p className="text-lg text-gray-600 mb-4">
                Lundi - Vendredi : 8h - 18h
              </p>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-800 font-medium">
                Support prioritaire selon contrat client
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Chat intégré désactivé (Tawk.to) */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-4">
              Chat{" "}
              <span className="text-red-primary">assistance instantanée</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Discutez directement avec nos experts techniques en temps réel
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
            <div className="text-center mb-6">
              <Chat size={24} className="text-blue-marine mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Support chat en direct
              </h3>
              <p className="text-gray-600">
                Notre équipe est disponible pour répondre à toutes vos questions
              </p>
            </div>

            {/* Chat Tawk.to désactivé temporairement */}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WorkingFAQ />
        </div>
      </section>

      {/* Territory phone links -- D-09 */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-secondary mb-4 text-center">
            APPELEZ-NOUS DIRECTEMENT
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {TERRITORY_PHONES.filter(p => p.territory !== 'France').map((phone) => (
              <PhoneLink
                key={phone.territory}
                phone={phone}
                showTerritory={true}
                className="text-gray-dark font-black hover:text-red-primary transition-colors"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <ContactSectionSimple />
    </div>
  );
}
