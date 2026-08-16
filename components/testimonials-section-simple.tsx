"use client";
import { SafeImage as Image } from '@/components/ui/safe-image'
import { Star, Quotes } from '@/lib/icons'

interface Testimonial {
  content: string
  author: string
  role: string
  company: string
  location: 'Guadeloupe' | 'Martinique' | 'Guyane' | 'Reunion'
  users?: string
  rating: 1 | 2 | 3 | 4 | 5
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[]
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    content:
      'E2I VoIP nous a permis de reduire nos couts telecom de 35% tout en ameliorant la qualite de nos communications. Le support technique local est exceptionnel.',
    author: 'Marie Dubois',
    role: 'Directrice Generale',
    company: 'Titeca BEAUPORT Finance',
    location: 'Guadeloupe',
    users: '90+ utilisateurs',
    rating: 5,
  },
  {
    content:
      'La migration vers 3CX s\'est faite en douceur grace a l\'accompagnement d\'E2I VoIP. Nos equipes peuvent maintenant travailler en mobilite complete.',
    author: 'Jean-Pierre Martin',
    role: 'DSI',
    company: 'Cabinet Juridique Martinique',
    location: 'Martinique',
    users: '25 utilisateurs',
    rating: 5,
  },
  {
    content:
      'Excellent service client et reactivite remarquable. L\'interconnexion SIP pour nos agents vocaux IA a transforme notre accueil telephonique en continu.',
    author: 'Sophie Laurent',
    role: 'Responsable Qualite',
    company: 'Clinique Saint-Joseph',
    location: 'Guyane',
    users: '45 utilisateurs',
    rating: 5,
  },
]

export function TestimonialsSectionSimple({ testimonials = DEFAULT_TESTIMONIALS }: TestimonialsSectionProps) {
  if (!testimonials || testimonials.length === 0) return null

  return (
    <section id="temoignages" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-6">
            Ils nous font
            <span className="text-red-primary"> confiance</span>
          </h2>
          <p className="text-xl text-gray-secondary max-w-3xl mx-auto">
            Découvrez pourquoi des entreprises des DOM et de France
            métropolitaine choisissent E2I VoIP pour leur téléphonie.
          </p>
        </div>

        {/* 3CX Badge Strip -- D-02 */}
        <div className="flex items-center justify-center gap-8 py-6 mb-12">
          <div className="flex items-center gap-4">
            <Image
              src="/images/logo-3CX-partner-e2i/3cx-Silver-Partner-badge.webp"
              alt="3CX Silver Partner"
              width={48}
              height={48}
              className="max-h-12 w-auto"
            />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-secondary">
              PARTENAIRE 3CX CERTIFIE
            </span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="h-full bg-white border border-gray-200 p-6"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={24} weight="fill" className="text-red-primary" />
                ))}
              </div>

              <Quotes size={32} weight="fill" className="text-red-200 mb-4" />

              <p className="text-gray-secondary mb-6 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="border-t pt-4">
                <div className="font-black text-gray-900">
                  {testimonial.author}
                </div>
                <div className="text-red-primary text-sm font-black">
                  {testimonial.role}
                </div>
                <div className="text-gray-secondary text-sm">
                  {testimonial.company}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-secondary">
                    {testimonial.location}
                  </span>
                  <span className="text-xs text-gray-500">
                    {testimonial.users}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
