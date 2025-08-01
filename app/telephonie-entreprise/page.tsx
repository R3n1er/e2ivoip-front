import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Phone, Users, Headphones } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function TelephonieDentreprise() {
  const solutions = [
    {
      icon: Phone,
      title: "Standards téléphoniques IP",
      description: "Solutions complètes de téléphonie d'entreprise avec toutes les fonctionnalités avancées",
      features: ["Auto-commutateur", "Messagerie vocale", "Transfert d'appels", "Conférence téléphonique"],
    },
    {
      icon: Users,
      title: "Solutions multi-sites",
      description: "Interconnectez tous vos sites avec une solution de téléphonie unifiée",
      features: ["Numérotation abrégée", "Transfert inter-sites", "Annuaire centralisé", "Gestion centralisée"],
    },
    {
      icon: Headphones,
      title: "Centre d'appels",
      description: "Optimisez votre relation client avec nos solutions de centre d'appels professionnelles",
      features: ["Distribution automatique", "Supervision temps réel", "Enregistrement", "Statistiques détaillées"],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-red-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Téléphonie <span className="text-red-600">d'entreprise</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Des solutions de téléphonie IP complètes et évolutives pour répondre aux besoins de votre entreprise
              </p>
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                Demander un devis gratuit
              </Button>
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
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

        {/* Sub-navigation */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Nos solutions <span className="text-red-600">spécialisées</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Trunk SIP", href: "/trunk-sip", description: "Connexions SIP professionnelles" },
                { title: "3CX PRO dédiée", href: "/3cx-pro-dediee", description: "Solution 3CX dédiée" },
                { title: "3CX SMB mutualisée", href: "/3cx-smb-mutualisee", description: "Solution 3CX partagée" },
                { title: "Yeastar", href: "/yeastar", description: "IPBX Yeastar" },
              ].map((item, index) => (
                <Card key={index} className="border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
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
