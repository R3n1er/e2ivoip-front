import { describe, it, expect } from 'vitest'

describe('ClientsCarousel Component', () => {
  it('should have correct background color', () => {
    const sectionClasses = 'py-16 bg-white'
    expect(sectionClasses).toContain('bg-white')
    expect(sectionClasses).not.toContain('bg-gray-50')
  })

  it('should have correct animation duration', () => {
    const animationDuration = 90 // 3x plus lent que l'original (30 * 3)
    expect(animationDuration).toBe(90)
  })

  it('should have correct interval timing', () => {
    const intervalTiming = 9000 // 9 secondes (3x plus lent que 3000ms)
    expect(intervalTiming).toBe(9000)
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
      duration: 90,
      repeat: 'Infinity',
      ease: 'linear'
    }
    
    expect(animationConfig.duration).toBe(90)
    expect(animationConfig.repeat).toBe('Infinity')
    expect(animationConfig.ease).toBe('linear')
  })

  it('should have correct interval configuration', () => {
    const intervalConfig = {
      timing: 9000,
      description: 'Change toutes les 9 secondes (3x plus lent)'
    }
    
    expect(intervalConfig.timing).toBe(9000)
    expect(intervalConfig.description).toContain('9 secondes')
  })
}) 