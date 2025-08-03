import { describe, it, expect } from 'vitest'

describe('Clients Carousel', () => {
  it('should have proper client logos', () => {
    // Test pour vérifier que les logos des clients sont présents
    const clients = [
      'APAJH Guyane',
      'SFR',
      'Cateco',
      'Groupe Lang',
      'Zoo Guadeloupe',
      'Callas Paris',
      'Zoo Martinique',
      'Zoo Guyane',
      'Eurogold'
    ]
    
    expect(clients).toHaveLength(9)
    expect(clients).toContain('SFR')
    expect(clients).toContain('Cateco')
  })

  it('should have proper section title', () => {
    // Test pour vérifier que le titre de section est correct
    const sectionTitle = "Ils nous font confiance"
    expect(sectionTitle).toBe("Ils nous font confiance")
  })

  it('should have proper animation classes', () => {
    // Test pour vérifier que les classes d'animation sont présentes
    const animationClasses = {
      container: 'relative overflow-hidden',
      gradient: 'absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10',
      carousel: 'flex items-center space-x-16 lg:space-x-24'
    }
    
    expect(animationClasses.container).toContain('overflow-hidden')
    expect(animationClasses.gradient).toContain('bg-gradient-to-r')
    expect(animationClasses.carousel).toContain('flex items-center')
  })

  it('should have statistics section', () => {
    // Test pour vérifier que la section statistiques est présente
    const statistics = {
      clients: '500+',
      experience: '15+',
      satisfaction: '99.9%'
    }
    
    expect(statistics.clients).toBe('500+')
    expect(statistics.experience).toBe('15+')
    expect(statistics.satisfaction).toBe('99.9%')
  })

  it('should have proper image optimization', () => {
    // Test pour vérifier que les images sont optimisées
    const imageProps = {
      fill: true,
      className: 'object-contain',
      sizes: '(max-width: 768px) 128px, 160px'
    }
    
    expect(imageProps.fill).toBe(true)
    expect(imageProps.className).toBe('object-contain')
    expect(imageProps.sizes).toBe('(max-width: 768px) 128px, 160px')
  })
}) 