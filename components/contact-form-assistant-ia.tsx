"use client";

import { HubSpotFormSimpleEmbed } from "@/components/hubspot-form-simple-embed";

export function ContactFormAssistantIA() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 via-white to-red-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-6">
            Discutons de votre projet d&rsquo;<span className="text-red-primary">assistant vocal IA</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Prenez 10 minutes pour échanger avec nous. Ensemble, identifions comment cet assistant pourrait vous faire gagner au moins 5 heures par semaine.
          </p>
        </div>

        {/* Container du formulaire */}
        <div className="relative">
          {/* Decoration effects */}
          <div
            className="absolute -inset-4 rounded-3xl blur-3xl opacity-20"
            style={{
              background:
                "linear-gradient(135deg, rgba(229,62,62,0.3), rgba(45,56,72,0.3))",
            }}
          />

          <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <HubSpotFormSimpleEmbed
              formId="312a9f67-e613-4651-9690-4586646554a0"
              portalId="26878201"
              region="eu1"
            />
          </div>
        </div>

        {/* Avantages du contact */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-red-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="lni lni-check-mark-circle text-xl text-red-primary"></i>
            </div>
            <p className="font-semibold text-gray-dark">Démonstration gratuite</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-marine/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="lni lni-shield text-xl text-blue-marine"></i>
            </div>
            <p className="font-semibold text-gray-dark">Sans engagement</p>
          </div>
          <div className="text-center">
            <div className="bg-red-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="lni lni-rocket text-xl text-red-primary"></i>
            </div>
            <p className="font-semibold text-gray-dark">Réponse rapide</p>
          </div>
        </div>
      </div>
    </section>
  );
}

