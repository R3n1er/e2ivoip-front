import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, Clock, CheckCircle, Users, Shield, Zap, Star } from "lucide-react"
import Link from "next/link"
import { TrunkSIPTallyLink, PortabiliteTallyLink, VoIP3CXTallyLink, ProjetPBXTallyLink } from "@/components/tally-tracking"
import { FullContactForm } from "@/components/hubspot-contact-form"
import { AnimatedHero, AnimatedSection, AnimatedCard, AnimatedGrid } from "@/components/devis-animations"

export default function DevisEnLignePage() {
  const devisTypes = [
    {
      title: "Devis Trunk SIP",
      description: "Solutions de connectivité SIP professionnelles",
      icon: <Phone className="w-6 h-6" />,
      href: "/devis-en-ligne/trunk-sip",
      features: ["Au compteur", "Illimité", "Portabilité"]
    },
    {
      title: "Devis Portabilité",
      description: "Conservez vos numéros existants",
      icon: <Users className="w-6 h-6" />,
      href: "/devis-en-ligne/portabilite",
      features: ["Numéros fixes", "RIO requis", "Sans interruption"]
    },
    {
      title: "Devis VoIP 3CX",
      description: "Solutions 3CX dédiées ou mutualisées",
      icon: <Zap className="w-6 h-6" />,
      href: "/devis-en-ligne/voip-3cx",
      features: ["3CX PRO Cloud", "3CX SMB Mutualisé", "Support inclus"]
    },
    {
      title: "Devis Projet PBX",
      description: "Solutions Yeastar et intégrations sur mesure",
      icon: <Shield className="w-6 h-6" />,
      href: "/devis-en-ligne/projet-pbx",
      features: ["PBX Yeastar", "Intégrations", "Accompagnement"]
    }
  ]

  const avantages = [
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Réponse sous 24h",
      description: "Par un expert en téléphonie IP"
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Accompagnement gratuit",
      description: "Sans engagement"
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: "Offres sur mesure",
      description: "Selon votre activité"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Support technique réactif",
      description: "Local dans les DOM et en France"
    }
  ]

  const faqs = [
    {
      question: "Quel est le délai moyen pour obtenir un devis personnalisé ?",
      answer: "Nous traitons votre demande de devis du lundi au vendredi. Si votre formulaire est complet, vous recevrez une proposition sous 24 heures ouvrées. Si des informations complémentaires sont nécessaires, notre équipe vous contactera rapidement pour affiner votre demande."
    },
    {
      question: "Quelles différences entre un Trunk SIP 'au compteur' et 'illimité' ?",
      answer: "Nous recommandons systématiquement à nos clients des Trunk SIP au compteur, soigneusement dimensionnés pour correspondre à leur consommation réelle. Cette solution offre l'avantage de ne payer que les appels effectués, ce qui est particulièrement adapté aux PME ayant un volume d'appels variable."
    },
    {
      question: "Puis-je conserver mes numéros actuels avec votre solution ?",
      answer: "Oui, nous prenons en charge la portabilité de vos numéros fixes en France métropolitaine et dans les DOM TOM. Vous devez nous communiquer votre numéro RIO pour cela. Par ailleurs, nous proposons des solutions flexibles adaptées à votre infrastructure existante."
    },
    {
      question: "Quel débit internet est nécessaire pour une qualité d'appel optimale ?",
      answer: "Pour bénéficier d'une qualité d'appel optimale avec nos solutions de téléphonie IP, votre accès Internet doit être conforme à nos spécifications techniques. Nous acceptons les connexions Fibre, 4G, 5G et Starlink. Le débit nécessaire est de 100 Kbps par appel simultané."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative bg-gradient-to-r from-red-primary to-blue-marine overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/man-oniphone-business-min.jpg" 
            alt="Homme d'affaires sur téléphone"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-primary/95 via-red-primary/85 to-blue-marine/95"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedHero className="text-center text-white">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              Devis Rapide et Gratuit
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              Recevez un devis personnalisé
              <br />
              <span className="text-white font-bold drop-shadow-lg">en moins de 24h</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/95 max-w-4xl mx-auto mb-8 drop-shadow-md">
              Que vous cherchiez à mettre en place un Trunk SIP professionnel, une solution 3CX VoIP dédiée ou mutualisée, 
              installer une solution Yeastar ou à porter vos numéros existants sur nos Trunk SIP opérateur, 
              notre équipe vous accompagne.
            </p>
            <p className="text-lg text-white/90 mb-8 drop-shadow-md">
              Choisissez ci-dessous le type de devis souhaité.
            </p>
          </AnimatedHero>
        </div>
      </section>

      {/* Types de Devis */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {devisTypes.map((devis, index) => (
              <AnimatedCard
                key={devis.title}
                delay={index * 0.1}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-red-primary/10 rounded-full w-fit">
                      <div className="text-red-primary">
                        {devis.icon}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {devis.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {devis.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="space-y-2 mb-6">
                      {devis.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="text-sm text-gray-600">
                          • {feature}
                        </div>
                      ))}
                    </div>
                    {devis.title === "Devis Trunk SIP" && (
                      <TrunkSIPTallyLink>
                        <Button className="w-full bg-red-primary hover:bg-red-600 text-white">
                          Demander un devis
                        </Button>
                      </TrunkSIPTallyLink>
                    )}
                    {devis.title === "Devis Portabilité" && (
                      <PortabiliteTallyLink>
                        <Button className="w-full bg-red-primary hover:bg-red-600 text-white">
                          Demander un devis
                        </Button>
                      </PortabiliteTallyLink>
                    )}
                    {devis.title === "Devis VoIP 3CX" && (
                      <VoIP3CXTallyLink>
                        <Button className="w-full bg-red-primary hover:bg-red-600 text-white">
                          Demander un devis
                        </Button>
                      </VoIP3CXTallyLink>
                    )}
                    {devis.title === "Devis Projet PBX" && (
                      <ProjetPBXTallyLink>
                        <Button className="w-full bg-red-primary hover:bg-red-600 text-white">
                          Demander un devis
                        </Button>
                      </ProjetPBXTallyLink>
                    )}
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Urgent */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Un projet urgent ?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Contactez directement notre équipe commerciale.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button className="bg-red-primary hover:bg-red-600 text-white px-8 py-3 text-lg">
                <Phone className="w-5 h-5 mr-2" />
                05 94 96 35 00
              </Button>
              <Button variant="outline" className="border-red-primary text-red-primary hover:bg-red-primary hover:text-white px-8 py-3 text-lg">
                <Mail className="w-5 h-5 mr-2" />
                contact@e2i-voip.com
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi demander un devis auprès de E2I VOIP ?
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {avantages.map((avantage, index) => (
              <AnimatedCard
                key={avantage.title}
                delay={index * 0.1}
                className="text-center"
              >
                <div className="mx-auto mb-4 p-3 bg-red-primary/10 rounded-full w-fit">
                  <div className="text-red-primary">
                    {avantage.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {avantage.title}
                </h3>
                <p className="text-gray-600">
                  {avantage.description}
                </p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              F.A.Q
            </h2>
          </AnimatedSection>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <AnimatedCard
                key={index}
                delay={index * 0.1}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire de contact HubSpot */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Contactez notre équipe
            </h2>
            <p className="text-xl text-gray-600">
              Remplissez ce formulaire et nous vous recontacterons dans les plus brefs délais
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <FullContactForm />
          </AnimatedSection>
        </div>
      </section>

      {/* Certification */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nous sommes certifiés !
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              E2I Assistance est partenaire 3CX Bronze et certifié ! Visiter le site internet de notre partenaire 
              et souscrivez à une version d'évaluation du standard téléphonique.
            </p>
            <div className="flex justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <img 
                  src="/images/logo-3CX-partner-e2i/3cx-Silver-Partner-badge.webp" 
                  alt="3CX Silver Partner Badge"
                  className="h-24 w-auto"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
} 