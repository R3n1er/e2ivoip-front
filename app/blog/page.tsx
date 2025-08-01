import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Blog() {
  const articles = [
    {
      title: "Les avantages de la téléphonie IP pour les PME",
      excerpt: "Découvrez comment la téléphonie IP peut transformer les communications de votre entreprise...",
      date: "15 Mars 2024",
      author: "Équipe E2I VoIP",
      category: "Téléphonie IP",
    },
    {
      title: "Guide complet : Migration vers la téléphonie IP",
      excerpt: "Tout ce que vous devez savoir pour réussir votre migration vers la téléphonie IP...",
      date: "10 Mars 2024",
      author: "Équipe E2I VoIP",
      category: "Migration",
    },
    {
      title: "Sécurité en téléphonie IP : bonnes pratiques",
      excerpt: "Comment protéger votre système de téléphonie IP contre les menaces de sécurité...",
      date: "5 Mars 2024",
      author: "Équipe E2I VoIP",
      category: "Sécurité",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                <span className="text-red-600">Blog</span> E2I VoIP
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Actualités, conseils et guides sur la téléphonie IP et les communications d'entreprise
              </p>
            </div>
          </div>
        </section>

        {/* Articles */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="text-xs text-red-600 font-medium mb-2">{article.category}</div>
                    <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
                    <CardDescription>{article.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-xs text-gray-500 mb-4">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span className="mr-4">{article.date}</span>
                      <User className="w-3 h-3 mr-1" />
                      <span>{article.author}</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Lire la suite
                      <ArrowRight className="w-3 h-3 ml-2" />
                    </Button>
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
