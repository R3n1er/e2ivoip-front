export const dynamic = "force-dynamic";
import { Footer } from "@/components/layout/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CTAButton } from "@/components/ui/cta-button";
import { ContactSectionSimple } from "@/components/contact-section-simple";
import { PhoneLink } from "@/components/ui/phone-link";
import { TERRITORY_PHONES } from "@/lib/constants/phone-numbers";

export default function StudioAttente() {
  const services = [
    {
      icon: "lni-microphone",
      title: "Enregistrement professionnel",
      description:
        "Studio d'enregistrement avec voix off professionnelles en français et langues étrangères",
    },
    {
      icon: "lni-music",
      title: "Habillage musical",
      description:
        "Large choix de musiques libres de droits pour accompagner vos messages",
    },
    {
      icon: "lni-volume",
      title: "Messages sur mesure",
      description:
        "Création de messages personnalisés selon votre image de marque",
    },
    {
      icon: "lni-download",
      title: "Formats multiples",
      description:
        "Livraison dans tous les formats compatibles avec votre système téléphonique",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-6">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-red-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Studio attente{" "}
                <span className="text-red-primary">téléphonique</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Créez une expérience d'attente agréable et professionnelle avec
                nos messages et musiques sur mesure
              </p>
              <CTAButton href="/devis-en-ligne?service=studio" icon="lni-microphone">
                CREER MON STUDIO
              </CTAButton>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="text-center border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i
                        className={`lni ${service.icon} w-8 h-8 text-red-600`}
                      ></i>
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Examples */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Exemples de <span className="text-red-600">réalisations</span>
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle>Message d'accueil standard</CardTitle>
                  <CardDescription>
                    Message professionnel pour l'accueil de vos appelants
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-white p-4 rounded-lg border">
                    <p className="text-gray-700 italic mb-4">
                      "Bonjour et merci d'appeler E2I VoIP, spécialiste des
                      solutions de téléphonie IP. Votre appel est important pour
                      nous, un conseiller va vous répondre dans quelques
                      instants. Merci de patienter."
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full bg-transparent"
                    >
                      <i className="lni lni-play w-4 h-4 mr-2"></i>
                      Écouter l'exemple
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle>Message promotionnel</CardTitle>
                  <CardDescription>
                    Promotion de vos services pendant l'attente
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-white p-4 rounded-lg border">
                    <p className="text-gray-700 italic mb-4">
                      "Saviez-vous que nos solutions de téléphonie IP permettent
                      de réduire vos coûts de communication jusqu'à 50% ?
                      Découvrez nos offres sur notre site web www.e2i-voip.com"
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full bg-transparent"
                    >
                      <i className="lni lni-play w-4 h-4 mr-2"></i>
                      Écouter l'exemple
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
      <Footer />
    </div>
  );
}
