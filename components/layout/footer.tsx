"use client";
import Link from 'next/link'
import { PhoneLink } from '@/components/ui/phone-link'
import { resetConsent } from '@/lib/analytics/consent'
import { TERRITORY_PHONES } from '@/lib/constants/phone-numbers'
import { LinkedinLogo, Phone, Headphones } from '@/lib/icons'

// Logos partenaires (foncés / fond transparent → lisibles sur fond blanc).
// On utilise des <img> natifs (PAS next/image) pour éviter la casse
// d'hydratation déjà rencontrée sur le footer.
const PARTNER_LOGOS = [
  {
    name: '3CX Silver Partner',
    href: 'https://www.3cx.fr',
    src: '/images/logo-3CX-partner-e2i/3cx-Silver-Partner-badge.webp',
    className: 'max-h-12 w-auto',
  },
  {
    name: 'Yeastar Certified Expert',
    href: 'https://www.yeastar.com',
    src: '/images/logo-partners/yeastar-certified-expert-ysce-icon.png',
    className: 'max-h-12 w-auto',
  },
  {
    name: 'Grandstream',
    href: 'https://www.grandstream.com',
    src: '/images/logos-sip-compatibility/logo-grandstream.webp',
    className: 'max-h-10 w-auto',
  },
  {
    name: 'Aircall Partner',
    href: 'https://aircall.io/fr/',
    src: '/images/logo-partners/dark-logo-aircall.png',
    className: 'max-h-7 w-auto',
  },
]

export function Footer() {
  return (
    <footer className="bg-white text-gray-secondary border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              {/* Logo E2I VoIP — <img> natif (pas next/image : piège hydratation) */}
              <img
                src="/images/Logo-e2ivoip-solo.png"
                alt="E2I VoIP"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-secondary mb-6 text-sm lg:text-base">
              Opérateur de service de télécommunication pour les entreprises.
            </p>

            {/* Section Nous contacter */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <Link
                href="/contact"
                className="text-sm font-black text-gray-dark mb-4 flex items-center gap-2 hover:text-red-primary transition-colors"
              >
                <Phone size={16} className="text-red-primary" />
                Nous contacter
              </Link>
              <div className="space-y-2 text-sm">
                {TERRITORY_PHONES.filter(p => p.territory !== 'France').map((phone) => (
                  <div key={phone.territory} className="flex justify-between items-center py-1.5">
                    <span className="text-gray-secondary font-black text-xs uppercase tracking-[0.15em]">{phone.territory} :</span>
                    <PhoneLink
                      phone={phone}
                      className="text-gray-dark font-black hover:text-red-primary transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-black mb-4 text-gray-dark">Services</h3>
            <ul className="space-y-3 text-sm text-gray-secondary">
              <li>
                <Link
                  href="/telephonie-entreprise/trunk-sip-compteur"
                  className="inline-block py-1 hover:text-red-primary transition-colors"
                >
                  Trunk SIP au compteur
                </Link>
              </li>
              <li>
                <Link
                  href="/telephonie-entreprise/trunk-sip-illimite"
                  className="inline-block py-1 hover:text-red-primary transition-colors"
                >
                  Trunk SIP illimité
                </Link>
              </li>
              <li>
                <Link
                  href="/telephonie-3cx"
                  className="inline-block py-1 hover:text-red-primary transition-colors"
                >
                  Téléphonie 3CX
                </Link>
              </li>
              <li>
                <Link
                  href="/telephonie-entreprise/pbx-yeastar"
                  className="inline-block py-1 hover:text-red-primary transition-colors"
                >
                  PBX Yeastar
                </Link>
              </li>
              <li>
                <Link
                  href="/telephonie-entreprise/trunk-sip-agents-ia"
                  className="inline-block py-1 hover:text-red-primary transition-colors"
                >
                  Trunk SIP agents IA
                </Link>
              </li>
              <li>
                <Link
                  href="/studio-attente"
                  className="inline-block py-1 hover:text-red-primary transition-colors"
                >
                  Studio attente téléphonique
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-black mb-4 text-gray-dark">Support</h3>
            <ul className="space-y-3 text-sm text-gray-secondary">
              <li>
                <a
                  href="https://espace-client.e2i-voip.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1 text-red-primary font-black hover:text-red-700 transition-colors"
                >
                  Espace client
                </a>
              </li>
              <li>
                <Link
                  href="/assistance"
                  className="inline-block py-1 hover:text-red-primary transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/assistance"
                  className="inline-block py-1 hover:text-red-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <a
                  href="https://espace-client.e2i-voip.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-1 hover:text-red-primary transition-colors"
                >
                  <Headphones size={18} className="text-red-primary" />
                  Support technique
                </a>
              </li>
              <li>
                <Link
                  href="/devis-en-ligne"
                  className="inline-block py-1 hover:text-red-primary transition-colors"
                >
                  Devis en ligne
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & RGPD */}
          <div>
            <h3 className="text-lg font-black mb-4 text-gray-dark">
              Informations
            </h3>
            <ul className="space-y-3 text-sm text-gray-secondary">
              <li>
                <Link
                  href="/qui-sommes-nous"
                  className="inline-block py-1 hover:text-red-primary transition-colors"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="inline-block py-1 hover:text-red-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/juridique"
                  className="inline-block py-1 hover:text-red-primary transition-colors"
                >
                  Documents juridiques
                </Link>
              </li>
              <li>
                <Link
                  href="/juridique/conditions-generales-de-vente"
                  className="inline-block py-1 hover:text-red-primary transition-colors"
                >
                  Conditions générales de vente
                </Link>
              </li>
              <li>
                <Link
                  href="/juridique/mentions-legales"
                  className="inline-block py-1 hover:text-red-primary transition-colors"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/juridique/exercer-mes-droits"
                  className="inline-block py-1 hover:text-red-primary transition-colors"
                >
                  Exercer mes droits
                </Link>
              </li>
              <li>
                {/* Le RGPD impose que retirer son consentement soit aussi
                    simple que le donner : ce bouton oublie le choix mémorisé
                    et fait réapparaître le bandeau. */}
                <button
                  type="button"
                  onClick={() => resetConsent()}
                  className="inline-block py-1 text-left hover:text-red-primary transition-colors"
                >
                  Gérer mes cookies
                </button>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-block py-1 hover:text-red-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-200 mt-8 lg:mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4 text-sm text-gray-secondary">
              <p>&copy; 2025 E2I VoIP. Tous droits réservés.</p>
              <a
                href="https://www.linkedin.com/company/e2i-voip/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Page LinkedIn d'E2I VoIP (nouvelle fenêtre)"
                className="text-gray-secondary hover:text-red-primary transition-colors"
              >
                <LinkedinLogo size={22} weight="fill" />
              </a>
            </div>

            {/* Partners logos */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <span className="text-gray-secondary text-xs font-black uppercase tracking-wider text-center sm:text-left">
                Partenaires certifiés :
              </span>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {PARTNER_LOGOS.map((logo) => (
                  <a
                    key={logo.name}
                    href={logo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={logo.name}
                    className="flex items-center justify-center bg-white rounded-lg border border-gray-200 px-3 py-2 shadow-sm transition hover:shadow-md"
                  >
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className={`${logo.className} object-contain`}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
