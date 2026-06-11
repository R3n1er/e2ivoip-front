"use client";
import React from "react";
import { Gear, Check, Headphones, MapPin, Phone, Heart } from '@/lib/icons';

interface GeographicLocation {
  region: string;
  phone: string;
  features: string[];
}

interface GeographicAdvantageProps {
  title?: string;
  subtitle?: string;
  locations: GeographicLocation[];
}

export function GeographicAdvantage({
  title = "Votre Avantage Géographique Unique",
  subtitle = "Expertise DOM-TOM Inégalée",
  locations
}: GeographicAdvantageProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-red-50">
      <div className="container mx-auto px-4">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {title}
          </h2>
          <h3 className="text-2xl font-semibold text-blue-800 mb-6">
            {subtitle}
          </h3>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            Présents en <strong>Guadeloupe, Martinique, Guyane, La Réunion</strong> et 
            <strong> France métropolitaine</strong>, nous comprenons vos contraintes spécifiques
          </p>
        </div>

        {/* Avantages spécifiques DOM-TOM */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Expertise technique */}
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <Gear size={32} className="text-blue-600" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Expertise DOM-TOM</h3>
            </div>
            
            <div className="space-y-4">
              {[
                "Centralisation des appels entre DOM et Métropole",
                "Gestion intelligente des décalages horaires", 
                "Accompagnement technique local personnalisé",
                "Configuration multi-sites optimisée"
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <Check size={16} className="text-green-600" aria-hidden="true" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Support local */}
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <Headphones size={32} className="text-red-600" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Support Réactif</h3>
            </div>
            
            <div className="space-y-4">
              {[
                "Techniciens présents localement dans chaque DOM",
                "Supervision cloud de votre parc téléphonique",
                "Prise en main à distance pour résolution immédiate",
                "Maintenance préventive proactive"
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <Check size={16} className="text-green-600" aria-hidden="true" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carte des régions et contacts */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-red-600 p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">
              Nos Conseillers Régionaux
            </h3>
            <p className="text-white/90">
              Un interlocuteur local dans chaque région
            </p>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map((location, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin size={32} className="text-white" aria-hidden="true" />
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{location.region}</h4>
                  
                  <div className="mb-4">
                    <a
                      href={`tel:${location.phone.replace(/\s/g, '')}`}
                      suppressHydrationWarning
                      className="inline-flex items-center text-red-primary hover:text-red-600 font-semibold"
                    >
                      <Phone size={20} className="mr-2" aria-hidden="true" />
                      {location.phone}
                    </a>
                  </div>

                  <div className="space-y-2">
                    {location.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center justify-center text-sm text-gray-600">
                        <Check size={20} className="text-red-primary mr-2" aria-hidden="true" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Message de proximité */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center p-6 bg-gradient-to-r from-red-primary/10 via-white to-blue-marine/10 rounded-xl border border-red-primary/20">
            <div className="w-12 h-12 bg-red-primary/20 rounded-full flex items-center justify-center mr-4">
              <Heart size={24} className="text-red-primary" aria-hidden="true" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-blue-marine text-lg">Proximité & Réactivité</h3>
              <p className="text-blue-marine/80">
                Parce que votre téléphonie ne peut pas attendre, nos équipes sont proches de vous
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}