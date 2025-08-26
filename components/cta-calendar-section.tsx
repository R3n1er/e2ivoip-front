import React from "react";
import { HubSpotCalendar } from "./hubspot-calendar";

interface CTACalendarSectionProps {
  title?: string;
  subtitle?: string;
  benefits?: string[];
  urgencyMessage?: string;
  showUrgency?: boolean;
  calendarProps?: {
    meetingUrl?: string;
    title?: string;
    description?: string;
    height?: number;
  };
}

export function CTACalendarSection({
  title = "Prêt à Révolutionner votre Téléphonie ?",
  subtitle = "Découvrez 3CX PRO en Action",
  benefits = [
    "Démonstration personnalisée gratuite adaptée à votre secteur d'activité",
    "Nous vous montrons concrètement comment notre solution résout vos problématiques",
    "Étude de faisabilité offerte pour évaluer l'impact sur vos coûts actuels",
    "Identification des optimisations possibles"
  ],
  urgencyMessage = "Ne laissez plus votre téléphonie freiner votre croissance",
  showUrgency = true,
  calendarProps = {}
}: CTACalendarSectionProps) {
  const defaultCalendarProps = {
    meetingUrl: "https://www.e2i-voip.com/meetings/alban-renier",
    title: "Réservez votre démonstration gratuite",
    description: "Échangeons 15 minutes pour comprendre vos enjeux et vous montrer comment 3CX PRO peut transformer vos communications d'entreprise",
    height: 650,
    ...calendarProps
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* En-tête principal */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            {title}
          </h2>
          <h3 className="text-2xl md:text-3xl font-semibold text-blue-800 mb-8">
            {subtitle}
          </h3>
          
          {urgencyMessage && (
            <div className="max-w-2xl mx-auto p-4 bg-red-50 border border-red-200 rounded-lg mb-8">
              <p className="text-lg text-red-800 font-medium">
                {urgencyMessage}
              </p>
            </div>
          )}
        </div>

        {/* Bénéfices de la démonstration */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <i className="lni lni-checkmark text-blue-600 text-lg"></i>
                </div>
                <p className="text-gray-700 leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section calendrier */}
        <div className="max-w-5xl mx-auto">
          <HubSpotCalendar {...defaultCalendarProps} />
        </div>

        {/* Urgence et raisons d'agir */}
        {showUrgency && (
          <div className="mt-12">
            <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-xl p-8 border border-red-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="lni lni-alarm text-red-600 text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Pourquoi Agir Maintenant ?
                </h3>
              </div>

              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-4 bg-white rounded-lg border border-red-200">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className="lni lni-warning text-red-600 text-xl"></i>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Arrêt du réseau cuivre</h4>
                  <p className="text-sm text-gray-600">La migration vers l'IP est inévitable</p>
                </div>
                
                <div className="p-4 bg-white rounded-lg border border-orange-200">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className="lni lni-rocket text-orange-600 text-xl"></i>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Vos concurrents modernisent</h4>
                  <p className="text-sm text-gray-600">Ne prenez pas de retard technologique</p>
                </div>
                
                <div className="p-4 bg-white rounded-lg border border-red-200">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className="lni lni-dollar text-red-600 text-xl"></i>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Opportunités perdues</h4>
                  <p className="text-sm text-gray-600">Chaque jour de retard coûte cher</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact direct alternatif */}
        <div className="mt-12 text-center">
          <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Ou contactez directement notre équipe commerciale
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center justify-center mb-3">
                  <i className="lni lni-envelope text-blue-600 text-xl mr-2"></i>
                  <span className="font-semibold text-gray-800">Email</span>
                </div>
                <a 
                  href="mailto:commerciaux@e2i-voip.com"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  commerciaux@e2i-voip.com
                </a>
              </div>
              
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center justify-center mb-3">
                  <i className="lni lni-world text-red-600 text-xl mr-2"></i>
                  <span className="font-semibold text-gray-800">Devis en ligne</span>
                </div>
                <a 
                  href="/devis-en-ligne"
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  www.e2i-voip.com/devis
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}