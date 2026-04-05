import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-white text-gray-dark border-t border-[#091421]/10">
      <div className="max-w-7xl mx-auto py-20 px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1 flex flex-col">
            <div className="mb-6">
              <Image
                src="/logo_e2i-voip_compress.png"
                alt="E2I VoIP — Téléphonie IP entreprise"
                width={200}
                height={50}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed">
              Opérateur télécom et intégrateur de téléphonie IP
              en outre-mer et en France.
            </p>

            {/* Nous contacter */}
            <div className="mt-auto pt-4 border-t border-[#091421]/10">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-primary mb-4 flex items-center">
                <i className="lni lni-phone w-4 h-4 text-red-primary mr-2"></i>
                Nous contacter
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-500 font-medium">Guyane :</span>
                  <span className="text-gray-dark font-semibold">+594 594 963 500</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-500 font-medium">Guadeloupe :</span>
                  <span className="text-gray-dark font-semibold">+590 590 173 500</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-500 font-medium">Martinique :</span>
                  <span className="text-gray-dark font-semibold">+596 596 313 500</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-500 font-medium">France :</span>
                  <span className="text-gray-dark font-semibold">+33 1 89 56 05 00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-primary mb-6">
              Services
            </h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>
                <Link
                  href="/telephonie-entreprise/trunk-sip-compteur"
                  className="hover:text-[#091421] transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-red-primary mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Trunk SIP au compteur
                </Link>
              </li>
              <li>
                <Link
                  href="/telephonie-entreprise/trunk-sip-illimite"
                  className="hover:text-[#091421] transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-red-primary mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Trunk SIP illimité
                </Link>
              </li>
              <li>
                <Link
                  href="/telephonie-3cx"
                  className="hover:text-[#091421] transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-red-primary mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  3CX PRO dédiée
                </Link>
              </li>
              <li>
                <Link
                  href="/telephonie-entreprise/3cx-smb-mutualisee"
                  className="hover:text-[#091421] transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-red-primary mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  3CX SMB mutualisée
                </Link>
              </li>
              <li>
                <Link
                  href="/telephonie-entreprise/pbx-yeastar"
                  className="hover:text-[#091421] transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-red-primary mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  PBX Yeastar
                </Link>
              </li>
              <li>
                <Link
                  href="/studio-attente"
                  className="hover:text-[#091421] transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-red-primary mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Studio d&apos;attente
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-primary mb-6">
              Support
            </h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>
                <Link
                  href="/support/documentation"
                  className="hover:text-[#091421] transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-red-primary mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/support/faq"
                  className="hover:text-[#091421] transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-red-primary mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/support/technique"
                  className="hover:text-[#091421] transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-red-primary mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Support technique
                </Link>
              </li>
              <li>
                <Link
                  href="/support/formation"
                  className="hover:text-[#091421] transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-red-primary mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Formation
                </Link>
              </li>
              <li>
                <Link
                  href="/support/garanties"
                  className="hover:text-[#091421] transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-red-primary mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Garanties
                </Link>
              </li>
              <li>
                <Link
                  href="/devis-en-ligne"
                  className="hover:text-[#091421] transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-red-primary mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Devis en ligne
                </Link>
              </li>
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-primary mb-6">
              Informations
            </h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>
                <Link
                  href="/qui-sommes-nous"
                  className="hover:text-[#091421] transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-red-primary mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-[#091421] transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-red-primary mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/mentions-legales"
                  className="hover:text-[#091421] transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-red-primary mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-confidentialite"
                  className="hover:text-[#091421] transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-red-primary mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link
                  href="/cgv"
                  className="hover:text-[#091421] transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-red-primary mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Conditions générales de vente
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#091421] transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-red-primary mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section with partners and copyright */}
        <div className="border-t border-[#091421]/10 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">
              &copy; {new Date().getFullYear()} E2I VoIP. TOUS DROITS RÉSERVÉS.
            </div>

            {/* Partners */}
            <div className="flex items-center space-x-6 text-gray-500 text-xs font-bold uppercase tracking-wider">
              <span className="text-gray-400">PARTENAIRES :</span>
              <div className="flex items-center space-x-4">
                <a
                  href="https://www.3cx.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-primary transition-colors"
                >
                  3CX
                </a>
                <span className="text-gray-300">|</span>
                <a
                  href="https://www.yeastar.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-primary transition-colors"
                >
                  YEASTAR
                </a>
                <span className="text-gray-300">|</span>
                <a
                  href="https://www.grandstream.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-primary transition-colors"
                >
                  GRANDSTREAM
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
