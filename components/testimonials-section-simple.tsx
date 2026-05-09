import Image from 'next/image'

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
      'Excellent service client et reactivite remarquable. Les assistants vocaux IA ont revolutionne notre accueil telephonique 24/7.',
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
          <h2 className="text-4xl font-black tracking-[-0.04em] leading-[0.95] text-gray-900 mb-6">
            Plus de 500 entreprises
            <span className="text-red-primary"> nous font confiance</span>
          </h2>
          <p className="text-xl text-gray-secondary max-w-3xl mx-auto">
            Decouvrez pourquoi E2I VoIP est le choix privilegie des entreprises
            DOM pour leur transformation telecom.
          </p>
        </div>

        {/* 3CX Badge Strip -- D-02 */}
        <div className="flex items-center justify-center gap-8 py-6 mb-12">
          <div className="flex items-center gap-4 border-l-4 border-red-primary pl-4">
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
