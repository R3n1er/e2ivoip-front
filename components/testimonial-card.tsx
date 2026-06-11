"use client";
import React from "react";
import { Buildings, Quotes, Users, MapTrifold, CheckCircle, Calculator, Storefront, Heart } from '@/lib/icons';

interface Testimonial {
  company: string;
  description: string;
  users: string;
  solution: string;
  industry: string;
  logo?: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({ testimonial, className = "" }: TestimonialCardProps) {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 ${className}`}>
      {/* Logo/En-tête */}
      <div className="flex items-center mb-4">
        {testimonial.logo ? (
          <img 
            src={testimonial.logo} 
            alt={`Logo ${testimonial.company}`}
            className="w-12 h-12 object-contain mr-4"
          />
        ) : (
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-red-600 rounded-lg flex items-center justify-center mr-4">
            <Buildings size={24} className="text-white" aria-hidden="true" />
          </div>
        )}
        <div>
          <h3 className="font-bold text-gray-800 text-lg">{testimonial.company}</h3>
          <p className="text-sm text-gray-600">{testimonial.industry}</p>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <div className="flex items-start mb-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
            <Quotes size={20} className="text-blue-600" aria-hidden="true" />
          </div>
          <p className="text-gray-700 italic leading-relaxed">{testimonial.description}</p>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <Users size={20} className="text-blue-600 mr-1" aria-hidden="true" />
            <span className="font-bold text-xl text-gray-800">{testimonial.users}</span>
          </div>
          <p className="text-xs text-gray-600">Utilisateurs</p>
        </div>
        
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <MapTrifold size={20} className="text-red-600 mr-1" aria-hidden="true" />
            <span className="font-bold text-sm text-gray-800">{testimonial.solution}</span>
          </div>
          <p className="text-xs text-gray-600">Solution</p>
        </div>
      </div>

      {/* Badge de confiance */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-center">
          <div className="flex items-center bg-gradient-to-r from-green-100 to-blue-100 px-3 py-1 rounded-full">
            <CheckCircle size={16} className="text-green-600 mr-2" aria-hidden="true" />
            <span className="text-sm font-medium text-gray-700">Client satisfait</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TestimonialsSection {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
}

export function TestimonialsSection({ 
  testimonials, 
  title = "Ils Nous Font Confiance",
  subtitle = "Découvrez comment nos clients ont transformé leurs communications"
}: TestimonialsSection) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Grille des témoignages */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>

        {/* Secteurs qui choisissent E2I VoIP */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Secteurs qui nous Choisissent
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { Icon: Calculator, title: "Cabinets d'expertise", desc: "Comptables, avocats, bureaux d'études BTP" },
              { Icon: Storefront, title: "Commerces", desc: "Enseignes locales, bijouteries, franchises" },
              { Icon: Heart, title: "Secteur santé", desc: "Cliniques, cabinets médicaux, maisons de santé" },
              { Icon: Buildings, title: "Entreprises", desc: "Entreprises locales et groupes régionaux" }
            ].map((sector, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <sector.Icon size={24} className="text-blue-600" aria-hidden="true" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">{sector.title}</h4>
                <p className="text-sm text-gray-600">{sector.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}