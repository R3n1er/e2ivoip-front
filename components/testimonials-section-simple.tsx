"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function TestimonialsSectionSimple() {
  const testimonials = [
    {
      content:
        "E2I VoIP nous a permis de réduire nos coûts télécom de 35% tout en améliorant la qualité de nos communications. Le support technique local est exceptionnel.",
      author: "Marie Dubois",
      role: "Directrice Générale",
      company: "Titeca BEAUPORT Finance",
      location: "Guadeloupe",
      users: "90+ utilisateurs",
      rating: 5,
    },
    {
      content:
        "La migration vers 3CX s'est faite en douceur grâce à l'accompagnement d'E2I VoIP. Nos équipes peuvent maintenant travailler en mobilité complète.",
      author: "Jean-Pierre Martin",
      role: "DSI",
      company: "Cabinet Juridique Martinique",
      location: "Martinique",
      users: "25 utilisateurs",
      rating: 5,
    },
    {
      content:
        "Excellent service client et réactivité remarquable. Les assistants vocaux IA ont révolutionné notre accueil téléphonique 24/7.",
      author: "Sophie Laurent",
      role: "Responsable Qualité",
      company: "Clinique Saint-Joseph",
      location: "Guyane",
      users: "45 utilisateurs",
      rating: 5,
    },
  ];

  const certifications = [
    {
      icon: "lni-certificate",
      title: "Partenaire Silver 3CX",
      description: "Certification avancée CFD (Certified for Distribution)",
      level: "Expert",
    },
    {
      icon: "lni-shield",
      title: "Certifié Yeastar",
      description: "Solution économique et flexible pour PME",
      level: "Certifié",
    },
    {
      icon: "lni-users",
      title: "Partenaire Fanvil & Yealink",
      description: "Gestion centralisée du parc téléphonique",
      level: "Partenaire",
    },
    {
      icon: "lni-checkmark-circle",
      title: "Hébergement Souverain",
      description: "Infrastructure AWS/Azure France/UE conforme RGPD",
      level: "Conforme",
    },
  ];

  return (
    <section id="temoignages" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Plus de 500 entreprises
            <span className="text-red-primary"> nous font confiance</span>
          </h2>
          <p className="text-xl text-gray-secondary max-w-3xl mx-auto">
            Découvrez pourquoi E2I VoIP est le choix privilégié des entreprises
            DOM-TOM pour leur transformation télécom.
          </p>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Témoignages clients
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="h-full bg-white hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i
                        key={i}
                        className="lni lni-star-filled h-5 w-5 text-yellow-400"
                      ></i>
                    ))}
                  </div>

                  <i className="lni lni-question-circle h-8 w-8 text-red-200 mb-4"></i>

                  <p className="text-gray-secondary mb-6 leading-relaxed">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>

                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900">
                      {testimonial.author}
                    </div>
                    <div className="text-red-primary text-sm font-medium">
                      {testimonial.role}
                    </div>
                    <div className="text-gray-secondary text-sm">
                      {testimonial.company}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="outline" className="text-xs">
                        {testimonial.location}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {testimonial.users}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Certifications et expertise
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm text-center"
              >
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <i className={`lni ${cert.icon} h-6 w-6 text-red-primary`}></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {cert.title}
                </h4>
                <p className="text-gray-secondary text-sm mb-3">
                  {cert.description}
                </p>
                <Badge className="badge badge-primary">{cert.level}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
