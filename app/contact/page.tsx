import { Metadata } from "next";
import { SafeImage as Image } from "@/components/ui/safe-image";
import WorkingFAQ from "@/components/faq-working";
import { InlineContactForm } from "@/components/hubspot";
import { LinkedinLogo, Phone, WhatsappLogo, MapPin } from "@/lib/icons";

export const metadata: Metadata = {
  alternates: {
    canonical: "/contact",
  },
  title: "Contact | Experts téléphonie IP France & DOM",
  description:
    "Contactez nos experts VoIP pour votre projet de téléphonie IP. Devis gratuit, support par mail et téléphone. Présents en France, Martinique, Guadeloupe, Guyane, Réunion.",
  keywords:
    "contact E2I VoIP, expert téléphonie IP, devis VoIP gratuit, support technique DOM, standard téléphonique entreprise, 3CX Yeastar",
  openGraph: {
    title: "Contact | Experts téléphonie IP France & DOM",
    description:
      "Contactez nos experts VoIP pour votre projet de téléphonie IP. Devis gratuit, support par mail et téléphone. Présents en France et dans les DOM.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/photos/pexels-ketut-subiyanto-4559714-min.jpg"
            alt="Contact E2I VoIP - Experts téléphonie IP"
            fill
            priority
            sizes="100vw"
            quality={75}
            className="object-cover"
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
              Devis gratuit • Support par mail et téléphone • Présents en France & DOM
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
              <div
                className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                data-testid="contact-form-card"
              >
                <div className="bg-gradient-to-r from-red-primary to-blue-marine text-white p-6">
                  <h2
                    className="text-2xl font-bold text-white mb-2"
                    data-testid="contact-form-title"
                  >
                    Demande de contact
                  </h2>
                  <p className="text-white/90">
                    Remplissez ce formulaire et nous vous recontacterons dans
                    les plus brefs délais
                  </p>
                </div>
                <div className="flex flex-col p-8" data-testid="contact-form-body">
                  <InlineContactForm className="w-full" />
                </div>
              </div>
            </div>

            {/* Informations de contact */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-4">
                  Nos coordonnées
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Notre équipe d&apos;experts est là pour vous accompagner dans
                  vos projets de téléphonie IP
                </p>
              </div>

              <div className="space-y-6">
                {/* Hotline Prioritaire */}
                <div
                  className="rounded-xl bg-white border-2 border-red-primary shadow-sm hover:shadow-md transition-shadow duration-300"
                  data-testid="hotline-card"
                >
                  <div className="flex flex-col p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-red-primary p-3 rounded-lg">
                        <Phone size={24} className="text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <h3
                          className="text-lg font-semibold text-gray-900 mb-1"
                          data-testid="hotline-title"
                        >
                          Hotline Support
                        </h3>
                        <p
                          className="text-gray-900 font-bold text-xl mb-1"
                          data-testid="hotline-phone"
                        >
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
                <a
                  href="https://wa.me/33757023601"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contacter E2I VoIP sur WhatsApp (nouvelle fenêtre)"
                  className="block rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                  data-testid="whatsapp-card"
                >
                  <div className="flex flex-col p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-marine/10 p-3 rounded-lg">
                        <WhatsappLogo size={24} className="text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <h3
                          className="text-lg font-semibold text-gray-900 mb-1"
                          data-testid="whatsapp-title"
                        >
                          WhatsApp Business
                        </h3>
                        <p
                          className="text-gray-900 font-medium mb-1"
                          data-testid="whatsapp-phone"
                        >
                          +33 7 57 02 36 01
                        </p>
                        <p className="text-sm text-gray-600">
                          Réponse rapide • Support commercial et technique
                        </p>
                      </div>
                    </div>
                  </div>
                </a>

                {/* Réseaux sociaux */}
                <div
                  className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                  data-testid="social-card"
                >
                  <div className="flex flex-col p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-marine/10 p-3 rounded-lg">
                        <LinkedinLogo
                          size={28}
                          weight="fill"
                          className="text-blue-marine"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <h3
                          className="text-lg font-semibold text-gray-900 mb-1"
                          data-testid="social-title"
                        >
                          Suivez-nous
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Retrouvez nos actualités et conseils télécom sur
                          LinkedIn
                        </p>
                        <a
                          href="https://www.linkedin.com/company/e2i-voip/"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Page LinkedIn d'E2I VoIP (nouvelle fenêtre)"
                          className="inline-flex items-center gap-2 text-blue-marine font-semibold hover:text-red-primary transition-colors duration-200"
                          data-testid="social-linkedin-link"
                        >
                          <LinkedinLogo size={20} weight="fill" aria-hidden="true" />
                          E2I VoIP sur LinkedIn
                        </a>
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
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-white mb-4">
              Nos <span className="text-white">implantations</span>
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Équipes techniques locales en France Métropolitaine et DOM pour un
              support de proximité
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* France */}
            <div
              className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm"
              data-testid="location-france"
            >
              <div className="flex flex-col p-6 text-center">
                <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin size={24} className="text-red-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  France
                </h3>
                <a
                  href="tel:+33189560500"
                  suppressHydrationWarning
                  className="text-white/90 text-sm hover:text-white transition-colors duration-200"
                  data-testid="phone-france"
                >
                  01 89 56 05 00
                </a>
              </div>
            </div>

            {/* Guyane */}
            <div
              className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm"
              data-testid="location-guyane"
            >
              <div className="flex flex-col p-6 text-center">
                <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin size={24} className="text-red-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Guyane
                </h3>
                <a
                  href="tel:+594594963500"
                  suppressHydrationWarning
                  className="text-white/90 text-sm hover:text-white transition-colors duration-200"
                  data-testid="phone-guyane"
                >
                  05 94 96 35 00
                </a>
              </div>
            </div>

            {/* Guadeloupe */}
            <div
              className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm"
              data-testid="location-guadeloupe"
            >
              <div className="flex flex-col p-6 text-center">
                <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin size={24} className="text-red-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Guadeloupe
                </h3>
                <a
                  href="tel:+590590173500"
                  suppressHydrationWarning
                  className="text-white/90 text-sm hover:text-white transition-colors duration-200"
                  data-testid="phone-guadeloupe"
                >
                  05 90 17 35 00
                </a>
              </div>
            </div>

            {/* Martinique */}
            <div
              className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm"
              data-testid="location-martinique"
            >
              <div className="flex flex-col p-6 text-center">
                <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin size={24} className="text-red-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Martinique
                </h3>
                <a
                  href="tel:+596596313500"
                  suppressHydrationWarning
                  className="text-white/90 text-sm hover:text-white transition-colors duration-200"
                  data-testid="phone-martinique"
                >
                  05 96 31 35 00
                </a>
              </div>
            </div>

            {/* La Réunion */}
            <div
              className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm"
              data-testid="location-reunion"
            >
              <div className="flex flex-col p-6 text-center">
                <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin size={24} className="text-red-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  La Réunion
                </h3>
                <a
                  href="tel:+262263085500"
                  suppressHydrationWarning
                  className="text-white/90 text-sm hover:text-white transition-colors duration-200"
                  data-testid="phone-reunion"
                >
                  02 63 08 55 00
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
