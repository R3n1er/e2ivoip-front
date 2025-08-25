import Image from "next/image";
import { CTAButton, CTAButtonMarine } from "@/components/ui/cta-button";

export function TransformationSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Colonne image à gauche */}
          <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/photos/pexels-polina-tankilevitch-5234774.webp"
              alt="Femme souriante au téléphone - Communication d'entreprise optimisée"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Colonne texte à droite */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-dark">
                Transformez votre{" "}
                <span className="text-red-primary">communication d'entreprise</span>
              </h2>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Comment gérez-vous actuellement les appels au sein de votre entreprise sans un standard téléphonique dédié?
                  Vos communications avec vos clients sont-elles vraiment optimales, permettant à votre équipe de travailler en toute fluidité, que ce soit en télétravail ou en déplacement?
                </p>
                
                <p className="font-semibold text-gray-dark">
                  Avec le passage à la fibre optique, découvrez avec nous les avantages potentiels sur l'efficacité et la réactivité de votre entreprise. Transformez votre communication d'entreprise avec la solution de téléphonie IP 3CX par E2I Assistance VOIP !
                </p>
                
                <p>
                  <strong>Dites adieu à votre ancien standard téléphonique PABX !</strong> Optez pour notre solution nouvelle génération. En tant qu'intégrateur privilégié de téléphonie IP en Guadeloupe, Martinique, Guyane, La Réunion et en France Métropolitaine, nous assurons l'installation, la configuration et le support de votre serveur 3CX dans le cloud.
                </p>
              </div>
            </div>

            {/* Points clés */}
            <div className="bg-gradient-to-br from-blue-50 to-red-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-dark mb-4">
                Vos avantages avec E2I VoIP
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <i className="lni lni-checkmark-circle text-green-600 mt-1 mr-3 text-lg"></i>
                  <span className="text-gray-700">
                    <strong>Téléphonie IP disponible par Internet</strong> - Accessibilité totale, où que vous soyez
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="lni lni-checkmark-circle text-green-600 mt-1 mr-3 text-lg"></i>
                  <span className="text-gray-700">
                    <strong>Coûts d'appels réduits</strong> - Fixe & Mobile Antilles, Guyane, La Réunion et Métropole
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="lni lni-checkmark-circle text-green-600 mt-1 mr-3 text-lg"></i>
                  <span className="text-gray-700">
                    <strong>À partir de 4 canaux voix</strong> - 4 appels simultanés minimum
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="lni lni-checkmark-circle text-green-600 mt-1 mr-3 text-lg"></i>
                  <span className="text-gray-700">
                    <strong>Budget téléphonique maîtrisé</strong> - Transparence et contrôle total
                  </span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <CTAButton href="/devis-en-ligne" icon="lni-comments-alt">
                Parlez-nous de votre projet
              </CTAButton>
              <CTAButtonMarine href="/contact" icon="lni-phone">
                Nous contacter
              </CTAButtonMarine>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}