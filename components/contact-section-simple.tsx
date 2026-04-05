"use client";

import { CTAButton, CTAButtonMarine } from "@/components/ui/cta-button";

export function ContactSectionSimple() {

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Prêt à économiser 30% sur vos
            <span className="text-red-primary"> coûts télécoms ?</span>
          </h2>
          <p className="text-xl text-gray-secondary max-w-3xl mx-auto mb-8">
            Nos experts analysent gratuitement votre infrastructure actuelle et
            vous accompagnent dans votre transformation vers la téléphonie IP
            nouvelle génération.
          </p>

          {/* Main CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <CTAButton href="/contact" icon="lni-calendar">
              Audit télécom gratuit
            </CTAButton>
            <CTAButtonMarine href="/devis-en-ligne" icon="lni-phone">
              Calculez vos économies
            </CTAButtonMarine>
          </div>
        </div>

      </div>
    </section>
  );
}
