import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Music, Mic, Volume2, Download, Play, Headphones } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function StudioAttente() {
  const services = [
    {
      icon: Mic,
      title: "Enregistrement professionnel",
      description: "Studio d'enregistrement avec voix off professionnelles en français et langues étrangères",
    },
    {
      icon: Music,
      title: "Habillage musical",
      description: "Large choix de musiques libres de droits pour accompagner vos messages",
    },
    {
      icon: Volume2,
      title: "Messages sur mesure",
      description: "Création de messages personnalisés selon votre image de marque",
    },
    {
      icon: Download,
      title: "Formats multiples",
      description: "Livraison dans tous les formats compatibles avec votre système téléphonique",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-purple-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Studio attente <span className="text-red-600">téléphonique</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Créez une expérience d'attente agréable et professionnelle avec nos messages et musiques sur mesure
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                  <Play className="w-5 h-5 mr-2" />
                  Écouter des exemples
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
                >
                  <Headphones className="w-5 h-5 mr-2" />
                  Demander un devis
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="text-center border-gray-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <service.icon className="w-8 h-8 text-red-600" />
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
                  <CardDescription>Message professionnel pour l'accueil de vos appelants</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-white p-4 rounded-lg border">
                    <p className="text-gray-700 italic mb-4">
                      "Bonjour et merci d'appeler E2I VoIP, spécialiste des solutions de téléphonie IP. Votre appel est
                      important pour nous, un conseiller va vous répondre dans quelques instants. Merci de patienter."
                    </p>
                    <Button size="sm" variant="outline" className="w-full bg-transparent">
                      <Play className="w-4 h-4 mr-2" />
                      Écouter l'exemple
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle>Message promotionnel</CardTitle>
                  <CardDescription>Promotion de vos services pendant l'attente</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-white p-4 rounded-lg border">
                    <p className="text-gray-700 italic mb-4">
                      "Saviez-vous que nos solutions de téléphonie IP permettent de réduire vos coûts de communication
                      jusqu'à 50% ? Découvrez nos offres sur notre site web www.e2i-voip.com"
                    </p>
                    <Button size="sm" variant="outline" className="w-full bg-transparent">
                      <Play className="w-4 h-4 mr-2" />
                      Écouter l'exemple
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
