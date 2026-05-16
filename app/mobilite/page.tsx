import { Metadata } from 'next'
import { CTAButton } from '@/components/ui/cta-button'
import { ContactSectionSimple } from '@/components/contact-section-simple'
import { PhoneLink } from '@/components/ui/phone-link'
import { TERRITORY_PHONES } from '@/lib/constants/phone-numbers'

export const metadata: Metadata = {
  title: 'Mobilité VoIP - E2I VoIP | Téléphonie mobile entreprise',
  description:
    'Solutions de téléphonie mobile pour entreprises. Travaillez en mobilité avec 3CX, softphone et applications mobiles. Restez connecté partout.',
  keywords:
    'téléphonie mobile entreprise, softphone, 3CX mobile, VoIP mobile, mobilité entreprise',
  openGraph: {
    title: 'Mobilité VoIP - E2I VoIP',
    description:
      'Téléphonie mobile entreprise avec 3CX. Softphone, applications mobiles, travail à distance.',
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
        'Utilisez votre ligne professionnelle sur PC, tablette et mobile simultanément.',
    },
    {
      icon: 'lni-world',
      title: 'Travail à distance',
      description:
        'Restez connecté à votre standard téléphonique où que vous soyez, en France ou à l\'international.',
    },
    {
      icon: 'lni-shield',
      title: 'Sécurité intégrée',
      description:
        'Communications chiffrées et sécurisées. Vos conversations professionnelles restent confidentielles.',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-black tracking-[-0.04em] leading-tight text-white mb-6">
              Téléphonie <span className="text-red-300">mobile</span> entreprise
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Emportez votre standard téléphonique partout avec vous.
              Applications mobiles 3CX pour une mobilité totale.
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
              La mobilité au service de votre <span className="text-red-primary">productivité</span>
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
