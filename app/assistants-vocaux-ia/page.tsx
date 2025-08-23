import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AssistantsVocauxIA() {
  const features = [
    {
      icon: "lni-question-circle",
      title: "IA conversationnelle",
      description: "Assistants vocaux intelligents capables de comprendre et répondre naturellement",
    },
    {
      icon: "lni-timer",
      title: "Disponibilité 24/7",
      description: "Vos clients sont accueillis et orientés à toute heure, même en dehors des horaires d'ouverture",
    },
    {
      icon: "lni-users",
      title: "Personnalisation avancée",
      description: "Adaptez le comportement et les réponses selon votre secteur d'activité",
    },
    {
      icon: "lni-bolt",
      title: "Intégration CRM",
      description: "Connexion directe avec vos outils métier pour un service client optimisé",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Assistants vocaux <span className="text-red-600">IA</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Révolutionnez votre accueil téléphonique avec l'intelligence artificielle. Offrez une expérience client
                exceptionnelle 24h/24.
              </p>
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                <i className="lni lni-comments w-5 h-5 mr-2"></i>
                Découvrir la démo
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center border-gray-200">
                  <CardHeader>
                    <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className={`lni ${feature.icon} w-8 h-8 text-red-600`}></i>
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Cas d'<span className="text-red-600">usage</span>
            </h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Accueil et orientation",
                  description: "L'assistant accueille vos appelants et les oriente vers le bon service",
                  example:
                    "« Bonjour, vous êtes bien chez E2I VoIP. Pour le service commercial, dites 'commercial', pour le support technique, dites 'support'... »",
                },
                {
                  title: "Prise de rendez-vous",
                  description: "Gestion automatique des plannings et confirmation des créneaux disponibles",
                  example:
                    "« Je peux vous proposer un rendez-vous mardi 15 à 14h ou mercredi 16 à 10h. Quelle option vous convient ? »",
                },
                {
                  title: "Support niveau 1",
                  description: "Réponses aux questions fréquentes et résolution des problèmes simples",
                  example: "« Pour redémarrer votre téléphone IP, maintenez le bouton power enfoncé 5 secondes... »",
                },
              ].map((useCase, index) => (
                <Card key={index} className="border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">{useCase.title}</CardTitle>
                    <CardDescription>{useCase.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <p className="text-sm text-gray-700 italic">{useCase.example}</p>
                    </div>
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
