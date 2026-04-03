import Image from "next/image";
import Link from "next/link";

export function TransformationSection() {
  return (
    <section className="py-24 bg-white relative">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-none overflow-hidden shadow-[4px_4px_0_0_#1F2937] border border-gray-secondary/10">
            <Image 
              src="/images/photos/pexels-polina-tankilevitch-5234774.webp"
              alt="Femme souriante au téléphone - Communication d'entreprise optimisée"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Text Column */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-[-0.04em] text-[#091421] leading-tight">
                Transformez votre <span className="text-red-primary">communication d&apos;entreprise</span>
              </h2>
              <div className="space-y-4 text-gray-600 text-base lg:text-lg leading-relaxed">
                <p>
                  Comment gérez-vous actuellement les appels au sein de votre entreprise sans un standard téléphonique dédié ? Vos communications avec vos clients sont-elles vraiment optimales, permettant à votre équipe de travailler en toute fluidité, que ce soit en télétravail ou en déplacement ?
                </p>
                <p className="font-bold text-[#091421]">
                  Avec le passage à la fibre optique, découvrez avec nous les avantages potentiels sur l&apos;efficacité et la réactivité de votre entreprise. Transformez votre communication d&apos;entreprise avec la solution de téléphonie IP 3CX par E2I Assistance VOIP !
                </p>
                <p>
                  <strong className="text-[#091421]">Dites adieu à votre ancien standard téléphonique PABX !</strong> Optez pour notre solution nouvelle génération. En tant qu&apos;intégrateur privilégié de téléphonie IP en Guadeloupe, Martinique, Guyane, La Réunion et en France Métropolitaine, nous assurons l&apos;installation, la configuration et le support de votre serveur 3CX dans le cloud.
                </p>
              </div>
            </div>

            {/* Bullet Points Card */}
            <div className="bg-white p-6 border border-gray-secondary/10 shadow-[4px_4px_0_0_#1F2937] rounded-none">
              <h3 className="text-xl font-black text-[#091421] mb-4 tracking-[-0.04em] uppercase">
                Vos avantages avec E2I VoIP
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <i className="lni lni-checkmark-circle text-red-primary mt-1 mr-3 text-xl"></i>
                  <span className="text-gray-700">
                    <strong className="text-[#091421]">Téléphonie IP disponible par Internet</strong> - Accessibilité totale, où que vous soyez
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="lni lni-checkmark-circle text-red-primary mt-1 mr-3 text-xl"></i>
                  <span className="text-gray-700">
                    <strong className="text-[#091421]">Coûts d&apos;appels réduits</strong> - Fixe & Mobile Antilles, Guyane, La Réunion et Métropole
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="lni lni-checkmark-circle text-red-primary mt-1 mr-3 text-xl"></i>
                  <span className="text-gray-700">
                    <strong className="text-[#091421]">À partir de 4 canaux voix</strong> - 4 appels simultanés minimum
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="lni lni-checkmark-circle text-red-primary mt-1 mr-3 text-xl"></i>
                  <span className="text-gray-700">
                    <strong className="text-[#091421]">Budget téléphonique maîtrisé</strong> - Transparence et contrôle total
                  </span>
                </li>
              </ul>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap pt-4">
              <Link 
                href="/devis-en-ligne"
                className="monolith-btn bg-red-primary !text-white font-black uppercase tracking-[0.2em] text-xs px-8 sm:px-10 py-5 rounded-none flex items-center justify-center w-full sm:w-auto hover:opacity-90 transition-opacity"
              >
                <i className="lni lni-comments-alt mr-3 text-lg !text-white"></i>
                <span>Parlez-nous de votre projet</span>
              </Link>
              <Link 
                href="/contact"
                className="monolith-btn bg-[#091421] !text-white font-black uppercase tracking-[0.2em] text-xs px-8 sm:px-10 py-5 rounded-none flex items-center justify-center w-full sm:w-auto border border-[#091421] hover:bg-white hover:!text-[#091421] transition-colors group"
              >
                <i className="lni lni-phone mr-3 text-lg !text-white group-hover:!text-[#091421] transition-colors"></i>
                <span className="!text-white group-hover:!text-[#091421] transition-colors">Nous contacter</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
