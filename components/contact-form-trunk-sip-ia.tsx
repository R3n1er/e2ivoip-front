"use client";

import { HubSpotFormSimpleEmbed } from "@/components/hubspot-form-simple-embed";
import { TreeStructure, MapPin, Rocket } from '@/lib/icons';

export function ContactFormTrunkSipIA() {
  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-red-50"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-6">
            Parlez-nous de votre projet d&rsquo;
            <span className="text-red-primary">interconnexion SIP</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Intégrateurs et agences IA : décrivez votre plateforme (VAPI,
            Rounded, ElevenLabs, Jambonz&hellip;) et vos besoins en numéros
            locaux DOM. Un commercial vous recontacte sous 24h.
          </p>
        </div>

        <div className="relative">
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

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-red-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <TreeStructure size={24} className="text-red-primary" aria-hidden="true" />
            </div>
            <p className="font-semibold text-gray-dark">
              Accompagnement technique
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-marine/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin size={24} className="text-blue-marine" aria-hidden="true" />
            </div>
            <p className="font-semibold text-gray-dark">Numéros locaux DOM</p>
          </div>
          <div className="text-center">
            <div className="bg-red-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Rocket size={24} className="text-red-primary" aria-hidden="true" />
            </div>
            <p className="font-semibold text-gray-dark">Réponse rapide</p>
          </div>
        </div>
      </div>
    </section>
  );
}
