import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Smartphone, Wifi } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Mobilite() {
  const solutions = [
    {
      icon: Smartphone,
      title: "Téléphonie mobile",
      description: "Solutions mobiles intégrées à votre système téléphonique",
      features: ["Applications mobiles", "Synchronisation contacts", "Transfert d'appels", "Messagerie unifiée"],
    },
    {
      icon: Wifi,
      title: "Backup 4G",
      description: "Continuité de service avec notre solution de sauvegarde 4G",
      features: ["Basculement automatique", "Débit garanti", "Monitoring 24/7", "Installation rapide"],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Solutions de <span className="text-red-600">Mobilité</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                Restez connecté partout avec nos solutions de mobilité et de continuité de service
              </p>
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                Découvrir nos solutions
              </Button>
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {solutions.map((solution, index) => (
                <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <solution.icon className="w-6 h-6 text-red-600" />
                    </div>
                    <CardTitle className="text-xl">{solution.title}</CardTitle>
                    <CardDescription>{solution.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {solution.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
