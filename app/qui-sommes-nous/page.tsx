import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckCircle, Users, Award, Clock, Target } from "lucide-react"

export default function QuiSommesNous() {
  const values = [
    {
      icon: Target,
      title: "Excellence technique",
      description: "Nous sélectionnons les meilleures technologies pour garantir la qualité de vos communications.",
    },
    {
      icon: Users,
      title: "Accompagnement personnalisé",
      description: "Chaque projet est unique. Nous adaptons nos solutions à vos besoins spécifiques.",
    },
    {
      icon: Award,
      title: "Expertise reconnue",
      description: "Plus de 15 ans d'expérience dans les télécommunications d'entreprise.",
    },
    {
      icon: Clock,
      title: "Support réactif",
      description: "Notre équipe technique est disponible pour vous accompagner au quotidien.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Qui sommes-<span className="text-red-600">nous</span> ?
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                E2I VoIP est votre partenaire de confiance pour toutes vos solutions de téléphonie IP et communications
                d'entreprise.
              </p>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Notre <span className="text-red-600">mission</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Depuis plus de 15 ans, E2I VoIP accompagne les entreprises dans leur transformation digitale en
                  proposant des solutions de téléphonie IP innovantes, fiables et adaptées à leurs besoins.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  Notre expertise nous permet de vous conseiller et de vous accompagner dans le choix des meilleures
                  solutions pour optimiser vos communications d'entreprise.
                </p>
                <div className="space-y-4">
                  {[
                    "Conseil et audit de vos besoins",
                    "Installation et configuration",
                    "Formation de vos équipes",
                    "Support technique continu",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-8">
                <img
                  src="/placeholder.svg?height=400&width=500&text=Équipe E2I VoIP"
                  alt="Équipe E2I VoIP"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Values */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
