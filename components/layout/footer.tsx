"use client";
import Link from 'next/link'
import { ThreeCXBadge } from '@/components/ui/3cx-badge'
import { SafeImage as Image } from '@/components/ui/safe-image'
import { PhoneLink } from '@/components/ui/phone-link'
import { SecureEmail } from '@/components/secure-email'
import { TERRITORY_PHONES } from '@/lib/constants/phone-numbers'
import { Envelope, LinkedinLogo, MapMarker, Phone } from '@/lib/icons'

export function Footer() {
  return (
    <footer className="bg-gray-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl lg:text-3xl font-black">
                <span className="text-blue-marine">E</span>
                <span className="text-red-primary">2</span>
                <span className="text-blue-marine">I</span>
              </div>
            </div>
            <p className="text-gray-secondary mb-6 text-sm lg:text-base">
              Opérateur de service de télécommunication pour les entreprises.
            </p>

            {/* 3CX Silver Partner Badge */}
            <div className="mb-6">
              <ThreeCXBadge />
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Envelope size={16} className="text-red-primary flex-shrink-0" />
                <SecureEmail address="contact" className="text-gray-secondary text-sm" />
              </div>
              <div className="flex items-center space-x-3">
                <MapMarker size={16} className="text-red-primary flex-shrink-0" />
                <span>Paris, France</span>
              </div>
            </div>

            {/* Section Nous contacter */}
            <div className="mt-6 pt-4 border-t border-gray-700">
              <h4 className="text-sm font-black text-white mb-4 flex items-center gap-2">
                <Phone size={16} className="text-red-primary" />
                Nous contacter
              </h4>
              <div className="space-y-2 text-xs">
                {TERRITORY_PHONES.filter(p => p.territory !== 'France').map((phone) => (
                  <div key={phone.territory} className="flex justify-between items-center py-1">
                    <span className="text-gray-secondary font-black text-[10px] uppercase tracking-[0.2em]">{phone.territory} :</span>
                    <PhoneLink
                      phone={phone}
                      className="text-white font-black hover:text-red-primary transition-colors"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-2 border-t border-gray-700">
                <Link href="/contact" className="text-gray-secondary text-xs hover:text-white transition-colors">
                  Nous contacter →
                </Link>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-black mb-4 text-white">Services</h3>
            <ul className="space-y-3 text-sm text-gray-secondary">
              <li>
                <Link
                  href="/telephonie-entreprise/trunk-sip-compteur"
                  className="hover:text-white transition-colors"
                >
                  Trunk SIP au compteur
                </Link>
              </li>
              <li>
                <Link
                  href="/telephonie-entreprise/trunk-sip-illimite"
                  className="hover:text-white transition-colors"
                >
                  Trunk SIP illimité
                </Link>
              </li>
              <li>
                <Link
                  href="/telephonie-entreprise/3cx-smb-mutualisee"
                  className="hover:text-white transition-colors"
                >
                  3CX SMB PRO
                </Link>
              </li>
              <li>
                <Link
                  href="/3cx-cloud"
                  className="hover:text-white transition-colors"
                >
                  3CX PRO dédié
                </Link>
              </li>
              <li>
                <Link
                  href="/telephonie-entreprise/pbx-yeastar"
                  className="hover:text-white transition-colors"
                >
                  PBX Yeastar
                </Link>
              </li>
              <li>
                <Link
                  href="/telephonie-entreprise/trunk-sip-agents-ia"
                  className="hover:text-white transition-colors"
                >
                  Trunk SIP agents IA
                </Link>
              </li>
              <li>
                <Link
                  href="/studio-attente"
                  className="hover:text-white transition-colors"
                >
                  Studio attente téléphonique
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-black mb-4 text-white">Support</h3>
            <ul className="space-y-3 text-sm text-gray-secondary">
              <li>
                <Link
                  href="/assistance"
                  className="hover:text-white transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/assistance"
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Support technique
                </Link>
              </li>
              <li>
                <Link
                  href="/devis-en-ligne"
                  className="hover:text-white transition-colors"
                >
                  Devis en ligne
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & RGPD */}
          <div>
            <h3 className="text-lg font-black mb-4 text-white">
              Informations
            </h3>
            <ul className="space-y-3 text-sm text-gray-secondary">
              <li>
                <Link
                  href="/qui-sommes-nous"
                  className="hover:text-white transition-colors"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/mentions-legales"
                  className="hover:text-white transition-colors"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-confidentialite"
                  className="hover:text-white transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-700 mt-8 lg:mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex items-center gap-4 text-sm text-gray-secondary">
              <p>&copy; 2025 E2I VoIP. Tous droits réservés.</p>
              <a
                href="https://www.linkedin.com/company/e2i-voip/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Page LinkedIn d'E2I VoIP (nouvelle fenêtre)"
                className="text-gray-secondary hover:text-white transition-colors"
              >
                <LinkedinLogo size={22} weight="fill" />
              </a>
            </div>

            {/* Partners logos */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-gray-secondary text-xs font-black uppercase tracking-wider">
              <span className="text-white">
                Partenaires certifiés :
              </span>
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                <div className="flex items-center space-x-1">
                  <a
                    href="https://www.3cx.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-marine font-black hover:text-white transition-colors"
                  >
                    3CX
                  </a>
                  <span className="text-yellow-400">&#9733;</span>
                  <span className="text-gray-secondary">Silver Partner</span>
                </div>
                <span className="text-gray-700">|</span>
                <a
                  href="https://www.yeastar.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-80 hover:opacity-100 hover:text-white transition-colors"
                >
                  Yeastar
                </a>
                <span className="text-gray-700">|</span>
                <a
                  href="https://www.grandstream.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-80 hover:opacity-100 hover:text-white transition-colors"
                >
                  Grandstream
                </a>
                <span className="text-gray-700">|</span>
                <a
                  href="https://aircall.io/fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                  aria-label="Aircall - Partenaire officiel"
                >
                  <Image
                    src="/images/logo-partners/white-logo-aircall.png"
                    alt="Aircall Partner"
                    width={90}
                    height={24}
                    className="h-5 w-auto"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
