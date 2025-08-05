import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Award, Clock, Target, MapPin, Phone, Mail, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Qui sommes-nous - E2I VoIP",
  description: "Découvrez E2I Assistance (E2I VOIP), votre partenaire privilégié pour une téléphonie d'entreprise innovante. Spécialistes de l'installation et l'intégration de solutions de téléphonie IP comme 3CX.",
  keywords: "E2I VoIP, téléphonie IP, 3CX, Trunk SIP, intégration VoIP, Antilles, Guyane, Réunion",
  openGraph: {
    title: "Qui sommes-nous - E2I VoIP",
    description: "Découvrez E2I Assistance (E2I VOIP), votre partenaire privilégié pour une téléphonie d'entreprise innovante.",
    type: "website",
  },
};

export default function QuiSommesNous() {
  const teamMembers = [
    {
      name: "Alban",
      role: "Directeur & Customer Success Manager",
      image: "/images/team/alban-renier.jpg",
    },
    {
      name: "Valerie",
      role: "Assistante Commerciale",
      image: "/images/team/valerie-de-jesus.jpg",
    },
    {
      name: "Fabien",
      role: "Technicien VoIP",
      image: "/images/team/fabien.jpg",
    },
  ];

  const locations = [
    { name: "Guyane", phone: "+594 594 963 500" },
    { name: "Guadeloupe", phone: "+590 590 173 500" },
    { name: "Martinique", phone: "+596 596 313 500" },
    { name: "La Réunion", phone: "+262 263 085 500" },
  ];

  const services = [
    "Trunk SIP au compteur",
    "Trunk SIP illimité",
    "Standard 3CX PRO Cloud",
    "Standard 3CX SMB PRO Mutualisé",
    "Intégrateur VoIP",
    "Studio messages vocaux",
  ];

  return (
    <>
      {/* Hero Section avec Image Stylisée */}
      <section className="relative py-20 bg-gradient-to-r from-red-primary to-blue-marine overflow-hidden">
        {/* Image de fond avec overlay */}
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
              Qui sommes-<span className="text-white">nous</span> ?
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              E2I Assistance (E2I VOIP) est votre partenaire privilégié pour une téléphonie d'entreprise innovante
            </p>
          </div>
        </div>
      </section>

      {/* Section Présentation */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Notre <span className="text-red-600">expertise</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Nous sommes opérateur de services Telecom, spécialistes de l'installation et l'intégration de solutions de téléphonie IP comme 3CX et fournisseurs de Trunk SIP (création et portabilité de numéros en zone locale).
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Nous intervenons aux Antilles (Guadeloupe et Martinique), en Guyane, à la Réunion et en France Métropolitaine. Nous avons également la possibilité de vous accompagner en Afrique francophone : Sénégal, Côte d'Ivoire, Benin, Togo, Ghana et Cameroun.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Notre équipe maîtrise les dernières avancées technologiques IP dans les Telecoms. Dans un contexte de fin du cuivre en France et dans les DOM avec la transition vers la fibre optique, nous sommes là pour vous guider vers la solution de téléphonie idéale.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-red-100 to-blue-100 rounded-2xl p-8 shadow-xl">
                <div className="text-center">
                  <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Phone className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Plus de 15 ans d'expérience</h3>
                  <p className="text-gray-600 mb-6">
                    Spécialistes reconnus dans les solutions de téléphonie IP et communications unifiées
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">100+</div>
                      <div className="text-gray-600">Clients satisfaits</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">15+</div>
                      <div className="text-gray-600">Années d'expertise</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Nos Missions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos <span className="text-red-600">missions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre expertise réside dans l'intégration de solutions de téléphonie IP avancées pour les entreprises comme 3CX.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Solutions sur mesure</h3>
                <p className="text-gray-600">
                  Nous comprenons que chaque organisation a des besoins uniques, c'est pourquoi nous offrons des services adaptés à la taille et aux spécificités de votre entreprise.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Équipements de pointe</h3>
                <p className="text-gray-600">
                  Nous mettons à votre disposition des équipements de pointe des marques leaders du marché : Yealink, Fanvil, Jabra et Logitech.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Accompagnement complet</h3>
                <p className="text-gray-600">
                  De la sélection de votre trunk SIP à son intégration harmonieuse dans votre infrastructure existante, notre équipe vous guide à chaque étape.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Cœur de métier */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Notre <span className="text-red-600">cœur de métier</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Notre cœur de métier réside dans la fourniture de trunks SIP à partir de 2 utilisateurs ou 4 canaux voix simultanés, vous offrant la souplesse nécessaire pour répondre à la demande de communication de votre entreprise.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Communications au Compteur ou Illimitées</h3>
                    <p className="text-gray-600">
                      Choisissez la formule qui convient le mieux à votre activité. Avec nos Trunk SIP, vous avez la liberté de sélectionner des plans de communication au compteur pour une tarification précise et juste, ou des forfaits illimités (France Métropolitaine et DOM).
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Portabilité et Création de Numéros</h3>
                    <p className="text-gray-600">
                      E2I Assistance VOIP facilite la portabilité de vos numéros en France et dans les Départements et Régions d'Outre-Mer (DROM). Vous conservez votre identité téléphonique tout en bénéficiant des avantages de nos services.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Tarifs Compétitifs, Services de Qualité</h3>
                    <p className="text-gray-600">
                      Nous comprenons que la téléphonie est un élément essentiel de votre activité. C'est pourquoi nous vous offrons des tarifs compétitifs sans compromettre la qualité du service.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-red-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Nos Services</h3>
              <div className="grid grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span className="text-gray-700 text-sm">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Équipe */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Rencontrez <span className="text-red-600">l'équipe</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre équipe d'experts dédiés à votre succès
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Users className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section Certification */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Nous sommes <span className="text-red-600">certifiés</span> !
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              E2I Assistance est partenaire 3CX Bronze et certifié ! Visitez le site internet de notre partenaire et souscrivez à une version d'évaluation du standard téléphonique.
            </p>
            <div className="bg-white rounded-lg p-8 shadow-lg inline-block">
              <div className="w-32 h-16 bg-gray-200 rounded flex items-center justify-center">
                <Badge variant="secondary" className="text-sm">3CX Bronze Partner</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Contact par région */}
      <section className="py-16 bg-gradient-to-r from-red-primary to-blue-marine">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Nos <span className="text-white">implantations</span>
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Présents aux Antilles, en Guyane, à la Réunion et en France Métropolitaine
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations.map((location, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{location.name}</h3>
                  <p className="text-white/90 text-sm">{location.phone}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
