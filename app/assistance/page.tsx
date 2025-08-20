import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Users,
  FileText,
  Video,
  Download,
  ExternalLink,
  MapPin,
  Globe,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Assistance & Support - E2I VoIP | Support technique 24/7 DOM-TOM",
  description:
    "Support technique E2I VoIP 24/7. Assistance locale DOM-TOM, hotline 0189 560 500, chat en ligne. Guides, tutoriels 3CX, dépannage téléphonie IP.",
  keywords:
    "assistance E2I VoIP, support technique DOM-TOM, hotline téléphonie IP, dépannage 3CX, support local Martinique Guadeloupe Guyane, chat assistance",
  openGraph: {
    title: "Assistance & Support - E2I VoIP | Support technique 24/7",
    description:
      "Support technique E2I VoIP 24/7. Équipes locales DOM-TOM, chat en ligne, guides et tutoriels.",
    type: "website",
  },
};

export default function AssistancePage() {
  const supportChannels = [
    {
      icon: Phone,
      title: "Hotline support",
      description: "Assistance téléphonique directe",
      contact: "0189 560 500",
      availability: "Lundi - Vendredi : 8h - 18h",
      urgent: true,
    },
    {
      icon: MessageCircle,
      title: "Chat en ligne",
      description: "Support instantané via chat",
      contact: "Disponible ci-dessous",
      availability: "24/7",
      urgent: false,
    },
    {
      icon: Mail,
      title: "Email support",
      description: "Support par email détaillé",
      contact: "assistance@e2i-voip.com",
      availability: "Réponse sous 2h",
      urgent: false,
    },
  ];

  const localSupport = [
    { name: "Guyane", phone: "0594 963 500", icon: MapPin },
    { name: "Guadeloupe", phone: "0590 173 500", icon: MapPin },
    { name: "Martinique", phone: "0596 313 500", icon: MapPin },
    { name: "La Réunion", phone: "0262 263 085 500", icon: MapPin },
    { name: "France Métropole", phone: "0189 563 500", icon: Globe },
  ];

  const resources = [
    {
      icon: FileText,
      title: "Guides d'installation",
      description: "Guides pas-à-pas pour configurer vos équipements",
      items: ["Configuration 3CX", "Paramétrage téléphones", "Trunk SIP"],
    },
    {
      icon: Video,
      title: "Tutoriels vidéo",
      description: "Vidéos explicatives pour résoudre les problèmes courants",
      items: ["Prise en main 3CX", "Configuration softphone", "Dépannage"],
    },
    {
      icon: Download,
      title: "Téléchargements",
      description: "Logiciels et applications nécessaires",
      items: ["Applications mobiles", "Softphones", "Pilotes"],
    },
  ];

  const faqItems = [
    {
      question: "Comment configurer mon téléphone IP ?",
      answer: "Consultez notre guide de configuration ou contactez notre support pour un accompagnement personnalisé.",
    },
    {
      question: "Que faire en cas de problème de connexion ?",
      answer: "Vérifiez votre connexion internet, redémarrez votre équipement et contactez notre hotline si le problème persiste.",
    },
    {
      question: "Comment porter mes numéros existants ?",
      answer: "La portabilité est gratuite avec E2I VoIP. Contactez notre équipe commerciale pour lancer la procédure.",
    },
    {
      question: "Puis-je utiliser mon téléphone en télétravail ?",
      answer: "Oui, nos solutions 3CX incluent la mobilité avec applications mobiles et softphones pour ordinateur.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-red-primary to-blue-marine overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-red-primary/90 to-blue-marine/90 z-10"></div>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Assistance & <span className="text-white">Support</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Support technique 24/7 • Équipes locales DOM-TOM • Réponse en moins de 2h
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mt-4">
              Notre équipe d'experts est là pour vous accompagner dans l'utilisation de vos solutions téléphoniques
            </p>
          </div>
        </div>
      </section>

      {/* Canaux de support */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Contactez notre <span className="text-red-primary">équipe support</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Plusieurs moyens pour obtenir de l'aide rapidement et efficacement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {supportChannels.map((channel, index) => (
              <Card key={index} className={`hover:shadow-lg transition-shadow ${channel.urgent ? 'border-red-primary border-2' : ''}`}>
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
                    channel.urgent ? 'bg-red-primary' : 'bg-blue-marine/10'
                  }`}>
                    <channel.icon className={`w-8 h-8 ${channel.urgent ? 'text-white' : 'text-blue-marine'}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {channel.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{channel.description}</p>
                  <div className="space-y-2">
                    <p className="font-bold text-lg text-gray-900">{channel.contact}</p>
                    <p className="text-sm text-gray-500">{channel.availability}</p>
                    {channel.urgent && (
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm font-medium">
                        Priorité support
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Chat Tawk.to intégré */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Chat <span className="text-red-primary">assistance instantanée</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Discutez directement avec nos experts techniques en temps réel
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <MessageCircle className="w-12 h-12 text-blue-marine mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Support chat en direct</h3>
              <p className="text-gray-600">
                Notre équipe est disponible pour répondre à toutes vos questions
              </p>
            </div>
            
            {/* Container pour Tawk.to */}
            <div id='tawk_688d3cc109ef001928d4773f' className="min-h-[400px] border border-gray-200 rounded-lg"></div>
          </div>
        </div>
      </section>

      {/* Support local par région */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Support <span className="text-red-primary">local par région</span>
            </h2>
            <p className="text-xl text-gray-600">
              Des équipes techniques présentes dans chaque département
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {localSupport.map((location, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <location.icon className="w-8 h-8 text-blue-marine mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {location.name}
                  </h3>
                  <p className="text-red-primary font-bold">{location.phone}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ressources et documentation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ressources et <span className="text-red-primary">documentation</span>
            </h2>
            <p className="text-xl text-gray-600">
              Guides, tutoriels et outils pour une utilisation optimale
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-blue-marine/10 rounded-lg flex items-center justify-center mb-6">
                    <resource.icon className="w-6 h-6 text-blue-marine" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{resource.description}</p>
                  <ul className="space-y-2">
                    {resource.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-red-primary rounded-full mr-3"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6 bg-blue-marine hover:bg-blue-marine/80 text-white">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Accéder aux ressources
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Questions <span className="text-red-primary">fréquentes</span>
            </h2>
            <p className="text-xl text-gray-600">
              Réponses aux questions les plus courantes de nos utilisateurs
            </p>
          </div>

          <div className="space-y-6">
            {faqItems.map((faq, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Vous ne trouvez pas la réponse à votre question ?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-red-primary hover:bg-red-primary/80 text-white">
                <Phone className="w-4 h-4 mr-2" />
                Contacter le support
              </Button>
              <Button variant="outline" className="border-blue-marine text-blue-marine hover:bg-blue-marine/10">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat en ligne
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Script Tawk.to */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date(); 
            Tawk_API.embedded='tawk_688d3cc109ef001928d4773f';
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/688d3cc109ef001928d4773f/1j34pnbg2';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `,
        }}
      />
    </>
  );
}