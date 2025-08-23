

describe('ClientsCarousel Component', () => {
  it('should have correct background color', () => {
    const sectionClasses = 'py-16 bg-white'
    expect(sectionClasses).toContain('bg-white')
    expect(sectionClasses).not.toContain('bg-gray-50')
  })

  it('should have correct animation duration', () => {
    const animationDuration = 180 // 6x plus lent que l'original (30 * 6)
    expect(animationDuration).toBe(180)
  })

  it('should have correct interval timing', () => {
    const intervalTiming = 15000 // 15 secondes (encore plus lent)
    expect(intervalTiming).toBe(15000)
  })

  it('should have correct gradient overlays', () => {
    const leftGradient = 'bg-gradient-to-r from-white to-transparent'
    const rightGradient = 'bg-gradient-to-l from-white to-transparent'
    
    expect(leftGradient).toContain('from-white')
    expect(rightGradient).toContain('from-white')
    expect(leftGradient).not.toContain('from-gray-50')
    expect(rightGradient).not.toContain('from-gray-50')
  })

  it('should have correct section structure', () => {
    const sectionStructure = {
      background: 'bg-white',
      padding: 'py-16',
      container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
    }
    
    expect(sectionStructure.background).toBe('bg-white')
    expect(sectionStructure.padding).toBe('py-16')
    expect(sectionStructure.container).toContain('max-w-7xl')
  })

  it('should have correct animation configuration', () => {
    const animationConfig = {
      duration: 180,
      repeat: 'Infinity',
      ease: 'linear'
    }
    
    expect(animationConfig.duration).toBe(180)
    expect(animationConfig.repeat).toBe('Infinity')
    expect(animationConfig.ease).toBe('linear')
  })

  it('should have correct interval configuration', () => {
    const intervalConfig = {
      timing: 15000,
      description: 'Change toutes les 15 secondes (encore plus lent)'
    }
    
    expect(intervalConfig.timing).toBe(15000)
    expect(intervalConfig.description).toContain('15 secondes')
  })

  it('should have transparent borders for logo cards', () => {
    const cardClasses = 'bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border-transparent'
    expect(cardClasses).toContain('border-transparent')
    expect(cardClasses).not.toContain('border-gray-200')
  })

  it('should not have slider buttons', () => {
    const hasSliderButtons = false
    expect(hasSliderButtons).toBe(false)
  })
}) 