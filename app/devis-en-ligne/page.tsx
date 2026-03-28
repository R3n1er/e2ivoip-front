"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { FullContactForm } from "@/components/hubspot";
import { ClientsCarousel } from "@/components/clients-carousel";

export default function DevisEnLignePage() {
  const devisButtons = [
    {
      title: "Devis Trunk SIP",
      href: "https://urlr.me/!E2IVOIP-Devis-TrunkSIP",
      variant: "primary" as const,
    },
    {
      title: "Devis Portabilité",
      href: "https://urlr.me/!E2IVOIP-EtudePortaVoIP",
      variant: "secondary" as const,
    },
    {
      title: "Devis VoIP 3CX",
      href: "https://urlr.me/!mon-projet-Voip-E2I",
      variant: "primary" as const,
    },
    {
      title: "Devis Projet PBX",
      href: "https://urlr.me/!E2I-Devis_IntegrationPBX",
      variant: "secondary" as const,
    },
  ];

  const avantages = [
    {
      icon: "⏱️",
      title: "Réponse sous 24h",
      description: "Par un expert en téléphonie IP",
    },
    {
      icon: "✓",
      title: "Accompagnement gratuit",
      description: "Sans engagement",
    },
    {
      icon: "⭐",
      title: "Offres sur mesure",
      description: "Selon votre activité",
    },
    {
      icon: "📞",
      title: "Support technique réactif",
      description: "Local dans les DOM et en France",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/man-oniphone-business-min.jpg"
            alt="Communications professionnelles"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85"></div>
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <p className="uppercase text-sm font-medium tracking-wider mb-4 opacity-90">
            RECEVEZ UN DEVIS PERSONNALISÉ EN MOINS DE 24H POUR VOTRE PROJET TÉLÉCOM
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Devis Rapide et Gratuit
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-8 opacity-95">
            Solutions de téléphonie professionnelle adaptées à vos besoins
          </p>
        </div>
      </section>

      {/* Section Boutons de Devis */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Que vous cherchiez à mettre en place un{" "}
              <strong>Trunk SIP professionnel</strong>, une solution{" "}
              <strong>3CX VoIP dédiée ou mutualisée</strong>, installer une
              solution Yeastar ou à{" "}
              <strong>porter vos numéros existants sur nos Trunk SIP operateur</strong>,
              notre équipe vous accompagne. Choisissez ci-dessous le type de devis
              souhaité.
            </p>
          </div>

          {/* Boutons de devis */}
          <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
            {devisButtons.map((button) => (
              <a
                key={button.title}
                href={button.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  w-full py-4 px-8 text-center text-white font-bold text-lg rounded-none
                  transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1
                  ${
                    button.variant === "primary"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-[#1d3557] hover:bg-[#2a4365]"
                  }
                `}
              >
                {button.title}
              </a>
            ))}
          </div>

          {/* Contact urgent */}
          <div className="text-center mt-16">
            <p className="text-lg text-[#1d3557] font-medium mb-4">
              Un projet urgent ? Contactez directement notre équipe commerciale.
            </p>
            <a
              href="tel:+594594963500"
              className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-none font-bold transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              <span className="mr-2">📞</span>
              05 94 96 35 00
            </a>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Pourquoi demander un devis auprès de E2I VOIP ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {avantages.map((avantage) => (
              <div key={avantage.title} className="text-center">
                <div className="text-4xl mb-4">{avantage.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {avantage.title}
                </h3>
                <p className="text-gray-600">{avantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ils nous font confiance - Carrousel de logos clients */}
      <ClientsCarousel />

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            F.A.Q
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-none p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Quel est le délai moyen pour obtenir un devis personnalisé ?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Nous traitons votre demande de devis du lundi au vendredi. Si votre formulaire est complet, 
                vous recevrez une proposition sous 24 heures ouvrées. Si des informations complémentaires 
                sont nécessaires, notre équipe vous contactera rapidement pour affiner votre demande.
              </p>
            </div>
            
            <div className="bg-white rounded-none p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Quelles différences entre un Trunk SIP 'au compteur' et 'illimité' ?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Nous recommandons systématiquement à nos clients des Trunk SIP au compteur, soigneusement 
                dimensionnés pour correspondre à leur consommation réelle. Cette solution offre l'avantage 
                de ne payer que les appels effectués, ce qui est particulièrement adapté aux PME ayant un 
                volume d'appels variable.
              </p>
            </div>
            
            <div className="bg-white rounded-none p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Puis-je conserver mes numéros actuels avec votre solution ?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Oui, nous prenons en charge la portabilité de vos numéros fixes en France métropolitaine et 
                dans les DOM TOM. Vous devez nous communiquer votre numéro RIO pour cela. Par ailleurs, nous 
                proposons des solutions flexibles adaptées à votre infrastructure existante.
              </p>
            </div>
            
            <div className="bg-white rounded-none p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Quel débit internet est nécessaire pour une qualité d'appel optimale ?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Pour bénéficier d'une qualité d'appel optimale avec nos solutions de téléphonie IP, votre 
                accès Internet doit être conforme à nos spécifications techniques. Nous acceptons les 
                connexions Fibre, 4G, 5G et Starlink. Le débit nécessaire est de 100 Kbps par appel simultané.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire de Contact HubSpot */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FullContactForm />
        </div>
      </section>

      {/* Certification */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nous sommes certifiés !
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            E2I Assistance est partenaire 3CX Silver et certifié ! Visitez le site internet 
            de notre partenaire et souscrivez à une version d'évaluation du standard téléphonique.
          </p>
          <div className="flex justify-center">
            <div className="bg-white p-6 rounded-none shadow-lg">
              <img
                src="/images/logo-3CX-partner-e2i/3cx-Silver-Partner-badge.webp"
                alt="3CX Silver Partner Badge"
                className="h-32 w-auto mx-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}