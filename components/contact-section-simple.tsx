'use client'

import { usePathname } from 'next/navigation'
import { CTAButton, CTAButtonMarine } from '@/components/ui/cta-button'
import { Calendar, Phone } from '@/lib/icons'
import { trackEvent } from '@/lib/analytics/track-event'

export function ContactSectionSimple() {
  const pathname = usePathname()

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-6">
            Prêt à préparer la fin du
            <span className="text-red-primary"> réseau cuivre&nbsp;?</span>
          </h2>
          <p className="text-xl text-gray-secondary max-w-3xl mx-auto mb-8">
            Nos experts analysent gratuitement votre infrastructure actuelle et
            vous accompagnent dans votre transformation vers la téléphonie IP
            nouvelle génération.
          </p>

          {/* Main CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <CTAButton
              href="/contact"
              icon={Calendar}
              onClick={() => trackEvent('cta_click', {
                page: pathname || '/',
                element_id: '/contact',
                element_text: 'Audit telecom gratuit',
              })}
            >
              Audit telecom gratuit
            </CTAButton>
            <CTAButtonMarine
              href="/devis-en-ligne"
              icon={Phone}
              onClick={() => trackEvent('cta_click', {
                page: pathname || '/',
                element_id: '/devis-en-ligne',
                element_text: 'Calculez vos economies',
              })}
            >
              Faire un devis
</CTAButtonMarine>
          </div>
        </div>

      </div>
    </section>
  )
}
