import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white text-gray-dark border-t border-[#091421]/10">
      <div className="max-w-7xl mx-auto py-20 px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1 flex flex-col">
            <div className="flex items-center space-x-2 mb-6">
              <div className="text-2xl lg:text-3xl font-bold tracking-tight">
                <span className="text-red-primary">E</span>
                <span className="text-gray-dark">2</span>
                <span className="text-red-primary">I</span>
              </div>
            </div>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed">
              Solutions de téléphonie IP et communications d&apos;entreprise depuis
              plus de 15 ans. Spécialiste des DOM.
            </p>

            <div className="space-y-4 text-sm font-medium text-gray-500">
              <div className="flex items-center space-x-3">
                <i className="lni lni-envelope w-4 h-4 text-red-primary flex-shrink-0"></i>
                <span>contact@e2i-voip.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="lni lni-map-marker w-4 h-4 text-red-primary flex-shrink-0"></i>
                <span>Paris, France</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="lni lni-phone w-4 h-4 text-red-primary flex-shrink-0"></i>
                <span>+33 1 89 56 05 00</span>
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

          {/* Liens utiles */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-primary mb-6">
              Liens utiles
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
                  href="/devis-en-ligne"
                  className="hover:text-[#091421] transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-red-primary mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Devis en ligne
                </Link>
              </li>
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
                  Mentions Légales
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-confidentialite"
                  className="hover:text-[#091421] transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-red-primary mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Confidentialité
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter (Monolith Square Component) */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 border border-gray-200 p-8 flex flex-col h-full relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-red-primary"></div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-primary mb-3">
                NEWSLETTER
              </h3>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                Restez à l&apos;écoute des tendances, évolutions télécom, et actualités E2I VoIP.
              </p>
              <div className="flex flex-col space-y-3 mt-auto relative z-10">
                <input
                  type="email"
                  placeholder="Votre adresse e-mail"
                  className="w-full rounded-none bg-gray-50 border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-red-primary transition-colors placeholder:text-gray-400 text-gray-dark"
                />
                <button className="bg-red-primary text-white text-xs uppercase tracking-widest font-bold py-4 transition-colors hover:bg-red-700 w-full flex justify-center items-center rounded-none">
                  S&apos;inscrire
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section with partners and copyright */}
        <div className="border-t border-[#091421]/10 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">
              &copy; {new Date().getFullYear()} E2I VoIP. TOUS DROITS RÉSERVÉS.
            </div>

            {/* Partners logos */}
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
                  href="https://www.grandstream.com"
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
