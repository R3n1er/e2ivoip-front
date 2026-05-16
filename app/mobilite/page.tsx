import { Metadata } from 'next'
import { CTAButton } from '@/components/ui/cta-button'
import { ContactSectionSimple } from '@/components/contact-section-simple'
import { PhoneLink } from '@/components/ui/phone-link'
import { TERRITORY_PHONES } from '@/lib/constants/phone-numbers'

export const metadata: Metadata = {
  title: 'Mobilite VoIP - E2I VoIP | Telephonie mobile entreprise',
  description:
    'Solutions de telephonie mobile pour entreprises. Travaillez en mobilite avec 3CX, softphone et applications mobiles. Restez connecte partout.',
  keywords:
    'telephonie mobile entreprise, softphone, 3CX mobile, VoIP mobile, mobilite entreprise',
  openGraph: {
    title: 'Mobilite VoIP - E2I VoIP',
    description:
      'Telephonie mobile entreprise avec 3CX. Softphone, applications mobiles, travail a distance.',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function MobilitePage() {
  const features = [
    {
      icon: 'lni-mobile',
      title: 'Softphone 3CX',
      description:
        'Application mobile 3CX pour iOS et Android. Passez et recevez des appels professionnels depuis votre smartphone.',
    },
    {
      icon: 'lni-laptop-phone',
      title: 'Multi-appareils',
      description:
        'Utilisez votre ligne professionnelle sur PC, tablette et mobile simultanement.',
    },
    {
      icon: 'lni-world',
      title: 'Travail a distance',
      description:
        'Restez connecte a votre standard telephonique ou que vous soyez, en France ou a l\'international.',
    },
    {
      icon: 'lni-shield',
      title: 'Securite integree',
      description:
        'Communications chiffrees et securisees. Vos conversations professionnelles restent confidentielles.',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-[#091421] relative overflow-hidden">
        <div className="monolith-grid-lines absolute inset-0 opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-black tracking-[-0.04em] leading-tight text-white mb-6">
              Telephonie <span className="text-red-primary">mobile</span> entreprise
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Emportez votre standard telephonique partout avec vous.
              Applications mobiles 3CX pour une mobilite totale.
            </p>
            <CTAButton href="/devis-en-ligne?service=mobilite" icon="lni-mobile">
              PASSER AU MOBILE
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-[-0.04em] leading-[0.95] text-gray-900 mb-6">
              La mobilite au service de votre <span className="text-red-primary">productivite</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white border border-gray-200 p-6">
                <div className="bg-red-50 w-12 h-12 flex items-center justify-center mb-4">
                  <i className={`lni ${feature.icon} text-red-primary text-xl`}></i>
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-secondary text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
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
  )
}
