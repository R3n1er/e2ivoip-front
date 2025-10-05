import { Metadata } from "next";
// import { LineIcon } from "lineicons-react"; // Temporaire - Conflit avec Next.js 15
// import { SecureEmail } from "@/components/secure-email";
import WorkingFAQ from "@/components/faq-working";
import { InlineContactForm } from "@/components/hubspot";

export const metadata: Metadata = {
  title: "Contact - E2I VoIP | Experts téléphonie IP France & DOM",
  description: "Contactez nos experts VoIP pour votre projet de téléphonie IP. Devis gratuit, support 24/7. Équipes locales en France, Martinique, Guadeloupe, Guyane, Réunion.",
  keywords: "contact E2I VoIP, expert téléphonie IP, devis VoIP gratuit, support technique DOM, standard téléphonique entreprise, 3CX Yeastar",
  openGraph: {
    title: "Contact - E2I VoIP | Experts téléphonie IP France & DOM",
    description: "Contactez nos experts VoIP pour votre projet de téléphonie IP. Devis gratuit, support 24/7. Équipes locales partout en France.",
    type: "website",
  },
};



export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/photos/pexels-ketut-subiyanto-4559714-min.jpg"
            alt="Contact E2I VoIP - Experts téléphonie IP"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient Overlay uniforme */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 pointer-events-none z-10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Contactez nos <span className="text-white">experts VoIP</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-4">
              Prêt à moderniser votre système téléphonique ? Nos experts en
              téléphonie IP vous accompagnent dans votre projet
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Devis gratuit • Support 24/7 • Équipes locales France & DOM
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Expert téléphonie IP</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Standard téléphonique</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Devis gratuit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Support technique</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire et Informations */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Formulaire HubSpot */}
            <div>
              <div className="card bg-base-100 shadow-xl border border-gray-200 overflow-hidden rounded-2xl" data-testid="contact-form-card">
                <div className="bg-gradient-to-r from-red-primary to-blue-marine text-white p-6">
                  <h2 className="card-title text-2xl font-bold text-white mb-2" data-testid="contact-form-title">
                    Demande de contact
                  </h2>
                  <p className="text-white/90">
                    Remplissez ce formulaire et nous vous recontacterons dans
                    les plus brefs délais
                  </p>
                </div>
                <div className="card-body p-8" data-testid="contact-form-body">
                  <InlineContactForm className="min-h-[420px]" />
                </div>
              </div>
            </div>

            {/* Informations de contact */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Nos coordonnées
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Notre équipe d&apos;experts est là pour vous accompagner dans
                  vos projets de téléphonie IP
                </p>
              </div>

              <div className="space-y-6">
                {/* Hotline Prioritaire */}
                <div className="card bg-base-100 border-red-primary border-2 hover:shadow-xl transition-shadow" data-testid="hotline-card">
                  <div className="card-body p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-red-primary p-3 rounded-lg">
                        <span className="text-2xl">📞</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1" data-testid="hotline-title">
                          Hotline Support
                        </h3>
                        <p className="text-gray-900 font-bold text-xl mb-1" data-testid="hotline-phone">
                          0189 560 500
                        </p>
                        <p className="text-sm text-gray-600">
                          Support technique prioritaire • Lun-Ven 8h-18h
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="card bg-base-100 hover:shadow-lg transition-shadow" data-testid="whatsapp-card">
                  <div className="card-body p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-marine/10 p-3 rounded-lg">
                        <span className="text-2xl">💬</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1" data-testid="whatsapp-title">
                          WhatsApp Business
                        </h3>
                        <p className="text-gray-900 font-medium mb-1" data-testid="whatsapp-phone">
                          0594 96 35 00
                        </p>
                        <p className="text-sm text-gray-600">
                          Réponse rapide • Support commercial et technique
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Nos Implantations */}
      <section className="py-16 bg-gradient-to-r from-red-primary to-blue-marine">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Nos <span className="text-white">implantations</span>
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Équipes techniques locales en France Métropolitaine et DOM
              pour un support de proximité
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* France */}
            <div className="card bg-white/10 backdrop-blur-sm border-white/20" data-testid="location-france">
              <div className="card-body p-6 text-center">
                <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📍</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  France
                </h3>
                <a
                  href="tel:+33189560500"
                  className="text-white/90 text-sm hover:text-white transition-colors duration-200"
                  data-testid="phone-france"
                >
                  01 89 56 05 00
                </a>
              </div>
            </div>

            {/* Guyane */}
            <div className="card bg-white/10 backdrop-blur-sm border-white/20" data-testid="location-guyane">
              <div className="card-body p-6 text-center">
                <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📍</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Guyane
                </h3>
                <a
                  href="tel:+594594963500"
                  className="text-white/90 text-sm hover:text-white transition-colors duration-200"
                  data-testid="phone-guyane"
                >
                  05 94 96 35 00
                </a>
              </div>
            </div>

            {/* Guadeloupe */}
            <div className="card bg-white/10 backdrop-blur-sm border-white/20" data-testid="location-guadeloupe">
              <div className="card-body p-6 text-center">
                <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📍</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Guadeloupe
                </h3>
                <a
                  href="tel:+590590173500"
                  className="text-white/90 text-sm hover:text-white transition-colors duration-200"
                  data-testid="phone-guadeloupe"
                >
                  +590 590 173 500
                </a>
              </div>
            </div>

            {/* Martinique */}
            <div className="card bg-white/10 backdrop-blur-sm border-white/20" data-testid="location-martinique">
              <div className="card-body p-6 text-center">
                <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📍</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Martinique
                </h3>
                <a
                  href="tel:+596596313500"
                  className="text-white/90 text-sm hover:text-white transition-colors duration-200"
                  data-testid="phone-martinique"
                >
                  +596 596 313 500
                </a>
              </div>
            </div>

            {/* La Réunion */}
            <div className="card bg-white/10 backdrop-blur-sm border-white/20" data-testid="location-reunion">
              <div className="card-body p-6 text-center">
                <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📍</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  La Réunion
                </h3>
                <a
                  href="tel:+262263085500"
                  className="text-white/90 text-sm hover:text-white transition-colors duration-200"
                  data-testid="phone-reunion"
                >
                  +262 263 085 500
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WorkingFAQ />
        </div>
      </section>


    </>
  );
}
