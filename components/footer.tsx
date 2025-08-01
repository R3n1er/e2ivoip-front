import Link from "next/link"
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl lg:text-3xl font-bold">
                <span className="text-red-500">E</span>
                <span className="text-white">2</span>
                <span className="text-red-500">I</span>
              </div>
            </div>
            <p className="text-gray-400 mb-6 text-sm lg:text-base">
              Solutions de téléphonie IP et communications d'entreprise depuis plus de 15 ans.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>01 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>contact@e2i-voip.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>Paris, France</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Services</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/telephonie-entreprise/trunk-sip-compteur" className="hover:text-white transition-colors">
                  Trunk SIP au compteur
                </Link>
              </li>
              <li>
                <Link href="/telephonie-entreprise/trunk-sip-illimite" className="hover:text-white transition-colors">
                  Trunk SIP illimité
                </Link>
              </li>
              <li>
                <Link href="/telephonie-entreprise/3cx-pro-dediee" className="hover:text-white transition-colors">
                  3CX PRO dédiée
                </Link>
              </li>
              <li>
                <Link href="/telephonie-entreprise/3cx-smb-mutualisee" className="hover:text-white transition-colors">
                  3CX SMB mutualisée
                </Link>
              </li>
              <li>
                <Link href="/telephonie-entreprise/pbx-yeastar" className="hover:text-white transition-colors">
                  PBX Yeastar
                </Link>
              </li>
              <li>
                <Link href="/nos-services/studio-attente" className="hover:text-white transition-colors">
                  Studio attente téléphonique
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/support/documentation" className="hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/support/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/support/technique" className="hover:text-white transition-colors">
                  Support technique
                </Link>
              </li>
              <li>
                <Link href="/support/formation" className="hover:text-white transition-colors">
                  Formation
                </Link>
              </li>
              <li>
                <Link href="/support/garanties" className="hover:text-white transition-colors">
                  Garanties
                </Link>
              </li>
              <li>
                <Link href="/nos-services/devis-en-ligne" className="hover:text-white transition-colors">
                  Devis en ligne
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & RGPD */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Informations</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/qui-sommes-nous" className="hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="hover:text-white transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/politique-confidentialite" className="hover:text-white transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="hover:text-white transition-colors">
                  Conditions générales de vente
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section with partners and copyright */}
        <div className="border-t border-gray-800 mt-8 lg:mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-sm text-gray-400">
              <p>&copy; 2024 E2I VoIP. Tous droits réservés.</p>
            </div>
            
            {/* Partners logos - Placeholder */}
            <div className="flex items-center space-x-6 text-gray-400 text-xs">
              <span>Partenaires :</span>
              <div className="flex items-center space-x-4">
                <span className="opacity-60">3CX</span>
                <span className="opacity-60">Yeastar</span>
                <span className="opacity-60">HubSpot</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
