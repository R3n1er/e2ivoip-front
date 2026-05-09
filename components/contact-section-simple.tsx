'use client'

import { usePathname } from 'next/navigation'
import { CTAButton, CTAButtonMarine } from '@/components/ui/cta-button'
import { trackEvent } from '@/lib/analytics/track-event'

export function ContactSectionSimple() {
  const pathname = usePathname()

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black tracking-[-0.04em] leading-[0.95] text-gray-900 mb-6">
            Pret a economiser 30% sur vos
            <span className="text-red-primary"> couts telecoms ?</span>
          </h2>
          <p className="text-xl text-gray-secondary max-w-3xl mx-auto mb-8">
            Nos experts analysent gratuitement votre infrastructure actuelle et
            vous accompagnent dans votre transformation vers la telephonie IP
            nouvelle generation.
          </p>

          {/* Main CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <CTAButton
              href="/contact"
              icon="lni-calendar"
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
              icon="lni-phone"
              onClick={() => trackEvent('cta_click', {
                page: pathname || '/',
                element_id: '/devis-en-ligne',
                element_text: 'Calculez vos economies',
              })}
            >
              Calculez vos economies
            </CTAButtonMarine>
          </div>
        </div>

      </div>
    </section>
  )
}
